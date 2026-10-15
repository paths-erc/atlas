import React from "react";
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../Utils/ScrollToTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "./Header"
import Footer from "./Footer"
import './MainTemplate.css';

export default function MainTemplate() {
  return (
    <div>
      <Header />
      <main role="main" className="maxHeight">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop showUnder={160}>
        <FontAwesomeIcon icon="arrow-circle-up" size="3x" />
      </ScrollToTop>
    </div>
  );
}
