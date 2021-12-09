import { checkForValidDate } from "..";

const GEONAMES_USERNAME= 'rlyap93'
const WEATHERBIT_API_KEY='9ce1dcbf88574c178900a8646584b549'
const PIXABAY_API_KEY='3717b25ab15a3089473ca74ad'
let apiData = {};
let daysTilTrip = "";
let formDate = "";
let endDate = "";
let tripDuration ="";

// Event listener to add function to existing HTML DOM element
document.getElementById('done').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    // event.preventDefault()

    // check what text was put into the form field
    let formCity = document.getElementById('city').value
    formDate = document.getElementById('date').value
    endDate = document.getElementById('endDate').value
    daysTilTrip = countdown(formDate)
    tripDuration = calcDuration(formDate,endDate)
    if(Client.checkForText(formCity) & checkForValidDate(daysTilTrip,tripDuration)){
      getAPIData(formCity,GEONAMES_USERNAME,daysTilTrip)
      .then(data => {
        if(data){
          postData('http://localhost:8081/addAPIData', data)
          updateInterface()
        }
      })
    }
    else{
      alert("Please enter a city")
    }
}


/* Function to GET Web API Data*/
const getAPIData = async (city, GEONAMES_USERAME,days)=>{
  const res = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=10&username=${GEONAMES_USERAME}`);
  try {
      const data =  await res.json();
      if(data.postalCodes != ''){
      apiData['destination'] = `${data.postalCodes[0].adminName2}, ${data.postalCodes[0].countryCode}` 
      await getWeatherBitData(data.postalCodes[0].lng,data.postalCodes[0].lat,days)
      await getPixabayImg(data.postalCodes[0].adminName2)
      }
      else{
        alert("Please enter a valid city")
        return false;
      }
    }  catch(error) {
      console.log("error", error);
    }
  return apiData;
}

//function to return weather data
const getWeatherBitData = async(lon,lat,days) =>{
    const response = (days < 7) ? await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}`) : 
      await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}&days=1`);
      try {
        const data = await response.json();
        apiData['temp'] = data.data[0].temp
      }  catch(error) {
        console.log("error", error);
      }
}

//function to return img url from Pixabay
const getPixabayImg = async(city) =>{
  const res = await fetch(`https://pixabay.com/api/?key=24668499-${PIXABAY_API_KEY}&q=${city}&image_type=photo`);
    try {
      const data = await res.json();
      apiData['photoURL'] = data.hits[0].webformatURL;
    }  catch(error) {
      console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData
    } catch(error) {
      console.log("error", error);
    }
}


/* Function to GET Project Data */
async function updateInterface() {
  const request = await fetch('http://localhost:8081/all');
  try{
    const data = await request.json();
    console.log(data.destination)
    
    document.getElementById('title').innerHTML = "Trip details:"
    document.getElementById('destination').innerHTML = `Your ${tripDuration} day trip to ${data.destination} starts in ${daysTilTrip} days from ${formDate} to ${endDate}`

    if(daysTilTrip > 7){
      document.getElementById('temp').innerHTML = `Forecasted temperature is ${data.temperature}&#8451;`
    }
    else{
      document.getElementById('temp').innerHTML = `Current temperature now is ${data.temperature}&#8451;`
    }
    document.querySelector('.app').setAttribute('style', "background-image: url('"+ data.url +"'); background-size: cover");
    document.getElementById("main").style.visibility = "hidden";  
    document.getElementById("entry").style.transform = "translateY(-150px)"
    document.querySelector('.entry').setAttribute('height', "300px");
    document.getElementById("reset").style.visibility = "visible";  
    

  } catch{
    console.log("error", error);
  }
}

//to calculate the days until the trip
const countdown = (date) => {
      const oneDay = 1000 * 60 * 60 * 24
      const currentDate = new Date();
      const tripDate = new Date(date);
      let difference = Math.round(tripDate.getTime() - currentDate.getTime()) / (oneDay);
      return difference.toFixed(0)
    }

//to calculate the duration of the trip
const calcDuration = (startDate, endDate) => {
      const oneDay = 1000 * 60 * 60 * 24
      const tripStartDate = new Date(startDate);
      const tripEndDate = new Date(endDate);
      let difference = Math.round(tripEndDate.getTime() - tripStartDate.getTime()) / (oneDay);
      return difference.toFixed(0)
    }    


export { handleSubmit, countdown}

