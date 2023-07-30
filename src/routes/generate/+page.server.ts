import { OPENAI_KEY } from '$env/static/private';
import { db } from '$lib/server/db.js';
import { imageGroupTable, imageTable, profileTable } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	new: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(301, '/login');
		}

		const profile = await db
			.select()
			.from(profileTable)
			.where(eq(profileTable.user_id, session.user.id));
		if (profile.length === 0) {
			throw redirect(301, '/profile');
		}

		// call the open AI endpoint and generate the image
		const formData = await event.request.formData();
		const prompt = formData.get('prompt');

		const auth = `Bearer ${OPENAI_KEY}`;
		const res = await event.fetch('https://api.openai.com/v1/images/generations', {
			method: 'POST',
			headers: {
				Authorization: auth,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				prompt: prompt?.toString() || '',
				n: 1,
				size: '512x512'
			})
		});

		const resBody = (await res.json()) as {
			created: number;
			data: {
				url: string;
			}[];
		};

		console.log(resBody);

		// save the images
		if (resBody.data.length === 0) {
			throw error(500, 'Open AI error...');
		}

		// get the image blob
		const extResp = await fetch(resBody.data[0].url);
		const imageBlob = await extResp.blob();

		// save the blob to supabase storage
		const imageId = crypto.randomUUID();
		const imagePath = `${profile[0].id}/${imageId}`;
		const file = new File([imageBlob], imageId, { type: imageBlob.type });
		await event.locals.supabase.storage.from('generated_images').upload(imagePath, file);

		// save to the actual database
		const nGroupId = await db
			.insert(imageGroupTable)
			.values({
				owner_id: profile[0].id
			})
			.returning({ insertedId: imageGroupTable.id });
		await db.insert(imageTable).values({
			value: imagePath,
			query: prompt?.toString() || '',
			group_id: nGroupId[0].insertedId
		});

		throw redirect(300, `detail/${nGroupId[0].insertedId}`);
	}
};
