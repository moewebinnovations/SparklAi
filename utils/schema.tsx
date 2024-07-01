import { pgTable, text, timestamp, serial, varchar, boolean } from 'drizzle-orm/pg-core';

export const aiOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: text('formData').notNull(),
  aiResponse: text('aiResponse').notNull(),
  templateSlug: text('templateSlug').notNull(),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const UserSubscription = pgTable('UserSubscription', {
  id: serial('id').primaryKey(),
  email: varchar('email'),
  userName: varchar('userName'),
  active: boolean('active').notNull(),
  paymentId: varchar('paymentId'),
  joinDate: varchar('joinDate'),
  stripeCustomerId: varchar('stripeCustomerId'), // Add this field
});

export const userlikedtemplates = pgTable('userlikedtemplates', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull(),
  templateslug: text('templateslug').notNull(),
  createdat: timestamp('createdat').notNull().defaultNow(),
});


export const contactformsubmissions = pgTable('contactformsubmissions', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname').notNull(),
  lastname: varchar('lastname').notNull(),
  company: varchar('company'),
  email: varchar('email').notNull(),
  phonenumber: varchar('phonenumber'),
  message: text('message').notNull(),
  createdat: timestamp('createdat').notNull().defaultNow(),
});

