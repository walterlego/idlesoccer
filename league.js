
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
	return this;
}

function resetLeague(leagueLevels, leagueDivisions) {
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions] = {};
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].leagueLevel = leagueLevels;
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].leagueDivision = leagueDivisions;
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].name = leagueNames[leagueLevels];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].clubs = [];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].table=[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].promoted=[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].relegated=[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameDay =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameResult =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].gameDate =[];
	gameData.newSeasonLeagues[leagueLevels][leagueDivisions].currentGameDay = 0;
	return gameData.newSeasonLeagues[leagueLevels][leagueDivisions];
}


//leagues
var initleagues = function() {
	gameData.leagues=[];
	for (leagueLevels=0; leagueLevels<gameData.leagueStructure.length; leagueLevels++) {
		gameData.leagues[leagueLevels]=[];
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
		//console.log(initLeagueS.gameResult);
		initLeagueS.gameResult[i]=[];
		initLeagueS.gameResult[i].push([-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]);
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


/*

// ==================== Spielplan Generator ===============================

    // Array mit Spielern mischen
    shuffle ($teams);

    // Testen ob die Anzahl der Teams gerade ist, wenn nicht das Team "frei" hinzufügen.
    if(count($teams) % 2 ){
        array_push($teams , 'FREI');
    }

    $anz    = count($teams);      // Anzahl der Teams im Array $teams
    $paare  = $anz/2;            // Anzahl der möglichen Spielpaare
    $tage  = $anz-1;            // Anzahl der Spieltage pro Runde
    $spiele = $paare*$tage;    // Anzahl der Spiele pro Hin-/Rück-Runde
    $plan  = array();            // Array für den kompletten Spielplan
    $xpos  = $anz-1;            // höchster Key im Array $teams
    $tag    = 0;                  // Zähler für Spieltag
    $spnr  = 0;                  // Zähler für Spielnummer
    $sppaar = 0;                // Zähler für Spielpaar
    $i      = 0;                    // Schleifenzähler
    // ================================================================================
    for ($tag=1; $tag<$anz; $tag++) {
      array_splice ($teams, 1, 1, array(array_pop($teams),$teams[1]));
      for ($sppaar=0; $sppaar<$paare; $sppaar++) {
          $spnr++;
          // wechseln zwischen G und H -Spiel:
          if (($spnr%$anz!=1) and ($sppaar%2==0)) {
              $hteam = $teams[$sppaar];
              $gteam = $teams[$xpos-$sppaar];
          }  else {
              $gteam = $teams[$sppaar];
              $hteam = $teams[$xpos-$sppaar];
          }
          $plan[$tag][$spnr]["G"] = $gteam;                // für Hin-Runde
          $plan[$tag][$spnr]["H"] = $hteam;                // für Hin-Runde
          $plan[$tag+$tage][$spnr+$spiele]["G"] = $hteam;  // für Rück-Runde
          $plan[$tag+$tage][$spnr+$spiele]["H"] = $gteam;  // für Rück-Runde
      }
    }
    ksort($plan); // nach Spieltagen sortieren
    // ================================================================================
    $rueck = count($plan)/2 ;
    $Runde = 1;

    foreach($plan as $spieltag => $v1) {
        foreach($v1 as $spielnummer => $v2) {

        $H = $plan[$spieltag][$spielnummer]['H'];
        $G = $plan[$spieltag][$spielnummer]['G'];

        // Folgendes Echo für Test ohne Eintrag in DB
        // echo "Spieltag $spieltag: $H - $G <br>";

        // Hier könnte jetzt ein "INSERT INTO TABLE ..." mit den vg. '$values' erfolgen.
        mysql_query ("INSERT INTO ...........");
        }
        if ($spieltag == $rueck){
            $Runde = 2;
        }

    }

    sleep(1);
    // Hier ein Abfrage von den Paarungen um später die Spiele mit Frei zu löschen
    $sql2 = "SELECT * FROM ..........'";
    $result2 = mysql_query ($sql2);

    if (mysql_num_rows ($result2) > 0) {
        while ($data2 = mysql_fetch_array ($result2))
        {
            mysql_query("DELETE FROM ..... WHERE Heim='FREI' OR Gast='FREI'");
        }
    }


*/


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
	}
	updateHumanLeagueposition();
};

function trainingDay() {
	for (tdC=0; tdC < gameData.currentLeague.clubs.length; tdC++) {
		trainingdayClub(gameData.currentLeague.clubs[tdC]);
	}
};




function leagueNextSeason() {
	//Create copy of league structure
	gameData.newSeasonLeagues=[];
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		gameData.newSeasonLeagues[leagueLevels]=[];
		//create empty leagues
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			gameData.newSeasonLeagues[leagueLevels][leagueDivisions] = resetLeague(leagueLevels, leagueDivisions);
			//fill in clubs that stay in their leagues
			for (cTransfer = gameData.leagueStructure[leagueLevels][1]; cTransfer < (gameData.leagues[leagueLevels][leagueDivisions].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer++) {
				gameData.newSeasonLeagues[leagueLevels][leagueDivisions].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
			}
		}
	}
	console.log("Klassenerhalt", gameData.newSeasonLeagues);
	//fill in promoted and relegated clubs
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			//Promotions
			if(leagueLevels==3) {	//Special case third tier
				for (cTransfer = 0; cTransfer < 1; cTransfer++) {
					gameData.newSeasonLeagues[2][0].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			} else {
				//Promotions
				for (cTransfer = 0; cTransfer < gameData.leagueStructure[leagueLevels][1]; cTransfer++) {
					gameData.newSeasonLeagues[leagueLevels-1][Math.floor(leagueDivisions/2)].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			}
			//Relegations
			console.log("Abstiege");
			for (cTransfer = (gameData.leagues[leagueLevels][leagueDivisions].clubs.length - gameData.leagueStructure[leagueLevels][2]); cTransfer < gameData.leagues[leagueLevels][leagueDivisions].clubs.length; cTransfer++) {
				//distribute relegations equally to lower leagues
				if(gameData.leagueStructure[leagueLevels+1][0]>gameData.leagueStructure[leagueLevels][0]) {
					if(leagueLevels==2) {	//Sonderfall dritte Liga
						gameData.newSeasonLeagues[leagueLevels+1][cTransfer%4].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
					} else {
						if(cTransfer%2) {
							gameData.newSeasonLeagues[leagueLevels+1][leagueDivisions*2].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
						} else {
							gameData.newSeasonLeagues[leagueLevels+1][(leagueDivisions*2)+1].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
						}
					}
				} else {
					gameData.newSeasonLeagues[leagueLevels+1][0].clubs.push(gameData.leagues[leagueLevels][leagueDivisions].clubs[gameData.leagues[leagueLevels][leagueDivisions].table[cTransfer]]);
				}
			}
		}
	}
	//console.log("gameData.newSeasonLeagues", gameData.newSeasonLeagues);
	gameData.leagues = gameData.newSeasonLeagues;
	gameData.newSeasonLeagues = [];
	for (leagueLevels=0; leagueLevels < gameData.leagues.length; leagueLevels++) {
		for (leagueDivisions=0; leagueDivisions < gameData.leagues[leagueLevels].length; leagueDivisions++) {
			for (pClub = 0; pClub < gameData.leagues[leagueLevels][leagueDivisions].clubs.length; pClub++) {
				clubNextSeason(gameData.leagues[leagueLevels][leagueDivisions].clubs[pClub],gameData.leagues[leagueLevels][leagueDivisions]);
				gameData.leagues[leagueLevels][leagueDivisions].table.push(pClub);
			}
			initleagueSchedule(gameData.leagues[leagueLevels][leagueDivisions]);
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



function printGameDay() {
	let printLeague = gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]
	//console.log("printLeague", printLeague);
	let tableString = tableStripedStart;
	let printGameDay = printLeague.currentGameDay - 1;
	let printMatches = printLeague.gameDay[printGameDay]
	if (printGameDay < 0) {
		printGameDay = 0;
	}
	//Tablehead
	tableString += tableHeadStart;
		tableString += tableHeadStart;
			tableString += tableRowStart;
				tableString += thColStart;
					tableString += "Home";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "";
				tableString += thEnd;
				tableString += thColStart;
				tableString += "";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "";
				tableString += thEnd;
				tableString += thColStart;
					tableString += "Away";
				tableString += thEnd;
			tableString += tableRowEnd;
		tableString += tableHeadEnd;
		tableString += tBodyStart;
			for (pMatch = 0; pMatch < printLeague.gameDay[printGameDay].length; pMatch++) {
				tableString += tableRowStart;
					tableString += tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][0]].name + tableCellEnd + tableCellStart + (printLeague.gameResult[printGameDay][pMatch][0]<0 ? "-" : printLeague.gameResult[printGameDay][pMatch][0]) + tableCellEnd + tableCellStart + ":" + tableCellEnd
									+ tableCellStart + (printLeague.gameResult[printGameDay][pMatch][1] < 0 ? "-" : printLeague.gameResult[printGameDay][pMatch][1]) + tableCellEnd + tableCellStart + printLeague.clubs[printLeague.gameDay[printGameDay][pMatch][1]].name;  + tableCellEnd;
				tableString += tableRowEnd;
			}				
		tableString += tBodyEnd
	tableString += tableEnd
	return tableString;
}



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

function refreshLeagueViewMenu() {
	document.getElementById("leagueTableCard").innerHTML = refreshLeagueTableCard();
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
	//console.log(renderGameDayCard());
	renderClubMenuString += divEnd;
	return renderClubMenuString;
};

function refreshGameDayMenu() {
	document.getElementById("gameDayCard").innerHTML = refreshGameDayCard();
}





function setLeagueLevelDisplay(leagueLeveltoSet) {
	gameData.displayLeagueLevel = leagueLeveltoSet;
	if (gameData.leagues[gameData.displayLeagueLevel].length < gameData.displayLeagueDivision) {
		gameData.displayLeagueDivision = 0;
	}
};

function setLeagueDivisionDisplay(leagueDivisiontoSet) {
	console.log("Vorher: gameData.displayLeagueDivision", gameData.displayLeagueDivision);
	if (gameData.leagues[gameData.displayLeagueLevel].length >= leagueDivisiontoSet) {
		gameData.displayLeagueDivision = leagueDivisiontoSet;
	} else {
		gameData.displayLeagueDivision = 0;
	}
	console.log("Nachher: gameData.displayLeagueDivision", gameData.displayLeagueDivision);
};

function renderChooseLeagueCard() {
	let chooseLeagueCardString = cardStart50SetID("chooseLeagueCard");
		chooseLeagueCardString += cardHeaderStart;
			chooseLeagueCardString += strong + "Choose League" + strongEnd;
		chooseLeagueCardString += divEnd;
		chooseLeagueCardString += cardBodyStart;
			//choose league level
			chooseLeagueCardString += dropdownStart
				chooseLeagueCardString += setDropdownButton("chooseLeagueLevel", "Choose League Level");
				chooseLeagueCardString += setDrowpdownMenu("chooseLeagueLevel");
				for (lL=0; lL < gameData.leagues.length; lL++) {
					//console.log(gameData.leagues[lL])
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
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + strongEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};

function refreshLeagueTableCard() {
	let leagueTableCardString = cardStart100SetID("leagueTableCard");
		leagueTableCardString += cardHeaderStart;
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + strongEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};

function renderGameDayCard() {
	let leagueGameDayString = cardStart100SetID("gameDayCard");
		leagueGameDayString += cardHeaderStart;
			leagueGameDayString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + "<br />" + "<br />"
				+ gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1 + ". Game day" + strongEnd;
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
			leagueGameDayString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueDivision] + "<br />" + "<br />"
				+ (gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision].currentGameDay+1).toString() + ". Game day" + strongEnd;
			leagueGameDayString += printGameDay() //printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueDivision]);
		leagueGameDayString += divEnd;
		leagueGameDayString += cardBodyStart;
			
		leagueGameDayString += divEnd;
	leagueGameDayString += divEnd;
	return leagueGameDayString;
};



//displayLeagueLevel
//displayLeagueDivision



