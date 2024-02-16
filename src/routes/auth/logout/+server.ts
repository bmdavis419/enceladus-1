import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	// logout of supabase
	await supabase.auth.signOut();

	redirect(301, '/');

	// return new Response();
};
