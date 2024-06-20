import {
  IsNumber,
  Min,
  IsOptional,
  Max,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export class CommonQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.desc;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  sort: { [key: string]: any };

  constructor() {
    this.sort = { [this.sortBy]: this.order };
  }
}
