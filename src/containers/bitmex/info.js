import React from 'react';
import { Icon, Card, Row } from 'antd';

export const Info = ({ data, onClose }) => {
	return (
		<Row gutter={16}>
			<Card
				title={data.symbol}
				extra={<Icon type="close-circle" onClick={onClose} />}
			>
				{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
			</Card>
		</Row>
	);
};
