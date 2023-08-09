#!/bin/bash

set -e

set -v

export DEPOT_TOOLS_UPDATE=0
export PATH=$DEPOT_TOOLS:$PATH

export TARGETS="webrtc libjingle_peerconnection"
if [[ "$(uname)" == "Linux" && "$TARGET_ARCH" == arm* ]]; then
  export TARGETS="$TARGETS pc:peerconnection libc++ libc++abi"
fi
if [[ "$(uname)" == "Darwin" ]]; then
  export TARGETS="$TARGETS libc++"
fi

if [ -z "$PARALLELISM" ]; then
  PARALLELISM=24
fi

ninja -j $PARALLELISM
