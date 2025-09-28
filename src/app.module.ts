import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [PrismaModule, CacheModule.register({
    isGlobal: true
  }),ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
