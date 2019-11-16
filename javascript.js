$("#currentDay").text(moment().format("Do MM YY"));
var cityArr = [];


$("#basic-addon2").on("click", function(){
    var inputVal = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=2dd71429926bf13ebe24bc0797e94190";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        cityArr.push(inputVal);
        $("#city-list").empty();

        displaycity();  
        var iconURL = "http://openweathermap.org/img/wn/"+ response.weather[0].icon + ".png";
        $("#icon").attr("src", iconURL);

        var Ftep = response.main.temp - 273.15;
        Ftep = Ftep.toFixed(2);
        $("#city-name").text(inputVal);
        $("#tep").text(Ftep + "℃");
        $("#hum").text(response.main.humidity + "%");
        $("#wp").text(response.wind.speed);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        
        var URL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon=" + lon + "&appid=2dd71429926bf13ebe24bc0797e94190";
        
        
        $.ajax({
            url: URL,
            method: "GET"
        }).then(function(responseuv){
            // console.log(responseuv);
            $("#uv").text(responseuv.value);
        })
        var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=2dd71429926bf13ebe24bc0797e94190";
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            forecast(response);
        })       
    })   
});

function forecast(response){
    $("#forecast").empty();
    var fiveforecast= [response.list[8], response.list[16], response.list[24], response.list[32], response.list[39]];
    fiveforecast.forEach(function(m,i){
        var weatherCard = $("<div>").attr({
            "class": "card fivecard text-center col-2",
            "id": "forecast"+i
        });
        var cardBody = $("<div>").addClass("card-body");
        var cardTitle = $("<div>").addClass("card-title").text(moment(m.dt_txt).format("Do MM YY"));
        var cardText = $("<p>").addClass("card-text");
        var temp = $("<div>").text("Temperature: " + (m.main.temp-273.15).toFixed(2) + "℃");
        var hum = $("<div>").text("humidity: " + m.main.humidity + "%");
        var iconURL = "http://openweathermap.org/img/wn/"+ m.weather[0].icon + ".png";
        var icon = $("<img>").attr("src", iconURL);
        cardText.append(icon, temp, hum);
        cardBody.append(cardTitle,cardText);
        weatherCard.append(cardBody);
        $("#forecast").append(weatherCard);
    });
    
}

function displaycity(){
    var n = cityArr.length
    for(var i=0; i<n;i++){
        var row = $("<li>");
        row.addClass("list-group-item");
        row.text(cityArr[i]);
        $("#city-list").append(row);
    }
}


