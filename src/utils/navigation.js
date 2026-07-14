export function scrollToSection(event, sectionId) {
  event.preventDefault()

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
