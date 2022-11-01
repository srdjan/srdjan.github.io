const headers = document.querySelectorAll('.head')

const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
const h = i => (i * 360) / headers.length
const l = i => 100 - ((i + 1) * 100) / headers.length

setTimeout(
  headers.forEach(
    (c, j) => (c.style.backgroundColor = hsl(h(3), 70, l(j)))
  ), 3000
)
