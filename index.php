<?php
//define( 'WP_DEBUG', true );
//define( 'WP_DEBUG_LOG', true );
/*
  Plugin Name: Job Time
  Description: Manage your small business the right way with this all-in-one manager. Track jobs, customers, time, blah blah blah
  Version: 1.0
  Author: The Small Business Platform
  Author URI: https://www.thesmallbusinessplatform.com/
  License: GNU
  License URI: http://www.gnu.org/licenses/gpl-2.0.html

 */
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

$tablen = "";
$pluginURL4 = plugins_url();
define("tsbppluginpath","test");

global $jal_db_version;
$jal_db_version = '1.0';



//add_action('admin_menu', 'contactManager');
$t = getcwd();
//echo $t;
$g = explode("/",$t);
$cg = count($g)-1;
//echo "......................".$cg;
//echo "...............".$_SERVER['DOCUMENT_ROOT'];

$test2 = $_SERVER['DOCUMENT_ROOT'];

//PATH TO AJAX FILE
$test3 = $test2. "/wp-content/plugins/tsbp-employee-job-time-tracker/p/ajax-to-db.php";

include_once($test3);

function contactManager() {
    //PATH TO IMAGE FILE FOR PLUGIN ICON
    //$img_path_to = plugins_url( 'TSBPlogo_white.png', _FILE_ ) . "/tsbp-employee-job-time-tracker/";
    $img_path_to =  "/wp-content/plugins/tsbp-employee-job-time-tracker/TSBPlogo_white2.png";

    $appName = 'Job Time';
    $appID = 'tsbpejtt';
    add_menu_page($appName, $appName, 'administrator', $appID . '-top-level', 'contactManagerScreen', $img_path_to);
    //add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
}

function contactManagerScreen() {
    //echo getcwd();
    global $user_login, $user_email;
    get_currentuserinfo();
    $current_user = wp_get_current_user();
    $pluginURL = plugins_url();
    $stamp = time();
    $out = "";
    //if (is_user_logged_in()) {
    /* PROCEED IF LOGGED IN */
    echo "<div class='wrap'>";
    echo "<div id='statusdiv'></div>";
    echo "<script>_hh = {}; _hh['path'] = '" . $pluginURL . "/tsbp-employee-job-time-tracker/';"
    . "_hh['user'] = '$user_email';";
    echo "</script>";
    ?>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="../wp-content/plugins/tsbp-employee-job-time-tracker/js/f.js"></script>
    
    <!--<script src="../wp-content/plugins/tsbp-employee-job-time-tracker/js/test-file.js"></script>-->
    <!-- begin data tables stuff -->
    <script src="//cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css">
    <!--
    <script src="https://cdn.datatables.net/fixedheader/3.1.5/js/dataTables.fixedHeader.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/fixedheader/3.1.5/css/fixedHeader.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>
    -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">
    <script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
    <!--<script src="https://cdn.datatables.net/select/1.2.7/js/dataTables.select.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.2.7/css/select.dataTables.min.css">
    -->
    <!-- end data tables stuff -->
    <?php
    echo "<script src='../wp-content/plugins/tsbp-employee-job-time-tracker/js/tsbp-power-key.js?stamp=" . $stamp . "' type='text/javascript'></script>";
    echo "<link href='../wp-content/plugins/tsbp-employee-job-time-tracker/css/style.css?stamp=" . $stamp . "' rel='stylesheet' type='text/css' media='screen' />";

    $user_info = new stdClass();
    $user_info = get_userdata($current_user->ID);
    /****************TO DISPLAY USER INFORMATION**********************/
    //$out .= 'Username: ' . $user_info->user_login . "<BR/>";
    //$out .= 'User roles: ' . implode(', ', $user_info->roles) . "<BR/>";
    //$out .= 'User ID: ' . $user_info->ID . "<BR/>";
    //$out .= "currID:" . $current_user->user_login . "<BR/>";
    /*****************************************************************/
    // GET ALL THE TABLES AND PLACE INTO A LIST
    //$tables = new stdClass();

    //echo "<h1>It is the grind that sharpens the blade.</h1>";

    //check authorizations for each tab

    $clear_settings = true;
    foreach($user_info->roles as $role){
    if($role == ""){}
    echo "<link href='../wp-content/plugins/tsbp-employee-job-time-tracker/caljs/cal.css?stamp=" . $stamp . "' rel='stylesheet'>";
    echo "<script src='../wp-content/plugins/tsbp-employee-job-time-tracker/caljs/calendar.js'></script>";
}
?>

<script>jQuery(document).ready(function(){
  //TABS LOAD THE TABLES, SO GET TABS
  _pkey._tab._get();
  
      });</script>

<ul class="nav nav-tabs" id="tdx_topbarnav">
  <!--<li class="active"><a data-toggle="tab" href="#my_tasks" onclick="">My Tasks</a></li>-->
  <li><a data-toggle="tab" href="#V0" onclick=""><i class="fa fa-list"></i> Tasks</a></li>
  <li><a data-toggle="tab" href="#V00" onclick=""><i class="fa fa-calendar"></i> Calendar</a></li>
  <li><a data-toggle="tab" href="#V3" onclick=""><i class="fa fa-money"></i> Accounting</a></li>
  <li class="active tdx_settbutton"><a data-toggle="tab" href="#tdx_settings" onclick="javascript:_pkey._render._settings._full_screen({});"><i class="fa fa-gears"></i> Settings</a></li>
  <!--<li class="tsbp-greentab"><a data-toggle="tab" href="#settings" onclick="">+ Add New</a></li>-->
</ul>

<div class="tab-content" id="tab_core">
  <div id="V0" class="tab-pane fade in">
    <h2><i class="fa fa-list"></i> Tasks</h2>
    <div id="tsbp_tasks1"></div>
  </div>

  <div id="V00" class="tab-pane fade in">
    <h2><i class="fa fa-calendar"></i> Calendar</h2>
    <div id="cal-wrap">
      <!-- [PERIOD SELECTOR] -->
      <div id="cal-date">
        <select id="cal-mth"></select>
        <select id="cal-yr"></select>
        <input id="cal-set" type="button" value="SET"/>
      </div>

      <!-- [CALENDAR] -->
      <div id="cal-container"></div>

      <!-- [EVENT] -->
      <div id="cal-event"></div>
    </div>

    <div id="tsbp_calendar">
      <div class="calendar_output">

      </div>
    </div>
  </div>

  <div id="V3" class="tab-pane fade in">
    <h2><i class="fa fa-money"></i> Accounting</h2>
    <div id="tsbp_transactions">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#tsbp_transactions_data" onclick=""><i class="fa fa-table"></i> Transactions</a></li>
        <li><a data-toggle="tab" href="#tsbp_transactions_ledger" onclick=""><i class="fa fa-book"></i> Ledger</a></li>
        <li><a data-toggle="tab" href="#tsbp_transactions_metrics" onclick=""><i class="fa fa-dashboard"></i> Metrics</a></li>
        <li><a data-toggle="tab" href="#tsbp_transactions_graphs" onclick=""><i class="fa fa-line-chart"></i> Graphs & Charts</a></li>
        <li><a data-toggle="tab" href="#tsbp_transactions_reports" onclick=""><i class="fa fa-file-text-o"></i> Reports</a></li>
        <li><a data-toggle="tab" href="#tsbp_transactions_docs" onclick=""><i class="fa fa-file-image-o"></i> Documents</a></li>
        <li><a data-toggle="tab" href="#tsbp_chart_of_accts" onclick=""><i class="fa fa-bars"></i> Chart of Accounts</a></li>
      </ul>
      <div class="tab-content">
        <div id="tsbp_transactions_data" class="tab-pane fade in active">
          Transactions data
        </div>
        <div id="tsbp_transactions_metrics" class="tab-pane fade in">
          <h3><i class="fa fa-dashboard"></i> Metrics</h3>
        </div>
        <div id="tsbp_transactions_graphs" class="tab-pane fade in">
          <h3><i class="fa fa-line-chart"></i> Graphs</h3>
          <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
          <div style="width:300px;">
            <canvas id="myChart" width="200" height="200"></canvas>
          </div>
          <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            });
          </script>
        </div>
        <div id="tsbp_transactions_reports" class="tab-pane fade in">
          <h3><i class="fa fa-file-text-o"></i> Reports</h3>
        </div>
        <div id="tsbp_transactions_docs" class="tab-pane fade in">
          <h3><i class="fa fa-file-image-o"></i> Documents</h3>
        </div>
        <div id="tsbp_chart_of_accts" class="tab-pane fade in">
          <h3><i class="fa fa-bars"></i> Chart of Accounts</h3>
          <div id="tsbp_trans_chartofacc_groups_data">

          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="tdx_settings" class="tab-pane fade in active">
    <h3><i class="fa fa-gears"></i> Settings</h3>
    <h4>WordPress Info</h4>
<div id="tsbp-wpinfo">
  <div><strong>Your username:</strong>
<?php
  echo $user_info->user_login;
?>
  </div>
    <div><strong>Your ID:</strong>
<?php
    echo $user_info->ID;
?>
    </div>
    <div><strong>Your Roles:</strong>
<?php
    echo implode(', ', $user_info->roles);
?>
    </div>
  </div>
  <div class="tsbp_settings_tabwr">
    <h4 id='tdx_tabs'>Tabs</h4>
    <div class="tsbp_settings_tab" id="tsbp_settings_tab">
      
    </div>
  </div>
  <script>jQuery(document).ready(function(){
        //setTimeout(function(){ _pkey._tab._get(); }, 2500);
        _pkey._render._settings._full_screen({});
      });</script>

  <div class="tsbp_settings_tableswr">
    <h4>Tables</h4>
    <div class="tsbp_settings_tables" id="tsbp_settings_tables">
      
    </div>
  </div>
  <script>jQuery(document).ready(function(){
        //_pkey._table._get();
      });</script>
  <div id="tsbp_console_wr">
      <h4>Console</h4>
      <div id="tsbp_console"></div>
      <script>jQuery(document).ready(function(){
        //setTimeout(function(){ _pkey._render._tab._topbar(); },3000);
      });</script>
  </div>
  </div>
</div>

<span id='corner_plus'>
  <a href='javascript:void(0)' id='tsbp_add_new' onclick='javascript:_pkey._record._open._render({"recordID":"N","mode":"N"})' data-toggle='modal' data-target='#myModal_mod_window'>
    <i class='fa fa-plus'></i> 
  </a>
</span>

<!-- Modal -->
<form name="tsbp_object_add_new" id="tsbp_object_add_new">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add New</h4>
      </div>
      <div class="modal-body" id="tsbp-modal-win">



      <div style="clear:both;height:auto;display:block;position:relative;width:100%">&nbsp;</div>
      </div>
      <div style="clear:both;height:auto;display:block;position:relative;width:100%">&nbsp;</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="reset" class="btn btn-default">Reset Form</button>
        <button type="button" class="btn btn-primary" id="tsbp-modal-save-object">Save changes</button>
      </div>
    </div>
  </div>
</div>
</form>
<!--
<div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
  <div class="toast-header">
    <svg class=" rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
      <rect fill="#007aff" width="100%" height="100%" /></svg>
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
-->

</div>
<?php
    //CLOSE WRAPPER DIV
    echo "";
}

function jal_install() {
	global $wpdb;
	global $jal_db_version;

  $base_table = $wpdb->prefix . 'tsbp_tables';
  $tsbp_objects = $wpdb->prefix . 'tsbp_objects';
  $tsbp_objects_to_tables = $wpdb->prefix . 'tsbp_objects_to_tables';
  $tsbp_calendar_layers = $wpdb->prefix . 'tsbp_calendar_layers';
  $tsbp_calendar_layers_auths = $wpdb->prefix . 'tsbp_calendar_layers_auths';
  //$tsbp_columns = $wpdb->prefix . 'tsbp_columns';
  $tsbp_jobs = $wpdb->prefix . 'tsbp_jobs';
  $tsbp_my_tasks = $wpdb->prefix . 'tsbp_my_tasks';
  $tsbp_people = $wpdb->prefix . 'tsbp_people';
  $tsbp_records = $wpdb->prefix . 'tsbp_records';
  //$tsbp_records_fk = $wpdb->prefix . 'tsbp_records_fk';
  $tsbp_record_groups = $wpdb->prefix . 'tsbp_record_groups';
  //$tsbp_record_groups_to_screen = $wpdb->prefix . 'tsbp_record_groups_to_screen';
  $tsbp_record_to_group = $wpdb->prefix . 'tsbp_record_to_group';
  $tsbp_screens = $wpdb->prefix . 'tsbp_screens';
  $tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $tsbp_tables_userauth = $wpdb->prefix . 'tsbp_tables_userauth';
  $tsbp_userorder = $wpdb->prefix . 'tsbp_userorder';
  $tsbp_tabs = $wpdb->prefix . 'tsbp_tabs';
  $tsbp_tabs_subtabs = $wpdb->prefix . 'tsbp_tabs_subtabs';

  $tsbp_transactions = $wpdb->prefix . 'tsbp_transactions';
  $tsbp_trans_chartofacc_groups = $wpdb->prefix . 'tsbp_trans_chartofacc_groups';
  $trans_chartofacc = $wpdb->prefix . 'tsbp_trans_chartofacc';

  $wpuserstable = $wpdb->prefix . 'users';

	$charset_collate = $wpdb->get_charset_collate();
/*
You must put each field on its own line in your SQL statement.
You must have two spaces between the words PRIMARY KEY and the definition of your primary key.
You must use the key word KEY rather than its synonym INDEX and you must include at least one KEY.
KEY must be followed by a SINGLE SPACE then the key name then a space then open parenthesis with the field name then a closed parenthesis.
You must not use any apostrophes or backticks around field names.
Field types must be all lowercase.
SQL keywords, like CREATE TABLE and UPDATE, must be uppercase.
You must specify the length of all fields that accept a length parameter. int(11), for example.

CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		name tinytext NOT NULL,
		text text NOT NULL,
		url varchar(55) DEFAULT '' NOT NULL,
		PRIMARY KEY  (id)
	) $charset_collate;

  */

  /*$base_table_sql = "CREATE TABLE IF NOT EXISTS $base_table (
  tableID bigint(20) NOT NULL AUTO_INCREMENT,
  table_slug varchar(45) DEFAULT NULL,
  table_alias varchar(45) DEFAULT NULL,
  table_icon varchar(45) DEFAULT NULL,
  created_timestamp int(30) DEFAULT NULL,
  authorID bigint(20) DEFAULT NULL,
  sub_tabs_object text NOT NULL,
  settings_object text NOT NULL,
  PRIMARY KEY  (tableID)
  ) ENGINE=InnoDB $charset_collate;";*/

  $tsbp_objects_to_tables_sql = "CREATE TABLE IF NOT EXISTS $tsbp_objects_to_tables (
  tobjtID bigint(20) NOT NULL AUTO_INCREMENT,
  objectID bigint(20) NOT NULL,
  tableID bigint(20) NOT NULL,
  PRIMARY KEY  (tobjtID)
  ) ENGINE=InnoDB $charset_collate;";

  ////////////////////////////////////////////

  $tsbp_calendar_layers_sql = "CREATE TABLE IF NOT EXISTS $tsbp_calendar_layers (
    layerID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    layer_title varchar(90) NOT NULL,
    layer_description text,
    author_userID__FK bigint(20) UNSIGNED NOT NULL,
    layer_color varchar(15) NOT NULL,
    layer_default_auths varchar(45) NOT NULL,
    PRIMARY KEY  (layerID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_calendar_layers_auths_sql = "CREATE TABLE IF NOT EXISTS $tsbp_calendar_layers_auths (
    userID bigint(20) UNSIGNED NOT NULL,
    layerID bigint(20) UNSIGNED NOT NULL,
    v tinyint(1) NOT NULL,
    e tinyint(1) NOT NULL,
    d tinyint(1) NOT NULL,
    KEY layerID (layerID),
    KEY userID (userID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_jobs_sql = "CREATE TABLE IF NOT EXISTS $tsbp_jobs (
    jobsID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    job_title varchar(90) NOT NULL,
    job_description text NOT NULL,
    lead_userID__FK bigint(20) UNSIGNED DEFAULT NULL,
    job_address text NOT NULL,
    job_notes text NOT NULL,
    job_est_begin_date date NOT NULL,
    job_est_end_date date NOT NULL,
    job_actual_begin_date date NOT NULL,
    job_actual_end_date date NOT NULL,
    job_status varchar(45) NOT NULL,
    job_show_on_cal tinyint(1) NOT NULL,
    job_billing_address text NOT NULL,
    job_shipping_address text NOT NULL,
    record_groupID bigint(20) UNSIGNED DEFAULT NULL,
    record_status varchar(20) NOT NULL DEFAULT 'active',
    PRIMARY KEY  (jobsID),
    KEY record_groupID (record_groupID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_my_tasks_sql = "CREATE TABLE IF NOT EXISTS $tsbp_my_tasks (
    taskID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    jobsID__FK bigint(20) UNSIGNED NOT NULL,
    priority_level varchar(45) NOT NULL,
    author_userID__FK bigint(20) UNSIGNED DEFAULT NULL,
    lead_userID__FK bigint(20) UNSIGNED DEFAULT NULL,
    task_title varchar(90) NOT NULL,
    task_description text NOT NULL,
    task_est_duration_mins varchar(45) DEFAULT NULL,
    task_actual_duration_mins varchar(45) DEFAULT NULL,
    task_est_cost varchar(45) DEFAULT NULL,
    task_actual_cost varchar(45) DEFAULT NULL,
    task_est_income varchar(45) DEFAULT NULL,
    task_actual_income varchar(45) DEFAULT NULL,
    task_quantity int(11) DEFAULT NULL,
    task_frequency varchar(45) DEFAULT NULL,
    task_quantity_left int(11) DEFAULT NULL,
    task_quantity_left_timestamp varchar(45) DEFAULT NULL,
    task_est_begin_timestamp varchar(45) DEFAULT NULL,
    task_actual_begin_timestamp varchar(45) DEFAULT NULL,
    task_status varchar(45) NOT NULL,
    task_status_timestamp varchar(45) NOT NULL,
    task_status_userID bigint(20) UNSIGNED NOT NULL,
    x_coordinates varchar(45) DEFAULT NULL,
    y_coordinates varchar(45) DEFAULT NULL,
    record_groupID bigint(20) UNSIGNED DEFAULT NULL,
    record_status varchar(20) NOT NULL DEFAULT 'active',
    PRIMARY KEY  (taskID),
    KEY jobID1 (jobsID__FK),
    KEY record_groupID (record_groupID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_people_sql = "CREATE TABLE IF NOT EXISTS $tsbp_people (
    peopleID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    people_type varchar(45) NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    business_name varchar(90) NOT NULL,
    address1 varchar(90) NOT NULL,
    address2 varchar(90) NOT NULL,
    city varchar(90) NOT NULL,
    state varchar(45) NOT NULL,
    zip varchar(15) NOT NULL,
    primary_phone varchar(15) NOT NULL,
    second_phone varchar(15) NOT NULL,
    primary_email varchar(200) NOT NULL,
    second_email varchar(200) NOT NULL,
    notes text NOT NULL,
    fax_number varchar(15) NOT NULL,
    website varchar(150) NOT NULL,
    base_wage varchar(10) NOT NULL,
    current_status varchar(20) NOT NULL,
    record_groupID bigint(20) UNSIGNED DEFAULT NULL,
    record_status varchar(20) NOT NULL DEFAULT 'active',
    PRIMARY KEY  (peopleID),
    KEY record_groupID (record_groupID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_transactions_sql = "CREATE TABLE IF NOT EXISTS $tsbp_transactions (
    transID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    trans_coaID bigint(20) UNSIGNED NOT NULL,
    trans_title varchar(45) NOT NULL,
    method varchar(45) NOT NULL,
    amount varchar(90) NOT NULL,
    timestamp1 varchar(90) NOT NULL,
    tags text NOT NULL,
    record_groupID bigint(20) UNSIGNED DEFAULT NULL,
    record_status varchar(20) NOT NULL DEFAULT 'active',
    PRIMARY KEY  (transID),
    KEY record_groupID (record_groupID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_record_groups_sql = "CREATE TABLE IF NOT EXISTS $tsbp_record_groups (
    record_groupID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    record_group_slug varchar(45) DEFAULT NULL,
    record_group_alias varchar(45) DEFAULT NULL,
    rgb_color varchar(45) DEFAULT NULL,
    description text,
    default_display tinyint(1) DEFAULT NULL,
    tableID bigint(20) NOT NULL,
    PRIMARY KEY  (record_groupID),
    KEY tableID (tableID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_record_to_group_sql = "CREATE TABLE IF NOT EXISTS $tsbp_record_to_group (
    recordID bigint(20) UNSIGNED NOT NULL,
    record_groupID bigint(20) UNSIGNED NOT NULL
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_tables_sql = "CREATE TABLE IF NOT EXISTS $tsbp_tables (
    tableID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    table_slug varchar(45) DEFAULT NULL,
    table_alias varchar(45) DEFAULT NULL,
    created_timestamp int(11) DEFAULT NULL,
    authorID bigint(20) UNSIGNED DEFAULT NULL,
    settings_object text NOT NULL,
    PRIMARY KEY  (tableID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_tables_userauth_sql = "CREATE TABLE IF NOT EXISTS $tsbp_tables_userauth (
    userID int(20) UNSIGNED NOT NULL,
    tableID bigint(20) UNSIGNED NOT NULL,
    auth_obj text NOT NULL
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_userorder_sql = "CREATE TABLE IF NOT EXISTS $tsbp_userorder (
    tableID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    userID bigint(20) UNSIGNED NOT NULL,
    order_obj text NOT NULL,
    PRIMARY KEY  (tableID),
    KEY userID1 (userID),
    KEY tableID (tableID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_trans_chartofacc_groups_sql = "CREATE TABLE IF NOT EXISTS $tsbp_trans_chartofacc_groups (
    trans_coagID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    title varchar(90) NOT NULL,
    description text,
    PRIMARY KEY  (trans_coagID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_trans_chartofacc_sql = "CREATE TABLE IF NOT EXISTS $tsbp_trans_chartofacc (
    trans_coaID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    trans_coagID bigint(20) UNSIGNED NOT NULL,
    title varchar(90) NOT NULL,
    description text,
    num_code varchar(90) NOT NULL,
    acct_type varchar(90) NOT NULL,
    PRIMARY KEY  (trans_coaID),
    KEY trans_coagID (trans_coagID)
  ) ENGINE=InnoDB $charset_collate;";

  $tsbp_tabs_sql = "CREATE TABLE IF NOT EXISTS $tsbp_tabs (
    tabID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    tab_alias varchar(90) NOT NULL,
    tab_slug varchar(90) NOT NULL,
    tab_filter varchar(90) NOT NULL,
    tab_type varchar(45) NOT NULL,
    tab_icon varchar(90) NOT NULL,
    tab_subtabs text,
    tab_auths text,
    description text,
    PRIMARY KEY  (tabID)
  ) ENGINE=InnoDB $charset_collate;";

$tsbp_tabs_subtabs_sql = "CREATE TABLE IF NOT EXISTS $tsbp_tabs_subtabs (
  subtabID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  tabID bigint(20) UNSIGNED NOT NULL,
  subtab_type varchar(90) NOT NULL,
  subtab_title varchar(90) NOT NULL,
  subtab_icon varchar(90) NOT NULL,
  subtab_filter varchar(90) NOT NULL,
  subtab_tableID bigint(20) UNSIGNED,
  subtab_auths text,
  PRIMARY KEY  (subtabID)
) ENGINE=InnoDB $charset_collate;";
  /////////////////////////////////////////////

  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

  //CREATE THE TABLES
	//dbDelta( $tsbp_objects_sql );
  //dbDelta( $base_table_sql );
  //dbDelta( $tsbp_objects_to_tables_sql );

  dbDelta( $tsbp_userorder_sql );
  dbDelta( $tsbp_tables_userauth_sql );
  dbDelta( $tsbp_tables_sql );
  dbDelta( $tsbp_record_to_group_sql );
  dbDelta( $tsbp_record_groups_sql );
  dbDelta( $tsbp_people_sql );
  dbDelta( $tsbp_my_tasks_sql );
  dbDelta( $tsbp_jobs_sql );
  dbDelta( $tsbp_calendar_layers_auths_sql );
  dbDelta( $tsbp_calendar_layers_sql );
  dbDelta( $tsbp_tabs_sql );
  dbDelta( $tsbp_tabs_subtabs_sql );

  dbDelta( $tsbp_trans_chartofacc_groups_sql );
  dbDelta( $tsbp_trans_chartofacc_sql );

    //ALTER FOR FOREIGN KEYS
    //$wpdb->query("ALTER TABLE $tsbp_objects_to_tables ADD CONSTRAINT FK1_objID_to_tID FOREIGN KEY (objectID) REFERENCES $tsbp_objects(objectID) ON DELETE CASCADE ON UPDATE CASCADE;");
    //$wpdb->query("ALTER TABLE $tsbp_objects_to_tables ADD CONSTRAINT FK2_objID_to_tID FOREIGN KEY (tableID) REFERENCES $base_table(tableID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_calendar_layers_auths ADD CONSTRAINT layerIDfk FOREIGN KEY (layerID) REFERENCES $tsbp_calendar_layers (layerID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_calendar_layers_auths ADD CONSTRAINT userID FOREIGN KEY (userID) REFERENCES $wpuserstable (ID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_jobs ADD CONSTRAINT rg7 FOREIGN KEY (record_groupID) REFERENCES $tsbp_record_groups (record_groupID) ON DELETE SET NULL ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_my_tasks ADD CONSTRAINT jobID2 FOREIGN KEY (jobsID__FK) REFERENCES $tsbp_jobs (jobsID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_my_tasks ADD CONSTRAINT rg5 FOREIGN KEY (record_groupID) REFERENCES $tsbp_record_groups (record_groupID) ON DELETE SET NULL ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_people ADD CONSTRAINT rg8 FOREIGN KEY (record_groupID) REFERENCES $tsbp_record_groups (record_groupID) ON DELETE SET NULL ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_record_groups ADD CONSTRAINT tableID1 FOREIGN KEY (tableID) REFERENCES $tsbp_tables (tableID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_userorder ADD CONSTRAINT tableid FOREIGN KEY (tableID) REFERENCES $tsbp_tables (tableID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_userorder ADD CONSTRAINT userID2 FOREIGN KEY (userID) REFERENCES $wpuserstable (ID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_tabs_subtabs ADD CONSTRAINT st1 FOREIGN KEY (subtab_tableID) REFERENCES $tsbp_tables (tableID) ON DELETE CASCADE ON UPDATE CASCADE;");
    $wpdb->query("ALTER TABLE $tsbp_tabs_subtabs ADD CONSTRAINT st2 FOREIGN KEY (tabID) REFERENCES $tsbp_tabs (tabID) ON DELETE CASCADE ON UPDATE CASCADE;");

    $wpdb->query("ALTER TABLE $tsbp_trans_chartofacc ADD CONSTRAINT transgroup FOREIGN KEY (trans_coagID) REFERENCES $tsbp_trans_chartofacc_groups (trans_coagID) ON DELETE CASCADE ON UPDATE CASCADE;");

    /* $wpdb->insert(
	$table_name,
	array(
		'time' => current_time( 'mysql' ),
		'name' => $welcome_name,
		'text' => $welcome_text,
	)
); */


	add_option( 'jal_db_version', $jal_db_version );
}

function jal_install_data() {
	global $wpdb;
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	$welcome_name = 'Mr. WordPress';
	$welcome_text = 'ah yes';

	$tsbp_tables = $wpdb->prefix . 'tsbp_tables';
  $tsbp_jobs = $wpdb->prefix . 'tsbp_jobs';

  $dateee = "2018-01-22";

  $wpdb->insert(
  $tsbp_tables,
    array(
      'tableID' => "",
      'table_slug' => "tsbp_jobs",
      'table_alias' => "Jobs",
      'created_timestamp' => "1505578425",
      'authorID' => "137 25th ST SW\r\nMinot, ND 58701",
      'settings_object' => '{\"sort_by\":\"group\",\n\"display_type\": \"list\", \n\"main_header\": \"true\", \n\"allow_drag_reorder\": \"false\", \n\"allow_select_reorder\": \"false\", \n\"allow_edit\": \"true\", \n\"allow_delete\": \"true\", \n\"allow_new\": \"true\", \n\"allow_edit_history\": \"true\", \n\"allow_selection\" : \"true\",\n\"header_columns\": { \n    \"0\" : {\n        \"column_slug\" : \"job_title\",\n        \"column_alias\" : \"Job Title\"\n          } \n}, \n\"content_columns\" : {\n    \"0\" : {\n        \"column_slug\" : \"job_description\",\n        \"column_alias\" : \"Job Description\"\n          },\n    \"1\" : {\n        \"column_slug\" : \"job_address\",\n        \"column_alias\" : \"Job Address\",\n        \"column_hooks\": {\n                         \"0\" : \"google_map\"\n                        }\n          },\n    \"2\" : {\n        \"column_slug\" : \"job_est_begin_date\",\n        \"column_alias\" : \"Job Est Begin Date\",\n        \"column_hooks\": {\n                         \"0\" : \"date\"\n                        }\n          },\n    \"3\" : {\n        \"column_slug\" : \"lead_userID__FK\",\n        \"column_alias\" : \"Lead User\",\n        \"column_hooks\": {\n                         \"0\" : \"FK\"\n                        },\n        \"fk_handler\" : {\n                          \"table_slug\":\"wp_users\",\n                          \"column_slug\":\"userID\"\n                       }\n          }\n},\n\"record_buttons\": { \n    \"0\": { \n        \"wrapper_class\": \"action iconWR\", \n        \"icon_class\": \"fa fa-clock-o\", \n        \"icon_text\": \"Actions\", \n        \"hrf\": \"#\", \n        \"modal_targetID\": \"myModal_mod_window\",\n        \"callout\": \"action_jobs\" \n    }, \n    \"1\": { \n        \"wrapper_class\": \"secondary_iconWR\", \n        \"icon_class\": \"fa fa-info-circle\", \n        \"icon_text\": \"Information\", \n        \"hrf\": \"#\", \n        \"modal_targetID\": \"myModal_mod_window\",\n        \"callout\": \"information\" \n     } \n}\n}',
      'head_recordID' => "",
      'tail_recordID' => ""
    )
  );

  $wpdb->insert(
  $tsbp_jobs,
    array(
      'jobsID' => "",
      'job_title' => "Job 1",
      'job_description' => "asdf asdf",
      'lead_userID__FK' => "1",
      'job_address' => "137 25th ST SW\r\nMinot, ND 58701",
      'job_notes' => "notes",
      'job_est_begin_date' => "2018-01-19",
      'job_est_end_date' => "2018-01-19",
      'job_actual_begin_date' => "2018-01-19",
      'job_actual_end_date' => "2018-01-19",
      'job_status' => "upcoming",
      'job_show_on_cal' => "1",
      'job_billing_address' => "137 25th ST SW\r\nMinot, ND 58701",
      'job_shipping_address' => "137 25th ST SW\r\nMinot, ND 58701",
      'record_groupID' => "2",
      'record_status' => "active"
    )
  );
}


add_action('admin_menu','contactManager');

register_activation_hook( __FILE__, 'jal_install' );
register_activation_hook( __FILE__, 'jal_install_data' );
