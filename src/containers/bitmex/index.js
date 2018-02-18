import React, { Component } from 'react';
// import WebSocket from 'ws';
import { BITMEX_WS_CONNECTION_URL } from '../../constants';
import { OrderbookL2 } from '../../handlers/OrderbookL2';

const publishUpdate = (data) => {
	console.log(JSON.stringify(data));
};

class Bitmex extends Component {
	state = {
		ws: null,
		symbols: new Map(),
		connected: false,
		ready: false,
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

	render() {
		const { connected, ready, symbols } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>
				{!connected || !ready ? (
					<p>connecting...</p>
				) : (
					<div className="App-intro">
						{Array.from(symbols.values()).map(({ symbol, lastPrice }) => {
							return (
								<p key={symbol}>
									{symbol}: {lastPrice}
								</p>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}

export default Bitmex;
