'use strict';
import path from 'path';
import fs from 'fs';
import jsYAML from 'js-yaml';
import { Minimatch } from 'minimatch';
import { describe, specify, before } from 'mocha-sugar-free';
import { readManifest, getPossibleTestFilePaths, stripPrefix } from './wpt-manifest-utils.js';
import startWPTServer from './start-wpt-server.js';

const validReasons = new Set([
  'fail',
  'fail-slow',
  'timeout',
  'flaky',
  'mutates-globals',
  'needs-node10',
  'needs-node11'
]);

const hasNode10 = Number(process.versions.node.split('.')[0]) >= 10;
const hasNode11 = Number(process.versions.node.split('.')[0]) >= 11;

const manifestFilename = path.resolve(__dirname, '..', '..', '..', '..', 'lib', 'nodejs', 'test', 'web-platform-tests', 'wpt-manifest.json');
const manifest = readManifest(manifestFilename);
const possibleTestFilePaths = getPossibleTestFilePaths(manifest);

const toRunFilename = path.resolve(__dirname, '..', '..', '..', '..', 'lib', 'nodejs', 'test', 'web-platform-tests', 'to-run.yaml');
const toRunString = fs.readFileSync(toRunFilename, { encoding: 'utf-8' });
const toRunDocs = jsYAML.safeLoadAll(toRunString, { filename: toRunFilename });

const minimatchers = new Map();

checkToRun();

let wptServerURL;
const runSingleWPT = require(path.join(__dirname, 'run-single-wpt.js'))(() => wptServerURL);
before({ timeout: 30 * 1000 }, () => {
  return startWPTServer({ toUpstream: false }).then(url => {
    wptServerURL = url;
  });
});

describe('web-platform-tests', () => {
  for (const toRunDoc of toRunDocs) {
    describe(toRunDoc.DIR, () => {
      for (const testFilePath of possibleTestFilePaths) {
        if (testFilePath.startsWith(toRunDoc.DIR + '/')) {
          const matchingPattern = expectationsInDoc(toRunDoc).find(pattern => {
            const matcher = minimatchers.get(toRunDoc.DIR + '/' + pattern);
            return matcher.match(testFilePath);
          });

          const testFile = stripPrefix(testFilePath, toRunDoc.DIR + '/');
          const reason = matchingPattern && toRunDoc[matchingPattern][0];
          const shouldSkip = ['fail-slow', 'timeout', 'flaky', 'mutates-globals'].includes(reason);
          const expectFail = (reason === 'fail') ||
                             (reason === 'needs-node10' && !hasNode10) ||
                             (reason === 'needs-node11' && !hasNode11);

          if (matchingPattern && shouldSkip) {
            specify.skip(`[${reason}] ${testFile}`);
          } else if (expectFail) {
            runSingleWPT(testFilePath, `[expected fail] ${testFile}`, expectFail);
          } else {
            runSingleWPT(testFilePath, testFile, expectFail);
          }
        }
      }
    });
  }
});

function checkToRun() {
  let lastDir = '';
  for (const doc of toRunDocs) {
    if (doc.DIR.startsWith('/')) {
      throw new Error(`DIR entries must not start with a slash: saw "${doc.DIR}"`);
    }
    if (doc.DIR.endsWith('/')) {
      throw new Error(`DIR entries must not end with a slash: saw "${doc.DIR}"`);
    }

    if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', '..', 'web-platform-tests', doc.DIR))) {
      throw new Error(`The directory "${doc.DIR}" does not exist`);
    }

    if (doc.DIR < lastDir) {
      throw new Error(`Bad lexicographical directory sorting in to-run.yaml: ${doc.DIR} should come before ${lastDir}`);
    }
    lastDir = doc.DIR;

    let lastPattern = '';
    for (const pattern of expectationsInDoc(doc)) {
      if (pattern.startsWith('/')) {
        throw new Error(`Expectation patterns must not start with a slash: saw "${pattern}"`);
      }

      if (pattern < lastPattern) {
        throw new Error('Bad lexicographical expectation pattern sorting in to-run.yaml: ' + pattern +
                        ' should come before ' + lastPattern);
      }
      lastPattern = pattern;

      const reason = doc[pattern][0];
      if (!validReasons.has(reason)) {
        throw new Error(`Bad reason "${reason}" for expectation ${pattern}`);
      }

      const matcher = new Minimatch(doc.DIR + '/' + pattern);
      if (!possibleTestFilePaths.some(filename => matcher.match(filename))) {
        throw new Error(`Expectation pattern "${pattern}" does not match any test files`);
      }
      minimatchers.set(doc.DIR + '/' + pattern, matcher);
    }
  }
}

function expectationsInDoc(doc) {
  const keys = Object.keys(doc);
  keys.shift(); // get rid of the DIR key
  return keys;
}
