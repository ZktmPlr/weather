let miastoInput = document.querySelector(".miasto");
let submit = document.getElementById("y");

async function done() {
    try {
        const miasto = miastoInput.value;
        const weather = await pobierz_pogode(miasto);

        if (weather.current) { // Sprawdź, czy 'current' nie jest undefined
            const { condition, feelslike_c } = weather.current;

            console.log(weather.current);

            const weather_image = document.querySelector(".weather_icon");
            weather_image.src = `https://${condition.icon}`;

            const weather_element = document.querySelector(".weather_text");
            weather_element.innerHTML = `Obecnie w "${miasto}" jest ${condition.text}.<br> Temperatura odczuwalna ${feelslike_c}&deg;C`;
        } else {
            console.error("Brak danych o aktualnej pogodzie.");
        }
    } catch (error) {
        console.error("Błąd podczas przetwarzania danych pogodowych:", error);
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