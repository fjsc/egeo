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

import { task, src, dest } from 'gulp';

const fs = require('fs-extra');
const concat = require('concat');

(async function build(): any {
  const files = [
    './dist/air/runtime.js',
    './dist/air/polyfills.js',
    './dist/air/scripts.js',
    './dist/air/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/egeo.js');
})();
