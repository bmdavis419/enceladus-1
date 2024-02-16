import { db } from '$lib/server/db.js';

export const load = async ({ locals: { getSession } }) => {
	const test = await db.query.profileTable.findMany()

	console.log(test)

	return {
		test,
		session: await getSession()
	};
};
