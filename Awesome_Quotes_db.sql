create database quotes_db;

use quotes_db;

create table user (
    id integer primary key auto_increment,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50),
    password varchar(100),
    phoneno varchar(12),
    address varchar(100)
);

create table quote (
    id integer primary key auto_increment,
    author varchar(30),
    contents text,
    userId integer,
    createdTime timestamp default CURRENT_TIMESTAMP
);

create table favourite (
    id integer primary key auto_increment,
    userId integer,
    quoteId integer,
    createdTime timestamp default CURRENT_TIMESTAMP
);

alter table user add constraint unique(email);
alter table favourite add constraint foreign key (quoteid) references quote(id) on delete cascade on update cascade;
alter table favourite add constraint foreign key (userid) references user(id) on delete cascade on update cascade;


INSERT INTO user (firstName, lastName, email, password, phoneno, address) VALUES
('Rahul', 'Sharma', 'rahul.sharma@gmail.com', 'rahul123', '9876543210', 'Mumbai, Maharashtra'),
('Anjali', 'Verma', 'anjali.verma@gmail.com', 'anjali456', '9123456780', 'Delhi'),
('Vikram', 'Patel', 'vikram.patel@gmail.com', 'vikram789', '9988776655', 'Ahmedabad, Gujarat');



INSERT INTO quote (author, contents, userId) VALUES
('Swami Vivekananda', 'Arise, awake, and stop not until the goal is reached.', 1),
('Dr. A.P.J. Abdul Kalam', 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.', 2),
('Rabindranath Tagore', 'You can’t cross the sea merely by standing and staring at the water.', 3),
('Mahatma Gandhi', 'Be the change that you wish to see in the world.', 1);


INSERT INTO favourite (userId, quoteId) VALUES
(1, 2), (2, 1),  
(3, 1),  (1, 3);  
