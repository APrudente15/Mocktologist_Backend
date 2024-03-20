DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS drink;
DROP TABLE IF EXISTS userAccount;

CREATE TABLE userAccount (
    user_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password char(60) NOT NULL,
    vegan boolean NOT NULL,
    image varchar(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE drink (
    drink_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name varchar(255) NOT NULL,
    response_body varchar(65535) NOT NULL,
    tastes varchar(255) NOT NULL,
    done boolean DEFAULT 'false',
    vegan boolean NOT NULL,
    rating int,
    image varchar(255),
    PRIMARY KEY (drink_id),
    FOREIGN KEY (user_id) REFERENCES userAccount (user_id)
);

CREATE TABLE token (
    token_id INT UNIQUE GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token char(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES userAccount (user_id)
);

INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ('Henrietta', 'Adeniran', 'henrie@gmail.com', 'Henrie91', true, '../assets/blank.png');
INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ('David', 'Taylor', 'david@example.com', 'david123', false, '../assets/blank.png');
INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ('Emily', 'Brown', 'emily@example.com', 'emily789', true, '../assets/blank.png');
INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ('Michael', 'Johnson', 'michael@example.com', 'michael456', false, '../assets/blank.png');
INSERT INTO userAccount (fname, lname, email, password, vegan, image) VALUES ('Alice', 'Smith', 'alice@example.com', 'alice123', true, '../assets/blank.png');

INSERT INTO drink ( user_id, name, response_body, tastes, done, vegan, rating, image) VALUES (1, 'Sparkling Citrus Splash', 'Taste Profile: Sweet and tangy.
Ingredients:
Freshly squeezed orange juice
Freshly squeezed lemon juice
Sparkling water
Ice cubes
Orange slices and mint leaves for garnish (optional)
Instructions:
Start by pouring freshly squeezed orange juice and lemon juice into a glass.
Add sparkling water to the juices. The sparkling water adds effervescence and lightness to the mocktail.
Stir gently to combine the ingredients.
Add ice cubes to chill the mocktail.
Optionally, garnish with a slice of orange and a sprig of mint for a refreshing touch.
Nutritional Info:
The nutritional information will vary depending on the quantity of each ingredient used, but generally, this mocktail is low in calories and provides vitamin C from the citrus juices.', 'Sweet', true, true, 9, 'https://images.app.goo.gl/vXpvBnDdTBa2gBhG9');
INSERT INTO drink ( user_id, name, response_body, tastes, done, vegan, rating, image) VALUES (2, 'Berry Bliss Cooler', 'Taste Profile: Sweet and tangy.
Ingredients:
Fresh strawberries
Fresh blueberries
Agave syrup
Freshly squeezed lime juice
Coconut water
Ice cubes
Mixed berries for garnish (optional)
Instructions:
Begin by muddling fresh strawberries and blueberries with agave syrup in a cocktail shaker. Muddling helps release the juices and flavors from the berries.
Add freshly squeezed lime juice to the shaker for a tangy kick.
Pour coconut water into the shaker. Coconut water adds a subtle sweetness and electrolytes.
Shake the ingredients well with ice to chill the mocktail and combine the flavors.
Strain the mixture into a glass filled with ice cubes.
Optionally, garnish with a skewer of mixed berries for an extra burst of flavor and visual appeal.
Nutritional Info:
This mocktail is hydrating and low in calories. It provides antioxidants from the berries and electrolytes from the coconut water.', 'Sweet', true, true, 8, 'https://images.app.goo.gl/bnfYFHqBYgaWDC4YA');
INSERT INTO drink ( user_id, name, response_body, tastes, done, vegan, rating, image) VALUES (3, 'Sour Cherry Bomb', 'Taste Profile: Sour with a hint of sweetness.
Ingredients:
Fresh cherries
Freshly squeezed lime juice
Maple syrup
Club soda
Ice cubes
Maraschino cherries for garnish (optional)
Instructions:
Start by muddling fresh cherries with freshly squeezed lime juice in a cocktail shaker. Muddling helps extract the cherry juices and combines them with the lime juice.
Add maple syrup to the shaker for sweetness, balancing the tartness of the cherries and lime.
Pour club soda into the shaker. Club soda adds effervescence and lightness to the mocktail.
Shake the ingredients well with ice to chill the mocktail and blend the flavors.
Strain the mixture into a glass filled with ice cubes.
Optionally, garnish with a maraschino cherry for a decorative touch.
Nutritional Info:
This mocktail is low in calories and provides vitamin C from the lime juice. The cherries add natural sweetness and antioxidants.
', 'Sour', true, true, 6, 'https://images.app.goo.gl/SsijcU37AjT1y8vt7');
INSERT INTO drink ( user_id, name, response_body, tastes, done, vegan, rating, image) VALUES (4, 'Mocha Cream Dream', 'Taste Profile: Rich coffee flavor with a hint of chocolate and creaminess.
Ingredients:
Strong brewed coffee or espresso
Chocolate syrup
Half-and-half cream
Vanilla extract
Whipped cream
Ice cubes
Instructions:
Brew a shot of strong coffee or espresso. Allow it to cool to room temperature.
In a glass, combine the cooled coffee with chocolate syrup. The chocolate syrup adds sweetness and enhances the mocha flavor.
Pour in half-and-half cream for creaminess and richness. Adjust the amount according to your preference.
Add a splash of vanilla extract for flavor depth.
Stir the ingredients well to combine.
Top the mocktail with whipped cream for an indulgent finish.
Serve over ice cubes for a refreshing touch.
Nutritional Info:
This mocktail is creamy and indulgent, providing a rich coffee flavor with hints of chocolate. It is higher in calories due to the cream and chocolate syrup.', 'Coffee', true, false, 9, 'https://images.app.goo.gl/moAwtu6qqqTsK2Aq7');
INSERT INTO drink ( user_id, name, response_body, tastes, done, vegan, rating, image) VALUES (5, 'Caramel Espresso Delight', 'Taste Profile: Bold coffee flavor with sweet caramel notes and creaminess.
Ingredients:
Espresso or strong brewed coffee
Caramel syrup
Half-and-half cream
Whipped cream
Ice cubes
Instructions:
Brew a shot of espresso or prepare strong brewed coffee.
In a glass, mix the espresso with caramel syrup. The caramel syrup adds sweetness and caramel flavor to the mocktail.
Add half-and-half cream for creaminess and richness. Adjust the amount according to your preference.
Stir the ingredients well to combine.
Top the mocktail with whipped cream for an extra creamy and indulgent layer.
Serve over ice cubes to chill the mocktail.
Nutritional Info:
This mocktail offers a luxurious combination of bold coffee flavor and sweet caramel richness. It is higher in calories due to the cream and caramel syrup.', 'Coffee', false, false, 8, 'https://images.app.goo.gl/A3FMCYPXRrh76t9p9');

INSERT INTO token ( user_id, token) VALUES (1, 'a45bb889-53c8-4505-bada-89344d934dbc');
INSERT INTO token ( user_id, token) VALUES (2, '8228b00d-0556-4588-8e33-f27335b49038');
INSERT INTO token ( user_id, token) VALUES (3, 'b6b7d3b1-1f3e-485a-973a-2df3ce85f2fe');
INSERT INTO token ( user_id, token) VALUES (4, '9d2143d6-54f7-48ec-9337-3264af185984');
INSERT INTO token ( user_id, token) VALUES (5, 'ab80dec7-c8a0-4996-9570-c0cbfc4b3ec4');