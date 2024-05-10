import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { AuthType } from '@particle-network/auth-core';
// import { EthereumGoerli } from '@particle-network/chains';
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from '@particle-network/auth-core-modal';
import { appID, clientKey, projectID, serverKey } from './utils/api.js';
import { ToastContainer } from 'react-toastify';
import { store } from './store.js';
import { Provider } from 'react-redux';

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});
const options = {
  projectId: projectID,
  clientKey: clientKey,
  serverKey: serverKey,
  appId: appID,
  authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
  themeType: 'dark',
  fiatCoin: 'USD',
  language: 'en',
  erc4337: {
    name: 'SIMPLE',
    version: '1.0.0',
  },
  promptSettingConfig: {
    promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
    promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
  },
  wallet: {
    visible: true,
    // customStyle: {
    //   supportChains: [EthereumGoerli],
    // },
  },
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthCoreContextProvider options={options}>
        <App />
        <ToastContainer />
      </AuthCoreContextProvider>
    </Provider>
  </React.StrictMode>
);
