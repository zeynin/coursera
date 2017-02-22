'use strict';

angular.module( 'confusionApp' )
.constant("baseURL", "http://localhost:3000/")
.service( 'menuFactory', ['$resource', 'baseURL', function( $resource, baseURL )
{
    this.getDishes = function()
    {
        return $resource( baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } } );
    };

    // implement a function named getPromotion
    // that returns a selected promotion.
    this.getPromotion = function()
    {
        return $resource( baseURL + "promotions/:id" );
    };

} ] )

.factory( 'corporateFactory', ['$resource', 'baseURL', function( $resource, baseURL )
{

    var corpfac = {};

    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Now just need 1 function.
    corpfac.getLeaders = function()
    {
        //return leadership;
        return $resource( baseURL + "leadership/:id" );
    };

    // Remember this is a factory not a service
    return corpfac;
} ] )

// Some APIs expect a PUT request in the format URL/object/ID
// Here we are creating an 'update' method
.factory( 'feedbackFactory', ['$resource', 'baseURL', function( $resource, baseURL )
{
    return $resource( baseURL + 'feedback/:id' );
}] )

;
