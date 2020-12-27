/////////////// Seth Hendershot Mar 2016 - Nov 2020   ///////////
//    Job Time Plugin Javascript File
//    Persistence overcomes everything, even nature itself
/////////////////////////////////////////////////////////////////

var tdx_stacks = {}, x = 0;

function log(text) {
    var tsbp_debug = true; //ARE WE IN DEBUGGING MODE?
    if (tsbp_debug === true) {
        console.log(text);
        jQuery("#tsbp_console").append("<pre>" + text + "</pre>");
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function console_min(tabID) {
    if (tabID !== undefined) {
        jQuery("#tdx_page_console" + tabID).css("height", "50px");
        jQuery("#tdx_page_console" + tabID + " pre").css("height", "50px");
        jQuery("#tdx_page_console_mm" + tabID).html("<a href='javascript:console_max(\"" + tabID + "\")'><i class='fa fa-window-maximize'></i><BR>MAX</a>");
    }
}

function console_max(tabID) {
    if (tabID !== undefined) {
        jQuery("#tdx_page_console" + tabID).css("height", "auto");
        jQuery("#tdx_page_console" + tabID + " pre").css("height", "auto");
        jQuery("#tdx_page_console_mm" + tabID).html("<a href='javascript:console_min(\"" + tabID + "\")'><i class='fa fa-window-minimize'></i><BR>MIN</a>");
    }

}

_pkey = {
    _settings_allowed: [
        "screen_target",
        "sort_by",
        "display_type",
        "mass_actions",
        "main_header",
        "main_header_class",
        "main_header_style",
        "allow_select_reorder",
        "allow_drag_reorder",
        "allow_edit",
        "allow_delete",
        "allow_new",
        "allow_edit_history",
        "groups",
        "header_columns",
        "content_columns",
        "record_buttons",
        "column_hooks",
        "column_type",
        "icon_slug"
    ],
    _validators: {
        _tab_columns: [
            "tabID",
            "tab_alias",
            "tab_slug",
            "tab_type",
            "tab_icon",
            "tab_subtabs",
            "tab_auths",
            "description"
        ],
        _subtab_columns: [
            "subtabID",
            "tabID",
            "subtab_type",
            "subtab_title",
            "subtab_icon",
            "subtab_filter",
            "subtab_tableID",
            "subtab_auths"
        ],
        _table_columns: [
            "tableID",
            "table_slug",
            "table_alias",
            "table_icon",
            "created_timestamp",
            "authorID",
            "sub_tabs_object",
            "settings_object"
        ],
        _settings_object_columns : [
            "column_slug",
            "column_alias",
            "column_type",
            "data_type",
            "length",
            "allow_null",
            "auto_increment",
            "is_primary_key",
            "is_foreign_key"
        ]
    },
    _get_timestamp: function () {
        var dd = new Date();
        var stamp = dd.getTime();
        var le = 0;
        stamp = String(stamp);//typecast to string
        le = stamp.length; //count the time character length
        le = le - 3;//the time character length - minus the milliseconds (3 digits)
        stamp = stamp.substr(0, le);//cut milliseconds off
        return stamp;
    },
    _elem_do: function (input) {
        /*
         Purpose:        This function creates HTML elements singularily and
         appends, prepends, or replaces the innerHTML and outerHTML
         of ID supplied for the variable "parentID"
         Created by:     Seth Hendershot
         Company:        The Small Business Platform Inc
         Start Date:     03/28/2016
         Version Number: 1.5
         Last Updated:   11/2/2020
         */
        var output = "", x, c, z;
        if (input) {
            for (c in input) {
                var s = false, pID = "", ID = "", pt = "", uu = "", itv = false, it, o, o_sel, sel, select_flag = false, tn = false, textnodetext = "", close_tag = "";
                for (x in input[c]) {
                    //ONLY SEARCH FOR TYPE RIGHT AWAY, NEED THAT FIRST
                    if (x === "type") {
                        if (input[c][x] === "div" ||
                            input[c][x] === "span" ||
                            input[c][x] === "label" ||
                            input[c][x] === "a" ||
                            input[c][x] === "img" ||
                            input[c][x] === "input" ||
                            input[c][x] === "form" ||
                            input[c][x] === "ul" ||
                            input[c][x] === "li" ||
                            input[c][x] === "textarea" ||
                            input[c][x] === "select" ||
                            input[c][x] === "option" ||
                            input[c][x] === "textnode"
                        ) {
                            //TYPE PASSES LIST FROM ABOVE
                            output += "<" + input[c][x] + "";
                            //IF ITS ONE OF THE FOLLOWING ITEMS IT WILL NEED TO HAVE A CLOSING TAG, FLAG FOR THIS
                            if (input[c][x] === "select" ||
                                input[c][x] === "ul" ||
                                input[c][x] === "li" ||
                                input[c][x] === "option" ||
                                input[c][x] === "form" ||
                                input[c][x] === "label" ||
                                input[c][x] === "div" ||
                                input[c][x] === "span" ||
                                input[c][x] === "a" ||
                                input[c][x] === "textarea"
                            ) {
                                //console.log("select flag set to true for " + input[c][x]);
                                select_flag = true;
                                close_tag = input[c][x];
                            }
                            //FLAG TEXT NODE FOR SPECIAL HANDLING
                            if (input[c][x] === "textnode") {
                                tn = true;
                            }
                        }
                    }
                }
                for (x in input[c]) {
                    if (x === "content") {
                        it = "";
                        //console.log('content object present');
                        for (z in input[c][x]) {
                            if (z === "ID") {
                                output += " id='" + input[c][x][z] + "'";
                                ID = input[c][x][z];
                            }
                            if (z === "styles") {
                                output += " style='" + input[c][x][z] + "'";
                            }
                            if (z === "class_name") {
                                output += " class='" + input[c][x][z] + "'";
                            }
                            if (z === "elem_name") {
                                output += " name='" + input[c][x][z] + "'";
                            }
                            if (z === "hrf") {
                                output += " href='" + input[c][x][z] + "'";
                            }
                            if (z === "src") {
                                output += " src='" + input[c][x][z] + "'";
                            }
                            if (z === "label_for") {
                                output += " for='" + input[c][x][z] + "'";
                            }
                            if (z === "target") {
                                output += " target='" + input[c][x][z] + "'";
                            }
                            if (z === "action") {
                                output += " action='" + input[c][x][z] + "'";
                            }
                            if (z === "method") {
                                output += " method='" + input[c][x][z] + "'";
                            }
                            if (z === "val") {
                                output += " value='" + input[c][x][z] + "'";
                            }
                            if (z === "wide") {
                                output += " width='" + input[c][x][z] + "'";
                            }
                            if (z === "onchange") {
                                output += " onchange='" + input[c][x][z] + "'";
                            }
                            if (z === "onclick") {
                                output += " onclick='" + input[c][x][z] + "'";
                            }
                            if (z === "onmousedown") {
                                output += " onmousedown='" + input[c][x][z] + "'";
                            }
                            if (z === "check" && input[c][x][z] === true) {
                                output += " checked";
                            }
                            if (z === "selected" && input[c][x][z] === true) {
                                output += " selected='selected'";
                            }
                            if (select_flag === true) {
                                itv = true;
                                if (z === "options") {
                                    //HANDLE DIFFERENTLY
                                    //close_tag = "option";
                                    //console.log('option menu listed');
                                    //SORT THROUGH THE OPTIONS

                                    sel = "";
                                    if (input[c][x][z].hasOwnProperty("sel")) {
                                        //console.log("straight path:" + input[c][x][z]["sel"]);
                                        o_sel = input[c][x][z]["sel"];
                                    }
                                    if (input[c][x][z].hasOwnProperty("val")) {

                                    }
                                    for (o in input[c][x][z]) {
                                        //console.log("roll thru option " + o);
                                        //if(o === "sel"){ o_sel = input[c][x][z][o]; }
                                        if (input[c][x][z][o].hasOwnProperty("val")) {
                                            if (o_sel === input[c][x][z][o]["val"]) {
                                                sel = " selected='selected'";
                                            } else {
                                                sel = "";
                                            }
                                            it += "<option value='" + input[c][x][z][o]["val"] + "'" + sel + ">";
                                        }
                                        if (input[c][x][z][o].hasOwnProperty("tex")) {
                                            it += input[c][x][z][o]["tex"] + "</option>";
                                        }
                                        it += "";
                                    }
                                }

                            }
                            if (z === "input_type") {
                                //FILTER OUT INPUT TYPES THAT NEED MORE LOGIC
                                if (input[c][x][z] === "hidden") {
                                    output += " type='hidden'";
                                }
                                if (input[c][x][z] === "text") {
                                    output += " type='text'";
                                }
                                if (input[c][x][z] === "password") {
                                    output += " type='password'";
                                }
                                if (input[c][x][z] === "checkbox") {
                                    output += " type='checkbox'";
                                }
                                if (input[c][x][z] === "radio") {
                                    output += " type='radio'";
                                }
                                if (input[c][x][z] === "submit") {
                                    output += " type='submit'";
                                }
                                if (input[c][x][z] === "reset") {
                                    output += " type='reset'";
                                }
                                if (input[c][x][z] === "button") {
                                    output += " type='button'";
                                }
                                if (input[c][x][z] === "img") {
                                    output += " type='image'";
                                }
                                //output += " src='"+input[c][x][z]+"'";
                            }
                            if (z === "inner_text") {
                                //HANDLE DIFFERENTLY
                                /*output += " onmousedown='" + input[c][x][z] + "'";*/
                                itv = true;
                                it = input[c][x][z];
                                if (tn === true) {
                                    textnodetext = input[c][x][z];
                                }
                            }
                            if (z === "parentClass") {
                                s = true;
                                pID = String("." + input[c][x][z]);
                            }
                            if (z === "parentID") {
                                s = true;
                                pID = String("#" + input[c][x][z]);
                            }
                            if (z === "placement_type") {
                                if (input[c][x][z] === "prepend_innerHTML") {
                                    pt = "prepend_innerHTML";
                                }
                                if (input[c][x][z] === "prepend_outerHTML") {
                                    pt = "prepend_outerHTML";
                                }
                                if (input[c][x][z] === "append_innerHTML") {
                                    pt = "append_innerHTML";
                                }
                                if (input[c][x][z] === "append_outerHTML") {
                                    pt = "append_outerHTML";
                                }
                                if (input[c][x][z] === "replace_innerHTML") {
                                    pt = "replace_innerHTML";
                                }
                                if (input[c][x][z] === "replace_outerHTML") {
                                    pt = "replace_outerHTML";
                                }
                            }
                        }
                    }
                }
                if (itv === true) {
                    //YES THERES INNERTEXT, close, reopen
                    //console.log("1:"+output);
                    //console.log("closing tag " + c + ":" + close_tag);
                    output += ">" + it + "</" + close_tag + ">";
                    it = "";
                    //console.log("2:"+output);
                } else {
                    output += "/>";
                }
                //output += "/>";

                //SPECIAL TEXT NODE HANDLER
                if (tn === true) {
                    //OVERWRITE ALL OF output TO JUST THE TEXT
                    output = textnodetext;
                }
                //alert(pID);
                uu = jQuery(pID);
                if (s === true) {
                    if (uu) {
                        if (pt === "prepend_innerHTML") {
                            uu.prepend(output);
                        }
                        if (pt === "prepend_outerHTML") {
                            uu.before(output);
                        }
                        if (pt === "append_innerHTML") {
                            //HANDLE SPECIAL, REPLACE ITEM -ID- IF IT EXISTS
                            //check if the item exists already, if it does then replace it
                            uu.append(output);
                        }
                        if (pt === "append_outerHTML") {
                            uu.after(output);
                        }
                        if (pt === "replace_innerHTML") {
                            uu.html(output);
                        }
                        if (pt === "replace_outerHTML") {
                            uu.replaceWith(output);
                        }
                        output = "";
                        it = "";
                    } else {
                        console.log("***trying to place:" + output + " but no element with ID '" + pID + "' is present");
                    }
                }
                output = ""; //RESET OUTPUT
            }
        }
        //return output;
    },
    _modal: {
        _open: function () {
            //jQuery("#myModal_mod_window").modal("show");
        },
        _close: function (o) { },
        _header_rec_select: function (o = { recordID: null }) {
            //PLACE THE RECORD SELECT MENU

            let curr_table = jQuery("#tdx_modal_sel").val();
            let runner = "<select id='tdx_record_select' onchange='javascript:_pkey._record._open._edit({\"tableID\":\"" + curr_table + "\",\"recordID\":this.value});'>";

            let recordID = (o["recordID"] !== null) ? o["recordID"] : null;
            var this_table_settings_all = _pkey._table._get_setting({ "tableID": curr_table, "settings_name": "all" });
            var header_col = this_table_settings_all["header_columns"];


            runner += "<option value='new'>New</option>";

            if (curr_table !== undefined) {
                //LOAD CURRENT RECORDS
                for (let t in _pkey._record._list) {
                    for (let tt in _pkey._record._list[t]) {

                        if (_pkey._record._list[t].hasOwnProperty("T_" + curr_table)) {

                            for (let r in _pkey._record._list[t][tt]) {
                                for (let rr in _pkey._record._list[t][tt][r]) {
                                    let insert = "";
                                    //let sel = "";
                                    let recID = _pkey._record._list[t][tt][r][rr]["_recordID"];
                                    let sel = (_pkey._record._list[t][tt][r][rr]["_recordID"] == recordID) ? " selected='selected' " : "";
                                    for (var i in header_col) {
                                        insert += _pkey._record._list[t][tt][r][rr][header_col[i]["column_slug"]] + " ";
                                        //insert += header_col[i]["column_slug"] + " "
                                    }

                                    //runner += JSON.stringify(_pkey._record._list[t][tt][r][rr]) + " ";
                                    runner += "<option value='" + recID + "'" + sel + ">" + recID + ": " + insert + "</option>";
                                }
                            }
                        }
                    }
                }
            }

            runner += "</select>";

            jQuery("#tdx_modal_recsel").html(runner);

        },
        _buttons: function (obj) {
            var mode = (obj["mode"] !== undefined) ? obj["mode"] : null;
            var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : null;
            var recordID = (obj["recordID"] !== undefined) ? obj["recordID"] : null;
            var window_title = jQuery("#myModal_window_title");
            window_title.html("Record Information");

            //BUILD SELECT MENU TO PLACE IN window_title bar
            //get tables from pkey._tables
            if (_pkey["_table"]["_list"].length > 0) {
                var select_options = {};
                var soc = 0;
                for (var y in _pkey["_table"]["_list"]) {
                    for (var y2 in _pkey["_table"]["_list"][y]) {
                        //if(_pkey["_table"]["_list"][y].hasOwnProperty("T_"+tableID) == true){
                        //_pkey["_table"][y]["T_"+tableID]["settings_object"]["table_alias"];
                        select_options[soc] = {};
                        select_options[soc]["table_alias"] = _pkey["_table"]["_list"][y][y2]["table_alias"];
                        select_options[soc]["tableID"] = _pkey["_table"]["_list"][y][y2]["tableID"];
                        soc++;
                        //} 
                    }
                }
            }

            if (mode !== undefined) {
                var edit_button_position = jQuery("#tdx_popup_actions_wr");
                var print_button_position = "";
                var all_button_position = jQuery(".tdx_popup_buttons_wr");
                var tdx_close_modal_btn = jQuery("#tdx_close_modal_btn");
                var tdx_modal_backdrop = jQuery(".modal-backdrop");
                var tdx_modal_info_close = jQuery("#tdx_modal_info_close");

                var save_and_close = "<button type='button' class='btn btn-default' id='tdx_save_and_close_btn' onclick='javascript:_pkey._record._save({\"tableID\":\"" + tableID + "\", \"recordID\":\"" + recordID + "\"})'>Save</button>";
                var save_and_new = "<button type='button' class='btn btn-default' id='tdx_save_and_new_btn' onclick='javascript:_pkey._record._save({\"tableID\":\"" + tableID + "\", \"recordID\":\"" + recordID + "\",\"mode\":\"new\"})'>Save & Add New</button>";

                if (mode === "e" && edit_button_position) {
                    edit_button_position.html("");
                    print_button_position = "";
                    all_button_position.html("");
                    all_button_position.append(save_and_close, save_and_new);
                }
                if (mode === "v" && edit_button_position) {
                    edit_button_position.html("<a href='#' onclick='javascript:_pkey._record._open._edit({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});'><i class='fa fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>");

                    print_button_position = "<a href='javascript:window.print();'><i class='fa fa-print' aria-hidden='true'><span class='icontext'>Print</span></i></a>";
                    edit_button_position.append(print_button_position);
                    all_button_position.html("");

                }

                //PLACE SELECT MENU INTO HEADER
                if (soc > 0) {
                    var sel = "";
                    log("SOC >0::" + soc);
                    var selecthtml = "<select name='tdx_modal_sel' id='tdx_modal_sel' onchange='javascript:_pkey._modal._header_rec_select();'>";
                    //selecthtml += "<option>test2</option>";
                    //alert(JSON.stringify(select_options));

                    for (var yy = 0; yy < soc; yy++) {
                        //IF yy tableID == INCOMING tableID make this option selected
                        if (select_options[yy]["tableID"] === tableID) { sel = "selected='selected'"; }
                        else { sel = ""; } //WIPE OUT sel SO THERE ARENT MULTIPLE SELECTED
                        selecthtml += "<option value='" + select_options[yy]["tableID"] + "' " + sel + ">" + select_options[yy]["table_alias"] + "</option>";
                    }

                    selecthtml += "</select> <span id='tdx_modal_recsel'></span>";
                    log('window_title.append:' + JSON.stringify(selecthtml));
                    window_title.append(selecthtml);

                    //IF RECORDID != "N"
                    if (recordID !== "N") {
                        //LAUNCH THE select record PLACER
                        _pkey._modal._header_rec_select({ "recordID": recordID });
                    }
                }


                //tdx_close_modal_btn.attr("onclick", "javascript:_pkey._record._open._view({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});");
                //tdx_modal_backdrop.attr("onclick", "javascript:_pkey._record._open._view({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});");
                //tdx_modal_info_close.attr("onclick", "javascript:_pkey._record._open._view({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});");
            }

        }
    },
    _tab: {
        _list: [],
        _place: function (o) {
            //GET INPUT OBJECT
            //SORT INPUT OBJECT 
            //CHECK _LIST, IF ITEM EXISTS: UPDATE, IF ITEM DOESNT EXIST: PLACE
            if (typeof o === "object") {
                //log("_tab._place o:");
                //alert("/n/n " +JSON.stringify(o));
                let allow = [
                    "tabID",
                    "tab_slug",
                    "tab_type",
                    "tab_filter",
                    "tab_alias",
                    "tab_icon",
                    "tab_subtabs",
                    "tab_auths",
                    "description"
                ];
                var ac = allow.length;
                var tc = 0;
                var tabID = (o["tabID"] !== undefined) ? o["tabID"] : "";
                var t_tabID = "Tb_" + tabID;
                var push_obj = {};
                let exists1 = false;
                push_obj[t_tabID] = {};
                tc = _pkey["_tab"]["_list"].length || 0;
                //alert("TC:"+tc);
                //if (Object.getOwnPropertyNames(test3).includes(r_id) === true) 

                for (let gg = 0; gg < ac; gg++) {
                    if (o[allow[gg]] !== undefined && o[allow[gg]] !== null) {
                        //if( o[allow[gg]]["result"] !== undefined && o[allow[gg]]["result"] !== null && o[allow[gg]]["result"] !== "no_subtabs"){
                        if (o[allow[gg]]["result"] !== undefined && o[allow[gg]]["result"] === "no_subtabs") {
                            //alert('no subtabs! '+o[allow[gg]]["result"]);
                            //PLACE AN EMPTY OBJECT
                            push_obj[t_tabID][allow[gg]] = {};
                        }
                        else {
                            push_obj[t_tabID][allow[gg]] = o[allow[gg]];
                        }
                        //alert("pushing tab:" + JSON.stringify(o[allow[gg]]));

                        //}
                    }
                }
                //alert(JSON.stringify(push_obj));

                //if (tc > 0) {
                for (var y = 0; y < tc; y++) {
                    //alert("_tab._list.y"+JSON.stringify(_pkey["_tab"]["_list"][y]));
                    if (_pkey["_tab"]["_list"][y].hasOwnProperty(t_tabID)) {
                        delete _pkey["_tab"]["_list"][y];
                        _pkey["_tab"]["_list"].push(push_obj);
                    }

                }

                //}
                //if(tc === 0){
                _pkey._tab._list.push(push_obj);
                //}

            }
        },
        _pull: function (o) { },
        _get: function () {
            //PULL DATA FROM DB TO LOAD INTO DOM
            //EMPTY _tab._list first
            _pkey._tab._list = [];
            let tdx_obj = {};

            _pkey._univ_post("get_tabs", tdx_obj, _pkey._tab._get_proc);
        },
        _get_proc: function (o) {
            if (typeof o === "object") {
                //SEND TO _PLACE
                //alert(JSON.stringify(o));
                for (let ox in o) {
                    //alert(JSON.stringify(o[ox]));
                    _pkey._tab._place(o[ox]);
                }
                //RENDER SETTINGS TABS
                _pkey._render._settings._tab._all();
                //RENDER tabs
                _pkey._render._tab._all();
                //setTimeout(function(){ _pkey._render._tab._topbar(); },3000);
            }
        },
        _settings_save: function (o) {
            let tabID = o;
            //alert('save '+tabID);
            if (tabID !== undefined) {
                //GET DATA FROM tdx_tab_inputs.val()
                let runner = {};
                var subtabs_check = _pkey._validators._subtab_columns;

                runner["DATA"] = {};
                var v = 0;
                jQuery(".tdx_tab_inputs__" + tabID).each(function () {
                    let val = jQuery(this).val();
                    let idd = jQuery(this).attr("id");
                    //SPLIT DATA BY DOUBLE UNDERSCORE"__"
                    let ssplit = idd.split("__");
                    if (ssplit.length > 0) {

                        let keyy = ssplit[0];
                        let id2 = ssplit[1];
                        runner["DATA"][keyy] = val;
                    }
                });

                var subtabcount = jQuery("#tdxt_c" + tabID + "__tab_subtabs").val();
                var subtabs_arr = [];

                //alert("this many subtabs:" + subtabcount);
                for (var hh = 0; hh < subtabcount; hh++) {
                    if (subtabs_arr[hh] == undefined) {
                        subtabs_arr[hh] = {};
                    }
                    for (var h3 = 0; h3 < subtabs_check.length; h3++) {
                        var val_item = jQuery("#" + tabID + "__" + subtabs_check[h3] + "__" + hh).val();
                        subtabs_arr[hh][subtabs_check[h3]] = val_item;
                    }

                }
                runner["DATA"]["tab_subtabs"] = subtabs_arr;
                //alert("equals this array:"+JSON.stringify(subtabs_arr));

                //SEND THAT SHIT
                //alert("_tab_settings_save:SENDING"+JSON.stringify(runner));
                _pkey._univ_post("set_tab_setting", runner, _pkey._tab._settings_save_proc);
            }
        },
        _settings_save_proc: function (o) {
            _pkey._tab._get();
        },
        _settings_del: function (o) {
            let tabID = o;
            //alert('del ' + tabID);
            if (tabID === "N") {
                //just update interface
                jQuery("#tdx_tab_li__N").remove();
            }
            else {
                //send thru univ_post
                let so = {};
                so["tabID"] = tabID;
                _pkey._univ_post("del_tab_setting", so, _pkey._tab._settings_del_proc);
            }
        },
        _settings_del_proc: function (o) {
            //alert(JSON.stringify(o));
            if (o["rows_affected"] > 0) {
                let tabID = (o["tabID"] !== undefined) ? o["tabID"] : null;
                //alert('yes rows > 0');
                if (tabID !== null) {
                    _pkey._tab._get();
                    //jQuery("#tdx_tab_li__"+tabID).remove();

                }
            }
        }
    },
    _table: {
        _settings: {
            _save_setting: function (o = { tableID: null, table_target: null }) {
                //SAVE SETTINGS FROM TABLE SETTINGS WINDOW
                if (typeof o === "object") {
                    let tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    let table_target = (o["table_target"] !== null) ? o["table_target"] : null;
                    let faill = false;
                    //tdx_tabletarget_plc
                    //compare and prep settings, find change
                    let tdx_values = [];
                    let tdx_obj = {};
                    tdx_obj["tableID"] = tableID;
                    tdx_obj["table_target"] = table_target;
                    tdx_obj["settings_object"] = {};
                    //let tdx_block = jQuery(".tdx_window_val input");
                    jQuery(".tdx_table_sett_input").each(function () {
                        let tdxid = jQuery(this).attr("id");
                        let tdxidd = tdxid.toString();
                        if (tdxidd.includes("__") === true) {
                            //YES IT IS AN OBJECT
                            let tdxsplit = tdxidd.split("__");
                            let tdxname = tdxsplit[0];
                            let tdxY = tdxsplit[1];
                            //VALIDATE JSON
                            let textbox_contents = jQuery(this).val();
                            if (IsJsonString(textbox_contents) === true) {
                                //YES ITS VALID JSON, PROCEED WITH SAVE
                                if (tdx_obj["settings_object"][tdxname] === undefined) { tdx_obj["settings_object"][tdxname] = {}; }
                                tdx_obj["settings_object"][tdxname][tdxY] = JSON.parse(jQuery(this).val());
                                jQuery(this).css("background-color", "");
                            }
                            else {
                                //NOT VALID JSON, ALERT AND STOP
                                jQuery(this).css("background-color", "rgba(200,10,10,.3)");
                                faill = true;

                            }
                        }
                        else {
                            tdx_obj["settings_object"][jQuery(this).attr("id")] = jQuery(this).val();
                        }
                    });
                    ///////////////////////////////////////////////////////////////////////////
                    jQuery(".tdx_tsa_obj").each(function () {
                        //tdx_obj["settings_object"]
                        let tdxid = jQuery(this).attr("id");
                        let tdxidd = tdxid.toString();
                        if (tdxidd.includes("__") === true) {
                            //YES IT IS AN OBJECT
                            let tdxsplit = tdxidd.split("__");
                            let tdxname = tdxsplit[0];
                            let xposition = tdxsplit[1];
                            let tableID = tdxsplit[2];
                            //VALIDATE JSON
                            let textbox_contents = jQuery(this).val();
                            if (IsJsonString(textbox_contents) === true) {
                                //YES ITS VALID JSON, PROCEED WITH SAVE
                                if (tdx_obj["settings_object"][tdxname] === undefined) { tdx_obj["settings_object"][tdxname] = {}; }
                                tdx_obj["settings_object"][tdxname][xposition] = JSON.parse(jQuery(this).val());
                                jQuery(this).css("background-color", "");
                            }
                            else {
                                //NOT VALID JSON, ALERT AND STOP
                                jQuery(this).css("background-color", "rgba(200,10,10,.3)");
                                faill = true;

                            }
                        }
                        else {
                            tdx_obj["settings_object"][jQuery(this).attr("id")] = jQuery(this).val();
                        }
                    });
                    ///////////////////////////////////////////////////////////////////////////


                    //IF THERE WERE NO FAILURES THEN PROCEED
                    if (faill === true) {
                        alert("Objects must be in JSON format, no save occurred.\n\nERRONEOUS OBJECT WILL BE HIGHLIGHTED WITH RED BACKGROUND");
                        console.log("FAILING OUT OF SAVE");
                        return false;
                    }
                    console.log("SEND:" + JSON.stringify(tdx_obj));
                    jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;float:right;color:rgba(10, 10, 200);text-shadow:#CCC;position:absolute;right:150px;'>Saving...</span>");
                    //alert("SEND:"+JSON.stringify(tdx_obj));
                    _pkey._univ_post("set_table_setting", tdx_obj, _pkey._table._settings._save_setting_proc);
                }
            },
            _save_setting_proc: function (o) {
                //alert("proc");
                console.log("save setting proc:"+o);
                if (typeof o === "object") {
                    let tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                    let table_target = (o["table_target"] !== undefined) ? o["table_target"] : null;

                    jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;float:right;color:rgba(10, 100, 10,1);text-shadow:#CCC;position:absolute;right:150px;'>Saved!</span>");
                    setTimeout(function () {
                        jQuery("#tdx_popup_actions_wr span").css("color", "rgba(10, 100, 10,.1)");
                    }, 1000);
                    setTimeout(function () {
                        jQuery("#tdx_popup_actions_wr").html("");
                    }, 2000);

                    _pkey._table._get({ "tableID": tableID, "table_target": table_target });
                }
            }
        },
        _list: [],
        _get: function (o) {
            if (typeof o === "object") {
                //log(o);
                let tdx_obj = {};
                //ESTABLISH action, all or single
                let action = "get_tables";//ALL
                let proceed = false;

                if (o["tableID"] != undefined && o["tableID"] == "all") {
                    //ALL
                    action = "get_tables";
                    tdx_obj["tabID"] = "25";
                    proceed = true;
                }
                if (o["tableID"] != undefined && o["tableID"] != "all") {
                    //SINGLE

                    action = "get_table";
                    tdx_obj["tableID"] = (o["tableID"] !== undefined) ? o["tableID"] : "";
                    tdx_obj["tabID"] = "20";
                    tdx_obj["pending_flag"] = true;
                    tdx_obj["pending_flag_type"] = "table";
                    proceed = true;
                }

                //PROCEED
                if (proceed === true) {
                    //_pkey._univ_post(action, tdx_obj, _pkey._table._get_proc);
                    _pkey._univ_post_checksum(action, tdx_obj, _pkey._table._get_proc);
                }

            }

        },
        _get_proc: function (o) {
            //let runner = "<ul style='margin-left:25px;'>";
            //alert(o);
            if (typeof o === "object") {
                //IF ACTION == get_table >> single
                if (o["action"] === "get_table") {
                    //alert(JSON.stringify(o));
                    //alert(JSON.stringify(o));
                    _pkey._table._place(o);
                    //GET THE RECORDS
                    _pkey._record._get(o);
                }

                //IF ACTION == get_tables >> multiple
                if (o["action"] === "get_tables") {
                    //alert(JSON.stringify(o));
                    for (let y in o) {
                        //PLACE INTO _pkey._table._place(o[y]);
                        _pkey._table._place(o[y]);
                        //GET THE RECORDS
                        _pkey._record._get(o[y]);
                    }
                }

                //runner += "</ul>";
            }
            //jQuery("#tsbp_settings_tables").html(runner);
        },
        _checksum: function (o) {
            if (typeof o == "object") {
                let tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                let sendobj = {};
                sendobj["tableID"] = tableID;
                _pkey._univ_post("checksum", sendobj, _pkey._table._checksum_proc);
            }
        },
        _checksum_proc: function (o) {
            if (typeof o == "object") {
                //alert(JSON.stringify(o));
                let table_count = _pkey["_table"]["_list"].length || 0;
                let tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                let t_tableID = "T_" + tableID;
                let checksum = (o["checksum"] !== undefined) ? o["checksum"] : "";
                //alert(checksum + "; "+ t_tableID+ " ;; "+table_count);
                for (let d = 0; d < table_count; d++) {
                    if (_pkey["_table"]["_list"][d].hasOwnProperty(t_tableID) == true) {
                        _pkey["_table"]["_list"][d][t_tableID]["_CHECKSUM"] = checksum;
                    }
                }
            }
        },
        _checksum_get_local: function (o) {
            if (typeof o === "object") {
                let tableID = o["tableID"] || 0;
                let local_checksum = "";
                let table_length = _pkey._table._list.length || 0;
                for (let tc = 0; tc < table_length; tc++) {
                    if (_pkey._table._list[tc].hasOwnProperty("T_" + tableID) === true) {
                        if (_pkey._table._list[tc]["T_" + tableID]["_CHECKSUM"] !== undefined) {
                            local_checksum = _pkey._table._list[tc]["T_" + tableID]["_CHECKSUM"];
                            local_checksum.toString();
                            //log(">>>>>>>>>>>>>>>>>>>>>_checksum_get_local:" + tableID + " LOCAL CHECKSUM:" + local_checksum);
                        }
                    }
                    //log("C:" + JSON.stringify(ret2));
                }

                //log("_checksum_get_local; tableID:"+tableID+":RETURNING:" + local_checksum);
                return local_checksum;
            }
        },
        _place: function (o) {
            //TAKE INPUT obj AND PLACE INTO DOM
            if (typeof o === "object") {
                //log("_table._place o:");
                //log("**************** "+JSON.stringify(o));

                let allow = _pkey._validators._table_columns;
                var ac = allow.length;
                var tc = 0;
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                var t_tableID = "T_" + tableID;

                //CHECK IF T_TABLEID ALREADY EXISTS
                let does_exist = false;
                let table_count = _pkey["_table"]["_list"].length || 0;
                let incoming_object = {};

                incoming_object[t_tableID] = {};
                _pkey._table._checksum({ "tableID": tableID });

                for (var d = 0; d < table_count; d++) {
                    if (_pkey["_table"]["_list"][d].hasOwnProperty(t_tableID) == true) { does_exist = true; }
                }

                //CONSTRUCT THE INCOMING OBJECT
                for (let axx = 0; axx < ac; axx++) {
                    incoming_object[t_tableID][allow[axx]] = o[allow[axx]];
                }

                if (does_exist === true) {
                    log("this tID does exist:" + t_tableID);
                    //REPLACE THE OBJECT WITH THE INCOMING OBJECT
                    for (var e = 0; e < table_count; e++) {
                        if (_pkey["_table"]["_list"][e].hasOwnProperty(t_tableID) == true) {
                            _pkey["_table"]["_list"][e][t_tableID] = incoming_object[t_tableID];
                        }
                    }
                }
                else {
                    //PUSH THE OBJECT ONTO _table._list
                    _pkey["_table"]["_list"].push(incoming_object);
                }

            }
        },
        _pull: function (o) {
            //check if this table already exists in the pkey._tables object
            if (typeof o === "object") {
                log("_table._pull o:");
                console.log(o);
                var tc = 0;
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                var t_tableID = "T_" + tableID;
                var pas = true;

                tc = _pkey["_table"]["_list"].length || 0;
                //log("TC:"+tc);

                for (var y = 0; y < tc; y++) {
                    if (_pkey["_table"]["_list"][y].hasOwnProperty(t_tableID)) {
                        console.log("deleting _table:" + t_tableID);
                        delete _pkey["_table"]["_list"][y];
                        pas = false;
                    }
                }

                if (pas == false) {
                    //deletion occurred, restack
                    _pkey["_table"]._restack(o);
                }
            }
        },
        _restack: function (o) {
            //sort thru all tables in DOM
            //grab data and place into array
            //restack _table._list from array
            if (typeof o === "object") {
                //log("_table._restack o:");
                //console.log(o);
                var tc = 0;
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                var t_tableID = "T_" + tableID;

                var new_list_arr = [];
                var new_list_arr_obj = {};

                tc = _pkey["_table"]["_list"].length || 0;
                //log("TC:"+tc);

                for (var y in _pkey["_table"]["_list"]) {
                    new_list_arr_obj = {};
                    new_list_arr_obj[t_tableID] = _pkey["_table"]["_list"][y][t_tableID];
                    new_list_arr.push(new_list_arr_obj);
                }

                _pkey["_table"]["_list"] = new_list_arr;

            }
        },
        _exists: function (o) {
            if (o) {
                //obj["tableID"]
                //log("_table._exists:" + o["tableID"]);
                var pas = false;
                var tableID = (typeof o["tableID"] !== undefined) ? o["tableID"] : "";
                var t_tableID = (tableID !== "") ? "T_" + o["tableID"] : "";

                for (var y in _pkey["_table"]["_list"]) {
                    if (_pkey["_table"]["_list"][y].hasOwnProperty(t_tableID)) {
                        pas = true;
                    }
                }

                if (pas === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        /*_display_settings: function (o = { tableID: null, table_target: null }) {
            if (typeof o === "object") {
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                var table_target = (o["table_target"] !== undefined) ? o["table_target"] : null;
                //var tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                var win_body = jQuery("#tdx_mod_window_div");
                var win_title = jQuery("#myModal_window_title");

                var this_table_alias = _pkey._table._get_alias({ "tableID": tableID });
                var this_table_settings_all = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "all" });
                var print_title = '<i class="fa fa-cogs" aria-hidden="true"> </i> Settings';
                let tableID_placeholder = " <input type='textbox' id='tdx_table_placeholder' value='" + tableID + "' readonly/>";
                let tabletarget_placeholder = " <input type='textbox' id='tdx_tabletarget_plc' value='" + table_target + "' readonly/>";
                var print_body = "";

                if (this_table_alias !== undefined) {
                    print_title += " - " + this_table_alias + "";
                }

                if (this_table_settings_all !== undefined) {
                    //print_body = JSON.stringify(this_table_settings_all);
                    for (var s in this_table_settings_all) {
                        let tdx_obj = false;
                        let tdx_obj_num = 0;
                        let delbutton = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + s + "\");'>X</a> ] ";
                        print_body += "<div class='tdx_column_wrapper1' id='tdx_" + s + "'>";
                        print_body += "<div class='tdx_window_key'><strong>" + delbutton + s + ":</strong></div>";
                        if (typeof this_table_settings_all[s] === "object") {
                            for (var s1 in this_table_settings_all[s]) {
                                print_body += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                                print_body += "<div id='tdx_" + s + "__" + s1 + "' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + s1 + " : </div>";
                                if (typeof this_table_settings_all[s][s1] === "object") {
                                    tdx_obj = true;
                                    print_body += "";
                                    delbutton = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + s + "__" + s1 + "\");'>X</a> ] ";
                                    print_body += "<div class='tdx_window_val'><textarea id='" + s + "__" + s1 + "' class='tdx_table_sett_input'>" + JSON.stringify(this_table_settings_all[s][s1]) + "</textarea>" + delbutton + "</div>";
                                    tdx_obj_num++;
                                }
                                else {
                                    print_body += "<div class='tdx_window_val'>" + this_table_settings_all[s][s1] + "</div>";
                                }
                                print_body += "</div>";
                            }
                            //IF ITS AN OBJECT THEN ADD THE 'ADD NEW' BUTTON, TO ADD ADDITIONAL OBJECTS
                            if (tdx_obj === true) {
                                print_body += "<div class='tdx_window_val' id='tdx_" + s + "__" + tdx_obj_num + "'><a href='#' onclick='javascript:_pkey._table._display_settings_addnew_addo(\"" + s + "\");'>+ Add Object</a><input type='textbox' value='" + tdx_obj_num + "' id='tdxnc_" + s + "' /></div>";
                            }
                        }
                        else {
                            //HANDLE SPECIAL FOR main_header
                            let tdx_readonly = "";
                            if (s === "main_header") { tdx_readonly = " readonly style='background:#CCC;color:#666;'"; }
                            print_body += "<div class='tdx_window_val'><input type='textbox' value='" + this_table_settings_all[s] + "' id='" + s + "' class='tdx_table_sett_input'" + tdx_readonly + "/>" + delbutton + "</div>";
                        }
                        print_body += "   </div>";
                    }
                    print_body += "<div class='tdx_column_wrapper1' id='tdx_tab_sett_addnew'><div class='tdx_window_val'><a href='#' onclick='javascript:_pkey._table._display_settings_addnew()'>+ Add New Setting</a></div></div>";
                }

                win_title.html(print_title + tableID_placeholder + tabletarget_placeholder);
                win_body.html(print_body);
                _pkey._table._display_settings_buttons({ "tableID": tableID, "table_target": table_target });
            }
        },
        _display_settings_addnew: function () {
            //THIS FUNCTION PLACES THE DROPDOWN AND TEXTBOX TO CHOOSE WHICH ITEM TO CREATE IN THE TABLE SETTINGS WINDOW
            let tdx_selectmenu = "<select id='tdx_sett_newsel'><option value='item'>Single Item</option><option value='objects'>Objects</option></select>";
            let tdx_onkey = " onkeyup='javascript:cnf(this.id,this.value,\"l\");'";
            jQuery("#tdx_mod_window_div").append("<div id='tdx_settaddnewdiv' class='tdx_column_wrapper1'><div class='tdx_window_key'>Name:<input type='textbox' placeholder='name_here' id='tdx_settaddnewdivname'" + tdx_onkey + "/></div><div class='tdx_window_val'>" + tdx_selectmenu + "<input type='button' value='Add' onclick='javascript:_pkey._table._display_settings_addnew_go()' /></div></div>");
            jQuery("#tdx_mod_window_div").append("<input type='hidden' value='1' id='tdxnc_newobj' />");
            //CLEAR THE CONTENTS OF THE ADDNEW DIV 
            jQuery("#tdx_tab_sett_addnew").remove();

        },
        _display_settings_addnew_go: function () {
            //THIS FUNCTION IS LAUNCHED BY PRESSING THE 'GO' BUTTON TO BEGIN THE PROCESS OF ADDING A NEW SETTING IN THE TABLE SETTINGS WINDOW
            let tdx_selectval = jQuery("#tdx_sett_newsel").val();
            let tdx_addnewdiv = jQuery("#tdx_settaddnewdiv");
            let tdx_addnewdivname = jQuery("#tdx_settaddnewdivname").val();
            let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
            let xdel = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + tdx_addnewdivname + "\");'>X</a> ] ";

            if (tdx_selectval == "item") {
                tdx_addnewdiv.html("<div class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + tdx_addnewdivname + ":</strong></div><div class='tdx_window_val'><input type='textbox' id='" + tdx_addnewdivname + "' class='tdx_table_sett_input'/></div></div>");
            }

            if (tdx_selectval == "objects") {

                //let tdx_settaddnewdiv = jQuery("#tdx_settaddnewdiv");
                //tdx_settaddnewdiv.append("<input type='textbox' value='1' id='tdxnc_newobj' />");
                let tdx_x = (jQuery("#tdxnc_newobj").val() !== undefined) ? jQuery("#tdxnc_newobj").val() : 1;
                let tdx_inner = "";
                let tdx_textcount = "<input type='textbox' id='tdxnc_" + tdx_addnewdivname + "' value='1' />";
                let tdx_inner_addnew = tdx_spacer + "<div id='tdx_" + tdx_addnewdivname + "__1' class='tdx_window_val'><a href='javascript:_pkey._table._display_settings_addnew_addo(\"" + tdx_addnewdivname + "\");'>+ Add Object</a>" + tdx_textcount + "</div>";

                for (var x = 0; x < tdx_x; x++) {
                    let tdx_textarea = "<div class='tdx_window_val'><textarea id='" + tdx_addnewdivname + "__" + x + "' placeholder='{ json object here }' class='tdx_table_sett_input'>{\"test\":\"test3\"}</textarea></div>";
                    tdx_inner += tdx_spacer + "<div class='tdx_window_key'><strong>" + x + " :</strong></div>" + tdx_textarea;

                }
                tdx_addnewdiv.replaceWith("<div id='tdx_" + tdx_addnewdivname + "' class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + xdel + tdx_addnewdivname + ":</strong></div>" + tdx_inner + "</div>" + tdx_inner_addnew + "");
            }
        },
        _display_settings_addnew_addo: function (setting_name) {
            //alert('add object');

            let tdx_setting_name = (setting_name !== undefined) ? setting_name : null;
            let tdx_setting_count = "";


            //GET COUNT FROM #tdxnc_newobj
            if (tdx_setting_name !== null) { tdx_setting_count = "#tdxnc_" + setting_name; }
            else { tdx_setting_count = "#tdxnc_newobj"; }

            let tdx_count = (jQuery(tdx_setting_count).val() !== undefined) ? jQuery(tdx_setting_count).val() : null;

            //let tdx_addnew = jQuery("#tdx_table_setting_new");
            let tdx_settingdiv = jQuery("#tdx_" + tdx_setting_name + "__" + tdx_count);

            let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
            let xdel = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + tdx_setting_name + "__" + tdx_count + "\");'>X</a> ] ";

            if (tdx_count !== null) {
                //use the number for the x
                let tdx_cn = Number(tdx_count);
                let newcount = Number(tdx_cn + 1);
                let tdx_textarea = "<div class='tdx_window_val'><textarea id='" + setting_name + "__" + tdx_count + "' placeholder='{ json object here }' class='tdx_table_sett_input'>{\"test4466\":\"test3123\"}</textarea>" + xdel + "</div>";

                //tdxnc_newobj
                if (tdx_setting_count === "#tdxnc_newobj") {
                    tdx_settingdiv = jQuery("#tdx_table_setting_new");
                    tdx_settingdiv.append(tdx_spacer + "<div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea);
                }
                else {
                    //COPY CURRENT DIV
                    let tdxcurr = tdx_settingdiv.html();
                    //REPLACE
                    tdx_settingdiv.replaceWith(tdx_spacer + "<div id='tdx_" + tdx_setting_name + "__" + tdx_count + "' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea + "</div>" + tdx_spacer + "<div id='tdx_" + setting_name + "__" + newcount + "' class='tdx_window_val'>" + tdxcurr + "</div>");
                }


                //INCREMENT COUNT +1
                let tdx_countnum = parseInt(tdx_count);
                jQuery(tdx_setting_count).val(tdx_countnum + 1);
            }


            //append the x:textarea to tdx_table_setting_new
        },
        _display_settings_buttons: function (o = { tableID: null, table_target: null }) {
            let tableID = (o["tableID"] !== null) ? o["tableID"] : null;
            let table_target = (o["table_target"] !== null) ? o["table_target"] : null;
            let save_btn = "<button type='button' class='btn btn-default' id='tdx_sett_save_and_btn' onclick='javascript:_pkey._table._save_setting({\"tableID\":\"" + tableID + "\", \"table_target\":\"" + table_target + "\"})'>Save</button>";

            if (tableID !== null) {
                let tdx_place_here = jQuery(".tdx_popup_buttons_wr");
                tdx_place_here.html(save_btn);
                //MAKE ACTION BAR TO BE EMPTY
                jQuery("#tdx_popup_actions_wr").html("");
            }
        },
        _display_settings_del: function (setting_name) {
            if (setting_name !== undefined) {
                let settname = "#tdx_" + setting_name;
                //alert("delete:"+setting_name);
                jQuery(settname).css("transition", "all .7s");
                jQuery(settname).css("background-color", "red");
                jQuery(settname).css("color", "red");
                jQuery(settname + " input").css("border-color", "red");
                jQuery(settname + " textarea").css("border-color", "red");
                setTimeout(function () {
                    jQuery(settname).remove();
                    _pkey._table._display_settings_restack(setting_name);
                }, 800);

            }
        },
        _display_settings_restack: function (setting_name) {
            console.log("//BEGIN RESTACK: setting:" + setting_name);
            //if contains "__" THEN DIVIDE BY "__"
            let cc = 0;
            let runner = "";
            var core_setting_name = "";

            if (setting_name.includes("__") === true) {
                //console.log("contains __");
                let str = setting_name.split("__");
                //console.log(str);
                core_setting_name = str[0];
                let xdel1 = "[ <a href='javascript:_pkey._table._display_settings_del(\"" + core_setting_name + "\");'>X</a> ] ";

                console.log("core setting:" + core_setting_name);

                runner += "<div class='tdx_window_key'><strong>" + xdel1 + core_setting_name + " :</strong></div>";
                runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";

                jQuery("#tdx_" + core_setting_name + " .tdx_column_wrapper1 .tdx_window_val textarea").each(function () {
                    let cont = jQuery(this).val();

                    let xdel2 = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + core_setting_name + "__" + cc + "\");'>X</a> ] ";
                    runner += "<div id='tdx_" + core_setting_name + "__" + cc + "' class='tdx_column_wrapper1'>";
                    runner += "<div class='tdx_window_key'>" + cc + " : </div>";
                    runner += "<div class='tdx_window_val'><textarea id='" + core_setting_name + "__" + cc + "' class='tdx_table_sett_input'>" + cont + "</textarea>" + xdel2 + "</div>";
                    runner += "</div>";
                    runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                    console.log(cc);
                    console.log(cont);
                    cc++;

                });


            }

            if (cc === 0) { cc = 1; }

            runner += "<div class='tdx_window_val' id='tdx_" + core_setting_name + "__" + cc + "'>";
            runner += "<a href='#' onclick='javascript:_pkey._table._display_settings_addnew_addo(\"" + core_setting_name + "\");'>+ Add Object</a>";
            runner += "<input type='textbox' value='" + cc + "' id='tdxnc_" + core_setting_name + "'>";
            runner += "</div>";

            //INJECT runner
            jQuery("#tdx_" + core_setting_name).html(runner);

        },
        _save_setting: function (o = { tableID: null, table_target: null }) {
            //SAVE SETTINGS FROM TABLE SETTINGS WINDOW
            if (typeof o === "object") {
                let tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                let table_target = (o["table_target"] !== null) ? o["table_target"] : null;
                let faill = false;
                //tdx_tabletarget_plc
                //compare and prep settings, find change
                let tdx_values = [];
                let tdx_obj = {};
                tdx_obj["tableID"] = tableID;
                tdx_obj["table_target"] = table_target;
                tdx_obj["settings_object"] = {};
                //let tdx_block = jQuery(".tdx_window_val input");
                jQuery(".tdx_table_sett_input").each(function () {
                    let tdxid = jQuery(this).attr("id");
                    let tdxidd = tdxid.toString();
                    if (tdxidd.includes("__") === true) {
                        //YES IT IS AN OBJECT
                        let tdxsplit = tdxidd.split("__");
                        let tdxname = tdxsplit[0];
                        let tdxY = tdxsplit[1];
                        //VALIDATE JSON
                        let textbox_contents = jQuery(this).val();
                        if (IsJsonString(textbox_contents) === true) {
                            //YES ITS VALID JSON, PROCEED WITH SAVE
                            if (tdx_obj["settings_object"][tdxname] === undefined) { tdx_obj["settings_object"][tdxname] = {}; }
                            tdx_obj["settings_object"][tdxname][tdxY] = JSON.parse(jQuery(this).val());
                            jQuery(this).css("background-color", "");
                        }
                        else {
                            //NOT VALID JSON, ALERT AND STOP
                            jQuery(this).css("background-color", "rgba(200,10,10,.3)");
                            faill = true;

                        }
                    }
                    else {
                        tdx_obj["settings_object"][jQuery(this).attr("id")] = jQuery(this).val();
                    }
                });

                //IF THERE WERE NO FAILURES THEN PROCEED
                if (faill === true) {
                    alert("Objects must be in JSON format, no save occurred.\n\nERRONEOUS OBJECT WILL BE HIGHLIGHTED WITH RED BACKGROUND");
                    console.log("FAILING OUT OF SAVE");
                    return false;
                }
                console.log("SEND:" + JSON.stringify(tdx_obj));
                jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;float:right;color:rgba(10, 10, 200);text-shadow:#CCC;position:absolute;right:150px;'>Saving...</span>");
                //alert("SEND:"+JSON.stringify(tdx_obj));
                _pkey._univ_post("set_table_setting", tdx_obj, _pkey._table._save_setting_proc);
            }
        },
        _save_setting_proc: function (o) {
            //alert("proc");
            console.log(o);
            if (typeof o === "object") {
                let tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                let table_target = (o["table_target"] !== undefined) ? o["table_target"] : null;

                jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;float:right;color:rgba(10, 100, 10,1);text-shadow:#CCC;position:absolute;right:150px;'>Saved!</span>");
                setTimeout(function () {
                    jQuery("#tdx_popup_actions_wr span").css("color", "rgba(10, 100, 10,.1)");
                }, 1000);
                setTimeout(function () {
                    jQuery("#tdx_popup_actions_wr").html("");
                }, 2000);

                get_table({ "tableID": tableID, "table_target": table_target });

            }
        },*/
        _set_setting: function (o) { },
        _get_setting: function (o = { tableID: null, settings_name: null }) {
            //RETURN SINGLE SETTING VALUE FOR tableID AND settings_name
            //obj["tableID"]
            //obj["settings_name"]
            //log("_table._get_setting: o:");
            //console.log(o);
            if (typeof o === "object") {
                var tableID = "", t_tableID = "", settings_name = "", retobj = {};
                var tableID = (typeof o["tableID"] !== undefined) ? String(o["tableID"]) : "";
                var t_tableID = (tableID !== "") ? "T_" + tableID : "";
                var settings_name = (typeof o["settings_name"] !== undefined) ? o["settings_name"] : "";

                for (var y in _pkey["_table"]["_list"]) {
                    if (_pkey["_table"]["_list"][y].hasOwnProperty(t_tableID)) {
                        var so = _pkey["_table"]["_list"][y][t_tableID]["settings_object"];
                        if (settings_name === "all") {
                            return so;
                        }
                        if (so[settings_name] !== undefined) {
                            retobj = so[settings_name];
                        }
                    }
                }

                //log("_table._get_settings return:");
                //console.log(retobj);
                return retobj;
            }
            else {
                //console.log("_table._get_setting() NO OBJ SENT");
                return undefined;
            }
        },
        _get_column_slugs: function (o) {
            if (o) {
                log("_table._get_columns:");
                console.log(o);
                var t_tableID = "", retobj = {}, retx = 0;
                var head_col = {};
                var cont_col = {};

                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                var t_tableID = (tableID !== "") ? "T_" + tableID : "";

                var hcols = _pkey["_table"]._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                var ccols = _pkey["_table"]._get_setting({ "tableID": tableID, "settings_name": "content_columns" });

                for (var z in hcols) {
                    retobj[retx] = hcols[z]["column_slug"];
                    retx++;
                }
                for (var z in ccols) {
                    retobj[retx] = ccols[z]["column_slug"];
                    retx++;
                }

                return retobj;
            }
        },
        _get_alias: function (o = { tableID: null }) {
            if (typeof o === "object") {
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                if (_pkey._table._list.length > 0) {
                    for (var xx in _pkey._table._list) {
                        if (_pkey._table._list[xx].hasOwnProperty("T_" + tableID)) {
                            return _pkey._table._list[xx]["T_" + tableID]["table_alias"];
                        }
                    }
                }
            }
        },
        _get_all_as_array: function () {
            var ret = [];
            for (var zz = 0; zz < _pkey._table._list.length; zz++) {
                var outpp = Object.getOwnPropertyNames(_pkey._table._list[zz]);
                var outppstring = outpp.toString(outpp);
                var tabtext = outppstring.substring(2);
                //ret.push(tabtext);
                ret.push(_pkey._table._list[zz]);
                //ret += "<option value='" + tabtext + "'>" + tabtext + " : " + _pkey._table._list[zz][outppstring]["table_alias"] + "</option>";
            }

            return ret;
        },
        _get_all_IDs_as_array: function () {
            var ret = [];
            for (var zz = 0; zz < _pkey._table._list.length; zz++) {
                var outpp = Object.getOwnPropertyNames(_pkey._table._list[zz]);
                var outppstring = outpp.toString(outpp);
                var tabtext = outppstring.substring(2);
                ret.push(tabtext);
                //ret.push(_pkey._table._list[zz]);
                //ret += "<option value='" + tabtext + "'>" + tabtext + " : " + _pkey._table._list[zz][outppstring]["table_alias"] + "</option>";
            }

            return ret;
        }
    },
    _column: {
        _get_value: function (o = { tableID: null, recordID: null, column_slug: null }) {
            if (o) {
                //obj["tableID"]
                //obj["recordID"]
                //obj["column_slug"]
                var tableID, recordID, column_slug;
                //log("_column._get_value:" + JSON.stringify(o));
                var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                var t_tableID = "T_" + tableID;
                var recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                var r_recordID = "R_" + recordID;
                var column_slug = (o["column_slug"] !== null) ? o["column_slug"] : null;

                if (_pkey._record._list.length > 0) {
                    console.log("YES _pkey._record._list.length > 0");
                    for (var tt in _pkey._record["_list"]) {
                        console.log("^^^^^^^^^^^^^");
                        //console.log(_pkey._record["_list"][tt]);
                        if (_pkey._record["_list"][tt].hasOwnProperty(t_tableID) == true) {
                            for (var rr in _pkey._record["_list"][tt][t_tableID]) {
                                if (_pkey._record["_list"][tt][t_tableID][rr].hasOwnProperty(r_recordID) == true) {
                                    console.log("###################################");
                                    console.log(_pkey._record["_list"][tt][t_tableID][rr][r_recordID]);
                                    console.log("###################################");
                                    if (_pkey._record["_list"][tt][t_tableID][rr][r_recordID][column_slug] !== undefined) {
                                        return _pkey._record["_list"][tt][t_tableID][rr][r_recordID][column_slug];
                                    }
                                }
                            }
                        }
                    }
                }
                /*if (pkey._recordset !== undefined && pkey._recordset[tableID] !== undefined) {
                    if (pkey._recordset[tableID]["list"] !== undefined && pkey._recordset[tableID]["list"][recordID]) {
                        if (pkey._recordset[tableID]["list"][recordID][column_slug] !== undefined) {
                            return pkey._recordset[tableID]["list"][recordID][column_slug];
                        }
                    }
                    else {
                        log("_column._get_value: no list or [recordID]");
                    }
                }
                else {
                    log("_column._get_value: no _recordset or [tableID]");
                }*/
            }
        }
    },
    _record_group: {
        _list: [],
        _ds: function (obj) {
            if (obj) {
                if (obj["record_groups"] !== undefined) {
                    //alert("record groups:"+JSON.stringify(obj));
                    //BREAK DOWN MULTIPLE RECORD GROUPS INTO SINGLES
                    for (var g in obj["record_groups"]) {
                        //SEND SINGLES TO pkey.record_group_place()
                        _pkey._record_group._place(obj["record_groups"][g]);
                    }
                }
            }
        },
        _place: function (obj) {
            if (obj) {
                //RECEIVE SINGLE RECORD GROUPS AND PLACE INTO DOM
                //DOM LOCATION: pkey._record_groups = {ID: {key1:value1}}

                //check if the base _record_groups exists
                if (!pkey._record_groups || pkey._record_groups === undefined) {
                    pkey._record_groups = {};
                }

                var check_these = [
                    "record_groupID",
                    "record_group_slug",
                    "record_group_alias",
                    "rgb_color",
                    "description",
                    "default_display",
                    "tableID"
                ];
                var ctc = check_these.length;
                var pass_obj = {};

                //log("record group place:" + JSON.stringify(obj));
                //get record_groupID specially
                var record_groupID = (obj["record_groupID"] !== undefined) ? obj["record_groupID"] : "";

                for (var x = 0; x < ctc; x++) {
                    //sort through the check_these array and find matches
                    if (obj[check_these[x]] !== undefined) {
                        pass_obj[check_these[x]] = obj[check_these[x]];
                    }
                }

                if (record_groupID !== "") {
                    pkey._record_groups["RG_" + record_groupID] = {};
                    pkey._record_groups["RG_" + record_groupID] = pass_obj;
                }
                else {
                    log("record_group_place: record_groupID == ''");
                }
            }
        }
    },
    _record: {
        _list: [],
        _list_table: {
            _exist: function (oo = { tableID: 0 }) {
                var ret = false;
                if (oo["tableID"] == 0) { return false; }
                var t = "T_" + oo["tableID"];
                //console.log("@_exist:");
                //console.log(t);

                for (var y in _pkey._record._list) {
                    if (_pkey._record._list[y].hasOwnProperty(t)) {
                        return true;
                    }
                }
                return ret;
            },
            _place: function (o = { tableID: 0 }) {
                //check if table exist
                //yes: do nothing
                //no: place table
                var does_exist = _pkey._record._list_table._exist(o);
                if (does_exist === false) {
                    var t = "T_" + o["tableID"];
                    var pushh = {};
                    pushh[t] = [];
                    _pkey._record._list.push(pushh);
                    var now_does_exist = _pkey._record._list_table._exist(o);
                    if (now_does_exist === true) { return true; }
                }
                if (does_exist === true) { return true; }
            }
        },
        _is_mod: function (o = { tableID: null, recordID: null }) {
            //COMPARE HTML INPUT ELEMENT VALUE TO DOM VALUE
            //RETURN TRUE OR FALSE
            if (o) {

                var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                var recordID = (o["recordID"] !== null) ? o["recordID"] : null;

                var content_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                var header_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                var text_output = "";
                var ret = {};
                //FLAG FOR CHANGES MADE, IF ANY
                var changes_made = false;
                var change_runner = "";

                ret["tableID"] = tableID;
                ret["recordID"] = "N";
                ret["_TIMESTAMP"] = _pkey._get_timestamp();
                ret["content_object"] = {};

                for (var col in content_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = content_columns[col]["column_alias"];
                    ret["content_object"][content_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output = "#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID;
                    //if(data.val() !== "value from DOM"){}
                }
                for (var col in header_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = header_columns[col]["column_slug"];
                    ret["content_object"][header_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output = "#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID;
                }

                //alert(JSON.stringify(o));
                var t_tableID = (tableID !== null) ? "T_" + tableID : null;
                var r_recordID = (recordID !== null) ? "R_" + recordID : null;

                if (_pkey._record._list.length > 0) {
                    //alert('list exist');
                    for (var tt in _pkey._record._list) {
                        if (_pkey._record._list[tt].hasOwnProperty(t_tableID) == true) {
                            //alert("t_tableID yes");
                            for (var rr in _pkey._record._list[tt][t_tableID]) {
                                if (_pkey._record._list[tt][t_tableID][rr].hasOwnProperty(r_recordID) == true) {
                                    //alert("recordID:"+recordID+"\ntableID:"+tableID+"\n"+text_output);
                                    //alert(JSON.stringify(ret["content_object"]));

                                    //FOR EACH ret["content_object"] check if data in element
                                    for (var col2 in ret["content_object"]) {
                                        //col2 == column_name
                                        //ret["content_object"] = column_value
                                        var temp_html_elem = "#RCE_" + tableID + "_" + col2 + "_" + recordID;
                                        //alert("item name:"+temp_html_elem +"\ncolumn:"+col2+"\nelem val:"+jQuery(temp_html_elem).val());
                                        if (
                                            jQuery(temp_html_elem).length > 0 &&
                                            _pkey._record._list[tt][t_tableID][rr][r_recordID][col2] !== jQuery(temp_html_elem).val()
                                        ) {
                                            changes_made = true;
                                            change_runner += col2 + ":" + jQuery(temp_html_elem).val() + ";\n";
                                            //CHANGE BORDER FOR ELEMENT
                                            jQuery(temp_html_elem).css("border-color", "red");
                                        }
                                        else {
                                            //CHANGE ELEMENT BACK TO NORMAL
                                            jQuery(temp_html_elem).removeAttr("style");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //alert("columns changed:\n"+change_runner);

                }

                if (changes_made === true) {
                    return true;
                }
                else {
                    return false;
                }

                /*
                                var content_columns = pkey._table._get_setting({"tableID": tableID, "settings_name": "content_columns"});
                                var header_columns = pkey._table._get_setting({"tableID": tableID, "settings_name": "header_columns"});
                                var text_output = "";
                                var ret = {};
                                ret["tableID"] = tableID;
                                ret["recordID"] = "N";
                                ret["_TIMESTAMP"] = pkey.get_timestamp();
                                ret["content_object"] = {};
                
                                for (var col in content_columns) {
                                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_N");
                                    var coltitle = content_columns[col]["column_alias"];
                                    ret["content_object"][content_columns[col]["column_slug"]] = data.val();
                                    //text_output += "" + coltitle + ":"+data.val();
                                    text_output += "#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_N";
                                }
                                for (var col in header_columns) {
                                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_N");
                                    var coltitle = header_columns[col]["column_slug"];
                                    ret["content_object"][header_columns[col]["column_slug"]] = data.val();
                                    //text_output += "" + coltitle + ":"+data.val();
                                    text_output += "#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_N";
                                }
                
                */


            }
        },
        _get: function (o){
            if (o) {
                var tableID = "";
                var tabID = "";
                var subtabID = "";
                if (o["tableID"] !== undefined && o["tableID"] !== "") {
                    tableID = o["tableID"];
                    tabID = o["tabID"];
                    subtabID = o["subtabID"];
                    //log("GET_RECORDS pre _pkey._univ_post()");
                    _pkey._univ_post("get_records_by_table", { "tableID": tableID, "tabID": tabID, "subtabID": subtabID }, _pkey._record._get_proc);
                }
            }
        },
        _get_proc: function(o){
            if(typeof o === "object"){
                log(">>_get_proc():");
                log("o:"+JSON.stringify(o));
                if (o["result"] === "no_records") {
                    _pkey._render._record._all_grouped({ "tableID": o["tableID"] });
                }
                else {
                    //console.log("pre place");
                    _pkey._record._place(o);
                    //console.log("post place");
        
                    jQuery(document).ready(function () {
                        //console.log("here");
                        _pkey._render._record._all_grouped({ "tableID": o["tableID"], "tabID": o["tabID"], "subtabID": o["subtabID"] });
                    });
                }
            }
        },
        _ds: function (o) {
            //BREAK DOWN THE OBJ INTO COMPONENT PARTS/RECORDS
            //SEND EACH RECORD TO pkey._record._place();
            //obj["columns"] = {0:"column_name1"}
            //obj["data"] = { 0 : {"column_name1":"value"}}
            //log("_record._ds:");
            //console.log(o);
            if (o) {
                var sender = {}, sx = 0, sx2 = 0;

                if (o["tableID"] !== undefined) {

                    var tableID = o["tableID"];

                    //CONSTRUCT obj["list_data"]
                    //CONSTRUCT obj["list"]
                    sender["list"] = {};
                    sender["list_data"] = {};
                    sender["list"][sx] = {};
                    sender["list_data"][sx] = {};

                    //START THE sender["list"] WITH tableID
                    sender["list"][sx] = "tableID";
                    sender["list_data"][sx]["tableID"] = tableID;
                    sx++;

                    //NOW LOAD THE REST OF THE COLUMNS INTO sender["list"]
                    if (o["columns"] !== undefined) {
                        for (var vx in o["columns"]) {
                            sender["list"][sx] = o["columns"][vx];
                            sx++;
                        }
                    }

                    if (o["data"] !== undefined) {

                        for (var vx in o["data"]) {
                            //FOR EACH RECORD

                            for (var gg = 0; gg < sx; gg++) {
                                //FOR EACH COLUMN
                                sender["list_data"][sender["list"][gg]] = o["data"][vx][sender["list"][gg]];
                                //sx2++;
                            }

                            //ADD THE TABLEID TO THE sender["list_data"]
                            sender["list_data"]["tableID"] = tableID;

                            //SEND PER RECORD
                            //console.log("1****************************************");
                            //console.log(sender);
                            //console.log("1e***************************************");
                            _pkey._record._place(sender);
                        }
                    }
                }
                else {
                    log("_record._ds: no tableID");
                }

            }
        },
        _place: function (o = { timestamp1: null, columns: {}, tableID: null, tabID: null, data: {} }) {
            //place into _list
            var ret = {};
            var timestamp1 = (o["timestamp1"] !== null) ? o["timestamp1"] : null;
            var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
            var tabID = (o["tabID"] !== null) ? o["tabID"] : null;
            var t_tableID = (tableID !== null) ? "T_" + tableID : null;
            var theIDkey = null;
            var theIDval = null;

            ret["timestamp1"] = timestamp1;
            ret["tableID"] = tableID;
            ret["columns"] = {};
            ret["data"] = {};

            //CREATE TABLE ARRAY IN _pkey._record._list
            var rs = {}
            rs["tableID"] = tableID
            var p = _pkey._record._list_table._place(rs);

            if (p === true) {
                //table placed successfully
                //ADD RECORDS TO THE TABLE IN _LIST
            }

            //CHECK COLUMNS
            for (var q in o["columns"]) {
                //CHECK IF THERE IS AN "...ID" COLUMN
                //count string length and subtract 2
                var strl = (o["columns"][q].length - 2);
                if (o["columns"][q].includes("ID", strl)) {
                    theIDkey = o["columns"][q];
                }
                else {
                    ret["columns"][q] = o["columns"][q];
                }
            }

            if (theIDkey !== null) {
                ret["recordIDkey"] = theIDkey;
            }

            //GET THE COLUMN VALUES
            //CHECK FOR ID value
            for (var d in o["data"]) {
                if (o["data"][d].hasOwnProperty(theIDkey)) {
                    theIDval = o["data"][d][theIDkey];
                    var r = "R_" + theIDval;
                    ret["data"][r] = {};
                    for (var cc in ret["columns"]) {
                        ret["data"][r][ret["columns"][cc]] = o["data"][d][ret["columns"][cc]];
                    }
                    //add the recordID column for next part
                    ret["data"][r]["_recordID"] = theIDval;
                }

            }

            //console.log("existssss "+_pkey._record._list_table._exist(rs));
            var rec_exist = false;

            for (var recs in ret["data"]) {
                //each record = ret["data"][recs]
                var r_id = (ret["data"][recs]["_recordID"]) ? "R_" + ret["data"][recs]["_recordID"] : "";
                //console.log("1 RID:" + r_id + " ********************************************");
                for (var t in _pkey._record._list) {
                    if (_pkey._record._list[t].hasOwnProperty(t_tableID)) {
                        //console.log("TABLE YES RECORD YES " + t + ":" + r_id);
                        var table_count = _pkey._record._list[t][t_tableID].length;
                        //console.log("COUNT:" + table_count);
                        if (table_count > 0) {
                            //YES THERE ARE RECORDS IN THIS TABLE,
                            var recflag = false;
                            //match the recordID

                            for (var tr in _pkey._record._list[t][t_tableID]) {
                                //console.log(Object.getOwnPropertyNames(object1).includes("a"));
                                var test3 = _pkey._record._list[t][t_tableID][tr];
                                //var test3arr = Object.getOwnPropertyNames(test3).includes(r_id);
                                //console.log(test3);
                                //console.log("** _pkey._record._list[t][t_tableID][tr]");
                                //console.log(test3);
                                //console.log("** _pkey._record._list[t][t_tableID][tr] props");
                                //console.log(Object.getOwnPropertyNames(test3));

                                //console.log(Object.getOwnPropertyNames(test3).includes(r_id));

                                if (Object.getOwnPropertyNames(test3).includes(r_id) === true) {
                                    //console.log("insert");
                                    //match r_id
                                    //REPLACE IT IF IT MATCHES

                                    pushobj = {};
                                    pushobj[r_id] = {};
                                    pushobj[r_id] = ret["data"][recs];

                                    //set flag
                                    recflag = true;
                                    _pkey._record._list[t][t_tableID].splice(tr, 1);
                                }

                                pushobj = {};
                                pushobj[r_id] = {};
                                pushobj[r_id] = ret["data"][recs];

                                pushobj[r_id]["_tableID"] = tableID;
                                pushobj[r_id]["_tabID"] = tabID;

                                //console.log(_pkey._record._list[t][t_tableID][tr]);
                                //console.log("=====xxx "+tr);

                                //set flag
                                recflag = true;

                                //_pkey._record._list[t][t_tableID].push(pushobj);
                            }
                        }
                        else {
                            //NO THERE ARE NOT ANY RECORDS IN THIS TABLE
                            //console.log("no recs in " + t_tableID);
                            var pushh = {};
                            pushh[r_id] = ret["data"][recs];

                            pushh[r_id]["_tableID"] = tableID;

                            _pkey._record._list[t][t_tableID].push(pushh);
                        }

                        //push here pushobj if rid match
                        //if flag
                        if (recflag === true) {
                            _pkey._record._list[t][t_tableID].push(pushobj);
                        }
                    }

                }
            }

            //else add all the data to the table in _pkey._record._list

            //construct this:
            //T_ID : [ 
            //{
            //R_ID : {
            //column_name:column_value
            //}
            //}
            //]
            return ret;
        },
        _pull: function (obj) {
            //pull by ID
            log("_record._pull:");
            console.log(obj);
            if (obj) {
                var dragID = "";
                var r_record = "", t_table = "";
                if (obj["recordID"]) {
                    r_record = "R_" + obj["recordID"];
                    t_table = "T_" + obj["tableID"];
                    if (pkey._recordset[t_table] !== undefined) {
                        if (pkey._recordset[t_table]["list"][r_record] !== undefined) {
                            console.log('%c_record._pull recordID:' + r_recordID, 'color:red;font-size:24px;');
                            delete pkey._recordset[t_table]["list"][r_record];
                            pkey._recordset[t_table]["cc"]--;
                        }
                    }
                    else {
                        log("_record._pull no t_table in pkey");
                    }
                }
                else {
                    console.log("pkey._recordset.update() no ID sent");
                }
            }
        },
        _save: function (o = { tableID: null, recordID: null }) {
            if (o) {
                var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                var recordID = (o["recordID"] !== null) ? o["recordID"] : null;

                var content_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                var header_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                var text_output = "";
                var ret = {};
                var sender = {};
                //FLAG FOR CHANGES MADE, IF ANY
                var changes_made = false;
                var change_runner = "";

                ret["tableID"] = tableID;
                ret["recordID"] = "N";
                ret["_TIMESTAMP"] = _pkey._get_timestamp();
                ret["content_object"] = {};

                for (var col in content_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = content_columns[col]["column_alias"];
                    ret["content_object"][content_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output = "#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID;
                    //if(data.val() !== "value from DOM"){}
                }
                for (var col in header_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = header_columns[col]["column_slug"];
                    ret["content_object"][header_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output = "#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID;
                }

                //alert(JSON.stringify(o));
                var t_tableID = (tableID !== null) ? "T_" + tableID : null;
                var r_recordID = (recordID !== null) ? "R_" + recordID : null;

                if (_pkey._record._list.length > 0) {
                    //alert('list exist');
                    for (var tt in _pkey._record._list) {
                        if (_pkey._record._list[tt].hasOwnProperty(t_tableID) == true) {
                            //alert("t_tableID yes");
                            for (var rr in _pkey._record._list[tt][t_tableID]) {
                                if (_pkey._record._list[tt][t_tableID][rr].hasOwnProperty(r_recordID) == true) {
                                    //alert("recordID:"+recordID+"\ntableID:"+tableID+"\n"+text_output);
                                    //alert(JSON.stringify(ret["content_object"]));
                                    sender["content_object"] = {};
                                    //FOR EACH ret["content_object"] check if data in element
                                    for (var col2 in ret["content_object"]) {
                                        //col2 == column_name
                                        //ret["content_object"] = column_value
                                        var temp_html_elem = "#RCE_" + tableID + "_" + col2 + "_" + recordID;
                                        //alert("item name:"+temp_html_elem +"\ncolumn:"+col2+"\nelem val:"+jQuery(temp_html_elem).val());
                                        if (
                                            jQuery(temp_html_elem).length > 0 &&
                                            _pkey._record._list[tt][t_tableID][rr][r_recordID][col2] !== jQuery(temp_html_elem).val()
                                        ) {
                                            changes_made = true;
                                            //change_runner += col2 +":"+jQuery(temp_html_elem).val()+";\n";
                                            sender["content_object"][col2] = jQuery(temp_html_elem).val();
                                        }
                                    }
                                }
                            }
                        }
                    }


                }

                if (changes_made === true) {
                    //return true;
                    sender["tableID"] = tableID;
                    sender["recordID"] = recordID;
                    console.log("sender:\n" + JSON.stringify(sender));
                    jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;float:right;color:rgba(10, 10, 200);text-shadow:#CCC;position:absolute;right:300px;'>Saving...</span>");
                    _pkey._univ_post("set_record_content", sender, _pkey._record._update);
                }
                else {
                    //return false;
                    alert("No changes to save");
                }
            }
        },
        _get_values: function (obj) {
            //tableID
            //recordID
            //columns : ["column_title1", "column_title2", ...]
        },
        _update: function (o = { tableID: null, table_target: null, recordID: null }) {
            //DATA INCOMING FROM SAVE RESPONSE
            //UPDATE DOM WITH NEW RECORD VALUES
            //REMOVE HTML ROW ELEMENT
            //RE-RENDER HTML ROW ELEMENT
            //IF WINDOW_ACTION IS NOT CLOSE: UPDATE MODAL WINDOW TEXTBOXES
            if (typeof o === "object") {

                let tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                let recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                let table_target = (o["table_target"] !== null) ? o["table_target"] : null;

                jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;color:rgba(10, 100, 10,1);text-shadow:#CCC;position:absolute;right:300px;'>Saved!</span>");

                setTimeout(function () {
                    jQuery("#tdx_popup_actions_wr").html("<span style='font-weight:bold;font-size:28px;color:rgba(200, 10, 10,1);text-shadow:#CCC;position:absolute;right:300px;'>Reloading data...</span>");
                }, 1500);

                get_table({ "tableID": tableID, "table_target": table_target });
                setTimeout(function () {
                    _pkey._record._open._edit({ "tableID": tableID, "recordID": recordID });
                }, 2000);

            }
        },
        _open: {
            _edit: function (o = { recordID: null, tableID: null }) {
                if (o) {
                    var mode = "e";
                    var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    var recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                    //_pkey._record._set_setting({"settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID });
                    //_pkey._modal._open();
                    _pkey._record._open._render({ "tableID": tableID, "recordID": recordID, "mode": mode })
                }
            },
            _view: function (o = { recordID: null, tableID: null }) {
                //alert(JSON.stringify(o));
                if (o) {
                    var mode = "v";
                    var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    var recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                    //_pkey._record._set_setting({"settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID });
                    //_pkey._modal._open();
                    console.log("!! record open view:::o:");
                    console.log(o);
                    _pkey._record._open._render({ "tableID": tableID, "recordID": recordID, "mode": mode })
                }
            },
            _new: function (o = { recordID: null, tableID: null }) {
                if (o) {
                    var mode = "N";
                    var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    var recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                    //_pkey._record._set_setting({"settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID });
                    //_pkey._modal._open();
                    _pkey._record._open._render({ "tableID": tableID, "recordID": recordID, "mode": mode })
                }
            },
            _render: function (o = { tableID: null, recordID: null, mode: null }) {
                if (o) {
                    var mode = (o["mode"] !== null) ? o["mode"] : null;
                    var tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    var recordID = (o["recordID"] !== null) ? o["recordID"] : null;
                    var mod_window_div = jQuery("#tdx_mod_window_div");
                    var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_val2 = "", this_col_value = "";
                    var onchange_insert = "", item_ID = "";
                    var curr_setting;

                    header_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                    content_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });

                    //IF mode === e (EDIT) THEN curr_setting = "e"
                    if (mode === "e") curr_setting = "e";
                    if (mode === "v") curr_setting = "v";

                    if (recordID === "N") {
                        //NEW RECORD
                        log("record_open:YES NEW RECORD");
                        curr_setting = "N";
                    }
                    //else {
                    //curr_setting = "v";
                    //curr_setting = _pkey._record._get_setting({ "settings_name": "mode", "recordID": recordID, "tableID": tableID });
                    //}

                    //////////ADD field FOR RECORDID
                    send_obj[sox] = {
                        type: "span",
                        content: {
                            parentID: "tdx_mod_window_div",
                            placement_type: "append_innerHTML",
                            inner_text: "<span class='tdx_window_key'>[locked] recordID:</span><span class='tdx_window_val'><input type='textbox' id='tdx_recID' value='" + recordID + "' readonly='' style='color:#666;background:#CCC;border:1px solid #666;' /></span>",
                            class_name: "tdx_column_wrapper1"
                        }

                    };
                    sox++;
                    //////////

                    if (curr_setting === "e" || curr_setting === "N") {
                        //CURRENTLY IN EDIT MODE (NEW record is also edit mode)
                        if (mod_window_div) {
                            //FIRST CLEAR THAT DIV, SO ITS EMPTY
                            mod_window_div.html("");

                            send_obj[sox] = {
                                type: "span",
                                content: {
                                    parentID: "tdx_mod_window_div",
                                    placement_type: "append_innerHTML",
                                    //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                                    class_name: ""
                                }

                            };
                            sox++;
                            //GET COLUMN_HEADERS AND CONTENT_COLUMNS
                            for (var x in header_columns) {
                                if (curr_setting === "N") {
                                    this_col_val2 = "";
                                    this_col_value = "";
                                }
                                else {
                                    this_col_val2 = _pkey._column._get_value({ "tableID": tableID, "column_slug": header_columns[x]["column_slug"], "recordID": recordID });
                                    this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                                }
                                //onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                                //item_ID = String("RCE_" + tableID + "_" + header_columns[x]["column_slug"] + "_" + recordID);
                                /*+ pkey._column_alias[header_columns[x]]*/
                                var key1 = header_columns[x]["column_alias"]; //pkey.column_get_alias(header_columns[x]);
                                var col_type = header_columns[x]["column_type"];
                                var col_slug = header_columns[x]["column_slug"];
                                var col_ii = _pkey._record._open._render_colproc({ "tableID": tableID, "recordID": recordID, "column_slug": col_slug, "column_type": col_type, "column_value": this_col_value });
                                send_obj[sox] = {
                                    type: "span",
                                    content: {
                                        parentID: "tdx_mod_window_div",
                                        placement_type: "append_innerHTML",
                                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + col_ii + "</span>",
                                        class_name: "tdx_column_wrapper1"
                                    }

                                };
                                sox++;
                            }
                            for (var x in content_columns) {
                                if (curr_setting === "N") {
                                    this_col_val2 = "";
                                    this_col_value = "";
                                }
                                else {
                                    this_col_val2 = _pkey._column._get_value({ "tableID": tableID, "column_slug": content_columns[x]["column_slug"], "recordID": recordID });
                                    this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                                }
                                onchange_insert = "onkeyup='javascript:_pkey._record._is_mod({ \"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                                item_ID = String("RCE_" + tableID + "_" + content_columns[x]["column_slug"] + "_" + recordID);
                                var key1 = content_columns[x]["column_alias"]; //pkey.column_get_alias(content_columns[x]);
                                var col_type = content_columns[x]["column_type"];
                                var col_slug = content_columns[x]["column_slug"];
                                var col_ii = _pkey._record._open._render_colproc({ "tableID": tableID, "recordID": recordID, "column_slug": col_slug, "column_type": col_type, "column_value": this_col_value });
                                send_obj[sox] = {
                                    type: "span",
                                    content: {
                                        parentID: "tdx_mod_window_div",
                                        placement_type: "append_innerHTML",
                                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + col_ii + "</span>",
                                        class_name: "tdx_column_wrapper1"
                                    }

                                };
                                sox++;
                            }

                            pkey.elem_do(send_obj);
                            //MODIFY SAVE BUTTONS
                            //MODIFY CLOSE BUTTONS/ICONS

                            //mod_window_div.html("PUT IT RIGHT HERE");
                        }
                        _pkey._modal._buttons({ "mode": "e", "tableID": tableID, "recordID": recordID });
                    }
                    if (curr_setting === "v") {
                        //CURRENTLY IN VIEW MODE
                        if (mod_window_div) {

                            //FIRST CLEAR THAT DIV, SO ITS EMPTY
                            mod_window_div.html("");

                            send_obj[sox] = {
                                type: "span",
                                content: {
                                    parentID: "tdx_mod_window_div",
                                    placement_type: "append_innerHTML",
                                    //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                                    class_name: ""
                                }

                            };
                            sox++;
                            //GET COLUMN_HEADERS AND CONTENT_COLUMNS
                            for (var x in header_columns) {
                                this_col_val2 = _pkey._column._get_value({ "tableID": tableID, "column_slug": header_columns[x]["column_slug"], "recordID": recordID });
                                this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                                var key1 = header_columns[x]["column_alias"]; //pkey.column_get_alias(header_columns[x]);
                                send_obj[sox] = {
                                    type: "span",
                                    content: {
                                        parentID: "tdx_mod_window_div",
                                        placement_type: "append_innerHTML",
                                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
                                        class_name: "tdx_column_wrapper"
                                    }

                                };
                                sox++;
                            }
                            for (var x in content_columns) {
                                this_col_val2 = _pkey._column._get_value({ "tableID": tableID, "column_slug": content_columns[x]["column_slug"], "recordID": recordID });
                                this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                                var key1 = content_columns[x]["column_alias"]; //pkey.column_get_alias(content_columns[x]);
                                send_obj[sox] = {
                                    type: "span",
                                    content: {
                                        parentID: "tdx_mod_window_div",
                                        placement_type: "append_innerHTML",
                                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
                                        class_name: "tdx_column_wrapper"
                                    }

                                };
                                sox++;
                            }
                            _pkey._elem_do(send_obj);
                            //MODIFY SAVE BUTTONS
                            //MODIFY CLOSE BUTTONS/ICONS

                            //mod_window_div.html("PUT IT RIGHT HERE");
                        }
                        //SHOW EDIT BUTTON
                        _pkey._modal._buttons({ "mode": "v", "tableID": tableID, "recordID": recordID });
                    }
                }
            },
            _render_colproc: function (obj) {
                if (obj) {
                    var itemID, tableID, recordID, column_type, column_slug, return_text, onchange_insert, column_value, closing_tag;

                    tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                    recordID = (obj["recordID"] !== undefined) ? obj["recordID"] : "";
                    column_type = (obj["column_type"] !== undefined) ? obj["column_type"] : "";
                    column_value = (obj["column_value"] !== undefined) ? obj["column_value"] : "";
                    column_slug = (obj["column_slug"] !== undefined) ? obj["column_slug"] : "";
                    onchange_insert = "onkeyup='javascript:_pkey._record._is_mod({\"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });' ";
                    closing_tag = false;
                    //<input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " />

                    item_ID = String("RCE_" + tableID + "_" + column_slug + "_" + recordID);

                    //START BUILDING THE INPUT ELEMENT
                    return_text = "<";
                    if (column_type === "textbox") {
                        return_text += "input type='text' ";
                    }
                    if (column_type === "password") {
                        return_text += "input type='password' ";
                    }
                    if (column_type === "checkbox") {
                        return_text += "input type='checkbox' ";
                    }
                    if (column_type === "textarea") {
                        return_text += "textarea ";
                    }

                    //SLAP ON THE ID AND NAME
                    return_text += "ID='" + item_ID + "' name='" + item_ID + "' ";

                    //HANDLE THE ONCHANGE
                    return_text += onchange_insert;

                    //APPLY THE VALUE IF THERE IS ONE
                    if (column_type === "textbox" ||
                        column_type === "password" ||
                        column_type === "checkbox"
                    ) {
                        return_text += "value='" + column_value + "' /> ";
                    }
                    else if (column_type === "textarea") {
                        return_text += ">" + column_value + "</textarea>";
                    }

                    return return_text;
                }
            }
        },
        _get_setting: function (obj) {
            if (obj) {
                //obj["recordID"]
                //obj["tableID"]
                //obj["settings_name"]
                log("_pkey._record._get_setting:" + JSON.stringify(obj));
                var ret = "", settings_name = "", tableID = "", recordID = "";

                if (obj["settings_name"]) {
                    settings_name = obj["settings_name"];
                }
                if (obj["tableID"]) {
                    tableID = "T_" + obj["tableID"];
                }
                if (obj["recordID"]) {
                    recordID = "R_" + obj["recordID"];
                }

                //ret = "ID is this:"+ID;

                if (pkey._recordset[tableID]["list"][recordID] !== undefined) {
                    if (
                        pkey._recordset[tableID]["list"][recordID]["_SETTINGS"] !== undefined &&
                        pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] !== undefined
                    ) {

                        ret = pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name];
                    }
                }

                return ret;
            }
        },
        _set_setting: function (obj) {
            if (obj) {
                //obj["ID"]
                //obj["table_name"]
                //obj["settings_name"]
                //obj["settings_value"]
                log("pkey.record_set_setting:" + JSON.stringify(obj));
                var ret = "", settings_name = "", settings_value = "", tableID = "", recordID = "";

                if (obj["settings_name"]) {
                    settings_name = obj["settings_name"];
                }
                if (obj["settings_value"]) {
                    settings_value = obj["settings_value"];
                }
                if (obj["tableID"]) {
                    tableID = "T_" + obj["tableID"];
                }
                if (obj["recordID"]) {
                    recordID = "R_" + obj["recordID"];
                }

                //ret = "ID is this:"+ID;
                if (pkey._recordset !== undefined && pkey._recordset[tableID] !== undefined && pkey._recordset[tableID]["list"] !== undefined) {
                    if (pkey._recordset[tableID]["list"][recordID] !== undefined) {
                        if (
                            pkey._recordset[tableID]["list"][recordID]["_SETTINGS"] !== undefined &&
                            pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] !== undefined
                        ) {

                            pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] = settings_value;

                        }
                    } else {
                        log("pkey.record_set_setting: fail 2");
                    }
                }
                else {
                    log("pkey.record_set_setting: fail 1");
                }


                return ret;
            }
        },
        _exists: function (o) {
            if (typeof o === "object") {
                var tableID = (o["tableID"] !== undefined) ? o["tableID"] : "";
                var recordID = (o["recordID"] !== undefined) ? o["recordID"] : "";
                var pas = false;

                var t_tableID = (tableID !== "") ? "T_" + tableID : "";
                var r_recordID = (recordID !== "") ? "R_" + recordID : "";

                for (var y in _pkey["_record"]["_list"]) {
                    for (var z in _pkey["_record"]["_list"][y]) {
                        if (_pkey["_record"]["_list"][y][z].hasOwnProperty(r_recordID)) {
                            pas = true;
                        }
                    }
                }

                if (pas === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    },
    _render: {
        _settings: {
            _full_screen: function (o) {
                // RENDER THE SETTINGS SCREEN
                //TABS
                //TABLES
                //DEVICES
                //ETC
                if (typeof o == "object") {
                    //alert("load settings");

                    //RENDER TABLES
                    _pkey._render._settings._table._all();

                    //RENDER TABS
                    _pkey._render._settings._tab._all();

                }

            },
            _tab: {
                _all: function () {
                    //alert('tab all');
                    //let navtabs = jQuery(".nav-tabs");
                    //navtabs.appendWith("<li><a href='ss'>TAB</a></li>");

                    let tab_list = _pkey._tab._list;
                    //alert(JSON.stringify(tab_list));
                    let tlx = tab_list.length || 0;
                    if (tlx > 0) {
                        //PLACE UL
                        //alert('greater than 0');
                        jQuery("#tsbp_settings_tab").html("");
                        let runner = "<ul style='margin-left:25px;' id='tdx_settings_tab_ul'></ul>";
                        jQuery("#tsbp_settings_tab").append(runner);

                        for (let x = 0; x < tlx; x++) {
                            _pkey._render._settings._tab._single(tab_list[x]);
                        }

                        let trefresh = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._tab._get();'><i class='fa fa-refresh'></i> Refresh</a></span>";
                        jQuery("#tdx_tabs").html("Tabs<span class='tdx_settings_tab_hsidetext_addnew'><a href='javascript:_pkey._render._settings._tab._addnew();'>+ Add New Tab</a></span>" + trefresh);
                    }
                },
                _single: function (o) {
                    //LOAD SINGLE TAB INTO SETTINGS AREA
                    //let runner = "<ul style='margin-left:25px;' id='tdx_settings_tab_ul'>";
                    let runner = "";

                    if (typeof o === "object") {
                        for (let y in o) {
                            //ESTABLISH tabID 
                            let tabID = (o[y]["tabID"] !== undefined) ? o[y]["tabID"] : null;
                            let saves = " <a href='javascript:_pkey._tab._settings_save(\"" + tabID + "\");'>SAVE</a>";
                            let del = " <a href='javascript:_pkey._tab._settings_del(\"" + tabID + "\");'>DEL</a>";
                            let buttons = "<span class='tdx_buttons'>" + saves + del + "</span>";
                            runner += "<li style='border:thin solid #CCC;padding:15px;' id='tdx_tab_li__" + tabID + "'>";

                            //SORT THRU THE tab validator
                            for (let x = 0; x < _pkey._validators._tab_columns.length; x++) {

                                let thekey = _pkey._validators._tab_columns[x];
                                let theval = o[y][thekey];
                                var tab_obj = {};
                                tab_obj["thekey"] = thekey;
                                tab_obj["theval"] = theval;

                                //tab_obj["thekey"] = thekey;
                                tab_obj["tabID"] = tabID;
                                tab_obj["x"] = x;

                                //CHECK FOR ANY OBJECTS ATTACHED AND ADD THEM TO THE subobj
                                /*if (typeof o[y][thekey] === "object") {
                                    let z = 0;
                                    tab_obj["subobj"] = {};
                                    for (let tobj in o[y][thekey]) {
                                        tab_obj["subobj"][z] = {};
                                        tab_obj["subobj"][z][o[y][thekey][tobj]] = "";
                                        z++;
                                    }
                                }*/

                                //runner += "<pre>"+JSON.stringify(tab_obj)+"</pre>";

                                //SEND TO THE TAB ELEMENT GENERATOR
                                var tab_item_output = _pkey._render._settings._tab._elem_generator(tab_obj);
                                runner += tab_item_output;

                                /*
                                if (thekey === "tab_subtabs" || thekey === "tab_auths" || thekey === "description") {
                                    
                                    //CHECK IF ITS AN OBJECT
                                    if (typeof o[y][thekey] === "object") {
                                        ////////// BREAK DOWN THE OBJECT//////////////////////////////////////////////////////////////////////////
                                        runner += "<div class='tdx_tabs_div'><div class='tdx_tab_key'>" + thekey + " : </div></div>";
                                        runner += "<div id='tdxt_" + tabID + "__" + thekey + "' class='tdx_tabs_div tdx_subtab_list'>";
                                        let tb = 0;
                                        //for (let tobj2 in o[y][thekey]) { tb++; }
                                        //if(tb > 0){ runner += "<div>HEY</div>"; }
                                        for (let tobj in o[y][thekey]) {
                                            runner += "<div class='tdx_tabs_wrapper'><div class='tdx_number'><strong>" + z + " : </strong></div></div>";
                                                for (let tobj2 in o[y][thekey][tobj]) {
                                                    let temp_value = o[y][thekey][tobj][tobj2];
                                                    let key_html_content = "<div class='tdx_key'>" + tobj2 + " : </div>";
                                                    let value_html_content = "<div class='tdx_value'><input class='tdx_tab_subtab_inputs__"+tabID+"' type='textbox' id='"+ tabID +"__" + tobj2 + "__" +  z + "' value='" + temp_value + "' /></div>";
                                                    /////////////////////////////" + load_arr3[f] + "__" + tabID + "__" + subtab + "__" +tdxt_c + "
                                                    ////APPEND TO runner ///////
                                                    runner += "<div class='tdx_tabs_wrapper'>" + key_html_content + " " + value_html_content + "</div>";
                                                    ////////////////////////////
                                                }
                                                z++;
                                        }
                                        runner += "</div>";
                                        runner += "<div class='tdx_tabs_wrapper'>";
                                        runner += "<div class='tdx_key'>&nbsp;</div>";
                                        runner += "<div class='tdx_value'><a href='javascript:_pkey._render._settings._tab._sub_addnew(\"" + tabID + "\",\"" + thekey + "\")'>+ Add New</a></div>";
                                        runner += "</div>";

                                        ////////////////////////////    APPEND THE COUNTER TEXTBOX TO THE RUNNER
                                        runner += "<div class='tdx_tabs_wrapper'><div class='tdx_key'>&nbsp;</div><div class='tdx_value'><input type='textbox' value='" + z + "' id='tdxt_c" + tabID + "__" + thekey + "' readonly /></div></div>";
                                        ////////////////////////////       
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        //runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><textarea class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px' readonly style='background:#CDCDCD;'>" + JSON.stringify(o[y][thekey]) + "</textarea></span></div>";
                                        //////HIDE
                                    }
                                    else {
                                        if (o[y][thekey] === undefined) { o[y][thekey] = ""; }
                                        runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><textarea class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px'>" + o[y][thekey] + "</textarea></span></div>";
                                    }
                                }
                                else {
                                    let readonly1 = "";
                                    //QUICK CHECK FOR tabID, MAKE READONLY ////////////
                                    if (thekey == "tabID") { readonly1 = "readonly"; }
                                    ///////////////////////////////////////////////////
                                    runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><input type='textbox' class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px' value='" + o[y][thekey] + "' " + readonly1 + " /></span></div>";
                                }*/

                            }
                            runner += buttons;
                            runner += "</li>";
                        }
                        //runner += "</ul>";
                    }
                    jQuery("#tdx_settings_tab_ul").append(runner);
                },
                _elem_generator: function (o = { "tabID": null, "x": 0, "thekey": null, "theval": "" }) {
                    var runner = "";
                    let tabID = (o["tabID"] !== null) ? o["tabID"] : null;
                    let x1 = (o["x"] !== null) ? o["x"] : 0;
                    let thekey = (o["thekey"] !== null) ? o["thekey"] : null;
                    let theval = (o["theval"] !== undefined) ? o["theval"] : "";
                    //SORT THROUGH THE incoming object
                    if (thekey === "tab_subtabs" || thekey === "tab_auths" || thekey === "description") {
                        let z = 0;
                        //CHECK IF ITS AN OBJECT
                        if (o["theval"] !== "" && typeof o["theval"] === "object") {
                            ////////// BREAK DOWN THE OBJECT//////////////////////////////////////////////////////////////////////////
                            runner += "<div class='tdx_tabs_div'><div class='tdx_tab_key'>" + thekey + " : </div></div>";
                            runner += "<div id='tdxt_" + tabID + "__" + thekey + "' class='tdx_tabs_div tdx_subtab_list'>";
                            for (let tobj in o["theval"]) {
                                /////////////////////////////////////// SETTINGS AREA TAB_SUBTABS DELETE BUTTON ///////////
                                let icon1 = "<i class='fa fa-trash'></i>";
                                let button1 = "<a href='javascript:_pkey._render._settings._tab._subtab_del(\"" + tabID + "\",\"" + z + "\",\"" + thekey + "\");'>" + icon1 + "</a> ";
                                ///////////////////////////////////////////////////////////////////////////////////////////
                                runner += "<div id='tdxsett_subtab__" + tabID + "__" + tobj + "'><div class='tdx_tabs_wrapper'><div class='tdx_number'><span class='tdx_sett_btn_gray'>" + button1 + "</span>";
                                runner += "<strong>" + z + " : </strong></div></div>";
                                for (let tobj2 in o["theval"][tobj]) {
                                    let temp_value = (o["theval"][tobj][tobj2] !== null) ? o["theval"][tobj][tobj2] : "";
                                    let key_html_content = "<div class='tdx_key'>" + tobj2 + " : </div>";
                                    let value_html_content = "<div class='tdx_value'>";
                                    let readonly1 = "";
                                    /////////////////////////////////////////////////////////////////////////
                                    /////////////////////////////grab subtabID and tabID regardless /////////
                                    if (tobj2 === "subtabID" || tobj2 == "tabID") {   /////////////////////////
                                        readonly1 = "readonly='readonly'";          /////////////////////////
                                    }                                               /////////////////////////
                                    /////////////////////////////////////////////////////////////////////////
                                    /////////////////////////////////////////////////////////////////////////

                                    if (tobj2 === "subtab_type") {
                                        //let tablelist1 = _pkey._table._get_all_as_array();
                                        let types22 = ["tabledata", "calendar"];

                                        value_html_content += "<select id='" + tabID + "__" + tobj2 + "__" + z + "' class='tdx_tab_subtab_inputs__" + tabID + "'>";

                                        for (let tcc = 0; tcc < types22.length; tcc++) {
                                            let sell2 = "";
                                            if (types22[tcc] === o["theval"][tobj][tobj2]) { sell2 = " selected='selected'"; }
                                            value_html_content += "<option value='" + types22[tcc] + "' " + sell2 + ">" + types22[tcc] + "</option>";
                                        }
                                        value_html_content += "</select>";
                                    }

                                    else if (tobj2 === "subtab_tableID") {
                                        let tablelist1 = _pkey._table._get_all_IDs_as_array();
                                        //value_html_content += JSON.stringify(tablelist1);
                                        value_html_content += "<select id='" + tabID + "__" + tobj2 + "__" + z + "' class='tdx_tab_subtab_inputs__" + tabID + "'>";
                                        for (let g = 0; g < tablelist1.length; g++) {
                                            let sel = "";
                                            let ttemp = _pkey._table._get_alias({ "tableID": tablelist1[g] });
                                            let ttext = tablelist1[g] + " : " + ttemp;
                                            if (temp_value == tablelist1[g]) { sel = " selected='selected'"; }
                                            value_html_content += "<option value='" + tablelist1[g] + "'" + sel + ">" + ttext + "</option>";
                                        }
                                        value_html_content += "</select>";
                                    }
                                    else {
                                        value_html_content += "<input class='tdx_tab_subtab_inputs__" + tabID + "' type='textbox' id='" + tabID + "__" + tobj2 + "__" + z + "' value='" + temp_value + "' " + readonly1 + " />";
                                    }

                                    value_html_content += "</div>";

                                    ////APPEND TO runner ///////
                                    runner += "<div class='tdx_tabs_wrapper'>" + key_html_content + " " + value_html_content + "</div>";
                                    ////////////////////////////
                                }
                                z++;
                                runner += "</div>";
                            }
                            runner += "</div>";
                            runner += "<div class='tdx_tabs_wrapper'>";
                            runner += "<div class='tdx_key'>&nbsp;</div>";
                            runner += "<div class='tdx_value'><a href='javascript:_pkey._render._settings._tab._sub_addnew(\"" + tabID + "\",\"" + thekey + "\")'>+ Add New</a></div>";
                            runner += "</div>";

                            ////////////////////////////    APPEND THE COUNTER TEXTBOX TO THE RUNNER
                            runner += "<div class='tdx_tabs_wrapper'><div class='tdx_key'>&nbsp;</div><div class='tdx_value'><input type='textbox' value='" + z + "' id='tdxt_c" + tabID + "__" + thekey + "' readonly /></div></div>";
                            ////////////////////////////       
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////
                            //runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><textarea class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px' readonly style='background:#CDCDCD;'>" + JSON.stringify(o[y][thekey]) + "</textarea></span></div>";
                            //////HIDE
                        }
                        else {
                            if (theval === null) { theval = ""; }
                            runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><textarea class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px'>" + theval + "</textarea></span></div>";
                        }
                    }
                    else {
                        let readonly1 = "";
                        //QUICK CHECK FOR tabID, MAKE READONLY ////////////
                        if (thekey == "tabID") { readonly1 = "readonly"; }
                        ///////////////////////////////////////////////////
                        runner += "<div class='tdx_tabs_div'><span class='tdx_tab_key'>" + thekey + " : </span><span class='tdx_tab_val'><input type='textbox' class='tdx_tab_inputs__" + tabID + "' id='" + thekey + "__" + tabID + "' width='150px' value='" + theval + "' " + readonly1 + " /></span></div>";
                    }
                    return runner;
                },
                _addnew: function () {
                    //alert('addnew');
                    let runner = "<div><span>tabID : </span><span><input type='textbox' placeholder='[System Generated]' value='' readonly='readonly' id='tabID__N' class='tdx_tab_inputs__N' /></span></div>";
                    runner += "<div><span>tab_alias : </span><span><input type='textbox' id='tab_alias__N' class='tdx_tab_inputs__N' /></span></div>";
                    runner += "<div><span>tab_slug : </span><span><input type='textbox' id='tab_slug__N' class='tdx_tab_inputs__N' /></span></div>";
                    runner += "<div><span>tab_type : </span><span><input type='textbox' id='tab_type__N' class='tdx_tab_inputs__N' /></span></div>";
                    runner += "<div><span>tab_icon : </span><span><input type='textbox' id='tab_icon__N' class='tdx_tab_inputs__N' /></span></div>";
                    runner += "<div><span>tab_subtabs : </span><span><textarea id='tab_subtabs__N' class='tdx_tab_inputs__N' ></textarea></span></div>";
                    runner += "<div><span>tab_auths : </span><span><textarea id='tab_auths__N' class='tdx_tab_inputs__N' ></textarea></span></div>";
                    runner += "<div><span>description : </span><span><textarea id='description__N' class='tdx_tab_inputs__N' ></textarea></span></div>";
                    runner += "<div><span><input type='button' value='Save' onclick='javascript:_pkey._tab._settings_save(\"N\");'> <input type='button' value='Delete' onclick='javascript:_pkey._tab._settings_del(\"N\");'></span><span></span></div>";
                    jQuery("#tdx_settings_tab_ul").prepend("<li style='border:thin solid #006600;padding:15px' id='tdx_tab_li__N'>" + runner + "</li>");
                },
                _sub_addnew: function (tabID1, subtab1) {
                    let subtab = (subtab1 !== undefined) ? subtab1 : null;

                    if (subtab == "tab_subtabs") {
                        let load_arr3 = [
                            "subtabID",
                            "tabID",
                            "subtab_title",
                            "subtab_icon",
                            "subtab_type",
                            "subtab_filter",
                            "subtab_tableID",
                            "subtab_auths"
                        ];
                        //alert(tabID);
                        //tdxt_2__tab_subtabs
                        let tabID = (tabID1 !== undefined) ? tabID1 : null;
                        let subtab = (subtab1 !== undefined) ? subtab1 : null;
                        let g = "#tdxt_c" + tabID + "__" + subtab;
                        let tdxt_c = jQuery(g).val(); //  alert(g + ":" + tdxt_c);
                        let tdxtID = "#tdxt_" + tabID + "__" + subtab;
                        let runner = "";

                        let icon1 = "<a href='javascript:_pkey._render._settings._tab._subtab_del(\"" + tabID + "\",\"N\",\"" + subtab + "\")'><i class='fa fa-trash'></i></a>";

                        runner += "<div class='tdxsett_subtab__" + tabID + "__N'>";
                        runner += "<div class='tdx_tabs_wrapper'>";
                        runner += "<div class='tdx_number'><span class='tdx_sett_btn_gray'>" + icon1 + "</span><strong>" + tdxt_c + " : </strong></div>";
                        runner += "</div>";
                        ///////// ADD THE ITEMS HERE
                        for (let f = 0; f < load_arr3.length; f++) {
                            var input_element = "";
                            var readonly1 = "";
                            var vall = "";

                            /////////////////certain fields are READONLY//////////////////
                            if (load_arr3[f] == "subtabID") {
                                readonly1 = " readonly='readonly' ";
                                vall = " placeholder='[System Generated]' ";
                            }
                            else if (load_arr3[f] == "tabID") {
                                readonly1 = " readonly='readonly' ";
                                vall = " value='" + tabID + "' ";
                            }
                            else {
                                readonly1 = "";
                                vall = "";
                            }
                            //////////////////////////////////////////////////////////////

                            /////////////////input_element is textbox or select menu ///////////////////////
                            //input_element = "<input type='textbox' class='tdx_tab_inputs__"+tabID+"' id='" + tabID + "__" + load_arr3[f] + "__" +tdxt_c + "' "+vall + readonly1+" />";
                            input_element = "<input type='textbox' class='' id='" + tabID + "__" + load_arr3[f] + "__" + tdxt_c + "' " + vall + readonly1 + " />";

                            if (load_arr3[f] === "subtab_type") {

                                let types22 = ["tabledata", "calendar"];

                                input_element = "<select id='" + tabID + "__" + load_arr3[f] + "__" + tdxt_c + "' class=''>";

                                for (let tcc = 0; tcc < types22.length; tcc++) {
                                    input_element += "<option value='" + types22[tcc] + "'>" + types22[tcc] + "</option>";
                                }
                                input_element += "</select>";
                            }

                            /////////change input_element to select menu if its a subtab_tableID ////////////
                            if (load_arr3[f] == "subtab_tableID") {
                                //input_element = "<input type='textbox' class='tdx_tab_inputs__' id='" + load_arr3[f] + "__" + tabID + "__"+tdxt_c + "' "+vall + readonly1+" />";

                                input_element = "<select id='" + tabID + "__" + load_arr3[f] + "__" + tdxt_c + "' class=''>";
                                var tabless = _pkey._table._get_all_IDs_as_array();
                                for (var zz = 0; zz < tabless.length; zz++) {
                                    var outpp = tabless[zz];
                                    var table_alias1 = _pkey._table._get_alias({ "tableID": outpp });

                                    input_element += "<option value='" + outpp + "'>" + outpp + " : " + table_alias1 + "</option>";
                                }
                                input_element += "</select>";
                            }
                            ////////////////////////////////////////////////////////////////////////////////
                            runner += "<div class='tdx_tabs_wrapper'>"
                                + "<div class='tdx_key'>" + load_arr3[f] + " : </div>"
                                + "<div class='tdx_value'>" + input_element + "</div>"
                                + "</div>";
                            ///////// subtab_title 
                            ///////// subtab_icon 
                            ///////// subtab_id 
                            ///////// subtab_type 
                            ///////// subtab_table 
                        }

                        /////////
                        runner += "</div>";
                        runner += "</div>";

                        jQuery(tdxtID).append(runner);
                        let tdxt_ccc = Number(tdxt_c) + 1;
                        jQuery(g).val(tdxt_ccc);
                    }
                },
                _subtab_del: function (tabID1, z1, tab_item1) {
                    //let z = (z1 !== undefined) ? z1 : null;
                    let tabID = (tabID1 !== undefined) ? tabID1 : null;
                    let z = (z1 !== undefined) ? z1 : null;
                    let tab_item = (tab_item1 !== undefined) ? tab_item1 : null;
                    //alert("Deleting subtab ::tabID:"+tabID+"; z"+z +" tabitem:"+tab_item);
                    if (tabID && z) {
                        if (confirm("Are you sure you want to delete this subtab?") === true) {
                            if (z === "N") {
                                //was new
                                //alert('new');
                                //tdxsett_subtab__1__N
                                jQuery(".tdxsett_subtab__" + tabID + "__N").html("");
                                //SUBTRACT 1 FROM THE COUNTER
                                //tdxt_c1__tab_subtabs
                                let idd = "#tdxt_c" + tabID + "__" + tab_item;
                                let tabc = Number(jQuery(idd).val());
                                tabc--;
                                jQuery(idd).val(tabc);
                            }
                            else {
                                //construct object to send for deletions
                                //alert('yes was pressed');
                                let sendobj = {};
                                let subtabID = jQuery("#" + tabID + "__subtabID__" + z).val();
                                sendobj["subtabID"] = subtabID;
                                sendobj["tabID"] = tabID;
                                //alert(JSON.stringify(sendobj));
                                _pkey._univ_post("del_subtab", sendobj, _pkey._render._settings._tab._subtab_del_proc);
                            }
                        }
                    }
                    else {
                        //CANNOT CONTINUE NO IDS WERE GIVEN

                    }
                },
                _subtab_del_proc: function (o) {
                    if (typeof o === "object") {
                        if (o["result"] == "true" || o["result"] == true) {
                            //alert('result is true, get tabs');
                            _pkey._tab._get();
                        }
                    }
                }
            },
            _table: {
                _all: function () {
                    let runner = "";
                    let target1 = ".tsbp_settings_tableswr";
                    let arr = _pkey._validators._table_columns;
                    //GET TABLES AS ARRAY
                    let o = _pkey._table._get_all_as_array();
                    //alert('Bro you have:'+JSON.stringify(o));
                    //FOR EACH ITEM IN ARRAY, OUTPUT TO SETTINGS AREA
                    if (arr.length > 0) {
                        let addnewtable = "<span class='tdx_settings_tab_hsidetext_addnew'><a href='javascript:_pkey._render._settings._table._addnew();'>+ Add New Table</a></span>";
                        let refresh = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._all();'><i class='fa fa-refresh'></i> Refresh</a></span>";
                        //CLEAR THE DIV FIRST
                        jQuery(target1).html("");
                        runner = "<h4 id='tdx_tables'>Tables " + addnewtable + refresh + "</h4>";
                        runner += "<ul class='tdx_sett_ul' style='margin-left:25px;'>";

                        jQuery(target1).html(runner);

                        for (let y in o) {
                            _pkey._render._settings._table._single(o[y]);
                        }

                        runner += "</ul>";
                        //jQuery("#"+target1).append("<input type='button' value='Click' onclick='javascript:_pkey._univ_post_promise(\"get_table\",{});' />");
                    }
                    else {
                        //NO TABLES RETURNED FROM _PKEY._TABLE._GET_ALL_AS_ARRAY()
                        jQuery(target1).html("<div>No tables returned, <a href='javascript:_pkey._table._get();'>try again</a></div>");
                    }
                    //jQuery("#"+target1).append("<pre>"+JSON.stringify(o)+"</pre>");
                    //jQuery(target1).append("<input type='button' value='Click' onclick='javascript:_pkey._test_post(\"get_table\",{},_pkey._table._get_proc);' />");
                },
                _single: function (o) {
                    if (typeof o === "object") {
                        let target1 = ".tdx_sett_ul";
                        let runner = "";
                        let tableID = o["tableID"] || null;
                        let inputelem = "";
                        let sav = "";
                        let del = "";

                        runner += "<li class='tdx_ul_table_li' id='tdxsett_tablesli_" + tableID + "'>";
                        for (let each_table in o) {
                            for (let column in o[each_table]) {
                                if (column == "tableID") { tableID = o[each_table][column]; }
                            }
                        }
                        for (let each_table in o) {
                            for (let column in o[each_table]) {
                                //CHECK FOR ID COLUMN, MAKE READONLY
                                let readonly = "";
                                let val = o[each_table][column];

                                if (column === "tableID") { readonly = " readonly='readonly'"; }
                                if (typeof o[each_table][column] === "object") {
                                    val = JSON.stringify(val, null, 1);
                                    inputelem = "<span class='tdx_tab_val_sub' id='tdx_"+column+"__"+tableID+"'>";
                                    inputelem += _pkey._render._settings._table._settings_object._place({"tableID":tableID});
                                    inputelem += "</span>";
                                    //inputelem = "<textarea class='tdxsett_tables__" + tableID + "' id='tdxsett_tables_" + tableID + "_" + column + "' name='tdxsett_tables_" + tableID + "_" + column + "'" + readonly + ">" + val + "</textarea>";
                                }
                                else {
                                    inputelem = "<span class='tdx_tab_val' id='tdx_"+column+"__"+tableID+"'>";
                                    inputelem += "<input class='tdxsett_tables__" + tableID + "' type='textbox' value='" + val + "' id='tdxsett_tables_" + tableID + "_" + column + "' name='tdxsett_tables_" + tableID + "_" + column + "'" + readonly + "/>";
                                    inputelem += "</span>";
                                }

                                /////////////////////////////////////////
                                //EXCLUDE THESE
                                if (column !== "_CHECKSUM") {
                                    runner += "<div class='tdx_tables_div'>";
                                    runner += "<span class='tdx_tab_key'><label for='tdxsett_tables_" + tableID + "_" + column + "'>" + column + " :</label></span>" + inputelem + "</div>";
                                }
                                /////////////////////////////////////////

                            }

                        }
                        sav = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._save_settings(\"" + tableID + "\");'><i class='fa fa-floppy-o'></i> Save</a></span>";
                        del = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._del(\"" + tableID + "\");'><i class='fa fa-trash'></i> Delete</a></span>";
                        runner += "" + sav + del;
                        runner += "</li>";
                        //log("pkey render settings table _single runner:" + runner);

                        jQuery(target1).append(runner);

                    }
                },
                _addnew: function () {
                    let readonly = "", extra = "";
                    let target1 = ".tdx_sett_ul";
                    let content = "<li id='tdxsett_tablesli_N' class='tdx_ul_table_li'>";
                    let sav = "";
                    let del = "";
                    let arr = _pkey._validators._table_columns;

                    if (arr.length > 0) {
                        for (let u = 0; u < arr.length; u++) {
                            readonly = "";
                            extra = "";
                            if (arr[u] === "tableID") { readonly = " readonly='readonly'"; extra = " placeholder='[System Generated]'"; }
                            let input1 = "";
                            sav = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._save(\"N\");'><i class='fa fa-floppy-o'></i> Save</a></span>";
                            del = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._del(\"N\");'><i class='fa fa-trash'></i> Delete</a></span>";
                            input1 = "<input type='textbox' class='tdxsett_tables__N' id='tdxsett_tables_N_" + arr[u] + "' name='tdxsett_tables_N_" + arr[u] + "' " + readonly + extra + "  />";
                            content += "<div class='tdx_tables_div'>";
                            content += "<span class='tdx_tab_key'><label for='tdxsett_tables_N_" + arr[u] + "'>" + arr[u] + " :</label></span><span class='tdx_tab_val'>" + input1 + "</span>";
                            content += "</div>";
                        }


                    }
                    content += sav + del;
                    content += "</li>";

                    jQuery(target1).prepend(content);
                },
                _save: function (tableID) {
                    if (tableID) {
                        let callout = ".tdxsett_tables__" + tableID;
                        let sendobj = {};
                        let rem = "tdxsett_tables_" + tableID + "_";
                        jQuery(callout).each(function () {
                            let idd = jQuery(this).attr("id");
                            let idss = idd.slice(rem.length);
                            let val = jQuery(this).val();
                            //REMOVE LINE BREAKS FROM TEXTAREA
                            if (jQuery(this).is("textarea")) {
                                val = val.replace(/[\n\r\t]/g, "");
                            }
                            //alert(idd +":"+val);

                            sendobj[idss] = val;
                        });
                        //DO THE SAVE
                        _pkey._univ_post("set_table", sendobj, _pkey._render._settings._table._save_proc);
                    }
                },
                _save_proc: function (o) {
                    if (typeof o === "object") {
                        if (o["result"] == true) {
                            //RELOAD SETTINGS TABLES
                            _pkey._render._settings._table._all();
                        }
                    }
                },
                _del: function (tableID) {
                    if (tableID !== undefined) {
                        if (confirm("Are you sure you want to delete this?")) {
                            alert('you clicked yes');
                        }
                    }
                },
                _display_settings: function (o = { tableID: null, table_target: null }) {
                    if (typeof o === "object") {
                        var tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                        var table_target = (o["table_target"] !== undefined) ? o["table_target"] : null;
                        //var tableID = (o["tableID"] !== undefined) ? o["tableID"] : null;
                        var win_body = jQuery("#tdx_mod_window_div");
                        var win_title = jQuery("#myModal_window_title");

                        var this_table_alias = _pkey._table._get_alias({ "tableID": tableID });
                        var this_table_settings_all = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "all" });
                        var print_title = '<i class="fa fa-cogs" aria-hidden="true"> </i> Settings';
                        let tableID_placeholder = " <input type='textbox' id='tdx_table_placeholder' value='" + tableID + "' readonly/>";
                        let tabletarget_placeholder = " <input type='textbox' id='tdx_tabletarget_plc' value='" + table_target + "' readonly/>";
                        var print_body = "";

                        if (this_table_alias !== undefined) {
                            print_title += " - " + this_table_alias + "";
                        }

                        if (this_table_settings_all !== undefined) {
                            //print_body = JSON.stringify(this_table_settings_all);
                            for (var s in this_table_settings_all) {
                                let tdx_obj = false;
                                let tdx_obj_num = 0;
                                let delbutton = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + s + "\");'>X</a> ] ";
                                print_body += "<div class='tdx_column_wrapper1' id='tdx_" + s + "'>";
                                print_body += "<div class='tdx_window_key'><strong>" + delbutton + s + ":</strong></div>";
                                if (typeof this_table_settings_all[s] === "object") {
                                    for (var s1 in this_table_settings_all[s]) {
                                        print_body += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                                        print_body += "<div id='tdx_" + s + "__" + s1 + "' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + s1 + " : </div>";
                                        if (typeof this_table_settings_all[s][s1] === "object") {
                                            tdx_obj = true;
                                            print_body += "";
                                            delbutton = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + s + "__" + s1 + "\");'>X</a> ] ";
                                            print_body += "<div class='tdx_window_val'><textarea id='" + s + "__" + s1 + "' class='tdx_table_sett_input'>" + JSON.stringify(this_table_settings_all[s][s1]) + "</textarea>" + delbutton + "</div>";
                                            tdx_obj_num++;
                                        }
                                        else {
                                            print_body += "<div class='tdx_window_val'>" + this_table_settings_all[s][s1] + "</div>";
                                        }
                                        print_body += "</div>";
                                    }
                                    //IF ITS AN OBJECT THEN ADD THE 'ADD NEW' BUTTON, TO ADD ADDITIONAL OBJECTS
                                    if (tdx_obj === true) {
                                        print_body += "<div class='tdx_window_val' id='tdx_" + s + "__" + tdx_obj_num + "'><a href='#' onclick='javascript:_pkey._table._display_settings_addnew_addo(\"" + s + "\");'>+ Add Object</a><input type='textbox' value='" + tdx_obj_num + "' id='tdxnc_" + s + "' /></div>";
                                    }
                                }
                                else {
                                    //HANDLE SPECIAL FOR main_header
                                    let tdx_readonly = "";
                                    if (s === "main_header") { tdx_readonly = " readonly style='background:#CCC;color:#666;'"; }
                                    print_body += "<div class='tdx_window_val'><input type='textbox' value='" + this_table_settings_all[s] + "' id='" + s + "' class='tdx_table_sett_input'" + tdx_readonly + "/>" + delbutton + "</div>";
                                }
                                print_body += "   </div>";
                            }
                            print_body += "<div class='tdx_column_wrapper1' id='tdx_tab_sett_addnew'><div class='tdx_window_val'><a href='#' onclick='javascript:_pkey._table._display_settings_addnew()'>+ Add New Setting</a></div></div>";
                        }

                        win_title.html(print_title + tableID_placeholder + tabletarget_placeholder);
                        win_body.html(print_body);
                        _pkey._table._display_settings_buttons({ "tableID": tableID, "table_target": table_target });
                    }
                },
                _display_settings_addnew: function (tableID) {/*
                    //THIS FUNCTION PLACES THE DROPDOWN AND TEXTBOX TO CHOOSE WHICH ITEM TO CREATE IN THE TABLE SETTINGS WINDOW
                    let tdx_selectmenu = "<select id='tdx_sett_newsel'><option value='item'>Single Item</option><option value='objects'>Objects</option></select>";
                    let tdx_onkey = " onkeyup='javascript:cnf(this.id,this.value,\"l\");'";
                    jQuery("#tdx_mod_window_div").append("<div id='tdx_settaddnewdiv' class='tdx_column_wrapper1'><div class='tdx_window_key'>Name:<input type='textbox' placeholder='name_here' id='tdx_settaddnewdivname'" + tdx_onkey + "/></div><div class='tdx_window_val'>" + tdx_selectmenu + "<input type='button' value='Add' onclick='javascript:_pkey._table._display_settings_addnew_go()' /></div></div>");
                    jQuery("#tdx_mod_window_div").append("<input type='hidden' value='1' id='tdxnc_newobj' />");
                    //CLEAR THE CONTENTS OF THE ADDNEW DIV 
                    jQuery("#tdx_tab_sett_addnew").remove();
                    */
                },
                _display_settings_addnew_go: function () {
                    //THIS FUNCTION IS LAUNCHED BY PRESSING THE 'GO' BUTTON TO BEGIN THE PROCESS OF ADDING A NEW SETTING IN THE TABLE SETTINGS WINDOW
                    let tdx_selectval = jQuery("#tdx_sett_newsel").val();
                    let tdx_addnewdiv = jQuery("#tdx_settaddnewdiv");
                    let tdx_addnewdivname = jQuery("#tdx_settaddnewdivname").val();
                    let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                    let xdel = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + tdx_addnewdivname + "\");'>X</a> ] ";

                    if (tdx_selectval == "item") {
                        tdx_addnewdiv.html("<div class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + tdx_addnewdivname + ":</strong></div><div class='tdx_window_val'><input type='textbox' id='" + tdx_addnewdivname + "' class='tdx_table_sett_input'/></div></div>");
                    }

                    if (tdx_selectval == "objects") {

                        //let tdx_settaddnewdiv = jQuery("#tdx_settaddnewdiv");
                        //tdx_settaddnewdiv.append("<input type='textbox' value='1' id='tdxnc_newobj' />");
                        let tdx_x = (jQuery("#tdxnc_newobj").val() !== undefined) ? jQuery("#tdxnc_newobj").val() : 1;
                        let tdx_inner = "";
                        let tdx_textcount = "<input type='textbox' id='tdxnc_" + tdx_addnewdivname + "' value='1' />";
                        let tdx_inner_addnew = tdx_spacer + "<div id='tdx_" + tdx_addnewdivname + "__1' class='tdx_window_val'><a href='javascript:_pkey._table._display_settings_addnew_addo(\"" + tdx_addnewdivname + "\");'>+ Add Object</a>" + tdx_textcount + "</div>";

                        for (var x = 0; x < tdx_x; x++) {
                            let tdx_textarea = "<div class='tdx_window_val'><textarea id='" + tdx_addnewdivname + "__" + x + "' placeholder='{ json object here }' class='tdx_table_sett_input'>{\"test\":\"test3\"}</textarea></div>";
                            tdx_inner += tdx_spacer + "<div class='tdx_window_key'><strong>" + x + " :</strong></div>" + tdx_textarea;

                        }
                        tdx_addnewdiv.replaceWith("<div id='tdx_" + tdx_addnewdivname + "' class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + xdel + tdx_addnewdivname + ":</strong></div>" + tdx_inner + "</div>" + tdx_inner_addnew + "");
                    }
                },
                _display_settings_addnew_addo: function (setting_name) {
                    //alert('add object');

                    let tdx_setting_name = (setting_name !== undefined) ? setting_name : null;
                    let tdx_setting_count = "";


                    //GET COUNT FROM #tdxnc_newobj
                    if (tdx_setting_name !== null) { tdx_setting_count = "#tdxnc_" + setting_name; }
                    else { tdx_setting_count = "#tdxnc_newobj"; }

                    let tdx_count = (jQuery(tdx_setting_count).val() !== undefined) ? jQuery(tdx_setting_count).val() : null;

                    //let tdx_addnew = jQuery("#tdx_table_setting_new");
                    let tdx_settingdiv = jQuery("#tdx_" + tdx_setting_name + "__" + tdx_count);

                    let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                    let xdel = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + tdx_setting_name + "__" + tdx_count + "\");'>X</a> ] ";

                    if (tdx_count !== null) {
                        //use the number for the x
                        let tdx_cn = Number(tdx_count);
                        let newcount = Number(tdx_cn + 1);
                        let tdx_textarea = "<div class='tdx_window_val'><textarea id='" + setting_name + "__" + tdx_count + "' placeholder='{ json object here }' class='tdx_table_sett_input'>{\"test4466\":\"test3123\"}</textarea>" + xdel + "</div>";

                        //tdxnc_newobj
                        if (tdx_setting_count === "#tdxnc_newobj") {
                            tdx_settingdiv = jQuery("#tdx_table_setting_new");
                            tdx_settingdiv.append(tdx_spacer + "<div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea);
                        }
                        else {
                            //COPY CURRENT DIV
                            let tdxcurr = tdx_settingdiv.html();
                            //REPLACE
                            tdx_settingdiv.replaceWith(tdx_spacer + "<div id='tdx_" + tdx_setting_name + "__" + tdx_count + "' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea + "</div>" + tdx_spacer + "<div id='tdx_" + setting_name + "__" + newcount + "' class='tdx_window_val'>" + tdxcurr + "</div>");
                        }


                        //INCREMENT COUNT +1
                        let tdx_countnum = parseInt(tdx_count);
                        jQuery(tdx_setting_count).val(tdx_countnum + 1);
                    }


                    //append the x:textarea to tdx_table_setting_new
                },
                _display_settings_buttons: function (o = { tableID: null, table_target: null }) {
                    let tableID = (o["tableID"] !== null) ? o["tableID"] : null;
                    let table_target = (o["table_target"] !== null) ? o["table_target"] : null;
                    let save_btn = "<button type='button' class='btn btn-default' id='tdx_sett_save_and_btn' onclick='javascript:_pkey._table._save_setting({\"tableID\":\"" + tableID + "\", \"table_target\":\"" + table_target + "\"})'>Save</button>";

                    if (tableID !== null) {
                        let tdx_place_here = jQuery(".tdx_popup_buttons_wr");
                        tdx_place_here.html(save_btn);
                        //MAKE ACTION BAR TO BE EMPTY
                        jQuery("#tdx_popup_actions_wr").html("");
                    }
                },
                _display_settings_del: function (setting_name) {
                    if (setting_name !== undefined) {
                        let settname = "#tdx_" + setting_name;
                        //alert("delete:"+setting_name);
                        jQuery(settname).css("transition", "all .7s");
                        jQuery(settname).css("background-color", "red");
                        jQuery(settname).css("color", "red");
                        jQuery(settname + " input").css("border-color", "red");
                        jQuery(settname + " textarea").css("border-color", "red");
                        setTimeout(function () {
                            jQuery(settname).remove();
                            _pkey._table._display_settings_restack(setting_name);
                        }, 800);

                    }
                },
                _display_settings_restack: function (setting_name) {
                    console.log("//BEGIN RESTACK: setting:" + setting_name);
                    //if contains "__" THEN DIVIDE BY "__"
                    let cc = 0;
                    let runner = "";
                    var core_setting_name = "";

                    if (setting_name.includes("__") === true) {
                        //console.log("contains __");
                        let str = setting_name.split("__");
                        //console.log(str);
                        core_setting_name = str[0];
                        let xdel1 = "[ <a href='javascript:_pkey._table._display_settings_del(\"" + core_setting_name + "\");'>X</a> ] ";

                        console.log("core setting:" + core_setting_name);

                        runner += "<div class='tdx_window_key'><strong>" + xdel1 + core_setting_name + " :</strong></div>";
                        runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";

                        jQuery("#tdx_" + core_setting_name + " .tdx_column_wrapper1 .tdx_window_val textarea").each(function () {
                            let cont = jQuery(this).val();

                            let xdel2 = " [ <a href='javascript:_pkey._table._display_settings_del(\"" + core_setting_name + "__" + cc + "\");'>X</a> ] ";
                            runner += "<div id='tdx_" + core_setting_name + "__" + cc + "' class='tdx_column_wrapper1'>";
                            runner += "<div class='tdx_window_key'>" + cc + " : </div>";
                            runner += "<div class='tdx_window_val'><textarea id='" + core_setting_name + "__" + cc + "' class='tdx_table_sett_input'>" + cont + "</textarea>" + xdel2 + "</div>";
                            runner += "</div>";
                            runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                            console.log(cc);
                            console.log(cont);
                            cc++;

                        });


                    }

                    if (cc === 0) { cc = 1; }

                    runner += "<div class='tdx_window_val' id='tdx_" + core_setting_name + "__" + cc + "'>";
                    runner += "<a href='#' onclick='javascript:_pkey._table._display_settings_addnew_addo(\"" + core_setting_name + "\");'>+ Add Object</a>";
                    runner += "<input type='textbox' value='" + cc + "' id='tdxnc_" + core_setting_name + "'>";
                    runner += "</div>";

                    //INJECT runner
                    jQuery("#tdx_" + core_setting_name).html(runner);

                }, 
                _settings_object : {
                    _place: function (o) {
                        if (typeof o === "object" && o !== undefined) {
                            //RETURN HTML STRING OF DATA
                            let column = o["column_slug"] || null;
                            let tableID = o["tableID"] || null;
                            let this_table_settings_all = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "all" });
                            let ret = "", print_body = "";
                            //let targetitem = "#tdx_"+column+"__"+tableID;
                            if (this_table_settings_all !== undefined) {
                                //print_body = JSON.stringify(this_table_settings_all);
                                for (var s in this_table_settings_all) {
                                    let tdx_obj = false;
                                    let tdx_obj_num = 0;
                                    let delbutton = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._settings_object._del_setting(\"" + s + "\",\""+tableID+"\");'><i class='fa fa-trash'></i></a></span> ";
                                    let delbutton2 = "";
                                    print_body += "<div class='tdx_column_wrapper1' id='tdx_" + s + "__"+tableID+"'>";
                                    print_body += "<div class='tdx_window_key'><strong>" + delbutton + s + ":</strong></div>";
                                    if (typeof this_table_settings_all[s] === "object") {
                                        for (var s1 in this_table_settings_all[s]) {
                                            print_body += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                                            print_body += "<div id='tdx_" + s + "__" + s1 + "__"+tableID+"' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + s1 + " : </div>";
                                            if (typeof this_table_settings_all[s][s1] === "object") {
                                                //HEADER_COLUMNS AND CONTENT_COLUMNS, break them down further
                                                tdx_obj = true;
                                                print_body += "";
                                                delbutton2 = "<span><a href='javascript:_pkey._render._settings._table._settings_object._del_object(\"tdx_" + s + "__" + s1 + "__"+tableID+"\");'><i class='fa fa-trash'></i></a></span>";
                                                print_body += "<div class='tdx_window_val'><textarea id='tdxi_" + s + "__" + s1 + "__"+tableID+"' class='tdx_table_sett_input__"+s+"__"+tableID+"__TEXTA tdx_tsa_obj'>" + JSON.stringify(this_table_settings_all[s][s1]) + "</textarea>" + delbutton2 + "</div>";
                                                tdx_obj_num++;
                                            }
                                            else {
                                                //REGULAR INPUT ELEMENT <INPUT TYPE='textbox' VALUE='this columns value'/>
                                                print_body += "<div class='tdx_window_val'>" + this_table_settings_all[s][s1] + "</div>";
                                            }
                                            print_body += "</div>";
                                        }
                                        //IF ITS AN OBJECT THEN ADD THE 'ADD NEW' BUTTON, TO ADD ADDITIONAL OBJECTS
                                        if (tdx_obj === true) {
                                            let counter = "<input type='textbox' value='" + tdx_obj_num + "' id='tdxnc_" + s + "__"+tableID+"' />";
                                            let addnew = "<span class='tdx_settings_tab_hsidetext_addnew'><a href='javascript:void(0);' onclick='javascript:_pkey._render._settings._table._settings_object._addnew_object(\"" + s + "\",\"" + tableID + "\");'>+ Add New ["+s+"]</a></span>";
                                            print_body += "<div class='tdx_window_val' id='tdx_" + s + "__" + tdx_obj_num + "__"+tableID+"'>"+addnew+counter+"</div>";
                                        }
                                    }
                                    else {
                                        //HANDLE SPECIAL FOR main_header
                                        let tdx_readonly = "";
                                        if (s === "main_header") { tdx_readonly = " readonly style='background:#CCC;color:#666;'"; }
                                        print_body += "<div class='tdx_window_val'><input type='textbox' value='" + this_table_settings_all[s] + "' id='tdxi_" + s + "__"+tableID+"' class='tdx_table_sett_input'" + tdx_readonly + "/>"+ "</div>";
                                    }
                                    print_body += "   </div>";
                                }
                                print_body += "<div class='tdx_column_wrapper1' id='tdx_tab_sett_addnew__"+tableID+"'><div class='tdx_window_val'><a href='javascript:void(0);' onclick='javascript:_pkey._render._settings._table._settings_object._addnew_setting(\""+tableID+"\")'>+ Add New Setting</a></div></div>";
                            }
                            ret = print_body;
                            return ret;
                        }
                    },
                    _addnew_setting: function (tableID1) {
                        //THIS FUNCTION PLACES THE DROPDOWN AND TEXTBOX TO CHOOSE WHICH ITEM TO CREATE IN THE TABLE SETTINGS WINDOW
                        let tableID = tableID1 || null;
                        let tdx_selectmenu = "<select id='tdx_sett_newsel__"+tableID+"'><option value='item'>Single Item</option><option value='objects'>Objects</option></select>";
                        let tdx_onkey = " onkeyup='javascript:cnf(this.id,this.value,\"l\");'";
                        
                        let insert1 = "<div id='tdx_settaddnewdiv__"+tableID+"' class='tdx_column_wrapper1'>";
                        insert1 += "<div class='tdx_window_key'>Name:<input type='textbox' placeholder='name_here' id='tdx_settaddnewdivname__" + tableID + "' "+tdx_onkey+"/></div><div class='tdx_window_val'>" + tdx_selectmenu;
                        insert1 += "<input type='button' value='Add' onclick='javascript:_pkey._render._settings._table._settings_object._addnew_setting_do(\""+tableID+"\")' /></div></div>";

                        jQuery("#tdx_settings_object__"+tableID).append(insert1);
                        jQuery("#tdx_settings_object__"+tableID).append("<input type='hidden' value='1' id='tdxnc_newobj__"+tableID+"' />");
                        //CLEAR THE CONTENTS OF THE ADDNEW DIV 
                        //let move_the_button = jQuery("#tdx_tab_sett_addnew__"+tableID).html();
                        jQuery("#tdx_tab_sett_addnew__"+tableID).remove();
                        //jQuery("#tdx_settings_object__"+tableID).append(move_the_button);
    
                    },
                    _addnew_setting_do : function (tableID1) {
                        //THIS FUNCTION IS LAUNCHED BY PRESSING THE 'Add' button for table settings_object
                        let tableID = tableID1 || null;
                        let tdx_selectval = jQuery("#tdx_sett_newsel__"+tableID).val();
                        let tdx_addnewdiv = jQuery("#tdx_settaddnewdiv__"+tableID);
                        let tdx_addnewdivname = jQuery("#tdx_settaddnewdivname__"+tableID).val();
                        let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                        let xdel = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._settings_object._del_setting(\"" + tdx_addnewdivname + "\",\""+tableID+"\");'><i class='fa fa-trash'></i></a></span>";
                        let addnewbutton = "<div id='tdx_tab_sett_addnew__"+tableID+"' class='tdx_column_wrapper1'>";
                        addnewbutton += "<div class='tdx_window_val'>";
                        addnewbutton += "<a href='javascript:void(0);' onclick='javascript:_pkey._render._settings._table._settings_object._addnew_setting(\""+tableID+"\");'>+ Add New Setting</a>";
                        addnewbutton += "</div>";
                        addnewbutton += "</div>";
    
                        if (tdx_selectval == "item") {
                            tdx_addnewdiv.html("<div class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + tdx_addnewdivname + ":</strong></div><div class='tdx_window_val'><input type='textbox' id='tdxi_" + tdx_addnewdivname + "__"+tableID+"' class='tdx_table_sett_input'/></div></div>");
                        }
    
                        if (tdx_selectval == "objects") {
    
                            //let tdx_settaddnewdiv = jQuery("#tdx_settaddnewdiv");
                            //tdx_settaddnewdiv.append("<input type='textbox' value='1' id='tdxnc_newobj' />");
                            let tdx_x = (jQuery("#tdxnc_newobj").val() !== undefined) ? jQuery("#tdxnc_newobj").val() : 1;
                            let tdx_inner = "";
                            let tdx_textcount = "<input type='textbox' id='tdxnc_" + tdx_addnewdivname + "__"+tableID+"' value='1' />";
                            let tdx_inner_addnew = "";
    
                            for (var x = 0; x < tdx_x; x++) {
                                let tdx_textarea = "<div class='tdx_window_val'><textarea id='tdxi_" + tdx_addnewdivname + "__" + x + "__"+tableID+"' placeholder='{ json object here }' class='tdx_table_sett_input__"+tableID+"__TEXTA tdx_tsa_obj'>{\"test\":\"test3\"}</textarea></div>";
                                tdx_inner += tdx_spacer + "<div class='tdx_window_key'><strong>" + x + " :</strong></div>" + tdx_textarea;
    
                            }
                            tdx_inner_addnew = tdx_spacer + "<div id='tdx_" + tdx_addnewdivname + "__"+tableID+"__"+x+"' class='tdx_window_val'><span class='tdx_settings_tab_hsidetext_addnew'><a href='javascript:_pkey._render._settings._table._settings_object._addnew_object(\"" + tdx_addnewdivname + "\",\""+tableID+"\");'>+ Add New ["+tdx_addnewdivname+"]</a></span>" + tdx_textcount + "</div>";
                            tdx_addnewdiv.replaceWith("<div id='tdx_" + tdx_addnewdivname + "__"+tableID+"' class='tdx_column_wrapper1'><div class='tdx_window_key'><strong>" + xdel + tdx_addnewdivname + ":</strong></div>" + tdx_inner + "</div>" + tdx_inner_addnew + "");
                            
                            
                        }
                        jQuery("#tdx_settings_object__"+tableID).append(addnewbutton);
                    },

                    _addnew_object : function (setting_name, tableID1) {
                        //alert('add object');
    
                        let tdx_setting_name = (setting_name !== undefined) ? setting_name : null;
                        let tableID = tableID1 || null;
                        let tdx_setting_count = "";
    
                        //GET COUNT FROM #tdxnc_newobj
                        if (tdx_setting_name !== null) { tdx_setting_count = "#tdxnc_" + setting_name + "__" + tableID; }
                        else { tdx_setting_count = "#tdxnc_newobj"; }
    
                        let tdx_count = (jQuery(tdx_setting_count).val() !== undefined) ? jQuery(tdx_setting_count).val() : null;
    
                        //let tdx_addnew = jQuery("#tdx_table_setting_new");
                        let callout = "tdx_" + tdx_setting_name + "__" + tdx_count + "__" + tableID;
                        log("_addnew_object->callout:"+callout);
                        let tdx_settingdiv = jQuery("#"+callout);
    
                        let tdx_spacer = "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                        let xdel = "<a href='javascript:_pkey._render._settings._table._settings_object._del_object(\"" + callout + "\");'><i class='fa fa-trash'></i></a>";
    
                        if (tdx_count !== null) {
                            //use the number for the x
                            let tdx_cn = Number(tdx_count);
                            let newcount = Number(tdx_cn + 1);
                            let tdx_textarea = "<div class='tdx_window_val'><textarea id='" +callout+ "__TEXTA' placeholder='{ json object here }' class='tdx_table_sett_input__"+setting_name+"__"+tableID+"__TEXTA tdx_tsa_obj'>{\"test4466\":\"test3123\"}</textarea>" + xdel + "</div>";
    
                            //tdxnc_newobj
                            if (tdx_setting_count === "#tdxnc_newobj") {
                                tdx_settingdiv = jQuery("#tdx_table_setting_new");
                                tdx_settingdiv.append(tdx_spacer + "<div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea);
                            }
                            else {
                                //COPY CURRENT DIV
                                let tdxcurr = tdx_settingdiv.html();
                                //REPLACE
                                tdx_settingdiv.replaceWith(tdx_spacer + "<div id='"+callout+"' class='tdx_column_wrapper1'><div class='tdx_window_key'>" + tdx_count + " :</div>" + tdx_textarea + "</div>" + tdx_spacer + "<div id='tdx_" + setting_name + "__" + newcount + "__"+tableID+"' class='tdx_window_val'>" + tdxcurr + "</div>");
                            }
    
    
                            //INCREMENT COUNT +1
                            let tdx_countnum = parseInt(tdx_count);
                            jQuery(tdx_setting_count).val(tdx_countnum + 1);
                        }
    
    
                        //append the x:textarea to tdx_table_setting_new
                    },
                    _del_object: function (setting_name) {
                        if (confirm("Are you sure you want to delete this?")) {
                            if (setting_name !== undefined) {
                                let settname = "#" + setting_name;
                                //alert("delete:"+setting_name);
                                jQuery(settname).css("transition", "all .7s");
                                jQuery(settname).css("background-color", "red");
                                jQuery(settname).css("color", "red");
                                jQuery(settname + " input").css("border-color", "red");
                                jQuery(settname + " textarea").css("border-color", "red");
                                setTimeout(function () {
                                    jQuery(settname).remove();
                                    _pkey._render._settings._table._settings_object._restack(setting_name);
                                }, 800);

                            }
                        }
                    },
                    _restack: function (setting_name) {
                        log("restack->setting_name:" + setting_name);
                        log("//BEGIN RESTACK: setting:" + setting_name);
                        //if contains "__" THEN DIVIDE BY "__"
                        let cc = 0;
                        let runner = "";
                        var core_setting_name = "";
                        let tableID = 0;

                        if (setting_name.includes("__") === true) {
                            //console.log("contains __");
                            let str = setting_name.split("__");
                            //console.log(str);
                            core_setting_name = str[0].substr(4);
                            tableID = str[2] || 0;
                            let xdel1 = "<span class='tdx_settings_tab_hsidetext'><a href='javascript:_pkey._render._settings._table._settings_object._del_object(\"tdx_" + core_setting_name + "__"+tableID+"\");'><i class='fa fa-trash'></i></a></span>";

                            log(">>core setting:" + core_setting_name);
                            log(">>tableID:" + tableID);
                            log(">>texta:" + setting_name + "__TEXTA");

                            runner += "<div class='tdx_window_key'><strong>" + xdel1 +" "+ core_setting_name + ":</strong></div>";
                            runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";

                            jQuery(".tdx_table_sett_input__"+core_setting_name+"__"+tableID + "__TEXTA").each(function () {
                                let cont = jQuery(this).val();
                                log("cont:"+cont);
                                let xdel2 = "<a href='javascript:_pkey._render._settings._table._settings_object._del_object(\"tdx_" + core_setting_name + "__" +cc + "__" + tableID+"\");'><i class='fa fa-trash'></i></a>";
                                runner += "<div id='tdx_" + core_setting_name + "__"+cc+"__"+tableID+"' class='tdx_column_wrapper1'>";
                                runner += "<div class='tdx_window_key'>" + cc + " : </div>";
                                runner += "<div class='tdx_window_val'><textarea id='tdx_" + core_setting_name + "__"+tableID+"__TEXTA' class='tdx_table_sett_input__"+core_setting_name+"__"+tableID+"__TEXTA tdx_tsa_obj'>" + cont + "</textarea>" + xdel2 + "</div>";
                                runner += "</div>";
                                runner += "<div style='clear:both;display:block;width:100%;height:3px;'>&nbsp;</div>";
                                //log("cc:"+cc);
                                //log(cont);
                                cc++;

                            });


                        }

                        if (cc === 0) { cc = 1; }

                        runner += "<div class='tdx_window_val' id='tdx_" +core_setting_name + "__" +cc+ "__"+ tableID+ "'>";
                        runner += "<span class='tdx_settings_tab_hsidetext_addnew'>";
                        runner += "<a href='javascript:void(0);' onclick='javascript:_pkey._render._settings._table._settings_object._addnew_object(\"" + core_setting_name + "\",\""+tableID+"\");'>+ Add New ["+core_setting_name+"]</a>";
                        runner += "</span>";
                        runner += "<input type='textbox' value='" + cc + "' id='tdxnc_" + core_setting_name + "__"+tableID+"'>";
                        runner += "</div>";

                        //INJECT runner
                        log("INJECT to:"+setting_name);
                        //log("INJECT:"+runner);
                        jQuery("#tdx_" + core_setting_name+"__"+tableID).html(runner);
                    }
                }
            }
        },
        _table: {
            _all: function (o) { },
            _place_single: function (o) {
                if (o) {
                    //o needs tableID and target
                    var does_this_table_exist = false;

                    var ull = "";
                    does_this_table_exist = _pkey._table._exists(o);
                    //log("this table exists:" + does_this_table_exist);
                    //console.log(o);

                    var mod_win_content = '<div id="myModal_mod_window" class="modal fade" role="dialog">'
                        + '<div class="modal-dialog modal-lg">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" id="tdx_modal_info_close" class="close" data-dismiss="modal">&times;</button>'
                        + '<h4 id="myModal_window_title" class="modal-title">Information</h4>'
                        + '</div>'
                        + '<div class="modal-body" id="tdx_mod_window_body">'
                        + '<div id="tdx_mod_window_div">&nbsp;</div>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + '<span id="tdx_popup_actions_wr"></span>'
                        + '<button type="button" id="tdx_close_modal_btn" class="btn btn-default" data-dismiss="modal">Close</button>'
                        + '<span class="tdx_popup_buttons_wr"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    if (does_this_table_exist === true) {
                        var tableID = o["tableID"];
                        var table_display_type = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "display_type" });
                        var table_target = "";
                        var tabID = (o["tabID"] !== undefined) ? o["tabID"] : null;
                        var subtabID = (o["subtabID"] !== undefined) ? o["subtabID"] : null;

                        var content_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                        var header_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                        var main_header1 = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "main_header" });
                        var can_check = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "allow_selection" });

                        var can_user_settings = true, can_user_print = true;

                        var text_output = "", main_checkbox = "", printicon = "", settingsicon = "", bulk_action = "", head_record = "", textbox_spacer = "";

                        var t_table = "T_" + tableID;
                        table_target = (o["table_target"] !== undefined) ? o["table_target"] : "";

                        var refreshicon = "";
                        refreshicon = "<a href='javascript:get_table({\"tableID\":\"" + tableID + "\", \"table_target\":\"" + table_target + "\",\"tabID\":\"" + tabID + "\",\"subtabID\":\"" + subtabID + "\"});'><span class='main_button'><i class='fa fa-refresh' aria-hidden='true'><span class='icontext'>Refresh</span></i></span></a>";

                        textbox_spacer = "<th><input type='checkbox' name='" + t_table + "_check_all' id='" + t_table + "_check_all' /></th>";
                        //bulk_action = "<a href='#'><span class='main_button'><i class='fa fa-clock-o'></i><span class='header_icontext'>Bulk Action</span></span></a>";


                        for (var col in header_columns) {
                            var coltitle = header_columns[col]["column_alias"]; //pkey.column_get_alias(header_columns[col]);
                            if (text_output.length < 150) {
                                if (table_display_type === "data_table") {
                                    text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                                }
                                if (table_display_type === "list") {
                                    //text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                                }
                            }
                        }
                        for (var col in content_columns) {
                            var coltitle = content_columns[col]["column_alias"]; //pkey.column_get_alias(content_columns[col]);

                            if (table_display_type === "data_table") {
                                text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                            }
                            if (table_display_type === "list") {
                                if (text_output.length < 150) {
                                    //text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                                }
                            }
                        }

                        if (can_user_print === true) {
                            printicon = "<a href='javascript:_pkey._table._action();'><span class='main_button'><i class='fa fa-clock-o' aria-hidden='true'><span class='icontext'>Actions</span></i></span></a>";
                        }

                        if (can_user_settings === true) {
                            settingsicon = "<a href='#' onclick='javascript:_pkey._table._display_settings({\"tableID\":\"" + tableID + "\", \"table_target\":\"" + table_target + "\"});' data-toggle='modal' data-target='#myModal_mod_window'><span class='main_button'><i class='fa fa-cogs' aria-hidden='true'><span class='icontext'>Settings</span></i></span></a>";
                        }

                        if (can_check === true) {
                            main_checkbox = "<input type='checkbox' id='tdx_main_check_T_" + tableID + "' onchange='javascript:record_UI_checkall(\"" + tableID + "\");' />";
                        }
                        else {
                            main_checkbox = "";
                        }

                        head_record = "";//pkey.table_get_head_recordID({"tableID": tableID});

                        if (o["table_target"] === undefined) {
                            log("_table._render:NO TABLE TARGET IS SET");
                            //notify("FIXABLE ERROR", "No table target is set");
                        }
                        else {

                            //create element and place into dom
                            jQuery(document).ready(function () {
                                //display based on table type
                                if (table_display_type === "data_table") {
                                    jQuery("#" + table_target).html("<table id='T_" + tabID + "__" + subtabID + "__" + tableID + "' class='screen_recordset tsbp_recordset' style='width:100%'></table>");
                                }
                                if (table_display_type === "list") {
                                    jQuery("#" + table_target).html("<ul id='T_" + tabID + "__" + subtabID + "__" + tableID + "' class='screen_recordset tsbp_recordset'></ul>");
                                }
                            });
                        }

                        //CLEAR THE CONTENT OF THE TABLE UL
                        //if main_header1 == true place main header
                        if (main_header1 === true || main_header1 === "true") {

                            log("attempting G:" + "#T_" + tabID + "__" + subtabID + "__" + tableID);
                            var g = jQuery("#T_" + tabID + "__" + subtabID + "__" + tableID);

                            //what is the display type?
                            //if data_table place a <table>
                            if (table_display_type === "data_table") {
                                g.html("<thead><tr class='tdx_main_header' id='T_" + tabID + "__" + subtabID + "__" + tableID + "_main_header'>" + textbox_spacer + text_output + "<th><span class='buttons_main'>" + bulk_action + printicon + settingsicon + refreshicon + "</span></th></tr></thead>");
                            }
                            if (table_display_type === "list") {
                                g.html("<li class='tdx_main_header' id='T_" + tabID + "__" + subtabID + "__" + tableID + "_main_header'>" + main_checkbox + "<span class='tdx_main_header_cols'>" + text_output + "</span><span class='buttons_main'>" + bulk_action + printicon + settingsicon + refreshicon + "</span></li>");
                            }
                        }
                        else {
                            g.html("");
                        }
                        var myModal_mod_window1 = jQuery("#myModal_mod_window");
                        if (!myModal_mod_window1.length) {
                            jQuery('body').prepend(mod_win_content);
                        }

                        //SET THE DATATABLE STUFF AFTER A FEW SECONDS
                        if (table_display_type === "data_table") {
                            //IF THIS IS A RE-GET (AFTER SAVE OR SETTINGS UPDATE) CHECK IF DATATABLE CLASS IS ALREADY SET
                            let gclass = jQuery(g).attr("class");
                            //alert(gclass);
                            //if(gclass.includes("dataTable") === true) {alert("includes dataTable");}
                            if (gclass !== undefined && gclass.includes("dataTable") !== true) {
                                setTimeout(function () {
                                    g.DataTable({
                                        "columnDefs": [
                                            { "width": "10px", "targets": 0 },
                                            { "width": "356px", "targets": -1 },
                                            { "orderable": false, "targets": 0 },
                                            { "orderable": false, "targets": -1 }
                                        ],
                                        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                        "pageLength": -1

                                    })
                                }, 1000);
                            }

                        }
                    }
                    else {
                        log("_render._table no table to render");
                    }
                }
            },
            _pull_single: function (o) { }
        },
        _column: {
            _hook: function (o) { }
        },
        _record: {
            _all: function (obj) { },
            _all_normal: function (obj) { },
            _all_grouped: function (o) {
                log("------- _render. _record. _all_grouped()");
                log(JSON.stringify(o));
                var rec_obj = {};
                rec_obj["a"] = {};
                rec_obj["r"] = {};
                rec_obj["d"] = {};

                var ax = 0, rx = 0, dx = 0;

                rec_obj["a"]["subtabID"] = (o["subtabID"] !== undefined) ? o["subtabID"] : "";

                let subtabID = (o["subtabID"] !== undefined) ? o["subtabID"] : "";
                
                if (_pkey["_record"]["_list"].length > 0) {
                    log("<span style='color:blue;'>RECORD LIST POPULATED " + o["tableID"] + "</span>");

                    //SORT THROUGH _RECORD _LIST
                    for (var table in _pkey["_record"]["_list"]) {
                        //console.log("record:");
                        //console.log(table);
                        log("T_" + o["tableID"]);
                        if (_pkey["_record"]["_list"][table].hasOwnProperty("T_" + o["tableID"])) {
                            log("***THAT TABLE EXISTS*");
                            for (var record in _pkey["_record"]["_list"][table]["T_" + o["tableID"]]) {
                                for (var record_inner in _pkey["_record"]["_list"][table]["T_" + o["tableID"]][record]) {
                                    var recID = _pkey["_record"]["_list"][table]["T_" + o["tableID"]][record][record_inner]["_recordID"];
                                    log(":::::::::::::::::::::::::::::::::::::::::::::::::::");
                                    //log("recID:" + recID);
                                    rec_obj["a"][ax] = _pkey["_record"]["_list"][table]["T_" + o["tableID"]][record][record_inner];
                                    rec_obj["a"][ax]["subtabID"] = subtabID;
                                    log(JSON.stringify(rec_obj["a"][ax]));
                                    _pkey._render._record._place_single(rec_obj["a"][ax]);
                                    ax++;
                                    log(":::::::::::::::::::::::::::::::::::::::::::::::::::");
                                }
                            }
                        }
                    }
                    //console.log("XXXXXXXXXXXXXXXXX");
                    //console.log(rec_obj);
                    //console.log("XXXXXXXXXXXXXXXXX");
                    //_pkey._render._record._place_single(rec_obj);
                }
            },
            _place_single: function (o) {
                //GRAB RECORD FROM DOM AND PLACE IT INTO HTML
                //log("<strong>_render._record._place_single:</strong>");
                //log("<pre>"+JSON.stringify(o)+"</pre>");
                //console.log(o);
                jQuery(document).ready(function () {
                    var authorID, next_recordID, prev_versionID, timestamp, content_object = {};
                    var header_content = "", record_content = "", check_box_pos = "", sel_menu;
                    var sendobj = {}, sox = 0;

                    var can_edit = false,
                        can_delete = false,
                        can_new = false,
                        allow_drag_reorder = false,
                        display_type = "",
                        column_hooks = {},
                        content_columns = {},
                        header_columns = {},
                        record_buttons = {},
                        record_buttons_out = "";

                    var edit_pos = "", delete_pos = "";

                    var tableID = (o["_tableID"] !== undefined) ? o["_tableID"] : "";
                    var tabID = (o["_tabID"] !== undefined) ? o["_tabID"] : "";
                    var subtabID = (o["subtabID"] !== undefined) ? o["subtabID"] : "";
                    var t_tableID = (o["_tableID"] !== undefined) ? "T_" + o["_tableID"] : "";
                    var recordID = (o["_recordID"] !== undefined) ? o["_recordID"] : "";
                    var r_recordID = (o["_recordID"] !== undefined) ? "R_" + o["_recordID"] : "";

                    var temp_total = (pkey["_recordset"] && pkey["_recordset"][t_tableID] && pkey["_recordset"][t_tableID]["cc"]) ? pkey["_recordset"][t_tableID]["cc"] : 0;
                    var this_running_x = (o["this_running_x"] !== undefined) ? o["this_running_x"] : 1;

                    log("PLACING SINGLE:");
                    log(JSON.stringify(o));

                    can_edit = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_edit" });

                    if (can_edit === true) {
                        edit_pos = "<a href='#' onclick='javascript:_pkey._record._open._edit(\"" + tableID + "\",\"" + r_recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>";
                    }
                    if (can_delete === true) {
                        delete_pos = "<a href='javascript:_pkey._record._delete(\"" + tableID + "\",\"" + r_recordID + "\")'><i class='fa fa-2x fa-times' aria-hidden='true'></i></a>";
                    }

                    display_type = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "display_type" });
                    can_delete = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_delete" });
                    can_new = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_new" });

                    content_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                    header_columns = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                    record_buttons = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "record_buttons" });

                    //COLUMN HOOKS
                    column_hooks = _pkey._table._get_setting({ "tableID": tableID, "settings_name": "column_hooks" });
                    var hooks_add = "";

                    //log(JSON.stringify("DISPLAY TYPE:"+display_type));
                    //log(JSON.stringify(column_hooks));

                    //sort through column values in the 'header_columns' and 'content_columns'

                    if (_pkey["_record"]["_list"].length > 0) {
                        //log("<span style='color:blue;'>RECORD LIST POPULATED " + o["_tableID"] + "</span>");

                        //SORT THROUGH _RECORD _LIST
                        for (var table in _pkey["_record"]["_list"]) {
                            //console.log("_record:");
                            //console.log(table);
                            //console.log("T_" + o["_tableID"]);
                            if (_pkey["_record"]["_list"][table].hasOwnProperty("T_" + o["_tableID"])) {
                                //console.log("");
                                for (var record in _pkey["_record"]["_list"][table]["T_" + o["_tableID"]]) {

                                    for (var record_inner in _pkey["_record"]["_list"][table]["T_" + o["_tableID"]][record]) {

                                        if (_pkey["_record"]["_list"][table]["T_" + o["_tableID"]][record].hasOwnProperty("R_" + recordID)) {

                                            var content = _pkey["_record"]["_list"][table]["T_" + o["_tableID"]][record][record_inner];

                                            for (var column in content) {
                                                var coltitle = column; //pkey.column_get_alias(column);
                                                var temp = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10631.313101395894!2d-101.29337615920953!3d48.2291811776599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a64d9f078442083!2sMcDonalds!5e0!3m2!1sen!2sus!4v1496770932106" style="border:0" allowfullscreen="" width="400" height="300" frameborder="0"></iframe>';

                                                //CHECK THE HEADER_COLUMNS FIRST, ADD TO HEADER
                                                for (var col in header_columns) {
                                                    if (header_columns[col]["column_slug"] === column) {
                                                        coltitle = header_columns[col]["column_alias"];
                                                        if (display_type === "data_table") {
                                                            header_content += "<td>" + content[column] + "</td>";
                                                        }
                                                        if (display_type === "list") {
                                                            header_content += "<span class='tdx_column_header_key' >" + coltitle + ":</span>" + content[column];
                                                        }
                                                    }
                                                }

                                                //CHECK THE CONTENT_COLUMNS SECOND, ADD TO RECORD_CONTENT
                                                for (var col in content_columns) {
                                                    if (content_columns[col]["column_slug"] === column) {
                                                        coltitle = content_columns[col]["column_alias"];
                                                        hooks_add = "";
                                                        for (var hc in column_hooks) {
                                                            //get the value for this column
                                                            var tempadd = "";
                                                            tempadd += "column_slug:" + column_hooks[hc]["column_slug"] + ";";
                                                            tempadd += "column:" + column + ";";
                                                            tempadd += "column_hooks type:" + column_hooks[hc]["type"] + ";";

                                                            //COLUMN HOOK CHECKS HERE ******************************
                                                            //---GOOGLE MAP
                                                            if (column_hooks[hc]["column_slug"] === column && column_hooks[hc]["type"] === "google_map") {
                                                                hooks_add = "<span class='tdx_column_key'>&nbsp;</span><span class='tdx_maplink tdx_column_value' style='display:inline;float:left;'><a href='javascript:tdx_toggle(\"" + "GMAP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "\");'>Show On Map</a></span>";
                                                                hooks_add += "<div id='GMAP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "' style='display:none'>" + temp + "</div>";
                                                                //inner_text: "<a href='javascript:tdx_toggle(\"" + "GMAP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"] + "\");'>Show On Map</a>",
                                                                //class_name: "tdx_maplink"
                                                            }
                                                        }
                                                        //ID: "SP_" + table_name + "_" + content_columns[hc] + "_" + obj["P_ID"]
                                                        if (display_type === "data_table") {
                                                            record_content += "<td id='SP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "'>" + content[column] + "" + hooks_add +/*tempadd+*/"</td>";
                                                        }
                                                        if (display_type === "list") {
                                                            record_content += "<div class='tdx_column_wrapper' id='SP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "'><span class='tdx_column_key'>" + coltitle + ":</span><span class='tdx_column_value'>" + content[column] + "</span>" + hooks_add +/*tempadd+*/"<div style='clear:both;height:0px'>&nbsp;</div></div>";
                                                        }

                                                        //record_content += JSON.stringify();
                                                    }

                                                }

                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                    var edit_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:_pkey._record._open._edit({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a></span>";
                    var view_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:_pkey._record._open._view({ \"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-window-maximize' aria-hidden='true'><span class='icontext'>View</span></i></a></span>";
                    var del_button = "<span class='tdx_ved_buttons del'><a href='javascript:void(0)' onclick='javascript:_pkey._record._delete({\"tableID\":\"" + tableID + "\",\"recordID\":\"" + recordID + "\"});'><i class='fa fa-times' aria-hidden='true'><span class='icontext'>Delete</span></i></a></span>";
                    var ver_button = "";//"<span class='tdx_ved_buttons versions'><a href='javascript:void(0)' onclick='javascript:pkey.record_render_versions(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-code-fork' aria-hidden='true'></i></a></span>";

                    check_box_pos = "<input type='checkbox' id='CH_T_" + tableID + "_R_" + recordID + "' class='tdx_record_checkbox' onchange='javascript:record_UI_sel(\"" + tableID + "\");'/>";

                    //select_menu_output(total, selected, id, tableID)
                    //sel_menu = "<span class=''>"+this_running_x+"</span>";
                    if (display_type === "tasks") {
                        sel_menu = "<span class=''>" + select_menu_output(temp_total, this_running_x, recordID, tableID) + "</span>";
                    }
                    else {
                        sel_menu = "";
                    }

                    //sort through record_buttons
                    for (var rb in record_buttons) {
                        //alert(JSON.stringify(record_buttons[rb]));
                        var callout = "", call_put = "", outp = "", text_thing2 = "", text_thing = "", wrapper_class = "", icon_class = "", icon_text = "", hrf = "", modal_targetID = "";

                        if (record_buttons[rb]["callout"] !== undefined) {
                            callout = record_buttons[rb]["callout"];
                            if (callout === "action") {
                                call_put = "onclick='javascript:get_actions(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "action_people") {
                                call_put = "onclick='javascript:get_actions_people(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "action_jobs") {
                                call_put = "onclick='javascript:get_actions_jobs(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "job") {
                                call_put = "onclick='javascript:get_job(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "customer") {
                                call_put = "onclick='javascript:get_customer(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "inventory") {
                                call_put = "onclick='javascript:get_inventory(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                            if (callout === "information") {
                                call_put = "onclick='javascript:get_information(\"" + tableID + "\",\"" + recordID + "\")'";
                            }
                        }

                        if (record_buttons[rb]["wrapper_class"] !== undefined) {
                            wrapper_class = record_buttons[rb]["wrapper_class"];
                        }

                        if (record_buttons[rb]["icon_text"] !== undefined) {
                            icon_text = record_buttons[rb]["icon_text"];
                            text_thing = "<span class='icontext'>" + icon_text + "</span>";
                            text_thing2 = text_thing;
                            outp = text_thing;
                        }
                        if (record_buttons[rb]["icon_class"] !== undefined) {
                            icon_class = record_buttons[rb]["icon_class"];
                            text_thing2 = "<i class='" + icon_class + "'>" + text_thing + "</i>";
                            outp = text_thing2;
                        }

                        if (record_buttons[rb]["hrf"] !== undefined) {
                            //IF MODALTARGETid
                            hrf = record_buttons[rb]["hrf"];
                            //OVERWRITE OUTP
                            outp = "<a href='" + hrf + "'>" + text_thing2 + "</a>";
                        }


                        if (record_buttons[rb]["modal_targetID"] !== undefined) {
                            modal_targetID = record_buttons[rb]["modal_targetID"];
                            //OVERWRITE outp
                            outp = "<a href='" + hrf + "' data-toggle='modal' data-target='#" + modal_targetID + "' " + call_put + ">" + text_thing2 + "</a>";
                        }

                        record_buttons_out += "<span class='" + wrapper_class + "'>" + outp + "</span>";
                    }
                    //log("second G:"+"#T_" + tabID + "__"+subtabID+"__" + tableID);
                    var g = jQuery("#T_" + tabID + "__" + subtabID + "__" + tableID);

                    var buttons2 = "";

                    if (display_type === "data_table") {
                        buttons2 = "<td class='action_button'>" + record_buttons_out + "" + view_button + edit_button + del_button + ver_button + "</td>";
                        var output_text = "<tr id='" + t_tableID + "_" + r_recordID + "' class='ui-sortable-handle'><td class='tdx_header_checkbox_wr'>" + check_box_pos + "</td>" + "" + header_content + "" + record_content + buttons2 + "</tr>";
                    }
                    if (display_type === "list") {
                        buttons2 = "<span class='action_button'>" + record_buttons_out + "<span class='record_header_right'>" + view_button + edit_button + del_button + ver_button + "</span></span>";
                        var output_text = "<li id='" + t_tableID + "_" + r_recordID + "' class='record_li ui-sortable-handle'><div class='record_header'><span class='tdx_header_checkbox_wr'>" + check_box_pos + "</span>" + sel_menu + "<span class='record_header_text'>" + header_content + "</span>" + buttons2 + "</div><div class='record_content'>" + record_content + "</div></li>";
                    }



                    //log('placing append:' + output_text);
                    g.append(output_text);


                });
                //console.log("END OF _place_single");
            },
            _pull_single: function (obj) { },
            _buttons: {
                _action: function (obj) { },
                _view: function (obj) { },
                _edit: function (obj) { },
                _delete: function (obj) { }
            }

        },
        _tab: {
            _all: function () {
                //jQuery("#tdx_topbarnav").append("<li>Yes!</li>");
                //jQuery("#tdx_topbarnav").append("<li><a data-toggle='tab' href='#settings' onclick=''><i class='fa fa-gears'></i> Settings</a></li>");

                let tdx_tabcontent = "";
                let tdx_subtabul = "";
                let tdx_subtab_content = "";
                let cc = _pkey._tab._list.length;
                var tabcontentID = "";

                //alert(cc);
                if (cc > 0) {

                    for (var x = 0; x < cc; x++) {
                        let tdxobj = "<li id='tdx_sett_li" + x + "'>";


                        for (let y in _pkey._tab._list[x]) {

                            var subtab_table_array = [];
                            var tabID = _pkey._tab._list[x][y]["tabID"];
                            let alias = _pkey._tab._list[x][y]["tab_alias"];
                            let tab_filter = _pkey._tab._list[x][y]["tab_filter"];
                            let icon = _pkey._tab._list[x][y]["tab_icon"];
                            let tab_slug = _pkey._tab._list[x][y]["tab_slug"];
                            let tab_subtabs = _pkey._tab._list[x][y]["tab_subtabs"];
                            let subtab_title = "";
                            let subtab_icon = "";
                            let subtab_id = "";
                            let subtab_type = "";
                            let subtab_tableID = "";
                            tdx_subtabul = "";
                            tdx_subtab_content = "";

                            tabcontentID = "#V_" + tabID + "";

                            tdxobj += "<a data-toggle='tab' href='#V_" + tabID + "' onclick=''><i class='" + icon + "'></i> " + alias + "</a>";

                            tdx_tabcontent = "<div id='V_" + tabID + "' class='tab-pane fade in tab-content'><h2><i class='" + icon + "'></i> " + alias + "</h2>";

                            tdx_tabcontent += "<div class='tdx_page_console' id='tdx_page_console" + tabID + "' style='height:50px;'>";
                            tdx_tabcontent += "<span class='tdx_page_console_mm' id='tdx_page_console_mm" + tabID + "'><a href='javascript:console_max(\"" + tabID + "\")'><i class='fa fa-window-maximize'></i><BR>MAX</a></span>";
                            tdx_tabcontent += "<pre style='height:50px;'>" + JSON.stringify(tab_subtabs, null, 4) + "</pre>";
                            tdx_tabcontent += "</div>";

                            //tdx_subtabul += "<ul class='nav nav-tabs'>";
                            tdx_subtabul += "<ul class='nav nav-tabs'>";

                            //JUMP INTO THE SUBTABS OBJECT
                            for (let tab in tab_subtabs) {
                                //////////////////////////SUBTAB LI START
                                var yes_get_table = false;
                                let onclickthis = "";
                                let onclickobj = {};
                                tdx_subtabul += "<li>";
                                for (let tab2 in tab_subtabs[tab]) {

                                    if (tab2 == "subtab_title") { subtab_title = tab_subtabs[tab][tab2]; }
                                    if (tab2 == "subtab_icon") { subtab_icon = tab_subtabs[tab][tab2]; }
                                    if (tab2 == "subtabID") { subtab_id = tab_subtabs[tab][tab2]; }
                                    if (tab2 == "subtab_type") { subtab_type = tab_subtabs[tab][tab2]; }
                                    if (tab2 == "subtab_tableID") { subtab_tableID = tab_subtabs[tab][tab2]; }

                                    //tdx_tabcontent += "<div class='tdx'>" + tab2 + ":" + tab_subtabs[tab][tab2] + "</div>";

                                }
                                onclickthis = "onclick='javascript:_pkey._render._subtab._single({\"tableID\":\""+subtab_tableID+"\",\"tabID\":\""+tabID+"\",\"subtabID\":\""+subtab_id+"\",\"table_target\":\"Vsc"+tabID+"__"+subtab_id+"\"});'";
                                tdx_subtabul += "<a data-toggle='tab' href='#Vs_" + tabID + "__" + subtab_id + "' class='tdx_subtab_li_link' "+onclickthis+"><i class='" + subtab_icon + "'></i> " + subtab_title + "</a>";
                                tdx_subtabul += "</li>";

                                let stylec = "style='width:100%;text-align:center;margin-left:auto;margin-right:auto;display:block;'";
                                let tabextra = "<div id='Vsc" + tabID + "__" + subtab_id + "'><span class='tdx_loading_text' " + stylec + "><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><br>Loading...</span></div>";

                                tdx_subtab_content += "<div id='Vs_" + tabID + "__" + subtab_id + "' class='tab-pane fade in'><h4><i class='" + subtab_icon + "'></i> " + subtab_title + "</h4>" + tabextra + "</div>";

                                //////////////////////////SUBTAB LI END

                                //DO WE NEED TO LOAD A TABLE?
                                if (subtab_type === "tabledata") {
                                    //SET FLAG = TRUE
                                    yes_get_table = true;
                                    let temp_table_target = "Vsc" + tabID + "__" + subtab_id;
                                    subtab_table_array.push({ "subtab_tableID": subtab_tableID, "subtab_table_target": temp_table_target, "tabID": tabID, "subtabID": subtab_id });
                                }
                            }


                            tdx_subtabul += "</ul>";
                        }


                        tdx_tabcontent += tdx_subtabul;
                        tdx_tabcontent += tdx_subtab_content;
                        //TEMPORARILY PLACE THE ARRAY
                        //tdx_tabcontent += "<pre>" + JSON.stringify(subtab_table_array, null, 4) + "</pre>"; 
                        tdx_tabcontent += "</div>";
                        tdxobj += "</li>";

                        //CHECK IF TAB ALREADY EXISTS
                        if (jQuery("#tdx_sett_li" + x).length == 0) {
                            jQuery("#tdx_topbarnav").append(tdxobj);
                        }
                        if (jQuery("#tdx_sett_li" + x).length > 0) {
                            jQuery("#tdx_sett_li" + x).replaceWith(tdxobj);
                        }

                        //HERE
                        //jQuery("#tab_core").append(tdx_tabcontent);
                        if (jQuery(tabcontentID).length == 0) {
                            jQuery(tab_core).append(tdx_tabcontent);
                        }
                        if (jQuery(tabcontentID).length > 0) {
                            jQuery(tabcontentID).replaceWith(tdx_tabcontent);
                        }

                        //GET THE TABLES IF THERE ARE TABLES IN THE subtab_table_array
                        if (subtab_table_array.length > 0) {
                            //YES THERE ARE TABLES
                            //alert('yes tables '+ subtab_table_array.length);
                            for (let yy = 0; yy < subtab_table_array.length; yy++) {
                                //NEED THE tableID!
                                let tempobj = {};
                                let this_tableID = subtab_table_array[yy]["subtab_tableID"];
                                let this_table_target = subtab_table_array[yy]["subtab_table_target"];
                                let this_subtabID = subtab_table_array[yy]["subtabID"];
                                //alert("test");
                                //alert(this_tableID + ":" + this_table_target);
                                tempobj["tableID"] = this_tableID;
                                tempobj["tabID"] = tabID;
                                tempobj["subtabID"] = this_subtabID;
                                tempobj["table_target"] = this_table_target;
                                //get_table(tempobj);
                                _pkey._table._get(tempobj);
                            }
                        }

                    }
                }
                //alert(JSON.stringify(tdxobj));
            }
        },
        _subtab: {
            _single : function(o){
                if(typeof o === "object"){

                    let tableID = o["tableID"] || null;
                    let tabID = o["tabID"] || null;
                    let subtabID = o["subtabID"] || null;
                    let table_target = o["table_target"] || null;
                    let sendobj = {};

                    sendobj["tableID"] = tableID;
                    sendobj["tabID"] = tabID;
                    sendobj["subtabID"] = subtabID;
                    sendobj["table_target"] = table_target;

                    //RENDER EVERYTHING IN A SUBTAB
                    //TO RENDER A TABLE, PLACE THE TABLE, THEN THE RECORDS
                    _pkey._render._table._place_single(sendobj);
                    _pkey._render._record._all_grouped(sendobj);

                }
            }
        },
        _record_groups: {
            _all: function (o) { },
            _place_single: function (o) { },
            _pull_single: function (o) { }
        }

    },
    _univ_post_checksum: function (action, input, callback) {
        let gg = "";
        let ttstamp = _pkey._get_timestamp();
        let checksum3 = _pkey._table._checksum_get_local({ "tableID": input["tableID"] });
        var obj = { "action": "checksum_match", "checksum": checksum3, "tableID": input["tableID"] };
        var next_action = action || "";
        var in_callback = callback || "";
        async function fetchOHLC() {
            try {
                //log("FETCHOHLC>>>>CHECKSUM3:" + checksum3);
                let url1 = "/wp-content/plugins/tsbp-employee-job-time-tracker/p/ajax-to-db.php?t4=" + ttstamp;
                const r = await (await fetch(url1, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })).json();
                //alert(JSON.stringify(r.query));

                return r;
            } catch (e) { console.log(e); }
        }
        var checksum_compare2 = false;
        (async function () {
            const fetchData = await fetchOHLC();
            //alert("data:" + JSON.stringify(fetchData));
            checksum_compare2 = fetchData["result"];
            obj["result"] = checksum_compare2;
            obj["action"] = next_action;
            obj["callback"] = in_callback;

            log("----------- FETCH THEN>>obj:" + JSON.stringify(obj));
            //_pkey._univ_post_checksum_proc(next_action, obj, in_callback);
            // IF RESULT == TRUE NO NEED TO RE-GET DATA//////////////////////////////////
            if(checksum_compare2 === true){
                //TABLE MATCHES DB TABLE
                log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
                log("/// NO NEED TO GET DATA FOR tableID:"+obj["tableID"]+" //////////////////////////////////////////////////////////////////////////");
                log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
            }
            else{
                //CHECKSUMS DONT MATCH
                //GET THE DATA
                _pkey._univ_post(next_action,obj,in_callback);
            }
            
        })()
    },
    _univ_post: async function (action, input, callback) {
        //log("HELLO, AT _PKEY.UNIV_POST()..." + action);
        var is_allowed = false;
        var allowed_actions = [
            "get_tasks",
            "get_screens",
            "get_screen_by_ID",
            "get_table",
            "get_tables",
            "get_tabs",
            "get_tables_by_screen",
            "get_columns_by_table",
            "get_records_by_table",
            "get_record_groups_by_table",
            "get_records_by_group",
            "get_record_values_by_ID",
            "action_email",
            "set_record_content",
            "delete_recordID",
            "set_restore_version",
            "update_record_position",
            "get_FKdata",
            "get_user_data",
            "get_all_columns",
            "get_record_groups",
            "set_object",
            "get_objects",
            "remove_object",
            "set_table_setting",
            "set_tab_setting",
            "del_tab_setting",
            "del_subtab",
            "checksum",
            "set_table",
            "del_table"
        ];
        var path = "/wp-content/plugins/tsbp-employee-job-time-tracker/p/";
        var gx = allowed_actions.length;
        if (gx > 0) {
            for (var ggg = 0; ggg < gx; ggg++) {
                if (allowed_actions[ggg] === action) {
                    is_allowed = true;
                }
            }
        }
        if (is_allowed === true) {
            //log("YES ACTION = " + action);
            input["action"] = action;
        }
        else {
            log("_pkey._univ_post you are attempting an action that is not registered.");
            return false;
        }

        var stamp = _pkey._get_timestamp();
        //log("YES stamp = " + stamp);
        var jspost = new XMLHttpRequest();
        var url = path + 'ajax-to-db.php?t4=' + stamp;
        var params = "t=1";
        var ret = true;
        jspost.open("POST", url, true);
        jspost.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //jspost.setRequestHeader("Connection", "close");

        //log("SENDING!: " + JSON.stringify(input));
        //log("ACTION:" + action);
        jspost.send(JSON.stringify(input));

        jspost.onreadystatechange = function () {//Call a function when the state changes.
            //alert(jspost.readyState+ " - "+jspost.status);
            if (jspost.readyState == 4 && jspost.status == 200) {
                //do something with responsetext
                //log("ACTION:" + action + "; RESPONSE: " + jspost.responseText);
                ret = jspost.responseText;
                //univ_handler(ret);
                if (typeof callback === 'function') {
                    callback(JSON.parse(ret));
                } else {
                    log("ERROR; callback does not exist");
                }

            }
            else if (jspost.readyState == 4 && jspost.status != 200) {
                log("#univ_post did not return success code");
            }
        };
        //return ret;
    }
};

pkey = {
    _settings_allowed: [
        "screen_target",
        "sort_by",
        "display_type",
        "mass_actions",
        "main_header",
        "main_header_class",
        "main_header_style",
        "allow_select_reorder",
        "allow_drag_reorder",
        "allow_edit",
        "allow_delete",
        "allow_new",
        "allow_edit_history",
        "groups",
        "header_columns",
        "content_columns",
        "record_buttons",
        "column_hooks",
        "column_type",
        "icon_slug"
    ],
    _modal: {
        _open: {
            _table: function (o) { },
            _record: function (o) { }
        },
        _close: function (o) { }
    },
    _table: {
        _list: [],
        _place: function (obj) {
            //TAKE INPUT obj AND PLACE INTO DOM
            if (typeof obj === "object") {
                log("_table._place obj:");
                console.log(obj);
                var allow = [
                    "tableID",
                    "table_slug",
                    "table_alias",
                    "created_timestamp",
                    "authorID",
                    "settings_object",
                    "table_target"
                ];
                var ac = allow.length;
                var tc = pkey["_table"]["_list"].length || 0;
                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                var t_tableID = "T_" + tableID;

                if (pkey["_table"]["_list"].hasOwnProperty(t_tableID)) {
                    //already exists
                    console.log(pkey["_table"]["_list"][t_tableID]);
                }
                else {
                    pkey["_table"]["_list"][t_tableID] = {};
                    pkey["_table"]["_list"].push({ t_tableID: {} });
                }

                for (var acx = 0; acx < ac; acx++) {
                    if (obj[allow[acx]]) {
                        //this key = allow[acx]
                        pkey["_table"]["_list"][t_tableID][allow[acx]] = obj[allow[acx]];
                        //log("YES INNER: " + obj[allowed[acx]]);
                    }
                }

            }
            if (typeof obj === "object") {
                //log("_table._place obj:");
                //console.log(obj);
                var allowed = [
                    "tableID",
                    "table_slug",
                    "table_alias",
                    "created_timestamp",
                    "authorID",
                    "settings_object",
                    "table_target"
                ];
                var ac = allowed.length;

                if (pkey["_tables"] === undefined) {
                    pkey["_tables"] = { "cc": 0 };
                }
                var _tables_cc = (typeof pkey["_tables"] !== undefined && typeof pkey["_tables"]["cc"] !== undefined) ? pkey["_tables"]["cc"] : 0;

                //check for the tableID
                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                var t_tableID = "T_" + tableID;

                //now fill the position
                if (pkey["_tables"][t_tableID] === undefined) {
                    pkey["_tables"][t_tableID] = {};
                }

                for (var acx = 0; acx < ac; acx++) {
                    if (obj[allowed[acx]]) {
                        //this key = allowed[acx]
                        pkey["_tables"][t_tableID][allowed[acx]] = obj[allowed[acx]];
                        //log("YES INNER: " + obj[allowed[acx]]);
                    }
                }
                //end with adjusting the cc
                pkey["_tables"]["cc"]++;

            }
            else {
                log("_table._place no obj");
            }
        },
        _pull: function (obj) {
            //check if this table already exists in the pkey._tables object
            if (obj) {
                //obj["tableID"]
                log("_table._pull");
                console.log(obj);
                //declare pas = false; if pas == true restack tables at end of function
                var pas = false;
                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                if (tableID !== "" && tableID !== undefined) {
                    //search through _tables and find the matching ID
                    var _tables_cc = 0;
                    if (pkey["_tables"] === undefined) {
                        pkey["_tables"] = { cc: 0 };
                    }

                    if (pkey["_tables"]["cc"] !== undefined) {
                        _tables_cc = pkey["_tables"]["cc"];
                    }

                    for (var tc = 0; tc < _tables_cc; tc++) {
                        if (pkey["_tables"][tc] === undefined) {
                            //there is an empty table position, force pas = true;
                            pas = true;
                        }
                        if (pkey["_tables"][tc] !== undefined && pkey["_tables"][tc]["tableID"] === tableID) {
                            //this table exists
                            pas = true;
                            delete (pkey["_tables"][tc]);
                        }
                    }
                }
                if (pas === true) {
                    //restack the tables
                    log("_tables._pull, restacking, pkey._tables:");
                    console.log(pkey["_tables"]);
                    pkey._table._restack_tables();
                }
                else {
                    return false;
                }
            }
        },
        _restack_tables: function () {
            //sort thru all tables in DOM
            //grab data and place into array
            //restack DOM _tables from array
            if (pkey._tables === undefined) {
                pkey._tables = { cc: 0 };
            }

            var cc = (pkey._tables["cc"] !== undefined) ? pkey._tables["cc"] : 0;
            log("_table._restack_tables CC:" + cc);
            var load_arr = {}, lx = 0;
            for (var tc = 0; tc < cc; tc++) {
                if (pkey._tables[tc] !== undefined) {
                    //load_arr[lx] = {};
                    load_arr[lx] = pkey._tables[tc];
                    lx++;
                }
            }
            log("_table._restack_tables with:");
            console.log(load_arr);
            pkey._tables = { cc: 0 };
            if (lx > 0) {
                for (var x = 0; x < lx; x++) {
                    pkey._tables[x] = {};
                    pkey._tables[x] = load_arr[x];
                    pkey._tables["cc"]++;
                }
            }
        },
        _restack: function (o) { },
        _exists: function (o) { },
        _is_table: function (obj) {
            //check if this table already exists in the pkey._tables object
            if (obj) {
                //obj["tableID"]
                log("_table._is_table tableID:" + obj["tableID"]);
                var pas = false;
                var tableID = (typeof obj["tableID"] !== undefined) ? obj["tableID"] : "";
                if (
                    tableID !== "" &&
                    pkey["_tables"] !== undefined &&
                    pkey["_tables"]["T_" + tableID] !== undefined
                ) {
                    pas = true;
                }

                if (pas === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        _display_settings: function (tableID) {
            if (tableID) {
                var win_body = jQuery("#tdx_mod_window_div");
                var win_title = jQuery("#myModal_window_title");

                var this_table_alias = pkey._table._get_alias(tableID);
                var this_table_settings_all = pkey._table._get_setting({ "tableID": tableID, "settings_name": "all" });
                var print_title = "Table Settings";
                var print_body = "";

                if (this_table_alias !== undefined) {
                    print_title += "(" + this_table_alias + ")";
                }

                if (this_table_settings_all !== undefined) {
                    //print_body = JSON.stringify(this_table_settings_all);
                    for (var s in this_table_settings_all) {
                        print_body += "<BR/><strong>" + s + ":</strong>";
                        if (typeof this_table_settings_all[s] === "object") {
                            for (var s1 in this_table_settings_all[s]) {
                                print_body += "<BR/>";
                                print_body += s1 + ":";
                                if (typeof this_table_settings_all[s][s1] === "object") {
                                    print_body += JSON.stringify(this_table_settings_all[s][s1]);
                                }
                                else {
                                    print_body += this_table_settings_all[s][s1];
                                }

                            }
                        }
                        else {
                            print_body += this_table_settings_all[s] + "";
                        }
                    }
                }

                win_title.html(print_title);
                win_body.html(print_body);
            }
        },
        _set_settings: function (o) { },
        _settings_place: function (obj) {
            //obj["tableID"]
            log("_table._settings_place():");
            console.log(obj);
            var tableID = "";
            var _ac = 0;
            var _allowed = [];
            if (obj) {
                var cc = 0;

                if (obj["tableID"]) {
                    tableID = obj["tableID"] + "";
                }
                else {
                    return false;
                    //tableID = "";
                }
                //ENSURE tableID OBJECT EXISTS
                if (pkey["_tables"]["cc"] !== undefined) {
                    cc = pkey["_tables"]["cc"];
                }

                for (var xc = 0; xc < cc; xc++) {
                    if (pkey["_tables"][xc]["tableID"] === tableID) {
                        if (pkey["_tables"][xc]["settings_object"] === undefined) {
                            pkey["_tables"][xc]["settings_object"] = {};
                        }
                        //...........here
                        //replace or create settings for table
                    }
                }

                if (pkey._tables[tableID] === undefined) {
                    pkey._tables[tableID] = {};
                }
                if (pkey._settings_allowed !== undefined) {
                    _allowed = pkey._settings_allowed;
                }
                _ac = _allowed.length;
                //alert(_ac);
                for (var _acx = 0; _acx < _ac; _acx++) {
                    if (obj[_allowed[_acx]] !== "" && obj[_allowed[_acx]] !== undefined) {
                        pkey._settings[tableID][_allowed[_acx]] = obj[_allowed[_acx]];
                    }
                }
            }
        },
        _get_setting: function (obj) {
            //RETURN SINGLE SETTING VALUE FOR tableID AND settings_name
            //obj["tableID"]
            //obj["settings_name"]
            log("_table._get_setting: obj next:");
            console.log(obj);
            if (obj) {
                var tableID = "", t_tableID = "", settings_name = "", retobj = {};
                var tableID = (typeof obj["tableID"] !== undefined) ? String(obj["tableID"]) : "";
                var t_tableID = (tableID !== "") ? "T_" + tableID : "";
                var settings_name = (typeof obj["settings_name"] !== undefined) ? obj["settings_name"] : "";
                //var cc = (typeof pkey["_tables"]["cc"] !== undefined) ? pkey["_tables"]["cc"] : 0;

                if (
                    pkey["_tables"] !== undefined &&
                    pkey["_tables"][t_tableID] !== undefined &&
                    pkey["_tables"][t_tableID]["settings_object"] !== undefined &&
                    tableID == pkey["_tables"][t_tableID]["tableID"]
                ) {
                    var so = pkey["_tables"][t_tableID]["settings_object"];
                    if (settings_name === "all") {
                        return so;
                    }
                    if (so[settings_name] !== undefined) {
                        retobj = so[settings_name];
                    }
                }
                log("_table._get_settings return:");
                console.log(retobj);
                return retobj;
            }
            else {
                console.log("_table._get_setting() NO OBJ SENT");
                return undefined;
            }
        },
        _get_alias: function (tableID) {
            if (tableID) {
                if (pkey["_tables"] !== undefined) {
                    for (var et in pkey["_tables"]) {
                        if (pkey["_tables"][et]["table_alias"] !== undefined && tableID === pkey["_tables"][et]["tableID"]) {
                            var so = pkey["_tables"][et]["table_alias"];
                            return so;
                        }
                    }
                }
            }
        },
        _get_columns: function (obj) {
            if (obj) {
                log("_table._get_columns:");
                console.log(obj);
                var tableID = "", t_tableID = "", retobj = {}, retx = 0;
                var head_col = {};
                var cont_col = {};

                if (obj["tableID"] !== undefined) {
                    tableID = obj["tableID"];
                    t_tableID = (tableID !== undefined) ? "T_" + tableID : "";
                    //search through columns and get columns with tableID = this tableID
                    if (
                        pkey["_tables"] !== undefined &&
                        pkey["_tables"][t_tableID] !== undefined &&
                        pkey["_tables"][t_tableID]["settings_object"] !== undefined
                    ) {
                        if (pkey["_tables"][t_tableID]["settings_object"]["header_columns"] !== undefined) {
                            for (var x in pkey["_tables"][t_tableID]["settings_object"]["header_columns"]) {
                                retobj[retx] = pkey["_tables"][t_tableID]["settings_object"]["header_columns"][x]["column_slug"];
                                retx++;
                            }
                        }
                        if (pkey["_tables"][t_tableID]["settings_object"]["content_columns"] !== undefined) {
                            for (var x in pkey["_tables"][t_tableID]["settings_object"]["content_columns"]) {
                                retobj[retx] = pkey["_tables"][t_tableID]["settings_object"]["content_columns"][x]["column_slug"];
                                retx++;
                            }
                        }

                        return retobj;
                    }
                    else {
                        log("_table._get_columns: no _tables or t_TableID or settings object");
                    }
                }
                else {
                    log("_table._get_columns: no tableID");
                }
            }
        },
        _get_column_keys: function (o) { },
        _render: function (obj) {
            if (obj) {
                //obj needs to declare the tableID and target
                //_table._render will populate itself with records upon completion of table loading
                var does_this_table_exist = false;

                var ull = "";
                does_this_table_exist = pkey._table._is_table(obj);
                log("this table exists:" + does_this_table_exist);

                if (does_this_table_exist === true) {
                    var tableID = obj["tableID"];
                    var table_display_type = pkey._table._get_setting({ "tableID": tableID, "settings_name": "display_type" });
                    var table_target = "";
                    if (obj["table_target"] === undefined) {
                        log("_table._render:NO TABLE TARGET IS SET");
                        //notify("FIXABLE ERROR", "No table target is set");
                    }
                    else {
                        table_target = obj["table_target"];
                        //create element and place into dom
                        jQuery(document).ready(function () {
                            //display based on table type
                            if (table_display_type === "data_table") {
                                jQuery("#" + table_target).html("<table id='T_" + tableID + "' class='screen_recordset tsbp_recordset' style='width:100%'></table>");
                            }
                            if (table_display_type === "list") {
                                jQuery("#" + table_target).html("<ul id='T_" + tableID + "' class='screen_recordset tsbp_recordset'></ul>");
                            }
                        });
                    }
                }
                else {
                    log("_table._render no such table to render");
                }
            }
            else {
                log("_table._render no obj");
            }
        },
        _clear_records: function (obj) {
            if (obj) {
                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                if (pkey["_recordset"] !== undefined) {
                    if (pkey["_recordset"]["T_" + tableID] !== undefined) {
                        pkey["_recordset"]["T_" + tableID] = { cc: 0, list: {} };
                    }
                }
            }
        }
    },
    _column: {
        _get_value: function (obj) {
            if (obj) {
                //obj["tableID"]
                //obj["recordID"]
                //obj["column_slug"]
                var tableID, recordID, column_slug;
                log("_column._get_value:" + JSON.stringify(obj));
                if (obj["tableID"] !== undefined) {
                    tableID = "T_" + obj["tableID"];
                }
                if (obj["recordID"] !== undefined) {
                    recordID = "R_" + obj["recordID"];
                }
                if (obj["column_slug"] !== undefined) {
                    column_slug = obj["column_slug"];
                }
                if (pkey._recordset !== undefined && pkey._recordset[tableID] !== undefined) {
                    if (pkey._recordset[tableID]["list"] !== undefined && pkey._recordset[tableID]["list"][recordID]) {
                        if (pkey._recordset[tableID]["list"][recordID][column_slug] !== undefined) {
                            return pkey._recordset[tableID]["list"][recordID][column_slug];
                        }
                    }
                    else {
                        log("_column._get_value: no list or [recordID]");
                    }
                }
                else {
                    log("_column._get_value: no _recordset or [tableID]");
                }
            }
        }
    },
    _record: {
        _list: [],
        _ds: function (obj) {
            //BREAK DOWN THE OBJ INTO COMPONENT PARTS/RECORDS
            //SEND EACH RECORD TO pkey._record._place();
            //obj["columns"] = {0:"column_name1"}
            //obj["data"] = { 0 : {"column_name1":"value"}}
            log("_record._ds:");
            console.log(obj);
            if (obj) {
                var sender = {}, sx = 0, sx2 = 0;

                if (obj["tableID"] !== undefined) {

                    var tableID = obj["tableID"];

                    //CONSTRUCT obj["list_data"]
                    //CONSTRUCT obj["list"]
                    sender["list"] = {};
                    sender["list_data"] = {};

                    //START THE sender["list"] WITH tableID
                    sender["list"][sx] = "tableID";
                    sx++;

                    //NOW LOAD THE REST OF THE COLUMNS INTO sender["list"]
                    if (obj["columns"] !== undefined) {
                        for (var vx in obj["columns"]) {
                            sender["list"][sx] = obj["columns"][vx];
                            sx++;
                        }
                    }

                    if (obj["data"] !== undefined) {

                        for (var vx in obj["data"]) {
                            //FOR EACH RECORD

                            for (var gg = 0; gg < sx; gg++) {
                                //FOR EACH COLUMN
                                sender["list_data"][sender["list"][gg]] = obj["data"][vx][sender["list"][gg]];
                                //sx2++;
                            }

                            //ADD THE TABLEID TO THE sender["list_data"]
                            sender["list_data"]["tableID"] = tableID;

                            //SEND PER RECORD
                            pkey._record._place(sender);
                        }
                    }
                }
                else {
                    log("_record._ds: no tableID");
                }

            }
        },
        _place: function (obj) {
            //SINGLE RECORD PLACEMENT INTO DOM @ pkey._recordset["list"][ID][column_name] = value;
            //obj will contain list of column_names to use along with data in column_name:value pairs
            //obj["list"] = { 0 : "column_name1", 1 : "column_name2" };
            //obj["list_data"] = { column_name1 : "value", column_name2 : "value" };
            if (obj) {
                //EXTRACT ID AND USE IT AS THE [x]
                if (obj["list"]) {

                    //var check_theseID = ["jobsID","taskID","peopleID"];
                    var useID = "";
                    var list_push = {}, lpx = 0, clear = false, table_clear = false, tableID = "", mode_pass = "v", dragID = "";

                    var final_push = {}, timestamp1 = "";
                    var fx = 0;
                    //log("_record._place"+JSON.stringify(obj));
                    for (var gg in obj["list"]) {
                        //GET SPECIFIC column_names for the ID column
                        var checkids = ["jobsID", "taskID", "peopleID", "trans_coagID"];
                        if (checkids.includes(obj["list"][fx]) == true) {
                            /* ||
                              obj["list"][fx] === "jobsID" ||
                              obj["list"][fx] === "taskID" ||
                              obj["list"][fx] === "peopleID" ||
                              obj["list"][fx] === "trans_coagID"*/
                            clear = true;
                            useID = obj["list"][fx];
                        }
                        else if (obj["list"][fx] === "tableID") {
                            table_clear = true;
                        }
                        else if (obj["list"][fx] === "mode") {
                            mode_pass = obj["list_data"]["mode"];
                            //alert(obj["list_data"]["mode"]);
                        }
                        else if (obj["list"][fx] === "action" || obj["list"][fx] === "result" || obj["list"][fx] === "result2" || obj["list"][fx] === "screen_name") {
                            //DO NOT USE these ones
                            //DO NOTHING
                        }
                        //IF IT WAS NONE OF THE ABOVE ITEMS THEN PUT IT ON THE LIST SO IT WILL BE ADDED TO THE OBJECT
                        else {
                            //DONE:might want to put the 1 line below into this;DONE

                            list_push[fx] = obj["list"][fx];
                        }
                        //MOVED INTO ELSE STATEMENT ABOVE://list_push[fx] = obj["list"][fx];
                        fx++;
                        lpx++;
                    }

                }
                else {
                    log("_record._place() no 'list' SENT:");
                    console.log(obj);
                }

                //CHECK TO SEE IF tableID WAS SENT
                if (table_clear === true) {
                    tableID = "T_" + obj["list_data"]["tableID"];
                }
                else { //IF no table_name, assign to: T_orphans
                    tableID = "T_orphans";
                }

                if (clear === true) {
                    // ID IS THERE, NOW GET THE ID
                    dragID = "R_" + obj["list_data"][useID];
                    final_push[dragID] = {};
                    if (pkey._recordset[tableID] === undefined) {
                        pkey._recordset[tableID] = {};
                    }
                    if (pkey._recordset[tableID]["list"] === undefined) {
                        pkey._recordset[tableID]["list"] = {};
                    }
                    if (pkey._recordset[tableID]["cc"] === undefined) {
                        pkey._recordset[tableID]["cc"] = 0;
                    }

                    //CREATE THE Px OBJECT HERE
                    pkey._recordset[tableID]["list"][dragID] = {};

                    //CREATE THE SETTINGS IN THE Px
                    pkey._recordset[tableID]["list"][dragID]["_SETTINGS"] = {
                        "mode": mode_pass,
                        "view": "min"
                    };
                    //HANDLE TIMESTAMP
                    if (timestamp1 !== "") {
                        pkey._recordset[tableID]["list"][dragID]["_TIMESTAMP"] = timestamp1;
                    }
                    else {
                        pkey._recordset[tableID]["list"][dragID]["_TIMESTAMP"] = pkey.get_timestamp();
                    }

                    //SORT THROUGH STACKED ARRAY TO LOAD IN DATA
                    for (var lpw = 0; lpw < lpx; lpw++) {
                        if (obj["list_data"][list_push[lpw]]) {
                            //RECORD COLUMN_NAME VALUE PLACEMENT HAPPENS HERE
                            //COLUMN_NAME = VALUE
                            pkey._recordset[tableID]["list"][dragID][list_push[lpw]] = obj["list_data"][list_push[lpw]];

                            final_push[dragID][list_push[lpw]] = obj["list_data"][list_push[lpw]];
                        }
                        else if (obj["list_data"][list_push[lpw]] === null) {
                            pkey._recordset[tableID]["list"][dragID][list_push[lpw]] = null;
                        }
                    }
                    //INCREMENT THE COUNTER
                    pkey._recordset[tableID]["cc"]++;
                }
            }
        },
        _pull: function (obj) {
            //pull by ID
            log("_record._pull:");
            console.log(obj);
            if (obj) {
                var dragID = "";
                var r_record = "", t_table = "";
                if (obj["recordID"]) {
                    r_record = "R_" + obj["recordID"];
                    t_table = "T_" + obj["tableID"];
                    if (pkey._recordset[t_table] !== undefined) {
                        if (pkey._recordset[t_table]["list"][r_record] !== undefined) {
                            console.log('%c_record._pull recordID:' + r_recordID, 'color:red;font-size:24px;');
                            delete pkey._recordset[t_table]["list"][r_record];
                            pkey._recordset[t_table]["cc"]--;
                        }
                    }
                    else {
                        log("_record._pull no t_table in pkey");
                    }
                }
                else {
                    console.log("pkey._recordset.update() no ID sent");
                }
            }
        },
        _save: function (obj) { },
        _get_values: function (obj) {
            //tableID
            //recordID
            //columns : ["column_title1", "column_title2", ...]
        },
        _render_all: function (obj) {
            if (obj) {
                tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                deletion_pass = (obj["deletion_pass"] !== undefined) ? obj["deletion_pass"] : false;

                //use tableID to find the UL or html table
                log("_record._render_all:");
                console.log(obj);

                if (pkey["_recordset"] === undefined) { return false; }

                if (tableID !== "") {

                    jQuery(document).ready(function () {

                        //locate table UL
                        var g = jQuery("#T_" + tableID);
                        //READ THE table settings OBJECT, DETERMINE RECORD DISPLAY ORDER
                        //1. DISPLAY FROM USERVIEW
                        //2. DISPLAY FROM GROUPS

                        //reading viewer object here
                        var tableID1 = String(tableID);
                        var running_select_x = 1;

                        var table_display_type = pkey._table._get_setting({ "tableID": tableID1, "settings_name": "display_type" });
                        var table_sort_by = pkey._table._get_setting({ "tableID": tableID1, "settings_name": "sort_by" });

                        var rec_obj = {};
                        rec_obj["a"] = {};
                        rec_obj["r"] = {};
                        rec_obj["d"] = {};
                        var ax = 0, rx = 0, dx = 0;

                        if (table_sort_by === "group") {
                            for (var table in pkey["_recordset"]) {
                                var cut_table = table.substring(2);
                                if (cut_table == tableID1 && pkey["_recordset"][table]["list"] !== undefined) {
                                    log("_record._render_all proceeding into foreach");
                                    console.log(pkey["_recordset"][table]["list"]);
                                    for (var record in pkey["_recordset"][table]["list"]) {

                                        //GET THE ACTIVE RECORDS
                                        if (pkey["_recordset"][table]["list"][record]["record_groupID"] == null) {

                                            if (pkey["_recordset"][table]["list"][record]["record_status"] == "active") {
                                                var cr = String(record);
                                                var cut_recordID = cr.substring(2);
                                                //ADD TO rec_obj["a"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                rec_obj["a"][ax] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                ax++;
                                            }

                                            //NOW GET THE DELETED RECORDS, add to array
                                            if (pkey["_recordset"][table]["list"][record]["record_status"] == "deleted") {
                                                var cr = String(record);
                                                var cut_recordID = cr.substring(2);
                                                //ADD TO rec_obj["d"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                rec_obj["d"][dx] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                dx++;
                                            }
                                        }
                                    }
                                }
                            }

                            if (pkey._record_groups !== undefined) {
                                //RENDER BY RECORD GROUP****************************
                                //-active and non grouped
                                log('now get groups: ACTIVE');

                                var this_groupID = "";

                                for (var group in pkey["_record_groups"]) {
                                    if (pkey["_record_groups"][group] !== undefined) {
                                        //exclude the counter [cc], omit undefined
                                        //render the records in this group
                                        //alert("this group:"+group);
                                        this_groupID = pkey["_record_groups"][group]["record_groupID"];

                                        var rxc = 0;
                                        //alert("groupID:"+this_groupID);
                                        //search through recordset for any record with this record_groupID
                                        if (pkey["_recordset"] !== undefined) {
                                            for (var table in pkey["_recordset"]) {
                                                var cut_table = table.substring(2);
                                                if (cut_table == tableID1 && pkey["_recordset"][table] !== undefined && pkey["_recordset"][table]["list"] !== undefined) {
                                                    for (var record in pkey["_recordset"][table]["list"]) {
                                                        if (pkey["_recordset"][table]["list"][record] !== undefined) {
                                                            if (pkey["_recordset"][table]["list"][record]["record_status"] == "active") {
                                                                //if the current records groupID == this_groupID
                                                                if (pkey["_recordset"][table]["list"][record]["record_groupID"] == this_groupID) {
                                                                    //make the rec_obj[rx]
                                                                    if (tableID1 == pkey["_record_groups"][group]["tableID"]) {
                                                                        if (rec_obj["r"][rx] == undefined) { rec_obj["r"][rx] = {}; }
                                                                        var cr = String(record);
                                                                        var cut_recordID = cr.substring(2);
                                                                        //alert("cut_recordID:"+cut_recordID);
                                                                        //ADD TO rec_obj["r"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                                        rec_obj["r"][rx][rxc] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                                        rxc++;
                                                                        //pkey.record_render_single({"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x});
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        rx++;
                                    }
                                }
                                //-grouped
                                //-deleted
                            }
                        }

                        var mod_win_content = '<div id="myModal_mod_window" class="modal fade" role="dialog">'
                            + '<div class="modal-dialog modal-lg">'
                            + '<div class="modal-content">'
                            + '<div class="modal-header">'
                            + '<button type="button" id="tdx_modal_info_close" class="close" data-dismiss="modal">&times;</button>'
                            + '<h4 id="myModal_window_title" class="modal-title">Information</h4>'
                            + '</div>'
                            + '<div class="modal-body" id="tdx_mod_window_body">'
                            + '<div id="tdx_mod_window_div">&nbsp;</div>'
                            + '</div>'
                            + '<div class="modal-footer">'
                            + '<span id="tdx_popup_actions_wr"></span>'
                            + '<button type="button" id="tdx_close_modal_btn" class="btn btn-default" data-dismiss="modal">Close</button>'
                            + '<span class="tdx_popup_buttons_wr"></span>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>';

                        //var new_button = "<span id='corner_plus'><a href='javascript:void(0)' onclick='javascript:pkey.record_open_add_new(\"" + tableID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-plus'></i> </a></span>";

                        var content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                        var header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                        var main_header1 = pkey._table._get_setting({ "tableID": tableID, "settings_name": "main_header" });
                        var can_check = pkey._table._get_setting({ "tableID": tableID, "settings_name": "allow_selection" });

                        var can_user_settings = true, can_user_print = true;

                        var text_output = "", main_checkbox = "", printicon = "", settingsicon = "", bulk_action = "", head_record = "", textbox_spacer = "";

                        var t_table = "T_" + tableID;

                        var refreshicon = "";
                        refreshicon = "<a href='javascript:get_table({\"tableID\":\"" + tableID + "\"});'><span class='main_button'><i class='fa fa-refresh' aria-hidden='true'><span class='icontext'>Refresh</span></i></span></a>";

                        textbox_spacer = "<th><input type='checkbox' name='" + t_table + "_check_all' id='" + t_table + "_check_all' /></th>";
                        //bulk_action = "<a href='#'><span class='main_button'><i class='fa fa-clock-o'></i><span class='header_icontext'>Bulk Action</span></span></a>";

                        for (var col in header_columns) {
                            var coltitle = header_columns[col]["column_alias"];
                            if (text_output.length < 150) {
                                if (table_display_type === "data_table") {
                                    text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                                }
                                if (table_display_type === "list") {
                                    text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                                }
                            }
                        }
                        for (var col in content_columns) {
                            var coltitle = content_columns[col]["column_alias"];
                            if (table_display_type === "data_table") {
                                text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                            }
                            if (table_display_type === "list") {
                                if (text_output.length < 150) {
                                    text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                                }
                            }
                        }

                        if (can_user_print === true) {
                            printicon = "<a href='javascript:window.print();'><span class='main_button'><i class='fa fa-print' aria-hidden='true'><span class='icontext'>Print</span></i></span></a>";
                        }
                        if (can_user_settings === true) {
                            settingsicon = "<a href='#' onclick='javascript:pkey.table_display_settings(\"" + tableID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><span class='main_button'><i class='fa fa-cogs' aria-hidden='true'><span class='icontext'>Settings</span></i></span></a>";
                        }

                        if (can_check === true) {
                            main_checkbox = "<input type='checkbox' id='tdx_main_check_T_" + tableID + "' onchange='javascript:record_UI_checkall(\"" + tableID + "\");' />";
                        }
                        else {
                            main_checkbox = "";
                        }

                        head_record = "";//pkey.table_get_head_recordID({"tableID": tableID});

                        //CLEAR THE CONTENT OF THE TABLE UL
                        //if main_header1 == true place main header
                        if (main_header1 === true || main_header1 === "true") {
                            //what is the display type?
                            //if data_table place a <table>
                            if (table_display_type === "data_table") {
                                g.html("<thead><tr class='tdx_main_header' id='T_" + tableID + "_main_header'>" + textbox_spacer + text_output + "<th>" + bulk_action + printicon + settingsicon + refreshicon + "</th></tr></thead>");
                            }
                            //if list make ul,li
                            if (table_display_type === "list") {
                                g.html("<li class='tdx_main_header' id='T_" + tableID + "_main_header'>" + main_checkbox + "<span class='tdx_main_header_cols'>" + text_output + "</span><span class='buttons_main'>" + bulk_action + printicon + settingsicon + refreshicon + "</span></li>");
                            }
                        }
                        else {
                            g.html("");
                        }

                        //insert records into table UL

                        //g.append("<li id='R_"+tableID+"_"+this_recordID+"' style='border:thin solid red'></li>");
                        //g.append("<li style='border:thin solid red;'>testss</li>");

                        //SORT THROUGH THE rec_obj array and display the records
                        var active_length = ax;
                        var group_length = rx;
                        var del_length = dx;

                        log("1431:tableID " + tableID + " " + JSON.stringify(rec_obj));
                        log("1432:tableID " + tableID + " r" + JSON.stringify(rec_obj["r"]));
                        log("1433:tableID " + tableID + " d" + JSON.stringify(rec_obj["d"]));

                        //PLACE THE ACTIVE RECORDS
                        for (var ac = 0; ac < active_length; ac++) {
                            pkey.record_render_single(rec_obj["a"][ac]);
                        }
                        //NOW THE RECORD GROUPS
                        for (var rc = 0; rc < group_length; rc++) {
                            //COUNT UP THE RXC FOR THIS RECORD GROUP
                            var temp54 = 0;
                            for (var temp4 in rec_obj["r"][rc]) {
                                //increment temp54 1
                                temp54++;
                            }
                            var lenggg = (temp54 !== 0) ? temp54 : 0;
                            for (var rcc = 0; rcc < lenggg; rcc++) {
                                pkey.record_render_single(rec_obj["r"][rc][rcc]);
                            }
                        }
                        //NOW THE DELETED
                        for (var dc = 0; dc < del_length; dc++) {
                            pkey.record_render_single(rec_obj["d"][dc]);
                        }

                        //RESET rec_obj
                        rec_obj = {};
                        rec_obj["a"] = {};
                        rec_obj["r"] = {};
                        rec_obj["d"] = {};
                        ax = 0;
                        rx = 0;
                        dx = 0;
                        //alert(JSON.stringify(rec_obj["r"]));

                        //place the records into the table UL

                        var myModal_mod_window1 = jQuery("#myModal_mod_window");
                        if (!myModal_mod_window1.length) {
                            jQuery('body').prepend(mod_win_content);
                        }

                        //SET THE DATATABLE STUFF AFTER A FEW SECONDS
                        if (table_display_type === "data_table") {
                            setTimeout(function () {
                                g.DataTable({
                                    "columnDefs": [
                                        { "width": "10px", "targets": 0 },
                                        { "width": "356px", "targets": -1 },
                                        { "orderable": false, "targets": 0 },
                                        { "orderable": false, "targets": -1 }
                                    ]

                                })
                            }, 3000);
                            //g.DataTable();
                        }
                    });

                }
            }
        },
        _render_single: function (obj) { },
        _delete_handler: function (obj) { },
        _update: function (obj) { },
        _open: {
            _render: function (obj) { },
            _render_add_new: function (obj) { },
            _render_colproc: function (obj) { }
        },
    },
    _render: {
        _table: {
            _all: function (o) { },
            _place_single: function (o) { },
            _pull_single: function (o) { }
        },
        _column: {
            _hook: function (o) { }
        },
        _record: {
            _all: function (obj) { },
            _all_normal: function (obj) { },
            _all_grouped: function (o) {
                console.log("------- _render. _record. _all_grouped()");
                var rec_obj = {};
                rec_obj["a"] = {};
                rec_obj["r"] = {};
                rec_obj["d"] = {};
                var ax = 0, rx = 0, dx = 0;
                if (_pkey["_record"]["_list"].length > 0) {
                    log("<span style='color:blue;'>RECORD LIST POPULATED " + o["tableID"] + "</span>");
                }
            },
            _place_single: function (obj) { },
            _pull_single: function (obj) { },
            _buttons: {
                _action: function (obj) { },
                _view: function (obj) { },
                _edit: function (obj) { },
                _delete: function (obj) { }
            }

        }

    },
    get_timestamp: function () {
        var dd = new Date();
        var stamp = dd.getTime();
        var le = 0;
        stamp = String(stamp);//typecast to string
        le = stamp.length; //count the time character length
        le = le - 3;//the time character length - minus the milliseconds (3 digits)
        stamp = stamp.substr(0, le);//cut milliseconds off
        return stamp;
    },
    record_group_ds: function (obj) {
        if (obj) {
            if (obj["record_groups"] !== undefined) {
                //alert("record groups:"+JSON.stringify(obj));
                //BREAK DOWN MULTIPLE RECORD GROUPS INTO SINGLES
                for (var g in obj["record_groups"]) {
                    //SEND SINGLES TO pkey.record_group_place()
                    pkey.record_group_place(obj["record_groups"][g]);
                }
            }
        }
    },
    record_group_place: function (obj) {
        if (obj) {
            //RECEIVE SINGLE RECORD GROUPS AND PLACE INTO DOM
            //DOM LOCATION: pkey._record_groups = {ID: {key1:value1}}

            //check if the base _record_groups exists
            if (!pkey._record_groups || pkey._record_groups === undefined) {
                pkey._record_groups = {};
            }

            var check_these = [
                "record_groupID",
                "record_group_slug",
                "record_group_alias",
                "rgb_color",
                "description",
                "default_display",
                "tableID"
            ];
            var ctc = check_these.length;
            var pass_obj = {};

            log("record group place:" + JSON.stringify(obj));
            //get record_groupID specially
            var record_groupID = (obj["record_groupID"] !== undefined) ? obj["record_groupID"] : "";

            for (var x = 0; x < ctc; x++) {
                //sort through the check_these array and find matches
                if (obj[check_these[x]] !== undefined) {
                    pass_obj[check_these[x]] = obj[check_these[x]];
                }
            }

            if (record_groupID !== "") {
                pkey._record_groups["RG_" + record_groupID] = {};
                pkey._record_groups["RG_" + record_groupID] = pass_obj;
            }
            else {
                log("record_group_place: record_groupID == ''");
            }
        }
    },
    record_update: function (obj) {
        log('record_update:received:' + JSON.stringify(obj));
        if (obj) {
            if (obj["result"] !== undefined && obj["result"] === "true") {

                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                var table_target1 = (obj["table_target"] !== undefined) ? obj["table_target"] : "";

                //log("DATA UPDATED");

                if (obj["window_action"] !== undefined && obj["window_action"] === "close") {
                    //was new flag
                    var window_div = jQuery("#myModal_mod_window");
                    window_div.modal("toggle");
                }

            }

        }
    },
    record_render_all: function (obj) {
        if (obj) {
            tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
            deletion_pass = (obj["deletion_pass"] !== undefined) ? obj["deletion_pass"] : false;

            //using tableID you can find the UL
            //alert('record_render_all:' + tableID);
            log("record_render_all with tableID " + tableID);
            if (tableID !== "") {

                jQuery(document).ready(function () {

                    //locate table UL
                    var g = jQuery("#T_" + tableID);
                    //alert('Render table:'+tableID);
                    //READ THE table settings OBJECT, DETERMINE RECORD DISPLAY ORDER
                    //1. DISPLAY FROM USERVIEW
                    //2. DISPLAY FROM GROUPS

                    //reading viewer object here
                    var tableID1 = String(tableID);
                    var running_select_x = 1;

                    var table_display_type = pkey._table._get_setting({ "tableID": tableID1, "settings_name": "display_type" });
                    var table_sort_by = pkey._table._get_setting({ "tableID": tableID1, "settings_name": "sort_by" });

                    //alert("table_settings returned:"+table_sort_by);

                    var rec_obj = {};
                    rec_obj["a"] = {};
                    rec_obj["r"] = {};
                    rec_obj["d"] = {};
                    var ax = 0, rx = 0, dx = 0;

                    //if(table_display_type === "list"){

                    if (table_sort_by === "group") {
                        log("table sort by GROUP:1253");
                        if (pkey["_recordset"] !== undefined) {
                            for (var table in pkey["_recordset"]) {
                                var cut_table = table.substring(2);
                                if (cut_table == tableID1 && pkey["_recordset"][table] !== undefined && pkey["_recordset"][table]["list"] !== undefined) {
                                    log("!!1260!! record_render_all proceeding into foreach");
                                    for (var record in pkey["_recordset"][table]["list"]) {

                                        //GET THE ACTIVE RECORDS THAT ARE NOT GROUPED
                                        if (pkey["_recordset"][table]["list"][record] !== undefined) {

                                            if (pkey["_recordset"][table]["list"][record]["record_groupID"] == null) {

                                                if (pkey["_recordset"][table]["list"][record]["record_status"] == "active") {
                                                    var cr = String(record);
                                                    var cut_recordID = cr.substring(2);
                                                    //alert("cut_recordID:"+cut_recordID);
                                                    //ADD TO rec_obj["r"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                    rec_obj["a"][ax] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                    ax++;
                                                    //pkey.record_render_single({"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x});
                                                }

                                                //NOW GET THE DELETED RECORDS, add to array
                                                if (pkey["_recordset"][table]["list"][record]["record_status"] == "deleted") {
                                                    var cr = String(record);
                                                    var cut_recordID = cr.substring(2);
                                                    //alert("cut_recordID:"+cut_recordID);
                                                    //ADD TO rec_obj["r"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                    rec_obj["d"][dx] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                    dx++;
                                                    //pkey.record_render_single({"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x});
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (pkey._record_groups !== undefined) {
                            //RENDER BY RECORD GROUP****************************
                            //-active and non grouped
                            log('now get groups: ACTIVE');

                            var this_groupID = "";

                            for (var group in pkey["_record_groups"]) {
                                if (pkey["_record_groups"][group] !== undefined) {
                                    //exclude the counter [cc], omit undefined
                                    //render the records in this group
                                    //alert("this group:"+group);
                                    this_groupID = pkey["_record_groups"][group]["record_groupID"];

                                    var rxc = 0;
                                    //alert("groupID:"+this_groupID);
                                    //search through recordset for any record with this record_groupID
                                    if (pkey["_recordset"] !== undefined) {
                                        for (var table in pkey["_recordset"]) {
                                            var cut_table = table.substring(2);
                                            if (cut_table == tableID1 && pkey["_recordset"][table] !== undefined && pkey["_recordset"][table]["list"] !== undefined) {
                                                for (var record in pkey["_recordset"][table]["list"]) {
                                                    if (pkey["_recordset"][table]["list"][record] !== undefined) {
                                                        if (pkey["_recordset"][table]["list"][record]["record_status"] == "active") {
                                                            //if the current records groupID == this_groupID
                                                            if (pkey["_recordset"][table]["list"][record]["record_groupID"] == this_groupID) {
                                                                //make the rec_obj[rx]
                                                                if (tableID1 == pkey["_record_groups"][group]["tableID"]) {
                                                                    if (rec_obj["r"][rx] == undefined) { rec_obj["r"][rx] = {}; }
                                                                    var cr = String(record);
                                                                    var cut_recordID = cr.substring(2);
                                                                    //alert("cut_recordID:"+cut_recordID);
                                                                    //ADD TO rec_obj["r"] = {"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x};
                                                                    rec_obj["r"][rx][rxc] = { "tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x };
                                                                    rxc++;
                                                                    //pkey.record_render_single({"tableID": tableID, "recordID": cut_recordID, "this_running_x": running_select_x});
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    rx++;
                                }
                            }
                            //-grouped
                            //-deleted
                        }
                    }

                    if (table_sort_by === "user") {
                        rec_obj["a"][ax] = { "recordID": "1", "tableID": "1" };
                        ax++;

                    }
                    //}

                    var mod_win_content = '<div id="myModal_mod_window" class="modal fade" role="dialog">'
                        + '<div class="modal-dialog modal-lg">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" id="tdx_modal_info_close" class="close" data-dismiss="modal">&times;</button>'
                        + '<h4 id="myModal_window_title" class="modal-title">Information</h4>'
                        + '</div>'
                        + '<div class="modal-body" id="tdx_mod_window_body">'
                        + '<div id="tdx_mod_window_div">&nbsp;</div>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + '<span id="tdx_popup_actions_wr"></span>'
                        + '<button type="button" id="tdx_close_modal_btn" class="btn btn-default" data-dismiss="modal">Close</button>'
                        + '<span class="tdx_popup_buttons_wr"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    //var new_button = "<span id='corner_plus'><a href='javascript:void(0)' onclick='javascript:pkey.record_open_add_new(\"" + tableID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-plus'></i> </a></span>";

                    var content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                    var header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                    var main_header1 = pkey._table._get_setting({ "tableID": tableID, "settings_name": "main_header" });
                    var can_check = pkey._table._get_setting({ "tableID": tableID, "settings_name": "allow_selection" });

                    var can_user_settings = true, can_user_print = true;

                    var text_output = "", main_checkbox = "", printicon = "", settingsicon = "", bulk_action = "", head_record = "", textbox_spacer = "";

                    var t_table = "T_" + tableID;

                    var refreshicon = "";
                    refreshicon = "<a href='javascript:get_table({\"tableID\":\"" + tableID + "\"});'><span class='main_button'><i class='fa fa-refresh' aria-hidden='true'><span class='icontext'>Refresh</span></i></span></a>";

                    textbox_spacer = "<th><input type='checkbox' name='" + t_table + "_check_all' id='" + t_table + "_check_all' /></th>";
                    //bulk_action = "<a href='#'><span class='main_button'><i class='fa fa-clock-o'></i><span class='header_icontext'>Bulk Action</span></span></a>";

                    for (var col in header_columns) {
                        var coltitle = header_columns[col]["column_alias"]; //pkey.column_get_alias(header_columns[col]);
                        if (text_output.length < 150) {
                            if (table_display_type === "data_table") {
                                text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                            }
                            if (table_display_type === "list") {
                                text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                            }
                        }
                    }
                    for (var col in content_columns) {
                        var coltitle = content_columns[col]["column_alias"]; //pkey.column_get_alias(content_columns[col]);
                        //if(text_output.length < 150){
                        if (table_display_type === "data_table") {
                            text_output += "<th class='tdx_column_header_key'>" + coltitle + "</th>";
                        }
                        if (table_display_type === "list") {
                            text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                        }
                        //}
                    }

                    if (can_user_print === true) {
                        printicon = "<a href='javascript:window.print();'><span class='main_button'><i class='fa fa-print' aria-hidden='true'><span class='icontext'>Print</span></i></span></a>";
                    }
                    if (can_user_settings === true) {
                        settingsicon = "<a href='#' onclick='javascript:pkey.table_display_settings(\"" + tableID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><span class='main_button'><i class='fa fa-cogs' aria-hidden='true'><span class='icontext'>Settings</span></i></span></a>";
                    }

                    if (can_check === true) {
                        main_checkbox = "<input type='checkbox' id='tdx_main_check_T_" + tableID + "' onchange='javascript:record_UI_checkall(\"" + tableID + "\");' />";
                    }
                    else {
                        main_checkbox = "";
                    }

                    head_record = "";//pkey.table_get_head_recordID({"tableID": tableID});

                    //CLEAR THE CONTENT OF THE TABLE UL
                    //if main_header1 == true place main header
                    if (main_header1 === true || main_header1 === "true") {
                        //what is the display type?
                        //if data_table place a <table>
                        if (table_display_type === "data_table") {
                            g.html("<thead><tr class='tdx_main_header' id='T_" + tableID + "_main_header'>" + textbox_spacer + text_output + "<th>" + bulk_action + printicon + settingsicon + refreshicon + "</th></tr></thead>");
                        }
                        if (table_display_type === "list") {
                            g.html("<li class='tdx_main_header' id='T_" + tableID + "_main_header'>" + main_checkbox + "<span class='tdx_main_header_cols'>" + text_output + "</span><span class='buttons_main'>" + bulk_action + printicon + settingsicon + refreshicon + "</span></li>");
                        }
                    }
                    else {
                        g.html("");
                    }

                    //insert records into table UL

                    //g.append("<li id='R_"+tableID+"_"+this_recordID+"' style='border:thin solid red'></li>");
                    //g.append("<li style='border:thin solid red;'>testss</li>");

                    //SORT THROUGH THE rec_obj array and display the records
                    var active_length = ax;
                    var group_length = rx;
                    var del_length = dx;

                    log("1431:tableID " + tableID + " " + JSON.stringify(rec_obj));
                    log("1432:tableID " + tableID + " r" + JSON.stringify(rec_obj["r"]));
                    log("1433:tableID " + tableID + " d" + JSON.stringify(rec_obj["d"]));

                    //PLACE THE ACTIVE RECORDS
                    for (var ac = 0; ac < active_length; ac++) {
                        pkey.record_render_single(rec_obj["a"][ac]);
                    }
                    //NOW THE RECORD GROUPS
                    for (var rc = 0; rc < group_length; rc++) {
                        //COUNT UP THE RXC FOR THIS RECORD GROUP
                        var temp54 = 0;
                        for (var temp4 in rec_obj["r"][rc]) {
                            //increment temp54 1
                            temp54++;
                        }
                        var lenggg = (temp54 !== 0) ? temp54 : 0;
                        for (var rcc = 0; rcc < lenggg; rcc++) {
                            pkey.record_render_single(rec_obj["r"][rc][rcc]);
                        }
                    }
                    //NOW THE DELETED
                    for (var dc = 0; dc < del_length; dc++) {
                        pkey.record_render_single(rec_obj["d"][dc]);
                    }

                    //RESET rec_obj
                    rec_obj = {};
                    rec_obj["a"] = {};
                    rec_obj["r"] = {};
                    rec_obj["d"] = {};
                    ax = 0;
                    rx = 0;
                    dx = 0;
                    //alert(JSON.stringify(rec_obj["r"]));

                    //place the records into the table UL

                    var myModal_mod_window1 = jQuery("#myModal_mod_window");
                    if (!myModal_mod_window1.length) {
                        jQuery('body').prepend(mod_win_content);
                    }

                    //SET THE DATATABLE STUFF AFTER A FEW SECONDS
                    if (table_display_type === "data_table") {
                        setTimeout(function () {
                            g.DataTable({
                                "columnDefs": [
                                    { "width": "10px", "targets": 0 },
                                    { "width": "356px", "targets": -1 },
                                    { "orderable": false, "targets": 0 },
                                    { "orderable": false, "targets": -1 }
                                ]

                            })
                        }, 3000);
                        //g.DataTable();
                    }
                });

            }
        }
    },
    record_render_single: function (obj) {
        if (obj) {
            //alert("single:"+JSON.stringify(obj));
            jQuery(document).ready(function () {

                var authorID, next_recordID, prev_versionID, timestamp, content_object = {};
                var header_content = "", record_content = "", check_box_pos = "", sel_menu;
                var sendobj = {}, sox = 0;

                var can_edit = false,
                    can_delete = false,
                    can_new = false,
                    allow_drag_reorder = false,
                    display_type = "",
                    column_hooks = {},
                    content_columns = {},
                    header_columns = {},
                    record_buttons = {},
                    record_buttons_out = "";

                var edit_pos = "", delete_pos = "";

                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
                var t_tableID = (obj["tableID"] !== undefined) ? "T_" + obj["tableID"] : "";
                var recordID = (obj["recordID"] !== undefined) ? obj["recordID"] : "";
                var r_recordID = (obj["recordID"] !== undefined) ? "R_" + obj["recordID"] : "";

                var temp_total = (pkey["_recordset"] && pkey["_recordset"][t_tableID] && pkey["_recordset"][t_tableID]["cc"]) ? pkey["_recordset"][t_tableID]["cc"] : 0;
                var this_running_x = (obj["this_running_x"] !== undefined) ? obj["this_running_x"] : 1;

                log("record_render_single:T:" + t_tableID + "; R:" + r_recordID);

                can_edit = pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_edit" });

                if (can_edit === true) {
                    edit_pos = "<a href='#' onclick='javascript:pkey.record_edit(\"" + tableID + "\",\"" + r_recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>";
                }
                if (can_delete === true) {
                    delete_pos = "<a href='javascript:pkey.record_delete(\"" + tableID + "\",\"" + r_recordID + "\")'><i class='fa fa-2x fa-times' aria-hidden='true'></i></a>";
                }

                display_type = pkey._table._get_setting({ "tableID": tableID, "settings_name": "display_type" });
                can_delete = pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_delete" });
                can_new = pkey._table._get_setting({ "tableID": tableID, "settings_name": "can_new" });

                content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                record_buttons = pkey._table._get_setting({ "tableID": tableID, "settings_name": "record_buttons" });

                //COLUMN HOOKS
                column_hooks = pkey._table._get_setting({ "tableID": tableID, "settings_name": "column_hooks" });
                var hooks_add = "";

                //log(JSON.stringify("DISPLAY TYPE:"+display_type));
                //log(JSON.stringify(column_hooks));

                //sort through column values in the 'header_columns' and 'content_columns'
                if (pkey["_recordset"][t_tableID] !== undefined) {
                    if (pkey["_recordset"][t_tableID]["list"] !== undefined) {
                        if (pkey["_recordset"][t_tableID]["list"][r_recordID] !== undefined) {
                            var content = pkey["_recordset"][t_tableID]["list"][r_recordID];
                            for (var column in content) {
                                var coltitle = column; //pkey.column_get_alias(column);
                                var temp = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10631.313101395894!2d-101.29337615920953!3d48.2291811776599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a64d9f078442083!2sMcDonalds!5e0!3m2!1sen!2sus!4v1496770932106" style="border:0" allowfullscreen="" width="400" height="300" frameborder="0"></iframe>';

                                //CHECK THE HEADER_COLUMNS FIRST, ADD TO HEADER
                                for (var col in header_columns) {
                                    if (header_columns[col]["column_slug"] === column) {
                                        coltitle = header_columns[col]["column_alias"];
                                        if (display_type === "data_table") {
                                            header_content += "<td>" + content[column] + "</td>";
                                        }
                                        if (display_type === "list") {
                                            header_content += "<span class='tdx_column_header_key' >" + coltitle + ":</span>" + content[column];
                                        }
                                    }
                                }

                                //CHECK THE CONTENT_COLUMNS SECOND, ADD TO RECORD_CONTENT
                                for (var col in content_columns) {
                                    if (content_columns[col]["column_slug"] === column) {
                                        coltitle = content_columns[col]["column_alias"];
                                        hooks_add = "";
                                        for (var hc in column_hooks) {
                                            //get the value for this column
                                            var tempadd = "";
                                            tempadd += "column_slug:" + column_hooks[hc]["column_slug"] + ";";
                                            tempadd += "column:" + column + ";";
                                            tempadd += "column_hooks type:" + column_hooks[hc]["type"] + ";";

                                            //COLUMN HOOK CHECKS HERE ******************************
                                            //---GOOGLE MAP
                                            if (column_hooks[hc]["column_slug"] === column && column_hooks[hc]["type"] === "google_map") {
                                                hooks_add = "<span class='tdx_column_key'>&nbsp;</span><span class='tdx_maplink tdx_column_value' style='display:inline;float:left;'><a href='javascript:tdx_toggle(\"" + "GMAP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "\");'>Show On Map</a></span>";
                                                hooks_add += "<div id='GMAP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "' style='display:none'>" + temp + "</div>";
                                                //inner_text: "<a href='javascript:tdx_toggle(\"" + "GMAP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"] + "\");'>Show On Map</a>",
                                                //class_name: "tdx_maplink"
                                            }
                                        }
                                        //ID: "SP_" + table_name + "_" + content_columns[hc] + "_" + obj["P_ID"]
                                        if (display_type === "data_table") {
                                            record_content += "<td id='SP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "'>" + content[column] + "" + hooks_add +/*tempadd+*/"</td>";
                                        }
                                        if (display_type === "list") {
                                            record_content += "<div class='tdx_column_wrapper' id='SP_" + t_tableID + "_" + content_columns[col]["column_slug"] + "_" + r_recordID + "'><span class='tdx_column_key'>" + coltitle + ":</span><span class='tdx_column_value'>" + content[column] + "</span>" + hooks_add +/*tempadd+*/"<div style='clear:both;height:0px'>&nbsp;</div></div>";
                                        }

                                        //record_content += JSON.stringify();
                                    }

                                }

                            }


                        }
                    }
                }



                var edit_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:pkey.record_edit(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a></span>";
                var view_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:pkey.record_view(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-window-maximize' aria-hidden='true'><span class='icontext'>View</span></i></a></span>";
                var del_button = "<span class='tdx_ved_buttons del'><a href='javascript:void(0)' onclick='javascript:pkey.record_delete(\"" + tableID + "\",\"" + recordID + "\");'><i class='fa fa-times' aria-hidden='true'><span class='icontext'>Delete</span></i></a></span>";
                var ver_button = "";//"<span class='tdx_ved_buttons versions'><a href='javascript:void(0)' onclick='javascript:pkey.record_render_versions(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-code-fork' aria-hidden='true'></i></a></span>";

                check_box_pos = "<input type='checkbox' id='CH_T_" + tableID + "_R_" + recordID + "' class='tdx_record_checkbox' onchange='javascript:record_UI_sel(\"" + tableID + "\");'/>";

                //select_menu_output(total, selected, id, tableID)
                //sel_menu = "<span class=''>"+this_running_x+"</span>";
                if (display_type === "tasks") {
                    sel_menu = "<span class=''>" + select_menu_output(temp_total, this_running_x, recordID, tableID) + "</span>";
                }
                else {
                    sel_menu = "";
                }


                //sort through record_buttons
                for (var rb in record_buttons) {
                    //alert(JSON.stringify(record_buttons[rb]));
                    var callout = "", call_put = "", outp = "", text_thing2 = "", text_thing = "", wrapper_class = "", icon_class = "", icon_text = "", hrf = "", modal_targetID = "";

                    if (record_buttons[rb]["callout"] !== undefined) {
                        callout = record_buttons[rb]["callout"];
                        if (callout === "action") {
                            call_put = "onclick='javascript:get_actions(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "action_people") {
                            call_put = "onclick='javascript:get_actions_people(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "action_jobs") {
                            call_put = "onclick='javascript:get_actions_jobs(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "job") {
                            call_put = "onclick='javascript:get_job(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "customer") {
                            call_put = "onclick='javascript:get_customer(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "inventory") {
                            call_put = "onclick='javascript:get_inventory(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                        if (callout === "information") {
                            call_put = "onclick='javascript:get_information(\"" + tableID + "\",\"" + recordID + "\")'";
                        }
                    }

                    if (record_buttons[rb]["wrapper_class"] !== undefined) {
                        wrapper_class = record_buttons[rb]["wrapper_class"];
                    }

                    if (record_buttons[rb]["icon_text"] !== undefined) {
                        icon_text = record_buttons[rb]["icon_text"];
                        text_thing = "<span class='icontext'>" + icon_text + "</span>";
                        text_thing2 = text_thing;
                        outp = text_thing;
                    }
                    if (record_buttons[rb]["icon_class"] !== undefined) {
                        icon_class = record_buttons[rb]["icon_class"];
                        text_thing2 = "<i class='" + icon_class + "'>" + text_thing + "</i>";
                        outp = text_thing2;
                    }

                    if (record_buttons[rb]["hrf"] !== undefined) {
                        //IF MODALTARGETid
                        hrf = record_buttons[rb]["hrf"];
                        //OVERWRITE OUTP
                        outp = "<a href='" + hrf + "'>" + text_thing2 + "</a>";
                    }


                    if (record_buttons[rb]["modal_targetID"] !== undefined) {
                        modal_targetID = record_buttons[rb]["modal_targetID"];
                        //OVERWRITE outp
                        outp = "<a href='" + hrf + "' data-toggle='modal' data-target='#" + modal_targetID + "' " + call_put + ">" + text_thing2 + "</a>";
                    }

                    record_buttons_out += "<span class='" + wrapper_class + "'>" + outp + "</span>";
                }

                var g = jQuery("#" + t_tableID);

                var buttons2 = "";

                if (display_type === "data_table") {
                    buttons2 = "<td>" + record_buttons_out + "" + view_button + edit_button + del_button + ver_button + "</td>";
                    var output_text = "<tr id='" + t_tableID + "_" + r_recordID + "' class='ui-sortable-handle'><td class='tdx_header_checkbox_wr'>" + check_box_pos + "</td>" + "" + header_content + "" + record_content + buttons2 + "</tr>";
                }
                if (display_type === "list") {
                    buttons2 = "<span class='action_button'>" + record_buttons_out + "<span class='record_header_right'>" + view_button + edit_button + del_button + ver_button + "</span></span>";
                    var output_text = "<li id='" + t_tableID + "_" + r_recordID + "' class='record_li ui-sortable-handle'><div class='record_header'><span class='tdx_header_checkbox_wr'>" + check_box_pos + "</span>" + sel_menu + "<span class='record_header_text'>" + header_content + "</span>" + buttons2 + "</div><div class='record_content'>" + record_content + "</div></li>";
                }



                //log('placing append:' + output_text);
                g.append(output_text);

                //COLUMN HOOKS
                //column_hooks = pkey._table._get_setting({"tableID": tableID, "settings_name": "column_hooks"});

                for (var hc in column_hooks) {
                    //get the value for this column
                    if (column_hooks[hc]["type"] === "google_map") {
                        var temp = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10631.313101395894!2d-101.29337615920953!3d48.2291811776599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a64d9f078442083!2sMcDonalds!5e0!3m2!1sen!2sus!4v1496770932106" style="border:0" allowfullscreen="" width="400" height="300" frameborder="0"></iframe>';
                        //alert("column_hook map:"+JSON.stringify(column_hooks[hc]));
                        //SP_"+t_tableID+"_"+content_columns[col]+"_"+r_recordID+"
                        sendobj[sox] = {
                            type: "span",
                            content: {
                                parentID: "SP_" + t_tableID + "_" + content_columns[col] + "_" + r_recordID,
                                placement_type: "append_innerHTML",
                                inner_text: "<a href='javascript:tdx_toggle(\"" + "GMAP_" + t_tableID + "_" + content_columns[col] + "_" + r_recordID + "\");'>Show On Map</a>",
                                class_name: "tdx_maplink"
                            }

                        };
                        sox++;

                        sendobj[sox] = {
                            type: "span",
                            content: {
                                parentID: "SP_" + t_tableID + "_" + content_columns[col] + "_" + r_recordID,
                                placement_type: "append_innerHTML",
                                inner_text: temp,
                                class_name: "tdx_maplink",
                                ID: "GMAP_" + t_tableID + "_" + content_columns[col] + "_" + r_recordID,
                                styles: "display:none;"
                            }

                        };
                        sox++;
                    }
                }
                //place the column_hooks using elem_do()
                //pkey.elem_do(sendobj);
            });
        }
    },
    record_edit: function (tableID, recordID, subtab) {
        //alert('edit');
        pkey.record_set_setting({ "settings_name": "mode", "settings_value": "e", "recordID": recordID, "tableID": tableID, "subtab": subtab });
        pkey.record_open(tableID, recordID, subtab);
    },
    record_view: function (tableID, recordID, subtab) {
        pkey.record_set_setting({ "settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID, "subtab": subtab });
        pkey.record_open(tableID, recordID, subtab);
    },
    record_delete: function (tableID, recordID) {
        if (tableID && recordID) {
            if (confirm("Are you sure you want to delete this record?") === true) {
                var sender = { "tableID": tableID, "recordID": recordID };
                pkey.univ_post("delete_recordID", sender, pkey.record_delete_handler);
                //pkey.record_render_all(tableID);
            }
            //UNIV_POST THE DELETE
            //IF DELETE IS SUCCESSFUL THEN pkey._record._pull();

        }
        return false;
    },
    record_delete_handler: function (obj) {
        if (obj) {
            //alert(JSON.stringify(obj));
            var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
            var recordID_delete = (obj["recordID_delete"] !== undefined) ? obj["recordID_delete"] : "";

            //notify("RECORD DELETED", "Record successfully deleted.", "green_check");
            pkey._record._pull({ "tableID": tableID, "recordID": recordID_delete });
            pkey.record_render_all({ "tableID": tableID });
            //pkey._table._pull( { "tableID" : tableID } );
            //get_table({"tableID": tableID, "table_target": "tsbp_tasks"});
        }
    },
    record_save: function (tableID, recordID, window_action) {
        if (tableID) {

            if (recordID !== "") {
                //compare values from textboxes to dom
                //univ_post any changes
                var is_mod = pkey.record_is_mod({ "tableID": tableID, "recordID": recordID });
                var table_target = (pkey["_tables"]["T_" + tableID]["table_target"] !== undefined) ? pkey["_tables"]["T_" + tableID]["table_target"] : "";
                //var table_target = "V" + tableID;

                log("record_save is_mod=" + JSON.stringify(is_mod));
                if (is_mod !== undefined && (typeof is_mod === "object")) {
                    is_mod["window_action"] = window_action;
                    log('SEND IT! ' + JSON.stringify(is_mod));
                    pkey.univ_post("set_record_content", is_mod, pkey.record_update);
                }
                else {
                    notify("NOTICE!", "No changes were made to the record you are trying to save...");

                }
            }
            //IF NEW
            if (recordID === "N") {
                //sort through the tables elements and get their textbox value from the add new window
                //item_ID = String("RCE_" + tableID + "_" + header_columns[x] + "_N");
                log("record_save:N");
                var content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                var header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                var text_output = "";
                var ret = {};
                ret["tableID"] = tableID;
                ret["recordID"] = "N";
                ret["_TIMESTAMP"] = pkey.get_timestamp();
                ret["content_object"] = {};

                for (var col in content_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_N");
                    var coltitle = content_columns[col]["column_alias"];
                    ret["content_object"][content_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_N";
                }
                for (var col in header_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_N");
                    var coltitle = header_columns[col]["column_slug"];
                    ret["content_object"][header_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_N";
                }
                //alert(text_output);
                //alert(JSON.stringify(ret));
                ret["table_target"] = table_target;
                ret["window_action"] = window_action;
                log('<B>*******<BR>SEND IT! ' + JSON.stringify(ret) + '</B>');
                pkey.univ_post("set_record_content", ret, pkey.record_update);
            }
            else {
                //NOT NEW
                //sort through the tables elements and get their textbox value from the add new window
                log("record_save:NOT NEW");
                var content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });
                var header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
                var text_output = "";
                var ret = {};
                ret["tableID"] = tableID;
                ret["recordID"] = recordID;
                ret["_TIMESTAMP"] = pkey.get_timestamp();
                ret["content_object"] = {};
                for (var col in content_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = content_columns[col]["column_alias"];
                    ret["content_object"][content_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + content_columns[col]["column_slug"] + "_" + recordID;
                }
                for (var col in header_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID);
                    var coltitle = header_columns[col]["column_slug"];
                    ret["content_object"][header_columns[col]["column_slug"]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + header_columns[col]["column_slug"] + "_" + recordID;
                }
                //alert(text_output);
                //alert(JSON.stringify(ret));
                ret["table_target"] = table_target;
                ret["window_action"] = window_action;
                log('<B>*******<BR>SEND IT! ' + JSON.stringify(ret) + '</B>');
                pkey.univ_post("set_record_content", ret, pkey.record_update);
            }

        }
    },
    record_open: function (tableID, recordID) {
        if (tableID && recordID) {
            var curr_setting, mod_window_div;
            var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_val2 = "", this_col_value = "";
            var onchange_insert = "", item_ID = "";
            log("pkey.record_open:" + tableID + "; " + recordID);
            //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
            //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
            //CHANGE THE MOD WINDOW TO CONTAIN THIS RECORD FOR EDIT
            if (recordID === "N") {
                //NEW RECORD
                log("record_open:YES NEW RECORD");
                curr_setting = "N";
            }
            else {
                curr_setting = pkey.record_get_setting({ "settings_name": "mode", "recordID": recordID, "tableID": tableID });
            }
            //mod_window_div = jQuery("#tdx_mod_window_div");
            //log('record_open:current mode:'+curr_setting);
            //header_columns = pkey._table._get_setting({"tableID": tableID, "settings_name": "header_columns"});
            //content_columns = pkey._table._get_setting({"tableID": tableID, "settings_name": "content_columns"});
            //log("2420:record_open header_columns:" + JSON.stringify(header_columns));
            //log("2420:content_columns:" + JSON.stringify(content_columns));
            //log("curr_setting:" + curr_setting);

            pkey.record_open_render(tableID, recordID);

        }
    },
    record_open_render: function (tableID, recordID) {
        if (tableID && recordID) {
            var mod_window_div = jQuery("#tdx_mod_window_div");
            var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_val2 = "", this_col_value = "";
            var onchange_insert = "", item_ID = "";
            var curr_setting;

            header_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "header_columns" });
            content_columns = pkey._table._get_setting({ "tableID": tableID, "settings_name": "content_columns" });

            if (recordID === "N") {
                //NEW RECORD
                log("record_open:YES NEW RECORD");
                curr_setting = "N";
            }
            else {
                curr_setting = pkey.record_get_setting({ "settings_name": "mode", "recordID": recordID, "tableID": tableID });
            }

            if (curr_setting === "e" || curr_setting === "N") {
                //CURRENTLY IN EDIT MODE
                if (mod_window_div) {
                    //FIRST CLEAR THAT DIV, SO ITS EMPTY
                    mod_window_div.html("");

                    send_obj[sox] = {
                        type: "span",
                        content: {
                            parentID: "tdx_mod_window_div",
                            placement_type: "append_innerHTML",
                            //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                            class_name: ""
                        }

                    };
                    sox++;
                    //GET COLUMN_HEADERS AND CONTENT_COLUMNS
                    for (var x in header_columns) {
                        if (curr_setting === "N") {
                            this_col_val2 = "";
                            this_col_value = "";
                        }
                        else {
                            this_col_val2 = pkey._column._get_value({ "tableID": tableID, "column_slug": header_columns[x]["column_slug"], "recordID": recordID });
                            this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        }
                        //onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                        //item_ID = String("RCE_" + tableID + "_" + header_columns[x]["column_slug"] + "_" + recordID);
                        /*+ pkey._column_alias[header_columns[x]]*/
                        var key1 = header_columns[x]["column_alias"]; //pkey.column_get_alias(header_columns[x]);
                        var col_type = header_columns[x]["column_type"];
                        var col_slug = header_columns[x]["column_slug"];
                        var col_ii = pkey.record_open_render_colproc({ "tableID": tableID, "recordID": recordID, "column_slug": col_slug, "column_type": col_type, "column_value": this_col_value });
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + col_ii + "</span>",
                                class_name: "tdx_column_wrapper1"
                            }

                        };
                        sox++;
                    }
                    for (var x in content_columns) {
                        if (curr_setting === "N") {
                            this_col_val2 = "";
                            this_col_value = "";
                        }
                        else {
                            this_col_val2 = pkey._column._get_value({ "tableID": tableID, "column_slug": content_columns[x]["column_slug"], "recordID": recordID });
                            this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        }
                        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({ \"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                        item_ID = String("RCE_" + tableID + "_" + content_columns[x]["column_slug"] + "_" + recordID);
                        var key1 = content_columns[x]["column_alias"]; //pkey.column_get_alias(content_columns[x]);
                        var col_type = content_columns[x]["column_type"];
                        var col_slug = content_columns[x]["column_slug"];
                        var col_ii = pkey.record_open_render_colproc({ "tableID": tableID, "recordID": recordID, "column_slug": col_slug, "column_type": col_type, "column_value": this_col_value });
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + col_ii + "</span>",
                                class_name: "tdx_column_wrapper1"
                            }

                        };
                        sox++;
                    }
                    pkey.elem_do(send_obj);
                    //MODIFY SAVE BUTTONS
                    //MODIFY CLOSE BUTTONS/ICONS

                    //mod_window_div.html("PUT IT RIGHT HERE");
                }
                pkey.manage_edit_button({ "mode": "e", "tableID": tableID, "recordID": recordID });
            }
            if (curr_setting === "v") {
                //CURRENTLY IN VIEW MODE
                if (mod_window_div) {

                    //FIRST CLEAR THAT DIV, SO ITS EMPTY
                    mod_window_div.html("");

                    send_obj[sox] = {
                        type: "span",
                        content: {
                            parentID: "tdx_mod_window_div",
                            placement_type: "append_innerHTML",
                            //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                            class_name: ""
                        }

                    };
                    sox++;
                    //GET COLUMN_HEADERS AND CONTENT_COLUMNS
                    for (var x in header_columns) {
                        this_col_val2 = pkey._column._get_value({ "tableID": tableID, "column_slug": header_columns[x]["column_slug"], "recordID": recordID });
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        var key1 = header_columns[x]["column_alias"]; //pkey.column_get_alias(header_columns[x]);
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
                                class_name: "tdx_column_wrapper"
                            }

                        };
                        sox++;
                    }
                    for (var x in content_columns) {
                        this_col_val2 = pkey._column._get_value({ "tableID": tableID, "column_slug": content_columns[x]["column_slug"], "recordID": recordID });
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        var key1 = content_columns[x]["column_alias"]; //pkey.column_get_alias(content_columns[x]);
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
                                class_name: "tdx_column_wrapper"
                            }

                        };
                        sox++;
                    }
                    pkey.elem_do(send_obj);
                    //MODIFY SAVE BUTTONS
                    //MODIFY CLOSE BUTTONS/ICONS

                    //mod_window_div.html("PUT IT RIGHT HERE");
                }
                //SHOW EDIT BUTTON
                pkey.manage_edit_button({ "mode": "v", "tableID": tableID, "recordID": recordID });
            }
        }
    },
    record_open_render_colproc: function (obj) {
        if (obj) {
            var itemID, tableID, recordID, column_type, column_slug, return_text, onchange_insert, column_value, closing_tag;

            tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
            recordID = (obj["recordID"] !== undefined) ? obj["recordID"] : "";
            column_type = (obj["column_type"] !== undefined) ? obj["column_type"] : "";
            column_value = (obj["column_value"] !== undefined) ? obj["column_value"] : "";
            column_slug = (obj["column_slug"] !== undefined) ? obj["column_slug"] : "";
            onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });' ";
            closing_tag = false;
            //<input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " />

            item_ID = String("RCE_" + tableID + "_" + column_slug + "_" + recordID);

            //START BUILDING THE INPUT ELEMENT
            return_text = "<";
            if (column_type === "textbox") {
                return_text += "input type='text' ";
            }
            if (column_type === "password") {
                return_text += "input type='password' ";
            }
            if (column_type === "checkbox") {
                return_text += "input type='checkbox' ";
            }
            if (column_type === "textarea") {
                return_text += "textarea ";
            }

            //SLAP ON THE ID AND NAME
            return_text += "ID='" + item_ID + "' name='" + item_ID + "' ";

            //HANDLE THE ONCHANGE
            return_text += onchange_insert;

            //APPLY THE VALUE IF THERE IS ONE
            if (column_type === "textbox" ||
                column_type === "password" ||
                column_type === "checkbox"
            ) {
                return_text += "value='" + column_value + "' /> ";
            }
            else if (column_type === "textarea") {
                return_text += ">" + column_value + "</textarea>";
            }

            return return_text;
        }
    },
    record_open_add_new: function () {
        //READ INCOMING tableID
        //log("open new");
        if (pkey["_modal"]) {
            var modal_sett = pkey["_modal"];
            //var modal_sett1 = modal_sett.substring(1);
            //alert(modal_sett);
            //MODAL WINDOW WILL BE "EDIT" MODE
            //call record_open(tableID, recordID);
            pkey.record_open(modal_sett, "N");
        }
        else {
            log("record_open_add_new:no _modal");
        }
    },
    record_get_setting: function (obj) {
        if (obj) {
            //obj["recordID"]
            //obj["tableID"]
            //obj["settings_name"]
            log("pkey.record_get_setting:" + JSON.stringify(obj));
            var ret = "", settings_name = "", tableID = "", recordID = "";

            if (obj["settings_name"]) {
                settings_name = obj["settings_name"];
            }
            if (obj["tableID"]) {
                tableID = "T_" + obj["tableID"];
            }
            if (obj["recordID"]) {
                recordID = "R_" + obj["recordID"];
            }

            //ret = "ID is this:"+ID;

            if (pkey._recordset[tableID]["list"][recordID] !== undefined) {
                if (
                    pkey._recordset[tableID]["list"][recordID]["_SETTINGS"] !== undefined &&
                    pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] !== undefined
                ) {

                    ret = pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name];
                }
            }

            return ret;
        }
    },
    record_set_setting: function (obj) {
        if (obj) {
            //obj["ID"]
            //obj["table_name"]
            //obj["settings_name"]
            //obj["settings_value"]
            log("pkey.record_set_setting:" + JSON.stringify(obj));
            var ret = "", settings_name = "", settings_value = "", tableID = "", recordID = "";

            if (obj["settings_name"]) {
                settings_name = obj["settings_name"];
            }
            if (obj["settings_value"]) {
                settings_value = obj["settings_value"];
            }
            if (obj["tableID"]) {
                tableID = "T_" + obj["tableID"];
            }
            if (obj["recordID"]) {
                recordID = "R_" + obj["recordID"];
            }

            //ret = "ID is this:"+ID;
            if (pkey._recordset !== undefined && pkey._recordset[tableID] !== undefined && pkey._recordset[tableID]["list"] !== undefined) {
                if (pkey._recordset[tableID]["list"][recordID] !== undefined) {
                    if (
                        pkey._recordset[tableID]["list"][recordID]["_SETTINGS"] !== undefined &&
                        pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] !== undefined
                    ) {

                        pkey._recordset[tableID]["list"][recordID]["_SETTINGS"][settings_name] = settings_value;

                    }
                } else {
                    log("pkey.record_set_setting: fail 2");
                }
            }
            else {
                log("pkey.record_set_setting: fail 1");
            }


            return ret;
        }
    },
    record_is_mod: function (obj) {
        //IS THE RECORD WITH THE GIVEN ID MODIFIED?
        //RETURNS OBJECT OF {"column_name1":"new value if changed"}
        if (obj) {
            var timestamp_now = pkey.get_timestamp();

            var tableID = obj["tableID"];
            var recordID = (obj["recordID"] !== undefined) ? obj["recordID"] : "N";

            var t_tableID = "T_" + tableID;
            var r_recordID = "R_" + recordID;
            //IS THIS RECORD ID MODIFIED?
            var c = pkey.table_get_columns({ "tableID": tableID });
            log("record_is_mod table_get_columns:" + JSON.stringify(c));

            var item_name = "", item = {}, item_val = "", flag = false, new_obj = {}, nx = 0, all_obj = {}, ax = 0;
            all_obj["content_object"] = {};
            //alert(JSON.stringify(r));
            if (c !== undefined) {
                if (pkey._recordset[t_tableID] !== undefined) {
                    //IF THE TABLE EXISTS IN THE _recordset IN DOM
                    if (pkey._recordset[t_tableID]["list"] !== undefined && pkey._recordset[t_tableID]["list"][r_recordID] !== undefined) {
                        //YES THE ID EXISTS, CHECK THE COLUMNS FOR CHANGES
                        for (var c2 in c) {
                            item_name = String("#RCE_" + tableID + "_" + c[c2] + "_" + recordID);
                            log("%%%% here:" + item_name);
                            item = jQuery(item_name);
                            if (pkey["_recordset"][t_tableID]["list"][r_recordID][c[c2]] && item) {
                                //compare value with html element
                                item_val = item.val();
                                log("==!* IF PKEY.ISMOD: " + pkey["_recordset"][t_tableID]["list"][r_recordID][c[c2]] + " !== " + item_val);
                                if (item_val !== undefined) {
                                    all_obj[c[c2]] = item_val;
                                    //all_obj["C_"+c[c2]] = item_val;
                                }
                                if (pkey["_recordset"][t_tableID]["list"][r_recordID][c[c2]] !== item_val && item_val !== undefined) {
                                    //YES THERE ARE CHANGES TO THIS ITEM
                                    flag = true;
                                    new_obj[c[c2]] = item_val;
                                    //alert(item_val);
                                    log("==!** PKEY.ISMOD: " + pkey["_recordset"][t_tableID]["list"][r_recordID][c[c2]] + "!=" + item_val);
                                    item.css("border", "thin solid red");
                                }
                                else {
                                    item.css("border", "");
                                }
                            }
                            else {
                                log("record_save no item or column thing");
                                if (item) {
                                    item_val = item.val();
                                    log("this item_val:" + item_val);
                                    if (item_val === "") {
                                        item.css("border", "");
                                    }
                                    else {
                                        flag = true;
                                        all_obj[c[c2]] = item_val;
                                        item.css("border", "thin solid red");
                                    }
                                }
                            }
                        }
                    }
                    else {
                        log("%% RecordID does not exist");
                    }
                }

                if (flag === true) {
                    //YES THERE ARE MODIFICATIONS
                    //SEND THAT SHIT!
                    timestamp_now = pkey.get_timestamp();
                    new_obj["_TIMESTAMP"] = timestamp_now;
                    new_obj["recordID"] = recordID;
                    new_obj["tableID"] = tableID;
                    //HANDLE ALL OBJ
                    all_obj["_TIMESTAMP"] = timestamp_now;
                    all_obj["recordID"] = recordID;
                    all_obj["tableID"] = tableID;

                    log('record_is_mod:SEND THAT SHIT!\n' + JSON.stringify(all_obj));
                    return all_obj;

                }
                else {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    },
    elem_do: function (input) {
        /*
         Purpose:        This function creates HTML elements singularily and
         appends, prepends, or replaces the innerHTML and outerHTML
         of ID supplied for the variable "parentID"
         Created by:     Seth Hendershot
         Company:        The Small Business Platform Inc
         Start Date:     03/28/2016
         Version Number: 1.5
         Last Updated:   06/28/2017
         */
        var output = "", x, c, z;
        if (input) {
            for (c in input) {
                var s = false, pID = "", ID = "", pt = "", uu = "", itv = false, it, o, o_sel, sel, select_flag = false, tn = false, textnodetext = "", close_tag = "";
                for (x in input[c]) {
                    //ONLY SEARCH FOR TYPE RIGHT AWAY, NEED THAT FIRST
                    if (x === "type") {
                        if (input[c][x] === "div" ||
                            input[c][x] === "span" ||
                            input[c][x] === "label" ||
                            input[c][x] === "a" ||
                            input[c][x] === "image" ||
                            input[c][x] === "input" ||
                            input[c][x] === "form" ||
                            input[c][x] === "ul" ||
                            input[c][x] === "li" ||
                            input[c][x] === "textarea" ||
                            input[c][x] === "select" ||
                            input[c][x] === "option" ||
                            input[c][x] === "textnode"
                        ) {
                            //TYPE PASSES LIST FROM ABOVE
                            output += "<" + input[c][x] + "";
                            //IF ITS ONE OF THE FOLLOWING ITEMS IT WILL NEED TO HAVE A CLOSING TAG, FLAG FOR THIS
                            if (input[c][x] === "select" ||
                                input[c][x] === "ul" ||
                                input[c][x] === "li" ||
                                input[c][x] === "option" ||
                                input[c][x] === "form" ||
                                input[c][x] === "label" ||
                                input[c][x] === "div" ||
                                input[c][x] === "span" ||
                                input[c][x] === "a" ||
                                input[c][x] === "textarea"
                            ) {
                                //console.log("select flag set to true for " + input[c][x]);
                                select_flag = true;
                                close_tag = input[c][x];
                            }
                            //FLAG TEXT NODE FOR SPECIAL HANDLING
                            if (input[c][x] === "textnode") {
                                tn = true;
                            }
                        }
                    }
                }
                for (x in input[c]) {
                    if (x === "content") {
                        it = "";
                        //console.log('content object present');
                        for (z in input[c][x]) {
                            if (z === "ID") {
                                output += " id='" + input[c][x][z] + "'";
                                ID = input[c][x][z];
                            }
                            if (z === "styles") {
                                output += " style='" + input[c][x][z] + "'";
                            }
                            if (z === "class_name") {
                                output += " class='" + input[c][x][z] + "'";
                            }
                            if (z === "elem_name") {
                                output += " name='" + input[c][x][z] + "'";
                            }
                            if (z === "hrf") {
                                output += " href='" + input[c][x][z] + "'";
                            }
                            if (z === "src") {
                                output += " src='" + input[c][x][z] + "'";
                            }
                            if (z === "label_for") {
                                output += " for='" + input[c][x][z] + "'";
                            }
                            if (z === "target") {
                                output += " target='" + input[c][x][z] + "'";
                            }
                            if (z === "action") {
                                output += " action='" + input[c][x][z] + "'";
                            }
                            if (z === "method") {
                                output += " method='" + input[c][x][z] + "'";
                            }
                            if (z === "val") {
                                output += " value='" + input[c][x][z] + "'";
                            }
                            if (z === "wide") {
                                output += " width='" + input[c][x][z] + "'";
                            }
                            if (z === "onchange") {
                                output += " onchange='" + input[c][x][z] + "'";
                            }
                            if (z === "onclick") {
                                output += " onclick='" + input[c][x][z] + "'";
                            }
                            if (z === "onmousedown") {
                                output += " onmousedown='" + input[c][x][z] + "'";
                            }
                            if (z === "check" && input[c][x][z] === true) {
                                output += " checked";
                            }
                            if (z === "selected" && input[c][x][z] === true) {
                                output += " selected='selected'";
                            }
                            if (select_flag === true) {
                                itv = true;
                                if (z === "options") {
                                    //HANDLE DIFFERENTLY
                                    //close_tag = "option";
                                    //console.log('option menu listed');
                                    //SORT THROUGH THE OPTIONS

                                    sel = "";
                                    if (input[c][x][z].hasOwnProperty("sel")) {
                                        //console.log("straight path:" + input[c][x][z]["sel"]);
                                        o_sel = input[c][x][z]["sel"];
                                    }
                                    if (input[c][x][z].hasOwnProperty("val")) {

                                    }
                                    for (o in input[c][x][z]) {
                                        //console.log("roll thru option " + o);
                                        //if(o === "sel"){ o_sel = input[c][x][z][o]; }
                                        if (input[c][x][z][o].hasOwnProperty("val")) {
                                            if (o_sel === input[c][x][z][o]["val"]) {
                                                sel = " selected='selected'";
                                            } else {
                                                sel = "";
                                            }
                                            it += "<option value='" + input[c][x][z][o]["val"] + "'" + sel + ">";
                                        }
                                        if (input[c][x][z][o].hasOwnProperty("tex")) {
                                            it += input[c][x][z][o]["tex"] + "</option>";
                                        }
                                        it += "";
                                    }
                                }

                            }
                            if (z === "input_type") {
                                //FILTER OUT INPUT TYPES THAT NEED MORE LOGIC
                                if (input[c][x][z] === "hidden") {
                                    output += " type='hidden'";
                                }
                                if (input[c][x][z] === "text") {
                                    output += " type='text'";
                                }
                                if (input[c][x][z] === "password") {
                                    output += " type='password'";
                                }
                                if (input[c][x][z] === "checkbox") {
                                    output += " type='checkbox'";
                                }
                                if (input[c][x][z] === "radio") {
                                    output += " type='radio'";
                                }
                                if (input[c][x][z] === "submit") {
                                    output += " type='submit'";
                                }
                                if (input[c][x][z] === "reset") {
                                    output += " type='reset'";
                                }
                                if (input[c][x][z] === "button") {
                                    output += " type='button'";
                                }
                                if (input[c][x][z] === "image") {
                                    output += " type='image'";
                                }
                                //output += " src='"+input[c][x][z]+"'";
                            }
                            if (z === "inner_text") {
                                //HANDLE DIFFERENTLY
                                /*output += " onmousedown='" + input[c][x][z] + "'";*/
                                itv = true;
                                it = input[c][x][z];
                                if (tn === true) {
                                    textnodetext = input[c][x][z];
                                }
                            }
                            if (z === "parentClass") {
                                s = true;
                                pID = String("." + input[c][x][z]);
                            }
                            if (z === "parentID") {
                                s = true;
                                pID = String("#" + input[c][x][z]);
                            }
                            if (z === "placement_type") {
                                if (input[c][x][z] === "prepend_innerHTML") {
                                    pt = "prepend_innerHTML";
                                }
                                if (input[c][x][z] === "prepend_outerHTML") {
                                    pt = "prepend_outerHTML";
                                }
                                if (input[c][x][z] === "append_innerHTML") {
                                    pt = "append_innerHTML";
                                }
                                if (input[c][x][z] === "append_outerHTML") {
                                    pt = "append_outerHTML";
                                }
                                if (input[c][x][z] === "replace_innerHTML") {
                                    pt = "replace_innerHTML";
                                }
                                if (input[c][x][z] === "replace_outerHTML") {
                                    pt = "replace_outerHTML";
                                }
                            }
                        }
                    }
                }
                if (itv === true) {
                    //YES THERES INNERTEXT, close, reopen
                    //console.log("1:"+output);
                    //console.log("closing tag " + c + ":" + close_tag);
                    output += ">" + it + "</" + close_tag + ">";
                    it = "";
                    //console.log("2:"+output);
                } else {
                    output += "/>";
                }
                //output += "/>";

                //SPECIAL TEXT NODE HANDLER
                if (tn === true) {
                    //OVERWRITE ALL OF output TO JUST THE TEXT
                    output = textnodetext;
                }
                //alert(pID);
                uu = jQuery(pID);
                if (s === true) {
                    if (uu) {
                        if (pt === "prepend_innerHTML") {
                            uu.prepend(output);
                        }
                        if (pt === "prepend_outerHTML") {
                            uu.before(output);
                        }
                        if (pt === "append_innerHTML") {
                            //HANDLE SPECIAL, REPLACE ITEM -ID- IF IT EXISTS
                            //check if the item exists already, if it does then replace it
                            uu.append(output);
                        }
                        if (pt === "append_outerHTML") {
                            uu.after(output);
                        }
                        if (pt === "replace_innerHTML") {
                            uu.html(output);
                        }
                        if (pt === "replace_outerHTML") {
                            uu.replaceWith(output);
                        }
                        output = "";
                        it = "";
                    } else {
                        console.log("***trying to place:" + output + " but no element with ID '" + pID + "' is present");
                    }
                }
                output = ""; //RESET OUTPUT
            }
        }
        //return output;
    },
    action_email: function (obj) {
        pkey.univ_post("action_email", {});
    },
    manage_edit_button: function (obj) {
        var mode = obj["mode"];
        var tableID = "", recordID = "";
        var window_title = jQuery("#myModal_window_title");
        window_title.html("Record Information");

        if (obj["tableID"] !== undefined) {
            tableID = obj["tableID"];
        }
        if (obj["recordID"] !== undefined) {
            recordID = obj["recordID"];
        }

        //BUILD SELECT MENU TO PLACE IN window_title bar
        //get tables from pkey._tables
        if (pkey["_tables"] !== undefined) {
            var select_options = {};
            var soc = 0;
            var tc = (pkey["_tables"]["cc"] !== undefined) ? pkey["_tables"]["cc"] : "";
            for (var y in pkey["_tables"]) {
                if (y !== "cc") {
                    select_options[soc] = {};
                    select_options[soc]["table_alias"] = pkey["_tables"][y]["table_alias"];
                    select_options[soc]["tableID"] = pkey["_tables"][y]["tableID"];
                    soc++;
                }
            }
        }

        if (mode !== undefined) {
            var edit_button_position = jQuery("#tdx_popup_actions_wr");
            var print_button_position = "";
            var all_button_position = jQuery(".tdx_popup_buttons_wr");
            var tdx_close_modal_btn = jQuery("#tdx_close_modal_btn");
            var tdx_modal_backdrop = jQuery(".modal-backdrop");
            var tdx_modal_info_close = jQuery("#tdx_modal_info_close");

            var save_and_close = "<button type='button' class='btn btn-default' id='tdx_save_and_close_btn' onclick='javascript:pkey.record_save(\"" + tableID + "\",\"" + recordID + "\",\"close\")'>Save & Close</button>";
            var save_and_new = "<button type='button' class='btn btn-default' id='tdx_save_and_new_btn' onclick='javascript:pkey.record_save(\"" + tableID + "\",\"" + recordID + "\",\"new\")'>Save & Add New</button>";

            if (mode === "e" && edit_button_position) {
                edit_button_position.html("");
                print_button_position = "";
                all_button_position.html("");
                all_button_position.append(save_and_close, save_and_new);
            }
            if (mode === "v" && edit_button_position) {
                edit_button_position.html("<a href='#' onclick='javascript:pkey.record_edit(\"" + tableID + "\",\"" + recordID + "\");'><i class='fa fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>");

                print_button_position = "<a href='javascript:window.print();'><i class='fa fa-print' aria-hidden='true'><span class='icontext'>Print</span></i></a>";
                edit_button_position.append(print_button_position);
                all_button_position.html("");

            }

            //PLACE SELECT MENU INTO HEADER
            if (soc > 0) {
                var sel = "";
                log("SOC >0::" + soc);
                var selecthtml = "<select name='tdx_modal_sel' id='tdx_modal_sel' onchange='javascript:pkey.record_open_render(this.value,\"" + recordID + "\");'>";

                for (var yy = 0; yy < soc; yy++) {
                    //IF yy tableID == INCOMING tableID make this option selected
                    if (select_options[yy]["tableID"] === tableID) { sel = "selected='selected'"; }
                    else { sel = ""; } //WIPE OUT sel SO THERE ARENT MULTIPLE SELECTED
                    selecthtml += "<option value='" + select_options[yy]["tableID"] + "' " + sel + ">" + select_options[yy]["table_alias"] + "</option>";
                }

                selecthtml += "</select>";
                log('window_title.append:' + JSON.stringify(selecthtml));
                window_title.append(selecthtml);

                //IF RECORDID != "N"
                if (recordID !== "N") {
                    //GET AND DISPLAY ALL RECORDIDS, SELECT CURRENT

                    if (pkey["_recordset"] && pkey["_recordset"]["T_" + tableID] && pkey["_recordset"]["T_" + tableID]["list"]) {
                        var select_rec = "<select name='tdx_modal_sel' id='tdx_modal_sel' onchange='javascript:pkey.record_open_render(\"" + tableID + "\", this.value);'>";
                        for (var rec in pkey["_recordset"]["T_" + tableID]["list"]) {
                            var recID = rec.substr(2);
                            var rsel = (recID === recordID) ? "selected='selected'" : "";
                            select_rec += "<option value='" + recID + "' " + rsel + ">" + recID + "</option>";
                        }
                        select_rec += "</select>";
                    }
                    window_title.append(select_rec);
                }
            }


            tdx_close_modal_btn.attr("onclick", "javascript:pkey.record_view(\"" + tableID + "\",\"" + recordID + "\");");
            tdx_modal_backdrop.attr("onclick", "javascript:pkey.record_view(\"" + tableID + "\",\"" + recordID + "\");");
            tdx_modal_info_close.attr("onclick", "javascript:pkey.record_view(\"" + tableID + "\",\"" + recordID + "\");");
        }

    },
    univ_post: function (action, input, callback) {
        log("HELLO, AT PKEY.UNIV_POST()..." + action);
        var is_allowed = false;
        var allowed_actions = [
            "get_tasks",
            "get_screens",
            "get_screen_by_ID",
            "get_table",
            "get_tables_by_screen",
            "get_columns_by_table",
            "get_records_by_table",
            "get_record_groups_by_table",
            "get_records_by_group",
            "get_record_values_by_ID",
            "action_email",
            "set_record_content",
            "delete_recordID",
            "set_restore_version",
            "update_record_position",
            "get_FKdata",
            "get_user_data",
            "get_all_columns",
            "get_record_groups",
            "set_object",
            "get_objects",
            "remove_object"
        ];
        var path = "/wp-content/plugins/tsbp-employee-job-time-tracker/p/";
        var gx = allowed_actions.length;
        if (gx > 0) {
            for (var ggg = 0; ggg < gx; ggg++) {
                if (allowed_actions[ggg] === action) {
                    is_allowed = true;
                }
            }
        }
        if (is_allowed === true) {
            log("YES ACTION = " + action);
            input["action"] = action;
        }
        else {
            log("*pkey.univ_post you are attempting an action that is not registered.");
            return false;
        }

        var stamp = pkey.get_timestamp();
        //log("YES stamp = " + stamp);
        var jspost = new XMLHttpRequest();
        var url = path + 'ajax-to-db.php?t4=' + stamp;
        var params = "t=1";
        var ret = true;
        jspost.open("POST", url, true);
        jspost.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //jspost.setRequestHeader("Connection", "close");

        log("SENDING!: " + JSON.stringify(input));
        log("ACTION:" + action);
        jspost.send(JSON.stringify(input));

        jspost.onreadystatechange = function () {//Call a function when the state changes.
            //alert(jspost.readyState+ " - "+jspost.status);
            if (jspost.readyState == 4 && jspost.status == 200) {
                //do something with responsetext
                log("ACTION:" + action + "; RESPONSE: " + jspost.responseText);
                ret = jspost.responseText;
                //univ_handler(ret);
                if (typeof callback === 'function') {
                    callback(JSON.parse(ret));
                } else {
                    log("ERROR; callback does not exist");
                }

            }
            else if (jspost.readyState == 4 && jspost.status != 200) {
                log("#univ_post did not return success code");
                //notify("OFFLINE", "You are offline, all updates will be stored locally until a connection is made.");
                //pkey.place_offline(input);
            }
        };
        //return ret;
    },
    append_tab_handler: function () {

        var check_these = ["#V0", "#V00", "#V000", "#V1", "#V2", "#V3"];
        var ctc = check_these.length;

        for (var x = 0; x < ctc; x++) {
            jQuery('a').each(function (index, element) {
                if (jQuery(element).attr("href") === check_these[x]) {
                    jQuery(element).attr("onclick", "javascript:pkey.tab_click(\"" + check_these[x] + "\")"); // Change this to .html()
                }
                //console.log('Index is:' + index + ', Element is' + element);
            });
        }
        //fill the inner div with content to start it off
        //pkey.record_render_add_new();
    },
    tab_click: function (current_tab) {
        if (current_tab) {
            var curr_tab = current_tab.substr(2);
            log("tab_click:" + curr_tab);
            pkey["_modal"] = curr_tab;
        }
    }
};

function modal_do(o = { recordID: null, tableID: null, mode: "v" }) {
    if (o) {
        var mode = (o["mode"] !== undefined) ? o["mode"] : "v";
        if (mode === "v") {
            //_pkey._record._set_setting({"settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID });
            _pkey._modal._open._record_open(tableID, recordID, mode);
        }
        if (mode === "e") {

        }
    }
}

function get_actions(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Perform Action");

    window_div.append("<div class='tdx_action_list'>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-clock-o fa-3x'><span class='action_icontext'>Start Timer</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-o fa-3x'><span class='action_icontext'>Postpone Task</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-users fa-3x'><span class='action_icontext'>Re-Assign Task</span></i></span></div></a>");
    //window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-columns fa-3x'><span class='action_icontext'>Split Task Into Multiple</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-check-o fa-3x'><span class='action_icontext'>Task Is Complete!</span></i></span></div></a>");
    window_div.append("</div>");
}

function get_information(tableID, recordID) {

    if (tableID && recordID) {
        var show_these = ["1", "2", "4", "6"];
        var show_text = ["People", "Jobs", "Chart of Accts", "Test"];

        var window_div = jQuery("#tdx_mod_window_div");
        var window_title = jQuery("#myModal_window_title");
        window_div.html("");
        window_title.html("Information");
        //window_div.append("<strong>All FK data here, linked job data, linked people, linked transactions (if user is authd), linked inventory(if user is authd)</strong><BR>This tableID is:" + tableID);
        var ret = {};
        if (show_these.length > 0) {
            var stc = show_these.length;
            for (var x = 0; x < stc; x++) {
                if (show_these[x] !== undefined) {
                    //add to object
                    window_div.append("<h2>" + show_text[x] + "</h2><div id='tdx_popup_" + show_these[x] + "'>" + "<div>");
                    get_table({ "tableID": show_these[x], "table_target": "tdx_popup_" + show_these[x] });
                }
            }

            pkey.univ_post("get_table", ret, get_screen_proc);
        }


        window_div.append("<BR>This recordID is:" + recordID);
    }
}

function get_table(obj) {
    //GET THE TABLE FROM THE DATABASE AND PLACE IT INTO THE DOM
    if (obj) {
        //GET THE TABLEID FROM INPUT
        //UNIV POST FOR THE TABLE
        //SEND THE RETURNED VALUE TO get_table_proc(return_value)
        var tableID = "";
        var tabID = "";
        var table_target = "";
        let subtabID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            tabID = obj["tabID"];
            table_target = obj["table_target"];
            subtabID = obj["subtabID"];
            //log("###############################################################");
            //log("GET_TABLE pre _pkey._univ_post()");
            _pkey._univ_post("get_table", { "tableID": tableID, "table_target": table_target, "tabID": tabID, "subtabID": subtabID }, get_table_proc);
        }
    }
}

function get_table_proc(obj) {
    //alert('callback:'+JSON.stringify(obj));
    //GET COLUMNS
    if (obj) {
        //for (var g in obj) {
        var tableID = "";
        var tabID = "";
        var subtabID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            //MIGHT WANT TO STORE THE TABLE INFORMATION IN PKEY EVENTUALLY
            tableID = obj["tableID"];
            tabID = obj["tabID"];
            subtabID = obj["subtabID"];
            //get_columns({"tableID": tableID});
            get_records({ "tableID": tableID, "tabID": tabID, "subtabID": subtabID });
            //log("about to call _table._place with:" + JSON.stringify(obj));
            _pkey._table._place(obj);
            _pkey._render._table._place_single(obj);
        }
        //}

    }
}

function get_columns(obj) {
    if (obj) {
        //MUST HAVE TABLEID
        //SEND TO UNIV_POST FOR COLUMNS
        var tableID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            log("GET_COLUMNS pre pkey.univ_post()");
            pkey.univ_post("get_columns_by_table", { "tableID": tableID }, get_columns_proc);
        }
    }
}

function get_columns_proc(obj) {
    if (obj) {
        log("@ GET COLUMNS sweet:" + JSON.stringify(obj));
        for (var g in obj) {
            var tableID = "";
            if (obj[g]["tableID"] !== undefined) {
                //MIGHT WANT TO STORE THE TABLE INFORMATION IN PKEY EVENTUALLY
                //PLACE COLUMNS INTO DOM
                pkey.column_place(obj[g]);
            }
        }
    }
}

function get_record_groups() {
    //log("@ get_record_groups:");
    var tableID = "";
    //univ post to get the record groups
    _pkey._univ_post("get_record_groups", {}, get_record_groups_proc);
}

function get_record_groups_proc(obj) {
    if (obj) {
        if (typeof (obj["record_groups"] === "object")) {
            //alert("yes!");
            _pkey._record_group._ds(obj);
        }
    }
}

/*function get_records(obj) {
    //log("get_records: " + JSON.stringify(obj));
    if (obj) {
        var tableID = "";
        var tabID = "";
        var subtabID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            tabID = obj["tabID"];
            subtabID = obj["subtabID"];
            //log("GET_RECORDS pre _pkey._univ_post()");
            _pkey._univ_post("get_records_by_table", { "tableID": tableID, "tabID": tabID, "subtabID": subtabID }, get_records_proc);
        }
    }
}*/
/*function get_records_proc(obj) {
    //log("------------------ get_records_proc(): ---------------------");
    //console.log(obj);
    //log("------------------ :get_records_proc() ---------------------");
    if (obj) {
        if (obj["result"] === "no_records") {
            _pkey._render._record._all_grouped({ "tableID": obj["tableID"] });
        }
        else {
            //console.log("pre place");
            _pkey._record._place(obj);
            //console.log("post place");

            jQuery(document).ready(function () {
                //console.log("here");
                _pkey._render._record._all_grouped({ "tableID": obj["tableID"], "tabID": obj["tabID"], "subtabID": obj["subtabID"] });
            });
        }
    }
}*/

function record_UI_sel(tableID) {
    //check all the checkboxes
    if (tableID) {
        var g = jQuery("#T_" + tableID);
        var checkboxes = jQuery(".tdx_record_checkbox").each(function () {
            var thisID = this.id;
            var thisID1 = thisID.substr(3);
            var this_li = jQuery("#" + thisID1);
            //console.log("#"+thisID1);
            if (this.checked === true) {
                //this_li.css("background-color", "rgba(255, 255, 230,.7)");
                this_li.addClass("sel");
                log('checked:' + thisID1);
            }
            else {
                //this_li.css("background-color", "");
                this_li.removeClass("sel");
            }
        });
    }
    //what has a checkbox checked?
    //change the color to indicate it was highlighted
}

function record_UI_checkall(tableID) {
    if (tableID) {
        log('main check');
        //locate the main checkbox, is it checked?
        var maincheck = jQuery("#tdx_main_check_T_" + tableID);
        //alert(maincheck.attr("checked"));
        if (maincheck.attr("checked") !== undefined && maincheck.attr("checked") === "checked") {
            //check all the checkboxes for this tableID
            log('main checkbox is checked:' + tableID);
            var checkboxes = jQuery(".tdx_record_checkbox").each(function () {
                this.checked = true;
            });
        }
        else {
            //uncheck all
            var checkboxes = jQuery(".tdx_record_checkbox").each(function () {
                this.checked = false;
            });
        }
        //find the checkboxes for this tableID
    }
    record_UI_sel(tableID);
}

function select_menu_output(total, selected, recordID, tableID) {
    var t, s, i, c, o, passvalue = "", sele_out = "", class1 = "";
    if (total && selected) {

        if (recordID) {
            i = " id='tdx_SEL_" + recordID + "'";
        }
        else {
            i = "";
        }

        t = (tableID !== undefined) ? tableID : "";
        c = " class='tdx_sel tdx_SEL_" + tableID + "'";

        o = " onchange='javascript:pkey.record_move(\"" + recordID + "\",\"" + t + "\")'";


        // BUILD THE SELECT MENU
        passvalue += "<select " + i + " " + c + " " + o + ">";
        for (var x = 1; x <= total; x++) {
            if (x == selected) {
                sele_out = " selected='selected'";
            }
            else {
                sele_out = "";
            }

            passvalue += "<option value='" + x + "' " + sele_out + ">";
            passvalue += x;
            passvalue += "</option>";
        }

        passvalue += "</select>";

        return passvalue;
    }
}

function notify(title, message, icon) {
    //CHANGE THIS TO ACCEPT AN OBJECT WITH obj["title"], obj["message"], obj["icon"]
    var tt = "";
    if (title !== undefined) {
        tt = title;
    }

    var mm = "";
    if (message !== undefined) {
        mm = message;
    }
    var ico = "/path/to";
    if (icon !== undefined) {
        //HARD CODE FOR CALLOUTS
        if (icon === "blueX") {
            ico = "/wp-content/uploads/2017/07/blueX.png";
        }
        if (icon === "green_check") {
            ico = "/wp-content/uploads/2017/09/green-check.png";
        }
    }
    /*if (window.Notification && Notification.permission !== "denied") {

        if (tt !== "" && mm !== "") {
            Notification.requestPermission(function (status) {  // status is "granted", if accepted by user
                var n = new Notification(tt, {
                    body: mm,
                    icon: ico // optional
                });
            });
        }

    }
    else {
        //USER DENIED THE ACCESS TO NOTIFICATIONS or the browser doesnt do them, ALERT INSTEAD
        alert(tt + "\n" + mm);
    }*/

    //jQuery('.toast').toast('show');
    //toastr.success('Have fun storming the castle!', 'Miracle Max Says')
}

function tdx_toggle(title) {
    var tdx_ttt = title;
    if (jQuery("#" + tdx_ttt)) {
        jQuery("#" + tdx_ttt).toggle("slow");
    }
}

function getLocation() {
    var routediv = document.getElementById("routeWR");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        zz_ = {};
        zz_["curr_long"] = "";
        zz_["curr_lat"] = "";
    } else {
        routediv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var routediv = document.getElementById("routeWR");
    routediv.innerHTML = "<strong>Your current position is...</strong><br/>Latitude: " + position.coords.latitude +
        "<br/>Longitude: " + position.coords.longitude;
    zz_["curr_long"] = position.coords.longitude;
    zz_["curr_lat"] = position.coords.latitude;
    //google.maps.event.addDomListener(window, 'load', initialize);
    initialize();
}

function initialize() {
    var long = "-0.120850", lat = "51.508742";
    if (zz_ && zz_["curr_long"]) {
        long = zz_["curr_long"];
    }
    if (zz_ && zz_["curr_lat"]) {
        lat = zz_["curr_lat"];
    }
    /*var mapProp = {
     center:new google.maps.LatLng(51.508742,-0.120850),
     zoom:5,
     mapTypeId:google.maps.MapTypeId.ROADMAP
     };*/
    var mypos = new google.maps.LatLng(lat, long);
    var mapProp = {
        center: mypos,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: mypos,
        map: map,
        title: 'Hello World!'
    });
}
