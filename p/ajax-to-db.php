<?php
//LINK THE TABLES TO THE IDS
$recordID_arrayTables = array("tsbp_people", "tsbp_jobs");
$recordID_arrayPks = array("peopleID", "jobID");

$ts = gmdate("D, d M Y H:i:s") . " GMT";
//header("Expires: $ts");
//header("Last-Modified: $ts");
//header("Pragma: no-cache");
//header("Cache-Control: no-cache, must-revalidate");

//defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/*
define('DBNAME', 'smallbus_wp');
define('DBUSER', 'smallbus_wp');
define('DBPW', '0yT9VgYHFGmA');


define('DBNAME', 'bitnami_wordpress');
define('DBUSER', 'bn_wordpress');
define('DBPW', 'f30215f605');

define('DBHOST', 'localhost:3306');
*/
/** Database Charset to use in creating database tables. */
//define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
//define('DB_COLLATE', '');
//$connection = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);

/* MySQL settings */
define( 'DBNAME', 'sethh_wp2' );

/** MySQL database username */
define( 'DBUSER', 'sethh_wp2' );

/** MySQL database password */
define( 'DBPW', 'q0zTTphh83zS' );

/** MySQL hostname */
define( 'DBHOST', 'localhost' );

/** Database Charset to use in creating database tables. */
//define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
//define( 'DB_COLLATE', '' );

$passobj = new stdClass();
/*
$con = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);

// Check connection
if (!$con) {
    echo "Failed to connect to DB: " . mysqli_connect_error();
    exit();
}*/

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
    $querspec = array('_');
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
            if ($method[$i] == "h") {
                $keep = array_merge($keep, $querspec);
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
if ($obj && $obj->action == "set_object") {

    $screens = set_object($obj);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_table") {
    $this_tableID = (int) $obj->tableID;
    $this_table_target = $obj->table_target;
    $tabID = (int) $obj->tabID;
    $subtabID = (int) $obj->subtabID;
    $screens = get_table($this_tableID, $this_table_target, $tabID, $subtabID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_tables") {
  $screens = get_tables();
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}

if ($obj && $obj->action == "get_tabs") {
  $screens = get_tabs();
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
    $this_tableID = (int)$obj->tableID;
    $this_tabID = (int)$obj->tabID;
    $this_subtabID = (int)$obj->subtabID;

    $screens = get_records_by_table($this_tableID, $this_tabID, $this_subtabID);
    $output1 = json_encode($screens);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_record_groups_by_table") {
    $this_tableID = (int) $obj->tableID;
    $this_tabID = (int) $obj->tabID;

    $groups = get_record_groups_by_table($this_tableID);
    $output1 = json_encode($groups);
    echo $output1;
    exit();
}

if ($obj && $obj->action == "get_record_groups") {

    $screens = get_record_groups();
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

if ($obj && $obj->action == "set_table_setting") {
  $this_tableID = (int) $obj->tableID;

  $screens = set_table_setting($obj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}

if ($obj && $obj->action == "set_tab_setting") {
  $this_tableID = (int) $obj->tableID;

  $screens = set_tab_setting($obj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}

if ($obj && $obj->action == "del_tab_setting") {
  $this_tableID = (int) $obj->tableID;

  $screens = del_tab_setting($obj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}
if ($obj && $obj->action == "del_subtab") {
  $this_tabID = (int) $obj->tabID;
  $this_subtabID = (int) $obj->subtabID;

  $screens = del_subtab($obj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}
if ($obj && $obj->action == "checksum") {
  $this_tableID = (int) $obj->tableID;
  $sendobj = new stdClass();
  $sendobj->tableID = $this_tableID;
  $screens = checksum_table($sendobj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}
if ($obj && $obj->action == "checksum_match") {
  $this_tableID = (int) $obj->tableID;
  $this_checksum = (int) $obj->checksum;
  $sendobj = new stdClass();
  $sendobj->tableID = $this_tableID;
  $sendobj->checksum = $this_checksum;
  $screens = checksum_table_compare($sendobj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}
if ($obj && $obj->action == "set_table") {
  
  $screens = set_table($obj);
  //$screens->test1 = "HELLO! " . $this_recordID;
  $output1 = json_encode($screens);
  echo $output1;
  exit();
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// END OF EXPRESS LOGIC, NOW THE FUNCTIONS
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function get_tabs(){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tsbp_tabs = $wpdb->prefix . 'tsbp_tabs';
  $ret = new stdClass();
  $output = "";

  $result = $wpdb->get_results("SELECT * FROM $tsbp_tabs");
  $xy = 0;
  $x = 0;
  foreach ( $result as $page1 ) { $xy++; }
  if ($xy > 0) {
    //yes there are results
      foreach ($result as $page) {
          $ret->$x = new stdClass();
          $ret->$x->tabID = $page->tabID;
          $ret->$x->tab_alias = $page->tab_alias;
          $ret->$x->tab_slug = $page->tab_slug;
          $ret->$x->tab_filter = $page->tab_filter;
          $ret->$x->tab_icon = $page->tab_icon;
          $ret->$x->tab_type = $page->tab_type;
          //$ret->$x->tab_subtabs = json_decode(stripslashes($page->tab_subtabs));
          $ret->$x->tab_subtabs = get_tabs_subtabs_obj($page->tabID);

          $ret->$x->tab_auths = json_decode(stripslashes($page->tab_auths));
          $x++;
      }
  }
  else {
        $ret->result = "no_records";
        //$ret->tableID = $ttable;
      }

  return $ret;

}

function get_tabs_subtabs_obj($tabID){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;
  global $recordID_arrayTables;
  global $recordID_arrayPks;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tsbp_tabs_subtabs = $wpdb->prefix . 'tsbp_tabs_subtabs';
  $ret = new stdClass();
  $output = "";
  $tabID1 = (int)$tabID;

  $result = $wpdb->get_results("SELECT * FROM $tsbp_tabs_subtabs WHERE tabID = '$tabID1'");
  $xy = 0;
  $x = 0;
  foreach ( $result as $page1 ) { $xy++; }
  if ($xy > 0) {
    //yes there are results
      foreach ($result as $page) {
          $ret->$x = new stdClass();
          $ret->$x->subtabID = $page->subtabID;
          $ret->$x->tabID = $page->tabID;
          $ret->$x->subtab_type = $page->subtab_type;
          $ret->$x->subtab_title = $page->subtab_title;
          $ret->$x->subtab_icon = $page->subtab_icon;
          $ret->$x->subtab_filter  = $page->subtab_filter ;
          $ret->$x->subtab_tableID  = $page->subtab_tableID ;
          $ret->$x->subtab_auths = json_decode(stripslashes($page->subtab_auths));
          $x++;
      }
  } 
  else {
        $ret->result = "no_subtabs";
        $ret->tabID = $tabID1;
      }
  //return $output;
  return $ret;

}

function get_tables(){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;
  global $recordID_arrayTables;
  global $recordID_arrayPks;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $ret = new stdClass();
  $output = "";

  $result = $wpdb->get_results("SELECT * FROM $tsbp_tables");
  $xy = 0;
  $x = 0;
  foreach ( $result as $page1 ) { $xy++; }
  if ($xy > 0) {
    //yes there are results
      foreach ($result as $page) {
          $ret->$x = new stdClass();
          $ret->$x->tableID = $page->tableID;
          $ret->$x->table_slug = $page->table_slug;
          $ret->$x->table_alias = $page->table_alias;
          $ret->$x->table_icon = $page->table_icon;
          $ret->$x->created_timestamp = $page->created_timestamp;
          $ret->$x->authorID = $page->authorID;
          $ret->$x->settings_object = json_decode(stripslashes($page->settings_object));
          $ret->$x->table_target = filter($table_target,"acg");
          $x++;
      }
  } 
  else {
        $ret->result = "no_records";
        $ret->tableID = $ttable;
      }
  //return $output;
  $ret->action = "get_tables";
  return $ret;

}

function set_table($obj){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array("table_slug", "table_alias", "table_icon", "created_timestamp", "authorID","sub_tabs_object","settings_object");
  global $wpdb;
  global $user_login, $user_email;
  global $recordID_arrayTables;
  global $recordID_arrayPks;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $tableID = (int)$obj->tableID;
  $cc = 1;

  $insert_query = "";
  $insert_query_col = "";
  $insert_query_val = "";

  $update_query = "";
  $update_query_col = "";
  $update_query_val = "";

  $ret = new stdClass();
  $output = "";
  $isnew = true;
  if($obj->tableID == "N"){ $isnew = true; }
  else{ $isnew = false; }

  //GET THE COLUMNS
  $checkcc = count($check_these);
  $subtractx = 0;
  for($a = 0; $a < $checkcc; $a++){
    $thiscol = $check_these[$a];
    if(isset($obj->$thiscol) && $obj->$thiscol !== "" && $thiscol !== "tableID"){ //SKIP EMPTY, SKIP TABLEID
      
      $insert_query_col .= $check_these[$a]."";
      //////////////////////////////////////////////////////////////////////////////////////////
      //HANDLE DIFFERENT FOR OBJECTS, CALL OBJECTS DIRECTLY
      if($thiscol == "settings_object"){
        $update_query_col .= $check_these[$a]."='".stripslashes($obj->$thiscol)."'";
        $insert_query_val .= "'".stripslashes($obj->$thiscol)."'";
      }
      else{
        $update_query_col .= $check_these[$a]."='".stripslashes($obj->$thiscol)."'";
        $insert_query_val .= "'".stripslashes($obj->$thiscol)."'";
      }
      //$update_query_val .= "".$obj->$check_these[$a]."";
      //$insert_query_val .= "****cc:" .$cc . " = checkcc-subtractx:" .($checkcc-1). "****";
      //if($cc !== ($checkcc-1)){
        $insert_query_col .= ", ";
        $update_query_col .= ", ";
        $insert_query_val .= ", ";
        //$update_query_val .= ",";
      //}
      $cc++;
    }
    else{
      //$subtractx++;
    }
  }
  //TRIM THE QUERYS
  $insert_query_col = trim($insert_query_col);
  $update_query_col = trim($update_query_col);
  $insert_query_val = trim($insert_query_val);

  //REMOVE FINAL COMMA
  if (substr($insert_query_col, -1, 1) == ','){
    $insert_query_col = substr($insert_query_col, 0, -1);
  }
  if (substr($update_query_col, -1, 1) == ','){
    $update_query_col = substr($update_query_col, 0, -1);
  }
  if (substr($insert_query_val, -1, 1) == ','){
    $insert_query_val = substr($insert_query_val, 0, -1);
  }


  $insert_query = "INSERT INTO " . $tsbp_tables  ." (". $insert_query_col . ") VALUES (" .$insert_query_val. ")";
  $update_query = "UPDATE " . $tsbp_tables . " SET " . $update_query_col ." WHERE tableID = '$tableID'";



  $query1 = "SELECT * FROM $tsbp_tables WHERE tableID = '$tableID'";
  $ret->QUERY = $query1;
  $ret->UPDATE_QUERY = $update_query;
  $ret->INSERT_QUERY = $insert_query;
  $result = $wpdb->get_results($query1);
  $xy = 0;
  $x = 0;
  foreach ( $result as $page1 ) { $xy++; }

  if ($xy > 0) {
      //yes there are results
      $ret->mode = "update";
      $update_result = $wpdb->get_results($update_query);
      
  } 
  else {
      $ret->mode = "insert";
      $ret->tableID = $ttable;
      $insert_result = $wpdb->get_results($insert_query);
      }
  //return $output;
  $ret->action = "set_table";
  
  $ret->rows_affected = $wpdb->rows_affected;

  return $ret;

}

function remove_object($objID) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $objectID = (int)$objID;
  $tsbp_objects = $wpdb->prefix . 'tsbp_objects';
    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
  $ret = new stdClass();
  $wpdb->query("DELETE FROM $tsbp_objects WHERE objectID = '$objectID'");
  $ret->qu = $wpdb->rows_affected;
  $ret->objectID = $objectID;
  return $ret;
}

function set_record_content($obj) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;
  global $recordID_arrayTables;
  global $recordID_arrayPks;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $recordID = null;
  $ret = false;
  $skip = false;
  $table_target = (isset($obj->table_target)) ? $obj->table_target : "";
  $set_statement = "SET ";
  $created_timestamp = time();
  $insert_statement = "(";
  $insert_statement_val = "(";
  if(isset($obj->recordID)){
    $recordID = $obj->recordID;
  }
  $recordID_callout = "";

  //window action
  if( isset( $obj->window_action )){ $ret->window_action = $obj->window_action; }
  if( isset( $obj->table_target )){ $ret->table_target = $obj->table_target; }

  //TEMPORARY RETURN OBJECT FOR DEBUGGING
  $ret->RET = new stdClass();

  $tableID_in = "";
  $wptable = "";
  if($obj->tableID){ (int)$tableID_in = $obj->tableID; }
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $ret->RET->tsbp_tables = $tsbp_tables;

  //GET TABLE COLUMN SLUGS for tableID
  //SELECT * FROM wp_tsbp_tables WHERE tableID = $tableID_in
  $query1 = "SELECT * FROM $tsbp_tables WHERE tableID = '$tableID_in'";
  $ret->RET->query1 = $query1;
  $query1_res = $wpdb->get_results($query1);
  foreach ( $query1_res as $page ) {
    $table_slug2 = (String)$page->table_slug;
    $table_slug4 = $wpdb->prefix . $table_slug2;
    $tsbp_settings_object = JSON_decode($page->settings_object);
    $ret->RET->settings_object = $tsbp_settings_object;
  }
  //grab ID
  $rec_tab_arr_c = count($recordID_arrayTables);
  for($t = 0; $t<$rec_tab_arr_c ;$t++){
    if($recordID_arrayTables[$t] == "$table_slug2"){
      $record_callout = $recordID_arrayPks[$t];
    }
  }

  if($tsbp_settings_object->header_columns){
    foreach($tsbp_settings_object->header_columns as $col_item){
      array_push($check_these, $col_item->column_slug);
    }
  }
  if($tsbp_settings_object->content_columns){
    foreach($tsbp_settings_object->content_columns as $col_item){
      array_push($check_these, $col_item->column_slug);
    }
  }

  $ret->check_these = $check_these;

  //for each column slugs
  //add to $check_these array each column slug
  //column slugs > add to check_these array
  //table slug
  //$tsbp_tables = $wpdb->prefix . 'tsbp_objects';
  //CREATE THE SET STATEMENT FOR QUERY
  //$check_these = array("peopleID","people_type","business_name", "address1", "city", "first_name", "last_name");
  ///////////////////splitting 3/21/2020
  $check_these_c = count($check_these);
  $ctemp = "";
  $cmatch_array = array();
  $cmatch_vals = array();
  //sort through $check_these to find whats included in $obj
  foreach($check_these as $check_single){
    //if THIS isset in obj
    if(isset($obj->content_object->$check_single)){
      if($check_single == $recordID_callout){ $recordID = $obj->content_object->$check_single; }
      //it does exist in obj
      //add to array
      array_push($cmatch_array, $check_single);
      array_push($cmatch_vals, $obj->content_object->$check_single);
      //$cmatch_array[$check_these[$x]] = filter($obj->$check_these[$x],"ach");
    }
  }

  $cc = 0;
  foreach($cmatch_array as $tempp){
    $cc++;
  }
  //$cc = count($cmatch_array);
  for($x = 0; $x < $cc; $x++){
    $skip = true;
    if($cmatch_array[$x] != $recordID_callout){
      $skip = false;
      $set_statement .= $cmatch_array[$x] . "  = '" . $cmatch_vals[$x] . "'";
    }
    $insert_statement .= $cmatch_array[$x]. "";
    if($cmatch_array[$x] == "authorID"){ $insert_statement_val .= "'" . $user_info->ID . "'"; }
    elseif($cmatch_array[$x] == "created_timestamp"){ $insert_statement_val .= "'" . $created_timestamp . "'"; }
    else { $insert_statement_val .= "'".$cmatch_vals[$x]."'"; }

    //HANDLE THE COMMAS IN THE STATEMENTS
    $xx = ($x + 1);
    if($xx != $cc){
      if($skip == false){
        $set_statement .= ", ";
      }
      $insert_statement .= ", ";
      $insert_statement_val .= ", ";
    }
    else{
      $set_statement .= " ";
      $insert_statement .= " ";
      $insert_statement_val .= " ";
    }
  }

  $insert_statement .= ")";
  $insert_statement_val .= ")";

    $timest = time();

    if($recordID != "N"){
      //is not new
      $wpdb->query("UPDATE $table_slug4 $set_statement WHERE $record_callout = '$recordID'");
      $o = "update";
      $aaaa = "UPDATE $table_slug4 $set_statement WHERE $record_callout = '$recordID'";
      $created_timestamp = $obj->created_timestamp;
      $ret->update_query = $aaaa;
    }
    else{
      //is new
      $wpdb->query("INSERT INTO $table_slug4 $insert_statement VALUES $insert_statement_val");
      $ttt = "INSERT INTO $table_slug4 $insert_statement VALUES $insert_statement_val";
      //GET THE OBJECTID!
      $ret->was_new_record = "true";
      $recordID = (String)$wpdb->insert_id;
      $o = "insert";
      $ret->insert_query = $ttt;
    }

    $ret->query_type = $o;

    //$q = mysqli_query($dbc, "UPDATE $tsbp_objects ");
    //$wpdb->query("UPDATE $tsbp_objects SET column_slug = '$object_slug', column_alias = '$object_alias', settings_object = '$object_sett'");

    if ($wpdb->rows_affected != 0) {
        $ret->result = "true";
    } else {
        $ret->result = "false";
    }

    $subtab = (isset($obj->subtabview)) ? $obj->subtabview : "none";
    //$obj->subtab
    if($subtab !== "none"){
      $ret->_subtab = true;
      $ret->subtabview = $subtab;
    }
    //_data
    //_metrics
    //_graphs
    //_reports
    //_documents

    $authorID = (String)$user_info->ID;
    //$table_target = (String)$table_slug2 . "_data";
    //$table_target = (String)$table_target;

    $ret->$record_callout = $recordID;
    $ret->_rows_affected = $wpdb->rows_affected;
    $ret->_set_statement = $set_statement;
    $ret->authorID = $authorID;
    $ret->recordID = $recordID;
    $ret->tableID = $tableID_in;
    $ret->table_target = $table_target;

    $ret->created_timestamp = $created_timestamp;

    return $ret;
}

function get_table($tableID, $table_target, $tabID1, $subtabID1){
    //GET TABLE META DATA
    //NOT THE COLUMNS!
    //NOT THE RECORDS!
    $dirrrrr = "../../../../wp-load.php";
    $jj = require_once($dirrrrr);

    global $wpdb;
    global $user_login, $user_email;
    get_currentuserinfo();
    $current_user = wp_get_current_user();
    $user_info = new stdClass();
    $user_info = get_userdata($current_user->ID);
    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $ttable = (int)filter($tableID,"c");
    $subtabID = (int)filter($subtabID1,"c");
    $tabID = (int)filter($tabID1,"c");
    $output = "";
    $tsbp_tables = $wpdb->prefix . 'tsbp_tables';

    //$q = mysqli_query($dbc, "SELECT * FROM tsbp_tables WHERE tableID = '$ttable' LIMIT 1");
    $result = $wpdb->get_results("SELECT * FROM $tsbp_tables WHERE tableID = '$ttable' LIMIT 1");
    //$result = $wpdb->get_results("SELECT * FROM tsbp_tables WHERE tableID = '$ttable' LIMIT 1");
    //$q1 = mysqli_num_rows($q);
    $xy = 0;
    //count
    foreach ( $result as $page1 ) { $xy++; }
    if ($xy > 0) {
      //yes there are results
        foreach ($result as $page) {
            $ret= new stdClass();
            $ret->tableID = $page->tableID;
            $ret->table_slug = $page->table_slug;
            $ret->table_alias = $page->table_alias;
            $ret->table_icon = $page->table_icon;
            $ret->created_timestamp = $page->created_timestamp;
            $ret->authorID = $page->authorID;
            $ret->settings_object = json_decode(stripslashes($page->settings_object));
            $ret->table_target = filter($table_target,"acg");
        }
    } else {
        $ret->result = "no_records";
        $ret->tableID = $ttable;
    }

    //return $output;
    $ret->tabID = $tabID;
    $ret->subtabID = $subtabID;
    $ret->action = "get_table";
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

function get_columns_by_table($tableID) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $proc_tableID = (int)filter($tableID,"c");
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';

    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $ret->timestamp1 = date("F Y h:i:s A");
    $ret->tableID = $proc_tableID;
    $ret->columns = new stdClass();
    $result = $wpdb->get_results("SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID'");
    //$result = $wpdb->get_results("SHOW columns FROM '$proc_tableID'");

    $xy = 0;
    //count
    foreach ( $result as $page1 ) { $xy++; }
    if ($xy > 0) {
         foreach ( $result as $page ) {
          $yy = 0;
          $this_table_slug = $wpdb->prefix . filter($page->table_slug,"ach");
          //$this_col = $page;
          //$ret->columns->$x = $page->Field;
          //$x++;

          //$ret->A_table_slug = $this_table_slug;
            //get the table indicated in the table_slug
            $prepared_statement = $wpdb->get_results( "SHOW COLUMNS FROM $this_table_slug" );
            //$prepared_statement = $wpdb->get_results( "SELECT * FROM $this_table_slug" );
            //$result2 = $wpdb->get_col( $prepared_statement );
            //$result2 = $wpdb->get_col("SELECT * FROM $this_table_slug");
            //foreach ( $resultF as $page12 ) { $xyz++; }
                //$ret->A_columns = $prepared_statement;
                foreach ( $prepared_statement as $page12 ) {
                    //$p = $table_name . "-" . $fieldinfo->name;
                    $this_column = $page12->Field;
                    $ret->columns->$x = $this_column;
                    $x++;
                }
            //$ret->collumns->$x = "tableID";

        }
    } else {
        $ret->result = "no_table";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    return $ret;
}

function get_records_by_table($tableID, $tabID, $subtabID) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  //    $dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $placer = "";
    //    $proc_tableID = $tableID;
    $proc_tableID = (int)filter($tableID,"c");
    ////////////////////////////NEED TABID!!!
    $proc_tabID = (int)filter($tabID,"c");
    $proc_subtabID = (int)filter($subtabID,"c");
    //////////////////////////////////////////
    $ret->timestamp1 = date("F Y h:i:s A");

    $the_columns = get_columns_by_table($tableID);
    $ret->columns = $the_columns->columns;
    $ret->tableID = $proc_tableID;
    $ret->tabID = $proc_tabID;
    $ret->subtabID = $proc_subtabID;
    $ret->start = "start";

    $result = $wpdb->get_results("SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID' LIMIT 1");

    //$q = mysqli_query($dbc, "SELECT * FROM tsbp_tables tt WHERE tt.tableID = '$proc_tableID' LIMIT 1");
    $xy = 0;
    //count
    foreach ( $result as $page1 ) { $xy++; }
    if ($xy > 0) {
      foreach ( $result as $page ) {
       $yy = 0;
       $this_table_slug = $wpdb->prefix . filter($page->table_slug,"ach");
            //get the table indicated in the table_slug
            //$count = 0;
            //foreach ($the_columns as $key => $value) {

            //}
            if(is_object($the_columns) && is_object($the_columns->columns)){
                //$placer .= "(";
                foreach ($the_columns->columns as $single) {
                    $placer .= $single.",";
                }
                //remove last comma from $placer
                $placer = substr($placer,0,-1);
                //$placer .= ")";

                $write_query = "SELECT $placer FROM $this_table_slug";
                //$ret->write_query = $write_query;
                //$q1 = mysqli_query($dbc, $write_query);
                $ret->TEMPQ = $write_query;
                $result4 = $wpdb->get_results($write_query);

                //while($q2 = mysqli_fetch_assoc($q1)){
                foreach ( $result4 as $page4 ) {
                    //SORT THROUGH EACH COLUMN AND GRAB ITS VALUE FROM THE DATABASE
                    foreach ($the_columns->columns as $single) {
                        $ret->data->$x->$single = $page4->$single;
                    }
                    $x++;
                }
            }
        }
        $ret->result = "true";
    } else {
        $ret->result = "no_records";
        $ret->tableID = $proc_tableID;
    }
    //return $output;
    $ret->end = "end";
    return $ret;
}

function get_record_groups() {
    //global $user_login, $user_email;
    //get_currentuserinfo();
    //$current_user = wp_get_current_user();

    //$user_info = new stdClass();
    //$user_info = get_userdata($current_user->ID);
    /****************TO DISPLAY USER INFORMATION**********************/
    //$temp_ret->username = '' . $user_info->user_login;
    //$temp_ret->user_roles = '' . implode(', ', $user_info->roles) . "";
    //$temp_ret->userID = '' . $user_info->ID . "";
    //$temp_ret->user_login = "" . $current_user->user_login . "";
    /*****************************************************************/
    $dirrrrr = "../../../../wp-load.php";
    $jj = require_once($dirrrrr);

    global $wpdb;
    global $user_login, $user_email;
    get_currentuserinfo();
    $current_user = wp_get_current_user();
    $user_info = new stdClass();
    $user_info = get_userdata($current_user->ID);
    $tsbp_record_groups = $wpdb->prefix . 'tsbp_record_groups';
    ///////////////////////////////////////////////////
    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
    $ret = new stdClass();
    $x = 0;
    $x5 = 0;
    //$q = mysqli_query($dbc, "SELECT * FROM tsbp_record_groups ");
    //$q1 = mysqli_num_rows($q);

    $result = $wpdb->get_results("SELECT * FROM $tsbp_record_groups ");
    //$result = $wpdb->get_results("SHOW columns FROM '$proc_tableID'");

    $xy = 0;
    //count
    foreach ( $result as $page1 ) { $xy++; }
    if ($xy > 0) {
    //if ($q1 > 0) {
        $ret->record_groups = new stdClass();
        foreach ( $result as $page ) {
        //while ($qw = mysqli_fetch_assoc($q)) {
            $ret->record_groups->$x = new stdClass();
            $ret->record_groups->$x->record_groupID = $page->record_groupID;
            $ret->record_groups->$x->record_group_slug = $page->record_group_slug;
            $ret->record_groups->$x->record_group_alias = $page->record_group_alias;
            $ret->record_groups->$x->rgb_color = $page->rgb_color;
            $ret->record_groups->$x->description = $page->description;
            $ret->record_groups->$x->default_display = $page->default_display;
            $ret->record_groups->$x->tableID = $page->tableID;
            $x++;
        }
    } else {
        $ret->result = "no_records";
    }
    /*
    $q5 = mysqli_query($dbc, "SELECT * FROM tsbp_userorder WHERE userID = '$temp_ret->userID'");
    $q15 = mysqli_num_rows($q5);
    if ($q15 > 0) {
        $ret->userorder = new stdClass();
        while ($qw = mysqli_fetch_assoc($q5)) {
            $ret->userorder->$x5 = new stdClass();
            $ret->userorder->$x5->userID = $qw["userID"];
            $ret->userorder->$x5->tableID = $qw["tableID"];
            $ret->userorder->$x5->order_obj = json_decode($qw["order_obj"]);
            $x5++;
        }
    } else {
        $ret->result = "no_records";
    }
    */
    //return $output;
    return $ret;
}

function delete_record($obj) {
    $jj = require_once("../../../../wp-load.php");
    global $wpdb;
    global $user_login, $user_email;
    global $recordID_arrayTables;
    global $recordID_arrayPks;
    $recordID_input = (int)$obj->recordID;
    $tableID_input = (int)$obj->tableID;
    $tableID_load = "";
    $table_slug_load = "";
    $record_callout = "";
    $table_slug_base = "";

    get_currentuserinfo();
    $current_user = wp_get_current_user();
    $user_info = new stdClass();
    $user_info = get_userdata($current_user->ID);
    $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
    $ret = new stdClass();
    $x = 0;
    $x5 = 0;
    //GET TABLE SLUG
    $table_result = $wpdb->get_results("SELECT * FROM $tsbp_tables WHERE tableID = '$tableID_input' LIMIT 1");
    foreach ($table_result as $page) {
        $tableID_load = (int)$page->tableID;
        $table_slug_base = $page->table_slug;
        $table_slug_load = $wpdb->prefix . $table_slug_base;
    }
    //grab ID
    $rec_tab_arr_c = count($recordID_arrayTables);
    for($t = 0; $t<$rec_tab_arr_c ;$t++){
      if($recordID_arrayTables[$t] == "$table_slug_base"){
        $record_callout = $recordID_arrayPks[$t];
      }
    }
    $ret->Tc = $rec_tab_arr_c;
    $ret->T = $t;
    $ret->tables_test = $recordID_arrayTables;

    //NOW DELETE THE RECORD
    $q = $wpdb->get_results("DELETE FROM $table_slug_load WHERE $record_callout = '$recordID_input'");
    $ret->RET->q = "DELETE FROM $table_slug_load WHERE $record_callout = '$recordID_input'";
    $ret->recordID_delete = $recordID_input;
    $ret->tableID = $tableID_input;
    $ret->table_slug_load = $table_slug_load;
    $ret->table_slug_base = $table_slug_base;
    $ret->result = true;

    //return $output;
    return $ret;
}

function set_table_setting($obj) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;
  global $recordID_arrayTables;
  global $recordID_arrayPks;
  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $recordID = null;
  $table_target = null;
  $ret = false;
  
  $set_statement = "SET settings_object=";

  $new_settings_object = new stdClass();

  //TEMPORARY RETURN OBJECT FOR DEBUGGING
  $ret->RET = new stdClass();

  $authorID = (String)$user_info->ID;

  $ret->YOU_SENT_THIS = $obj;
  $tableID_in = "";

  if($obj->tableID){ (int)$tableID_in = $obj->tableID; }
  if($obj->table_target){ (String)$table_target = $obj->table_target; }

  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $ret->RET->tsbp_tables = $tsbp_tables;

  //$ret->authorID = $authorID;
  $ret->tableID = $tableID_in;
  $ret->table_target = $table_target;

  //SELECT * FROM wp_tsbp_tables WHERE tableID = $tableID_in
  $query1 = "SELECT * FROM $tsbp_tables WHERE tableID = '$tableID_in'";
  //$ret->RET->query1 = $query1;
  $query1_res = $wpdb->get_results($query1);
  foreach ( $query1_res as $page ) {
    $tsbp_settings_object = JSON_decode($page->settings_object);
    $ret->RET->settings_object = $tsbp_settings_object;
  }
  $new_settings_object = $obj->settings_object;

  //$ret->RET->_new_settings_object = $new_settings_object;
  //$ret->RET->VARS = get_object_vars($obj->settings_object);

  //CONSTRUCT THE SET STATEMENT
  $set_statement .= "'" . json_encode($new_settings_object) . "'";

  //BUILD THE QUERY
  $qinsert = "UPDATE $tsbp_tables $set_statement WHERE tableID = $tableID_in";
  //$ret->RET->query1 = $qinsert;

  $wpdb->query($qinsert);

  if ($wpdb->rows_affected != 0) {
    $ret->result = "true";
  } else {
    $ret->result = "false";
  }

  return $ret;
}

function set_tab_setting($obj) {
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);
  $check_these = array();
  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $ret = false;
  $neww = true;
  $skip = false;
  $set_statement = "SET ";
  $insert_statement = "(";
  $insert_statement_val = "(";
  $update_statement = "";
  $x7 = 0;
  $cc = 0;
  $where_ext = "";

  //TEMPORARY RETURN OBJECT FOR DEBUGGING
  $ret->RET = new stdClass();

  $authorID = (String)$user_info->ID;

  $ret->YOU_SENT_THIS = $obj;
  $tabID_in = "";
  $where_ext = "";

  if($obj->DATA->tabID){ $tabID_in = $obj->DATA->tabID; }

  $tsbp_tabs = $wpdb->prefix . 'tsbp_tabs';
  $ret->RET->tsbp_tab_slug = $tsbp_tabs;

  $ret->tabID = $tabID_in;

  //CHECK IF IT EXISTS
  $query1 = "SELECT * FROM $tsbp_tabs";
  if($tabID_in !== "N"){
    //not new, UPDATE
    $query1 .= " WHERE tabID = '$tabID_in'";
    $where_ext = " WHERE tabID = '$tabID_in'";
  }

  $ret->RET->query1 = $query1;
  $query1_res = $wpdb->get_results($query1);

  foreach ( $query1_res as $page ) {
    $x7++;
    $cc++;
  }
  $ret->x7 = $x7;
  $ret->cc = $cc;
  $vv = 0;

  //SORT THROUGH THE INCOMING VALUES
  foreach ($obj->DATA as $col1 => $val1){
    if($col1 !== "tabID" && $col1 !== "tab_subtabs"){
      $ret->_V_return->$vv = $col1;
      $vv++;
    }
    
    
  }
  $ret->vv = $vv;
  $thisx = 0; 
  foreach ($obj->DATA as $col => $val){
    $ret->$col = $val;
    //REMOVE THE tabID $col
    //PULL OUT THE subtabs TO PLACE INTO THEIR TABLE
    /*if($col !== "tabID" && $col !== "tab_subtabs"){
      $insert_statement .= $col . "";
      $insert_statement_val .= "'". $val . "'";
      $update_statement .= $col ."='" . $val . "'";
      $x22 = ($thisx + 1);
      $ret->vvxx = $x22;
      if($x22 != $vv){
        $insert_statement .= ", ";
        $insert_statement_val .= ", ";
        $update_statement .= ", ";
        $update_statement .= "x22:".$x22.";vv:".$vv;
      }
      else{
        $insert_statement .= " ";
        $insert_statement_val .= " ";
        $update_statement .= " ";
      }
      $thisx++;
    }*/

    if($col === "tabID"){
      //IF ITS THE tabID subtract from the counter
      //$vv--;
    }
    if($col === "tab_subtabs"){
      //$vv--;
      //CHECK DATABASE FOR EXISTING
      $tsbp_tabs_subtabs = $wpdb->prefix . 'tsbp_tabs_subtabs';
      //if existing, update
      //if not existing, insert
      //CONSTRUCT THE QUERY FOR THE tsbp_tabs_subtabs table

      $querycheck = "";
      $queryput = "";
      $subtab_runner = array();
      $query_execute_array = array();

      $ret->tab_subtabs = $obj->DATA->$col;
      foreach($obj->DATA->tab_subtabs as $id =>$subtabs){
        $sub_qtype = "insert";//UPDATE OR INSERT
        //CHECK DATABASE FOR EXISTING subtabID
        $subtabID = $subtabs->subtabID;
        $subtab_title = $subtabs->subtab_title;
        $subtab_tabID = $subtabs->tabID;
        $subtab_icon = $subtabs->subtab_icon;
        $subtab_type = $subtabs->subtab_type;
        $subtab_filter = $subtabs->subtab_filter;
        $subtab_tableID = $subtabs->subtab_tableID;
        $subtab_auths = $subtabs->subtab_auths;

        if($subtabID !== "" && $subtabID !== "N"){
          //IS NOT NEW SUBTAB, update
          $sub_qtype = "update";
          $qq = "UPDATE $tsbp_tabs_subtabs SET";
          $qq .= " subtab_title = '$subtab_title'";
          $qq .= ", tabID = '$subtab_tabID'";
          $qq .= ", subtab_icon = '$subtab_icon'";
          $qq .= ", subtab_type ='$subtab_type'";
          $qq .= ", subtab_filter = '$subtab_filter'";
          $qq .= ", subtab_tableID='$subtab_tableID'";
          $qq .= ", subtab_auths ='$subtab_auths'";
          $qq .= " WHERE subtabID = '$subtabID'";

          array_push($query_execute_array, $qq);
        }
        else{
          $sub_qtype = "insert";//YES ITS NEW
          $qq = "INSERT INTO $tsbp_tabs_subtabs";
          $qq .= " (subtab_title, tabID, subtab_icon, subtab_type, subtab_filter, subtab_tableID, subtab_auths)";
          $qq .= " VALUES ('$subtab_title', '$subtab_tabID', '$subtab_icon', '$subtab_type', '$subtab_filter', '$subtab_tableID', '$subtab_auths')";
          array_push($query_execute_array, $qq);
        }
        
        //$querycheck = "SELECT * FROM $tsbp_tabs_subtabs WHERE subtabID = $subtabID";
        array_push($subtab_runner,$query_execute_array);
      }
      //$ret->sub_qtype = $sub_qtype;
      $ret->querycheck = $query_execute_array;
      //EXECUTE THE SUBTAB QUERY FOR EACH QUERY IN THE ARRAY
      foreach($query_execute_array as $query222){
        $wpdb->query($query222);

      }
    }
    if($col !== "tabID" && $col !== "tab_subtabs"){
      $insert_statement .= $col . "";
      $insert_statement_val .= "'". $val . "'";
      $update_statement .= $col ."='" . $val . "'";
      $x22 = ($thisx + 1);
      $ret->vvxx = $x22;
      if($x22 != $vv){
        $insert_statement .= ", ";
        $insert_statement_val .= ", ";
        $update_statement .= ", ";
        //$update_statement .= "x22:".$x22.";vv:".$vv;
      }
      else{
        $insert_statement .= " ";
        $insert_statement_val .= " ";
        $update_statement .= " ";
      }
      $thisx++;
    }
  }
  $insert_statement .= ")";
  $insert_statement_val .= ")";
  
  if($tabID_in !== "N" && $x7 > 0){
    //is not new
    $set_statement .= $update_statement;
    $wpdb->query("UPDATE $tsbp_tabs $set_statement $where_ext");
    $o = "update";
    $aaaa = "UPDATE $tsbp_tabs $set_statement $where_ext";
    $ret->update_query = $aaaa;
  }
  else{
    //is new
    $wpdb->query("INSERT INTO $tsbp_tabs $insert_statement VALUES $insert_statement_val");
    $ttt = "INSERT INTO $tsbp_tabs $insert_statement VALUES $insert_statement_val";
    //GET THE OBJECTID!
    $ret->was_new = "true";
    $tabID = (String)$wpdb->insert_id;
    $o = "insert";
    $ret->insert_query = $ttt;
    $ret->tabID_OUT = $tabID;
  }

  $ret->query_type = $o;

  if ($wpdb->rows_affected != 0) {
    $ret->result = "true";
  } else {
    $ret->result = "false";
  }

  $ret->vv = $vv;
  
  return $ret;
}

function del_tab_setting($obj){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tabID = (int)$obj->tabID;
  $tsbp_tabs = $wpdb->prefix . 'tsbp_tabs';
    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
  $ret = new stdClass();
  //$wpdb->query1 = "DELETE FROM $tsbp_tabs WHERE tabID = '$tabID'";
  $wpdb->query("DELETE FROM $tsbp_tabs WHERE tabID = '$tabID'");
  $ret->rows_affected = $wpdb->rows_affected;
  $ret->tabID = $tabID;
  return $ret;
}

function del_subtab($obj){
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $tabID = (int)$obj->tabID;
  $subtabID = (int)$obj->subtabID;
  $tsbp_subtabs = $wpdb->prefix . 'tsbp_tabs_subtabs';
    //$dbc = mysqli_connect(DBHOST, DBUSER, DBPW, DBNAME);
  $ret = new stdClass();
  //$wpdb->query1 = "DELETE FROM $tsbp_tabs WHERE tabID = '$tabID'";
  $wpdb->query("DELETE FROM $tsbp_subtabs WHERE subtabID = '$subtabID'");
  $ret->rows_affected = $wpdb->rows_affected;
  $ret->tabID = $tabID;
  if($ret->rows_affected > 0){
    $ret->result = true;
  }
  return $ret;
}

function checksum_table($obj){
  //{"tableID" : "3"}
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $proc_tableID = (int)filter($obj->tableID,"c");
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';

  $ret = new stdClass();
  $ret->tableID = $proc_tableID;

  //GOTTA GET TABLE SLUG
  $ret->get_the_slug = "SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID'";
  $result = $wpdb->get_results("SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID'");

  foreach ( $result as $page ) {
    $yy = 0;
    $this_table_slug = $wpdb->prefix . filter($page->table_slug,"ach");

    //get the table indicated in the table_slug
    $prepared_statement = $wpdb->get_results( "CHECKSUM TABLE $this_table_slug" );
    foreach ( $prepared_statement as $page12 ) {
      $ret->checksum = $page12->Checksum;
    }
  }

  
  return $ret;
}
function checksum_table_compare($obj){
  //{"tableID" : "3"}
  $dirrrrr = "../../../../wp-load.php";
  $jj = require_once($dirrrrr);

  global $wpdb;
  global $user_login, $user_email;

  get_currentuserinfo();
  $current_user = wp_get_current_user();
  $user_info = new stdClass();
  $user_info = get_userdata($current_user->ID);
  $proc_tableID = (int)filter($obj->tableID,"c");
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';

  $ret = new stdClass();
  $ret->tableID = $proc_tableID;
  $ret->result = false;

  $incoming_checksum = $obj->checksum;

  //GOTTA GET TABLE SLUG
  $ret->get_the_slug = "SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID'";
  $result = $wpdb->get_results("SELECT * FROM $tsbp_tables tt WHERE tt.tableID = '$proc_tableID'");

  foreach ( $result as $page ) {
    $yy = 0;
    $this_table_slug = $wpdb->prefix . filter($page->table_slug,"ach");

    //get the table indicated in the table_slug
    $prepared_statement = $wpdb->get_results( "CHECKSUM TABLE $this_table_slug" );
    foreach ( $prepared_statement as $page12 ) {
      $ret->checksum = $page12->Checksum;
      if($page12->Checksum == $incoming_checksum){
        $ret->result = true;
      }
    }
  }

  
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
