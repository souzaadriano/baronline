import { SystemController, SystemService } from './system';
import { RootController, RootService } from './root';

export const providers = [SystemService, RootService];
export const controllers = [SystemController, RootController];
