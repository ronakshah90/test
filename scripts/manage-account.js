(function(window, undefined){

var gailManageAccount = (function() {

  var manageAccountDropdown = document.getElementById('manage-account-dropdown'),
      manageRequestDropdownSelect = document.getElementById('manage-request-dropdown'),
      manageAccountsblk = document.getElementById('manage-accountsblk'),
      movementblk = document.getElementById('movementblk'),
      movementnote = document.getElementById('movementnote'),
      reasonCommentSection = document.getElementById('reason-comment-section');
      
      var movementSection = function(){
        var manageAccountDropdownSelect = manageAccountDropdown.options[manageAccountDropdown.selectedIndex].value;
        if(manageAccountDropdownSelect == 'movement'){
          manageRequestDropdownSelect.value = manageAccountDropdownSelect;
          movementblk.style.display = 'block';
          manageAccountsblk.style.display = 'none';
        }else if(manageAccountDropdownSelect == 'termination' || manageAccountDropdownSelect == 'temporary-suspension' || manageAccountDropdownSelect == 'service-activation' || manageAccountDropdownSelect == 'bill-complaints' || manageAccountDropdownSelect == 'other-complaints'){
          manageRequestDropdownSelect.value = manageAccountDropdownSelect;
          manageAccountsblk.style.display = 'none';
          movementblk.style.display = 'block';
          movementnote.style.display = 'none';
          reasonCommentSection.style.display = 'block';
        }
      }
      var requestSection = function(){
        var manageRequestDropdownSelectbox = manageRequestDropdownSelect.options[manageRequestDropdownSelect.selectedIndex].value;
        if(manageRequestDropdownSelectbox == 'movement'){
          movementblk.style.display = 'block';
          manageAccountsblk.style.display = 'none';
          movementnote.style.display = 'block';
          reasonCommentSection.style.display = 'none';
        }else if(manageRequestDropdownSelectbox == 'termination' || manageRequestDropdownSelectbox == 'temporary-suspension' || manageRequestDropdownSelectbox == 'service-activation' || manageRequestDropdownSelectbox == 'bill-complaints' || manageRequestDropdownSelectbox == 'other-complaints'){
          movementblk.style.display = 'block';
          movementnote.style.display = 'none';
          reasonCommentSection.style.display = 'block';
        }
      }
      var manageAccountSection = function(){
          manageAccountsblk.style.display = 'block';
          movementblk.style.display = 'none';
          manageAccountDropdown.selectedIndex = 0;
      }
      

      return {
        Movement: movementSection,
        RequestSection: requestSection,
        ManageAccountSection: manageAccountSection
      };

    })();

    var manageAccountDropdownSlct = document.getElementById('manage-account-dropdown');
      if(manageAccountDropdownSlct)
      manageAccountDropdownSlct.onchange = function() {
          gailManageAccount.Movement();
        }
    var manageRequestDropdown = document.getElementById('manage-request-dropdown');
      if(manageRequestDropdown)
      manageRequestDropdown.onchange = function() {
          gailManageAccount.RequestSection();
        }
    var mgBackbtn = document.getElementById('mg-backbtn');
      if(mgBackbtn)
      mgBackbtn.onclick = function() {
          gailManageAccount.ManageAccountSection();
        }
    

}(window))

