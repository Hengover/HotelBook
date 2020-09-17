//Global app controller

//Css and sass
import '../css/style.css';
import '../sass/main.scss';

//JS
import Search from './models/Search';
import Hotel from './models/Hotel';
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
                if(elements.searchPage){
                    searchView.clearResult();
                    searchView.clearPaginationBox();
                    searchView.renderResults(state.search.hotelList, searchView.rows, searchView.currentPage);
                    searchView.renderButtons(state.search.hotelList, elements.searchPaginationBox, searchView.rows);
                } else {
                    searchView.redirect();
                }
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
    } 
});

const targetHotel = async () => {
    const id = window.location.hash.replace('#', ''); //Return entire url( in this case - hash symbole - id)
    if(id){
        state.hotel = new Hotel(id);
        try {
            state.hotel.getHotelDetails();
            //window.location = '../hotel.html';
        } catch(error) {
            alert(error);
        }
    }
}
