var csv = require('fast-csv');
var say = require("say");
var fs = require("fs");
var itunes = require('playback');
var stream = fs.createReadStream("guests.csv");
var attending = [];
var csvStream = csv()
    .on("data", function(data){
         if(data[1] === "Going" && data[0] !== "Chris Robertson"){
         	attending.push(data[0]);
         }
    })
    .on("end", function(){
    	var randAttendee = attending[Math.floor(Math.random() * attending.length)];
    	itunes.pause();
  		console.log( "Time for consequences " + randAttendee);
  		say.speak(null, "Time for consequences " + randAttendee , function () {
     		itunes.play();
		});
  		
    });

 stream.pipe(csvStream);
 