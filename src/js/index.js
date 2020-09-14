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

//Search filter
let stringClass;
const searchFilter = async () => {
    const queryPlace = state.search.locationId;
    console.log(queryPlace);
    const hotelClass = stringClass;

        if(hotelClass) {
            console.log(hotelClass);
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
            el.addEventListener('change', () =>{
                if(el.checked){
                        stringClass = el.value;
                        searchFilter();
                } else {
                    //Arr.slice(0, el.value);
                    console.log(stringClass);
                }
            });
        });
    } 
})





