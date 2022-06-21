export const unreachable = (x?: never): never => {
	throw new Error(`Reached unreachable code: ${x}`);
};
