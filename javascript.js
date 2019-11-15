$("#currentDay").text(moment().format("Do MM YY"));
var cityArr = [];


$("#basic-addon2").on("click", function(){
    var inputVal = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=2dd71429926bf13ebe24bc0797e94190";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        cityArr.push(inputVal);
        $("#city-list").empty();

        displaycity();
        var Ftep = response.main.temp - 273.15;
        Ftep = Ftep.toFixed(2);
        $("#tep").text(Ftep + "℃");
        $("#hum").text(response.main.humidity);
        $("#wp").text(response.wind.speed);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var URL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon=" + lon + "&appid=2dd71429926bf13ebe24bc0797e94190";
        $.ajax({
            url: URL,
            method: "GET"
        }).then(function(responseuv){
            console.log(responseuv);
            $("#uv").text(responseuv.value);
        })
        
    })
});



function displaycity(){
    var n = cityArr.length
    for(var i=0; i<n;i++){
        var row = $("<li>");
        row.addClass("list-group-item");
        row.text(cityArr[i]);
        $("#city-list").append(row);
    }
}


