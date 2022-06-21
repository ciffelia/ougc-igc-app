import React, { useCallback } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { open } from '@tauri-apps/api/dialog';

export interface Props {
	onSelect: (files: string[]) => void;
}

const IgcSelectButton: React.FC<Props> = React.memo(function IgcSelectButton({
	onSelect,
}) {
	const handleClick = useCallback(() => {
		open({
			multiple: true,
			filters: [{ name: 'GPSログ', extensions: ['igc'] }],
		}).then((x) => {
			if (x === null) {
				return;
			} else if (Array.isArray(x)) {
				onSelect(x);
			} else {
				onSelect([x]);
			}
		});
	}, [onSelect]);

	return (
		<button
			onClick={handleClick}
			type="button"
			className="btn btn-outline-success d-flex justify-content-center align-items-center gap-2"
		>
			<BsFileEarmarkPlus />
			<span>ファイルを追加</span>
		</button>
	);
});

export default IgcSelectButton;
