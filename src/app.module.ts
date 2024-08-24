import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { User } from './users/entities/user.entity';
import { Category } from '@entities/category.entity';
import { SubCategory } from '@entities/sub-category.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './rbac/guards/roles.guard';
import { JwtAuthGuard } from './rbac/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User, Category,
        SubCategory
      ],
      autoLoadEntities: false,
      synchronize: false,
      logging: true,
      migrations: ['src/migration/*.ts'],

    }),
    AuthModule, UsersModule, CategoryModule, SubCategoryModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Set JwtAuthGuard globally
    },

  ],
})
export class AppModule { }
