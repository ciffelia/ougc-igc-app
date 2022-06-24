import React, { useCallback, useId, useMemo } from 'react';
import { unique } from '@/util';
import { base } from '@/path';
import { FlightLog } from '@/flight/types';
import { nameFlightLog } from '@/flight/nameFlightLog';
import DataList from '@/components/Step3/DataList';

export interface Props {
	flightLogs: FlightLog[];
	onFlightLogsChange: (flightLogs: FlightLog[]) => void;
}

const FlightLogTable: React.FC<Props> = React.memo(function FlightLogTable({
	flightLogs,
	onFlightLogsChange,
}) {
	const frontSeatOptions = useMemo(
		() => unique(flightLogs.map((log) => log.frontSeat)),
		[flightLogs],
	);
	const backSeatOptions = useMemo(
		() => unique(flightLogs.map((log) => log.backSeat)),
		[flightLogs],
	);

	const handleFlightLogChange = useCallback(
		(i: number, flightLog: FlightLog) => {
			const newFlightLogs = [...flightLogs];
			newFlightLogs[i] = flightLog;
			onFlightLogsChange(newFlightLogs);
		},
		[flightLogs, onFlightLogsChange],
	);

	return (
		<table className="table align-middle">
			<thead>
				<tr>
					<th scope="col">元ファイル名</th>
					<th scope="col">日付</th>
					<th scope="col">出発</th>
					<th scope="col">着陸</th>
					<th scope="col">発航No.</th>
					<th scope="col">前席搭乗者</th>
					<th scope="col">後席搭乗者</th>
					<th scope="col">変更後ファイル名</th>
				</tr>
			</thead>
			<tbody>
				{flightLogs.map((l, i) => (
					<FlightLogTableRow
						key={i}
						flightLog={l}
						frontSeatOptions={frontSeatOptions}
						backSeatOptions={backSeatOptions}
						onNumberChange={(number) =>
							handleFlightLogChange(i, { ...l, number })
						}
						onFrontSeatChange={(frontSeat) =>
							handleFlightLogChange(i, { ...l, frontSeat })
						}
						onBackSeatChange={(backSeat) =>
							handleFlightLogChange(i, { ...l, backSeat })
						}
					/>
				))}
			</tbody>
		</table>
	);
});

interface FlightLogTableRowProps {
	flightLog: FlightLog;
	frontSeatOptions: string[];
	backSeatOptions: string[];
	onNumberChange: (value: string) => void;
	onFrontSeatChange: (value: string) => void;
	onBackSeatChange: (value: string) => void;
}

const FlightLogTableRow: React.FC<FlightLogTableRowProps> = React.memo(
	function FlightLogTableRow({
		flightLog,
		frontSeatOptions,
		backSeatOptions,
		onNumberChange,
		onFrontSeatChange,
		onBackSeatChange,
	}) {
		const isTimeAvailable =
			flightLog.takeoff !== undefined && flightLog.land !== undefined;

		const originalFilename = useMemo(
			() => base(flightLog.filepath),
			[flightLog.filepath],
		);
		const newFilename = useMemo(() => nameFlightLog(flightLog), [flightLog]);

		const frontSeatDataListId = useId();
		const backSeatDataListId = useId();
		const filteredFrontSeatOptions = useMemo(
			() => frontSeatOptions.filter((x) => x !== flightLog.frontSeat),
			[frontSeatOptions, flightLog.frontSeat],
		);
		const filteredBackSeatOptions = useMemo(
			() => backSeatOptions.filter((x) => x !== flightLog.backSeat),
			[backSeatOptions, flightLog.backSeat],
		);

		const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> =
			useCallback(
				(e) => {
					onNumberChange(e.target.value);
				},
				[onNumberChange],
			);
		const handleFrontSeatChange: React.ChangeEventHandler<HTMLInputElement> =
			useCallback(
				(e) => {
					onFrontSeatChange(e.target.value);
				},
				[onFrontSeatChange],
			);
		const handleBackSeatChange: React.ChangeEventHandler<HTMLInputElement> =
			useCallback(
				(e) => {
					onBackSeatChange(e.target.value);
				},
				[onBackSeatChange],
			);

		return (
			<tr>
				<th scope="row">{originalFilename}</th>
				<td>
					{flightLog.takeoff !== undefined
						? flightLog.takeoff.toLocal().toFormat('yyyy/MM/dd')
						: '不明'}
				</td>
				<td>
					{flightLog.takeoff !== undefined
						? flightLog.takeoff.toLocal().toFormat('HH:mm')
						: '不明'}
				</td>
				<td>
					{flightLog.land !== undefined
						? flightLog.land.toLocal().toFormat('HH:mm')
						: '不明'}
				</td>
				<td style={{ width: '100px' }}>
					{isTimeAvailable ? (
						<input
							type="number"
							className="form-control"
							value={flightLog.number}
							onChange={handleNumberChange}
							min={1}
							max={99}
							aria-label="発航No."
						/>
					) : (
						'-'
					)}
				</td>
				<td style={{ width: '120px' }}>
					{isTimeAvailable ? (
						<>
							<input
								type="text"
								className="form-control"
								value={flightLog.frontSeat}
								onChange={handleFrontSeatChange}
								placeholder="空席"
								list={frontSeatDataListId}
								aria-label="前席搭乗者"
							/>
							<DataList
								id={frontSeatDataListId}
								options={filteredFrontSeatOptions}
							/>
						</>
					) : (
						'-'
					)}
				</td>
				<td style={{ width: '120px' }}>
					{isTimeAvailable ? (
						<>
							<input
								type="text"
								className="form-control"
								value={flightLog.backSeat}
								onChange={handleBackSeatChange}
								placeholder="空席"
								list={backSeatDataListId}
								aria-label="後席搭乗者"
							/>
							<DataList
								id={backSeatDataListId}
								options={filteredBackSeatOptions}
							/>
						</>
					) : (
						'-'
					)}
				</td>
				<td style={{ width: '220px' }}>
					{newFilename === originalFilename ? '（変更なし）' : newFilename}
				</td>
			</tr>
		);
	},
);

export default FlightLogTable;
