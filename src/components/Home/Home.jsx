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

           { showContentAndToc() }
         </div>
       </div>
     </div>
   );
} // end of function
