window.addEventListener('load',()=>{
	let long;
	let lat;
	let temperatureDescription=document.querySelector(
		".temperature-description"
		);
	let temperatureDegree=document.querySelector(".temperature-degree");
	let locationTimeZone=document.querySelector(".location-timezone");
	let temperatureSection=document.querySelector(".temperature");
	const temperatureSpan=document.querySelector(".temperature span");
	const temperaturechange=document.querySelector(".temperature-change");


	 if(navigator.geolocation)
	 {
	 	navigator.geolocation.getCurrentPosition(position =>{
	 		long=position.coords.longitude;
	 		lat=position.coords.latitude;
            const proxy='https://cors-anywhere.herokuapp.com/';
	 		const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;


	 		fetch(api)
	 		.then(respone =>{
	 			return respone.json();
	 		})
	 		.then(data =>{
	 			console.log(data);
	 			const{temperature, summary, icon}=data.currently;
	 			//Set DOM Elements from the API
	 			temperatureDegree.textContent=temperature;
	 			temperatureDescription.textContent=summary;
	 			locationTimeZone.textContent=data.timezone;

	 			//Formula for Celcius
	 			let celcius=(temperature-32)*(5/9);


	 			//Set Icons
	 			setIcons(icon, document.querySelector(".icon"));

	 			//Change Temperature to Celsius/ Farhenheit
	 			temperaturechange.addEventListener("click",()=>{
	 				if(temperatureSpan.textContent ==="F") {
	 					temperatureSpan.textContent="C";
	 					temperaturechange.textContent="Click here to change to Farhenheit"
	 					temperatureDegree.textContent=Math.floor(celcius)
	 				}
	 				else
	 				{
	 					temperatureDegree.textContent=temperature;
	 					temperatureSpan.textContent="F";
	 					temperaturechange.textContent="Click here to change to Celcius"
	 				}
	 			});
	 		});
	 	});
	 }
	 function setIcons(icon,iconID){
	 	const skycons=new Skycons({color: "white"});
	 	const currentIcon=icon.replace(/-/g, "_").toUpperCase();
	 	skycons.play()
	 	return skycons.set(iconID, Skycons[currentIcon]);
	 }

});