(function(window, undefined){

var gailTrackApplication = (function() {

  var paymentblk = document.getElementById('payment-detailblk'),
      uploaddoc = document.getElementById('uploaddoc'),
      uploadbtn = document.getElementById("upload-btn");
      paymentbtn = document.getElementById("payment-btn"),
      selectMode = document.getElementById("selectedmode"),
      onlinemode = document.getElementById("onlinemode"),
      checkmode = document.getElementById("checkmode"),
      trackApplication = document.getElementById("trackApplication"),
      trackAppCnt = document.getElementById("trackAppCnt"),
      proofidentity = document.getElementById("proofidentity"),
      poilabel = document.getElementById('poilabel'),
      poiinpt = document.getElementById('poiinpt'),
      poolabel = document.getElementById('poolabel'),
      pooinpt = document.getElementById('pooinpt'),
      proofOwnership = document.getElementById('proofOwnership');

      var paymentblkbtn = function(){
        uploadbtn.className = "";
        uploadbtn.className = "upload_doc fL";
        paymentbtn.className = "payment fL btn-lightgreen";
        uploaddoc.style.display = 'none';
        paymentblk.style.display = 'block';
      }
      var uploadblkbtn = function(){
        paymentbtn.className = "";
        paymentbtn.className = "payment fL";
        uploadbtn.className = "upload_doc btn-lightgreen fL";
        uploaddoc.style.display = 'block';
        paymentblk.style.display = 'none';
      }
      var selectedPaymentMode = function(){
        var strUser = selectMode.options[selectMode.selectedIndex].value;
        if(strUser == 'online'){
          onlinemode.style.display = 'block';
          checkmode.style.display = 'none';
        }else if(strUser == 'cheque'){
          checkmode.style.display = 'block';
          onlinemode.style.display = 'none';
        }
      }
      var proofidentityblk = function(){
        var strUser = proofidentity.options[proofidentity.selectedIndex].value;
        if(strUser !== 'Select Document'){
          poilabel.removeAttribute("disabled");
          poiinpt.disabled = false;
        }
      }
      var proofOwnershipblk = function(){
        var strUser = proofOwnership.options[proofOwnership.selectedIndex].value;
        if(strUser !== 'Select Ownership'){
          poolabel.removeAttribute("disabled");
          pooinpt.disabled = false;
        }
      }
      var trackApplicationid = function(){
        if (trackApplication.value){
            trackAppCnt.style.display = 'block';
          } else {
            trackApplication.style.borderColor = "#ff0000";
            trackApplication.addEventListener('focus',function(){
              trackApplication.style.borderColor = "#ccc";
            });
          }
      }

      return {
        Paymentblkbtn: paymentblkbtn,
        Uploadblkbtn: uploadblkbtn,
        SelectedPaymentMode: selectedPaymentMode,
        TrackApplicationid: trackApplicationid,
        Proofidentityblk: proofidentityblk,
        ProofOwnershipblk: proofOwnershipblk
      };

    })();

    var uploaddocbtn = document.getElementById('trackApplication-upload-docbtn');
      if(uploaddocbtn)
      uploaddocbtn.onclick = function() {
          gailTrackApplication.Paymentblkbtn();
        }
    var paymentbtn = document.getElementById('payment-btn');
      if(paymentbtn)
      paymentbtn.onclick = function() {
          gailTrackApplication.Paymentblkbtn();
        }
    var uploadbtn = document.getElementById('upload-btn');
      if(uploadbtn)
      uploadbtn.onclick = function() {
          gailTrackApplication.Uploadblkbtn();
        }
    var selectedmode = document.getElementById('selectedmode');
      if(selectedmode)
      selectedmode.onclick = function() {
          gailTrackApplication.SelectedPaymentMode();
        }
    var proofidentity = document.getElementById('proofidentity');
      if(proofidentity)
      proofidentity.onclick = function() {
          gailTrackApplication.Proofidentityblk();
        }
    var proofOwnership = document.getElementById('proofOwnership');
      if(proofOwnership)
      proofOwnership.onclick = function() {
          gailTrackApplication.ProofOwnershipblk();
        }
    var trackApplicationbtn = document.getElementById('trackApplicationbtn');
      if(trackApplicationbtn)
      trackApplicationbtn.onclick = function() {
          gailTrackApplication.TrackApplicationid();
        }
      
      $(document).ready(function(){
    	  $(document).on('change', ':file', function() {
    		    var input = $(this),
    		        numFiles = input.get(0).files ? input.get(0).files.length : 1,
    		        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    		        input.val('').closest('.filevalblk').find('.filevalblk-wrapper').show().find('.fileval').html(label);
    		  	});
    	  $('.removefileval').click(function(e){
    		  e.preventDefault();
    		  $(this).closest('.filevalblk').find('.filevalblk-wrapper').hide();
    	  });
      })
    

}(window))

