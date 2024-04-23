
create database Alarme_Educacional_bd;
use Alarme_Educacional_bd;

create table cadastro(
	email varchar(255) not null unique,
    senha varchar(255)
);

ALTER TABLE cadastro
ADD COLUMN id INT auto_increment PRIMARY KEY;

select * from cadastro;

ALTER TABLE cadastro
ADD COLUMN crie_uma_senha varchar(255) not null,
ADD COLUMN confirme_a_senha varchar(255) not null;

ALTER TABLE cadastro
drop column confirme_a_senha;

create table celulares(
	modelo varchar(255)
    
);

