//library

//game start
function setUp() {
	client.gui = CHOOSEMANAGERNAME;
	document.getElementById("headLine").innerHTML = printStatusLine();
	document.getElementById("game").innerHTML = renderChooseManagerName();
	
}
	
	
//set up leagues and start game
function startGame() {	
	console.log("startGame");
	//gameData.loop = window.setInterval(updateFrame, FRAMERATE);
	console.log("Setup");
	gameData.player = new player();
	if(initLeagues()){
		gameData.dateLoop = window.setInterval(nextDay, GAMEDAY);
		gameData.loop = window.setInterval(updateFrame, FRAMERATE);
		gameData.startUpTime = new Date().getTime();
		gameData.lastCircle = gameData.startUpTime;
	}
	///////////////////////
	// Pause code
	///////////////////////
	
	/*	if (gameData.dateLoop === null) {
			gameData.dateLoop = window.setInterval(nextDay, GAMEDAY);
		} else {
			clearInterval(gameData.dateLoop);
			gameData.dateLoop = null;
		}
	*/

	/*
	var savegame = JSON.parse(localStorage.getItem("idleSoccerSave"))
	if (savegame !== null) {
		console.log("Lade Spiel");
		console.log(savegame);
		gameData = savegame;
		loadGame();
	} else {
		
		console.log("Setup");
		gameData.player = new player();
		initLeagues();
		
	}
	*/
	client.gui = STADIUM;
	document.getElementById("navBarClubName").innerHTML = gameData.player.club.name;
};

function pauseGame() {
	if (gameData.dateLoop === null) {
		gameData.dateLoop = window.setInterval(nextDay, GAMEDAY);
		document.getElementById("pauseGame").innerHTML = "Pause";
	} else {
		clearInterval(gameData.dateLoop);
		gameData.dateLoop = null;
		document.getElementById("pauseGame").innerHTML = "Continue";
	}
}

//navBarClubName document.getElementById("navBarClubName").innerHTML = "Continue";

function nextDay() {
	gameData.gameDate.setDate(gameData.gameDate.getDate() + 1);
	//sell Tickets
	//ticketUpdate(gameData.player.club);
	//next month?
	if (gameData.gameDate.getDate() ==1) {
		nextMonth();
		if (gameData.gameDate.getMonth() ==1) {
			nextYear();
		}
	}
	for (lL=0; lL < gameData.leagues.length; lL++) {
		gameData.currentLeagueLevel = lL;
		for (lI=0; lI < gameData.leagues[lL].length; lI++) {
			gameData.currentLeagueDivision = lI;
			gameData.currentLeague = gameData.leagues[lL][lI];
			if (gameData.currentLeague.gameDate[gameData.currentLeague.currentGameDay].getDate() == gameData.gameDate.getDate()) {//.getTime() == gameData.gameDate.getTime()) {
				//Game day
				gameDay();
			} else {
				//Training
				trainingDay();
			}
		}
	}
	if (gameData.currentLeague.currentGameDay == 33) {
		if (gameData.gameDate.getMonth() == 7) {
			//Ligen abschließen, auf- und absteiger ermitteln und ablegen
			leagueNextSeason();
		}
	}
}

function nextMonth() {
	for (lL=0; lL < gameData.leagues.length; lL++) {
		for (lI=0; lI < gameData.leagues[lL].length; lI++) {
			for (i=0; i < gameData.leagues[lL][lI].clubs.length; i++) {
				clubNextMonth(gameData.leagues[lL][lI].clubs[i]);
			}
		}
	}
}

function nextYear() {
	for (lL=0; lL < gameData.leagues.length; lL++) {
		for (lI=0; lI < gameData.leagues[lL].length; lI++) {
			for (i=0; i < gameData.leagues[lL][lI].clubs.length; i++) {
				clubNextYear(gameData.leagues[lL][lI].clubs[i]);
			}
		}
	}
}

//////////////////////////////////////////
////   UPDATE FRAME
//////////////////////////////////////////

function updateFrame() {
	//gameData.currentCircle = new Date();
	//gameData.frameTime = gameData.currentCircle-gameData.lastCircle;
	gui = "";
	document.getElementById("headLine").innerHTML = printStatusLine();
	if (gameData.lastFrame != client.gui) {	// Screen is rendered for the first time
		//console.log("new frame");
		if (client.gui == CHOOSEMANAGERNAME){
			//sortTeam();
			gui += renderChooseManagerName();
		} else if (client.gui == CHOOSECITY) {
		//Build html of game
			gui += "";//renderClubMenu(gameData.player.club);
		} else if (client.gui == CHOOSECLUBNAME) {
		//Build html of game
			gui += "";//renderClubMenu(gameData.player.club);
		} else if (client.gui == CLUB) {
		//Build html of game
			gui += "";//renderClubMenu(gameData.player.club);
		} else if (client.gui == TEAM){
			//sortTeam();
			gui += renderTeamFormation(gameData.player.club.team);
		} else if (client.gui == STADIUM){
			gui += setStadiumMenu(gameData.player.club);
		} else if (client.gui == SINGLEKICKER){
			//gui += gameData.player.club.setSingleKickerMenu();
		} else if (client.gui == FORMATION){
			gui += renderTeamFormation(gameData.player.club.team);
		} else if (client.gui == TEAMTRAINING){
			gui += renderTeamTraining(gameData.player.club);
		}  else if (client.gui == TEAMCONTRACTS){
			gui += renderTeamContracts(gameData.player.club.team);
		} else if (client.gui == FINANCE){
			gui += renderFinanceMenu(gameData.player.club);
		} else if (client.gui == MARKETING){
			gui += renderMarketingMenu(gameData.player.club);
		} else if (client.gui == CANCELCONTRACT){
			gui += renderCancelContract(gameData.player.club.team);
		} else if (client.gui == PERSONNEL){
			gui += renderStaffMenu(gameData.player.club);	//renderStaffMenu
		} else if (client.gui == STATISTICS){
			gui += renderStatisticsMenu(gameData.player.club);	//renderStaffMenu
		} else if (client.gui == LEAGUEVIEW){
			gui += renderLeagueViewMenu();
		} else if (client.gui == GAMEDAYS){
			gui += renderPrintGameDayMenu();
		}
		gameData.lastFrame = client.gui;
		document.getElementById("game").innerHTML = gui;
	} else {		// Screen only needs refreshing
		//console.log("refresh");
		if (client.gui == TEAM){
			refreshTeamFormation(gameData.player.club.team);
		} else if (client.gui == STADIUM){
			gui += setStadiumMenu(gameData.player.club);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == SINGLEKICKER){
			//gui += gameData.player.club.setSingleKickerMenu();
		} else if (client.gui == FORMATION){
			refreshTeamFormation(gameData.player.club.team);
		} else if (client.gui == TEAMTRAINING){
			gui += renderTeamTraining(gameData.player.club);
			document.getElementById("game").innerHTML = gui;
		}  else if (client.gui == TEAMCONTRACTS){
			gui += renderTeamContracts(gameData.player.club.team);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == FINANCE){
			gui += renderFinanceMenu(gameData.player.club);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == MARKETING){
			gui += renderMarketingMenu(gameData.player.club);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == CANCELCONTRACT){
			gui += renderCancelContract(gameData.player.club.team);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == PERSONNEL){
			gui += renderStaffMenu(gameData.player.club);	//renderStaffMenu
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == STATISTICS){
			gui += renderStatisticsMenu(gameData.player.club);	//renderStaffMenu
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == LEAGUEVIEW){
			refreshLeagueViewMenu();
		} else if (client.gui == GAMEDAYS){
			gui += renderPrintGameDayMenu();
			//gui += refreshGameDayMenu();
			document.getElementById("game").innerHTML = gui;
		}
	}
};



//////////////////////////////////////////
////   CLICK HANDLER
//////////////////////////////////////////

function mUp(obj) {
	console.log("mUP: ", obj.value);
	if (obj.id == "pauseGame"){
		pauseGame();
	} else if (obj.id == "sellTicket"){
		clubSellTicket(gameData.player.club);
	} else if (obj.id == "switchToClub"){
		client.gui = CLUB;
	} else if (obj.id == "switchToTeam"){
		client.gui = FORMATION;
		sortTeam();
	} else if (obj.id == "switchToStadium"){
		client.gui = STADIUM;
	} else if (obj.id == "switchPosition"){
		console.log("switchPosition", obj.value);
		for (i = 0; i < gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].playerId == obj.value){
				toggleKickerPosition(gameData.player.club.team, gameData.player.club.team.players[i]);
			}
		}
	} else if (obj.id == "chooseFormation"){
		console.log("setTeamFormation", obj.title);
		gameData.player.club.team.chosenFormation = obj.title;
		gameData.player.club.team.formation = obj.title;
		setTeamFormation(gameData.player.club.team);
		document.getElementById("teamPickFormation").innerHTML = renderTeamFormationPickFormation(gameData.player.club.team);
	} else if (obj.id == "hireTicketVendor"){
		clubBuyTicketVendor(gameData.player.club);
	} else if (obj.id == "switchToFormation"){
		client.gui = FORMATION;
	} else if (obj.id == "switchToTraining"){
		client.gui = TEAMTRAINING;
	} else if (obj.id == "switchToTeamContracts"){
		client.gui = TEAMCONTRACTS;
	} else if (obj.id == "switchTrainingFocus"){
		for (i = 0; i < gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].playerId == obj.value){
				toggleKickerTrainingFocus(gameData.player.club.team.players[i]);
			}
		}
	} else if (obj.id == "cancelContract"){
		for (i = 0; i < gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].playerId == obj.value) {
				client.value = obj.value;
				console.log(obj.value);
				console.log(gameData.player.club.team);
			}
		}
		client.gui = CANCELCONTRACT;		
	} else if (obj.id == "confirmCancelContract"){
		firePlayer(gameData.player.club.team, client.value);
		client.gui = TEAMCONTRACTS;		
	} else if (obj.id == "switchToFinance"){
		client.gui = FINANCE;
	} else if (obj.id == "switchToMarketing"){
		console.log("reputation: ", gameData.player.club.reputation);
		client.gui = MARKETING;
	} else if (obj.id == "upgradePerimeterAdvertising"){
		upgradePerimeterAdvertising(gameData.player.club);
	} else if (obj.id == "downgradePerimeterAdvertising"){
		gameData.player.club.perimeterAdvertising--;
	} else if (obj.id == "switchToPersonnel"){
		client.gui = PERSONNEL;
	} else if (obj.id == "upgradeCoach"){
		upgradeCoach(gameData.player.club);
	} else if (obj.id == "downgradeCoach"){
		gameData.player.club.coach--;
	} else if (obj.id == "upgradeYouthAcademy"){
		clubUpgradeYouthAcademy(gameData.player.club);
	} else if (obj.id == "downgradeYouthAcademy"){
		gameData.player.club.youthAcademy--;
	} else if (obj.id == "upgradeTerraceCapacity"){
		upgradeTerraceSeating(gameData.player.club, obj.value);
	} else if (obj.id == "upgradeTerraceComfort"){
		upgradeTerraceComfort(gameData.player.club, obj.value);
	} else if (obj.id == "switchToStatistics"){
		client.gui = STATISTICS;
	} else if (obj.id == "switchToLeagueview"){
		client.gui = LEAGUEVIEW;
		gameData.displayLeagueLevel = gameData.player.club.leagueLevel;
		gameData.displayLeagueDivision = gameData.player.club.leagueDivision; //gameData.player.leagueDivision
	} else if (obj.id == "chooseLeagueLevel"){
		setLeagueLevelDisplay(obj.title);
		//document.getElementById("game").innerHTML = renderLeagueViewMenu();
		//console.log("Ligalevel", obj.title);
		//console.log(obj, obj.title);
	} else if (obj.id == "chooseLeagueDivision"){
		setLeagueDivisionDisplay(obj.title);
		//console.log("Division", obj.title);
		//console.log(obj);
	} else if (obj.id == "displayOwnLeague"){
		gameData.displayLeagueLevel = gameData.player.club.leagueLevel;
		gameData.displayLeagueDivision = gameData.player.club.leagueDivision;
		//document.getElementById("game").innerHTML = renderLeagueViewMenu();
	} else if (obj.id == "switchToGameDays"){
		client.gui = GAMEDAYS;	
	} else if (obj.id == "switchToEnterManagerName"){
		document.getElementById("game").innerHTML = renderChooseManagerName();
	} else if (obj.id == "managerNameInputButton"){
		initGetManagerName();
		document.getElementById("game").innerHTML = renderChooseManagerName();
	} else if (obj.id == "randomNameButton"){
		initGetRandomManagerName();
		document.getElementById("game").innerHTML = renderChooseManagerName();
	} else if (obj.id == "confirmManagerNameButton"){
		if(initSubmitManagerName() == true) {
			document.getElementById("game").innerHTML = renderGetCityName();
		}		
	} else if (obj.id == "cityNameInputButton"){
		initGetCityName();
		document.getElementById("game").innerHTML = renderGetCityName();
	} else if (obj.id == "chooseClubPrefix"){
		gameData.clubPrefix=clubPrefix[obj.title];
		console.log(gameData.clubPrefix);
		document.getElementById("game").innerHTML = renderGetClubName();
	} else if (obj.id == "chooseClubName"){
		gameData.clubName=clubMiddle[obj.title];
		console.log(gameData.clubName);
		document.getElementById("game").innerHTML = renderGetClubName();
	} else if (obj.id == "chooseClubCity"){
		gameData.clubTown=cityData[obj.title][0];
		console.log(gameData.clubTown);
		document.getElementById("game").innerHTML = renderGetCityName();
	} else if (obj.id == "randomCityButton"){
		let cityCandidate = Math.floor(Math.random()*cityData.length);
		gameData.clubTown = cityData[cityCandidate][0] + " ";
		gameData.clubZipCode = cityData[cityCandidate][2];
		console.log(gameData.clubTown);
		document.getElementById("game").innerHTML = renderGetCityName();
	}else if (obj.id == "confirmCityButton"){
		if(initSubmitCity() == true) {
			document.getElementById("game").innerHTML = renderGetClubName();
		}		
	} else if (obj.id == "generateRandomClubNameButton"){
		generateRandomClubName();
		document.getElementById("game").innerHTML = renderGetClubName();
	} else if (obj.id == "zipCodeInputButton"){
		initGetZipCode();
		document.getElementById("game").innerHTML = renderGetCityName();
	} else if (obj.id == "acceptClubNumberButton"){
		initGetClubNumber();
		document.getElementById("game").innerHTML = renderGetClubName();
	} else if (obj.id == "acceptClubNameButton"){
		document.getElementById("game").innerHTML = initGetDifficulty();
		//startGame();
	} else if (obj.id == "chooseInitLeagueLevel"){
		gameData.initLeagueLevel=obj.title;
		if(gameData.initLeagueDivision>gameData.leagueStructure[gameData.initLeagueLevel][0]) {
			gameData.initLeagueDivision=0;
		}
		console.log(leagueNames[obj.title]);
		document.getElementById("game").innerHTML = initGetDifficulty();
	} else if (obj.id == "chooseInitLeagueDivision"){
		gameData.initLeagueDivision=obj.title;
		console.log("Division " + (obj.title+1));
		document.getElementById("game").innerHTML = initGetDifficulty();
	} else if (obj.id == "renderInitDifficulty"){
		document.getElementById("game").innerHTML = initGetDifficulty();
	} else if (obj.id == "chooseInitDifficulty"){
		gameData.difficulty=obj.title;
		console.log("difficulty " + difficultyStrings[obj.title]);
		document.getElementById("game").innerHTML = initGetDifficulty();
	} else if (obj.id == "acceptDifficulty"){
		document.getElementById("game").innerHTML = confirmInit();
	}
	
	
	updateFrame();
}


/////////////////////
//TIMEKEEPING
/////////////////////

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMinutes = function(minutes) {
    var date = new Date(this.valueOf());
    date.setDate(date.getMinutes() + minutes);
    return date;
}



function printGameDate() {
	var dateString = weekDay[gameData.gameDate.getDay()] + ", ";
	dateString += gameData.gameDate.getDate()+".";
	dateString += (gameData.gameDate.getMonth()+1) + ".";
	dateString += gameData.gameDate.getFullYear();
	return dateString;
}



/////////////////////
//GUI
/////////////////////


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function loadGame() {
	console.log("loading");
	gameData.gameDate.getDay = gameData.gameDate = new Date(gameData.gameDate);
	console.log(gameData.player.club);
}


function printStatusLine() {
	var statusLineString = listGroupStart + listGroupItem;
	if (client.gui < GUISTATE){
		let testPlayerName = true;
		if(gameData.playerFirstName == -1){
			testPlayerName = false;
		}
		if(gameData.playerLastName == -1){
			testPlayerName = false;
		}
		if(testPlayerName) {
			statusLineString += strong + "Welcome " + gameData.playerFirstName + " " + gameData.playerLastName + "!" + strongEnd;
		} else {
			statusLineString += strong + "Welcome " + strongEnd;
		}
	} else {
		statusLineString += strong + gameData.player.club.name + strongEnd + leagueNames[gameData.player.club.leagueLevel] + " " + (gameData.player.club.leagueDivision+1) + " " + "Kontostand: " + gameData.player.club.cash.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + " " + printGameDate();
	}
	statusLineString += listItemEnd + listGroupEnd;
	return statusLineString;
}


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
  return array;
}


function renderGameInit() {
	//Card start
	let initHTMLString = cardStart;
		//Card header
		initHTMLString += cardHeaderStart;
			initHTMLString += "<b>Choose your club name</b>";
		initHTMLString += divEnd;
		//Card body
		initHTMLString += cardBodyStart;	
			//Table Start
			initHTMLString += tableStart;
				//Tablehead
				//Table body
				initHTMLString += "Let's find a name and a home town for your club!<br /><br />";
				initHTMLString += tBodyStart;
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += dropdownStart
							initHTMLString += "Will it be an 1. FC or a VfB?<br />";
							if (gameData.clubPrefix == -1) {
								initHTMLString += setDropdownButton("chooseClubPrefix", "Choose prefix");
							} else {
								initHTMLString += setDropdownButton("chooseClubPrefix", gameData.clubPrefix);
							}
							initHTMLString += setDrowpdownMenu("chooseClubPrefix");
							for (lL=0; lL < clubPrefix.length; lL++) {
								initHTMLString += setDropdownItemID(lL, clubPrefix[lL].toString(), "chooseClubPrefix");
							}
						initHTMLString += divEnd;
						initHTMLString += tableCellEnd;
						initHTMLString += tableCellStart;
						initHTMLString += dropdownStart
							initHTMLString += "Add a Fortuna or a Maccabi. This one is optional.<br />";
							if (gameData.clubName == -1) {
								initHTMLString += setDropdownButton("chooseClubName", "Choose club name");
							} else {
								initHTMLString += setDropdownButton("chooseClubName", gameData.clubName);
							}							
							initHTMLString += setDrowpdownMenu("chooseClubName");
							for (lL=0; lL < clubMiddle.length; lL++) {
								initHTMLString += setDropdownItemID(lL, clubMiddle[lL].toString(), "chooseClubName");
							}
						initHTMLString += divEnd;
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;			
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "The zip code is needed to find your regional league.<br />";
						initHTMLString += "<form><div class=\"form-group\"><input type=\"number\" placeholder=\"enter PLZ\" id=\"zipCodeInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Confirm ZIP code\" onmouseup=\"mUp(this)\"  id=\"zipCodeInputButton\" class=\"btn btn-primary\"></form>";
						initHTMLString += tableCellEnd;
						initHTMLString += tableCellStart;
						initHTMLString += "What's the name of the city?<br />";
						initHTMLString += "<form><div class=\"form-group\"><input type=\"text\" placeholder=\"Type city name...\" id=\"cityNameInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Confirm city\" onmouseup=\"mUp(this)\"  id=\"cityNameInputButton\" class=\"btn btn-primary\"></form>";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "Maybe add a founding year?<br />";
						initHTMLString += "<form><div class=\"form-group\"><input id=\"clubNumberInput\" type=\"text\" placeholder=\"04\" id=\"clubNumberInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Confirm club number\" onmouseup=\"mUp(this)\"  id=\"acceptClubNumberButton\" class=\"btn btn-primary\"></form>";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "You can also enter a whole new name<br />";
						initHTMLString += "<form><div class=\"form-group\"><input id=\"cityNameplaceholder\" type=\"text\" placeholder=\"Enter club name\" id=\"cityNameInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Confirm club name\" onmouseup=\"mUp(this)\"  id=\"acceptClubNameButton\" class=\"btn btn-primary\"></form>";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;	
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "Or generate a random name name<br />";
						initHTMLString += "<strong>" + gameData.clubPrefix + " ";
						if (gameData.clubName != -1) {
							initHTMLString += gameData.clubName + " ";
						}
						initHTMLString += gameData.clubTown;
						if (gameData.clubNumber != -1) {
							initHTMLString += " " + gameData.clubNumber;
						}
						initHTMLString += "</strong><br />";
						initHTMLString += "<input type=\"button\" value=\"Generate random name\" onmouseup=\"mUp(this)\"  id=\"generateRandomClubNameButton\" class=\"btn btn-primary\">";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;	
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "Do you want to continue with this name?<br />";
						initHTMLString += "<strong>" + gameData.clubPrefix + " ";
						if (gameData.clubName != -1) {
							initHTMLString += gameData.clubName + " ";
						}
						initHTMLString += gameData.clubTown;
						if (gameData.clubNumber != -1) {
							initHTMLString += " " + gameData.clubNumber;
						}
						initHTMLString += "</strong><br />";
						initHTMLString += "<input type=\"button\" value=\"Confirm club name\" onmouseup=\"mUp(this)\"  id=\"acceptClubNameButton\" class=\"btn btn-primary\">";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;					

				initHTMLString += tBodyEnd;
			initHTMLString += tableEnd;
				
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}


function initGetDifficulty() {
	//Card start
	let initHTMLString = cardStart;
		//Card header
		initHTMLString += cardHeaderStart;
			initHTMLString += "<b>Please configure your starting scenario</b>";
		initHTMLString += divEnd;
		//Card body
		initHTMLString += cardBodyStart;	
			//Table Start
			initHTMLString += tableStart;
				//Tablehead
				//Table body
				initHTMLString += "What league do you want to start in?<br /><br />";
				initHTMLString += tBodyStart;
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += dropdownStart
							initHTMLString += "What league level do you want to start in?<br />";
							initHTMLString += setDropdownButton("chooseInitLeagueLevel", leagueNames[gameData.initLeagueLevel]);
							initHTMLString += setDrowpdownMenu("chooseInitLeagueLevel");
							for (lL=0; lL < leagueNames.length; lL++) {
								initHTMLString += setDropdownItemID(lL, leagueNames[lL], "chooseInitLeagueLevel");
							}
						initHTMLString += divEnd;
						initHTMLString += tableCellEnd;
						initHTMLString += tableCellStart;
						initHTMLString += dropdownStart
						initHTMLString += "If you start below league 3, choose a division.<br />";
						let initD = parseInt(gameData.initLeagueDivision)+1;
						initHTMLString += setDropdownButton("chooseInitLeagueDivision", ("Start in division " + initD));
							initHTMLString += setDrowpdownMenu("chooseInitLeagueDivision");
							for (leagueDivisions=0; leagueDivisions<gameData.leagueStructure[gameData.initLeagueLevel][0]; leagueDivisions++) {
								initHTMLString += setDropdownItemID(leagueDivisions, (leagueDivisions+1).toString(), "chooseInitLeagueDivision");
							}
						initHTMLString += divEnd;
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;			
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "Please select difficulty<br />";
						initHTMLString += setDropdownButton("chooseInitDifficulty", difficultyStrings[gameData.difficulty]);
							initHTMLString += setDrowpdownMenu("chooseInitDifficulty");
							for (difficulty=0; difficulty<difficultyStrings.length; difficulty++) {
								initHTMLString += setDropdownItemID(difficulty, difficultyStrings[difficulty], "chooseInitDifficulty");
							}
						initHTMLString += divEnd;
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;
					initHTMLString += tableRowStart;
						initHTMLString += tableCellStart;
						initHTMLString += "<input type=\"button\" value=\"Continue\" onmouseup=\"mUp(this)\" id=\"acceptDifficulty\" class=\"btn btn-primary\"></form>";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;
				initHTMLString += tBodyEnd;
			initHTMLString += tableEnd;
				
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}

function confirmInit() {
	//Card start
	let initHTMLString = cardStart;
		//Card header
		initHTMLString += cardHeaderStart;
			initHTMLString += "<b>Please review your settings</b>";
		initHTMLString += divEnd;
		//Card body
		initHTMLString += cardBodyStart;	
			initHTMLString += "Your name is " + gameData.playerFirstName + " " + gameData.playerLastName + ".<br />";
			initHTMLString += "<input type=\"button\" value=\"Change name\" onmouseup=\"mUp(this)\" id=\"switchToEnterManagerName\" class=\"btn btn-primary\"><br /><br />";
			initHTMLString += "Your club is located in " + gameData.clubZipCode + " " + gameData.clubTown + ".<br />";
			initHTMLString += "<input type=\"button\" value=\"Change city\" onmouseup=\"mUp(this)\" id=\"confirmManagerNameButton\" class=\"btn btn-primary\"><br /><br />";
			initHTMLString += "Your club is named " + gameData.clubPrefix + " ";
			if (gameData.clubName != -1) {
				initHTMLString += gameData.clubName + " ";
			}
			initHTMLString += gameData.clubTown;
			if (gameData.clubNumber != -1) {
				initHTMLString += " " + gameData.clubNumber;
			}
			initHTMLString += "<br />";
			initHTMLString += "<input type=\"button\" value=\"Change club name\" onmouseup=\"mUp(this)\"  id=\"confirmCityButton\" class=\"btn btn-primary\"><br /><br />";
			initHTMLString += "Your club starts in " + leagueNames[gameData.initLeagueLevel] + " " + parseInt(gameData.initLeagueDivision)+1 + ".<br />";
			initHTMLString += "<input type=\"button\" value=\"Change league\" onmouseup=\"mUp(this)\"  id=\"acceptClubNameButton\" class=\"btn btn-primary\"><br /><br />";
			initHTMLString += "Your difficulty level is " +  difficultyStrings[gameData.difficulty] + ".<br />";
			initHTMLString += "<input type=\"button\" value=\"Change difficulty\" onmouseup=\"mUp(this)\"  id=\"renderInitDifficulty\" class=\"btn btn-primary\"><br /><br />";
			initHTMLString += "Are you ready?<br />";
			initHTMLString += "<input type=\"button\" value=\"Start game\" onmouseup=\"startGame()\"  class=\"btn btn-primary\"><br />";				
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}

confirmInit