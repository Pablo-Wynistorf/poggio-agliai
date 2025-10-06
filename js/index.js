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

const assetPrefix = document.body?.dataset.assetPrefix ?? '.'

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

    if (heading) heading.textContent = group.title
    if (description) description.textContent = group.description

    group.images.forEach((image) => {
      const itemClone = itemTemplate.content.cloneNode(true)
      const button = itemClone.querySelector('button')
      const img = itemClone.querySelector('img')

      if (!button || !img || !grid) return

      const itemIndex = galleryItemsFlat.length
      const src = `${assetPrefix}/images/${image}`

      img.src = src
      img.alt = createCaption(image)

      button.dataset.index = String(itemIndex)
      button.addEventListener('click', () => openLightbox(itemIndex))

      const itemData = {
        src,
        caption: createCaption(image)
      }

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
const captionEl = document.getElementById('lightbox-caption')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const closeBtn = document.querySelector('[data-lightbox-close]')

let currentIndex = 0

function openLightbox(index) {
  if (!lightbox) return
  currentIndex = index
  updateLightbox(galleryItemsFlat[currentIndex])
  lightbox.classList.remove('hidden')
  lightbox.classList.add('flex')
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.classList.add('overflow-hidden')
}

function updateLightbox(item) {
  if (!lightboxImage || !captionEl) return
  lightboxImage.src = item.src
  lightboxImage.alt = item.caption
  captionEl.textContent = item.caption
}

function closeLightbox() {
  if (!lightbox) return
  lightbox.classList.add('hidden')
  lightbox.classList.remove('flex')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('overflow-hidden')
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
  if (!lightbox || lightbox.classList.contains('hidden')) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextBtn?.click()
  } else if (event.key === 'ArrowLeft') {
    prevBtn?.click()
  }
})

const menuLinks = document.querySelectorAll('[data-menu-link]')


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
  feedback.className = 'text-sm font-medium'

  if (status === 'success') {
    feedback.classList.add('text-brand-200')
  } else if (status === 'error') {
    feedback.classList.add('text-rose-300')
  }
}
