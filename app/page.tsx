'use client'
import React from "react";
import { Provider } from 'react-redux';

import store from './redux/store';
import Main from "./main";

const Home = () => {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default Home;
