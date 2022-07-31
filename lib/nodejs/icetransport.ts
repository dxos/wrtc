import { inherits } from 'util';
import * as native from '../../binding';
export const RTCIceTransport = native.RTCIceTransport;
export type RTCIceTransport = typeof globalThis.RTCIceTransport;
inherits(native.RTCIceTransport, EventTarget);