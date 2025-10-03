import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, oneDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AllLogger } from 'src/common/log/logger.log';
import { Auth } from 'prisma/generated/prisma/client';

@Injectable()
export class CoursesService {
  private readonly name = CoursesService.name;
  private readonly logger = new AllLogger()
  constructor(private readonly prismaService: PrismaService){}

  async create(dto: CreateCourseDto) {
    this.logger.log('Try to create course', this.name);
    const {name, description, cost, time, level, rating, category, detailDescription, teacher, parts} = dto;
    const studentsCount = 0;
    const excourse = await this.prismaService.pendingCourses.findFirst({
      where: {
        name
      }
    });

    if(excourse){
      this.logger.warn('Course with this name is already exist', this.name);
      throw new ConflictException('Course with this name is already exist');
    };

    const newCourse = await this.prismaService.pendingCourses.create({
      data:{
        name,
        description,
        cost,
        time,
        level,
        rating,
        category,
        detailDescription,
        teacher,
        studentsCount,
        parts:JSON.stringify(parts)
      }
    })
    this.logger.log('Successful', this.name)
    return newCourse;
  }

  async findAll() {
    this.logger.log('Try to get all courses', this.name)
    const courses = await this.prismaService.courses.findMany({
      orderBy:{
        rating: 'desc',
      }
    })

    if(!courses){
      this.logger.warn("Courses not found", this.name);
      throw new NotFoundException('Courses not found');
    }

    this.logger.log('Successful', this.name)
    return courses
  }

  async findPopular() {
    this.logger.log('Try to get popular courses', this.name)
    const courses = await this.prismaService.courses.findMany({
      take: 8,
      orderBy:{
        studentsCount: 'desc',
      }
    })

    if(!courses){
      this.logger.warn("Courses not found", this.name);
      throw new NotFoundException('Courses not found');
    }

    this.logger.log('Successful', this.name)
    return courses
  }

  async findOwn(user: Auth) {
    this.logger.log('Try to get own courses', this.name)
    const courses = await this.prismaService.courses.findMany({
      where:{
        users: {
          some:{
            id: user.id
          }
        }
      },
      orderBy:{
        studentsCount: 'desc',
      }
    })

    if(!courses){
      this.logger.warn("Courses not found", this.name);
      throw new NotFoundException('Courses not found');
    }
    
    this.logger.log('Successful', this.name)
    return courses
  }

  async recording(user: Auth, dto:oneDto) {
    this.logger.log('Try to record', this.name)
    const {id} = dto
    const existCourse = await this.prismaService.courses.findFirst({
      where:{
        id: id
      }
    })
    if(!existCourse){
      this.logger.warn('Course not found', this.name)
      throw new NotFoundException('Course with this ID was not found')
    }

    const existingRecord = await this.prismaService.courses.findFirst({
      where: {
        id,
        users: {
          some: {
            id: user.id
          }
        }
      }
    });

    if (existingRecord) {
      this.logger.warn('User already recorded', this.name)
      throw new ConflictException('User already recorded');
    }
    
    const courseRecord = await this.prismaService.courses.update({
      where:{
        id
      },
      data:{
        studentsCount: {increment: 1},
        users: {
          connect:{
            id: user.id
          }
        }
      }
    })

    this.logger.log('Successful', this.name)
    return courseRecord
  }

  async findOne(idParam: any) {
    this.logger.log('Try to get one course', this.name)
    const id = idParam.id
    const course = await this.prismaService.courses.findUnique({
      where:{
        id
      }
    });

    if(!course){
      this.logger.warn('Course not found', this.name)
      throw new NotFoundException('Course with this name was not found');
    }
    this.logger.log('Successful', this.name)
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
