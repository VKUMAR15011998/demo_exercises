sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"lrftracker/controller/oDataHelper"
], function(Controller,oDataHelper) {
	"use strict";
	
	return Controller.extend("lrftracker.controller.page2", {
		onInit:  function() {
			
			var that=this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("page2").attachPatternMatched(this._onObjectMatched, this);
			
			
		},
		onAfterRendering:function(){
			
		},
		onNavBack: function() {
			history.go(-1);
		},
		_onObjectMatched: function(oEvent) {
			var cc = oEvent.getParameter("arguments").LRF_Master_ID;
			
			var cc1 = oEvent.getParameter("arguments").Lrf_No;
			this.OdataGet(cc,cc1);
			
		},
		OdataGet:function(cc,cc1){
					var url = this.getOwnerComponent().getModel().sServiceUrl;
					var that = this;
					if (cc1.includes('Temp')) {
						url = url + "/Get_Adani_Logistics_LRF_Master/" + cc;
					} else {
						url = url + "/per_Adani_Logistics_LRF_Master/" + cc;
					}
					jQuery.ajax({
						url: url+"?$expand=To_PackingDoc,To_MaterialDesc,To_CkeckList,To_Draft,To_Final",
						
						method: "GET", // Set the method explicitly to PATCH
						headers: {
							"Content-Type": "application/json",
							"DataServiceVersion": "2.0",
							"X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
						},
	
						success: function (res) {
	
							var oModel = new sap.ui.model.json.JSONModel(res);
							
							this.getOwnerComponent().setModel(oModel, "objectModel");
							sap.ui.getCore().setModel(oModel, "objectModel");
							
	
						}.bind(this),
						error: function (oError) {
							console.error("PATCH request failed: " + oError.responseText);
							alert(oError.responseText);
						}.bind(this)
					});
		},
		onDeliveryDetailsPage:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DeliveryDetails", {
                    LRF_Master_ID: this.getOwnerComponent().getModel("objectModel").oData.LRF_Master_ID,
                    Lrf_No: this.getOwnerComponent().getModel("objectModel").oData.Lrf_No
                });
		}

	});
});