const init = function () {
  const cards = document.querySelectorAll('.card')

  const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
  const h = i => (i * 360) / cards.length
  const l = i => 100 - ((i + 1) * 100) / cards.length

  const grey = i => hsl(0, 0, l(i))
  const color = i => hsl(h(i), 100, 50)
  const colorize = (x, y) => {
    x.style.backgroundColor = y
  }

  const makePalette = i =>
    cards.forEach((c, j) => {
      const color = hsl(h(i + j / cards.length), 100, l(j))
      colorize(c, color)
      if (i !== j) c.style.flexGrow = cards.length / Math.abs(i - j)
      else c.style.flexGrow = cards.length / 0.6
    })

  const handleHover = (c, i) => {
    makePalette(i)
    colorize(c, color(i))
  }

  const reset = () =>
    cards.forEach((c, i) => {
      colorize(c, grey(i))
      c.style.flexGrow = 1
    })

  // -- execute 
  reset()
  
  cards.forEach((card, i) =>
    card.addEventListener('mouseover', () => handleHover(card, i))
  )
  document.querySelector('.cards').addEventListener('mouseleave', reset)

  setTimeout(() => {
    let i = random(cards);
    handleHover(cards[i], i * 10)
  }, 300);

  setTimeout(() => {
    reset()
  }, 3000);
}

const random = (cards) => Math.floor(Math.random()*cards.length);