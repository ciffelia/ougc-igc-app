import React, { useState } from 'react';
import FlightLogTable from '@/components/Step3/FlightLogTable';
import { FlightLog } from '@/flight/types';

export interface Props {
	initialFlightLogs: FlightLog[];
	onComplete: () => void;
}

const Step3: React.FC<Props> = React.memo(function Step3({
	initialFlightLogs,
	onComplete,
}) {
	const [flightLogs, setFlightLogs] = useState<FlightLog[]>(initialFlightLogs);

	return (
		<div className="container py-4">
			<div>
				出発・着陸時刻を発航記録と照らし合わせ、搭乗者を入力してください。
			</div>
			<FlightLogTable
				flightLogs={flightLogs}
				onFlightLogsChange={setFlightLogs}
			/>
		</div>
	);
});

export default Step3;
