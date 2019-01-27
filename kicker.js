var kicker = function(rueckenNummer) {
	this.defense= Math.random();
	this.skill = (Math.random() + Math.random()) / 2;	//Ligafaktor einbauen
	this.position = NOTNOMINATED;
	this.rueckenNummer = -1;
	this.age= Math.floor(Math.random()*20)+17;
	this.exp= 1;
	this.firstname = firstNames[Math.floor(Math.random()*firstNames.length)];
	this.lastname = lastNames[Math.floor(Math.random()*lastNames.length)];
	this.playerId = gameData.playerId;
	this.trainingFocus = MIDFIELD;
	this.getDefense = function() {
		var cDefense = this.defense;
		if (this.position == KEEPER){
			cDefense*=1.8;
		} else if (this.position == DEFENCE){
			cDefense*=1.4;
		} else if (this.position == MIDFIELD){
			cDefense*=1;
		} else if (this.position == STRIKER){
			cDefense*=0.6;
		} else if (this.position == INJURED){
			cDefense*=0.2;
		}
		return cDefense*this.skill;
	};
	this.renderDefense = function () {
		return Math.round(this.getDefense()*10000)/100 + "% defensiv";
	};
	this.getOffense = function () {
		var cOffense = 1 - this.defense;
		if (this.position == KEEPER){
			cOffense*=0.2;
		} else if (this.position == DEFENCE){
			cOffense*=0.6;
		} else if (this.position == MIDFIELD){
			cOffense*=1;
		} else if (this.position == STRIKER){
			cOffense*=1.4;
		}
		return cOffense*this.skill;
	};
	this.renderOffense = function () {
		return Math.round(this.getOffense()*10000)/100 + "% offensiv";
	};
	this.getPlaymaking = function () {
		var cPlaymaking = this.playmaking = 1 / (Math.abs(0.5-this.defense)+0.75);
		if (this.position == KEEPER){
			cPlaymaking*=0.1;
		} else if (this.position == DEFENCE){
			cPlaymaking*=0.6;
		} else if (this.position == MIDFIELD){
			cPlaymaking*=1.4;
		} else if (this.position == STRIKER){
			cPlaymaking*=0.7;
		}
		//console.log(cPlaymaking);
		return cPlaymaking *this.skill;
	}
	this.togglePosition = function() {
		if(this.position == KEEPER) {
				this.position++;
				gameData.player.club.team.hasKeeper = false;
		} else if (this.position < NOTNOMINATED){
			this.position++;
			if (this.position == BENCH){
				gameData.player.club.team.squadCount--;
				this.benchCount++;
			}
		} else {
				if (gameData.player.club.team.squadCount < 11) {
					if (gameData.player.club.team.hasKeeper == false) {
						this.position = KEEPER;
						gameData.player.club.team.hasKeeper = true;
					} else {
						this.position = DEFENCE;
					}
					gameData.player.club.team.squadCount++;
					this.benchCount--;
					//
				} else {
					this.position = BENCH;
				}
		}
		this.playmaking = this.getPlaymaking();
		this.playDefense = this.getDefense();
		this.playOffense = this.getOffense();
	};
	this.toggleTrainingFocus = function() {
		if (this.trainingFocus < STRIKER){
			this.trainingFocus++;
		} else {
			this.trainingFocus = DEFENCE;
		}
	};
	this.playDefense = this.getDefense();
	this.playOffense = this.getOffense();
	this.playmaking = this.getPlaymaking();
	this.renderPlayerFormation = function () {
		//console.log(rPlayer);
		//mainMenuString = renderTeamMenu();
		mainMenuString = sectionStart;
		mainMenuString += colStart;
		mainMenuString += "<div id=\"selectSingleKicker\" value="+ this.playerId + "><strong>" + this.firstname + " " + this.lastname + "</strong></div><br />Alter: " + this.age;
		mainMenuString += colEnd;
		mainMenuString += colStart;
		mainMenuString +=  	Math.round(this.defense*this.skill*10000)/100 + "% defensiv" + "<br />" + 
							Math.round((1-this.defense)*this.skill*10000)/100 + "% offensiv";
		mainMenuString += colEnd;
		mainMenuString += colStart;
		mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchPosition\" value="+ this.playerId + " >" + positionNames[this.position] + "</button>";
		mainMenuString += colEnd;
		mainMenuString += colStart;
		mainMenuString += this.renderDefense() + "<br />" + this.renderOffense();
		mainMenuString += colEnd;
		mainMenuString += sectionEnd;
		return mainMenuString;
	};
	gameData.playerId++;
};

/*
var KEEPER			= 0;
var DEFENCE			= 1;
var MIDFIELD		= 2;
var STRIKER			= 3;
var BENCH			= 4;
var NOTNOMINATED	= 5;
var INJURED			= 6;
*/




function getOffense(getKicker) {
	var cOffense = 1 - getKicker.defense;
	if (getKicker.position == KEEPER){
		cOffense*=0.2;
	} else if (getKicker.position == DEFENCE){
		cOffense*=0.6;
	} else if (getKicker.position == MIDFIELD){
		cOffense*=1;
	} else if (getKicker.position == STRIKER){
		cOffense*=1.4;
	}
	return cOffense*getKicker.skill;
};

function renderOffense(getKicker) {
	return Math.round(getOffense(getKicker)*10000)/100 + "% offensiv";
};



function getPlaymaking(getKicker) {
	var cPlaymaking = getKicker.playmaking = 1 / (Math.abs(0.5-getKicker.defense)+0.75);
	if (getKicker.position == KEEPER){
		cPlaymaking*=0.1;
	} else if (getKicker.position == DEFENCE){
		cPlaymaking*=0.6;
	} else if (getKicker.position == MIDFIELD){
		cPlaymaking*=1.4;
	} else if (getKicker.position == STRIKER){
		cPlaymaking*=0.7;
	}
	//console.log(cPlaymaking);
	return cPlaymaking *getKicker.skill;
}


function setSingleKickerMenu(pPlayer) {
	return "klappt";
}
