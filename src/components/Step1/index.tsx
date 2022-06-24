import React, { useCallback, useState } from 'react';
import { useFileDrop } from '@/util';
import FileList from './FileList';
import IgcSelectButton from './IgcSelectButton';

export interface Props {
	onComplete: (selectedFiles: string[]) => void;
}

const Step1: React.FC<Props> = React.memo(function Step1({ onComplete }) {
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	const handleSelect = useCallback(
		(files: string[]) => {
			setSelectedFiles([...new Set([...selectedFiles, ...files])]);
		},
		[selectedFiles],
	);
	useFileDrop(handleSelect);

	const handleNextClick = useCallback(() => {
		onComplete(selectedFiles);
	}, [onComplete, selectedFiles]);

	return (
		<div className="container h-100">
			<div className="h-100 d-flex flex-column align-items-center justify-content-center gap-3">
				<div>
					GPSログ（IGCファイル）を選択してください。一度に複数のファイルを選択できます。
				</div>
				<div className="d-flex flex-column gap-1">
					{selectedFiles.length > 0 && <FileList files={selectedFiles} />}
					<IgcSelectButton onSelect={handleSelect} />
				</div>
				{selectedFiles.length > 0 && (
					<button
						onClick={handleNextClick}
						type="button"
						className="btn btn-primary btn-lg"
					>
						次に進む
					</button>
				)}
			</div>
		</div>
	);
});

export default Step1;
