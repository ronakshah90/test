// For todays date;
Date.prototype.today = function () {
  return this.getFullYear() + "-" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
}

// For the time now
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// Local storage usage for retaining User role value
if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}




var id_counter = 0;

$(document).ready(function(){
  
  if(localStorage.role == "" || localStorage.role == null || typeof localStorage.role == "undefined" || localStorage.role == "System Administrator")
  {
    localStorage.role = "System Administrator";
    $("#bottompanel").hide();
    $("#toolPnl-admin-icons").show();
    $("#toolPnl-all-icons").hide();
  }
  else
  {
    $("#bottompanel").show();
    $("#toolPnl-admin-icons").hide();
    $("#toolPnl-all-icons").show();
  }
  $("#user_role").val(localStorage.role);
  
  
  // Hide all unwanted DIVs in the application
  $("#master_create").hide();
  $("#exec_job").hide();
  $("#hier_creation").hide();
  $("#mhc_hier_data_display").hide();
  $("#show_rep_hier").hide();
  $("#create_hier").hide();
  $("#br_tag_details").hide();
  $("#tag_details").hide();
  $("#derv_tag_details").hide();
  $("#tag_details").hide();
  $("#conn_succ_msg").hide();
  $("#gen_reports1").hide();
  $("#report_gen_wrap").hide();
  $("#conn_test_msg").hide();
  $("#conn_succ_msg2").hide();
  //$("#extractor_list_wrap").hide();
  $(".dload_log_link").hide();
  $(".dload_log_link1").hide();
  $("#view_mh").hide();
  
  $("#ext_list").hide();
  $("#ext_list2").hide();
  $("#ext_list3").hide();
  $("#ldd_actions").hide();
  
  $(".txt_status").hide();
  $("#mhc_upload_status").hide();
  $("#mhc_view_hier").hide();
  $("#rep_gen_2").hide();
  
  $("#filter_scenario").hide();
  $("#filter_insight").hide();
  $("#filter_ent").hide();
  $("#ext_list").hide();
  $("#sel_ext_list").hide();
  $("#ext_done").hide();
  
  $("#fact_ext_list").hide();
  $("#fact_sel_ext_list").hide();
  $("#fact_done").hide();
  
  $("#predefine_kpi").hide();
  $("#userdefine_kpi").hide();
  $("#asset_kpi_info").hide();
  
  $("#kpi_create").hide();
  $("#tbl_kpi_asset_map").hide();
  $("#asset_data").hide();
  $("#loc_1").hide();
  $("#loc_2").hide();
  
  $("#asset_loc_1").hide();
  $("#asset_loc_2").hide();
  $("#col_filter").hide();
  $("#kpi_map_save").hide();
  $("#msg_sys_success").hide();
  
  $("#kpi_thresh_tree").hide();
  $("#thresh_det").hide();
  $("#kpi_det").hide();
  $("#thresh_target").hide();
  
  $("#accordion_loc").hide();
  $("#atm_loc_1").hide();
  $("#asset_list_wrap").hide();
  $("#tbl_asset_tag_map").hide();
  $("#asset_map_save").hide();
  $("#tags_list").hide();
  $("#atm_tag_list").hide();
  
  $("#dtl_tag_list").hide();
  $("#sel_dtl_tag").hide();
  $("#msg_tag_save").hide();
  $(".tag_limit").hide();
  
  $("#sel_rep_hier").hide();
  $("#ds_hier").hide();
  $("#schema_diagram").hide();
  $("#atm_sys_create1").hide();
  $("#atm_sys_create2").hide();
  $("#atm_sys_create3").hide();
  $("#atm_sys_create4").hide();
  $("#atm_sys_create5").hide();
  $("#atm_sys_create6").hide();
  //$("#tbl_assets").hide();
  //$("#tbl_tags").hide();
  $("#config_details").hide();
  $("#scen_list").hide();
  $("#scen_list1").hide();
  $("#config_msg_save").hide();
  
  // Invoke Show / Hide of elements
  /* Connection Settings */
  $("input[name='con_name']").change(function(){
    if($("input[name='con_name']:checked").length > 0)
    {  $("#btn_est_conn").removeAttr("disabled");  }
    else
    {
      $("#btn_est_conn").attr("disabled", "disabled");
    }
  });
  
  
  $("#conn_filter").change(function(){
    if($(this).val() == "insights")
    {
      $("#ins_list").show();
      $("#scen_list").hide();
    }
    else if($(this).val() == "scenarios")
    {
      $("#ins_list").hide();
      $("#scen_list").show();
    }
  });
  
  $("#conn_filter1").change(function(){
    if($(this).val() == "insights")
    {
      $("#ins_list1").show();
      $("#scen_list1").hide();
    }
    else if($(this).val() == "scenarios")
    {
      $("#ins_list1").hide();
      $("#scen_list1").show();
    }
  });
  
  /* Connection Settings -> Establish Connection */
  $("#btn_est_conn").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var selected_conn = $('input[name="con_name"]:checked').val();
      $("#modal_est_con_title").text("Establish " + selected_conn + " Connection");
    }
    else
    {  return false;  }
  });
  
  $("#btn_conn_test").click(function(){
    $("#conn_test_msg").show();
    setTimeout(function() {
      $("#conn_test_msg").hide();
      $("#conn_succ_msg2").show();
      $("#btn_conn_save").removeAttr("disabled");
    }, 1000);
    $(this).attr("disabled", "disabled");
  });
  
  /* Connection Settings -> Master Hierarchy */
  $("#trig_master_create").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#origin_land").hide();
      $("#master_create").show();
    }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy */
  $("input[name='source_system']").change(function(){
    var tbl_markup = "";
    
    // Get all selected KPIs and generate the table data markup
    var sel_ss = $("input[name='source_system']:checked");
    
    if(sel_ss.length > 0)
    {
      sel_ss.each(function(index){
        tbl_markup += "<tr>";
        tbl_markup += "<td>0FUNCT_LOC_TEXT"+ index +"</td>";
        tbl_markup += "<td>Extractor "+ index +"<a href='javascript:;' id='ss_info_"+ index +"' class='fa fa-info-circle ss_info'></a></td>";
        tbl_markup += "<td>"+ $(this).val() +"</td>";
        tbl_markup += "</tr>";
      });
    
      $("#extractor_list").html(tbl_markup);
      $("#extractor_list_wrap").show();
      $("#job_view").removeAttr("disabled");
    }
    else
    {
      $("#extractor_list").empty();
      $("#extractor_list_wrap").hide();
      $("#job_view").attr("disabled", "disabled");
    }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs */
  $("#job_view").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#master_create").hide();
      $("#exec_job").show();
    }
    else
    {  return false;  }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Back */
  $("#exec_back").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#exec_job").hide();
      $("#master_create").show();
    }
    else
    {  return false;  }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Execute All */
  $("#exec_all").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#exec_back").attr("disabled", "disabled");
      $(this).attr("disabled", "disabled");
      
      // Display In progress status
      $("[id^='sys_ip_']").show();
      $("[id^='data_ip_']").show();
      
      setTimeout(function() {
        $("[id^='sys_ip_']").hide();
        $("[id^='data_ip_']").hide();
        
        $("[id^='sys_success_']").show();
        $("[id^='data_success_']").show();
        $(".dload_log_link").show();
        $("#exec_next").removeAttr("disabled");
        
        $("#etl_ts_1").text(new Date().today() + " " + new Date().timeNow());
        $("#etl_ts_2").text(new Date().today() + " " + new Date().timeNow());
      }, 1000);
    }
    else
    {  return false;  }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Next */
  $("#exec_next").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#exec_job").hide();
      $("#hier_creation").show();
    }
  });
  
  $("#mhc_dload_data").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $(this).attr("disabled", "disabled");
      $("#mhc_upload_hier").removeAttr("disabled");
    }
    else
    {  return false;  }
  });
  
  $("#mhc_upload_hier").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $(this).attr("disabled", "disabled");
      $("#mhc_upload_status").show();
      setTimeout(function() {
        $("#mhc_upload_status").hide();
        $("#mhc_view_hier").show();
		
      }, 1000);
    }
    else
    {  return false;  }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Next -> View master hierarchy */
  $("#mhc_view_hier").click(function(){
    $("#mhc_hier_data_display").show();
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Next -> View master hierarchy -> Confirm */
  $("#hier_confirm").click(function(){
    $('#confirm_mast_hier').modal('hide');
  });
  
  $("#hier_confirm_create").click(function(){
    $('#confirm_mast_create').modal('hide');
    
    $("#hier_creation").hide();
    $("#trig_master_create").attr("disabled", "disabled");
    $("#trig_master_view").removeAttr("disabled");
    $("#origin_land").show();
  });
  
  $("#trig_master_view, .mh_view").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#view_mh").show();
    }
  });
  
  /* Connection Settings -> Reporting Hierarchy -> Hierarchy preview */
  $(".hier_preview").click(function(){
    // Reset the row styling
    $("#tbl_hier_rep").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(1).text();
    $("#hier_name").text(name_value);
    $("#show_rep_hier").show();
  });
  
  /* Connection Settings -> Reporting Hierarchy -> Create reporting hierarchy */
  $("#rh_create").click(function(){
    $("#list_hier").hide();
    $("#create_hier").show();
  });
  
  /* Connection Settings -> Reporting Hierarchy -> New hierarchy */
  $('input[name="plant_name"]').change(function(){
    $("#rh_clone").removeAttr("disabled");
  });
  
  $("#rh_clone").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var selected_plant = $('input[name="plant_name"]:checked').val();
      $("#rep_hier_name").val(selected_plant);
      $("#rep_hier_desc").val("Reporting hierarchy is prepared to build reports for the management.  " + selected_plant + " plant.");
      $("#rep_hier_new").val("New hierarchy for " + selected_plant);
      
      $("#rh_save").removeAttr("disabled");
    }
  });
  
  $("#rh_confirm").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $('#save_rep_hier').modal('hide');
      $("#list_hier").show();
      $("#create_hier").hide();
    }
  });
  
  $("#rh_save").click(function(){
    if($(this).attr("disabled") == "disabled")
    {
      return false;
    }
  });
  
  /* Data Extraction -> Select Type */
  $("[name='data_type']").change(function(){
    $("#ext_list").hide();
    $("#ext_list2").hide();
    $("#ext_list3").hide();
    $("#ldd_actions").hide();
    
    var sel_type = $("[name='data_type']:checked").val();
    if(sel_type == "Scenario")
    {
      $("#filter_insight").hide();
      $("#filter_ent").hide();
      $("#filter_scenario").show();
    }
    else if(sel_type == "Insights")
    {
      $("#filter_ent").hide();
      $("#filter_scenario").hide();
      $("#filter_insight").show();
    }
    else if(sel_type == "Enterprise")
    {
      $("#filter_scenario").hide();
      $("#filter_insight").hide();
      $("#filter_ent").show();
    }
  });
  
  /* Data Extraction -> Select ... */
  $("#data_system").change(function(){
    var data_sys_val = $("#data_system").val();
    
    var tbl1 = false;
    var tbl2 = false;
    var tbl_combo = false;
    
    for(var cnt = 0; cnt < data_sys_val.length; cnt++)
    {
      if(data_sys_val[cnt] == "SAP PM")
      {  tbl1 = true;  }
      else if(data_sys_val[cnt] == "IBM Maximo")
      {  tbl2 = true;  }
    }

    if(tbl1 == true && tbl2 == true)
    {  tbl_combo = true;  }

    // Display extractor list only when both fields of combination have values
    if(tbl_combo == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").show();
      $("#ldd_actions").show();
    }
    else if(tbl1 == true)
    {
      $("#ext_list").show();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else if(tbl2 == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").show();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").hide();
    }
  });
  
  
  
  $("#data_system_in").change(function(){
    var data_sys_ins_val = $("#data_system_in").val();
    
    var tbl1 = false;
    var tbl2 = false;
    var tbl_combo = false;
    
    for(var cnt = 0; cnt < data_sys_ins_val.length; cnt++)
    {
      if(data_sys_ins_val[cnt] == "SAP PM")
      {  tbl1 = true;  }
      else if(data_sys_ins_val[cnt] == "IBM Maximo")
      {  tbl2 = true;  }
    }

    if(tbl1 == true && tbl2 == true)
    {  tbl_combo = true;  }

    // Display extractor list only when both fields of combination have values
    if(tbl_combo == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").show();
      $("#ldd_actions").show();
    }
    else if(tbl1 == true)
    {
      $("#ext_list").show();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else if(tbl2 == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").show();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").hide();
    }
  });
  
  $("#data_system_ent").change(function(){
    var data_ent_val = $("#data_system_ent").val();
    
    var tbl1 = false;
    var tbl2 = false;
    var tbl_combo = false;
    
    for(var cnt = 0; cnt < data_ent_val.length; cnt++)
    {
      if(data_ent_val[cnt] == "SAP PM")
      {  tbl1 = true;  }
      else if(data_ent_val[cnt] == "IBM Maximo")
      {  tbl2 = true;  }
    }

    if(tbl1 == true && tbl2 == true)
    {  tbl_combo = true;  }

    // Display extractor list only when both fields of combination have values
    if(tbl_combo == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").show();
      $("#ldd_actions").show();
    }
    else if(tbl1 == true)
    {
      $("#ext_list").show();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else if(tbl2 == true)
    {
      $("#ext_list").hide();
      $("#ext_list2").show();
      $("#ext_list3").hide();
      $("#ldd_actions").show();
    }
    else
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").hide();
    }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> Info button */
  /*$(".dim_type_info, .fact_info").popover({
    html:true,
    placement: "bottom",
    title: $(this).parent("td").text(),
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  });*/
  
  $("input[name='ext_name_sap_all']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("input[name='ext_name_sap']").prop("checked", true);
    }
    else
    {
      $("input[name='ext_name_sap']").removeAttr("checked");
    }
  });
  
  $("input[name='ext_name_ibm_all']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("input[name='ext_name_ibm']").prop("checked", true);
    }
    else
    {
      $("input[name='ext_name_ibm']").removeAttr("checked");
    }
  });
  
  $("input[name='ext_name_all']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("input[name='ext_name']").prop("checked", true);
    }
    else
    {
      $("input[name='ext_name']").removeAttr("checked");
    }
  });
  
  $("input[name='fact_ext_name_all']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("input[name='fact_ext_name']").prop("checked", true);
    }
    else
    {
      $("input[name='fact_ext_name']").removeAttr("checked");
    }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> Select extractors */
  $("input[name='ext_name_all'], input[name='ext_name_sap_all'], input[name='ext_name_ibm_all'], input[name='ext_name'], input[name='ext_name_ibm'], input[name='ext_name_sap']").change(function(){
    if(($("input[name='ext_name']:checked").length > 0) || ($("input[name='ext_name_ibm']:checked").length > 0) || ($("input[name='ext_name_sap']:checked").length > 0))
    {  $("#ext_view_jobs").removeAttr("disabled");  }
    else
    {  $("#ext_view_jobs").attr("disabled", "disabled");  }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> View Jobs */
  $("#ext_view_jobs").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#ext_list").hide();
      $("#ext_list2").hide();
      $("#ext_list3").hide();
      $("#ldd_actions").hide();
      
      $("#data_scenario, #data_system, #data_insight, #data_system_in, #data_system_ent").attr("disabled", "disabled");
      $("#sel_ext_list").show();
    }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> View Jobs -> Back */
  $("#ext_back").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#sel_ext_list").hide();
      $("#data_scenario, #data_system, #data_insight, #data_system_in, #data_system_ent").removeAttr("disabled");
      $("#ext_list").show();
      $("#ldd_actions").show();
    }
    else
    {  return false;  }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> View Jobs -> Execute All */
  $("#ext_exec_all").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#ext_back").attr("disabled", "disabled");
      $(this).attr("disabled", "disabled");
      
      // Display In progress status
      $("[id^='de_sys_ip_']").show();
      $("[id^='de_data_ip_']").show();
      
      setTimeout(function() {
        $("[id^='de_sys_ip_']").hide();
        $("[id^='de_data_ip_']").hide();
        
        $("[id^='de_sys_success_']").show();
        $("[id^='de_data_success_']").show();
        $(".dload_log_link").show();
        
        $("[id^='de_etl_ts_']").text(new Date().today() + " " + new Date().timeNow());
        
        $("#ext_done").show();
      }, 1000);
      $(this).hide();
    }
    else
    {  return false;  }
  });
  
  //**************************************************************
  
  /* Data Extraction -> Facts data -> View Extractors */
  $("#fact_ext_view").click(function(){
    $(this).hide();
    $("#fact_ext_list").show();
  });
  
  /* Data Extraction -> Facts data -> List of extractors -> Select extractors */
  /*$("input[name='fact_ext_name_all']").change(function(){
    if($("input[name='fact_ext_name']:checked").length > 0)
    {  $("#ext_view_jobs").removeAttr("disabled");  }
    else
    {  $("#ext_view_jobs").attr("disabled", "disabled");  }
  });*/
  
  
  $("input[name='fact_ext_name_all'], [name='fact_ext_name']").change(function(){
    if($("input[name='fact_ext_name']:checked").length > 0)
    {  $("#fact_ext_view_jobs").removeAttr("disabled");  }
    else
    {  $("#fact_ext_view_jobs").attr("disabled", "disabled");  }
  });
  
  /* Data Extraction -> Facts data -> List of extractors -> View Jobs */
  $("#fact_ext_view_jobs").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#fact_ext_list").hide();
      $("#fact_dt").attr("disabled", "disabled");
      $("#fact_sel_ext_list").show();
    }
  });
  
  /* Data Extraction -> Facts data -> List of extractors -> View Jobs -> Back */
  $("#fact_back").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#fact_sel_ext_list").hide();
      $("#fact_dt").removeAttr("disabled");
      $("#fact_ext_list").show();
    }
    else
    {  return false;  }
  });
  
  /* Data Extraction -> Facts data -> List of extractors -> View Jobs -> Execute All */
  $("#fact_exec_all").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#fact_back").attr("disabled", "disabled");
      $(this).attr("disabled", "disabled");
      
      // Display In progress status
      $("[id^='fe_sys_ip_']").show();
      $("[id^='fe_data_ip_']").show();
      
      setTimeout(function() {
        $("[id^='fe_sys_ip_']").hide();
        $("[id^='fe_data_ip_']").hide();
        
        $("[id^='fe_sys_success_']").show();
        $("[id^='fe_data_success_']").show();
        $(".dload_log_link1").show();
        
        $("[id^='fe_etl_ts_']").text(new Date().today() + " " + new Date().timeNow());
        
        $("#fact_done").show();
      }, 1000);
      $(this).hide();
    }
    else
    {  return false;  }
  });
  
  /* Historian Configuration -> Browse tags -> Search tag */
  $("#pro_hist_sys").change(function(){
    if($(this).val() != "")
    {  $("#tag_srch").removeAttr("disabled");  }
    else
    {  $("#tag_srch").attr("disabled", "disabled");  }
  });
  
  $("#tag_srch").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {  $("#br_tag_details").show();  }
  });
  
  /* Historian Configuration -> Browse tags -> Search tag -> View Tag Info */
  $(".view_tag_info").click(function(){
    // Reset the row styling
    $("#tag_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(0).text();
    $("#tag_info_name").text(name_value);
    $("#tag_details").show();
  });
  
  /* Historian Configuration -> Derived tags -> Search tag */
  $("#pro_hist_sys1").change(function(){
    if($(this).val() != "")
    {  $("#tag_srch1").removeAttr("disabled");  }
    else
    {  $("#tag_srch1").attr("disabled", "disabled");  }
  });
  
  $("#tag_srch1").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {  $("#derv_tag_details").show();  }
  });
  
  $("[name='derv_tag']").change(function(){
    $("#derv_tag_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    
    var derv_formula = $("#derv_tag_formula").val();
    var sel_val = $(this).val();
    
    $("#derv_tag_formula").val(derv_formula + sel_val);
  });
  
  
  $(".btn_calc").click(function(){
    var derv_formula = $("#derv_tag_formula").val();
    
    var sel_val = $(this).text();
    
    $("#derv_tag_formula").val(derv_formula + sel_val);
  });
  
  $("#derv_tag_name").change(function(){
    if($(this).val() != "")
    {
      $("#derv_tag_submit").removeAttr("disabled");
    }
    else
    {
      $("#derv_tag_submit").attr("disabled", "disabled");
    }
  });
  
  $("#derv_tag_submit").click(function(){
    var tag_name_markup = "";
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var new_tag_name = $("#derv_tag_name").val();
      
      tag_name_markup += "<tr>";
      tag_name_markup += "<td>" + new_tag_name + "</td>";
      tag_name_markup += "<td class='text-center'><a href='javascript:;' title='Edit' class='fa fa-edit'></a></td>";
      tag_name_markup += "<td class='text-center'><a href='javascript:;' title='Delete' class='fa fa-trash'></a></td>";
      tag_name_markup += "</tr>";
      
      $("#derv_tag_data").prepend(tag_name_markup);
    }
  });
  
  /* Historian Configuration -> Derived tags -> Search tag -> View Tag Info */
  $(".view_derv_tag_info").click(function(){
    // Reset the row styling
    $("#derv_tag_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    
    // Set Titles in modal window information
    var tag_name = $(this).attr("rel");
    $("#tag_info_title, #tag_info_det_title").text(tag_name);
  });
  
  /******************************************************************/
  
  /* Asset KPI Mapping -> Select KPI */
  $("input[name='kpi_type']").change(function(){
    // Get selected KPI type value and show/hide relevant DIV
    var sel_kpi_type = $("input[name='kpi_type']:checked");
    if(sel_kpi_type.val() == "Predefined KPIs")
    {
      $("#userdefine_kpi").hide();
      $("#predefine_kpi").show();
    }
    else if(sel_kpi_type.val() == "User Defined KPIs")
    {
      $("#predefine_kpi").hide();
      $("#userdefine_kpi").show();
    }
    else
    {
      $("#predefine_kpi").hide();
      $("#userdefine_kpi").hide();
    }
  });
  
  /* Asset KPI Mapping -> Select KPI -> Predefined KPI -> View Details */
  $(".pd_kpi_info").click(function(){
    // Reset the row styling
    $("#pd_kpi_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(0).text();
    $("#asset_kpi_sel").text(name_value);
    $("#asset_kpi_info").show();
  });
  
  /* Asset KPI Mapping -> Select KPI -> User defined KPI -> View Details */
  $(".pd_kpi_info").click(function(){
    // Reset the row styling
    $("#pd_kpi_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(0).text();
    $("#asset_kpi_sel").text(name_value);
    $("#asset_kpi_info").show();
  });
  
  /* Asset KPI Mapping -> User defined KPIs -> Create KPI */
  $("#btn_kpi_create").click(function(){
    $("#kpi_create").show();
  });
  
  $("#cr_kpi_name, [name='cr_kpi_insight'], [name='cr_kpi_scen']").change(function(){
    var new_kpi_name = $("#cr_kpi_name").val();
    var sel_kpi_ins = $("[name='cr_kpi_insight']:checked");
    var sel_kpi_scen = $("[name='cr_kpi_scen']:checked");
    
    if((new_kpi_name == "") || (sel_kpi_ins.length == 0) || (sel_kpi_scen.length == 0))
    {
      $("#btn_kpi_save").attr("disabled", "disabled");
    }
    else
    {
      $("#btn_kpi_save").removeAttr("disabled");
    }
  });
  
  $("#btn_kpi_save").click(function(){
    var tag_name_markup = "";
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var new_kpi_name = $("#cr_kpi_name").val();
      var sel_kpi_ins = $("[name='cr_kpi_insight']:checked");
      var sel_kpi_scen = $("[name='cr_kpi_scen']:checked");
      
      var new_kpi_ins = sel_kpi_ins.map(function(){
          return this.value;
        }).get().join(", ");
        
      var new_kpi_scen = sel_kpi_scen.map(function(){
          return this.value;
        }).get().join(", ");
      
      tag_name_markup += "<tr>";
      tag_name_markup += "<td>" + new_kpi_name + "</td>";
      tag_name_markup += "<td>" + new_kpi_ins + "</td>";
      tag_name_markup += "<td>" + new_kpi_scen + "</td>";
      tag_name_markup += "<td class='text-center'><a href='javascript:;' title='Details' class='fa fa-info-circle ud_kpi_info'></a></td>";
      tag_name_markup += "<td class='text-center'><a href='javascript:;' title='Edit' class='fa fa-edit'></a></td>";
      tag_name_markup += "</tr>";
      
      $("#kpi_save_data").prepend(tag_name_markup);
    }
  });
  
  
  
  
  
  
  
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Select Reporting Hierarchy */
  $("#rep_hier").change(function(){
    if($(this).val() == "")
    {
      $("#loc_1").hide();
      $("#loc_2").hide();
      $("#asset_loc_1").hide();
      $("#asset_loc_2").hide();
      $("#col_filter").hide();
    }
    else if($(this).val() == "Reporting Hierarchy 1")
    {
      $("#loc_1").show();
      $("#loc_2").hide();
    }
    else if($(this).val() == "Reporting Hierarchy 2")
    {
      $("#loc_2").show();
      $("#loc_1").hide();
    }
  });
  
  $("#loc_1").click(function(){
    $("#asset_loc_1").show();
    $("#asset_loc_2").hide();
    //$("#col_filter").show();
  });
  
  $("#loc_2").click(function(){
    $("#asset_loc_1").hide();
    $("#asset_loc_2").show();
    $("#col_filter").show();
  });
  
  $("#filter_srch").click(function(){
    $("#asset_data").show();
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI */
  $("[name='ud_kpi_name']").change(function(){
    $("[name='ud_kpi_name']").parents("tr").removeClass("info");
    
    if($("[name='ud_kpi_name']:checked").length > 0)
    {
      $("#kpi_add").removeAttr("disabled");
      
      $("[name='ud_kpi_name']:checked").each(function(){
        $(this).parents("tr").addClass("info");
      });
    }
    else
    {
      $("#kpi_add").attr("disabled", "disabled");
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI */
  $("#kpi_add").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var tbl_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_kpis = $("input[name='ud_kpi_name']:checked");
      
      sel_kpis.each(function(){
        tbl_markup += "<tr>";
        tbl_markup += "<td class='text-center'><input type='radio' name='kpi_map' id='" + id_counter + "' value='" + $(this).val() + "' /></td>";
        tbl_markup += "<td>" + $(this).val() + "</td>";
        tbl_markup += "<td rel='" + $(this).val() + "_" + id_counter + "'>None</td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' class='fa fa-remove del_map'></a></td>";
        tbl_markup += "</tr>";
        
        id_counter++;
      });
      
      $("#data_kpi_asset_map").append(tbl_markup);
      $("#info_msg_kpi_map").hide();
      $("#tbl_kpi_asset_map").show();
      
      // Untick all KPI checkboxes
      $("[name='ud_kpi_name']").parents("tr").removeClass("info");
      $("[name='ud_kpi_name']").attr('checked', false);
      $(this).attr("disabled", "disabled");
      
      $("#kpi_map_save").show();
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI -> Select Asset */
  $("[name='info_asset']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("#btn_asset_add").removeAttr("disabled");
    }
    else
    {
      $("#btn_asset_add").attr("disabled", "disabled");
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI -> Select Asset -> Add */
  $("#btn_asset_add").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var td_data_markup = "";
      
      // Check if KPI to be mapped with the selected asset is selected
      if(! $("[name='kpi_map']").is(":checked"))
      {
        $('#modal_kpi_asset_map').modal();
        //alert("Please select the KPI to be mapped to this asset");
        return false;
      }
      else
      {
        // Associate the selected Asset with the corresponding KPI
        var sel_asset = $("[name='info_asset']:checked").val();
        var sel_kpi = $("[name='kpi_map']:checked").val();
        var sel_kpi_id = $("[name='kpi_map']:checked").attr("id");
        var td_data = $("[rel='" + sel_kpi + "_" + sel_kpi_id + "']");
        
        td_data_markup += "<a href='javascript:;' data-toggle='modal' data-target='#map_asset_tag' rel='map_link_" + sel_kpi + "'>" + sel_asset + "</a>";
        
        td_data.empty();
        td_data.html(td_data_markup);
      }
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI -> Select Asset -> Add -> Select Tag name from modal */
  $("[name='map_tag_name']").change(function(){
    if($(this).is(":checked") == true)
    {
      $("#btn_map_tag").removeAttr("disabled");
    }
    else
    {
      $("#btn_map_tag").attr("disabled", "disabled");
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Add KPI -> Select Asset -> Add -> Select Tag name from modal -> OK */
  $("#btn_map_tag").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    { 
      var sel_tag_name = $("[name='map_tag_name']:checked").val();
      var sel_kpi = $("[name='kpi_map']:checked").val();
      var sel_kpi_id = $("[name='kpi_map']:checked").attr("id");
      var td_data = $("[rel='" + sel_kpi + "_" + sel_kpi_id + "']");
      
      var td_data_markup_upd = td_data.html();
      td_data.html(td_data_markup_upd + " &gt; " + sel_tag_name);
      
      $('#map_asset_tag').modal('hide');
      
      // Check if all data is mapped and enable Save button
      var map_cell = $("#data_kpi_asset_map td[rel]");
      map_cell.each(function(){
        if(($(this).text() != "") && ($(this).text() != "None"))
        {
          $("#kpi_map_save").removeAttr("disabled");
        }
        else
        {
          $("#kpi_map_save").attr("disabled", "disabled");
        }
      });
    }
  });
  
  $("#kpi_map_save").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      // Fetch values from all rows
      $("#data_kpi_asset_map td [name='kpi_map']").each(function() {
        var cell_val = $(this).val();
        
        var str_tick = "<span class='fa fa-check text-success' style='float:right;'></span>";
        $("[name='ud_kpi_name'][value='" + cell_val + "']").parent("td").next("td").append(str_tick);
        
        $("#data_kpi_asset_map").empty();
        $("#kpi_map_save").attr("disabled", "disabled");
        $("#kpi_map_save").hide();
        $("#tbl_kpi_asset_map").hide();
        $("#info_msg_kpi_map").show();
      });
    }
  });
  
  /* Asset KPI Mapping -> KPI Asset Mapping -> Delete KPI Asset map */
  $(document).on("click", ".del_map", function(){
    $(this).parents("tr").remove();
  });
  
  /* Asset KPI Mapping -> KPI Threshold Mapping */
  $("#kpi_thresh_hier").change(function(){
    if($(this).val() == "")
    {
      $("#kpi_thresh_tree").hide();
    }
    else if($(this).val() == "Reporting Hierarchy 1")
    {
      $("#kpi_thresh_tree").show();
    }
  });
  
  $("#kpi_thresh_tree").click(function(){
    $("#thresh_det").show();
  });
  
  $("#thresh_srch_filter select").change(function(){
    if(($("#kpi_insight").val() != "") && ($("#kpi_scen").val() != "") && ($("#kpi_name_thresh").val() != ""))
    {
      $("#kpi_det").show();
    }
    else
    {  $("#kpi_det").hide();  }
  });
  
  $("#add_thresh_target").click(function(){
    $("#thresh_target").show();
    $(this).attr("disabled", "disabled");
  });
  
  /******************************************************************/
  
  /* Asset Tag Mapping */
  /* Asset Tag Mapping -> Select Reporting Hierarchy */
  $("#atm_rep_hier").change(function(){
    if($(this).val() == "")
    {
      $("#atm_loc_1").hide();
      $("#atm_filter").hide();
    }
    else if($(this).val() == "Reporting Hierarchy 1")
    {
      $("#accordion_loc").show();
      $("#loc_1").show();
      //$("#btn_asset_srch").removeAttr("disabled");
    }
  });
  
  $("#loc_1").click(function(){
    $("#atm_loc_1").show();
  });
  
  $("#btn_asset_srch").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
	  $("#col_filter").show();
      $("#asset_list_wrap").show();
    }
  });
  
  /* Asset Tag Mapping -> Select Reporting Hierarchy -> Select Assets */
  $("[name='asset_name']").change(function(){
    $("[name='asset_name']").parents("tr").removeClass("info");
    
    if($("[name='asset_name']:checked").length > 0)
    {
      $("#btn_add_asset").removeAttr("disabled");
      
      $("[name='asset_name']:checked").each(function(){
        $(this).parents("tr").addClass("info");
      });
    }
    else
    {
      $("#btn_add_asset").attr("disabled", "disabled");
    }
  });
  
  /* Asset Tag Mapping -> Select Reporting Hierarchy -> Add Assets */
  $("#btn_add_asset").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var tbl_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_assets = $("input[name='asset_name']:checked");
      
      sel_assets.each(function(){
        tbl_markup += "<tr>";
        tbl_markup += "<td class='text-center'><input type='radio' name='asset_map' value='" + $(this).val() + "' /></td>";
        tbl_markup += "<td>" + $(this).val() + "</td>";
        tbl_markup += "<td rel='" + $(this).val() + "'>None</td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' class='fa fa-remove del_asset_map'></a></td>";
        tbl_markup += "</tr>";
        
        // Remove the complete row from source table so that duplicate selection not possible
        $(this).parents("tr").hide();
      });
      
      $("#data_asset_tag_map").append(tbl_markup);
      $("#info_msg_kpi_map").hide();
      $("#tbl_asset_tag_map").show();
      
      // Untick all KPI checkboxes
      $("[name='asset_name']").parents("tr").removeClass("info");
      $("[name='asset_name']").attr('checked', false);
      $(this).attr("disabled", "disabled");
      
      $("#asset_map_save").show();
    }
  });
  
  /* Asset Tag Mapping -> Delete Asset Tag map */
  $(document).on("click", ".del_asset_map", function(){
    var display_asset_val = $(this).parents("tr").children("td").eq(1).text();
    
    $("[name='asset_name'][value='" + display_asset_val + "']").parents("tr").show();
    $(this).parents("tr").remove();
  });
  
  /* Asset Tag Mapping -> Select Process Historian System -> Search tags */
  $("#atm_hist_sys").change(function(){
    if($(this).val() != "")
    {  $("#atm_tag_srch").removeAttr("disabled");  }
    else
    {  $("#atm_tag_srch").attr("disabled", "disabled");  }
  });
  
  $("#atm_tag_srch").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {  $("#atm_tag_list").show();  }
  });
  
  /* Asset Tag Mapping -> Select Process Historian System -> Search tags -> Select Tags */
  $("[name='atm_tag']").change(function(){
    if($("[name='atm_tag']:checked").length > 0)
    {
      $("#btn_add_tag").removeAttr("disabled");
    }
    else
    {
      $("#btn_add_tag").attr("disabled", "disabled");
    }
  });
  
  /* Asset Tag Mapping -> Select Process Historian System -> Select Tags -> Add */
  $("#btn_add_tag").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var td_data_markup = "";
      
      // Check if Tag to be mapped with the selected asset is selected
      if($("[name='asset_map']:checked").length == 0)
      {
        $('#modal_tag_asset_map').modal();
        //alert("Please select the Asset to be mapped to the selected tag(s)");
        return false;
      }
      else
      {
        // Associate the selected Asset with the corresponding KPI
        var sel_asset = $("[name='asset_map']:checked").val();
        var sel_tags = $("[name='atm_tag']:checked");
        
        var td_data = $("[rel='" + sel_asset + "']");
        var link_td_data = $("[rel='" + sel_asset + "']").prev();
        
        var cs_tag_val = sel_tags.map(function(){
          return this.value;
        }).get().join(", ");
        
        td_data_markup += "<a href='javascript:;' data-toggle='modal' data-target='#map_asset_tag' rel='map_link_" + sel_asset + "'></a>";
        td_data.empty();
        td_data.html(cs_tag_val);
        link_td_data.wrapInner(td_data_markup);
      }
      
      // Untick all selected tags
      $("[name='atm_tag']").attr("checked", false);
      $(this).attr("disabled", "disabled");
    }
  });
  
  /* Asset Tag Mapping -> Select Process Historian System -> Select Tags -> Add -> Update mapping */
  $(document).on("click", "[data-target='#map_asset_tag']", function(){
    var sel_asset = $(this).text();
    var tag_val_td = $(this).parents("td").next("td").text();
    var cs_tag_list = tag_val_td.split(",");
    var tbl_markup = "";
    
    if(cs_tag_list.length > 0)
    {
      for(var i = 0; i < cs_tag_list.length; i++)
      {
        tbl_markup += "<tr>";
        tbl_markup += "<td class='text-center'><input type='checkbox' value='" + cs_tag_list[i] + "' name='modal_atm_tag' checked='checked'></td>";
        tbl_markup += "<td>" + cs_tag_list[i] + "</td>";
        tbl_markup += "</tr>";
      }
      
      $("#tbl_asset_tag_maps").empty();
      $("#tbl_asset_tag_maps").html(tbl_markup);
      $("#asset_title").text(sel_asset);
    }
  });
  
  
  /* Asset Tag Mapping -> Select Process Historian System -> Select Tags -> Add -> Update mapping -> Selection update -> OK */
  $("#btn_map_tag").click(function(){
    // Get the new value array and update data in parent table
    var upd_tags = $("[name='modal_atm_tag']:checked");
    var asset_name = $("#asset_title").text();
    
    if(upd_tags.length > 0)
    {
      var upd_tag_val = upd_tags.map(function(){
        return this.value;
      }).get().join(", ");
      
      $("td[rel='" + asset_name + "']").empty();
      $("td[rel='" + asset_name + "']").text(upd_tag_val);
      
      //$("#asset_map_save").removeAttr("disabled");
    }
    else
    {
      $("a[rel='map_link_" + asset_name + "']").remove();
      $("td[rel='" + asset_name + "']").prev().text(asset_name);
      $("td[rel='" + asset_name + "']").empty();
      $("td[rel='" + asset_name + "']").text("None");
      
      //$("#asset_map_save").attr("disabled", "disabled");
    }
  });
  
  /* Asset Tag Mapping -> Define Tag Limits -> Select Process Historian System */
  $("#dtl_hist_sys").change(function(){
    if($(this).val() != "")
    {  $("#dtl_tag_srch").removeAttr("disabled");  }
    else
    {
      $("#dtl_tag_srch").attr("disabled", "disabled");
      $("#dtl_tag_list").hide();
    }
  });
  
  $("#dtl_tag_srch").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {  $("#dtl_tag_list").show();  }
  });
  
  $(".limit_tag").click(function(){
    var sel_tag = $(this).parent("td").prev().text();
    $("#dtl_tag_name").text(sel_tag);
    $(".tag_limit").show();
  });
  
  $(".tag_limit input, #define-tag .bg_grey select").change(function(){
    $("#btn_dtl_save").removeAttr("disabled");
    $("#btn_dtl_cancel").removeAttr("disabled");
  });
  
  $("#btn_dtl_save").click(function(){
    $(this).attr("disabled", "disabled");
  });
  
  /* Asset Tag Mapping -> Define Tag Limits -> Select Process Historian System -> Select Tage */
  $("[name='dtl_tag']").change(function(){
    $("[name='dtl_tag']").parents("tr").removeClass("info");
    
    if($("[name='dtl_tag']:checked").length > 0)
    {
      $("#dtl_sel_tags").removeAttr("disabled");
      
      $("[name='dtl_tag']:checked").each(function(){
        $(this).parents("tr").addClass("info");
      });
    }
    else
    {
      $("#dtl_sel_tags").attr("disabled", "disabled");
    }
  });
  
  $("#dtl_sel_tags").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var sel_tags_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_tags = $("input[name='dtl_tag']:checked");
      var sel_tag_name;
      
      sel_tags.each(function(){
        sel_tag_name = $(this).parent("td").next().text();
        
        sel_tags_markup += "<p class='tag_wrap'><span>" + sel_tag_name + "</span>";
        sel_tags_markup += "<a href='javascript:;' class='fa fa-remove remove_tag'></a>";
        sel_tags_markup += "</p>";
      });
      
      $("#sel_dtl_tag_list").html(sel_tags_markup);
      $("#sel_dtl_tag").show();
      $("#btn_dtl_assign").removeAttr("disabled");
      $("input[name='dtl_tag']").attr("checked", false);
      $("input[name='dtl_tag']").parents("tr").removeClass("info");
      $("#dtl_sel_tags").attr("disabled", "disabled");
    }
  });
  
  $(document).on("click", ".remove_tag", function(){
    $(this).parents("p").remove();
  });
  
  $("#btn_dtl_assign").click(function(){
    $("#msg_tag_save").show();
    $(this).attr("disabled", "disabled");
    $("#btn_dtl_tag_save").removeAttr("disabled");
  });
  
  $("#btn_create_sys").click(function(){
    $("#atm_sys_list").hide();
    $("#atm_sys_create1").show();
  });
  
  $("#atm_sys_rep_hier").change(function(){
    if($(this).val() == "Reporting Hierarchy 1")
    {
      $("#sel_rep_hier").show();
    }
  });
  
  $("#atm_sys_ds").change(function(){
    if($(this).val() == "TestHistorianDS")
    {
      $("#ds_hier").show();
      $("#btn_atm_sys_next1").removeAttr("disabled");
    }
    else if($(this).val() == "")
    {
      $("#ds_hier").hide();
      $("#btn_atm_sys_next1").attr("disabled", "disabled");
    }
  });
  
  $("#btn_atm_sys_next1").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create1").hide();
      $("#atm_sys_create2").show();
    }
  });
  
  $("#btn_add_schema a").click(function(){
    $("#btn_add_schema").hide();
    $("#schema_diagram").show();
    $("#btn_atm_sys_next2").removeAttr("disabled");
  });
  
  $("#btn_atm_sys_back1").click(function(){
    $("#atm_sys_create2").hide();
    $("#atm_sys_create1").show();
  });
  
  $("#btn_atm_sys_next2").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create2").hide();
      $("#atm_sys_create3").show();
    }
  });
  
  $(".asset_tag_info").popover({
    html:true,
    placement: "bottom",
    title: $(this).parent("td").prev().text(),
    content: '<table class="table table-bordered table-striped"><thead><tr><th>Tag Code</th><th>Tag Name</th></tr></thead><tbody><tr><td>10TG1TUR201</td><td>Pressure</td></tr><tr><td>10TG1TUR202</td><td>Temperature</td></tr><tr><td>10TG1TUR203</td><td>Level</td></tr><tr><td>10TG1TUR204</td><td>Crude methanol Acetone Concentration</td></tr><tr><td>10TG1TUR205</td><td>Crude methanol Ethanol concentration</td></tr></tbody></table>'
  });
  
  $("[name='atm_sys_asset']").change(function(){
    $("[name='atm_sys_asset']").parents("tr").removeClass("info");
    
    if($("[name='atm_sys_asset']:checked").length > 0)
    {
      $("#btn_srch_assets").removeAttr("disabled");
      
      $("[name='atm_sys_asset']:checked").each(function(){
        $(this).parents("tr").addClass("info");
      });
    }
    else
    {
      $("#btn_srch_assets").attr("disabled", "disabled");
    }
  });
  
  $("#btn_srch_assets").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var tbl_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_assets = $("input[name='atm_sys_asset']:checked");
      
      sel_assets.each(function(){
        tbl_markup += "<tr>";
        tbl_markup += "<td>" + $(this).val() + "</td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' class='fa fa-remove del_sel_asset'></a></td>";
        tbl_markup += "</tr>";
        
        // Remove the complete row from source table so that duplicate selection not possible
        $(this).parents("tr").hide();
      });
      
      $("#tbl_data_assets").append(tbl_markup);
      $("#tbl_assets").show();
      
      // Untick all KPI checkboxes
      $("[name='atm_sys_asset']").parents("tr").removeClass("info");
      $("[name='atm_sys_asset']").attr('checked', false);
      $(this).attr("disabled", "disabled");
      
      $("#btn_atm_sys_next3").removeAttr("disabled");
    }
  });
  
  $(document).on("click", ".del_sel_asset", function(){
    var display_asset_val = $(this).parent("td").prev().text();
    
    $("[name='atm_sys_asset'][value='" + display_asset_val + "']").parents("tr").show();
    $(this).parents("tr").remove();
    
    if($("#tbl_data_assets").html() == "")
    {
      //$("#tbl_assets").hide();
      $("#btn_atm_sys_next3").attr("disabled", "disabled");
    }
  });
  
  $("#btn_atm_sys_back2").click(function(){
    $("#atm_sys_create3").hide();
    $("#atm_sys_create2").show();
  });
  
  $("#btn_atm_sys_next3").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create3").hide();
      $("#atm_sys_create4").show();
    }
  });
  
  $("[name='atm_sys_tag']").change(function(){
    $("[name='atm_sys_tag']").parents("tr").removeClass("info");
    
    if($("[name='atm_sys_tag']:checked").length > 0)
    {
      $("#btn_sel_tags").removeAttr("disabled");
      
      $("[name='atm_sys_tag']:checked").each(function(){
        $(this).parents("tr").addClass("info");
      });
    }
    else
    {
      $("#btn_sel_tags").attr("disabled", "disabled");
    }
  });
  
  $("#btn_sel_tags").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var tbl_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_assets = $("input[name='atm_sys_tag']:checked");
      
      sel_assets.each(function(){
        tbl_markup += "<tr>";
        tbl_markup += "<td>" + $(this).val() + "</td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' class='fa fa-remove del_sel_tag'></a></td>";
        tbl_markup += "</tr>";
        
        // Remove the complete row from source table so that duplicate selection not possible
        $(this).parents("tr").hide();
      });
      
      $("#tbl_data_tags").append(tbl_markup);
      $("#tbl_tags").show();
      
      // Untick all KPI checkboxes
      $("[name='atm_sys_tag']").parents("tr").removeClass("info");
      $("[name='atm_sys_tag']").attr('checked', false);
      $(this).attr("disabled", "disabled");
      
      $("#btn_atm_sys_next4").removeAttr("disabled");
    }
  });
  
  $(document).on("click", ".del_sel_tag", function(){
    var display_asset_val = $(this).parent("td").prev().text();
    
    $("[name='atm_sys_tag'][value='" + display_asset_val + "']").parents("tr").show();
    $(this).parents("tr").remove();
    
    if($("#tbl_data_tags").html() == "")
    {
      //$("#tbl_tags").hide();
      $("#btn_atm_sys_next4").attr("disabled", "disabled");
    }
  });
  
  $("#btn_atm_sys_back3").click(function(){
    $("#atm_sys_create4").hide();
    $("#atm_sys_create3").show();
  });
  
  $("#btn_atm_sys_next4").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create4").hide();
      $("#atm_sys_create5").show();
    }
  });
  
  $("#atm_sys_create5 input, #atm_sys_create5 select").change(function(){
    $("#btn_atm_sys_next5").removeAttr("disabled");
  });
  
  $("#btn_atm_sys_back4").click(function(){
    $("#atm_sys_create5").hide();
    $("#atm_sys_create4").show();
  });
  
  $("#btn_atm_sys_next5").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create5").hide();
      $("#atm_sys_create6").show();
    }
  });
  
  $("#btn_atm_sys_back5").click(function(){
    $("#atm_sys_create6").hide();
    $("#atm_sys_create5").show();
  });
  
  $("#btn_atm_sys_done").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#atm_sys_create6").hide();
      $("#atm_sys_list").show();
      $("#msg_sys_success").show();
    }
  });
  
  $("#qtr_st").hide();
  $("#qtr_end").hide();
  
  $("#thresh_freq, #targ_val, #thresh_good, #thresh_bad").change(function(){
    var freq = $("#thresh_freq").val();
    
    if(freq == "Quarterly")
    {
      $("#qtr_st").show();
      $("#qtr_end").show();
    }
    var tval = $("#targ_val").val();
    var good_val = $("#thresh_good").val();
    var bad_val = $("#thresh_bad").val();
    
    if(freq != "" && tval != "" && good_val != "" && bad_val !="")
    {  $("#btn_thresh_det").removeAttr("disabled");  }
    else
    {  $("#btn_thresh_det").attr("disabled", "disabled");  }
  });
  
  
  
  $("#btn_thresh_det").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var freq = $("#thresh_freq").val();
      var tval = $("#targ_val").val();
      var good_val = $("#thresh_good").val();
      var bad_val = $("#thresh_bad").val();
      
      json_data = '[{"index":0,"frequency":"' + freq + '","validFrom":"01/01/2015","validTo":"31/03/2015","targetVal":' + tval + ',"badThresh":' + bad_val +',"goodThresh":' + good_val + '}]';
      var test_gauge = new GaugeGenerator();
      test_gauge.result_container = 'gauge_result';
      test_gauge.generate(json_data);
      
    }
  });
  
      
  
  
  /******************************************************************/
  
  /* BO Connection and reports -> Connection Details */
  $("#bo_conn_submit").click(function(){
    $(this).attr("disabled","disabled");
    $("#conn_succ_msg").show();
  });
  
  /* BO Connection and reports -> List of reports -> Generate Reports */
  $("#btn_gen_report").click(function(){
    $("#list_reports").hide();
    $("#gen_reports1").show();
  });
  
  
  $("input[name='kpi_list']").change(function(){
    if($("input[name='kpi_list']:checked").length > 0)
    {  $("#kpi_select").removeAttr("disabled");  }
    else
    {
      $("#sel_kpi_data").empty();
      $("#report_gen_wrap").hide();
      $("#kpi_select").attr("disabled", "disabled");
    }
  });
  
  /* BO Connection and reports -> List of reports -> Select KPI */
  $("#kpi_select").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      var tbl_markup = "";
      
      // Get all selected KPIs and generate the table data markup
      var sel_kpis = $("input[name='kpi_list']:checked");
      
      sel_kpis.each(function(){
        tbl_markup += "<tr>";
        tbl_markup += "<td>" + $(this).val() + "</td>";
        tbl_markup += "<td><input type='text' name='rep_name_"+ $(this).attr("id") + "' id='rep_name_"+ $(this).attr("id") + "' value='' class='form-control' /></td>";
        tbl_markup += "<td><input type='text' name='rep_desc_"+ $(this).attr("id") + "' id='rep_desc_"+ $(this).attr("id") + "' value='' class='form-control' /></td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' id='rep_config_"+ $(this).attr("id") +"' class='fa fa-gears' data-toggle='modal' data-target='#report_config_modal'></a></td>";
        tbl_markup += "<td class='text-center'><a href='javascript:;' id='rep_del_"+ $(this).attr("id") +"' class='fa fa-trash'></a></td>";
        tbl_markup += "</tr>";
      });
      
      $("#sel_kpi_data").html(tbl_markup);
      $("#report_gen_wrap").show();
    }
  });
  
  /* BO Connection and reports -> List of reports -> Select KPI -> Report Configurations */
  $(document).on("click", "[data-target='#report_config_modal']", function(){
    var selected_report = $(this).parents("tr").children("td").eq(0).text();
    $("#report_config_title").text(selected_report + " -  Configuration");
  });
  
  /* BO Connection and reports -> List of reports -> Select KPI -> Generate Reports */
  $("#report_generate").click(function(){
    $("#rep_gen_1").show();
    $("#rep_gen_2").hide();
    setTimeout(function() {
      $("#rep_gen_1").hide();
      $("#rep_gen_2").show();
    }, 1500);
  });
  
  $("#rep_gen_ok").click(function(){
    $('#rep_gen_progress').modal('hide');
    $("#gen_reports1").hide();
    $("#list_reports").show();
  });
  
  $("#rep_chart_type").change(function(){
    if($(this).val() != "")
    {
      $("#config_details").show();
      $("#config_save").removeAttr("disabled");
    }
    else
    {
      $("#config_details").hide();
      $("#config_save").attr("disabled", "disabled");
    }
  });
  
  $("#config_save").click(function(){
    $("#config_msg_save").show();
    setTimeout(function() {
      $("#config_msg_save").hide();
      $('#report_config_modal').modal('hide');
    }, 1500);
  });
  
  /* User Role change - Retain value in localstorage so that it is retained after page reload */
  $("#user_role").change(function(){
    if($(this).val() == "System Administrator")
    {
      $("#bottompanel").hide();
      $("#toolPnl-admin-icons").show();
      $("#toolPnl-all-icons").hide();
    }
    else
    {
      $("#bottompanel").show();
      $("#toolPnl-admin-icons").hide();
      $("#toolPnl-all-icons").show();
    }
    window.location = "index-oneview.html";
    localStorage.setItem("role", $(this).val());
  });
  
  /* User Login and related redirection */
  $("#btn_login").click(function(){
    if($.trim($("#uname").val()) == "")
    {
      alert("Please enter Username");
      $("#uname").val("");
      return false;
    }
    
    var redirect_to = "";
    var user_name = $("#uname").val().toLowerCase();
    
    if(user_name == "administrator")
    {
      redirect_to = "index-oneview-admin.html";
    }
    else if(user_name == "user")
    {
      redirect_to = "index-oneview-user.html";
    }
    else if(user_name == "analyst")
    {
      redirect_to = "index-oneview-analyst.html";
    }
    else if(user_name == "designer")
    {
      redirect_to = "index-oneview.html";
    }
    else
    {
      alert("Invalid Username! Please enter 'Administrator', 'Analyst', 'Designer', or 'User'.");
      return false;
    }
    window.location = redirect_to;
    localStorage.setItem("role", user_name);
  });
  
  
  
  
  // Initialize the JSTree plugin
  $('.tree_wrap').jstree();
  
});

$(window).bind("load", function(){
  var footerHeight = 0,
  footerHeight2 = 0,
  headHeight = $("header").height(),
  footerTop = 0,
  footerTop2 = 0,
  $footer = $(".footer");
  $footer2 = $("#bottompanel");
  positionFooter();
  
  function positionFooter(){
    footerHeight = $footer.height();
    footerTop = ($(window).scrollTop()+$(window).height()-(footerHeight+12))+"px";
    
    var new_width = $(window).width();
    
    if(($("#content-wrapper").height()+headHeight+footerHeight) < $(window).height()){
      $footer.css({
        position: "absolute",
        top: footerTop
      })
    }
    else{
      $footer.css({
        position: "static",
        width:"100%"
      })
    }
	
	  positionFooter2();
  }
  
  $(window).scroll(positionFooter).resize(positionFooter);
  
  function positionFooter2(){
    footerHeight2 = $footer2.height();
    footerTop2 = ($(window).scrollTop()+$(window).height()-(footerHeight2 + 46))+"px";
    
    var new_width = $(window).width();
    
    if(($("#content-wrapper").height()+headHeight+footerHeight2) < $(window).height()){
      $footer2.css({
        position: "absolute",
        top: footerTop2
      })
    }
    else{
      $footer2.css({
        position: "absolute",
        width:"100%",
        top:($("#content-wrapper").height()+headHeight)-39 + "px"
      })
    }
  }
  $(window).scroll(positionFooter2).resize(positionFooter2);



	/*code added by ankita*/
	$("#headingOne .panel-title a").click(function(){
		if(!$("#collapseOne").hasClass(".in")){
			var cssprop = $("#atm_loc_1").css("display");
			if(cssprop!="none"){
				$("#btn_asset_srch").removeAttr("disabled");
				$("#btn_excel_dwnld").removeAttr("disabled");
			}
		}
		if($("#atm_loc_arw").hasClass("fa-chevron-down")){
			$("#atm_loc_arw").removeClass("fa-chevron-down");
			$("#atm_loc_arw").addClass("fa-chevron-up");
		}
		else if($("#atm_loc_arw").hasClass("fa-chevron-up")){
			$("#atm_loc_arw").removeClass("fa-chevron-up");
			$("#atm_loc_arw").addClass("fa-chevron-down");
		}
	});
	
	$("#atm_loc_arw").click(function(){
		$("#headingOne .panel-title a").click();
	});
	$("#exc_upload").click(function(){
		if(! ($(this).attr("disabled") == "disabled"))
		{
		  $("#mhc_upload_status").show();
		  setTimeout(function() {
			$("#mhc_upload_status").hide();
			$("#uploadStat").show();
		  }, 1000);
		}
		else
		{  return false;  }
	});
	$("#menuShowHide").click(function(){
		if($(".menuWrap").css("width")=="63px"){
			$(".menuWrap").animate({"width":"317"});
			$(".userImgCont").animate({"width":"317"});
			$(".disNone").fadeIn();
		}
		else{
			$(".menuWrap").animate({"width":"63"});
			$(".userImgCont").animate({"width":"63"});
			$(".disNone").fadeOut();
		}
	})
	/*code added by ankita*/  
});