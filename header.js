import { customElement, useEffect, useRef } from "https://unpkg.com/atomico";
import html from "https://unpkg.com/atomico/html";
 
const styleSheet = `
    nav {
      display: -webkit-box;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      height: 4vmin;
    }
    .card {
      -webkit-box-flex: 1;
      flex: 1 1 0;
      -webkit-transition: all 400ms ease, background-color 800ms ease;
      transition: all 400ms ease, background-color 800ms ease;
    }
    .card:hover {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }`

function MyHeader() {  
  let ref = useRef()
  
  useEffect(() => { 
    let {current} = ref
    let cards = current.querySelectorAll(".card")
    
    const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
    const h = i => (i * 360) / cards.length
    const l = i => 100 - ((i + 1) * 100) / cards.length
    const grey = i => hsl(0, 0, l(i))
    
    const showHeader = (i) =>
      cards.forEach((c, j) => {
        c.style.backgroundColor = hsl(h(i + j / cards.length), 100, l(j))
        c.style.flexGrow = cards.length / 0.5
      })

    const reset = () =>
      cards.forEach((c, i) => {
        c.style.backgroundColor = grey(i)
        c.style.flexGrow = 1
      })

      cards.forEach((card, i) => {
        card.addEventListener('mouseover', () => showHeader(i))
        card.addEventListener('mouseleave', () => reset())
      })
    
      // -- execute 
    showHeader(Math.random() % cards.length * 12)
    setTimeout(() => reset(), 500)
  }, [])

	return html`
    <host shadowDom>
      <style>${styleSheet}</style>
      <nav ref=${ref}>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
        <div class='card'></div>
      </nav>
    </host>
	`;
}

export default customElement("my-header", MyHeader);