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
                /*
                if(elements.searchPage){
                    searchView.clearResult();
                    searchView.clearPaginationBox();
                    searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
                    searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
                } else {
                    searchView.redirect();
                }
                */
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
            hotelView.renderHotel(state.hotel.hotel)
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

elements.hotelDetails.addEventListener('click', e => {
    if(e.target.matches('.section-details__btn-close, .section-details__btn-close *')) {
        hotelView.openSearchList();
    }
})




/*
//Search filter
let stringClass;
const searchFilter = async () => {
    const queryPlace = state.search.locationId;
    const hotelClass = stringClass;
        if(hotelClass) {
            try {
                await state.search.getHotelFiltersList(queryPlace, hotelClass);
                //Clear hotel and pagination box
                searchView.clearResult();
                searchView.clearPaginationBox();
                //Render and Pagination
                searchView.renderResultsClass(state.search.hotelList, searchView.rows, searchView.currentPage);
                searchView.renderButtonsClass(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
            } catch(error){
                alert(error);
            }
        }
}  

//Restore and render hotelsList on search page load and Pagination
window.addEventListener('load', () => {
    //Search page
    if(elements.searchPage) {
        state.search = new Search();
        state.search.readStorage();
        //Render and Pagination
        searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
        searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
        //Search filter
        elements.formSpecifyCheckboxAll.forEach(el => {
            el.addEventListener('change', () => {
                if(el.checked){
                    stringClass = el.value;
                    searchFilter();
                }
            });
        });

        elements.searchFormSmall.addEventListener('submit', e => {
            e.preventDefault();
            controlSearch();
        });

        elements.searchHotelsBox.addEventListener('click', e => {
            const btn = e.target.closest('.search-list__btn'); //Return closest element
            if(btn){
                ['hashchange', 'load'].forEach(event => window.addEventListener(event, targetHotel));
            }  
        });
    //Hotel page
    } else if(elements.hotelPage) {
        state.hotel = new Hotel();
        const hotelDetails = state.hotel.readStorage();
        hotelView.renderReiew(hotelDetails);
        hotelView.renderHotel(hotelDetails);

        //Like button
        elements.hotelDetails.addEventListener('click', e => {
            const btn = e.target.closest('.section-details__btn-like');
            if(btn){
                window.location = '../like.html';
            }
        })
        //Like page
    } else if(elements.likePage) {
        controlLike();
    }
});

//Hotel view
const targetHotel = async () => {
    const id = window.location.hash.replace('#', ''); //Return entire url( in this case - hash symbole - id)
    if(id){
        state.hotel = new Hotel(id);
        try {
            await state.hotel.getHotelDetails();
            hotelView.redirect();
            
        } catch(error) {
            alert(error);
        }
    }
}

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    state.hotel = new Hotel();
    const currentId = state.hotel.readStorageId();
    const dataLike = state.hotel.readStorageLikesData();

    console.log(currentId, dataLike);

    //User has not yet liked current recipe
    
    if(!state.likes.isLiked(currentId)){
        const newLike = state.likes.addLike(
            currentId,
            dataLike.img,
            dataLike.name,
            dataLike.address,
            dataLike.rating,
            dataLike.price
        )

        likesView.renderLikeHotel(newLike);
        //User has liked current recipe
        
    } else {
        state.likes.deleteLike(currentId);
    }
}
*/
