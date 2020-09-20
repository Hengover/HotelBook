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
        `<div class="aside__reviews-user-box">
            <p class="aside__reviews-user-text">&quot;${el.text}&quot;</p>
                <div class="aside__reviews-user-details">
                    <figure class="aside__reviews-figure">
                        <img src="${el.user.avatar.large.url}" alt="User hotel" class="aside__reviews-user-image">
                    </figure>
                    <div class="aside__reviews-user-box-name">
                        <span class="aside__reviews-name">${el.user.username}</span>
                        <span class="aside__reviews-time">${el.user.created_time}</span>
                    </div>
                </div>
        </div>
        `).join(' ');
    return markup;
};

export const renderHotel = hotel => {
    const markup = `
        <div class="section-details__name-box">
            <div class="section-details__desc-box">
                <div class="section-details__name-class-box">
                    <p class="section-details__name">${hotel.local_name}</p>
                    <div class="section-details__svg-class-box">
                        <span class="section-details__class-hotel">4.0</span>
                        <svg class="section-details__svg-class section-details__svg-class--star">
                            <use xlink:href="./img/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg class="section-details__svg-class section-details__svg-class--likes">
                            <use xlink:href="./img/sprite.svg#icon-heart-outlined"></use>
                        </svg>
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
        <img src="${hotel.photo.images.large.url}" alt="Hotel image" class="section-details__img">
    </figure>
    <p class="section-details__description-hotel">${hotel.description}</p>
    <h3 class="heading-tertiary section-details__amenities-heading">Main amenities</h3>
    <div class="section-details__amenities-box">
        <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 0, 10)}</ul>
        <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 10, 20)}</ul>
        <ul class="section-details__amenities-list">${renderAmenities(hotel.amenities, 20, 30)}</ul>
    </div>
    `;
    elements.hotelDetails.insertAdjacentHTML('afterbegin', markup);
}

export const renderReiew = hotel => {
    const markup = `
    <div class="aside__rating-reviews">
                <h3 class="heading-tertiary aside__rating-heading">Guest reviews</h3>
                <span class="number-rating">${hotel.rating}</span>
            </div>
            <div class="aside__reviews">
                <h4 class="heading-fourth">What the guests says about us</h4>
                <div class="aside__reviews-user">${renderReviews(hotel.room_tips)}</div>
            </div>
    `;
    elements.asideHotel.insertAdjacentHTML('beforeend', markup);
}