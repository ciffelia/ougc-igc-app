import { readTextFile } from '@tauri-apps/api/fs';
import { DateTime } from 'luxon';
import { FlightLog, TakeoffAndLand } from './types';

export const readAndParseFlightLog = async (
	igcFilepath: string,
): Promise<FlightLog> => {
	const content = await readTextFile(igcFilepath);
	const parsed = parseIgc(content);

	return {
		filepath: igcFilepath,
		takeoff: parsed?.takeoff,
		land: parsed?.land,
		number: '',
		frontSeat: '',
		backSeat: '',
	};
};

export const parseIgc = (content: string): TakeoffAndLand | undefined => {
	const match = content.match(/^LLXV::TKOFFLAND:1,(\d{14}),(\d{14})$/mu);
	if (match === null) {
		return undefined;
	}

	const takeoff = parseTime(match[1]);
	const land = parseTime(match[2]);

	if (takeoff.isValid && land.isValid) {
		return { takeoff, land };
	} else {
		return undefined;
	}
};

const parseTime = (text: string): DateTime =>
	DateTime.fromFormat(text, 'yyyyMMddHHmmss', { zone: 'utc' });
