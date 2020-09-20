import axios from 'axios'; //Import axios package

export default class Hotel{
    constructor(id) {
        this.id = id;
    }

    async getHotelDetails () {
        try {
            const res = await axios(`https://tripadvisor1.p.rapidapi.com/hotels/get-details?currency=USD&lang=en_US&location_id=${this.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "09a11062damsh072d6ddbcb1b862p1986e7jsn5a0c7c8037db"
                }
            })
            this.Hotel = res.data.data[0];
            this.persistData();
            console.log(this.Hotel);
        } catch(error) {
            console.log(error);
        }
    }

    persistData() {
        localStorage.setItem('hotel', JSON.stringify(this.Hotel)); //It's always be a string.c JSON.stringify-convert arrays ot a string
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('hotel'));
        //Restore likes from the localStorage
        if (storage) this.Hotel = storage; //if storage variable undefined or null
        return this.Hotel;
    }
}