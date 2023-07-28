import { db } from '$lib/server/db.js';
import { profileTable } from '$lib/server/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(301, '/login');
	}

	// check for profile
	const profile = await db
		.select()
		.from(profileTable)
		.where(eq(profileTable.user_id, session.user.id));
	if (profile.length === 0) {
		throw redirect(301, '/profile');
	}

	return {
		profile
	};
};
