import React from 'react';
import { Icon, Card, Col, Row } from 'antd';

import { getIconType, MarketsList } from './utils';

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
}) => (
	<Col span={6} key={symbol}>
		<Card onClick={() => setActiveSymbol(symbol)}>
			<Title name={rootSymbol} lastTickDirection={lastTickDirection} />
			<p>{lastPrice}</p>
		</Card>
	</Col>
);

export const Markets = ({ data, setActiveSymbol }) => {
	return (
		<Row gutter={16}>
			{MarketsList.map((market) => (
				<MarketCard
					key={market}
					{...data.get(market)}
					setActiveSymbol={setActiveSymbol}
				/>
			))}
		</Row>
	);
};
