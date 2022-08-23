import { BaseAxiosGetAllParam } from '@base-module/domain/entities/base-axios-get-all-param.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BaseAxiosGetAllParamDTO implements BaseAxiosGetAllParam {
  @ApiProperty({ type: 'number', description: 'Page' })
  page: number;

  @ApiProperty({ type: 'number', description: 'Total per page' })
  pageSize: number;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Sort By (ASC/DESC)',
  })
  sortBy?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Sort direction',
  })
  sortDirection?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Search by keyword',
  })
  q?: string;
}
