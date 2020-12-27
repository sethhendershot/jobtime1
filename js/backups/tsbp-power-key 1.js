tsbp_record_groups = {
    options: {},
    records: {
        0: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "17"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "a"
            },
            record_group_title: {
                alias: "Title",
                field: "record_group_title",
                value: "Active"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "0"
            }
        },
        1: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "22"
            },
            record_group: {
                alias: "Title",
                field: "record_group_title",
                value: "d"
            },
            record_group_title: {
                alias: "Record Group",
                field: "record_group",
                value: "Deleted"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "1"
            }
        },
        2: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "55"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "r"
            },
            record_group_title: {
                alias: "Title",
                field: "record_group_title",
                value: "Group 1"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "2"
            }
        }
    }
};
tsbp_clients = {
    options: {},
    records: {
        0: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "44"
            },
            task_title: {
                alias: "Task Title",
                field: "task_title",
                value: "RECORD_CC BUILD"
            },
            task_description: {
                alias: "Task Description",
                field: "task_description",
                value: "read pkey and settings"
            },
            address: {
                alias: "Address",
                field: "address",
                value: "553333 rr lane, Minot ND 58701"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "d"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "0"
            },
            table_name: {
                alias: "Table Name",
                field: "table_name",
                value: "job_tasks"
            }
        },
        1: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "88"
            },
            task_title: {
                alias: "Task Title",
                field: "task_title",
                value: "RECORD_CC_X BUILD"
            },
            task_description: {
                alias: "Task Description",
                field: "task_description",
                value: "Single record output, consider using elem_do(). Use mode per record, set mode during pkey._recordset.place"
            },
            address: {
                alias: "Address",
                field: "address",
                value: "999 rr lane, Minot ND 58701"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "a"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "1"
            },
            table_name: {
                alias: "Table Name",
                field: "table_name",
                value: "job_tasks"
            }
        },
        2: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "558899"
            },
            task_title: {
                alias: "Task Title",
                field: "task_title",
                value: "Test3"
            },
            task_description: {
                alias: "Task Description",
                field: "task_description",
                value: "bla434h blah blah 33333"
            },
            address: {
                alias: "Address",
                field: "address",
                value: "999 rr lane, Minot ND 58701"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "a"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "2"
            },
            table_name: {
                alias: "Table Name",
                field: "table_name",
                value: "job_tasks"
            }
        },
        3: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "4"
            },
            task_title: {
                alias: "Task Title",
                field: "task_title",
                value: "Test2"
            },
            task_description: {
                alias: "Task Description",
                field: "task_description",
                value: "33blah blah blah 4444"
            },
            address: {
                alias: "Address",
                field: "address",
                value: "555 rr lane, Minot ND 58701"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "a"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "3"
            },
            table_name: {
                alias: "Table Name",
                field: "table_name",
                value: "job_tasks"
            }
        },
        4: {
            ID: {
                alias: "ID",
                field: "ID",
                value: "5"
            },
            task_title: {
                alias: "Task Title",
                field: "task_title",
                value: "test 4444444"
            },
            task_description: {
                alias: "Task Description",
                field: "task_description",
                value: "there was a fox hound fox hound fox hound"
            },
            address: {
                alias: "Address",
                field: "address",
                value: "34 34 34 34, Minot ND 58701"
            },
            record_group: {
                alias: "Record Group",
                field: "record_group",
                value: "a"
            },
            indx: {
                alias: "Indx",
                field: "indx",
                value: "4"
            },
            table_name: {
                alias: "Table Name",
                field: "table_name",
                value: "job_tasks"
            }
        }
    }
};

var tdx_stacks = {}, x = 0;
/****** PKEY by Seth Hendershot 06/15/2017           ******/
/****** The pkey is a self-managing list-holding object  **/
/****** with methods for placing, pulling, restacking,   **/
/****** index pinging, and ID pinging                    **/
/**********************************************************/
/*** METHODS                  ***/
/****** pkey.place(obj)       ***/
/****** pkey.pull_ID(obj)     ***/
/****** pkey.pull_indx(obj)   ***/
/****** pkey.restack(obj)     ***/
/****** pkey.check_ID(obj)    ***/
/****** pkey.check_indx(obj)  ***/

/****** obj["ID"]       (required, the recordID (Primary Key))                                        ******/
/****** obj["type"]     (required, the title of the list AKA pkey[obj["type"]])                       ******/
/****** obj["table_name"]     (required, the table_name the record belongs to)                       ******/
/****** obj["indx"]     (required for pkey.check_indx(), pkey.pull_indx())                            ******/
/****** obj["old_indx"] (only used for pkey.place(), will delete the index given for obj["old_indx"]) ******/
/** SEE THE HOW-TO AT BOTTOM OF DOCUMENT***/

jQuery(document).ready(function () {
    var obj2 = {}, obj3 = {};
    //obj2 = tsbp_table_record_ds(tsbp_clients, clients);
    //tsbp_table_record_ds();


    obj3 = "";
    //console.log("tsbp_table_record_ds():" + JSON.stringify(obj2));

    //MIGHT BE ABLE TO INVOKE record_ds() with handle_tsbp_table() - YES
    //record_ds(obj2);

    //process_table("tsbp_clients", clients, "target_divID");

    /*pkey.settings_place({
     display_type: "list",
     main_header: false,
     groups: {0: "a"},
     screen_target: "target_divID",
     allow_drag_reorder: true,
     allow_select_reorder: true,
     allow_edit: true,
     allow_delete: true,
     allow_new: true,
     allow_edit_history: true,
     header_columns: {
     0: "task_title"
     },
     content_columns: {
     0: "task_description",
     1: "address"
     },
     column_hooks: {
     0: {
     column_name: "address",
     type: "google_map"
     }
     },
     record_buttons: {
     0: {
     wrapper_class: "action iconWR",
     icon_class: "fa fa-clock-o",
     icon_text: "Actions",
     hrf: "javascript:show_actions(\"ID_here\",\"1\");",
     modal_targetID: "myModal_actions"
     },
     1: {
     wrapper_class: "secondary_iconWR",
     icon_class: "fa fa-server",
     icon_text: "Job",
     hrf: "javascript:load_by_ID(\"jobs\");",
     modal_targetID: "myModal_jobs"
     },
     2: {
     wrapper_class: "secondary_iconWR",
     icon_class: "fa fa-address-card",
     icon_text: "Customer",
     hrf: "javascript:load_by_ID(\"customers\");",
     modal_targetID: "myModal_customers"
     }
     }
     });*/
    //pkey.settings_pull( { settings_name:"groups" } );
    //pkey.screen_render({screen_name: "Default"});
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
    _column_alias: {
        task_title: "Task Title",
        task_description: "Task Description",
        address: "Address"
    },
    _mgmt: {},
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
    
    screen_get_groups: function (obj) {
        if (obj) {
            //obj["screen_name"]
            //obj must contain screen_name or else its set to "Default"
            var ret = {}, retx = 0, compare = {}, screen_nm = "";
            //RETURN OBJECT OF group_names AS { 0:"group_name1", 1:"group_name2" }

            if (obj["screen_name"]) {
                screen_nm = obj["screen_name"];
            }
            else {
                screen_nm = "Default";
            }

            if (pkey._settings[screen_nm]["groups"] === undefined) {
                //NO GROUPS LOADED INTO SETTINGS, CREATE DEFAULT AS "rec_active"
                console.log("NO pkey._settings[screen_name]['groups'], creating on the fly...");
                pkey._settings[screen_nm]["groups"] = {
                    0: "rec_active"
                };
            }
            compare = pkey._settings[screen_nm]["groups"];
            for (var cx in compare) {
                ret[retx] = compare[cx];
                retx++;
            }
            return ret;
        }
        else {
            console.log("! pkey.settings_get_groups() NO obj SENT ");
        }
    },
    screen_get_columns: function (obj) {
        if (obj) {
            //GET BOTH HEADER AND CONTENT COLUMNS
            var screen_name = "";
            var ret = {}, rx = 0;
            if (obj["screen_name"] !== undefined) {
                screen_name = obj["screen_name"];
                if (pkey["_settings"] !== undefined) {
                    //get content columns and header columns from settings
                    if (pkey["_settings"][screen_name] !== undefined) {
                        //HEADER COLUMNS
                        if (pkey["_settings"][screen_name]["header_columns"]) {
                            var h = pkey["_settings"][screen_name]["header_columns"];
                            for (var h2 in h) {
                                ret[rx] = h[h2];
                                rx++;
                            }
                        }
                        //CONTENT COLUMNS
                        if (pkey["_settings"][screen_name]["content_columns"]) {
                            var h = pkey["_settings"][screen_name]["content_columns"];
                            for (var h2 in h) {
                                ret[rx] = h[h2];
                                rx++;
                            }
                        }
                        return ret;
                    }
                    else {
                        console.log("pkey.screen_get_columns no screen_name in DOM");
                    }
                }
            }
        }
    },
    group_get_tables: function (obj) {
        //obj["screen_name"]
        //obj["record_group"]
        //RETURN OBJECT OF table_names AS { 0:"table_name1", 1:"table_name2" }
        if (obj["record_group"]) {
            var rec_group = obj["record_group"];
            var ret = {}, retx = 0;
            if (pkey._mgmt !== undefined && pkey._mgmt["_tables"]) {
                var cx = 0;
                if (pkey._mgmt["_tables"].length > 0) {
                    cx = pkey._mgmt["_tables"].length;
                    for (var gy = 0; gy < cx; gy++) {
                        ret[retx] = pkey._mgmt["_tables"][gy];
                        retx++;
                    }
                }
                else {
                    console.log("pkey.group_get_tables() _tables.length is !> 0");
                }
            }
            return ret;
        }
        else {
            console.log("pkey.settings_get_tables() no record_group");
        }
    },
    table_get_records: function (obj) {
        if (obj) {
            //obj["record_group"]
            //obj["table_name"]
            //get the records from the table name and return the ID's
            var record_group = "", rpass = false, tpass = false, table_name = "", ret = {}, rx = 0;
            if (obj["record_group"] !== undefined) {
                record_group = obj["record_group"];
            }
            else {
                record_group = "rec_active";//DEFAULT record_group
            }

            if (obj["table_name"] !== undefined) {
                table_name = obj["table_name"];
                tpass = true;
            }

            if (tpass === true) {
                if (pkey._mgmt[record_group] !== undefined) { //if the record group exists in pkey
                    if (pkey._mgmt[record_group][table_name] !== undefined) { //if the table_name exists in pkey
                        var hc = 0;
                        if (pkey._mgmt[record_group][table_name]["list"] !== undefined && pkey._mgmt[record_group][table_name]["rc"] !== undefined) {
                            hc = Number(pkey._mgmt[record_group][table_name]["rc"]);
                        }
                        for (var dx = 0; dx < hc; dx++) {
                            ret[rx] = pkey._mgmt[record_group][table_name]["list"][dx];
                            rx++;
                        }
                        return ret;
                    }
                    else {
                        return {results: 0};
                    }
                }
            }
            else {
                console.log("@ pkey.table_get_records() rpass && tpass ! true");
            }
        }
    },
    column_get_value: function (obj) {
        //RETURN THE VALUE FOR THE column_name FOR THE -ID- IN THE table_name
        if (obj) {
            var c_name = obj["column_name"];
            var t_name = obj["table_name"];
            var ID = obj["ID"];
            var ret = "";

            //ret = t_name + ":" + c_name;
            if (pkey._recordset[t_name] !== undefined && pkey._recordset[t_name]["list"]) {
                if (pkey._recordset[t_name]["list"]["P" + ID] !== undefined && pkey._recordset[t_name]["list"]["P" + ID][c_name] !== undefined) {
                    ret = pkey._recordset[t_name]["list"]["P" + ID][c_name];
                }
            }

            return ret;
        }
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
                console.log(JSON.stringify(obj));
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
    settings_place: function (obj) {
        //obj = { name1:value1;}
        //obj["screen_name"] has default = "Default"
        console.log("@ pkey.settings_place() " + JSON.stringify(obj));
        var check1 = "", scrn_name = "";
        var _ac = 0;
        var _allowed = [];
        if (obj) {

            if (obj["screen_name"]) {
                scrn_name = obj["screen_name"];
            }
            else {
                scrn_name = "Default";
            }
            //ENSURE SCREEN_NAME OBJECT EXISTS
            if (pkey._settings[scrn_name] === undefined) {
                pkey._settings[scrn_name] = {};
            }
            if (pkey._settings_allowed !== undefined) {
                _allowed = pkey._settings_allowed;
            }
            _ac = _allowed.length;
            //alert(_ac);
            for (var _acx = 0; _acx < _ac; _acx++) {
                if (obj[_allowed[_acx]] !== "" && obj[_allowed[_acx]] !== undefined) {
                    pkey._settings[scrn_name][_allowed[_acx]] = obj[_allowed[_acx]];
                }
            }
        }
    },
    settings_pull: function (obj) {
        if (obj) {
            var screen_n = "";
            if (obj["screen_name"]) {
                screen_n = obj["screen_name"];
            }
            else {
                screen_n = "Default";
            }

            if (pkey._settings[screen_n].hasOwnProperty(obj["settings_name"])) {
                console.log("^^^^settings_name pull(" + obj["settings_name"] + ")");
                //clear it, delete it
                pkey._settings[screen_n][obj["settings_name"]] = "";
                delete(pkey._settings[screen_n][obj["settings_name"]]);
            }
        }
    },
    settings_get_setting: function (obj) {
        //RETURN SINGLE SETTING VALUE FOR screen_name AND settings_name
        //obj["screen_name"]
        //obj["settings_name"]
        if (obj) {
            var screen_name = "", settings_name = "", retobj = {};
            if (obj["screen_name"] !== undefined) {
                screen_name = obj["screen_name"];
            }
            if (obj["settings_name"] !== undefined) {
                settings_name = obj["settings_name"];
            }

            if (pkey._settings[screen_name] !== undefined && pkey._settings[screen_name][settings_name] !== undefined) {
                retobj = pkey._settings[screen_name][settings_name];
            }
            return retobj;
        }
        else {
            console.log("pkey.settings_get_setting() NO OBJ SENT");
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
                var list_push = {}, lpx = 0, clear = false, record_group_clear = false, table_clear = false, table_n = "", mode_pass = "v", dragID = "", type2 = "";
                var final_push = {}, fpx = 0, timestamp1 = "", indx = "";
                var fx = 0;

                for (var gg in obj["list"]) {
                    console.log("%%% PKEY _RECORDSET:" + obj["list"][fx]);

                    //GET SPECIFIC column_names
                    if (obj["list"][fx] === "ID") {
                        clear = true;
                    }
                    else if (obj["list"][fx] === "table_name") {
                        table_clear = true;
                        //alert(obj["list_data"]["table_name"]);
                    }
                    else if (obj["list"][fx] === "record_group") {
                        record_group_clear = true;
                        //alert(obj["list_data"]["record_group"]);
                    }
                    else if (obj["list"][fx] === "mode") {
                        mode_pass = obj["list_data"]["mode"];
                        //alert(obj["list_data"]["mode"]);
                    }
                    else if (obj["list"][fx] === "indx") {
                        indx = obj["list_data"]["indx"];
                        //alert(obj["list_data"]["indx"]);
                    }
                    else if (obj["list"][fx] === "action" || obj["list"][fx] === "result" || obj["list"][fx] === "screen_name") {
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
                console.log("** pkey._recordset.place() no 'list' SENT:" + JSON.stringify(obj));
            }

            //CHECK TO SEE IF A RECORD GROUP VALUE WAS SENT
            if (record_group_clear === true) {
                type2 = obj["list_data"]["record_group"];
            }
            else { //IF NO RECORD GROUP SENT, ASSIGN DEFAULT: rec_active
                type2 = "rec_active";
            }

            //CHECK TO SEE IF table_name WAS SENT
            if (table_clear === true) {
                table_n = obj["list_data"]["table_name"];
            }
            else { //IF no table_name, assign to: T_orphans
                table_n = "T_orphans";
            }

            if (clear === true) {
                // ID IS THERE, NOW GET THE ID
                dragID = "P" + obj["list_data"]["ID"];
                final_push[dragID] = {};
                if (pkey._recordset[table_n] === undefined) {
                    pkey._recordset[table_n] = {};
                }
                if (pkey._recordset[table_n]["list"] === undefined) {
                    pkey._recordset[table_n]["list"] = {};
                }
                //CREATE THE Px OBJECT HERE
                pkey._recordset[table_n]["list"][dragID] = {};

                //CREATE THE SETTINGS IN THE Px
                pkey._recordset[table_n]["list"][dragID]["_SETTINGS"] = {
                    "mode": mode_pass,
                    "view": "min"
                };
                //HANDLE TIMESTAMP
                if (timestamp1 !== "") {
                    pkey._recordset[table_n]["list"][dragID]["_TIMESTAMP"] = timestamp1;
                }
                else {
                    pkey._recordset[table_n]["list"][dragID]["_TIMESTAMP"] = pkey.get_timestamp();
                }

                //SORT THROUGH STACKED ARRAY TO LOAD IN DATA
                for (var lpw = 0; lpw < lpx; lpw++) {
                    if (obj["list_data"][list_push[lpw]]) {
                        //RECORD COLUMN_NAME VALUE PLACEMENT HAPPENS HERE
                        //COLUMN_NAME = VALUE
                        pkey._recordset[table_n]["list"][dragID][list_push[lpw]] = obj["list_data"][list_push[lpw]];
                        final_push[dragID][list_push[lpw]] = obj["list_data"][list_push[lpw]];
                    }
                }
                //NOW pkey.place(obj["list_data"])
                var sendG = {};
                sendG["ID"] = obj["list_data"]["ID"];
                sendG["type"] = type2;
                sendG["table_name"] = table_n;
                if (indx !== "") {
                    sendG["indx"] = indx;
                }
                pkey.place(sendG);
            }
            //alert("FINAL PUSH: "+JSON.stringify(final_push));
            //alert("FINAL pkey._recordset: "+JSON.stringify(pkey._recordset.list));
            //ADD TO PKEY MGMT
        }
    },
    record_display: function (obj) {
        //obj will contain:
        //obj["screen_name"]
        //obj["record_group"]
        //obj["screen_target"]
        var record_group = "";
        var screen_name1 = "", output = "";

        if (obj) {
            if (obj["screen_name"] === undefined) {
                screen_name1 = "Default";
            }
            else {
                screen_name1 = obj["screen_name"];
            }
            console.log("ABOUT TO RENDER GROUP:" + JSON.stringify(obj["record_group"]));

            if (obj["record_group"] === undefined) {
                record_group = "Default";
            }
            else {
                record_group = obj["record_group"];
            }

            //FIRST CLEAR THE 'UL_'+screen_name+'_'+record_group;
            if (jQuery("#" + screen_name1 + "_body")) {
                jQuery("#" + screen_name1 + "_body").html("");
            }

            //PLACE THE DIV FOR THE RECORD GROUP
            jQuery("#" + screen_name1 + "_body").append("<ul id='UL_" + screen_name1 + "_" + record_group + "' class='record_group ui-sortable RG_" + record_group + "'></ul>");

            //GET THE TABLES ASSOCIATED WITH THIS GROUP
            var groups1 = pkey.group_get_tables(obj);
            //alert(JSON.stringify(groups1));
            //get the tables from pkey, launch record_display_x() per record?

            if (groups1 !== undefined) {
                //THIS IS ACTUALLY TABLE... NOT GROUPS!!!
                for (var g1x in groups1) {

                    //GET THE RECORD-IDs FROM pkey._mgmt FOR THIS table_name
                    obj["table_name"] = groups1[g1x];
                    //for each table ->get the record IDs, send to pkey.record_display_x(obj);
                    var records = pkey.table_get_records(obj);
                    if (records !== undefined) {
                        for (var ffx in records) {
                            obj["P_ID"] = records[ffx];
                            pkey.record_display_x(obj);
                        }
                    }
                    console.log("pkey.record_display no records returned for " + obj["table_name"]);
                }
                //alert(obj["table_name"]+"; records:"+JSON.stringify(records));

                //IS DRAGGABLE?
                var can_drag = pkey.settings_get_setting({"screen_name": screen_name1, "settings_name": "allow_drag_reorder"});

                if (can_drag === true) {
                    //alert('can drag');
                    jQuery(document).ready(function () {
                        jQuery(function () {
                            jQuery("#UL_" + screen_name1 + "_" + record_group).sortable({
                                placeholder: "ui-state-highlight"
                            });
                        });
                    });
                }
            }
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
            if (obj["ID"]) {
                dragID = "P" + obj["ID"];
                if (pkey._recordset["list"].hasOwnProperty(dragID)) {
                    alert('pkey._recordset ID hasownproperty = true');
                }
            }
            else {
                console.log("pkey._recordset.update() no ID sent");
            }
        }
    },
    record_edit: function (screen_name, table_name, ID, record_group) {
        //alert('edit');
        pkey.record_set_setting({"settings_name": "mode", "settings_value": "e", "ID": ID, "table_name": table_name});
        pkey.record_open(screen_name, table_name, ID, record_group);
    },
    record_view: function (screen_name, table_name, ID, record_group) {
        pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "ID": ID, "table_name": table_name});
        pkey.record_open(screen_name, table_name, ID, record_group);
    },
    record_undo: function (screen_name, table_name, ID, record_group) {
        if (screen_name && table_name && ID && record_group) {
            pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "ID": ID, "table_name": table_name});
            //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
            //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
        }
    },
    record_delete: function (screen_name, table_name, ID, record_group) {
        if (screen_name && table_name && ID && record_group) {
            if (confirm("Are you sure you want to delete?") === true) {
                alert('SEND THAT SHIT! -- Delete ID:' + ID);
                pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
            }
            //UNIV_POST THE DELETE
            //IF DELETE IS SUCCESSFUL THEN pkey.record_pull();

        }
    },
    record_save: function (screen_name, table_name, ID, record_group) {
        if (screen_name && table_name && ID && record_group) {
            //compare values from textboxes to dom
            //univ_post any changes
            var is_mod = pkey.record_is_mod({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "ID": ID});
            //alert(JSON.stringify(is_mod));
            if (is_mod !== undefined && (typeof is_mod === "object")) {
                //alert('SEND IT! ' + JSON.stringify(is_mod));
                univ_post("update_record", is_mod);
            }
            else {
                notify("NOTICE!", "No changes were made to the record you are trying to save...", "blueX");

            }
        }
    },
    record_open: function (screen_name, table_name, ID, record_group) {
        if (screen_name && table_name && ID && record_group) {
            //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
            //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});

            //CHANGE THE MOD WINDOW TO CONTAIN THIS RECORD FOR EDIT
            var curr_setting = pkey.record_get_setting({"settings_name": "mode", "ID": ID, "table_name": table_name});
            var mod_window_div = jQuery("#tdx_mod_window_div");
            var send_obj = {}, sox = 0, header_columns = {}, content_columns = {}, this_col_value = "";
            var onchange_insert = "", item_ID = "";
            //alert('current mode:'+curr_setting);

            header_columns = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "header_columns"});
            content_columns = pkey.settings_get_setting({"screen_name": screen_name, "settings_name": "content_columns"});

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
                        this_col_value = pkey.column_get_value({"table_name": table_name, "column_name": header_columns[x], "ID": ID});
                        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"screen_name\": \"" + screen_name + "\", \"table_name\": \"" + table_name + "\", \"ID\":\"" + ID + "\" , \"record_group\":\"" + record_group + "\" });'";
                        item_ID = String("RCE_" + record_group + "_" + table_name + "_" + header_columns[x] + "_" + ID);

                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + pkey._column_alias[header_columns[x]] + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
                                class_name: "tdx_column_wrapper"
                            }

                        };
                        sox++;
                    }
                    for (var x in content_columns) {
                        this_col_value = pkey.column_get_value({"table_name": table_name, "column_name": content_columns[x], "ID": ID});
                        onchange_insert = "onkeyup='javascript:pkey.record_is_mod({\"screen_name\": \"" + screen_name + "\", \"table_name\": \"" + table_name + "\", \"ID\":\"" + ID + "\" , \"record_group\":\"" + record_group + "\" });'";
                        item_ID = String("RCE_" + record_group + "_" + table_name + "_" + content_columns[x] + "_" + ID);

                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + pkey._column_alias[content_columns[x]] + ":</span><span class='tdx_window_val'><input id='" + item_ID + "' type='text' value='" + this_col_value + "' " + onchange_insert + " /></span>",
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
                manage_edit_button({"mode": "e", "screen_name": screen_name, "table_name": table_name, "ID": ID, "record_group": record_group});
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
                        this_col_value = pkey.column_get_value({"table_name": table_name, "column_name": header_columns[x], "ID": ID});

                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + pkey._column_alias[header_columns[x]] + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
                                class_name: "tdx_column_wrapper"
                            }

                        };
                        sox++;
                    }
                    for (var x in content_columns) {
                        this_col_value = pkey.column_get_value({"table_name": table_name, "column_name": content_columns[x], "ID": ID});

                        send_obj[sox] = {
                            type: "span",
                            content: {
                                parentID: "tdx_mod_window_div",
                                placement_type: "append_innerHTML",
                                inner_text: "<span class='tdx_window_key'>" + pkey._column_alias[content_columns[x]] + ":</span><span class='tdx_window_val'>" + this_col_value + "</span>",
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
                manage_edit_button({"mode": "v", "screen_name": screen_name, "table_name": table_name, "ID": ID, "record_group": record_group});
            }
        }
    },
    record_update: function (obj) {
        //locate ID
        //locate and update object in pkey._recordset.list
        if (obj) {
            var dragID = "";
            if (obj["ID"]) {
                dragID = "P" + obj["ID"];
                if (pkey._recordset["list"].hasOwnProperty(dragID)) {
                    alert('pkey._recordset ID hasownproperty = true');
                }
            }
            else {
                console.log("pkey._recordset.update() no ID sent");
            }
        }
        // if object, update from input name:value pairs
        ////NOTE: only change the provided name:value, leave others as is

    },
    record_get_setting: function (obj) {
        if (obj) {
            //obj["ID"]
            //obj["table_name"]
            //obj["settings_name"]
            var ret = "", settings_name = "", t_name = "", ID = "";

            if (obj["settings_name"]) {
                settings_name = obj["settings_name"];
            }
            if (obj["table_name"]) {
                t_name = obj["table_name"];
            }
            if (obj["ID"]) {
                ID = "P" + obj["ID"];
            }

            //ret = "ID is this:"+ID;

            if (pkey._recordset[t_name]["list"][ID] !== undefined) {
                if (
                        pkey._recordset[t_name]["list"][ID]["_SETTINGS"] !== undefined &&
                        pkey._recordset[t_name]["list"][ID]["_SETTINGS"][settings_name] !== undefined
                        ) {

                    ret = pkey._recordset[t_name]["list"][ID]["_SETTINGS"][settings_name];
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
            var ret = "", settings_name = "", settings_value = "", t_name = "", ID = "";

            if (obj["settings_name"]) {
                settings_name = obj["settings_name"];
            }
            if (obj["settings_value"]) {
                settings_value = obj["settings_value"];
            }
            if (obj["table_name"]) {
                t_name = obj["table_name"];
            }
            if (obj["ID"]) {
                ID = "P" + obj["ID"];
            }

            //ret = "ID is this:"+ID;

            if (pkey._recordset[t_name]["list"][ID] !== undefined) {
                if (
                        pkey._recordset[t_name]["list"][ID]["_SETTINGS"] !== undefined &&
                        pkey._recordset[t_name]["list"][ID]["_SETTINGS"][settings_name] !== undefined
                        ) {

                    pkey._recordset[t_name]["list"][ID]["_SETTINGS"][settings_name] = settings_value;

                }
            }

            return ret;
        }
    },
    record_is_mod: function (obj) {
        //IS THE RECORD WITH THE GIVEN ID MODIFIED?
        //RETURNS OBJECT OF {"column_name1":"new value if changed"}
        if (obj) {
            var timestamp_now = pkey.get_timestamp();

            var screen_name = obj["screen_name"];
            var table_name = obj["table_name"];
            var record_group = obj["record_group"];
            var ID = obj["ID"];
            //IS THIS RECORD ID MODIFIED?
            var c = pkey.screen_get_columns({"screen_name": screen_name});

            var item_name = "", item = {}, item_val = "", flag = false, new_obj = {}, nx = 0;
            //alert(JSON.stringify(r));
            if (c !== undefined) {
                if (pkey._recordset[table_name] !== undefined) {
                    //IF THE TABLE EXISTS IN THE _recordset IN DOM
                    if (pkey._recordset[table_name]["list"] !== undefined && pkey._recordset[table_name]["list"]["P" + ID] !== undefined) {
                        //YES THE ID EXISTS, CHECK THE COLUMNS FOR CHANGES
                        for (var c2 in c) {
                            item_name = String("#RCE_" + record_group + "_" + table_name + "_" + c[c2] + "_" + ID);
                            item = jQuery(item_name);
                            if (pkey["_recordset"][table_name]["list"]["P" + ID][c[c2]] && item) {
                                //compare value with html element
                                item_val = item.val();
                                console.log("==!* IF PKEY.ISMOD: " + pkey["_recordset"][table_name]["list"]["P" + ID][c[c2]] + " !== " + item_val);
                                if (pkey["_recordset"][table_name]["list"]["P" + ID][c[c2]] !== item_val && item_val !== undefined) {
                                    //YES THERE ARE CHANGES TO THIS ITEM
                                    flag = true;
                                    new_obj[c[c2]] = item_val;
                                    //alert(item_val);
                                    console.log("==!** PKEY.ISMOD: " + pkey["_recordset"][table_name]["list"]["P" + ID][c[c2]] + "!=" + item_val);
                                    item.css("border", "thin solid red");
                                }
                                else {
                                    item.css("border", "");
                                }
                            }
                            else {
                                console.log("record_save no item or column thing");
                            }
                        }
                    }
                }

                /*
                 for (var r2 in r) {
                 //DONT FORGET TO ADD THE P+ID
                 if (pkey["_recordset"][table_name]["list"]["P" + r[r2]]) {
                 curr_mode_setting = pkey.record_get_setting({"settings_name": "mode", "ID": r[r2], "table_name": table_name});
                 if (curr_mode_setting === "e") {
                 //IF CURRENT RECORD IS IN EDIT MODE
                 for (var c2 in c) {
                 item_name = String("#RCE_" + record_group + "_" + table_name + "_" + c[c2] + "_" + ID);
                 item = jQuery(item_name);
                 if (pkey["_recordset"][table_name]["list"]["P" + r[r2]][c[c2]] && item) {
                 //compare value with html element
                 item_val = item.val();
                 console.log("!* IF PKEY.ISMOD: " + pkey["_recordset"][table_name]["list"]["P" + r[r2]][c[c2]] + " !== " + item_val);
                 if (pkey["_recordset"][table_name]["list"]["P" + r[r2]][c[c2]] !== item_val && item_val !== undefined) {
                 //YES THERE ARE CHANGES TO THIS ITEM
                 flag = true;
                 new_obj[c[c2]] = item_val;
                 //alert(item_val);
                 console.log("!** PKEY.ISMOD: " + pkey["_recordset"][table_name]["list"]["P" + r[r2]][c[c2]] + "!=" + item_val);
                 item.css("border", "thin solid red");
                 }
                 else {
                 item.css("border", "");
                 }
                 }
                 else {
                 console.log("record_save no item or column thing");
                 }
                 }
                 }
                 }
                 }*/
                if (flag === true) {
                    //YES THERE ARE MODIFICATIONS
                    //SEND THAT SHIT!
                    timestamp_now = pkey.get_timestamp();
                    new_obj["_TIMESTAMP"] = timestamp_now;
                    new_obj["ID"] = ID;
                    new_obj["screen_name"] = screen_name;
                    new_obj["table_name"] = table_name;
                    new_obj["record_group"] = record_group;

                    return new_obj;
                    //alert('SEND THAT SHIT!\n' + JSON.stringify(new_obj));
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
    place: function (obj) {
        if (obj) {
            //obj["type"] == record group title
            //obj["table_name"] == table_name
            //obj["ID"]
            //obj["indx"] (if no indx then append to list)
            //obj["old_indx"]
            var tdx_type = "", table_name = "T_orphans", side_obj = {}, side_x = 0, old_indx_was_del = false, mx = 0;
            //ensure the count is correct by restacking first!
            pkey.restack(obj);
            tdx_type = obj["type"];
            table_name = obj["table_name"];

            //FIRST CHECK THE LIST OF TABLES, DOES THIS TABLE EXIST THERE? IF YES DO NOTHING, IF NO: ADD IT
            if (pkey._mgmt["_tables"] === undefined) {
                pkey._mgmt["_tables"] = [];
            }
            if (pkey._mgmt["_tables"].length > 0) {
                mx = pkey._mgmt["_tables"].length;
                for (var hgx = 0; hgx < mx; hgx++) {
                    if (pkey._mgmt["_tables"][hgx] !== table_name) {
                        pkey._mgmt["_tables"].push(table_name);
                    }
                }
            }
            else {
                pkey._mgmt["_tables"].push(table_name);
            }

            var rc2 = 0;
            if (pkey["_mgmt"][tdx_type][table_name]["rc"] && pkey["_mgmt"][tdx_type][table_name]["rc"] > 0) {
                rc2 = pkey["_mgmt"][tdx_type][table_name]["rc"];
            }

            //create new item
            //pkey["_mgmt"][tdx_type][table_name]["list"][rc2] = {};

            //is there an indx?
            if (obj["indx"] && obj["indx"] !== "" && obj["indx"] !== 0) {
                console.log("!!pkey.place() indx not blank or 0");
                //yes there is an indx, 
                //is that indx position already occupied?
                var does_it_exist = pkey.check_indx(obj);
                if (does_it_exist === true) {
                    //if yes
                    console.log("!!pkey.place() YES indx does exist");
                    //delete the old_indx 
                    if (obj["old_indx"] && obj["old_indx"] !== "") {
                        //yes there is an old_index, 
                        //pull it or delete it manually here
                        //old_indx could be wrong! check for ID match, 
                        //no delete if ID mismatch
                        if (pkey["_mgmt"][tdx_type][table_name]["list"][obj["old_indx"]] &&
                                pkey["_mgmt"][tdx_type][table_name]["list"][obj["old_indx"]] === obj["ID"]) {
                            delete pkey["_mgmt"][tdx_type][table_name]["list"][obj["old_indx"]];
                            old_indx_was_del = true;
                        }
                    }
                    //move every indx+1
                    var start_num = Number(obj["indx"]);
                    var start_plus_one = Number(obj["indx"]) + 1;
                    var end_num = pkey["_mgmt"][tdx_type][table_name]["rc"];
                    for (var fdx = start_num; fdx < end_num; fdx++) {
                        if (pkey["_mgmt"][tdx_type][table_name]["list"][fdx]) {
                            side_obj[side_x] = pkey["_mgmt"][tdx_type][table_name]["list"][fdx];
                            side_x++;
                            //pkey["_mgmt"][tdx_type][table_name]["list"][fdx] = "";
                        }
                    }
                    console.log("!!pkey.place(obj)>>YES indx>> side_obj:" + JSON.stringify(side_obj) + " num:" + start_plus_one);
                    console.log("YOUR PKEY: " + JSON.stringify(pkey));
                    //append data from input into indx and append the side_obj to list
                    //append new indx to indx
                    pkey["_mgmt"][tdx_type][table_name]["list"][obj["indx"]] = obj["ID"];//TYPECAST?
                    //append rest to list
                    for (var fdx2 = 0; fdx2 < side_x; fdx2++) {
                        pkey["_mgmt"][tdx_type][table_name]["list"][start_plus_one] = side_obj[fdx2];//TYPECAST?
                        start_plus_one++;
                        console.log(side_obj[fdx2]);
                    }
                    pkey["_mgmt"][tdx_type][table_name]["rc"]++;

                    //WAS THERE AN old_indx DELETION? 
                    //IF YES THEN RESTACK TO ELIMINATE EMPTY SPACE
                    if (old_indx_was_del === true) {
                        pkey.restack(obj);
                    }
                }
                else if (does_it_exist === false) {
                    //if no, continue with placement at indx; 
                    console.log("!!pkey.place() NO indx does not exist");
                    //append to end of list
                    pkey["_mgmt"][tdx_type][table_name]["list"][pkey["_mgmt"][tdx_type][table_name]["rc"]] = obj["ID"];//TYPECAST?
                    pkey["_mgmt"][tdx_type][table_name]["rc"]++;
                    //DONE;
                }
                else {
                    console.log("*does_it_exist returning neither true or false");
                }
            }
            else {
                //no there is no indx, 
                //APPEND TO LIST
                if (obj["ID"]) {
                    pkey["_mgmt"][tdx_type][table_name]["list"][pkey["_mgmt"][tdx_type][table_name]["rc"]] = obj["ID"];//TYPECAST?
                    pkey["_mgmt"][tdx_type][table_name]["rc"]++;
                }
                else {
                    console.log("pkey, no indx, no ID");
                }
                //DONE;
            }
        }
    },
    pull_ID: function (obj) {
        //delete the ID from the list and restack if deleted
        var pulled = false;
        if (obj) {
            //if the obj["ID"] of obj["type"] exists, delete it, then pulled = true
            if (obj["ID"] && obj["type"]) {
                var tdx_type = obj["type"];
                var table_name = obj["table_name"];
                if (tdx_type && pkey["_mgmt"][tdx_type][table_name]) {
                    var compare_x = pkey["_mgmt"][tdx_type][table_name]["rc"];
                    for (var gfx = 0; gfx < compare_x; gfx++) {
                        if (pkey["_mgmt"][tdx_type][table_name]["list"][gfx] === obj["ID"]) {
                            //yes the ID exists, delete it
                            delete pkey["_mgmt"][tdx_type][table_name]["list"][gfx];
                            pulled = true;
                        }
                    }
                }
                else {
                    console.log("pkey.pull_ID() no tdx_type");
                }
            }
        }

        if (pulled === true) {
            pkey.restack(obj);
        }
    },
    pull_indx: function (obj) {
        //delete the indx
        //MUST BE obj["indx"]!! NOT old_indx
        var pulled = false;
        if (obj) {
            //if the obj["ID"] of obj["type"] exists, delete it, then pulled = true
            var tdx_type = obj["type"];
            var tdx_indx = obj["indx"];
            var table_name = obj["table_name"];
            if (tdx_type && pkey["_mgmt"][tdx_type][table_name]) {
                if (pkey["_mgmt"][tdx_type][table_name]["list"][tdx_indx]) {
                    delete pkey["_mgmt"][tdx_type][table_name]["list"][tdx_indx];
                    pulled = true;
                }
            }
            else {
                console.log("pkey.pull_ID() no tdx_type");
            }
        }

        if (pulled === true) {
            pkey.restack(obj);
        }
    },
    restack: function (obj) {
        var new_obj = {}, new_x = 0;
        if (obj) {
            //sort through pkey and get current ID's, store in new_obj
            var tdx_type = obj["type"];
            var table_name = obj["table_name"];
            if (tdx_type) {

                if (!pkey["_mgmt"][tdx_type]) {
                    pkey["_mgmt"][tdx_type] = {};
                }

                if (!pkey["_mgmt"][tdx_type][table_name]) {
                    console.log("pkey.restack() *** NO tdx_type ** CREATING ON THE FLY:" + tdx_type);
                    pkey["_mgmt"][tdx_type][table_name] = {
                        rc: 0,
                        list: {}
                    };
                }

                if (pkey["_mgmt"][tdx_type][table_name]["rc"] > 0) {
                    var compare_x = pkey["_mgmt"][tdx_type][table_name]["rc"];
                    for (var tx = 0; tx < compare_x; tx++) {
                        if (pkey["_mgmt"][tdx_type][table_name]["list"][tx]) {
                            new_obj[new_x] = pkey["_mgmt"][tdx_type][table_name]["list"][tx];
                            new_x++;
                        }
                    }
                    console.log("pkey.restack():new_obj = " + JSON.stringify(new_obj));
                    //delete whole list
                    pkey["_mgmt"][tdx_type][table_name]["list"] = {};
                    //restack list from new_obj
                    if (new_x > 0) {
                        for (var gcx = 0; gcx < new_x; gcx++) {
                            pkey["_mgmt"][tdx_type][table_name]["list"][gcx] = new_obj[gcx];
                        }
                        pkey["_mgmt"][tdx_type][table_name]["rc"] = Number(new_x);
                        console.log("pkey.restack() FRESH PKEY:" + JSON.stringify(pkey));
                    } else {
                        console.log("pkey.restack() new_x = 0");
                    }
                }
                else {
                    //no need to restack
                    console.log("pkey.restack() no need to restack pkey:" + JSON.stringify(pkey));
                }
            }
            else {
                console.log("pkey.restack() NO TYPE, cannot restack");
            }
        }
    },
    check_indx: function (obj) {
        //does this indx already exist? true or false
        //obj["type"]
        //obj["indx"]
        //checks for index in type
        //returns true or false
        if (obj) {

            if (obj["indx"] && obj["type"]) {

                var tdx_type = obj["type"];
                var table_name = obj["table_name"];
                var tdx6 = 0;
                var match3 = false;
                for (var g in pkey["_mgmt"][tdx_type][table_name]["list"]) {
                    if (tdx6 === Number(obj["indx"])) {
                        match3 = true;
                    }
                    tdx6++;
                }
                if (match3 === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                console.log("pkey.check_indx no indx or type");
            }
        }
    },
    place_offline: function (obj) {
        //alert('begin placement offline:'+JSON.stringify(obj));
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage
            var string_of_obj = String("" + JSON.stringify(obj));
            //var timestamp_now = "data_"+pkey.get_timestamp();
            var timestamp_now = "data1";
            //localStorage.setItem(timestamp_now, string_of_obj);
        } else {
            // Sorry! No Web Storage support..
            alert('No localStorage is available');
        }
    },
    launch_email: function (obj) {
        pkey.univ_post("launch_email", {});
    },
    manage_edit_button: function (obj) {
        var mode = obj["mode"];
        var screen_name = "", table_name = "", ID = "", record_group = "";

        if (obj["screen_name"] !== undefined) {
            screen_name = obj["screen_name"];
        }
        if (obj["table_name"] !== undefined) {
            table_name = obj["table_name"];
        }
        if (obj["ID"] !== undefined) {
            ID = obj["ID"];
        }
        if (obj["record_group"] !== undefined) {
            record_group = obj["record_group"];
        }

        if (mode !== undefined) {
            var edit_button_position = jQuery("#tdx_popup_actions_wr");
            var all_button_position = jQuery("#tdx_popup_buttons_wr");
            var tdx_close_modal_btn = jQuery("#tdx_close_modal_btn");
            var tdx_modal_backdrop = jQuery(".modal-backdrop");
            var tdx_modal_info_close = jQuery("#tdx_modal_info_close");

            var save_and_close = "<button type='button' class='btn btn-default' id='tdx_save_and_close_btn' onclick='javascript:record_save(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\",\"close\")'>Save & Close</button>";
            var save_and_new = "<button type='button' class='btn btn-default' id='tdx_save_and_new_btn' onclick='javascript:record_save(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\",\"new\")'>Save & Add New</button>";

            if (mode === "e" && edit_button_position) {
                edit_button_position.html("");
                all_button_position.html("");
                all_button_position.append(save_and_close, save_and_new);
            }
            if (mode === "v" && edit_button_position) {
                edit_button_position.html("<a href='#' onclick='javascript:record_edit(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>");
                all_button_position.html("");

            }
            tdx_close_modal_btn.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
            tdx_modal_backdrop.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
            tdx_modal_info_close.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
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
            "get_tasks"
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
    }
};

function get_screen(obj){
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
function get_screen_proc(obj){
    if(obj){
        //sort through obj with for loop
    }
}
function get_table(obj) {
    //GET THE TABLE FROM THE DATABASE AND PLACE IT INTO THE DOM
    if (obj) {
        //GET THE TABLEID FROM INPUT
        //UNIV POST FOR THE TABLE
        //SEND THE RETURNED VALUE TO pkey.record_ds() or pkey.record_place()
        var tableID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            log("GET_TABLE pre pkey.univ_post()");
            pkey.univ_post("get_table", {"tableID": tableID}, get_table_proc);
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
            if (obj[g]["tableID"] !== undefined && obj[g]["tableID"] !== "") {
                //MIGHT WANT TO STORE THE TABLE INFORMATION IN PKEY EVENTUALLY
                //PLACE COLUMNS INTO DOM

            }
        }
    }
}
function get_records(obj) {
    log("SWEEEEEET! now get records: " + JSON.stringify(obj));
    if (obj) {
        var tableID = "";
        if (obj["tableID"] !== undefined && obj["tableID"] !== "") {
            tableID = obj["tableID"];
            log("GET_RECORDS pre pkey.univ_post()");
            pkey.univ_post("get_records_by_table", {"tableID": tableID}, get_records_proc);
        }
    }
}
function get_records_proc(obj){
    log("@ get_records_proc:"+JSON.stringify(obj));
    if(obj){
        for (var g in obj) {
            log("............NOW RENDER:"+JSON.stringify(obj[g]));
            pkey.record_ds(obj[g]);
        }
    }
}


/*******************************************************/
//pkey.place({"ID": "13", "type": "rec_a"});
//pkey.place({"ID": "12", "type": "rec_a"});
//pkey.place({"ID": "17", "type": "rec_a"});
//pkey.pull_indx({"indx": "3", "type": "rec"});
//pkey.place({"ID": "45", "type": "rec", "indx": "4", "old_indx": "3"});
//pkey.restack({"type": "rec"});

/*******************************************************/


//get data from the DOM and build arrays
//var clients = ["ID", "task_title", "task_description", "address", "status"];
var clients = {0: "ID", 1: "task_title", 2: "task_description", 3: "address", 4: "status", 5: "record_group", 6: "indx", 7: "table_name"};

var task = {0: "ID", 1: "task_title", 2: "task_description", 3: "address", 4: "task_status", 5: "record_group", 6: "indx", 7: "table_name"};
var task_settings = {
    record_group: "a",
    display_type: "google_table || list || google_graph_title || google_chart_title",
    mass_actions: true,
    main_header: false,
    main_header_class: "css-class-name can-do-multiple",
    main_header_style: "font-weight:bold;",
    allow_select_reorder: true,
    allow_drag_reorder: true,
    allow_edit: true,
    allow_delete: true,
    allow_new: true,
    show_edit_history: false,
    groups: {
        0: "rec_active",
        1: "rec_group1",
        2: "rec_deleted"
    },
    header_columns: {
        0: "task_title"
    },
    content_columns: {
        0: "address",
        1: "task_description"
    },
    record_buttons: {
        0: {
            wrapper_class: "action iconWR",
            icon_class: "fa-clock-0",
            icon_text: "Actions",
            hrf: "javascript:show_actions('start','1');",
            modal_targetID: "#myModal"
        },
        1: {
            wrapper_class: "task_jobinfo secondary_iconWR",
            icon_class: "fa-server",
            icon_text: "Job",
            hrf: "javascript:job_timer('stop','1');",
            modal_targetID: "#myModal"
        },
        2: {
            wrapper_class: "task_jobinfo secondary_iconWR",
            icon_class: "fa-address-card",
            icon_text: "Customer",
            hrf: "javascript:job_timer('stop','1');",
            modal_targetID: "#myModal1"
        }
    },
    column_hooks: {
        0: {
            column_name: "address",
            type: "g_map",
            event: "onclick"
        }
    }
};

function tsbp_table_record_ds(table, columns, special) {
    //PROCESSES AND SENDS each table->columns FROM tsbp_tables IN DOM TO respective pkey.*_ds() function
    tdx_ret9 = {}, pass_obj = {};
    var xcc = 0, xc2 = 0;
    if (table && columns) {
        if (table["records"]) {
            for (var xt in table["records"]) {
                xc2 = 0;
                pass_obj[xcc] = {};
                for (var xb in columns) {
                    if (columns[xc2] && table["records"][xcc][columns[xc2]]) {
                        pass_obj[xcc][columns[xc2]] = table["records"][xcc][columns[xc2]]["value"];
                        //pkey._recordset.place(pass_obj[columns[xc2]]);
                    }
                    xc2++;
                }
                tdx_ret9[xcc] = table["records"][xcc];
                //alert("PASS "+JSON.stringify(pass_obj));
                //record_ds(pass_obj[xcc]);
                if (special === "_settings") {
                    pkey.settings_ds(pass_obj[xcc]);
                }
                else {
                    pkey.record_ds(pass_obj[xcc]);
                }

                xcc++;
                //tdx_ret9 = xcc;

            }
            /*for(var x2 = 0; x2 < xcc; x2++){
             pass_obj[x2] = tdx_ret9[x2]["field"];
             }*/
        }
        return pass_obj;
    }
}
/*
 function process_table(tdx_table4, tdx_object, targetID) {
 // tdx_table4 = table name in DOM (as String)
 //tdx_object  = column_names to check for and pass through (as Array)
 //targetID = ID target element for placement
 var output4 = "";
 if (tdx_object) {
 output4 += "<ul class='job_tasks' id='sortable'>";
 if (typeof tdx_table4 !== 'undefined') {
 var t_name = tdx_table4;
 var t_object = [], txxx = 0, table5_length = "0", gxgx = 0, xc4 = 0;
 for (var tdx_xx in tdx_object) {
 t_object[txxx] = tdx_object[txxx];
 txxx++;
 }
 console.log("BEGIN WITH: " + JSON.stringify(t_object));
 console.log("#######################");
 
 if (window[t_name]) {
 
 var table5 = window[t_name]["records"];
 //console.log(JSON.stringify(table5));
 
 if (table5) {
 //first count the number of records for the select menu total
 for (var ggg in table5) {
 gxgx++;
 }
 
 for (var gg in table5) {
 //FOR EACH RECORD
 x = 0, x1 = 0;
 console.log("   @ record:" + gg);
 
 output4 += "<li id='job_task_" + gg + "' class='job_task'>";
 output4 += "<div class='job_task_header' id='job_task_header_" + gg + "'>";
 xc4 = Number(gg) + 1;
 
 output4 += select_menu_output(gxgx, xc4, "select" + gg, "class1", "javascript:sel_change(\"" + gg + "\");");
 output4 += "<i class='fa fa-arrows' aria-hidden='true'><span class='icontext'>Move</span></i>";
 
 //get specific column_names
 for (var sub1 in t_object) {
 if (table5[gg][t_object[x1]] && table5[gg][t_object[x1]]["field"] === "task_title") {
 output4 += "<span class='task_title'><strong>Task:</strong>" + table5[gg][t_object[x1]]["value"] + "</span>";
 }
 x1++;
 }
 //<span class='task_expand_button' id='task_job_minmax1'><a href='javascript:job_task_toggle("max","job_task_content_1","task_job_minmax1");'><i class='fa fa-plus-square-o fa-2x' aria-hidden='true'> <span class='icontext'></span></i></a></span>
 output4 += "<span class='task_expand_button' id='task_job_minmax" + gg + "'><a href='javascript:job_task_toggle(\"max\",\"job_task_content_" + gg + "\",\"task_job_minmax" + gg + "\");'><i class='fa fa-plus-square-o fa-2x' aria-hidden='true'> <span class='icontext'></span></i></a></span>";
 output4 += "<span class='task_header_buttons'>";
 
 output4 += "<span class='start iconWR'><a href='javascript:job_timer(\"start\",\"" + gg + "\");'><i class='fa fa-play' aria-hidden='true'> <span class='icontext'>Start</span></i></a></span>";
 output4 += "<span class='stop iconWR'><a href='javascript:job_timer(\"stop\",\"" + gg + "\");'><i class='fa fa-stop' aria-hidden='true'> <span class='icontext'>Stop</span></i></a></span>";
 output4 += "<span class='reschedule iconWR'><a href='javascript:job_task_reschedule(\"" + gg + "\");'><i class='fa fa-calendar-times-o' aria-hidden='true'> <span class='icontext'>Reschedule</span></i></a></span>";
 output4 += "<span class='task_jobinfo secondary_iconWR'><a href='#'><i class='fa fa-server' aria-hidden='true'> <span class='icontext'>Job</span></i></a></span>";
 output4 += "<span class='task_jobcustomerinfo secondary_iconWR'><a href='#'><i class='fa fa-address-card' aria-hidden='true'> <span class='icontext'>Customer</span></i></a></span>";
 
 output4 += "</span>";
 output4 += "";
 
 
 output4 += "</div>";//CLOSE HEADER DIV
 
 output4 += "<span class='job_task_content minimized' id='job_task_content_" + gg + "'>";
 
 //NOW GET THE CONTENT BOX column_names
 var sendr = {}, sr_x = 0;
 sendr["list"] = {};
 sendr["list_data"] = {};
 for (var sub in t_object) {
 if (t_object[sub][table5[gg]]) {
 console.log("TTTTTTT:" + t_object[x][table5[gg]]["field"]);
 }
 if (table5[gg][t_object[x]]) {
 ///////////////////////////////////////////////////////////////////////////////////
 if (table5[gg][t_object[x]]["field"]) {
 sendr["list"][sr_x] = table5[gg][t_object[x]]["field"];
 sendr["list_data"][table5[gg][t_object[x]]["field"]] = table5[gg][t_object[x]]["value"];
 //console.log(table5[gg][t_object[x]]["field"]+":"+table5[gg][t_object[x]]["value"]);
 sr_x++;
 }
 ///////////////////////////////////////////////////////////////////////////////////
 if (table5[gg][t_object[x]]["field"] && table5[gg][t_object[x]]["value"]) {
 //cannot be ID or task_title
 if (table5[gg][t_object[x]]["field"] !== "ID" && table5[gg][t_object[x]]["field"] !== "task_title") {
 output4 += "<span class='list_item task_" + table5[gg][t_object[x]]["field"] + "'><strong>" + table5[gg][t_object[x]]["alias"] + "::</strong>" + table5[gg][t_object[x]]["value"] + "";
 
 //extra checks//additions
 output4 += "</span>";
 }
 if (table5[gg][t_object[x]]["field"] === "ID") {
 //pkey.place({type: "rec_a", ID: table5[gg][t_object[x]]["value"]});
 }
 
 //console.log(table5[gg][t_object[x]]["alias"] + ":" + table5[gg][t_object[x]]["value"]);
 x++;
 
 }
 else {
 console.log("**** NO window[t_name][records][x][field] OR window[t_name][records][x][value]");
 }
 }
 else {
 console.log("**** NO window[t_name][records][x]:");
 }
 }
 //console.log("SENDR:" + JSON.stringify(sendr));
 output4 += "<span style='clear:both;display:block;'>&nbsp;</span>";
 output4 += "</span>";
 console.log("---------------");
 output4 += "</li>";
 //END FOR EACH RECORD
 }
 }
 else {
 console.log("**** NO window[t_name][records]");
 }
 
 }
 else {
 console.log("**** NO window[t_name]");
 }
 
 }
 output4 += "</ul>";
 //place output
 if (targetID && jQuery("#" + targetID)) {
 jQuery("#" + targetID).html(output4);
 //console.log("OUTPUT to " + targetID + " -with- " + output4);
 }
 else {
 console.log("No TargetID in process_table");
 }
 }
 else {
 console.log("**NO object SENT TO process_table");
 }
 jQuery(document).ready(function () {
 jQuery(function () {
 jQuery("#sortable").sortable({
 placeholder: "ui-state-highlight"
 });
 jQuery("#sortable").disableSelection();
 });
 });
 }
 */
/*function sel_change(id) {
 //alert('you modified '+id);
 var item = jQuery("#select" + id);
 var old_item = jQuery("#job_task_" + id);
 var itemv = jQuery("#select" + id).val();
 var newitem = jQuery("#job_task_" + itemv);
 //alert(item+" : "+itemv+ " : ");
 if (item && itemv && newitem) {
 newitem.html(old_item);
 }
 }*/
/*
 var tdx_gmap = jQuery("#job_gmap_1");
 function tdx_toggle(title) {
 var tdx_ttt = title;
 if (jQuery("#" + tdx_ttt)) {
 jQuery("#" + tdx_ttt).toggle("slow");
 }
 }
 */
/*
 function job_task_toggle(action1, taskID, target, table_name, ID) {
 if (table_name && ID) {
 var posID = table_name + "_RC_" + ID;
 var targetID = table_name + "_minmax" + ID;
 var tdx_min = "<a href='javascript:job_task_toggle(\"min\",\"" + taskID + "\",\"" + target + "\",\"" + table_name + "\",\"" + ID + "\");'><i class='fa fa-window-minimize fa-2x' aria-hidden='true'> <span class='icontext'></span></i></a>"
 , tdx_max = "<a href='javascript:job_task_toggle(\"max\",\"" + taskID + "\",\"" + target + "\",\"" + table_name + "\",\"" + ID + "\");'><i class='fa fa-window-maximize fa-2x' aria-hidden='true'> <span class='icontext'></span></i></a>";
 if (action1 === "max") {
 if (jQuery("#" + posID)) {
 pkey.record_set_setting({"table_name": table_name, "ID": ID, "settings_name": "view", "settings_value": "max"});
 jQuery("#" + posID).addClass("maximized");
 jQuery("#" + posID).removeClass("minimized");
 //jQuery("#"+target).html('(<a href="javascript:job_task_toggle(\'min\',\''+taskID+'\',\''+target+'\')">MIN</a>)');
 jQuery("#" + targetID).html(tdx_min);
 //<a href='javascript:job_task_toggle(\"max\",\"job_task_content_1\",\"task_job_minmax1\");'><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"> <span class='icontext'></span></i></a>
 }
 }
 if (action1 === "min") {
 if (jQuery("#" + posID)) {
 pkey.record_set_setting({"table_name": table_name, "ID": ID, "settings_name": "view", "settings_value": "min"});
 jQuery("#" + posID).addClass("minimized");
 jQuery("#" + posID).removeClass("maximized");
 //jQuery("#"+target).html('(<a href="javascript:job_task_toggle(\'max\',\''+taskID+'\',\''+target+'\')">MAX</a>)');
 jQuery("#" + targetID).html(tdx_max);
 //<a href='javascript:job_task_toggle("max","job_task_content_1","task_job_minmax1");'><i class="fa fa-plus-square-o" aria-hidden="true"> <span class='icontext'></span></i></a>
 }
 }
 
 }
 }
 */
function select_menu_output(total, selected, id, class1, onchange) {
    var t, s, i, c, o, passvalue = "", sele_out = "";
    if (total && selected) {

        if (id) {
            i = " id='" + id + "'";
        }
        else {
            i = "";
        }

        if (class1) {
            c = " class='" + class1 + "'";
        }
        else {
            c = "";
        }

        if (onchange) {
            o = " onchange='" + onchange + "'";
        }
        else {
            o = "";
        }

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
            ico = "http://104.198.216.13/wp-content/uploads/2017/07/blueX.png";
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
/*
 function load_by_ID(obj) {
 if (obj) {
 //LOAD SCREEN OR LIST INTO DEDICATED DIV, FOR NOW JUST PUT THE ID
 var ID = "", table_name = "", targetID = "";
 if (obj["ID"] !== undefined) {
 ID = obj["ID"];
 }
 if (obj["table_name"] !== undefined) {
 table_name = obj["table_name"];
 }
 if (obj["targetID"] !== undefined) {
 targetID = obj["targetID"];
 }
 
 //jQuery("#"+targetID).html("JOB DATA WILL LOAD FOR Job ID");
 
 }
 }*/

/*
 function record_edit(screen_name, table_name, ID, record_group) {
 ///COPIED TO PKEY
 //alert('edit');
 pkey.record_set_setting({"settings_name": "mode", "settings_value": "e", "ID": ID, "table_name": table_name});
 pkey.record_open(screen_name, table_name, ID, record_group);
 }
 function record_view(screen_name, table_name, ID, record_group) {
 ///COPIED TO PKEY
 pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "ID": ID, "table_name": table_name});
 pkey.record_open(screen_name, table_name, ID, record_group);
 }
 
 function record_undo(screen_name, table_name, ID, record_group) {
 ///COPIED TO PKEY
 if (screen_name && table_name && ID && record_group) {
 pkey.record_set_setting({"settings_name": "mode", "settings_value": "v", "ID": ID, "table_name": table_name});
 //pkey.record_empty_by_ID({ "table_name":table_name, "ID":ID });
 //pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
 }
 }
 */
function manage_edit_button(obj) {
    //COPIED TO PKEY
    var mode = obj["mode"];
    var screen_name = "", table_name = "", ID = "", record_group = "";

    if (obj["screen_name"] !== undefined) {
        screen_name = obj["screen_name"];
    }
    if (obj["table_name"] !== undefined) {
        table_name = obj["table_name"];
    }
    if (obj["ID"] !== undefined) {
        ID = obj["ID"];
    }
    if (obj["record_group"] !== undefined) {
        record_group = obj["record_group"];
    }

    if (mode !== undefined) {
        var edit_button_position = jQuery("#tdx_popup_actions_wr");
        var all_button_position = jQuery("#tdx_popup_buttons_wr");
        var tdx_close_modal_btn = jQuery("#tdx_close_modal_btn");
        var tdx_modal_backdrop = jQuery(".modal-backdrop");
        var tdx_modal_info_close = jQuery("#tdx_modal_info_close");

        var save_and_close = "<button type='button' class='btn btn-default' id='tdx_save_and_close_btn' onclick='javascript:record_save(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\",\"close\")'>Save & Close</button>";
        var save_and_new = "<button type='button' class='btn btn-default' id='tdx_save_and_new_btn' onclick='javascript:record_save(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\",\"new\")'>Save & Add New</button>";

        if (mode === "e" && edit_button_position) {
            edit_button_position.html("");
            all_button_position.html("");
            all_button_position.append(save_and_close, save_and_new);
        }
        if (mode === "v" && edit_button_position) {
            edit_button_position.html("<a href='#' onclick='javascript:record_edit(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");'><i class='fa fa-2x fa-pencil-square-o' aria-hidden='true'><span class='icontext'>Edit</span></i></a>");
            all_button_position.html("");

        }
        tdx_close_modal_btn.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
        tdx_modal_backdrop.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
        tdx_modal_info_close.attr("onclick", "javascript:pkey.record_view(\"" + screen_name + "\",\"" + table_name + "\",\"" + ID + "\",\"" + record_group + "\");");
    }

}

function record_delete(screen_name, table_name, ID, record_group) {
    if (screen_name && table_name && ID && record_group) {
        if (confirm("Are you sure you want to delete?") === true) {
            alert('SEND THAT SHIT! -- Delete ID:' + ID);
            pkey.record_display({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "P_ID": ID});
        }
        //UNIV_POST THE DELETE
        //IF DELETE IS SUCCESSFUL THEN pkey.record_pull();

    }
}
function record_save(screen_name, table_name, ID, record_group) {
    if (screen_name && table_name && ID && record_group) {
        //compare values from textboxes to dom
        //univ_post any changes
        var is_mod = pkey.record_is_mod({"screen_name": screen_name, "table_name": table_name, "record_group": record_group, "ID": ID});
        //alert(JSON.stringify(is_mod));
        if (is_mod !== undefined && (typeof is_mod === "object")) {
            //alert('SEND IT! ' + JSON.stringify(is_mod));
            univ_post("update_record", is_mod);
        }
        else {
            notify("NOTICE!", "No changes were made to the record you are trying to save...", "blueX");

        }
    }
}
/*
function univ_post(action, input) {
    var path = "/wp-content/plugins/tsbp-employee-job-time-tracker/p/";

    if (action === "clock_in") {//clock_in
        input["action"] = "clock_in";
    }
    if (action === "get_tasks") {//get_tasks
        input["action"] = "get_tasks";
    }

    if (action === "get_screens") {//get_screens
        input["action"] = "get_screens";
    }
    if (action === "get_screen_by_ID") {//get_screen_by_ID
        input["action"] = "get_screen_by_ID";
    }
    if (action === "get_table") {//get_screens
        input["action"] = "get_table";
    }
    if (action === "get_tables_by_screen") {//get_screen_by_ID
        input["action"] = "get_tables_by_screen";
    }
    if (action === "get_columns_by_table") {//get_screens
        input["action"] = "get_columns_by_table";
    }
    if (action === "get_records_by_table") {//get_screen_by_ID
        input["action"] = "get_records_by_table";
    }
    if (action === "get_record_groups_by_screen") {//get_screen_by_ID
        input["action"] = "get_record_groups_by_screen";
    }
    if (action === "get_records_by_group") {//get_screen_by_ID
        input["action"] = "get_records_by_group";
    }
    if (action === "get_record_values_by_ID") {//get_screen_by_ID
        input["action"] = "get_record_values_by_ID";
    }
    if (action === "launch_email") {//get_screen_by_ID
        input["action"] = "launch_email";
    }

    var dd = new Date();
    var stamp = dd.getTime();
    var le = 0;
    stamp = String(stamp);//typecast to string
    le = stamp.length; //count the time character length
    le = le - 3;//the time character length - minus the milliseconds (3 digits)
    stamp = stamp.substr(0, le);//cut milliseconds off

    var jspost = new XMLHttpRequest();
    var url = path + 'ajax-to-db.php?t4=' + stamp;
    var params = "t=1";
    var ret = true;
    jspost.open("POST", url, true);
    jspost.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //jspost.setRequestHeader("Connection", "close");

    console.log("SENDING!: " + JSON.stringify(input));
    console.log("ACTION:" + action);
    jspost.send(JSON.stringify(input));

    //SEND TO FAKE POST FOR NOW, FAKE POST WILL RETURN THE EXACT SAME DATA AS THE PHP PAGE
    //var g = fake_post(input);
    //univ_handler(g);

    //saver.disabled = true;
    //saver.value = "SENDING...";

    jspost.onreadystatechange = function () {//Call a function when the state changes.
        //alert(jspost.readyState+ " - "+jspost.status);
        if (jspost.readyState == 4 && jspost.status == 200) {
            //do something with responsetext
            console.log("RESPONSE: " + jspost.responseText);
            ret = jspost.responseText;
            univ_handler(ret);
        }
        else if (jspost.readyState == 4 && jspost.status != 200) {
            //notify("OFFLINE", "You are offline, all updates will be stored locally until a connection is made.");
            //pkey.place_offline(input);
        }
    };
    //return ret;
}
*/
function univ_handler(dataa) {
    if (dataa) {
        console.log("HANDLER:" + JSON.stringify(dataa));

        var dd = JSON.parse(dataa);

        /*
         var send_obj = {};
         
         var action = dataa["action"];
         var result = dataa["result"];
         var ID = dataa["ID"];
         var table_name = dataa["table_name"];
         var record_group = dataa["record_group"];
         var screen_name = dataa["screen_name"];
         
         send_obj["ID"] = ID;
         
         if (result === true) {
         //notify("UPDATED", "Data was updated successfully");
         
         if (action === "get_screens") {
         console.log('>action:'+action);
         pkey.screens_extract_settings(dataa);
         }
         if (action === "get_screen_by_ID") {
         //UPDATE DOM AND REFRESH INTERFACE
         console.log('>action:'+action);
         pkey.screens_extract_settings(dataa);
         }
         if (action === "get_table") {
         console.log('>action:'+action);
         alert('you were working on action===get_table line 2827');
         }
         if (action === "get_tables_by_screen") {
         console.log('>action:'+action);
         
         }
         if (action === "get_columns_by_table") {
         console.log('>action:'+action);
         
         }
         if (action === "get_records_by_table") {
         console.log('>action:'+action);
         
         }
         if (action === "get_record_groups_by_screen") {
         console.log('>action:'+action);
         
         }
         if (action === "get_records_by_group") {
         console.log('>action:'+action);
         
         }
         if (action === "get_record_values_by_ID") {
         console.log('>action:'+action);
         
         }
         if (action === "launch_email") {
         console.log('>action:'+action);
         alert('launch email returned');
         }
         }
         else {
         //RESULTS NOT TRUE
         notify("TRANSMISSION FAILED", "The communication with the server returned an error");
         }*/



    }
}

function fake_post(obj) {
    //OFFLINE USE ONLY, THIS WILL RETURN THE CORRECT OBJECT BASED UPON THE ACTION,
    //EMULATES DATA RETURNED FROM PHP FILE ajax-to-db.php
    if (obj) {
        var ret = {};
        //alert("EMULATION POST:" + JSON.stringify(obj));
        //MANUALLY GRAB ACTIONS HERE AND RETURN THE SAME OBJECT THAT THE PHP WOULD RETURN ajax-to-db.php
        if (obj["action"] === "get_screens") {
            //DONE
            ret = {"0": {"screen_name": "job_tasks", "screen_alias": "Job Tasks", "description": "description here", "settings_object": {"display_type": "list", "main_header": "false", "groups": {"0": "a"}, "screen_target": "target_divID", "allow_drag_reorder": "true", "allow_select_reorder": "true", "allow_edit": "true", "allow_delete": "true", "allow_new": "true", "allow_edit_history": "true", "header_columns": {"0": "task_title"}, "content_columns": {"0": "task_description", "1": "address"}, "column_hooks": {"0": {"column_name": "address", "type": "google_map"}}, "record_buttons": {"0": {"wrapper_class": "action iconWR", "icon_class": "fa fa-clock-o", "icon_text": "Actions", "hrf": "javascript:show_actions('ID','1');", "modal_targetID": "myModal_actions"}, "1": {"wrapper_class": "secondary_iconWR", "icon_class": "fa fa-server", "icon_text": "Job", "hrf": "javascript:load_by_ID('jobs');", "modal_targetID": "myModal_jobs"}, "2": {"wrapper_class": "secondary_iconWR", "icon_class": "fa fa-address-card", "icon_text": "Customer", "hrf": "javascript:load_by_ID('customers');", "modal_targetID": "myModal_customers"}}}}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_screen_by_ID") {
            //DONE
            ret = {"0": {"screen_name": "job_tasks", "screen_alias": "Job Tasks", "description": "description here", "settings_object": {"display_type": "list", "main_header": "false", "groups": {"0": "a"}, "screen_target": "target_divID", "allow_drag_reorder": "true", "allow_select_reorder": "true", "allow_edit": "true", "allow_delete": "true", "allow_new": "true", "allow_edit_history": "true", "header_columns": {"0": "task_title"}, "content_columns": {"0": "task_description", "1": "address"}, "column_hooks": {"0": {"column_name": "address", "type": "google_map"}}, "record_buttons": {"0": {"wrapper_class": "action iconWR", "icon_class": "fa fa-clock-o", "icon_text": "Actions", "hrf": "javascript:show_actions('ID','1');", "modal_targetID": "myModal_actions"}, "1": {"wrapper_class": "secondary_iconWR", "icon_class": "fa fa-server", "icon_text": "Job", "hrf": "javascript:load_by_ID('jobs');", "modal_targetID": "myModal_jobs"}, "2": {"wrapper_class": "secondary_iconWR", "icon_class": "fa fa-address-card", "icon_text": "Customer", "hrf": "javascript:load_by_ID('customers');", "modal_targetID": "myModal_customers"}}}}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_table") {
            //DONE
            ret = {"0": {"tableID": "1", "table_slug": "job_tasks", "table_alias": "Job Tasks", "created_timestamp": "1501995519", "authorID": "2"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_tables_by_screen") {
            //DONE
            ret = {"0": {"tableID": "1", "table_slug": "job_tasks", "table_alias": "Job Tasks", "created_timestamp": "1501995519", "authorID": "2"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_columns_by_table") {
            //DONE
            ret = {"0": {"columnID": "1", "column_slug": "task-title", "column_alias": "Task Title", "tableID": "1", "description": "blah blah blah", "authorID": "1", "indx": "1"}, "1": {"columnID": "2", "column_slug": "task-description", "column_alias": "Task Description", "tableID": "1", "description": "blah blah blah", "authorID": "1", "indx": "1"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_records_by_table") {
            //DONE
            ret = {"0": {"recordID": "1", "rec_valID": "1", "columnID": "1", "timestamp": "1502922634", "authorID": "2", "content": "rec 1 column 1", "indx": "1"}, "1": {"recordID": "1", "rec_valID": "2", "columnID": "2", "timestamp": "1502922634", "authorID": "2", "content": "rec 1 column 2", "indx": "1"}, "2": {"recordID": "2", "rec_valID": "3", "columnID": "1", "timestamp": "1502922644", "authorID": "2", "content": "rec 2 column1", "indx": "2"}, "3": {"recordID": "2", "rec_valID": "4", "columnID": "2", "timestamp": "1502922644", "authorID": "2", "content": "rec 2 col 2", "indx": "2"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_record_groups_by_screen") {
            //DONE
            ret = {"0": {"record_groupID": "1", "record_group_slug": "group-1", "record_group_alias": "Group 1", "color": "#3365A2", "description": "group 1 desc", "default_display": "1", "indx": "1"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_records_by_group") {
            //DONE
            ret = {"0": {"record_groupID": "1", "recordID": "1", "indx": "1"}, "1": {"record_groupID": "1", "recordID": "2", "indx": "2"}};
            ret["action"] = obj["action"];
        }
        if (obj["action"] === "get_record_values_by_ID") {
            //DONE
            ret = {"0": {"recordID": "1", "rec_valID": "1", "columnID": "1", "timestamp": "1502922634", "authorID": "2", "content": "rec 1 column 1"}, "1": {"recordID": "1", "rec_valID": "2", "columnID": "2", "timestamp": "1502922634", "authorID": "2", "content": "rec 1 column 2"}};
            ret["action"] = obj["action"];
        }

        /*for (var x in obj) {
         ret[x] = obj[x];
         }*/
        ret["result"] = true;
        return ret;
    }
}