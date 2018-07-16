import React from 'react';
import { Layout, Icon } from 'antd';
const LayoutFooter = Layout.Footer;

export const Footer = () => (
	<LayoutFooter style={{ textAlign: 'center' }}>
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
	</LayoutFooter>
);
