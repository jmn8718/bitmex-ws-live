import React, { Component } from 'react';
// import WebSocket from 'ws';
import { BITMEX_WS_CONNECTION_URL } from '../../constants';
import { OrderbookL2 } from '../../handlers/OrderbookL2';
import './index.css';

const publishUpdate = (data) => {
	console.log(JSON.stringify(data));
};

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
			const data = JSON.parse(evt.data);
			// console.log(data)
			if (data.table === 'instrument') {
				// console.log(data.data)
				if (data.action === 'partial') {
					const symbols = new Map();
					data.data
						.filter((item) => item.state === 'Open')
						.forEach((symbol) => {
							symbols.set(symbol.symbol, symbol);
						});
					this.setState({
						symbols,
						ready: true,
					});
				}
			} else if (data.success) {
				this.setState({ connected: true });
			}
		};

		this.setState({
			ws,
		});
	}

	componentWillUnmount() {}

	setActiveSymbol = (activeSymbol) => {
		this.setState({ activeSymbol });
	};

	render() {
		const { connected, ready, symbols, activeSymbol } = this.state;
		return (
			<div className="app-container">
				{!connected || !ready ? (
					<p>connecting...</p>
				) : (
					<div className="symbols-container">
						<div className="symbols-list">
							{Array.from(symbols.values()).map(({ symbol, lastPrice }) => {
								return (
									<div
										key={symbol}
										onClick={() => this.setActiveSymbol(symbol)}
									>
										<p>
											{symbol}: {lastPrice}
										</p>
									</div>
								);
							})}
						</div>
						<div className="symbol-data">
							{activeSymbol && (
								<pre>{JSON.stringify(symbols.get(activeSymbol), null, 2)}</pre>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Bitmex;
