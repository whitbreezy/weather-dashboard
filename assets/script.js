var APIKey = "210c7d0d816503c2044f315fabb02b85";
var city;
var state;
var country;

var searchContainer = $('#search-container');
var cityBtnContainer = $('#city-btn-container');
var forecastContainer = $('#forecast');
var cityInput = $('#cityInput');
var searchBtn = $('#search-btn');
var today = dayjs();

//puts current date in the H2
$('#currentDate').text(today.format('MM-DD-YYYY'));
//setup function to get weather data

//mostly to test
searchBtn.on('click', function(){
    //make search input value into array of city, country, state
    var userSearch = cityInput.val().split(', ');
    console.log(userSearch);
})


