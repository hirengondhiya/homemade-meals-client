import React from 'react';
import Meal from './Meal';
import { useGlobalState } from '../../config/store';

const Meal = () => {
	const { store } = useGlobalState();
	const { meals } = store;
	return <div>{meals.sort((a, b))}</div>;
};
