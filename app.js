var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:'true'}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:'true'}));

var dbpath = "mongodb://localhost/myblogapp";

db = mongoose.connect(dbpath);

mongoose.connection.once('open',function(){	
	console.log(" database connection open success.. ");
});


//include the model file
var Blog = require('./blogModel.js');

var blogModel = mongoose.model('Blog');

// Start Routes
app.get('/',function(req, res){
	res.send('This is blog Applications');
})

//get All Blogs
app.get('/blogs',function(req, res){

	blogModel.find(function(err,result){
		if(err){
			res.send(err);

		} else {
			res.send(result);
		}
	})
})


//get particular Blogs by id
app.get('/blogs/:id',function(req, res){
	blogModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			res.send(err);
		} else {
			res.send(result);
		}
	})
})

// create blogs 
app.post('/blogs/create',function(req, res){
	var newBlog = new blogModel({
		title : req.body.title,
		Subtitle : req.body.Subtitle,
		blogbody : req.body.blogbody
		
	});
	var allTags = (req.body.tags != undefined && req.body.tags != null)? req.body.tags.split(","):'';
	newBlog.tags = allTags;
	
	var lastmodifiedDate = (today != undefined && today != null)? today :Date.now();  
	newBlog.lastModified = lastmodifiedDate;
	
	var today = Date.now();
	newBlog.created = today;
	
	var authorInfo = { fullName:req.body.authorfullName, emailID:req.body.emailID }
	newBlog.authorInfo = authorInfo;
	
	
//now lets save the file.
	newBlog.save(function(error){
		if(error){
			res.send(error);
		} else{
			res.send(newBlog);
		}
	})
})

//update blogs
app.put('/blogs/:id/edit',function(req, res){
	var update = req.body;
	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});
})

//delete blogs through ?&id=5991b763fec8ca11f82e778a

app.delete('/blogs/:id/delete',function(req, res){
	blogModel.findOneAndRemove({'_id':req.params.id},function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});
})


app.get('*',function(req,res,next){
	next("Path not found..");	
})

app.use(function(err,req,res,next){
	res.send(err.message);	
})
///////End User Api///

app.listen(3000,function(){	
	console.log("Example app is listening on port no 3000..");	
});