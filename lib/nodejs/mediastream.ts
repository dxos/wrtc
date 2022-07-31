import { inherits } from 'util';
import * as native from '../../binding';
export const MediaStream = native.MediaStream;
export type MediaStream = typeof globalThis.MediaStream;
inherits(native.MediaStream, EventTarget);