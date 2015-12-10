let helpers = {

	slugify : function(text) {
		return text.toLowerCase().trim().replace(/\-/g, ' ').replace(/[^a-z\d\s]/g, '').replace(/\s/g, '-');
	},

	transformDate : function(num) {
		var rawDate = (new Date(num)).toString().split(' ');
		var time = rawDate[4].match(/\d{2}:\d{2}/)[0].replace(/^0/, '');
		var date = rawDate[1] + ' ' + rawDate[2] + ', ' + rawDate[3];
		var rData = [time, date];

		return rData;
	}

}

export default helpers;