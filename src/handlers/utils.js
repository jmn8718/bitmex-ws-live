import { ORDERBOOK_LEVELS } from '../constants';

export const getTopLevels = (tree, orderbookMap, levels = ORDERBOOK_LEVELS) => {
	const it = tree.iterator();
	let item;
	const tops = [];

	let accumulatedVolume = 0;
	while (tops.length < levels && (item = it.next()) !== null) {
		// eslint-disable-line
		const { size, price } = orderbookMap.get(item);
		accumulatedVolume += size;
		tops.push([price, size, accumulatedVolume]);
	}
	return tops;
};
