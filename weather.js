let miastoInput = document.querySelector(".miasto");
let submit = document.getElementById("y");

async function done() {
    try {
        const miasto = miastoInput.value;
        const weather = await pobierz_pogode(miasto);
    
        if (weather.current) {
            const { condition, feelslike_c } = weather.current;
     // WYODRĘBNIJ OBIEKTY CURRENT, LOCATION z WEATHER
            console.log(weather.current);
    
            const weather_image = document.querySelector(".weather_icon");
            weather_image.src = `https://${condition.icon}`;

            const weather_element = document.querySelector(".weather_text");   // ZNAJDZ ELEMENT Z ID POGODA
            weather_element.innerHTML = `Obecnie w "${miasto}" jest ${condition.text}.<br> Temperatura odczuwalna ${feelslike_c}&deg;C`; // USTAW WEWNĘTRZNY HTML 
        } else {
            console.error("no data");
        }
    } catch (error) {
        console.error("nah", error);
    }
}

submit.addEventListener("click", done);
async function pobierz_pogode(miasto) {
    const api_key = "d19565afa4374d739ac112913243001";
    const base_url = "https://api.weatherapi.com/v1";
    const lang = "pl";

    const response = await fetch(`${base_url}/current.json?key=${api_key}&q=${miasto}&lang=${lang}`);
    const data = await response.json();
    return data;
}


