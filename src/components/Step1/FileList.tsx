import React from 'react';

export interface Props {
	files: string[];
}

const FileList: React.FC<Props> = React.memo(function FileList({ files }) {
	return (
		<ul
			className="list-group overflow-auto"
			style={{ maxWidth: '800px', maxHeight: '300px' }}
		>
			{[...files].map((x) => (
				<li key={x} className="list-group-item">
					{x}
				</li>
			))}
		</ul>
	);
});

export default FileList;
