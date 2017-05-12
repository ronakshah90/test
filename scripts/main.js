(function(window, undefined){

/*$(document).ready(function(){
  $('#home_banner').carousel({
    interval: 6000
  });*/

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
      rightbarContent = jQuery('.rightbarContent'),
      leftbarFullwidth = document.getElementById('leftbarFullwidth'),
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
          location.href = 'apply-now-thankyou.html';
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
      var fullht = function(){
        if(rightbarContent && leftbarFullwidth){
          var calcHt = rightbarContent.outerHeight()-15 < 550 ? 550 : rightbarContent.outerHeight()-15;
          leftbarFullwidth.style.height = (calcHt)+'px';
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
      var registeras = function(){
        if(formDisabledOverlay)
          formDisabledOverlay.style.display = 'none';
      }
      var alphanumeric = function(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
      }
      var sticky = {
        sticky_after: 80,
        init: function() {
          this.header = document.getElementsByTagName("header")[0];
          this.hdrblk = document.getElementById('headerblk');
          this.clone = this.header.cloneNode(true);
          this.clone.classList.add("clone");
          this.hdrblk.insertBefore(this.clone, this.header);
          this.scroll();
          this.events();
        },

        scroll: function() {
          if(window.scrollY > this.sticky_after) {
            document.body.classList.add("down");
          }
          else {
            document.body.classList.remove("down");
          }
        },
        events: function() {
          window.addEventListener("scroll", this.scroll.bind(this));
        }
      };
      var stickyheader = function(){
        document.addEventListener("DOMContentLoaded", sticky.init.bind(sticky));
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
        BPnumberpopblkCross: bpnumberpopblkCross,
        Alphanumeric: alphanumeric,
        Registeras:registeras,
        Stickyheader: stickyheader,
        Fullht: fullht
      };

    })();

    //gailHomepage.Stickyheader();
    gailHomepage.Fullht();
        $('#headerblk').on('click', '#link_login', function (){
          gailHomepage.LoginClick();
        })
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
    
    jQuery('.registeras').click(function(){gailHomepage.Registeras()})
    var registerchecked = document.querySelector('input[name="registeras"]:checked');
    if(registerchecked){gailHomepage.Registeras()}
    
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
            jQuery('#dob').datepicker({
              format: "dd/mm/yyyy",
              autoclose: true
            });
          }
          
          $('body').on('mouseenter','.ttz-dropdownblk',function() {
            $(this).find('.ttz-dropdown').addClass('demo').show().animate({ "top": "55px" }, "fast" );
          });
          $('body').on('mouseleave','.ttz-dropdownblk',function() {
            $(this).find('.ttz-dropdown').addClass('demo').hide().animate({ "top": "45px" }, "fast" );
          });

          $('body').on('click','.clickable-row',function() {
              window.document.location = $(this).data("href");
          });
          $('body').on('click','.dwnldbtn-row',function(e){e.stopPropagation();})
          $('body').on('click','.dob-img',function(){jQuery('.dobblk input').focus()})

 /* Back to top button code */
         // hide #back-top first

                $("#back_top").hide();

                // fade in #back-top
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        $('#back_top').fadeIn();
                    }
                    else {
                        $('#back_top').fadeOut();
                    }
                });


                // scroll body to 0px on click
                $('#back_top a').click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                    return false;

                });

          
      })

  window.gailHomepage =  gailHomepage;

}(window))

