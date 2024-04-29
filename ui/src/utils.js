// colorUtils.js
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

// iconUtils.js
export const getIconType = (type) => {
    switch(type) {
        case 'Restaurants':
        case 'Restaurant':
            return 'bi bi-egg-fried';
        case 'Hotels':
            return 'bi bi-hospital';
        case 'Nature & Wildlife':
            return 'bi bi-tree';
        case 'History & Culture':
            return 'bi bi-bricks';
        case 'Bars':
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
