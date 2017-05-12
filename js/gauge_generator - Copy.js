function GaugeGenerator()
{
  var root = this;
  this.source_path = 'js/gauge_data.json';
  this.gauge_data = '';
  this.div = 0;
  this.tbl_data = '';
  this.result_container = '';
  this.calc_good_range = function(target_val, thresh_good){
    var high_good = target_val + (target_val * (thresh_good / 100));
    var low_good = target_val - (target_val * (thresh_good / 100));
    return low_good + ',' + high_good;
  };
  this.calc_bad_range = function(target_val, thresh_bad){
    var high_bad = target_val + (target_val * (thresh_bad / 100));
    var low_bad = target_val - (target_val * (thresh_bad / 100));
    return low_bad + ',' + high_bad;
  };
  this.plot_gauge = function(data){
    var bad_range;
    var good_range;
    var bad_width;
    var good_width;
    var mid_width;
    
    for(var i = 0; i < data.length; i++)
    {
      //Get lower and higher values for good and bad threshold
      bad_range = this.calc_bad_range(data[i].targetVal, data[i].badThresh);
      bad_range = bad_range.split(',');
      
      good_range = this.calc_good_range(data[i].targetVal, data[i].goodThresh);
      good_range = good_range.split(',');
      
      /* Calculating the width of each bar. Since total 
         is 100% and targetValue is at 50%, divide every value accordingly
         Calculate total of lower bad and good values. If it exceeds 40, divide */
      
      var half_tot = parseInt(bad_range[0]) + parseInt(good_range[0]);
      
      switch(true){
        case (half_tot <= 120):
          this.div = 3;
          break;
        case (half_tot <= 160):
          this.div = 4;
          break;
        case (half_tot <= 200):
          this.div = 5;
          break;
        case (half_tot <= 240):
          this.div = 6;
          break;
        case (half_tot <= 280):
          this.div = 7;
          break;
        case (half_tot <= 320):
          this.div = 8;
          break;
        case (half_tot <= 360):
          this.div = 9;
          break;
        case (half_tot <= 400):
          this.div = 10;
          break;
        case (half_tot <= 500):
          this.div = 12;
          break;
        case (half_tot > 500 && half_tot <= 700):
          this.div = 20;
          break;
        case (half_tot > 700 && half_tot <= 1000):
          this.div = 80;
          break;
        case (half_tot > 1000):
          this.div = 100;
          break;
        default:
          this.div = 2;
          break;
      }   
      
      bad_width = bad_range[0] / this.div;
      good_width = good_range[0] / this.div;
      
      mid_width = 50 - bad_width - good_width;
      
      if(bad_range[0] == good_range[0])
      {
        vgood_width = good_width + mid_width;
        mid_width = 0;
      }
      else
      {
        vgood_width = good_width;
      }
      
      good_lbl_width = (50 - bad_width - mid_width) * 2;
      
      lbb_markup = "<div class='label_bar' style='width:" + bad_width + "%'>Bad</div>";
      lmb_markup = "<div class='label_bar' style='width:" + mid_width + "%'>Warning</div>";
      lgb_markup = "<div class='label_bar' style='width:" + good_lbl_width + "%'>Good</div>";
      
      cbb_markup = "<div class='color_bar bad' style='width:" + bad_width + "%'></div>";
      cmb_markup = "<div class='color_bar mid' style='width:" + mid_width + "%'></div>";
      cgb_markup = "<div class='color_bar good' style='width:" + good_lbl_width + "%'></div>";
      
      /* Row 1 - Bad marker - mid width - target val - mid width - bad marker */
      gm_lbad = "<div class='marker mark_bad_rt' style='width:" + bad_width + "%'>&nbsp;</div>";
      gm_lgood = "<div class='marker' style='width:" + mid_width + "%'>&nbsp;</div>";
      vtarget_markup = "<div class='val_bar txt_center mark_good_lt mark_good_rt' style='width:" + good_lbl_width + "%'>" + data[i].targetVal + "</div>";
      gm_hgood = "<div class='marker' style='width:" + mid_width + "%'>&nbsp;</div>";
      gm_hbad = "<div class='marker mark_bad_lt' style='width:" + bad_width + "%'>&nbsp;</div>";
      
      /* Row 2 - Bad mark - mid width - good val low - good val high - mid width - bad mark */
      vglow_markup = "<div class='val_bar txt_lt' style='width:" + vgood_width + "%'><span style='left:-20px;'>" + good_range[0] + "</span></div>";
      vghigh_markup = "<div class='val_bar txt_rt' style='width:" + vgood_width + "%'><span style='left:20px;'>" + good_range[1] + "</span></div>";
      
      /* Row 3 - bad val low - mid width - good full width - mid width - bad val high */
      vblow_markup = "<div class='val_bar txt_rt' style='width:" + bad_width + "%'><span style='left:20px;'>" + bad_range[0] + "</span></div>";
      gm_target = "<div class='marker' style='width:" + good_lbl_width + "%'>&nbsp;</div>";
      vbhigh_markup = "<div class='val_bar txt_lt' style='width:" + bad_width + "%'><span style='left:-20px;'>" + bad_range[1] + "</span></div>";
      
      legend = "<p class='leg'><span class='good'></span> Good</p><p class='leg'><span class='bad'></span> Bad</p><p class='leg'><span class='mid'></span> Warning</p>";
      
      // Actual markup for grid starts
      this.gauge_data += "<div class='gauge_wrap' id='gauge_" + i + "'>";
      this.gauge_data += "<p class='gauge_title'>" + data[i].frequency + " - " + data[i].validFrom + " to " + data[i].validTo + "</p>";
      this.gauge_data += "<div class='bar_wrap'>";
      this.gauge_data += "<div class='lbar'>" + lbb_markup + lmb_markup + lgb_markup + lmb_markup + lbb_markup + "</div>";
      this.gauge_data += "<div class='cbar'>" + cbb_markup + cmb_markup + cgb_markup + cmb_markup + cbb_markup + "</div>";
      this.gauge_data += "<div class='gmark1'>" + gm_lbad + gm_lgood + vtarget_markup + gm_hgood + gm_hbad + "</div>";
      this.gauge_data += "<div class='gmark2'>" + gm_lbad + gm_lgood + vglow_markup + vghigh_markup + gm_hgood + gm_hbad + "</div>";
      //this.gauge_data += "<div class='gmark2'>" + gm_lbad + gm_lgood + vtarget_markup + gm_hgood + gm_hbad + "</div>";
      this.gauge_data += "<div class='vbar'>" + vblow_markup + gm_lgood + gm_target + gm_hgood + vbhigh_markup + "</div>";
      this.gauge_data += "<div class='legend_bar'>" + legend + "</div>";
      this.gauge_data += "</div></div>";
    }
    document.getElementById(this.result_container).innerHTML = this.gauge_data;
    
  };
  this.populate_table = function(data){
    
    this.tbl_data += "<table class='table table-striped table-bordered'>";
    this.tbl_data += "<thead><tr><th>Frequency</th><th>Valid From</th><th>Valid To</th><th>Target Value</th><th>Bad</th><th>Good</th></tr></thead>";
    this.tbl_data += "<tbody>";
    
    for(var i = 0; i < data.length; i++)
    {
      this.tbl_data += "<tr>";
      this.tbl_data += "<td>" + data[i].frequency + "</td>";
      this.tbl_data += "<td>" + data[i].validFrom + "</td>";
      this.tbl_data += "<td>" + data[i].validTo + "</td>";
      this.tbl_data += "<td>" + data[i].targetVal + "</td>";
      this.tbl_data += "<td>&plusmn; " + data[i].badThresh + "%</td>";
      this.tbl_data += "<td>&plusmn; " + data[i].goodThresh + "%</td>";
      this.tbl_data += "</tr>";
    }
    this.tbl_data += "</tbody></table>";
    document.getElementById('tbl_data').innerHTML = this.tbl_data;
  };
  this.generate = function(form_data){
    // Parse the JSON file and get data
    myArr = JSON.parse(form_data);
    //root.populate_table(myArr);
    root.plot_gauge(myArr);
  };
}