'use strict';

angular.module( 'confusionApp' )

.controller( 'MenuController', ['$scope', 'menuFactory', function( $scope, menuFactory )
{
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    $scope.dishes = {};

    menuFactory.getDishes().query(
        function( response )
        {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function( response )
        {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    $scope.select = function( setTab )
    {
        $scope.tab = setTab;

        if( setTab === 2 ) {
            $scope.filtText = "appetizer";
        }
        else if( setTab === 3 ) {
            $scope.filtText = "mains";
        }
        else if( setTab === 4 ) {
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function( checkTab )
    {
        return ( $scope.tab === checkTab );
    };

    $scope.toggleDetails = function()
    {
        $scope.showDetails = !$scope.showDetails;
    };
}] )

.controller( 'ContactController', ['$scope', function( $scope )
{

    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}] )

.controller( 'FeedbackController', ['$scope', 'feedbackFactory', function( $scope, feedbackFactory )
{
    $scope.sendFeedback = function()
    {

        console.log( $scope.feedback );

        if( $scope.feedback.agree && ( $scope.feedback.mychannel === "" ) ) {
            $scope.invalidChannelSelection = true;
            console.log( 'incorrect' );
        }
        else {
            $scope.invalidChannelSelection = false;
            feedbackFactory.save( $scope.feedback );
            $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log( $scope.feedback );
        }
    };
}] )

.controller( 'DishDetailController', ['$scope', '$stateParams', 'menuFactory', function( $scope, $stateParams, menuFactory )
{
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = {};

    menuFactory.getDishes().get( { id: parseInt( $stateParams.id, 10 ) } )
    .$promise.then(
        function( response )
        {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function( response )
        {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
}] )

// In our controller we get the ID from the URL using ngRoute and $routeParams
// We pass in $routeParams and our Notes factory along with $scope
//app.controller( 'NotesCtrl', ['$scope', '$routeParams', 'Notes',
//    function( $scope, $routeParams, Notes )

.controller( 'DishCommentController', ['$scope', 'menuFactory', function( $scope, menuFactory )
{
    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: new Date().toISOString()
    };

    $scope.submitComment = function()
    {
        $scope.mycomment.date = new Date().toISOString();
        console.log( $scope.mycomment );

        $scope.dish.comments.push( $scope.mycomment );
        menuFactory.getDishes().update( { id: $scope.dish.id }, $scope.dish );

        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: new Date().toISOString()
        };
    };

}] )

// implement the IndexController and About Controller here
.controller( 'IndexController', ['$scope', 'menuFactory', 'corporateFactory',
    function( $scope, menuFactory, corporateFactory )
{
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = {};

    menuFactory.getDishes().get( { id: 0 } )
    .$promise.then(
        function( response )
        {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function( response )
        {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    $scope.showPromo = false;
    $scope.promotion = menuFactory.getPromotion().get( { id: 0 } );

    $scope.showLeader = false;
    $scope.leader = corporateFactory.getLeaders().get( { id: 3 } );
}] )

.controller( 'AboutController', ['$scope', '$stateParams', 'corporateFactory',
    function( $scope, $stateParams, corporateFactory )
{
    $scope.showLeaders = true;
    $scope.message = "Loading ...";
    $scope.leaders = {};

    corporateFactory.getLeaders().query(
        function( response )
        {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function( response )
        {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        } 
    );
}] )
;
