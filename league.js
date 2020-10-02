
var league = function(containsPlayer, leagueLevel, leagueID) {
	this.leagueLevel = leagueLevel;
	this.leagueID = leagueID;
	this.name = leagueNames[this.leagueLevel];
	this.clubs = [];
	this.table=[];
	this.promoted=[];
	this.relegated=[];
	this.gameDay =[];
	this.gameDate =[];
	this.currentGameDay = 0;
	if (containsPlayer) {
		this.clubs.push(gameData.player.club);
		for (addClubs=0; addClubs<17; addClubs++) {
			this.clubs.push(new club(false, leagueLevel, leagueID));
		}
	} else {
		for (addClubs=0; addClubs<18; addClubs++) {
			this.clubs.push(new club(false, leagueLevel, leagueID));
		}
	}
	for (addClubs=0; addClubs<18; addClubs++) {
		this.table.push(addClubs);
	}	
	initleagueSchedule(this);
	return this;
}

var resetLeague = function(leagueLevel, leagueID) {
	this.leagueLevel = leagueLevel;
	this.leagueID = leagueID;
	this.name = leagueNames[this.leagueLevel];
	this.clubs = [];
	this.table=[];
	this.promoted=[];
	this.relegated=[];
	this.gameDay =[];
	this.gameDate =[];
	this.currentGameDay = 0;
	for (addClubs=0; addClubs<18; addClubs++) {
		this.table.push(addClubs);
	}
	return this;
}


//leagues
var initleagues = function() {
	gameData.leagues=[];
	for (leagueLevels=0; leagueLevels<gameData.leagueStructure.length; leagueLevels++) {
		gameData.leagues[leagueLevels]=[];
		for (leagueIDs=0; leagueIDs<gameData.leagueStructure[leagueLevels][0]; leagueIDs++) {
			if (leagueLevels == gameData.player.club.leagueLevel) {
				if (leagueIDs == gameData.player.club.leagueID) {
					gameData.leagues[leagueLevels].push(new league(true, leagueLevels, leagueIDs));
				} else {
					gameData.leagues[leagueLevels].push(new league(false, leagueLevels, leagueIDs));
				}
			}
			else {
				gameData.leagues[leagueLevels].push(new league(false, leagueLevels, leagueIDs));
			}
		}
	}
};

function initleagueSchedule(initLeagueS) {
	var bufferDate = new Date(gameData.gameDate);
	bufferDate.setMonth(7);
	bufferDate.setDate(1);
	var preseasonOffset = 21;
	var winterOffset = 0;
	initLeagueS.currentGameDay = 0;
	//Dates of the matches
	for (i=0; i<((initLeagueS.clubs.length-1)*2); i++) {
		initLeagueS.gameDate[i] = new Date(bufferDate);
		//Winter break			
		if (i == 17) {
			winterOffset = 31;
		}
		initLeagueS.gameDate[i].setDate(bufferDate.getDate() + (7*i) + (6-bufferDate.getDay()) + preseasonOffset + winterOffset);
	}
	//Matches
	for (i=0; i<((initLeagueS.clubs.length/2)); i++) {
		if (i%2 ==0) {
			initLeagueS.gameDay.push([[0,(1+2*i)%18],[2,(3+2*i)%18],[4,(5+2*i)%18],[6,(7+2*i)%18],[8,(9+2*i)%18],[10,(11+2*i)%18],[12,(13+2*i)%18],[14,(15+2*i)%18],[16,(17+2*i)%18]]);
		} else {
			initLeagueS.gameDay.push([[(1+2*i)%18,0],[(3+2*i)%18,2],[(5+2*i)%18,4],[(7+2*i)%18,6],[(9+2*i)%18,8],[(11+2*i)%18,10],[(13+2*i)%18,12],[(15+2*i)%18,14],[(17+2*i)%18,16]]);
		}
	}
	for (i=9; i<(initLeagueS.clubs.length-1); i++) {
		if (i%2 ==0) {
			initLeagueS.gameDay.push([[0,(2+2*i)%18],[2,(4+2*i)%18],[4,(6+2*i)%18],[6,(8+2*i)%18],[8,(10+2*i)%18],[10,(12+2*i)%18],[12,(14+2*i)%18],[14,(16+2*i)%18],[16,(18+2*i)%18]]);
		} else {
			initLeagueS.gameDay.push([[(2+2*i)%18,0],[(4+2*i)%18,2],[(6+2*i)%18,4],[(8+2*i)%18,6],[(10+2*i)%18,8],[(12+2*i)%18,10],[(14+2*i)%18,12],[(16+2*i)%18,14],[(18+2*i)%18,16]]);
		}
	}
	//Rückrunde
	for (i=0; i<((initLeagueS.clubs.length/2)); i++) {
		if (i%2 ==0) {
			initLeagueS.gameDay.push([[(1+2*i)%18,0],[(3+2*i)%18,2],[(5+2*i)%18,4],[(7+2*i)%18,6],[(9+2*i)%18,8],[(11+2*i)%18,10],[(13+2*i)%18,12],[(15+2*i)%18,14],[(17+2*i)%18,16]]);
		} else {
			initLeagueS.gameDay.push([[0,(1+2*i)%18],[2,(3+2*i)%18],[4,(5+2*i)%18],[6,(7+2*i)%18],[8,(9+2*i)%18],[10,(11+2*i)%18],[12,(13+2*i)%18],[14,(15+2*i)%18],[16,(17+2*i)%18]]);
		}
	}
	for (i=9; i<(initLeagueS.clubs.length-1); i++) {
		if (i%2 ==0) {
			initLeagueS.gameDay.push([[(2+2*i)%18,1],[(4+2*i)%18,3],[(6+2*i)%18,5],[(8+2*i)%18,7],[(10+2*i)%18,9],[(12+2*i)%18,11],[(14+2*i)%18,13],[(16+2*i)%18,15],[(18+2*i)%18,17]]);
		} else {
			initLeagueS.gameDay.push([[1,(2+2*i)%18],[3,(4+2*i)%18],[5,(6+2*i)%18],[7,(8+2*i)%18],[9,(10+2*i)%18],[11,(12+2*i)%18],[13,(14+2*i)%18],[15,(16+2*i)%18],[17,(18+2*i)%18]]);
		}
	}
}



function match (matchLeague, clubA, clubB) {
	
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
	var goalsB = ((possessionB+getTeamOffense(matchLeague.clubs[clubB].team))*Math.random())-(getTeamDefense(matchLeague.clubs[clubA].team)*Math.random());
	if (goalsB > 0) {
		goalsB = Math.floor(goalsB);
	} else {
		goalsB = 0;
	}
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
			match(gameData.currentLeague, gameData.currentLeague.gameDay[gameData.currentLeague.currentGameDay][iMatch][0],gameData.currentLeague.gameDay[gameData.currentLeague.currentGameDay][iMatch][1]);
		}
		gameData.currentLeague.currentGameDay++;
		gameData.currentLeague.table.sort(leaguesort);
	}
	updateHumanLeagueposition();
};

function trainingDay() {
	for (tdC=0; tdC < gameData.currentLeague.clubs.length; tdC++) {
		trainingdayClub(gameData.currentLeague.clubs[tdC]);
	}
};


function setLeagueLevelDisplay(leagueLeveltoSet) {
	gameData.currentLeagueLevel = leagueLeveltoSet;
};

function setLeagueIDDisplay(leagueIDtoSet) {
	gameData.currentLeagueID = leagueIDtoSet;
};




function leagueNextSeason() {
	//Create copy of league structure
	gameData.newSeasonLeagues=[];
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.newSeasonLeagues[leagueLevels]=[];
		//create empty leagues
		for (leagueIDs=0; leagueIDs < gameData.leagues[leagueLevels].length; leagueIDs++) {
			gameData.newSeasonLeagues[leagueLevels][leagueIDs] = {};
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].leagueLevel = leagueLevels;
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].leagueID = leagueIDs;
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].name = leagueNames[leagueLevels];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].clubs = [];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].table=[];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].promoted=[];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].relegated=[];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].gameDay =[];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].gameDate =[];
			gameData.newSeasonLeagues[leagueLevels][leagueIDs].currentGameDay = 0;
			//fill in clubs that stay in their leagues
			for (cTransfer = gameData.leagueStructure[leagueLevels][1]; cTransfer < (gameData.leagues[leagueLevels][leagueIDs].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer++) {
				gameData.newSeasonLeagues[leagueLevels][leagueIDs].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
			}
		}
	}
	console.log("Klassenerhalt", gameData.newSeasonLeagues);
	//fill in promoted and relegated clubs
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		for (leagueIDs=0; leagueIDs < gameData.leagues[leagueLevels].length; leagueIDs++) {
			//Promotions
			if(leagueLevels==3) {	//Special case third tier
				for (cTransfer = 0; cTransfer < 1; cTransfer++) {
					gameData.newSeasonLeagues[2][0].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
				}
			} else {
				//Promotions
				for (cTransfer = 0; cTransfer < gameData.leagueStructure[leagueLevels][1]; cTransfer++) {
					gameData.newSeasonLeagues[leagueLevels-1][Math.floor(leagueIDs/2)].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
				}
			}
			//Relegations
			console.log("Abstiege");
			for (cTransfer = (gameData.leagues[leagueLevels][leagueIDs].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer < gameData.leagues[leagueLevels][leagueIDs].clubs.length; cTransfer++) {
				//distribute relegations equally to lower leagues
				if(gameData.leagueStructure[leagueLevels+1][0]>gameData.leagueStructure[leagueLevels][0]) {
					if(leagueLevels==2) {	//Sonderfall dritte Liga
						gameData.newSeasonLeagues[leagueLevels+1][cTransfer%4].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
					} else {
						if(cTransfer%2) {
							gameData.newSeasonLeagues[leagueLevels+1][leagueIDs*2].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
						} else {
							gameData.newSeasonLeagues[leagueLevels+1][(leagueIDs*2)+1].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
						}
					}
				} else {
					gameData.newSeasonLeagues[leagueLevels+1][0].clubs.push(gameData.leagues[leagueLevels][leagueIDs].clubs[gameData.leagues[leagueLevels][leagueIDs].table[cTransfer]]);
				}
			}
		}
	}
	console.log("gameData.newSeasonLeagues", gameData.newSeasonLeagues);
	gameData.leagues = gameData.newSeasonLeagues;
	gameData.newSeasonLeagues = [];
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		for (leagueIDs=0; leagueIDs < gameData.leagues[leagueLevels].length; leagueIDs++) {
			for (pClub = 0; pClub < gameData.leagues[leagueLevels][leagueIDs].clubs.length; pClub++) {
				clubNextSeason(gameData.leagues[leagueLevels][leagueIDs].clubs[pClub],gameData.leagues[leagueLevels][leagueIDs]);
				gameData.leagues[leagueLevels][leagueIDs].table.push(pClub);
			}
			initleagueSchedule(gameData.leagues[leagueLevels][leagueIDs]);
		}
	}
}


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

function leaguesort (a, b){
	if (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leaguePoints < gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leaguePoints) { //sort points descending
		return 1;
	} else if (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leaguePoints > gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leaguePoints) {
		return -1;
	} else {		//Punkte gleich
		if ((gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leagueGoalsConceded) < (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leagueGoalsConceded)) {
			return 1;
		} else if ((gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[a].leagueGoalsConceded) > (gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leagueGoalsScored - gameData.leagues[gameData.currentLeagueLevel][gameData.currentLeagueID].clubs[b].leagueGoalsConceded)) {
			return -1;
		} else {	//Punkte und Differenz gleich, keine Sortierung				
		return 0;
		}
	}		
};





