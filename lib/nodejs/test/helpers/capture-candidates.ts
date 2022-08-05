export function captureCandidates(pc: RTCPeerConnection) {
  var candidates: any[] = [];
  return new Promise<RTCIceCandidate[]>(function(resolve) {
    pc.onicecandidate = function(evt) {
      if (evt.candidate) {
        // eslint-disable-next-line no-console
        console.log(evt);
        candidates.push(evt.candidate);
      } else {
        resolve(candidates);
      }
    };
  });
}