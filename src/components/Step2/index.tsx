import React, { useEffect } from 'react';
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
	useEffect(() => {
		Promise.all(selectedFiles.map(readAndParseFlightLog)).then((flightLogs) =>
			onComplete(flightLogs),
		);
	}, [selectedFiles, onComplete]);

	return (
		<div className="container h-100">
			<div className="h-100 d-flex flex-column align-items-center justify-content-center gap-3">
				<div className="spinner-border" role="status" />
				<div>GPSログを解析中です</div>
			</div>
		</div>
	);
});

export default Step2;
