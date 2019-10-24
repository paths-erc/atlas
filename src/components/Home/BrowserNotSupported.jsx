import React from "react";

import imgPathsLogo from './paths-logo.png';

export default function BrowserNotSupported(props) {

  const compatibility = props.compatibility;
  const browser       = props.browser;


  return (
    <div className="container text-center">
      <div className="my-5 py-5">
        <h1>Sorry, it seems that your browser is not supported!</h1>
        <p>You are running <code>{ browser.name }</code>, version <code>{ browser.version }</code> on <code>{ browser.os }</code>.</p>
        <p>Please upgrade your browser or use a modern one to work with PAThs Atlas.</p>

        <div>
          <h4>Compatibility list</h4>
          <pre>
          {
            Object.keys(compatibility).map((i, k)=>{
              return (
                <div key={k}>
                  {
                    (compatibility[i] !== 10000 ? i + ' >= ' + compatibility[i] : '' )
                  }
              </div>
              );
            })
          }
          </pre>
        </div>

        <div className="border-top pt-5 mt-5">
          <img className="img-fluid shadow-lg" src={ imgPathsLogo } alt="Tracking Papyrus and Parchment Paths. An Archaeological Atlas of Coptic Literature. Literary Texts in their Geographical Context: Production, Copying, Usage, Dissemination and Preservation" />
        </div>
      </div>

    </div>
  );
}
