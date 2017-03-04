create table email(
	id int not null auto_increment,
	uid int not null default 0,
	title varchar(80) not null default '',
	ptime int not null default 0,
	mbody text,
	primary key(id)
);

insert into email(uid, title, ptime, mbody) values(1, '111111111111111111', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(1, '2222222222222222', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(1, '333333333333333', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(1, '44444444444444444444', 1335678933, '111111111');



insert into email(uid, title, ptime, mbody) values(2, 'aaaaaaaaaaaa', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(2, 'bbbbbbbbbbbbbbbbb', 1335678933, '111111111');
insert into email(uid, title, ptime, mbody) values(2, 'cccccccccccccccccc', 1335678933, '111111111');



insert into email(uid, title, ptime, mbody) values(3, 'aaaaa111111111111111111', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(3, 'bbbb111111111111111111', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(3, 'cccc111111111111111111', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(3, 'dddd111111111111111111', 1335678933, '111111111');

insert into email(uid, title, ptime, mbody) values(3, 'eeeee111111111111111111', 1335678933, '111111111');
