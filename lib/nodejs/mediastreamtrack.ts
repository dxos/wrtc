import { inherits } from 'util';
import * as native from '../../binding';
export const MediaStreamTrack = native.MediaStreamTrack;
export type MediaStreamTrack = typeof globalThis.MediaStreamTrack;
inherits(native.MediaStreamTrack, EventTarget);