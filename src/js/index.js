//Global app controller

//Css and sass
import '../css/style.css';
import '../sass/main.scss';

//JS
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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
                await state.search.getLocationId();
                await state.search.getHotelList();
                searchView.redirect();
            } catch(error){
                alert(error);
            }
        }
}

if(elements.searchForm){
    elements.searchForm.addEventListener('submit', e => {
        e.preventDefault(); //cancels the default event action
        controlSearch();
    });
}

//Restore and render hotelsList on search page load and Pagination
window.addEventListener('load', () => {
    if(elements.searchPage) {
        state.search = new Search();
        state.search.readStorage();
        //Pagination
        searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
        searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
    } 
})


