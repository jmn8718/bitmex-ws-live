import React from 'react';
import { Layout, Menu, Breadcrumb, Spin, Icon } from 'antd';

import { Markets } from './markets';
import { Info } from './info';

const { Header, Content, Footer } = Layout;

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
			<Footer style={{ textAlign: 'center' }}>
				Created by Jose Miguel
				<a
					href="https://github.com/jmn8718"
					target="_blank"
					rel="noopener noreferrer"
					className="link-no-decoration"
				>
					<Icon type="github" />
				</a>
				<a
					href="https://www.linkedin.com/in/jm8nav/"
					target="_blank"
					rel="noopener noreferrer"
					className="link-no-decoration"
				>
					<Icon type="linkedin" />
				</a>
			</Footer>
		</Layout>
	);
};
