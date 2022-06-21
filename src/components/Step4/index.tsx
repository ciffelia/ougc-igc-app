import React, { useEffect, useState } from 'react';
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs';
import { renameFile } from '@tauri-apps/api/fs';
import { unreachable } from '@/util';
import { base, dir, join } from '@/path';
import { FlightLog } from '@/flight/types';
import { nameFlightLog } from '@/flight/nameFlightLog';

export interface Props {
	flightLogs: FlightLog[];
	onComplete: () => void;
}

enum State {
	Processing,
	Completed,
	Error,
}

const Step4: React.FC<Props> = React.memo(function Step4({
	flightLogs,
	onComplete,
}) {
	const [state, setState] = useState(State.Processing);

	useEffect(() => {
		Promise.all(flightLogs.map(executeRename))
			.then(() => {
				setState(State.Completed);
			})
			.catch((err) => {
				console.error(err);
				setState(State.Error);
			});
	}, [flightLogs]);

	return (
		<div className="container h-100">
			<div className="h-100 d-flex flex-column align-items-center justify-content-center gap-3">
				{state === State.Processing ? (
					<>
						<div className="spinner-border" role="status" />
						<div>ファイル名を変更中です</div>
					</>
				) : state === State.Completed ? (
					<>
						<div className="fs-1">
							<BsCheckCircle />
						</div>
						<div>ファイル名の変更が完了しました</div>
						<button
							onClick={onComplete}
							type="button"
							className="btn btn-primary btn-lg"
						>
							最初の画面に戻る
						</button>
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

export default Step4;

const executeRename = async (flightLog: FlightLog): Promise<void> => {
	const originalDir = dir(flightLog.filepath);
	const originalName = base(flightLog.filepath);

	const newName = nameFlightLog(flightLog);
	if (originalName === newName) {
		return;
	}

	await renameFile(flightLog.filepath, join(originalDir, newName));
};
