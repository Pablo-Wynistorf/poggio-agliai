// =====================
// GALLERY CONFIGURATION
// =====================
const galleryData = [
  {
    title: 'Exterior & Grounds',
    description: 'Stone facades, terracotta roofs, and fragrant gardens that frame every arrival and sunset.',
    images: [
      { file: 'home-foto.jpg', title: 'Golden hour arrival', description: 'Evening light washes over the farmhouse and the rolling vines beyond.', format: 'landscape', fullscreen: true },
      { file: 'house-front-view-01.jpeg', title: 'Front Garden', format: 'portrait' },
      { file: 'house-side-view-02.jpeg', title: 'Terrace', format: 'landscape' },
      { file: 'house-side-view-03.jpeg', title: 'Backyard Garden', format: 'landscape' },
      { file: 'house-side-view-03-portrait.jpeg', title: 'Stone Pathway', format: 'portrait' },
      { file: 'house-side-view-04-portrait.jpeg', title: 'House Arcade', format: 'portrait' },
      { file: 'house-back-view-parking-01.jpeg', title: 'Parking Area', format: 'landscape' },
      { file: 'house-back-view-parking-02-portrait.jpeg', title: 'Small shed', description: 'Guests approach through the estate’s private olive grove.', format: 'portrait' },
      { file: 'entrance-01-portrait.jpeg', title: 'Entrance', format: 'portrait' }
    ]
  },
  {
    title: 'Living Spaces',
    description: 'Layered textures, curated art, and generous seating for conversations that last late into the evening.',
    images: [
      { file: 'first-livingroom-01.jpeg', title: 'Grand salon seating', format: 'landscape', fullscreen: true },
      { file: 'first-livingroom-02.jpeg', title: 'Light-filled gathering room', format: 'landscape' },
      { file: 'first-livingroom-03-portrait.jpeg', title: 'Rear house exit', format: 'portrait' },
      { file: 'first-livingroom-04-portrait.jpeg', title: 'Living room details', format: 'portrait' },
      { file: 'first-livingroom-05.jpeg', title: 'Evening ambience', format: 'landscape' },
      { file: 'second-living-room-03.jpeg', title: 'First floor lounge', format: 'landscape' },
      { file: 'second-living-room-02-portrait.jpeg', title: 'First floor lounge', format: 'portrait' },
      { file: 'second-living-room-03-portrait.jpeg', title: 'First floor lounge', format: 'portrait' },
      { file: 'second-livingroom-01.jpeg', title: 'First floor lounge', format: 'landscape' },
      { file: 'staircase-01.jpeg', title: 'Sweeping staircase', format: 'landscape' }
    ]
  },
  {
    title: 'Chef’s Kitchen & Dining',
    description: 'Bright culinary spaces made for sharing local produce and unforgettable meals.',
    images: [
      { file: 'kitchen-01.jpeg', title: 'Kitchen', format: 'landscape' },
      { file: 'kitchen-02-portrait.jpeg', title: 'Kitchen Oven', format: 'portrait' }
    ]
  },
  {
    title: 'First Suite',
    description: 'A serene ensuite with private outlooks for slow mornings and quiet nights.',
    images: [
      { file: 'first-bedroom-01.jpeg', title: 'Suite with countryside views', format: 'landscape', fullscreen: true },
      { file: 'first-bedroom-02.jpeg', title: 'Soft neutral palette', format: 'landscape' },
      { file: 'first-bedroom-03.jpeg', title: 'Bedside details', format: 'portrait' },
      { file: 'first-bedroom-05.jpeg', title: 'Warm timber wardrobe', format: 'landscape' },
      { file: 'third-bedroom-04.jpeg', title: 'Cozy ambiance', format: 'landscape' }
    ]
  },
  {
    title: 'Second Suite',
    description: 'A spacious retreat with vaulted ceilings and a private terrace overlooking the vineyards.',
    images: [
      { file: 'second-bedroom-01.jpeg', title: 'Vaulted ceilings', format: 'landscape', fullscreen: true },
      { file: 'second-bedroom-02-portrait.jpeg', title: 'Terrace access', format: 'portrait' },
      { file: 'second-bedroom-03-portrait.jpeg', title: 'Natural light', format: 'portrait' }
    ]
  },
  {
    title: 'Third Suite',
    description: 'A charming room with rustic beams and a tranquil garden outlook.',
    images: [
      { file: 'third-bedroom-01.jpeg', title: 'Rustic charm', format: 'landscape', fullscreen: true },
      { file: 'third-bedroom-02.jpeg', title: 'Garden views', format: 'landscape' },
      { file: 'third-bedroom-03.jpeg', title: 'Warm accents', format: 'landscape' }
    ]
  },
  {
    title: 'Fourth Suite',
    description: 'A bright and airy room with traditional Tuscan decor and vineyard views.',
    images: [
      { file: 'fourth-bedroom-01.jpeg', title: 'Vineyard views', format: 'landscape', fullscreen: true },
      { file: 'fourth-bedroom-02.jpeg', title: 'Traditional decor', format: 'landscape' },
      { file: 'fourth-bedroom-03-portrait.jpeg', title: 'Light-filled space', format: 'portrait' },
      { file: 'fourth-bedroom-04-portrait.jpeg', title: 'Comfortable furnishings', format: 'portrait' },
      { file: 'fourth-bedroom-05-portrait.jpeg', title: 'Elegant touches', format: 'portrait' }
    ]
  },
  {
    title: 'Bathrooms',
    description: 'Two bathrooms with modern fixtures and serene views.',
    images: [
      { file: 'first-bathroom-01-portrait.jpeg', title: 'Spa-like atmosphere', format: 'portrait'},
      { file: 'first-bathroom-02-portrait.jpeg', title: 'Elegant vanities', format: 'portrait' },
      { file: 'first-bathroom-03-portrait.jpeg', title: 'Shower', format: 'portrait' },
      { file: 'first-bathroom-04-portrait.jpeg', title: '1 of 2 Toilets', format: 'portrait' }
    ]
  }
]

// =================
// GALLERY RENDERING
// =================
const assetPrefix = document.body?.dataset.assetPrefix ?? '.'
const galleryWrapper = document.getElementById('gallery-wrapper')
const sectionTemplate = document.getElementById('gallery-section-template')
const itemTemplate = document.getElementById('gallery-item-template')
const galleryItemsFlat = []

if (galleryWrapper && sectionTemplate && itemTemplate) {
  galleryData.forEach(group => {
    const sectionClone = sectionTemplate.content.cloneNode(true)
    const heading = sectionClone.querySelector('h3')
    const description = sectionClone.querySelector('p')
    const grid = sectionClone.querySelector('[data-gallery-grid]')

    if (heading) heading.textContent = group.title
    if (description) description.textContent = group.description

    group.images.forEach(image => {
      const itemClone = itemTemplate.content.cloneNode(true)
      const button = itemClone.querySelector('[data-gallery-item]')
      const img = itemClone.querySelector('img')
      const wrapper = itemClone.querySelector('[data-image-wrapper]')
      const titleEl = itemClone.querySelector('[data-item-title]')
      const descriptionEl = itemClone.querySelector('[data-item-description]')

      if (!button || !img || !grid) return

      const itemIndex = galleryItemsFlat.length
      const normalized = normalizeImage(image)
      const src = `${assetPrefix}/images/${normalized.file}`

      const format = normalized.format || inferOrientation(normalized.file)
      const fullscreen = normalized.fullscreen === true

      const itemData = {
        src,
        title: normalized.title ?? createTitle(normalized.file),
        description: normalized.description ?? '',
        format,
        fullscreen
      }

      img.src = src
      img.alt = itemData.title

      wrapper.classList.add('w-full', 'relative')
      if (itemData.format === 'portrait') wrapper.classList.add('aspect-[3/4]')
      else wrapper.classList.add('aspect-[4/3]')
      if (itemData.format === 'landscape') button.classList.add('sm:col-span-2')
      if (itemData.fullscreen) {
        button.classList.add('col-span-full', 'w-full')
        button.style.gridColumn = '1 / -1'
      }

      if (titleEl) titleEl.textContent = itemData.title
      if (descriptionEl) {
        if (itemData.description) descriptionEl.textContent = itemData.description
        else descriptionEl.classList.add('hidden')
      }

      button.dataset.index = String(itemIndex)
      button.addEventListener('click', () => openLightbox(itemIndex))

      galleryItemsFlat.push(itemData)
      grid.appendChild(itemClone)
    })

    galleryWrapper.appendChild(sectionClone)
  })
}

// Helpers
function normalizeImage(image) {
  if (typeof image === 'string') return { file: image }
  return image
}
function createTitle(filename) {
  return filename.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').replace(/\b(\w)/g, m => m.toUpperCase())
}
function inferOrientation(filename) {
  return filename.includes('portrait') ? 'portrait' : 'landscape'
}


// ==============
// LIGHTBOX LOGIC
// ==============
const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
lightboxImage.setAttribute('draggable', 'false') // prevent browser drag behavior

const titleEl = document.getElementById('lightbox-title')
const descriptionEl = document.getElementById('lightbox-description')
const counterEl = document.getElementById('lightbox-counter')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const prevBtnMobile = document.querySelector('[data-lightbox-prev-mobile]')
const nextBtnMobile = document.querySelector('[data-lightbox-next-mobile]')
const closeBtn = document.querySelector('[data-lightbox-close]')
let currentIndex = 0

// zoom + drag state
let zoomActive = false
let isDragging = false
let startX = 0
let startY = 0
let translateX = 0
let translateY = 0
let scale = 1
let transformOrigin = { x: 50, y: 50 }

function openLightbox(index) {
  currentIndex = index
  updateLightbox(galleryItemsFlat[currentIndex])
  lightbox.classList.remove('hidden')
  lightbox.classList.add('flex')
  document.body.classList.add('overflow-hidden')
}

function updateLightbox(item) {
  resetZoom()
  lightboxImage.src = item.src
  lightboxImage.alt = item.title
  titleEl.textContent = item.title
  descriptionEl.textContent = item.description || ''
  counterEl.textContent = `${currentIndex + 1} / ${galleryItemsFlat.length}`

  // consistent navigation buttons
  const navButtons = [prevBtn, nextBtn].filter(Boolean)
  navButtons.forEach(btn => {
    btn.style.position = 'fixed'
    btn.style.top = '50%'
    btn.style.transform = 'translateY(-50%)'
    btn.style.zIndex = '9999'
  })
  if (prevBtn) prevBtn.style.left = '2%'
  if (nextBtn) nextBtn.style.right = '2%'
}

function closeLightbox() {
  resetZoom()
  lightbox.classList.add('hidden')
  lightbox.classList.remove('flex')
  document.body.classList.remove('overflow-hidden')
}

function resetZoom() {
  zoomActive = false
  isDragging = false
  scale = 1
  translateX = 0
  translateY = 0
  lightboxImage.style.transition = 'transform 0.3s ease'
  applyTransform()
  lightboxImage.style.cursor = 'zoom-in'
}

function applyTransform() {
  lightboxImage.style.transformOrigin = `${transformOrigin.x}% ${transformOrigin.y}%`
  lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
}

// ==========================
// CLICK-TO-ZOOM + DRAG LOGIC
// ==========================
lightboxImage.addEventListener('click', e => {
  const rect = lightboxImage.getBoundingClientRect()

  // toggle zoom
  if (!zoomActive) {
    zoomActive = true
    scale = 2
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    transformOrigin = {
      x: (clickX / rect.width) * 100,
      y: (clickY / rect.height) * 100
    }
    lightboxImage.style.transition = 'transform 0.3s ease'
    applyTransform()
    lightboxImage.style.cursor = 'grab'
  } else {
    resetZoom()
  }
})

// Desktop drag
lightboxImage.addEventListener('mousedown', e => {
  if (!zoomActive) return
  isDragging = true
  startX = e.clientX - translateX
  startY = e.clientY - translateY
  lightboxImage.style.transition = 'none'
  lightboxImage.style.cursor = 'grabbing'
})

document.addEventListener('mouseup', () => {
  isDragging = false
  if (zoomActive) lightboxImage.style.cursor = 'grab'
})

document.addEventListener('mousemove', e => {
  if (!zoomActive || !isDragging) return
  translateX = e.clientX - startX
  translateY = e.clientY - startY
  applyTransform()
})

// Mobile touch support
lightboxImage.addEventListener('touchstart', e => {
  if (!zoomActive) return
  const touch = e.touches[0]
  isDragging = true
  startX = touch.clientX - translateX
  startY = touch.clientY - translateY
  lightboxImage.style.transition = 'none'
}, { passive: true })

lightboxImage.addEventListener('touchmove', e => {
  if (!zoomActive || !isDragging) return
  const touch = e.touches[0]
  translateX = touch.clientX - startX
  translateY = touch.clientY - startY
  applyTransform()
}, { passive: true })

lightboxImage.addEventListener('touchend', () => {
  isDragging = false
})

// ==================
// NAVIGATION BUTTONS
// ==================
prevBtn?.addEventListener('click', e => { e.stopPropagation(); show(-1) })
nextBtn?.addEventListener('click', e => { e.stopPropagation(); show(1) })
prevBtnMobile?.addEventListener('click', e => { e.stopPropagation(); show(-1) })
nextBtnMobile?.addEventListener('click', e => { e.stopPropagation(); show(1) })
closeBtn?.addEventListener('click', closeLightbox)
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() })

function show(step) {
  resetZoom()
  currentIndex = (currentIndex + step + galleryItemsFlat.length) % galleryItemsFlat.length
  updateLightbox(galleryItemsFlat[currentIndex])
}

document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('hidden')) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') show(1)
  if (e.key === 'ArrowLeft') show(-1)
})



// ====================
// CONTACT FORM HANDLER
// ====================
const form = document.getElementById('contact-form')
const feedback = document.getElementById('form-feedback')

form?.addEventListener('submit', e => {
  e.preventDefault()
  const fd = new FormData(form)
  const name = fd.get('name')?.toString().trim()
  const email = fd.get('email')?.toString().trim()
  const message = fd.get('message')?.toString().trim()
  if (!name || !email || !message) return setFeedback('Please complete all fields before submitting.', 'error')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFeedback('Please enter a valid email address.', 'error')
  form.reset()
  setFeedback('Thank you! Your message has been sent.', 'success')
})

function setFeedback(msg, type) {
  feedback.textContent = msg
  feedback.className = 'text-sm font-medium'
  feedback.classList.add(type === 'success' ? 'text-brand-200' : 'text-rose-300')
}
