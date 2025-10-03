import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

export class CommentDto{
    @IsNotEmpty()
    @IsString()
    comment: string

    @IsNotEmpty()
    @IsString()
    id: string
}
