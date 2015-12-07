let helpers = {

	slugify : function(text) {
		return text.toLowerCase().trim().replace(/\-/g, ' ').replace(/[^a-z\d\s]/g, '').replace(/\s/g, '-');
	}

}

export default helpers;