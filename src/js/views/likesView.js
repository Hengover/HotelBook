import { elements } from './base';

export const renderLikeHotel = like => {
    const markup = `
    <div class="card">
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
        <a class="btn card__btn" href="${like.id}">View the details</a>
        <a class="card__btn-close" href="#">
            <svg class="card__svg card__svg--close">
                <use xlink:href="./img/sprite.svg#icon-close-solid"></use>
            </svg>
        </a>
    </div>
    `;
    elements.cardBox.insertAdjacentHTML('beforeend', markup);
}