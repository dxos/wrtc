import { inherits } from 'util';
import * as native from '../../binding';
import { EventTarget } from './eventtarget';
export const RTCVideoSink = native.RTCVideoSink;
export type RTCVideoSink = typeof RTCVideoSinkT;
declare class RTCVideoSinkT { }
inherits(native.RTCVideoSink, EventTarget);