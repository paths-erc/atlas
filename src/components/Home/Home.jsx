import React from "react";

import imgPathsLogo from './paths-logo.png';

import ReactMarkdownPath from '../ReactMarkdownPath/ReactMarkdownPath';
import intro from './IntroMd.md';
import logo from './LogoMd.md';
import missionstatement from './MissionStatementMd.md';
import lod from './lod.md';
import license from './license.md';

export default function Home(){
   const titles = [
     {
       id    : 'intro',
       title : "Introduction",
       path  : intro
     },
     {
       id    : 'logo',
       title : "Logo",
       path  : logo
     },
     {
       id    : 'missionstatement',
       title : "Mission Statement",
       path  : missionstatement
     },
     {
       id    : 'lod',
       title : "Linked Open Data",
       path  : lod
     },
     {
       id    : 'license',
       title : "Copyright and license",
       path  : license
     }
   ];


   const showContentAndToc = function(){
     return (
       <div>
         <div className="border p-3 d-inline-block bg-light float-right ml-5 mb-5 shadow">
           <h4>Table of contents</h4>
           <ul className="p-0 m-0">
             {titles.map( (k, i) =>{
               return (
                 <li key={i} style={{ listStyle: 'none' }}>
                   <a href={ '#' + k.id }>{ k.title }</a>
                 </li>
               );
             })}
           </ul>
         </div>
         { titles.map( (k, i) =>{
           return (
             <div key={i} className="text-justify">
               <h1 id={ k.id } className="mt-5">{ k.title }</h1>
               <ReactMarkdownPath path={k.path} />
             </div>
           );
         })}
       </div>
     );
   }

   return (
     <div>
       <div className="jumbotron">
         <div className="container text-center">
           <img className="img-fluid shadow-lg" src={ imgPathsLogo } alt="Tracking Papyrus and Parchment Paths. An Archaeological Atlas of Coptic Literature. Literary Texts in their Geographical Context: Production, Copying, Usage, Dissemination and Preservation" />
         </div>
       </div>
       <div className="container">
         <div className="my-5 px-5">
        <div className="border border-danger p-5">
         <h1>Maintainance notice</h1>
         <p>We inform all users of PAThs database and online Atlas that starting 
           from <strong>Friday, April 23<sup>rd</sup> 2021, 14:00</strong>, until <strong>Friday, April 30<sup>th</sup> 2021, 18:00</strong>,
           the <a href="https://garr.it/" target="_blank" rel="">GARR</a> datacenter where PAThs digital resources are hosted will 
           be shut down due to maintenance of the systems in the server room.</p>
           <p>Real time updates are available on <a href="https://twitter.com/hashtag/bdusdown">Twitter #bdusdown</a></p>
           <p>We apologise for the inconvenience.</p>
           <p class="text-right">— PAThs team</p>
          </div>

           { showContentAndToc() }
         </div>
       </div>
     </div>
   );
} // end of function
