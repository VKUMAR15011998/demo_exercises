sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("lrftracker.controller.LrfTracker", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.loadData("model/UserData.json");
                this.getView().setModel(oModel, "EmailModel");

                var url = this.getOwnerComponent().getModel().sServiceUrl;
                var that = this;
                jQuery.ajax({
                    url: url + "/LrfTracker2",
                    method: "GET", // Set the method explicitly to PATCH
                    headers: {
                        "Content-Type": "application/json",
                        "DataServiceVersion": "2.0",
                        "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                    },

                    success: function (res) {
                        var oTable = that.getView().byId("abc");
                        var oModel = new sap.ui.model.json.JSONModel(res.value);

                        //oTable.setModel(oModel, "modelTrk");
                        that.getOwnerComponent().setModel(oModel, "modelTrk");
                        var rowLrf = that.getOwnerComponent().getModel("modelTrk").oData.length;
                        that.getView().byId("iCountRowLrf").setText("LRF Numbers" + "(" + rowLrf + ")");
                        

                    },
                    error: function (oError) {
                        console.error("PATCH request failed: " + oError.responseText);
                        alert(oError.responseText);
                    }
                });
                this.oFilterBar = this.getView().byId("filterbar");

            },
            /* to Navigate with parameters */
            

            onPress: function (oEvent) {


                var oItem = oEvent.getSource();
                var sPath = oItem.getBindingContext('modelTrk').getObject("LRF_Master_ID");
                var sPath1 = oItem.getBindingContext('modelTrk').getObject('Lrf_No');
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("page2", {
                    LRF_Master_ID: sPath,
                    Lrf_No: sPath1
                });
            },
            onSelectTable: function (oEvent) {
                var data = oEvent.getSource().getBindingContext();
            },
            onValueHelpRequestInitiator: function (oEvent) {
                if (!this._DialogEmployeesave) {
                    this._DialogEmployeesave = sap.ui.xmlfragment("lrftracker.view.InitiatorNameDialog", this);
                    this.getView().addDependent(this._DialogEmployeesave);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave);
                this._DialogEmployeesave.open();
            },
            onValueHelpRequestLrf: function (oEvent) {
                if (!this._DialogEmployeesave1) {
                    this._DialogEmployeesave1 = sap.ui.xmlfragment("lrftracker.view.lrfNoDialog", this);
                    this.getView().addDependent(this._DialogEmployeesave1);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave);
                this._DialogEmployeesave1.open();
            },
            onValueHelpRequestProject: function (oEvent) {
                if (!this._DialogEmployeesave2) {
                    this._DialogEmployeesave2 = sap.ui.xmlfragment("lrftracker.view.ProjectDialog", this);
                    this.getView().addDependent(this._DialogEmployeesave2);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave2);
                this._DialogEmployeesave2.open();
            },
            onValueHelpRequestPo: function (oEvent) {
                if (!this._DialogEmployeesave3) {
                    this._DialogEmployeesave3 = sap.ui.xmlfragment("lrftracker.view.PODialog", this);
                    this.getView().addDependent(this._DialogEmployeesave3);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave3);
                this._DialogEmployeesave3.open();
            },
            onSelectAssignMPL: function (oEvent) {
                
                if (!this._DialogEmployeesave4) {
                    this._DialogEmployeesave4 = sap.ui.xmlfragment("lrftracker.view.MPL_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave4);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave4);
                this._DialogEmployeesave4.open();
            },
            onSelectAssignFF: function (oEvent) {
                if (!this._DialogEmployeesave5) {
                    this._DialogEmployeesave5 = sap.ui.xmlfragment("lrftracker.view.FF_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave5);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave5);
                this._DialogEmployeesave5.open();
            },
            onSelectAssignCHA: function (oEvent) {
                if (!this._DialogEmployeesave6) {
                    this._DialogEmployeesave6 = sap.ui.xmlfragment("lrftracker.view.CHA_Email", this);
                    this.getView().addDependent(this._DialogEmployeesave6);
                }
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._DialogEmployeesave6);
                this._DialogEmployeesave6.open();
            },
            _handleValueHelpSearchName: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Initiator_Name", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmName: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("iInputInitiator");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            _handleValueHelpSearchlrf: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmlrf: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("iInputLrf");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            _handleValueHelpSearchProject: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("Project_ID", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmProject: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("iInputProject");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            _handleValueHelpSearchPO: function (oEvent) {
                var aFilters = [];
                var sQuery = oEvent.getSource()._sSearchFieldValue;
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter("PO_Number", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter(aFilters);
            },
            _handleValueHelpConfirmPO: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    console.log(oSelectedItem)
                    var productInput = this.getView().byId("iInputPo");
                    productInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            },
            _handleValueHelpConfirmMPL:function(oEvent){
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID=this.getView().getModel("modelAssignEmail").getData().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail={
                    "LogisticsMPL_AssignEmail_Id":oSelectedEmail
                }
                        var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                       
                        var sRequestUrl = sServiceUrl + sEntitySet + "/" + LRF_Master_ID;
                        // Perform the PATCH request
                        jQuery.ajax({
                            url: sRequestUrl,
                            method: "PATCH", // Set the method explicitly to PATCH
                            headers: {
                                "Content-Type": "application/json",
                                "DataServiceVersion": "2.0",
                                "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                            },
                            data: JSON.stringify(dataMail),
                            success: function () {
                                console.log("PATCH request successful");
                            },
                            error: function (oError) {
                                console.error("PATCH request failed: " + oError.responseText);
                                alert(oError.responseText);
                            }
                        });

            },
            _handleValueHelpConfirmFF:function(oEvent){
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID=this.getView().getModel("modelAssignEmail").getData().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail={
                    "FF_AssignEmail_Id":oSelectedEmail
                }
                        var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                       
                        var sRequestUrl = sServiceUrl + sEntitySet + "/" + LRF_Master_ID;
                        // Perform the PATCH request
                        jQuery.ajax({
                            url: sRequestUrl,
                            method: "PATCH", // Set the method explicitly to PATCH
                            headers: {
                                "Content-Type": "application/json",
                                "DataServiceVersion": "2.0",
                                "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                            },
                            data: JSON.stringify(dataMail),
                            success: function () {
                                console.log("PATCH request successful");
                            },
                            error: function (oError) {
                                console.error("PATCH request failed: " + oError.responseText);
                                alert(oError.responseText);
                            }
                        });

            },
            _handleValueHelpConfirmCHA:function(oEvent){
                var oSelectedEmail = oEvent.getParameter("selectedItem").getTitle();
                var LRF_Master_ID=this.getView().getModel("modelAssignEmail").getData().LRF_Master_ID;
                var sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var dataMail={
                    "CHA_AssignEmail_Id":oSelectedEmail
                }
                        var sEntitySet = "/per_Adani_Logistics_LRF_Master";
                       
                        var sRequestUrl = sServiceUrl + sEntitySet + "/" + LRF_Master_ID;
                        // Perform the PATCH request
                        jQuery.ajax({
                            url: sRequestUrl,
                            method: "PATCH", // Set the method explicitly to PATCH
                            headers: {
                                "Content-Type": "application/json",
                                "DataServiceVersion": "2.0",
                                "X-CSRF-Token": "Fetch"  // You may need to handle CSRF token if required by your backend
                            },
                            data: JSON.stringify(dataMail),
                            success: function () {
                                console.log("PATCH request successful");
                            },
                            error: function (oError) {
                                console.error("PATCH request failed: " + oError.responseText);
                                alert(oError.responseText);
                            }
                        });

            },
            onSearch: function () {
                var oTable = this.getView().byId("abc");
                var oBinding = oTable.getBinding("items");
            
                var sValueField1 = this.getView().byId("iInputInitiator").getValue();
                var sValueField2 = this.getView().byId("iInputLrf").getValue();
                var sValueField3 = this.getView().byId("iInputProject").getValue();
                var sValueField4 = this.getView().byId("iInputPo").getValue();
            
                // Initialize an empty array for filters
                var aFilters = [];
            
                // Conditionally add filters based on non-empty values
                if (sValueField1 !== "") {
                    aFilters.push(new sap.ui.model.Filter("Initiator_Name", sap.ui.model.FilterOperator.EQ, sValueField1));
                }
            
                if (sValueField2 !== "") {
                    aFilters.push(new sap.ui.model.Filter("Lrf_No", sap.ui.model.FilterOperator.EQ, sValueField2));
                }
            
                if (sValueField3 !== "") {
                    aFilters.push(new sap.ui.model.Filter("Project_ID", sap.ui.model.FilterOperator.EQ, sValueField3));
                }
            
                if (sValueField4 !== "") {
                    aFilters.push(new sap.ui.model.Filter("PO_Number", sap.ui.model.FilterOperator.EQ, sValueField4));
                }
            
                // Combine filters with AND condition
                var oCombinedFilter = new sap.ui.model.Filter({
                    filters: aFilters,
                    and: true
                });
            
                // Apply the filter to the binding
                oBinding.filter(oCombinedFilter);
            },
            onClearFilterBar:function(){
                this.getView().byId("iInputInitiator").setValue();
                this.getView().byId("iInputLrf").setValue();
                this.getView().byId("iInputProject").getValue();
                this.getView().byId("iInputPo").getValue();
                this.onSearch();
            },
            onSelectRadio:function(oEvent){
                
                var oSelectedItem = oEvent.getParameter("listItem");

                // Get the binding context of the selected row
                var oBindingContext = oSelectedItem.getBindingContext("modelTrk");
                var sPath = oBindingContext.getPath();

                // Get the model and retrieve all details using the path
                var oModel = this.getView().getModel("modelTrk");
                var oSelectedData = oModel.getProperty(sPath);
                if(!oSelectedData.Lrf_No.includes("Temp")){
                    this.getView().byId("iBtnCHA").setEnabled(true);
                    this.getView().byId("iBtnFF").setEnabled(true);
                    this.getView().byId("iBtnMPL").setEnabled(true);
                }
                var oModel = new sap.ui.model.json.JSONModel(oSelectedData);

                        
                 this.getView().setModel(oModel, "modelAssignEmail");
            }
            
        });
    });
