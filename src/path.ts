import { sep } from '@tauri-apps/api/path';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const base = (path: string): string => path.split(sep).at(-1)!;

export const join = (dir: string, filename: string): string =>
	`${dir}${sep}${filename}`;
