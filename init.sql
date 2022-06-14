CREATE TABLE calendar (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    event VARCHAR NOT NULL,
    period VARCHAR(10) DEFAULT NULL,
    exclude DATE DEFAULT NULL,
    author VARCHAR(20) DEFAULT NULL
);

INSERT INTO calendar (date, time, event, period, author)
VALUES ('2022-06-14', '10:00:00', 'Event 1', null, 'Admin'),
       ('2022-06-15', '10:00:00', 'Event 2', null, null),
       ('2022-06-16', '10:00:00', 'Event 3', 'day', null),
       ('2022-06-21', '10:00:00', 'Event 3', null, 'Yura'),
       ('2022-06-23', '10:00:00', 'Event 3', null, null);