//加载对应模块
const express=require("express");
const pool=require("./pool");
const cors=require("cors");
const bodyParser=require('body-parser');
//创建express对象

//监听端口
var app=express();
app.use(bodyParser.urlencoded({
    extended:false
}));
app.listen(3000);
app.use(express.static(__dirname+"/public"));
app.use(cors({
    origin:["http://localhost:3001","http://127.0.0.1:3001"],
    credentials:true
}));
const session=require('express-session');
//7.2对模块配置
app.use(session({
    secret:'128为随机字符',   //安全字符串
    resave:false,            //请求保存   
    saveUninitialized:true,  //初始化保存
    cookie:{
        maxAge:1000*60*60*24
    }
}))
//轮播图
app.get("/imglist",(req,res)=>{
    var sql='SELECT img_url FROM xm_index_banner';
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
});

//分类页面 分类信息
app.get('/getclassinfo',(req,res)=>{
	var class_id=req.query.classId;
	if(!class_id){
		res.send({code:-1,msg:'获取失败'});
	}
	var sql='SELECT cid,img_url,class_title FROM xm_class_info WHERE class_id=?';
	pool.query(sql,class_id,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
			res.send({code:-1,msg:'获取失败'});
		}
		
	})
})

//分类页面  banner图片
app.get('/getclassbanner',(req,res)=>{
	var cbid=req.query.classId;
	if(!cbid){
		res.send({code:-1,msg:'获取失败'});
	}
	var sql='SELECT cbid,img_url FROM xm_class_banner WHERE cbid=?';
	pool.query(sql,cbid,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
			res.send({code:-1,msg:'获取失败'});
		}
	})
})

// 商品列表
app.get('/productlist',(req,res)=>{
	var pcid=req.query.pcid;
	if(!pcid){
		pcid=1;
	}
	var sql='SELECT * FROM xm_product_list WHERE pcid=?';
	pool.query(sql,pcid,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
			res.send({code:-1,msg:'获取失败'});
		}
	})
})


// 详情页轮播
app.post('/detailbanner',(req,res)=>{
	var dpid=req.body.dpid;
	if(!dpid){
		res.send({code:-1,msg:'获取失败'});
	}
	var sql='SELECT * FROM xm_detail_pics WHERE dpid=?';
	pool.query(sql,dpid,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
			res.send({code:-1,msg:'获取数据不存在'});
		}
	})
})

//商品详情信息
app.get('/detailinfo',(req,res)=>{
	var dpid=req.query.dpid;
	if(!dpid)
		res.send({code:-1,msg:'获取失败'});
	pool.query('SELECT * FROM xm_product_detail WHERE dpid=?',dpid,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
			res.send({code:-1,msg:'获取失败'});
		}
	})
})

//用户信息
app.post('/login',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    if(!upwd || !uname){
        res.send({code:0,msg:'用户名或密码不能为空'});
    }
    pool.query('SELECT uid,u_pic,uname FROM xm_user WHERE uname=? AND upwd=?',[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result[0]});
        }else{
            res.send({code:-1,msg:'用户名或密码错误'});
        }
    })
})

//加入购物车
app.get('/addcart',(req,res)=>{
    var uid = req.query.uid;
    var pid = req.query.pid;
    var count = req.query.count;
    var color = req.query.color;
    var address = req.query.address;
    var checked = req.query.checked;
    if(!uid || !pid || !count || !color || !address){
        res.send({code:-1,msg:'请求异常'});
    }
    if(checked==''){
        checked=1;
    }
    var sql = 'INSERT INTO xm_user_cart VALUES(NULL,?,?,?,?,?,?)';
    pool.query(sql,[uid,pid,count,color,address,checked],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'成功加入购物车'});
        }else{
            res.send({code:-1,msg:'加入购物车失败'});
        }
    })
})

/* pc主页轮播 */
app.get('/indexBanner',(req,res)=>{
    pool.query('SELECT img_url FROM xm_pcindex_banner',(err,result)=>{
        if (err) throw err;
        if (result.length>0){
            res.send({code: 1,data: result});
        } else {
            res.send({code: -1, msg: '请求失败'});
        }
    })
})

/* pc主页菜单 */
app.get('/indexmenu',(req,res)=>{
    var menuId = req.query.menuId;
    if (menuId=='') {
        res.send({code: -1 ,mas: '获取失败'});
    }
    menuId = parseInt(menuId);
    pool.query('SELECT * FROM xm_pcindex_menu WHERE menuId=?',menuId,(err,result)=>{
        if (err) throw err;
        if (result.length > 0)
            res.send({code: 1,data: result});
        else
            res.send({code: -1,msg: '暂无数据'});
    })
})

/* pc主页导航内容 */
app.get('/indexnav',(req,res)=>{
    var nid = req.query.nid;
    if (!nid) {
        nid = 1;
    }
    nid = parseInt(nid);
    pool.query('SELECT * FROM xm_pcindex_nav WHERE nid=?',nid,(err,result)=>{
        if (err) throw err;
        if (result.length > 0)
            res.send({code: 1,data: result});
        else
            res.send({code: -1,msg: '当前数据不存在'});
    })
})

/* pc主页闪购 */
app.get('/flash',(req,res)=>{
    var timeId = req.query.timeId;
    if (!timeId) {
        res.send({code: -1,msg: '获取失败'});
    }
    var sql = 'SELECT * FROM xm_pcindex_flash WHERE timeId=?';
    pool.query(sql,timeId,(err,result)=>{
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 1,data: result});
        }else {
            res.send({code: -1,msg: '请求数据不存在'});
        }
    })
})

/* pc手机信息 */
app.get('/getphoneinfo',(req,res)=> {
    var obj = {result1:'',result2:[]};
    pool.query('SELECT sid,sname,stitle,poster FROM xm_phone_series', (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            obj.result1 = result
        }
        for (var i = 0; i < 8; i++) {
            pool.query('SELECT edition,price,original_price,active FROM xm_phone_detail WHERE series_id=?',i+1,(err,result)=>{
                if (err) throw err;
                if (result.length > 0) {
                    obj.result2.push(result[0]);
                }
            })
        }
        setTimeout(function () {
            res.send(obj)
        },200)

    })
})

//推荐信息
app.get('/recommend',(req,res)=>{
    var pcid = parseInt(Math.random()*9)+1;
    pool.query('SELECT pname,p_price,p_img_url FROM xm_product_list WHERE pcid=?',pcid,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
})










//新闻分页列表
app.get("/newslist",(req,res)=>{
    //获取参数
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //设置默认值
    if(!pno){pno=1}
    if(!pageSize){pageSize=7}
    //正则验证
    //出错停止运行
    var reg=/^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:'页码格式不正确！'});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:'页码大小不正确！'});
        return;
    }
    //查询总记录行数
    var a=0;
    var obj={};
    var sql='select count(id) as c from xz_news';
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var pageCount=Math.ceil(result[0].c/pageSize);
        obj.pageCount=pageCount;
        a+=10;
        if(a==20){
            res.send(obj);
        }

    });
    //查询当前页内容
    var sql='select * from xz_news limit ?,?';
    pool.query(sql,[parseInt((pno-1)*pageSize),parseInt(pageSize)],(err,result)=>{
        if(err)throw err;
        obj.result=result;
        a+=10;
        if(a==20){
            res.send(obj);
        }
    })
})
//功能三:查询一条新闻详情  
app.get('/newsinfo',(req,res)=>{
    var id=req.query.id;
    var sql="SELECT * from xz_news where id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});
//功能四：分页查询新闻评论
app.get('/getcomment',(req,res)=>{
    //获取参数
    var pno=req.query.pno;  //页码
    var pageSize=req.query.pageSize;  //页大小
    var nid=req.query.nid;  //新闻id
    //设置默认值
    if(pno==0||!pno){pno=1}
    if(!pageSize){pageSize=5}
    //正则验证
    //出错停止运行
    var reg=/^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:'页码格式不正确！'});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:'页码大小不正确！'});
        return;
    }
    var obj={code:1};
    obj.uname=req.session.uname;
    //查询总记录行数
    var a=0;
    var sql='select count(id) as c from xz_comment where nid=?';
    nid=parseInt(nid);
    pool.query(sql,[nid],(err,result)=>{
        if(err)throw err;
        var pageCount=Math.ceil(result[0].c/pageSize);
        obj.pageCount=pageCount;
        a+=10;
        if(a==20){
            res.send(obj);
        }

    });
    //查询当前页内容
    var sql='select * from xz_comment where nid=? order by id desc limit ?,?';
    pool.query(sql,[nid,parseInt((pno-1)*pageSize),parseInt(pageSize)],(err,result)=>{
        if(err)throw err;
        obj.result=result;
        a+=10;
        if(a==20){
            res.send(obj);
        }
    })
})
//功能五：发表评论
app.post('/addComment',(req,res)=>{
    var user_name=req.session.uname;
    var nid=req.body.nid;
    var content=req.body.content;
    if(req.session.uname==undefined){
        res.send({code:-1,msg:'请登录'})
        return;
    }
    var sql='INSERT INTO `xz_comment`(`id`, `nid`, `user_name`, `ctime`, `content`) VALUES (null,?,?,now(),?)';
    nid=parseInt(nid);
    pool.query(sql,[nid,user_name,content],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:'评论发表成功',uname:req.session.uname});
    })
})
//功能六：查询商品列表
app.get('/goodslist',(req,res)=>{
    //获取参数
    var pno=req.query.pno;   //页码
    var pageSize=req.query.pageSize;  //页大小
    //设置默认值
    if(pno==0||!pno){pno=1};
    if(pageSize==0||!pageSize){pageSize=6}
    //出错验证
    var reg=/^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:'页码格式不正确！'});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:'页码大小不正确！'});
        return
    };
    //查询总记录数
    var obj={};
    var sql='SELECT count(id) as c from xz_products';
    pool.query(sql,(err,result)=>{
        var pageCount=Math.ceil(result[0].c/pageSize);
        obj.pageCount=pageCount;
        var sql='SELECT * FROM xz_products LIMIT ?,?';
        pool.query(sql,[parseInt((pno-1)*pageSize),parseInt(pageSize)],(err,result)=>{
            if(err) throw err;
            obj.result=result;
            res.send(obj);
        })
    })
})
//功能⑦用户登录
//7.1加载第三方模块  express-session

app.post('/login',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql='SELECT id FROM xz_login WHERE uname=? AND upwd=md5(?)';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            //7.3登陆成功将用户名保存到session中
            req.session.uname=uname;
            req.session.uid=result[0].id;
            res.send({code:1,msg:'登陆成功',cookie:req.session});
        }else{
            res.send({code:-1,msg:'用户名或密码错误'});
        }
    })
})
//判断是否登录
app.get('/islogin',(req,res)=>{
    if(req.session.uname==undefined){
        res.send({code:-1})
    }else{
        var sql='SELECT id FROM xz_login WHERE uname=?';
        pool.query(sql,req.session.uname,(err,result)=>{
            if(err) throw err;
            res.send({code:1,uname:req.session.uname,uid:result[0].id});
        })
    }
})

app.get('/signout',(req,res)=>{
	req.session.uname='';
	req.session.uid=-1;
	res.send({code:1,msg:"注销成功"})
})

//加入购物车
app.use('/addcart',(req,res)=>{
    var uid=req.query.uid;
    var pid=req.query.pid;
    var c=req.query.count;
    var sql='insert into xz_shoppingcart_item values(null,?,?,?,0)'
    pool.query(sql,[uid,pid,c],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'加入成功'});
        }else{
            res.send({code:-1,msg:'加入失败'});
        }
    })
})

//获取个人信息
app.get('/userinfo',(req,res)=>{
    var uid=req.query.uid;
	if(uid==''){
		return;
	}
    uid=parseInt(uid);
    var sql='SELECT * FROM xz_user_info WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//.查询购物车中商品信息
app.get('/cartinfo',(req,res)=>{
    var uid=req.query.uid;
	if(!uid){
		res.send({code:-1,msg:'请登录'})
	}
	uid=parseInt(uid);
    var sql='SELECT c.iid,c.user_id,c.count,p.price,p.lname FROM xz_shoppingcart_item c,xz_laptop p WHERE c.product_id=p.lid AND c.user_id=?';
    pool.query(sql,uid,(err,result)=>{
        res.send({code:1,data:result});
    })
})

//更新购物数量
app.get('/updatecart',(req,res)=>{
    var iid=req.query.iid;
    var count=req.query.count;
    var sql='UPDATE xz_shoppingcart_item SET count=? WHERE iid=?';
    iid=parseInt(iid);
    count=parseInt(count);
    pool.query(sql,[count,iid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:-1,msg:'修改失败'})
        }
    }) 
})

//查询购物车用户商品总数
app.get('/productcount',(req,res)=>{
    var uid=req.query.uid;
    var sql='SELECT count FROM xz_shoppingcart_item WHERE user_id=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,result})
        }
    })
})

//搜索指定商品名称列表
app.get('/search',(req,res)=>{
    var keyword=req.query.keyword;
    var low=req.query.low;
    var high=req.query.high;
    if(!low){low=0};
    if(!high){high=1000000};
    var sql='SELECT lid,price,lname FROM xz_laptop WHERE lname LIKE ? AND price>=? AND price<=?';
    low=parseInt(low);
    high=parseInt(high);
    pool.query(sql,[`%${keyword}%`,low,high],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:-1,msg:'您搜索的商品不存在哦'})
        }else{
            res.send({code:1,data:result})
        }
    })
})