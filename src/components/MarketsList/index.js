import React from 'react';
import { Icon, Card, Col, Row } from 'antd';

import { getIconType } from '../../utils';
import { MARKETS_LIST } from '../../constants';

const Title = ({ name, lastTickDirection }) => (
	<div>
		{name}
		<Icon type={getIconType(lastTickDirection)} />
	</div>
);

const MarketCard = ({
	rootSymbol,
	symbol,
	lastPrice,
	lastTickDirection,
	setActiveSymbol,
	selected,
}) => (
	<Col span={6} key={symbol}>
		<Card
			onClick={() => setActiveSymbol(symbol)}
			className={`market-card pointer ${
				selected ? 'selected' : 'not_selected'
			}`}
		>
			<Title name={rootSymbol} lastTickDirection={lastTickDirection} />
			<p>{lastPrice}</p>
		</Card>
	</Col>
);

export const MarketsList = ({ data, setActiveSymbol, activeSymbol }) => {
	return (
		<Row gutter={16}>
			{MARKETS_LIST.filter((market) => data.has(market)).map((market) => (
				<MarketCard
					key={market}
					{...data.get(market)}
					setActiveSymbol={setActiveSymbol}
					selected={market === activeSymbol}
				/>
			))}
		</Row>
	);
};
