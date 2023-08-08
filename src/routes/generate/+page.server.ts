import { OPENAI_KEY } from '$env/static/private';
import prisma from '$lib/server/prisma.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	new: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(301, '/login');
		}

		const profile = await prisma.profile.findFirst({
			where: {
				user_id: session.user.id
			}
		});
		if (!profile) {
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

		// save the images
		if (resBody.data.length === 0) {
			throw error(500, 'Open AI error...');
		}

		// get the image blob
		const extResp = await fetch(resBody.data[0].url);
		const imageBlob = await extResp.blob();

		// save the blob to supabase storage
		const imageId = crypto.randomUUID();
		const imagePath = `${profile.id}/${imageId}`;
		const file = new File([imageBlob], imageId, { type: imageBlob.type });
		await event.locals.supabase.storage.from('generated_images').upload(imagePath, file);

		// save to the actual database
		const nGroup = await prisma.image_group.create({
			data: {
				owner_id: profile.id
			}
		});
		await prisma.image.create({
			data: {
				value: imagePath,
				query: prompt?.toString() || '',
				group_id: nGroup.id
			}
		});

		throw redirect(300, `detail/${nGroup.id}`);
	}
};
