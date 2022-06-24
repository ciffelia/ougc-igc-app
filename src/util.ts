import { useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';

export const unreachable = (x?: never): never => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(`Reached unreachable code: ${x}`);
};

export const unique = <T>(arr: T[]): T[] => {
	return [...new Set(arr)];
};

export const useFileDrop = (onDrop: (files: string[]) => void): void => {
	useEffect(() => {
		const p = listen<string[]>('tauri://file-drop', (event) => {
			onDrop(event.payload);
		});

		return () => {
			void p.then((unlisten) => {
				unlisten();
			});
		};
	}, [onDrop]);
};
