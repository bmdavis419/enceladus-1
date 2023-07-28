import { db } from '$lib/server/db.js';
import { profileTable } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		// get the form body from the event
		const formData = await event.request.formData();
		const firstName = formData.get('first_name');
		const lastName = formData.get('last_name');
		if (!firstName || !lastName) {
			throw error(400, 'Must send a valid first name and last name');
		}

		// create the user
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Must have be logged in to create an account');
		}
		await db.insert(profileTable).values({
			user_id: session.user.id,
			first_name: firstName.toString(),
			last_name: lastName.toString(),
			email: session.user.email
		});

		throw redirect(301, '/dashboard');
	}
};
