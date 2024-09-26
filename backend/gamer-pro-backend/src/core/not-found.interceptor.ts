import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGeneralError } from './types/general-error.interface';

export interface Response<T> {
  data: T;
}

/**
 * Interceptor that evaluates if a GET/UPDATE/DELETE endpoint
 * returned an undefined response and returns a NotFound exception
 */
@Injectable()
export class NotFoundInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * Method that intercepts the request, obtains the HTTP method, and evaluates
   * if it throws a NotFound exception based on the endpoint response
   *
   * @param {ExecutionContext} context
   * @param {CallHandler} next
   * @returns {void}
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    let method = 'GET';
    if (
      context['args'] !== undefined &&
      context['args'][0] !== undefined &&
      context['args'][0]['method'] !== undefined
    ) {
      method = context['args'][0]['method'];
    }
    const useInterceptor =
      method === 'GET' ||
      method === 'PUT' ||
      method === 'DELETE' ||
      method === 'PATCH';
    return next.handle().pipe(
      map((data) => {
        if (data === undefined && useInterceptor) {
          const error: IGeneralError = {
            statusCode: 404,
            message: 'Item no encontrado',
            error: 'No encontrado',
          };
          throw new NotFoundException(error);
        }
        return data;
      }),
    );
  }
}
