export function isEdgeIndex(index: number, columns: number): { isFirst: boolean; isLast: boolean } {
	return {
		isFirst: index % columns === 0,
		isLast: (index + 1) % columns === 0,
	};
}
