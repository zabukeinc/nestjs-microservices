import { BaseLogModel } from '@base-module/data/models/base-log.model';
import { InvoiceLogEntity } from '@invoice-log-module/domain/entities/invoice-log.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'invoices__log' })
export class InvoiceLogModel extends BaseLogModel implements InvoiceLogEntity {}
