var kicker = function(rueckenNummer) {
	this.defense= Math.random();
	this.skill = (Math.random() + Math.random()) / 2;	//Ligafaktor einbauen
	this.talent = (Math.random() + Math.random()) / 2;	//Ligafaktor einbauen
	this.position = NOTNOMINATED;
	this.rueckenNummer = -1;
	if (rueckenNummer > -1) {
		this.age= Math.floor(Math.random()*20)+17;
	} else {
		this.age= Math.floor(Math.random()*4)+16;
	}
	this.exp= 1;
	this.firstname = firstNames[Math.floor(Math.random()*firstNames.length)];
	this.lastname = lastNames[Math.floor(Math.random()*lastNames.length)];
	this.contractDuration = 2;
	this.autoextendContract = true;
	this.salary = 0;
	this.value = 0;
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
	this.training = function() {
		if (this.trainingFocus == DEFENCE) {
			this.defense *= (1+(gameData.player.club.coach*TRAININGEFFECTIVITY*(REFERENCEAGE/this.age)*POSITIONVSSKILL));
			if (this.defense > 1) {
				this.defense = 1;
			}
			this.skill *= POSITIONVSSKILL*Math.pow(gameData.player.club.coach*((AGEBALANCING+REFERENCEAGE)/(this.age+AGEBALANCING)),(TRAININGEFFECTIVITY*this.talent));
		} else if (this.trainingFocus == STRIKER) {
			this.defense *= (1-(gameData.player.club.coach*TRAININGEFFECTIVITY*(REFERENCEAGE/this.age)*POSITIONVSSKILL));
			if (this.defense < 0) {
				this.defense = 0;
			}
			this.skill *= Math.pow(gameData.player.club.coach*((AGEBALANCING+REFERENCEAGE)/(this.age+AGEBALANCING)),(TRAININGEFFECTIVITY*this.talent)*POSITIONVSSKILL);
		} else if (this.trainingFocus == MIDFIELD) {
			var pre = this.talent;
			this.skill *= Math.pow(gameData.player.club.coach*((AGEBALANCING+REFERENCEAGE)/(this.age+AGEBALANCING)),(TRAININGEFFECTIVITY*this.talent));
			//console.log("TRAINING age " + this.talent + " diff: " + ((this.talent - pre)/this.talent));
		}
	};
	this.match = function() {
		if (this.position < BENCH) {
			var pre = this.skill;
			this.skill *= Math.pow(gameData.player.club.coach*((AGEBALANCING+REFERENCEAGE)/(this.age+AGEBALANCING)*((LEAGUEBALANCING+16)/(gameData.league.level+LEAGUEBALANCING))),TRAININGEFFECTIVITY*this.talent);
			//console.log("GAME age " + this.age + " diff: " + ((this.skill - pre)/this.skill));
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
		mainMenuString += "<div id=\"selectSingleKicker\" value="+ this.playerId + "><strong>" + this.firstname + " " + this.lastname + "</strong><br />Talent: " +  Math.round(this.talent*10000)/100 + "<br />Alter: " + this.age + "</div>";
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
	this.nextSeason = function() {
		this.contractDuration--;
		if (this.contractDuration == 0) {
			if (this.autoextendContract == true) {
				if ((Math.random()*0.35)*(this.age-29)<1) {	//=($A3-29)*(0,35*B$2)
					this.extendContract();
					this.age++;
				} else {
					console.log(this.firstname + this.lastname +" geht mit "+ this.age + " in Rente.");
					return -1;
				}
			}
		}
	};
	this.extendContract = function() {
		this.salary = this.skill;
		console.log(this.salary);
		this.value = (this.skill*100) / Math.pow(this.age,2);
		console.log(this.value);
		this.contractDuration += 2;
	};
	this.extendContractConfirmation = function() {
		this.salary = this.skill;
		console.log(this.salary);
		this.value = (this.skill*100) / Math.pow(this.age,2);
		console.log(this.value);
		this.contractDuration += 2;
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

function renderPlayerContract(rPlayer) {
	//console.log(rPlayer);
	//mainMenuString = renderTeamMenu();
	mainMenuString = sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<div id=\"selectSingleKicker\" value="+ rPlayer.playerId + "><strong>" + rPlayer.firstname + " " + rPlayer.lastname + "</strong><br />Position: " + positionNames[rPlayer.position] + "<br />Alter: " + rPlayer.age + "</div>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString +=  	Math.round(rPlayer.defense*rPlayer.skill*10000)/100 + "% defensiv" + "<br />" + 
						Math.round((1-rPlayer.defense)*rPlayer.skill*10000)/100 + "% offensiv";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"extendContract\" value="+ rPlayer.playerId + " >" + "Extend contract" + "</button>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"cancelContract\" value="+ rPlayer.playerId + " >" + "Cancel contract" + "</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
};

function renderCancelContract() {
	mainMenuString = renderTeamMenu();
	mainMenuString += sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<div id=\"selectSingleKicker\" value="+ gameData.player.club.team.players[client.value].playerId + "><strong>" + gameData.player.club.team.players[client.value].firstname + " " + gameData.player.club.team.players[client.value].lastname + "</strong><br />Position: " + positionNames[gameData.player.club.team.players[client.value].position] + "<br />Alter: " + gameData.player.club.team.players[client.value].age + "</div>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += Math.round(gameData.player.club.team.players[client.value].defense*gameData.player.club.team.players[client.value].skill*10000)/100 + "% defensiv" + "<br />" + 
						Math.round((1-gameData.player.club.team.players[client.value].defense)*gameData.player.club.team.players[client.value].skill*10000)/100 + "% offensiv";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"confirmCancelContract\" value="+ gameData.player.club.team.players[client.value].playerId + " >" + "Confirm contract cancellation" + "</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
}