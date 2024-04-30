//return container colour based on place.dataset types
export const getCardColorClass = (dataset) => {
    switch(dataset) {
        case 'attractions':
            return 'card-orange';
        case 'accommodation':
            return 'card-green';
        case 'bars-clubs':
            return 'card-purple';
        case 'user-gen':
            return 'card-blue';
        default:
            return 'card-red';
    }
};

//return Bootstrap icon based on place.type
export const getIconType = (type) => {
    switch(type) {
        case 'Restaurants':
        case 'Restaurant':
            return 'bi bi-egg-fried';
        case 'Hotel':
        case 'Hotels':
            return 'bi bi-hospital';
        case 'Hawker':
            return 'bi bi-egg-fried';
        case 'Nature & Wildlife':
            return 'bi bi-tree';
        case 'History & Culture':
            return 'bi bi-bricks';
        case 'Bars':
            return 'bi bi-cup-straw';
        case 'Clubs':
            return 'bi bi-cup-straw';
        case 'Cafe':
            return 'bi bi-cup-hot-fill';
        case 'Serviced Apartments':
            return 'bi bi-trophy';
        case 'Leisure & Recreation':
            return 'bi bi-balloon';
        default:
            return 'bi bi-suitcase';
    }
};
