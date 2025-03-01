CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- Users
DROP TABLE IF EXISTS crm_users;
CREATE TABLE crm_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'manager' NOT NULL,
    rate FLOAT DEFAULT 0.3 NOT NULL,
    max_orders INTEGER DEFAULT 2 NOT NULL,
    password_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

INSERT INTO crm_users (login, password, name, role)
VALUES
    ('admin', 'admin', 'admin', 'admin'),
    ('manager', 'manager', 'manager', 'manager');


-- Session
DROP TABLE IF EXISTS crm_sessions;
CREATE TABLE crm_sessions (
    session_token VARCHAR(255) PRIMARY KEY,
    user_id UUID NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "crm_users"(id) ON DELETE CASCADE
);


-- Concepts
DROP TABLE IF EXISTS concepts;
CREATE TABLE concepts (
    id SERIAL PRIMARY KEY,
    title_name TEXT NOT NULL,
    concept_name TEXT NOT NULL,
    title_url TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NULL
);


-- Titles
DROP TABLE IF EXISTS titles;
CREATE TABLE titles (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    concept_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    cover TEXT,
    background TEXT,
    rating FLOAT,
    description TEXT,
    legal TEXT,
    users INTEGER,
    platforms TEXT,
    release_date TIMESTAMPTZ DEFAULT NULL,
    publisher TEXT,
    genres TEXT,
    voice TEXT,
    screen_languages TEXT,
    content TEXT,
    short_id TEXT,
    product_type TEXT,
    has_offer_none BOOLEAN,
    has_ps_plus BOOLEAN,
    has_ea_play BOOLEAN,
    has_ubisoft_plus BOOLEAN,
    has_gta_plus BOOLEAN,
    offer_none_original_price FLOAT,
    offer_none_discount_price FLOAT,
    ps_plus_original_price FLOAT,
    ps_plus_discount_price FLOAT,
    ubisoft_plus_original_price FLOAT,
    ubisoft_plus_discount_price FLOAT,
    ea_play_original_price FLOAT,
    ea_play_discount_price FLOAT,
    gta_plus_original_price FLOAT,
    gta_plus_discount_price FLOAT,
    on_sale BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_titles_concept_id
    FOREIGN KEY (concept_id)
    REFERENCES concepts(id)
);

DROP INDEX IF EXISTS idx_titles_title;
CREATE INDEX idx_titles_title ON titles(title);


-- Subscriprions
DROP TABLE IF EXISTS subscriptions;
CREATE TABLE subscriptions (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    title TEXT NOT NULL,
    term INTEGER NOT NULL,
    term_description TEXT NOT NULL,
    original_price FLOAT,
    discount_price FLOAT,
    on_sale BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO subscriptions (
    id, category, title, name, description, term, term_description, original_price
)
VALUES
    ('PS-PLUS-DELUXE_1', 'ps-plus', 'Playstation Plus', 'PS+ Deluxe', 'Играй в игры бесплатно с подпиской Playstation Plus', 1, '1 Month', 1001),
    ('PS-PLUS-DELUXE_2', 'ps-plus', 'Playstation Plus', 'PS+ Deluxe', 'Играй в игры бесплатно с подпиской Playstation Plus', 2, '2 Months', 2002),
    ('PS-PLUS-DELUXE_3', 'ps-plus', 'Playstation Plus', 'PS+ Deluxe', 'Играй в игры бесплатно с подпиской Playstation Plus', 3, '3 Months', 3003),
    ('PS-PLUS-EXTRA_1', 'ps-plus', 'Playstation Plus', 'PS+ Extra', 'Играй в игры бесплатно с подпиской Playstation Plus', 1, '1 Month', 1004),
    ('PS-PLUS-EXTRA_2', 'ps-plus', 'Playstation Plus', 'PS+ Extra', 'Играй в игры бесплатно с подпиской Playstation Plus', 2, '2 Months', 2005),
    ('PS-PLUS-EXTRA_3', 'ps-plus', 'Playstation Plus', 'PS+ Extra', 'Играй в игры бесплатно с подпиской Playstation Plus', 3, '3 Months', 3006),
    ('PS-PLUS-ESSENTIAL_1', 'ps-plus', 'Playstation Plus', 'PS+ Essential', 'Играй в игры бесплатно с подпиской Playstation Plus', 1, '1 Month', 1007),
    ('PS-PLUS-ESSENTIAL_2', 'ps-plus', 'Playstation Plus', 'PS+ Essential', 'Играй в игры бесплатно с подпиской Playstation Plus', 2, '2 Months', 2008),
    ('PS-PLUS-ESSENTIAL_3', 'ps-plus', 'Playstation Plus', 'PS+ Essential', 'Играй в игры бесплатно с подпиской Playstation Plus', 3, '3 Months', 3009),
    ('UBISOFT-PLUS_1', 'ubisoft-plus', 'Ubisoft+', 'Ubisoft+', 'Играй в игры от Ubisoft с подпиской Ubisoft+', 1, '1 Month', 1000),
    ('GTA-PLUS_1', 'gta-plus', 'GTA+', 'GTA+', 'Играй в игры от Rockstar Games с подпсикой GTA+ и получай бонусы', 1, '1 Month', 1000),
    ('EA-PLAY_1', 'ea-play', 'EA Play', 'EA Play', 'Получи доступ к каталогу игр от EA', 1, '1 Month', 1000),
    ('EA-PLAY_12', 'ea-play', 'EA Play', 'EA Play', 'Получи доступ к каталогу игр от EA', 12, '12 Months', 1000);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_date
BEFORE UPDATE ON concepts
FOR EACH ROW
EXECUTE FUNCTION update_updated_date();

CREATE TRIGGER set_updated_date
BEFORE UPDATE ON titles
FOR EACH ROW
EXECUTE FUNCTION update_updated_date();

CREATE TRIGGER set_updated_date
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_date();


-- Views
DROP VIEW IF EXISTS v_concepts_with_discounts;
CREATE VIEW v_concepts_with_discounts AS
WITH sorted_titles AS (
    SELECT DISTINCT
        c.id AS concept_id,
        c.title_name AS title_name,
        c.concept_name AS concept_name,
        c.title_url AS title_url,
        c.cover_url AS title_cover,
        t.release_date
    FROM titles t
    JOIN concepts c ON t.concept_id = c.id
    WHERE
        t.on_sale = TRUE AND
        (
            offer_none_discount_price != offer_none_original_price OR
            PS-PLUS_discount_price != PS-PLUS_original_price OR
            gta_plus_discount_price != gta_plus_original_price OR
            ea_play_discount_price != ea_play_original_price OR
            ubisoft_plus_discount_price != ubisoft_plus_original_price
        )
)
SELECT
    concept_id,
    title_name,
    concept_name,
    title_url,
    title_cover
FROM sorted_titles
ORDER BY release_date DESC;


DROP VIEW IF EXISTS v_titles;
CREATE VIEW v_titles AS
SELECT * FROM titles t
WHERE t.on_sale IS TRUE;


DROP VIEW IF EXISTS v_genres;
CREATE VIEW v_genres AS
SELECT DISTINCT trim(unnest(string_to_array(genres, ','))) AS genre
FROM titles
WHERE
    genres IS NOT NULL
ORDER BY genre;


DROP VIEW IF EXISTS v_product_types;
CREATE VIEW v_product_types AS
SELECT DISTINCT trim(unnest(string_to_array(product_type, ','))) AS product_type
FROM titles
WHERE
    product_type IS NOT NULL
ORDER BY product_type;


DROP VIEW IF EXISTS v_subscriptions;
CREATE VIEW v_subscriptions AS
SELECT * FROM subscriptions s
WHERE s.on_sale IS TRUE;


-- View selections
DROP VIEW IF EXISTS v_promo;
CREATE VIEW v_promo AS
SELECT * FROM titles t
WHERE t.id IN (
    'EP1004-PPSA01721_00-GTAOANDSPUPGRADE',
    'EP0001-PPSA22100_00-GAME000000000000',
    'EP9000-CUSA03173_00-BLOODBORNE0000EU',
    'EP9000-PPSA08338_00-MARVELSPIDERMAN2',
    'EP8534-PPSA21781_00-0845649175857950'
)
ORDER BY users;
