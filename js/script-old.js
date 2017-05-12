// For todays date;
Date.prototype.today = function () {
  return this.getFullYear() + "-" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "-" + ((this.getDate() < 10)?"0":"") + this.getDate();
}

// For the time now
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

$(document).ready(function(){
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
  $("#extractor_list_wrap").hide();
  
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
    $("#origin_land").hide();
    $("#master_create").show();
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
        
        $("#etl_ts_1").text(new Date().today() + " " + new Date().timeNow());
        $("#etl_ts_2").text(new Date().today() + " " + new Date().timeNow());
      }, 1000);
    }
    else
    {  return false;  }
  });
  
  /* Connection Settings -> Master Hierarchy -> Create master hierarchy -> View jobs -> Next */
  $("#exec_next").click(function(){
    $("#exec_job").hide();
    $("#hier_creation").show();
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
    }
  });
  
  /* Data Extraction -> Select Type */
  $("[name='data_type']").change(function(){
    $("#ext_list").hide();
    
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
  $("#data_scenario, #data_system").change(function(){
    var data_sce_val = $("#data_scenario").val();
    var data_sys_val = $("#data_system").val();
    
    // Display extractor list only when both fields of combination have values
    if(data_sce_val != "" && data_sys_val != "")
    {  $("#ext_list").show();  }
    else
    {  $("#ext_list").hide();  }
  });
  
  $("#data_insight, #data_system_in").change(function(){
    var data_ins_val = $("#data_insight").val();
    var data_sys_ins_val = $("#data_system_in").val();
    
    // Display extractor list only when both fields of combination have values
    if(data_ins_val != "" && data_sys_ins_val != "")
    {  $("#ext_list").show();  }
    else
    {  $("#ext_list").hide();  }
  });
  
  $("#data_system_ent").change(function(){
    var data_ent_val = $("#data_system_ent").val();
    
    // Display extractor list only when both fields of combination have values
    if(data_ent_val != "")
    {  $("#ext_list").show();  }
    else
    {  $("#ext_list").hide();  }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> Info button */
  $(".dim_type_info, .fact_info").popover({
    html:true,
    placement: "bottom",
    title: $(this).parent("td").text(),
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> Select extractors */
  $("input[name='ext_name']").change(function(){
    if($("input[name='ext_name']:checked").length > 0)
    {  $("#ext_view_jobs").removeAttr("disabled");  }
    else
    {  $("#ext_view_jobs").attr("disabled", "disabled");  }
  });
  
  /* Data Extraction -> Dimensions data -> List of extractors -> View Jobs */
  $("#ext_view_jobs").click(function(){
    if(! ($(this).attr("disabled") == "disabled"))
    {
      $("#ext_list").hide();
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
  $("input[name='fact_ext_name']").change(function(){
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
  
  /* BO Connection and reports -> Select KPI */
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
  
  /* BO Connection and reports -> Select KPI -> Predefined KPI -> View Details */
  $(".pd_kpi_info").click(function(){
    // Reset the row styling
    $("#pd_kpi_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(0).text();
    $("#asset_kpi_sel").text(name_value);
    $("#asset_kpi_info").show();
  });
  
  /* BO Connection and reports -> Select KPI -> User defined KPI -> View Details */
  $(".pd_kpi_info").click(function(){
    // Reset the row styling
    $("#pd_kpi_list").children("tbody").children(".info").removeClass("info");
    
    var parent_row = $(this).parents("tr");
    parent_row.addClass("info");
    var name_value = parent_row.children().eq(0).text();
    $("#asset_kpi_sel").text(name_value);
    $("#asset_kpi_info").show();
  });
  
  
  
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
        tbl_markup += "<td><a href='javascript:;' id='rep_config_"+ $(this).attr("id") +"' class='fa fa-gears' data-toggle='modal' data-target='#report_config_modal'></a></td>";
        tbl_markup += "<td><a href='javascript:;' id='rep_del_"+ $(this).attr("id") +"' class='fa fa-trash'></a></td>";
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
  
  
});