import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const RTCIceTransport = native.RTCIceTransport;
export type RTCIceTransport = typeof globalThis.RTCIceTransport;
inherits(native.RTCIceTransport, EventTarget);