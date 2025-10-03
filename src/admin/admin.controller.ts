import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CommentDto, UpdateAdminDto } from './dto/update-admin.dto';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { Auth } from 'prisma/generated/prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Authorization('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('/all')
  @Authorization('admin')
  async findAll(@Authorized() user: Auth) {
    return await this.adminService.findAll(user);
  }

  @Get('/pending')
  @Authorization('admin')
  async findPending() {
    return await this.adminService.findPending();
  }

  @Get('/pending/:id')
  @Authorization('admin')
  async findPendingOne(@Param() id:string) {
    return await this.adminService.findPendingOne(id);
  }

  @Get('/pending/comments/:id')
  @Authorization('admin')
  async findComments(@Param() id:string) {
    return await this.adminService.findComments(id);
  }

  @Post('/pending/approve/:id')
  @Authorization('admin')
  async approveCourse(@Param() id:string) {
    return await this.adminService.approveCourse(id);
  }

  @Post('/addComment')
  @Authorization('admin')
  async addCommentToCourse(@Body() dto: CommentDto, @Authorized() user: Auth) {
    return this.adminService.addCommentToCourse(dto, user);
  }

  @Get(':id')
  @Authorization('admin')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @Authorization('admin')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @Authorization('admin')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
