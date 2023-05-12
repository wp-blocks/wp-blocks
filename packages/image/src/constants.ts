export const compressors = [ 'avif', 'webp', 'mozjpeg', 'jpg', 'png' ] as const;

export type Compressor = typeof compressors[ number ];

export const inputFormats = [
	'.jpg',
	'.jpeg',
	'.png',
	'.webp',
	'.avif',
	'.tiff',
	'.gif',
	'.svg',
];

export const svgOptions = [
	{ title: 'CleanupAttrs', value: 'cleanupAttrs' },
	{ title: 'RemoveDoctype', value: 'removeDoctype' },
	{ title: 'RemoveXMLProcInst', value: 'removeXMLProcInst' },
	{ title: 'RemoveComments', value: 'removeComments' },
	{ title: 'RemoveMetadata', value: 'removeMetadata' },
	{ title: 'RemoveTitle', value: 'removeTitle' },
	{ title: 'RemoveDesc', value: 'removeDesc' },
	{ title: 'RemoveUselessDefs', value: 'removeUselessDefs' },
	{ title: 'RemoveXMLNS', value: 'removeXMLNS' },
	{ title: 'RemoveEditorsNSData', value: 'removeEditorsNSData' },
	{ title: 'RemoveEmptyAttrs', value: 'removeEmptyAttrs' },
	{ title: 'RemoveHiddenElems', value: 'removeHiddenElems' },
	{ title: 'RemoveEmptyText', value: 'removeEmptyText' },
	{ title: 'RemoveEmptyContainers', value: 'removeEmptyContainers' },
	{ title: 'MergePaths', value: 'mergePaths' },
	{ title: 'RemoveUnusedNS', value: 'removeUnusedNS' },
	{ title: 'SortAttrs', value: 'sortAttrs' },
	{ title: 'RemoveAttrs', value: 'removeAttrs' },
	{ title: 'ConvertShapeToPath', value: 'convertShapeToPath' },
	{ title: 'SortDefsChildren', value: 'sortDefsChildren' },
	{ title: 'RemoveDimensions', value: 'removeDimensions' },
	{ title: 'RemoveStyleElement', value: 'removeStyleElement' },
	{ title: 'RemoveScriptElement', value: 'removeScriptElement' },
];
