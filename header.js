let cards = document.querySelectorAll(".card")
  
const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
const h = i => (i * 360) / cards.length
const l = i => 100 - ((i + 1) * 100) / cards.length
cards.forEach((c, j) => c.style.backgroundColor = hsl(h(2.86 + j / 20), 100, l(j)))
