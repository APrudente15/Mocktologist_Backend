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
    response_body TEXT NOT NULL,
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

