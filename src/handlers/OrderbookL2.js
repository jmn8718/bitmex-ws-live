import { RBTree } from 'bintrees';
import { SIDE_SELL, SIDE_BUY, ORDERBOOK_LEVELS } from '../constants';

import { getTopLevels } from './utils';

export class OrderbookL2 {
	constructor(symbol, onUpdate, levels = ORDERBOOK_LEVELS) {
		this.tree = new RBTree((a, b) => a - b);
		this.bidsTree = new RBTree((a, b) => a - b);
		this.asksTree = new RBTree((a, b) => b - a);
		this.data = new Map();
		this.levels = levels;
		this.symbol = symbol;
		this.onUpdate = onUpdate;
		this.topOrderbook = {};
	}

	init(data) {
		data.forEach(this.insertRow(this));
	}

	insertRows(data) {
		data.forEach(this.insertRow(this));
		this.publishUpdate();
	}

	insertRow(that = this) {
		return (row) => {
			const { id, currency, ...rest } = row; // eslint-disable-line
			// console.log(row)
			if (rest.side === SIDE_SELL) {
				that.asksTree.insert(id);
			} else if (rest.side === SIDE_BUY) {
				that.bidsTree.insert(id);
			}
			that.data.set(id, rest);
		};
	}

	deleteRows(data) {
		data.forEach((currentRow) => {
			const { side, id } = currentRow;
			if (side === SIDE_SELL) {
				this.asksTree.remove(id);
			} else if (side === SIDE_BUY) {
				this.bidsTree.remove(id);
			}
			this.data.delete(id);
		});
		this.publishUpdate();
	}

	updateRows(data) {
		data.forEach((currentRow) => {
			const { id, curency, ...rest } = currentRow;
			this.data.set(id, {
				...this.data.get(id),
				...rest,
			});
		});
		this.publishUpdate();
	}

	handleUpdate({ action, data, ...rest }) {
		switch (action) {
			case 'partial':
				this.init(data, rest);
				break;
			case 'insert':
				this.insertRows(data);
				break;
			case 'delete':
				this.deleteRows(data);
				break;
			case 'update':
				this.updateRows(data);
				break;
			default:
				break;
		}
	}

	changeLevels(levels = ORDERBOOK_LEVELS) {
		this.levels = levels;
		this.publishUpdate();
	}

	publishUpdate() {
		const orderbook = {
			bids: getTopLevels(this.bidsTree, this.data, this.levels),
			asks: getTopLevels(this.asksTree, this.data, this.levels),
		};
		if (JSON.stringify(this.orderbook) !== JSON.stringify(orderbook)) {
			this.orderbook = orderbook;
			if (this.onUpdate) {
				this.onUpdate(orderbook);
			}
		}
	}
}
