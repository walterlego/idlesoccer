var club = function(isHuman, leagueLevel, leagueDivision) {
	//console.log("Erstelle Club", isHuman, leagueLevel, leagueDivision);
	this.isHuman = isHuman;	
	/////////////////////////////////////////////
	///////////////Finances
	/////////////////////////////////////////////
	this.cash = Math.floor(Math.pow(2,(gameData.leagueStructure.length-leagueLevel))*STARTCASH);
	this.mood = 0;
	//name
	if(isHuman) {
		this.leagueLevel = gameData.initLeagueLevel;
		this.leagueDivision = gameData.initLeagueDivision;
		this.cash *= Math.pow((difficultyStrings.length - gameData.difficulty), STARTCASHPOW);
		console.log("Cash: ", this.cash, gameData.difficulty);
		if (gameData.clubPrefix!=-1) {
			this.name = gameData.clubPrefix;
		}
		if (gameData.clubName!=-1) {
			if (this.name === undefined) {
				this.name = gameData.clubName;
			} else {
				this.name += " " + gameData.clubName;
			}
		}
		if (gameData.clubTown!=-1) {
			this.name += " " + gameData.clubTown;
		}
		if (gameData.clubNumber!=-1) {
			this.name += " " + gameData.clubNumber.toString();
		}
		if (gameData.zipCode!=-1) {
			this.zipCode = gameData.zipCode;
		} else {
			this.zipCode += Math.floor(Math.random()*99999);
		}
	} else {
		this.leagueLevel = leagueLevel;
		this.leagueDivision = leagueDivision;
		this.name = clubPrefix[Math.floor(Math.random()*clubPrefix.length)] + " ";
		if(Math.random()>0.7){
			this.name += clubMiddle[Math.floor(Math.random()*clubMiddle.length)] + " ";
		}
		let cityFound = false;
		let cityCandidate = 0;
		//console.log("cityCandidate");
		while(cityFound == false) {
			cityCandidate = Math.floor(Math.random()*cityData.length);
			if (cityData[cityCandidate][1]>(288255/(this.leagueLevel+1))) {
				cityFound = true;
			}
		}
		//console.log("city found");
		this.name += cityData[cityCandidate][0] + " ";
		this.zipCode = cityData[cityCandidate][2];
		if(Math.random()>0.8){
			this.name += "0" + (Math.floor(Math.random()*9)+1);
		};
	}
	this.reputation = ((gameData.leagueStructure.length-this.leagueLevel)*REPUTATIONLEAGUEFACTOR) + (Math.random()*REPUTATIONPLACEMENTFACTOR*18);

	
	////Staff
	
	////Marketing
	
	//Perimeter Advertising
	this.perimeterAdvertising = gameData.leagueStructure.length-leagueLevel-1;
	this.perimeterAdvertisingBalance = getPerimeterAdvertisingMonthlyBalance(this,0);
	let optimizationBalance = this.perimeterAdvertisingBalance;
	let optimizationValue = 0;
	let optimizedLevel = this.perimeterAdvertising;
	//console.log("Pre: ", this.perimeterAdvertising, this.perimeterAdvertisingBalance);
	let optimizedBalance = this.perimeterAdvertisingBalance;
	while(this.perimeterAdvertising + optimizationValue > 0) {
		optimizationBalance = getPerimeterAdvertisingMonthlyBalance(this, optimizationValue);
		if(optimizationBalance > optimizedBalance) {
			optimizedLevel = this.perimeterAdvertising + optimizationValue;
			optimizedBalance = optimizationBalance;
		}
		optimizationValue--;
	}
	this.perimeterAdvertising = optimizedLevel;
	this.perimeterAdvertisingBalance = getPerimeterAdvertisingMonthlyBalance(this,0);
	//console.log("Post: ", optimizedLevel, this.perimeterAdvertisingBalance);
	this.perimeterAdvertisingRevenue = getPerimeterAdvertisingMonthlyRevenue(this,0);
	this.perimeterAdvertisingCost = getPerimeterAdvertisingMonthlyCost(this,0);

	/////////////////////////////////////////////
	///////////////Team	
	/////////////////////////////////////////////
	this.team = new team(isHuman, leagueLevel);
	//console.log("Team added");
	//Youth Academy
	this.youthAcademy = gameData.leagueStructure.length-leagueLevel-1;
	this.costYouthAcademy = getYouthAcademyMonthlyCost(this);
	
	//STAFF
	this.coach = gameData.leagueStructure.length-leagueLevel-1;
	this.coachSalary = calculateCoachSalary(this);
	

	
	/////////////////////////////////////////////
	///////////////Infrastructure
	/////////////////////////////////////////////
	//stadium
	this.stadium = new stadium(this.leagueLevel);
	
	//Ticketing
	this.ticketVendor = gameData.leagueStructure.length-leagueLevel-1; 
	//this.ticketVendorRate = 0;
	this.ticketDemandLeague = -1;
	this.seasontickets = 0;
	this.stadiumOccupationSeasonGame = [];
	
	/////////////////////////////////////////////
	///////////////Ligastatistik
	/////////////////////////////////////////////
	this.leaguePoints = 0;
	this.leagueGoalsConceded = 0;
	this.leagueGoalsScored = 0;
	this.leaguePosition = -1;
	
	
	/////////////////////////////////////////////
	/////////////// Bookkeeping
	/////////////////////////////////////////////
	
	//revenue
	this.revenueMonth = [0];
	this.revenueSeason = [0];
	this.revenueYear = [0];
	//cost
	this.costMonth = [0];
	this.costSeason = [0];
	this.costYear = [0];
	//investment
	this.investmentSeason = [0];
	this.investmentMonth = [0];
	this.investmentYear = [0];
	//ticketing
	this.ticketRevenueSeason = [0];
	this.ticketRevenueMonth = [0];
	this.ticketRevenueYear = [0];
	
	this.ticketsSoldSeason = [0];
	this.ticketsSoldMonth = [0];
	this.ticketsSoldYear = [0];
	
	//stadiumOccupation
	this.stadiumOccupationSeason = [0];
	this.stadiumOccupationMonth = [0];
	this.stadiumOccupationYear = [0];
	
	//marketing
	this.marketingRevenueSeason = [0];
	this.marketingRevenueMonth = [0];
	this.marketingRevenueYear = [0];
	
	this.marketingCostSeason = [0];
	this.marketingCostMonth = [0];
	this.marketingCostYear = [0];
	
	//infrastructure
	this.infrastructureRevenueSeason = [0];
	this.infrastructureRevenueMonth = [0];
	this.infrastructureRevenueYear = [0];
	
	this.infrastructureCostSeason = [0];
	this.infrastructureCostMonth = [0];
	this.infrastructureCostYear = [0];
	
	////Squad
	this.squadCostSeason = [0];
	this.squadCostMonth = [0];
	this.squadCostYear = [0];
	

	//return this;
};


function initGetCityName() {
	gameData.clubTown = document.getElementById("cityNameInput").value;
	console.log("gameData.clubTown", gameData.clubTown);
}

function initGetZipCode() {
	if (document.getElementById("zipCodeInput").value >0) {
		if (document.getElementById("zipCodeInput").value <100000) {
			gameData.clubZipCode = document.getElementById("zipCodeInput").value;
		}
	}		
	console.log("gameData.clubZipCode", gameData.clubZipCode);
}

function initSubmitCity() {
	let testCity = true;
	if (gameData.clubZipCode == -1) {
		testCity = false;
	}
	if (gameData.clubTown == -1) {
		testCity = false;
	}
	console.log("City: ", gameData.clubZipCode, gameData.clubTown, testCity);
	return testCity;
}


function initGetClubNumber() {
	gameData.clubNumber = document.getElementById("clubNumberInput").value;
	console.log("gameData.clubNumber", gameData.clubNumber);
}

function generateRandomClubName() {
	gameData.clubPrefix = clubPrefix[Math.floor(Math.random()*clubPrefix.length)];
	if(Math.random()>0.7){
		gameData.clubName = clubMiddle[Math.floor(Math.random()*clubMiddle.length)] + " ";
	} else {
		gameData.clubName = -1;
	}
	if(Math.random()>0.8){
		gameData.clubNumber = "0" + (Math.floor(Math.random()*9)+1);
	} else {
		gameData.clubNumber = -1;
	}
}


//////////////////////////////////////////////////
///// Bookkeeping
//////////////////////////////////////////////////

function clubEarn(eClub, eCash) {
	eClub.cash += eCash;
	eClub.revenueSeason[eClub.revenueSeason.length-1] += eCash;
	eClub.revenueMonth[eClub.revenueMonth.length-1] += eCash;
	eClub.revenueYear[eClub.revenueYear.length-1] += eCash;
}

function clubPay(eClub, eCash) {
	eClub.cash -= eCash;
	eClub.costSeason[eClub.costSeason.length-1] += eCash;
	eClub.costMonth[eClub.costMonth.length-1] += eCash;
	eClub.costYear[eClub.costYear.length-1] += eCash;
}

function clubEarnMarketing(eClub, eCash) {
	eClub.marketingRevenueSeason[eClub.marketingRevenueSeason.length-1] += eCash;
	eClub.marketingRevenueMonth[eClub.marketingRevenueMonth.length-1] += eCash;
	eClub.marketingRevenueYear[eClub.marketingRevenueYear.length-1] += eCash;
	clubEarn(eClub, eCash);
}

function clubEarnTicketing(eClub, eCash) {
	eClub.ticketRevenueSeason[eClub.ticketRevenueSeason.length-1] += eCash;
	eClub.ticketRevenueMonth[eClub.ticketRevenueMonth.length-1] += eCash;
	eClub.ticketRevenueYear[eClub.ticketRevenueYear.length-1] += eCash;
	clubEarn(eClub, eCash);
}

function clubInvest(eClub, eCash) {
	eClub.cash -= eCash;
	eClub.investmentSeason[eClub.investmentSeason.length-1] += eCash;
	eClub.investmentMonth[eClub.investmentMonth.length-1] += eCash;
	eClub.investmentYear[eClub.investmentYear.length-1] += eCash;
}

function clubPayInfrastructure(eClub, eCash) {
	eClub.infrastructureCostSeason[eClub.infrastructureCostSeason.length-1] += eCash;
	eClub.infrastructureCostMonth[eClub.infrastructureCostMonth.length-1] += eCash;
	eClub.infrastructureCostYear[eClub.infrastructureCostYear.length-1] += eCash;
	clubPay(eClub, eCash);
}

function clubPayMarketing(eClub, eCash) {
	eClub.marketingCostSeason[eClub.marketingCostSeason.length-1] += eCash;
	eClub.marketingCostMonth[eClub.marketingCostMonth.length-1] += eCash;
	eClub.marketingCostYear[eClub.marketingCostYear.length-1] += eCash;
	clubPay(eClub, eCash);
}


//gameDay
function clubGameDay(clubGameDay, gameDayLeague) {
	//stadiumGameDay(clubGameDay);
	teamGameDay(clubGameDay.team, gameDayLeague);
}

function clubGameDayHome(homeClub) {
	ticketGameDay(homeClub);
	stadiumGameDay(homeClub.stadium);
	if(homeClub.isHuman) {
		console.log(homeClub.name);
	}
	getLeagueDemand(homeClub);
}

//trainingday

function trainingdayClub(trainingClub) {
	teamTraining(trainingClub.team, trainingClub);
}


/////////////////////////////////////////////
/////////////// Next one please
/////////////////////////////////////////////

function clubNextMonth(nMClub) {
	let bufferSum = 0;
	if (nMClub.perimeterAdvertising > 0) {
		perimeterAdvertisingNextMonth(nMClub);
	} else {
		nMClub.marketingRevenueMonth.push(0);
		nMClub.marketingCostMonth.push(0);
	}
	if (nMClub.coach > 1) {
		coachNextMonth(nMClub);
	}
	if (nMClub.youthAcademy > 1) {
		youthAcademyNextMonth(nMClub);
	}
	//kicker salaries
	for (pSalary=0; pSalary<nMClub.team.players.length; pSalary++) {
		bufferSum = nMClub.team.players[pSalary].salary;
		nMClub.squadCostSeason[nMClub.squadCostSeason.length-1] += bufferSum;
		nMClub.squadCostMonth[nMClub.squadCostMonth.length-1] += bufferSum;
		nMClub.squadCostYear[nMClub.squadCostYear.length-1] += bufferSum;
		clubPay(nMClub, bufferSum);
	}
	nMClub.squadCostMonth.push(0);
	nMClub.costMonth.push(0);
	
	//investment
	nMClub.investmentMonth.push(0);
	
	//revenue
	nMClub.revenueMonth.push(0);
	
	//ticketing
	nMClub.ticketsSoldMonth.push(0);
	nMClub.ticketRevenueMonth.push(0);
	nMClub.stadiumOccupationMonth.push(0);
	//infrastructure
	nMClub.infrastructureRevenueMonth.push(0);
	nMClub.infrastructureCostMonth.push(0);	
}





function clubNextYear(nMClub) {
	//revenue
	nMClub.revenueYear.push(0);
	//cost
	nMClub.costYear.push(0);
	//investment
	nMClub.investmentYear.push(0);
	//ticketing
	nMClub.ticketRevenueYear.push(0);
	nMClub.ticketsSoldYear.push(0);
	nMClub.stadiumOccupationYear.push(0);
	//marketing
	nMClub.marketingRevenueYear.push(0);
	nMClub.marketingCostYear.push(0);
	//infrastructure
	nMClub.infrastructureRevenueYear.push(0);
	nMClub.infrastructureCostYear.push(0);
	////Squad
	nMClub.squadCostYear.push(0);
}


function clubNextSeason(nMClub, nMLeague) {
	nMClub.reputation = updateClubReputation(nMClub, nMLeague);
	nMClub.perimeterAdvertisingRevenue = getPerimeterAdvertisingMonthlyRevenue(nMClub,0);
	nMClub.perimeterAdvertisingCost = getPerimeterAdvertisingMonthlyCost(nMClub,0);
	nMClub.perimeterAdvertisingBalance = getPerimeterAdvertisingMonthlyBalance(nMClub,0);
	nMClub.leaguePoints = 0;
	nMClub.leagueGoalsConceded = 0;
	nMClub.leagueGoalsScored = 0;
	nMClub.leagueGoalsScored = 0;
	
	//bookkeeping
	//revenue
	nMClub.revenueSeason.push(0);
	//cost
	nMClub.costSeason.push(0);
	//investment
	nMClub.investmentSeason.push(0);
	//ticketing
	nMClub.ticketRevenueSeason.push(0);
	nMClub.ticketsSoldSeason.push(0);
	nMClub.stadiumOccupationSeason.push(0);
	//marketing
	nMClub.marketingRevenueSeason.push(0);
	nMClub.marketingCostSeason.push(0);
	//infrastructure
	nMClub.infrastructureRevenueSeason.push(0);
	nMClub.infrastructureCostSeason.push(0);
	////Squad
	nMClub.squadCostSeason.push(0);

	let addNumOfKickers = Math.round(Math.random()*(1+nMClub.youthAcademy));
	//console.log("Nachwuchsspieler: ", addNumOfKickers);
	for (addPlayers = 0; addPlayers<addNumOfKickers; addPlayers++) {
		addJuniorKicker(nMClub);
	}
	teamNextSeason(nMClub.team, nMClub);
}


function updateClubReputation(nMClub, nMLeague) {
	let newReputation = -1;
	for (searchClub = 0; searchClub < nMLeague.table.length; searchClub++) {
		//for (leaguePosition = 0; leaguePosition < nMLeague.table.length; leaguePosition++) {		
			if (nMLeague.clubs[nMLeague.table[searchClub]].name == nMClub.name) {
				newReputation = REPUTATIONSMOOTHING * nMClub.reputation + ((1-REPUTATIONSMOOTHING) * (((gameData.leagueStructure.length-nMClub.leagueLevel)*REPUTATIONLEAGUEFACTOR) + ((nMLeague.table.length - searchClub)*REPUTATIONPLACEMENTFACTOR)));
				//console.log("Liga: ", leagueNames[nMLeague.leagueLevel], "Tabellenplatz: ", searchClub, "Club: ", gameData.currentLeague.clubs[searchClub].name, "Club: ", nMClub.name);
				if(newReputation>nMClub.reputation) {
					nMClub.mood = 1;
				} else {
					nMClub.mood = -1;
				}
			}
		//}
	}
	return newReputation;
}



//////////////////////////////////////////////////
//// Staff
//////////////////////////////////////////////////

function upgradeCoach(cClub) {
	if(cClub.coach<20) {
		if (cClub.cash >= coachPrice[cClub.coach]) {
			clubPay(cClub, coachPrice[cClub.coach]);
			cClub.coach++;
			cClub.coachSalary = calculateCoachSalary(cClub);
			console.log(cClub.coachSalary);
		} else {
			console.log("upgradeCoach zu teuer");
		}
	} else {
		console.log(cClub.coach)
	}
	console.log("Neues Coach-Level: ", cClub.coach)
}

function calculateCoachSalary(cLevel) {
	return coachSalary[cLevel.coach];
}


function downgradeCoach(cClub) {
	if (cClub.coach > 1) {
		cClub.coach--;
		cClub.coachSalary = calculateCoachSalary(cClub);
		//console.log("Coach downgrade auf ", cClub.coachSalary);
	}
}

function coachNextMonth(nMClub) {
	let bufferSum = nMClub.coachSalary;
	if(nMClub.cash < bufferSum) {
		downgradeCoach(nMClub);
		//console.log("coach zu teuer. Cash: ", nMClub.cash, "Gehalt: ", bufferSum);
		bufferSum = nMClub.coachSalary;
	}
	clubPay(nMClub, bufferSum);
}


//////////////////////////////////////////////////
//// Youth
//////////////////////////////////////////////////

function clubUpgradeYouthAcademy(upgradeYAC) {
	if(upgradeYAC.youthAcademy<20) {
		let bufferSum = youthAcademyPrice[upgradeYAC.youthAcademy];
		console.log("Pre", upgradeYAC.youthAcademy);
		console.log("Youth academy cost per month", upgradeYAC.costYouthAcademy);
		if (upgradeYAC.cash >= bufferSum) {
			clubPay(upgradeYAC, bufferSum);
			upgradeYAC.youthAcademy++;
			upgradeYAC.costYouthAcademy = getYouthAcademyMonthlyCost(upgradeYAC);
		} else {
			alert("zu teuer");
		}
		console.log("Post", upgradeYAC.youthAcademy);
		console.log("Youth academy cost per month", upgradeYAC.costYouthAcademy);
	}
}

function clubDowngradeYouthAcademy(downgradeYAC) {
	if (downgradeYAC.youthAcademy > 1) {
		downgradeYAC.youthAcademy--;
		downgradeYAC.costYouthAcademy=getYouthAcademyMonthlyCost(downgradeYAC);
	}
}

function youthAcademyNextMonth(nMClub) {
	if(nMClub.cash < nMClub.costYouthAcademy) {
		clubDowngradeYouthAcademy(nMClub);
	}
	clubPayInfrastructure(nMClub, nMClub.costYouthAcademy);
}

function getYouthAcademyMonthlyCost(monthlyYA) {
	return youthAcademyMaintenance[monthlyYA.youthAcademy];
}


		

function addJuniorKicker(aJKClub) {
	var youngster = new kicker(-1, aJKClub.leagueLevel);
	youngster.skill = (Math.random() * Math.pow(aJKClub.youthAcademy,0.2) + Math.random() * Math.pow(aJKClub.youthAcademy,0.2) + Math.random() * Math.pow(aJKClub.reputation,0.2)) / 3;
	youngster.talent = (Math.random() * Math.pow(aJKClub.youthAcademy,0.2) + Math.random() * Math.pow(aJKClub.youthAcademy,0.2) + Math.random() * Math.pow(aJKClub.reputation,0.2)) / 3;
	youngster.age= Math.floor(Math.random()*4)+16;
	//console.log(youngster);
	aJKClub.team.players.push(youngster);
};



//////////////////////////////////////////////////
///// Ticketing
//////////////////////////////////////////////////



function clubBuyTicketVendor(vendorClub) {
	if (vendorClub.cash >= ticketVendorPrice[vendorClub.ticketVendor]) {
		clubPay(vendorClub, ticketVendorPrice[vendorClub.ticketVendor]);
		vendorClub.ticketVendor++;
		//vendorClub.ticketVendorRate++;
	}
};

function clubSellTicket(ticketClub) {
	if ((ticketClub.stadium.seatsSold + ticketClub.stadium.seatsToAssign) < ticketClub.stadium.capacity) {
		ticketClub.stadium.seatsToAssign++;
	}
};

function ticketGameDay(ticketClub) {
	var bufferSum = 0;
	if (ticketClub.stadium.seatsSold < ticketClub.stadium.capacity) {
		//
		ticketClub.stadium.seatsToAssign += Math.floor(ticketClub.ticketDemandLeague * ticketClub.ticketVendor);
		ticketClub.ticketsSoldSeason[ticketClub.ticketsSoldSeason.length-1] += ticketClub.stadium.seatsToAssign;
		ticketClub.ticketsSoldMonth[ticketClub.ticketsSoldMonth.length-1] += ticketClub.stadium.seatsToAssign;
		ticketClub.ticketsSoldYear[ticketClub.ticketsSoldYear.length-1] += ticketClub.stadium.seatsToAssign;
		if(ticketClub.isHuman) {
			console.log("Seats to assign: ", ticketClub.stadium.seatsToAssign);
		}
		if (ticketClub.stadium.capacity < (ticketClub.stadium.seatsSold + ticketClub.stadium.seatsToAssign)) {
			ticketClub.stadium.seatsToAssign = (ticketClub.stadium.capacity-ticketClub.stadium.seatsSold);
			//console.log("verkaufte Tickets", ticketClub.stadium.seatsToAssign);
		}
		ticketClub.stadiumOccupationSeasonGame.push(ticketClub.stadium.seatsToAssign);
		ticketClub.stadiumOccupationSeason[ticketClub.stadiumOccupationSeason.length-1] += ticketClub.stadium.seatsToAssign;
		ticketClub.stadiumOccupationMonth[ticketClub.stadiumOccupationSeason.length-1] += ticketClub.stadium.seatsToAssign;
		ticketClub.stadiumOccupationYear[ticketClub.stadiumOccupationSeason.length-1] += ticketClub.stadium.seatsToAssign;
		
		var sellTerrace = 0;
		var sellAmount = 0;
		var sellIterations = 0;
		sellTerrace = Math.floor(Math.random()*3);
		while (ticketClub.stadium.seatsToAssign > 0) {
			if (sellIterations == 75) {
				ticketClub.stadium.seatsToAssign = 0;
			}
			if (ticketClub.stadium.seatsToAssign > 1) {
				sellAmount = Math.round(Math.random()*ticketClub.stadium.seatsToAssign);
				if( sellAmount == 0) {
					sellAmount = 1;
				}
				//console.log("Gewürfelte Menge: ", sellAmount);
			} else {
				sellAmount = 1;
			}
			if (ticketClub.stadium.terraces[sellTerrace] > 0) {
				if ((ticketClub.stadium.terraceOccupation[sellTerrace] + sellAmount) > ticketClub.stadium.terraces[sellTerrace]) {
					sellAmount = ticketClub.stadium.terraces[sellTerrace]-ticketClub.stadium.terraceOccupation[sellTerrace];
					//console.log("Nicht genug Platz für Tickets:", sellAmount);
				}
				ticketClub.stadium.terraceOccupation[sellTerrace] += sellAmount;
				ticketClub.stadium.seatsSold += sellAmount;
				ticketClub.stadium.seatsToAssign -= sellAmount;
				//console.log("Tickets verteilt: " + sellAmount, "Kapazität: " + ticketClub.stadium.terraces[sellTerrace] + " Verkaufte Tickets: " + ticketClub.stadium.seatsSold);
				bufferSum = sellAmount * (ticketClub.stadium.terraceComfort[sellTerrace]+1)
				clubEarnTicketing(ticketClub, bufferSum);
			}

			//console.log("Noch zu verteilen: "+ ticketClub.stadium.seatsToAssign);
			sellIterations++;
			sellTerrace++;
			if (sellTerrace>3) {
			sellTerrace = 0;
			}
		}
	}
	updateseatsToAssign(ticketClub.stadium);
}

function getLeagueDemand(ticketClub, ticketLeague) {
	//get next Game
	let demand = -1;
	let homeDemand = -1;
	let guestDemand = -1;
	if (ticketLeague === undefined) {
		//console.log("undefined",ticketClub.name, ticketClub.leagueLevel, ticketClub.leagueDivision);
		ticketLeague = gameData.leagues[ticketClub.leagueLevel][ticketClub.leagueDivision];
		//console.log("set", gameData.leagues, ticketLeague);
	} else {
		//console.log("defined", ticketLeague);
	}
	let demandGameDay = ticketLeague.currentGameDay;
	/*
	var repA = ticketLeague.gameDay[ticketLeague.currentGameDay][iMatch][0];
	var repB = ticketLeague.gameDay[ticketLeague.currentGameDay][iMatch][1];
	*/
	while(demand == -1) {
		for (getMatch = 0; getMatch<ticketLeague.gameDay[demandGameDay].length; getMatch++){
			if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]] == ticketClub){
				homeDemand = Math.pow(ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].reputation, HOMEREPUTATIONEXPONENT) * HOMEDEMANDFACTOR;
				if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].isHuman){ 
					console.log("homeDemand reputation: ", homeDemand);
				}
				homeDemand *= ((ticketLeague.clubs.length + POSITIONDEMANDSMOOTH - ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].leaguePosition)/(ticketLeague.clubs.length + POSITIONDEMANDSMOOTH)) * HOMEPOSITIONDEMANDFACTOR;
				if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].isHuman){ 
					
				}
				guestDemand = Math.pow(ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][1]].reputation,GUESTREPUTATIONEXPONENT) * GUESTDEMANDFACTOR;
				if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].isHuman){
					//
				}
				guestDemand *= ((ticketLeague.clubs.length - ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][1]].leaguePosition + POSITIONDEMANDSMOOTH)/(ticketLeague.clubs.length + POSITIONDEMANDSMOOTH)) * GUESTPOSITIONDEMANDFACTOR;
				demand = homeDemand + guestDemand;
				if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].isHuman){
					if (ticketLeague.clubs[ticketLeague.gameDay[demandGameDay][getMatch][0]].isHuman){
						console.log("homeDemand after position: ", homeDemand);
						console.log("guestDemand: ", guestDemand);
						console.log("demand: ", demand);
					}
				}
				//GUESTREPUTATIONDEMANDFACTOR;
			}
		}
		demandGameDay++;
		if(demandGameDay == ticketLeague.gameDay.length){
			demand = 0;
		}
	}
	//console.log(demand);
	//get table position
	//adjust to tickets sold
	
	ticketClub.ticketDemandLeague = demand;
}	


//////////////////////////////////////////////////
///// Stadium
//////////////////////////////////////////////////



function upgradeTerraceSeating(updateClub, upgradeTerrace) {
		if (updateClub.stadium.terraces[upgradeTerrace] > 0) {
			var tCost = Math.floor(1.1 * updateClub.stadium.terraces[upgradeTerrace] * EXPANDTERRACEPRICE * EXPANDTERRACECOMFORT * (updateClub.stadium.terraceComfort[upgradeTerrace]+0.5));
			if (updateClub.cash >= tCost) {
				clubPay(updateClub, tCost);
				updateClub.stadium.terraces[upgradeTerrace] = Math.floor(1.1*updateClub.stadium.terraces[upgradeTerrace]);
				updateCapacity(updateClub.stadium);
			}
		} else {
			if (updateClub.cash>=ERECTTERRACE) {
				clubPay(updateClub, ERECTTERRACE);
				updateClub.stadium.terraces[upgradeTerrace] = TERRACEBASECAPACITIY;
				updateCapacity(updateClub.stadium);
			}
		}
	};

function getUpgradeTerraceSeatingPrice(upgradeStadium, upgradeTerrace) {
	return Math.floor((1.1 * upgradeStadium.terraces[upgradeTerrace] * EXPANDTERRACEPRICE * EXPANDTERRACECOMFORT * (upgradeStadium.terraceComfort[upgradeTerrace]+0.5)));
};

function upgradeTerraceComfort(updateClub, upgradeTerrace) {
	//console.log(upgradeTerrace);
	if (updateClub.stadium.terraceComfort[upgradeTerrace] > 0) {
		var tCost = Math.floor(1.1 * updateClub.stadium.terraces[upgradeTerrace] * EXPANDTERRACEPRICE * EXPANDTERRACECOMFORT * (updateClub.stadium.terraceComfort[upgradeTerrace]+0.5));
		if (tCost < updateClub.cash) {
			clubPay(updateClub, tCost);
			updateClub.stadium.terraceComfort[upgradeTerrace]++;
		}
	} else {
		if (updateClub.stadium.terraces[upgradeTerrace] > 0) {
			if (updateClub.cash>=ERECTTERRACE) {
				clubPayInfrastructure(updateClub, ERECTTERRACE);
				updateClub.stadium.terraceComfort[upgradeTerrace] = 1;
			}
		}
	}
};

function clubGetUpgradeTerraceComfortPrice(updateClub, upgradeTerrace) {
	return Math.floor((1.1 * updateClub.stadium.terraces[upgradeTerrace] * EXPANDTERRACEPRICE * EXPANDTERRACECOMFORT * (updateClub.stadium.terraceComfort[upgradeTerrace]+0.5)));
};




//////////////////////////////////////////////////
///// Marketing
//////////////////////////////////////////////////

function getPerimeterAdvertisingMonthlyBalance(nMClub, deltaLevel) {
	if((nMClub.perimeterAdvertising + deltaLevel)>0) {
		if(nMClub.isHuman) {
			//Einnahmen(Stufe;2)*POTENZ(Stufe;2,5)
			//console.log("Einnahmen: ", getPerimeterAdvertisingMonthlyRevenue(nMClub,0), " Kosten: ", getPerimeterAdvertisingMonthlyCost(nMClub,0), " Balance: ", getPerimeterAdvertisingMonthlyRevenue(nMClub,0) - getPerimeterAdvertisingMonthlyCost(nMClub,0));
		}
		return getPerimeterAdvertisingMonthlyRevenue(nMClub, deltaLevel) - getPerimeterAdvertisingMonthlyCost(nMClub, deltaLevel);
	} else {
		return 0;
	}
}

function getPerimeterAdvertisingMonthlyRevenue(nMClub, deltaLevel) {
	if((nMClub.perimeterAdvertising + deltaLevel)>0) {
		if(nMClub.isHuman) {
			//Einnahmen =POTENZ(reputation;2)*POTENZ(Stufe;2,5)*0,4
			//console.log("Reputation", nMClub.reputation, "Einnahmen", Math.pow(nMClub.reputation, PERIMETERADVERTISINGREPUTATIONEFFICIENCY)*Math.pow(nMClub.perimeterAdvertising + deltaLevel, PERIMETERADVERTISINGLEVELEXPONENT)*PERIMETERADVERTISINGREVENUEFACTOR);
		}
		return Math.pow(nMClub.reputation, PERIMETERADVERTISINGREPUTATIONEFFICIENCY)*Math.pow((nMClub.perimeterAdvertising + deltaLevel), PERIMETERADVERTISINGLEVELEXPONENT)*PERIMETERADVERTISINGREVENUEFACTOR;
	} else {
		return 0;
	}
}

function getPerimeterAdvertisingMonthlyCost(nMClub, deltaLevel) {
	if((nMClub.perimeterAdvertising + deltaLevel)>0) {
		if(nMClub.isHuman) {
			//Einnahmen =POTENZ(reputation;2)*POTENZ(Stufe;2,5)*0,4
			//console.log(Math.pow((nMClub.perimeterAdvertising + deltaLevel), PERIMETERADVERTISINGCOSTEXPONENT)*PERIMETERADVERTISINGCOSTMULTIPLIER*(nMClub.perimeterAdvertising + deltaLevel));
		}
		//Kosten POTENZ(Stufe;3,5)*200*Stufe =POTENZ(C$20;3,5)*200*C$20
		return Math.pow((nMClub.perimeterAdvertising + deltaLevel), PERIMETERADVERTISINGCOSTEXPONENT)*PERIMETERADVERTISINGCOSTMULTIPLIER*(nMClub.perimeterAdvertising + deltaLevel);
	} else {
		return 0;
	}
}

function perimeterAdvertisingNextMonth(nMClub) {
	let mRevenue = nMClub.perimeterAdvertisingRevenue;
	clubEarnMarketing(nMClub, mRevenue);
	nMClub.marketingRevenueMonth.push(0);
	let mCost = nMClub.perimeterAdvertisingCost;
	clubPayMarketing(nMClub, mCost);
	nMClub.marketingCostMonth.push(0);
}

/*
function getPerimeterAdvertisingMonthlyRevenueAfterUpgrade(nMClub) {
	return Math.pow(nMClub.reputation, PERIMETERADVERTISINGREPUTATIONEFFICIENCY)*Math.pow(nMClub.perimeterAdvertising+1, PERIMETERADVERTISINGLEVELEXPONENT)*PERIMETERADVERTISINGREVENUEFACTOR;
}

function getPerimeterAdvertisingMonthlyCostAferUpgrade(nMClub) {
	return Math.pow(nMClub.reputation, PERIMETERADVERTISINGREPUTATIONEFFICIENCY)*Math.pow(nMClub.perimeterAdvertising+2, PERIMETERADVERTISINGLEVELEXPONENT);
}
*/



function upgradePerimeterAdvertising(advertisingClub) {
	var PAUpgradeCost = getPerimeterAdvertisingUpgradeCost(advertisingClub);
	if (advertisingClub.cash >= PAUpgradeCost) {
		clubInvest(advertisingClub, PAUpgradeCost);
		advertisingClub.perimeterAdvertising++;
		advertisingClub.perimeterAdvertisingRevenue = getPerimeterAdvertisingMonthlyRevenue(advertisingClub,0);
		console.log("Einnahmen", advertisingClub.perimeterAdvertisingRevenue);
		advertisingClub.perimeterAdvertisingCost = getPerimeterAdvertisingMonthlyCost(advertisingClub,0);
		console.log("Monatliche Kosten", advertisingClub.perimeterAdvertisingCost);
	} else {
		alert("zu teuer");
	}
}


function getPerimeterAdvertisingUpgradeCost(advertisingClub) {
	return Math.pow(((advertisingClub.perimeterAdvertising+1) *PERIMETERADVERTISINGUPGRADECOSTEXPONENT), PERIMETERADVERTISINGUPGRADECOSTEXPONENT)*(PERIMETERADVERTISINGUPGRADECOSTMULTIPLIER*(advertisingClub.perimeterAdvertising+1));
}




//////////////////////////////////////////////////
///// Rendering
//////////////////////////////////////////////////


function renderFinanceMenu(cRenderFinanceMenu) {	
	renderClubMenuString = renderMonthlyBalanceCard(cRenderFinanceMenu);
	renderClubMenuString += renderMonthlyRevenueCard(cRenderFinanceMenu);
	renderClubMenuString += renderMonthlyCostCard(cRenderFinanceMenu);
	return renderClubMenuString;
};



function renderMonthlyBalanceCard(cMonthlyBalanceCard) {
	//Card start
	let renderMonthlyBalanceCardString = cardStart;
		//Card header
		renderMonthlyBalanceCardString += cardHeaderStart;
			renderMonthlyBalanceCardString += "<b>Finance</b>";
		renderMonthlyBalanceCardString += divEnd;
		//Card body
		renderMonthlyBalanceCardString += cardBodyStart;	
			//Table Start
			renderMonthlyBalanceCardString += tableStart;
				renderMonthlyBalanceCardString += tBodyStart;
					//Tablehead
					renderMonthlyBalanceCardString += tableHeadStart;
						renderMonthlyBalanceCardString += tableRowStart;
							renderMonthlyBalanceCardString += thColStart;
								renderMonthlyBalanceCardString += "Current month";
							renderMonthlyBalanceCardString += thEnd;
							renderMonthlyBalanceCardString += thColStart;
							renderMonthlyBalanceCardString += thEnd;
							renderMonthlyBalanceCardString += thColStart;
								renderMonthlyBalanceCardString += "Last month";
							renderMonthlyBalanceCardString += thEnd;
							renderMonthlyBalanceCardString += thColStart;
							renderMonthlyBalanceCardString += thEnd;
						renderMonthlyBalanceCardString += tableRowEnd;
					renderMonthlyBalanceCardString += tableHeadEnd;
					//Table body
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Ticket balance:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.ticketRevenueMonth[cMonthlyBalanceCard.ticketRevenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString += tableCellEnd;
						
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Ticket balance:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
						if(cMonthlyBalanceCard.ticketRevenueMonth.length>1) {
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.ticketRevenueMonth[cMonthlyBalanceCard.ticketRevenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						} else {
							renderMonthlyBalanceCardString += "First month:";
						}
						renderMonthlyBalanceCardString += tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;	
					
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Squad cost:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.squadCostMonth[cMonthlyBalanceCard.marketingRevenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString += tableCellEnd;
						
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Squad cost:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
						if(cMonthlyBalanceCard.squadCostMonth.length>1) {
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.squadCostMonth[cMonthlyBalanceCard.squadCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						} else {
							renderMonthlyBalanceCardString += "First month:";
						}
						renderMonthlyBalanceCardString += tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;	
					
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Marketing balance:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += (cMonthlyBalanceCard.marketingRevenueMonth[cMonthlyBalanceCard.marketingRevenueMonth.length-1]-cMonthlyBalanceCard.marketingCostMonth[cMonthlyBalanceCard.marketingCostMonth.length-1]).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString += tableCellEnd;
						
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Marketing balance:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
						if(cMonthlyBalanceCard.marketingRevenueMonth.length>1) {
							renderMonthlyBalanceCardString += (cMonthlyBalanceCard.marketingRevenueMonth[cMonthlyBalanceCard.marketingRevenueMonth.length-2]-cMonthlyBalanceCard.marketingCostMonth[cMonthlyBalanceCard.marketingCostMonth.length-2]).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						} else {
							renderMonthlyBalanceCardString += "First month:";
						}
						renderMonthlyBalanceCardString += tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;	
					
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Revenue current month:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.revenueMonth[cMonthlyBalanceCard.revenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString += tableCellEnd;
						
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Revenue last month:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
						if(cMonthlyBalanceCard.revenueMonth.length>1) {
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.revenueMonth[cMonthlyBalanceCard.revenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						} else {
							renderMonthlyBalanceCardString += "First month:";
						}
						renderMonthlyBalanceCardString += tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;	
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Cost current month:";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += cMonthlyBalanceCard.costMonth[cMonthlyBalanceCard.costMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "Cost last month";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							if(cMonthlyBalanceCard.costMonth.length>1) {
								renderMonthlyBalanceCardString += cMonthlyBalanceCard.costMonth[cMonthlyBalanceCard.costMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
							renderMonthlyBalanceCardString += "First month:";
							}
						renderMonthlyBalanceCardString += tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;	
					renderMonthlyBalanceCardString += tableRowStart;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "<b>Balance current month:</b>";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart + "<b>";
							renderMonthlyBalanceCardString += (cMonthlyBalanceCard.revenueMonth[cMonthlyBalanceCard.revenueMonth.length-1]-cMonthlyBalanceCard.costMonth[cMonthlyBalanceCard.costMonth.length-1]).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyBalanceCardString +=  "</b>" + tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart;
							renderMonthlyBalanceCardString += "<b>Balance last month";
						renderMonthlyBalanceCardString += tableCellEnd;
						renderMonthlyBalanceCardString += tableCellStart + "<b>";
							if(cMonthlyBalanceCard.revenueMonth.length>1) {
								renderMonthlyBalanceCardString += (cMonthlyBalanceCard.revenueMonth[cMonthlyBalanceCard.revenueMonth.length-2]-cMonthlyBalanceCard.costMonth[cMonthlyBalanceCard.costMonth.length-2]).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyBalanceCardString += "First month";
							}
						renderMonthlyBalanceCardString += "</b>" + tableCellEnd;
					renderMonthlyBalanceCardString += tableRowEnd;
				renderMonthlyBalanceCardString += tBodyEnd
			renderMonthlyBalanceCardString += tableEnd
		renderMonthlyBalanceCardString += divEnd;
	renderMonthlyBalanceCardString += divEnd
	return renderMonthlyBalanceCardString;
}



function renderMonthlyRevenueCard(cMonthlyRevenueCard) {
	//Card start
	let renderMonthlyRevenueCardString = cardStart;
		//Card header
		renderMonthlyRevenueCardString += cardHeaderStart;
			renderMonthlyRevenueCardString += "<b>Revenue</b>";
		renderMonthlyRevenueCardString += divEnd;
		//Card body
		renderMonthlyRevenueCardString += cardBodyStart;	
			//Table Start
			renderMonthlyRevenueCardString += tableStart;
				//Tablehead
				renderMonthlyRevenueCardString += tableHeadStart;
					renderMonthlyRevenueCardString += tableRowStart;
						renderMonthlyRevenueCardString += thColStart;
							renderMonthlyRevenueCardString += "Current month";
						renderMonthlyRevenueCardString += thEnd;
						renderMonthlyRevenueCardString += thColStart;
						renderMonthlyRevenueCardString += thEnd;
						renderMonthlyRevenueCardString += thColStart;
							renderMonthlyRevenueCardString += "Last month";
						renderMonthlyRevenueCardString += thEnd;
						renderMonthlyRevenueCardString += thColStart;
						renderMonthlyRevenueCardString += thEnd;
					renderMonthlyRevenueCardString += tableRowEnd;
				renderMonthlyRevenueCardString += tableHeadEnd;
				//Table body
				renderMonthlyRevenueCardString += tBodyStart;
					
					renderMonthlyRevenueCardString += tableRowStart;
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "Ticket revenue current month:";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += cMonthlyRevenueCard.ticketRevenueMonth[cMonthlyRevenueCard.ticketRevenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyRevenueCardString += tableCellEnd;
						
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "Ticket revenue last month:";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart;
							if(cMonthlyRevenueCard.ticketRevenueMonth.length>1) {
								renderMonthlyRevenueCardString += cMonthlyRevenueCard.ticketRevenueMonth[cMonthlyRevenueCard.ticketRevenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyRevenueCardString += "First month:";
							}
						renderMonthlyRevenueCardString += tableCellEnd;
					renderMonthlyRevenueCardString += tableRowEnd;
					
					renderMonthlyRevenueCardString += tableRowStart;
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "Marketing revenue current month:";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += cMonthlyRevenueCard.marketingRevenueMonth[cMonthlyRevenueCard.marketingRevenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyRevenueCardString += tableCellEnd;
						
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "Marketing revenue last month:";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart;
							if(cMonthlyRevenueCard.marketingRevenueMonth.length>1) {
								renderMonthlyRevenueCardString += cMonthlyRevenueCard.marketingRevenueMonth[cMonthlyRevenueCard.marketingRevenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyRevenueCardString += "First month:";
							}
						renderMonthlyRevenueCardString += tableCellEnd;
					renderMonthlyRevenueCardString += tableRowEnd;
					
					renderMonthlyRevenueCardString += tableRowStart;
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "<b>Revenue current month: </b>";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart + "<b>";
							renderMonthlyRevenueCardString += cMonthlyRevenueCard.marketingRevenueMonth[cMonthlyRevenueCard.marketingRevenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyRevenueCardString += "</b>" + tableCellEnd;
						
						renderMonthlyRevenueCardString += tableCellStart;
							renderMonthlyRevenueCardString += "<b>Revenue last month: </b>";
						renderMonthlyRevenueCardString += tableCellEnd;
						renderMonthlyRevenueCardString += tableCellStart + "<b>";
							if(cMonthlyRevenueCard.revenueMonth.length>1) {
								renderMonthlyRevenueCardString += cMonthlyRevenueCard.revenueMonth[cMonthlyRevenueCard.revenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyRevenueCardString += "First month:";
							}
						renderMonthlyRevenueCardString += "</b>" + tableCellEnd;
					renderMonthlyRevenueCardString += tableRowEnd;
				renderMonthlyRevenueCardString += tBodyEnd;
			renderMonthlyRevenueCardString += tableEnd;
		renderMonthlyRevenueCardString += divEnd;
	renderMonthlyRevenueCardString += divEnd
	return renderMonthlyRevenueCardString;
}




function renderMonthlyCostCard(cMonthlyCostCard) {
	//Card start
	let renderMonthlyCostCardString = cardStart;
		//Card header
		renderMonthlyCostCardString += cardHeaderStart;
			renderMonthlyCostCardString += "<b>Cost</b>";
		renderMonthlyCostCardString += divEnd;
		//Card body
		renderMonthlyCostCardString += cardBodyStart;	
			//Table Start
			renderMonthlyCostCardString += tableStart;
				//Tablehead
				renderMonthlyCostCardString += tableHeadStart;
					renderMonthlyCostCardString += tableRowStart;
						renderMonthlyCostCardString += thColStart;
							renderMonthlyCostCardString += "Current month";
						renderMonthlyCostCardString += thEnd;
						renderMonthlyCostCardString += thColStart;
						renderMonthlyCostCardString += thEnd;
						renderMonthlyCostCardString += thColStart;
							renderMonthlyCostCardString += "Last month";
						renderMonthlyCostCardString += thEnd;
						renderMonthlyCostCardString += thColStart;
						renderMonthlyCostCardString += thEnd;
					renderMonthlyCostCardString += tableRowEnd;
				renderMonthlyCostCardString += tableHeadEnd;
				//Table body
				renderMonthlyCostCardString += tBodyStart;
					renderMonthlyCostCardString += tableRowStart;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Marketing cost current month: <br />";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;							
							renderMonthlyCostCardString += cMonthlyCostCard.marketingCostMonth[cMonthlyCostCard.marketingCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Marketing cost last month: <br />";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							if(cMonthlyCostCard.marketingCostMonth.length>1) {
								renderMonthlyCostCardString += cMonthlyCostCard.marketingCostMonth[cMonthlyCostCard.marketingCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
							renderMonthlyCostCardString += "First month:";
							}
						renderMonthlyCostCardString += tableCellEnd;
					renderMonthlyCostCardString += tableRowEnd;
					
					renderMonthlyCostCardString += tableRowStart;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Squad cost current month";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += cMonthlyCostCard.squadCostMonth[cMonthlyCostCard.squadCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Squad cost last month";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							if(cMonthlyCostCard.squadCostMonth.length>1) {
								renderMonthlyCostCardString += cMonthlyCostCard.squadCostMonth[cMonthlyCostCard.squadCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyCostCardString += "First month:";
							}
						renderMonthlyCostCardString += tableCellEnd;
					renderMonthlyCostCardString += tableRowEnd;
					
					renderMonthlyCostCardString += tableRowStart;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Infrastructure cost current month";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += cMonthlyCostCard.infrastructureCostMonth[cMonthlyCostCard.infrastructureCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "Infrastructure cost last month";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							if(cMonthlyCostCard.infrastructureCostMonth.length>1) {
								renderMonthlyCostCardString += cMonthlyCostCard.infrastructureCostMonth[cMonthlyCostCard.infrastructureCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyCostCardString += "First month:";
							}
						renderMonthlyCostCardString += tableCellEnd;
					renderMonthlyCostCardString += tableRowEnd;
					
					renderMonthlyCostCardString += tableRowStart;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "<b>Cost current month</b>";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "<b>" + cMonthlyCostCard.costMonth[cMonthlyCostCard.costMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "</b>";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart;
							renderMonthlyCostCardString += "<b>Cost last month: </b>";
						renderMonthlyCostCardString += tableCellEnd;
						renderMonthlyCostCardString += tableCellStart + "<b>";
							if(cMonthlyCostCard.costMonth.length>1) {
								renderMonthlyCostCardString += cMonthlyCostCard.costMonth[cMonthlyCostCard.costMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMonthlyCostCardString += "First month:";
							}
						renderMonthlyCostCardString += "</b>" + tableCellEnd;
					renderMonthlyCostCardString += tableRowEnd;
					
				renderMonthlyCostCardString += tBodyEnd
			renderMonthlyCostCardString += tableEnd
		renderMonthlyCostCardString += divEnd;
	renderMonthlyCostCardString += divEnd
	return renderMonthlyCostCardString;
}





function renderMarketingMenu(cRenderMarketingMenu) {	
	renderClubMenuString = renderMarketingOverviewCard(cRenderMarketingMenu);
	renderClubMenuString += renderPerimeterAdvertisingCard(cRenderMarketingMenu);
	return renderClubMenuString;
};



function renderMarketingOverviewCard(cPerimeterAdvertising) {
	//Card start
	let renderMarketingOverviewCardString = "";/*cardStart;
		//Card header
		renderMarketingOverviewCardString += cardHeaderStart;
			renderMarketingOverviewCardString += "<b>Cost</b>";
		renderMarketingOverviewCardString += divEnd;
		//Card body
		renderMarketingOverviewCardString += cardBodyStart;	
			//Table Start
			renderMarketingOverviewCardString += tableStart;
				//Tablehead
				renderMarketingOverviewCardString += tableHeadStart;
					renderMarketingOverviewCardString += tableRowStart;
						renderMarketingOverviewCardString += thColStart;
							renderMarketingOverviewCardString += "Current month";
						renderMarketingOverviewCardString += thEnd;
						renderMarketingOverviewCardString += thColStart;
						renderMarketingOverviewCardString += thEnd;
						renderMarketingOverviewCardString += thColStart;
							renderMarketingOverviewCardString += "Last month";
						renderMarketingOverviewCardString += thEnd;
						renderMarketingOverviewCardString += thColStart;
						renderMarketingOverviewCardString += thEnd;
					renderMarketingOverviewCardString += tableRowEnd;
				renderMarketingOverviewCardString += tableHeadEnd;
				//Table body
				renderMarketingOverviewCardString += tBodyStart;
					renderMarketingOverviewCardString += tableRowStart;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Marketing cost current month: <br />";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;							
							renderMarketingOverviewCardString += cPerimeterAdvertising.marketingCostMonth[cPerimeterAdvertising.marketingCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Marketing cost last month: <br />";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							if(cPerimeterAdvertising.marketingCostMonth.length>1) {
								renderMarketingOverviewCardString += cPerimeterAdvertising.marketingCostMonth[cPerimeterAdvertising.marketingCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
							renderMarketingOverviewCardString += "First month:";
							}
						renderMarketingOverviewCardString += tableCellEnd;
					renderMarketingOverviewCardString += tableRowEnd;
					
					renderMarketingOverviewCardString += tableRowStart;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Squad cost current month";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += cPerimeterAdvertising.squadCostMonth[cPerimeterAdvertising.squadCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Squad cost last month";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							if(cPerimeterAdvertising.squadCostMonth.length>1) {
								renderMarketingOverviewCardString += cPerimeterAdvertising.squadCostMonth[cPerimeterAdvertising.squadCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMarketingOverviewCardString += "First month:";
							}
						renderMarketingOverviewCardString += tableCellEnd;
					renderMarketingOverviewCardString += tableRowEnd;
					
					renderMarketingOverviewCardString += tableRowStart;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Infrastructure cost current month";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += cPerimeterAdvertising.infrastructureCostMonth[cPerimeterAdvertising.infrastructureCostMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "Infrastructure cost last month";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							if(cPerimeterAdvertising.infrastructureCostMonth.length>1) {
								renderMarketingOverviewCardString += cPerimeterAdvertising.infrastructureCostMonth[cPerimeterAdvertising.infrastructureCostMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMarketingOverviewCardString += "First month:";
							}
						renderMarketingOverviewCardString += tableCellEnd;
					renderMarketingOverviewCardString += tableRowEnd;
					
					renderMarketingOverviewCardString += tableRowStart;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "<b>Cost current month</b>";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "<b>" + cPerimeterAdvertising.costMonth[cPerimeterAdvertising.costMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "</b>";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart;
							renderMarketingOverviewCardString += "<b>Cost last month: </b>";
						renderMarketingOverviewCardString += tableCellEnd;
						renderMarketingOverviewCardString += tableCellStart + "<b>";
							if(cPerimeterAdvertising.costMonth.length>1) {
								renderMarketingOverviewCardString += cPerimeterAdvertising.costMonth[cPerimeterAdvertising.costMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderMarketingOverviewCardString += "First month:";
							}
						renderMarketingOverviewCardString += "</b>" + tableCellEnd;
					renderMarketingOverviewCardString += tableRowEnd;
					
				renderMarketingOverviewCardString += tBodyEnd
			renderMarketingOverviewCardString += tableEnd
		renderMarketingOverviewCardString += divEnd;
	renderMarketingOverviewCardString += divEnd;
	*/
	return renderMarketingOverviewCardString;
}





function renderPerimeterAdvertisingCard(cPerimeterAdvertising) {
	//Card start
	let renderPerimeterAdvertisingCardString = cardStart;
		//Card header
		renderPerimeterAdvertisingCardString += cardHeaderStart;
			renderPerimeterAdvertisingCardString += "<b>Perimeter advertising</b>";
		renderPerimeterAdvertisingCardString += divEnd;
		//Card body
		renderPerimeterAdvertisingCardString += cardBodyStart;	
			//Table Start
			renderPerimeterAdvertisingCardString += tableStart;
				//Tablehead
				/*
				renderPerimeterAdvertisingCardString += tableHeadStart;
					renderPerimeterAdvertisingCardString += tableRowStart;
						renderPerimeterAdvertisingCardString += thColStart;
							renderPerimeterAdvertisingCardString += "";//"Current month";
						renderPerimeterAdvertisingCardString += thEnd;
						renderPerimeterAdvertisingCardString += thColStart;
						renderPerimeterAdvertisingCardString += thEnd;
						renderPerimeterAdvertisingCardString += thColStart;
							renderPerimeterAdvertisingCardString += ""; //"Last month";
						renderPerimeterAdvertisingCardString += thEnd;
						renderPerimeterAdvertisingCardString += thColStart;
						renderPerimeterAdvertisingCardString += thEnd;
					renderPerimeterAdvertisingCardString += tableRowEnd;
				renderPerimeterAdvertisingCardString += tableHeadEnd;
				*/
				//Table body
				renderPerimeterAdvertisingCardString += tBodyStart;
					renderPerimeterAdvertisingCardString += tableRowStart;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Current advertising";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;							
							renderPerimeterAdvertisingCardString += cPerimeterAdvertising.perimeterAdvertising//perimeterAdvertisingString[cPerimeterAdvertising.perimeterAdvertising];
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Monthly balance";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, 0).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderPerimeterAdvertisingCardString += tableCellEnd;
					renderPerimeterAdvertisingCardString += tableRowEnd;
					
					renderPerimeterAdvertisingCardString += tableRowStart;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Upgrade advertising to";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;							
							renderPerimeterAdvertisingCardString += perimeterAdvertisingString[cPerimeterAdvertising.perimeterAdvertising+1];
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Balance after Upgrade";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, 1).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderPerimeterAdvertisingCardString += tableCellEnd;
					renderPerimeterAdvertisingCardString += tableRowEnd;
					
					renderPerimeterAdvertisingCardString += tableRowStart;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Upgrade Price";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;							
							renderPerimeterAdvertisingCardString += getPerimeterAdvertisingUpgradeCost(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							if (cPerimeterAdvertising.cash >= getPerimeterAdvertisingUpgradeCost(cPerimeterAdvertising)) {
								if(getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, 1)<getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, 0)) {
									renderPerimeterAdvertisingCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" id=\"upgradePerimeterAdvertising\">Upgrade</button>";
								} else {
									renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradePerimeterAdvertising\">Upgrade</button>";
								}
							} else {
								renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" disabled>Upgrade</button>";
							}
						renderPerimeterAdvertisingCardString += tableCellEnd;
					renderPerimeterAdvertisingCardString += tableRowEnd;
					
					renderPerimeterAdvertisingCardString += tableRowStart;
						renderPerimeterAdvertisingCardString += tableCellStart;
							renderPerimeterAdvertisingCardString += "Balance after downgrade";
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;							
							renderPerimeterAdvertisingCardString += getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, -1).toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderPerimeterAdvertisingCardString += tableCellEnd;
						renderPerimeterAdvertisingCardString += tableCellStart;
							if (cPerimeterAdvertising.perimeterAdvertising >0) {
								if(getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, -1)<getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising, 0)) {
									renderPerimeterAdvertisingCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" id=\"downgradePerimeterAdvertising\">Downgrade</button>";
								} else {
									renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"downgradePerimeterAdvertising\">Downgrade</button>";
								}
							} else {
								renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" disabled>Downgrade</button>";
							}
						renderPerimeterAdvertisingCardString += tableCellEnd;
					renderPerimeterAdvertisingCardString += tableRowEnd;
					
				renderPerimeterAdvertisingCardString += tBodyEnd
			renderPerimeterAdvertisingCardString += tableEnd
		renderPerimeterAdvertisingCardString += divEnd;
	renderPerimeterAdvertisingCardString += divEnd
	return renderPerimeterAdvertisingCardString;
}


function renderStaffMenu(renderClub) {
	renderClubMenuString = br + renderCoachCard(renderClub);
	renderClubMenuString += br + renderYouthAcademyCard(renderClub);
	return renderClubMenuString;
}




function renderCoachCard(cCoachCard) {
	//Card start
	let renderCoachCardString = cardStart;
		//Card header
		renderCoachCardString += cardHeaderStart;
			renderCoachCardString += "<b>Head Coach</b>";
		renderCoachCardString += divEnd;
		//Card body
		renderCoachCardString += cardBodyStart;	
			//Table Start
			renderCoachCardString += tableStart;
				//Tablehead
				/*
				renderCoachCardString += tableHeadStart;
					renderCoachCardString += tableRowStart;
						renderCoachCardString += thColStart;
							renderCoachCardString += "Current month";
						renderCoachCardString += thEnd;
						renderCoachCardString += thColStart;
						renderCoachCardString += thEnd;
						renderCoachCardString += thColStart;
							renderCoachCardString += "Last month";
						renderCoachCardString += thEnd;
						renderCoachCardString += thColStart;
						renderCoachCardString += thEnd;
					renderCoachCardString += tableRowEnd;
				renderCoachCardString += tableHeadEnd;
				*/
				//Table body
				renderCoachCardString += tBodyStart;
					/*
					renderCoachCardString += "Current Coach: " + coachString[cCoachCard.coach] + "<br />";
					renderCoachCardString += "Current salary: " + coachSalary[cCoachCard.coach] + "<br />";
					renderCoachCardString += "Upgrade Cost: " + coachPrice[cCoachCard.coach].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
					renderCoachCardString += "Salary after upgrade: " + coachSalary[cCoachCard.coach+1] + "<br />";
					if (cCoachCard.cash >= coachPrice[cCoachCard.coach]) {
						renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeCoach\">"+coachString[cCoachCard.coach+1]+"</button>";
					} else {
						renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" disabled>"+coachString[cCoachCard.coach+1]+"</button>";
					}	
					*/
					renderCoachCardString += tableRowStart;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "<b>Current Coach: </b>";
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart + "<b>";
							renderCoachCardString += coachString[cCoachCard.coach];
						renderCoachCardString += "</b>" + tableCellEnd;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "<b>Current salary: ";
						renderCoachCardString += "</b>" + tableCellEnd;
						renderCoachCardString += tableCellStart + "<b>";
							renderCoachCardString += coachSalary[cCoachCard.coach].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderCoachCardString += "</b>" + tableCellEnd;
					renderCoachCardString += tableRowEnd;					
					renderCoachCardString += tableRowStart;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "Coach after upgrade";
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += coachString[cCoachCard.coach+1];
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "Salary after upgrade: ";
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += coachSalary[cCoachCard.coach+1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
						if (cCoachCard.cash >= coachPrice[cCoachCard.coach]) {
							renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeCoach\">"+coachPrice[cCoachCard.coach].toLocaleString('de-DE', {style:'currency', currency:'EUR'})+"</button>";
						} else {
							renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" disabled>"+coachPrice[cCoachCard.coach].toLocaleString('de-DE', {style:'currency', currency:'EUR'})+"</button>";
						}	
						renderCoachCardString += tableCellEnd;
					renderCoachCardString += tableRowEnd;
					renderCoachCardString += tableRowStart;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "Downgrade youth academy";
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							renderCoachCardString += "Monthly cost after downgrade: ";
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							if (cCoachCard.coach > 0) {
								renderCoachCardString += coachPrice[cCoachCard.coach-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderCoachCardString += coachPrice[0].toLocaleString('de-DE', {style:'currency', currency:'EUR'});;
							}	
						renderCoachCardString += tableCellEnd;
						renderCoachCardString += tableCellStart;
							if (cCoachCard.coach > 0) {
								renderCoachCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" id=\"downgradeCoach\">Downgrade</button>";
							} else {
								renderCoachCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" disabled>Downgrade</button>";
							}	
						renderCoachCardString += tableCellEnd;
					renderCoachCardString += tableRowEnd;
				renderCoachCardString += tBodyEnd;
			renderCoachCardString += tableEnd;
		renderCoachCardString += divEnd;
	renderCoachCardString += divEnd
	return renderCoachCardString;
}






function renderYouthAcademyCard(cYAcademyCard) {
	//Card start
	let renderYouthAcademyCardString = cardStart;
		//Card header
		renderYouthAcademyCardString += cardHeaderStart;
			renderYouthAcademyCardString += "<b>Youth academy</b>";
		renderYouthAcademyCardString += divEnd;
		//Card body
		renderYouthAcademyCardString += cardBodyStart;	
			//Table Start
			renderYouthAcademyCardString += tableStart;
				//Tablehead
				//Table body
				renderYouthAcademyCardString += tBodyStart;
					renderYouthAcademyCardString += tableRowStart;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "<b>Current youth academy: </b>";
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart + "<b>";
							renderYouthAcademyCardString += youthAcademyString[cYAcademyCard.youthAcademy];
						renderYouthAcademyCardString += "</b>" + tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "<b>Current monthly cost: ";
						renderYouthAcademyCardString += "</b>" + tableCellEnd;
						renderYouthAcademyCardString += tableCellStart + "<b>";
							renderYouthAcademyCardString += youthAcademyMaintenance[cYAcademyCard.youthAcademy].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderYouthAcademyCardString += "</b>" + tableCellEnd;
					renderYouthAcademyCardString += tableRowEnd;					
					renderYouthAcademyCardString += tableRowStart;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "Youth academy after upgrade";
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += youthAcademyString[cYAcademyCard.youthAcademy+1];
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "Monthly cost after upgrade: ";
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += youthAcademyMaintenance[cYAcademyCard.youthAcademy+1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
						if (cYAcademyCard.cash >= youthAcademyPrice[cYAcademyCard.youthAcademy+1]) {
							renderYouthAcademyCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeYouthAcademy\">" + youthAcademyPrice[cYAcademyCard.youthAcademy+1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "</button>";
						} else {
							renderYouthAcademyCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeYouthAcademy\" disabled>" + youthAcademyPrice[cYAcademyCard.youthAcademy+1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "</button>";
						}	
						renderYouthAcademyCardString += tableCellEnd;
					renderYouthAcademyCardString += tableRowEnd;
					renderYouthAcademyCardString += tableRowStart;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "Downgrade youth academy";
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							renderYouthAcademyCardString += "Monthly cost after downgrade: ";
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							if (cYAcademyCard.youthAcademy > 0) {
								renderYouthAcademyCardString += youthAcademyMaintenance[cYAcademyCard.youthAcademy-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'});
							} else {
								renderYouthAcademyCardString += youthAcademyMaintenance[0].toLocaleString('de-DE', {style:'currency', currency:'EUR'});;
							}	
						renderYouthAcademyCardString += tableCellEnd;
						renderYouthAcademyCardString += tableCellStart;
							if (cYAcademyCard.youthAcademy > 0) {
								renderYouthAcademyCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" id=\"downgradeYouthAcademy\">Downgrade</button>";
							} else {
								renderYouthAcademyCardString += "<button class=\"btn btn-danger\" onmouseup=\"mUp(this)\" disabled>Downgrade</button>";
							}	
						renderYouthAcademyCardString += tableCellEnd;
					renderYouthAcademyCardString += tableRowEnd;
				renderYouthAcademyCardString += tBodyEnd;
			renderYouthAcademyCardString += tableEnd;
		renderYouthAcademyCardString += divEnd;
	renderYouthAcademyCardString += divEnd
	return renderYouthAcademyCardString;
}


function setStadiumMenu (cStadium) {
	let renderClubMenuString = stadiumSummaryCard(cStadium);
	renderClubMenuString += cardStart;
		renderClubMenuString += cardHeaderStart;
		renderClubMenuString += "Sell Tickets";
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"sellTicket\">sell Ticket</button>";
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	renderClubMenuString += cardStart;
		renderClubMenuString += cardHeaderStart;
			renderClubMenuString += "Upgrade Ticket Sale";
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "Current vendor:<br />" + ticketVendorString[(cStadium.ticketVendor)] + " € <br />";
			if(cStadium.cash>= Math.floor(ticketVendorPrice[cStadium.ticketVendor])) {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"hireTicketVendor\">" + Math.floor(ticketVendorPrice[cStadium.ticketVendor]) + " €</button>";
			} else {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" disabled>" + Math.floor(ticketVendorPrice[cStadium.ticketVendor]) + " €</button>";
			}
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	//Tribünen ausbauen
	for (i=0;i<4;i++) {
		renderClubMenuString += cardStart;
			renderClubMenuString += cardHeaderStart;
			renderClubMenuString += terraceNameString[i];
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;	
			renderClubMenuString += "Capacity: " + cStadium.stadium.terraces[i] + "<br />";
			renderClubMenuString += "Upgrade: +" + Math.floor(0.1 * cStadium.stadium.terraces[i]) + "<br />";
			if(cStadium.cash>= getUpgradeTerraceSeatingPrice(cStadium.stadium, i)) {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeTerraceCapacity\" value="+ i + ">" + getUpgradeTerraceSeatingPrice(cStadium.stadium, i) + " € </button>";
			} else {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" value="+ i + " disabled>" + getUpgradeTerraceSeatingPrice(cStadium.stadium, i) + " € </button>";
			}
			renderClubMenuString += "<br /><br />Comfort Level: " + terraceComfortString[cStadium.stadium.terraceComfort[i]] + "<br />";
			renderClubMenuString += "Upgrade to: " + terraceComfortString[cStadium.stadium.terraceComfort[i]+1] + "<br />";
			if(cStadium.cash>= clubGetUpgradeTerraceComfortPrice(cStadium, i)) {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeTerraceComfort\" value="+ i + ">" + clubGetUpgradeTerraceComfortPrice(cStadium, i) + "€" + "</button>";
			} else {
				renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" value=" + i + " disabled>" + clubGetUpgradeTerraceComfortPrice(cStadium, i) + " € </button>";
			}
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	}
	return renderClubMenuString;
}



function stadiumSummaryCard(cStadiumCard) {
	let cStadiumCardString = cardStart;
	//Card header
		cStadiumCardString += cardHeaderStart;
			cStadiumCardString += "<b>Stadium</b>";
		cStadiumCardString += divEnd;
		//Card body
		cStadiumCardString += cardBodyStart;	
			//Table Start
			cStadiumCardString += tableStart;
				//Tablehead
				//Table body
				cStadiumCardString += tBodyStart;
					cStadiumCardString += tableRowStart;
						cStadiumCardString += tableCellStart;
							cStadiumCardString += "Capacity "+ cStadiumCard.stadium.capacity + "<br />";
						cStadiumCardString += tableCellEnd;
						cStadiumCardString += tableCellStart;
							if (cStadiumCard.stadiumOccupationSeasonGame.length>0) {
								cStadiumCardString += "Ticket sold last match: " + cStadiumCard.stadiumOccupationSeasonGame[cStadiumCard.stadiumOccupationSeasonGame.length-1];
							} else {
								cStadiumCardString += "Ticket sold last match: First match<br />";
							}
						cStadiumCardString += tableCellEnd;
					cStadiumCardString += tableRowEnd;					
					cStadiumCardString += tableRowStart;
						cStadiumCardString += tableCellStartSpan2;
							cStadiumCardString += "<div class=\"progress\">";
								cStadiumCardString += "<div class=\"progress-bar"
									if ((cStadiumCard.stadium.seatsSold/cStadiumCard.stadium.capacity)>0.75) {
										if ((cStadiumCard.stadium.seatsSold/cStadiumCard.stadium.capacity)==1) {
											cStadiumCardString += " bg-danger";
										} else {
											cStadiumCardString += " bg-warning";
										}
									}
									cStadiumCardString += "\" role=\"progressbar\" style=\"width:" + cStadiumCard.stadiumOccupationSeasonGame[cStadiumCard.stadiumOccupationSeasonGame.length-1]/cStadiumCard.stadium.capacity*100 + "%\" aria-valuenow=\""+ cStadiumCard.stadium.seatsSold + "\" aria-valuemin=\"0\" aria-valuemax=\"" + cStadiumCard.stadium.capacity + "\">";
								cStadiumCardString += divEnd;
							cStadiumCardString += divEnd;
						cStadiumCardString += tableCellEnd;
					cStadiumCardString += tableRowEnd;
				cStadiumCardString += tBodyEnd;
			cStadiumCardString += tableEnd;
		cStadiumCardString += divEnd;
	cStadiumCardString += divEnd + divEnd;
	return cStadiumCardString;
}



function renderStatisticsMenu(cRenderFinanceMenu) {	
	renderClubMenuString = cardStart50;
		renderClubMenuString += cardHeaderStart;
			renderClubMenuString += strong + "Finance" + strongEnd;
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "Account balance: " + cRenderFinanceMenu.cash.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Revenue current month: " + cRenderFinanceMenu.revenueMonth[eClub.revenueMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			if(cRenderFinanceMenu.costMonth.length<2) {
				renderClubMenuString += "Revenue last month: First month<br />";
			} else {
				renderClubMenuString += "Revenue last month: " + cRenderFinanceMenu.revenueMonth[eClub.revenueMonth.length-2].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			}
			renderClubMenuString += "Cost current month: " + cRenderFinanceMenu.costMonth[cRenderFinanceMenu.costMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Cost last month: " + cRenderFinanceMenu.costMonth[cRenderFinanceMenu.costMonth.length-1].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			if(cRenderFinanceMenu.costMonth.length<2) {
				renderClubMenuString += "Balance last month:  First month<br />";
			} else {
				renderClubMenuString += "Balance last month: " + (cRenderFinanceMenu.revenueMonth[cRenderFinanceMenu.costMonth.length-2] - cRenderFinanceMenu.costMonth[cRenderFinanceMenu.costMonth.length-2]).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			}
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	return renderClubMenuString;
};




function setClubMenu() {
	
	menuString = sectionStart;
	menuString += colStart;
	menuString += strong + gameData.player.club.name + strongEnd;
	menuString += colEnd;
	menuString += colStart;
	menuString += "Kontostand: " + Math.floor(gameData.player.club.cash) + " €";
	menuString += colEnd;
	menuString += sectionEnd;
	menuString += renderClubMenu(gameData.player.club)
	return menuString;

};

	clubPrintTable = function(cPTable) {
		return (cPTable.name + " " + cPTable.leaguePoints + " " + cPTable.leagueGoalsScored + " " + cPTable.leagueGoalsConceded);
	}
	
	
function renderGetCityName() {
	//Card start
	let initHTMLString = cardStart;
		//Card header
		initHTMLString += cardHeaderStart;
			initHTMLString += "<b>Choose your club home town</b>";
		initHTMLString += divEnd;
		//Card body
		initHTMLString += cardBodyStart;	
			initHTMLString += "Let's find a home town for your club!<br /><br />";
			initHTMLString += "What's the name of the city?<br />";
			if (gameData.clubTown == -1) {
				initHTMLString += "<form><div class=\"form-group\"><input type=\"text\" placeholder=\"Type city name...\" id=\"cityNameInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Submit city\" onmouseup=\"mUp(this)\"  id=\"cityNameInputButton\" class=\"btn btn-primary\">";
			} else {
				initHTMLString += "<form><div class=\"form-group\"><input type=\"text\" placeholder=\"" + gameData.clubTown + "\" id=\"cityNameInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Submit city\" onmouseup=\"mUp(this)\"  id=\"cityNameInputButton\" class=\"btn btn-primary\">";
			}
			initHTMLString += "    <input type=\"button\" value=\"Random city\" onmouseup=\"mUp(this)\"  id=\"randomCityButton\" class=\"btn btn-primary\"></form>";
			initHTMLString += "The zip code is needed to find your regional league.<br />";
			if (gameData.clubZipCode == -1) {
				initHTMLString += "<form><div class=\"form-group\"><input type=\"number\" placeholder=\"enter PLZ\" id=\"zipCodeInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Submit ZIP code\" onmouseup=\"mUp(this)\"  id=\"zipCodeInputButton\" class=\"btn btn-primary\"></form>";
			} else {
				initHTMLString += "<form><div class=\"form-group\"><input type=\"number\" placeholder=\"" + gameData.clubZipCode + "\" id=\"zipCodeInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Submit ZIP code\" onmouseup=\"mUp(this)\"  id=\"zipCodeInputButton\" class=\"btn btn-primary\"></form>";
			}
			initHTMLString += "<br /><br />Do you want to continue with this city?<br />";
			initHTMLString += "<strong>" + gameData.clubZipCode + " " + gameData.clubTown + "</strong><br />";
			let buttonDisabled = "";
			if (gameData.clubTown == -1) {
				buttonDisabled = "disabled";
			}			
			if (gameData.clubZipCode == -1) {
				buttonDisabled = "disabled";
			}				
			initHTMLString += "<input type=\"button\" value=\"Confirm your city\" onmouseup=\"mUp(this)\"  id=\"confirmCityButton\" class=\"btn btn-primary\"" + buttonDisabled +">";
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}


function renderGetClubName() {
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
				initHTMLString += "Let's find a name for your club!<br /><br />";
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
						initHTMLString += "Maybe add a founding year?<br />";
						initHTMLString += "<form><div class=\"form-group\"><input id=\"clubNumberInput\" type=\"text\" placeholder=\"04\" id=\"clubNumberInput\" class=\"form-control\"></div>"
								+"<input type=\"button\" value=\"Confirm club number\" onmouseup=\"mUp(this)\"  id=\"acceptClubNumberButton\" class=\"btn btn-primary\"></form>";
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
						let buttonDisabled = "";
						if (gameData.clubPrefix == -1) {
							buttonDisabled = "disabled";
						}
						initHTMLString += "<input type=\"button\" value=\"Confirm club name\" onmouseup=\"mUp(this)\"  id=\"acceptClubNameButton\" class=\"btn btn-primary\"" + buttonDisabled + ">";
						initHTMLString += tableCellEnd;
					initHTMLString += tableRowEnd;					

				initHTMLString += tBodyEnd;
			initHTMLString += tableEnd;
				
		initHTMLString += divEnd;
	initHTMLString += divEnd;
	return initHTMLString;
}




perimeterAdvertisingString = [
	"No advertising",
	"Posters on the wall",
	"Banner on the fence",
	"One Advertising board",
	"Two Advertising boards",
	"Advertising boards on the home end",
	"Advertising boards on one away end",
	"Advertising boards on one straight terrace",
	"Advertising boards on all terraces",
	"Some rotational advertising boards ",
	"Full set of rotational advertising boards ",
	"Some video advertising boards ",
	"Full set of video advertising boards "
];




coachString = [
	"None" ,
	"Coach yourself",
	"Read a book on coaching",
	"Learn about coaching on YouTube",
	"Hire coach",
	"Coaching workshop",
	"Athletics coaching",
	"Tactics coaching",
	"Coaching license basic",
	"Attacking coaching",
	"Defense coaching",
	"Coaching license D",
	"Positioning coaching",
	"Pressing coaching",
	"Coaching license C",
	"Psychology coaching",
	"Pressing coaching",
	"Coaching license B",
	"Coaching license A",
	"Fluid positioning coaching",
	"Coaching license Elite",
	"Fully Upgraded"
];

coachPrice = [
	0,
	100,
	2500,
	10000,
	25000,
	60000,
	120000,
	250000,
	500000,
	1000000,
	2000000,
	4000000,
	8000000,
	16000000,
	32000000,
	64000000,
	128000000,
	256000000,
	512000000,
	1024000000,
	2048000000
];

var coachSalary = [
	0,
	25,
	75,
	125,
	200,
	600,
	1000,
	2000,
	4000,
	6500,
	9000,
	12500,
	17500,
	25000,
	35000,
	50000,
	75000,
	115000,
	150000,
	175000,
	250000
];

shirtSponsorString = [
	
	"Druckerei Schmidt",
	"Getränke Meier",
	"Getränke Holzmann",
	"Pizzeria Bella Italia",
	"Möbel Müller",
	"Baumarkt Hansen",
	"Sparkasse",
	"Versicherungsagentur Yilmaz" /*],
	[
	"Caco Carlo",
	"IDEA",
	"WV",
	"Mercedes Denz",
	"Abble"
	]
	*/
];

shirtSponsorReward = [
	0,
	250,
	1000,
	5000,
	10000,
	30000,
	75000,
	125000,
	180000,
	250000,
	500000
];

youthAcademyString = [
	"none",
	"Allow some kids to play",
	"Organize a kids team",
	"Take part in kiddie leagues",	
	"Organize a coach for the kids",
	"Organize a coach for each team",
	"Youth coaching schedule",
	"Tactical youth coaching",
	"Youth athletics coach",
	"Youth physical therapy",
	"School support",
	"Summer camp",
	"Individual training schedules",
	"Youth training facility",
	"Youth academy",
	"Boarding school",
	"Youth analytics program",
	"Advanced academy",
	"National youth team center",
	"National youth team headquarters",
	"National youth olympics facility",
	"Fully Upgraded"
];

var youthAcademyPrice = [
	0,
	100,
	2500,
	10000,
	25000,
	60000,
	120000,
	250000,
	500000,
	1000000,
	2000000,
	4000000,
	8000000,
	16000000,
	32000000,
	64000000,
	128000000,
	256000000,
	512000000,
	1024000000,
	2048000000
];

var youthAcademyMaintenance = [
	0,
	25,
	75,
	125,
	200,
	600,
	1000,
	2000,
	4000,
	6500,
	9000,
	12500,
	17500,
	25000,
	35000,
	50000,
	75000,
	115000,
	150000,
	175000,
	250000
];