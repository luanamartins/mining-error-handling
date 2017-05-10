const testFolder = 'C:/Users/Lhwannah/Documents/UFPE/Mestrado/Projetos no Github/bootstrap/js';

var query = ['VERSION'];

var fs = require('fs');

function traverseDirectory(dirname, callback){
	var directory=[];
	fs.readdir(dirname, function(err, list){
		dirname = fs.realpathSync(dirname);
		if(err){
			return callback(err);
		}
		var listlength = list.length;
		list.forEach(function(file){
			file = dirname+'/'+file;
			fs.stat(file, function(err, stat){
				if(file.endsWith('.js')){
					var contents = fs.readFileSync(file, 'utf-8');
					if(contents.indexOf('Event')){
						directory.push(file);
					}
				}
				if(stat && stat.isDirectory()){
					traverseDirectory(file, function(err, parsed){
						directory = directory.concat(parsed);
						if(!--listlength){
							callback(null, directory);
						}
					});
				}else{
					if(!--listlength){
						callback(null, directory);
					}
				}
			});
		});
	});
}

traverseDirectory(testFolder, function(err, result){
	if(err){
		console.log(err);
	}else{
		console.log(result);
	}
});