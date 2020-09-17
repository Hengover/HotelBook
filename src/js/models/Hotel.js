import axios from 'axios'; //Import axios package

export default class Hotels{
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
            console.log(this.Hotel);
        } catch(error) {
            console.log(error);
        }
    }
}