var stadium = function() {
	this.capacity = 100;
	this.seatsSold = 0;
	this.terraceOccupation = [0, 0, 0, 0];
	this.terraces = [ 100, 0, 0, 0];
	this.terraceComfort = [0, 0, 0, 0];
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

