BEGIN;

CREATE SEQUENCE public.analytics_id_seq AS integer;

CREATE TABLE public.analytics_events (
  id integer NOT NULL DEFAULT nextval('public.analytics_id_seq'::regclass),
  source varchar(255) NOT NULL,
  path varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  test boolean NOT NULL DEFAULT false,
  event_id uuid,
  CONSTRAINT analytics_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE public.analytics_id_seq
  OWNED BY public.analytics_events.id;

CREATE UNIQUE INDEX analytics_events_event_id_idx
  ON public.analytics_events (event_id);

CREATE TABLE public.analytics_settings (
  id integer NOT NULL,
  reset_at timestamptz NOT NULL,
  CONSTRAINT analytics_settings_pkey PRIMARY KEY (id),
  CONSTRAINT analytics_settings_id_check CHECK (id = 1)
);

INSERT INTO public.analytics_settings (id, reset_at)
VALUES (1, now());

CREATE TABLE public.lia_applications (
  id bigint GENERATED ALWAYS AS IDENTITY,
  company_name text NOT NULL,
  location text NOT NULL,
  workplace_model text,
  periods integer[] NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  website text DEFAULT '',
  CONSTRAINT lia_applications_pkey PRIMARY KEY (id),
  CONSTRAINT periods_not_empty CHECK (cardinality(periods) > 0),
  CONSTRAINT valid_periods CHECK (periods <@ ARRAY[1, 2])
);

CREATE SEQUENCE public.users_id_seq AS integer;

CREATE TABLE public.users (
  id integer NOT NULL DEFAULT nextval('public.users_id_seq'::regclass),
  email varchar(255) NOT NULL,
  fname varchar(255),
  password_hash varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  lname varchar(255),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE public.users_id_seq
  OWNED BY public.users.id;

CREATE UNIQUE INDEX users_email_lower_idx
  ON public.users (lower(email::text));

CREATE TABLE public.user_sessions (
  sid varchar NOT NULL,
  sess json NOT NULL,
  expire timestamp(6) without time zone NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (sid)
);

CREATE INDEX "IDX_session_expire"
  ON public.user_sessions (expire);

COMMIT;
