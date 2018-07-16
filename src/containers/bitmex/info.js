import React from 'react';

export const Info = ({ data }) => {
	return (
		<div className="symbol-data">
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	);
};
