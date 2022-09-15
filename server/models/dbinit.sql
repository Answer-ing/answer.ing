CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "name" VARCHAR(50) NOT NULL,
  "user_id" INT NOT NULL UNIQUE
);

-- INSERT INTO client (name, email) VALUES ('Crystal', 'crystal@gmail.com');
-- SELECT * FROM client;
-- DELETE FROM client WHERE client.email='crystal@gmail.com';

CREATE TABLE "client_session" (
  "id" SERIAL PRIMARY KEY,
  "client_id" INT NOT NULL,
  "cookie_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expires_at" TIMESTAMPTZ
);

CREATE TABLE "company" (
  "id" SERIAL PRIMARY KEY,
  "created_by" INT,   -- do we want a "created_by" attribute?
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- do we want a created_at?
  "name" VARCHAR(100) NOT NULL UNIQUE
);
-- INSERT INTO company (name) VALUES ('Codesmith');
-- SELECT * FROM company;

CREATE TABLE "question" (
  "id" SERIAL PRIMARY KEY,
  "created_by" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify
--  "deleted_at" TIMESTAMPTZ, -- DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  "text" VARCHAR(500) NOT NULL UNIQUE
);

CREATE TABLE "answer" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT NOT NULL,
  "created_by" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify
--  "deleted_at" TIMESTAMPTZ, -- TIMESTAMPTZ NULL ON UPDATE CURRENT_TIMESTAMP
  "modified_at" TIMESTAMPTZ, -- TIMESTAMPTZ NULL ON UPDATE CURRENT_TIMESTAMP
  "text" VARCHAR(2500) NOT NULL UNIQUE
);

-- "question_company" not sure how to join table? please verify below
CREATE TABLE "question_company" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT NOT NULL,
  "company_id" INT NOT NULL,
  "created_by" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP -- do we want a created_at attribute?
);

-- CREATE TABLE "role" (
--   "id" SERIAL PRIMARY KEY,
--   "title" VARCHAR(100) NOT NULL,
--   "level" VARCHAR(50),
--   "industry" VARCHAR(100)
-- );

ALTER TABLE "client_session" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");

ALTER TABLE "company" ADD FOREIGN KEY ("created_by") REFERENCES "client" ("id");

ALTER TABLE "question" ADD FOREIGN KEY ("created_by") REFERENCES "client" ("id");

ALTER TABLE "answer" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");
ALTER TABLE "answer" ADD FOREIGN KEY ("created_by") REFERENCES "client" ("id");

ALTER TABLE "question_company" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");
ALTER TABLE "question_company" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
ALTER TABLE "question_company" ADD FOREIGN KEY ("created_by") REFERENCES "client" ("id");

-- CREATE TABLE "" (
--   "id" SERIAL PRIMARY KEY,
--   ""
-- );

-- CREATE TABLE "" (
--   "id" SERIAL PRIMARY KEY,
--   ""
-- );
