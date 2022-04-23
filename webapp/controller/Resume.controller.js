sap.ui.define([
	"sap/m/library",
	"sap/ui/core/mvc/Controller",
	"sk/peterlabuda/resume/Resume/model/formatter",
	"sap/ui/core/util/File"
], function (mobileLibrary, Controller, formatter, File) {
	"use strict";
	var URLHelper = mobileLibrary.URLHelper;

	return Controller.extend("sk.peterlabuda.resume.Resume.controller.Resume", {
		formatter: formatter,
		onInit: function () {
			// var oJsonModel = this.getOwnerComponent().getModel("Resume");
			// this.getView().setModel(oJsonModel, "Resume");

		},
		onAfterRendering: function () {
			var oJsonModel = this.getOwnerComponent().getModel("Resume");
			this.getView().setModel(oJsonModel, "Resume");
			this.generateQRCode(this.generateVCardString());
		},

		_getVal: function (evt) {
			return evt.getSource().getText();
		},

		handleTelPress: function (evt) {
			URLHelper.triggerTel(this._getVal(evt));
		},

		handleSmsPress: function (evt) {
			URLHelper.triggerSms(this._getVal(evt));
		},

		handleEmailPress: function (evt) {
			URLHelper.triggerEmail(this._getVal(evt), "Info Request", false, false, false, true);
		},

		handleUrlPress: function (evt) {
			URLHelper.redirect(this._getVal(evt), true);
		},

		generateVCardString: function () {
			var oModel = this.getView().getModel("Resume").getData();

			var vcard = "BEGIN:VCARD\n";
			vcard += "VERSION:2.1\n";
			vcard += "KIND:individual\n";
			vcard += "FN:" + oModel.name + " " + oModel.lastName + "\n";
			vcard += "N:" + oModel.lastName + ";" + oModel.name + ";;" + oModel.title + ";\n";
			vcard += "TEL;TYPE=home:tel:" + oModel.phone + "\n";
			vcard += "EMAIL;TYPE=home:" + oModel.email + "\n";
			//vcard += "TITLE:" + oModel.experiences[0].position + "\n";
			vcard += "ORG:ABC\, Inc.;" + oModel.experiences[0].company + "\n";
			vcard += "END:VCARD";
			return vcard;

		},
		generateQRCode: function (vcard) {
			// Google Chart API....
			var baseURL = "http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=";
			var url = baseURL + encodeURI(vcard); //llString;
			// setting final URL to image,which I have taken in view....
			this.byId("imgId").setSrc(url);
		},
		
		downloadVCard: function(){
			sap.ui.core.util.File.save(this.generateVCardString(), "Labuda", "vcard", "text/vcard");
		},
		downloadCv: function(){
			sap.ui.core.util.File.save(this, "LabudaPeterCV", "pdf", "application/pdf");
		}
	});
});