import React, { useCallback, useState } from 'react';
import FlightLogTable from '@/components/Step3/FlightLogTable';
import { FlightLog } from '@/flight/types';

export interface Props {
	initialFlightLogs: FlightLog[];
	onComplete: (flightLogs: FlightLog[]) => void;
}

const Step3: React.FC<Props> = React.memo(function Step3({
	initialFlightLogs,
	onComplete,
}) {
	const [flightLogs, setFlightLogs] = useState<FlightLog[]>(initialFlightLogs);

	const handleExecuteClick = useCallback(() => {
		onComplete(flightLogs);
	}, [onComplete, flightLogs]);

	return (
		<div className="container-fluid p-4">
			<div>
				出発・着陸時刻を発航記録と照らし合わせ、発航No.と搭乗者を入力してください。
			</div>
			<FlightLogTable
				flightLogs={flightLogs}
				onFlightLogsChange={setFlightLogs}
			/>
			<button
				onClick={handleExecuteClick}
				type="button"
				className="btn btn-primary btn-lg"
			>
				ファイル名を変更
			</button>
		</div>
	);
});

export default Step3;
