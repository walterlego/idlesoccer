var club = function(isHuman) {
	this.isHuman = isHuman;
	this.cash = 0;
	//name
	this.name = clubPrefix[Math.floor(Math.random()*clubPrefix.length)] + " ";
	if(Math.random()>0.7){
		this.name += clubMiddle[Math.floor(Math.random()*clubPrefix.length)] + " ";
	};
	this.name += clubTown[Math.floor(Math.random()*clubPrefix.length)] + " ";
	if(Math.random()>0.8){
		this.name += "0" + (Math.floor(Math.random()*9)+1);
	};
	this.currentleague = 17;
	this.stadium = new stadium();
	this.ticketVendor = 0; 
	this.ticketVendorRate = 0;
	this.buyTicketVendor = function() {
		if (this.cash >= ticketVendorPrice[this.ticketVendor]) {
			this.cash -= ticketVendorPrice[this.ticketVendor];
			this.ticketVendor++;
			this.ticketVendorRate++;
		}
	}
	this.sellTicket = function() {
		if (this.stadium.ticketsSold < this.stadium.capacity) {
			this.stadium.capacity;
			this.stadium.ticketsSold++;
			this.cash += this.stadium.ticketPrice;
			console.log("Verkauf");
		}
	}
	this.ticketUpdate = function () {
		if (this.stadium.ticketsSold < this.stadium.capacity) {
			if (this.ticketVendorRate < (this.stadium.capacity - this.stadium.ticketsSold)) {
				this.stadium.ticketsSold += Math.pow(this.ticketVendorRate,TICKETVENDOREXPONENT);
				this.cash += this.stadium.ticketPrice * this.ticketVendorRate;
			} else {
				this.cash += this.stadium.ticketPrice * (this.stadium.capacity- this.stadium.ticketsSold);
				this.stadium.ticketsSold = this.stadium.capacity;
			}
		}
	}
	this.gameDay = function() {
		this.team.gameDay();
	}
	this.gameDayHome = function() {
		this.stadium.ticketsSold = 0;
	}
	this.team = new team(isHuman);
	this.coach = 1;
	//Ligatsatistik
	this.leaguePoints = 0;
	this.leagueGoalsConceded = 0;
	this.leagueGoalsScored = 0;
	this.nextSeason = function() {
		this.leaguePoints = 0;
		this.leagueGoalsConceded = 0;
		this.leagueGoalsScored = 0;
		this.team.nextSeason();
	}
	this.printTable = function() {
		return (this.name + " " + this.leaguePoints + " " + this.leagueGoalsScored + " " + this.leagueGoalsConceded);
	}
	this.perimeterAdvertising = 0;
	return this;
};

function renderClubMenu() {
	
	renderClubMenuString = "";
	renderClubMenuString += sectionStart;
	renderClubMenuString += colStart;
	renderClubMenuString += "<strong>" + gameData.player.club.name + "</strong>";
	renderClubMenuString += colEnd;
	renderClubMenuString += colStart;
	renderClubMenuString += "Kontostand: " + gameData.player.club.cash + " €";
	renderClubMenuString += colEnd;
	renderClubMenuString += sectionEnd;
	renderClubMenuString = sectionStart;
	renderClubMenuString += colStart;
	renderClubMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToMarketing\">Marketing</button>";
	renderClubMenuString += colEnd;
	//renderClubMenuString += colStart;
	//renderClubMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"switchToTraining\">Training</button>";
	//renderClubMenuString += colEnd;
	renderClubMenuString += sectionEnd;
	return renderClubMenuString;
}

function setClubMenu() {
	
	menuString = sectionStart;
	menuString += colStart;
	menuString += "<strong>" + gameData.player.club.name + "</strong>";
	menuString += colEnd;
	menuString += colStart;
	menuString += "Kontostand: " + gameData.player.club.cash + " €";
	menuString += colEnd;
	menuString += sectionEnd;
	menuString += renderClubMenu()
	return menuString;

};