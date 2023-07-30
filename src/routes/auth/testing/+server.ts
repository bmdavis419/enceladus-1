import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	// logout of supabase
	await supabase.auth.signOut();

	throw redirect(301, '/');
};
