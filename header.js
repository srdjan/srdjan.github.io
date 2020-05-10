const init = function () {
  let cards = document.querySelectorAll(".card")
    
  const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
  const h = i => (i * 360) / cards.length
  const l = i => 100 - ((i + 1) * 100) / cards.length
  
  const showHeader = (i) =>
    cards.forEach((c, j) => {
      c.style.backgroundColor = hsl(h(i + j / cards.length), 100, l(j))
      c.style.flexGrow = cards.length / i===j ? 0.7 : 0.3
    })

  const reset = () =>
    cards.forEach((c, i) => {
      c.style.backgroundColor = hsl(0, 0, l(i))
      c.style.flexGrow = 1
    })

  cards.forEach((card, i) => {
    card.addEventListener('mouseover', () => showHeader(i))
    card.addEventListener('mouseleave', () => reset())
  })
  
  // execute onload: show & and hide the header
  showHeader(Math.random() % cards.length * 12)
  setTimeout(() => reset(), 1500)
}  

init()
