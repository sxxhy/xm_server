use xz;
#菜谱
create table caidan(
    id int primary key auto_increment,
    title varchar(64),
    ctime datetime,
    point int,
    img_url varchar(255),
    price decimal(8,2)
);
insert into xz_news values
(null,'麻花','now()',10,'http://127.0.0.1:3000/img/1.jpg','1.00'),
(null,'米汤','now()',10,'http://127.0.0.1:3000/img/1.jpg','1.00'),
(null,'酱香饼','now()',10,'http://127.0.0.1:3000/img/1.jpg','2.00'),
(null,'鸡柳','now()',10,'http://127.0.0.1:3000/img/1.jpg','2.00'),
(null,'米琪','now()',10,'http://127.0.0.1:3000/img/1.jpg','1.00'),
(null,'馅饼','now()',10,'http://127.0.0.1:3000/img/1.jpg','2.00'),
(null,'鸡蛋灌饼','now()',10,'http://127.0.0.1:3000/img/1.jpg','4.00'),
(null,'玉米','now()',10,'http://127.0.0.1:3000/img/1.jpg','2.00'),
(null,'黄金饼','now()',10,'http://127.0.0.1:3000/img/1.jpg','2.00'),
(null,'小笼包','now()',10,'http://127.0.0.1:3000/img/1.jpg','6.00'),
(null,'重庆小面','now()',10,'http://127.0.0.1:3000/img/1.jpg','8.00'),
(null,'标准餐','now()',10,'http://127.0.0.1:3000/img/1.jpg','8.00'),
(null,'麻辣香锅','now()',10,'http://127.0.0.1:3000/img/1.jpg','10.00'),
(null,'火锅','now()',10,'http://127.0.0.1:3000/img/1.jpg','12.00'),
(null,'蛋炒饭','now()',10,'http://127.0.0.1:3000/img/1.jpg','1.00'),
(null,'营养套餐','now()',10,'http://127.0.0.1:3000/img/1.jpg','10.00'),
(null,'砂锅','now()',10,'http://127.0.0.1:3000/img/1.jpg','8.00'),
(null,'大盘鸡','now()',10,'http://127.0.0.1:3000/img/1.jpg','15.00'),
(null,'酥饺','now()',10,'http://127.0.0.1:3000/img/1.jpg','8.00'),
(null,'水饺','now()',10,'http://127.0.0.1:3000/img/1.jpg','10.00'),
(null,'鸡蛋汤','now()',10,'http://127.0.0.1:3000/img/1.jpg','1.00'),
(null,'铁锅炖菜','now()',10,'http://127.0.0.1:3000/img/1.jpg','12.00'),
(null,'羊肉泡馍','now()',10,'http://127.0.0.1:3000/img/1.jpg','15.00'),
(null,'肉夹馍','now()',10,'http://127.0.0.1:3000/img/1.jpg','6.00'),
(null,'凉皮','now()',10,'http://127.0.0.1:3000/img/1.jpg','6.00'),
(null,'热米皮','now()',10,'http://127.0.0.1:3000/img/1.jpg','6.00'),
(null,'擀面皮','now()',10,'http://127.0.0.1:3000/img/1.jpg','6.00'),
