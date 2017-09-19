import {
	RESET_CART,
	ADD_ITEM_TO_CART
} from './actions';
import find from 'lodash/find';

const initialState = {
	cart: [],
	collectedScores: [],
	availableItems: [
		{
			id: 'item_a',
			name: 'Item A',
			unitPoints: 50,
			bonusScheme: {
				numberOfItems: 3,
				points: 50
			}
		},
		{
			id: 'item_b',
			name: 'Item B',
			unitPoints: 30,
			bonusScheme: {
				numberOfItems: 2,
				points: 30
			}
		},
		{
			id: 'item_c',
			name: 'Item C',
			unitPoints: 20,
			bonusScheme: {
				numberOfItems: 4,
				points: 25
			}
		},
		{
			id: 'item_d',
			name: 'Item D',
			unitPoints: 15
		},
		{
			id: 'item_e',
			name: 'Item E',
			unitPoints: 5
		}
	]
};

const gamepoints = (state = initialState, action) => {
	switch (action.type) {
		case RESET_CART:
			return {
				...state,
				cart: []
			};
		case ADD_ITEM_TO_CART:
			{
				let newState = Object.assign({}, state);
				let item = find(newState.cart, {id: action.itemId});
				if (item) {
					item.quantity++;
					newState.collectedScores.push({
						perUnit: item.unitPoints
					});
					if (item.hasOwnProperty('bonusScheme')) {
						let bonuspoints = item.quantity/item.bonusScheme.numberOfItems;
						if (bonuspoints > 0) {
							item.earnedBonus = Math.floor(bonuspoints) * item.bonusScheme.points;
							if (item.quantity%item.bonusScheme.numberOfItems === 0) {
								newState.collectedScores.push({
									bonus: item.bonusScheme.points
								});
							}
						}
					}
				} else {
					let item = find(state.availableItems, {id: action.itemId});
					
					newState.collectedScores.push({
						perUnit: item.unitPoints
					});

					newState.cart.push({...item, quantity: 1});
				}
				return newState;
			}
		default:
			return state;
	}
};

export default gamepoints;