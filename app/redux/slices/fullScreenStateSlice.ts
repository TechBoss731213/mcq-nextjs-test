import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FullScreenState {
    isFullScreen: boolean;
}

const initialState: FullScreenState = {
    isFullScreen: false,
};

const fullScreenStateSlice = createSlice({
    name: 'fullScreenState',
    initialState,
    reducers: {
        toggleFullScreen: (state) => {
            state.isFullScreen = !state.isFullScreen;
        },
    },
});

export const { toggleFullScreen } = fullScreenStateSlice.actions;
export default fullScreenStateSlice.reducer;