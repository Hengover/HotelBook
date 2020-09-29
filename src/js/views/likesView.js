import { elements } from './base';

export const openFavoritesSection = () => {
    elements.sectionList.style.display = 'none';
    elements.sectionOffer.style.display = 'none';
    elements.hotelDetails.style.display = 'none';
    elements.asideSearch.style.display = 'none';
    elements.favoritesSection.style.display = 'block';
}

export const closeFavoritesSection = () => {
    elements.favoritesSection.style.display = 'none';
    elements.sectionOffer.style.display = 'grid';
}

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.section-details__btn-svg use').setAttribute('href', `./img/sprite.svg#${iconString}`);
};

export const deleteLike = id => {
    const el = document.querySelector(`.card__btn[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};

export const deleteLikeBtnClose = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

export const renderLikeHotel = like => {
    const markup = `
    <div class="card" data-itemid=${like.dataId}>
        <img src="${like.img}" alt="Image hotel" class="card__img">
        <div class="card__details">
            <h4 class="heading-fourth card__heading ">${like.name}</h4>
            <div class="card__adress-box">
                <svg class="card__svg card__svg--address">
                    <use xlink:href="./img/sprite.svg#icon-globe"></use>
                </svg>
                <address class="card__address">${like.address}</address>
            </div>
            <div class="card__rating-sale-box">
                <span class="number-rating card__rating">${like.rating}</span>
                <span class="card__sale">${like.price}</span>
            </div>
        </div>
        <a class="btn card__btn" href="#${like.id}">View the details</a>
        <button class="card__btn-close">
            <svg class="card__svg card__svg--close">
                <use xlink:href="./img/sprite.svg#icon-close-solid"></use>
            </svg>
        </button>
    </div>
    `;
    elements.favoritesCardBox.insertAdjacentHTML('beforeend', markup);
}