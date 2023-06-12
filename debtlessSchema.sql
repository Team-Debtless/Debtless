

CREATE TABLE public.user (
	"_id" serial PRIMARY KEY,
	"first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
	"description" varchar,
	"email" varchar  NOT NULL UNIQUE,
	"monthly_income" money NOT NULL,
	"monthly_budget" money NOT NULL,
	"password" varchar  NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE public.expense (
  "_id" serial PRIMARY KEY,
  "item" varchar NOT NULL,
  "category_id" bigint NOT NULL,
  "price" money NOT NULL,
  "user_id" bigint NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE public.category (
	"_id" serial PRIMARY KEY,
  "name" varchar NOT NULL
);

ALTER TABLE public.expense ADD FOREIGN KEY ("category_id") REFERENCES public.category ("_id");
ALTER TABLE public.expense ADD FOREIGN KEY ("user_id") REFERENCES public.user ("_id");

-- psql -d postgres://cdtsufqu:KrK8Hyu93UEo1ULxk0DiJbNj7QPQDIdV@lallah.db.elephantsql.com/cdtsufqu -f debtlessSchema.sql

INSERT INTO public.category (name) VALUES('Auto & Transport');
INSERT INTO public.category (name) VALUES('Bills and Utilities');
INSERT INTO public.category (name) VALUES('Dining and Drinks');
INSERT INTO public.category (name) VALUES('Education');
INSERT INTO public.category (name) VALUES('Entertainment and Recreation');
INSERT INTO public.category (name) VALUES('Groceries');
INSERT INTO public.category (name) VALUES('Health and Wellness');
INSERT INTO public.category (name) VALUES('Home and Garden');
INSERT INTO public.category (name) VALUES('Loan Payment');
INSERT INTO public.category (name) VALUES('Medical');
INSERT INTO public.category (name) VALUES('Shopping');
INSERT INTO public.category (name) VALUES('Travel and Vacation');
INSERT INTO public.category (name) VALUES('Misc.');


-- insert dummy users

INSERT INTO public.user (first_name, last_name, description, email, monthly_income, monthly_budget, password, created_at) VALUES ("Bryan", "Trang", "codesmith student", "bryan@email.com", 5000, 100, "password", )


-- insert dummy expenses