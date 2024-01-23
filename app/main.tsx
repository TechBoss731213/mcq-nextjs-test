import React from "react";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Main = () => {

	const isFullScreen = useSelector((state: RootState) => state.fullScreenState.isFullScreen);

	return (
		<div className={`${isFullScreen ? "flex w-full h-[100vh]" : "max-w-[1200px] mx-auto flex h-[calc(100vh_-_200px)] mt-[100px] shadow-md rounded-[20px] border-[1px] border-[#EEE]"}`}>
			<Sidebar />
			<ChatSection />
		</div>
	)
}

export default Main;