import { customElement, useRef } from "https://unpkg.com/atomico";
import html from "https://unpkg.com/atomico/html";
 
const styleSheet = `
  footer {
    color: black;
    font-size: 1rem;  
    margin-top: 10vh;
    animation: color-me-in 10s 1;
  }

  @keyframes color-me-in {
    0% {
      color: white;
    }
    100% {
      color: black;
    }
  }
}`

function MyFooter() {  
  let ref = useRef()

	return html`
    <host shadowDom>
      <style>${styleSheet}</style>
      <footer ref=${ref}>≈˙∆˙≈</footer>
    </host>
	`;
}

export default customElement("my-footer", MyFooter);