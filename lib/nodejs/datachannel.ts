import { inherits } from 'util';
import * as native from '../../binding';

export class RTCDataChannel extends (native.RTCDataChannel as typeof globalThis.RTCDataChannel) {
    override send(data: string): void;
    override send(data: Blob): void;
    override send(data: ArrayBuffer): void;
    override send(data: ArrayBufferView): void;
    override send(data: unknown): void {
        // A hack to support jsdom's Blob implementation.
        const implSymbol = Object.getOwnPropertySymbols(data).find(symbol => symbol.toString() === 'Symbol(impl)');
        if (implSymbol && (data as any)[implSymbol] && (data as any)[implSymbol]._buffer) {
            data = (data as any)[implSymbol]._buffer;
        }
        super.send(data as any);
    }
}

inherits(native.RTCDataChannel, EventTarget);