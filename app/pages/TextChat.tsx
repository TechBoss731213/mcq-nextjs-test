import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addMessage, addThread, switchThread } from '../redux/slices/textChatSlice';
import { toggleFullScreen } from '../redux/slices/fullScreenStateSlice';
import { useChat } from 'ai/react';

import ReactMarkdown from 'react-markdown'

import Image from 'next/image';

import fullScreenImageUrl from "../images/fullscreen.png";
import undoFullScreenImageUrl from "../images/undo-fullscreen.png";
import sendButtonImageUrl from "../images/send.png";
import pandaImageUrl from "../images/panda.png";

const TextChat = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: RootState) => state.fullScreenState.isFullScreen);
  const threads = useSelector((state: RootState) => state.textChat.threads);
  const activeThreadId = useSelector((state: RootState) => state.textChat.activeThreadId);

  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const element = chatHistoryRef.current;
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }
  }, [threads, activeThreadId]);

  const handleOnInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '46px';
      textareaRef.current.style.height = `${Math.min(100, textareaRef.current.scrollHeight)}px`;
    }
  }

  let { input, handleInputChange, handleSubmit, setInput } = useChat({
    api: '/api/text-chat',
    onFinish: (message) => {
      dispatch(addMessage({ role: message.role, content: message.content }));
    }
  });

  const handleClickSubmit = (userInput: string) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '46px';
    }
    dispatch(addMessage({ role: "user", content: userInput }));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      if (input.trim() !== '') {
        handleClickSubmit(textareaRef.current?.value as string);
        handleSubmit(e as any);
      }
    }
  };

  const handleToggleFullScreen = () => {
    dispatch(toggleFullScreen());
  };

  const renderContent = (contentString: string) => {
    try {
      const parsedContent = JSON.parse(contentString);
      if (parsedContent && parsedContent.data && Array.isArray(parsedContent.data)) {
        return parsedContent.data.map((service: any) => (
          <button key={service.id} className="p-[10px] border border-[#D0D0D0] bg-[#E7F8FF] rounded-[10px] cursor-pointer" onClick={(e) => {
            setInput(service.prompt);
            handleSubmit(e as any);
          }}>
            {service.content}
          </button>
        ));
      } else {
        return contentString;
      }
    } catch (error) {
      return contentString;
    }
  }

  return (
    <>
      <div className="p-[20px] flex justify-between items-center border-b-[1px] border-b-[#D0D0D0]">
        <div>
          <h2 className="text-[20px] font-semibold">Text Based ChatBot</h2>
          <p className="text-[14px] font-semibold mt-[5px]">
            {threads.find(thread => thread.id === activeThreadId)?.messages.length} messages
          </p>
        </div>
        <div className="w-[26px] h-[26px] opacity-[0.6] cursor-pointer" onClick={handleToggleFullScreen}>
          {isFullScreen ? (
            <Image src={undoFullScreenImageUrl} alt="Unset to Full Screen" />
          ) : (
            <Image src={fullScreenImageUrl} alt="Set to Full Screen" />
          )}
        </div>
      </div>
      <div className="p-[20px] h-[calc(100%_-_183px)] overflow-y-auto" ref={chatHistoryRef}>
        {threads
          .filter(thread => thread.id === activeThreadId)
          .map((thread) => (
            <>
              {thread.messages.length > 0 && (
                <>
                  {thread.messages.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.role === "user" ? (
                        <div className="chat-history w-fit p-[10px] bg-[#E7F8FF] text-[#303030] rounded-t-[10px] border border-[#D0D0D0] max-w-[600px] mb-[20px] rounded-l-[10px] ms-auto">
                          {item.content.split('\n').map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              {lineIndex > 0 && <br />}
                              {line}
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        <>
                          {renderContent(item.content) ? (
                            <div className="flex max-w-[600px] gap-[10px] mb-[30px]">
                              {renderContent(item.content)}
                            </div>
                          ) : (
                            <div className="chat-history w-fit p-[10px] bg-[#E7F8FF] text-[#303030] rounded-t-[10px] border border-[#D0D0D0] max-w-[600px] mb-[20px] rounded-r-[10px] me-auto">
                              {renderContent(item.content)}
                            </div>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </>
          ))}
      </div>
      <div className="p-[20px] border-t-[1px] border-t-[#D0D0D0] rounded-br-[20px] absolute w-full bottom-0 z-[1]">
        <div className="relative flex">
          <textarea
            rows={1}
            ref={textareaRef}
            value={input}
            onInput={handleOnInput}
            onKeyDown={handleKeyDown}
            placeholder="What services do you provide?"
            onChange={handleInputChange}
            className="w-full max-h-[100px] p-[10px] outline-none rounded-[10px] resize-none border-[1px] border-[#D0D0D0] focus:border-[#999]"
          />
          <div className="absolute w-[36px] h-[36px] cursor-pointer bottom-[5px] right-[10px]">
            <Image src={sendButtonImageUrl} className="opacity-[0.6] focus:opacity-[1]" alt="Send Message" onClick={(e) => {
              handleClickSubmit(textareaRef.current?.value as string);
              handleSubmit(e as any);
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextChat;
