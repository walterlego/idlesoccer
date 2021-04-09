
var league = function(containsPlayer, leagueLevel, leagueDivision) {
	this.leagueLevel = leagueLevel;
	this.leagueDivision = leagueDivision;
	this.name = leagueNames[this.leagueLevel];
	this.clubs = [];
	this.table=[];
	this.promoted=[];
	this.relegated=[];
	this.gameDay =[];
	this.gameResult =[];
	this.gameDate =[];
	this.currentGameDay = 0;
	if (containsPlayer) {
		this.clubs.push(gameData.player.club);
		for (addClubs=0; addClubs<17; addClubs++) {
			this.clubs.push(new club(false, leagueLevel, leagueDivision));
		}
	} else {
		for (addClubs=0; addClubs<18; addClubs++) {
			this.clubs.push(new club(false, leagueLevel, leagueDivision));
		}
	}
	for (addClubs=0; addClubs<18; addClubs++) {
		this.table.push(addClubs);
	}	
	initleagueSchedule(this);
	for (initLeagueDemand=0; initLeagueDemand<this.clubs.length; initLeagueDemand++) {
		getLeagueDemand(this.clubs[initLeagueDemand], this);
	}
	return this;
}

function resetLeague(leagueLevels, leagueDivisions) {
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions] = {};
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].leagueLevel = leagueLevels;
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].leagueDivision = leagueDivisions;
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].name = leagueNames[leagueLevels];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].clubs = [];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].table=[];
	for (addClubs=0; addClubs<18; addClubs++) {
		gameData.newSeasonLeagues[leagueLevels][leagueDivisions].table.push(addClubs);
	}
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].promoted=[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].relegated=[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameDay =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameResult =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameDate =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].currentGameDay = 0;
	return gameData.newSeasonLeagues[leagueLevels][leagueDivisions];
}


//leagues
var initLeagues = function() {
	gameData.leagues=[];
	for (leagueLevels=0; leagueLevels<gameData.leagueStructure.length; leagueLevels++) {
		gameData.leagues[leagueLevels]=[];
		console.log("Liga ", leagueLevels);
		for (leagueDivisions=0; leagueDivisions<gameData.leagueStructure[leagueLevels][0]; leagueDivisions++) {
			if (leagueLevels == gameData.player.club.leagueLevel) {
				if (leagueDivisions == gameData.player.club.leagueDivision) {
					gameData.leagues[leagueLevels].push(new league(true, leagueLevels, leagueDivisions));
				} else {
					gameData.leagues[leagueLevels].push(new league(false, leagueLevels, leagueDivisions));
				}
			}
			else {
				gameData.leagues[leagueLevels].push(new league(false, leagueLevels, leagueDivisions));
			}
		}
	}
	console.log("Liga init-complete");
	return true;
};

function initleagueSchedule(initLeagueS){
	let bufferDate = new Date(gameData.gameDate);
	bufferDate.setMonth(7);
	bufferDate.setDate(1);
	let preseasonOffset = 21;
	let winterOffset = 0;
	let bufferTeam1 = 0;
	let bufferTeam2 = 1;
	let temp = -1;
	initLeagueS.currentGameDay = 0;
	//Dates of the matches
	for (i=0; i<((initLeagueS.clubs.length-1)*2); i++) {
		initLeagueS.gameDate[i] = new Date(bufferDate);
		//Winter break			
		if (i == 17) {
			winterOffset = 31;
		}
		initLeagueS.gameDate[i].setDate(bufferDate.getDate() + (7*i) + (6-bufferDate.getDay()) + preseasonOffset + winterOffset);
		//console.log(initLeagueS.gameResult);
		initLeagueS.gameResult[i]=[];
		initLeagueS.gameResult[i].push([-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]);
	}
	let teamNumber = initLeagueS.clubs.length;
	let gameDays = teamNumber - 1;
	let pairs = teamNumber / 2;
	let gameDayBuffer = [];
	
	for(i = 1; i <= gameDays; i++)
	{
		gameDayBuffer = [];

		gameDayBuffer[0] = [];
		gameDayBuffer[0][bufferTeam1] = i - 1;
		gameDayBuffer[0][bufferTeam2] = teamNumber - 1;
		
		if((i % 2) == 1)
		{
			temp = gameDayBuffer[0][bufferTeam2];
			gameDayBuffer[0][bufferTeam2] = gameDayBuffer[0][bufferTeam1];
			gameDayBuffer[0][bufferTeam1] = temp;
		}

		for(k = 1; k <= (pairs - 1); k++)
		{
			gameDayBuffer[k] = [];
			
			if(((i + k) % gameDays) == 0)
				gameDayBuffer[k][bufferTeam1] = gameDays - 1;
			else
				gameDayBuffer[k][bufferTeam1] = ((i + k) % gameDays) - 1;
			
			if(((i - k + gameDays) % gameDays) == 0)
				gameDayBuffer[k][bufferTeam2] = gameDays - 1;
			else
				gameDayBuffer[k][bufferTeam2] = ((i - k + gameDays) % gameDays) - 1;
			
			if((k % 2) == 0)
			{
				temp = gameDayBuffer[k][bufferTeam2];
				gameDayBuffer[k][bufferTeam2] = gameDayBuffer[k][bufferTeam1];
				gameDayBuffer[k][bufferTeam1] = temp;
			}
		}
		//console.log("Spieltagsbuffer: ", gameDayBuffer);
		initLeagueS.gameDay[i-1] = gameDayBuffer;
	}
	
	//alert("Hin- und Rückrunde");
	gameDays = initLeagueS.gameDay.length;
	for(t = 0; t < gameDays; t++)
	{
		gameDayBuffer = [];
		
		for(s = 0; s < initLeagueS.gameDay[t].length; s++)
		{
			gameDayBuffer[s] = new Array();
			gameDayBuffer[s][bufferTeam1] = initLeagueS.gameDay[t][s][bufferTeam2];
			gameDayBuffer[s][bufferTeam2] = initLeagueS.gameDay[t][s][bufferTeam1];
		}
		
		initLeagueS.gameDay.push(gameDayBuffer);
	}
	//console.log("Spieltage initiiert: ", initLeagueS.gameDay);
}


function match(matchLeague, iMatch) {
	
	var clubA = matchLeague.gameDay[matchLeague.currentGameDay][iMatch][0];
	var clubB = matchLeague.gameDay[matchLeague.currentGameDay][iMatch][1];
	clubGameDay(matchLeague.clubs[clubA], matchLeague);
	clubGameDayHome(matchLeague.clubs[clubA]);
	clubGameDay(matchLeague.clubs[clubB], matchLeague);
	var possessionA = getTeamPlaymaking(matchLeague.clubs[clubA].team);
	var possessionB = getTeamPlaymaking(matchLeague.clubs[clubB].team);
	var allPosession = possessionA + possessionB;
	possessionA /= allPosession;
	possessionB /= allPosession;
	var goalsA = ((possessionA+getTeamOffense(matchLeague.clubs[clubA].team))*Math.random())-(getTeamDefense(matchLeague.clubs[clubB].team)*Math.random());
	if (goalsA > 0) {
		goalsA = Math.floor(goalsA);
	} else {
		goalsA = 0;
	}
	matchLeague.gameResult[matchLeague.currentGameDay][iMatch][0] = goalsA;
	var goalsB = ((possessionB+getTeamOffense(matchLeague.clubs[clubB].team))*Math.random())-(getTeamDefense(matchLeague.clubs[clubA].team)*Math.random());
	if (goalsB > 0) {
		goalsB = Math.floor(goalsB);
	} else {
		goalsB = 0;
	}
	matchLeague.gameResult[matchLeague.currentGameDay][iMatch][1] = goalsB;
	matchLeague.clubs[clubA].leagueGoalsConceded += goalsB;
	matchLeague.clubs[clubA].leagueGoalsScored += goalsA;
	matchLeague.clubs[clubB].leagueGoalsConceded  += goalsA;
	matchLeague.clubs[clubB].leagueGoalsScored += goalsB;
	if (goalsA > goalsB) {
		matchLeague.clubs[clubA].leaguePoints += 3;
	}else if (goalsA < goalsB) {
		matchLeague.clubs[clubB].leaguePoints += 3;
	}
	else {
		matchLeague.clubs[clubA].leaguePoints += 1;
		matchLeague.clubs[clubB].leaguePoints += 1;
	}
	//console.log(matchLeague.clubs[clubA].name + " - " + matchLeague.clubs[clubB].name + " " + goalsA + ":" + goalsB);
}

function gameDay() {
	if (gameData.currentLeague.currentGameDay < 33) {
		for (iMatch = 0; iMatch < gameData.currentLeague.gameDay[gameData.currentLeague.currentGameDay].length; iMatch++) {
			//match(gameData.currentLeague, gameData.currentLeague.gameDay[gameData.currentLeague.currentGameDay][iMatch][0],gameData.currentLeague.gameDay[gameData.currentLeague.currentGameDay][iMatch][1]);
			match(gameData.currentLeague,iMatch);
		}
		gameData.currentLeague.currentGameDay++;
		gameData.currentLeague.table.sort(leaguesort);
		updateLeaguePositions();
	}
};

function trainingDay() {
	for (tdC=0; tdC < gameData.currentLeague.clubs.length; tdC++) {
		trainingdayClub(gameData.currentLeague.clubs[tdC]);
	}
};

function leaguesort (a, b){
	if (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leaguePoints < gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leaguePoints) { //sort points descending
		return 1;
	} else if (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leaguePoints > gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leaguePoints) {
		return -1;
	} else {		//Punkte gleich
		if ((gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leagueGoalsConceded) < (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leagueGoalsConceded)) {
			return 1;
		} else if ((gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[a].leagueGoalsConceded) > (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueDivision].clubs[b].leagueGoalsConceded)) {
			return -1;
		} else {	//Punkte und Differenz gleich, keine Sortierung				
		return 0;
		}
	}		
};

function updateLeaguePositions() {
	for (teamPosition=0; teamPosition < gameData.currentLeague.table.length; teamPosition++) {
		gameData.currentLeague.clubs[gameData.currentLeague.table[teamPosition]].leaguePosition = teamPosition;
	}
}


function leagueNextSeason() {
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.currentLeagueLevel = leagueLevels;
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			gameData.currentLeagueDivision = leagueDivisions;
			for (pClub = 0; pClub < gameData.leagues[leagueLevels][leagueDivisions].clubs.length; pClub++) {
				clubNextSeason(gameData.leagues[leagueLevels][leagueDivisions].clubs[pClub],gameData.leagues[leagueLevels][leagueDivisions]);
				//gameData.leagues[leagueLevels][leagueDivisions].table.push(pClub);
			}
			//initleagueSchedule(gameData.leagues[leagueLevels][leagueDivisions]);
		}
	}
	//Create copy of league structure
	gameData.newSeasonLeagues=[];
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.currentLeagueLevel = leagueLevels;
		gameData.newSeasonLeagues[leagueLevels]=[];
		//create empty leagues
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			gameData.currentLeagueDivision = leagueDivisions;
			gameData.newSeasonLeagues[leagueLevels][leagueDivisions] = resetLeague(leagueLevels, leagueDivisions);
			//fill in clubs that stay in their leagues
			for (cTransfer = gameData.leagueStructure[leagueLevels][1]; cTransfer < (gameData.leagues[leagueLevels][leagueDivisions].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer++) {
				if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
					gameData.player.club.leagueLevel = leagueLevels;
					gameData.player.club.leagueDivision = leagueDivisions;
					console.log("Player stays in league", gameData.player.club.leagueLevel, " Division ", gameData.player.club.leagueDivision);
				}
				gameData.newSeasonLeagues[leagueLevels][leagueDivisions].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
			}
		}
	}
	//console.log("Klassenerhalt", gameData.newSeasonLeagues);
	//fill in promoted and relegated clubs
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.currentLeagueLevel = leagueLevels;
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			gameData.currentLeagueDivision = leagueDivisions;
			//Promotions
			if(leagueLevels==3) {	//Special case third tier
				for (cTransfer = 0; cTransfer < 1; cTransfer++) {
					if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
						gameData.player.club.leagueLevel = 2;
						gameData.player.club.leagueDivision = 0;
						console.log("Player promotes to second league");
					}
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueLevel = 2;
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueDivision = 0;
					gameData.newSeasonLeagues[2][0].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			} else {
				//Promotions
				for (cTransfer = 0; cTransfer < gameData.leagueStructure[leagueLevels][1]; cTransfer++) {
					if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
						gameData.player.club.leagueLevel = leagueLevels-1;
						gameData.player.club.leagueDivision = Math.floor(leagueDivisions/2);
						console.log("Player promotes to league", gameData.player.club.leagueLevel, " Division ", gameData.player.club.leagueDivision);
					}
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueLevel = leagueLevels-1;
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueDivision = Math.floor(leagueDivisions/2);
					gameData.newSeasonLeagues[leagueLevels-1][Math.floor(leagueDivisions/2)].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			}
			//Relegations
			//console.log("Abstiege");
			for (cTransfer = (gameData.leagues[leagueLevels][leagueDivisions].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer < gameData.leagues[leagueLevels][leagueDivisions].clubs.length; cTransfer++) {
				//distribute relegations equally to lower leagues
				if(gameData.leagueStructure[leagueLevels+1][0]>gameData.leagueStructure[leagueLevels][0]) {
					if(leagueLevels==2) {	//Sonderfall dritte Liga
						if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
							console.log("Player relegated from third league");
							gameData.player.club.leagueLevel = leagueLevels+1;
							gameData.player.club.leagueDivision = cTransfer%4;
						}
						gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueLevel = leagueLevels+1;
						gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueDivision = cTransfer%4;
						gameData.newSeasonLeagues[leagueLevels+1][cTransfer%4].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
					} else {
						if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
							gameData.player.club.leagueLevel = leagueLevels+1;
							gameData.player.club.leagueDivision = leagueDivisions*2;
							console.log("Player relegated to league", gameData.player.club.leagueLevel, " Division ", gameData.player.club.leagueDivision);
						}
						gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueLevel = leagueLevels+1;
						gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueDivision = leagueDivisions*2+cTransfer%2;
						gameData.newSeasonLeagues[leagueLevels+1][leagueDivisions*2+cTransfer%2].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
					}
				} else {
					if(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].isHuman){
						gameData.player.club.leagueLevel = leagueLevels+1;
						gameData.player.club.leagueDivision = 0;
						console.log("Player relegated to league", gameData.player.club.leagueLevel, " Division ", gameData.player.club.leagueDivision);
					}
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueLevel = leagueLevels+1;
					gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]].leagueDivision = 0;
					gameData.newSeasonLeagues[leagueLevels+1][0].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			}
		}
	}
	//console.log("gameData.newSeasonLeagues", gameData.newSeasonLeagues);
	gameData.leagues = gameData.newSeasonLeagues;
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.currentLeagueLevel = leagueLevels;
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			gameData.currentLeagueDivision = leagueDivisions;
			initleagueSchedule(gameData.leagues[leagueLevels][leagueDivisions]);
		}
	}
	gameData.displayLeagueLevel = gameData.player.club.leagueLevel;
	gameData.displayLeagueDivision = gameData.player.club.leagueDivision;
	console.log("new Season: ", gameData.gameDate.getYear(), gameData.leagues);
	gameData.newSeasonLeagues = [];
}

function setLeagueLevelDisplay(leagueLeveltoSet) {
	gameData.displayLeagueLevel = leagueLeveltoSet;
	if (gameData.leagues[gameData.displayLeagueLevel].length < gameData.displayLeagueDivision) {
		gameData.displayLeagueDivision = 0;
	}
};

function setLeagueDivisionDisplay(leagueDivisiontoSet) {
	if (gameData.leagues[gameData.displayLeagueLevel].length >= leagueDivisiontoSet) {
		gameData.displayLeagueDivision = leagueDivisiontoSet;
	} else {
		gameData.displayLeagueDivision = 0;
	}
};


//////////////////////////////////////////
////   PRINTING
//////////////////////////////////////////


function printleagueTable(printLeague) {
	var tableString = tableStripedStart;
	//Tablehead
	tableString += tableHeadStart;
		tableString += tableHeadStart;
			tableString += tableRowStart;
				tableString += thColStart;
					tableString += "Platz";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "Club";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "Tore";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "Gegentore";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "Punkte";
				tableString += thEnd;
			tableString += tableRowEnd;
		tableString += tableHeadEnd;
		tableString += tBodyStart;
			var lPosition = 1;
			for (pClub = 0; pClub < printLeague.clubs.length; pClub++) {
				if (printLeague.clubs[printLeague.table[pClub]].isHuman) {
					tableString += tableRowPrimaryStart;
				} else {
					tableString += tableRowStart;
				}
				tableString += thColStart + lPosition.toString() + ". " + thEnd + tableCellStart + printLeague.clubs[printLeague.table[pClub]].name + tableCellEnd
								+ tableCellEnd + tableCellStart + printLeague.clubs[printLeague.table[pClub]].leagueGoalsScored + tableCellEnd + tableCellStart + printLeague.clubs[printLeague.table[pClub]].leagueGoalsConceded + tableCellStart + printLeague.clubs[printLeague.table[pClub]].leaguePoints + tableCellEnd;
				tableString += tableRowEnd;
				lPosition++;
			}				
		tableString += tBodyEnd
	tableString += tableEnd
	/*
	var lPosition = 1;
	for (pClub = 0; pClub < printLeague.clubs.length; pClub++) {
		if (printLeague.clubs[printLeague.table[pClub]].isHuman) {
			tableString += listGroupItemSecondary + lPosition.toString() + ". " + (printLeague.clubs[printLeague.table[pClub]].name + " " + printLeague.clubs[printLeague.table[pClub]].leaguePoints + " " + printLeague.clubs[printLeague.table[pClub]].leagueGoalsScored + " " + printLeague.clubs[printLeague.table[pClub]].leagueGoalsConceded + "</b>"+ listItemEnd);
		} else {
		tableString += listGroupItem + lPosition.toString() + ". " + (printLeague.clubs[printLeague.table[pClub]].name + " " + printLeague.clubs[printLeague.table[pClub]].leaguePoints + " " + printLeague.clubs[printLeague.table[pClub]].leagueGoalsScored + " " + printLeague.clubs[printLeague.table[pClub]].leagueGoalsConceded + listItemEnd);
		}
		lPosition++;
	}
	tableString += listGroupEnd;
	*/
	return tableString;
}



function printGameDay() {
	let printLeague = gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]
	//console.log("printLeague", printLeague);
	let gameDayString = tableStripedStart;
	let printGameDay = printLeague.currentGameDay - 1;
	let printMatches = printLeague.gameDay[printGameDay]
	if (printGameDay < 0) {
		printGameDay = 0;
	}
	//Tablehead
	gameDayString += tableHeadStart;
		gameDayString += tableHeadStart;
			gameDayString += tableRowStart;
				gameDayString += thColStart;
					gameDayString += "Home";
				gameDayString += thEnd;
				gameDayString += thColStart;
					gameDayString += "";
				gameDayString += thEnd;
				gameDayString += thColStart;
				gameDayString += "";
				gameDayString += thEnd;
				gameDayString += thColStart;
					gameDayString += "";
				gameDayString += thEnd;
				gameDayString += thColStart;
					gameDayString += "Away";
				gameDayString += thEnd;
			gameDayString += tableRowEnd;
		gameDayString += tableHeadEnd;
		gameDayString += tBodyStart;
			for (pMatch = 0; pMatch < printLeague.gameDay[printGameDay].length; pMatch++) {
				if(printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][0]].isHuman) {
					gameDayString += tableRowPrimaryStart;
						gameDayString += tableCellStart + "<b>" + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][0]].name + "</b>" + tableCellEnd + tableCellStart + (printLeague.gameResult[printGameDay][pMatch][0]<0 ? "-" : printLeague.gameResult[printGameDay][pMatch][0]) + tableCellEnd + tableCellStart + ":" + tableCellEnd
										+ tableCellStart + (printLeague.gameResult[printGameDay][pMatch][1] < 0 ? "-" : printLeague.gameResult[printGameDay][pMatch][1]) + tableCellEnd + tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][1]].name;  + tableCellEnd;
					gameDayString += tableRowEnd;
				} else if (printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][1]].isHuman) {
					gameDayString += tableRowPrimaryStart;
						gameDayString += tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][0]].name + tableCellEnd + tableCellStart + (printLeague.gameResult[printGameDay][pMatch][0]<0 ? "-" : printLeague.gameResult[printGameDay][pMatch][0]) + tableCellEnd + tableCellStart + ":" + tableCellEnd
										+ tableCellStart + (printLeague.gameResult[printGameDay][pMatch][1] < 0 ? "-" : printLeague.gameResult[printGameDay][pMatch][1]) + tableCellEnd + tableCellStart + "<b>" + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][1]].name; + "</b>" + tableCellEnd;
					gameDayString += tableRowEnd;
				} else {
					gameDayString += tableRowStart;
						gameDayString += tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][0]].name + tableCellEnd + tableCellStart + (printLeague.gameResult[printGameDay][pMatch][0]<0 ? "-" : printLeague.gameResult[printGameDay][pMatch][0]) + tableCellEnd + tableCellStart + ":" + tableCellEnd
										+ tableCellStart + (printLeague.gameResult[printGameDay][pMatch][1] < 0 ? "-" : printLeague.gameResult[printGameDay][pMatch][1]) + tableCellEnd + tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][1]].name;  + tableCellEnd;
					gameDayString += tableRowEnd;
				}
			}				
		gameDayString += tBodyEnd
	gameDayString += tableEnd
	return gameDayString;
}


function refreshLeagueViewMenu() {
	document.getElementById("leagueTableCard").innerHTML = renderLeagueTableCard();
	//document.getElementById("leagueTableCard").innerHTML = refreshLeagueTableCard();
}


function renderLeagueViewMenu() {
	renderClubMenuString = divStart + renderChooseLeagueCard();
	renderClubMenuString += divEnd;
	renderClubMenuString += setDivID("leagueTableCard");
	renderClubMenuString += renderLeagueTableCard();
	renderClubMenuString += divEnd;
	return renderClubMenuString;
};

function renderPrintGameDayMenu() {
	renderClubMenuString = divStart + renderChooseLeagueCard();
	renderClubMenuString += divEnd;
	renderClubMenuString += setDivID("gameDayCard");
	renderClubMenuString += renderGameDayCard();
	renderClubMenuString += divEnd;
	return renderClubMenuString;
};

function refreshGameDayMenu() {
	//document.getElementById("gameDayCard").innerHTML = refreshGameDayCard();
}







function renderChooseLeagueCard() {
	let chooseLeagueCardString = cardStart100SetID("chooseLeagueCard");
		chooseLeagueCardString += cardHeaderStart;
			chooseLeagueCardString += strong + "Choose League" + strongEnd;
		chooseLeagueCardString += divEnd;
		chooseLeagueCardString += cardBodyStart;
			//choose league level
			chooseLeagueCardString += dropdownStart
				chooseLeagueCardString += setDropdownButton("chooseLeagueLevel", "Choose League Level");
				chooseLeagueCardString += setDrowpdownMenu("chooseLeagueLevel");
				for (lL=0; lL < gameData.leagues.length; lL++) {
					//console.log(gameData.leagues[lL]);
					chooseLeagueCardString += setDropdownItemID(lL, leagueNames[lL], "chooseLeagueLevel"); 
					//setDropdownItemIDLeagueSelect += setDropdownItemID(lL, leagueNames[lL], "chooseLeagueDivision");
				}
			chooseLeagueCardString += divEnd;
			chooseLeagueCardString += divEnd;
			chooseLeagueCardString += br;
			//choose division
			chooseLeagueCardString += dropdownStart
				if (gameData.leagues[gameData.displayLeagueLevel].length > 0) {
					chooseLeagueCardString += setDropdownButton("chooseLeagueDivision", "Choose Division ");
					chooseLeagueCardString += setDrowpdownMenu("chooseLeagueDivision");
					for (lL=0; lL < gameData.leagues[gameData.displayLeagueLevel].length; lL++) {
						chooseLeagueCardString += setDropdownItemID(lL, (lL+1).toString(), "chooseLeagueDivision");
					}
				} else {
					chooseLeagueCardString += setDropdownButtonInactive("chooseLeagueDivision", "Choose Division ");
					chooseLeagueCardString += setDrowpdownMenu("chooseLeagueDivision");
				}
			chooseLeagueCardString += divEnd;
		chooseLeagueCardString += divEnd;
		//return to own league
			chooseLeagueCardString += br;
			//if (gameData.displayLeagueLevel != gameData.player.club.leagueLevel) { //|| gameData.displayLeagueDivision != gameData.player.club.leagueDivision) {
				chooseLeagueCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"displayOwnLeague\" > Return to own league</button>";
			//} else {
				//chooseLeagueCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"displayOwnLeague\" disabled> Return to own league</button>";
			//}
			chooseLeagueCardString += divEnd;
		chooseLeagueCardString += divEnd;
	chooseLeagueCardString += divEnd + divEnd;
	return chooseLeagueCardString;
};


function renderLeagueTableCard() {
	let leagueTableCardString = cardStart100SetID("leagueTableCard");
		leagueTableCardString += cardHeaderStart;
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + " - "
				+ (gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1).toString() + ". Game day" + strongEnd;
			leagueTableCardString += divEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};
/*
function refreshLeagueTableCard() {
	let leagueTableCardString = cardStart100SetID("leagueTableCard");
		leagueTableCardString += cardHeaderStart;
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + " - "
				+ (gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1).toString() + ". Game day" + strongEnd;
			leagueTableCardString += divEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};
*/

function renderGameDayCard() {
	let leagueGameDayString = cardStart100SetID("gameDayCard");
		leagueGameDayString += cardHeaderStart;
			leagueGameDayString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + " - "
				+ gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1 + ". Game day" + strongEnd;
			leagueGameDayString += divEnd;
			leagueGameDayString += printGameDay() //printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueGameDayString += divEnd;
		leagueGameDayString += cardBodyStart;
			
		leagueGameDayString += divEnd;
	leagueGameDayString += divEnd;
	return leagueGameDayString;
};


function refreshGameDayCard() {
	let leagueGameDayString = cardStart100SetID("gameDayCard");
		leagueGameDayString += cardHeaderStart;
			leagueGameDayString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + " - "
				+ (gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1).toString() + ". Game day" + strongEnd;
		leagueGameDayString += divEnd;
			leagueGameDayString += printGameDay() //printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueGameDayString += divEnd;
		leagueGameDayString += cardBodyStart;
		leagueGameDayString += divEnd;
	leagueGameDayString += divEnd;
	return leagueGameDayString;
};



//displayLeagueLevel
//displayLeagueDivision



