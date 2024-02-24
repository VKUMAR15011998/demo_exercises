sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
"use strict";

return Controller.extend("lrftracker.controller.DeliveryDetails", {

    onInit : function () {
        this.getOwnerComponent().getModel("objectModel")
    },
    
});

});