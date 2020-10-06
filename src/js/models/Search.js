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
                    "x-rapidapi-key": "ce71953e95msheace372770fab61p1a592ejsn8abc30a2e1a5"
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
                    "x-rapidapi-key": "ce71953e95msheace372770fab61p1a592ejsn8abc30a2e1a5"
                }
            })
            this.hotelList = res.data.data;
            console.log(this.hotelList);
            console.log(res);
        } catch(error) {
            alert(error);
        }
    }

    async getHotelFiltersList(queryPlace, hotelClass) {
        try {
            const res = await axios(`https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${queryPlace}&adults=1&checkin=${this.checkin}&rooms=${this.rooms}&nights=${this.night}&hotel_class=${hotelClass}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "ce71953e95msheace372770fab61p1a592ejsn8abc30a2e1a5"
                }
            })
            this.hotelListFilter = res.data.data;
            console.log(this.hotelListFilter);
        } catch(error) {
            alert(error);
        }
    }
}


