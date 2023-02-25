#!/usr/bin/env node

import path from 'path';

import { copy } from './utils/index.js';

const fromDir = path.resolve( './lib' );
const toDir = path.resolve( './build' );

copy( fromDir, toDir, ( file ) => path.extname( file ) === '.js' );
