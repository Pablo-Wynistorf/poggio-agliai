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
      'second-living-room-03.jpeg',
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
    description: 'A serene ensuite with private outlooks for slow mornings and quiet nights.',
    images: ['first-bedroom-01.jpeg', 'first-bedroom-02.jpeg', 'first-bedroom-03.jpeg', 'first-bedroom-04.jpeg', 'first-bedroom-05.jpeg', 'first-bedroom-06.jpeg']
  },
  {
    title: 'Second Suite',
    description: 'Soft hues and artisanal textiles set the tone for restorative rest.',
    images: ['second-bedroom-01.jpeg', 'second-bedroom-01-portrait.jpeg', 'second-bedroom-02-portrait.jpeg', 'second-bedroom-03-portrait.jpeg']
  },
  {
    title: 'Third Suite',
    description: 'Crisp linens, natural light, and restful corners overlooking the countryside.',
    images: ['third-bedroom-01.jpeg', 'third-bedroom-01-portrait.jpeg', 'third-bedroom-02.jpeg', 'third-bedroom-03.jpeg', 'third-bedroom-04.jpeg']
  },
  {
    title: 'Fourth Suite',
    description: 'Contemporary comfort enriched with bespoke details for a peaceful retreat.',
    images: ['fourth-bedroom-01.jpeg', 'fourth-bedroom-02.jpeg', 'fourth-bedroom-03-portrait.jpeg', 'fourth-bedroom-04-portrait.jpeg', 'fourth-bedroom-05-portrait.jpeg']
  },
  {
    title: 'Spa Baths',
    description: 'Stone, light, and warm finishes create tranquil sanctuaries for relaxation.',
    images: ['first-bathroom-01-portrait.jpeg', 'first-bathroom-02-portrait.jpeg', 'first-bathroom-03-portrait.jpeg', 'first-bathroom-04-portrait.jpeg']
  }
]

const imageDescriptions = {
  'home-foto.jpg': 'Sunrise gilds the farmhouse facade before guests wander into the gardens.',
  'house-front-view-01.jpeg': 'The cypress-lined approach welcomes you to Poggio Agliai.',
  'house-side-view-02.jpeg': 'Warm stone walls overlook the private olive groves.',
  'house-outside-entrance-view-01-portrait.jpeg': 'An arched entrance framed by terracotta pots and rosemary.',
  'first-livingroom-02.jpeg': 'Layered textiles soften the beam ceiling in the main living room.',
  'second-livingroom-01.jpeg': 'Afternoon light pours through the windows of the second salon.',
  'kitchen-01.jpeg': 'Handcrafted cabinetry surrounds the chef’s island.',
  'first-bedroom-04.jpeg': 'The first suite’s reading nook looks over the countryside.',
  'second-bedroom-01-portrait.jpeg': 'Muted blues and heirloom furnishings invite restful sleep.',
  'third-bedroom-02.jpeg': 'A serene third suite with bespoke lighting and art.',
  'fourth-bedroom-02.jpeg': 'Picture windows frame the rolling Tuscan hills.',
  'first-bathroom-02-portrait.jpeg': 'Marble finishes and a rainfall shower await in the ensuite.'
}

let assetPrefix = '.'
if (document.body && document.body.dataset && document.body.dataset.assetPrefix) {
  assetPrefix = document.body.dataset.assetPrefix
}

const galleryWrapper = document.getElementById('gallery-wrapper')
const sectionTemplate = document.getElementById('gallery-section-template')
const itemTemplate = document.getElementById('gallery-item-template')

const galleryItemsFlat = []

let animationObserver = null
if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
  animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (animationObserver) {
            animationObserver.unobserve(entry.target)
          }
        }
      })
    },
    { threshold: 0.2 }
  )
}

function registerAnimation(element) {
  if (!element) return
  if (!element.dataset.animate) {
    element.setAttribute('data-animate', '')
  }
  if (animationObserver) {
    animationObserver.observe(element)
  } else {
    element.classList.add('is-visible')
  }
}

if (galleryWrapper && sectionTemplate && itemTemplate) {
  const fallback = galleryWrapper.querySelector('[data-gallery-fallback]')
  if (fallback) {
    fallback.parentNode.removeChild(fallback)
  }
  galleryData.forEach((group) => {
    const sectionClone = sectionTemplate.content.cloneNode(true)
    const sectionRoot = sectionClone.querySelector('section')
    const heading = sectionClone.querySelector('h3')
    const description = sectionClone.querySelector('p')
    const grid = sectionClone.querySelector('[data-gallery-grid]')

    if (heading) heading.textContent = group.title
    if (description) description.textContent = group.description
    group.images.forEach((image) => {
      const itemClone = itemTemplate.content.cloneNode(true)
      const button = itemClone.querySelector('button')
      const img = itemClone.querySelector('img')
      const caption = itemClone.querySelector('[data-caption]')
      const orientationBadge = itemClone.querySelector('[data-orientation-label]')
      const cardDescription = itemClone.querySelector('[data-description]')

      if (!button || !img || !grid || !caption || !orientationBadge || !cardDescription) return

      const itemIndex = galleryItemsFlat.length
      const src = `${assetPrefix}/images/${image}`
      const captionText = createCaption(image)
      const descriptionText = imageDescriptions[image]
      const orientation = image.toLowerCase().includes('portrait') ? 'portrait' : 'landscape'

      img.src = src
      img.alt = captionText

      button.dataset.index = String(itemIndex)
      button.setAttribute('data-orientation', orientation)
      button.addEventListener('click', () => openLightbox(itemIndex))

      orientationBadge.textContent = orientation === 'portrait' ? 'Portrait' : 'Landscape'
      caption.textContent = captionText

      if (descriptionText) {
        cardDescription.textContent = descriptionText
        cardDescription.classList.remove('hidden')
      } else {
        cardDescription.textContent = ''
        cardDescription.classList.add('hidden')
      }

      const itemData = {
        src,
        caption: captionText,
        description: descriptionText,
        orientation
      }

      galleryItemsFlat.push(itemData)
      grid.appendChild(itemClone)
      registerAnimation(button)
    })

    galleryWrapper.appendChild(sectionClone)
    if (sectionRoot) registerAnimation(sectionRoot)
  })
}

function createCaption(filename) {
  return filename
    .replace(/[-_]+/g, ' ')
    .replace(/\.[^.]+$/, '')
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
}

document.querySelectorAll('[data-animate]').forEach((element) => {
  registerAnimation(element)
})

const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
const captionEl = document.getElementById('lightbox-caption')
const descriptionEl = document.getElementById('lightbox-description')
const orientationEl = document.getElementById('lightbox-orientation')
const lightboxPanel = document.querySelector('[data-lightbox-panel]')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const closeBtn = document.querySelector('[data-lightbox-close]')

let currentIndex = 0

function openLightbox(index) {
  if (!lightbox || !galleryItemsFlat.length) return
  currentIndex = index
  updateLightbox(galleryItemsFlat[currentIndex])
  lightbox.classList.remove('hidden')
  lightbox.classList.add('flex')
  lightbox.classList.add('opacity-0')
  requestAnimationFrame(() => {
    lightbox.classList.remove('opacity-0')
    lightbox.classList.add('opacity-100')
  })
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.classList.add('overflow-hidden')
  if (lightboxPanel) {
    lightboxPanel.classList.remove('animate-out')
    lightboxPanel.classList.add('animate-in')
  }
}

function updateLightbox(item) {
  if (!lightboxImage || !captionEl) return
  lightboxImage.src = item.src
  lightboxImage.alt = item.caption
  captionEl.textContent = item.caption
  if (orientationEl) {
    orientationEl.textContent = item.orientation === 'portrait' ? 'Portrait View' : 'Landscape View'
  }
  if (descriptionEl) {
    if (item.description) {
      descriptionEl.textContent = item.description
      descriptionEl.classList.remove('hidden')
    } else {
      descriptionEl.textContent = ''
      descriptionEl.classList.add('hidden')
    }
  }
}

function closeLightbox() {
  if (!lightbox) return
  lightbox.classList.remove('opacity-100')
  lightbox.classList.add('opacity-0')
  if (lightboxPanel) {
    lightboxPanel.classList.remove('animate-in')
    lightboxPanel.classList.add('animate-out')
  }
  const handleTransitionEnd = () => {
    lightbox.classList.add('hidden')
    lightbox.classList.remove('flex')
    lightbox.removeEventListener('transitionend', handleTransitionEnd)
    if (lightboxPanel) {
      lightboxPanel.classList.remove('animate-out')
    }
  }
  lightbox.addEventListener('transitionend', handleTransitionEnd)
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('overflow-hidden')
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeLightbox)
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox()
    }
  })
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (!galleryItemsFlat.length) return
    currentIndex = (currentIndex - 1 + galleryItemsFlat.length) % galleryItemsFlat.length
    updateLightbox(galleryItemsFlat[currentIndex])
  })
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!galleryItemsFlat.length) return
    currentIndex = (currentIndex + 1) % galleryItemsFlat.length
    updateLightbox(galleryItemsFlat[currentIndex])
  })
}

document.addEventListener('keydown', (event) => {
  if (!lightbox || lightbox.classList.contains('hidden')) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    if (nextBtn) {
      nextBtn.click()
    }
  } else if (event.key === 'ArrowLeft') {
    if (prevBtn) {
      prevBtn.click()
    }
  }
})

const form = document.getElementById('contact-form')
const feedback = document.getElementById('form-feedback')

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const rawName = formData.get('name')
    const name = typeof rawName === 'string' ? rawName.trim() : ''

    const rawEmail = formData.get('email')
    const email = typeof rawEmail === 'string' ? rawEmail.trim() : ''

    const rawMessage = formData.get('message')
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : ''

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
}

function setFeedback(message, status) {
  if (!feedback) return

  feedback.textContent = message
  feedback.className = 'text-sm font-medium'

  if (status === 'success') {
    feedback.classList.add('text-brand-200')
  } else if (status === 'error') {
    feedback.classList.add('text-rose-300')
  }
}
