var stadium = function(leagueLevel) {
	
	this.seatsSold = 0;
	this.terraceOccupation = [0, 0, 0, 0];
	//STADIUMBASE
	//STADIUMEXPONENT
	if(leagueLevel==9) {
		this.terraces = [ 100, 0, 0, 0];
	} else if(leagueLevel==8) {
		this.terraces = [ 100, 0, 100, 0];
	} else if(leagueLevel==7) {	
		this.terraces = [ 250, 0, 100, 0];
	} else if(leagueLevel==6) {	
		this.terraces = [ 250, 100, 250, 100];
	} else if(leagueLevel==5) {	
		this.terraces = [ 1000, 500, 750, 250];
	} else if(leagueLevel==4) {	
		this.terraces = [ 1500, 500, 1000, 250];
	} else if(leagueLevel==3) {	
		this.terraces = [ 2000, 750, 1500, 500];
	} else if(leagueLevel==2) {	
		this.terraces = [ 4000, 1250, 2500, 1000];
	} else if(leagueLevel==1) {	
		this.terraces = [ 7500, 2500, 5000, 2500];
	}else if(leagueLevel==0) {	
		this.terraces = [ 9000, 3500, 7500, 4000];
	}
	updateCapacity(this);
 	this.terraceComfort = [gameData.leagueStructure.length - leagueLevel, gameData.leagueStructure.length - leagueLevel, gameData.leagueStructure.length - leagueLevel, gameData.leagueStructure.length - leagueLevel];
	//gameData.leagueStructure.length
	this.seatsToAssign = 0;
	this.logOccupation = [];
	this.averageOccupation = 0;
};

function updateseatsToAssign (ticketStadium) {
	//console.log(ticketStadium);
	ticketStadium.seatsSold = ticketStadium.terraceOccupation[0];
	for (updateC = 1; updateC < 4; updateC++) {
		ticketStadium.seatsSold += ticketStadium.terraceOccupation[updateC];
	}
};
	

function updateCapacity(capacityStadium) {
	capacityStadium.capacity = capacityStadium.terraces[0];
	for (updateC = 1; updateC < 4; updateC++) {
	capacityStadium.capacity += capacityStadium.terraces[updateC];
	}
};		

function stadiumGameDay(gStadium) {
	//console.log("stadiumGameDay");
	gStadium.terraceOccupation = [0, 0, 0, 0];
	gStadium.seatsToAssign = 0;
	gStadium.seatsSold = 0;
}

ticketVendorString = [
	"keiner",
	"Mutti",
	"Uschis Kiosk",
	"Alle Spielerfrauen",
	"Vereinsheim",
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
	50000,
	100000,
];

terraceNameString = [
	"Haupttrib&uuml;ne",
	"Nordtrib&uuml;ne",
	"Gegentrib&uuml;ne",	
	"S&uuml;dtrib&uuml;ne"
];

terraceComfortString = [
	"Wiese",
	"Pflastersteine",
	"M&uuml;lleimer",	
	"Gel&auml;nder",
	"Stehtstufen",
	"Sitzschalen",
	"",
];

