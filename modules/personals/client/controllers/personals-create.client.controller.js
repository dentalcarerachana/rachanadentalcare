'use strict';

// Personals create controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify', '$timeout', '$window', 'Authentication', 'FileUploader',
    function ($scope, Personals, Notify, $timeout, $window, Authentication, FileUploader) {

        var personal = [];

        // Create new Personal
        this.CreatePrsnl = function () {

            // Create new Personal object
            personal = new Personals({
                fName: this.fName,
                lName: this.lName,
                emailId: this.emailId,
                contact: this.contact,
                //isConsultant: this.isConsultant,
                //regNumber: this.regNumber,
                speciality: this.speciality,
                qualification: this.qualification,
                experience: this.experience,
                rating: this.rating,
                treatments: this.selectedTreatments,
                slots: this.slots,
                profileImageURL: this.profileImageURL
            });

            // Redirect after save
            personal.$save(function (response) {

                // Clear form fields
                $scope.fName = '';
                $scope.lName = '';
                $scope.emailId = '';
                $scope.contact = '';
                //$scope.isConsultant = '';
                // $scope.regNumber = '';
                $scope.speciality = '';
                $scope.qualification = '';
                $scope.experience = '';
                $scope.rating = null;
                $scope.selectedTreatments = null;
                $scope.slots = null;
                $scope.profileImageURL = null;
                Notify.sendMsg('NewPersonal', { 'id': response._id });

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear messages
            $scope.success = $scope.error = null;

            // Start upload
            $scope.uploader.uploadAll();

        };

        // Create file uploader instance
        $scope.uploader = new FileUploader({
            url: '/api/personal/picture',
            alias: 'personalProfilePicture'
        });

        // Set file uploader image filter
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // Called after the user selected a new picture file
        $scope.uploader.onAfterAddingFile = function (fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        $scope.imageURL = fileReaderEvent.target.result;
                    }, 0);
                };
            }
        };

        // Called after the user has successfully uploaded a new picture
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // Show success message
            $scope.success = true;

            // Populate user object
            personal.profileImageURL = response.profileImageURL;

             // Redirect after save
            personal.$save(function(response) {

                // Clear form fields
                personal = null;
                
                Notify.sendMsg('NewPersonal', { 'id': response._id });

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear upload buttons
            $scope.cancelUpload();
        };

        // Called after the user has failed to uploaded a new picture
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
            // Clear upload buttons
            $scope.cancelUpload();

            // Show error message
            $scope.error = response.message;
        };

        // Cancel the upload process
        $scope.cancelUpload = function () {
            $scope.uploader.clearQueue();
            $scope.profileImageURL;
        };

    }
]);



// Filepicker for doctor image uploading
// 'use strict';

// // Personals create controller

// var personalsApp = angular.module('personals');

// personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify', 'filepickerService',
//   function ($scope, Personals, Notify, filepickerService) {
    
//     // Create new Personal
//     this.CreatePrsnl = function () {

//       // Create new Personal object
//       var personal = new Personals({
//         fName: this.fName,
//         lName: this.lName,
//         emailId: this.emailId,
//         contact: this.contact,
//         //isConsultant: this.isConsultant,
//         speciality: this.speciality,
//         qualification: this.qualification,
//         experience: this.experience,
//         rating: this.rating,
//         treatments: this.selectedTreatments,
//         slots: this.slots,
//         picture: this.picture
//       });

//       // Redirect after save
//       personal.$save(function (response) {

//         // Clear form fields
//         $scope.fName = '';
//         $scope.lName = '';
//         $scope.emailId = '';
//         $scope.contact = '';
//         //$scope.isConsultant = '';
//         $scope.speciality = '';
//         $scope.qualification = '';
//         $scope.experience = '';
//         $scope.rating = null;
//         $scope.selectedTreatments = null;
//         $scope.slots = null;
//         $scope.picture = null;
//         Notify.sendMsg('NewPersonal', {'id': response._id});
        
//       }, function (errorResponse) {
//         $scope.error = errorResponse.data.message;
//       });
//     };
    
//     //photo upload
//     $scope.upload = function () {
//       filepicker.setKey('ACJvoNUISuSuMS7Xhkqu2z');
//       filepickerService.pick(
//         {
//           mimetype: 'image/*',
//           language: 'en',
//           services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
//           openTo: 'IMAGE_SEARCH'
//         },
//         function (Blob) {
//           console.log(JSON.stringify(Blob));
//           $scope.createPrsnlCtrl.picture = Blob;
//           $scope.$apply();
//         }
//       );
//     };
    
//   }
// ]);


