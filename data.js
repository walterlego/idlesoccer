//Data

var buffer = 0;

//GameData
var gameData = {
	gameState: INIT,
	playerId: 0,
	newTeamId: 0,
	loop: 0,
	leagues: [],
	currentLeague: "",
	currentLeagueLevel: 0,
	currentLeagueDivision: 0,
	displayLeagueLevel: 0,
	displayLeagueDivision: 0,
	lastFrame: -1
}


/*
var saveGameLoop = window.setInterval( function() { 
	localStorage.setItem('idleSoccerSave', JSON.stringify(gameData));
	console.log("game saved");
	}, 15000);
*/



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

//Resoures
var resources = [];


gameData.leagueStructure = [
	[1,0,3],			//1. Bundesliga
	[1,3,3],			//2. Bundesliga
	[1,3,4],			//Dritte Liga
	[4,1,4],			//Regionalliga
	[8,2,4],			//Oberliga
	[16,2,4],			//Verbandsliga
	[32,2,4],			//Landesliga
	[64,2,4],			//Bezirksliga
	[128,2,4],			//Kreisliga A
	[256,2,0]			//Kreisliga B
]
