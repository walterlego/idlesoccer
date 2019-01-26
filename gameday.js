function gameDay() {
	if (gameData.league.currentGameDay < 34) {
		if (gameData.league.currentGameDay == 0) {
			newMonth();
		}
		if (gameData.league.currentGameDay % 3 == 0) {
			newMonth();
		}
		console.log("Spieltag: "+ (gameData.league.currentGameDay+1));
		for (iMatch = 0; iMatch < gameData.league.gameDay[gameData.league.currentGameDay].length; iMatch++) {
			match(gameData.league.gameDay[gameData.league.currentGameDay][iMatch][0],gameData.league.gameDay[gameData.league.currentGameDay][iMatch][1]);
		}
		nextGameDay += GAMEDAY;
		gameData.league.currentGameDay++;
		gameData.league.table.sort(leagueSort);
		document.getElementById("debug_output").innerHTML = printGameDate()+"<br />";
		document.getElementById("debug_output").innerHTML += gameData.league.printleagueTable();
	} else if (gameData.league.currentGameDay == 34) {	//Saisonende
		gameData.league.table.sort(leagueSort);
		console.log(gameData.league);
		gameData.league.printleagueTable();
		gameData.league.currentGameDay++;
		document.getElementById("debug_output").innerHTML = printGameDate()+"<br />";
		document.getElementById("debug_output").innerHTML += gameData.league.printleagueTable();
	}
};

function match(clubA, clubB) {
	gameData.league.clubs[clubA].gameDay();
	gameData.league.clubs[clubA].gameDayHome();
	gameData.league.clubs[clubB].gameDay();
	var possessionA = getTeamPlaymaking(gameData.league.clubs[clubA].team);
	var possessionB = getTeamPlaymaking(gameData.league.clubs[clubB].team);
	var allPosession = possessionA + possessionB;
	possessionA /= allPosession;
	possessionB /= allPosession;
	//console.log("PossessionA: " + possessionA);
	//console.log("PossessionB: " + possessionB);
	var goalsA = (possessionA+getTeamOffense(gameData.league.clubs[clubA].team))*Math.random()-(getTeamDefense(gameData.league.clubs[clubB].team)*Math.random());
	if (goalsA > 0) {
		goalsA = Math.floor(goalsA);
	} else {
		goalsA = 0;
	}
	var goalsB = (possessionB+getTeamOffense(gameData.league.clubs[clubB].team))*Math.random()-(getTeamDefense(gameData.league.clubs[clubA].team)*Math.random());
	if (goalsB > 0) {
		goalsB = Math.floor(goalsB);
	} else {
		goalsB = 0;
	}
	
	
	/*
	
	var KEEPER			= 0;
	var DEFENCE			= 1;
	var MIDFIELD		= 2;
	var STRIKER			= 3;
	
	
	
	var gameTime = 90;
	var ballPossenssion = (Math.floor(Math.random() * 2) == 0) ? clubA : clubB;
	var gameZone = MIDFIELD;
	while (gameTime < 90) {
		
	}
	*/
	gameData.league.clubs[clubA].leagueGoalsConceded += goalsB;
	gameData.league.clubs[clubA].leagueGoalsScored += goalsA;
	gameData.league.clubs[clubB].leagueGoalsConceded  += goalsA;
	gameData.league.clubs[clubB].leagueGoalsScored += goalsB;
	if (goalsA > goalsB) {
		gameData.league.clubs[clubA].leaguePoints += 3;
	}else if (goalsA < goalsB) {
		gameData.league.clubs[clubB].leaguePoints += 3;
	}
	else {
		gameData.league.clubs[clubA].leaguePoints += 1;
		gameData.league.clubs[clubB].leaguePoints += 1;
	}
	console.log(gameData.league.clubs[clubA].name + " - " + gameData.league.clubs[clubB].name + " " + goalsA + ":" + goalsB);
};
