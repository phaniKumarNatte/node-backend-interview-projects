create table genders(
		id int auto_increment primary key, 
		label varchar(255) not null
	);

create table customer_users (
		id int auto_increment primary key, 
		name varchar(255) not null, 
		gender_id int not null, 
		company varchar(100) not null, 
		email varchar(255) not null unique,
		foreign key (gender_id) references genders(id)
	);



insert into genders (label) values('Male'),('Female'),('Others');
