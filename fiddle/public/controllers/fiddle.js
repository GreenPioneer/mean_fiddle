'use strict';

/* jshint -W098 */
angular.module('mean.fiddle').controller('FiddleController', ['$scope', 'Global','fiddle','$stateParams','$location','MeanUser',
  function($scope, Global, fiddle,$stateParams,$location,MeanUser) {
    $scope.global = Global;
    $scope.user = MeanUser;

    $scope.fiddle = {
    title: "",
    content: "",
    keywords: ['fiddle'],
    js: 'alert("js")',
    css: '.ace_editor {\n   background-color:green; \n height:200px;\n    width:500px;\n}',
    html: '<h1 class="ace_editor">jason</h1>',
    usereditrights: [],
    private:false,
    frameworks:'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\n<script src="http://code.jquery.com/jquery-1.11.3.min.js"><\/script>\n<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"><\/script>'
  }




$scope.tabs = [
    { title:'js', content:'Dynamic content 1' },
    { title:'css', content:'Dynamic content 2'},
    { title:'html', content:'Dynamic content 2'  }
  ];
    
    $scope.theme='monokai';

    $scope.find = function() {
      fiddle.query(function(data) {
      	console.log(data);
        $scope.fiddles = data;
      });
    };
    $scope.findOne = function() {
      $scope.fiddleId = $stateParams.fiddleId;
      fiddle.get({
        fiddleId: $stateParams.fiddleId
      }, function(data) {
        $scope.fiddleShow = data;
        try{
          $scope.runshow();
        }catch(err){
          console.log(err);
        }
        
      });
    };


  $scope.changedTheme = function(data){
    $scope.aceOptionsJS.theme = data;
    $scope.aceOptionsHTML.theme = data;
    $scope.aceOptionsCSS.theme = data;
  }
  $scope.create = function() {
      
        var fiddleData = new fiddle($scope.fiddle);
        fiddleData.$save(function(response) {
          console.log(response);
          $location.path('fiddle/'+response._id)
        });
      
    };
    $scope.remove = function(data) {
        var r = confirm("Are you sure you want to delete this");
        if (r == true) {
          data.$remove(function(response) {
          
          $location.path('fiddle');
        });
        }
        
    };

    $scope.update = function() {
      
        
        

        $scope.fiddleShow.$update(function() {
         console.log('updated')
        });
      
    };
   $scope.aceOptionsJS = {
     theme: 'monokai',
     mode: 'javascript',
     useWrapMode : true,
     require: ['ace/ext/language_tools'],
      advanced: {
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
      }
   }
   $scope.aceOptionsHTML = {
     theme: 'monokai',
     mode: 'html',
     useWrapMode : true,
     require: ['ace/ext/language_tools'],
      advanced: {
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
      }
   }
   $scope.aceOptionsCSS = {
     theme: 'monokai',
     mode: 'css',
     useWrapMode : true,
     require: ['ace/ext/language_tools'],
      advanced: {
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
      }
   }
   
   $scope.alertdata = '';
   $scope.run = function(){
    
      var result = "<!DOCTYPE html><html lang='en-US'>"+$scope.fiddle.frameworks+"<body><style>"+$scope.fiddle.css+"</style>"+$scope.fiddle.html+"<script>"+$scope.fiddle.js+"<\/script></body></html>";
   
      /*var result = "<!DOCTYPE html><html lang='en-US'>"+$scope.fiddle.frameworks+"<body ng-app='myApp' ng-controller='MainCtrl'><style>"+$scope.fiddle.css+"</style>"+$scope.fiddle.html+
      "<script>var myApp = angular.module('myApp', []); myApp.controller('MainCtrl', function($scope){"+$scope.fiddle.js+"});<\/script></body></html>";*/
    
    var iframe = document.getElementById('iframe');
      
    if(iframe.contentDocument)var doc = iframe.contentDocument;
    else if(iframe.contentWindow)var doc = iframe.contentWindow.document;
    else var doc = iframe.document;

    doc.open();
    doc.writeln(result);
    doc.close();
   }
   $scope.runshow = function(){
    var result = "<!DOCTYPE html><html lang='en-US'>"+$scope.fiddleShow.frameworks+"<body><style>"+$scope.fiddleShow.css+"</style>"+$scope.fiddleShow.html+"<script>"+$scope.fiddleShow.js+"<\/script></body></html>";
    var iframe = document.getElementById('iframe');
      
    if(iframe.contentDocument)var doc = iframe.contentDocument;
    else if(iframe.contentWindow)var doc = iframe.contentWindow.document;
    else var doc = iframe.document;

    doc.open();
    doc.writeln(result);
    doc.close();
   }




  }
]);
