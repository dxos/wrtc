# @/webrtc

> ✅ **Stable**  
> This library is ready for production use.

> 📺 Part of the [**Astronaut Labs Broadcast Suite**](https://github.com/astronautlabs/broadcast)

[![NPM](https://img.shields.io/npm/v/wrtc.svg)](https://www.npmjs.com/package/@astronautlabs/webrtc) [![macOS/Linux Build Status](https://circleci.com/gh/astronautlabs/webrtc/tree/develop.svg?style=shield)](https://circleci.com/gh/astronautlabs/webrtc)

Node.js bindings for `libwebrtc`, which implements [WebRTC M87](https://chromium.googlesource.com/external/webrtc/+/branch-heads/4280). This project aims for spec-compliance and is tested using the W3C's [web-platform-tests](https://github.com/web-platform-tests/wpt) project. A number of [nonstandard APIs](docs/nonstandard-apis.md) for testing are also included.

# Install

```
npm install @astronautlabs/webrtc
```

Installing from NPM downloads a prebuilt binary for your operating system × architecture. Set the `TARGET_ARCH` environment variable to "arm" or "arm64" to download for armv7l or arm64, respectively. Linux and macOS users can also set the `DEBUG` environment variable to download debug builds.

You can also [build from source](docs/build-from-source.md).

# Supported Platforms

The following platforms are confirmed to work with `@astronautlabs/webrtc` and have prebuilt binaries available. Since we target [N-API version 3](https://nodejs.org/api/n-api.html), there may be additional platforms supported that are not listed here. If your platform is not supported, you may still be able to [build from source](docs/build-from-source.md).

<table>
  <thead>
    <tr>
      <td colspan="2" rowspan="2"></td>
      <th colspan="3">Linux</th>
      <th>macOS</th>
      <th>Windows</th>
    </tr>
    <tr>
      <th>armv7l</th>
      <th>arm64</th>
      <th>x64</th>
      <th>x64</th>
      <th>x64</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="6">Node</th>
      <th>8</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>10</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>11</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>12</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>13</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>14</th>
        <td align="center">✓</td>
        <td align="center">✓</td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th rowspan="2">Electron</th>
      <th>4</th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
    <tr>
      <th>5</th>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center">✓</td>
      <td align="center">✓</td>
      <td align="center">✓</td>
    </tr>
  </tbody>
</table>

# Examples

See [node-webrtc/node-webrtc-examples](https://github.com/node-webrtc/node-webrtc-examples).

# Development

To set up a working copy for development:

```shell
SKIP_DOWNLOAD=true npm install --build-from-source    # Important to skip fetching a prebuilt version from CDN
```

