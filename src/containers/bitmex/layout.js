import React from 'react';
import { Layout, Spin } from 'antd';

import { Footer, MarketInformation, MarketsList } from '../../components';

const { Content } = Layout;

export const ContainerLayout = ({
	loading,
	setActiveSymbol,
	symbols,
	activeSymbol,
	unsetActiveSymbol,
}) => {
	return (
		<Layout className="layout full-layout">
			<Content className="layout-container">
				{loading ? (
					<Spin size="large" className="layout-spin" tip="Connecting..." />
				) : (
					<div className="layout-content">
						<MarketsList
							data={symbols}
							setActiveSymbol={setActiveSymbol}
							activeSymbol={activeSymbol}
						/>
						{activeSymbol && (
							<MarketInformation
								data={symbols.get(activeSymbol)}
								onClose={unsetActiveSymbol}
							/>
						)}
					</div>
				)}
			</Content>
			<Footer />
		</Layout>
	);
};
