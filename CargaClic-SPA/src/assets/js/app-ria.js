(function () {
    
  angular.module('myApp', ['ui.router','oc.lazyLoad'])
  .config(function ($stateProvider, $locationProvider, $ocLazyLoadProvider) {
          $stateProvider
              .state("home", {
                  url: "/home",
                  templateUrl: "Home.html",
                  controller: 'homeCtrl',
                  resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('homeCtrl.js');
                      }]
                  }
              })
          .state("profile", {
              url:"/profile",
              templateUrl: "profile.html",
               resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('someModule.js');
                      }]
                  }
          })
      
  });
      

}());
// var ria = (function (){
//   'use strict';
//   function saludar() {
//     alert($(".sidebar-elements").length)
//   };
//   return {
//     init: function (options) {
//       saludar();
//     }
//   }
// })();