import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout } from './layout';
import './index.css';

export const Wrapper = () => {
	return (
		<div className="wrapper">
			<div className="navigation" />
			<Scrollbars className="content" autoHide>
				<Layout />
			</Scrollbars>
		</div>
	);
};
