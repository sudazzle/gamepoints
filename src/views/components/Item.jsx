import React from 'react';

const Item = (props) => {
	const { item, addToPlayersBasket } = props;
	const { name, id } = item;
	return (
		<span className="player-item" data-item-id={id} onClick={addToPlayersBasket}>{name}</span>
	);
};

export default Item;