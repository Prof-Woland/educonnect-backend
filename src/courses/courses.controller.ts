import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, oneDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { Auth } from 'prisma/generated/prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @Authorization('admin', 'teacher')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('/popular')
  async findPopular() {
    return await this.coursesService.findPopular();
  }

  @Get('/own')
  @Authorization('student')
  async findOwn(@Authorized() user: Auth) {
    return await this.coursesService.findOwn(user);
  }

  @Post('/record')
  @Authorization('student')
  async recording(@Authorized() user: Auth, @Body() dto: oneDto) {
    return await this.coursesService.recording(user, dto);
  }

  @Get(':id')
  findOne(@Authorized() user: Auth, @Param() id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Authorization()
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Authorization()
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
