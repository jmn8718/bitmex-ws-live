import React from 'react';
import { Icon, Card } from 'antd';

export const MarketInformation = ({ data, onClose }) => {
	return (
		<Card
			title={data.symbol}
			extra={<Icon type="close-circle" onClick={onClose} className="pointer" />}
		>
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</Card>
	);
};
