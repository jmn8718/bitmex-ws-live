import React, { Component } from 'react';
import { BITMEX_WS_CONNECTION_URL } from '../../constants';
import { ContainerLayout } from './layout';
import './index.css';

class Bitmex extends Component {
	state = {
		ws: null,
		symbols: new Map(),
		connected: false,
		ready: false,
		activeSymbol: '',
	};
	componentWillMount() {
		const ws = new WebSocket(BITMEX_WS_CONNECTION_URL);

		ws.onmessage = (evt) => {
			const { table, action, data, success } = JSON.parse(evt.data);
			// console.log(table, action, data);
			if (table === 'instrument') {
				if (action === 'partial') {
					const symbols = new Map();
					data.filter(({ state }) => state === 'Open').forEach((symbol) => {
						symbols.set(symbol.symbol, symbol);
					});
					this.setState({
						symbols,
						ready: true,
					});
				} else if (action === 'update') {
					const { symbols } = this.state;
					data.forEach(({ symbol, ...item }) => {
						if (symbols.has(symbol)) {
							const symbolData = {
								...symbols.get(symbol),
								...item,
							};
							symbols.set(symbol, symbolData);
						}
					});
					this.setState({ symbols });
				}
			} else if (success) {
				this.setState({ connected: true });
			}
		};

		this.setState({
			ws,
		});
	}

	setActiveSymbol = (activeSymbol) => {
		this.setState({ activeSymbol });
	};

	render() {
		const { connected, ready, symbols, activeSymbol } = this.state;
		return (
			<ContainerLayout
				loading={!connected || !ready}
				setActiveSymbol={this.setActiveSymbol}
				unsetActiveSymbol={() => this.setActiveSymbol()}
				activeSymbol={activeSymbol}
				symbols={symbols}
			/>
		);
	}
}

export default Bitmex;
