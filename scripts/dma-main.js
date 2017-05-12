(function(window, undefined){
var gailHomepage = (function() {

  var blackoverlay = document.getElementById('black-overlay'),
      loginpopup = document.getElementById('login-popblk'),
      loginblk = document.getElementById('login-block'),
      bpnumber = document.getElementById('bpnumber-blk'),
      passwdblk = document.getElementById('password-blk'),
      otpTxtbox = document.getElementById('otpTxtbox'),
      bpnumberTxtbox = document.getElementById('bpnumberTxtbox'),
      passwordTxtbox = document.getElementById('passwordTxtbox'),
      newpwdTxtbox = document.getElementById('newpwdTxtbox'),
      confpasswordTxtbox = document.getElementById('confpasswordTxtbox'),
      changepasswdblk = document.getElementById('changepwd-block'),
      selectArea = document.getElementById('selectArea'),
      formDisabledOverlay = document.getElementById('form-overlay'),
      mobileotp = document.getElementById('mobile-otp'),
      applynowOptTxt = document.getElementById('applynow-otpTxt'),
      mobileVerifyblk = document.getElementById('mobileVerifyblk'),
      applytnccheckbox = document.getElementById('apply-tnc-checkbox'),
      mobile = document.getElementById('mobile'),
      winWidth = window.innerWidth,
      winHeight = window.innerHeight;

      var loginclick = function(){
        otpTxtbox.value = '';
        document.body.style.width = winWidth +'px';
        document.body.style.height = winHeight +'px';
        document.body.setAttribute("style","overflow:hidden");
        otpTxtbox.style.borderColor = "#ccc";
        blackoverlay.style.display = 'block';
        loginpopup.style.display = 'block';
        loginblk.style.display = 'block';
      }
      var loginclose = function(){
        blackoverlay.style.display = 'none';
        loginpopup.style.display = 'none';
        passwdblk.style.display = 'none';
        changepasswdblk.style.display = 'none';
        bpnumber.style.display = 'none';
        document.body.setAttribute("style","overflow-y:scroll");
      }
      var bpnumberblk = function(){
        loginblk.style.display = 'none';
        passwdblk.style.display = 'none';
        changepasswdblk.style.display = 'none';
        bpnumber.style.display = 'block';
      }
      var forgetpwdblk = function(){
        otpTxtbox.value = '';
        loginblk.style.display = 'none';
        passwdblk.style.display = 'block';
        changepasswdblk.style.display = 'none';
        bpnumber.style.display = 'none';
      }
      var applynowMobileOtp = function(){
        if (mobileotp.value){
            
          } else {
            mobileotp.style.borderColor = "#ff0000";
            mobileotp.addEventListener('focus',function(){
              mobileotp.style.borderColor = "#ccc";
            });
          }
      }
      var applytnccheckboxcChecked = function(){
        if(applytnccheckbox.checked == true){
          location.href = '../gail/apply-now-thankyou.html';
        }
      }
      var applytncSubmitEnabled = function(){
        document.getElementById('tncbtn').disabled = false;
      }
      var applymobileVerifyblk = function(){
        applynowOptTxt.value = '';
        if (mobile.value){
            mobile.value = '';
            mobileVerifyblk.style.display = 'block';
            applynowOptTxt.style.display = 'block';
          } else {
            mobile.style.borderColor = "#ff0000";
            mobile.addEventListener('focus',function(){
              mobile.style.borderColor = "#ccc";
            });
          }
      }
      var bpnumberpopblkCross = function(){
        bpnumber.style.display = 'none';
        loginblk.style.display = 'block';
      }
      var changepwdblkSubmit = function(){
        if (otpTxtbox.value){
            newpwdTxtbox.value = '';
            confpasswordTxtbox.value = '';
            loginblk.style.display = 'none';
            passwdblk.style.display = 'none';
            bpnumber.style.display = 'none';
            changepasswdblk.style.display = 'block';
          } else {
            otpTxtbox.style.borderColor = "#ff0000";
            otpTxtbox.addEventListener('focus',function(){
              otpTxtbox.style.borderColor = "#ccc";
            });
          }
      }
      var confirmpwdblkSubmit = function(){
        if (newpwdTxtbox.value && confpasswordTxtbox.value){
            loginblk.style.display = 'block';
            passwdblk.style.display = 'none';
            changepasswdblk.style.display = 'none';
            bpnumber.style.display = 'none';
          } else {
            newpwdTxtbox.style.borderColor = "#ff0000";
            confpasswordTxtbox.style.borderColor = "#ff0000";
            newpwdTxtbox.addEventListener('focus',function(){
              newpwdTxtbox.style.borderColor = "#ccc";
            });
            confpasswordTxtbox.addEventListener('focus',function(){
              confpasswordTxtbox.style.borderColor = "#ccc";
            })
          }
      }
      
      var mainloginblkSubmit = function(){
        if (bpnumberTxtbox.value && passwordTxtbox.value){
          if(bpnumberTxtbox.value == 'approver'){
            localStorage.setItem("loginstatus", "approver");
            location.href = 'employee-approver-dashboard.html';
          } else if(bpnumberTxtbox.value == 'reviewer') {
            localStorage.setItem("loginstatus", "reviewer");
            location.href = 'employee-reviewer-dashboard.html';
          } else if(bpnumberTxtbox.value == 'customer') {
            localStorage.setItem("loginstatus", "reviewer");
            location.href = 'my-account.html';
          } else {
            bpnumberTxtbox.style.borderColor = "#ff0000";
            passwordTxtbox.style.borderColor = "#ff0000";
            bpnumberTxtbox.addEventListener('focus',function(){
              bpnumberTxtbox.style.borderColor = "#ccc";
            });
            passwordTxtbox.addEventListener('focus',function(){
              passwordTxtbox.style.borderColor = "#ccc";
            })
          }
        }
      }
      


      var selectedArea = function(){
        if(formDisabledOverlay)
        var strUser = selectArea.options[selectArea.selectedIndex].value;
        if(strUser !== 'selectarea'){
          formDisabledOverlay.style.display = 'none';
        }else{
          formDisabledOverlay.style.display = 'block';
        }
      }

      return {
        LoginClick: loginclick,
        LoginClose: loginclose,
        MainLoginblkSubmit: mainloginblkSubmit,
        BPnumberblk: bpnumberblk,
        ForgetPasswordClick: forgetpwdblk,
        ChangePwdblkSubmit: changepwdblkSubmit,
        ConfirmPwdblkSubmit: confirmpwdblkSubmit,
        SelectedArea: selectedArea,
        ApplynowMobileOtp: applynowMobileOtp,
        ApplyMobileVerifyblk: applymobileVerifyblk,
        ApplytnccheckboxcChecked: applytnccheckboxcChecked,
        ApplytncSubmitEnabled: applytncSubmitEnabled,
        BPnumberpopblkCross: bpnumberpopblkCross
      };

    })();

    var loginlink = document.getElementById('link_login');
      if(loginlink)
      loginlink.onclick = function() {
          gailHomepage.LoginClick();
        }
    var loginblkClose = document.getElementById('login-popblk-cross');
      if(loginblkClose)
      loginblkClose.onclick = function() {
          gailHomepage.LoginClose();
        }
    var mainlogin = document.getElementById('mainlogin');
      if(mainlogin)
      mainlogin.onclick = function() {
          gailHomepage.MainLoginblkSubmit();
        }
    var blackoverlay = document.getElementById('black-overlay');
      if(blackoverlay)
      blackoverlay.onclick = function() {
          gailHomepage.LoginClose();
        }
    var knowBPnumber = document.getElementById('knowBPnumber');
      if(knowBPnumber)
      knowBPnumber.onclick = function() {
          gailHomepage.BPnumberblk();
        }
     var bpnumbercross = document.getElementById('bpnumber-popblk-cross');
      if(bpnumbercross)
      bpnumbercross.onclick = function() {
          gailHomepage.BPnumberpopblkCross();
        }
    var forgetpwd = document.getElementById('home-forgetpwd');
      if(forgetpwd)
      forgetpwd.onclick = function() {
          gailHomepage.ForgetPasswordClick();
        }
    var changepwd = document.getElementById('changepwdSubmit');
      if(changepwd)
      changepwd.onclick = function() {
          gailHomepage.ChangePwdblkSubmit();
        }
    var changepwdloginbtn = document.getElementById('changepwdloginbtn');
      if(changepwdloginbtn)
      changepwdloginbtn.onclick = function() {
          gailHomepage.ConfirmPwdblkSubmit();
        }
    var selectArea = document.getElementById('selectArea');
      if(selectArea)
      selectArea.onclick = function() {
          gailHomepage.SelectedArea();
        }
    var applynowMobileSubmitotp = document.getElementById('applynow-mobile-submitotp');
      if(applynowMobileSubmitotp)
      applynowMobileSubmitotp.onclick = function() {
          gailHomepage.ApplynowMobileOtp();
        }
    var mobileVerifyblk = document.getElementById('applynow-mobile-verification');
      if(mobileVerifyblk)
      mobileVerifyblk.onclick = function() {
          gailHomepage.ApplyMobileVerifyblk();
        }
    var tncbtn = document.getElementById('tncbtn');
      if(tncbtn)
      tncbtn.onclick = function() {
          gailHomepage.ApplytnccheckboxcChecked();
        }
    var ApplytncCheckbox = document.getElementById('apply-tnc-checkbox');
      if(ApplytncCheckbox)
      ApplytncCheckbox.onclick = function() {
          gailHomepage.ApplytncSubmitEnabled();
        }


      $('document').ready(function() {
        
          var dob = document.getElementById('dob');
          if(dob){
            $('#dob').datepicker({
              format: "dd/mm/yyyy",
              autoclose: true
            });
          }
		  
		  var dob2 = document.getElementById('dob');
          if(dob2){
            $('#dob2').datepicker({
              format: "dd/mm/yyyy",
              autoclose: true
            });
          }

          $('body').on('click','.clickable-row',function() {
              window.document.location = $(this).data("href");
          });

          $(window).scroll(function () {
              if( $(window).scrollTop() > $('header').offset().top && !($('header').hasClass('stickyheader'))){
                $('header').addClass('stickyheader');
              } else if ($(window).scrollTop() == 0){
                $('header').removeClass('stickyheader');
              }
          });
          $('.clickable-row').click(function(){
            var sp = localStorage.getItem("loginstatus");
            console.log(sp);
          })



      })


}(window))

