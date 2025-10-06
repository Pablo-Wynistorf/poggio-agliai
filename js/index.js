const galleryData = [
  {
    title: 'Exterior & Grounds',
    description: 'Stone facades, terracotta roofs, and fragrant gardens that frame every arrival and sunset.',
    images: [
      {
        file: 'home-foto.jpg',
        title: 'Golden hour arrival',
        description: 'Evening light washes over the farmhouse and the rolling vines beyond.'
      },
      { file: 'house-front-view-01.jpeg', title: 'Courtyard welcome' },
      {
        file: 'house-side-view-01.jpeg',
        title: 'Cypress-lined terrace',
        description: 'A sunlit terrace framed by cypress trees, perfect for lazy aperitivo hours.'
      },
      { file: 'house-side-view-02.jpeg', title: 'Tuscan farmhouse profile' },
      { file: 'house-side-view-03.jpeg', title: 'Stone walls and olive groves' },
      { file: 'house-side-view-03-portrait.jpeg', title: 'Olive grove pathway' },
      { file: 'house-side-view-04-portrait.jpeg', title: 'Morning light on the pergola' },
      { file: 'house-back-view-parking-01.jpeg', title: 'Drive lined with rosemary' },
      {
        file: 'house-back-view-parking-02-portrait.jpeg',
        title: 'Arrival amongst the olives',
        description: 'Guests approach through the estate’s private olive grove.'
      },
      { file: 'house-back-view-03-portrait.jpeg', title: 'Sunset courtyard silhouette' },
      {
        file: 'house-outside-entrance-view-01-portrait.jpeg',
        title: 'Arched stone entrance',
        description: 'Hand-hewn stonework frames the original entry to the farmhouse.'
      },
      { file: 'entrance-01-portrait.jpeg', title: 'Cotto tiles and antique doors' }
    ]
  },
  {
    title: 'Living Spaces',
    description: 'Layered textures, curated art, and generous seating for conversations that last late into the evening.',
    images: [
      {
        file: 'first-livingroom-01.jpeg',
        title: 'Grand salon seating',
        description: 'Comfortable sofas invite lingering conversations beside curated artworks.'
      },
      { file: 'first-livingroom-02.jpeg', title: 'Light-filled gathering room' },
      { file: 'first-livingroom-03-portrait.jpeg', title: 'Reading corner' },
      { file: 'first-livingroom-04-portrait.jpeg', title: 'Heritage beams' },
      { file: 'first-livingroom-05.jpeg', title: 'Evening ambience' },
      { file: 'second-living-room-03.jpeg', title: 'Intimate lounge' },
      {
        file: 'second-living-room-02-portrait.jpeg',
        title: 'Fireplace focus',
        description: 'The second lounge centres on a sculptural hearth for cosy nights in.'
      },
      { file: 'second-living-room-03-portrait.jpeg', title: 'Artwork and textures' },
      { file: 'second-livingroom-01.jpeg', title: 'Open-plan living' },
      { file: 'staircase-01.jpeg', title: 'Sweeping staircase' }
    ]
  },
  {
    title: 'Chef’s Kitchen & Dining',
    description: 'Bright culinary spaces made for sharing local produce and unforgettable meals.',
    images: [
      {
        file: 'kitchen-01.jpeg',
        title: 'Chef’s kitchen',
        description: 'A generous island and premium appliances make entertaining effortless.'
      },
      { file: 'kitchen-01-portrait.jpeg', title: 'Tuscan pantry details' },
      { file: 'kitchen-02-portrait.jpeg', title: 'Breakfast nook' }
    ]
  },
  {
    title: 'First Suite',
    description: 'A serene ensuite with private outlooks for slow mornings and quiet nights.',
    images: [
      {
        file: 'first-bedroom-01.jpeg',
        title: 'Suite with countryside views',
        description: 'Large windows frame the Val di Cornia beyond crisp linens.'
      },
      { file: 'first-bedroom-02.jpeg', title: 'Soft neutral palette' },
      { file: 'first-bedroom-03.jpeg', title: 'Bedside details' },
      { file: 'first-bedroom-04.jpeg', title: 'Ensuite sitting area' },
      { file: 'first-bedroom-05.jpeg', title: 'Warm timber wardrobe' },
      { file: 'first-bedroom-06.jpeg', title: 'Textured throws and cushions' }
    ]
  },
  {
    title: 'Second Suite',
    description: 'Soft hues and artisanal textiles set the tone for restorative rest.',
    images: [
      { file: 'second-bedroom-01.jpeg', title: 'Second suite overview' },
      {
        file: 'second-bedroom-01-portrait.jpeg',
        title: 'Window seat moments',
        description: 'A cushioned nook perfect for morning espresso and quiet reading.'
      },
      { file: 'second-bedroom-02-portrait.jpeg', title: 'Layered linens' },
      { file: 'second-bedroom-03-portrait.jpeg', title: 'Wardrobe and vanity' }
    ]
  },
  {
    title: 'Third Suite',
    description: 'Crisp linens, natural light, and restful corners overlooking the countryside.',
    images: [
      { file: 'third-bedroom-01.jpeg', title: 'Sun-washed third suite' },
      { file: 'third-bedroom-01-portrait.jpeg', title: 'Textured wall art' },
      {
        file: 'third-bedroom-02.jpeg',
        title: 'Canopy bed retreat',
        description: 'An airy canopy and rattan textures create a calming hideaway.'
      },
      { file: 'third-bedroom-03.jpeg', title: 'Closet and dressing area' },
      { file: 'third-bedroom-04.jpeg', title: 'Quiet reading chair' }
    ]
  },
  {
    title: 'Fourth Suite',
    description: 'Contemporary comfort enriched with bespoke details for a peaceful retreat.',
    images: [
      {
        file: 'fourth-bedroom-01.jpeg',
        title: 'Ground floor bedroom',
        description: 'Earthy textiles and sculptural lighting create a restful atmosphere.'
      },
      { file: 'fourth-bedroom-02.jpeg', title: 'Garden-view windows' },
      { file: 'fourth-bedroom-03-portrait.jpeg', title: 'Bedside pendant lights' },
      { file: 'fourth-bedroom-04-portrait.jpeg', title: 'Layered organic textures' },
      { file: 'fourth-bedroom-05-portrait.jpeg', title: 'Ensuite entry' }
    ]
  },
  {
    title: 'Spa Baths',
    description: 'Stone, light, and warm finishes create tranquil sanctuaries for relaxation.',
    images: [
      { file: 'first-bathroom-01-portrait.jpeg', title: 'Freestanding tub' },
      {
        file: 'first-bathroom-02-portrait.jpeg',
        title: 'Travertine vanities',
        description: 'Natural stone, timber shelving, and brass fixtures elevate each ritual.'
      },
      { file: 'first-bathroom-03-portrait.jpeg', title: 'Rain shower detail' },
      { file: 'first-bathroom-04-portrait.jpeg', title: 'Soft lighting and textures' }
    ]
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
      const button = itemClone.querySelector('[data-gallery-item]')
      const img = itemClone.querySelector('img')
      const wrapper = itemClone.querySelector('[data-image-wrapper]')
      const titleEl = itemClone.querySelector('[data-item-title]')
      const descriptionEl = itemClone.querySelector('[data-item-description]')

      if (!button || !img || !grid) return

      const itemIndex = galleryItemsFlat.length
      const normalizedImage = normalizeImage(image)
      const src = `${assetPrefix}/images/${normalizedImage.file}`

      const itemData = {
        src,
        title: normalizedImage.title ?? createTitle(normalizedImage.file),
        description: normalizedImage.description ?? '',
        orientation: normalizedImage.orientation ?? inferOrientation(normalizedImage.file)
      }

      img.src = src
      img.alt = itemData.title

      if (wrapper) {
        wrapper.classList.add('w-full', 'relative')
        if (itemData.orientation === 'portrait') {
          wrapper.classList.add('aspect-[3/4]')
        } else {
          wrapper.classList.add('aspect-[4/3]')
        }
      }

      if (titleEl) {
        titleEl.textContent = itemData.title
      }

      if (descriptionEl) {
        if (itemData.description) {
          descriptionEl.textContent = itemData.description
        } else {
          descriptionEl.classList.add('hidden')
        }
      }

      button.dataset.index = String(itemIndex)
      button.dataset.orientation = itemData.orientation
      button.setAttribute('aria-label', `Open ${itemData.title}`)
      button.setAttribute('title', itemData.title)
      button.addEventListener('click', () => openLightbox(itemIndex))

      galleryItemsFlat.push(itemData)
      grid.appendChild(itemClone)
    })

    galleryWrapper.appendChild(sectionClone)
  })
}

function normalizeImage(image) {
  if (typeof image === 'string') {
    return { file: image }
  }
  return image
}

function createTitle(filename) {
  return filename
    .replace(/[-_]+/g, ' ')
    .replace(/\.[^.]+$/, '')
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
}

function inferOrientation(filename) {
  return filename.includes('portrait') ? 'portrait' : 'landscape'
}

const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
const titleEl = document.getElementById('lightbox-title')
const descriptionEl = document.getElementById('lightbox-description')
const counterEl = document.getElementById('lightbox-counter')
const viewerEl = document.querySelector('[data-lightbox-viewer]')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const prevBtnMobile = document.querySelector('[data-lightbox-prev-mobile]')
const nextBtnMobile = document.querySelector('[data-lightbox-next-mobile]')
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
  if (!lightboxImage) return

  lightboxImage.src = item.src
  lightboxImage.alt = item.title

  if (titleEl) {
    titleEl.textContent = item.title
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

  if (counterEl) {
    counterEl.textContent = `${currentIndex + 1} / ${galleryItemsFlat.length}`
  }

  if (viewerEl) {
    viewerEl.dataset.orientation = item.orientation
    if (item.orientation === 'portrait') {
      viewerEl.style.maxWidth = 'min(520px, 90vw)'
    } else {
      viewerEl.style.maxWidth = ''
    }
  }

  lightboxImage.classList.remove('w-auto')
  lightboxImage.classList.remove('max-h-[80vh]')
  lightboxImage.classList.remove('max-h-[82vh]')
  lightboxImage.classList.add('w-full')
  lightboxImage.classList.add('max-h-[72vh]')

  if (item.orientation === 'portrait') {
    lightboxImage.classList.remove('w-full')
    lightboxImage.classList.add('w-auto')
    lightboxImage.classList.remove('max-h-[72vh]')
    lightboxImage.classList.add('max-h-[82vh]')
  }
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

const showPrevious = () => {
  currentIndex = (currentIndex - 1 + galleryItemsFlat.length) % galleryItemsFlat.length
  updateLightbox(galleryItemsFlat[currentIndex])
}

const showNext = () => {
  currentIndex = (currentIndex + 1) % galleryItemsFlat.length
  updateLightbox(galleryItemsFlat[currentIndex])
}

prevBtn?.addEventListener('click', showPrevious)
nextBtn?.addEventListener('click', showNext)
prevBtnMobile?.addEventListener('click', showPrevious)
nextBtnMobile?.addEventListener('click', showNext)

document.addEventListener('keydown', (event) => {
  if (!lightbox || lightbox.classList.contains('hidden')) return

  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    showNext()
  } else if (event.key === 'ArrowLeft') {
    showPrevious()
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
