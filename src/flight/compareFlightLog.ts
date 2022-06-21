import { FlightLog } from '@/flight/types';

export const compareFlightLog = (a: FlightLog, b: FlightLog): number => {
	if (a.takeoff === undefined && b.takeoff === undefined) {
		return 0;
	} else if (a.takeoff === undefined) {
		return 1;
	} else if (b.takeoff === undefined) {
		return -1;
	} else {
		return a.takeoff.toMillis() - b.takeoff.toMillis();
	}
};
