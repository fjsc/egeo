/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

'use strict';

const path = require('path');

const tsconfigPath = path.join(__dirname, 'tools/gulp/tsconfig.json');
const tsconfig = require(tsconfigPath);

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

// The gulp tsconfig file maps specific imports to relative paths. In combination with ts-node
// this doesn't work because the JavaScript output will still refer to the imports instead of
// to the relative path. Tsconfig-paths can be used to support path mapping inside of Node.
require("tsconfig-paths").register({
  baseUrl: path.dirname(tsconfigPath),
  paths: tsconfig.compilerOptions.paths
});

require('./tools/gulp/gulpfile');

