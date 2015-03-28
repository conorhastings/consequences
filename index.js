var csv = require('fast-csv');
var say = require("say");
var fs = require("fs");
var itunes = require('playback');
var stream = fs.createReadStream("guests.csv");
var attending = [];
var argv = require('minimist')(process.argv.slice(2));

var stack = argv.stack;
var from = argv.from;
var csvStream = csv()
    .on("data", function(data){
         if(data[1] === "Going" && data[0] !== "Chris Robertson"){
         	attending.push(data[0]);
         }
    })
    .on("end", function(){
    	var randAttendee = stack || attending[Math.floor(Math.random() * attending.length)];
    	from = from || attending[Math.floor(Math.random() * attending.length)];
    	itunes.pause();
  		console.log( "Time for consequences " + randAttendee + " from " + from);
  		say.speak(null, "Time for consequences " + randAttendee + " from " + from , function () {
     		itunes.play();
		});
  		
    });

 stream.pipe(csvStream);
 