const headers = document.querySelectorAll('.head')
const footers = document.querySelectorAll('.foot')
const length = headers.length

const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`
const h = i => (i * 360) / length
const l = i => 100 - ((i + 1) * 100) / length

setTimeout(
  headers.forEach(
    (c, j) => (c.style.backgroundColor = hsl(h(3), 90, l(j)))), 1250
)

setTimeout(
  footers.forEach(
    (c, j) => (c.style.backgroundColor = hsl(h(3), 90, l(length - j)))
  ), 2250
)

// const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))
// if (!isMobile) {
//   console.log('Not mobile device')
// }
// else {
//   target.addEventListener('touchstart', function (e) {
//     const avatar = document.getElementsByClassName('avatar')
//     avatar.backgroundColor = '#ffff'
//     e.preventDefault();
//   })
// }