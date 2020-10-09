import { elements } from './base';

const renderAmenities = (amenities, start, end) => {
    const markup = amenities.slice(start, end).map(el => 
        `<li class="hotel-details__amenities-item">
            <svg class="hotel-details__amenities-svg">
                <use xlink:href="./img/sprite.svg#icon-checkmark-outline"></use>
            </svg>
            <span>${el.name}</span>
        </li>`).join(' ');
    return markup;
};

const renderReviews = reviews => {
    const markup = reviews.map(el => 
        `<div class="hotel-details__review">
            <div class="hotel-details__review-user-desc">
                <figure class="hotel-details__review-figure">
                    <img src="${el.user.avatar.large.url}" alt="Reviews" class="hotel-details__review-img">
                </figure>
                <div class="hotel-details__review-user-name-date">
                    <h3 class="hotel-details__review-user-name heading-tertiary">${el.user.username}</h3>
                    <span class="hotel-details__review-user-date">${el.user.created_time}</span>
                </div>
            </div>
            <p class="hotel-details__review-text">${el.text}</p>
        </div>
        `).join(' ');
    return markup;
};

export const openHotel = () => {
    elements.hotelDetails.innerHTML = '';
    elements.sectionList.style.display = 'none';
    elements.favoritesSection.style.display = 'none';
    elements.hotelDetails.style.display = 'grid';
}

export const openSearchList = () => {
    elements.sectionList.style.display = 'grid';
    elements.hotelDetails.style.display = 'none';
}

export const renderHotel = (hotel, isLiked) => {
    const markup = `
        <div class="hotel-details__name-box">
            <div class="hotel-details__desc-box">
                <div class="hotel-details__name-class-box">
                    <p class="hotel-details__name">${hotel.name}</p>
                    <div class="hotel-details__svg-class-box">
                        <span class="hotel-details__class-hotel">4.0</span>
                        <svg class="hotel-details__svg-class hotel-details__svg-class--star">
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                        </svg>
                        <button class="hotel-details__btn-svg">
                            <svg class="hotel-details__svg-class hotel-details__svg-class--likes">
                                <use xlink:href="./img/sprite.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <address class="hotel-details__address">${hotel.address}</address>
                <ul class="hotel-details__list-link">
                    <li class="hotel-details__item-link">
                        <svg class="hotel-details__svg-link">
                            <use xlink:href="./img/sprite.svg#icon-envelope"></use>
                        </svg>
                        <span>${hotel.email}</span>
                    </li>
                    <li class="hotel-details__item-link">
                        <svg class="hotel-details__svg-link">
                            <use xlink:href="./img/sprite.svg#icon-phone"></use>
                        </svg>
                        <span>${hotel.phone}</span>
                    </li>
                </ul>
            </div>
            <div class="hotel-details__sale-box">
                <span class="hotel-details__sale">${hotel.price}</span>
                <button class="btn">Reserve</button>
                </div>
            </div>
            <figure class="hotel-details__figure">
                <img src="${hotel.photo.images.original.url}" alt="Hotel image" class="hotel-details__img">
            </figure>
            <p class="hotel-details__description-hotel">${hotel.description}</p>
            <h3 class="heading-tertiary hotel-details__amenities-heading">Main amenities</h3>
            <div class="hotel-details__amenities-box">
                <ul class="hotel-details__amenities-list">${renderAmenities(hotel.amenities, 0, 10)}</ul>
                <ul class="hotel-details__amenities-list">${renderAmenities(hotel.amenities, 10, 20)}</ul>
                <ul class="hotel-details__amenities-list">${renderAmenities(hotel.amenities, 20, 30)}</ul>
            </div>
            <div class="hotel-details__reviews-score">
                <h3 class="heading-tertiary hotel-details__amenities-heading">Guest Reviews</h3>
                <span class="hotel-details__reviews-number number-rating">${hotel.rating}</span>
            </div>
            
            <div class="hotel-details__reviews-box">
                ${renderReviews(hotel.room_tips)}
            </div>
            <button class="btn-close hotel-details__btn-close">
                <svg class="svg-close">
                    <use xlink:href="./img/sprite.svg#icon-close"></use>
                </svg>
            </button>
    `;
    elements.hotelDetails.insertAdjacentHTML('afterbegin', markup);
}
