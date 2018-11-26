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

var spawn = require('cross-spawn');

function parseTestPattern(argv) {
   var found = false;
   var pattern = argv.map(function(v) {
      if (found) {
         return v;
      }
      if (v === '--') {
         found = true;
      }
   }).filter(function(a) {
      return a
   }).join(' ');
   return pattern ? ['--grep', pattern] : [];
}

process.env.SINGLE_TEST_RUN = parseTestPattern(process.argv).join(',');
spawn('npm', ['run', 'ng-test'], {stdio: ['ignore', process.stdout, process.stderr]});

