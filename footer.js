import { customElement, useRef } from "https://unpkg.com/atomico";
import html from "https://unpkg.com/atomico/html";
 
const styleSheet = `
  footer {
    color: black;
    margin-top: 10vh;
    animation: color-me-in 5s 3;
  }

  @keyframes color-me-in {
    0% {
      color: orange;
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