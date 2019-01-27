//library




//game start
function setUp() {	
	gameData.loop = window.setInterval(updateFrame, 250);
	gameData.dateLoop = window.setInterval(nextDay, 1000);
	gameData.startUpTime = new Date().getTime();
	gameData.lastCircle = gameData.startUpTime;
	//var savegame = JSON.parse(localStorage.getItem("idleSoccerSave"))
	//if (savegame !== null) {
		//console.log(savegame);
		//gameData = savegame;
	//} else {
		gameData.player = new player(true);
		gameData.league = new league();
	//}
	document.getElementById("mainMenu").innerHTML = initGUI();
};

function nextDay() {
	gameData.gameDate.setDate(gameData.gameDate.getDate() + 1);
	//console.log(gameData.gameDate.getTime()-gameData.league.gameDate[gameData.league.currentGameDay].getTime());
	console.log(gameData.league.currentGameDay);
	if (gameData.league.gameDate[gameData.league.currentGameDay].getTime() == gameData.gameDate.getTime()) {
		gameDay();
	}
	if (gameData.league.currentGameDay == 33) {
		if (gameData.gameDate.getMonth() == 7) {
			gameData.league.nextSeason();
		}
	}
}



function updateFrame() {
	gameData.currentCircle = new Date();
	gameData.frameTime = gameData.currentCircle-gameData.lastCircle;
	gameData.player.update();
	gui = "";
	document.getElementById("headLine").innerHTML = printGameDate();
	if (client.gui == CLUB) {
	//Build html of game
		gui += renderClubMenu();
	} else if (client.gui == TEAM){
		//sortTeam();
		gui += renderTeamFormation();
	} else if (client.gui == STADIUM){
		gui += setStadiumMenu();
	} else if (client.gui == SINGLEKICKER){
		gui += setSingleKickerMenu();
	} else if (client.gui == FORMATION){
		gui += renderTeamFormation();
	} else if (client.gui == TEAMTRAINING){
		gui += renderTeamTraining();
	} else if (client.gui == MARKETING){
		gui += renderClubMenu();
	}
	document.getElementById("game").innerHTML = gui;
	document.getElementById("debug_output").innerHTML = gameData.league.printleagueTable(); 
};

function initGUI() {
	
	mainMenuString = sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToClub\">Verein</button>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToTeam\">Team</button>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToStadium\">Stadion</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;

	return mainMenuString;
};


function setTopMenu() {
	
	menuString = sectionStart;
	menuString += colStart;
	menuString += "setTopMenu";//"<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"createPlayer\">create Player</button>";
	menuString += colEnd;
	/*
	menuString += colStart;
	menuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchPlayer\">switch Player</button>";
	menuString += colEnd;
	*/
	menuString += sectionEnd;
	
	return menuString;
}



//click handler
function mUp(obj) {
	if (obj.id == "sellTicket"){
		gameData.player.sellTicket();
	} else if (obj.id == "switchToClub"){
		client.gui = CLUB;
	} else if (obj.id == "switchToTeam"){
		client.gui = FORMATION;
		sortTeam();
	} else if (obj.id == "switchToStadium"){
		client.gui = STADIUM;
	} else if (obj.id == "switchPosition"){
		for (i = 0; i < gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].playerId == obj.value){
				gameData.player.club.team.players[i].togglePosition();
			}
		}
	} else if (obj.id == "hireTicketVendor"){
		gameData.player.club.buyTicketVendor();
	} else if (obj.id == "switchToFormation"){
		client.gui = FORMATION;
	} else if (obj.id == "switchToTraining"){
		client.gui = TEAMTRAINING;
	} else if (obj.id == "switchTrainingFocus"){
		for (i = 0; i < gameData.player.club.team.players.length; i++) {
			if (gameData.player.club.team.players[i].playerId == obj.value){
				gameData.player.club.team.players[i].toggleTrainingFocus();
			}
		}
	} else if (obj.id == "switchToMarketing"){
		client.gui = MARKETING;
	}	
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
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("cityDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
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