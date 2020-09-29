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
const controlSearch = async () => {
    const queryPlace = searchView.getInputPlace();
    const adults = searchView.getInputCheckin();
    const checkin = searchView.getInputAdults();
    const rooms = searchView.getInputRooms();
    const night = searchView.getInputNight();
        //New search object and add to state
        if(queryPlace, adults, checkin, rooms, night) {
            console.log(queryPlace);
            state.search = new Search(queryPlace, adults, checkin, rooms, night);
            try {
                searchView.openSearch();
                renderLoader(elements.mainContent);
                searchView.clearPaginationBox();
                await state.search.getLocationId();
                await state.search.getHotelList();
                clearLoader(elements.mainContent);
                searchView.openAsideFilter();
                searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
                searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
            } catch(error){
                alert(error);
            }
        }
}

//Search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //cancels the default event action
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
                renderLoader(elements.mainContent);
                searchView.clearResult();
                searchView.clearPaginationBox();
                await state.search.getHotelFiltersList(queryPlace, hotelClass);
                clearLoader(elements.mainContent);
                //Render and Pagination
                searchView.renderResultsClass(state.search.hotelListFilter, searchView.rows, searchView.currentPage);
                searchView.renderButtonsClass(state.search.hotelListFilter, elements.searchPaginationBox, searchView.rows);
            } catch(error){
                alert(error);
            }
        }
} 

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
            hotelView.openHotel();
            renderLoader(elements.mainContent);
            await state.hotel.getHotelDetails();
            clearLoader(elements.mainContent);
            hotelView.renderHotel(
                state.hotel.hotel, 
                state.likes.isLiked(id)
            );
        } catch(error) {
            alert(error);
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
    if(e.target.matches('.section-details__btn-close, .section-details__btn-close *')) {
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
    if(e.target.matches('.section-details__btn-svg, .section-details__btn-svg *')) {
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
