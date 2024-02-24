sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/m/Token',
    "sap/m/MessageToast",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Token, MessageToast, library, Spreadsheet, Sorter, Filter, FilterOperator) {
        "use strict";
        // var EdmType = library.EdmType;
        // var uploadFile = "";
        // var uploadEvent = "";
        // var oSelectedItem;

        return Controller.extend("projectlnc.controller.Part_2", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("ImportLRF").attachPatternMatched(this._onObjectMatched, this);


                // var oModel = new JSONModel({
                //     dDefaultDate: new Date()
                // });
                // this.getView().setModel(oModel, "req_date");

                // var oModel = new JSONModel({
                //     addr: "Gujarat,India"
                // });
                // this.getView().setModel(oModel, "address");

                var oModel = new JSONModel({
                    "po_nos": [{
                        "Key": "123",
                        "Name": "123"
                    },
                    {
                        "Key": "456",
                        "Name": "456"
                    }, {
                        "Key": "789",
                        "Name": "789"
                    }]
                });

                this.getView().setModel(oModel, "po_list");


                var oModel = new JSONModel();
                oModel.loadData("model/mob_country_code.json");
                oModel.setSizeLimit(300)
                this.getView().setModel(oModel, "mo_list");

                var oModel = new JSONModel();
                oModel.loadData("model/vhicle.json");
                this.getView().setModel(oModel, "vh_list");

                var oModel = new JSONModel();
                oModel.loadData("model/package_type.json");
                this.getView().setModel(oModel, "pt_list");

                // this.getView().byId("pack_photo_type").setFilterFunction(function (sTerm, oItem) {
                //     return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
                // });

                var oModel = new JSONModel();
                oModel.loadData("model/inco.json");
                this.getView().setModel(oModel, "inco_list");


            },
            onAfterRendering: function () {
                const aFilter = [];
                var id = this.getView().getModel("lrf").oData.ID;
                console.log(id)
                id = id.replace(/([0-z]{8})([0-z]{4})([0-z]{4})([0-z]{4})([0-z]{12})/, "$1-$2-$3-$4-$5");
                aFilter.push(new Filter('Adani_Logistics_LRF_Master_LRF_Master_ID', FilterOperator.EQ, id));
                const oList = this.byId("ref_pack_photo");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },
            _onObjectMatched: function (oEvent) {
                //     var oModel = new JSONModel({
                //         "items": [
                //             {
                //                 "fileName": "Business Plan Agenda.xlsx",
                //                 "mediaType": "application/msword",
                //                 "uploadState": "Complete",
                //                 "visibleEdit": false

                //             },
                //             {
                //                 "fileName": "Picture of a woman.xlsx",
                //                 "mediaType": "image/png",
                //                 "uploadState": "Complete",
                //                 "visibleEdit": false

                //             }
                //         ]
                //     });
                //     this.getView().setModel(oModel, "file");
                //     if (data.containers == "Containerised") {
                //         this.getView().byId("shipment_type").setSelectedIndex(0);
                //         this.getView().byId("type").setVisible(true);
                //         this.getView().byId("t20").setVisible(true);
                //         this.getView().byId("t40").setVisible(true);
                //         this.getView().byId("open_top").setVisible(true);
                //         this.getView().byId("high_cube").setVisible(true);
                //         this.getView().byId("flat_rack").setVisible(true);
                //         this.getView().byId("general").setVisible(true);
                //         this.getView().byId("h20").setVisible(true);
                //         this.getView().byId("h40").setVisible(true);
                //         this.getView().byId("f20").setVisible(true);
                //         this.getView().byId("f40").setVisible(true);
                //         this.getView().byId("g20").setVisible(true);
                //         this.getView().byId("g40").setVisible(true);
                //         this.getView().byId("o20").setVisible(true);
                //         this.getView().byId("o40").setVisible(true);
                //     }
                //     else {
                //         this.getView().byId("shipment_type").setSelectedIndex(1);
                //     }
                // }
                // var oModel = new JSONModel(data);
                // this.getView().setModel(oModel, "lrf_part_2");
            },
            validate_date: function (oEvent) {
                if (this.getView().byId("ready_date").getDateValue() == null) {
                    this.getView().byId("ready_date").setValueState("Error");
                }
                else {
                    this.getView().byId("ready_date").setValueState("None");
                }
            },
            validate_country: function (oEvent) {
                if (this.getView().byId("country").getSelectedKey() == "") {
                    this.getView().byId("country").setValueState("Error");
                }
                else {
                    this.getView().byId("country").setValueState("None");
                }
            },
            validate_pack_type: function (oEvent) {
                if (this.getView().byId("pack_type").getSelectedKeys().length == 0) {
                    this.getView().byId("pack_type").setValueState("Error");
                }
                else {
                    this.getView().byId("pack_type").setValueState("None");
                }
            },
            validate_inco: function (oEvent) {
                if (this.getView().byId("inco_terms").getSelectedKey() == "") {
                    this.getView().byId("inco_terms").setValueState("Error");
                }
                else {
                    this.getView().byId("inco_terms").setValueState("None");
                }
            },
            validate_load_port: function (oEvent) {
                if (this.getView().byId("load_port").getSelectedKey() == "") {
                    this.getView().byId("load_port").setValueState("Error");
                }
                else {
                    this.getView().byId("load_port").setValueState("None");
                }
            },
            validate_discharge_port: function (oEvent) {
                if (this.getView().byId("discharge_port_name").getSelectedKey() == "") {
                    this.getView().byId("discharge_port_name").setValueState("Error");
                }
                else {
                    this.getView().byId("discharge_port_name").setValueState("None");
                }
            },
            validate_vh: function (oEvent) {
                if (this.getView().byId("vhicle_type").getSelectedKeys().length == 0) {
                    this.getView().byId("vhicle_type").setValueState("Error");
                }
                else {
                    this.getView().byId("vhicle_type").setValueState("None");
                }
            },
            validate_address: function () {
                if (this.getView().byId("origin_address").getSelectedButton().getText() == "No" && this.getView().byId("org_new_add").getValue() == "") {
                    this.getView().byId("org_new_add").setValueState("Error");
                }
                else {
                    this.getView().byId("org_new_add").setValueState("None");
                }
            },
            validate_new_cpname: function () {
                if (this.getView().byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("new_cpname").getValue() == "") {
                    this.getView().byId("new_cpname").setValueState("Error");
                }
                else {
                    this.getView().byId("new_cpname").setValueState("None");
                }
            },
            validate_new_c_country_code: function () {
                if (this.getView().byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("new_c_country_code").getSelectedKey() == "") {
                    this.getView().byId("new_c_country_code").setValueState("Error");
                }
                else {
                    this.getView().byId("new_c_country_code").setValueState("None");
                }
            },
            validate_new_c_mobile_no: function () {
                if (this.getView().byId("contact_person").getSelectedButton().getText() == "No" && this.getView().byId("new_c_mobile_no").getValue().length < 7) {
                    this.getView().byId("new_c_mobile_no").setValueState("Error");
                }
                else {
                    this.getView().byId("new_c_mobile_no").setValueState("None");
                }
            },
            validate_new_cpemail: function () {
                if (this.getView().byId("contact_person").getSelectedButton().getText() == "No" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.getView().byId("new_cpemail").getValue()))) {
                    this.getView().byId("new_cpemail").setValueState("Error");
                }
                else {
                    this.getView().byId("new_cpemail").setValueState("None");
                }
            },
            // validate_containers :function(){
            //     if(this.getView().byId("shipment_type").getSelectedButton().getText()=="Containerised") 
            //     {
            //             this.getView().byId("new_cpemail").setValueState("Error");
            //         }
            //         else{
            //             this.getView().byId("new_cpemail").setValueState("None");
            //         }
            // },





            onSelectAdd: function (e) {
                var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
                this.getView().getModel("lrf").oData["address"] = text;
                if (text == "No") {
                    // this.getView().byId("org_add").setValue("");
                    // this.getView().byId("org_add").setEnabled(true);
                    this.getView().byId("org_add").setVisible(false);
                    this.getView().byId("org_new_add").setVisible(true);

                }
                else {
                    // this.getView().byId("org_add").setValue(this.getView().getModel("lrf_part_2").oData.org_add);
                    // this.getView().byId("org_add").setEnabled(false);
                    this.getView().byId("org_add").setVisible(true);
                    this.getView().byId("org_new_add").setVisible(false);
                }
            },
            radio_check_container: function (e) {
                var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
                this.getView().getModel("lrf").oData["containers"] = text;
                if (text == "Containerised") {
                    this.getView().byId("type").setVisible(true);
                    this.getView().byId("t20").setVisible(true);
                    this.getView().byId("t40").setVisible(true);
                    this.getView().byId("open_top").setVisible(true);
                    this.getView().byId("high_cube").setVisible(true);
                    this.getView().byId("flat_rack").setVisible(true);
                    this.getView().byId("general").setVisible(true);
                    this.getView().byId("h20").setVisible(true);
                    this.getView().byId("h40").setVisible(true);
                    this.getView().byId("f20").setVisible(true);
                    this.getView().byId("f40").setVisible(true);
                    this.getView().byId("g20").setVisible(true);
                    this.getView().byId("g40").setVisible(true);
                    this.getView().byId("o20").setVisible(true);
                    this.getView().byId("o40").setVisible(true);

                }
                else {
                    this.getView().byId("type").setVisible(false);
                    this.getView().byId("t20").setVisible(false);
                    this.getView().byId("t40").setVisible(false);
                    this.getView().byId("open_top").setVisible(false);
                    this.getView().byId("high_cube").setVisible(false);
                    this.getView().byId("flat_rack").setVisible(false);
                    this.getView().byId("general").setVisible(false);
                    this.getView().byId("h20").setVisible(false);
                    this.getView().byId("h40").setVisible(false);
                    this.getView().byId("f20").setVisible(false);
                    this.getView().byId("f40").setVisible(false);
                    this.getView().byId("g20").setVisible(false);
                    this.getView().byId("g40").setVisible(false);
                    this.getView().byId("o20").setVisible(false);
                    this.getView().byId("o40").setVisible(false);
                }
            },
            closeDialog: function () {
                this.byId("openDialog").close();
            },

            // afterItemAdded: function (oEvent) {
            //     const item = oEvent.getParameters().item;
            //     item.setVisibleEdit(false);
            //     item.attachOpenPressed(function (oEvent) {
            //         oEvent.preventDefault();
            //         var fname = oEvent.getParameter("item").getFileName();
            //         var base64 = oEvent.getParameter("item").getProperty("url");
            //         const linkSource = base64;
            //         const downloadLink = document.createElement("a");
            //         const fileName = fname;
            //         downloadLink.href = linkSource;
            //         downloadLink.download = fileName;
            //         downloadLink.click();
            //     });
            // },
            onSelectAddCP: function (e) {
                var text = e.getSource().getButtons()[e.getParameter("selectedIndex")].getText();
                this.getView().getModel("lrf").oData["contact"] = text;
                if (text == "No") {
                    // this.getView().byId("cpname").setValue("");
                    // this.getView().byId("cpname").setEnabled(true);
                    // this.getView().byId("c_mobile_no").setValue("");
                    // this.getView().byId("c_mobile_no").setEnabled(true);
                    // this.getView().byId("c_country_code").setSelectedKey("");
                    // this.getView().byId("c_country_code").setEnabled(true);
                    // this.getView().byId("cpemail").setValue("");
                    // this.getView().byId("cpemail").setEnabled(true);
                    this.getView().byId("cpname").setVisible(false);
                    this.getView().byId("new_cpname").setVisible(true);
                    this.getView().byId("c_mobile_no").setVisible(false);
                    this.getView().byId("new_c_mobile_no").setVisible(true);
                    this.getView().byId("c_country_code").setVisible(false);
                    this.getView().byId("new_c_country_code").setVisible(true);
                    this.getView().byId("cpemail").setVisible(false);
                    this.getView().byId("new_cpemail").setVisible(true);
                }
                else {
                    // this.getView().byId("cpname").setValue(this.getView().getModel("lrf_part_2").oData.cpname);
                    // this.getView().byId("cpname").setEnabled(false);
                    // this.getView().byId("c_mobile_no").setValue(this.getView().getModel("lrf_part_2").oData.c_mobile_no);
                    // this.getView().byId("c_mobile_no").setEnabled(false);
                    // this.getView().byId("c_country_code").setValue(this.getView().getModel("lrf_part_2").oData.c_country_code);
                    // this.getView().byId("c_country_code").setEnabled(false);
                    // this.getView().byId("cpemail").setValue(this.getView().getModel("lrf_part_2").oData.cpemail);
                    // this.getView().byId("cpemail").setEnabled(false);
                    this.getView().byId("cpname").setVisible(true);
                    this.getView().byId("new_cpname").setVisible(false);
                    this.getView().byId("c_mobile_no").setVisible(true);
                    this.getView().byId("new_c_mobile_no").setVisible(false);
                    this.getView().byId("c_country_code").setVisible(true);
                    this.getView().byId("new_c_country_code").setVisible(false);
                    this.getView().byId("cpemail").setVisible(true);
                    this.getView().byId("new_cpemail").setVisible(false);
                }
            },
            // fileUploaded: async function (e) {
            //     //debugger
            //     const toBase64 = file => new Promise((resolve, reject) => {
            //         const reader = new FileReader();
            //         reader.readAsDataURL(file);
            //         reader.onload = () => resolve(reader.result);
            //         reader.onerror = reject;
            //     });
            //     var base64 = await toBase64(e.getParameter("item").getFileObject());
            //     e.getParameter("item").setUrl(base64);
            //     e.getParameter("item").setMediaType(e.getParameter("item").getFileObject().type);
            //     console.log(base64)
            //     // this.fileDownloaded(base64,e.getParameter("item").getFileName());
            // },
            // deleteFile: function (oEvent) {
            //     console.log(oEvent.getParameter("item").getFileObject())
            // },
            // downloadIT: async function (e) {
            //     var fname = e.getParameter("items")[0].getFileName();
            //     var base64 = e.getParameter("items")[0].getProperty("url");
            //     const linkSource = base64;
            //     const downloadLink = document.createElement("a");
            //     const fileName = fname;
            //     downloadLink.href = linkSource;
            //     downloadLink.download = fileName;
            //     downloadLink.click()
            // },
            // stopDefault: function (e) {
            //     var fname = e.getParameter("item").getFileName();
            //     var base64 = e.getParameter("item").getProperty("url");
            //     const linkSource = base64;
            //     const downloadLink = document.createElement("a");
            //     const fileName = fname;
            //     downloadLink.href = linkSource;
            //     downloadLink.download = fileName;
            //     downloadLink.click();
            //     e.preventDefault();
            // }
            onAfterItemAdded: function (oEvent) {


                var item = oEvent.getParameter("item")
                this._createEntity(item)
                    .then((id) => {
                        this._uploadContent(item, id);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            },

            onUploadCompleted: function (oEvent) {
                var oUploadSet = this.byId("ref_pack_photo");
                oUploadSet.removeAllIncompleteItems();
                oUploadSet.getBinding("items").refresh();
            },
            _createEntity: function (item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName()
                };
                var serviceurl = this.getOwnerComponent().getModel().sServiceUrl;
                var id = this.getView().getModel('lrf').oData.ID
                var settings = {
                    url: "/odata/v4/logistics-/Get_Adani_Logistics_LRF_Master(" + id + ")/To_PackingDoc",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.PackingID);
                        })
                        .fail((err) => {
                            reject(err);
                            console.log("rrr")
                        })
                })
            },

            _uploadContent: function (item, id) {
                var lid = this.getView().getModel('lrf').oData.ID
                var url = `/odata/v4/logistics-/Get_Adani_Logistics_LRF_Master(` + lid + `)/To_PackingDoc(${id})/content`
                item.setUploadUrl(url);
                var oUploadSet = this.byId("ref_pack_photo");
                oUploadSet.setHttpRequestMethod("PUT")
                oUploadSet.uploadItem(item);
            },
            onOpenPressed: function (oEvent) {
                oEvent.preventDefault();
                var item = oEvent.getSource();
                this._fileName = item.getFileName();
                this._download(item)
                    .then((blob) => {
                        var url = window.URL.createObjectURL(blob);
                        // //open in the browser
                        // window.open(url);

                        //download
                        var link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', this._fileName);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },


            _download: function (item) {
                var settings = {
                    url: item.getUrl(),
                    method: "GET",
                    xhrFields: {
                        responseType: "blob"
                    }
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((result, textStatus, request) => {
                            resolve(result);
                        })
                        .fail((err) => {
                            reject(err);
                        })
                });
            },

            onRemovePressed: function (oEvent) {
                oEvent.preventDefault();
                var item = oEvent.getSource();
                var id = item.getUrl().split('(')[1].split(')')[0];
                var oUploadSet = this.byId("ref_pack_photo");
                oUploadSet.setHttpRequestMethod("PUT")
                oUploadSet.removeItem(item);
                var settings = {
                    url: "/odata/v4/logistics-/Adani_Logistics_Packing_Doc/"+id,
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                }
                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            resolve(results.PackingID);
                        })
                        .fail((err) => {
                            reject(err);
                        })
                })
            }
        });
    });