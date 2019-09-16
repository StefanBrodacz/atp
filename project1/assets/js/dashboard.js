require('chart.js');
require('chartjs-plugin-zoom');
require('./graph/ftp.js');
let chartTune = document.getElementById('chartJSContainer');
global.ctx = chartTune.getContext('2d');

require('./graph/graph-styling.js');
require('./graph/dashboard_graph.js');
require('./graph/d3.js');
require('datatables.net-bs4');
require('datatables.net-editor-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-colreorder-bs4');
require('datatables.net-fixedcolumns-bs4');
require('datatables.net-fixedheader-bs4');
require('datatables.net-responsive-bs4');
require('datatables.net-rowreorder-bs4');
require('datatables.net-scroller-bs4');
require('datatables.net-select-bs4');
let convert = require('convert-units');
//import {convert} from './functions/speedConvert';

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};
let convertValues = {
    'distance': function (m) {
        return (m / 1000).toFixed(3) + ' km '
    },
    'duration': function (s) {
        // let date = new Date(null);
        // date.setSeconds(99999999);
        // return date.toISOString()

        let hours = Math.floor(s / 3600);
        s %= 3600;
        let minutes = Math.floor(s / 60);
        let seconds = s % 60;
        return hours.pad() + ":" + minutes.pad() + ":" + Math.round(seconds).pad()
    },
    'averageSpeed': {
        'convert': function (v, params) {

            switch (params.activityTypeId) {
                case 1:
                case 6:
                case 3:
                    return v = 16.67/v;
                    //return convert(v).from('m/s').to('km/h');
                    //return convert.speed(v).ms().to.minkm() + ' min/km';
                    break;
                case 2:
                    return convert(v).from('m/s').to('km/h');
                    //return Math.round(convert.speed(v).ms().to.kmh(), 1) + ' km/h';
                    break;
            }
            return convert.speed(v).ms().to.kmh()
        },
        'parameters': ['activityTypeId']
    },
    'averageRunCadence': function (c) {
        return c;
    }

};

$(document).ready(function () {
    let table = $('#data-table').DataTable({
        'ajax': {
            'url': '/api/',
            'dataSrc': function (json) {

                for (let i = 0, ien = json.data.length; i < ien; i++) {
                    Object.keys(json.data[i]).forEach(function (key) {
                        if (!(json.data[i][key] instanceof Object)) {
                            if (convertValues.hasOwnProperty(key)) {
                                if (typeof convertValues[key] === 'function') {
                                    json.data[i][key] = convertValues[key](json.data[i][key]);
                                }
                                if (typeof convertValues[key] === 'object') {

                                    if (convertValues[key].hasOwnProperty('parameters')) {
                                        let parameter = {};
                                        for (let n = 0, nen = convertValues[key].parameters.length; n < nen; n++) {
                                            let param = convertValues[key].parameters[n];
                                            parameter[param] = json.data[i][param];
                                        }

                                        json.data[i][key] = convertValues[key].convert(json.data[i][key], parameter);
                                    }
                                }
                            }
                        }

                    })
                }

                return json.data;
            },
        },
        //'rowsGroup': [2],
        'columns': [
            {"data": "startTimeLocal.date"},
            {"data": "activityName"},
            {"data": "activityTypeKey"},
            {"data": "distance", className: "text-right"},
            {"data": "duration", className: "text-right"},
            {"data": "averageSpeed"},
            {"data": "averageHR"},
            {"data": "averageRunCadence"},
            {"data": "strideLength"},
            {"data": "verticalOscillation"},
            {"data": "trainingEffect"},
            {"data": "vO2MaxValue"},
            {"data": "avgGroundContactBalance"},
        ],
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        let data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        },
        paging: false,
        colReorder: true,
        select: true
    });
});