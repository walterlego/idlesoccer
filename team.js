var team = function(isHuman) {
	this.isHuman = isHuman;
	this.id = gameData.newTeamId++;
	this.hasKeeper = false;
	this.squadCount = 0;
	this.benchCount = 0;
	this.players = [];
	this.setTeamFormation = function() {
		//Random Formation
		var choseFormation = Math.random() * 5;
		var Defenders, Midfielders, Strikers = 0;
		if (choseFormation < 1) {
			//4 3 3
			Defenders = 4;
			Midfielders = 3;
			Strikers = 3;
		} else if (choseFormation < 2) {
			//3 4 3
			Defenders = 3;
			Midfielders = 4;
			Strikers = 3;
		} else if (choseFormation < 3) {
			//4 4 2
			Defenders = 4;
			Midfielders = 4;
			Strikers = 2;
		} else if (choseFormation < 4) {
			//4 5 1
			Defenders = 4;
			Midfielders = 5;
			Strikers = 1;
		} else {
			//3 5 2
			Defenders = 3;
			Midfielders = 5;
			Strikers = 2;
		}
		var theChosenOne = -1;
		var maxValue = -1;
		var maxOffence = -1;
		var compareBuffer = -1;
		//KEEPER
		for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
			compareBuffer = this.players[iterPlayers].defense * this.players[iterPlayers].skill;
			if (compareBuffer > maxValue) {
				theChosenOne = iterPlayers;
			}
		}
		this.players[theChosenOne].position = KEEPER;
		theChosenOne = -1;
		maxValue = -1;
		compareBuffer = -1;
		//STRIKER
		for (nominateStrikers = 0; nominateStrikers < Strikers; nominateStrikers++) {
			for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
				if (this.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = (1- this.players[iterPlayers].defense) * this.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
					}
				}
			}
			this.players[theChosenOne].position = STRIKER;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
		//DEFENCE
		for (nominateDefenders = 0; nominateDefenders < Defenders; nominateDefenders++) {
			for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
				if (this.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = this.players[iterPlayers].defense * this.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
					}
				}
			}
			this.players[theChosenOne].position = DEFENCE;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
		//MIDFIELD
		for (nominateMidfielders = 0; nominateMidfielders < Midfielders; nominateMidfielders++) {
			for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
				if (this.players[iterPlayers].position == NOTNOMINATED) {
					compareBuffer = this.players[iterPlayers].skill;
					if (compareBuffer > maxValue) {
						theChosenOne = iterPlayers;
					}
				}
			}
			this.players[theChosenOne].position = MIDFIELD;
			theChosenOne = -1;
			maxValue = -1;
			compareBuffer = -1;
		}
	};
	for (j=0; j<18; j++) {
		newKicker = new kicker(j);
		this.players.push(newKicker);
	}
	if(this.isHuman == false) {
		this.setTeamFormation();
	}
	this.getTeamDefense = function () {
		var teamDefense = 0;
		for (i=0; i< this.players.length; i++) {
			if (this.players[i].position < BENCH) {
				teamDefense += this.players[i].getDefense();
			}
		}
		return teamDefense;
	};
	this.getTeamOffense = function () {
		var teamOffense = 0;
		for (i=0; i< this.players.length; i++) {
			if (this.players[i].position < BENCH) {
				teamOffense += getOffense(this.players[i]);
			}
		}
		return teamOffense;
	};
	this.getTeamPlaymaking = function () {
		var teamPlaymaking = 0;
		for (i=0; i< this.players.length; i++) {
			if (this.players[i].position < BENCH) {
				teamPlaymaking += this.players[i].playmaking;
			}
		}
		return teamPlaymaking;
	};
	this.teamDefense = this.getTeamDefense();
	this.teamOffense = this.getTeamOffense();
	this.playmaking = this.getTeamPlaymaking();
	this.update = function() {
		//empty
	};
	//Training
	this.training = function() {
		for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
			this.players[iterPlayers].training();
		}
	};
	this.gameDay = function() {
		for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
			this.players[iterPlayers].match();
		}
	}
	this.renderFormation = function () {
		var formationString = "";
		var perPosition = 0;
		for (iPosition = DEFENCE; iPosition < BENCH; iPosition++){
			perPosition = 0;
			for (i=0; i< gameData.player.club.team.players.length; i++) {
				if (gameData.player.club.team.players[i].position == iPosition){
					perPosition++;
				}
			}
			formationString += perPosition + " - ";
		}
		formationString = formationString.substring(0, formationString.length - 3);
		return formationString;
	};
	this.nextSeason = function() {
		for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
			if (this.players[iterPlayers].nextSeason()<0) {	//player retires
				console.log("Pre", this.players);
				this.players.splice(iterPlayers, 1);
				console.log("Post", this.players);
			}
		}
		var addNumOfKickers = Math.round(Math.random()*3);
		for (addPlayers = 0; addPlayers<addNumOfKickers; addPlayers++) {
			this.addJuniorKicker();
		}
		if(this.isHuman == false) {
			this.setTeamFormation();
		}
	};
	this.firePlayer = function(firePlayer) {
		for (iterPlayers = 0; iterPlayers < this.players.length; iterPlayers++) {
			if (this.players[iterPlayers].playerId == firePlayer) {	//player retires
				console.log("Pre", this.players);
				this.players.splice(iterPlayers, 1);
				console.log("Post", this.players);
			}
		}
	};
	this.addJuniorKicker = function() {
		this.players.push(new kicker(-1));
	};
	return this;
};



function setTeamMenu() {
	//teamMenuString = renderTeamMenu(gameData.player.club.team);
	console.log("deprecated function: setTeamMenu");
	//return teamMenuString;
};

function renderPlayerFormation(rPlayer) {
	//console.log(rPlayer);
	//mainMenuString = renderTeamMenu();
	mainMenuString = sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<div id=\"selectSingleKicker\" value="+ rPlayer.playerId + "><strong>" + rPlayer.firstname + " " + rPlayer.lastname + "</strong><br />Talent: " +  Math.round(rPlayer.talent*10000)/100 + "<br />Alter: " + rPlayer.age + "</div>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString +=  	Math.round(rPlayer.defense*rPlayer.skill*10000)/100 + "% defensiv" + "<br />" + 
						Math.round((1-rPlayer.defense)*rPlayer.skill*10000)/100 + "% offensiv";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchPosition\" value="+ rPlayer.playerId + " >" + positionNames[rPlayer.position] + "</button>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += rPlayer.renderDefense() + "<br />" + rPlayer.renderOffense();
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
};

function renderPlayerTraining(rPlayer) {
	//console.log(rPlayer);
	//mainMenuString = renderTeamMenu();
	mainMenuString = sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<div id=\"selectSingleKicker\" value="+ rPlayer.playerId + "><strong>" + rPlayer.firstname + " " + rPlayer.lastname + "</strong><br />Talent: " +  Math.round(rPlayer.talent*10000)/100 + "<br />Alter: " + rPlayer.age + "</div>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += Math.round(rPlayer.defense*rPlayer.skill*10000)/100 + "% defensiv" + "<br />" + 
						Math.round((1-rPlayer.defense)*rPlayer.skill*10000)/100 + "% offensiv";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchTrainingFocus\" value="+ rPlayer.playerId + " >" + trainingFocus[rPlayer.trainingFocus-1] + "</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
};


function renderTeamMenu() {
	
	renderTeamMenuString = ""
	renderTeamMenuString = sectionStart;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToFormation\">Formation</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToTraining\">Training</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += colStart;
	renderTeamMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToTeamContracts\">Contracts</button>";
	renderTeamMenuString += colEnd;
	renderTeamMenuString += sectionEnd;
	return renderTeamMenuString;
}

function renderTeamFormation() {
	renderTeamString = renderTeamMenu();
	renderTeamString += colStart;
	renderTeamString += "Spielstärke: " + getTeamPlaymaking(gameData.player.club.team);
	renderTeamString += colEnd;
	renderTeamString += colStart;
	renderTeamString += "Defensiv: " + gameData.player.club.team.getTeamDefense()+ "<br />";
	renderTeamString += colEnd;
	renderTeamString += colStart;
	renderTeamString += "Offensiv: " + gameData.player.club.team.getTeamOffense();
	renderTeamString += colEnd;
	renderTeamString += sectionEnd;
	renderTeamString += sectionStart;
	renderTeamString += colStart;
	renderTeamString += gameData.player.club.team.renderFormation();
	renderTeamString += colEnd;
	renderTeamString += sectionEnd;
	for (i=0; i< gameData.player.club.team.players.length; i++) {
		renderTeamString += gameData.player.club.team.players[i].renderPlayerFormation();
	}
	return renderTeamString;
};

function renderTeamTraining() {
	renderTeamString = renderTeamMenu();
	renderTeamString += sectionStart;
	renderTeamString += colStart;
	renderTeamString += "Spielstärke: <br />" + getTeamPlaymaking(gameData.player.club.team);
	renderTeamString += colEnd;
	renderTeamString += colStart;
	renderTeamString += "Defensiv: " + getTeamDefense(gameData.player.club.team)+ "<br />" + "Offensiv: " + getTeamOffense(gameData.player.club.team);
	renderTeamString += colEnd;
	renderTeamString += sectionEnd;
	renderTeamString += sectionStart;
	renderTeamString += colStart;
	renderTeamString += gameData.player.club.team.renderFormation();
	renderTeamString += colEnd;
	renderTeamString += sectionEnd;
	for (i=0; i< gameData.player.club.team.players.length; i++) {
		renderTeamString += renderPlayerTraining(gameData.player.club.team.players[i]);
	}
	return renderTeamString;
};

function renderTeamContracts() {
	renderTeamString = renderTeamMenu();
	for (i=0; i< gameData.player.club.team.players.length; i++) {
		renderTeamString += renderPlayerContract(gameData.player.club.team.players[i]);
	}
	return renderTeamString;
};



function getTeamPlaymaking(gTeam) {
	var teamPlaymaking = 0;
	for (i=0; i< gTeam.players.length; i++) {
		if (gTeam.players[i].position < BENCH) {
			teamPlaymaking += gTeam.players[i].playmaking;
		}
	}
	return teamPlaymaking;
};

function getTeamDefense(gTeam) {
	var teamDefense = 0;
	for (i=0; i< gTeam.players.length; i++) {
		if (gTeam.players[i].position < BENCH) {
			teamDefense += gTeam.players[i].getDefense();
		}
	}
	return teamDefense;
};

function getTeamOffense(gTeam) {
	var teamOffense = 0;
	for (i=0; i< gTeam.players.length; i++) {
		if (gTeam.players[i].position < BENCH) {
			teamOffense += getOffense(gTeam.players[i]);
		}
	}
	return teamOffense;
};

function renderFormation() {
	var formationString = "";
	var perPosition = 0;
	for (iPosition = DEFENCE; iPosition < BENCH; iPosition++){
		perPosition = 0;
		for (i=0; i< gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].position == iPosition){
				perPosition++;
			}
		}
		formationString += perPosition + " - ";
	}
	formationString = formationString.substring(0, formationString.length - 3);
	return formationString;
};

function sortTeam() {
	var sNumber = 0;
	for (iPosition = KEEPER; iPosition < INJURED; iPosition++){
		for (i=0; i< gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].position == iPosition){
				sNumber++;
				gameData.player.club.team.players[i].rueckenNummer = sNumber;
			}
		}
	}
};
