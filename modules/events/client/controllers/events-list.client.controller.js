'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', '$uibModal', '$log', '$mdSidenav',
    function ($scope, $googleCalendar, $uibModal, $log, $mdSidenav) {


        //================================================================================
        // Variables
        //================================================================================

        $scope.events = [];
        $scope.calEvents = [];
        $scope.eventSources = [];
        $scope.isCalendarView = true;
        $scope.isTableView = false;
        $scope.isSidenavOpen = false;

        /* config object */
        $scope.uiConfig = {
            calendar: {
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                editable: false,

                aspectRatio: 1.5,

                header: {
                    left: 'month,agendaWeek,agendaDay,verticalResourceView',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventLimit: true,
                navLinks: true,
                views: {
                    verticalResourceView: {
                        type: 'timeline',
                        duration: { days: 1 },
                        buttonText: 'day by doctor',

                    },
                    agendaDay: {
                        resources: false
                    }
                },
                minTime: '8:00',
                maxTime: '21:00',

                resourceAreaWidth: '20%',
                resourceLabelText: 'Doctors',

                resources: [
                    { id: 'Dr. Rachana R', title: 'Dr. Rachana R', eventColor: 'green' },
                ],

                eventRender: function (event, element) {

                    var view = $('#calendar').fullCalendar('getView');

                    if (view.name === 'verticalResourceView') {
                        element.find('.fc-title').empty();
                        element.find('.fc-title').append(event.description.split('\n')[0]);
                    }
                    else {
                        element.find('.fc-title').empty();

                        if (event.description === 'On Vacation') {
                            element.find('.fc-title').append('On Vacation - ' + event.title);
                        } else {
                            element.find('.fc-title').append(event.title);
                        }

                    }

                    // to cancel the events
                    //          element.append( "<span class='closeon'>X</span>" );
                    // element.find(".closeon").click(function() {
                    //    $('#calendar').fullCalendar('removeEvents',event._id);
                    // });
                },
                eventClick: $scope.alertOnEventClick
            }

        };

        this.toggleview = function () {
            if ($scope.isCalendarView === true) {
                $scope.isCalendarView = false;
                $scope.isTableView = true;
            }
            else {
                $scope.isCalendarView = true;
                $scope.isTableView = false;
            }
        };

        /* alert on eventClick calendar*/
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.currentEvent = date;
            $mdSidenav('right').toggle();
        };

        //================================================================================
        // Scope Functions
        //================================================================================

        $scope.getEvents = function () {
            $googleCalendar.getEvents().then(function (events, eventRender) {

                $scope.events = events;

                for (var index = 0; index < events.length; index++) {
                    var event = events[index];
                    
                    if(event.status === "confirmed"){

                    $scope.calEvents[index] = {
                        'title': event.summary,
                        'start': event.start.dateTime,
                        'end': event.end.dateTime,
                        'description': event.description,
                        'resourceId': event.summary,
                        'stick': 'true',
                    };
                }
                    console.log("event_summary",event.summary);
                }

            });
        };
        
        //Custom filter  to hide the deleted events in app calenadr
        
         $scope.myFilter1 = function (event) {
            return event.status === "confirmed";
        };

        $scope.eventSources = [$scope.calEvents];

        $scope.setCurrentEvent = function (event) {
            $scope.currentEvent = event;
        };

        $scope.myFilter = function (event) {
            return event.description !== 'On Vacation';
        };

        // Delete Events

         $scope.remove=function(id){
            console.log(id);
            //var currentId = id;
            $googleCalendar.deleteEvent(id).then(function () {
                 $scope.getEvents();
            });
		};


    }]);

