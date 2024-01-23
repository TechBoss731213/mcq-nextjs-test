import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setCurrentView } from "../redux/slices/currentViewSlice";

import Link from "next/link";
import Image from "next/image";

import logo from "../images/logo.png";
import { addThread, switchThread } from "../redux/slices/textChatSlice";

const Sidebar = () => {
	const activeThreadId = useSelector((state: RootState) => state.textChat.activeThreadId);
	const threads = useSelector((state: RootState) => state.textChat.threads);

	const dispatch = useDispatch();

	const handleThreadSwitch = (threadId: number) => {
		dispatch(switchThread(threadId));
		dispatch(setCurrentView('TextChat'));
	};

	const handleAddThread = () => {
		const threadId = threads.length + 1;
		dispatch(addThread(threadId));
	};

	return (
		<div className="px-[20px] pt-[40px] bg-[#E7F8FF] rounded-l-[20px] max-w-[360px] w-full relative">
			<Link href="/" className="flex justify-between items-center mb-[30px]">
				<div className="flex flex-col items-start">
					<h2 className="text-[20px] font-bold">Multipurpose GPT</h2>
					<p className="text-[12px] font-semibold">Generate multi features from text prompt.</p>
				</div>
				<div className="w-[40px] h-[40px]">
					<Image src={logo} width={40} height={40} alt="Multipurpose GPT Logo" />
				</div>
			</Link>
			{threads.map((thread) => (
				<div
					key={thread.id}
					className={`w-full p-[10px] bg-[#fff] rounded-[10px] cursor-pointer shadow mb-[20px] ${activeThreadId === thread.id && "border-[2px] border-[#1D93AB]"}`}
					onClick={() => handleThreadSwitch(thread.id)}
				>
					<h3 className="text-[14px] font-semibold">Thread {thread.id}</h3>
					<p className="text-[12px] mt-[8px]">{thread.messageCount} messages</p>
				</div>
			))}
			<div className="absolute p-[10px] bg-[#fff] w-[calc(100%_-_40px)] bottom-[20px] rounded-[10px] shadow cursor-pointer text-center" onClick={handleAddThread}>
				New Chat
			</div>
		</div>
	);
};

export default Sidebar;