$('#markers').click(function(obj){
    $("#heatMap").removeClass("active");
    $("#markers").addClass("active");

    //Mudar para markers

});

$('#heatMap').click(function(obj){
    $("#markers").removeClass("active");
    $("#heatMap").addClass("active");

    //Mudar para heatMap
    
});