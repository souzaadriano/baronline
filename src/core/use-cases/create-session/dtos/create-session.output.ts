import { Session } from '@/core/entities/value-objects/session.object';

export type Output = {
  sessionId: string;
  userId: string;
  userEmail: string;
  userName: string;
  issuedAt: string;
};
