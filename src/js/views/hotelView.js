import { elements } from './base';

export const redirect = () => {
    window.location = '../../hotel.html';
}

const renderAmenities = (amenities, start, end) => {
    const markup = amenities.slice(start, end).map(el => 
        `<li class="section-details__amenities-item">
            <svg class="section-details__amenities-svg">
                <use xlink:href="./img/sprite.svg#icon-checkmark-outline"></use>
            </svg>
            <span>${el.name}</span>
        </li>`).join(' ');
    return markup;
};

const renderReviews = reviews => {
    const markup = reviews.map(el => 
        `<div class="section-details__review">
            <div class="section-details__review-user-desc">
                <figure class="section-details__review-figure">
                    <img src="${el.user.avatar.large.url}" alt="Reviews" class="section-details__review-img">
                </figure>
                <div class="section-details__review-user-name-date">
                    <h3 class="section-details__review-user-name heading-tertiary">${el.user.username}</h3>
                    <span class="section-details__review-user-date">${el.user.created_time}</span>
                </div>
            </div>
            <p class="section-details__review-text">${el.text}</p>
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
        <div class="section-details__name-box">
            <div class="section-details__desc-box">
                <div class="section-details__name-class-box">
                    <p class="section-details__name">${hotel.name}</p>
                    <div class="section-details__svg-class-box">
                        <span class="section-details__class-hotel">4.0</span>
                        <svg class="section-details__svg-class section-details__svg-class--star">
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                        </svg>
                        <button class="section-details__btn-svg">
                            <svg class="section-details__svg-class section-details__svg-class--likes">
                                <use xlink:href="./img/sprite.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <address class="section-details__address">${hotel.address}</address>
                <ul class="section-details__list-link">
                    <li class="section-details__item-link">
                        <svg class="section-details__svg-link">
                            <use xlink:href="./img/sprite.svg#icon-envelope"></use>
                        </svg>
                        <span>${hotel.email}</span>
                    </li>
                    <li class="section-details__item-link">
                        <svg class="section-details__svg-link">
                            <use xlink:href="./img/sprite.svg#icon-phone"></use>
                        </svg>
                        <span>${hotel.phone}</span>
                    </li>
                </ul>
            </div>
            <div class="section-details__sale-box">
                <span class="section-details__sale">${hotel.price}</span>
                <button class="btn">Reserve</button>
                </div>
            </div>
            <figure class="section-details__figure">
                <img src="${hotel.photo.images.original.url}" alt="Hotel image" class="section-details__img">
            </figure>
            <p class="section-details__description-hotel">${hotel.description}</p>
            <h3 class="heading-tertiary section-details__amenities-heading">Main amenities</h3>
            <div class="section-details__amenities-box">
                <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 0, 10)}</ul>
                <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 10, 20)}</ul>
                <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 20, 30)}</ul>
            </div>
            <div class="section-details__reviews-score">
                <h3 class="heading-tertiary section-details__amenities-heading">Guest Reviews</h3>
                <span class="section-details__reviews-number number-rating">${hotel.rating}</span>
            </div>
            
            <div class="section-details__reviews-box">
                ${renderReviews(hotel.room_tips)}
            </div>
            <button class="btn-close section-details__btn-close">
                <svg class="svg-close">
                    <use xlink:href="./img/sprite.svg#icon-close"></use>
                </svg>
            </button>
    `;
    elements.hotelDetails.insertAdjacentHTML('afterbegin', markup);
}
