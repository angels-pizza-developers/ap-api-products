// src/common/guards/facebook-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {
  constructor() {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // If authentication fails, redirect to the desired URL
    if (!err || user) {
      return user;
    } 

  }
}
