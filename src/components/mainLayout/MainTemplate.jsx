import React from "react";
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
    </div>
  );
}
