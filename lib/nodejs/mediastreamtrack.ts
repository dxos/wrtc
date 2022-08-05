import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const MediaStreamTrack = native.MediaStreamTrack;
export type MediaStreamTrack = typeof globalThis.MediaStreamTrack;
inherits(native.MediaStreamTrack, EventTarget);