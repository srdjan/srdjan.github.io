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
    const color = i => hsl(h(i), 100, 50)

    
    const makePalette = i =>
      cards.forEach((c, j) => {
        const color = hsl(h(i + j / cards.length), 100, l(j))
        c.style.backgroundColor = color
        if (i !== j) c.style.flexGrow = cards.length / Math.abs(i - j)
        else c.style.flexGrow = cards.length / 0.6
      })

    const handleHover = (c, i) => {
      makePalette(i)
      c.style.backgroundColor = color(i)
    }

    const reset = () =>
      cards.forEach((c, i) => {
        c.style.backgroundColor = grey(i)
        c.style.flexGrow = 1
      })

    // -- execute 
    reset()

    cards.forEach((card, i) => {
      card.addEventListener('mouseover', () => handleHover(card, i))
      card.addEventListener('mouseleave', () => reset())
    })

    setTimeout(() => {
      let i = Math.random() % cards.length
      handleHover(cards[i], i * 10)
    }, 300)

    setTimeout(() => {
      reset()
    }, 1500)

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