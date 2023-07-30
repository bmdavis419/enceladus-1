import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	// TODO: add a check to ensure that the user owns the images
	// fetch the group and it's images
	const group = await db.query.imageGroupTable.findFirst({
		where: (group, { eq }) => eq(group.id, parseInt(event.params.id)),
		with: {
			images: true
		}
	});

	if (!group) {
		throw error(404, 'Image group not found!');
	}

	const imageUrls: {
		query: string;
		value: string;
		createdAt: Date;
	}[] = [];

	for (let i = 0; i < group.images.length; i++) {
		const image = group.images[i];
		const publicUrl = await event.locals.supabase.storage
			.from('generated_images')
			.createSignedUrl(image.value || '', 60000);
		if (!publicUrl.error) {
			imageUrls.push({
				query: image.query || '',
				value: publicUrl.data.signedUrl,
				createdAt: image.inserted_at || new Date()
			});
		}
	}

	return { group, imageUrls };
};
