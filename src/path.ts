import { sep } from '@tauri-apps/api/path';

export const base = (path: string): string => path.split(sep).at(-1)!;

export const join = (dir: string, filename: string): string =>
	`${dir}${sep}${filename}`;
