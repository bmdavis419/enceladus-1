import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = await event.locals.getSession();

	if (session) {
		redirect(301, '/profile');
	}
	return {};
};

export const actions = {
	default: async ({ locals }) => {
		const oAuth = await locals.supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				skipBrowserRedirect: true,
				redirectTo: 'http://localhost:5173/auth/callback'
			}
		});

		console.log('SENT', oAuth.data.url);

		if (oAuth.data.url) {
			redirect(301, oAuth.data.url);
		}

		error(500, oAuth.error?.message);
	}
};
