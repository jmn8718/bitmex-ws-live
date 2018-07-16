import React from 'react';

export const Markets = ({ data, setActiveSymbol }) => {
	return (
		<div className="symbols-list">
			{data.map(({ symbol, lastPrice }) => {
				return (
					<div key={symbol} onClick={() => setActiveSymbol(symbol)}>
						<p>
							{symbol}: {lastPrice}
						</p>
					</div>
				);
			})}
		</div>
	);
};
