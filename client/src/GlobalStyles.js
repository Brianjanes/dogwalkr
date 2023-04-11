import { createGlobalStyle } from "styled-components";

//global reset!

export default createGlobalStyle`
  :root {
    --font-family: 'Roboto', sans-serif;
    --padding-page: 24px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: lightgray;
    border-radius: 25px;
    margin-block: 20px;
  }
  ::-webkit-scrollbar-thumb {
  background-color: #c2c2d6;
  border: 2px solid lightgray;
  border-radius: 20px;    
}
::-webkit-scrollbar-thumb:hover {
  background-color: #9595b7;
}



  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      text-decoration: none;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: #666699;
  }

  button {
    width: 150px;
    height: 40px;
    text-align: center;
    background-color: #7575a3;
    color: white;
    border: none;
    border-radius: 8px;
    
  }
  button:hover {
    background-color: #666699;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  }
  h1,
h2,
h3,
label {

}
p,
a,
li,
blockquote,
input {
 
}

  input {
 
  }
  .scrollhost::-webkit-scrollbar {
  display: none;
}
`;
