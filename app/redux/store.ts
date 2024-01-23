import { configureStore } from '@reduxjs/toolkit';
import textChatReducer from './slices/textChatSlice';
import currentViewReducer from './slices/currentViewSlice';
import fullScreenStateReducer from './slices/fullScreenStateSlice';

const store = configureStore({
	reducer: {
		textChat: textChatReducer,
		currentView: currentViewReducer,
		fullScreenState: fullScreenStateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;