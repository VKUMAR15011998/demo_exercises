sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'hc450.offsupplies.hcoffsuppliesui',
            componentId: 'Products_textsObjectPage',
            contextPath: '/Products/texts'
        },
        CustomPageDefinitions
    );
});