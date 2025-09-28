import { createParamDecorator} from "@nestjs/common";
import type {ExecutionContext } from "@nestjs/common";
import { Auth } from "../../../prisma/generated/prisma/client";
import type { Request } from "express";

export const Authorized = createParamDecorator((data: keyof Auth, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest() as Request;

    const user = request.user;
    
    return data ? user![data] : user;
})