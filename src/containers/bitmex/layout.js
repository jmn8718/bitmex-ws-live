import React from 'react';
import { Layout, Spin } from 'antd';

import { Footer } from '../../components';

import { Markets } from './markets';
import { Info } from './info';

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
						<Markets data={symbols} setActiveSymbol={setActiveSymbol} />
						{activeSymbol && (
							<Info
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
