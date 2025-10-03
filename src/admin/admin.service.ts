import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CommentDto, UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllLogger } from 'src/common/log/logger.log';
import { Auth } from 'prisma/generated/prisma/client';

@Injectable()
export class AdminService {
  private readonly name = AdminService.name;
  private readonly logger = new AllLogger()
  constructor(private readonly prismaService: PrismaService){}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAll(user: Auth) {
    this.logger.log(`Try to get all users from admin dashboard`, this.name)
    const allUsers = await this.prismaService.auth.findMany({where:{
      id:{not:user.id}
    }})

    if(!allUsers){
      this.logger.warn('Users not found', this.name)
      throw new NotFoundException('Users not found')
    }

    this.logger.log(`Successful`, this.name)
    return allUsers;
  }

  async findPending() {
    this.logger.log('Try to get pending courses from admin dashboard', this.name)
    const pendingCourses = await this.prismaService.pendingCourses.findMany({})

    if(!pendingCourses){
      this.logger.warn('Pending courses not found', this.name);
      throw new NotFoundException('Pending courses not found')
    }

    return pendingCourses
  }

  async findPendingOne(idParam: any){
    const id = idParam.id
    this.logger.log('Try to get one pending course from admin dashboard', this.name)
    const pendingCourse = await this.prismaService.pendingCourses.findUnique({where:{id}})

    if(!pendingCourse){
      this.logger.warn('Pending course not found', this.name);
      throw new NotFoundException('Pending course not found')
    }
    return pendingCourse
  }

  async findComments(idParam: any){
    const id = idParam.id
    this.logger.log('Try to get comments from admin dashboard', this.name)
    const comments = await this.prismaService.adminComments.findMany({where:{pendCourse:{id}}})

    if(!comments){
      this.logger.warn('Pending course not found', this.name);
      throw new NotFoundException('Pending course not found')
    }
    return comments
  }

  async addCommentToCourse(dto: CommentDto, user: Auth){
    this.logger.log('Try to create comment', this.name)
    const {comment, id} = dto
    const newComment = await this.prismaService.adminComments.create({
      data:{
        text: comment,
        adminEmail: user.email,
        pendCourseId: id
      }
    })

    this.logger.log('Successful', this.name)
    return newComment
  }

  async approveCourse(idParam: any){
    this.logger.log('Try to approve course', this.name)
    const id = idParam.id;
    const pendCourse = await this.prismaService.pendingCourses.findUnique({
      where:{
        id
      }
    })

    if(!pendCourse){
      this.logger.warn('Pending course not found', this.name)
      throw new NotFoundException('Pending course not found')
    }

    const {name, description, cost, time, level, rating, category, detailDescription, parts, teacher} = pendCourse;

    const existCourse = await this.prismaService.courses.findFirst({
      where:{
        name
      }
    })

    if(existCourse){
      this.logger.warn('Course with this name is already exist', this.name)
      throw new ConflictException('Course with this name is already exist')
    }

    const newCourse = await this.prismaService.courses.create({
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
        studentsCount: 0
      }
    })
    const modulesArray = JSON.parse(parts);
    this.logger.log(JSON.parse(modulesArray), this.name)

    let newModules
    if(modulesArray.length > 0){
      newModules = await this.prismaService.modules.createMany({
      data: modulesArray
      })
    }

    await this.prismaService.pendingCourses.delete({
      where:{
        id
      }
    })

    return newCourse
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
