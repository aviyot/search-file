const fs = require('fs');
const path = require('path');

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

filewalker("./", function(err, data){
    if(err){
        throw err;
    }
  
    var pa = process.argv;
     var notFound = true;
     var f = 0;
    if (pa.length  !=  4)
     console.log("USAGE:node search [EXT] [TEXT]");
    else{
    console.log("***********************************");
    for(var i = 0 ; i < data.length ; i++){
       

        var fileName = path.basename(data[i]);
        var sp = (fileName.split("."));
       if( pa[2] == sp[1]){
        
        var contents = fs.readFileSync(data[i]);
        if(contents.indexOf(pa[3]) > -1 ){
            f++;
            console.log(f+":",data[i]);
            notFound = false;
          }

          /*
           fs.readFile(fileName,'utf8',function(err,contents){
               if(contents.indexOf(pa[3]) > -1 ){
                 f++;
                 console.log(f+":",data[i]);
                 notFound = false;
               }
           })
           */
        }
    }
    if(notFound)
      console.log("Not file was found");
      console.log("**********************************");
}
});