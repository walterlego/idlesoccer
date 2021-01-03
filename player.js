//player

var player = function() {
	this.exp = 0;
	this.leagueLevel = 3;
	this.leagueDivision = 2;
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
		if (gameData.leagues[gameData.player.leagueLevel][gameData.player.leagueDivision].clubs[playerPlace].isHuman == true) {
			searchHumanClub = playerPlace;
		}
		playerPlace++;
	}
	for (humanRanking=0; humanRanking < gameData.leagues[gameData.player.leagueLevel][gameData.player.leagueDivision].table.length; humanRanking++) {
		if (gameData.leagues[gameData.player.leagueLevel][gameData.player.leagueDivision].table[humanRanking] == searchHumanClub) {
			gameData.player.leaguePlace = humanRanking;
		}
	}
}

//////////////////////////////////////////////////////////////////////
////////////// getters ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
