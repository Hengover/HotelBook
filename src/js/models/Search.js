import axios from 'axios'; //Import axios package

export default class Search {
    constructor(queryPlace, adults, checkin, rooms, night) {
        this.queryPlace = queryPlace;
        this.adults = adults;
        this.checkin = checkin;
        this.rooms = rooms;
        this.night = night;
    }

    async getLocationId() {
        try {
            const res = await axios(`https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${this.queryPlace}`, {
                "method": "GET",
	            "headers": {
		            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		            "x-rapidapi-key": "09a11062damsh072d6ddbcb1b862p1986e7jsn5a0c7c8037db"
                }
            })
            console.log(res);
            this.locationId = res.data.data[0].result_object.location_id;
            console.log(this.locationId);
        } catch(error) {
            alert(error);
        }
    }

    async getHotelList() {
        try {
            const res = await axios(`https://tripadvisor1.p.rapidapi.com/hotels/get-details?adults=${this.adults}&nights=${this.night}&rooms=${this.rooms}&currency=USD&lang=en_US&checkin=${this.checkin}&location_id=${this.locationId}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "09a11062damsh072d6ddbcb1b862p1986e7jsn5a0c7c8037db"
                }
            })
            this.hotelList = res.data.data;
            //Restore hotelList
            this.persistData();
            console.log(this.hotelList);
        } catch(error) {
            alert(error);
        }
    }

    persistData() {
        localStorage.setItem('hotelList', JSON.stringify(this.hotelList)); //It's always be a string.c JSON.stringify-convert arrays ot a string
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('hotelList'));

        //Restore likes from the localStorage
        if (storage) this.hotelList = storage; //if storage variable undefined or null
    }
}


