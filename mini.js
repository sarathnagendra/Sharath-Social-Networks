var express=require('express')
var app=express()
  var ejs=require('ejs')
  app.use(express.static('public'))
app.set('view engine','ejs');
var bodyParser = require('body-parser')
  //var Datastore = require('nedb')
 //var db1 = new Datastore({ filename: 'db1', autoload: true })

app.set('port',process.env.PORT||7000)


var mongojs = require('mongojs')
var db = mongojs('mongodb://sarath:sarath579@ds245680.mlab.com:45680/sarath', ['admin'])


var session = require('express-session')
app.use(session({secret:'sharath'}))
 app.use(bodyParser.urlencoded({ extended: false }))

  app.get('/',function(req,res){

  	res.send('Hello')
  })

  app.get('/signup',function(req,res){

  	res.sendFile(__dirname+'/public/mini.html')
  })

  app.get('/login',function(req,res){

  	res.sendFile(__dirname+'/public/login.html')
  })

  app.post('/signup1', function(req, res){
  	var doc={
	//Name:req.query.name, 
	//Email:req.query.email,
	//UserName:req.query.uname,
	//Password:req.query.pass
	Name:req.body.name, 
	Email:req.body.email,
	UserName:req.body.uname,
	Password:req.body.pass
	}
	console.log(doc)
db.admin.insert(doc, function (err, newDoc) { 
    console.log(err)
    res.sendFile(__dirname+'/public/login.html')
    //res.send('Name:'+req.query.name + 'Email:'+req.query.email + 'UserName:'+req.query.uname + 'Password:'+req.query.pass)  
  	 
  });
  
   // res.send('Name:'+req.query.name + 'Email:'+req.query.email + 'UserName:'+req.query.uname + 'Password:'+req.query.pass)
})

app.get("/loginsubmit",function(req,res){
	var doc1={}
	var doc2 ={
		Email:req.query.email,
		Password:req.query.pass
	}
	db.admin.find(doc2,function(err,docs)
	{
		if(docs.length>0)
		{   
			req.session.sharath2=true

                db.admin.find(doc1,function(err,docs){
                	if(req.session.sharath2==true)
                	{
                	res.render('pro',{result:docs})
                }
                })
		}
		else
		{
			res.send("Invaild User.......")
		}
	})
})
//dynsmic routes
app.get('/profiles/:show',function(req,res){
//console.log('tfyugf')
	var a=req.params.show;
	db.admin.find({Email:a},function(errr,docu){
		if(docu.length>0)
		{
			if(req.session.sharath2==true)
			{


			res.render('jet',{result:docu})
		}
	}
	})
})

app.get('/logout',function(req,res){

	
		req.session.destroy(function(){
			 console.log('logout')
		})
		res.redirect('/login')
	})


  app.listen(app.get('port'),function(){
  	console.log("start the server in 7000")
  })