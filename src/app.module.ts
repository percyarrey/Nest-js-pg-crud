import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(ConfigService:ConfigService)=>({
        type:'postgres',
        host: ConfigService.get('DB_HOST'),
        port: +ConfigService.get('DB_HOST'),
        username: ConfigService.get('DB_USERNAME'),
        password:ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities:[join(process.cwd(),'dist/**/*.entity.js')],
        // do NOT use synchronize: true in real projects
        synchronize: true,
      })
    }),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
