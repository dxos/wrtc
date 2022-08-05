
import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const RTCSctpTransport = native.RTCSctpTransport;
export type RTCSctpTransport = typeof globalThis.RTCSctpTransport;
inherits(native.RTCSctpTransport, EventTarget);