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
import { appID, clientKey, projectID } from './utils/api.js';

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        projectId: projectID,
        clientKey: clientKey,
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
      }}>
      <App />
    </AuthCoreContextProvider>
  </React.StrictMode>
);
