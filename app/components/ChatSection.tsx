import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import TextChat from '../pages/TextChat';

const ChatSection = (props: any) => {

	const currentView = useSelector((state: RootState) => state.currentView.currentView);

	return (
		<div className="rounded-r-[20px] w-full relative">
			{currentView === 'TextChat' && <TextChat />}
		</div>
	);
};

export default ChatSection;