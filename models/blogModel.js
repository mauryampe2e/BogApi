
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogScheme = new Schema({
	title : {
		type:String,
		default:'',
		required:true
	},
	Subtitle : {
		type:String,
		default:''
	},
	blogbody : {
		type:String,
		default:''
	},
	tags : [],
	created : {
		type:Date
	},
	lastModified : {
		type:Date
	},
	authorInfo : {
		
	},
	
});

mongoose.model('Blog',blogScheme);




