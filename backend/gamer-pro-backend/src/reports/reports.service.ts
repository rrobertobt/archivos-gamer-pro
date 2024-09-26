import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Model } from 'objection';

@Injectable()
export class ReportsService {
  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  async findAll() {
    let topSales = [];
    let topArticles = [];
    let topCustomers = [];
    let topBranches = [];
    await Model.knex()
      .raw('SELECT * FROM sales.topsales')
      .then((data) => {
        topSales = [...data.rows];
      });
    await Model.knex()
      .raw('SELECT * FROM sales.toparticles')
      .then((data) => {
        topArticles = [...data.rows];
      });
    await Model.knex()
      .raw('SELECT * FROM sales.topcustomers')
      .then((data) => {
        topCustomers = [...data.rows];
      });
    await Model.knex()
      .raw('SELECT * FROM sales.topbranches')
      .then((data) => {
        topBranches = [...data.rows];
      });

    return {
      topSales,
      topArticles,
      topCustomers,
      topBranches,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
