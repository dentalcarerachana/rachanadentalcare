'use strict';

var feedbacksApp = angular.module('feedbacks');

feedbacksApp.controller('FeedbacksController', ['$scope', 'Feedbacks',
    function ($scope, Feedbacks) {



        $scope.feedbackList = [];
        $scope.feedback = [];
        $scope.disabled = false;

        var refresh = function () {
            $scope.feedbackList = Feedbacks.query();
            $scope.feedback = [];
            $scope.disabled = false;
        };

        refresh();

        // Create new feedback  
        $scope.addFeedback = function () {

            // Create new feedback  object  
            var feedback = new Feedbacks({
                feedbackPatName: $scope.feedback.feedbackPatName,
                feedbackDoctorName: $scope.feedback.feedbackDoctorName,
                feedbackNatureTreatment: $scope.feedback.feedbackNatureTreatment,
                feedbackAmbience: $scope.feedback.feedbackAmbience,
                feedbackExperience: $scope.feedback.feedbackExperience,
                feedbackHyegine: $scope.feedback.feedbackHyegine,
                feedbackHandling: $scope.feedback.feedbackHandling,
                feedbackManners: $scope.feedback.feedbackManners,
                feedbackCommunication: $scope.feedback.feedbackCommunication,
                feedbackExplainProblemPlan: $scope.feedback.feedbackExplainProblemPlan,
                feedbackTreatmentExplainClearly: $scope.feedback.feedbackTreatmentExplainClearly,
                feedbackSatisfiedTreatment: $scope.feedback.feedbackSatisfiedTreatment,
                feedbackRecomendClinic: $scope.feedback.feedbackRecomendClinic,
                feedbackSuggestionImprovement: $scope.feedback.feedbackSuggestionImprovement,
                feedbackRating: $scope.feedback.feedbackRating,
            });

            // Redirect after save
            feedback.$save(function (response) {

                // Clear form fields
                $scope.feedback.feedbackDoctorName = '';
                $scope.feedback.feedbackDoctorName = '';
                $scope.feedback.feedbackNatureTreatment = '';
                $scope.feedback.feedbackAmbience = '';
                $scope.feedback.feedbackExperience = '';
                $scope.feedback.feedbackHyegine = '';
                $scope.feedback.feedbackHandling = '';
                $scope.feedback.feedbackManners = '';
                $scope.feedback.feedbackCommunication = '';
                $scope.feedback.feedbackExplainProblemPlan = '';
                $scope.feedback.feedbackTreatmentExplainClearly = '';
                $scope.feedback.feedbackSatisfiedTreatment = '';
                $scope.feedback.feedbackRecomendClinic = '';
                $scope.feedback.feedbackSuggestionImprovement = '';
                $scope.feedback.feedbackRating = null;

                refresh();

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing feedback
        $scope.remove = function (feedback) {
            if (confirm('Are you sure you want to delete this feedback?')) {
                if (feedback) {

                    feedback.$remove();

                    for (var i in this.feedbackList) {
                        if (this.feedbackList[i] === feedback) {
                            this.feedbackList.splice(i, 1);
                        }
                    }
                } else {
                    this.feedback.$remove(function () {

                    });
                }
            }
        };

        // Update existing feedback
        $scope.update = function (updtfeedback) {

            var feedback = updtfeedback;

            feedback.$update(function () {
                refresh();
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log(errorResponse.data.message);
            });
        };

        $scope.edit = function (feedback) {

            for (var i in this.feedbackList) {
                if (this.feedbackList[i] === feedback) {
                    $scope.feedback = feedback;
                }
            }

            $scope.disabled = true;
        };

        $scope.deselect = function () {
            $scope.feedback = [];
            $scope.disabled = false;
        };

        // Pagination Starts     
        var feedbackList;

        Feedbacks.query(function (result) {
            $scope.feedbackList = result;
            feedbackList = $scope.feedbackList;
            $scope.totalItems = $scope.feedbackList.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 20;
        });


        $scope.$watch("currentPage", function () {
            setPagingData($scope.currentPage);
        });

        function setPagingData(page) {

            if (feedbackList && feedbackList.length > 0) {
                var pagedData = feedbackList.slice(
                    (page - 1) * $scope.itemsPerPage,
                    page * $scope.itemsPerPage
                );
                $scope.feedbackList = pagedData;
            }

        }
        //Pagination Ends

    }

]);

