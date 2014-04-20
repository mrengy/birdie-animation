$( document ).ready(function() {
	// create the audio context (chrome only for now)
    if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
	
	//audio context variables
	var context = new AudioContext();
    var audioBuffer;
    var sourceNode;
    var splitter;
    var analyser, analyser2;
    var javascriptNode;

	var averageVolume = averageVolume2 = 0;
	
	var ctx;
	var WIDTH;
	var HEIGHT;
	var intervalId = 0;
	var frame = 0;
	
	var increment = 1;
	
	var audioPlayer;
	var playerMuted = false;

	var catbody = new Image();
	catbody.src = 'img/body.png';
	var bx = bx0 = 100;
	var by = by0 = 100;
	var bw;
	var bh;
	//set natural width and natural height once the image is loaded
	if (catbody.addEventListener){
		catbody.addEventListener('load', function(){
			bw = catbody.naturalWidth;
			bh = catbody.naturalHeight;
		}, false);
	} else if (catbody.attachEvent){
		catbody.attachEvent('onload', function(){
			bw = catbody.naturalWidth;
			bh = catbody.naturalHeight;
		});
	}
	
	
	function init(){

		//set canvas context
		var canvas = (typeof(G_vmlCanvasManager) != 'undefined') ? G_vmlCanvasManager.initElement($("canvas#card")[0]) : $("canvas#card")[0];
		ctx = canvas.getContext('2d');
	    ctx.font = "20.0px Arial, Helvetica, sans-serif";
		WIDTH = $("canvas#card").width();
		HEIGHT = $("canvas#card").height();
		
		audioPlayer = $('.audio audio')[0];
	}
	
	function toggleMute(){
		if(playerMuted == false){ 
			//variable to force iOS to know that the icon is supposed to be shown in the muted state, even though it doesn't respect actually muting
			playerMuted = true;
			
			$('button#mute').addClass('muted');
			
			//actually mutes the audio
			audioPlayer.muted = true;
		}
		else{ 
			playerMuted = false;
			$('button#mute').removeClass('muted');
			audioPlayer.muted = false;
		}
	}
	
	function startDrawing(){
		$('button#play').hide();
		intervalId = setInterval(draw, 10);
		
		//only play audio if the browser supports it. Thanks, Microsoft 
		if(typeof audioPlayer != 'undefined'){
			//audioPlayer.play();
		}
		loadSound("audio/bird.mp3");
	}
	
	function draw(){
		frame ++;
		clear();
		
		//draw cat body
		ctx.translate(bx, by);
		ctx.rotate((averageVolume-87)*Math.PI/180);
		drawCharacter(catbody, bx, by, bw, bh);
		ctx.rotate(-(averageVolume-87)*Math.PI/180);
		ctx.translate(-bx, -by);
		
		
		// create the meters
        /*
		ctx.fillRect(0,130-averageVolume,25,130);
        ctx.fillRect(30,130-averageVolume2,25,130);
		*/
		
		//show audio levels
		/*
		console.log(averageVolume);
		console.log(averageVolume2);
		*/
		
		/*
		//create a new random emflake
		emflakew = getRandomInt(50, ew);
		emflakeh = (emflakew * eh / ew);
		emflakex = getRandomInt(0 - (emflakew/2), WIDTH - (emflakew/2));
		
		//move all emflakes
		
		if (value.thisy <= HEIGHT){
			drawCharacter(emflake, value.thisx, value.thisy, value.thisw, value.thish);
			value.thisy += value.increment;
		} 
		else {
			//remove the emflake from the array if it is off screen
			emflakes.splice(index, 1);
			return false;
		}
		*/
		
	} //end draw
	
	function drawCharacter(name, x, y, w, h){
		ctx.drawImage(name, x, y, w, h);
	}
	
	function clear() {
	  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}
	
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function drawRect(){
		/* draw a rectangle just for debugging purposes */
		ctx.fillRect(100, 100, 10, 10);
	}
	
	function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = context.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);


        // setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;

        analyser2 = context.createAnalyser();
        analyser2.smoothingTimeConstant = 0.0;
        analyser2.fftSize = 1024;

        // create a buffer source node
        sourceNode = context.createBufferSource();
        splitter = context.createChannelSplitter();

        // connect the source to the analyser and the splitter
        sourceNode.connect(splitter);

        // connect one of the outputs from the splitter to
        // the analyser
        splitter.connect(analyser,0,0);
        splitter.connect(analyser2,1,0);

        // connect the splitter to the javascriptnode
        // we use the javascript node to draw at a
        // specific interval.
        analyser.connect(javascriptNode);

//        splitter.connect(context.destination,0,0);
//        splitter.connect(context.destination,0,1);

        // and connect to destination
        sourceNode.connect(context.destination);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function() {

            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
        request.send();
    }


    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
    }

	// log if an error occurs
    function onError(e) {
        console.log(e);
    }
	
	init(); 
	
	// load the sound
    setupAudioNodes();
    //loadSound("../audio/bird.mp3");

	// when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    javascriptNode.onaudioprocess = function() {

        // get the average for the first channel
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        averageVolume = getAverageVolume(array);

        // get the average for the second channel
        var array2 =  new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        averageVolume2 = getAverageVolume(array2);

        // clear the current state
        //ctx.clearRect(0, 0, 60, 130);
    }

    function getAverageVolume(array) {
        var values = 0;
        var average;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    }
	
	$('button#play').on('click', startDrawing );
	$('button#mute').on('click', toggleMute );
//end document ready	
});