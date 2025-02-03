navigator.geolocation.getCurrentPosition((position, error) =>{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.weatherapi.com/v1/current.json?key=4b43a77ee3574bcc86b54625250202&q=India&aqi=yes`)
    .then(weather => weather.json())
    .then(result => {
        console.log(result);
        const ele = document.querySelector("#weather p")
        ele.textContent = result.current.temp_c + "°C";
    })

})
