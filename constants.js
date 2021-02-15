//Resources

//Gamestate
var INIT			= 0;
var RUNNING			= 1;


//GUI
var GUISTATE 		= 30000;
var PLAYER			= GUISTATE +1;
var league			= GUISTATE +2;
var TEAM			= GUISTATE +3;
var STADIUM			= GUISTATE +4;
var CLUB			= GUISTATE +5;
var PRESTIGE		= GUISTATE +6;
var POLITICS		= GUISTATE +7;
var SINGLEKICKER	= GUISTATE +8;
var FORMATION		= GUISTATE +9;
var TEAMTRAINING	= GUISTATE +10;
var MARKETING		= GUISTATE +11;
var TEAMCONTRACTS	= GUISTATE +12;
var CANCELCONTRACT	= GUISTATE +13;
var PERSONNEL		= GUISTATE +14;
var FINANCE			= GUISTATE +15;
var STATISTICS		= GUISTATE +16;
var LEAGUEVIEW		= GUISTATE +17;
var GAMEDAYS		= GUISTATE +18;




//TEAM
var KEEPER			= 0;
var DEFENCE			= 1;
var MIDFIELD		= 2;
var STRIKER			= 3;
var BENCH			= 4;
var NOTNOMINATED	= 5;
var INJURED			= 6;

//Training
var COACHBALANCING		= 10000000;
var LEAGUEFFICIENCY		= 1;
var LEAGUEBALANCING		= 100000;
var REFERENCEAGE		= 30;
var AGEBALANCING		= 200000;
var TALENTBALANCING		= 10000;
var POSITIONVSSKILL 	= 0.75;

//Timekeeping
var GAMEDAY 	= 250;//1000;
var FRAMERATE 	= 250;

//New season
var GRADUATE 	= 0;
var STAY 		= 1;
var RELEGATE 	= 2;

//Stadium
var TICKETVENDORBALANCING = 10;
var TICKETVENDORSMOOTING = 10;
var POSITIONDEMANDSMOOTH = 22;
var HOMEDEMANDFACTOR = 0.5;
var HOMEPOSITIONDEMANDFACTOR = 0.75;
var GUESTDEMANDFACTOR = 0.3;
var GUESTPOSITIONDEMANDFACTOR = 0.5;
var TICKETVENDOREXPONENT = 1.7;
var TERRACEBASECAPACITIY = 100;
var ERECTTERRACE = 1000;
var EXPANDTERRACEPRICE = 25;
var EXPANDTERRACECOMFORT = 1.25;

//Marketing
var PERIMETERADVERTISINGREVENUEFACTOR = 0.4;
var PERIMETERADVERTISINGLEVELEXPONENT = 2;
var PERIMETERADVERTISINGREPUTATIONEFFICIENCY = 2;
var PERIMETERADVERTISINGCOSTEXPONENT = 3.5;
var PERIMETERADVERTISINGUPGRADECOSTEXPONENT = 2;
var PERIMETERADVERTISINGCOSTMULTIPLIER = 200;
var PERIMETERADVERTISINGUPGRADECOSTMULTIPLIER = 500;
var PERIMETERADVERTISINGMONTHLYINCREMENT = 0.5;
// Upgrades
var PERIMETERADVERTISINGBASECOST = 10;

//CLUB

var REPUTATIONLEAGUEFACTOR = 20;
var REPUTATIONPLACEMENTFACTOR = 1;
var REPUTATIONSMOOTHING = 0.75;


// Balancing

var STARTCASH = 50;

//Salary and Value
var SALARYCONSTANT = 2;
var VALUECONSTANT = 1000;
var VALUEAGEDEDUCTION = 1.25;

var COACHSALARYCONSTANT = 10;
var COACHSALARYEXPONENT = 2;

var YOUTHACADEMYUPGRADELINEAR = 100;
var YOUTHACADEMYUPGRADEEXPONENT = 4;
var YOUTHACADEMYUPGRADELINEARWEIGHT = 15;
var YOUTHACADEMYUPGRADEEXPONENTWEIGHT = 200;

var YOUTHACADEMYCOSTLINEAR = 100;
var YOUTHACADEMYCOSTLINEARWEIGHT = 0.25;
var YOUTHACADEMYCOSTEXPONENT = 4;
var YOUTHACADEMYCOSTEXPONENTWEIGHT = 1.5;

var COACHSALARYLINEAR = 100;
var COACHSALARYLINEARWEIGHT = 0.25;
var COACHSALARYEXPONENT = 4;
var COACHSALARYEXPONENTWEIGHT = 1.5;



//Tactics
//none
var CHOOSENEW = -1;
//4 3 3
var F433 = 0;
//3 4 3
var F343 = 1;
//4 4 2
var F442 = 2;
//4 5 1
var F451 = 3;
//3 5 2
var F352 = 4;
//3 6 1
var F361 = 5;