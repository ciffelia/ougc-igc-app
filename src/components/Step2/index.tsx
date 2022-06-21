import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { FlightLog } from '@/flight/types';
import { readAndParseFlightLog } from '@/flight/igc';

export interface Props {
	selectedFiles: string[];
	onComplete: (flightLogs: FlightLog[]) => void;
}

const Step2: React.FC<Props> = React.memo(function Step2({
	selectedFiles,
	onComplete,
}) {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		Promise.all(selectedFiles.map(readAndParseFlightLog))
			.then((flightLogs) => onComplete(flightLogs))
			.catch((err) => {
				console.error(err);
				setHasError(true);
			});
	}, [selectedFiles, onComplete]);

	return (
		<div className="container h-100">
			<div className="h-100 d-flex flex-column align-items-center justify-content-center gap-3">
				{hasError ? (
					<>
						<div className="fs-1">
							<BsExclamationCircle />
						</div>
						<div>ファイルを読み込めませんでした</div>
					</>
				) : (
					<>
						<div className="spinner-border" role="status" />
						<div>GPSログを解析中です</div>
					</>
				)}
			</div>
		</div>
	);
});

export default Step2;
