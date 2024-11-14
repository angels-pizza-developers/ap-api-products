// src/common/guards/google-auth.guard.ts
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
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
