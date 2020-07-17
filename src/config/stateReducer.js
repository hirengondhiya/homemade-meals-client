export default function(state, action) {
	switch (action.type) {
		case 'setMeals': {
			return {
				...state,
				meals: action.data
			};
		}
		default:
			return state;
	}
}
