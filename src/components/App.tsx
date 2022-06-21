import React, { useCallback, useState } from 'react';
import { unreachable } from '@/util';
import { FlightLog } from '@/flight/types';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

type AppState =
	| { step: 1 }
	| { step: 2; selectedFiles: string[] }
	| { step: 3; flightLogs: FlightLog[] }
	| { step: 4; flightLogs: FlightLog[] };

const App: React.FC = React.memo(function App() {
	const [state, setState] = useState<AppState>({ step: 1 });

	const handleStep1Complete = useCallback((selectedFiles: string[]) => {
		setState({ step: 2, selectedFiles });
	}, []);
	const handleStep2Complete = useCallback((flightLogs: FlightLog[]) => {
		setState({ step: 3, flightLogs });
	}, []);
	const handleStep3Complete = useCallback((flightLogs: FlightLog[]) => {
		setState({ step: 4, flightLogs });
	}, []);

	if (state.step === 1) {
		return <Step1 onComplete={handleStep1Complete} />;
	} else if (state.step === 2) {
		return (
			<Step2
				selectedFiles={state.selectedFiles}
				onComplete={handleStep2Complete}
			/>
		);
	} else if (state.step === 3) {
		return (
			<Step3
				initialFlightLogs={state.flightLogs}
				onComplete={handleStep3Complete}
			/>
		);
	} else if (state.step === 4) {
		return <Step4 flightLogs={state.flightLogs} />;
	} else {
		return unreachable(state);
	}
});

export default App;
