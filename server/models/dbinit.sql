CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- need to verify
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE "session" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "cookie_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify
  "expires_at" TIMESTAMPTZ
);

CREATE TABLE "company" (
  "id" SERIAL PRIMARY KEY,
  "created_by" INT,   -- do we want a "created_by" attribute?
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify/do we want a created_at?
  "name" VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE "question" (
  "id" SERIAL PRIMARY KEY,
  "created_by" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify
  "deleted_at" TIMESTAMPTZ, -- DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  "text" VARCHAR(500) NOT NULL UNIQUE,
  "role" INT NOT NULL,          -- do we want this to be an INT or VARCHAR?
  "level" VARCHAR(50)
);

CREATE TABLE "answer" (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT NOT NULL,
  "created_by" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- verify
  "deleted_at" TIMESTAMPTZ, -- TIMESTAMPTZ NULL ON UPDATE CURRENT_TIMESTAMP
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

ALTER TABLE "session" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
-- ALTER TABLE "session" ADD FOREIGN KEY ("cookie_id") REFERENCES "" ("id");

ALTER TABLE "company" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id");

ALTER TABLE "question" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id");
-- ALTER TABLE "question" ADD FOREIGN KEY ("role") REFERENCES "role" ("id");

ALTER TABLE "answer" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");
ALTER TABLE "answer" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id");

ALTER TABLE "question_company" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");
ALTER TABLE "question_company" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");
ALTER TABLE "question_company" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id");

-- CREATE TABLE "" (
--   "id" SERIAL PRIMARY KEY,
--   ""
-- );

-- CREATE TABLE "" (
--   "id" SERIAL PRIMARY KEY,
--   ""
-- );
