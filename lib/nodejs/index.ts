import * as native from '../../binding';
try {
  native.setDOMException(require('domexception'));
} catch (error) {
  // Do nothing
}

export * from './audiosink';
export * from './audiosource';
export * from './videosink';
export * from './videosource';
export * from "./datachannel";
export * from "./datachannelevent";
export * from "./icecandidate";
export * from "./peerconnection";
export * from './rtcpeerconnectioniceevent';
export * from './sessiondescription';
export * from "./mediastream";
export * from "./mediastreamtrack";
export * from "./dtlstransport";
export * from "./icetransport";
export * from "./rtpreceiver";
export * from "./rtpsender";
export * from "./rtptransceiver";
export * from "./sctptransport";
export * from "./getusermedia";

import { MediaDevices } from './mediadevices';
export const mediaDevices = new MediaDevices();
