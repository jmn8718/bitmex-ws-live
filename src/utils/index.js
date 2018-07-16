export const MARKETS_LIST = [
	'XBTUSD',
	'BCHU18',
	'LTCU18',
	'ETHU18',
	'EOSU18',
	'XRPU18',
	'ADAU18',
	'TRXU18',
];

export const getIconType = (lastTickDirection) => {
	switch (lastTickDirection) {
		case 'ZeroMinusTick':
			return 'caret-down';
		case 'ZeroPlusTick':
			return 'caret-up';
		case 'PlusTick':
			return 'up';
		case 'MinusTick':
			return 'down';
		default:
			return '';
	}
};
