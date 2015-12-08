﻿/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.6.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2015 gijgo.com
 * Released under the MIT license
 */
/** 
  * @widget Grid 
  * @plugin Base
  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.grid) === 'undefined') {
    gj.grid = {
        plugins: {}
    };
}

gj.grid.config = {

    /** The data source of the widget which is used table rows.<br />
     * @additionalinfo If set to string, then the grid is going to use this string as a url for ajax requests to the server.<br />
     * If set to object, then the grid is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
     * If set to array, then the grid is going to use the array as data for rows.
     * @type (string|object|array)
     * @default undefined
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $('#grid').grid({
     *         dataSource: 'Players.txt',
     *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     * @example <!-- grid.base -->
     * <table id="grid" data-source="Players.txt">
     *     <thead>
     *         <tr>
     *             <th width="20">ID</th>
     *             <th>Name</th>
     *             <th>PlaceOfBirth</th>
     *         </tr>
     *     </thead>
     * </table>
     * <script>
     *     $("#grid").grid();
     * </script>
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc = function (response) { 
     *         alert("The result contains " + response.records.length + " records.");
     *         grid.render(response);
     *     };
     *     grid = $('#grid').grid({
     *         dataSource: { url: 'Players.txt', data: {}, success: onSuccessFunc },
     *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     var data = [
     *         { "ID": 1, "Name": "Hristo Stoichkov", "PlaceOfBirth": "Plovdiv, Bulgaria" },
     *         { "ID": 2, "Name": "Ronaldo Luis Nazario de Lima", "PlaceOfBirth": "Rio de Janeiro, Brazil" },
     *         { "ID": 3, "Name": "David Platt", "PlaceOfBirth": "Chadderton, Lancashire, England" }
     *     ];
     *     $('#grid').grid({
     *         dataSource: data,
     *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     */
    dataSource: undefined,

    /** An array that holds the configurations of each column from the grid.
     * @type array
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $('#grid').grid({
     *         dataSource: 'Players.txt',
     *         columns: [ { field: 'ID', width: 30 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
     *     });
     * </script>
     */
    columns: [],

    /** Auto generate column for each field in the datasource when set to true.
     * @type array
     * @example <!-- grid.base --> 
     * <table id="grid"></table>
     * <script>
     *     $('#grid').grid({
     *         dataSource: 'Players.txt',
     *         autoGenerateColumns: true
     *     });
     * </script>
     */
    autoGenerateColumns: false,

    /** An object that holds the default configuration settings of each column from the grid.
     * @type object
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         defaultColumnSettings: { align: 'right' },
     *         columns: [ { field: "ID", width: 30 }, { field: "Name" }, { field: "PlaceOfBirth", name: "Birth Place" } ]
     *     });
     * </script>
     */
    defaultColumnSettings: {

        /** If set to true the column will not be displayed in the grid. By default all columns are displayed.
         * @alias column.hidden
         * @type boolean
         * @default false
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID", width: 30 }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
         *     });
         * </script>
         */
        hidden: false,

        /** The width of the column. Numeric values are treated as pixels.
         * If the width is undefined the width of the column is not set and depends on the with of the table(grid).
         * @alias column.width
         * @type int|string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", width: 20 },
         *             { field: "Name", width: 120 },
         *             { field: "PlaceOfBirth" }
         *         ]
         *     });
         * </script>
         */
        width: undefined,

        /** Indicates if the column is sortable.
         * If set to true the user can click the column header and sort the grid by the column source field.
         * @alias column.sortable
         * @type boolean
         * @default false
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name", sortable: true },
         *             { field: "PlaceOfBirth", sortable: false },
         *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
         *         ]
         *     });
         * </script>
         */
        sortable: false,

        /** Indicates the type of the column.
         * @alias column.type
         * @type checkbox|icon|date
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", width: 24 },
         *             { field: "Name", title: "Player" },
         *             { field: "PlaceOfBirth", title: "Place of Birth" },
         *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
         *         ]
         *     });
         * </script>
         */
        type: undefined,

        /** The caption that is going to be displayed in the header of the grid.
         * @alias column.title
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name", title: "Player" },
         *             { field: "PlaceOfBirth", title: "Place of Birth" },
         *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
         *         ]
         *     });
         * </script>
         */
        title: undefined,

        /** The field name to which the column is bound.
         * If the column.title is not defined this value is used as column.title.
         * @alias column.field
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name" },
         *             { field: "PlaceOfBirth", title: "Place of Birth" },
         *             { field: "DateOfBirth", type: "date" }
         *         ]
         *     });
         * </script>
         */
        field: undefined,

        /** This setting control the alignment of the text in the cell.
         * @alias column.align
         * @type left|right|center|justify|initial|inherit
         * @default "left"
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", align: "center" },
         *             { field: "Name", align: "right" },
         *             { field: "PlaceOfBirth", align: "left" }
         *         ]
         *     });
         * </script>
         */
        align: "left",

        /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.
         * @alias column.cssClass
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <style>
         * .nowrap { white-space: nowrap }
         * .bold { font-weight: bold }
         * </style>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", width: 20 },
         *             { field: "Name", width: 100, cssClass: "nowrap bold" },
         *             { field: "PlaceOfBirth" }
         *         ]
         *     });
         * </script>
         */
        cssClass: undefined,

        /** The name(s) of css class(es) that are going to be applied to the header cell of that column.
         * @alias column.headerCssClass
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <style>
         * .italic { font-style: italic }
         * </style>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", width: 20 },
         *             { field: "Name", width: 100, headerCssClass: "italic" },
         *             { field: "PlaceOfBirth" }
         *         ]
         *     });
         * </script>
         */
        headerCssClass: undefined,

        /** The text for the cell tooltip.
         * @alias column.tooltip
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID", tooltip: "This is my tooltip 1." },
         *             { field: "Name", tooltip: "This is my tooltip 2." },
         *             { field: "PlaceOfBirth", tooltip: "This is my tooltip 3." }
         *         ]
         *     });
         * </script>
         */
        tooltip: undefined,

        /** Css class for icon that is going to be in use for the cell.
         * This setting can be in use only with combination of type icon.
         * @alias column.icon
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name" },
         *             { field: "PlaceOfBirth" },
         *             { title: "", field: "Edit", width: 20, type: "icon", icon: "ui-icon-pencil", events: { "click": function (e) { alert("name=" + e.data.record.Name); } } }
         *         ]
         *     });
         * </script>
         */
        icon: undefined,

        /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
         * Each function is going to receive event information as a parameter with info in the "data" field for id, field name and record data.
         * @alias column.events
         * @type function
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { 
         *               field: "Name", 
         *               events: {
         *                 "mouseenter": function (e) {
         *                     e.stopPropagation();
         *                     $(e.currentTarget).css("background-color", "red");
         *                 },
         *                 "mouseleave": function (e) {
         *                     e.stopPropagation();
         *                     $(e.currentTarget).css("background-color", ""); 
         *                 }
         *               }
         *             },
         *             { field: "PlaceOfBirth" },
         *             { 
         *               title: "", field: "Info", width: 20, type: "icon", icon: "ui-icon-info", 
         *               events: { 
         *                 "click": function (e) { 
         *                     alert("record with id=" + e.data.id + " is clicked."); } 
         *                 }
         *             }
         *         ]
         *     });
         * </script>
         * @example <table id="grid" data-source="/Grid/GetPlayers">
         *     <thead>
         *         <tr>
         *             <th data-field="ID" width="24">ID</th>
         *             <th data-events="mouseenter: onMouseEnter, mouseleave: onMouseLeave">Name</th>
         *             <th data-field="PlaceOfBirth">Place Of Birth</th>
         *             <th data-events="click: onClick" data-type="icon" data-icon="ui-icon-info" width="24"></th>
         *         </tr>
         *     </thead>
         * </table>
         * <script>
         *     function onMouseEnter (e) {
         *         e.stopPropagation();
         *         $(e.currentTarget).css("background-color", "red");
         *     }
         *     function onMouseLeave (e) {
         *         e.stopPropagation();
         *         $(e.currentTarget).css("background-color", ""); 
         *     }
         *     function onClick(e) {
         *         alert("record with id=" + e.data.id + " is clicked.");
         *     }
         *     $("#grid").grid();
         * </script>
         */
        events: undefined,

        /** Format the date when the type of the column is date. 
         * This configuration setting is going to work only if you have implementation of format method for the Date object.
         * You can use external libraries like http://blog.stevenlevithan.com/archives/date-time-format for that.
         * @alias column.format
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script src="http://stevenlevithan.com/assets/misc/date.format.js"></script>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name" },
         *             { field: "DateOfBirth", type: 'date', format: 'HH:MM:ss mm/dd/yyyy' }
         *         ]
         *     });
         * </script>
         */
        format: undefined,

        /** Number of decimal digits after the decimal point.
         * @alias column.decimalDigits
         * @type int
         * @default undefined
         */
        decimalDigits: undefined,

        /** Template for the content in the column.
         * Use curly brackets "{}" to wrap the names of data source columns from server response.
         * @alias column.tmpl
         * @type string
         * @default undefined
         * @example <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [
         *             { field: "ID" },
         *             { field: "Name" },
         *             { title: "Info", tmpl: "{Name} is born in {PlaceOfBirth}." }
         *         ]
         *     });
         * </script>
         */
        tmpl: undefined
    },

    mapping: {
        /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.
         * @alias mapping.dataField
         * @type string
         * @default "records"
         */
        dataField: "records",

        /** The name of the object in the server response, that contains the number of all records on the server.
         * @alias mapping.totalRecordsField
         * @type string
         * @default "total"
         */
        totalRecordsField: "total"
    },

    params: {},

    defaultParams: {

        /** The name of the parameter that is going to send the name of the column for sorting.
         * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
         * @alias defaultParams.sortBy
         * @type string
         * @default "sortBy"
         */
        sortBy: "sortBy",

        /** The name of the parameter that is going to send the direction for sorting.
         * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
         * @alias defaultParams.direction
         * @type string
         * @default "direction"
         */
        direction: "direction",

        /** The name of the parameter that is going to send the number of the page.
         * The pager should be enabled in order this parameter to be in use.
         * @alias defaultParams.page
         * @type string
         * @default "page"
         */
        page: "page",

        /** The name of the parameter that is going to send the maximum number of records per page.
         * The pager should be enabled in order this parameter to be in use.
         * @alias defaultParams.limit
         * @type string
         * @default "limit"
         */
        limit: "limit"
    },

    /** The name of the UI library that is going to be in use. Currently we support only jQuery UI and bootstrap.
     * @additionalinfo The css files for jQuery UI or Bootstrap should be manually included to the page where the grid is in use.
     * @type (jqueryui|bootstrap)
     * @default "jqueryui"
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
     * <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
     * <script>
     *     $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         uiLibrary: "bootstrap",
     *         columns: [
     *             { field: "ID" },
     *             { field: "Name" },
     *             { field: "PlaceOfBirth" }
     *         ],
     *         pager: { enable: true, limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    uiLibrary: "jqueryui",

    style: {
        wrapper: "gj-grid-wrapper",
        table: "gj-grid-table ui-widget-content gj-grid-ui-table",
        loadingCover: "gj-grid-loading-cover",
        loadingText: "gj-grid-loading-text",
        header: {
            cell: "ui-widget-header ui-state-default gj-grid-ui-thead-th",
            sortable: "gj-grid-thead-sortable",
            sortAscIcon: "gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-s",
            sortDescIcon: "gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-n"
        },
        content: {
            rowHover: "ui-state-hover",
            rowSelected: "ui-state-active"
        },
        pager: {
            cell: "ui-widget-header ui-state-default ui-grid-pager-cell",
            stateDisabled: "ui-state-disabled"
        },
        //TODO: move to expand/collapse plugin
        expandIcon: "ui-icon ui-icon-plus",
        collapseIcon: "ui-icon ui-icon-minus"
    },

    /** The type of the row selection.<br/>
     * If the type is set to multiple the user will be able to select more then one row from the grid.
     * @type (single|multiple)
     * @default "single"
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         selectionType: "multiple",
     *         selectionMethod: "checkbox",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    selectionType: 'single',

    /** The type of the row selection mechanism.<br/>
     * @additionalinfo If this setting is set to "basic" when the user select a row, then this row will be highlighted.<br/>
     * If this setting is set to "checkbox" a column with checkboxes will appear as first row of the grid and when the user select a row, then this row will be highlighted and the checkbox selected.
     * @type (basic|checkbox)
     * @default "basic"
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         selectionType: "single",
     *         selectionMethod: "checkbox",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    selectionMethod: 'basic',

    /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.
     * @type boolean
     * @default true
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({ 
     *         dataSource: "/Grid/GetPlayers", 
     *         autoLoad: false,
     *         columns: [ { field: "ID" }, { field: "Name" } ]
     *     });
     *     grid.reload(); //call .reload() explicitly in order to load the data in the grid
     * </script>
     * @example <table id="grid"></table>
     * <script>
     *     $("#grid").grid({ 
     *         dataSource: "/Grid/GetPlayers",
     *         autoLoad: true,
     *         columns: [ { field: "ID" }, { field: "Name" } ]
     *     });
     * </script>
     */
    autoLoad: true,

    /** The text that is going to be displayed if the grid is empty.
     * @type string
     * @default "No records found."
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $("#grid").grid({
     *         dataSource: { url: "/Grid/GetPlayers", data: { searchString: "sadasd" } },
     *         notFoundText: "No records found custom message",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    notFoundText: "No records found.",

    /** Width of the grid.
     * @type int
     * @default undefined
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         width: 400,
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    width: undefined,

    /** Minimum width of the grid.
     * @type int
     * @default undefined
     */
    minWidth: undefined,

    /** The size of the font in the grid.
     * @type string
     * @default undefined
     * @example <!-- grid.base -->
     * <table id="grid"></table>
     * <script>
     *     $('#grid').grid({
     *         dataSource: '/Grid/GetPlayers',
     *         fontSize: '14px',
     *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     */
    fontSize: undefined,

    dataKey: undefined
};