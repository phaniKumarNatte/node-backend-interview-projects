
create table posts(
				id int auto_increment primary key,
				title varchar(255) not null,
				content text not null, 
				is_deleted boolean default false,
				created_at timestamp default current_timestamp,
				updated_at timestamp default current_timestamp on update current_timestamp
)