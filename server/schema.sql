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
alter table users
drop column if exists role;

alter table users
add column role text not null default 'user';

alter table users
add constraint role_check
check (role in ('user','captain','manager'))
-- users table fix
alter table airplanes drop constraint if exists airplanes_captainId_fkey
alter table users drop constraint if exists users_pkey
alter table users alter column phone_number type varchar(20)
alter table users add column id serial
alter table users add constraint national_id_unique unique(national_id)
alter table users alter column gender type varchar(10) using case when gender= true then 'female' when gender = false then 'male' end;
alter table users add constraint gender_check check (gender in ('male', 'female'))
alter table users alter column role type text using role[1]
alter table users add constraint role_check check (role in ('user', 'captain', 'manager'))

alter table users add constraint passport_check check (
	(has_passport = false and passportId is null)
	or
	(has_passport = true and passportId is not null)
)
alter table users rename column password to hashed_password
-- airplanes fix
select * from airplanes
alter table airplanes add column id serial
alter table airplanes drop constraint if exists airplanes_pkey
alter table airplanes add constraint airplanes_pkey primary key (id)
alter table airplanes alter column number type varchar(50)

-- categories fix
alter table categories alter column name set not null
alter table categories add constraint categories_name_unique unique (name)