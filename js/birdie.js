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
	
	var volumeCenter = 87;
	
	//illustor graphics variables
	var illustratorOffsetX = 170;
	var illustratorOffsetY = 130;
	
	//wave variables
		//amount to move waves
		var waveOffset = 0;
	
		//pixels between peaks of waves
		var waveInterval = 100;

	var catBody = new Image();
	catBody.src = 'img/body.png';
	var bx = bx0 = 245;
	var by = by0 = 750-543;
	var bw;
	var bh;
	//set natural width and natural height once the image is loaded
	if (catBody.addEventListener){
		catBody.addEventListener('load', function(){
			bw = catBody.naturalWidth;
			bh = catBody.naturalHeight;
		}, false);
	} else if (catBody.attachEvent){
		catBody.attachEvent('onload', function(){
			bw = catBody.naturalWidth;
			bh = catBody.naturalHeight;
		});
	}
	
	var catHead = new Image();
	catHead.src = 'img/head.png';
	var hx = 486;
	var hy = 750-524;
	var hw;
	var hh;
	var hw0;
	var hh0;
	//set natural width and natural height once the image is loaded
	if (catHead.addEventListener){
		catHead.addEventListener('load', function(){
			hw = hw0 = catHead.naturalWidth;
			hh = hh0 = catHead.naturalHeight;
		}, false);
	} else if (catHead.attachEvent){
		catHead.attachEvent('onload', function(){
			hw = hw0 = catHead.naturalWidth;
			hh = hh0 = catHead.naturalHeight;
		});
	}
	
	var catTail = new Image();
	catTail.src = 'img/tail.png';
	var tx = tx0 = 320;
	var ty = ty0 = 750-642;
	var tw;
	var th;
	//set natural width and natural height once the image is loaded
	if (catTail.addEventListener){
		catTail.addEventListener('load', function(){
			tw = catTail.naturalWidth;
			th = catTail.naturalHeight;
		}, false);
	} else if (catTail.attachEvent){
		catTail.attachEvent('onload', function(){
			tw = catTail.naturalWidth;
			th = catTail.naturalHeight;
		});
	}
	
	
	function init(){

		//set canvas context
		var canvas = (typeof(G_vmlCanvasManager) != 'undefined') ? G_vmlCanvasManager.initElement($("canvas#card")[0]) : $("canvas#card")[0];
		ctx = canvas.getContext('2d');
	    ctx.font = "20.0px Arial, Helvetica, sans-serif";
		WIDTH = $("canvas#card").width();
		HEIGHT = $("canvas#card").height();
	}
	
	function startDrawing(){
		$('button#play').hide();
		intervalId = setInterval(draw, 10);
		
		//load the wav only if we need it, otherwise load the mp3
		if (typeof window.waapisimContexts != 'undefined'){
			loadSound("audio/bird.wav");
		} else {
			loadSound("audio/bird.mp3");
		}
	}
	
	function draw(){
		frame ++;
		clear();
		
		if (waveOffset == waveInterval) waveOffset = 0;
		
		// waves/Path
	      ctx.save();
	      ctx.beginPath();
	      ctx.moveTo(70.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(50.0 + waveOffset, 530.0, 70.0 + waveOffset, 550.0, 100.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(130.0 + waveOffset, 550.0, 130.0 + waveOffset, 510.0, 170.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(150.0 + waveOffset, 530.0, 170.0 + waveOffset, 550.0, 200.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(230.0 + waveOffset, 550.0, 230.0 + waveOffset, 510.0, 270.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(250.0 + waveOffset, 530.0, 270.0 + waveOffset, 550.0, 300.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(330.0 + waveOffset, 550.0, 330.0 + waveOffset, 510.0, 370.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(350.0 + waveOffset, 530.0, 370.0 + waveOffset, 550.0, 400.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(430.0 + waveOffset, 550.0, 430.0 + waveOffset, 510.0, 470.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(450.0 + waveOffset, 530.0, 470.0 + waveOffset, 550.0, 500.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(530.0 + waveOffset, 550.0, 530.0 + waveOffset, 510.0, 570.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(550.0 + waveOffset, 530.0, 570.0 + waveOffset, 550.0, 600.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(630.0 + waveOffset, 550.0, 630.0 + waveOffset, 510.0, 670.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(650.0 + waveOffset, 530.0, 670.0 + waveOffset, 550.0, 700.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(730.0 + waveOffset, 550.0, 730.0 + waveOffset, 510.0, 770.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(750.0 + waveOffset, 530.0, 770.0 + waveOffset, 550.0, 800.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(830.0 + waveOffset, 550.0, 830.0 + waveOffset, 510.0, 870.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(850.0 + waveOffset, 530.0, 870.0 + waveOffset, 550.0, 900.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(930.0 + waveOffset, 550.0, 930.0 + waveOffset, 510.0, 970.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(950.0 + waveOffset, 530.0, 970.0 + waveOffset, 550.0, 1000.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(1030.0 + waveOffset, 550.0, 1030.0 + waveOffset, 510.0, 1070.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(1050.0 + waveOffset, 530.0, 1070.0 + waveOffset, 550.0, 1100.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(1130.0 + waveOffset, 550.0, 1130.0 + waveOffset, 510.0, 1170.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(1150.0 + waveOffset, 530.0, 1170.0 + waveOffset, 550.0, 1200.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(1200.0 + waveOffset, 570.0, 1200.0 + waveOffset, 820.0, 1200.0 + waveOffset, 820.0);
	      ctx.lineTo(-100.0 + waveOffset, 820.0);
	      ctx.lineTo(-100.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(-70.0 + waveOffset, 550.0, -70.0 + waveOffset, 510.0, -30.0 + waveOffset, 510.0);
	      ctx.bezierCurveTo(-50.0 + waveOffset, 530.0, -30.0 + waveOffset, 550.0, 0.0 + waveOffset, 550.0);
	      ctx.bezierCurveTo(30.0 + waveOffset, 550.0, 30.0 + waveOffset, 510.0, 70.0 + waveOffset, 510.0);
	      ctx.closePath();
	      ctx.fillStyle = "rgb(30, 193, 249)";
	      ctx.fill();
	      ctx.restore();
		
		waveOffset ++;
		
		//draw surfboard
		  // surfboard/Group/Path
	      ctx.save();
	      ctx.beginPath();
	      ctx.moveTo(443.9 - illustratorOffsetX, 651.6 - illustratorOffsetY);
	      ctx.bezierCurveTo(455.7 - illustratorOffsetX, 675.9 - illustratorOffsetY, 441.7 - illustratorOffsetX, 690.9 - illustratorOffsetY, 441.7 - illustratorOffsetX, 690.9 - illustratorOffsetY);
	      ctx.bezierCurveTo(460.2 - illustratorOffsetX, 682.5 - illustratorOffsetY, 467.1 - illustratorOffsetX, 653.0 - illustratorOffsetY, 467.1 - illustratorOffsetX, 653.0 - illustratorOffsetY);
	      ctx.lineTo(443.9 - illustratorOffsetX, 651.6 - illustratorOffsetY);
	      ctx.closePath();
	      ctx.fillStyle = "rgb(255, 255, 255)";
	      ctx.fill();
	      ctx.lineWidth = 2.0;
	      ctx.lineJoin = "miter";
	      ctx.miterLimit = 4.0;
	      ctx.stroke();

	      // surfboard/Group/Path
	      ctx.beginPath();
	      ctx.moveTo(430.4 - illustratorOffsetX, 658.9 - illustratorOffsetY);
	      ctx.bezierCurveTo(538.4 - illustratorOffsetX, 694.1 - illustratorOffsetY, 755.8 - illustratorOffsetX, 694.5 - illustratorOffsetY, 817.6 - illustratorOffsetX, 681.6 - illustratorOffsetY);
	      ctx.bezierCurveTo(759.4 - illustratorOffsetX, 652.1 - illustratorOffsetY, 514.2 - illustratorOffsetX, 623.6 - illustratorOffsetY, 438.4 - illustratorOffsetX, 636.6 - illustratorOffsetY);
	      ctx.bezierCurveTo(427.6 - illustratorOffsetX, 637.8 - illustratorOffsetY, 420.9 - illustratorOffsetX, 649.0 - illustratorOffsetY, 430.4 - illustratorOffsetX, 658.9 - illustratorOffsetY);
	      ctx.closePath();
	      ctx.fill();
	      ctx.stroke();

	      // surfboard/Group/Path
	      ctx.beginPath();
	      ctx.moveTo(428.0 - illustratorOffsetX, 643.7 - illustratorOffsetY);
	      ctx.lineTo(817.6 - illustratorOffsetX, 681.6 - illustratorOffsetY);
	      ctx.lineWidth = 1.0;
	      ctx.strokeStyle = "rgb(126, 53, 0)";
	      ctx.stroke();
	      ctx.restore();
		
		//draw tail
		if(averageVolume > 0){
			ctx.save();
			ctx.translate(tx, (ty+th));
			ctx.rotate((averageVolume - volumeCenter)*Math.PI/180);
			ctx.translate(0, -th);
			drawCharacter(catTail, 0, 0, tw, th);
			ctx.restore();
		} else {
			drawCharacter(catTail, tx, ty, tw, th);
		}
		
		//draw head
		if(averageVolume - volumeCenter > 0){
			//increase head width based on volume
			hw = hw0 + (averageVolume - volumeCenter);
			//set head height proportionally to head width
			hh = (hw * (hh0 / hw0) );
			
			/*
			var headRatio = (hh0 / hw0);
			console.log('headRatio = '+headRatio);
			console.log('hw = '+hw);
			console.log('hh = '+hh);
			*/
			
			//pulse head size
			ctx.save();
			ctx.translate( hx, hy );
			drawCharacter(catHead, 0, -(hh-hh0), hw, hh);
			ctx.restore();
		} else {
			//reset width and height to natural size
			hw = hw0;
			hh = hh0;
			drawCharacter(catHead, hx, hy, hw, hh);
		}

		//draw body
		drawCharacter(catBody, bx, by, bw, bh);
		
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
	
    setupAudioNodes();

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
	
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	$('button#play').on('click', startDrawing );
//end document ready	
});