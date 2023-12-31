var APIKey = "210c7d0d816503c2044f315fabb02b85";
var searchContainer = $('#search-container');
var cityBtnContainer = $('#city-btn-container');
var forecastContainer = $('#forecast');
var cityInput = $('#cityInput');
var searchBtn = $('#search-btn');
var today = dayjs();

//puts current date in the H2
$('#currentDate').text(today.format('MM-DD-YYYY'))

$('#date-1').text(today.add(1, 'day').format('MM-DD-YYYY'));
$('#date-2').text(today.add(2, 'day').format('MM-DD-YYYY'));
$('#date-3').text(today.add(3, 'day').format('MM-DD-YYYY'));
$('#date-4').text(today.add(4, 'day').format('MM-DD-YYYY'));
$('#date-5').text(today.add(5, 'day').format('MM-DD-YYYY'));

//function to get weather data from weather api
var getWeather = function(city){
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +',us'+ "&appid=" + APIKey + "&units=imperial";
    fetch(forecastURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);
                    displayWeather(data, city);
                });
            } else{
                alert('Error: ' + response.statusText);
            }
        })
};
//function to display the weather data
var displayWeather = function (weatherData, searchTerm){
    if (weatherData.length===0){
        $('#forecast-item').text('No Data Found');
        return;
    }
    //empty out arrays with old data
    var iconURLArray = [];
    var forecastTemps = [];
    var forecastWindArr = [];
    var forecastHumidityArr = [];

    //set city header to name of city searched
    $('#cityHeader').text(searchTerm);

    //create icon url for img source
    var iconURL = "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png"
    //create icon img element and set the src to the new icon url, add styling
    var iconEl = document.createElement('img');
    iconEl.setAttribute("src", iconURL);
    iconEl.setAttribute('style', 'width:60px')
    //add icon after today's date in header
    $('#weatherEmoji').html(iconEl);

    //set temp, wind, and humidity div text to their data points
    $('#temp').text("Temperature: "+ weatherData.list[0].main.temp + "° Farenheit");
    $('#wind').text("Wind: " + weatherData.list[0].wind.speed + "mph");
    $('#humidity').text("Humidity: " + weatherData.list[0].main.humidity +"%");
    //loop through data and add forecast data for each of the next 5 days
    for (var i=0; i<5; i++){
        var forecastIconURL = "https://openweathermap.org/img/wn/" + weatherData.list[i].weather[0].icon + "@2x.png";
        iconURLArray.push(forecastIconURL);
        forecastTemps.push("Temp: " + weatherData.list[i+1].main.temp + "°");
        forecastWindArr.push("Wind: " + weatherData.list[i+1].wind.speed + " mph");
        forecastHumidityArr.push("Humidity: " + weatherData.list[i+1].main.humidity +"%");

        //create elements for the data being displayed and add them to html
        var forecastDate = $('<div>');
        forecastDate.text(today.add(i+1, 'day').format('MM-DD-YYYY'));
        $('#forecast').children().eq(i).append(forecastDate);
        var forecastIcon = $('<img>');
        forecastIcon.attr('src', iconURLArray[i]);
        forecastIcon.attr('style', 'width: 50px')
        $('#forecast').children().eq(i).append(forecastIcon);
        var tempEl = $('<div>')
        $('#forecast').children().eq(i).append(tempEl);
        tempEl.text(forecastTemps[i]);
        var windEl = $('<div>');
        $('#forecast').children().eq(i).append(windEl);
        windEl.text(forecastWindArr[i]);
        var humidityEl = $('<div>');
        $('#forecast').children().eq(i).append(humidityEl);
        humidityEl.text(forecastHumidityArr[i]);
    }
};

//check for stored cities in localstorage
var storedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

//function to save city to localstorage
var saveCity = function(userInput){
    storedCities.push(userInput);
    localStorage.setItem('savedCities', JSON.stringify(storedCities));
    displayCityBtns();
}

//display city buttons
var displayCityBtns = function(){
    cityBtnContainer.html('');
    for (var i=0; i<storedCities.length; i++){
        if (storedCities !== null){
            var cityBtn = $('<button>');
            cityBtn.text(storedCities[i]);
            cityBtn.attr('id', '#city-button');
            cityBtn.addClass("btn btn-secondary mb-3");
            cityBtnContainer.append(cityBtn);
        }
        cityBtn.on('click', function(){
            city = cityBtn.text();
            $('#cityHeader').text(cityBtn.text());
            $('.forecast-item').empty();
            getWeather($(this).text());
        })
    }
    

}


//function to handle click on search button
var searchHandler = function (event){
    event.preventDefault();
    var cityName = cityInput.val().trim();
    $('.forecast-item').empty();
    if (cityName){
        cityInput.val('');
        saveCity(cityName);
        getWeather(cityName);
    }
    else{
        alert('Please enter a city.')
    }
};
//event listener for user clicking Search 
searchBtn.on('click', searchHandler);

displayCityBtns();


