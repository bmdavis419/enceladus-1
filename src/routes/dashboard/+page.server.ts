import prisma from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(301, '/login');
	}

	// check for profile
	const profile = await prisma.profile.findFirst({
		where: {
			user_id: session.user.id
		}
	});
	if (!profile) {
		throw redirect(301, '/profile');
	}

	// get the image groups for this profile
	const groups = await prisma.image_group.findMany({
		where: {
			owner_id: profile.id
		}
	});

	return {
		profile,
		groups
	};
};
