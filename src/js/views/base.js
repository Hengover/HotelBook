export const elements = {
    searchForm: document.querySelector('.search__form'),
    searchInputPlace: document.querySelector('.search__field--place'),
    searchInputCheckin: document.querySelector('.search__field--checkin'),
    searchInputAdults: document.querySelector('.search__field--adults'),
    searchInputRooms: document.querySelector('.search__field--rooms'),
    searchInputNight: document.querySelector('.search__field--night'),
    searchList: document.querySelector('.search-list__article-box'),
    searchPage: document.querySelector('.container-search'),
    searchPaginationBox: document.querySelector('.search-list__pagination'),
    searchFormSmall: document.querySelector('.form-small'),
    formSpecify: document.querySelector('.form-specify'),
    formSpecifyCheckboxAll: document.querySelectorAll('.form-specify__checkbox'),
    formSpecifyCheckbox: document.querySelector('.form-specify__checkbox'),
    hotelPage: document.querySelector('.hotel-page'),
    asideSearch: document.querySelector('.filters'),
    cardBox: document.querySelector('.section-favorites'),
    likePage: document.querySelector('.container-likes'),

    searchHotelsCards: document.querySelector('.search-list__card'),
    searchHotelsBox: document.querySelector('.search-list__article-box'),
    sectionList: document.querySelector('.search-list'),
    sectionOffer: document.querySelector('.offer'),
    mainContent: document.querySelector('.main-content'),
    hotelDetails: document.querySelector('.section-details'),
    asideSearch: document.querySelector('.filters'),
    btnClose : document.querySelector('.section-details__btn-close'),
    btnFavorites: document.querySelector('.header__favorites'), 
    favoritesSection: document.querySelector('.section-favorites'),
    favoritesCardBox: document.querySelector('.section-favorites__cards-box'),
    btnCloseFav: document.querySelector('.section-favorites__btn-close'),
    labelUpdate: document.querySelector('.search__label'),
    popupUpdate: document.querySelector('.search__popup-box'),
    btnAdultsDecrease: document.querySelector('.search__popup-btn-adults--decrease'),
    btnAdultsIncrease: document.querySelector('.search__popup-btn-adults--increase'), 
    btnRoomsDecrease: document.querySelector('.search__popup-btn-rooms--decrease'),
    btnRoomsIncrease: document.querySelector('.search__popup-btn-rooms--increase'), 
    btnNightsDecrease: document.querySelector('.search__popup-btn-nights--decrease'),
    btnNightsIncrease: document.querySelector('.search__popup-btn-nights--increase'),
    btnSvgAdults: document.querySelector('.search__btn-decrease-svg--adults'),
    btnSvgRooms: document.querySelector('.search__btn-decrease-svg--rooms'),
    btnSvgNights: document.querySelector('.search__btn-decrease-svg--nights'),
    valueUpdate: document.querySelector('.search__popup-input'), 
    valueUpdateBox: document.querySelector('.search__popup-input-box'),
    labelPopup: document.querySelector('.search__popup-label'),
    countInputAdults: document.querySelector('.search__popup-count--adults'),
    countInputRooms: document.querySelector('.search__popup-count--rooms'),
    countInputNights: document.querySelector('.search__popup-count--nights'),
    guest: document.querySelector('.search__adult-count'),
    night: document.querySelector('.search__night-count'),
    room: document.querySelector('.search__room-count')
}

export const elementString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
    <div class="${elementString.loader}">
        <svg>
        <use href="./img/sprite.svg#icon-spinner2"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};
