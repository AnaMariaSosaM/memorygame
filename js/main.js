var openCounter = 0;
var source = "";
var sourceTmp = null;
var puntosTotales = 0;
var Player = {
	score:0,
	isPlaying: false,
}
var playerOne = Object.create(Player);
var playerTwo = Object.create(Player);
var colors = ['#00ff7f','#ee00ee','#00ced1','#ff69b4','#ff6a6a','#fff68f','#87cefa','#e066ff','#c71585','#ff4500','#ffdab9','#4876ff','#4eee94','#7ec0ee','#836fff','#00cd66','#63b8ff','#ee82ee','#ff3e96','#48d1cc','#ffa07a','#ff3030'];
function randomArr (array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex -= 1;

    	// And swap it with the current element.
    	temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
  	}

	return array;
}
function asignImages (imgArr, imgArr2) {
	var imagesArr = imgArr;
	var imagesArr2 = imgArr2;

	// random
	imagesArr = randomArr(imagesArr);
	imagesArr2 = randomArr(imagesArr2);

	// asign
	imagesArr.forEach(function(val, index) {
		if (index < 2) {
			$(val).append("<img src='images/" + index + ".png' class='hidden' data-points='200'>")		
			var rand = Math.floor(Math.random()*colors.length); 
			$(val).css("background-color", colors[rand]);
		}
		else{
			$(val).append("<img src='images/" + index + ".png' class='hidden'>");
			var rand = Math.floor(Math.random()*colors.length); 
			$(val).css("background-color", colors[rand]);
			
		}
		colors = _.without(colors, colors[rand]) ;
	});

	imagesArr2.forEach(function(val, index) {
		$(val).append("<img src='images/" + index + ".png' class='hidden'>")
		var rand = Math.floor(Math.random()*colors.length); 
		$(val).css("background-color", colors[rand]);
		colors = _.without(colors, colors[rand]);
	});
}
function containsExtraPoints(array) {
	if (array[0].dataset.points || array[1].dataset.points) {
		return true;
	}else{
		return false;
	}
}
function whoIsPlaying () {
	if (playerOne.isPlaying) {
		$('.messages').text('Turno: Jugador 1');
	}else{
		$('.messages').text('Turno: Jugador 2');
	};
}
function checkSquares (event) {

	// CHECK IF IS IN USE
	if ($(this).attr('data-use') == 1) { return; }
	$(this).attr('data-use', '1');

	// count opened
	openCounter++;


	if ( openCounter <= 2 ) {
		$(this).find('img').removeClass('hidden');
	}
	else{
		openCounter = 0;
		$('.square').find('img').addClass('hidden').attr('data-open', '0');
		source = "";
		sourceTmp = null;
		$(".square").attr('data-use', '0');

	}

	if (openCounter == 1) {
		source = $(this).find('img').attr('src');
	}
	if (openCounter == 2) {
		sourceTmp = $(this).find('img').attr('src');
	}

	if (source === sourceTmp) {
		$(".square").find("[src='" + source + "']").addClass('neverHidden')
		if (playerOne.isPlaying) {
			points(playerOne,'A');
		}else{
			points(playerTwo,'B');
		}
		ganador();
	}else if (openCounter==2) {
		switchPlayer();
	};
	whoIsPlaying();
}
function ganador (argument) {
	puntosTotales = playerTwo.score + playerOne.score;
	if (puntosTotales==1000) {
			$(".messages").text("");
			if (playerTwo.score > playerOne.score) {
				$(".ganador").text('¡Jugador Dos eres el ganador!');
			}else if(playerTwo.score < playerOne.score){
				$(".ganador").text('¡Jugador Uno eres el ganador!');
				
			}else{
				$(".ganador").text('¡Empate!');
			};
		$(".jugar").removeClass('hidden');
		$(".messages").addClass('hidden');

	}
}
function points (player,letter) {
	var rand = Math.floor(Math.random()*colors.length); 
	if ( containsExtraPoints($(".square").find("[src='" + source + "']")) ) {
		player.score += 200;
		$(".puntos"+letter).text(player.score).css("color", colors[rand]);
	}else{
		player.score += 100;
		$(".puntos"+letter).text(player.score).css("color", colors[rand]);

	}
}
function switchPlayer () {
	playerOne.isPlaying = !playerOne.isPlaying;
	playerTwo.isPlaying = !playerTwo.isPlaying;
}
jQuery(document).ready(function($) {
	asignImages(
		[$("#square1"), $("#square2"), $("#square3"), $("#square4"), $("#square5"), $("#square6"), $("#square7"), $("#square8")],
		[$("#square9"), $("#square10"), $("#square11"), $("#square12"), $("#square13"), $("#square14"), $("#square15"), $("#square16")]);
	playerOne.isPlaying = true;
	$('.messages').text('Turno Jugador: 1');
	$('.square').on('click', checkSquares);
	$('.jugar').click(function() {
    location.reload();
});
});