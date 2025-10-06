const galleryData = [
  {
    title: 'Exterior & Grounds',
    description: 'Stone facades, terracotta roofs, and fragrant gardens that frame every arrival and sunset.',
    images: [
      'home-foto.jpg',
      'house-front-view-01.jpeg',
      'house-side-view-01.jpeg',
      'house-side-view-02.jpeg',
      'house-side-view-03.jpeg',
      'house-side-view-03-portrait.jpeg',
      'house-side-view-04-portrait.jpeg',
      'house-back-view-parking-01.jpeg',
      'house-back-view-parking-02-portrait.jpeg',
      'house-back-view-03-portrait.jpeg',
      'house-outside-entrance-view-01-portrait.jpeg',
      'entrance-01-portrait.jpeg'
    ]
  },
  {
    title: 'Living Spaces',
    description: 'Layered textures, curated art, and generous seating for conversations that last late into the evening.',
    images: [
      'first-livingroom-01.jpeg',
      'first-livingroom-02.jpeg',
      'first-livingroom-03-portrait.jpeg',
      'first-livingroom-04-portrait.jpeg',
      'first-livingroom-05.jpeg',
      'second-livingroom-03.jpeg',
      'second-living-room-02-portrait.jpeg',
      'second-living-room-03-portrait.jpeg',
      'second-livingroom-01.jpeg',
      'staircase-01.jpeg'
    ]
  },
  {
    title: 'Chef’s Kitchen & Dining',
    description: 'Bright culinary spaces made for sharing local produce and unforgettable meals.',
    images: ['kitchen-01.jpeg', 'kitchen-01-portrait.jpeg', 'kitchen-02-portrait.jpeg']
  },
  {
    title: 'First Suite',
    description: 'A serene ensuite with private outlooks and an immersive 360° view.',
    images: [
      'first-bedroom-01.jpeg',
      'first-bedroom-02.jpeg',
      'first-bedroom-03.jpeg',
      'first-bedroom-04.jpeg',
      'first-bedroom-05.jpeg',
      'first-bedroom-06.jpeg',
      'first-bedrom-360.jpg'
    ]
  },
  {
    title: 'Second Suite',
    description: 'Soft hues, artisanal textiles, and a panoramic tour at your fingertips.',
    images: [
      'second-bedroom-01.jpeg',
      'second-bedroom-01-portrait.jpeg',
      'second-bedroom-02-portrait.jpeg',
      'second-bedroom-03-portrait.jpeg',
      'second-bedrom-360.jpg'
    ]
  },
  {
    title: 'Third Suite',
    description: 'Crisp linens, natural light, and restful corners overlooking the countryside.',
    images: [
      'third-bedroom-01.jpeg',
      'third-bedroom-01-portrait.jpeg',
      'third-bedroom-02.jpeg',
      'third-bedroom-03.jpeg',
      'third-bedroom-04.jpeg'
    ]
  },
  {
    title: 'Fourth Suite',
    description: 'Contemporary comfort enriched with bespoke details for a peaceful retreat.',
    images: [
      'fourth-bedroom-01.jpeg',
      'fourth-bedroom-02.jpeg',
      'fourth-bedroom-03-portrait.jpeg',
      'fourth-bedroom-04-portrait.jpeg',
      'fourth-bedroom-05-portrait.jpeg'
    ]
  },
  {
    title: 'Spa Baths',
    description: 'Stone, light, and warm finishes create tranquil sanctuaries for relaxation.',
    images: [
      'first-bathroom-01-portrait.jpeg',
      'first-bathroom-02-portrait.jpeg',
      'first-bathroom-03-portrait.jpeg',
      'first-bathroom-04-portrait.jpeg'
    ]
  }
]

const panoramaImages = new Set(['first-bedrom-360.jpg', 'second-bedrom-360.jpg'])

const galleryWrapper = document.getElementById('gallery-wrapper')
const sectionTemplate = document.getElementById('gallery-section-template')
const itemTemplate = document.getElementById('gallery-item-template')

const galleryItemsFlat = []

if (galleryWrapper && sectionTemplate && itemTemplate) {
  galleryData.forEach((group) => {
    const sectionClone = sectionTemplate.content.cloneNode(true)
    const heading = sectionClone.querySelector('h3')
    const description = sectionClone.querySelector('p')
    const grid = sectionClone.querySelector('[data-gallery-grid]')

    heading.textContent = group.title
    description.textContent = group.description

    group.images.forEach((image) => {
      const itemClone = itemTemplate.content.cloneNode(true)
      const button = itemClone.querySelector('button')
      const img = itemClone.querySelector('img')
      const icon = itemClone.querySelector('[data-360-icon]')

      const isPortrait = image.includes('-portrait')
      const isPanorama = panoramaImages.has(image)
      const itemIndex = galleryItemsFlat.length

      if (isPortrait) {
        button.classList.add('is-portrait')
      } else {
        button.classList.add('is-landscape')
      }

      img.src = `images/${image}`
      img.alt = createCaption(image)

      if (isPanorama) {
        icon.removeAttribute('hidden')
      } else {
        icon.setAttribute('hidden', '')
      }

      const itemData = {
        src: `images/${image}`,
        caption: createCaption(image),
        type: isPanorama ? 'panorama' : 'image'
      }

      button.dataset.index = String(itemIndex)
      button.addEventListener('click', () => openLightbox(itemIndex))

      galleryItemsFlat.push(itemData)
      grid.appendChild(itemClone)
    })

    galleryWrapper.appendChild(sectionClone)
  })
}

function createCaption(filename) {
  return filename
    .replace(/[-_]+/g, ' ')
    .replace(/\.[^.]+$/, '')
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
}

const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
const panoramaViewer = document.getElementById('panorama-viewer')
const panoramaSurface = panoramaViewer?.querySelector('[data-panorama-surface]')
const captionEl = document.getElementById('lightbox-caption')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const closeBtn = document.querySelector('[data-lightbox-close]')

let currentIndex = 0
let panoramaState = { x: 50, y: 50, zoom: 100, isDragging: false, startX: 0, startY: 0 }

function openLightbox(index) {
  if (!lightbox) return
  currentIndex = index
  updateLightbox(galleryItemsFlat[currentIndex])
  lightbox.classList.add('is-active')
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.classList.add('is-locked')
}

function updateLightbox(item) {
  if (!lightbox || !captionEl) return

  captionEl.textContent = item.caption

  if (item.type === 'panorama' && panoramaViewer && panoramaSurface) {
    lightboxImage?.classList.remove('is-visible')
    panoramaViewer.classList.add('is-visible')
    panoramaSurface.style.backgroundImage = `url(${item.src})`
    panoramaState = { x: 50, y: 50, zoom: 110, isDragging: false, startX: 0, startY: 0 }
    updatePanoramaTransform()
  } else if (lightboxImage) {
    panoramaViewer?.classList.remove('is-visible')
    lightboxImage.classList.add('is-visible')
    lightboxImage.src = item.src
    lightboxImage.alt = item.caption
  }
}

function closeLightbox() {
  if (!lightbox) return
  lightbox.classList.remove('is-active')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('is-locked')
}

closeBtn?.addEventListener('click', closeLightbox)

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox()
  }
})

prevBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItemsFlat.length) % galleryItemsFlat.length
  updateLightbox(galleryItemsFlat[currentIndex])
})

nextBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItemsFlat.length
  updateLightbox(galleryItemsFlat[currentIndex])
})

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('is-active')) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextBtn?.click()
  } else if (event.key === 'ArrowLeft') {
    prevBtn?.click()
  }
})

function updatePanoramaTransform() {
  if (!panoramaSurface) return
  panoramaSurface.style.backgroundPosition = `${panoramaState.x}% ${panoramaState.y}%`
  panoramaSurface.style.backgroundSize = `${panoramaState.zoom}% auto`
}

panoramaViewer?.addEventListener('pointerdown', (event) => {
  panoramaState.isDragging = true
  panoramaState.startX = event.clientX
  panoramaState.startY = event.clientY
  panoramaViewer.setPointerCapture(event.pointerId)
  panoramaViewer.classList.add('panorama--dragging')
})

panoramaViewer?.addEventListener('pointermove', (event) => {
  if (!panoramaState.isDragging) return

  const deltaX = event.clientX - panoramaState.startX
  const deltaY = event.clientY - panoramaState.startY

  panoramaState.startX = event.clientX
  panoramaState.startY = event.clientY

  panoramaState.x = (panoramaState.x - deltaX * 0.2 + 100) % 100
  panoramaState.y = Math.min(80, Math.max(20, panoramaState.y - deltaY * 0.2))
  updatePanoramaTransform()
})

function endPanoramaDrag(event) {
  panoramaState.isDragging = false
  panoramaViewer?.releasePointerCapture(event.pointerId)
  panoramaViewer?.classList.remove('panorama--dragging')
}

panoramaViewer?.addEventListener('pointerup', endPanoramaDrag)
panoramaViewer?.addEventListener('pointercancel', endPanoramaDrag)

panoramaViewer?.addEventListener('wheel', (event) => {
  event.preventDefault()
  const delta = Math.sign(event.deltaY)
  panoramaState.zoom = Math.min(180, Math.max(80, panoramaState.zoom - delta * 5))
  updatePanoramaTransform()
})

const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileMenu = document.querySelector('[data-mobile-menu]')
const menuLinks = document.querySelectorAll('[data-menu-link]')

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open')
    menuToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu || !menuToggle) return
    mobileMenu.classList.remove('is-open')
    menuToggle.setAttribute('aria-expanded', 'false')
  })
})

const form = document.getElementById('contact-form')
const feedback = document.getElementById('form-feedback')

form?.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(form)
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    setFeedback('Please complete all fields before submitting.', 'error')
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    setFeedback('Please enter a valid email address.', 'error')
    return
  }

  form.reset()
  setFeedback('Thank you! Your message has been sent. We will be in touch shortly.', 'success')
})

function setFeedback(message, status) {
  if (!feedback) return
  feedback.textContent = message
  feedback.classList.remove('form__feedback--success', 'form__feedback--error')

  if (status === 'success') {
    feedback.classList.add('form__feedback--success')
  } else if (status === 'error') {
    feedback.classList.add('form__feedback--error')
  }
}
