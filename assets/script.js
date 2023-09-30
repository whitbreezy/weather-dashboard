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


//setup function to get weather data
function getWeather(){
    //create var city for user input
    var city = cityInput.val().trim();
    //add api call for current weather data
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +',us'+ "&appid=" + APIKey + "&units=imperial";
    //API call for forecast
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +',us'+ "&appid=" + APIKey + "&units=imperial";
    //fetch current weather API data
    fetch(weatherURL)
        .then(function(response){
            return response.json();
            //convert data to json
        })
        .then(function(data){
            //console logs to test
            console.log(data);
            console.log(city);
            //set city header to city name
            $('#cityHeader').text(city);
            //create icon url from icon data point
            var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            //create icon img element and set the src to the new icon url, add styling
            var iconEl = document.createElement('img');
            iconEl.setAttribute("src", iconURL);
            iconEl.setAttribute('style', 'width:60px')
            //add icon after today's date in header
            $('#cityDetails').append(iconEl);
            //set temp, wind, and humidity div text to their data points
            $('#temp').text("Temperature: "+ data.main.temp + "° Farenheit");
            $('#wind').text("Wind: " + data.wind.speed + "mph");
            $('#humidity').text("Humidity: " + data.main.humidity +"%");
        });
    //fetch forecast api data
    fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            
        })
        //idea: use forecastURL for today's data and forecast data. 
        //line 40 alt : var = link + data.list[0].weather[0].icon
        //will need to edit other lines of code too
        
    }




//event listener for search button
searchBtn.on('click', getWeather);

