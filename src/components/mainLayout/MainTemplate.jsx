import React from "react";
import ScrollToTop from "react-scroll-up";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "./Header"
import Footer from "./Footer"
import './MainTemplate.css';

export default function MainTemplate (props){
  return (
    <div>
      <Header location={ props.location } />
        <main role="main" className="maxHeight">
          { props.children }
        </main>
      <Footer />
      <ScrollToTop showUnder={160}>
      <FontAwesomeIcon icon="arrow-circle-up" size="3x" />
      </ScrollToTop>
    </div>
  );
}
