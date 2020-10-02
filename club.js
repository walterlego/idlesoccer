var club = function(isHuman, leagueLevel, leagueID) {
	//console.log("Erstelle Club", isHuman, leagueLevel, leagueID);
	this.isHuman = isHuman;
	this.leagueLevel = leagueLevel;
	this.leagueID = leagueID;
	this.reputation = (18-this.leagueLevel) * (18-this.leagueLevel);
	//console.log("Reputation ", leagueNames[this.leagueLevel], this.reputation);
	this.cash = Math.floor(Math.pow(2,(18-this.leagueLevel))*50);
	//name
	this.name = clubPrefix[Math.floor(Math.random()*clubPrefix.length)] + " ";
	if(Math.random()>0.7){
		this.name += clubMiddle[Math.floor(Math.random()*clubMiddle.length)] + " ";
	};
	let cityFound = false;
	let cityCandidate = 0;
	//console.log("cityCandidate");
	while(cityFound == false) {
		cityCandidate = Math.floor(Math.random()*CityData.length);
		if (CityData[cityCandidate][1]>(288255/(this.leagueLevel+1))) {
			cityFound = true;
		}
	}
	//console.log("city found");
	this.name += CityData[cityCandidate][0] + " ";
	if(Math.random()>0.8){
		this.name += "0" + (Math.floor(Math.random()*9)+1);
	};

	
	//Team	
	this.team = new team(isHuman, leagueLevel);
	//console.log("Team added");
	//Youth Academy
	this.youthAcademy = 1;
	
	//STAFF
	this.coach = 1;
	this.coachSalary = 0;
	
	//Marketing
	this.perimeterAdvertising = 0;
	this.perimeterAdvertisingRevenue = 0;
	this.perimeterAdvertisingMaintenance = 0;
	
	//stadium
	this.stadium = new stadium();
	//console.log("erstelle Stadion:", this.stadium);
	//Ticketing
	this.ticketVendor = 0; 
	this.ticketVendorRate = 0;

	/////////////////////////////////////////////
	///////////////Ligastatistik
	/////////////////////////////////////////////
	this.leaguePoints = 0;
	this.leagueGoalsConceded = 0;
	this.leagueGoalsScored = 0;
	
	this.costLastMonth = 0;
	this.costCurrentMonth = 0;
	this.revenueCurrentMonth = 0;
	this.revenueLastMonth = 0;
	//return this;
};

function loadClub(loadClub) {
	
}

//gameDay
function clubGameDay(clubGameDay, gameDayLeague) {
	//stadiumGameDay(clubGameDay);
	teamGameDay(clubGameDay.team, gameDayLeague);
}

function clubGameDayHome(homeClub) {
	//console.log("clubGameDayHome");
	stadiumGameDay(homeClub.stadium);
}

//trainingday

function trainingdayClub(trainingClub) {
	teamTraining(trainingClub.team, trainingClub);
}


/////////////////////////////////////////////
/////////////// Next one please
/////////////////////////////////////////////

function clubNextMonth(nMClub) {
	var bufferSum = 0;
	if (nMClub.perimeterAdvertising > 1) {
		nMClub.cash += getPerimeterAdvertisingMonthlyRevenue(nMClub);
		nMClub.cash -= getPerimeterAdvertisingMonthlyCost(nMClub);
	}
	if (nMClub.coach > 1) {
		bufferSum = nMClub.coachSalary;
		if(nMClub.cash < bufferSum) {
			downgradeCoach(nMClub);
			bufferSum = nMClub.coachSalary;
		}
		nMClub.cash -= bufferSum;
		nMClub.costCurrentMonth += bufferSum;
		//Math.pow(COACHSALARYCONSTANT,(COACHSALARYEXPONENT*nMClub.coach));
	}
	for (pSalary=0; pSalary<nMClub.team.players.length; pSalary++) {
		bufferSum = nMClub.team.players[pSalary].salary;
		nMClub.cash -= bufferSum;
		nMClub.costCurrentMonth += bufferSum;
	}
	nMClub.costLastMonth = nMClub.costCurrentMonth;
	nMClub.costCurrentMonth = 0;
	nMClub.revenueLastMonth = nMClub.revenueCurrentMonth;
	nMClub.revenueCurrentMonth = 0;
}


function clubNextSeason(nMClub, nMLeague) {
	for (searchClub = 0; searchClub < nMLeague.clubs.length; searchClub++) {
		if (nMLeague.clubs[searchClub].name == nMClub.name) {
			nMClub.reputation = 0.75 * nMClub.reputation + 0.25 * ((18-nMClub.leagueLevel) * (18-searchClub));
			//console.log("Liga: ", gameData.currentLeague.clubs.length, "Tabellenplatz: ", searchClub, "Club: ", gameData.currentLeague.clubs[searchClub].name, "Reputation: ", nMClub.reputation);
		}
	}
	nMClub.leaguePoints = 0;
	nMClub.leagueGoalsConceded = 0;
	nMClub.leagueGoalsScored = 0;
	nMClub.leagueGoalsScored = 0;
	nMClub.leagueLevel = nMLeague.leagueLevel;
	nMClub.leagueID = nMLeague.leagueID;
	if(nMClub.isHuman) {
		gameData.player.leagueLevel = nMLeague.leagueLevel;
		gameData.player.leagueID = nMLeague.leagueID;
	}
	var addNumOfKickers = Math.round(Math.random()*(1+nMClub.youthAcademy));
	//console.log("Nachwuchsspieler: ", addNumOfKickers);
	for (addPlayers = 0; addPlayers<addNumOfKickers; addPlayers++) {
		addJuniorKicker(nMClub);
	}
	teamNextSeason(nMClub.team, nMClub);
}

function clubPromotion(promotedClub) {
	promotedClub.leagueLevel--;
	promotedClub.leagueID = Math.floor(promotedClub.leagueID/2);
}



//////////////////////////////////////////////////
//// Staff
//////////////////////////////////////////////////

function upgradeCoach(cClub) {
	if (cClub.cash >= coachPrice[cClub.coach]) {
		cClub.cash -= coachPrice[cClub.coach];
		cClub.coach++;
		cClub.coachSalary = Math.pow(COACHSALARYCONSTANT,(COACHSALARYEXPONENT*cClub.coach));
		console.log(cClub.coachSalary);
	} else {
		alert("zu teuer");
	}
}

function downgradeCoach(cClub) {
	if (cClub.coach > 1) {
		cClub.coach--;
		cClub.coachSalary = Math.pow(COACHSALARYCONSTANT,(COACHSALARYEXPONENT*cClub.coach));
		console.log("Coach downgrade auf ", cClub.coachSalary);
	}
}

//////////////////////////////////////////////////
//// Youth
//////////////////////////////////////////////////

function clubUpgradeYouthAcademy(upgradeYAC) {
	if (upgradeYAC.cash >= youthAcademyPrice[upgradeYAC.youthAcademy]) {
		upgradeYAC.cash -= youthAcademyPrice[upgradeYAC.youthAcademy];
		upgradeYAC.youthAcademy++;
	} else {
		alert("zu teuer");
	}
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
		vendorClub.cash -= ticketVendorPrice[vendorClub.ticketVendor];
		vendorClub.ticketVendor++;
		vendorClub.ticketVendorRate++;
	}
};

function clubSellTicket(ticketClub) {
		if ((ticketClub.stadium.seatsSold + ticketClub.stadium.seatsToAssign) < ticketClub.stadium.capacity) {
			ticketClub.stadium.seatsToAssign++;
		}
	};
	
//////////////////////////////////////////////////
///// Stadium
//////////////////////////////////////////////////



function upgradeTerraceSeating(updateClub, upgradeTerrace) {
		if (updateClub.stadium.terraces[upgradeTerrace] > 0) {
			var tCost = Math.floor(1.1 * updateClub.stadium.terraces[upgradeTerrace] * EXPANDTERRACEPRICE * EXPANDTERRACECOMFORT * (updateClub.stadium.terraceComfort[upgradeTerrace]+0.5));
			if (updateClub.cash >= tCost) {
				updateClub.cash -= tCost;
				updateClub.stadium.terraces[upgradeTerrace] = Math.floor(1.1*updateClub.stadium.terraces[upgradeTerrace]);
				updateCapacity(updateClub.stadium);
			}
		} else {
			if (updateClub.cash>=1000) {
				updateClub.cash -= 1000;
				updateClub.stadium.terraces[upgradeTerrace] = 100;
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
			updateClub.cash -= tCost;
			updateClub.stadium.terraceComfort[upgradeTerrace]++;
		}
	} else {
		if (updateClub.stadium.terraces[upgradeTerrace] > 0) {
			if (updateClub.cash>=1000) {
				updateClub.cash -= 1000;
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

function getPerimeterAdvertisingMonthlyBalance(nMClub) {
	if(nMClub.perimeterAdvertising>0) {
		return getPerimeterAdvertisingMonthlyRevenue(nMClub) - getPerimeterAdvertisingMonthlyCost(nMClub);
	} else {
		return 0;
	}
}

function getPerimeterAdvertisingMonthlyRevenue(nMClub) {
	if(nMClub.perimeterAdvertising>0) {
		return PERIMETERADVERTISINGREVENUEMULTIPLIER * Math.pow(PERIMETERADVERTISINGREVENUEBASE,(PERIMETERADVERTISINGEFFICIENCY*nMClub.perimeterAdvertising*nMClub.reputation));
	} else {
		return 0;
	}
}

function getPerimeterAdvertisingMonthlyRevenueAfterUpgrade(nMClub) {
	return PERIMETERADVERTISINGREVENUEMULTIPLIER * Math.pow(PERIMETERADVERTISINGREVENUEBASE,(PERIMETERADVERTISINGEFFICIENCY*(nMClub.perimeterAdvertising+1)*nMClub.reputation));
}

function getPerimeterAdvertisingMonthlyCost(nMClub) {
	if(nMClub.perimeterAdvertising>0) {
		return PERIMETERADVERTISINGRECOSTMULTIPLIER * Math.pow(PERIMETERADVERTISINGMONTHLYCOST, (PERIMETERADVERTISINGMONTHLYINCREMENT*nMClub.perimeterAdvertising));
	} else {
		return 0;
	}
}

function getPerimeterAdvertisingMonthlyCostAferUpgrade(nMClub) {
	return PERIMETERADVERTISINGRECOSTMULTIPLIER * Math.pow(PERIMETERADVERTISINGMONTHLYCOST, (PERIMETERADVERTISINGMONTHLYINCREMENT*(nMClub.perimeterAdvertising+1)));
}

function upgradePerimeterAdvertising(advertisingClub) {
	var PAUpgradeCost = getPerimeterAdvertisingUpgradeCost(advertisingClub);
	if (advertisingClub.cash >= PAUpgradeCost) {
		advertisingClub.cash -= PAUpgradeCost;
		advertisingClub.perimeterAdvertising++;
		advertisingClub.perimeterAdvertisingRevenue = getPerimeterAdvertisingMonthlyRevenue(advertisingClub);
		console.log("Einnahmen", advertisingClub.perimeterAdvertisingRevenue);
		advertisingClub.perimeterAdvertisingMaintenance = getPerimeterAdvertisingMonthlyCost(advertisingClub);
		console.log("Monatliche Kosten", advertisingClub.perimeterAdvertisingMaintenance);
		
		
	} else {
		alert("zu teuer");
	}
}


function getPerimeterAdvertisingUpgradeCost(advertisingClub) {
	return Math.pow(PERIMETERADVERTISINGBASECOST, (PERIMETERADVERTISINGCOSTINCREMENT*advertisingClub.perimeterAdvertising));
}






//////////////////////////////////////////////////
///// Ticketing
//////////////////////////////////////////////////




function ticketUpdate(ticketClub) {
	var bufferSum = 0;
	if (ticketClub.stadium.seatsSold < ticketClub.stadium.capacity) {
		ticketClub.stadium.seatsToAssign += Math.floor(Math.pow(ticketClub.ticketVendorRate,TICKETVENDOREXPONENT));
		if (ticketClub.stadium.capacity < (ticketClub.stadium.seatsSold + ticketClub.stadium.seatsToAssign)) {
			ticketClub.stadium.seatsToAssign = (ticketClub.stadium.capacity-ticketClub.stadium.seatsSold);
			console.log("verkaufte Tickets", ticketClub.stadium.seatsToAssign);
		}
		var sellTerrace = 0;
		var sellAmount = 0;
		var sellIterations = 0;
		sellTerrace = Math.floor(Math.random()*3);
		while (ticketClub.stadium.seatsToAssign > 0) {
			if (sellIterations == 75) {
				console.log("Verkaufsdurchläufe: " + sellIterations);
				console.log("ticketClub.stadium.seatsToAssign ", ticketClub.stadium.seatsToAssign);
				console.log("ticketClub.stadium.seatsSold", ticketClub.stadium.seatsSold);
				console.log("Stadion:", ticketClub.stadium);
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
				ticketClub.revenueCurrentMonth += bufferSum;
				ticketClub.cash += bufferSum;
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




//////////////////////////////////////////////////
///// Rendering
//////////////////////////////////////////////////

function renderFinanceMenu(cRenderFinanceMenu) {	
	renderClubMenuString = cardStart50;
		renderClubMenuString += cardHeaderStart;
			renderClubMenuString += "Finance";
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "Account balance: " + cRenderFinanceMenu.cash.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Revenue current month: " + cRenderFinanceMenu.revenueCurrentMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Revenue last month: " + cRenderFinanceMenu.revenueLastMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Cost current month: " + cRenderFinanceMenu.costCurrentMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Cost last month: " + cRenderFinanceMenu.costLastMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Balance last month: " + (cRenderFinanceMenu.revenueLastMonth - cRenderFinanceMenu.costLastMonth).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	return renderClubMenuString;
};

function renderMarketingMenu(cRenderMarketingMenu) {	
	renderClubMenuString = renderPerimeterAdvertisingCard(cRenderMarketingMenu);
	return renderClubMenuString;
};

function renderPerimeterAdvertisingCard(cPerimeterAdvertising) {	
	//current advertising
	renderPerimeterAdvertisingCardString = cardStart50;
		renderPerimeterAdvertisingCardString += cardHeaderStart;
			renderPerimeterAdvertisingCardString += "Perimeter advertising";
		renderPerimeterAdvertisingCardString += divEnd;
		renderPerimeterAdvertisingCardString += cardBodyStart;
			//Math.pow(PERIMETERADVERTISINGREVENUEBASE,(PERIMETERADVERTISINGEFFICIENCY*cPerimeterAdvertising.perimeterAdvertising*cPerimeterAdvertising.reputation));
			renderPerimeterAdvertisingCardString += "Current advertising: " + perimeterAdvertisingString[cPerimeterAdvertising.perimeterAdvertising] + "<br />";
			renderPerimeterAdvertisingCardString += "Monthly revenue: " + getPerimeterAdvertisingMonthlyRevenue(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderPerimeterAdvertisingCardString += "Monthly cost: " + getPerimeterAdvertisingMonthlyCost(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderPerimeterAdvertisingCardString += "Balance: " + getPerimeterAdvertisingMonthlyBalance(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";		
		renderPerimeterAdvertisingCardString += divEnd;
	renderPerimeterAdvertisingCardString += divEnd + divEnd;
	//upgrade advertising
	renderPerimeterAdvertisingCardString += cardStart50;
		renderPerimeterAdvertisingCardString += cardHeaderStart;
			renderPerimeterAdvertisingCardString += "Upgrade perimeter advertising";
		renderPerimeterAdvertisingCardString += divEnd;
		renderPerimeterAdvertisingCardString += cardBodyStart;
			//Math.pow(PERIMETERADVERTISINGREVENUEBASE,(PERIMETERADVERTISINGEFFICIENCY*cPerimeterAdvertising.perimeterAdvertising*cPerimeterAdvertising.reputation));
			renderPerimeterAdvertisingCardString += "Improve advertising to: " + perimeterAdvertisingString[cPerimeterAdvertising.perimeterAdvertising+1] + "<br />";
			renderPerimeterAdvertisingCardString += "Upgrade cost: " + getPerimeterAdvertisingUpgradeCost(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderPerimeterAdvertisingCardString += "Expected monthly revenue after upgrade: " + getPerimeterAdvertisingMonthlyRevenueAfterUpgrade(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderPerimeterAdvertisingCardString += "Monthly cost after upgrade: " + getPerimeterAdvertisingMonthlyCostAferUpgrade(cPerimeterAdvertising).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			if (cPerimeterAdvertising.cash >= getPerimeterAdvertisingUpgradeCost(cPerimeterAdvertising)) {
				renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradePerimeterAdvertising\">Upgrade</button>";
			} else {
				renderPerimeterAdvertisingCardString += "<button class=\"btn btn-primary\" disabled>Upgrade</button>";
			}			
		renderPerimeterAdvertisingCardString += divEnd;
	renderPerimeterAdvertisingCardString += divEnd + divEnd;
	return renderPerimeterAdvertisingCardString;
};

function renderStaffMenu(renderClub) {
	renderClubMenuString = br + renderCoachCard(renderClub);
	renderClubMenuString += br + renderYouthAcademyCard(renderClub);
	return renderClubMenuString;
}

function renderCoachCard(renderClub) {
	renderCoachCardString = cardStart50;
		renderCoachCardString += cardHeaderStart;
			renderCoachCardString += "<h3>Coach</h3>";
		renderCoachCardString += divEnd;
		renderCoachCardString += cardBodyStart;
			renderCoachCardString += "Upgrade Cost: " + coachPrice[renderClub.coach].toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			if (renderClub.cash >= coachPrice[renderClub.coach]) {
				renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeCoach\">"+coachString[renderClub.coach+1]+"</button>";
			} else {
				renderCoachCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" disabled>"+coachString[renderClub.coach+1]+"</button>";
			}			
		renderCoachCardString += divEnd;
	renderCoachCardString += divEnd + divEnd;
	return renderCoachCardString;
}

function renderYouthAcademyCard(renderClub) {
	renderYouthAcademyCardString = cardStart50;
		renderYouthAcademyCardString += cardHeaderStart;
			renderYouthAcademyCardString += "Youth Academy";
		renderYouthAcademyCardString += divEnd;
		renderYouthAcademyCardString += cardBodyStart;
			renderYouthAcademyCardString += "Upgrade Cost: " + Math.floor(youthAcademyPrice[renderClub.youthAcademy]).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			if (renderClub.cash >= coachPrice[renderClub.coach]) {
				renderYouthAcademyCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"upgradeYouthAcademy\">"+youthAcademyString[renderClub.youthAcademy+1]+"</button>";
			} else {
				renderYouthAcademyCardString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" disabled>"+youthAcademyString[renderClub.youthAcademy+1]+"</button>";
			}			
		renderYouthAcademyCardString += divEnd;
	renderYouthAcademyCardString += divEnd + divEnd;
	return renderYouthAcademyCardString;
};

function setStadiumMenu (cStadium) {
	renderClubMenuString = cardStart50;
		renderClubMenuString += cardHeaderStart;
			renderClubMenuString += "Stadium";
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "Capacity "+ cStadium.stadium.capacity + "<br />";
			renderClubMenuString += "Ticket sold: " + cStadium.stadium.seatsSold + "<br />";
			renderClubMenuString += "<div class=\"progress\">";
			renderClubMenuString += "<div class=\"progress-bar"
			if ((cStadium.stadium.seatsSold/cStadium.stadium.capacity)>0.75) {
				if ((cStadium.stadium.seatsSold/cStadium.stadium.capacity)==1) {
					renderClubMenuString += " bg-danger";
				} else {
					renderClubMenuString += " bg-warning";
				}
			}
			renderClubMenuString += "\" role=\"progressbar\" style=\"width:" + cStadium.stadium.seatsSold/cStadium.stadium.capacity*100 + "%\" aria-valuenow=\""+ cStadium.stadium.seatsSold + "\" aria-valuemin=\"0\" aria-valuemax=\"" + cStadium.stadium.capacity + "\"></div>";
			renderClubMenuString += divEnd;
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	renderClubMenuString += cardStart50;
		renderClubMenuString += cardHeaderStart;
		renderClubMenuString += "Sell Tickets";
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "<button class=\"btn btn-primary\" onmouseup=\"mUp(this)\" id=\"sellTicket\">sell Ticket</button>";
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	renderClubMenuString += cardStart50;
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
		renderClubMenuString += cardStart50;
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

function renderStatisticsMenu(cRenderFinanceMenu) {	
	renderClubMenuString = cardStart50;
		renderClubMenuString += cardHeaderStart;
			renderClubMenuString += strong + "Finance" + strongEnd;
		renderClubMenuString += divEnd;
		renderClubMenuString += cardBodyStart;
			renderClubMenuString += "Account balance: " + cRenderFinanceMenu.cash.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Revenue current month: " + cRenderFinanceMenu.revenueCurrentMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Revenue last month: " + cRenderFinanceMenu.revenueLastMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Cost current month: " + cRenderFinanceMenu.costCurrentMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Cost last month: " + cRenderFinanceMenu.costLastMonth.toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
			renderClubMenuString += "Balance last month: " + (cRenderFinanceMenu.revenueLastMonth - cRenderFinanceMenu.costLastMonth).toLocaleString('de-DE', {style:'currency', currency:'EUR'}) + "<br />";
		renderClubMenuString += divEnd;
	renderClubMenuString += divEnd + divEnd;
	return renderClubMenuString;
};

function refreshLeagueViewMenu() {
	document.getElementById("leagueTableCard").innerHTML = refreshLeagueTableCard();
}


function renderLeagueViewMenu() {
	renderClubMenuString = setDivID("chooseLeagueCard")
	renderClubMenuString += renderChooseLeagueCard();
	renderClubMenuString += divEnd;
	renderClubMenuString += setDivID("leagueTableCard");
	renderClubMenuString += renderLeagueTableCard();
	renderClubMenuString += divEnd;
	return renderClubMenuString;
};

function renderChooseLeagueCard() {
	let chooseLeagueCardString = cardStart50SetID("chooseLeagueCard");
		chooseLeagueCardString += cardHeaderStart;
			chooseLeagueCardString += strong + "Choose League" + strongEnd;
		chooseLeagueCardString += divEnd;
		chooseLeagueCardString += cardBodyStart;
			chooseLeagueCardString += dropdownStart
				chooseLeagueCardString += setDropdownButton("chooseLeagueLevel", "Choose League");
				chooseLeagueCardString += setDrowpdownMenu("chooseLeagueLevel");
				for (lL=0; lL < gameData.leagues.length; lL++) {
					console.log(gameData.leagues[lL])
					chooseLeagueCardString += setDropdownItemID(lL, leagueNames[lL], "chooseLeagueLevelDD");
				}
			chooseLeagueCardString += divEnd;
			chooseLeagueCardString += br;
			chooseLeagueCardString += dropdownStart
				if (gameData.leagues[gameData.currentLeagueLevel].length > 0) {
					chooseLeagueCardString += setDropdownButton("chooseLeagueID", "Choose Division ");
					chooseLeagueCardString += setDrowpdownMenu("chooseLeagueID");
					for (lL=0; lL < gameData.leagues[gameData.currentLeagueLevel].length; lL++) {
						chooseLeagueCardString += setDropdownItemID(lL, lL.toString(), "chooseLeagueID");
					}
				} else {
					chooseLeagueCardString += setDropdownButtonInactive("chooseLeagueID", "Choose Division ");
					chooseLeagueCardString += setDrowpdownMenu("chooseLeagueID");
				}
				chooseLeagueCardString += divEnd;
		chooseLeagueCardString += divEnd;
	chooseLeagueCardString += divEnd + divEnd;
	return chooseLeagueCardString;
};


function renderLeagueTableCard() {
	let leagueTableCardString = cardStart50SetID("leagueTableCard");
		leagueTableCardString += cardHeaderStart;
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueID] + strongEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueID]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};

function refreshLeagueTableCard() {
	let leagueTableCardString = cardStart50SetID("leagueTableCard");
		leagueTableCardString += cardHeaderStart;
			leagueTableCardString += strong + leagueNames[gameData.displayLeagueLevel] + " " + [gameData.displayLeagueID] + strongEnd;
			leagueTableCardString += printleagueTable(gameData.leagues[gameData.displayLeagueLevel][gameData.displayLeagueID]);
		leagueTableCardString += divEnd;
		leagueTableCardString += cardBodyStart;
			
		leagueTableCardString += divEnd;
	leagueTableCardString += divEnd;
	return leagueTableCardString;
};


//displayLeagueLevel
//displayLeagueID


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


perimeterAdvertisingString = [
	"No perimeter advertising",
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
	"" ,
	"Selber coachen",
	"Trainer-Lehrbuch lesen",
	"Übungen auf YouTube kucken",
	"Trainerlehrgang machen",
	"Trainerschein machen",
	"Trainer vom Nachbarclub abwerben",
	"Trainer fortbilden",
	"Trainerschein bezahlen",
	"Trainer aus der höheren Liga abwerben",
	"Trainerlizenz bezahlen",
	"Techniktrainer",
	"Taktiktrainer",
	"Physiotherapeut",
	"Athletik-Trainer",
	"C-Lizenz",
	"B-Lizenz",
	"A-Lizenz"
];

coachPrice = [
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
	"",
	"Auf der Wiese kicken",
	"Kinderteam gründen",
	"Jugendteam gründen",	
	"Jugendtrainer einstellen",
	"Jugend-Techniktrainer",
	"Schulbetreuung",
	"Jugend-Taktiktrainer",
	"Jugend-Athletik-Trainer",
	"Jugend-Physio",
	"Jugendinternat"
];

youthAcademyPrice = [
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
