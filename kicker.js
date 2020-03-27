var kicker = function(rueckenNummer, leagueLevel) {
	this.defense= Math.random();
	this.position = NOTNOMINATED;
	this.rueckenNummer = rueckenNummer;
	this.skill = ((Math.random() + Math.random())*(10-leagueLevel)) / 10;
	this.talent = (Math.random()  + Math.random()*(16-leagueLevel)) / 17;
	this.age= Math.floor(Math.random()*(40*this.talent))+16;
	this.exp= 1;
	this.firstname = firstNames[Math.floor(Math.random()*firstNames.length)];
	this.lastname = lastNames[Math.floor(Math.random()*lastNames.length)];
	this.contractDuration = 2;
	this.autoextendContract = true;
	this.salary = calculateKickerSalary(this);
	this.value = calculateKickerValue(this);
	this.playerId = gameData.playerId;
	gameData.playerId++;
	this.trainingFocus = MIDFIELD;
	this.playDefense = getKickerDefense(this);
	this.playOffense = getKickerOffense(this);
	this.playmaking = getKickerPlaymaking(this);

};



function getKickerDefense(getKicker) {
	var cDefense = getKicker.defense;
	if (getKicker.position == KEEPER){
		cDefense*=1.8;
	} else if (getKicker.position == DEFENCE){
		cDefense*=1.4;
	} else if (getKicker.position == MIDFIELD){
		cDefense*=1;
	} else if (getKicker.position == STRIKER){
		cDefense*=0.6;
	} else if (getKicker.position == INJURED){
		cDefense*=0.2;
	}
	return cDefense*getKicker.skill;
};

function renderKickerDefense(getKicker) {
	return Math.round(getKickerDefense(getKicker)*10000)/100 + "% defensiv";
};

function getKickerOffense(getKicker) {
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

function renderKickerOffense(getKicker) {
	return Math.round(getKickerOffense(getKicker)*10000)/100 + "% offensiv";
};

function getKickerPlaymaking(getKicker) {
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
	return cPlaymaking *getKicker.skill;
}

function toggleKickerTrainingFocus(getKicker) {
	if (getKicker.trainingFocus < STRIKER){
		getKicker.trainingFocus++;
	} else {
		getKicker.trainingFocus = DEFENCE;
	}
};


function kickerTraining(getKicker) {
	//Skill 	= Skill * Trainerlevel								* Alter		^ Talent
	let trainingEffect = Math.pow(Math.pow(gameData.player.club.coach,COACHEFFICIENCY)*Math.pow(((AGEBALANCING+REFERENCEAGE)/(getKicker.age+AGEBALANCING)),AGEEXPONENT),(TRAININGTALENTEFFECTIVITY*getKicker.talent));
	//console.log(trainingEffect);
	if (getKicker.trainingFocus == DEFENCE) {
		getKicker.defense *= trainingEffect;
		if (getKicker.defense > 1) {
			getKicker.defense = 1;
		}
		getKicker.skill *= (((trainingEffect-1)*0,75)+1);
	} else if (getKicker.trainingFocus == STRIKER) {
		getKicker.defense /= trainingEffect;
		if (getKicker.defense < 0) {
			getKicker.defense = 0;
		}
		getKicker.skill *= (((trainingEffect-1)*0,75)+1);
	} else if (getKicker.trainingFocus == MIDFIELD) {
		//Skill 	= Skill * Trainerlevel								* Alter		^ Talent
		getKicker.skill *= trainingEffect;
	}
};

function kickerMatch (getKicker) {
	if (getKicker.position < BENCH) {
		var pre = getKicker.skill;
		getKicker.skill *= Math.pow(Math.pow(gameData.player.club.coach,COACHEFFICIENCY)*Math.pow(((AGEBALANCING+REFERENCEAGE)/(getKicker.age+AGEBALANCING)),AGEEXPONENT),(TRAININGTALENTEFFECTIVITY*getKicker.talent));
	}
};

function kickerNextSeason(getKicker) {
	getKicker.contractDuration--;
	if (getKicker.contractDuration == 0) {
		if (getKicker.autoextendContract == true) {
			if ((Math.random()*0.35)*(getKicker.age-29)<1) {	//=($A3-29)*(0,35*B$2)
				extendKickerContract(getKicker);
				getKicker.age++;
			} else {
				//console.log(getKicker.firstname + getKicker.lastname +" geht mit "+ getKicker.age + " in Rente.");
				return -1;
			}
		}
	}
};


function calculateKickerSalary(getKicker) {
	getKicker.salary = Math.pow(getKicker.skill+1,SALARYCONSTANT);
	return getKicker.salary;
};

function calculateKickerValue(getKicker) {
	getKicker.value = (getKicker.skill*VALUECONSTANT) / Math.pow(getKicker.age,VALUEAGEDEDUCTION);
	return getKicker.value;
};

function extendKickerContract(getKicker) {
	getKicker.salary = calculateKickerSalary(getKicker);
	getKicker.value = calculateKickerValue(getKicker);
	getKicker.contractDuration += 2;
};

function extendKickerContractConfirmation(getKicker) {
	getKicker.salary = Math.pow(getKicker.skill+1,SALARYCONSTANT);
	getKicker.value = (getKicker.skill*VALUECONSTANT) / Math.pow(getKicker.age,VALUEAGEDEDUCTION);
	getKicker.contractDuration += 2;
};


///////////////////////////////////////////
// Rendering
///////////////////////////////////////////


function renderPlayerFormation(getKicker) {
	
	mainMenuString = cardStart50;
		mainMenuString += cardHeaderStart;
			mainMenuString += "<div id=\"selectSingleKicker\" value="+ getKicker.playerId + ">" + getKicker.firstname + " " + getKicker.lastname + "</div>";
		mainMenuString += divEnd;
		mainMenuString += cardBodyStart;
			mainMenuString += "Talent: " +  Math.round(getKicker.talent*10000)/100 + "<br />Alter: " + getKicker.age + "<br />";
			mainMenuString += Math.round(getKicker.defense*getKicker.skill*10000)/100 + "% defensiv" + "<br />" + 
								  Math.round((1-getKicker.defense)*getKicker.skill*10000)/100 + "% offensiv" + "<br />";
			if (getKicker.position < BENCH){
				mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"switchPosition\" value="+ getKicker.playerId + " >" + positionNames[getKicker.position] + "</button>";
			} else {
				mainMenuString += "<button class=\"btn btn-secondary\" onmouseup=\"mUp(this)\" id=\"switchPosition\" value="+ getKicker.playerId + " >" + positionNames[getKicker.position] + "</button>";
			}
		mainMenuString += divEnd;
	mainMenuString += divEnd + divEnd;
	return mainMenuString;
};

function renderPlayerTraining(rpTraining) {
	mainMenuString = cardStart50;
		mainMenuString += cardHeaderStart;
			mainMenuString += "<div id=\"selectSingleKicker\" value="+ rpTraining.playerId + ">" + rpTraining.firstname + " " + rpTraining.lastname + "<br />" + "</div>";
		mainMenuString += divEnd;
		mainMenuString += cardBodyStart;
			mainMenuString += "Position: " +  positionNames[rpTraining.position] + "<br />" + "Talent: " +  Math.round(rpTraining.talent*10000)/100 + "<br />Alter: " + rpTraining.age + "<br />";
			mainMenuString += Math.round(rpTraining.defense*rpTraining.skill*10000)/100 + "% defensiv" + "<br />" + 
								Math.round((1-rpTraining.defense)*rpTraining.skill*10000)/100 + "% offensiv" + "<br />";
			mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"switchTrainingFocus\" value="+ rpTraining.playerId + " >" + trainingFocus[rpTraining.trainingFocus-1] + "</button>";
		mainMenuString += divEnd;
	mainMenuString += divEnd;
return mainMenuString;
};
	


function renderPlayerContract(rPC) {
	mainMenuString = cardStart50;
		mainMenuString += cardHeaderStart;
			mainMenuString += "<div id=\"selectSingleKicker\" value="+ rPC.playerId + "><strong>" + rPC.firstname + " " + rPC.lastname + "</strong><br />" + "</div>";
		mainMenuString += divEnd;
		mainMenuString += cardBodyStart;			
			mainMenuString += "Position: " + positionNames[rPC.position] + "<br />Talent: " +  Math.round(rPC.talent*10000)/100 + "<br />Alter: " + rPC.age + "<br />";
			mainMenuString +=  	Math.round(rPC.defense*rPC.skill*10000)/100 + "% defensiv" + "<br />" + 
									Math.round((1-rPC.defense)*rPC.skill*10000)/100 + "% offensiv" + "<br />";
			mainMenuString += "Gehalt: " + rPC.salary + "<br />Marktwert: " + rPC.value + "<br />";
			mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"extendContract\" value="+ rPC.playerId + " >" + "Extend contract" + "</button>" + "<br />";
			mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"cancelContract\" value="+ rPC.playerId + " >" + "Cancel contract" + "</button>";
		mainMenuString += divEnd;
	mainMenuString += divEnd;
	return mainMenuString;
};

/*

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
	mainMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"confirmCancelContract\" value="+ gameData.player.club.team.players[client.value].playerId + " >" + "Confirm contract cancellation" + "</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	return mainMenuString;
}
*/