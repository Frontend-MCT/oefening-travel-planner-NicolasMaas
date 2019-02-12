console.log('Welcome 👋🏻!');

// Global variables
let countryHolder;

const showCountries = data => {
    // #1. Loop the data
    let countries = '';

    for(const c of data) {
        // #2. Build an HTML-string for each country
        countries += `
            <article>
                <input type="checkbox" class="o-hide c-country-input" name="" id="${c.cioc}-${c.alpha2Code}">

                <label for="${c.cioc}-${c.alpha2Code}" class="c-country js-country">
                    <div class="c-country-header">
                        <h2 class="c-country-header__name">${c.name}</h2>
                        <img class="c-country-header__flag" src="${c.flag}" alt="The flag of Belgium." title="The flag of ${c.name}.">
                    </div>
                    <p class="c-country__native-name">${c.nativeName}</p>
                </label>
            </article>
        `
    }

    countryHolder.innerHTML = countries;
    // #3. Adjust CSS -> screen.css:
    //     - Click on country :checked
    //     - Flag correct height
};

const fetchCountries = region => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(response => response.json())
        .then(data => showCountries(data))
        .catch(err => console.error(`An error occured 😭, ${err}`));
};

const enableListeners = () => {
    // #1. Get some buttons
    const regionButtons = document.querySelectorAll('.js-region-select');

    // #2. Listen to the clicks
    for (const button of regionButtons) {
        button.addEventListener('click', function() {
            // #3. Look up the data property
            const region = this.getAttribute('data-region');
            console.log(region);
            // #4. Get data from API
            fetchCountries(region);
        });
    }

    countryHolder = document.querySelector('.js-country-holder');

    // Always start with Europe
    fetchCountries('europe');
};

const init = () => {
    console.log('DOM is ingeladen 🚀');

    enableListeners();
};

document.addEventListener('DOMContentLoaded', init);