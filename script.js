let config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "b0hydEpDaWhqdnNkVHppRzhpUE5WeFFYUWNLenBkQnkwZ1poSGh1SA=="
}

let countrySelect = document.querySelector(".country");
let stateSelect = document.querySelector(".state");
let citySelect = document.querySelector(".city");


// to load countries 
function loadCountries() {
    let apiEndPoint = config.cUrl;

    fetch(apiEndPoint, {
        headers: {
            "X-CSCAPI-KEY": config.ckey,
        }
    })
        .then(res => res.json())
        .then(data => {

            // console.log(data);
            // console.log(data[1]);

            data.forEach(country => {
                const option = document.createElement("option");
                option.value = country.iso2;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });

        })
        .catch(error => {
            console.log("Country loading error : ", error);
        })
};


// to load states
function loadStates() {
    const selectedCountryCode = countrySelect.value;
    // console.log(selectedCountryCode);

    stateSelect.innerHTML = '<option selected>Select State</option>'; // for clearing the existing states

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            data.forEach(state => {
                const option = document.createElement("option");
                option.value = state.iso2;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            })
        })
        .catch(error => {
            console.log("states loading error ", error);
        })

};

// to lead cities
function loadCities() {
    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;
    //  console.log(selectedStateCode, selectedCountryCode); 

    citySelect.innerHTML = '<option selected>Select City</option>'; // for clearing the existing cities

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(res =>  res.json() )
        .then(data => {
            // console.log(data)
            data.forEach(city => {
                const option = document.createElement("option");
                option.value = city.iso2;
                option.textContent = city.name;
                citySelect.appendChild(option);
            })
        })
        .catch(error => {
            console.log("cities loading error : ", error);
        })
};


window.onload = loadCountries;
