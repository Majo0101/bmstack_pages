export function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function scrollToSection(event, sectionId) {
  event.preventDefault()

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: getScrollBehavior(),
    block: 'start',
  })
}
