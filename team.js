var team = function(isHuman, leagueLevel) {
	this.isHuman = isHuman;
	this.id = gameData.newTeamId++;
	this.hasKeeper = false;
	this.squadCount = 0;
	this.benchCount = 0;
	this.players = [];
	for (j=0; j<18; j++) {
		newKicker = new kicker(j+1, leagueLevel);
		this.players.push(newKicker);
	}
	//if(this.isHuman == false) {
	this.chosenFormation = CHOOSENEW;
	this.formation = pickFormation(CHOOSENEW);
	setTeamFormation(this);
	//}
	
	this.teamDefense = getTeamDefense(this);
	this.teamOffense = getTeamOffense(this);
	this.teamPlaymaking = getTeamPlaymaking(this);
	
	return this;
};

///////////////////////////////////////////
// Tactics
///////////////////////////////////////////

function pickFormation(setFormation) {
	//Random Formation
	return Math.floor(Math.random() * 6);	

}

function setTeamFormation(setTeam) {
	let Defenders, Midfielders, Strikers = 0;
	if (setTeam.formation == F433) {
		//4 3 3
		Defenders = 4;
		Midfielders = 3;
		Strikers = 3;
	} else if (setTeam.formation == F343) {
		//3 4 3
		Defenders = 3;
		Midfielders = 4;
		Strikers = 3;
	} else if (setTeam.formation == F442) {
		//4 4 2
		Defenders = 4;
		Midfielders = 4;
		Strikers = 2;
	} else if (setTeam.formation == F451) {
		//4 5 1
		Defenders = 4;
		Midfielders = 5;
		Strikers = 1;
	} else if (setTeam.formation == F352) {
		//3 5 2
		Defenders = 3;
		Midfielders = 5;
		Strikers = 2;
	} else {
		//3 6 1
		Defenders = 3;
		Midfielders = 6;
		Strikers = 1;
	}
	let theChosenOne = -1;
	let maxValue = -1;
	let maxOffence = -1;
	let compareBuffer = -1;
	setTeam.hasKeeper = false;
	setTeam.squadCount = 0;
	if(setTeam.players.length>10) {
		//KEEPER
		for (iterPlayers = 0; iterPlayers < setTeam.players.length; iterPlayers++) {
			compareBuffer = setTeam.players[iterPlayers].defense * setTeam.players[iterPlayers].skill;
			setTeam.players[iterPlayers].position = NOTNOMINATED;
			if (compareBuffer > maxValue) {
				theChosenOne = iterPlayers;
				maxValue = compareBuffer;
			}
		}
		setTeam.players[theChosenOne].position = KEEPER;
		setTeam.squadCount++;
		setTeam.hasKeeper = true;
		theChosenOne = -1;
		maxValue = -1;
		compareBuffer = -1;
		//STRIKER
		for (nominateStrikers = 0; nominateStrikers < Strikers; nominateStrikers++) {
			for (iterPlayers = 0; iterPlayers < setTeam.players.length; iterPlayers++) {
				if (setTeam.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = (1- setTeam.players[iterPlayers].defense) * setTeam.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
						maxValue = compareBuffer;
					}
				}
			}
			setTeam.players[theChosenOne].position = STRIKER;
			setTeam.squadCount++;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
		//DEFENCE
		for (nominateDefenders = 0; nominateDefenders < Defenders; nominateDefenders++) {
			for (iterPlayers = 0; iterPlayers < setTeam.players.length; iterPlayers++) {
				if (setTeam.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = setTeam.players[iterPlayers].defense * setTeam.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
						maxValue = compareBuffer;
					}
				}
			}
			setTeam.players[theChosenOne].position = DEFENCE;
			setTeam.squadCount++;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
		//MIDFIELD
		for (nominateMidfielders = 0; nominateMidfielders < Midfielders; nominateMidfielders++) {
			for (iterPlayers = 0; iterPlayers < setTeam.players.length; iterPlayers++) {
				if (setTeam.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = setTeam.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
						maxValue = compareBuffer;
					}
				}
			}
			setTeam.players[theChosenOne].position = MIDFIELD;
			setTeam.squadCount++;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
	}
};

function toggleKickerPosition(getTeam, getKicker) {
	if(getKicker.position == KEEPER) {
			getKicker.position++;
			getTeam.hasKeeper = false;
	} else if (getKicker.position < NOTNOMINATED){
		getKicker.position++;
		if (getKicker.position == BENCH){
			getTeam.squadCount--;
			getKicker.benchCount++;
		}
	} else {
		if (getTeam.squadCount < 11) {
			if (getTeam.hasKeeper == false) {
				getKicker.position = KEEPER;
				getTeam.hasKeeper = true;
			} else {
				getKicker.position = DEFENCE;
			}
			getTeam.squadCount++;
			getKicker.benchCount--;
			//
		} else {
			getKicker.position = BENCH;
		}
	}
	getKicker.playmaking = getKickerPlaymaking(getKicker);
	getKicker.playDefense = getKickerDefense(getKicker);
	getKicker.playOffense = getKickerOffense(getKicker);
};

function getTeamDefense(getTD) {
	var teamDefense = 0;
	for (i=0; i< getTD.players.length; i++) {
		if (getTD.players[i].position < BENCH) {
			teamDefense += getKickerDefense(getTD.players[i]);
		}
	}
	return teamDefense;
};	

function getTeamOffense(getTO) {
	var teamOffense = 0;
	for (i=0; i< getTO.players.length; i++) {
		if (getTO.players[i].position < BENCH) {
			teamOffense += getKickerOffense(getTO.players[i]);
		}
	}
	return teamOffense;
};

function getTeamPlaymaking(getTPM) {
	var teamPlaymaking = 0;
	for (i=0; i< getTPM.players.length; i++) {
		if (getTPM.players[i].position < BENCH) {
			teamPlaymaking += getKickerPlaymaking(getTPM.players[i]);
		}
	}
	return teamPlaymaking;
};

//Training
function teamTraining(trainingTeam, trainingClub) {
	for (iterPlayers = 0; iterPlayers < trainingTeam.players.length; iterPlayers++) {
		kickerTraining(trainingTeam.players[iterPlayers], trainingClub);
	}
	trainingTeam.teamDefense = getTeamDefense(trainingTeam);
	trainingTeam.teamOffense = getTeamOffense(trainingTeam);
	trainingTeam.teamPlaymaking = getTeamPlaymaking(trainingTeam);
};

function fillUpTeam(addTeam, leagueLevel) {
	for (addPlayers = 0; addPlayers<(11-addTeam.players.length); addPlayers++) {
		var youngster = new kicker(-1, leagueLevel);
		youngster.skill = (Math.random() * Math.pow(1,0.1) + Math.random() * Math.pow(1,0.1)) / 2;
		youngster.talent = (Math.random() * Math.pow(1,0.1) + Math.random() * Math.pow(1,0.1)) / 2;
		youngster.age= Math.floor(Math.random()*6)+22;
		youngster.salary = calculateKickerSalary(youngster);
		console.log("Fehlender Spieler hinzugefügt");
		addTeam.players.push(youngster);
	}
};


function firePlayer(fireteam, firePlayer) {
	console.log("PlayerID", fireteam.players.length);
	for (iterPlayers = 0; iterPlayers < fireteam.players.length; iterPlayers++) {
		if (fireteam.players[iterPlayers].playerId == client.value) {	//player retires
			if (fireteam.players[iterPlayers].position < BENCH){
				fireteam.squadCount--;
				if(fireteam.players[iterPlayers].position == KEEPER) {
					fireteam.hasKeeper = false;
				}
			} else if (fireteam.players[iterPlayers].position == BENCH){
				fireteam.benchCount--;
			}			
			console.log("Pre", fireteam.players, iterPlayers);
			fireteam.players.splice(iterPlayers, 1);
			console.log("Post", fireteam.players);
		}
	}
};


function teamGameDay(dgTeam, gameDayLeague) {
	for (iterPlayers = 0; iterPlayers < dgTeam.players.length; iterPlayers++) {
		kickerMatch(dgTeam.players[iterPlayers], gameDayLeague.leagueLevel);
	}
	dgTeam.teamDefense = getTeamDefense(dgTeam);
	dgTeam.teamOffense = getTeamOffense(dgTeam);
	dgTeam.teamPlaymaking = getTeamPlaymaking(dgTeam);
}



////////////////////////////////////////////////////////////////////////////////////
////// Next Season
////////////////////////////////////////////////////////////////////////////////////

function teamNextSeason(teamNextSeason, clubNextSeason) {
	for (iterPlayers = 0; iterPlayers < teamNextSeason.players.length; iterPlayers++) {
		if (kickerNextSeason(teamNextSeason.players[iterPlayers])<0) {	//player retires
			teamNextSeason.players.splice(iterPlayers, 1);
		}
	}
	if(teamNextSeason.players.length<11) {
		fillUpTeam(teamNextSeason);
	}
	if (teamNextSeason.chosenFormation == CHOOSENEW){
		let newFormationTest = 0;
		if(clubNextSeason.mood<0) {
			newFormationTest = 0.4;
		} else {
			newFormationTest = 0.75;
		}
		if(newFormationTest<Math.random()) {
			pickFormation(clubNextSeason);
		} else {
			pickFormation(clubNextSeason)
		}
	}
	setTeamFormation(teamNextSeason);
};


////////////////////////////////////////////////////////////////////////////////////
////// Rendering
////////////////////////////////////////////////////////////////////////////////////




function renderTacticalFormation(rTFormation) {	//formely known as renderFormation
	var formationString = "";
	var perPosition = 0;
	for (iPosition = DEFENCE; iPosition < BENCH; iPosition++){
		perPosition = 0;
		for (i=0; i< rTFormation.players.length; i++) {
			if (rTFormation.players[i].position == iPosition){
				perPosition++;
			}
		}
		formationString += perPosition + " - ";
	}
	formationString = formationString.substring(0, formationString.length - 3);
	return formationString;
};



function renderTeamMenu() {
	
	renderTeamMenuString = ""
	renderTeamMenuString = sectionStart;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"switchToFormation\">Formation</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"switchToTraining\">Training</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"switchToTeamContracts\">Contracts</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += sectionEnd;
	return renderTeamMenuString;
}



function renderTeamFormationStats(rTF) {
	let renderTeamFormationStatsString = cardStart100SetID("teamStats");
		renderTeamFormationStatsString += cardHeaderStart;
			renderTeamFormationStatsString += "<strong>Team stats</strong>";
		renderTeamFormationStatsString += divEnd;
		renderTeamFormationStatsString += cardBodyStart;
			renderTeamFormationStatsString += "Playmaking: " + rTF.teamPlaymaking + "<br />";
			renderTeamFormationStatsString += "Defense: " + rTF.teamDefense + "<br />";
			renderTeamFormationStatsString += "Offense: " + rTF.teamOffense + "<br />";
		renderTeamFormationStatsString += divEnd;
		renderTeamFormationStatsString += divEnd;
	renderTeamFormationStatsString += divEnd;
	return renderTeamFormationStatsString;
};

function renderTeamFormationPickFormation(rTF) {
	let renderTeamFormationPickFormationString = cardStart100SetID("teamPickFormation");
	renderTeamFormationPickFormationString += cardHeaderStart;
		renderTeamFormationPickFormationString += "<strong>Pick team formation</strong>";
	renderTeamFormationPickFormationString += divEnd;
	renderTeamFormationPickFormationString += cardBodyStart;
		renderTeamFormationPickFormationString += "Current formation: " + renderTacticalFormation(rTF) + "<br />";
		renderTeamFormationPickFormationString += dropdownStart				
		renderTeamFormationPickFormationString += setDropdownButton("chooseFormation", "Choose formation ");
		renderTeamFormationPickFormationString += setDrowpdownMenu("chooseFormation");
		for (lL=0; lL < formations.length; lL++) {
			renderTeamFormationPickFormationString += setDropdownItemID(lL, formations[lL], "chooseFormation");
		}				
		renderTeamFormationPickFormationString += "<br />" + divEnd + divEnd;
	renderTeamFormationPickFormationString += divEnd + divEnd;
	return renderTeamFormationPickFormationString;
};

function renderTeamFormationPlayers(rTF) {
	console.log("formationKickerList");
	let renderTeamFormationPlayersString = setDivID("formationKickerList");
	for (i=0; i< rTF.players.length; i++) {
		renderTeamFormationPlayersString += renderPlayerFormation(rTF.players[i]);
	}
	renderTeamFormationPlayersString += divEnd;
	if(gameData.isTest == false) {
		gameData.isTest = true;
		console.log(renderTeamFormationPlayersString);
	}
	return renderTeamFormationPlayersString;
};


function renderTeamFormation(rTF) {
	renderTeamString = renderTeamFormationPickFormation(rTF);
	renderTeamString += renderTeamFormationStats(rTF);
	renderTeamString += renderTeamFormationPlayers(rTF);
	return renderTeamString;
};


function refreshTeamFormation(rTF) {
	document.getElementById("teamStats").innerHTML = renderTeamFormationStats(rTF);
	document.getElementById("formationKickerList").innerHTML = renderTeamFormationPlayers(rTF);
};



function renderTeamTraining(rTT) {
	renderTeamString = cardStart50;
		renderTeamString += cardHeaderStart;
			renderTeamString += "<h3>Team</h3>";
		renderTeamString += divEnd;
		renderTeamString += cardBodyStart;
			renderTeamString += "Spielstärke: " + rTT.team.teamPlaymaking + "<br />";
			renderTeamString += "Defensiv: " + rTT.team.teamDefense + "<br />";
			renderTeamString += "Offensiv: " + rTT.team.teamOffense + "<br />";
			renderTeamString += renderTacticalFormation(rTT.team);
		renderTeamString += divEnd;
	renderTeamString += divEnd;
	renderTeamString += renderCoachCard(rTT);
	for (i=0; i< rTT.team.players.length; i++) {
		renderTeamString += renderPlayerTraining(rTT.team.players[i]);
	}
return renderTeamString;
};

function renderTeamContracts(rTC) {
	renderTeamString = "";//renderTeamMenu();
	for (i=0; i< rTC.players.length; i++) {
		renderTeamString += renderPlayerContract(rTC.players[i]);
	}
	return renderTeamString;
}

function renderCancelContract(rCContract) {
	mainMenuString = renderTeamMenu();
	let cancelPlayer = -1;
	for (i = 0; i <rCContract.players.length;i++) {
		if(rCContract.players[i].playerId == client.value) {
			cancelPlayer = i;
		}
	}			
	mainMenuString += sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<div id=\"selectSingleKicker\" value="+ rCContract.players[cancelPlayer].playerId + "><strong>" + rCContract.players[cancelPlayer].firstname + " " + rCContract.players[cancelPlayer].lastname + "</strong><br />Position: " + positionNames[rCContract.players[cancelPlayer].position] + "<br />Alter: " + rCContract.players[cancelPlayer].age + "</div>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += Math.round(rCContract.players[cancelPlayer].defense*rCContract.players[cancelPlayer].skill*10000)/100 + "% defensiv" + "<br />" + 
						Math.round((1-rCContract.players[cancelPlayer].defense)*rCContract.players[cancelPlayer].skill*10000)/100 + "% offensiv";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"confirmCancelContract\" value="+ rCContract.players[cancelPlayer].playerId + " >" + "Confirm contract cancellation" + "</button>"; 	//+ "data-toggle=\"modal\" data-target=\"#cancelContract\"
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
}


