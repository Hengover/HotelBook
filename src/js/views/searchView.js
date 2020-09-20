import { elements } from './base';

export const getInputPlace = () => elements.searchInputPlace.value;
export const getInputCheckin = () => elements.searchInputCheckin.value; 
export const getInputAdults = () => elements.searchInputAdults.value; 
export const getInputRooms = () => elements.searchInputRooms.value; 
export const getInputNight = () => elements.searchInputNight.value;  

export const getSpecCheckbox = () => elements.formSpecifyCheckbox.value;

export const redirect = () => {
    window.location = '../../search.html';
}

const limitDesription = text => {
    const ArrDescr = text.split(' ', 30);
    const newDescr = `${ArrDescr.join(' ')}...`;
    return newDescr;
}

export const clearResult = () => {
    elements.searchHotelsBox.innerHTML = ''
}

export const clearPaginationBox = () => {
    elements.searchPaginationBox.innerHTML = ''
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
                    <span class="search-list__rating-number">${hotel.rating}</span>
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