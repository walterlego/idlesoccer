//player

var player = function() {
	this.exp = 0;
	this.firstName = gameData.playerFirstName;
	this.lastName = gameData.playerLastName;
	this.leagueLevel = gameData.initLeagueLevel;
	console.log("typeof(gameData.initLeagueLevel)", typeof(gameData.initLeagueLevel));
	this.leagueDivision = gameData.initLeagueDivision;
	this.club = new club(true, this.leagueLevel, this.leagueDivision);
	this.leaguePlace = -1;
	gameData.displayLeagueLevel = this.leagueLevel;
	gameData.displayLeagueDivision = this.leagueDivision;
	return this;
	//console.log(this);
};

function updateHumanLeagueposition() {
	let playerPlace=0;
	let searchHumanClub = -1;
	let humanRanking = -1;
	while (searchHumanClub == -1) {
		if (gameData.leagues[gameData.player.club.leagueLevel][gameData.player.club.leagueDivision].clubs[playerPlace].isHuman == true) {
			searchHumanClub = playerPlace;
		}
		playerPlace++;
	}
	for (humanRanking=0; humanRanking < gameData.leagues[gameData.player.club.leagueLevel][gameData.player.club.leagueDivision].table.length; humanRanking++) {
		if (gameData.leagues[gameData.player.club.leagueLevel][gameData.player.club.leagueDivision].table[humanRanking] == searchHumanClub) {
			gameData.player.club.leaguePlace = humanRanking;
		}
	}
}

//////////////////////////////////////////////////////////////////////
////////////// getters ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function initGetFirstName() {
	gameData.playerFirstName = document.getElementById("firstNameInput").value;
	console.log("gameData.playerFirstName", gameData.playerFirstName);
}

function initGetManagerName() {
	if(document.getElementById("firstNameInput").value.length != 0) {
		gameData.playerFirstName = document.getElementById("firstNameInput").value;
		console.log(gameData.playerFirstName);
	}
	if(document.getElementById("lastNameInput").value.length != 0){
		gameData.playerLastName = document.getElementById("lastNameInput").value;
	}
	console.log("Name: ", gameData.playerFirstName, gameData.playerLastName);
}

function initSubmitManagerName() {
	let testName = true;
	if (gameData.playerFirstName == -1) {
		testName = false;
	}
	if (gameData.playerLastName == -1) {
		testName = false;
	}
	console.log("Name: ", gameData.playerFirstName, gameData.playerLastName, testName);
	return testName;
}

function initGetRandomManagerName() {
	gameData.playerFirstName = firstNames[Math.floor(Math.random()*firstNames.length)];
	gameData.playerLastName = lastNames[Math.floor(Math.random()*lastNames.length)];
}


function renderChooseManagerName() {
	//Card start
	let initHTMLString = cardStart;
		//Card header
		initHTMLString += cardHeaderStart;
			initHTMLString += "<b>Choose your name</b>";
		initHTMLString += divEnd;
		//Card body
		initHTMLString += cardBodyStart;	
			initHTMLString += "What's your first name?<br /><br />";
			if(gameData.playerFirstName == - 1){
				initHTMLString += "<div class=\"form-group\"><input type=\"text\" placeholder=\"Enter first name\" id=\"firstNameInput\" class=\"form-control\"></div>"
			} else {
				initHTMLString += "<div class=\"form-group\"><input type=\"text\" placeholder=\"" + gameData.playerFirstName + "\" id=\"firstNameInput\" class=\"form-control\"></div>"
			}
			initHTMLString += "What's your last name?<br /><br />";
			if(gameData.playerLastName == -1){
				initHTMLString += "<div class=\"form-group\"><input type=\"text\" placeholder=\"Enter last name\" id=\"lastNameInput\" class=\"form-control\"></div>";
			} else {
				initHTMLString += "<div class=\"form-group\"><input type=\"text\" placeholder=\"" + gameData.playerLastName + "\" id=\"lastNameInput\" class=\"form-control\"></div>";
			}
			initHTMLString += "<input type=\"button\" value=\"Submit name\" onmouseup=\"mUp(this)\"  id=\"managerNameInputButton\" class=\"btn btn-primary\">";
			initHTMLString += "   <input type=\"button\" value=\"Random name\" onmouseup=\"mUp(this)\"  id=\"randomNameButton\" class=\"btn btn-primary\">";
			initHTMLString += "<br /><br />Do you want to continue with this name?<br />";
			initHTMLString += "<strong>" + gameData.playerFirstName + " " + gameData.playerLastName + "</strong><br />";
			let buttonDisabled = "";
			if (gameData.playerFirstName == -1) {
				buttonDisabled = "disabled";
			}			
			if (gameData.playerLastName == -1) {
				buttonDisabled = "disabled";
			}				
			initHTMLString += "<input type=\"button\" value=\"Confirm your name\" onmouseup=\"mUp(this)\"  id=\"confirmManagerNameButton\" class=\"btn btn-primary\"" + buttonDisabled +">";
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}