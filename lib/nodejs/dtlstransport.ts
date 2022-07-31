import { inherits } from 'util';
import * as native from '../../binding';
export const RTCDtlsTransport = native.RTCDtlsTransport;
export type RTCDtlsTransport = typeof globalThis.RTCDtlsTransport;

inherits(RTCDtlsTransport, EventTarget);