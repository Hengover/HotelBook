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
		            "x-rapidapi-key": "ce71953e95msheace372770fab61p1a592ejsn8abc30a2e1a5"
                }
            })
            this.hotel = res.data.data[0];
            //Likes
            this.img = res.data.data[0].photo.images.medium.url;
            this.name = res.data.data[0].name;
            this.address = res.data.data[0].address;
            this.rating = res.data.data[0].rating;
            this.price = res.data.data[0].price;

            //this.persistData();
            console.log(this.hotel);
        } catch(error) {
            console.log(error);
        }
    }
    /*
    persistData() {
        localStorage.setItem('hotel', JSON.stringify(this.Hotel)); //It's always be a string.c JSON.stringify-convert arrays ot a string
        localStorage.setItem('id', JSON.stringify(this.id)); //It's always be a string.c JSON.stringify-convert arrays ot a string

        //Likes data
        localStorage.setItem('img', JSON.stringify(this.img)); //It's always be a string.c JSON.stringify-convert arrays ot a string
        localStorage.setItem('name', JSON.stringify(this.name)); //It's always be a string.c JSON.stringify-convert arrays ot a string
        localStorage.setItem('address', JSON.stringify(this.address)); //It's always be a string.c JSON.stringify-convert arrays ot a string
        localStorage.setItem('rating', JSON.stringify(this.rating)); //It's always be a string.c JSON.stringify-convert arrays ot a string
        localStorage.setItem('price', JSON.stringify(this.price)); //It's always be a string.c JSON.stringify-convert arrays ot a string
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('hotel'));
        //Restore likes from the localStorage
        if (storage) this.Hotel = storage; //if storage variable undefined or null

        return this.Hotel;
    }

    readStorageId() {
        const storageId = JSON.parse(localStorage.getItem('id'));
        //Restore likes from the localStorage
        if (storageId) this.id = storageId;
        return this.id;
    }
    
    readStorageLikesData() {
        const LikesData = {
            storageImg: JSON.parse(localStorage.getItem('img')),
            storageName: JSON.parse(localStorage.getItem('name')),
            storageAddress: JSON.parse(localStorage.getItem('address')),
            storageRating: JSON.parse(localStorage.getItem('rating')),
            storagePrice: JSON.parse(localStorage.getItem('price'))
        }

        let dataLike;
        if(LikesData.storageImg, LikesData.storageName, LikesData.storageAddress, LikesData.storageRating, LikesData.storagePrice){
            dataLike = {
                img: this.img = LikesData.storageImg,
                name: this.name = LikesData.storageName,
                address: this.address = LikesData.storageAddress,
                rating: this.rating = LikesData.storageRating,
                price: this.price = LikesData.storagePrice
            }
        } 
        return dataLike;
    }
    */
}