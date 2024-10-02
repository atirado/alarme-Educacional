create database bluetooth; 
use bluetooth;

create table conectados(
    id int not null auto_increment primary key,
	nome_dos_dispositivos varchar(255) 
);

create table cadastro(
	id int not null auto_increment key,
	nome varchar(120) not null,
    usuario varchar(255),
    senha varchar(255)
);    
CREATE TABLE logs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    conectado_id INT,
    FOREIGN KEY (conectado_id) REFERENCES conectados(id) ON DELETE CASCADE
);

select * from cadastro;
alter table cadastro add column nome varchar(120) not null;

insert into conectados(nome_dos_dispositivos) values('a10');

select * from conectados;

drop table conectados;
drop table cadastro;

truncate cadastro;
truncate conectados;



