// =====================
// GALLERY CONFIGURATION
// =====================
const assetPrefix = './assets'
const galleryWrapper = document.getElementById('gallery-wrapper')
const sectionTemplate = document.getElementById('gallery-section-template')
const itemTemplate = document.getElementById('gallery-item-template')
let galleryItemsFlat = []
let galleryRawData = null

// Resolve i18n: use currentLang translation if available, fall back to default
function i18nText(item, field) {
  if (item.i18n && item.i18n[currentLang] && item.i18n[currentLang][field] !== undefined) {
    return item.i18n[currentLang][field]
  }
  return item[field] ?? ''
}

// Load gallery data dynamically from /assets/gallery-data.json
fetch(`${assetPrefix}/gallery-data.json`)
  .then(res => {
    if (!res.ok) throw new Error('Failed to load gallery-data.json')
    return res.json()
  })
  .then(data => {
    galleryRawData = data
    renderGallery(data)
  })
  .catch(err => console.error('Error loading gallery data:', err))

function renderGallery(galleryData) {
  if (!galleryWrapper || !sectionTemplate || !itemTemplate) return;

  // Clear previous render
  galleryWrapper.innerHTML = ''
  galleryItemsFlat = []

  galleryData.forEach(group => {
    const sectionClone = sectionTemplate.content.cloneNode(true);
    const heading = sectionClone.querySelector('h3');
    const description = sectionClone.querySelector('p');
    const grid = sectionClone.querySelector('[data-gallery-grid]');

    if (heading) heading.textContent = i18nText(group, 'title');
    if (description) description.textContent = i18nText(group, 'description');

    group.images.forEach(image => {
      const normalized = normalizeImage(image);
      const itemIndex = galleryItemsFlat.length;
      const src = `${assetPrefix}/images/${normalized.file}`;
      const format = normalized.format || inferOrientation(normalized.file);
      const fullscreen = normalized.fullscreen === true;

      const itemData = {
        src,
        title: i18nText(normalized, 'title') || '',
        description: i18nText(normalized, 'description'),
        format,
        fullscreen
      };

      galleryItemsFlat.push(itemData);

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

      if (titleEl) {
        if (itemData.title) titleEl.textContent = itemData.title;
        else titleEl.classList.add('hidden');
      }
      if (descriptionEl) {
        if (itemData.description) descriptionEl.textContent = itemData.description;
        else descriptionEl.classList.add('hidden');
      }
      // Hide the overlay card entirely if no title and no description
      if (!itemData.title && !itemData.description) {
        const overlay = button.querySelector('.pointer-events-none');
        if (overlay) overlay.classList.add('hidden');
      }

      button.dataset.index = String(itemIndex);
      button.addEventListener('click', () => openLightbox(itemIndex));

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
lightboxImage.setAttribute('draggable', 'false')

const lbTitleEl = document.getElementById('lightbox-title')
const lbDescriptionEl = document.getElementById('lightbox-description')
const counterEl = document.getElementById('lightbox-counter')
const prevBtn = document.querySelector('[data-lightbox-prev]')
const nextBtn = document.querySelector('[data-lightbox-next]')
const prevBtnMobile = document.querySelector('[data-lightbox-prev-mobile]')
const nextBtnMobile = document.querySelector('[data-lightbox-next-mobile]')
const closeBtn = document.querySelector('[data-lightbox-close]')
let currentIndex = 0

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
  lbTitleEl.textContent = item.title
  lbDescriptionEl.textContent = item.description || ''
  counterEl.textContent = `${currentIndex + 1} / ${galleryItemsFlat.length}`

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

lightboxImage.addEventListener('click', e => {
  const rect = lightboxImage.getBoundingClientRect()
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

lightboxImage.addEventListener('touchend', () => { isDragging = false })

// Navigation buttons
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

// Seasonal rates: CHF per week → per night = weekly / 7
function getNightlyRate(date) {
  const m = date.getMonth() // 0-indexed
  const d = date.getDate()
  if (m >= 0 && m <= 2) return 780 / 7                    // Jan–Mar
  if (m >= 3 && m <= 5) return 880 / 7                    // Apr–Jun
  if (m === 6 || m === 7) return 1100 / 7                 // Jul–Aug
  if (m === 8 && d <= 15) return 880 / 7                  // 1–15 Sep
  if ((m === 8 && d >= 16) || m === 9) return 980 / 7     // 16 Sep–Oct
  return 780 / 7                                           // Nov–Dec
}

function computeBookingPrice(startDate, endDate, guestCount) {
  const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
  if (nights < 7) return null
  const validGuests = (!guestCount || guestCount < 1) ? 1 : Math.min(guestCount, 10)
  let basePrice = 0
  const day = new Date(startDate)
  for (let i = 0; i < nights; i++) {
    basePrice += getNightlyRate(day)
    day.setDate(day.getDate() + 1)
  }
  const linenFee = validGuests * 30                        // 30 CHF per person per stay
  const guestFee = validGuests * (75 / 7) * nights         // 75 CHF per person per week
  const cleaning = 120
  const total = basePrice + linenFee + guestFee + cleaning
  return { nights, basePrice, linenFee, guestFee, cleaning, total, validGuests }
}

form?.addEventListener('submit', async e => {
  e.preventDefault()
  const fd = new FormData(form)
  const name = fd.get('name')?.toString().trim()
  const email = fd.get('email')?.toString().trim()
  const guests = fd.get('guests');
  const message = fd.get('message')?.toString().trim()
  const start = fd.get('start')?.toString().trim()
  const end = fd.get('end')?.toString().trim()

  if (!name || !email || !message || !start || !end)
    return setFeedback(t('formValidation'), 'error')

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return setFeedback(t('formEmailError'), 'error')

  // Calculate price for the inquiry
  const startDate = flatpickr.parseDate(start, 'd/m/Y')
  const endDate = flatpickr.parseDate(end, 'd/m/Y')
  const guestCount = parseInt(guests, 10) || 1
  const pricing = (startDate && endDate) ? computeBookingPrice(startDate, endDate, guestCount) : null
  const priceBreakdown = pricing ? {
    nights: pricing.nights,
    guests: pricing.validGuests,
    basePrice: pricing.basePrice.toFixed(2),
    linenFee: pricing.linenFee.toFixed(2),
    guestFee: pricing.guestFee.toFixed(2),
    cleaning: pricing.cleaning.toFixed(2),
    total: pricing.total.toFixed(2)
  } : null

  try {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        '6Ld7AeMrAAAAAOCZNOxMxQEWSLstdO-JaW5ZOrnS',
        { action: 'submit_form' }
      )

      const res = await fetch('https://ucs565k35fstrkdxejprc4uaoa0zaixg.lambda-url.eu-central-1.on.aws', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, guests, start, end, priceBreakdown, recaptchaToken: token })
      })

      if (res.ok) {
        form.reset()
        window.location.href = '/thank-you.html'
      } else {
        setFeedback(t('formError'), 'error')
      }
    })
  } catch (err) {
    console.error('reCAPTCHA error:', err)
    setFeedback(t('formRecaptchaError'), 'error')
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

  startBox.addEventListener('click', () => startInput._flatpickr.open())
  endBox.addEventListener('click', () => endInput._flatpickr.open())

  const today = new Date()
  const minBookingDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)

  // Load booked dates and configure all pickers once ready
  let bookedRanges = []

  function expandBookedDates(ranges) {
    const dates = []
    ranges.forEach(r => {
      const start = new Date(r.from + 'T00:00:00')
      const end = new Date(r.to + 'T00:00:00')
      const d = new Date(start)
      while (d <= end) {
        dates.push(new Date(d))
        d.setDate(d.getDate() + 1)
      }
    })
    return dates
  }

  function bookedDayCreate(dObj, dStr, fp, dayElem) {
    const dateStr = dayElem.dateObj.toISOString().slice(0, 10)
    const isBooked = bookedRanges.some(r => dateStr >= r.from && dateStr <= r.to)
    if (isBooked) {
      dayElem.classList.add('booked-date')
      dayElem.setAttribute('title', t('bookedTooltip'))
    }
  }

  function initPickers(ranges) {
    bookedRanges = ranges
    const disabledDates = expandBookedDates(ranges)
    const sharedDisable = disabledDates.length > 0 ? disabledDates : []

    const startPicker = flatpickr(startInput, {
    dateFormat: "d/m/Y",
    minDate: minBookingDate,
    disableMobile: true,
    disable: sharedDisable,
    onDayCreate: bookedDayCreate,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        const startDate = selectedDates[0]
        endPicker.set('minDate', new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000))
        setTimeout(() => endInput._flatpickr.open(), 100)
      }
    }
  })

  const endPicker = flatpickr(endInput, {
    dateFormat: "d/m/Y",
    disableMobile: true,
    disable: sharedDisable,
    onDayCreate: bookedDayCreate,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0 && startInput.value) {
        const startDate = flatpickr.parseDate(startInput.value, "d/m/Y")
        const endDate = selectedDates[0]
        const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
        if (nights < 7) {
          showAlert(t('minStayAlert').replace('{n}', nights))
          endInput.value = ""
        }
      }
      updateFormEstimate()
    }
  })

  // Live price estimate in the booking form
  const formEstimate = document.getElementById('form-price-estimate')
  const guestsInput = form?.querySelector('select[name="guests"]')

  function updateFormEstimate() {
    if (!formEstimate || !startInput.value || !endInput.value) {
      if (formEstimate) formEstimate.classList.add('hidden')
      return
    }
    const s = flatpickr.parseDate(startInput.value, 'd/m/Y')
    const e = flatpickr.parseDate(endInput.value, 'd/m/Y')
    const g = parseInt(guestsInput?.value, 10) || 1
    if (!s || !e) { formEstimate.classList.add('hidden'); return }
    const p = computeBookingPrice(s, e, g)
    if (!p) { formEstimate.classList.add('hidden'); return }
    formEstimate.classList.remove('hidden')
    document.getElementById('form-est-nights').textContent = p.nights
    document.getElementById('form-est-base').textContent = 'CHF ' + p.basePrice.toFixed(2)
    document.getElementById('form-est-linen').textContent = p.validGuests + ' × CHF 30.00 = CHF ' + p.linenFee.toFixed(2)
    document.getElementById('form-est-guest').textContent = p.validGuests + ' × CHF ' + (p.guestFee / p.validGuests).toFixed(2) + ' = CHF ' + p.guestFee.toFixed(2)
    document.getElementById('form-est-cleaning').textContent = 'CHF ' + p.cleaning.toFixed(2)
    document.getElementById('form-est-total').textContent = 'CHF ' + p.total.toFixed(2)
  }

  // Also recalculate when start date changes
  startInput.addEventListener('change', () => setTimeout(updateFormEstimate, 150))
  if (guestsInput) guestsInput.addEventListener('change', updateFormEstimate)

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

  // ====================
  // NAV OUTLINE ANIMATION
  // ====================
  const mainNav = document.getElementById('main-nav')
  const navOutline = document.getElementById('nav-outline')
  const navLinks = mainNav.querySelectorAll('.nav-link')
  const sections = ['home', 'about', 'nearby', 'gallery', 'pricing', 'contact']

  function moveOutline(target) {
    if (!target || !navOutline) return
    const navRect = mainNav.getBoundingClientRect()
    const linkRect = target.getBoundingClientRect()
    navOutline.style.left = (linkRect.left - navRect.left - 4) + 'px'
    navOutline.style.top = (linkRect.top - navRect.top - 4) + 'px'
    navOutline.style.width = (linkRect.width + 8) + 'px'
    navOutline.style.height = (linkRect.height + 8) + 'px'
    navOutline.style.opacity = '1'
  }

  function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight / 3
    let activeSection = 'home'
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= scrollY) activeSection = id
    }
    const activeLink = mainNav.querySelector(`[data-nav="${activeSection}"]`)
    if (activeLink) moveOutline(activeLink)
  }

  // Outline only follows scroll position (active section), not hover
  window.addEventListener('scroll', updateActiveNav, { passive: true })
  window.addEventListener('resize', updateActiveNav)

  // ====================
  // PRICING CALCULATOR
  // ====================
  const calcStartInput = document.getElementById('calc-start')
  const calcEndInput = document.getElementById('calc-end')
  const calcGuestsInput = document.getElementById('calc-guests')
  const calcResult = document.getElementById('calc-result')
  const calcError = document.getElementById('calc-error')

  // Seasonal rates: CHF per week → per night = weekly / 7
  // (getNightlyRate and computeBookingPrice are defined globally above)

  function calculatePrice() {
    if (!calcStartInput || !calcEndInput || !calcGuestsInput) return
    const startVal = calcStartInput.value
    const endVal = calcEndInput.value
    const guests = parseInt(calcGuestsInput.value, 10)

    if (!startVal || !endVal) {
      calcResult.classList.add('hidden')
      calcError.classList.add('hidden')
      return
    }

    const startDate = flatpickr.parseDate(startVal, 'd/m/Y')
    const endDate = flatpickr.parseDate(endVal, 'd/m/Y')
    if (!startDate || !endDate || endDate <= startDate) {
      calcResult.classList.add('hidden')
      calcError.classList.add('hidden')
      return
    }

    const pricing = computeBookingPrice(startDate, endDate, guests)
    if (!pricing) {
      calcResult.classList.add('hidden')
      calcError.textContent = t('pricingCalcMinNights')
      calcError.classList.remove('hidden')
      return
    }

    calcError.classList.add('hidden')
    calcResult.classList.remove('hidden')
    document.getElementById('calc-nights').textContent = pricing.nights
    document.getElementById('calc-base').textContent = 'CHF ' + pricing.basePrice.toFixed(2)
    document.getElementById('calc-linen-fee').textContent = pricing.validGuests + ' × CHF 30.00 = CHF ' + pricing.linenFee.toFixed(2)
    document.getElementById('calc-guest-fee').textContent = pricing.validGuests + ' × CHF ' + (pricing.guestFee / pricing.validGuests).toFixed(2) + ' = CHF ' + pricing.guestFee.toFixed(2)
    document.getElementById('calc-cleaning').textContent = 'CHF ' + pricing.cleaning.toFixed(2)
    document.getElementById('calc-total').textContent = 'CHF ' + pricing.total.toFixed(2)
  }

  if (calcStartInput && calcEndInput) {
    const calcStartPicker = flatpickr(calcStartInput, {
      dateFormat: 'd/m/Y',
      minDate: minBookingDate,
      disableMobile: true,
      disable: sharedDisable,
      onDayCreate: bookedDayCreate,
      onChange(selectedDates) {
        if (selectedDates.length > 0) {
          calcEndPicker.set('minDate', new Date(selectedDates[0].getTime() + 7 * 24 * 60 * 60 * 1000))
          setTimeout(() => calcEndInput._flatpickr.open(), 100)
        }
        calculatePrice()
      }
    })
    const calcEndPicker = flatpickr(calcEndInput, {
      dateFormat: 'd/m/Y',
      disableMobile: true,
      disable: sharedDisable,
      onDayCreate: bookedDayCreate,
      onChange() { calculatePrice() }
    })
  }
  if (calcGuestsInput) {
    calcGuestsInput.addEventListener('change', calculatePrice)
  }

  } // end initPickers

  // Load booked dates then initialize all pickers
  fetch(`${assetPrefix}/booked-dates.json`)
    .then(r => r.ok ? r.json() : [])
    .then(data => initPickers(data))
    .catch(() => initPickers([]))

  // ====================
  // INIT TRANSLATIONS
  // ====================
  applyTranslations()
  updateLangSwitcher()
  // Initial outline position
  setTimeout(updateActiveNav, 100)
})
