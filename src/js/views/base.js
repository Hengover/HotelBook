export const elements = {
    searchForm: document.querySelector('.search__form'),
    searchBtn: document.querySelector('.search__btn'),
    searchInputPlace: document.querySelector('.search__field--place'),
    searchInputCheckin: document.querySelector('.search__field--checkin'),
    searchList: document.querySelector('.search-list__article-box'),
    searchPaginationBox: document.querySelector('.search-list__pagination'),
    formSpecify: document.querySelector('.form-specify'),
    formSpecifyCheckboxAll: document.querySelectorAll('.form-specify__checkbox'),
    formSpecifyCheckbox: document.querySelector('.form-specify__checkbox'),
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
    room: document.querySelector('.search__room-count'),
    errorWindow: document.querySelector('.error-popup'),
    btnErrorWindow: document.querySelector('.error-popup__btn'),
    btnSlidePanel: document.querySelector('.search-list__btn-slide-panel'),
    animationPanel: document.querySelector('.movepanel')
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
    elements.sectionOffer.style.display = 'none';
    elements.sectionList.style.display = 'none';
    elements.favoritesSection.style.display = 'none';
    elements.hotelDetails.style.display = 'none';
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};
