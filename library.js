//library

//game start
function setUp() {	
	gameData.loop = window.setInterval(updateFrame, FRAMERATE);
	gameData.dateLoop = window.setInterval(nextDay, GAMEDAY);
	
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
	gameData.startUpTime = new Date().getTime();
	gameData.lastCircle = gameData.startUpTime;
	/*
	var savegame = JSON.parse(localStorage.getItem("idleSoccerSave"))
	if (savegame !== null) {
		console.log("Lade Spiel");
		console.log(savegame);
		gameData = savegame;
		loadGame();
	} else {
		*/
		console.log("Setup");
		gameData.player = new player();
		initleagues();
		/*
	}
	*/
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

function updateFrame() {
	//gameData.currentCircle = new Date();
	//gameData.frameTime = gameData.currentCircle-gameData.lastCircle;
	gui = "";
	document.getElementById("headLine").innerHTML = printStatusLine();
	if (gameData.lastFrame != client.gui) {	// Screen is rendered for the first time
		if (client.gui == CLUB) {
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
		if (client.gui == CLUB) {
			gui += "";//renderClubMenu(gameData.player.club);
		} else if (client.gui == TEAM){
			//sortTeam();
			gui += renderTeamFormation(gameData.player.club.team);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == STADIUM){
			gui += setStadiumMenu(gameData.player.club);
			document.getElementById("game").innerHTML = gui;
		} else if (client.gui == SINGLEKICKER){
			//gui += gameData.player.club.setSingleKickerMenu();
		} else if (client.gui == FORMATION){
			gui += renderTeamFormation(gameData.player.club.team);
			document.getElementById("game").innerHTML = gui;
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
			gui += refreshGameDayMenu();
		}
	}
};



//////////////////////////////////////////
////   CLICK HANDLER
//////////////////////////////////////////

function mUp(obj) {
	//console.log("mUP: ", obj);
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
	statusLineString += strong + gameData.player.club.name + strongEnd + leagueNames[gameData.player.club.leagueLevel] + " " + gameData.player.club.leagueDivision + " " + "Kontostand: " + gameData.player.club.cash.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + " " + printGameDate();
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


