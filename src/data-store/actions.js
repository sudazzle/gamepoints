export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const RESET_CART = 'RESET_CART';

export function addItemToCart (itemId) {
	return {
		type: ADD_ITEM_TO_CART,
		itemId
	};
}

export function resetCart () {
	return {
		type: RESET_CART
	};
}