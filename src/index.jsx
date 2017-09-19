import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GamePointApp from './views/GamePointApp';
import store from './data-store/configureStore';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component />
			</Provider>	
		</AppContainer>,
		document.getElementById('app-container') // eslint-disable-line
	);
};

render(GamePointApp);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./views/GamePointApp', () => {
		render(GamePointApp);
	});
}
