import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';

export const RTCDataChannel = native.RTCDataChannel;
export type RTCDataChannel = typeof globalThis.RTCDataChannel;

inherits(native.RTCDataChannel, EventTarget);