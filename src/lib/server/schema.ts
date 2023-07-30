import { integer, text, pgTable, uuid, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const profileTable = pgTable('profile', {
	id: serial('id').primaryKey(),
	last_name: varchar('last_name', { length: 100 }),
	first_name: varchar('first_name', { length: 100 }),
	email: varchar('email', { length: 100 }),
	user_id: uuid('user_id').notNull()
});

export const profileTableRelations = relations(profileTable, ({ many }) => ({
	groups: many(imageGroupTable)
}));

export const imageGroupTable = pgTable('image_group', {
	id: serial('id').primaryKey(),
	inserted_at: timestamp('inserted_at'),
	updated_at: timestamp('updated_at'),
	owner_id: integer('owner_id')
});

export const imageGroupTableRelations = relations(imageGroupTable, ({ many, one }) => ({
	profile: one(profileTable, {
		fields: [imageGroupTable.owner_id],
		references: [profileTable.id]
	}),
	images: many(imageTable)
}));

export const imageTable = pgTable('image', {
	id: serial('id').primaryKey(),
	inserted_at: timestamp('inserted_at'),
	updated_at: timestamp('updated_at'),
	value: text('value'),
	query: text('query'),
	group_id: integer('group_id')
});

export const imageTableRelations = relations(imageTable, ({ one }) => ({
	image_group: one(imageGroupTable, {
		fields: [imageTable.group_id],
		references: [imageGroupTable.id]
	})
}));
