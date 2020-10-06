import { elements } from './base';

export const getInputPlace = () => elements.searchInputPlace.value;
export const getInputCheckin = () => elements.searchInputCheckin.value; 
/*
export const getInputAdults = () => elements.searchInputAdults.value; 
export const getInputRooms = () => elements.searchInputRooms.value; 
export const getInputNight = () => elements.searchInputNight.value;  
*/
export const getSpecCheckbox = () => elements.formSpecifyCheckbox.value;

const limitDesription = text => {
    const ArrDescr = text.split(' ', 30);
    const newDescr = `${ArrDescr.join(' ')}...`;
    return newDescr;
}

/**
 * Popup window
*/
export const openPopupUpdate = selector => {
    const display = selector.style.display;
    if(display === 'none') {
        selector.style.display = 'block';
    } else {
        selector.style.display = 'none';
    }
}

export const closePopupUpdate = () => {
    elements.popupUpdate.style.display = 'none';
}

export const updateButton = ( type, view ) => {
    let valueNum, valueStr;
    if(view === 'adults' ) {
        valueNum = type === 'dec' ? parseInt(elements.countInputAdults.innerHTML) - 1 : parseInt(elements.countInputAdults.innerHTML) + 1;
        valueStr =  String(valueNum);
        elements.countInputAdults.innerHTML = valueStr;
        updateCountGuest(valueStr, elements.guest, 'adult');
        lightUpdateButton(valueStr, elements.btnAdultsDecrease, elements.btnSvgAdults);
    } else if (view === 'rooms') {
        valueNum = type === 'dec' ? parseInt(elements.countInputRooms.innerHTML, 10) - 1 : parseInt(elements.countInputRooms.innerHTML, 10) + 1;
        valueStr =  String(valueNum);
        elements.countInputRooms.innerHTML = valueStr;
        updateCountGuest(valueStr, elements.room, 'room');
        lightUpdateButton(valueStr, elements.btnRoomsDecrease, elements.btnSvgRooms);
    } else if (view === 'nights') {
        valueNum = type === 'dec' ? parseInt(elements.countInputNights.innerHTML, 10) - 1 : parseInt(elements.countInputNights.innerHTML, 10) + 1;
        valueStr =  String(valueNum);
        elements.countInputNights.innerHTML = valueStr;
        updateCountGuest(valueStr, elements.night, 'night');
        lightUpdateButton(valueStr, elements.btnNightsDecrease, elements.btnSvgNights);
    }
    console.log(valueStr)
    return valueStr;
}

const updateCountGuest = ( value, selector, view ) => {
    if(value === '1') {
        selector.innerHTML = `${value} ${view}`;
    } else {
        selector.innerHTML = `${value} ${view}s`;
    }
}

const lightUpdateButton = ( value, selector, btnSvg ) => {
    if(value === '1') {
        selector.style.cursor = 'not-allowed';
        selector.style.border = '0.1rem solid #dbdbdd';
        btnSvg.style.fill = '#dbdbdd';
    } else {
        selector.style.cursor = 'pointer';
        selector.style.border = '0.1rem solid #4c9ded';
        btnSvg.style.fill = '#4c9ded';
    }
}

/**
 * Autocomplete
*/

export const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

export const autocomplete = function (inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener('input', function() {
        let a, b, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if(!val) return false;
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement('div');
        a.setAttribute('id', this.id + 'search__autocomplete-list');
        a.setAttribute('class', 'search__autocomplete-items');
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for(let i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if(arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()){
                /*create a DIV element for each matching element:*/
                b = document.createElement('div');
                /*make the matching letters bold:*/
                b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener('click', function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    })
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener('keydown', function(e) {
        let x = document.getElementById(this.id + "search__autocomplete-list");
        if(x) x = x.getElementsByTagName("div");
        if(e.keyCode === 40){
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 38) {
            //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    })

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if(currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add('search__autocomplete-active');
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for(let i = 0; i < x.length; i++) {
            x[i].classList.remove('search__autocomplete-active');
        }
    }

    function closeAllLists(el) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        const x = document.getElementsByClassName('search__autocomplete-items');
        for (let i = 0; i < x.length; i++) {
            if(el != x[i] && el != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', e => {
        closeAllLists(e.target);
    });
}

export const clearResult = () => {
    elements.searchHotelsBox.innerHTML = '';
}

export const clearPaginationBox = () => {
    elements.searchPaginationBox.innerHTML = '';
}

export const openSearch = () => {
    elements.sectionList.style.display = 'grid';
    elements.sectionOffer.style.display = 'none';
    elements.hotelDetails.style.display = 'none';
    elements.searchHotelsBox.innerHTML = '';
    elements.asideSearch.style.display = 'none';
    elements.favoritesSection.style.display = 'none';
}

export const openAsideFilter = () => {
    elements.asideSearch.style.display = 'grid';
}

const renderHotel = hotel => {
    const markup = `
        <article class="search-list__article">
            <div class="search-list__description">
                <div class="search-list__head">
                    <h4 class="heading-fourth search-list__heading">${hotel.name}</h4>
                    <address class="search-list__address">${hotel.location_string}</address>
                </div>
                <figure class="search-list__figure">
                    <img src="${hotel.photo.images.large.url}" alt="Hotels-img" class="search-list__img">
                </figure>
                <div class="search-list__detail">
                    <p class="search-list__local-name">
                        <svg class="search-list__svg-name">
                            <use xlink:href="./img/sprite.svg#icon-globe"></use>
                        </svg>
                        <span>${hotel.ranking_geo}</span>
                    </p>
                    <p class="search-list__class">
                        <span class="search-list__number-class">${hotel.hotel_class}</span>
                        <svg class="search-list__svg-class">
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                        </svg>
                    </p>
                    <ul class="search-list__amneties">
                        <li class="search-list__amenity">
                            <svg class="search-list__svg-amenity">
                                <use xlink:href="./img/sprite.svg#icon-checkmark-outline"></use>
                            </svg>
                            <span>${hotel.amenities[0].name}</span>
                        </li>
                        <li class="search-list__amenity">
                            <svg class="search-list__svg-amenity">
                                <use xlink:href="./img/sprite.svg#icon-checkmark-outline"></use>
                            </svg>
                            <span>${hotel.amenities[1].name}</span> 
                        </li>
                    </ul>
                    <p class="search-list__definition">${limitDesription(hotel.description)}</p>
                </div>
            </div>
            <aside class="search-list__price">
                <div class="search-list__rating-box">
                    <p class="search-list__rating">Rating</p>
                    <span class="number-rating">${hotel.rating}</span>
                </div>
                <div class="search-list__cost-box">
                    <span class="search-list__cost">${hotel.price}</span>
                    <a class="btn-link search-list__btn" href="#${hotel.location_id}">Continue</a>
                </div>
            </aside>
        </article>
    `;
    elements.searchList.insertAdjacentHTML('beforeend', markup);
};

//Filter hotel
const renderHotelClass = hotel => {
    const markup = `
        <article class="search-list__article">
            <div class="search-list__description">
                <div class="search-list__head">
                    <h4 class="heading-fourth search-list__heading">${hotel.name}</h4>
                    <address class="search-list__address">${hotel.location_string}</address>
                </div>
                <figure class="search-list__figure">
                    <img src="${hotel.photo.images.medium.url}" alt="Hotels-img" class="search-list__img">
                </figure>
                <div class="search-list__detail">
                    <p class="search-list__local-name">
                        <svg class="search-list__svg-name">
                            <use xlink:href="./img/sprite.svg#icon-globe"></use>
                        </svg>
                        <span>${hotel.ranking_geo}</span>
                    </p>
                    <p class="search-list__class">
                        <span class="search-list__number-class">${hotel.hotel_class}</span>
                        <svg class="search-list__svg-class">
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                        </svg>
                    </p>
                </div>
            </div>
            <aside class="search-list__price">
                <div class="search-list__rating-box">
                    <p class="search-list__rating">Rating</p>
                    <span class="search-list__rating-number number-rating">${hotel.rating}</span>
                </div>
                <div class="search-list__cost-box">
                    <span class="search-list__cost">${hotel.price}</span>
                    <a class="btn search-list__btn" href="#${hotel.location_id}">Continue</a>
                </div>
            </aside>
        </article>
    `;
    elements.searchList.insertAdjacentHTML('beforeend', markup);
};

//Pagination
export let currentPage = 1;
export let rows = 10;

//renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
export const renderResults = (hotels, resPerPage, page) => {
    clearResult();
    //Render results of current page
    const start = (page - 1) * resPerPage; 
    const end = page * resPerPage;
    hotels.slice(start, end).forEach(renderHotel); //Pass array of recipes and render each recipe
};

//renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
export const renderButtons = (items, wrapper, resPerPage) => {
    const pages = Math.ceil(items.length / resPerPage); //Count page
    for (let i = 1; i <= pages; i++) { //Loop for render buttons starting from 1
        let btn = createButton(i, items); //Pass array of recipes and render each recipe
        btn.classList.add('search-list__pagination-button'); //Add class
		wrapper.appendChild(btn); //Add button in container pagination
	}
}

const createButton = (page, items) => {  
    const button = document.createElement('button'); //Create button element
    button.innerText = page; //Number button
    if (currentPage === page) button.classList.add('search-list__button-active'); //Add active class button
    //Event listener for button
    button.addEventListener('click', () => {
        currentPage = page; //Assign current page
        renderResults(items, rows, currentPage); 
        const curBtn = document.querySelector('.search-list__button-active');
        curBtn.classList.remove('search-list__button-active');
		button.classList.add('search-list__button-active');
    });
    return button;
}


//Filter hotel render and pagination
export const renderResultsClass = (hotels, resPerPage, page) => {
    clearResult();
    //Render results of current page
    const start = (page - 1) * resPerPage; 
    const end = page * resPerPage;
    hotels.slice(start, end).forEach(renderHotelClass); //Pass array of recipes and render each recipe
};

export const renderButtonsClass = (items, wrapper, resPerPage) => {
    const pages = Math.ceil(items.length / resPerPage); //Count page
    for (let i = 1; i <= pages; i++) { //Loop for render buttons starting from 1
        let btn = createButtonClass(i, items); 
        btn.classList.add('search-list__pagination-button'); //Add class
		wrapper.appendChild(btn); //Add button in container pagination
	}
}

const createButtonClass = (page, items) => {  
    const button = document.createElement('button'); //Create button element
    button.innerText = page; //Number button
    if (currentPage === page) button.classList.add('search-list__button-active'); //Add active class button
    //Event listener for button
    button.addEventListener('click', () => {
        currentPage = page; //Assign current page
        renderResultsClass(items, rows, currentPage);
        const curBtn = document.querySelector('.search-list__button-active');
        curBtn.classList.remove('search-list__button-active');
		button.classList.add('search-list__button-active');
    });
    return button;
}
