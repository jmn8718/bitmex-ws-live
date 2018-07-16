import React from 'react';
import { Layout, Icon } from 'antd';
const LayoutFooter = Layout.Footer;

const FooterIcon = ({ link, type }) => (
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		className="link-no-decoration link-footer"
	>
		<Icon type={type} />
	</a>
);

export const Footer = () => (
	<LayoutFooter className="layout-footer">
		Created by Jose Miguel
		<FooterIcon link="https://github.com/jmn8718" type="github" />
		<FooterIcon link="https://www.linkedin.com/in/jm8nav/" type="linkedin" />
	</LayoutFooter>
);
