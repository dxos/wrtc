import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const MediaStream = native.MediaStream;
export type MediaStream = typeof globalThis.MediaStream;
inherits(native.MediaStream, EventTarget);