import { Config as SvgoConfig } from 'svgo';

import { Compressor } from './constants.js';

export interface CompressionOptions {
	compress: boolean;
	compressor?: Compressor;
	quality?: number;
	progressive?: boolean;
	plugins?: SvgoConfig[];
}
