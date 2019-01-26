var stadium = function() {
	this.capacity = 100;
	this.ticketsSold = 0;
	this.ticketPrice = 1;
	this.upgradeSeating = function() {
	};
};

function setStadiumMenu() {
	
	//console.log("setStadiumMenu");
	mainMenuString = sectionStart;
	mainMenuString += colStart;
	mainMenuString += "<strong>Stadion</strong>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;
	mainMenuString += sectionStart;
	mainMenuString += colStart;
	mainMenuString += "Stadionkapazität "+ gameData.player.club.stadium.capacity;//player.stadium.ticketsSold;
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "Plätze frei: " + (gameData.player.club.stadium.capacity - gameData.player.club.stadium.ticketsSold) + " von " + gameData.player.club.stadium.capacity;
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "Kontostand: " + gameData.player.club.cash + " €";
	mainMenuString += colEnd;

	mainMenuString += sectionEnd;
	mainMenuString += sectionStart;
	mainMenuString += colStart;
	mainMenuString += "Aktueller Ticketpreis" + gameData.player.club.stadium.ticketPrice + " € <br />";
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"sellTicket\">sell Ticket</button>";
	mainMenuString += colEnd;
	mainMenuString += colStart;
	mainMenuString += "Nächste Verkaufsstelle: " + ticketVendorPrice[gameData.player.club.ticketVendor] + " € <br />";
	mainMenuString += "<button class=\"regbtn\" onmouseup=\"mUp(this)\" id=\"hireTicketVendor\">" + ticketVendorString[(gameData.player.club.ticketVendor +1)] + "</button>";
	mainMenuString += colEnd;
	mainMenuString += sectionEnd;

	return mainMenuString;
};

ticketVendorString = [
	"keiner",
	"Mutti",
	"Uschis Kiosk",
	"Alle Spielerfrauen",
	"Noch ein Kiosk",
	"Zeitschriftenhändler",
	"Noch ein Zeitschriftenhändler",
	"Facebook-Gruppe",
	"Ticket-Shop"
];

ticketVendorPrice = [
	25,
	150,
	500,
	1000,
	3000,
	7500,
	12500,
	18000,
	25000,
	50000
];
	
	