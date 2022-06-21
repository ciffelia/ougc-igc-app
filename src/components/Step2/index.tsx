import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { unreachable } from '@/util';
import { FlightLog } from '@/flight/types';
import { readAndParseFlightLog } from '@/flight/igc';
import { compareFlightLog } from '@/flight/compareFlightLog';

export interface Props {
	selectedFiles: string[];
	onComplete: (flightLogs: FlightLog[]) => void;
}

enum State {
	Initial,
	InProgress,
	Error,
}

const Step2: React.FC<Props> = React.memo(function Step2({
	selectedFiles,
	onComplete,
}) {
	const [state, setState] = useState(State.Initial);

	useEffect(() => {
		if (state !== State.Initial) {
			return;
		}
		setState(State.InProgress);

		Promise.all(selectedFiles.map(readAndParseFlightLog))
			.then((flightLogs) => {
				flightLogs.sort(compareFlightLog);
				onComplete(flightLogs);
			})
			.catch((err) => {
				console.error(err);
				setState(State.Error);
			});
	}, [state, selectedFiles, onComplete]);

	return (
		<div className="container h-100">
			<div className="h-100 d-flex flex-column align-items-center justify-content-center gap-3">
				{state === State.Initial || state === State.InProgress ? (
					<>
						<div className="spinner-border" role="status" />
						<div>GPSログを解析中です</div>
					</>
				) : state === State.Error ? (
					<>
						<div className="fs-1">
							<BsExclamationCircle />
						</div>
						<div>ファイルを読み込めませんでした</div>
					</>
				) : (
					unreachable(state)
				)}
			</div>
		</div>
	);
});

export default Step2;
