import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataError, Model, Transaction } from 'objection';
import { IGeneralError } from 'src/core/types/general-error.interface';

@Injectable()
export class DatabaseTransactionService {
  async databaseTransaction<T>(
    executeFunction: (t: Transaction) => Promise<T>,
    logger?: Logger,
  ): Promise<T> {
    const transaction: Transaction = await Model.startTransaction();
    try {
      const res: T = await executeFunction(transaction);
      await transaction.commit();
      return res;
    } catch (err) {
      console.log(err.constructor.name);
      if (logger !== undefined) {
        if (err instanceof HttpException) {
          logger.error(err.message, err.stack, err.getResponse());
        } else {
          logger.error(err);
        }
      }
      await transaction.rollback();
      if (!this.isGeneralErrorObject(err)) {
        if (err['name'] && err['name'] === 'UniqueViolationError') {
          let errors: object[] | string;
          let badRequest = true;
          if (err['columns']) {
            errors = err['columns']
              .map((col: string) => {
                return `Un registro para ${col} ya existe con el valor especificado`;
              })
              .join(', ');
          } else {
            badRequest = false;
            errors = 'Duplicate record';
          }
          const error: IGeneralError = {
            statusCode: badRequest ? 400 : 422,
            message: errors,
            error: badRequest ? 'Peticion incorrecta' : 'Entidad no procesable',
          };
          if (badRequest) {
            throw new BadRequestException(error);
          } else {
            throw new UnprocessableEntityException(error);
          }
        } else if (err instanceof DataError) {
          const [, errorMessage] = err.message.split('-');

          const error: IGeneralError = {
            statusCode: 400,
            message: errorMessage,
            error: 'Error en los datos',
          };
          throw new BadRequestException(error);
        } else {
          // const error: IGeneralError = {
          //   statusCode: 500,
          //   message: 'Internal server error',
          //   error: 'Internal server error',
          // };
          // throw new InternalServerErrorException(error);
          const error: IGeneralError = {
            statusCode: 400,
            message: 'Datos no procesables, verifique los datos enviados',
            error: 'Error en los datos',
          };
          throw new BadRequestException(error);
        }
      }
      throw new HttpException(err['response'], err['status']);
    }
  }

  private isGeneralErrorObject(obj: any): boolean {
    if (obj['status'] === undefined || obj['response'] === undefined) {
      return false;
    }
    if (typeof obj['response'] !== 'object') {
      return false;
    }
    return (
      'statusCode' in obj['response'] &&
      'message' in obj['response'] &&
      'error' in obj['response']
    );
  }
}
