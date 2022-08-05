import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const RTCDtlsTransport = native.RTCDtlsTransport;
export type RTCDtlsTransport = typeof globalThis.RTCDtlsTransport;

inherits(RTCDtlsTransport, EventTarget);