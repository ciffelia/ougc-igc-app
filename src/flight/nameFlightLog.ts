import { FlightLog } from './types';
import { base } from '@/path';

export const nameFlightLog = ({
	backSeat,
	filepath,
	frontSeat,
	land,
	number,
	takeoff,
}: FlightLog): string => {
	if (
		takeoff === undefined ||
		land === undefined ||
		(number === '' && frontSeat === '' && backSeat === '')
	) {
		// ファイル名はそのまま
		return base(filepath);
	}

	let name = takeoff.toLocal().toFormat('MMdd');

	if (number !== '') {
		name += '_' + `${number}`.padStart(2, '0');
	}
	if (frontSeat !== '') {
		name += `_${frontSeat}`;
	}
	if (backSeat !== '') {
		name += `_${backSeat}`;
	}

	return `${name}.igc`;
};
