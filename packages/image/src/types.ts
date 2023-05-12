import { Config as SvgoConfig } from 'svgo';

import { Compressor } from './constants.js';

export interface CompressionOptions {
	compress: string;
	compressor?: Compressor;
	quality?: number;
	progressive?: string;
	plugins?: SvgoConfig[];
}
