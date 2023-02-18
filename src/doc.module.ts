import { Module } from '@nestjs/common';
import { DocController } from './routes/doc.controller';

@Module({ controllers: [DocController] })
export class DocModule {}
