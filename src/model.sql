-- SET foreign_key_checks = 0;


-- Managers
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    role VARCHAR(20) NOT NULL DEFAULT 'Manager',
    login VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    rate DECIMAL(10, 2) NOT NULL DEFAULT 0.3,
    max_orders INT NOT NULL DEFAULT 2,
    password_date TIMESTAMP DEFAULT current_timestamp,
    orders_in_work INT
);
INSERT INTO users(role, login, password, name, password_date)
VALUES
    ('admin', 'admin', 'admin', 'admin', '2000-01-01 00:00:00'),
    ('admin', 'curator', 'curator', 'curator', '2000-01-01 00:00:00'),
    ('manager', 'manager', 'manager', 'manager', '2000-01-01 00:00:00');


-- Info
DROP TABLE IF EXISTS info;
CREATE TABLE info (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date TIMESTAMP DEFAULT current_timestamp,
    title VARCHAR(255) DEFAULT NULL,
    text VARCHAR(1000) DEFAULT NULL
);


-- Rates
-- DROP TABLE IF EXISTS price_rate_range;
-- CREATE TABLE price_rate_range (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     start DECIMAL(10, 2) NOT NULL,
--     end DECIMAL(10, 2) NOT NULL,
--     price DECIMAL(10, 2) NOT NULL
-- );
-- INSERT INTO price_rate_range (start, end, price) VALUES
--     (0, 799.99, 5.4),
--     (800, 1499.99, 4.9),
--     (1500, NULL, 4.3);

-- DROP TABLE IF EXISTS replenishment_rate_range;
-- CREATE TABLE replenishment_rate_range (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     start DECIMAL(10, 2),
--     end DECIMAL(10, 2),
--     price DECIMAL(10, 2)
-- );
-- INSERT INTO replenishment_rate_range (start, end, price) VALUES
--     (0, 1999.99, 5.5),
--     (1200, NULL, 5);


-- Order statuses
-- DROP TABLE IF EXISTS order_statuses;
-- CREATE TABLE order_statuses (
--     id INT PRIMARY KEY NOT NULL,
--     name VARCHAR(30) NOT NULL DEFAULT 'Draft',
--     name_rus VARCHAR(30) NOT NULL DEFAULT 'Черновик'
-- );
-- INSERT INTO order_statuses (id, name, name_rus) VALUES
--     (1, 'Draft', 'Черновик'),
--     (2, 'New', 'Новый'),
--     (3, 'Accepted', 'Принят менеджером'),
--     (4, 'Cancelled', 'Отменен');


-- -- Orders
-- DROP TABLE IF EXISTS orders;
-- CREATE TABLE orders (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     manager_id INT NOT NULL,
--     status_id INT NOT NULL,
--     date TIMESTAMP NOT NULL,
--     accepted_date TIMESTAMP NOT NULL,
--     price_in_currency DECIMAL(10, 2),
--     customer JSON NOT NULL,



--     CONSTRAINT fk_orders_manager_id
--     FOREIGN KEY (manager_id)
--     REFERENCES users(id),

--     CONSTRAINT fk_orders_status_id
--     FOREIGN KEY (status_id)
--     REFERENCES order_statuses(id)
-- );


-- Concepts
DROP TABLE IF EXISTS concepts;
CREATE TABLE concepts (
    id INT PRIMARY KEY NOT NULL,
    title_name VARCHAR(255) NOT NULL,
    concept_name VARCHAR(255) NOT NULL,
    title_url VARCHAR(255) NOT NULL,
    cover_url VARCHAR(255) NOT NULL,
    concept_date TIMESTAMP NOT NULL,
    created TIMESTAMP DEFAULT current_timestamp NOT NULL
);


-- Titles
DROP TABLE IF EXISTS titles;
CREATE TABLE titles(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    concept_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    cover VARCHAR(500),
    rating DECIMAL(10, 2),
    users INT,
    platforms VARCHAR(100),
    release_date TIMESTAMP DEFAULT '2000-01-01 00:00:00',
    publisher VARCHAR(255),
    genres VARCHAR(1000),
    voice VARCHAR(1000),
    screen_languages VARCHAR(1000),
    content VARCHAR(2000),
    short_id VARCHAR(50),
    product_type VARCHAR(100),
    has_offer_none BOOLEAN,
    has_ps_plus BOOLEAN,
    has_ea_access BOOLEAN,
    has_ubisoft_plus BOOLEAN,
    has_gta_plus BOOLEAN,
    offer_none_original_price DECIMAL(10, 2),
    offer_none_discount_price DECIMAL(10, 2),
    ps_plus_original_price DECIMAL(10, 2),
    ps_plus_discount_price DECIMAL(10, 2),
    ubisoft_plus_original_price DECIMAL(10, 2),
    ubisoft_plus_discount_price DECIMAL(10, 2),
    ea_access_original_price DECIMAL(10, 2),
    ea_access_discount_price DECIMAL(10, 2),
    gta_plus_original_price DECIMAL(10, 2),
    gta_plus_discount_price DECIMAL(10, 2),
    on_sale BOOLEAN DEFAULT 1,
    update_date TIMESTAMP DEFAULT current_timestamp,

    CONSTRAINT fk_titles_concept_id
    FOREIGN KEY (concept_id)
    REFERENCES concepts(id)
);


-- Functions
DROP FUNCTION IF EXISTS get_password_age;
DELIMITER $$
CREATE FUNCTION get_password_age(user_id INT) RETURNS INT
DETERMINISTIC READS SQL DATA
BEGIN
    DECLARE password_age INT;

    SELECT TIMESTAMPDIFF(DAY, password_date, current_timestamp)
    INTO password_age
    FROM users
    WHERE id = user_id;

    RETURN password_age;
END$$
DELIMITER ;


-- Views
DROP VIEW IF EXISTS v_managers;
CREATE VIEW v_managers AS
    SELECT
        u.id AS id,
        u.login AS login,
        u.name AS name,
        get_password_age(u.id) AS password_age,
        u.rate AS rate,
        100 AS orders_today,
        200 AS orders_all,
        300 AS orders_cancelled
    FROM users u
    WHERE u.role = 'manager';


DROP VIEW IF EXISTS v_info;
CREATE VIEW v_info AS
    SELECT
        i.id AS id,
        i.title AS title,
        i.text AS text,
        i.date AS date
    FROM info i
    ORDER BY i.date DESC
    LIMIT 1;

DROP VIEW IF EXISTS v_popular_new;
CREATE VIEW v_popular_new AS
    SELECT *
    FROM titles t
    WHERE t.on_sale = TRUE
    AND t.product_type = 'Game'
    ORDER BY t.rating DESC, t.release_date DESC
    LIMIT 10;

DROP VIEW IF EXISTS v_has_ps_plus_offer;
CREATE VIEW v_has_ps_plus_offer AS
    SELECT *
    FROM titles t
    WHERE t.on_sale = TRUE
    AND t.has_ps_plus
    ORDER BY t.rating DESC, t.release_date DESC
    LIMIT 10;

DROP VIEW IF EXISTS v_has_gta_plus_offer;
CREATE VIEW v_has_gta_plus_offer AS
    SELECT *
    FROM titles t
    WHERE t.on_sale = TRUE
    AND t.has_gta_plus
    ORDER BY t.rating DESC, t.release_date DESC
    LIMIT 10;

DROP VIEW IF EXISTS v_has_ubisoft_plus_offer;
CREATE VIEW v_has_ubisoft_plus_offer AS
    SELECT *
    FROM titles t
    WHERE t.on_sale = TRUE
    AND t.has_ubisoft_plus
    ORDER BY t.rating DESC, t.release_date DESC
    LIMIT 10;

DROP VIEW IF EXISTS v_has_ea_access_offer;
CREATE VIEW v_has_ea_access_offer AS
    SELECT *
    FROM titles t
    WHERE t.on_sale = TRUE
    AND t.has_ea_access
    ORDER BY t.rating DESC, t.release_date DESC
    LIMIT 10;

-- Procedures
DROP PROCEDURE IF EXISTS get_titles;
DELIMITER $$
CREATE PROCEDURE get_titles()
BEGIN
    SELECT *
    FROM titles pr
    ORDER BY pr.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_title_by_id;
DELIMITER $$
CREATE PROCEDURE get_title_by_id(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles pr
    WHERE pr.id = id;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_titles_by_concept;
DELIMITER $$
CREATE PROCEDURE get_titles_by_concept(IN concept_id INT)
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = concept_id
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_titles_by_search;
DELIMITER $$
CREATE PROCEDURE get_titles_by_search(IN search VARCHAR(255))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.title LIKE CONCAT('%', search, '%')
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_other;
DELIMITER $$
CREATE PROCEDURE get_other(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_games;
DELIMITER $$
CREATE PROCEDURE get_games(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Game'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_addons;
DELIMITER $$
CREATE PROCEDURE get_addons(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Add-On'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_game_packs;
DELIMITER $$
CREATE PROCEDURE get_game_packs(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Game Pack'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_virtual_currency;
DELIMITER $$
CREATE PROCEDURE get_virtual_currency(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Virtual Currency'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_bundles;
DELIMITER $$
CREATE PROCEDURE get_bundles(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Bundle'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_avatars;
DELIMITER $$
CREATE PROCEDURE get_avatars(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Avatar'
    ORDER BY ti.title;
END$$
DELIMITER;

DROP PROCEDURE IF EXISTS get_game_subscriptions;
DELIMITER $$
CREATE PROCEDURE get_game_subscriptions(IN id VARCHAR(500))
BEGIN
    SELECT *
    FROM titles ti
    WHERE ti.concept_id = (
        SELECT concept_id
        FROM titles ti
        WHERE ti.id = id
    )
    AND ti.id != id
    AND ti.product_type = 'Subscription'
    ORDER BY ti.title;
END$$
DELIMITER;


-- SET foreign_key_checks = 1;
