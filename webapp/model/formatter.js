sap.ui.define([], function () {
	"use strict";
	return {
		formatDate: function (oDate) {
			
			return new Date(oDate || new Date()).toLocaleDateString();
			// return sap.ui.core.formatDateFormat.getDateInstance({pattern: "dd.MM.yyyy"}).format(new Date(oDate));

		}
	};
});