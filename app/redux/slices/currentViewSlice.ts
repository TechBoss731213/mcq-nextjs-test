import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentViewState {
	currentView: string;
}

const initialState: CurrentViewState = {
	currentView: 'TextChat',
};

const currentViewSlice = createSlice({
	name: 'currentView',
	initialState,
	reducers: {
		setCurrentView: (state, action: PayloadAction<string>) => {
			state.currentView = action.payload;
		},
	},
});

export const { setCurrentView } = currentViewSlice.actions;
export default currentViewSlice.reducer;