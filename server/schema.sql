-- table users
-- id, name, email, national id, address, birthdate, gender, nationality, has_passport, created at, role(traveler, captin, manger)

-- table airplans
-- id, type, number, seat number, owner comp, trip category(FK), captin

-- trip
-- id, name, category(FK), departure date, return date, source, distenation.

-- category
-- id, name, discription, number of seats


create table users(
	name varchar(255) not null,
	email varchar(100) unique not null,
	phone_number int,
	national_id int primary key,
	address text,
	birth_date Date not null,
	gender boolean, --true=> male, false=> female
	nationality varchar(50) not null,
	has_passport boolean default false,
	passportId int,
	created_at timestamp default current_timestamp,
	role text[] not null default Array['user'] check (role <@ array['user', 'captin', 'manager'])
)
create table categories(
	id serial primary key,
	name varchar(200),
	description text,
	created_at timestamp default current_timestamp,
	category_seatnumber int
)
create table airplanes(
	number int primary key,
	type varchar(255),
	airplane_seat_number int,
	ownercomp varchar(200),
	captainId int,
	foreign key (captainId) references users(national_id),
	catId int,
	created_at timestamp default current_timestamp,
	foreign key (catId) references categories(id)
)
create table trip(
	id serial primary key,
	source text,
	distenation text,
	start_date Date,
	duration Date,
	price money,
	created_at timestamp default current_timestamp
)