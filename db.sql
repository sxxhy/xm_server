use xz;
create table xz_news(
    id int primary key auto_increment,
    title varchar(64),
    ctime datetime,
    point int,
    img_url varchar(255),
    content varchar(255)
);
insert into xz_news values
(null,'粉红色',now(),10,'http://127.0.0.1:3000/img/1.jpg','发挥过生日哥啊虽然的VR关于函数'),
(null,'发的规划',now(),10,'http://127.0.0.1:3000/img/2.jpg','犯桃花'),
(null,'电饭锅',now(),10,'http://127.0.0.1:3000/img/3.jpg','同一人梵蒂冈'),
(null,'梵蒂冈',now(),10,'http://127.0.0.1:3000/img/4.jpg','图以为蛊一天'),
(null,'同一人',now(),10,'http://127.0.0.1:3000/img/5.jpg','天原集团'),
(null,'提货人',now(),10,'http://127.0.0.1:3000/img/6.jpg','体育热'),
(null,'还让他',now(),10,'http://127.0.0.1:3000/img/7.jpg','㓁额'),
(null,'图',now(),10,'http://127.0.0.1:3000/img/8.jpg','同意推荐发个好的'),
(null,'如图',now(),10,'http://127.0.0.1:3000/img/9.jpg','发件人收到'),
(null,'一天',now(),10,'http://127.0.0.1:3000/img/10.jpg','法规和体验'),
(null,'同意让他',now(),10,'http://127.0.0.1:3000/img/11.jpg','兔兔合议庭'),
(null,'兔兔',now(),10,'http://127.0.0.1:3000/img/12.jpg','通用集团以'),
(null,'域',now(),10,'http://127.0.0.1:3000/img/13.jpg','体育替换给你几个'),
(null,'吐',now(),10,'http://127.0.0.1:3000/img/14.jpg','好建议亏了'),
(null,'浮动',now(),10,'http://127.0.0.1:3000/img/15.jpg','十多个人');

#1.创建评论表
CREATE TABLE xz_comment(
    id INT PRIMARY KEY AUTO_INCREMENT,                 #评论编号
    nid INT,                #评论所属新闻编号
    user_name VARCHAR(25),  #评论人名称
    ctime DATETIME,         #时间
    content VARCHAR(120)    #内容
);
#2.添加数据
INSERT INTO xz_comment VALUES(null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,2,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,3,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,4,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,13,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,12,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,2,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,2,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,3,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,3,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,3,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,4,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,5,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,6,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,3,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,1,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,18,'小虎牙',now(),'填填圈圈甜甜'),
                             (null,13,'小虎牙',now(),'填填圈圈甜甜');
use xz;
create table xz_products(
    id int primary key auto_increment,
    title varchar(64),
    old decimal ,
    now decimal ,
    img_url varchar(255),
    stock int
);
insert into xz_products values
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/6.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/7.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/8.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/9.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/10.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/11.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/12.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/13.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/14.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/15.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/16.jpg",15),
(null,"苹果",6099,4999,"http://127.0.0.1:3000/img/17.jpg",15)
CREATE TABLE xz_login(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(25) NOT NULL DEFAULT '',
    upwd VARCHAR(32) NOT NULL DEFAULT ''
);
INSERT into xz_login VALUES(null,'小虎牙',md5('zr7478329')),(null,'小婷婷',md5('zr7478329')),
(null,'小兰琪',md5('zr7478329')),(null,'小花花',md5('zr7478329')),(null,'小明',md5('zr7478329')),(null,'小牙',md5('zr7478329')),(null,'小虎',md5('zr7478329'));

#用户信息
CREATE TABLE xz_user_info(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT NOT NULL,
    sign VARCHAR(50),
    attention VARCHAR(7),
    fan VARCHAR(7),
    avatar VARCHAR(200),
    FOREIGN KEY(uid) REFERENCES xz_login(id)
);
INSERT INTO xz_user_info VALUES(null,1,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,2,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,3,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,4,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,5,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,6,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,7,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png'),(null,8,'努力总会有收获！！！',125,520,'http://127.0.0.1:3000/img/1.png');