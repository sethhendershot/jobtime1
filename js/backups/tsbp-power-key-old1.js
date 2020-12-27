var tdx_stacks = {}, x = 0;
/****** Seth Hendershot 06/15/2017           ******/

/**********************************************************/
function is_dev_now() {
    var text3 = "*Persistence overcomes everything, even nature itself*";
    jQuery(".custom-header").append("<div style='position:relative;top:-5px;z-index:999999;padding:2px;text-align:center;width:100%;text-transform:uppercase;font-weight:bold;font-size: 8px;font-family:verdana; background-color:#900;color:#FFF;'>" + text3 + "</div>");
    ;
}
jQuery(document).ready(function () {
    //is_dev_now();


});
function log(text) {
    var tsbp_debug = true; //ARE WE IN DEBUGGING MODE?
    if (tsbp_debug === true) {
        console.log(text);
    }
}

pkey = {
    _settings: {},
    _settings_allowed: [
        "screen_target",
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
        "column_hooks"
    ],
    _recordset: {},
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
    screens_extract_settings: function (obj) {
        if (obj) {
            //this splits multiple settings down into single ones to get the settings_object 
            ////and then sends them to settings_place() per setting
            var sender = {};
            var pas = false;
            for (var item in obj) {
                var screen_name = "";
                pas = false; //reset pas to false
                log("screen_extract_settings:" + JSON.stringify(obj));
                var settings_object = {};

                if (obj[item]["settings_object"]) {
                    settings_object = obj[item]["settings_object"];
                    //alert('This:' + JSON.stringify(settings_object));
                    pas = true;
                }

                if (obj[item]["screen_name"]) {
                    console.log("yes:" + obj[item]["screen_name"]);
                    //console.log("yes_settings:" + obj[item]["settings_object"]);
                    screen_name = obj[item]["screen_name"];
                    settings_object["screen_name"] = screen_name;

                }
                if (pas === true) {
                    pkey.settings_place(settings_object);
                }
            }
        }
    },
    settings_pull: function (obj) {
        if (obj) {
            var tableID = "";
            if (obj["tableID"]) {
                tableID = obj["tableID"];
            }
            else {
                tableID = "Default";
            }

            if (pkey._settings[tableID].hasOwnProperty(obj["settings_name"])) {
                log("^^^^settings_name pull(" + obj["settings_name"] + ")");
                //clear it, delete it
                pkey._settings[tableID][obj["settings_name"]] = "";
                delete(pkey._settings[tableID][obj["settings_name"]]);
            }
        }
    },
    screen_render: function (obj) {
        //targetID or targetClass ...
        //PLACE header, mass_action select menu, launch record_display PER record_group
        //PLACE screen_target DIV
        if (obj) {
            var screen_nm = "";
            var screen_target = "", screen_t_pass = false, display_type = "", mass_actions = {}, main_header = false;
            var main_header_class = "", main_header_style = "", allow_select_reorder = false, allow_drag_reorder = false;
            var allow_edit = false, allow_delete = false, allow_new = false, allow_edit_history = false;
            var groups = {}, header_columns = {}, content_columns = {}, record_buttons = {}, column_hooks = {};
            var send_this_object = {}, stox = 0;
            var hh3 = "", bod3 = "";
            var output = "";
            //alert('render screen:' + obj["screen_name"]);
            if (obj["screen_name"]) {
                screen_nm = obj["screen_name"];
            }
            else {
                screen_nm = "Default";
            }
            //GET SETTINGS FOR screen_nm HERE
            var _ac = 0;
            var _allowed = pkey._settings_allowed;
            //alert(_ac);
            if (pkey._settings_allowed !== undefined) {
                _allowed = pkey._settings_allowed;
            }
            _ac = _allowed.length;
            //alert(_ac);
            for (var _acx = 0; _acx < _ac; _acx++) {
                //CHECK FOR THE ALLOWED AND CHECK AGAINST pkey._settings
                var check1 = "";
                if (pkey._settings[screen_nm]) {

                    check1 = "screen_target";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        screen_t_pass = true;
                        screen_target = pkey._settings[screen_nm][_allowed[_acx]];
                        obj["screen_target"] = pkey._settings[screen_nm][_allowed[_acx]];
                        send_this_object[check1] = pkey._settings[screen_nm][_allowed[_acx]];
                        output += "";
                    }

                    check1 = "display_type";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        display_type = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "mass_actions";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        mass_actions = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "main_header";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        main_header = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "main_header_class";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        main_header_class = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "main_header_style";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        main_header_style = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_select_reorder";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_select_reorder = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_drag_reorder";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_drag_reorder = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_edit";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_edit = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_delete";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_delete = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_new";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_new = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "allow_edit_history";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        allow_edit_history = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "groups";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        groups = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "header_columns";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        header_columns = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "content_columns";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        content_columns = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "record_buttons";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        record_buttons = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                    check1 = "column_hooks";
                    if (pkey._settings[screen_nm][_allowed[_acx]] !== undefined && _allowed[_acx] === check1) {
                        //action for specific header
                        column_hooks = pkey._settings[screen_nm][_allowed[_acx]];
                    }

                }
                else {
                    //no screen name set in pkey._settings
                    console.log("pkey.screen_render() NO SCREEN NAME SET IN pkey._settings");
                }
            }

            if (main_header === true) {
                hh3 = "<div id='" + screen_nm + "_header'></div>";
            }

            //alert(targetElement);
            if (screen_t_pass === true) {
                //check if main_header == true
                bod3 = "<div id='" + screen_nm + "_body' class='screen_recordset'></div>";
                jQuery("#" + screen_target).html(hh3 + bod3);
            }

            //GET RECORD GROUPS AND PLACE INTO screen_target
            groups = pkey.screen_get_groups(obj);
            //INVOKE record_display per record_group
            for (var gx in groups) {
                obj["record_group"] = groups[gx];
                pkey.record_display(obj);
            }
        }

    },
    table_display_settings: function (tableID) {
        if (tableID) {
            var win_body = jQuery("#tdx_mod_window_div");
            var win_title = jQuery("#myModal_window_title");

            var this_table_alias = pkey.table_get_alias(tableID);
            var this_table_settings_all = pkey.table_get_setting({"tableID": tableID, "settings_name": "all"});
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
    table_is_table: function (obj) {
        //check if this table already exists in the pkey._tables object
        if (obj) {
            //obj["tableID"]
            log("====table_is_table tableID:" + obj["tableID"]);
            var pas = false;
            var tableID = "";
            if (obj["tableID"]) {
                tableID = "" + obj["tableID"];
            }
            if (tableID !== "" && tableID !== undefined) {
                //search through _tables and find the matching ID
                var _tables_cc = 0;
                if (pkey["_tables"] === undefined) {
                    pkey["_tables"] = {};
                }

                if (pkey["_tables"]["cc"] !== undefined) {
                    _tables_cc = pkey["_tables"]["cc"];
                }

                for (var tc = 0; tc < _tables_cc; tc++) {

                    if (pkey["_tables"][tc] !== undefined && pkey["_tables"][tc]["tableID"] == tableID) {
                        //this table exists
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
    },
    table_get_setting: function (obj) {
        //RETURN SINGLE SETTING VALUE FOR screen_name AND settings_name
        //obj["screen_name"]
        //obj["settings_name"]
        if (obj) {
            var tableID = "", settings_name = "", retobj = {};
            if (obj["tableID"] !== undefined) {
                tableID = obj["tableID"] + "";
            }
            if (obj["settings_name"] !== undefined) {
                settings_name = obj["settings_name"];
            }

            if (pkey["_tables"] !== undefined) {
                var cc = 0;
                if (pkey["_tables"]["cc"] !== undefined) {
                    cc = pkey["_tables"]["cc"];
                }
            }

            for (var et = 0; et < cc; et++) {
                if (pkey["_tables"][et]["settings_object"] !== undefined && tableID === pkey["_tables"][et]["tableID"]) {
                    var so = pkey["_tables"][et]["settings_object"];
                    if (settings_name === "all") {
                        return so;
                    }
                    if (so[settings_name] !== undefined) {
                        retobj = so[settings_name];
                    }
                }
            }
            return retobj;
        }
        else {
            console.log("pkey.table_get_setting() NO OBJ SENT");
            return undefined;
        }
    },
    table_get_alias: function (tableID) {
        if (tableID) {
            if (pkey["_tables"] !== undefined) {
                var cc = 0;
                if (pkey["_tables"]["cc"] !== undefined) {
                    cc = pkey["_tables"]["cc"];
                }

                for (var et = 0; et < cc; et++) {
                    if (pkey["_tables"][et]["table_alias"] !== undefined && tableID === pkey["_tables"][et]["tableID"]) {
                        var so = pkey["_tables"][et]["table_alias"];
                        return so;
                    }
                }
            }
        }
    },
    table_get_columns: function (obj) {
        if (obj) {
            log("table_get_columns:" + JSON.stringify(obj));
            var tableID = "", cc = 0, retobj = {}, retx = 0;
            if (obj["tableID"] !== undefined) {
                tableID = obj["tableID"];
                //search through columns and get columns with tableID = this tableID
                if (pkey["_columns"] !== undefined) {
                    if (pkey["_columns"]["cc"] !== undefined) {
                        cc = pkey["_columns"]["cc"];
                    }
                    for (var x = 0; x < cc; x++) {
                        log("==check:" + pkey["_columns"][x]["tableID"] + ";;; " + pkey["_columns"][x]["columnID"]);
                        if (pkey["_columns"][x]["tableID"] === tableID && pkey["_columns"][x]["columnID"] !== undefined) {
                            //tableID is a match
                            log("yep match" + pkey["_columns"][x]["columnID"]);
                            var temp = pkey["_columns"][x]["columnID"];
                            retobj[retx] = temp;
                            retx++;
                        }
                    }
                    return retobj;
                }
                else {
                    log("table_get_columns: no _columns");
                }
            }
            else {
                log("table_get_columns: no tableID");
            }
        }
    },
    table_get_head_recordID: function (obj) {
        if (obj) {
            //obj["tableID"]
            var tableID = (obj["tableID"] === undefined) ? "" : "" + obj["tableID"];

            if (pkey["_tables"] !== undefined) {
                //var voteable = (age < 18) ? "Too young":"Old enough";
                var cc = (pkey["_tables"]["cc"] === undefined) ? 0 : pkey["_tables"]["cc"];
                for (var rc = 0; rc < cc; rc++) {
                    if (pkey["_tables"][rc]["tableID"] === tableID) {
                        if (pkey["_tables"][rc]["head_recordID"]) {
                            return pkey["_tables"][rc]["head_recordID"];
                        }
                        else {
                            log("table_get_head_recordID no head_recordID in _tables");
                        }
                    }
                    else {
                        log("table_get_head_recordID no tableID in _tables");
                    }
                }
                //return cc;
            }
        }
    },
    table_get_tail_recordID: function (obj) {
        if (obj) {
            //obj["tableID"]
            var tableID = (obj["tableID"] === undefined) ? "" : "" + obj["tableID"];

            if (pkey["_tables"] !== undefined) {
                //var voteable = (age < 18) ? "Too young":"Old enough";
                var cc = (pkey["_tables"]["cc"] === undefined) ? 0 : pkey["_tables"]["cc"];
                for (var rc = 0; rc < cc; rc++) {
                    if (pkey["_tables"][rc]["tableID"] === tableID) {
                        if (pkey["_tables"][rc]["tail_recordID"]) {
                            return pkey["_tables"][rc]["tail_recordID"];
                        }
                        else {
                            log("table_get_tail_recordID no tail_recordID in _tables");
                        }
                    }
                    else {
                        log("table_get_tail_recordID no tableID in _tables");
                    }
                }
                //return cc;
            }
        }
    },
    table_settings_place: function (obj) {
        //obj["tableID"] 
        log("@ pkey.table_settings_place() " + JSON.stringify(obj));
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
    table_clear_records: function (obj) {
        //TAKE INPUT obj AND PLACE INTO DOM
        if (obj) {
            var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";
            if (pkey["_recordset"] !== undefined) {
                if (pkey["_recordset"]["T_" + tableID] !== undefined) {
                    pkey["_recordset"]["T_" + tableID] = {cc: 0, list: {}};
                }
            }
        }
    },
    table_place: function (obj) {
        //TAKE INPUT obj AND PLACE INTO DOM
        if (obj) {
            var allowed = [
                "tableID",
                "table_slug",
                "table_alias",
                "created_timestamp",
                "authorID",
                "settings_object",
                "head_recordID",
                "tail_recordID"
            ];
            var ac = allowed.length;
            var _tables_cc = 0;

            //quick check for if table already exists
            var does_table_exist = pkey.table_is_table(obj);

            //alert("does this table exist:"+does_table_exist);

            if (pkey["_tables"] === undefined) {
                pkey["_tables"] = {};
            }
            if (pkey["_tables"]["cc"] !== undefined) {
                _tables_cc = pkey["_tables"]["cc"];
            }
            else {
                //create the cc on the fly
                pkey["_tables"]["cc"] = 0;
            }

            //now fill the position
            if (pkey["_tables"][_tables_cc] === undefined) {
                pkey["_tables"][_tables_cc] = {};
            }

            for (var acx = 0; acx < ac; acx++) {
                if (obj[allowed[acx]]) {
                    //this key = allowed[acx]
                    pkey["_tables"][_tables_cc][allowed[acx]] = obj[allowed[acx]];
                    log("YES INNER: " + obj[allowed[acx]]);
                }
            }
            //end with adjusting the cc
            pkey["_tables"]["cc"]++;



        }
        else {
            log("@ table_place no obj");
        }
    },
    table_render: function (obj) {
        if (obj) {
            //obj needs to declare the tableID and target
            //table_render will populate itself with records upon completion of table loading
            var does_this_table_exist = false;
            var ull = "";
            does_this_table_exist = pkey.table_is_table(obj);
            log("this table exists:" + does_this_table_exist);

            if (does_this_table_exist === true) {
                var tableID = obj["tableID"];
                var table_target = "";
                if (obj["table_target"] === undefined) {
                    log("**table_render:NO TABLE TARGET IS SET");
                    //notify("FIXABLE ERROR", "No table target is set");
                    
                }
                else {
                    table_target = obj["table_target"];
                    //create element and place into dom
                    jQuery(document).ready(function () {
                        jQuery("#" + table_target).html("<ul id='T_" + tableID + "' class='screen_recordset tsbp_recordset'></ul>");
                        //jQuery("#test_output_div").append("<ul id='T_"+tableID+"'></ul>");
                    });
                }
            }
            else {
                log("@ table_render no such table to render");
            }
        }
        else {
            log("@ table_render no obj");
        }
    },
    table_pull: function (obj) {
        //check if this table already exists in the pkey._tables object
        if (obj) {
            //obj["tableID"]
            log("====table_pull tableID:" + obj["tableID"]);
            var pas = false;
            var tableID = "";
            if (obj["tableID"]) {
                tableID = "" + obj["tableID"];
            }
            if (tableID !== "" && tableID !== undefined) {
                //search through _tables and find the matching ID
                var _tables_cc = 0;
                if (pkey["_tables"] === undefined) {
                    pkey["_tables"] = {cc: 0};
                }

                if (pkey["_tables"]["cc"] !== undefined) {
                    _tables_cc = pkey["_tables"]["cc"];
                }

                for (var tc = 0; tc < _tables_cc; tc++) {
                    if (pkey["_tables"][tc] === undefined) {
                        pas = true;
                    }
                    if (pkey["_tables"][tc] !== undefined && pkey["_tables"][tc]["tableID"] == tableID) {
                        //this table exists
                        pas = true;
                        delete(pkey["_tables"][tc]);
                    }
                }
            }
            if (pas === true) {
                //return true;
                log("NOW RESTACK THE TABLES:" + JSON.stringify(pkey._tables));
                pkey.table_restack_tables();
            }
            else {
                return false;
            }
        }
    },
    table_restack_tables: function () {
        //sort thru all tables in DOM
        //grab data and place into array
        //restack DOM _tables from array
        if (pkey._tables === undefined) {
            pkey._tables = {cc: 0};
        }

        var cc = (pkey._tables["cc"] !== undefined) ? pkey._tables["cc"] : 0;
        log("table_restack_tables CC:" + cc);
        var load_arr = {}, lx = 0;
        for (var tc = 0; tc < cc; tc++) {
            if (pkey._tables[tc] !== undefined) {
                //load_arr[lx] = {};
                log("----" + pkey._tables[tc]["table_slug"]);
                load_arr[lx] = pkey._tables[tc];
                lx++;
            }
        }
        log("table_restack_tables with:" + JSON.stringify(load_arr));
        pkey._tables = {cc: 0};
        if (lx > 0) {

            for (var x = 0; x < lx; x++) {
                pkey._tables[x] = {};
                pkey._tables[x] = load_arr[x];
                pkey._tables["cc"]++;
            }
        }

    },
    column_place: function (obj) {
        if (obj) {
            log("pkey.column_place:" + JSON.stringify(obj));
            if (pkey["_columns"] === undefined) {
                pkey["_columns"] = {cc: 0};
            }
            var allowed_c = [
                "columnID",
                "tableID",
                "prev_columnID",
                "column_slug",
                "column_alias",
                "description",
                "authorID"
            ];
            var acl = allowed_c.length;

            for (var ac = 0; ac < acl; ac++) {
                if (obj[allowed_c[ac]] !== undefined) {

                    if (pkey["_columns"][pkey["_columns"]["cc"]] === undefined) {
                        pkey["_columns"][pkey["_columns"]["cc"]] = {};
                    }
                    pkey["_columns"][pkey["_columns"]["cc"]][allowed_c[ac]] = obj[allowed_c[ac]];
                }
            }
            pkey["_columns"]["cc"]++;
        }
    },
    column_get_alias: function (columnID) {
        if (columnID) {
            var cc = 0;
            if (pkey["_columns"] === undefined) {
                pkey["_columns"] = {cc: 0};
            }
            if (pkey["_columns"]["cc"] !== undefined) {
                cc = pkey["_columns"]["cc"];
            }
            for (var c = 0; c < cc; c++) {
                var check = "C_" + pkey["_columns"][c]["columnID"];
                if (check === columnID) {
                    return pkey["_columns"][c]["column_alias"];
                }
            }
        }
    },
    column_get_value: function (obj) {
        if (obj) {
            //obj["tableID"]
            //obj["recordID"]
            //obj["columnID"]
            var tableID, recordID, columnID;
            log("column_get_value:" + JSON.stringify(obj));
            if (obj["tableID"] !== undefined) {
                tableID = "T_" + obj["tableID"];
            }
            if (obj["recordID"] !== undefined) {
                recordID = "R_" + obj["recordID"];
            }
            if (obj["columnID"] !== undefined) {
                columnID = obj["columnID"];
            }
            if (pkey._recordset !== undefined && pkey._recordset[tableID] !== undefined) {
                if (pkey._recordset[tableID]["list"] !== undefined && pkey._recordset[tableID]["list"][recordID]) {
                    if (
                            pkey._recordset[tableID]["list"][recordID]["content_object"] !== undefined &&
                            pkey._recordset[tableID]["list"][recordID]["content_object"][columnID] !== undefined
                            ) {
                        return pkey._recordset[tableID]["list"][recordID]["content_object"][columnID];
                    }
                }
                else {
                    log("column_get_value: no list or [recordID]");
                }
            }
            else {
                log("column_get_value: no _recordset or [tableID]");
            }
        }
    },
    record_ds: function (obj) {
        //single record data storage
        //obj["column_name1"] = value1
        //obj["column_name2"] = value2
        if (obj) {
            var sender = {}, sx = 0, sx2 = 0;

            //CONSTRUCT obj["list_data"]
            //CONSTRUCT obj["list"]
            sender["list"] = {};
            sender["list_data"] = {};
            for (var vx in obj) {
                sender["list"][sx] = vx;
                sender["list_data"][vx] = obj[vx];
                sx++;
            }

            //alert("sender:"+JSON.stringify(sender));
            pkey.record_place(sender);
            //alert("record_ds:"+JSON.stringify(obj));
        }
    },
    record_place: function (obj) {
        //SINGLE RECORD PLACEMENT INTO DOM @ pkey._recordset["list"][ID][column_name] = value;
        //obj will contain list of column_names to use along with data in column_name:value pairs
        //***obj["type"] = the title of the record group (matches the pkey[obj[type]])
        //obj["list"] = { 0 : "column_name1", 1 : "column_name2" };
        //obj["list_data"] = { column_name1 : "value", column_name2 : "value" };
        //obj["type"] = "stringData"; // is the title of the pkey object to place this record into
        if (obj) {
            //EXTRACT ID AND USE IT AS THE [x]
            if (obj["list"]) {
                var list_push = {}, lpx = 0, clear = false, table_clear = false, tableID = "", mode_pass = "v", dragID = "";

                var final_push = {}, timestamp1 = "";
                var fx = 0;

                for (var gg in obj["list"]) {
                    log("%%% PKEY _RECORDSET:" + obj["list"][fx]);

                    //GET SPECIFIC column_names
                    if (obj["list"][fx] === "recordID") {
                        clear = true;
                    }
                    else if (obj["list"][fx] === "tableID") {
                        table_clear = true;
                        //alert(obj["list_data"]["table_name"]);
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
                log("** pkey._recordset.place() no 'list' SENT:" + JSON.stringify(obj));
            }

            //CHECK TO SEE IF table_name WAS SENT
            if (table_clear === true) {
                tableID = "T_" + obj["list_data"]["tableID"];
            }
            else { //IF no table_name, assign to: T_orphans
                tableID = "T_orphans";
            }

            if (clear === true) {
                // ID IS THERE, NOW GET THE ID
                dragID = "R_" + obj["list_data"]["recordID"];
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
                //increment the counter if not subversion
                if (pkey._recordset[tableID]["list"][dragID]["prev_versionID"] === null) {
                    pkey._recordset[tableID]["cc"]++;
                }
            }
            //alert("FINAL PUSH: "+JSON.stringify(final_push));
            //alert("FINAL pkey._recordset: "+JSON.stringify(pkey._recordset.list));



        }
    },
    record_update: function (obj) {
        log('received:' + JSON.stringify(obj));
        if (obj) {
            if (obj["result"] !== undefined && obj["result"] === "true") {

                var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";

                notify("DATA UPDATED", "Data successfully updated.", "green_check");

                if ((obj["was_new_record"] !== undefined && obj["was_new_record"] === "true")) {
                    var window_div = jQuery("#myModal");
                    window_div.modal("toggle");
                }
                else if(obj["was_pos_move"] !== undefined && obj["was_pos_move"] === "true"){
                    //do nothing
                }
                else {
                    var window_div = jQuery("#myModal_mod_window");
                    window_div.modal("toggle");
                }
                pkey.table_pull({"tableID": tableID});
                pkey.table_clear_records({"tableID": tableID});
                get_table({"tableID": tableID, "table_target": "tsbp_tasks"});

            }

        }
    },
    record_change_version: function (obj) {
        if (obj) {
            //obj["recordID"]
            //obj["prev_versionID"]
            //obj["tableID"]
            var t_table = "", r_record = "", prev_versionID = "";
            if (obj["tableID"] !== undefined) {
                t_table = "T_" + obj["tableID"];
            }
            if (obj["recordID"] !== undefined) {
                r_record = "R_" + obj["recordID"];
            }
            if (obj["prev_versionID"] !== undefined) {
                prev_versionID = "" + obj["prev_versionID"];
            }
            if (pkey["_recordset"] !== undefined) {
                if (pkey["_recordset"][t_table] !== undefined) {
                    if (pkey["_recordset"][t_table]["list"] !== undefined) {

                        if (pkey["_recordset"][t_table]["list"][r_record] !== undefined) {
                            pkey["_recordset"][t_table]["list"][r_record]["prev_versionID"] = prev_versionID;
                        }
                    }
                }
            }
            else {
                log("pkey._recordset = undefined");
            }
        }
    },
    record_change_position: function (obj) {
        if (obj) {
            //obj["recordID"]
            //obj["next_recordID"]
            //obj["tableID"]
            var t_table = "", r_record = "", next_recordID = "";
            if (obj["tableID"] !== undefined) {
                t_table = "T_" + obj["tableID"];
            }
            if (obj["recordID"] !== undefined) {
                r_record = "R_" + obj["recordID"];
            }
            if (obj["next_recordID"] !== undefined) {
                next_recordID = "" + obj["next_recordID"];
            }
            if (pkey["_recordset"] !== undefined) {
                if (pkey["_recordset"][t_table] !== undefined) {
                    if (pkey["_recordset"][t_table]["list"] !== undefined) {

                        if (pkey["_recordset"][t_table]["list"][r_record] !== undefined) {
                            pkey["_recordset"][t_table]["list"][r_record]["next_recordID"] = next_recordID;
                        }
                    }
                }
            }
            else {
                log("pkey._recordset = undefined");
            }
        }
    },
    record_render_all: function (tableID) {
        //obj will contain:
        //obj["tableID"]
        //using tableID you can find the UL
        log('record_render_all:' + tableID);
        if (tableID) {

            jQuery(document).ready(function () {
                //locate table UL
                var g = jQuery("#T_" + tableID);
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
                var new_button = "<span id='corner_plus'><a href='javascript:void(0);' onclick='javascript:pkey.record_open_add_new();' data-toggle='modal' data-target='#myModal'><img src='/wp-content/uploads/2017/05/plus-sign1-1.png'/></a></span>";
                var running_select_x = 1;
                var content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
                var header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
                var main_header1 = pkey.table_get_setting({"tableID": tableID, "settings_name": "main_header"});

                var can_user_settings = true, can_user_print = true;

                var text_output = "", main_checkbox = "", printicon = "", settingsicon = "", bulk_action = "", head_record = "";

                var t_table = "T_" + tableID;

                //bulk_action = "<a href='#'><span class='main_button'><i class='fa fa-clock-o'></i><span class='header_icontext'>Bulk Action</span></span></a>";

                for (var col in header_columns) {
                    var coltitle = pkey.column_get_alias(header_columns[col]);
                    if(text_output.length < 150){
                        text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                    }
                }
                for (var col in content_columns) {
                    var coltitle = pkey.column_get_alias(content_columns[col]);
                    if(text_output.length < 150){
                        text_output += "<span class='tdx_column_header_key'>" + coltitle + "</span>";
                    }
                }

                if (can_user_print === true) {
                    printicon = "<a href='javascript:window.print();'><span class='main_button'><i class='fa fa-print' aria-hidden='true'><span class='icontext'>Print</span></i></span></a>";
                }
                if (can_user_settings === true) {
                    settingsicon = "<a href='#' onclick='javascript:pkey.table_display_settings(\"" + tableID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><span class='main_button'><i class='fa fa-cogs' aria-hidden='true'><span class='icontext'>Settings</span></i></span></a>";
                }

                main_checkbox = "<input type='checkbox' id='tdx_main_check_T_" + tableID + "' onchange='javascript:record_UI_checkall(\"" + tableID + "\");' />";

                head_record = pkey.table_get_head_recordID({"tableID": tableID});

                //CLEAR THE CONTENT OF THE TABLE UL
                //if main_header1 == true place main header
                if(main_header1 === true || main_header1 === "true"){
                    g.html("<li class='tdx_main_header' id='T_" + tableID + "_main_header'>" + main_checkbox + "<span class='tdx_main_header_cols'>" + text_output + "</span><span class='buttons_main'>" + bulk_action + printicon + settingsicon + "</span></li>");
                }
                else{
                    g.html("");
                }
                
                //alert(head_record);
                if (head_record !== undefined) {
                    var r_head = "R_" + head_record;
                    if (pkey["_recordset"][t_table] === undefined) {
                        pkey["_recordset"][t_table] = {cc: 0, list: {}};
                    }
                    var rcc = (pkey["_recordset"][t_table]["cc"] === undefined) ? 0 : pkey["_recordset"][t_table]["cc"];
                    log("tableID: " + tableID + "; rcc:" + rcc);

                    log(JSON.stringify({"tableID": tableID, "T_tableID": t_table, "R_recordID": r_head}));
                    //PLACE HEAD RECORD
                    pkey.record_render_single({"tableID": tableID, "T_tableID": t_table, "R_recordID": r_head, "this_running_x": running_select_x});
                    running_select_x++;
                    var next_recordID = "0";

                    if (pkey["_recordset"][t_table]["list"][r_head]["next_recordID"] !== undefined) {
                        next_recordID = pkey["_recordset"][t_table]["list"][r_head]["next_recordID"];
                    }

                    if (pkey["_recordset"] !== undefined) {

                        if (pkey["_recordset"][t_table] !== undefined) {

                            if (pkey["_recordset"][t_table]["list"] !== undefined) {

                                //MINUS 1 FROM THE rcc BECAUSE THE HEAD RECORD HAS ALREADY BEEN PLACED
                                var grcc = rcc - 1;

                                for (var x = 0; x < grcc; x++) {
                                    //SORT THROUGH ALL THE RECORDS FOR THE GIVEN TABLEID
                                    if (pkey["_recordset"][t_table]["list"]["R_" + next_recordID] !== undefined) {
                                        //IF THERE IS A NEXT_RECORDID THEN RENDER IT TO THE SCREEN
                                        pkey.record_render_single({"tableID": tableID, "T_tableID": t_table, "R_recordID": "R_" + next_recordID, "this_running_x": running_select_x});
                                        //alert('running select:'+running_select_x);
                                        running_select_x++;
                                        //NOW CHECK FOR THAT NEXT RECORDS' NEXT RECORDID
                                        if (pkey["_recordset"][t_table]["list"]["R_" + next_recordID]["next_recordID"] !== undefined) {
                                            //IF THERE IS A NEXT_RECORDID, THEN CHANGE THE VARIABLE FOR THE NEXT ITERATION
                                            next_recordID = pkey["_recordset"][t_table]["list"]["R_" + next_recordID]["next_recordID"];

                                        }

                                    }

                                }
                            }
                        }
                    }
                    else {
                        log("pkey._recordset = undefined");
                    }
                }

                //insert records into table UL

                //g.append("<li id='R_"+tableID+"_"+this_recordID+"' style='border:thin solid red'></li>");
                //g.append("<li style='border:thin solid red;'>testss</li>");

                //sort through pkey._recordset and display each record for this table

                //place the records into the table UL

                //IS DRAGGABLE?
                var can_drag = false;
                can_drag = pkey.table_get_setting({"tableID": tableID, "settings_name": "allow_drag_reorder"});
                log("can you drag drop?" + can_drag);
                if (can_drag === "true") {
                    log('can drag ' + can_drag + " tableID:" + tableID);
                    jQuery(document).ready(function () {
                        jQuery(function () {
                            /*alert('drag set');
                             var tt = "#T_"+tableID;
                             jQuery(tt).sortable({
                             placeholder: "ui-state-highlight"
                             });
                             jQuery("#T_"+tableID).disableSelection();
                             alert('gg');
                             jQuery("#T_"+tableID).append("ASDFASDFASDFADFADSF");
                             */
                        });
                    });
                }
                var myModal_mod_window1 = jQuery("#myModal_mod_window");
                if (!myModal_mod_window1.length) {
                    jQuery('body').prepend(mod_win_content);
                }
                //set the timer
                column_timer = setTimeout(function () {
                    jQuery(".tdx_column_header_key").each(function () {
                        //this.innerHTML = "test";
                        var check = this.innerHTML;
                        if (check === "undefined:" || check === "undefined") {
                            //check for the column name again. if its not there, univ_post for it
                            this.innerHTML = "fresh title";
                        }
                    });
                }, 3000);
                //clearTimeout(column_timer);

                //ADD THE ADD NEW PLUS BUTTON
                var corner = jQuery("#corner_plus");
                if (corner.length) {
                    corner.replaceWith(new_button);
                }
                else {
                    jQuery("#page").append(new_button);
                }
                pkey.append_tab_handler();
            });

        }
    },
    record_render_single: function (obj) {
        if (obj) {
            jQuery(document).ready(function () {
                var tableID = "", t_tableID = "", recordID = "", r_recordID = "";
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


                if (obj["T_tableID"]) {
                    t_tableID = obj["T_tableID"];
                }
                if (obj["R_recordID"]) {
                    recordID = obj["R_recordID"].slice(2);
                    r_recordID = obj["R_recordID"];
                }
                if (obj["tableID"]) {
                    tableID = obj["tableID"];
                }
                if (obj["prev_versionID"]) {
                    //prev_versionID = obj["prev_versionID"];
                }
                if (obj["next_recordID"]) {
                    next_recordID = obj["next_recordID"];
                }

                var temp_total = (pkey["_recordset"] && pkey["_recordset"][t_tableID] && pkey["_recordset"][t_tableID]["cc"]) ? pkey["_recordset"][t_tableID]["cc"] : 0;
                var this_running_x = (obj["this_running_x"] !== undefined) ? obj["this_running_x"] : 1;

                log("record_render_single:T:" + t_tableID + "; R:" + r_recordID);

                can_edit = pkey.table_get_setting({"tableID": tableID, "settings_name": "can_edit"});

                if (can_edit === true) {
                    edit_pos = "<a href='#' onclick='javascript:pkey.record_edit(\"" + tableID + "\",\"" + r_recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>";
                }
                if (can_delete === true) {
                    delete_pos = "<a href='javascript:pkey.record_delete(\"" + tableID + "\",\"" + r_recordID + "\")'><i class='fa fa-2x fa-times' aria-hidden='true'></i></a>";
                }

                display_type = pkey.table_get_setting({"tableID": tableID, "settings_name": "display_type"});
                can_delete = pkey.table_get_setting({"tableID": tableID, "settings_name": "can_delete"});
                can_new = pkey.table_get_setting({"tableID": tableID, "settings_name": "can_new"});
                allow_drag_reorder = pkey.table_get_setting({"tableID": tableID, "settings_name": "allow_drag_reorder"});
                column_hooks = pkey.table_get_setting({"tableID": tableID, "settings_name": "column_hooks"});
                content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
                header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
                record_buttons = pkey.table_get_setting({"tableID": tableID, "settings_name": "record_buttons"});

                //COLUMN HOOKS
                column_hooks = pkey.table_get_setting({"tableID": tableID, "settings_name": "column_hooks"});
                var hooks_add = "";

                //log(JSON.stringify("DISPLAY TYPE:"+display_type));
                //log(JSON.stringify(column_hooks));

                //sort through column values in the 'header_columns' and 'content_columns'
                if (pkey["_recordset"][t_tableID] !== undefined) {
                    if (pkey["_recordset"][t_tableID]["list"] !== undefined) {
                        if (pkey["_recordset"][t_tableID]["list"][r_recordID] !== undefined) {
                            if (pkey["_recordset"][t_tableID]["list"][r_recordID]["prev_versionID"]) {
                                prev_versionID = pkey["_recordset"][t_tableID]["list"][r_recordID]["prev_versionID"];
                            }
                            //CHECK THE HEADER_COLUMNS FIRST, ADD TO HEADER


                            //CHECK THE CONTENT_COLUMNS SECOND, ADD TO RECORD_CONTENT

                            if (pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"] !== undefined) {
                                var content = pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"];
                                for (var column in content) {
                                    var coltitle = pkey.column_get_alias(column);
                                    var temp = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10631.313101395894!2d-101.29337615920953!3d48.2291811776599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a64d9f078442083!2sMcDonalds!5e0!3m2!1sen!2sus!4v1496770932106" style="border:0" allowfullscreen="" width="400" height="300" frameborder="0"></iframe>';
                                    //does this belong in the header area or the content area?
                                    for (var col in header_columns) {
                                        if (header_columns[col] === column) {
                                            header_content += "<span class='tdx_column_header_key' >" + coltitle + ":</span>" + content[column];
                                        }
                                    }
                                    for (var col in content_columns) {
                                        if (content_columns[col] === column) {
                                            hooks_add = "";
                                            for (var hc in column_hooks) {
                                                //get the value for this column
                                                var tempadd = "";
                                                tempadd += "columnID:"+column_hooks[hc]["columnID"]+";";
                                                tempadd += "column:"+column+";";
                                                tempadd += "column_hooks type:"+column_hooks[hc]["type"]+";";

                                                //COLUMN HOOK CHECKS HERE ******************************
                                                //---GOOGLE MAP
                                                if (column_hooks[hc]["columnID"] === column && column_hooks[hc]["type"] === "google_map") {
                                                    hooks_add = "<span class='tdx_column_key'>&nbsp;</span><span class='tdx_maplink tdx_column_value' style='display:inline;float:left;'><a href='javascript:tdx_toggle(\"" + "GMAP_" + t_tableID+"_" + content_columns[col] + "_" + r_recordID + "\");'>Show On Map</a></span>";
                                                    hooks_add += "<div id='GMAP_" + t_tableID + "_" + content_columns[col] + "_" + r_recordID + "' style='display:none'>"+temp+"</div>";
                                                    //inner_text: "<a href='javascript:tdx_toggle(\"" + "GMAP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"] + "\");'>Show On Map</a>",
                                                    //class_name: "tdx_maplink"
                                                }
                                            }
                                            //ID: "SP_" + table_name + "_" + content_columns[hc] + "_" + obj["P_ID"]
                                            record_content += "<div class='tdx_column_wrapper' id='SP_"+t_tableID+"_"+content_columns[col]+"_"+r_recordID+"'><span class='tdx_column_key'>" + coltitle + ":</span><span class='tdx_column_value'>" + content[column] + "</span>" + hooks_add +/*tempadd+*/"<div style='clear:both;height:0px'>&nbsp;</div></div>";
                                        }

                                    }

                                }
                            }

                        }
                    }
                }



                var edit_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:pkey.record_edit(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a></span>";
                var view_button = "<span class='tdx_ved_buttons'><a href='javascript:void(0)' onclick='javascript:pkey.record_view(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-window-maximize' aria-hidden='true'><span class='icontext'>View</span></i></a></span>";
                var del_button = "<span class='tdx_ved_buttons del'><a href='javascript:void(0)' onclick='javascript:pkey.record_delete(\"" + tableID + "\",\"" + recordID + "\");'><i class='fa fa-times' aria-hidden='true'><span class='icontext'>Delete</span></i></a></span>";
                var ver_button = "<span class='tdx_ved_buttons versions'><a href='javascript:void(0)' onclick='javascript:pkey.record_render_versions(\"" + tableID + "\",\"" + recordID + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-code-fork' aria-hidden='true'></i></a></span>";

                check_box_pos = "<input type='checkbox' id='CH_T_" + tableID + "_R_" + recordID + "' class='tdx_record_checkbox' onchange='javascript:record_UI_sel(\"" + tableID + "\");'/>";
                
                //select_menu_output(total, selected, id, tableID)
                //sel_menu = "<span class=''>"+this_running_x+"</span>";
                if(display_type === "tasks"){
                    sel_menu = "<span class=''>" + select_menu_output(temp_total, this_running_x, recordID,tableID) + "</span>";
                }
                else{
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

                var buttons2 = "<span class='action_button'>" + record_buttons_out + "<span class='record_header_right'>" + view_button + edit_button + del_button + ver_button + "</span></span>";

                var output_text = "<li id='" + t_tableID + "_" + r_recordID + "' class='record_li ui-sortable-handle'><div class='record_header'><span class='tdx_header_checkbox_wr'>" + check_box_pos + "</span>" + sel_menu + "<span class='record_header_text'>" + header_content + "</span>" + buttons2 + "</div><div class='record_content'>" + record_content + "</div></li>";

                //log('placing append:' + output_text);
                g.append(output_text);

                //COLUMN HOOKS
                //column_hooks = pkey.table_get_setting({"tableID": tableID, "settings_name": "column_hooks"});

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
    record_render_versions: function (tableID, recordID) {
        var window_div = jQuery("#tdx_mod_window_div");
        var window_title = jQuery("#myModal_window_title");
        var output = "", tempI = "", tempID = [], tx = 1, temp_text = "";
        var version_limit = 30;
        var t_table = "T_" + tableID;
        window_div.html("");
        window_title.html("Record Versions");
        //window_div.append("LIST OF VERSIONS for this record:<BR>This tableID is:" + tableID);
        //window_div.append("<BR>This recordID is:" + recordID + "<BR>");

        //get current data real quick
        if (pkey["_recordset"][t_table]["list"]["R_" + recordID] !== undefined &&
                pkey["_recordset"][t_table]["list"]["R_" + recordID]["content_object"] !== undefined) {
            var tempcontent = pkey["_recordset"][t_table]["list"]["R_" + recordID]["content_object"];
            var temp9 = "", temp99 = "";
            for (var column in tempcontent) {
                temp9 = pkey.column_get_alias(column)
                temp99 += "<strong>" + temp9 + ":</strong> " + tempcontent[column] + "<BR/>";
            }
            output += "<div style='background-color:rgba(0,102,0,.2); padding:10px;border:thin solid #999;'><strong>Current:</strong><BR/>RecordID:" + recordID + "<BR/>" + temp99 + "</div>";
        }


        //var test = pkey.record_get_prev_versionID({"tableID": tableID, "recordID": recordID});
        //output += "===== "+test+" =====<BR>";
        //var test2 = pkey.record_get_prev_versionID({"tableID": tableID, "recordID": test});
        //output += "===== "+test2+" =====<BR>";

        var inrecordID = recordID;

        for (var x = 0; x < version_limit; x++) {
            //output += "--------- "+tempID[x]+" ---------<BR>";
            if (x === 0) {
                //first iteration, handle differently
                tempI = inrecordID;
            }
            tempI = pkey.record_get_prev_versionID({"tableID": tableID, "recordID": tempI});
            if (tempI !== undefined && tempI !== "false" && tempI !== false) {
                tempID[x] = tempI;
                if (pkey["_recordset"][t_table]["list"]["R_" + tempI] !== undefined &&
                        pkey["_recordset"][t_table]["list"]["R_" + tempI]["content_object"] !== undefined) {
                    var content_obj = pkey["_recordset"][t_table]["list"]["R_" + tempI]["content_object"];
                    var temp91 = "", temp991 = "";
                    for (var column in content_obj) {
                        temp91 = pkey.column_get_alias(column)
                        temp991 += "<strong>" + temp91 + ":</strong> " + content_obj[column] + "<BR/>";
                    }
                    var version_text = "<span style='font-size: 14px; font-weight:bold;padding:4px;margin-top:5px; border:thin solid #CCC;'>Most Recent Version #" + tx + "</span><BR/>";
                    var restore_link = "<span class='record_version_button'><a href='javascript:void(0);' onclick='javascript:pkey.record_version_restore(\"" + tableID + "\",\"" + tempI + "\");'><i class='fa fa-refresh'><span class='version_icontext'>Restore This Version</span></i></a></span>";
                    var delete_link = "";
                    //var delete_link = "<span class='record_version_button del_v'><a href='javascript:void(0);' onclick='javascript:pkey.record_delete(\"" + tableID + "\",\"" + recordID + "\");'><i class='fa fa-times'><span class='version_icontext'>Delete This Version</span></i></a></span>";
                    output += "<div style='padding:10px;border:thin solid #999;'>" + restore_link + delete_link + version_text + "RecordID:" + tempI + "<BR>" + temp991 + "</div>";
                    tx++;
                    //output += "++++"+tempID[x]+"++++<BR>";
                }

            }

        }
        
        window_div.append(output);

    },
    record_render_add_new: function () {
        /*
        //alert(JSON.stringify(obj));
        //if (obj) {
        //obj["tableID"]
        //obj["recordID"]
        //obj["window_content"]
        var curr_mode = "tab_T_1", curr_mode_do = "", curr_table = "";
        var tableID = "", recordID = "";

        if (pkey["_viewer"] !== undefined) {
            if (pkey["_viewer"]["new_window"] !== undefined) {
                if (pkey["_viewer"]["new_window"]["mode"] !== undefined) {
                    curr_mode = pkey["_viewer"]["new_window"]["mode"];
                }
            }
        }
        //cut off the "tab_"
        curr_mode_do = curr_mode.substr(5);
        tableID = curr_mode_do.substr(2);

        //alert(curr_mode_do);

        var mod_window_div = jQuery("#tdx_mod_window_div");
        var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_value = "";
        var onchange_insert = "", item_ID = "";
        //alert('current mode:'+curr_setting);

        header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
        content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
        log("header_columns:" + JSON.stringify(header_columns));
        log("content_columns:" + JSON.stringify(content_columns));

        if (mod_window_div) {
            //FIRST CLEAR THAT DIV, SO ITS EMPTY
            mod_window_div.html("");

            send_obj[sox] = {
                type: "span",
                content: {
                    parentID: "tsbp_add_new_inner",
                    placement_type: "append_innerHTML",
                    //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                    class_name: ""
                }

            };
            sox++;
            //GET COLUMN_HEADERS AND CONTENT_COLUMNS
            for (var x in header_columns) {

                item_ID = String("RCE_" + tableID + "_" + header_columns[x] + "_N");

                var key1 = pkey.column_get_alias(header_columns[x]);
                send_obj[sox] = {
                    type: "span",
                    content: {
                        parentID: "tsbp_add_new_inner",
                        placement_type: "append_innerHTML",
                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
                        class_name: "tdx_column_wrapper"
                    }

                };
                sox++;
            }
            for (var x in content_columns) {
                this_col_value = pkey.column_get_value({"tableID": tableID, "columnID": content_columns[x], "recordID": recordID});

                item_ID = String("RCE_" + tableID + "_" + content_columns[x] + "_N");
                var key1 = pkey.column_get_alias(content_columns[x]);
                send_obj[sox] = {
                    type: "span",
                    content: {
                        parentID: "tsbp_add_new_inner",
                        placement_type: "append_innerHTML",
                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text'  /></span>",
                        class_name: "tdx_column_wrapper"
                    }

                };
                sox++;
            }
            var add_new = jQuery("#tsbp_add_new_inner");
            var add_new_title = jQuery("#tdx_add_new_title");

            add_new_title.html("New Record");
            add_new.html("");
            pkey.elem_do(send_obj);
            //MODIFY SAVE BUTTONS
            //MODIFY CLOSE BUTTONS/ICONS

            //mod_window_div.html("PUT IT RIGHT HERE");
        }
        pkey.manage_edit_button({"mode": "e", "tableID": tableID, "recordID": recordID});



        //}
        */
    },
    record_render_FK: function (obj){
        if(obj){
            //obj["recordID"]
            //obj["identifier"] === String(obj["identifier"] + "ID")
            
            var sender = {};

            sender["recordID"]      = (obj["recordID"]!== undefined) ? obj["recordID"] : "";
            sender["tableID"]       = (obj["tableID"]!== undefined) ? obj["tableID"] : "";
            sender["identifier"]    = (obj["identifier"]!== undefined) ? obj["identifier"] : "";
            sender["timestamp"]     = pkey.get_timestamp();

            //univ post the object
            pkey.univ_post("get_FKdata", sender, pkey.show_FKdata);
        }
    },
    record_display_x: function (obj) {
        //obj will contain:
        //obj["record_group"] = the record_group
        //obj["table_name"] = the table_name
        //obj["ID"] = the ID of the record being produced
        //obj["P_ID"] = the "P"+ID of the record being pulled
        //obj["screen_target"] = the jQuery HTML element of the screen target
        //obj["screen_name"];
        if (obj) {
            //P_ID is important
            var pid = "", record_group_div, record_group = "", screen_name = "", table_name = "", header_columns = {};
            var content_columns = {}, record_buttons = {}, column_hooks = {}, can_edit = false, can_delete = false, can_new = false;
            var edit_pos = "", delete_pos = "", new_pos = "", min_max_inner = "", curr_mode_setting = "", curr_view_setting = "", view_status = "minimized", view_send = "max";

            var sendobj = {}, sox = 0;
            if (obj["P_ID"] !== undefined) {

                if (obj["record_group"] !== undefined) {
                    record_group = obj["record_group"];
                }
                if (obj["table_name"] !== undefined) {
                    table_name = obj["table_name"];
                }
                if (obj["screen_name"] !== undefined) {
                    screen_name = obj["screen_name"];
                }

                //CAN THE USER EDIT
                can_edit = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "allow_edit"});

                if (can_edit === true) {
                    //WHAT IS THE CURRENT MODE FOR THIS RECORD?
                    //edit_pos = "<a href='javascript:record_edit(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\")'><img src='http://data-controller.com/s/cm/assets/edit.png' alt='EDIT' width='25px'/></a>";
                    curr_mode_setting = pkey.record_get_setting({"table_name": table_name, "ID": obj["P_ID"], "settings_name": "mode"});
                    //RENDER AS NORMAL EDIT BUTTON
                    edit_pos = "<a href='#' onclick='javascript:record_edit(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\",\"" + record_group + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>";
                }

                //CAN THE USER DELETE
                can_delete = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "allow_delete"});

                if (can_delete === true) {
                    //WHAT IS THE CURRENT MODE? NEED TO KNOW FOR THE BUTTONS
                    curr_mode_setting = pkey.record_get_setting({"table_name": table_name, "ID": obj["P_ID"], "settings_name": "mode"});

                    //NOT IN EDIT MODE, RENDER AS NORMAL DELETE BUTTON
                    delete_pos = "<a href='javascript:record_delete(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\",\"" + record_group + "\")'><i class='fa fa-2x fa-times' aria-hidden='true'></i></a>";

                }

                //CAN THE USER ADD NEW
                can_new = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "allow_new"});

                //WHAT IS THE CURRENT VIEW FOR THE RECORD?
                //min or max
                curr_view_setting = pkey.record_get_setting({"table_name": table_name, "ID": obj["P_ID"], "settings_name": "view"});
                if (curr_view_setting === "min") {
                    view_status = "minimized";
                    view_send = "max";
                    min_max_inner = "fa-window-maximize";
                }
                if (curr_view_setting === "max") {
                    view_status = "maximized";
                    view_send = "min";
                    min_max_inner = "fa-window-minimize";
                }

                sendobj[sox] = {
                    type: "li",
                    content: {
                        ID: table_name + "_" + obj["P_ID"],
                        class_name: "" + table_name + " record_li ui-sortable-handle",
                        parentClass: "RG_" + record_group,
                        placement_type: "append_innerHTML"
                    }

                };
                sox++;

                sendobj[sox] = {
                    type: "div",
                    content: {
                        ID: table_name + "_header_" + obj["P_ID"],
                        class_name: table_name + "_header record_header",
                        parentID: table_name + "_" + obj["P_ID"],
                        placement_type: "append_innerHTML"
                    }

                };
                sox++;

                sendobj[sox] = {
                    type: "span",
                    content: {
                        ID: table_name + "_RC_" + obj["P_ID"],
                        class_name: "record_content " + view_status,
                        parentID: table_name + "_" + obj["P_ID"],
                        placement_type: "append_innerHTML"
                    }

                };
                sox++;

                sendobj[sox] = {
                    type: "span",
                    content: {
                        parentID: table_name + "_header_" + obj["P_ID"],
                        placement_type: "append_innerHTML",
                        inner_text: delete_pos,
                        class_name: "action_button del"
                    }

                };
                sox++;

                sendobj[sox] = {
                    type: "span",
                    content: {
                        ID: table_name + "_minmax" + obj["P_ID"],
                        class_name: "record_expand_button action_button",
                        parentID: table_name + "_header_" + obj["P_ID"],
                        placement_type: "append_innerHTML",
                        inner_text: "<a href='#' onclick='javascript:record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\",\"" + record_group + "\");' data-toggle='modal' data-target='#myModal_mod_window'><i class='fa fa-window-maximize fa-2x' aria-hidden='true'><span class='icontext'>View</span></i></a>"
                    }

                };
                sox++;

                sendobj[sox] = {
                    type: "span",
                    content: {
                        parentID: table_name + "_header_" + obj["P_ID"],
                        placement_type: "append_innerHTML",
                        inner_text: edit_pos,
                        class_name: "action_button"
                    }

                };
                sox++;

                /*sendobj[sox] = {
                 type: "a",
                 content: {
                 parentID: table_name + "_minmax" + obj["P_ID"],
                 placement_type: "append_innerHTML",
                 //hrf: "javascript:record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\",\"" + record_group + "\");",
                 inner_text: "<a href='#' onclick='javascript:record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + obj["P_ID"] + "\",\"" + record_group + "\");'><i class='fa " + min_max_inner + " fa-2x' aria-hidden='true'><span class='icontext'>View</span></i></a>"
                 }
                 };
                 sox++;*/

                pid = obj["P_ID"];
                record_group_div = jQuery(".RG_" + record_group);

                //GET SETTINGS PER SPACE AND INCLUDE IF SETTINGS GRANTED,
                //ADD TO sendobj!
                header_columns = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "header_columns"});

                //alert(JSON.stringify(header_columns));
                for (var hc in header_columns) {
                    //get the value for this column
                    var alias1 = pkey._column_alias[header_columns[hc]];
                    var vvv = pkey.column_get_value({"table_name": table_name, "column_name": header_columns[hc], "ID": pid});
                    //alert(vvv);
                    sendobj[sox] = {
                        type: "span",
                        content: {
                            parentID: table_name + "_header_" + obj["P_ID"],
                            placement_type: "append_innerHTML",
                            inner_text: "<span class='tdx_column_header_key'>" + alias1 + ":</span><span class='tdx_column_header_value'>" + vvv + "</span>",
                            class_name: header_columns[hc] + " record_title"
                        }

                    };
                    sox++;
                }

                content_columns = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "content_columns"});

                for (var hc in content_columns) {
                    //get the value for this column
                    var mode_curr = "v";
                    var alias1 = pkey._column_alias[content_columns[hc]];
                    var vvv = pkey.column_get_value({"table_name": table_name, "column_name": content_columns[hc], "ID": pid});

                    mode_curr = pkey.record_get_setting({"settings_name": "mode", "ID": obj["P_ID"], "table_name": table_name});
                    //alert(mode_curr);
                    if (mode_curr === "e") {
                        var keyup = "javascript:pkey.record_is_mod({\"table_name\":\"" + table_name + "\", \"record_group\":\"" + record_group + "\", \"screen_name\":\"" + screen_name + "\", \"ID\":\"" + pid + "\"});";
                        var vvv2 = "<input type='text' value='" + vvv + "' onkeyup='" + keyup + "' id='RCE_" + record_group + "_" + table_name + "_" + content_columns[hc] + "_" + pid + "'/>";
                        vvv = vvv2;
                    }

                    //alert(vvv);
                    sendobj[sox] = {
                        type: "span",
                        content: {
                            parentID: table_name + "_RC_" + obj["P_ID"],
                            placement_type: "append_innerHTML",
                            inner_text: "<span class='tdx_column_key'>" + alias1 + ":</span><span class='tdx_column_value'>" + vvv + "</span>",
                            class_name: content_columns[hc] + " tdx_column",
                            ID: "SP_" + table_name + "_" + content_columns[hc] + "_" + obj["P_ID"]
                        }

                    };
                    sox++;
                }

                sendobj[sox] = {
                    type: "span",
                    content: {
                        parentID: table_name + "_header_" + obj["P_ID"],
                        ID: "header_buttons_" + table_name + "_" + obj["P_ID"],
                        placement_type: "append_innerHTML",
                        class_name: "header_buttons"
                    }

                };
                sox++;

                record_buttons = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "record_buttons"});

                for (var rb in record_buttons) {
                    //alert(JSON.stringify(record_buttons[rb]));
                    var outp = "", text_thing2 = "", text_thing = "", wrapper_class = "", icon_class = "", icon_text = "", hrf = "", modal_targetID = "";
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
                        outp = "<a href='" + hrf + "' data-toggle='modal' data-target='#" + modal_targetID + "'>" + text_thing2 + "</a>";
                    }

                    sendobj[sox] = {
                        type: "span",
                        content: {
                            parentID: "header_buttons_" + table_name + "_" + obj["P_ID"],
                            placement_type: "append_innerHTML",
                            inner_text: outp,
                            class_name: wrapper_class
                        }

                    };
                    sox++;
                }

                //COLUMN HOOKS
                column_hooks = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "column_hooks"});

                for (var hc in column_hooks) {
                    //get the value for this column
                    if (column_hooks[hc]["type"] === "google_map") {
                        var temp = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10631.313101395894!2d-101.29337615920953!3d48.2291811776599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a64d9f078442083!2sMcDonalds!5e0!3m2!1sen!2sus!4v1496770932106" style="border:0" allowfullscreen="" width="400" height="300" frameborder="0"></iframe>';
                        //alert("column_hook map:"+JSON.stringify(column_hooks[hc]));
                        sendobj[sox] = {
                            type: "span",
                            content: {
                                parentID: "SP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"],
                                placement_type: "append_innerHTML",
                                inner_text: "<a href='javascript:tdx_toggle(\"" + "GMAP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"] + "\");'>Show On Map</a>",
                                class_name: "tdx_maplink"
                            }

                        };
                        sox++;

                        sendobj[sox] = {
                            type: "span",
                            content: {
                                parentID: "SP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"],
                                placement_type: "append_innerHTML",
                                inner_text: temp,
                                class_name: "tdx_maplink",
                                ID: "GMAP_" + table_name + "_" + column_hooks[hc]["column_name"] + "_" + obj["P_ID"],
                                styles: "display:none;"
                            }

                        };
                        sox++;
                    }


                }

                //

                //record_group_div.append("now place:" + pid + "<BR/>");
                pkey.elem_do(sendobj);
            }
            else {
                console.log("!!** pkey.record_display_x(obj) !!!FATAL ERROR!! MUST SEND P_ID");
            }
        }
    },
    record_pull: function (obj) {
        //pull by ID
        if (obj) {
            var dragID = "";
            var r_record = "", t_table = "";
            if (obj["recordID"]) {
                r_record = "R_" + obj["recordID"];
                t_table = "T_" + obj["tableID"];
                if (pkey._recordset[t_table] !== undefined) {
                    if (pkey._recordset["list"].hasOwnProperty(r_record)) {
                        alert('pkey._recordset ID hasownproperty = true');
                        delete pkey._recordset[t_table][r_record];
                        //CHANGE THE NEXT_RECORD FOR RECORD ABOVE IN STACK
                        //DELETE THE SUBVERSIONS IF ANY
                    }
                }
                else {
                    log("record_pull no t_table in pkey");
                }
            }
            else {
                console.log("pkey._recordset.update() no ID sent");
            }
        }
    },
    record_edit: function (tableID, recordID) {
        //alert('edit');
        pkey.record_set_setting({"settings_name": "mode", "settings_value": "e", "recordID": recordID, "tableID": tableID});
        pkey.record_open(tableID, recordID);
    },
    record_view: function (tableID, recordID) {
        pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "recordID": recordID, "tableID": tableID});
        pkey.record_open(tableID, recordID);
    },
    record_undo: function (screen_name, table_name, ID, record_group) {
        if (screen_name && table_name && ID && record_group) {
            pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "ID": ID, "table_name": table_name});
            //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
            //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
        }
    },
    record_delete: function (tableID, recordID) {
        if (tableID && recordID) {
            if (confirm("Are you sure you want to delete this record?\nTHIS WILL DELETE THE RECORD FOREVER!") === true) {
                //record_is_record >> check if the record exists, 
                //if yes: send to server with action for delete_record (gets deleted by php on server)
                //check response
                //if results == true then check record_is_record
                //if record still exists delete the record ID
                //alert('SEND THAT SHIT! -- Delete ID:' + recordID);
                var sender = {"tableID": tableID, "recordID": recordID};
                pkey.univ_post("delete_recordID", sender, pkey.record_delete_handler);
                //pkey.record_pull({"recordID": recordID, "tableID": tableID});
                //pkey.record_render_all(tableID);
            }
            //UNIV_POST THE DELETE
            //IF DELETE IS SUCCESSFUL THEN pkey.record_pull();

        }
        return false;
    },
    record_delete_handler: function (obj) {
        if (obj) {
            //alert(JSON.stringify(obj));
            var tableID = (obj["tableID"] !== undefined) ? obj["tableID"] : "";

            notify("RECORD DELETED", "Record successfully deleted.", "green_check");
            pkey.table_pull({"tableID": tableID});
            get_table({"tableID": tableID, "table_target": "tsbp_tasks"});
        }
    },
    record_save: function (tableID, recordID, window_action) {
        if (tableID) {
            //IF NOT NEW
            if (recordID !== "") {
                //IF PRE-EXISTING RECORD
                //compare values from textboxes to dom
                //univ_post any changes
                var is_mod = pkey.record_is_mod({"tableID": tableID, "recordID": recordID});

                log(JSON.stringify(is_mod));
                if (is_mod !== undefined && (typeof is_mod === "object")) {
                    is_mod["window_action"] = window_action;
                    log('SEND IT! ' + JSON.stringify(is_mod));
                    pkey.univ_post("set_record_content", is_mod, pkey.record_update);
                }
                else {
                    notify("NOTICE!", "No changes were made to the record you are trying to save...", "blueX");

                }
            }
            //IF NEW
            if (recordID === "") {
                //sort through the tables elements and get their textbox value from the add new window
                //item_ID = String("RCE_" + tableID + "_" + header_columns[x] + "_N");
                var content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
                var header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
                var text_output = "";
                var ret = {};
                ret["tableID"] = tableID;
                ret["recordID"] = "N";
                ret["_TIMESTAMP"] = pkey.get_timestamp();
                ret["content_object"] = {};
                for (var col in content_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + content_columns[col] + "_N");
                    var coltitle = pkey.column_get_alias(content_columns[col]);
                    ret["content_object"][content_columns[col]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + content_columns[col] + "_N";
                }
                for (var col in header_columns) {
                    var data = jQuery("#RCE_" + tableID + "_" + header_columns[col] + "_N");
                    var coltitle = pkey.column_get_alias(header_columns[col]);
                    ret["content_object"][header_columns[col]] = data.val();
                    //text_output += "" + coltitle + ":"+data.val();
                    text_output += "#RCE_" + tableID + "_" + header_columns[col] + "_N";
                }
                //alert(text_output);
                //alert(JSON.stringify(ret));
                ret["window_action"] = window_action;
                log('SEND IT! ' + JSON.stringify(is_mod));
                pkey.univ_post("set_record_content", ret, pkey.record_update);
            }

        }
    },
    record_version_restore: function (tableID, recordID) {
        if (tableID && recordID) {
            if (confirm("This will move this record into the primary position, continue?") === true) {

                //if results == true then check record_is_record
                //alert('SEND THAT SHIT! -- ID:' + recordID);
                var sendob = {"tableID": tableID, "recordID": recordID, "window_action": "remain_open"};
                pkey.univ_post("set_restore_version", sendob, pkey.record_update);
                //pkey.record_render_versions(tableID,recordID);
                
            }

        }
        return false;
    },
    record_open: function (tableID, recordID) {
        if (tableID && recordID) {
            log("pkey.record_open:" + tableID + "; " + recordID);
            //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
            //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});

            //CHANGE THE MOD WINDOW TO CONTAIN THIS RECORD FOR EDIT
            var curr_setting = pkey.record_get_setting({"settings_name": "mode", "recordID": recordID, "tableID": tableID});
            var mod_window_div = jQuery("#tdx_mod_window_div");
            var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_val2 = "", this_col_value = "";
            var onchange_insert = "", item_ID = "";
            //alert('current mode:'+curr_setting);
            
            header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
            content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
            log("header_columns:" + JSON.stringify(header_columns));
            log("content_columns:" + JSON.stringify(content_columns));
            log("curr_setting:" + curr_setting);
            if (curr_setting === "e") {
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
                        this_col_val2 = pkey.column_get_value({"tableID": tableID, "columnID": header_columns[x], "recordID": recordID});
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                        item_ID = String("RCE_" + tableID + "_" + header_columns[x] + "_" + recordID);
                        /*+ pkey._column_alias[header_columns[x]]*/
                        var key1 = pkey.column_get_alias(header_columns[x]);
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
                                class_name: "tdx_column_wrapper1"
                            }

                        };
                        sox++;
                    }
                    for (var x in content_columns) {
                        this_col_val2 = pkey.column_get_value({"tableID": tableID, "columnID": content_columns[x], "recordID": recordID});
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({ \"tableID\": \"" + tableID + "\", \"recordID\":\"" + recordID + "\" });'";
                        item_ID = String("RCE_" + tableID + "_" + content_columns[x] + "_" + recordID);
                        var key1 = pkey.column_get_alias(content_columns[x]);
                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
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
                pkey.manage_edit_button({"mode": "e", "tableID": tableID, "recordID": recordID});
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
                        this_col_val2 = pkey.column_get_value({"tableID": tableID, "columnID": header_columns[x], "recordID": recordID});
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        var key1 = pkey.column_get_alias(header_columns[x]);
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
                        this_col_val2 = pkey.column_get_value({"tableID": tableID, "columnID": content_columns[x], "recordID": recordID});
                        this_col_value = (this_col_val2 !== undefined) ? this_col_val2 : "";
                        var key1 = pkey.column_get_alias(content_columns[x]);
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
                pkey.manage_edit_button({"mode": "v", "tableID": tableID, "recordID": recordID});
            }
        }
    },
    record_open_add_new: function () {
        var this_mode = "none";
        var this_method = "close";
        var tableID = "0";
        
        //read the view from the pkey
        if(pkey["_viewer"] !== undefined && pkey["_viewer"]["new_window"] !== undefined){
            if(pkey["_viewer"]["new_window"]["mode"] !== undefined){
                this_mode = pkey["_viewer"]["new_window"]["mode"];
            }
        }
        //extract the tableID
        tableID = this_mode.substr(7);
        //alert("tableID:"+tableID);
        
        //display or hide the modal window for add new
        
        //window_div.modal("toggle");
        var mod_window_div = jQuery("#tdx_mod_window_div");
        var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_value = "";
        var onchange_insert = "", item_ID = "";
        //alert('current mode:'+curr_setting);

        header_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "header_columns"});
        content_columns = pkey.table_get_setting({"tableID": tableID, "settings_name": "content_columns"});
        log("header_columns:" + JSON.stringify(header_columns));
        log("content_columns:" + JSON.stringify(content_columns));
        
        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({ \"tableID\": \"" + tableID + "\", \"recordID\":\"N\" });'";
        
        if (mod_window_div) {
            //FIRST CLEAR THAT DIV, SO ITS EMPTY
            mod_window_div.html("");

            send_obj[sox] = {
                type: "span",
                content: {
                    parentID: "tsbp_add_new_inner",
                    placement_type: "append_innerHTML",
                    //inner_text: "<span style='background-color:yellow;'>(TEMPORARY:" + JSON.stringify(header_columns) + " " + JSON.stringify(content_columns) + ")</span><BR>",
                    class_name: ""
                }

            };
            sox++;
            //GET COLUMN_HEADERS AND CONTENT_COLUMNS
            for (var x in header_columns) {

                item_ID = String("RCE_" + tableID + "_" + header_columns[x] + "_N");
                /*+ pkey._column_alias[header_columns[x]]*/
                var key1 = pkey.column_get_alias(header_columns[x]);
                
                send_obj[sox] = {
                    type: "span",
                    content: {
                        parentID: "tsbp_add_new_inner",
                        placement_type: "append_innerHTML",
                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
                        class_name: "tdx_column_wrapper"
                    }

                };
                sox++;
            }
            for (var x in content_columns) {
                this_col_value = pkey.column_get_value({"tableID": tableID, "columnID": content_columns[x]});

                item_ID = String("RCE_" + tableID + "_" + content_columns[x] + "_N");
                var key1 = pkey.column_get_alias(content_columns[x]);
                send_obj[sox] = {
                    type: "span",
                    content: {
                        parentID: "tsbp_add_new_inner",
                        placement_type: "append_innerHTML",
                        inner_text: "<span class='tdx_window_key'>" + key1 + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' " + onchange_insert + " /></span>",
                        class_name: "tdx_column_wrapper"
                    }

                };
                sox++;
            }
            var add_new = jQuery("#tsbp_add_new_inner");
            var add_new_title = jQuery("#tdx_add_new_title");

            add_new_title.html("New Record");
            add_new.html("");
            pkey.elem_do(send_obj);
            //MODIFY SAVE BUTTONS
            //MODIFY CLOSE BUTTONS/ICONS

            //mod_window_div.html("PUT IT RIGHT HERE");
        }
        pkey.manage_edit_button({"mode": "e", "tableID": tableID});

        //pkey.manage_edit_button({"mode": "e"});

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
    record_get_prev_versionID: function (obj) {
        if (obj) {
            //obj["tableID"]
            //obj["recordID"]
            //get recordID from obj
            log("@record_get_prev_versionID:" + JSON.stringify(obj));

            //search for recordID and locate prev_versionID (if exists), return number
            var recordID = "", tableID = "", t_table = "", r_record = "";
            if (obj["recordID"] !== undefined && obj["tableID"] !== undefined) {
                //log("STAGE 1");
                recordID = obj["recordID"];
                r_record = "R_" + obj["recordID"];
                tableID = obj["tableID"];
                t_table = "T_" + obj["tableID"];
                var pkey_recordset, table_pos, list1, record_pos, prev_v;

                pkey_recordset = pkey["_recordset"];
                if (pkey_recordset !== undefined) {
                    //log("STAGE 2");
                    table_pos = pkey_recordset[t_table]
                    if (table_pos !== undefined) {
                        //log("STAGE 3");
                        list1 = table_pos["list"];
                        for (var record in list1) {
                            prev_v = list1[record]["prev_versionID"];
                            //log("STAGE 3A; "+prev_v);
                            if (prev_v === recordID) {
                                //log(("STAGE 3A---; prev_"+prev_v));
                                var ret = record.substr(2);
                                return "" + ret;
                            }
                        }

                    }
                    else {
                        log("@record_get_prev_versionID fail 2");
                    }
                }
                else {
                    log("@record_get_prev_versionID fail 1");
                    return false;
                }

            }
            else {
                log("failure at record_get_prev_versionID NEED RECORDID");
                return false;
            }
        }
    },
    record_get_next_recordID: function (obj) {
        if (obj) {
            //obj["tableID"]
            //obj["recordID"]
            //get recordID from obj
            log("@record_get_next_recordID:" + JSON.stringify(obj));

            //search for recordID and locate prev_versionID (if exists), return number
            var recordID = "", tableID = "", t_table = "", r_record = "";
            if (obj["recordID"] !== undefined && obj["tableID"] !== undefined) {
                //log("STAGE 1");
                recordID = obj["recordID"];
                r_record = "R_" + obj["recordID"];
                tableID = obj["tableID"];
                t_table = "T_" + obj["tableID"];
                var pkey_recordset, table_pos, list1, record_pos, prev_v;

                pkey_recordset = pkey["_recordset"];
                if (pkey_recordset !== undefined) {
                    //log("STAGE 2");
                    table_pos = pkey_recordset[t_table];
                    if (table_pos !== undefined) {
                        //log("STAGE 3");
                        list1 = table_pos["list"];
                        for (var record in list1) {
                            prev_v = list1[record]["next_recordID"];
                            log("@record_get_next_recordID: if "+record +" == "+recordID);
                            if (record === "R_"+recordID) {
                                //log(("STAGE 3A---; prev_"+prev_v));
                                var ret = prev_v;
                                return "" + ret;
                            }
                        }

                    }
                    else {
                        log("@record_get_next_recordID: fail 2");
                    }
                }
                else {
                    log("@record_get_next_recordID: fail 1");
                    return false;
                }

            }
            else {
                log("@record_get_next_recordID: NEED RECORDID");
                return false;
            }
        }
    },
    record_get_where_next_recordID: function (obj) {
        if (obj) {
            //obj["tableID"]
            //obj["recordID"]
            //get recordID from obj
            log("@record_get_where_next_recordID:" + JSON.stringify(obj));

            //search for recordID and locate prev_versionID (if exists), return number
            var recordID = "", tableID = "", t_table = "", r_record = "";
            if (obj["recordID"] !== undefined && obj["tableID"] !== undefined) {
                //log("STAGE 1");
                recordID = obj["recordID"];
                r_record = "R_" + obj["recordID"];
                tableID = obj["tableID"];
                t_table = "T_" + obj["tableID"];
                var pkey_recordset, table_pos, list1, record_pos, prev_v;

                pkey_recordset = pkey["_recordset"];
                if (pkey_recordset !== undefined) {
                    //log("STAGE 2");
                    table_pos = pkey_recordset[t_table];
                    if (table_pos !== undefined) {
                        //log("STAGE 3");
                        list1 = table_pos["list"];
                        for (var record in list1) {
                            prev_v = list1[record]["next_recordID"];
                            log("@record_get_where_next_recordID: if "+prev_v +" == "+recordID);
                            if ("R_"+prev_v === "R_"+recordID) {
                                //log(("STAGE 3A---; prev_"+prev_v));
                                var ret = record.substr(2);
                                return "" + ret;
                            }
                        }

                    }
                    else {
                        log("@record_get_where_next_recordID: fail 2");
                    }
                }
                else {
                    log("@record_get_where_next_recordID: fail 1");
                    return false;
                }

            }
            else {
                log("@record_get_where_next_recordID: NEED RECORDID");
                return false;
            }
        }
    },
    record_is_mod: function (obj) {
        //IS THE RECORD WITH THE GIVEN ID MODIFIED?
        //RETURNS OBJECT OF {"column_name1":"new value if changed"}
        if (obj) {
            var timestamp_now = pkey.get_timestamp();

            var tableID = obj["tableID"];
            var recordID = (obj["recordID"]!== undefined) ? obj["recordID"]:"N";

            var t_tableID = "T_" + tableID;
            var r_recordID = "R_" + recordID;
            //IS THIS RECORD ID MODIFIED?
            var c = pkey.table_get_columns({"tableID": tableID});
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
                            item_name = String("#RCE_" + tableID + "_C_" + c[c2] + "_" + recordID);
                            log("%%%% here:" + item_name);
                            item = jQuery(item_name);
                            if (pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"]["C_" + c[c2]] && item) {
                                //compare value with html element
                                item_val = item.val();
                                log("==!* IF PKEY.ISMOD: " + pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"]["C_" + c[c2]] + " !== " + item_val);
                                if (item_val !== undefined) {
                                    all_obj["content_object"]["C_" + c[c2]] = item_val;
                                    //all_obj["C_"+c[c2]] = item_val;
                                }
                                if (pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"]["C_" + c[c2]] !== item_val && item_val !== undefined) {
                                    //YES THERE ARE CHANGES TO THIS ITEM
                                    flag = true;
                                    new_obj[c[c2]] = item_val;
                                    //alert(item_val);
                                    log("==!** PKEY.ISMOD: " + pkey["_recordset"][t_tableID]["list"][r_recordID]["content_object"]["C_" + c[c2]] + "!=" + item_val);
                                    item.css("border", "thin solid red");
                                }
                                else {
                                    item.css("border", "");
                                }
                            }
                            else {
                                log("record_save no item or column thing");
                                if(item){
                                    item_val = item.val();
                                    log("this item_val:"+item_val);
                                    if(item_val === ""){
                                        item.css("border","");
                                    }
                                    else{
                                        flag = true;
                                        all_obj["content_object"]["C_" + c[c2]] = item_val;
                                        item.css("border","thin solid red");
                                    }
                                }
                            }
                        }
                    }
                    else{
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
    record_is_record: function (obj) {
        if (obj) {

        }
    },
    record_x_pos: function(tableID,recordID){
        //get the x position of this recordID in this tableID
        var this_table = pkey.records_as_obj(tableID);
        var rec_does_exist = false;
        var this_record_pos = "";
        var r_rec = "R_"+recordID;
        
        //alert(JSON.stringify(this_table));
        //alert("this recordID:"+JSON.stringify(recordID));
        if(this_table !== undefined){
            //sort through this_table and see if recordID exists
            var c = (this_table["cc"] !== undefined) ? this_table["cc"] : 0; 
            //alert('C = '+c);
            //if recordID exists then extract its position
            for(var x = 0; x < c; x++){
                //alert('check:'+this_table[x]+" === "+r_rec);
                if(this_table[x] === r_rec){
                    rec_does_exist = true;
                    this_record_pos = x;
                    //alert('match @ '+r_rec);
                }
            }
            if(rec_does_exist === true){
                //alert('match for record in position '+this_record_pos);
                return this_record_pos;
            }
            else{
                return false;
            }
        }
    },
    record_x_pos_recordID: function(tableID,x_pos){
        //take the x_pos and get its recordID
        var this_table = pkey.records_as_obj(tableID);
        var rec_does_exist = false;
        var this_record_pos = "";
        var x_pos1 = (x_pos !== undefined) ? Number(x_pos) : 0;
        
        //alert("this table:"+JSON.stringify(this_table));
        //alert("this recordID:"+JSON.stringify(recordID));
        if(this_table !== undefined){
            //sort through this_table and see if recordID exists
            var c = (this_table["cc"] !== undefined) ? this_table["cc"] : 0; 
            //alert('C = '+c);
            //if recordID exists then extract its position
            for(var x = 0; x < c; x++){
                //alert('record_x_pos_recordID >check:'+x+" === "+x_pos1);
                if(x === x_pos1){
                    rec_does_exist = true;
                    this_record_pos = this_table[x].substr(2);
                    //alert('record_x_pos_recordID match @ '+x_pos1);
                }
            }
            if(rec_does_exist === true){
                //alert('match for record in position '+this_record_pos);
                return this_record_pos;
            }
            else{
                return false;
            }
        }
    },
    record_move: function (recordID, tableID) {
        if (recordID) {
            if(confirm("Are you sure you want to move this record?") === true){
                var ret = {};
                var rec_old_position = pkey.record_x_pos(tableID, recordID);
                var rec_new_position = "";
                
                ret["recordID"] = (recordID !== undefined) ? recordID : "";
                ret["tableID"] = (tableID !== undefined) ? tableID : "";
                
                //figure out new next record position
                //find the select menu for this record, what is the value?
                var rec_sel = jQuery("#tdx_SEL_"+recordID);
                var rec_sel_val = "";
                if(rec_sel){
                    rec_sel_val = Number(rec_sel.val())-1;
                }
                //get the x_pos_next_recordID
                if(rec_sel_val !== "" && rec_sel_val !== undefined){
                    //alert('the value of select:'+rec_sel_val);
                    var rpos = pkey.record_x_pos_recordID(tableID,rec_sel_val);
                    //alert("You want to move position "+rec_old_position+" to position "+rec_sel_val);
                    //alert("DEV:You want to move recordID "+recordID+" to where recordID "+rpos+" is sitting");
                    var new_next = pkey.record_get_next_recordID({"tableID":tableID,"recordID":rpos});
                    var above_rec = pkey.record_get_where_next_recordID({"tableID":tableID,"recordID":rpos});

                    //WHAT IF THE new_next IS EQUAL TO THIS RECORDID? (MEANING THIS RECORD IS STEPPING UP 1 POSITION)
                        //IF new_next == this recordID THEN GRAB this_recordID's next_recordID and use that
                    /*
                        if(new_next === recordID){
                        alert('SPECIAL 1: bumping record UP 1');
                        new_next = pkey.record_get_where_next_recordID({"tableID":tableID,"recordID":recordID});
                        ret["is_touching"] = true;
                    }
                    //WHAT IF THE RECORDID MATCHES THE ONE ABOVE IT
                    if(above_rec === recordID){
                        alert('SPECIAL 2: bumping record DOWN 1');
                        ret["is_touching"] = true;
                        //new_next = pkey.record_get_where_next_recordID({"tableID":tableID,"recordID":recordID});
                        
                    }
                    */
                    //alert('The new next_recordID will then be:'+new_next);
                }

                if(rec_old_position < rec_sel_val){ ret["direction"] = "down"; }
                else{ ret["direction"] = "up"; }

                ret["next_recordID"] = rpos;
                //alert(JSON.stringify(recs_obj));
                pkey.univ_post("update_record_position", ret, pkey.record_update);
            }
        }
    },
    records_as_obj: function(tableID){
        //sort through the records
        //build into object based upon the order.
        var head_record = "";
        var t_table = "";
        var running_x = 0;
        var ret = {};
        var retc = 0;
        t_table = "T_"+tableID;
        //alert(tableID)
        
        head_record = pkey.table_get_head_recordID({"tableID": tableID});
        if (head_record !== undefined) {
                    var r_head = "R_" + head_record;
                    if (pkey["_recordset"][t_table] === undefined) {
                        pkey["_recordset"][t_table] = {cc: 0, list: {}};
                    }
                    var rcc = (pkey["_recordset"][t_table]["cc"] === undefined) ? 0 : pkey["_recordset"][t_table]["cc"];
                    log("tableID: " + tableID + "; rcc:" + rcc);

                    log(JSON.stringify({"tableID": tableID, "T_tableID": t_table, "R_recordID": r_head}));
                    //PLACE HEAD RECORD
                    ret[running_x] = r_head;
                    //pkey.record_render_single({"tableID": tableID, "T_tableID": t_table, "R_recordID": r_head, "this_running_x": running_select_x});
                    running_x++; retc++;
                    var next_recordID = "0";

                    if (pkey["_recordset"][t_table]["list"][r_head]["next_recordID"] !== undefined) {
                        next_recordID = pkey["_recordset"][t_table]["list"][r_head]["next_recordID"];
                    }

                    if (pkey["_recordset"] !== undefined) {

                        if (pkey["_recordset"][t_table] !== undefined) {

                            if (pkey["_recordset"][t_table]["list"] !== undefined) {

                                //MINUS 1 FROM THE rcc BECAUSE THE HEAD RECORD HAS ALREADY BEEN PLACED
                                var grcc = rcc - 1;

                                for (var x = 0; x < grcc; x++) {
                                    //SORT THROUGH ALL THE RECORDS FOR THE GIVEN TABLEID
                                    if (pkey["_recordset"][t_table]["list"]["R_" + next_recordID] !== undefined) {
                                        //IF THERE IS A NEXT_RECORDID THEN RENDER IT TO THE SCREEN
                                        //pkey.record_render_single({"tableID": tableID, "T_tableID": t_table, "R_recordID": "R_" + next_recordID, "this_running_x": running_select_x});
                                        //alert('running select:'+running_select_x);
                                        ret[running_x] = "R_"+next_recordID;
                                        running_x++; retc++;
                                        //NOW CHECK FOR THAT NEXT RECORDS' NEXT RECORDID
                                        if (pkey["_recordset"][t_table]["list"]["R_" + next_recordID]["next_recordID"] !== undefined) {
                                            //IF THERE IS A NEXT_RECORDID, THEN CHANGE THE VARIABLE FOR THE NEXT ITERATION
                                            next_recordID = pkey["_recordset"][t_table]["list"]["R_" + next_recordID]["next_recordID"];

                                        }

                                    }

                                }
                                ret["cc"] = retc;
                                return ret;
                            }
                        }
                    }
                    else {
                        log("pkey._recordset = undefined");
                    }
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
    launch_email: function (obj) {
        pkey.univ_post("launch_email", {});
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
            "get_record_groups_by_screen",
            "get_records_by_group",
            "get_record_values_by_ID",
            "launch_email",
            "set_record_content",
            "delete_recordID",
            "set_restore_version",
            "update_record_position",
            "get_FKdata",
            "get_user_data",
            "get_all_columns"
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
                log("RESPONSE: " + jspost.responseText);
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
        //establish base view
        if (pkey["_viewer"] === undefined) {
            pkey["_viewer"] = {};
            if (pkey["_viewer"]["new_window"] === undefined) {
                pkey["_viewer"]["new_window"] = {"mode": "#tab_T_1"};
            }
        }

        var check_these = ["#tab_T_1", "#tab_T_3", "#tab_T_2", "#tab_T_4", "#tab_T_5", "#tab_T_6"];
        var ctc = check_these.length;

        for (var x = 0; x < ctc; x++) {
            jQuery('a').each(function (index, element) {
                if (jQuery(element).attr("href") === check_these[x])
                {
                    jQuery(element).attr("onclick", "javascript:pkey.tab_click(\"" + check_these[x] + "\")"); // Change this to .html()
                }
                //console.log('Index is:' + index + ', Element is' + element);
            });
        }
        //fill the inner div with content to start it off
        //pkey.record_render_add_new();
    },
    tab_click: function (view) {

        if (view) {
            if (pkey["_viewer"] === undefined) {
                pkey["_viewer"] = {};
                if (pkey["_viewer"]["new_window"] === undefined) {
                    pkey["_viewer"]["new_window"] = {};
                }
            }
            pkey["_viewer"]["new_window"] = {"mode": view};
            //alert(view);
        }
    },
    show_FKdata: function(obj){
        if(obj){
            alert(JSON.stringify(obj));
        }
    }
};
function get_user_data(){
    //get_user_data
    pkey.univ_post("get_user_data", {"data_target": "user_data_WR"}, get_user_data_proc);
}
function get_user_data_proc(obj){
    if (obj) {
        for (var g in obj) {
            alert("get_user_data_proc:"+obj[g]);
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

function get_actions_people(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Perform Action");

    window_div.append("<div class='tdx_action_list'>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-clock-o fa-3x'><span class='action_icontext'>Send Email</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-o fa-3x'><span class='action_icontext'>Send Text</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-users fa-3x'><span class='action_icontext'>Another Action</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-check-o fa-3x'><span class='action_icontext'>Another Action</span></i></span></div></a>");
    window_div.append("</div>");
}

function get_actions_jobs(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Perform Action");

    window_div.append("<div class='tdx_action_list'>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-clock-o fa-3x'><span class='action_icontext'>Action for job</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-o fa-3x'><span class='action_icontext'>Job action 2</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-users fa-3x'><span class='action_icontext'>Job action 3</span></i></span></div></a>");
    window_div.append("<a href='#'><div class='tdx_action_item'><span class='tdx_positioner'><i class='fa fa-calendar-check-o fa-3x'><span class='action_icontext'>Job action 4</span></i></span></div></a>");
    window_div.append("</div>");
}

function get_information(tableID, recordID) {

    if (tableID && recordID) {
        var show_these = ["1","2","3","4","5","6"];
        var show_text = ["Job","Customer","Vendor","Employee","Transaction","Inventory"];

        var window_div = jQuery("#tdx_mod_window_div");
        var window_title = jQuery("#myModal_window_title");
        window_div.html("");
        window_title.html("Information");
        //window_div.append("<strong>All FK data here, linked job data, linked people, linked transactions (if user is authd), linked inventory(if user is authd)</strong><BR>This tableID is:" + tableID);
        var ret = {};
        if(show_these.length > 0){
            var stc = show_these.length;
            for(var x = 0; x < stc; x++){
                if(show_these[x] !== undefined){
                    //add to object
                    window_div.append("<h2>"+show_text[x]+"</h2><div id='tdx_popup_"+show_these[x]+"'>"+"<div>");
                    get_table({"tableID":show_these[x],"table_target":"tdx_popup_"+show_these[x]});
                }
            }

            pkey.univ_post("get_table", ret, get_screen_proc);
        }
        
        
        window_div.append("<BR>This recordID is:" + recordID);
    }
}

function get_job(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Job Information");
    window_div.append("JOB:<BR>This tableID is:" + tableID);
    window_div.append("<BR>This recordID is:" + recordID);
}
function get_customer(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Customer Information");
    window_div.append("CUSTOMER:<BR>This tableID is:" + tableID);
    window_div.append("<BR>This recordID is:" + recordID);
}
function get_inventory(tableID, recordID) {
    var window_div = jQuery("#tdx_mod_window_div");
    var window_title = jQuery("#myModal_window_title");
    window_div.html("");
    window_title.html("Inventory");
    window_div.append("You will need this inventory:<BR>This tableID is:" + tableID);
    window_div.append("<BR>This recordID is:" + recordID);
}

function get_screen(obj) {
    if (obj) {
        //GET THE TABLEID FROM INPUT
        //UNIV POST FOR THE TABLE
        //SEND THE RETURNED VALUE TO pkey.record_ds() or pkey.record_place()
        var screenID = "";
        if (obj["screenID"] !== undefined && obj["screenID"] !== "") {
            screenID = obj["screenID"];
            log("GET_SCREEN pre pkey.univ_post()");
            pkey.univ_post("get_screen_by_ID", {"screenID": screenID}, get_screen_proc);
        }
    }
}
function get_screen_proc(obj) {
    if (obj) {
        //sort through obj with for loop
        log("######get_screen_proc:" + JSON.stringify(obj));
        pkey.screens_extract_settings(obj);
    }
}
function get_table(obj) {
    //GET THE TABLE FROM THE DATABASE AND PLACE IT INTO THE DOM
    if (obj) {
        //GET THE TABLEID FROM INPUT
        //UNIV POST FOR THE TABLE
        //SEND THE RETURNED VALUE TO get_table_proc(return_value)
        var tableID = "";
        var table_target = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            table_target = obj["table_target"];
            log("GET_TABLE pre pkey.univ_post()");
            pkey.univ_post("get_table", {"tableID": tableID, "table_target": table_target}, get_table_proc);
        }
    }
}
function get_table_proc(obj) {
    //alert('callback:'+JSON.stringify(obj));
    //GET COLUMNS
    if (obj) {
        for (var g in obj) {
            var tableID = "";
            if (obj[g]["tableID"] !== undefined && obj[g]["tableID"] !== "") {
                //MIGHT WANT TO STORE THE TABLE INFORMATION IN PKEY EVENTUALLY
                tableID = obj[g]["tableID"];
                get_columns({"tableID": tableID});
                get_records({"tableID": tableID});
                log("about to call table_place with:" + JSON.stringify(obj[g]));
                pkey.table_place(obj[g]);
                pkey.table_render(obj[g]);
            }
        }

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
            pkey.univ_post("get_columns_by_table", {"tableID": tableID}, get_columns_proc);
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
function get_records(obj) {
    log("get_records: " + JSON.stringify(obj));
    if (obj) {
        var tableID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            log("GET_RECORDS pre pkey.univ_post()");
            pkey.univ_post("get_records_by_table", {"tableID": tableID}, get_records_proc);
        }
    }
}
function get_records_proc(obj) {
    log("get_records_proc:" + JSON.stringify(obj));
    if (obj) {
        //aggregate the tableID into an array
        var tables = [], tx = 0;
        //per tableID execute pkey.record_display(tableID)
        if (obj["result"] === "no_records") {
            pkey.record_render_all(obj["tableID"]);
        }
        else {
            for (var g in obj) {
                log("............NOW RENDER:" + JSON.stringify(obj[g]));

                pkey.record_ds(obj[g]);
                if (obj[g]["tableID"] !== undefined) {
                    //push to the tables array
                    tables[tx] = obj[g]["tableID"];
                    tx++;
                }

            }
            if (tx > 0 && tables.length > 0) {
                //if there are tables in tables array
                for (var t3 = 0; t3 < tx; t3++) {
                    log("get_records_proc: render tableID:" + tables[t3]);
                    jQuery(document).ready(function () {
                        pkey.record_render_all(tables[t3]);
                    });
                }
            }
            else {
                log("get_records_proc: no tables in obj or array");
            }
        }

    }
}

function record_UI_sel(tableID) {
    //check all the checkboxes
    if (tableID) {
        var g = jQuery("#T_" + tableID);
        var checkboxes = jQuery(".tdx_record_checkbox").each(function () {
            var thisID = this.id;
            var thisID1 = thisID.substr(3);
            var this_li = jQuery("#" + thisID1);
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
    var t, s, i, c, o, passvalue = "", sele_out = "",class1 = "";
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
    if (window.Notification && Notification.permission !== "denied") {

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
    }
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