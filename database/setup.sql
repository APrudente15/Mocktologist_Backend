DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS drink;
DROP TABLE IF EXISTS userAccount;

CREATE TABLE userAccount (
    user_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password char(60) NOT NULL,
    vegan boolean NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE drink (
    drink_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    user_id INT UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    response_body varchar(65535) NOT NULL,
    tastes varchar(255) NOT NULL,
    done boolean NOT NULL,
    vegan boolean NOT NULL,
    rating int,
    image varchar(255),
    PRIMARY KEY (drink_id),
    FOREIGN KEY (user_id) REFERENCES userAccount (user_id)
);

CREATE TABLE token (
    token_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    user_id INT UNIQUE NOT NULL,
    token char(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES userAccount (user_id)
);

INSERT INTO userAccount (fname, lname, email, password, vegan) VALUES ('Henrietta', 'Adeniran', 'henrie@gmail.com', 'Henrie91', true );
INSERT INTO userAccount (fname, lname, email, password, vegan) VALUES ('David', 'Taylor', 'david@example.com', 'david123', false);
INSERT INTO userAccount (fname, lname, email, password, vegan) VALUES ('Emily', 'Brown', 'emily@example.com', 'emily789', true);
INSERT INTO userAccount (fname, lname, email, password, vegan) VALUES ('Michael', 'Johnson', 'michael@example.com', 'michael456', false);
INSERT INTO userAccount (fname, lname, email, password, vegan) VALUES ('Alice', 'Smith', 'alice@example.com', 'alice123', true);

INSERT INTO drink ( user, name, body, tastes, done, vegan, rating, image) VALUES (1, 'Sparkling Citrus Splash', 'Mix freshly squeezed orange juice, lemon juice, and a splash of sparkling water. Garnish with a slice of orange and a sprig of mint. Serve over ice.', 'Sweet', true, true, 9, 'https://images.app.goo.gl/vXpvBnDdTBa2gBhG9');
INSERT INTO drink ( user, name, body, tastes, done, vegan, rating, image) VALUES (2, 'Berry Bliss Cooler', 'Muddle fresh strawberries and blueberries with a hint of agave syrup. Add freshly squeezed lime juice and coconut water. Shake well and strain into a glass filled with ice. Garnish with a skewer of mixed berries.', 'Sweet', true, true, 8, 'https://images.app.goo.gl/bnfYFHqBYgaWDC4YA');
INSERT INTO drink ( user, name, body, tastes, done, vegan, rating, image) VALUES (3, 'Sour Cherry Bomb', 'Muddle fresh cherries with lime juice and a hint of maple syrup. Shake with ice and strain into a glass. Top with a splash of club soda and garnish with a cherry skewer.', 'Sour', true, true, 6, 'https://images.app.goo.gl/SsijcU37AjT1y8vt7');
INSERT INTO drink ( user, name, body, tastes, done, vegan, rating, image) VALUES (4, 'Mocha Cream Dream', 'Brew a strong cup of espresso or very dark coffee. Allow it to cool. In a shaker, combine the cooled coffee with chocolate syrup, a splash of heavy cream, and a dash of vanilla extract. Shake well with ice and strain into a glass filled with ice cubes. Top with whipped cream and drizzle with additional chocolate syrup.', 'Coffee', true, false, 9, 'https://images.app.goo.gl/moAwtu6qqqTsK2Aq7');
INSERT INTO drink ( user, name, body, tastes, done, vegan, rating, image) VALUES (5, 'Caramel Espresso Delight', 'Brew a shot of espresso or very strong coffee. Allow it to cool. In a glass, mix the cooled espresso with caramel syrup and a splash of half-and-half cream. Stir well. Add ice cubes if desired. Garnish with whipped cream and a drizzle of caramel sauce.', 'Coffee', false, false, 8, 'https://images.app.goo.gl/A3FMCYPXRrh76t9p9');

INSERT INTO token ( user_id, token) VALUES (1, 'a45bb889-53c8-4505-bada-89344d934dbc');
INSERT INTO token ( user_id, token) VALUES (2, '8228b00d-0556-4588-8e33-f27335b49038');
INSERT INTO token ( user_id, token) VALUES (3, 'b6b7d3b1-1f3e-485a-973a-2df3ce85f2fe');
INSERT INTO token ( user_id, token) VALUES (4, '9d2143d6-54f7-48ec-9337-3264af185984');
INSERT INTO token ( user_id, token) VALUES (5, 'ab80dec7-c8a0-4996-9570-c0cbfc4b3ec4');