import { inherits } from 'util';
import * as native from '../../binding';
export const RTCAudioSink = native.RTCAudioSink;
export type RTCAudioSink = typeof RTCAudioSinkT;
declare class RTCAudioSinkT { }
inherits(native.RTCAudioSink, EventTarget);