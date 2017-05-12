(function () {
  'use strict';

var app = angular.module('myapp', ['chart.js','ngCookies']);
  //var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);

  app.controller('MyController', function ($scope, $window, $cookieStore) {
            var redirectToPayment = $('#redirectToPayment').attr('data-cookievalue');
            
            $scope.WriteCookie = function () {
                //console.log(redirectToPayment);
                $cookieStore.put("Name", $cookieStore.get('Name'));
                //$scope.setCookie = true;
            };
            $scope.ReadCookie = function () {
                $window.alert($cookieStore.get('Name'));
            };

            $scope.RemoveCookie = function () {
                $cookieStore.remove('Name');
            };
            
console.log($cookieStore.get('Name') + ' sd');
if($cookieStore.get('Name')){
                    
                    $('.graphview,.paginationblk,#graphview').hide();
                    $('.normalview,#listview').show();
                  }
                /*$(document).ready(function(){
                  
                  $([window]).focus(function(){
                   console.log($cookieStore.get('Name') + ' sd');
                  if($cookieStore.get('Name')){
                    
                    $('.graphview,.paginationblk,#graphview').hide();
                    $('.normalview,#listview').show();
                  } else{
                }
                   }).focusout(function(){

                 });
               })*/
        });

  app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('doughnut', {
      cutoutPercentage: 60
    });
   
  });

 
  app.controller('LineCtrl', ['$scope', function ($scope) {
    $scope.labels = ['Week1', 'Week2', 'Week3', 'Week4'];
    $scope.series = ['CC', 'Building Drawings','Lease Agreeement', 'Allotment'];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7'];
    $scope.data = [
      [100,80,60,75],
      [80,60,55,65],
      [10,12,3,8],
      [10,8,2,2]
    ];

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      },
      legend: { display: true },
        
    };
  }]);
  
  app.controller('LineCtrl1', ['$scope', function ($scope) {
    $scope.labels = ['Week1', 'Week2', 'Week3', 'Week4'];
    $scope.series = ['Bagala', 'Bidar','Dharwad', 'Kalaburgi', 'Kodagu'];
    $scope.colors = ['#ef597b','#ff6d31','#73b66b','#ffcb18','29a2c6'];
    $scope.data = [
      [100,80,60,75],
      [80,60,55,65],
      [75,55,70,80],
      [65,80,85,65],[35,45,85,75]
    ];

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      },
      legend: { display: true },
        
    };
  }]);  
  

  app.controller('BarCtrl', ['$scope', function ($scope) {
    $scope.labels = ['Pharma', 'Biotech', 'Agro', 'Automobile'];
    $scope.series = ['Allotment', 'BD Approval','Possession', 'CC'];
    //$scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.colors = [ { backgroundColor: '#66cc33' }, { backgroundColor: '#ff9b2b' },{ backgroundColor: '#f5d800' },{ backgroundColor: '#377fc7' },{ backgroundColor: '#01a46d' } ];
    $scope.data = [
      [50,15,25,20],
      [40,12,15,5],
      [5,2,3,5],
      [5,1,7,10]
    ];
    $scope.options = {
      legend: { display: true },
        
    };
  }]);

  app.controller('BarCtrladmin', ['$scope', function ($scope) {
    $scope.labels = ['Allotment','CC', 'BD Approval','Payments'];
    $scope.series = ['Allotment Request'];
    //$scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.colors = [ { backgroundColor: '#66cc33' }, { backgroundColor: '#ff9b2b' },{ backgroundColor: '#f5d800' },{ backgroundColor: '#377fc7' },{ backgroundColor: '#01a46d' } ];
    $scope.data = [
      [25,15,25,20]
    ];
    $scope.options = {
      //legend: { display: true },
       // backgroundColor:'rgba(0,0,0,0.2)'
    };
  }]);

  app.controller('DoughnutCtrla', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.labels = ['Total Data','Data Mapped','Orphan data mapped','Orphan data'];
    $scope.data = [500000,450000,35000,15000];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.options = {
      legend: { display: true,position: "right" },
        
    };

    $timeout(function () {
      $scope.data = [500000,450000,35000,15000];
    }, 500);
  }]);
  app.controller('DoughnutCtrlb', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.labels = ['SMTP','USB','Print','Web','Chart'];
    $scope.data = [50,35,5,5,5];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.options = {
      legend: { display: true,position: "right" },
        
    };

    $timeout(function () {
      $scope.data = [50,35,5,5,5];
    }, 500);
  }]);

  app.controller('PieCtrla', ['$scope', function ($scope) {
    $scope.labels = ['Discover', 'Mobile', 'Endpoint', 'Network'];
    $scope.data = [6000,0, 386,0];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.options = {
      legend: { display: true,position: "right" },
        
    };
  }]);
  app.controller('PieCtrlb', ['$scope', function ($scope) {
    $scope.labels = ['Added','Activated','Modified','Suspended'];
    $scope.data = [8,3,3,2];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.options = {
      legend: { display: true,position: "right" },
        
    };
  }]);
  app.controller('PieCtrlc', ['$scope', function ($scope) {
    $scope.labels = ['Gmail','Yahoo','Facebook','Blog','Cloud'];
    $scope.data = [50,35,5,5,5];
    $scope.colors = ['#66cc33','#ff9b2b','#f5d800','#377fc7','#01a46d'];
    $scope.options = {
      legend: { display: true,position: "right" },
        
    };
  }]);


setTimeout(function(){
  var winht = $(document).height();
  $('.menuWrap').css('height',winht+54);  

  var mapht = $('.grid_col.businessLinechart').height();
  $('.grid_col.localmap').css('height',mapht);
  $('.grid_col.localmap img').show();


  $('body').on('click','#map2',function(){
      var $this = $(this);
      if($this.hasClass('alpha')){
        $this.attr('src','images/map-01.png');
        $this.removeClass('alpha');
      }else {
        $this.attr('src','images/map-02.png');
        $this.addClass('alpha');  
      }
      
    })
},1000)



  $("#menuShowHide").click(function(){
    if($(".menuWrap").css("width")=="63px"){
      $(".menuWrap").animate({"width":"260"});
      $(".userImgCont").animate({"width":"260"});
      $(".disNone").fadeIn();
    }
    else{
      $(".menuWrap").animate({"width":"63"});
      $(".userImgCont").animate({"width":"63"});
      $(".disNone").fadeOut();
    }
    $(".menuWrap").toggleClass("collapsed");


    
  });
})();