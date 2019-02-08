//Data

var buffer = 0;

//GameData
var gameData = {
	playerId: 0,
	newTeamId: 0,
	loop: 0
}
/*
var saveGameLoop = window.setInterval( function() { 
	localStorage.setItem('idleSoccerSave', JSON.stringify(gameData));
	console.log("game saved");
	}, 15000);
*/

//strings
var mainMenu_bar ="";
var resource_bar = "";
var menuString = "";
var gui = "";
var mainMenuString = "";
var teamMenuString = "";
var clubMenuString = "";


var sectionStart = "<div class=\"section group\">";
var sectionEnd = "</div>";
var colStart = "<div class=\"col span_1_of_6\">";
var colEnd = "</div>";
var nextCol = colEnd + colStart;
var nextSection = colEnd + sectionEnd + sectionStart + colStart;
var sectionStartColStart = sectionStart + colStart;
var endSection = colEnd + sectionEnd;

//timing
var startUpTime = 0;
var lastCircle = 0;
var currentCircle = 0;
var frameTime = 0;
var productionTime = 0;
var productionRate = 0;
var productionModifier = 0;
var lastGameDay = 0;
var nextGameDay = 0;
gameData.gameDate = new Date(1963, 07, 1, 15);




//client

var client = {
	gui: CLUB,
	value: 0
};

var leagueNames = [
		"1. Bundesliga",
		"2. Bundesliga",
		"Dritte Liga",
		"Regionalliga",
		"Oberliga",
		"Verbandsliga",
		"Verbandsklasse",
		"Landesliga",
		"Landesklasse",
		"Bezirksliga",
		"Bezirksklasse",
		"Kreisoberliga",
		"Kreisklasse",
		"Kreisliga A",
		"Kreisliga B",
		"Kreisliga C",
		"Kreisliga D"
		];

		
var positionNames = [
		"Torwart",
		"Abwehr",
		"Mittelfeld",
		"Sturm",
		"Bank",
		"Nicht im Kader",
		"Verletzt"
		];
//Resoures
var resources = [];

var rStrings = [];
rStrings[CASH] = "€";



