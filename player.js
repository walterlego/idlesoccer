//player

var player = function() {
	this.exp = 0;
	this.club = new club(true);
	this.sellTicket = function() {
		if (this.club.stadium.ticketsSold < this.club.stadium.capacity) {
			this.club.stadium.capacity;
			this.club.stadium.ticketsSold++;
			this.club.cash += this.club.stadium.ticketPrice;
		}
	}
	this.update = function() {
		this.club.ticketUpdate();
		this.club.team.update();
	}
	return this;
	//console.log(this);
};


//////////////////////////////////////////////////////////////////////
////////////// getters ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
