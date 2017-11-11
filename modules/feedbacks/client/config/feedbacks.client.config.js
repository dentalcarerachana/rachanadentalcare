'use strict';

// Configuring the Patients module
angular.module('feedbacks',['multipleSelect','mgcrea.ngStrap', 'ngMaterial', 'ui.bootstrap']).run(['Menus',
  function (Menus) {
    // Add the patients dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Feedback form',
      state: 'feedbacks.main',
    });
  }
]);
