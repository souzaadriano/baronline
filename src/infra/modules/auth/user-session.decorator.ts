import { Session } from '@/core/entities/value-objects/session.object';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IncomingMessage } from 'http';

export function isHttpExecutionContext(context: ExecutionContext | any[]): context is ExecutionContext {
  return !(context as any[]).length;
}

export const UserSession = createParamDecorator((data: unknown, context: ExecutionContext | any[]): Session => {
  if (isHttpExecutionContext(context)) {
    const args = context.getArgs();
    const request = args.find((arg) => arg instanceof IncomingMessage);
    if (!request) throw new Error('request not found');
    console.log('request', request);
    return request.session;
  }

  const [root, args, ctx, info] = context;
  return ctx.req.user;
});
