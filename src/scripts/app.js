console.log('Welcome 👋🏻!');

// Global variables
let countryHolder,
    countryCounter;

const localKey = 'travel-planner';

const removeItem = key => {
    const index = getAllItems().indexOf(key);
    console.log('❌', key, 'removed ❌');
    let savedCountries = getAllItems();
    savedCountries.splice(index, 1);
    localStorage.setItem(localKey, JSON.stringify(savedCountries));
};

const addItem = key => {
    let countries = getAllItems();
    countries.push(key);
    localStorage.setItem(localKey, JSON.stringify(countries));
    console.log('🌍', key, 'added 🌍');
    // console.log('🔢', countItems(), '🔢');
};

const hasItem = key => { return getAllItems().includes(key); };

const getAllItems = () => { return JSON.parse(localStorage.getItem(localKey)) || []; };

const countItems = key => { return getAllItems().length; }

const updateCounter = () => { countryCounter.innerHTML = countItems(); }

const showNotification = element => {
    const notification = `
        <div class="c-notification">
            <h2 class="c-notification__header">You have selected ${element.dataset.countryName}.</h2>
            <button class="c-notification__action">undo</button>
        </div>
    `;
    notificationHolder.innerHTML += notification;
}

const addListenersToCountries = function(classSelector) {
    const countries = document.querySelectorAll(classSelector);

    for (const country of countries) {
        country.addEventListener('click', function() {
            // Get the clicked country
            const selected = this.getAttribute('for');

            if (hasItem(selected)) {
                removeItem(selected);
            }
            else {
                addItem(selected);
                showNotification(country);
            }
            updateCounter();
        });
    }
}

const showCountries = data => {
    // #1. Loop the data
    let countries = '';

    for(const c of data) {
        // #2. Build an HTML-string for each country
        countries += `
            <article>
                <input type="checkbox" class="o-hide c-country-input" name="" id="${c.cioc}-${c.alpha2Code}" ${(hasItem(c.cioc + '-' + c.alpha2Code)) ? 'checked="checked"' : ''}>

                <label for="${c.cioc}-${c.alpha2Code}" class="c-country js-country" data-country-name="${c.name}">
                    <div class="c-country-header">
                        <h2 class="c-country-header__name">${c.name}</h2>
                        <img class="c-country-header__flag" src="${c.flag}" alt="The flag of Belgium." title="The flag of ${c.name}.">
                    </div>
                    <p class="c-country__native-name">${c.nativeName}</p>
                </label>
            </article>
        `;
    }

    countryHolder.innerHTML = countries;
    // HTML is loaded

    addListenersToCountries('.js-country');
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
    countryCounter = document.querySelector('.js-counter');
    notificationHolder = document.querySelector('.js-notification-holder');

    // Always start with Europe
    fetchCountries('europe');
    updateCounter();
};

const init = () => {
    console.log('DOM is ingeladen 🚀');

    enableListeners();
};

document.addEventListener('DOMContentLoaded', init);