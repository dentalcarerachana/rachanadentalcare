'use strict';

// Setting up route
angular.module('feedbacks').config(['$stateProvider',
  function ($stateProvider) {
    // Feedbacks state routing
    $stateProvider
      .state('feedbacks', {
        abstract: true,
        url: '/feedbacks',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('feedbacks.main', {
        url: '/main',
        templateUrl: 'modules/feedbacks/views/list-feedbacks.client.view.html'
      })
    //   .state('events.list', {
    //     templateUrl: 'modules/events/views/list-events.client.view.html'
    //   })
    //   .state('events.calendar', {
    //     templateUrl: 'modules/events/views/calendar-events.client.view.html'
    //   })
    //   .state('events.create', {
    //     url: '/createappointment',
    //     templateUrl: 'modules/events/views/create-events.client.view.html'
    //   });
  }
]);
