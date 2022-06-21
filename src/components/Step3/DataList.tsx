import React from 'react';

export interface Props {
	id: string;
	options: string[];
}

const DataList: React.FC<Props> = React.memo(function DataList({
	id,
	options,
}) {
	return (
		<datalist id={id}>
			{options.map((x) => (
				<option key={x} value={x} />
			))}
		</datalist>
	);
});

export default DataList;
