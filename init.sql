CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email)
VALUES ('admin', 'admin@mail.com'), 
       ('Yura', 'yura@mail.com');

CREATE TABLE calendar (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    event VARCHAR NOT NULL,
    usersid integer NOT NULL REFERENCES users (id),
    period VARCHAR(10) DEFAULT NULL,
    exclude DATE DEFAULT NULL 
);

INSERT INTO calendar (date, time, event, usersid, period)
VALUES ('2022-06-14', '10:00:00', 'Event 1', 1, null),
       ('2022-06-15', '10:00:00', 'Event 2', 2, null),
       ('2022-06-16', '10:00:00', 'Event 3', 2, 'day'),
       ('2022-06-21', '10:00:00', 'Event 3', 2, null),
       ('2022-06-23', '10:00:00', 'Event 3', 2, null);