create database if not exists compostlab;
use compostlab;
create table if not exists usuario(email_usuario varchar(50) primary key,
    nombres varchar(250) not null,apellido varchar(250) not null,
    cedula varchar(20)not null,telefono varchar(50),
    contrasenia varchar(250) not null,
    activeMercado smallint(1) default 0,activeLote smallint(1) default 0,
    activeHistorial smallint(1) default 0,activeDespacho smallint(1) default 0,
    activeReporte smallint(1) default 0,activeNotificacion smallint(1) default 0,
    activeRecordatorio smallint(1) default 0,estado smallint(1) default 1);
alter table usuario add column activeUsuarios smallint(1) default 0;
alter table usuario add column activeInsumo smallint(1) default 0;
create table if not exists mercado(id_mercado int auto_increment primary key,nombre_mercado varchar(250) not null,
                     encargado_mercado varchar(250) not null,email_mercado varchar(250) not null,
                     telefono_mercado varchar(250) not null,dire_mercado varchar(250) not null,
                     estado smallint(2) default 1);
create table if not exists tipo_insumo(id_tipo_insumo int primary key auto_increment,nombreTipoInsumo varchar(250));
create table if not exists insumo(id_insumo int auto_increment primary key, nombre_insumo varchar(250) not null,
                                  origin_insumo varchar(250) not null,fk_id_tipo_insumo int not null,
                                  cantidad_insumo int default 1000,precio_insumo decimal(10,2) default 0.00,
                                  decrip_insumo varchar(250),activo smallint(1) default 1);
alter table insumo add constraint rel_insumo_tipo_insumo foreign key insumo(fk_id_tipo_insumo) references tipo_insumo(id_tipo_insumo);
create table if not exists tipo_peso(id_tipo_peso int auto_increment primary key,detalle_tipo_peso varchar(250) not null,
                                       activo smallint(1) default 1);
create table lote(id_lote int primary key auto_increment,nombre_lote varchar(250) not null,
                  fechaIngreso datetime default now(),fechaDespacho datetime default null,
                  fechaSalida datetime default null,
                  observacion_lote text,
                  peso int default 1,
                  fk_tipo_peso int not null,
                  fk_email_usuario varchar(50) not null,
                  fk_id_mercado int not null,
                  activo smallint(1) default 1);
alter table lote add constraint rel_tipo_peso_lote foreign key lote(fk_tipo_peso) references tipo_peso(id_tipo_peso);
alter table lote add constraint rel_email_lote foreign key lote(fk_email_usuario) references usuario(email_usuario);
alter table lote add constraint rel_mercado_lote foreign key lote(fk_id_mercado) references mercado(id_mercado);
create table insumo_lote(id_insumo_lote int auto_increment primary key,fk_id_lote int not null,fk_id_insumo int not null,
             cantidad int default 0,fecha_ingreso datetime default now());
alter table insumo_lote add constraint rel_insumo_lote_insumo foreign key insumo_lote(fk_id_insumo) references insumo(id_insumo);
alter table insumo_lote add constraint rel_insumo_lote_lote foreign key insumo_lote(fk_id_lote) references lote(id_lote);

create table historial_lote(id_historial_lote int auto_increment primary key ,vTemperatura decimal(10,2) default 0.00,
                            vHumedad decimal(10,2) default 0.00,vPh decimal(10,2) default 0.00,
                            vOxigeno decimal(10,2) default 0.00,detalleHistorial text,
                            fechaHistorial datetime default now(),
                            FK_lote int not null );

alter table historial_lote add constraint rel_historial_lote_lote foreign key historial_lote(FK_lote) references lote(id_lote);

-- SQL DEFECTOS
insert into usuario(email_usuario, nombres, apellido, cedula, telefono, contrasenia)
            VALUES ('guaman1579@gmail.com','NELSON PATRICIO','YUNGA GUAMAN','0604666982','',MD5('12345678'));
insert into mercado(nombre_mercado, encargado_mercado, email_mercado, telefono_mercado, dire_mercado) VALUES
                    ('Mercado San Alfonso','Luis Juca','malfonso@gmail.com','0556267822','Riobamba - Los Alamos');
insert into tipo_insumo(nombreTipoInsumo) values ('ORGANICO');
insert into tipo_insumo(nombreTipoInsumo) values ('INORGANICO');
insert into tipo_insumo(nombreTipoInsumo) values ('50 ORGANICO - 50 INORGANICO');
insert into insumo(nombre_insumo, origin_insumo, fk_id_tipo_insumo, cantidad_insumo, precio_insumo, decrip_insumo)
                  VALUES ('INSUMO 001','S/N',1,100,10.23,'INSUMO ORGANICO 001');
insert into tipo_peso(detalle_tipo_peso) values ('TONELADA');
insert into tipo_peso(detalle_tipo_peso) values ('LIBRAS');
insert into tipo_peso(detalle_tipo_peso) values ('KILOS');

-- CONSULTAS
select * from usuario;
