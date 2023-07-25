import { db } from '$lib/server/db';
import { profileTable } from '$lib/server/schema';

export const load = async () => {
	// query the profiles table
	// const profiles = await db.select().from(profileTable);

	return {
		testing: 'hi'
	};
};
