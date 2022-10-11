import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { Settings, Launcher } from '@pages/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div id="map" />
    <RecoilRoot>
      <RecoilNexus />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Launcher />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
