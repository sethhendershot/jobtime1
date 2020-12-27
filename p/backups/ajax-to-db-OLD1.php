<?php

$ts = gmdate("D, d M Y H:i:s") . " GMT";
header("Expires: $ts");
header("Last-Modified: $ts");
header("Pragma: no-cache");
header("Cache-Control: no-cache, must-revalidate");
//defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/*
define('DBNAME', 'smallbus_wp');
define('DBUSER', 'smallbus_wp');
define('DBPW', '0yT9VgYHFGmA');
*/

define('DBNAME', 'bitnami_wordpress');
define('DBUSER', 'bn_wordpress');
define('DBPW', 'f30215f605');

define('DBHOST', 'localhost:3306');

/** Database Charset to use in creating database tables. */
//define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
//define('DB_COLLATE', '');
//$connection = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
$passobj = new stdClass();

$con = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);

// Check connection
if (!$con) {
    echo "Failed to connect to DB: " . mysqli_connect_error();
    exit();
}

//FILTER FUNCTION
function filter($input1, $method) {
    $input = (string) trim(stripslashes($input1));
    $keep = array();
    $text = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    $space = array(' ');
    $nums = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    $phonespec = array('(', ')', '-', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    $emspec = array('@', '.', '-', '_');
    $passpec = array('!', '$', '@', '-', '_');
    $userspecial = array('_', '-');
    $output = "";
    $output_filter = "";
    if ($input) {
        //BUILD $keep from $method
        for ($i = 0; $i <= strlen($method); $i++) {
            if ($method[$i] == "a") {
                $keep = array_merge($keep, $text);
            }
            if ($method[$i] == "b") {
                $keep = array_merge($keep, $space);
            }
            if ($method[$i] == "c") {
                $keep = array_merge($keep, $nums);
            }
            if ($method[$i] == "d") {
                $keep = array_merge($keep, $emspec);
            }
            if ($method[$i] == "e") {
                $keep = array_merge($keep, $passpec);
            }
            if ($method[$i] == "f") {
                $keep = array_merge($keep, $phonespec);
            }
            if ($method[$i] == "g") {
                $keep = array_merge($keep, $userspecial);
            }
        }
        $kc = count($keep);
        //echo "<strong>".$kc."</strong>";
        for ($x = 0; $x <= strlen($input); $x++) {
            $temp = substr($input, $x, 1);
            for ($y = 0; $y <= $kc; $y++) {
                $temp1 = $keep[$y];
                if ($temp == $temp1 && $temp != null) { //IF THEY ARE THE SAME AND NOT NULL
                    $output_filter .= $temp1;
                    $temp1 = "";
                }
            }
        }
        //echo $output_filter;
        $output = $output_filter;
        return $output;
    } else {
        return "";
    }
}

//END FILTER FUNCTION

$json = file_get_contents('php://input');
//print_r($json);
$obj = json_decode($json);
//if($obj){echo "yes!    ";}
//echo "loaded!";
//express logic

if ($obj && $obj->action == "clock_in") {
    //what data do we need to know about the user clocking in?
    //username or identifier
    //current time
    $t = time();
    $show = date("h:i:sa", $t);
    echo "Hey You are clocked in @ " . $show;

    //echo "" . get_data($table_n);
    exit();
}
if ($obj && $obj->action == "get_screens") {

    $screens = get_screens();
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_screen_by_ID") {
    $this_screenID = (int) $obj->screenID;

    $screens = get_screen_by_ID($this_screenID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_table") {
    $this_tableID = (int) $obj->tableID;
    $this_table_target = $obj->table_target;

    $screens = get_table($this_tableID, $this_table_target);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_tables_by_screen") {
    $this_screenID = (int) $obj->screenID;

    $screens = get_tables_by_screen($this_screenID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_columns_by_table") {
    $this_tableID = (int) $obj->tableID;

    $screens = get_columns_by_table($this_tableID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_records_by_table") {
    $this_tableID = (int) $obj->tableID;

    $screens = get_records_by_table($this_tableID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_record_groups_by_screen") {
    $this_screenID = (int) $obj->screenID;

    $screens = get_record_groups_by_screen($this_screenID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_records_by_group") {
    $this_record_groupID = (int) $obj->record_groupID;

    $screens = get_records_by_group($this_record_groupID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_record_values_by_ID") {
    $this_recordID = (int) $obj->recordID;

    $screens = get_record_values_by_ID($this_recordID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "set_record_content") {
    $this_recordID = (int) $obj->recordID;
    $screens = set_record_content($obj);
    //$screens->test = "HELLO! ".$this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "launch_email") {
    $test3 = launch_email();
    $output1 = "Success, email sent!";
    echo $test3;
    exit();
}

if ($obj && $obj->action == "delete_recordID") {
    $this_recordID = (int) $obj->recordID;
    $screens = delete_record($obj);
    //$screens->test = "HELLO! ".$this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "set_restore_version") {
    $this_recordID = (int) $obj->recordID;
    $this_tableID = (int) $obj->tableID;
    $window_action1 = $obj->window_action;
    $screens = set_restore_version($this_recordID, $this_tableID, $window_action1);
    //$screens->test1 = "HELLO! " . $this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "update_record_position") {
    $this_recordID = (int) $obj->recordID;
    $this_tableID = (int) $obj->tableID;
    $this_next_recordID = (int) $obj->next_recordID;
    $direction = $obj->direction; 

    $screens = update_record_position($this_recordID, $this_tableID, $this_next_recordID, $direction);
    //$screens->test1 = "HELLO! " . $this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_FKdata") {
    $this_recordID = (int) $obj->recordID;
    $this_tableID = (int) $obj->tableID;
    $identifier = $obj->identifier; 

    $screens = get_FKdata($this_recordID, $this_tableID, $identifier);
    //$screens->test1 = "HELLO! " . $this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}
if ($obj && $obj->action == "get_user_data") {
    global $user_login, $user_email;
    $temp_ret = new stdClass(); 
    get_currentuserinfo();
    $current_user = wp_get_current_user();
    $this_recordID = (int) $obj->recordID;
    $this_tableID = (int) $obj->tableID;
    $identifier = $obj->identifier; 

    $user_info = new stdClass();
    $user_info = get_userdata($current_user->ID);
    /****************TO DISPLAY USER INFORMATION**********************/
    $temp_ret->username = '' . $user_info->user_login;
    $temp_ret->user_roles = '' . implode(', ', $user_info->roles) . "";
    $temp_ret->userID = '' . $user_info->ID . "";
    $temp_ret->user_login = "" . $current_user->user_login . "";
    /*****************************************************************/

    //$screens->test1 = "HELLO! " . $this_recordID;
    $output1 = json_encode($temp_ret);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_all_columns") {
    //$this_tableID = (int) $obj->tableID;

    $screens = get_all_columns();
    //$screens->test1 = "HELLO! " . $this_recordID;
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}


////////////////////////////////////// END OF EXPRESS LOGIC, NOW THE FUNCTIONS

function set_record_content($obj) {
    //new and existing records
    $ret = new stdClass();
    $dirrrrr = "../../../../wp-load.php";
    include($dirrrrr);
    $ret = new stdClass();
    $sender = new stdClass();
    //$ret->recordID = $obj->recordID;
    //$ret->tableID = $obj->tableID;
    //$ret->content_object = $obj->content_object;
    global $user_login, $user_email;
    //get_currentuserinfo();
    $current_user1 = wp_get_current_user();
    $user_info1 = new stdClass();
    $user_info1 = get_userdata($current_user1->ID);
    /*     * **************TO DISPLAY USER INFORMATION**********************
      echo 'Username: ' . $user_info->user_login . "<BR/>";
      echo 'User roles: ' . implode(', ', $user_info->roles) . "<BR/>";
      echo 'User ID: ' . $user_info->ID . "<BR/>";
      echo "currID:" . $current_user->user_login . "<BR/>";
     * *************************************************************** */
    $this_recordID = $obj->recordID;
    $this_tableID = $obj->tableID;
    $this_content_object = $obj->content_object;
    $this_timestamp = $obj->_TIMESTAMP;
    $this_record_groupID = "";

    $column_fill = "";
    $column_fill_key = "";
    $ret->authorID = $user_info1->ID;
    $authorID = (string) $user_info1->ID;

    $ret->tableID = (int) $this_tableID;
    $ret->recordID = $this_recordID;
    $ret->_TIMESTAMP = $this_timestamp;
    $ret->content_object = $this_content_object;
    $ret->record_groupID = $this_record_groupID;
    $ret->timestamp1 = date("F Y h:i:s A");

    $next_recordID = 0;
    $prev_versionID = 0;

    $send_prev_versionID = NULL;
    $send_next_recordID = NULL;
    $send_recordID = 0;
    $changes = "";

    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);

    if ($this_recordID === "N") {
        //get the tail record, update the tail record in tsbp_tables, shift positions
        $ret->was_new_record = "true";
        //get tail, replace tail, insert data, update next recordID
        $former_tailID = get_tail_recordID($this_tableID);
        if ($former_tailID !== 0) {
            //$next_recordID = $former_tailID;
            $ret->former_tail = $former_tailID;
        }
    } else {
        //its an UPDATE
        //GET THE NEXT_RECORDID FOR THIS_RECORD

        $next_recordID = get_next_recordID($this_tableID, $this_recordID);
        $prev_versionID = 0;
    }
    //$ret->TEST_next_recordID = $next_recordID;
    if ($next_recordID !== "" && $next_recordID !== NULL) {
        //HANDLE SPECIAL IF ITS 0, FOR THE NULL - REMOVE THE QUOTES
        if ($next_recordID === 0) {
            $column_fill .= "NULL";
            $column_fill_key .= "next_recordID";
        } else {
            $column_fill .= "'" . $next_recordID . "'";
            $column_fill_key .= "next_recordID";
        }
    }
    if ($prev_versionID !== "") {
        //HANDLE SPECIAL IF ITS 0, FOR THE NULL - REMOVE THE QUOTES
        if ($column_fill !== "") {
            $column_fill .= ", ";
            $column_fill_key .= ", ";
        }
        if ($prev_versionID === 0) {
            $column_fill .= "NULL";
            $column_fill_key .= "prev_versionID";
        } else {
            $column_fill .= "'" . $prev_versionID . "'";
            $column_fill_key .= "prev_versionID";
        }
    }
    if ($authorID !== "") {
        if ($column_fill !== "") {
            $column_fill .= ", ";
            $column_fill_key .= ", ";
        }
        $column_fill .= "'" . $authorID . "'";
        $column_fill_key .= "authorID";
    }
    if ($this_timestamp !== "") {
        if ($column_fill !== "") {
            $column_fill .= ", ";
            $column_fill_key .= ", ";
        }
        $column_fill .= "'" . $this_timestamp . "'";
        $column_fill_key .= "timestamp";
    }
    if ($this_tableID !== "") {
        if ($column_fill !== "") {
            $column_fill .= ", ";
            $column_fill_key .= ", ";
        }
        $column_fill .= "'" . $this_tableID . "'";
        $column_fill_key .= "tableID";
    }
    if ($column_fill !== "") {
        $column_fill .= ", ";
        $column_fill_key .= ", ";
    }
    $column_fill .= "'" . json_encode($this_content_object) . "'";
    $column_fill_key .= "content_object";

    if ($column_fill !== "") {
        $column_fill2 = "(" . $column_fill_key . ") VALUES (" . $column_fill . ")";
        $qqq = "INSERT INTO tsbp_records " . $column_fill2 . "";

        $ret->query1 = $qqq;

        $q2 = mysqli_query($dbc, $qqq);
        if ($q2 === true) {
            //update success
            $ret->result = "true";
            //get the recordID
            $this_new_recordID = mysqli_insert_id($dbc);

            if ($this_recordID === "N") {
                $ret->this_recordID_N = "new record";
                //update former tail with new next_recordID = this new recordID
                $update_tailID = set_record_position($former_tailID, $this_new_recordID, $this_tableID);
                $set_record_as_tail = set_record_as_tail($this_new_recordID, $this_tableID);
                if ($update_tailID === true) {
                    $ret->N_update_tail = true;
                } else {
                    $ret->N_update_tail = false;
                }
                if ($set_record_as_tail === true) {
                    $ret->N_set_record_as_tail = true;
                } else {
                    $ret->N_set_record_as_tail = false;
                }
                $is_head_null = is_record_head_null($this_tableID);
                if ($is_head_null === true) {
                    //head is null, this is the first record, set as head also
                    $set_record_as_head = set_record_as_head($this_new_recordID, $this_tableID);
                    if ($set_record_as_head === true) {
                        $ret->also_set_as_head = true;
                    }
                }
            } else {
                //its an update
                $ret->this_recordID_N = "update";
                $update_parentID = set_record_position($this_recordID, 0, $this_tableID);

                //CHECK IF THIS RECORDID EXISTS AS A NEXT_RECORDID ANYWHERE
                $recordID_if_next_record = get_recordID_where_next_recordID($this_tableID, $this_recordID);
                if ($recordID_if_next_record !== 0) {
                    $ret->is_next_record_for = $recordID_if_next_record;
                    $set_new_position = set_record_position($recordID_if_next_record, $this_new_recordID, $this_tableID);
                    if ($set_new_position === true) {
                        $ret->reset_next_record = true;
                        $ret->reset_next_record_to = $this_new_recordID;
                    }
                }

                //update the prev_versionID of this_recordID to be this_new_recordID
                $update_versionID = set_record_version($this_recordID, $this_new_recordID, $this_tableID);
                if ($update_versionID === true) {
                    $ret->shift_version = true;
                } else {
                    $ret->shift_version = false;
                }

                $is_old_record_head = is_record_head($this_recordID, $this_tableID);
                if ($is_old_record_head === true) {
                    $ret->is_this_head = true;
                    //set the new head to this_new_recordID
                    $set_the_head = set_record_as_head($this_new_recordID, $this_tableID);
                    if ($set_the_head === true) {
                        $ret->set_the_head_result = true;
                    }
                }

                $is_old_record_tail = is_record_tail($this_recordID, $this_tableID);
                if ($is_old_record_tail === true) {
                    $ret->is_this_tail = true;
                    //set the new head to this_new_recordID
                    $set_the_tail = set_record_as_tail($this_new_recordID, $this_tableID);
                    if ($set_the_tail === true) {
                        $ret->set_the_tail_result = true;
                    }
                }
            }

            $ret->this_new_recordID = (string) $this_new_recordID;
            $ret->next_recordID = (string) $next_recordID;
            $ret->prev_versionID = (string) $prev_versionID;
        }
    }

    return $ret;
}

function set_restore_version($this_recordID, $this_tableID,$window_action1) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $version_limit = 30;
    $x = 0;
    $proc_recordID = $this_recordID;
    $proc_tableID = $this_tableID;
    $window_action = $window_action1;
    //$ret->test = "test";
    $this_prevID = get_prev_versionID($proc_tableID, $proc_recordID);
    //if($this_prevID === 0){ return false; }
    $this_former_underID = get_recordID_where_prev_versionID($proc_tableID, $proc_recordID);
    //$ret->wtf = $this_former_underID;
    //update former underID to this_prevID
    if ($this_former_underID !== 0) {
        $ret->former_underID = $this_former_underID;
        $ret->this_prevID = $this_prevID;
        $fill_the_version_gap = set_record_version($this_former_underID, $this_prevID, $proc_tableID);
        if ($fill_the_version_gap === true) {
            $ret->version_gap_filled = true;
        } else {
            $ret->version_gap_filled = false;
        }
    } else {
        //THERE IS NOTHING BELOW THIS VERSION, ITS THE BOTTOM VERSION
        $ret->former_underID = 0;
        $ret->this_prevID = $this_prevID;
    }

    //work up the chain to the NULL
    $pas = true;
    $first_subversionID = 0;
    
    //$temp_prev_versionID = get_prev_versionID($proc_tableID, $this_prevID);
    //$this_versID = $this_prevID;
    
    while ($x < $version_limit) {
        if ($pas === true) {

            $temp_prev_versionID = get_prev_versionID($proc_tableID, $this_prevID);
            $ret->checking .= $x.":".$this_prevID."; ";
            
            if ($temp_prev_versionID === NULL) {
                $ret->$x = new stdClass();
                $pas = false;
                $first_subversionID = $this_prevID;
                //update this subversion to be underneath proc_recordID
                //(explain: this was the top-most record in the version chain and it will be moved to 2nd)
                //$adjust = set_record_version($first_subversionID, $proc_recordID, $proc_tableID);
                $adjust = set_record_version($this_prevID, $proc_recordID, $proc_tableID);
                if ($adjust === true) {
                    $ret->$x->former_top_version_adjust = true;
                } else {
                    $ret->$x->former_top_version_adjust = false;
                }

                $adjust_proc_recordID = set_record_version($proc_recordID, 0, $proc_tableID);
                if ($adjust_proc_recordID === true) {
                    $ret->$x->former_top_version_adjust_procID = true;
                } else {
                    $ret->$x->former_top_version_adjust_procID = false;
                }

                //SWAP THE NEXT_RECORDIDs
                //(explain: the new top level version needs to point to the correct 'next_recordID')
                //CHECK IF THIS RECORDID EXISTS AS A NEXT_RECORDID ANYWHERE
                //$recordID_if_next_record = get_recordID_where_next_recordID($proc_tableID, $proc_recordID);
                $recordID_if_next_record = get_recordID_where_next_recordID($proc_tableID, $this_prevID);
                if ($recordID_if_next_record !== 0) {
                    $ret->$x->is_next_record_for = $recordID_if_next_record;
                    $set_new_position = set_record_position($recordID_if_next_record, $proc_recordID, $proc_tableID);
                    if ($set_new_position === true) {
                        $ret->$x->reset_next_record = true;
                        $ret->$x->reset_next_record_to = $proc_recordID;
                    }
                }

                $temp_next_record = get_next_recordID($proc_tableID, $this_prevID);
                if ($temp_next_record !== 0) {
                    $ret->$x->prev_ID_NEXT_recordID = $temp_next_record;
                    $ret->$x->check_this_prevID = $this_prevID;
                    $set_new_next = set_record_position($proc_recordID, $temp_next_record, $proc_tableID);
                    if ($set_new_next === true) {
                        $ret->$x->reset_prev_ID_NEXT_recordID = true;
                        $ret->$x->reset_prev_ID_NEXT_recordID_to = $temp_next_record;
                    }
                }
                //SET OLD TOP RECORD (next_recordID) TO BLANK (NULL)
                $reset_old_top = set_record_position($this_prevID, 0, $proc_tableID);
                if ($reset_old_top === true) {
                    $ret->$x->reset_old_top = true;
                    //$ret->reset_prev_ID_NEXT_recordID_to = $temp_next_record;
                }


                //IS THIS THE HEAD RECORD?
                $is_old_record_head = is_record_head($this_prevID, $this_tableID);
                if ($is_old_record_head === true) {
                    $ret->$x->is_this_head = true;
                    //set the new head to this_new_recordID
                    $set_the_head = set_record_as_head($proc_recordID, $this_tableID);
                    if ($set_the_head === true) {
                        $ret->$x->set_the_head_result = true;
                    }
                }
                //IS THIS THE TAIL RECORD?
                $is_old_record_tail = is_record_tail($this_prevID, $this_tableID);
                if ($is_old_record_tail === true) {
                    $ret->$x->is_this_tail = true;
                    //set the new head to this_new_recordID
                    $set_the_tail = set_record_as_tail($proc_recordID, $this_tableID);
                    if ($set_the_tail === true) {
                        $ret->$x->set_the_tail_result = true;
                    }
                }
            }
            
            if($temp_prev_versionID !== NULL){
                $this_prevID = $temp_prev_versionID;
            }
        }
        $x++;
    }

    $ret->proc_recordID = $proc_recordID;
    $ret->tableID = $proc_tableID;
    $ret->window_action = $window_action;
    $ret->result = "true";

    //return $output;
    return $ret;
}

function get_screens() {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $output = "";
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_screens");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->screen_name = $qw["screen_name"];
            $ret->$x->screen_alias = $qw["screen_alias"];
            $ret->$x->description = $qw["description"];
            $ret->$x->settings_object = json_decode($qw["settings_object"]);
            $x++;
        }
    } else {
        $ret->result = "no_records";
    }
    //return $output;
    return $ret;
}

function get_screen_by_ID($ID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $output = "";
    $proc_ID = (int) $ID;
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_screens WHERE screenID = '$proc_ID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->screen_name = $qw["screen_name"];
            $ret->$x->screen_alias = $qw["screen_alias"];
            $ret->$x->description = $qw["description"];
            $ret->$x->settings_object = json_decode($qw["settings_object"]);
            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->screenID = $proc_ID;
    }
    //return $output;
    return $ret;
}

function get_table($tableID, $table_target) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $ttable = $tableID;
    $output = "";
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_tables WHERE tableID = '$ttable' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->tableID = $qw["tableID"];
            $ret->$x->table_slug = $qw["table_slug"];
            $ret->$x->table_alias = $qw["table_alias"];
            $ret->$x->created_timestamp = $qw["created_timestamp"];
            $ret->$x->authorID = $qw["authorID"];
            $ret->$x->settings_object = json_decode($qw["settings_object"]);
            $ret->$x->head_recordID = $qw["head_recordID"];
            $ret->$x->tail_recordID = $qw["tail_recordID"];
            $ret->$x->table_target = $table_target;

            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $ttable;
    }
    //return $output;
    return $ret;
}

function get_tables_by_screen($screenID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_screenID = $screenID;
    $output = "";
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_screens ts, tsbp_table_to_screen tts, tsbp_tables tt WHERE ts.screenID = '$proc_screenID' AND ts.screenID = tts.screenID AND tts.tableID = tt.tableID");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->tableID = $qw["tableID"];
            $ret->$x->table_slug = $qw["table_slug"];
            $ret->$x->table_alias = $qw["table_alias"];
            $ret->$x->created_timestamp = $qw["created_timestamp"];
            $ret->$x->authorID = $qw["authorID"];
            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->screenID = $proc_screenID;
    }
    //return $output;
    return $ret;
}

function get_all_columns() {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_tableID = $tableID;

    $q = mysqli_query($dbc, "SELECT * FROM tsbp_columns ORDER BY tableID");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->columnID = $qw["columnID"];
            $ret->$x->prev_columnID = $qw["prev_columnID"];
            $ret->$x->column_slug = $qw["column_slug"];
            $ret->$x->column_alias = $qw["column_alias"];
            $ret->$x->tableID = $qw["tableID"];
            $ret->$x->description = $qw["description"];
            $ret->$x->authorID = $qw["authorID"];

            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    return $ret;
}

function get_columns_by_table($tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_tableID = $tableID;

    $q = mysqli_query($dbc, "SELECT * FROM tsbp_columns WHERE tableID = '$proc_tableID' ORDER BY prev_columnID ASC");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->columnID = $qw["columnID"];
            $ret->$x->prev_columnID = $qw["prev_columnID"];
            $ret->$x->column_slug = $qw["column_slug"];
            $ret->$x->column_alias = $qw["column_alias"];
            $ret->$x->tableID = $qw["tableID"];
            $ret->$x->description = $qw["description"];
            $ret->$x->authorID = $qw["authorID"];

            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    return $ret;
}

function get_records_by_table($tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_tableID = $tableID;
    $ret->timestamp1 = date("F Y h:i:s A");

    $q = mysqli_query($dbc, "SELECT * FROM tsbp_tables tt, tsbp_records tr WHERE tt.tableID = '$proc_tableID' AND tt.tableID = tr.tableID");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->recordID = $qw["recordID"];
            $ret->$x->next_recordID = $qw["next_recordID"];
            $ret->$x->prev_versionID = $qw["prev_versionID"];
            $ret->$x->timestamp = $qw["timestamp"];
            $ret->$x->authorID = $qw["authorID"];
            $ret->$x->content_object = json_decode($qw["content_object"]);
            $ret->$x->tableID = $qw["tableID"];
            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    return $ret;
}

function get_record_values_by_ID($recordID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_recordID = $recordID;
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_records tr WHERE tr.recordID = '$proc_recordID'");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->recordID = $qw["recordID"];
            $ret->$x->next_recordID = $qw["next_recordID"];
            $ret->$x->prev_versionID = $qw["prev_versionID"];
            $ret->$x->tableID = $qw["tableID"];
            $ret->$x->timestamp = $qw["timestamp"];
            $ret->$x->authorID = $qw["authorID"];
            $ret->$x->content_object = json_decode($qw["content_object"]);

            $x++;
        }
    } else {
        $ret->result = "no_records";
    }
    //return $output;
    return $ret;
}

function get_next_recordID($tableID, $recordID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;
    $proc_recordID = (int) $recordID;

    $q = mysqli_query($dbc, "SELECT next_recordID FROM tsbp_records WHERE tableID = '$proc_tableID' AND recordID = '$proc_recordID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["next_recordID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function get_prev_versionID($tableID, $recordID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;
    $proc_recordID = (int) $recordID;

    $q = mysqli_query($dbc, "SELECT prev_versionID FROM tsbp_records WHERE tableID = '$proc_tableID' AND recordID = '$proc_recordID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["prev_versionID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function get_head_recordID($tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;

    $q = mysqli_query($dbc, "SELECT head_recordID FROM tsbp_tables WHERE tableID = '$proc_tableID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["head_recordID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function get_tail_recordID($tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;

    $q = mysqli_query($dbc, "SELECT tail_recordID FROM tsbp_tables WHERE tableID = '$proc_tableID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["tail_recordID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function get_recordID_where_next_recordID($tableID, $next_recordID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;
    $proc_next_recordID = (int) $next_recordID;

    $q = mysqli_query($dbc, "SELECT recordID FROM tsbp_records WHERE tableID = '$proc_tableID' AND next_recordID = '$proc_next_recordID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["recordID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function get_recordID_where_prev_versionID($tableID, $prev_versionID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = 0;

    $proc_tableID = (int) $tableID;
    $proc_prev_versionID = (int) $prev_versionID;

    $q = mysqli_query($dbc, "SELECT recordID FROM tsbp_records WHERE tableID = '$proc_tableID' AND prev_versionID = '$proc_prev_versionID' LIMIT 1");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret = $qw["recordID"];
        }
    } else {
        $ret = 0;
    }

    return $ret;
}

function is_record_head($recordID, $tableID) {
    //search the tsbp_table table for recordID, if its the head record return true
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = false;

    $proc_tableID = $tableID;
    $proc_recordID = $recordID;

    $q = mysqli_query($dbc, "SELECT * FROM tsbp_tables WHERE tableID = '$proc_tableID' AND head_recordID = '$proc_recordID'");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        $ret = true;
    } else {
        $ret = false;
    }
    //return $output;
    return $ret;
}

function is_record_head_null($tableID) {
    //search the tsbp_table table for recordID, if its the head record return true
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = false;

    $proc_tableID = $tableID;

    $q = mysqli_query($dbc, "SELECT * FROM `tsbp_tables` WHERE tableID = '$proc_tableID' AND head_recordID IS NULL");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        $ret = true;
    } else {
        $ret = false;
    }
    //return $output;
    return $ret;
}

function is_record_tail($recordID, $tableID) {
    //search the tsbp_table table for recordID, if its the head record return true
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = false;

    $proc_tableID = $tableID;
    $proc_recordID = $recordID;


    $q = mysqli_query($dbc, "SELECT * FROM tsbp_tables WHERE tableID = '$proc_tableID' AND tail_recordID = '$proc_recordID'");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        $ret = true;
    } else {
        $ret = false;
    }
    //return $output;
    return $ret;
}

function set_record_as_head($recordID, $tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = false;

    $proc_tableID = $tableID;
    $proc_recordID = "'" . (int) $recordID . "'";
    if ($recordID === 0) {
        $proc_recordID = "NULL";
    }

    $q = mysqli_query($dbc, "UPDATE tsbp_tables SET head_recordID = $proc_recordID WHERE tableID = '$proc_tableID' ");

    if ($q === true) {
        $ret = true;
    } else {
        $ret = false;
    }
    //return $output;
    return $ret;
}

function set_record_as_tail($recordID, $tableID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = false;

    $proc_tableID = $tableID;
    $proc_recordID = "'" . (int) $recordID . "'";
    if ($recordID === 0) {
        $proc_recordID = "NULL";
    }

    $q = mysqli_query($dbc, "UPDATE tsbp_tables SET tail_recordID = $proc_recordID WHERE tableID = '$proc_tableID' ");

    if ($q === true) {
        $ret = true;
    } else {
        $ret = false;
    }
    //return $output;
    return $ret;
}

function set_record_version($recordID, $prev_versionID, $tableID) {
    //update record_versionID for input recordID
    $this_recordID = 0;
    $this_prev_versionID = 0;
    $this_tableID = 0;

    $this_recordID = (int) $recordID;
    $this_prev_versionID = (int) $prev_versionID;
    $this_tableID = (int) $tableID;

    if ($this_recordID !== 0 && $this_tableID !== 0) {
        if ($this_prev_versionID === 0) {
            //this_prev_versionID = NULL; 
            $changes = "prev_versionID = NULL";
        } else {
            $changes = "prev_versionID = '" . $this_prev_versionID . "'";
        }

        $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
        $q = mysqli_query($dbc, "UPDATE tsbp_records SET $changes WHERE tableID = '$this_tableID' AND recordID = '$this_recordID'");
        if ($q === true) {
            return true;
        }
    }
}

function set_record_position($recordID, $next_recordID, $tableID) {
    //update next_recordID for input recordID
    $this_recordID = 0;
    $this_next_recordID = 0;
    $this_tableID = 0;

    $this_recordID = (int) $recordID;
    $this_next_recordID = (int) $next_recordID;
    $this_tableID = (int) $tableID;

    if ($this_recordID !== 0 && $this_tableID !== 0) {

        if ($this_next_recordID === 0) {
            //$this_next_recordID = NULL; 
            $changes = "next_recordID = NULL";
        } else {
            $changes = "next_recordID = '" . $this_next_recordID . "'";
        }

        $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
        $q = mysqli_query($dbc, "UPDATE tsbp_records SET $changes WHERE tableID = '$this_tableID' AND recordID = '$this_recordID'");
        if ($q === true) {
            return true;
        }
    }
}

function update_record_position($recordID, $tableID, $new_next_recordID, $direction){
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();

    $proc_recordID = $recordID;
    $proc_tableID = $tableID;
    $proc_new_next_recordID = $new_next_recordID;
    $proc_direction = $direction;
    $pas = false;

    //start, set the tableID
    $ret->tableID = $proc_tableID;
    $ret->was_pos_move = "true";
    $ret->timestamp1 = date("F Y h:i:s A");
    /*
    
    //fill gap from old position----------------------------
        //get this_recordID's next_recordID (old next record)
        $this_records_next_record = get_next_recordID($proc_tableID, $proc_recordID);
        if($this_records_next_record !== 0){
            $ret->this_records_next_record = $this_records_next_record;
            //if the new_next_record matches this_recordID that means the records are touching, pas = true
            if($this_records_next_record === $proc_recordID){
                $pas = true;
                $ret->is_touching = true;
            }
        }
        //get recordID where this_recordID is next_recordID
        $recordID_where_this_next_record = get_recordID_where_next_recordID($proc_tableID, $proc_recordID);
        if($recordID_where_this_next_record !== 0){
            $ret->recordID_where_this_NR = $recordID_where_this_next_record;
            $swap_next = set_record_position($recordID_where_this_next_record,$this_records_next_record,$proc_tableID);
            if($swap_next === true){
                $ret->fill_gap_swap_next = true;
            }
            if($recordID_where_this_next_record === $proc_recordID){
                $pas = true;
                $ret->is_touching = true;
            }
        }
        else{
            $ret->recordID_where_this_NR = false;
        }
        
       
    //place into new position-------------------------------
        if($proc_direction === "up"){
            //update nnr's previous ID to this_recordID
            $NNR_where_this_next_record = get_recordID_where_next_recordID($proc_tableID, $proc_new_next_recordID);
           if($NNR_where_this_next_record !== 0){
              $ret->next_record_if_NNR_is_NR = $NNR_where_this_next_record;
                //update this_recordID's next_recordID to the incoming new_next_recordID
                $set_new_pos = set_record_position($NNR_where_this_next_record,$proc_recordID,$proc_tableID);
                 if($set_new_pos === true){
                        $ret->nnr_previous_set = true;
                    }            
            }
            else{
                $ret->next_record_if_NNR_is_NR = false;
            }
            //set this records nr to nnr
            $set_new_pos2 = set_record_position($proc_recordID,$proc_new_next_recordID,$proc_tableID);
            if($set_new_pos2 === true){
                $ret->this_records_nnr_set = true;
            }

            //check if record replaces head record-----------------------
            //if yes
            $is_old_record_head = is_record_head($proc_new_next_recordID, $proc_tableID);
            if ($is_old_record_head === true) {
                //then need to link new head: get the next_recordID from proc_recordID and 
                //place it as the new head
               $ret->is_this_head = true;
            
                $set_the_head = set_record_as_head($proc_recordID, $proc_tableID);

                if ($set_the_head === true) {
                    $ret->set_new_head_result = true;
                }
            }
           
        }

        if($proc_direction === "down"){
            //check if record was head record-----------------------
            //if yes it was head 
            $is_old_record_head = is_record_head($proc_recordID, $proc_tableID);
            if ($is_old_record_head === true) {
                //then need to link new head: get the next_recordID from proc_recordID and 
                //place it as the new head
               $ret->is_this_head = true;
            
                $set_the_head = set_record_as_head($this_records_next_record, $proc_tableID);

                if ($set_the_head === true) {
                    $ret->set_new_head_result = true;
                }
            }

            //update nnr's next recordID
            $NNR_where_this_next_record = get_next_recordID($proc_tableID, $proc_new_next_recordID);
           if($NNR_where_this_next_record !== 0){
              $ret->next_record_if_NNR_is_NR = $NNR_where_this_next_record;
                //update this_recordID's next_recordID to the incoming new_next_recordID
                $set_new_pos = set_record_position($proc_recordID,$NNR_where_this_next_record,$proc_tableID);
                 if($set_new_pos === true){
                        $ret->nnr_next_set = true;
                    }            
            }
            else{
                $ret->next_record_if_NNR_is_NR = false;
            }
            //set nnr nr to this record
            $set_new_pos2 = set_record_position($proc_new_next_recordID,$proc_recordID,$proc_tableID);
            if($set_new_pos2 === true){
                $ret->this_records_nnr_set = true;
            }

            //check if this record's next record is null (if this record is new tail)
            $this_record_tail_check = get_next_recordID($proc_tableID, $proc_recordID);
            if($this_record_tail_check == NULL){
                 //set new tail as R
                $set_the_tail1 = set_record_as_tail($proc_recordID, $proc_tableID);
                if ($set_the_tail1 === true) {
                    $ret->is_now_tail_SWAP = true;
                }
                else{
                    $ret->is_now_tail_SWAP = false;
                }
            }
        }
        */
    //TEMP
    $q = true;
    
    if ($q === true) {
        $ret->result = "true";
    } else {
        $ret->result = false;
    }
    //return $output;
    return $ret;
}

function delete_record($obj) {
    $recordID_input = (int) $obj->recordID;
    $tableID_input = (int) $obj->tableID;
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();

    //IS IT THE HEAD RECORD
    $is_this_the_head = is_record_head($recordID_input, $tableID_input);
    if ($is_this_the_head === true) {
        //extra handling
        $ret->this_head = true;
        $next_recordID2 = get_next_recordID($tableID_input, $recordID_input);
        $q4 = set_record_as_head($next_recordID2, $tableID_input);
        if ($q4 === true) {
            $ret->head_swap = true;
        }
    } else {
        $ret->this_head = false;
    }
    //IS IT THE tail RECORD
    $is_this_the_tail = is_record_tail($recordID_input, $tableID_input);
    if ($is_this_the_tail === true) {
        //extra handling
        $ret->this_tail = true;
        $next_recordID23 = get_recordID_where_next_recordID($tableID_input, $recordID_input);
        $q4 = set_record_as_tail($next_recordID23, $tableID_input);
        if ($q4 === true) {
            $ret->tail_swap = true;
        }
    } else {
        $ret->this_tail = false;
    }

    //HANDLE IF ITS BOTH HEAD AND TAIL (ONLY RECORD IN TABLE)
    if ($is_this_the_tail === true && $is_this_the_head === true) {
        $q34 = set_record_as_tail(0, $tableID_input);
        if ($q34 === true) {
            $ret->tail_swap_OVERRIDE = true;
        }
        $q33 = set_record_as_head(0, $tableID_input);
        if ($q33 === true) {
            $ret->head_swap_OVERRIDE = true;
        }
    }

    //FIND IF recordID_input = any NEXT_RECORDID, change it to be what this record's next_recordID is
    //    get_recordID_where_next_recordID($tableID, $next_recordID)
    $other_recordID = get_recordID_where_next_recordID($tableID_input, $recordID_input);
    if ($other_recordID !== 0) {
        $ret->result1 = true;
        $next_recordID = get_next_recordID($tableID_input, $recordID_input);
        if ($next_recordID !== 0) {
            $ret->result2 = true;
            //    set_record_position($recordID, $next_recordID, $tableID);
            $change_ID = set_record_position($other_recordID, $next_recordID, $tableID_input);
            if ($change_ID === true) {
                $ret->result3 = true;
            }
        }
    }

    //NOW DELETE THE RECORD
    $q = mysqli_query($dbc, "DELETE FROM tsbp_records WHERE recordID = '$recordID_input'");
    if ($q === true) {
        $ret->recordID_delete = $recordID_input;
        $ret->tableID = $tableID_input;
        $ret->result = true;
    } else {
        $ret->result = false;
    }
    //return $output;
    return $ret;
}

function launch_email() {
    $dirrrrr = "../../../../wp-load.php";
    include($dirrrrr);

    $to = "austin@thesmallbusinessplatform.com,seth@thesmallbusinessplatform.com,7018332875@vtext.com,3035477170@vtext.com";
    $subject = "EJTT";
    $message = "Message sent from system.";
    $messag2 = get_table("1");
    $testmessage = json_encode($messag2);
    if (wp_mail($to, $subject, $testmessage)) {
        return "good";
    } else {
        return "fail";
    }
//echo getcwd();
}

function get_FKdata($tableID, $recordID, $identifier){
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    
    $proc_tableID = $tableID;
    $proc_recordID = $recordID;

    $q = mysqli_query($dbc, "SELECT * FROM tsbp_tables tt, tsbp_records tr WHERE tt.tableID = '$proc_tableID' AND tt.tableID = tr.tableID");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->recordID = $qw["recordID"];
            $ret->$x->next_recordID = $qw["next_recordID"];
            $ret->$x->prev_versionID = $qw["prev_versionID"];
            $ret->$x->timestamp = $qw["timestamp"];
            $ret->$x->authorID = $qw["authorID"];
            $ret->$x->content_object = json_decode($qw["content_object"]);
            $ret->$x->tableID = $qw["tableID"];
            $x++;
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    return $ret;
}

/* * ***** BEGIN DELETE THESE ****** */

function get_records_by_group($record_groupID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_record_groupID = $record_groupID;
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_record_groups trg, tsbp_record_to_group trtg, tsbp_records tr WHERE trg.record_groupID = '$proc_record_groupID' AND trg.record_groupID = trtg.record_groupID AND trtg.recordID = tr.recordID");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->record_groupID = $qw["record_groupID"];
            $ret->$x->recordID = $qw["recordID"];
            $x++;
        }
    } else {
        $ret->result = "no records";
    }
    //return $output;
    return $ret;
}

function get_record_groups_by_screen($screenID) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $proc_screenID = $screenID;
    $q = mysqli_query($dbc, "SELECT * FROM tsbp_screens ts, tsbp_record_groups trg, tsbp_record_groups_to_screen trgs WHERE ts.screenID = '$proc_screenID' AND ts.screenID = trgs.screenID AND trg.record_groupID = trgs.record_groupID AND trg.record_groupID = trgs.record_groupID ORDER BY trgs.prev_record_groupID ASC");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        while ($qw = mysqli_fetch_assoc($q)) {
            $ret->$x = new stdClass();
            $ret->$x->record_groupID = $qw["record_groupID"];
            $ret->$x->prev_record_groupID = $qw["prev_record_groupID"];
            $ret->$x->record_group_slug = $qw["record_group_slug"];
            $ret->$x->record_group_alias = $qw["record_group_alias"];
            $ret->$x->color = $qw["color"];
            $ret->$x->description = $qw["description"];
            $ret->$x->default_display = $qw["default_display"];

            $x++;
        }
    } else {
        $ret->result = "no records";
    }
    //return $output;
    return $ret;
}

/* * ******** END OF DELETIONS************************************************************* */

///////////////////////////////////////////////////////OLD STUFF BELOW
function get_columns($table_name) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $output = "";
    $tab = (String) ("tsbp_" . $table_name);
    $p = "";

    $q = mysqli_query($dbc, "SELECT * FROM $tab");

    while ($fieldinfo = mysqli_fetch_field($q)) {
        $p = $table_name . "-" . $fieldinfo->name;
        $output .= "<div class='columnWR " . $p . "'>";
        $output .= "<span class='column-name column-" . $p . "'>" . $fieldinfo->name . "</span>";
        $output .= "<span class='col-buttons'><span id='cedit-" . $p . "'><a href='javascript:edit_column(\"" . $table_name . "\",\"" . $fieldinfo->name . "\")'>Edit</a></span> ";
        $output .= "<span id='cdel-" . $p . "'><a href='javascript:column_del(\"" . $p . "\")'>Delete</a></span></span>";
        $output .= "</div>";
    }
    //$output .= "<div class='addnew' id='addnew_" . $table_name . "'><a href='javascript:add_new_column(\"" . $table_name . "\");'>+ Add New Column</a></div>";
    //return $ret;
    return $output;
}

function get_data($table_name) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $output = "";
    $tab = (String) ("" . $table_name);
    $ret->data = new stdClass();
    $dx = 0;
    $cols = array();
    //$ret = $tab;
    //get columns here
    $columns = get_columns($table_name);
    if (is_object($columns)) {
        //$output .= "xxxxxxx";
        foreach ($columns as $single) {
            if (is_object($single)) {
                //$ret->data->$dx = new stdClass();
                foreach ($single as $key => $value) {
                    $output .= $key . ":" . $value;
                    array_push($cols, $value);
                    //$ret->data->$key = $value;
                }
            }

            $output .= "<BR>";
        }
    }
    $q = mysqli_query($dbc, "SELECT * FROM $tab");
    $q1 = mysqli_num_rows($q);
    if ($q1 > 0) {
        $output .= "<ul>";
        $x11 = 0;
        $qw = mysqli_fetch_assoc($q);
        foreach ($qw as $key => $value) {
            $output .= "<li><strong>$key:</strong>$value</li>";
            $ret->data->$x11->$key = $value;
            $x11++;
        }
        $output .= "</ul>";
    } else {
        //$ret = "{}";
    }
    return $ret;
    //return $output;
}

function create_table($table_name) {
    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $output = "";

    $tab = (String) ("tsbp_" . $table_name);
    $sql = "CREATE TABLE $tab (
ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
first_column VARCHAR(30) NOT NULL
)";
    $sql2 = "INSERT INTO tsbp_tables (tableID, table_name, auths) VALUES ('','" . $tab . "','{\"level\":\"all\"}')";
    if ($dbc->query($sql) === TRUE) {
        $output = "Table $tab created successfully!";
    } else {
        $output = "Error creating table: " . $dbc->error;
    }
    return $ret;
    //return $output;
}
