import React, { Component } from 'react';
import '../assets/styles/styles.scss';
import { connect } from 'react-redux';
import Item from './components/Item';
import { addItemToCart, resetCart } from '../data-store/actions';
import ViewScoreBoard from '../assets/images/svg/scoreboard.svg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GamePointApp extends Component {
	constructor(props) {
		super(props);
		this.addToPlayersBasket = this.addToPlayersBasket.bind(this);
		this.state = {
			viewScoreBoard4MobileDevice: false
		};
	}

	addToPlayersBasket (e) {
		const { dispatch } = this.props;
		const itemId = e.currentTarget.dataset.itemId;
		dispatch(addItemToCart(itemId));
		this.forceUpdate();
	}

	restartGame () {
		this.props.dispatch(resetCart());
	}

	toggleScoreBoard () {
		this.setState({viewScoreBoard4MobileDevice: !this.state.viewScoreBoard4MobileDevice});
	}

	getCollectedScores () {
		let collectedScores = [];
		this.props.collectedScores.map((score, i) => {
			collectedScores.push(<span 
				className={score.hasOwnProperty('perUnit') ? 'collected-score' : 'collected-bonus'}
				key={`collectedScore-${i}`}>{score.hasOwnProperty('perUnit') ? `+ ${score.perUnit}` : `+Bonus ${score.bonus}`}
			</span>);
		});
		return collectedScores;
	}

	render() {
		const { availableItems, cart } = this.props;
		let subTotal = {score: 0, bonus: 0};
		const playerItemsClassNames = this.state.viewScoreBoard4MobileDevice ? 
										'player-items-wrapper show-player-items' : 
										'player-items-wrapper hide-player-items';
		return (
			<div className="gamepoint-wrapper">
				<div className="item-collection-wrapper">
					<div className="item-collection-header">
						<h1><a href="#">Game Points</a></h1>
						<ViewScoreBoard className="scoreboard-icon" onTouchEnd={this.toggleScoreBoard.bind(this)} />
					</div>
					<div className="item-collection">
						{
							availableItems.map(item => {
								return (
									<Item key={item.id} item={item} addToPlayersBasket={this.addToPlayersBasket} />
								);
							})
						}
						<ReactCSSTransitionGroup
							transitionName="fadeinout"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={300}>
							{this.getCollectedScores()}
						</ReactCSSTransitionGroup>
					</div>

					<div className="start-new-game">
						<button onClick={this.restartGame.bind(this)}>Start New Game</button>
					</div>
				</div>
				<div className={playerItemsClassNames}>
					<div className="player-items-header">
						<h2>Player Items</h2>
					</div>
					<div className="player-items">
						<table>
							<thead>
								<tr>
									<th width="30%">Items</th>
									<th>Qty</th>
									<th>Score/Unit</th>
									<th>Bonus</th>
								</tr>
							</thead>
							<tbody>
							{
								cart.map(item => {
									const { id, name, quantity, unitPoints, earnedBonus } = item;
									const scoreperUnit = unitPoints * quantity;
									const bonusperUnit =  earnedBonus ? earnedBonus : 0;
									subTotal.score += scoreperUnit;
									subTotal.bonus += bonusperUnit;
									return (
										<tr key={`cart-${id}`}>
											<td>{name}</td>
											<td>{quantity}</td>
											<td>{scoreperUnit}</td>
											<td>{(bonusperUnit > 0) ? bonusperUnit : '-'}</td>
										</tr>
									);
								})
							}
								<tr className="subtotal">
									<td colSpan="2">Sub Total</td>
									<td>{subTotal.score}</td>
									<td>{subTotal.bonus}</td>
								</tr>
								<tr className="total">
									<td colSpan="2">Total</td>
									<td colSpan="2">{subTotal.score + subTotal.bonus}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="start-new-game">
						<button onClick={this.restartGame.bind(this)}>Start New Game</button>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(state => state)(GamePointApp);
