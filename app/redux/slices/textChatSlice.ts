import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
	role: string;
	content: string;
}

interface Thread {
	id: number;
	messages: Message[];
	messageCount: number;
}

interface TextChatState {
	threads: Thread[];
	activeThreadId: number;
}

const initialState: TextChatState = {
	threads: [{ id: 1, messages: [], messageCount: 0 }],
	activeThreadId: 1,
};

const textChatSlice = createSlice({
	name: 'textChat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<Message>) => {
			const activeThread = state.threads.find(thread => thread.id === state.activeThreadId);
			if (activeThread) {
				activeThread.messages.push(action.payload);
				activeThread.messageCount = activeThread.messages.length;
			}
		},
		addThread: (state, action: PayloadAction<number>) => {
			state.threads.push({ id: action.payload, messages: [], messageCount: 0 });
		},
		switchThread: (state, action: PayloadAction<number>) => {
			state.activeThreadId = action.payload;
		},
	},
});

export const { addMessage, addThread, switchThread } = textChatSlice.actions;
export default textChatSlice.reducer;
