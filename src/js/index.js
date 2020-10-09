//Global app controller
//Css and sass
import '../css/style.css';
import '../sass/main.scss';
//JS
import Search from './models/Search';
import Hotel from './models/Hotel';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as hotelView from './views/hotelView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

/**Search conroller */

/**
 * Autocomplete controller 
*/
searchView.autocomplete(document.getElementById('myInput'), searchView.countries);

/**
* Button error
*/
elements.btnErrorWindow.addEventListener('click', e => {
    e.preventDefault();
    searchView.btnError();
})

/** 
* Popup update box controller
*/
elements.labelUpdate.addEventListener('click', () => {
    searchView.openPopupUpdate(elements.popupUpdate);
});

let adults = '1', rooms = '1', nights = '1';

elements.btnAdultsDecrease.addEventListener('click', e => {
    e.preventDefault();
    if(elements.countInputAdults.innerHTML > 1) adults = searchView.updateButton('dec', 'adults');
})

elements.btnAdultsIncrease.addEventListener('click', e => {
    e.preventDefault();
    adults = searchView.updateButton('inc', 'adults');
})

elements.btnRoomsDecrease.addEventListener('click', e => {
    e.preventDefault();
    if(elements.countInputRooms.innerHTML > 1) rooms = searchView.updateButton('dec', 'rooms');  
})

elements.btnRoomsIncrease.addEventListener('click', e => {
    e.preventDefault();
    rooms = searchView.updateButton('inc', 'rooms');
})

elements.btnNightsDecrease.addEventListener('click', e => {
    e.preventDefault();
    if(elements.countInputNights.innerHTML > 1) nights = searchView.updateButton('dec', 'nights');
})

elements.btnNightsIncrease.addEventListener('click', e => {
    e.preventDefault();
    nights = searchView.updateButton('inc', 'nights');
})

const controlSearch = async () => {
    const queryPlace = searchView.getInputPlace();
    const checkin = searchView.getInputCheckin();
        //New search object and add to state
        if(queryPlace, checkin, adults, rooms, nights) {
            state.search = new Search(queryPlace, adults, checkin, rooms, nights);
            try {
                renderLoader(elements.mainContent);
                searchView.clearPaginationBox();
                await state.search.getLocationId();
                await state.search.getHotelList();
                clearLoader(elements.mainContent);
                searchView.openSearch();
                searchView.openAsideFilter();
                searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
                searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
            } catch(error){
                searchView.openErrorWindow();
            }
        }
}

//Search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //cancels the default event action
    searchView.closePopupUpdate();
    controlSearch();
});

//Search filter
let stringClass;
const searchFilter = async () => {
    const queryPlace = state.search.locationId;
    const hotelClass = stringClass;
        if(hotelClass) {
            try {
                //Clear hotel and pagination box
                searchView.closeAsideFilter();
                renderLoader(elements.mainContent);
                searchView.clearResult();
                searchView.clearPaginationBox();
                await state.search.getHotelFiltersList(queryPlace, hotelClass);
                searchView.openAsideFilter();
                clearLoader(elements.mainContent);
                //Render and Pagination
                searchView.renderResultsClass(state.search.hotelListFilter, searchView.rows, searchView.currentPage);
                searchView.renderButtonsClass(state.search.hotelListFilter, elements.searchPaginationBox, searchView.rows);
            } catch(error){
                searchView.openErrorWindow();
            }
        }
} 

elements.sectionList.addEventListener('click', e => {
    if(e.target.closest('.search-list__btn-slide-panel')) {
        searchView.openSlidePanel();
    } else if(e.target.closest('.form-specify__btn-close')) {
        searchView.closeSlidePanel();
    }
})

elements.formSpecifyCheckboxAll.forEach(el => {
    el.addEventListener('change', () => {
        if(el.checked){
            stringClass = el.value;
            searchFilter();
        }
    });
});

//Hotel view
const targetHotel = async () => {
    const id = window.location.hash.replace('#', ''); //Return entire url( in this case - hash symbole - id)
    if(id){
        state.hotel = new Hotel(id);
        try {
            renderLoader(elements.mainContent);
            await state.hotel.getHotelDetails();
            clearLoader(elements.mainContent);
            hotelView.openHotel();
            hotelView.renderHotel(
                state.hotel.hotel, 
                state.likes.isLiked(id)
            );
        } catch(error) {
            searchView.openErrorWindow();
        }
    }
}

elements.sectionList.addEventListener('click', e => {
    const btn = e.target.closest('.search-list__btn'); //Return closest element
    if(btn){
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, targetHotel));
    }  
});

elements.favoritesSection.addEventListener('click', e => {
    const btn = e.target.closest('.card__btn'); //Return closest element
    if(btn){
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, targetHotel));
    }  
});

elements.hotelDetails.addEventListener('click', e => {
    if(e.target.matches('.hotel-details__btn-close, .hotel-details__btn-close *')) {
        hotelView.openSearchList();
    }
})

/**
 * Like controller
 */
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentId = state.hotel.id;
    console.log(currentId);

    //User has not yet liked current recipe
    
    if(!state.likes.isLiked(currentId)){
        const newLike = state.likes.addLike(
            currentId,
            state.hotel.img,
            state.hotel.name,
            state.hotel.address,
            state.hotel.rating,
            state.hotel.price,
        );

        //Toggle the like button
        likesView.toggleLikeBtn(true);

        //Add items on UI
        likesView.renderLikeHotel(newLike);
        
    //User has liked current recipe
    } else {
        //Delte item from the object
        state.likes.deleteLike(currentId);

        //Toggle the like button
        likesView.toggleLikeBtn(false);

        //Delete item on UI
        likesView.deleteLike(currentId);
    }
}

elements.btnFavorites.addEventListener('click', () => {
    likesView.openFavoritesSection();
})

elements.btnCloseFav.addEventListener('click', () => {
    likesView.closeFavoritesSection();
})

elements.hotelDetails.addEventListener('click', e => {
    if(e.target.matches('.hotel-details__btn-svg, .hotel-details__btn-svg *')) {
        controlLike();
    }
});

elements.favoritesSection.addEventListener('click', e => {
    if(e.target.matches('.card__btn-close, .card__btn-close *')) {
        const id = e.target.closest('.card').dataset.itemid;
        console.log(id)
        
        state.likes.deleteLike(id);
        console.log(state.likes);
        //Delete item on UI
        likesView.deleteLikeBtnClose(id);
    }  
});

//Restore liked hotels
window.addEventListener('load', () => {
    //Likes
    state.likes = new Likes();

    //Restore likes
    state.likes.readStorage();

    //Render the existing likes
    state.likes.likes.forEach(el => likesView.renderLikeHotel(el));
})
