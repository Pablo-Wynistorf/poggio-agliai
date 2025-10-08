// =====================
// GALLERY CONFIGURATION
// =====================
const assetPrefix = './assets'
const galleryWrapper = document.getElementById('gallery-wrapper')
const sectionTemplate = document.getElementById('gallery-section-template')
const itemTemplate = document.getElementById('gallery-item-template')
const galleryItemsFlat = []

// Load gallery data dynamically from /assets/gallery-data.json
fetch(`${assetPrefix}/gallery-data.json`)
  .then(res => {
    if (!res.ok) throw new Error('Failed to load gallery-data.json')
    return res.json()
  })
  .then(galleryData => renderGallery(galleryData))
  .catch(err => console.error('Error loading gallery data:', err))

function renderGallery(galleryData) {
  if (!galleryWrapper || !sectionTemplate || !itemTemplate) return;

  galleryData.forEach(group => {
    const sectionClone = sectionTemplate.content.cloneNode(true);
    const heading = sectionClone.querySelector('h3');
    const description = sectionClone.querySelector('p');
    const grid = sectionClone.querySelector('[data-gallery-grid]');

    if (heading) heading.textContent = group.title;
    if (description) description.textContent = group.description;

    group.images.forEach(image => {
      const normalized = normalizeImage(image);
      const itemIndex = galleryItemsFlat.length;
      const src = `${assetPrefix}/images/${normalized.file}`;
      const format = normalized.format || inferOrientation(normalized.file);
      const fullscreen = normalized.fullscreen === true;

      const itemData = {
        src,
        title: normalized.title ?? createTitle(normalized.file),
        description: normalized.description ?? '',
        format,
        fullscreen
      };

      galleryItemsFlat.push(itemData);

      // Create the gallery item button
      const itemClone = itemTemplate.content.cloneNode(true);
      const button = itemClone.querySelector('[data-gallery-item]');
      const img = itemClone.querySelector('img');
      const wrapper = itemClone.querySelector('[data-image-wrapper]');
      const titleEl = itemClone.querySelector('[data-item-title]');
      const descriptionEl = itemClone.querySelector('[data-item-description]');

      img.src = src;
      img.alt = itemData.title;
      wrapper.classList.add('w-full', 'relative');
      if (itemData.format === 'portrait') wrapper.classList.add('aspect-[3/4]');
      else wrapper.classList.add('aspect-[4/3]');
      if (itemData.format === 'landscape') button.classList.add('sm:col-span-2');
      if (itemData.fullscreen) {
        button.classList.add('col-span-full', 'w-full');
        button.style.gridColumn = '1 / -1';
      }

      if (titleEl) titleEl.textContent = itemData.title;
      if (descriptionEl) {
        if (itemData.description) descriptionEl.textContent = itemData.description;
        else descriptionEl.classList.add('hidden');
      }

      button.dataset.index = String(itemIndex);
      button.addEventListener('click', () => openLightbox(itemIndex));

      // ✅ Handle optional sidebox
      if (normalized.sidebox) {
        const side = normalized.sidebox.side === 'left' ? 'left' : 'right';
        const sideBox = document.createElement('div');
        sideBox.className = `
          flex items-center justify-center p-6 rounded-3xl border border-brand-700/40 bg-brand-800/40 
          text-brand-50 shadow-lg shadow-black/20 sm:col-span-1 aspect-[3/4]
        `;
        sideBox.innerHTML = `
          <div class="text-center sm:text-${side === 'left' ? 'right' : 'left'} space-y-3">
            <h4 class="font-display text-xl font-semibold">${itemData.title}</h4>
            <p class="text-sm text-brand-100/80">${normalized.sidebox.text}</p>
          </div>
        `;

        // Use a 2-column layout with image and box side-by-side
        const container = document.createElement('div');
        container.className = `grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch col-span-full`;
        if (side === 'left') {
          container.appendChild(sideBox);
          container.appendChild(itemClone);
        } else {
          container.appendChild(itemClone);
          container.appendChild(sideBox);
        }
        grid.appendChild(container);
      } else {
        grid.appendChild(itemClone);
      }
    });

    galleryWrapper.appendChild(sectionClone);
  });
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
// CONTACT FORM HANDLER WITH reCAPTCHA
// ====================
const form = document.getElementById('contact-form')
const feedback = document.getElementById('form-feedback')

form?.addEventListener('submit', async e => {
  e.preventDefault()
  const fd = new FormData(form)
  const name = fd.get('name')?.toString().trim()
  const email = fd.get('email')?.toString().trim()
  const message = fd.get('message')?.toString().trim()
  const start = fd.get('start')?.toString().trim()
  const end = fd.get('end')?.toString().trim()

  if (!name || !email || !message || !start || !end)
    return setFeedback('Please complete all fields before submitting.', 'error')

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return setFeedback('Please enter a valid email address.', 'error')

  try {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        '6Ld7AeMrAAAAAOCZNOxMxQEWSLstdO-JaW5ZOrnS',
        { action: 'submit_form' }
      )

      const res = await fetch('https://ucs565k35fstrkdxejprc4uaoa0zaixg.lambda-url.eu-central-1.on.aws', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, start, end, recaptchaToken: token })
      })

      if (res.ok) {
        form.reset()
        setFeedback('Thank you! Your message has been sent.', 'success')
      } else {
        setFeedback('Something went wrong. Please try again later.', 'error')
      }
    })
  } catch (err) {
    console.error('reCAPTCHA error:', err)
    setFeedback('reCAPTCHA validation failed. Please reload and try again.', 'error')
  }
})

function setFeedback(msg, type) {
  feedback.textContent = msg
  feedback.className = 'text-sm font-medium'
  feedback.classList.add(type === 'success' ? 'text-brand-200' : 'text-rose-300')
}

// ====================
// DATEPICKER HANDLING
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const startInput = document.querySelector('#datepicker-range-start')
  const endInput = document.querySelector('#datepicker-range-end')
  const startBox = startInput.closest('div')
  const endBox = endInput.closest('div')

  // clicking anywhere in the box opens the picker
  startBox.addEventListener('click', () => startInput._flatpickr.open())
  endBox.addEventListener('click', () => endInput._flatpickr.open())

  const today = new Date()

  const startPicker = flatpickr(startInput, {
    dateFormat: "d/m/Y",
    minDate: today,
    disableMobile: true,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        const startDate = selectedDates[0]
        // set min end date to +1 day
        endPicker.set('minDate', new Date(startDate.getTime() + 24 * 60 * 60 * 1000))
        // open the end picker immediately
        setTimeout(() => endInput._flatpickr.open(), 100)
      }
    }
  })

  const endPicker = flatpickr(endInput, {
    dateFormat: "d/m/Y",
    disableMobile: true,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0 && startInput.value) {
        const startDate = flatpickr.parseDate(startInput.value, "d/m/Y")
        const endDate = selectedDates[0]
        const nights = (endDate - startDate) / (1000 * 60 * 60 * 24)
        if (nights < 6) {
          showAlert(`Minimum stay is 6 nights (selected: ${nights})`)
          endInput.value = ""
        }
      }
    }
  })

  // bottom-center popup alert
  function showAlert(msg) {
    let alertBox = document.getElementById('alert-box')
    if (!alertBox) {
      alertBox = document.createElement('div')
      alertBox.id = 'alert-box'
      alertBox.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-opacity duration-300 opacity-0 z-50'
      document.body.appendChild(alertBox)
    }
    alertBox.textContent = msg
    alertBox.style.opacity = '1'
    setTimeout(() => (alertBox.style.opacity = '0'), 3500)
  }
})

