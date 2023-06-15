import { ClassConstructor } from '@/utils';
import { EventHandlerContract } from './event-handler.contract';
import { LogHandler } from './log-handler/log-handler.adapter';
import { EventManagerEngine } from '../engine/event-manager.engine';

export type EvenetHandlerConstructor = ClassConstructor<EventHandlerContract<any>, EventManagerEngine>;
export const eventHandlers = (): EvenetHandlerConstructor[] => [LogHandler];
