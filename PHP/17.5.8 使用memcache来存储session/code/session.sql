/*
     session  (建议使用内存表)
    1.  记录session id           sid
    2.  修改时间                 utime
    3.  session数据              sdata
    4.  ip         用户IP        uip
    5.  user_agent 浏览器        uagent


*/

create table session(
	sid char(32) not null default '',
	utime int not null default 0,
	sdata text,
	uip char(15) not null default '',
	uagent varchar(200) not null default '',
	index session_sid(sid)

);
