import * as native from '../../binding';
import { EventTarget } from './eventtarget';

var RTCPeerConnectionIceEvent = require('./rtcpeerconnectioniceevent');
var RTCPeerConnectionIceErrorEvent = require('./rtcpeerconnectioniceerrorevent');
var RTCSessionDescription = require('./sessiondescription');

export declare class NRTCPeerConnection extends globalThis.RTCPeerConnection {
}

export class RTCPeerConnection extends (native.RTCPeerConnection as typeof NRTCPeerConnection) {
  constructor(options?: RTCConfiguration) {
    super(options ?? {});
    EventTarget.call(this);
  
    Object.defineProperties(this, {
      
      onconnectionstatechange: {
        value: null,
        writable: true,
        enumerable: true
      },
      ondatachannel: {
        value: null,
        writable: true,
        enumerable: true
      },
      oniceconnectionstatechange: {
        value: null,
        writable: true,
        enumerable: true
      },
      onicegatheringstatechange: {
        value: null,
        writable: true,
        enumerable: true
      },
      onnegotiationneeded: {
        value: null,
        writable: true,
        enumerable: true
      },
      onsignalingstatechange: {
        value: null,
        writable: true,
        enumerable: true
      }
    });
  }

  private _pc: RTCPeerConnection;

  get canTrickleIceCandidates() {
      return this.canTrickleIceCandidates;
  }

  get connectionState() {
      return this.connectionState;
  }

  get currentLocalDescription() {
      return this.currentLocalDescription
        ? new RTCSessionDescription(this.currentLocalDescription)
        : null;
  }

  get localDescription() {
      return this.localDescription
        ? new RTCSessionDescription(this.localDescription)
        : null;
  }

  get pendingLocalDescription() {
      return this.pendingLocalDescription
        ? new RTCSessionDescription(this.pendingLocalDescription)
        : null;
  }

  get currentRemoteDescription() {
      return this.currentRemoteDescription
        ? new RTCSessionDescription(this.currentRemoteDescription)
        : null;
  }
  
  get remoteDescription() {
      return this.remoteDescription
        ? new RTCSessionDescription(this.remoteDescription)
        : null;
  }

  get pendingRemoteDescription() {
      return this.pendingRemoteDescription
        ? new RTCSessionDescription(this.pendingRemoteDescription)
        : null;
  }

  get signalingState() {
      return this.signalingState;
  }

  get readyState() {
      return this.getReadyState();
  }

  get sctp() {
      return this.sctp;
  }

  get iceGatheringState() {
      return this.iceGatheringState;
  }

  get iceConnectionState() {
      return this.iceConnectionState;
  }

  //
  // Attach events to the native PeerConnection object
  //
  ontrack(receiver, streams, transceiver) {
    this.dispatchEvent({
      type: 'track',
      track: receiver.track,
      receiver: receiver,
      streams: streams,
      transceiver: transceiver,
      target: this
    });
  };

  onconnectionstatechange() {
    this.dispatchEvent({ type: 'connectionstatechange', target: this });
  };

  onicecandidate(candidate) {
    var icecandidate = new RTCIceCandidate(candidate);
    this.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', { candidate: icecandidate, target: this }));
  };

  onicecandidateerror(eventInitDict) {
    var pair = eventInitDict.hostCandidate.split(':');
    eventInitDict.address = pair[0];
    eventInitDict.port = pair[1];
    eventInitDict.target = this;
    var icecandidateerror = new RTCPeerConnectionIceErrorEvent('icecandidateerror', eventInitDict);
    this.dispatchEvent(icecandidateerror);
  };

  onsignalingstatechange() {
    this.dispatchEvent({ type: 'signalingstatechange', target: this });
  };

  oniceconnectionstatechange() {
    this.dispatchEvent({ type: 'iceconnectionstatechange', target: this });
  };

  onicegatheringstatechange() {
    this.dispatchEvent({ type: 'icegatheringstatechange', target: this });

    // if we have completed gathering candidates, trigger a null candidate event
    if (this.iceGatheringState === 'complete' && this.connectionState !== 'closed') {
      this.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', { candidate: null, target: this }));
    }
  };

  onnegotiationneeded() {
    this.dispatchEvent({ type: 'negotiationneeded', target: this });
  };

  // [ToDo] onnegotiationneeded

  ondatachannel(channel) {
    this.dispatchEvent(new RTCDataChannelEvent('datachannel', { channel, target: this }));
  };
    
  addIceCandidate(candidate) {
    var promise = this._pc.addIceCandidate(candidate);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }

  close() {
    this._pc.close();
  }

  createDataChannel() {
    return this._pc.createDataChannel.apply(this._pc, arguments);
  }

  createOffer() {
    var options = arguments.length === 3
      ? arguments[2]
      : arguments[0];
    var promise = this._pc.createOffer(options || {});
    if (arguments.length >= 2) {
      promise.then(arguments[0], arguments[1]);
    }
    return promise;
  }

  createAnswer() {
    var options = arguments.length === 3
      ? arguments[2]
      : arguments[0];
    var promise = this._pc.createAnswer(options || {});
    if (arguments.length >= 2) {
      promise.then(arguments[0], arguments[1]);
    }
    return promise;
  }

  getConfiguration() {
    return this._pc.getConfiguration();
  }

  getReceivers() {
    return this._pc.getReceivers();
  }

  getSenders() {
    return this._pc.getSenders();
  }

  getTransceivers() {
    return this._pc.getTransceivers();
  }

  legacyGetStats: () => Promise<void>;
  getStats() {
    if (typeof arguments[0] === 'function') {
      this._pc.legacyGetStats().then(arguments[0], arguments[1]);
      return;
    }
    return this._pc.getStats();
  }

  removeTrack(sender) {
    this._pc.removeTrack(sender);
  }

  setConfiguration(configuration) {
    return this._pc.setConfiguration(configuration);
  }

  setLocalDescription(description) {
    var promise = this._pc.setLocalDescription(description);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }

  setRemoteDescription(description) {
    var promise = this._pc.setRemoteDescription(description);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }

  restartIce() {
    return this._pc.restartIce();
  }
}

// NOTE(mroberts): This is a bit of a hack.
//RTCPeerConnection.prototype.ontrack = null;


module.exports = RTCPeerConnection;
