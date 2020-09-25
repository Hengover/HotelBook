export default class Likes{
    constructor() {
        this.likes = [];
    }

    addLike(id, img, name, address, rating, price){
        const like = {id, img, name, address, rating, price};
        this.likes.push(like);
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.persistData();
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes)); //It's always be a string.c JSON.stringify-convert arrays ot a string
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        //Restore likes from the localStorage
        if (storage) this.likes = storage;

        return this.likes;
    }
}