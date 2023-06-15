import { Session } from '@/core/entities/value-objects/session.object';

export type Input = {
  readonly name: string;
  readonly session: Session;
};
