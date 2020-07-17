import React, { useReducer, useEffect } from 'react';
import { BrowseRouter, Router } from 'react-router-dom';
import stateReducer from './config/stateReducer';

const intialState = {
	meals: []
};

const [ store, dispatch ] = useReducer(stateReducer, initialState);
const { meals } = store;

const App = () => {
	return <div>The basic empty template</div>;
};

export default App;
