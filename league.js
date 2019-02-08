


var league = function() {
	this.level = 3;
	this.name = "Kreisliga D";
	this.clubs = [];
	this.table=[];
	this.clubs.push(gameData.player.club);
	for (addClubs=0; addClubs<17; addClubs++) {
		this.clubs.push(new club(false));
		this.table.push(addClubs);
	}
	this.gameDay =[];
	this.gameDate =[];
	this.currentGameDay = 0;
	this.initleagueSchedule = function() {
		var bufferDate = new Date(gameData.gameDate);
		bufferDate.setMonth(7);
		bufferDate.setDate(1);
		var preseasonOffset = 21;
		var winterOffset = 0;
		//Dates of the matches
		for (i=0; i<((this.clubs.length-1)*2); i++) {
			this.gameDate[i] = new Date(bufferDate);
			//Winter break			
			if (i == 17) {
				winterOffset = 31;
			}
			this.gameDate[i].setDate(bufferDate.getDate() + (7*i) + (6-bufferDate.getDay()) + preseasonOffset + winterOffset);
		}
		//Matches
		for (i=0; i<((this.clubs.length/2)); i++) {
			if (i%2 ==0) {
				this.gameDay.push([[0,(1+2*i)%18],[2,(3+2*i)%18],[4,(5+2*i)%18],[6,(7+2*i)%18],[8,(9+2*i)%18],[10,(11+2*i)%18],[12,(13+2*i)%18],[14,(15+2*i)%18],[16,(17+2*i)%18]]);
			} else {
				this.gameDay.push([[(1+2*i)%18,0],[(3+2*i)%18,2],[(5+2*i)%18,4],[(7+2*i)%18,6],[(9+2*i)%18,8],[(11+2*i)%18,10],[(13+2*i)%18,12],[(15+2*i)%18,14],[(17+2*i)%18,16]]);
			}
		}
		for (i=9; i<(this.clubs.length-1); i++) {
			if (i%2 ==0) {
				this.gameDay.push([[0,(2+2*i)%18],[2,(4+2*i)%18],[4,(6+2*i)%18],[6,(8+2*i)%18],[8,(10+2*i)%18],[10,(12+2*i)%18],[12,(14+2*i)%18],[14,(16+2*i)%18],[16,(18+2*i)%18]]);
			} else {
				this.gameDay.push([[(2+2*i)%18,0],[(4+2*i)%18,2],[(6+2*i)%18,4],[(8+2*i)%18,6],[(10+2*i)%18,8],[(12+2*i)%18,10],[(14+2*i)%18,12],[(16+2*i)%18,14],[(18+2*i)%18,16]]);
			}
		}
		//Rückrunde
		for (i=0; i<((this.clubs.length/2)); i++) {
			if (i%2 ==0) {
				this.gameDay.push([[(1+2*i)%18,0],[(3+2*i)%18,2],[(5+2*i)%18,4],[(7+2*i)%18,6],[(9+2*i)%18,8],[(11+2*i)%18,10],[(13+2*i)%18,12],[(15+2*i)%18,14],[(17+2*i)%18,16]]);
			} else {
				this.gameDay.push([[0,(1+2*i)%18],[2,(3+2*i)%18],[4,(5+2*i)%18],[6,(7+2*i)%18],[8,(9+2*i)%18],[10,(11+2*i)%18],[12,(13+2*i)%18],[14,(15+2*i)%18],[16,(17+2*i)%18]]);
			}
		}
		for (i=9; i<(this.clubs.length-1); i++) {
			if (i%2 ==0) {
				this.gameDay.push([[(2+2*i)%18,1],[(4+2*i)%18,3],[(6+2*i)%18,5],[(8+2*i)%18,7],[(10+2*i)%18,9],[(12+2*i)%18,11],[(14+2*i)%18,13],[(16+2*i)%18,15],[(18+2*i)%18,17]]);
			} else {
				this.gameDay.push([[1,(2+2*i)%18],[3,(4+2*i)%18],[5,(6+2*i)%18],[7,(8+2*i)%18],[9,(10+2*i)%18],[11,(12+2*i)%18],[13,(14+2*i)%18],[15,(16+2*i)%18],[17,(18+2*i)%18]]);
			}
		}
	}
	this.printleagueTable = function() {
		var tableString = "";
		for (pClub = 0; pClub < this.table.length; pClub++) {
			tableString += (gameData.league.clubs[gameData.league.table[pClub]].name + " " + gameData.league.clubs[gameData.league.table[pClub]].leaguePoints + " " + gameData.league.clubs[gameData.league.table[pClub]].leagueGoalsScored + " " + gameData.league.clubs[gameData.league.table[pClub]].leagueGoalsConceded + "<br />");
		}
		return tableString;
	}
	this.nextSeason = function() {
		this.currentGameDay = 0;
		this.initleagueSchedule();
		for (pClub = 0; pClub < this.table.length; pClub++) {
			gameData.league.clubs[gameData.league.table[pClub]].leaguePoints = 0;
			gameData.league.clubs[gameData.league.table[pClub]].leagueGoalsScored = 0;
			gameData.league.clubs[gameData.league.table[pClub]].leagueGoalsConceded = 0;
			gameData.league.clubs[gameData.league.table[pClub]].nextSeason();
		}
	}
	this.initleagueSchedule();
	console.log(this);
}

//leagues
var initleagues = function() {
	return initleague();
};

function leagueSort (a, b){
	if (gameData.league.clubs[a].leaguePoints < gameData.league.clubs[b].leaguePoints) { //sort points descending
		return 1;
	} else if (gameData.league.clubs[a].leaguePoints > gameData.league.clubs[b].leaguePoints) {
		return -1;
	} else {		//Punkte gleich
		if ((gameData.league.clubs[a].leagueGoalsScored - gameData.league.clubs[a].leagueGoalsConceded) < (gameData.league.clubs[b].leagueGoalsScored - gameData.league.clubs[b].leagueGoalsConceded)) {
			return 1;
		} else if ((gameData.league.clubs[a].leagueGoalsScored - gameData.league.clubs[a].leagueGoalsConceded) > (gameData.league.clubs[b].leagueGoalsScored - gameData.league.clubs[b].leagueGoalsConceded)) {
			return -1;
		} else {	//Punkte und Differenz gleich, keine Sortierung				
		return 0;
		}
	}		
};





