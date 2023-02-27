/* eslint-disable no-console */
/**
 * External dependencies
 */
import chalk from 'chalk';

export function code( input: string ): void {
	console.log( chalk.cyan( input ) );
}

export function error( input: string ): void {
	console.log( chalk.bold.red( input ) );
}

export function info( input: string ): void {
	console.log( input );
}

export function success( input: string ): void {
	console.log( chalk.bold.green( input ) );
}

/* eslint-enable no-console */
