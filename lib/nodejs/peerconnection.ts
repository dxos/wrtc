import * as native from '../../binding';
import { EventEmitter } from './eventemitter';

import { RTCPeerConnectionIceEvent } from './rtcpeerconnectioniceevent';
import { RTCPeerConnectionIceErrorEvent } from './rtcpeerconnectioniceerrorevent';
import { RTCSessionDescription } from './sessiondescription';

export declare class NRTCPeerConnection extends globalThis.RTCPeerConnection {
}

export class RTCPeerConnection extends (native.RTCPeerConnection as typeof NRTCPeerConnection) {
  constructor(options?: RTCConfiguration) {
    super(options ?? {});
  
    //
    // Attach events to the native PeerConnection object
    //
    this.ontrack = <any>((receiver, streams, transceiver) => {
      this.dispatchEvent(<any>{
        type: 'track',
        track: receiver.track,
        receiver: receiver,
        streams: streams,
        transceiver: transceiver,
        target: this
      });
    });

    this.onconnectionstatechange = () => {
      this.dispatchEvent(<any>{ type: 'connectionstatechange', target: this });
    };

    this.onicecandidate = (ev) => {
      var icecandidate = new RTCIceCandidate(ev.candidate);
      this.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', <any>{ candidate: icecandidate, target: this }));
    };

    this.onicecandidateerror = (event: any) => {
      var pair = event.hostCandidate.split(':');
      event.address = pair[0];
      event.port = pair[1];
      event.target = this;
      var icecandidateerror = new RTCPeerConnectionIceErrorEvent('icecandidateerror', event);
      this.dispatchEvent(icecandidateerror);
    };

    this.onsignalingstatechange = () => {
      this.dispatchEvent(<any>{ type: 'signalingstatechange', target: this });
    };

    this.oniceconnectionstatechange = () => {
      this.dispatchEvent(<any>{ type: 'iceconnectionstatechange', target: this });
    };

    this.onicegatheringstatechange = () => {
      this.dispatchEvent(<any>{ type: 'icegatheringstatechange', target: this });

      // if we have completed gathering candidates, trigger a null candidate event
      if (this.iceGatheringState === 'complete' && this.connectionState !== 'closed') {
        this.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', <any>{ candidate: null, target: this }));
      }
    };

    this.onnegotiationneeded = () => {
      this.dispatchEvent(<any>{ type: 'negotiationneeded', target: this });
    };

    // [ToDo] onnegotiationneeded

    this.ondatachannel = (ev) => {
      this.dispatchEvent(new RTCDataChannelEvent('datachannel', <any>{ channel: ev.channel, target: this }));
    };
  }

  private emitter = new EventEmitter();
  addEventListener(type, listener) { return this.emitter.addEventListener(type, listener); };
  dispatchEvent(event) { return this.emitter.dispatchEvent(event); }
  removeEventListener(type, listener) { return this.removeEventListener(type, listener); }
  
  get canTrickleIceCandidates() {
      return this.canTrickleIceCandidates;
  }

  get connectionState() {
      return this.connectionState;
  }

  get currentLocalDescription() {
      return super.currentLocalDescription
        ? new RTCSessionDescription(super.currentLocalDescription)
        : null;
  }

  get localDescription() {
      return super.localDescription
        ? new RTCSessionDescription(super.localDescription)
        : null;
  }

  get pendingLocalDescription() {
      return super.pendingLocalDescription
        ? new RTCSessionDescription(super.pendingLocalDescription)
        : null;
  }

  get currentRemoteDescription() {
      return super.currentRemoteDescription
        ? new RTCSessionDescription(super.currentRemoteDescription)
        : null;
  }
  
  get remoteDescription() {
      return super.remoteDescription
        ? new RTCSessionDescription(super.remoteDescription)
        : null;
  }

  get pendingRemoteDescription() {
      return super.pendingRemoteDescription
        ? new RTCSessionDescription(super.pendingRemoteDescription)
        : null;
  }

  addIceCandidate(candidate) {
    var promise = super.addIceCandidate(candidate);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }

  createOffer(options)
  createOffer(successCallback, failureCallback)
  createOffer(successCallback, failureCallback, options) 
  createOffer(...args)
  {
    var options = arguments.length === 3
      ? arguments[2]
      : arguments[0];
    var promise = super.createOffer(options || {});
    if (arguments.length >= 2) {
      promise.then(arguments[0], arguments[1]);
    }
    return promise;
  }

  createAnswer()
  createAnswer(options)
  createAnswer(successCallback, failureCallback)
  createAnswer(successCallback, failureCallback, options)
  createAnswer(...argfs) {
    var options = arguments.length === 3
      ? arguments[2]
      : arguments[0];
    var promise = super.createAnswer(options || {});
    if (arguments.length >= 2) {
      promise.then(arguments[0], arguments[1]);
    }
    return promise;
  }

  legacyGetStats: () => Promise<void>;

  getStats() {
    if (typeof arguments[0] === 'function') {
      this.legacyGetStats().then(arguments[0], arguments[1]);
      return;
    }
    return super.getStats();
  }

  setLocalDescription(description) {
    var promise = super.setLocalDescription(description);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }

  setRemoteDescription(description) {
    var promise = super.setRemoteDescription(description);
    if (arguments.length === 3) {
      promise.then(arguments[1], arguments[2]);
    }
    return promise;
  }
}

// NOTE(mroberts): This is a bit of a hack.
//RTCPeerConnection.prototype.ontrack = null;