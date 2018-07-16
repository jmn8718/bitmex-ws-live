import React, { Component } from 'react';
// import WebSocket from 'ws';
import { BITMEX_WS_CONNECTION_URL } from '../../constants';
// import { OrderbookL2 } from '../../handlers/OrderbookL2';
import './index.css';
import { Markets } from './markets';
import { Info } from './info';

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
			if (table === 'instrument') {
				if (action === 'partial') {
					const symbols = new Map();
					data.filter((item) => item.state === 'Open').forEach((symbol) => {
						symbols.set(symbol.symbol, symbol);
					});
					this.setState({
						symbols,
						ready: true,
					});
				}
			} else if (success) {
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
						<Markets
							data={Array.from(symbols.values())}
							setActiveSymbol={this.setActiveSymbol}
						/>
						<Info data={activeSymbol ? symbols.get(activeSymbol) : undefined} />
					</div>
				)}
			</div>
		);
	}
}

export default Bitmex;
