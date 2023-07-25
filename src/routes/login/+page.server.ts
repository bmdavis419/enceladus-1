export const actions = {
	login: async (event) => {
		// TODO log the user in
	},
	signup: async (event) => {
		// get the form body from the event
		const formData = await event.request.formData();
		const firstName = formData.get('first_name');
		const lastName = formData.get('last_name');
		const email = formData.get('email');
		const password = formData.get('password');

		// TODO: validate user inputs server side

		// create the account in supabase
		const { data, error } = await event.locals.supabase.auth.signUp({
			email,
			password
			// options: {
			// 	emailRedirectTo: `${event.url.origin}/auth/callback`
			// }
		});

		console.log(data);

		console.log('error', error);

		console.log(firstName, lastName, email, password);
	}
};
