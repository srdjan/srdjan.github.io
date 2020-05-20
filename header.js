let cards = document.querySelectorAll(".card")
  
const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
const h = i => (i * 360) / cards.length
const l = i => 100 - ((i + 1) * 100) / cards.length
const showHeader = (i) => cards.forEach((c, j) => c.style.backgroundColor = hsl(h(i + j / 20), 100, l(j)))
const reset = () => cards.forEach((c, i) => c.style.backgroundColor = hsl(0, 0, l(i)))

showHeader(2.7666)
setTimeout(() => reset(), 1500)
