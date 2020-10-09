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
		            "x-rapidapi-key": "36471a185cmshdf05c53bdd3b3dbp14d909jsnc76af03da835"
                }
            })
            this.hotel = res.data.data[0];
            //Likes
            this.img = res.data.data[0].photo.images.medium.url;
            this.name = res.data.data[0].name;
            this.address = res.data.data[0].address;
            this.rating = res.data.data[0].rating;
            this.price = res.data.data[0].price;
        } catch(error) {
            searchView.openErrorWindow();
        }
    }

}