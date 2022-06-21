import { DateTime } from 'luxon';

export interface FlightLog {
	filepath: string;
	takeoff?: DateTime;
	land?: DateTime;
	number: string;
	frontSeat: string;
	backSeat: string;
}

export interface TakeoffAndLand {
	takeoff: DateTime;
	land: DateTime;
}
