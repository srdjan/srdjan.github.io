const headers = document.querySelectorAll('.head');
const length = headers.length;

if (length === 0) {
  console.warn('No header elements found for animation');
}

const hsl = (h, s, l) => `hsl(${h}deg, ${s}%, ${l}%)`;
const h = i => (i * 360) / length;
const l = i => 100 - ((i + 1) * 100) / length;

// Use requestAnimationFrame for better performance
const animateHeaders = () => {
  headers.forEach((element, index) => {
    element.style.backgroundColor = hsl(h(3), 90, l(index));
  });
};

// Delay animation start
setTimeout(() => {
  requestAnimationFrame(animateHeaders);
}, 1250);