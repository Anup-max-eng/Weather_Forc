let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast =document.querySelector(".weather_forecast");
let w_icon=document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_mintem=document.querySelector(".weather_min");
let w_maxtem=document.querySelector(".weather_max");
let w_feelslike=document.querySelector(".weather_feelslike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");
let citySearch=document.querySelector(".weather_search");





///to get the actual country name
const getcountryName=(code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}
//to get the date and time 
const getDateTime=(dt)=>{
    
    const currDate =new Date(dt*1000);
    console.log(currDate);
    
    const options ={
     weekday:"long",
     year:"numeric",
     month:"long",
     day:"numeric",
     hour:"numeric",
     minute:"numeric",

    };
    const formatter =new Intl.DateTimeFormat("en-US",options);
    return formatter.format(currDate);
};
 let city = "lucknow";
//search funtionality 
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});


const getWeatherData = async()=>{
    const waetherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=`;
    try{
        const response= await fetch(waetherUrl);
        const data= await response.json();
       // console.log(data);
       const{main,name,weather,wind,sys,dt}=data;
       cityName.innerHTML=`${name} ,${getcountryName(sys.country)}`;
       dateTime.innerHTML=getDateTime(dt); 
       w_forecast.innerHTML=weather[0].main;
       w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;



       w_temperature.innerHTML=`${main.temp}&#176`;
       w_mintem.innerHTML=`Min:${main.temp_min.toFixed()}&#176`;
       w_maxtem.innerHTML=`Max:${main.temp_max.toFixed()}&#176`;
       w_feelslike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
       w_humidity.innerHTML=`${main.humidity}%`;
       w_wind.innerHTML=`${wind.speed}m/s`;
       w_pressure.innerHTML=`${main.pressure}hpa`;
     

}catch(error){
    console.error(error);
}
};
document.body.addEventListener('load', getWeatherData());
