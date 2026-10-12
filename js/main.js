// DishSushi — Pure JavaScript DOM Renderer & Interactive Controller

let cart = [];
let currentCategory = "Specialties";
let currentEventType = "private";

document.addEventListener("DOMContentLoaded", () => {
  initDishSushiApp();
});

function initDishSushiApp() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = "";

  // 1. Render all major UI sections via JS DOM manipulation
  root.appendChild(renderNavbar());
  root.appendChild(renderHero());
  root.appendChild(renderSpecials());
  root.appendChild(renderInteriorBanner());
  root.appendChild(renderSpecialtiesSection());
  root.appendChild(renderDiningEventsSection());
  root.appendChild(renderFeaturedDish());
  root.appendChild(renderStorySection());
  root.appendChild(renderReservationBanner());
  root.appendChild(renderFooter());

  // 2. Overlays: Reservation Modal, Cart Drawer & Toast Notifications
  root.appendChild(renderReservationModal());
  root.appendChild(renderCartDrawer());
  root.appendChild(renderToast());

  // 3. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 4. Attach Global Scroll & UI Events
  setupGlobalEvents();
}


// DOM BUILDER FUNCTIONS


//1. NAVBAR COMPONENT
function renderNavbar() {
  const header = document.createElement("header");
  header.id = "navbar";
  header.className =
    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5";

  const container = document.createElement("div");
  container.className =
    "max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between";

  // Brand Logo (Circular Gold Emblem)
  const logo = document.createElement("a");
  logo.href = "#hero";
  logo.className = "flex items-center gap-3 group";
  logo.innerHTML = `
    <div class="w-10 h-10 rounded-full border-2 border-gold-500/80 bg-gradient-to-tr from-gold-600/30 to-amber-400/10 flex items-center justify-center text-gold-400 font-serif font-bold text-sm shadow-md group-hover:scale-105 group-hover:border-gold-400 transition-all">
      <span class="tracking-tighter">鮨</span>
    </div>
    <div class="flex flex-col">
      <span class="text-lg font-serif font-bold tracking-widest text-white group-hover:text-gold-400 transition-colors uppercase">
        Dish<span class="text-gold-500">Sushi</span>
      </span>
      <span class="text-[9px] uppercase tracking-[0.2em] text-gold-500/70 -mt-1 font-sans">Japanese Cuisine</span>
    </div>
  `;

  // Navigation Links
  const nav = document.createElement("nav");
  nav.className =
    "hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-gray-300";
  sushiData.navigation.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.className = "nav-link hover:text-gold-400 transition-colors py-1";
    link.textContent = item.label;
    nav.appendChild(link);
  });

  // Action Buttons (Cart Trigger + Book a Table)
  const actions = document.createElement("div");
  actions.className = "flex items-center gap-3.5";

  // Cart Button
  const cartBtn = document.createElement("button");
  cartBtn.id = "cart-toggle-btn";
  cartBtn.className =
    "relative p-2.5 rounded-full border border-white/10 hover:border-gold-500/60 bg-white/5 text-gray-300 hover:text-gold-400 transition-all";
  cartBtn.innerHTML = `
    <i data-lucide="shopping-bag" class="w-4 h-4"></i>
    <span id="cart-badge" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-black font-bold text-[10px] flex items-center justify-center hidden">0</span>
  `;
  cartBtn.onclick = () => toggleCartDrawer(true);

  // Book a Table Button
  const bookBtn = document.createElement("button");
  bookBtn.className =
    "hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full btn-gold-outline text-xs uppercase tracking-wider font-semibold";
  bookBtn.textContent = "BOOK A TABLE";
  bookBtn.onclick = () => openReservationModal();

  // Mobile Menu Toggle
  const mobileToggle = document.createElement("button");
  mobileToggle.id = "mobile-menu-btn";
  mobileToggle.className =
    "md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-gold-400";
  mobileToggle.innerHTML = `<i data-lucide="menu" class="w-5 h-5"></i>`;
  mobileToggle.onclick = () => {
    const mMenu = document.getElementById("mobile-menu");
    if (mMenu) mMenu.classList.toggle("hidden");
  };

  actions.appendChild(cartBtn);
  actions.appendChild(bookBtn);
  actions.appendChild(mobileToggle);

  container.appendChild(logo);
  container.appendChild(nav);
  container.appendChild(actions);
  header.appendChild(container);

  // Mobile Drawer
  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobile-menu";
  mobileMenu.className =
    "hidden md:hidden border-b border-white/10 bg-[#0a0a0a]/98 backdrop-blur-2xl px-6 py-6 transition-all";

  const mobileLinks = document.createElement("div");
  mobileLinks.className =
    "flex flex-col gap-4 text-sm uppercase tracking-widest font-medium";
  sushiData.navigation.forEach((item) => {
    const mLink = document.createElement("a");
    mLink.href = item.href;
    mLink.className =
      "text-gray-300 hover:text-gold-400 py-1.5 border-b border-white/5";
    mLink.textContent = item.label;
    mLink.onclick = () => mobileMenu.classList.add("hidden");
    mobileLinks.appendChild(mLink);
  });

  const mobileBookBtn = document.createElement("button");
  mobileBookBtn.className =
    "w-full mt-3 py-3 rounded-full btn-gold-solid text-xs uppercase tracking-widest font-bold";
  mobileBookBtn.textContent = "RESERVE A TABLE";
  mobileBookBtn.onclick = () => {
    mobileMenu.classList.add("hidden");
    openReservationModal();
  };
  mobileLinks.appendChild(mobileBookBtn);
  mobileMenu.appendChild(mobileLinks);
  header.appendChild(mobileMenu);

  return header;
}

//2. HERO COMPONENT
function renderHero() {
  const hero = sushiData.hero;
  const section = document.createElement("section");
  section.id = "hero";
  section.className =
    "relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden text-center";

  section.innerHTML = `
    <!-- Background Image with Dark Vignette Gradient -->
    <div class="absolute inset-0 -z-10">
      <img src="${hero.bgImage}" alt="DishSushi Atmosphere" class="w-full h-full object-cover object-center filter brightness-[0.28] contrast-110 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-[#0a0a0a]/80"></div>
    </div>

    <div class="max-w-4xl mx-auto px-6 space-y-6">
      <!-- Cursive Script Subtitle -->
      <p class="font-cursive text-3xl sm:text-4xl lg:text-5xl text-gold-400 tracking-wide">
        ${hero.scriptSubtitle}
      </p>

      <!-- Main Headline (Gold Serif) -->
      <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-white leading-[1.2] uppercase gold-text-gradient">
        ${hero.headline}
      </h1>

      <!-- Description Paragraph -->
      <p class="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
        ${hero.description}
      </p>

      <!-- CTA Button -->
      <div class="pt-4">
        <button onclick="openReservationModal()" class="px-8 py-3.5 rounded-full btn-gold-solid text-xs uppercase tracking-[0.2em] font-bold shadow-gold-glow">
          ${hero.ctaText}
        </button>
      </div>
    </div>
  `;

  return section;
}

//3. TODAY'S SPECIAL COMPONENT
function renderSpecials() {
  const specials = sushiData.specials;
  const section = document.createElement("section");
  section.id = "specials";
  section.className = "py-24 bg-[#0a0a0a] relative z-10";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-6 lg:px-12 text-center";

  container.innerHTML = `
    <div class="space-y-3 mb-16 max-w-2xl mx-auto">
      <p class="font-cursive text-3xl text-gold-400">${specials.scriptSubtitle}</p>
      <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase">${specials.headline}</h2>
      <div class="w-12 h-[1px] bg-gold-500 mx-auto my-3"></div>
      <p class="text-xs sm:text-sm text-gray-400 font-light">${specials.tagline}</p>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-3 gap-8";

  specials.items.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group";

    // 5 Gold Stars string
    const starsHtml = Array(item.rating)
      .fill(
        '<i data-lucide="star" class="w-3.5 h-3.5 fill-gold-400 text-gold-400 inline"></i>',
      )
      .join(" ");

    card.innerHTML = `
      <div>
        <div class="relative aspect-[4/3] overflow-hidden bg-black">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100" />
          <div class="absolute top-3 right-3 bg-[#0a0a0a]/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 text-gold-400 text-xs font-serif font-bold">
            $${item.price}
          </div>
        </div>

        <div class="p-6 text-left space-y-2.5">
          <h3 class="font-serif text-lg font-bold tracking-wide text-white group-hover:text-gold-400 transition-colors uppercase">
            ${item.title}
          </h3>
          <p class="text-xs text-gray-400 font-light leading-relaxed">
            ${item.description}
          </p>
          <div class="flex items-center gap-1 pt-1">
            ${starsHtml}
          </div>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2 text-left">
        <button onclick="addToCart('${item.id}', '${item.title}', ${item.price}, '${item.image}')" class="w-full py-2.5 rounded-lg border border-gold-500/40 hover:border-gold-500 hover:bg-gold-500 hover:text-black text-gold-400 text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2">
          <span>Order Now</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

//4. PANORAMIC RESTAURANT INTERIOR BANNER
function renderInteriorBanner() {
  const section = document.createElement("div");
  section.className =
    "w-full h-72 sm:h-96 md:h-[450px] relative overflow-hidden my-6";

  section.innerHTML = `
    <img src="${sushiData.interiorBanner.image}" alt="${sushiData.interiorBanner.alt}" class="w-full h-full object-cover filter brightness-[0.75] contrast-105" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
  `;

  return section;
}

//5. OUR SPECIALTIES / INTERACTIVE MENU SECTION

function renderSpecialtiesSection() {
  const specialties = sushiData.specialties;
  const section = document.createElement("section");
  section.id = "specialties";
  section.className = "py-24 bg-[#0a0a0a] relative z-10";

  const container = document.createElement("div");
  container.className = "max-w-6xl mx-auto px-6 lg:px-12 text-center";

  container.innerHTML = `
    <div class="space-y-3 mb-12 max-w-2xl mx-auto">
      <p class="font-cursive text-3xl text-gold-400">${specialties.scriptSubtitle}</p>
      <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase">${specialties.headline}</h2>
      <div class="w-12 h-[1px] bg-gold-500 mx-auto my-3"></div>
      <p class="text-xs sm:text-sm text-gray-400 font-light">${specialties.tagline}</p>
    </div>
  `;

  // Category Filter Tabs
  const tabsContainer = document.createElement("div");
  tabsContainer.className =
    "flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-16";

  specialties.categories.forEach((cat) => {
    const tabBtn = document.createElement("button");
    tabBtn.className = `menu-tab-btn px-4 py-2 rounded-full text-xs uppercase tracking-wider ${cat === currentCategory ? "active-tab" : ""}`;
    tabBtn.textContent = cat;
    tabBtn.onclick = () => {
      currentCategory = cat;
      document
        .querySelectorAll(".menu-tab-btn")
        .forEach((btn) => btn.classList.remove("active-tab"));
      tabBtn.classList.add("active-tab");
      updateSpecialtiesList();
    };
    tabsContainer.appendChild(tabBtn);
  });

  container.appendChild(tabsContainer);

  // Items List Container
  const itemsContainer = document.createElement("div");
  itemsContainer.id = "specialties-items-list";
  itemsContainer.className = "space-y-12 sm:space-y-16";
  container.appendChild(itemsContainer);

  section.appendChild(container);
  return section;
}

function updateSpecialtiesList() {
  const container = document.getElementById("specialties-items-list");
  if (!container) return;

  container.innerHTML = "";
  const items =
    sushiData.specialties.items[currentCategory] ||
    sushiData.specialties.items["Specialties"];

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className =
      "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center text-left bg-[#121212] p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-300";

    const isImageRight = item.layout === "image-right" || index % 2 === 1;

    const imageCol = `
      <div class="aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-black relative group ${isImageRight ? "md:order-2" : "md:order-1"}">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100" />
      </div>
    `;

    const textCol = `
      <div class="space-y-4 ${isImageRight ? "md:order-1" : "md:order-2"}">
        <div class="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
          <h3 class="font-serif text-2xl font-bold tracking-wide text-white uppercase">${item.title}</h3>
          <span class="font-serif text-2xl font-bold text-gold-400">$${item.price}</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
          <span class="text-gray-300 font-medium">Ingredients:</span> ${item.ingredients}
        </p>
        <div class="pt-2">
          <button onclick="addToCart('${item.id}', '${item.title}', ${item.price}, '${item.image}')" class="px-6 py-2.5 rounded-lg btn-gold-outline text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2">
            <span>Order Dish</span>
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;

    row.innerHTML = isImageRight ? textCol + imageCol : imageCol + textCol;
    container.appendChild(row);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 6. DINING EVENTS / VIP PACKAGES SECTION
function renderDiningEventsSection() {
  const events = sushiData.diningEvents;
  const section = document.createElement("section");
  section.id = "events";
  section.className =
    "py-24 bg-[#0a0a0a] relative z-10 border-t border-white/5";

  const container = document.createElement("div");
  container.className = "max-w-6xl mx-auto px-6 lg:px-12 text-center";

  container.innerHTML = `
    <div class="space-y-3 mb-12 max-w-2xl mx-auto">
      <p class="font-cursive text-3xl text-gold-400">${events.scriptSubtitle}</p>
      <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase">${events.headline}</h2>
      <div class="w-12 h-[1px] bg-gold-500 mx-auto my-3"></div>
      <p class="text-xs sm:text-sm text-gray-400 font-light">${events.tagline}</p>
    </div>
  `;

  // Event Category Switcher
  const toggleWrapper = document.createElement("div");
  toggleWrapper.className =
    "inline-flex p-1 rounded-full bg-white/5 border border-white/10 mb-16";

  events.eventTypes.forEach((type) => {
    const btn = document.createElement("button");
    btn.className = `event-tab-btn px-6 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${type.id === currentEventType ? "active-tab" : "text-gray-400 hover:text-white"}`;
    btn.textContent = type.label;
    btn.onclick = () => {
      currentEventType = type.id;
      document.querySelectorAll(".event-tab-btn").forEach((b) => {
        b.classList.remove("active-tab");
        b.classList.add("text-gray-400");
      });
      btn.classList.add("active-tab");
      btn.classList.remove("text-gray-400");
      updateEventsList();
    };
    toggleWrapper.appendChild(btn);
  });

  container.appendChild(toggleWrapper);

  // Events List Container
  const eventsList = document.createElement("div");
  eventsList.id = "dining-events-list";
  eventsList.className = "space-y-12";
  container.appendChild(eventsList);

  section.appendChild(container);
  return section;
}

function updateEventsList() {
  const container = document.getElementById("dining-events-list");
  if (!container) return;

  container.innerHTML = "";
  const packages =
    sushiData.diningEvents.packages[currentEventType] ||
    sushiData.diningEvents.packages["private"];

  packages.forEach((pkg, index) => {
    const card = document.createElement("div");
    card.className =
      "grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all p-6 sm:p-8 text-left";

    const isEven = index % 2 === 0;

    const textContent = `
      <div class="md:col-span-6 space-y-4 ${isEven ? "md:order-1" : "md:order-2"}">
        <div class="flex items-baseline gap-3">
          <span class="font-serif text-3xl sm:text-4xl font-extrabold text-gold-400">$${pkg.price}</span>
          <span class="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider">${pkg.title}</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-300 font-light">${pkg.description}</p>
        
        <ul class="space-y-2 text-xs text-gray-400 pt-2 border-t border-white/5">
          ${pkg.features.map((f) => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-gold-500"></i><span>${f}</span></li>`).join("")}
        </ul>

        <div class="pt-3">
          <button onclick="openReservationModal('${pkg.title} ($${pkg.price})')" class="px-6 py-2.5 rounded-full btn-gold-solid text-xs uppercase tracking-wider font-bold">
            Book Experience
          </button>
        </div>
      </div>
    `;

    const imageContent = `
      <div class="md:col-span-6 aspect-[16/10] rounded-xl overflow-hidden bg-black ${isEven ? "md:order-2" : "md:order-1"}">
        <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500" />
      </div>
    `;

    card.innerHTML = isEven
      ? textContent + imageContent
      : imageContent + textContent;
    container.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// 7. FEATURED GRILLED SALMON DISH BANNER
function renderFeaturedDish() {
  const section = document.createElement("div");
  section.className =
    "w-full h-72 sm:h-96 md:h-[420px] relative overflow-hidden my-12";

  section.innerHTML = `
    <img src="${sushiData.featuredDish.image}" alt="${sushiData.featuredDish.alt}" class="w-full h-full object-cover filter brightness-[0.8] contrast-110" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
  `;

  return section;
}

// 8. OUR STORY COMPONENT

function renderStorySection() {
  const story = sushiData.story;
  const section = document.createElement("section");
  section.id = "story";
  section.className = "py-24 bg-[#0a0a0a] relative z-10";

  const container = document.createElement("div");
  container.className = "max-w-6xl mx-auto px-6 lg:px-12";

  container.innerHTML = `
    <div class="space-y-3 mb-16 text-center max-w-2xl mx-auto">
      <p class="font-cursive text-3xl text-gold-400">${story.scriptSubtitle}</p>
      <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase">${story.headline}</h2>
      <div class="w-12 h-[1px] bg-gold-500 mx-auto my-3"></div>
      <p class="text-xs sm:text-sm text-gray-400 font-light">${story.tagline}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Left Photo Collage -->
      <div class="lg:col-span-6 grid grid-cols-2 gap-4">
        <div class="space-y-4">
          <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-white/5">
            <img src="${story.collage[0].image}" alt="${story.collage[0].alt}" class="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-all duration-500" />
          </div>
          <div class="aspect-square rounded-2xl overflow-hidden bg-black border border-white/5">
            <img src="${story.collage[1].image}" alt="${story.collage[1].alt}" class="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-all duration-500" />
          </div>
        </div>
        <div class="pt-8">
          <div class="aspect-[3/5] rounded-2xl overflow-hidden bg-black border border-white/5">
            <img src="${story.collage[2].image}" alt="${story.collage[2].alt}" class="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-all duration-500" />
          </div>
        </div>
      </div>

      <!-- Right Text Content -->
      <div class="lg:col-span-6 space-y-6 text-left">
        ${story.paragraphs
          .map(
            (p) => `
          <p class="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            ${p}
          </p>
        `,
          )
          .join("")}

        <div class="pt-4">
          <button onclick="openReservationModal()" class="px-8 py-3 rounded-full btn-gold-outline text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2">
            <span>${story.buttonText}</span>
          </button>
        </div>
      </div>

    </div>
  `;

  return section;
}

// 9. RESERVATION CALL TO ACTION BANNER
function renderReservationBanner() {
  const banner = sushiData.reservationBanner;
  const section = document.createElement("section");
  section.id = "reservation";
  section.className =
    "relative py-28 overflow-hidden text-center border-t border-white/5";

  section.innerHTML = `
    <!-- Background Dimmed Ambience -->
    <div class="absolute inset-0 -z-10">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80" alt="Dining Table" class="w-full h-full object-cover filter brightness-[0.22]" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]"></div>
    </div>

    <div class="max-w-4xl mx-auto px-6 space-y-8">
      <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-white uppercase gold-text-gradient">
        ${banner.headline}
      </h2>

      <!-- Address & Phone Row -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs sm:text-sm text-gray-300 font-light">
        <div class="flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-gold-400"></i>
          <span>${sushiData.restaurant.address}</span>
        </div>
        <span class="hidden sm:inline text-gold-500">•</span>
        <div class="flex items-center gap-2">
          <i data-lucide="phone" class="w-4 h-4 text-gold-400"></i>
          <span>${sushiData.restaurant.phone}</span>
        </div>
      </div>

      <!-- Action Button -->
      <div>
        <button onclick="openReservationModal()" class="px-10 py-4 rounded-full btn-gold-solid text-xs uppercase tracking-[0.25em] font-bold shadow-gold-glow">
          ${banner.buttonText}
        </button>
      </div>
    </div>
  `;

  return section;
}

// 10. FOOTER COMPONENT
function renderFooter() {
  const footer = document.createElement("footer");
  footer.className =
    "py-12 bg-[#060606] border-t border-white/5 text-center space-y-6";

  const r = sushiData.restaurant;

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-6">
      
      <!-- Center Emblem Logo -->
      <a href="#hero" class="w-12 h-12 rounded-full border border-gold-500/80 bg-gold-500/10 flex items-center justify-center text-gold-400 font-serif font-bold text-lg hover:scale-110 transition-transform">
        <span>鮨</span>
      </a>

      <!-- Social Links -->
      <div class="flex items-center justify-center gap-6 text-xs uppercase tracking-widest text-gray-400">
        ${r.socials
          .map(
            (s) => `
          <a href="${s.url}" target="_blank" rel="noreferrer" class="hover:text-gold-400 transition-colors">
            ${s.name}
          </a>
        `,
          )
          .join("")}
      </div>

      <!-- Copyright -->
      <p class="text-[11px] text-gray-500 font-light tracking-wider">
        &copy; ${new Date().getFullYear()} ${r.name}. All rights reserved. Exquisite Japanese Culinary Artistry.
      </p>

    </div>
  `;

  return footer;
}

// 11. TABLE RESERVATION MODAL
function renderReservationModal() {
  const modal = document.createElement("div");
  modal.id = "reservation-modal";
  modal.className =
    "fixed inset-0 z-50 hidden flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md";

  modal.innerHTML = `
    <div class="bg-[#121212] border border-gold-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      
      <button onclick="closeReservationModal()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="text-center space-y-2 mb-6">
        <p class="font-cursive text-2xl text-gold-400">Book A Table</p>
        <h3 class="font-serif text-2xl font-bold text-white uppercase tracking-wider" id="modal-heading">Table Reservation</h3>
        <p class="text-xs text-gray-400">Experience our master chefs' seasonal omakase tasting.</p>
      </div>

      <form id="reservation-form" class="space-y-4 text-left">
        <div>
          <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Full Name *</label>
          <input type="text" id="res-name" required placeholder="Lord / Lady Sterling" class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Phone *</label>
            <input type="tel" id="res-phone" required placeholder="+1 (555) 000-0000" class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Guests *</label>
            <select id="res-guests" class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors">
              <option value="2">2 Guests (Intimate)</option>
              <option value="4">4 Guests (Standard)</option>
              <option value="6">6 Guests (Booth)</option>
              <option value="8">8+ Guests (VIP Room)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Date *</label>
            <input type="date" id="res-date" required class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Time Slot *</label>
            <select id="res-time" class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors">
              <option value="17:30">5:30 PM (Sunset)</option>
              <option value="19:00">7:00 PM (Prime Omakase)</option>
              <option value="20:30">8:30 PM (Evening)</option>
              <option value="22:00">10:00 PM (Late Night)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="text-xs uppercase tracking-wider text-gray-400 block mb-1">Special Requests / Allergies</label>
          <textarea id="res-notes" rows="2" placeholder="Dietary preferences, anniversary celebrations..." class="w-full bg-black/50 border border-white/15 focus:border-gold-500 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"></textarea>
        </div>

        <div class="pt-3">
          <button type="submit" id="res-submit-btn" class="w-full py-3.5 rounded-full btn-gold-solid text-xs uppercase tracking-widest font-bold">
            Confirm Reservation
          </button>
        </div>
      </form>
    </div>
  `;

  return modal;
}

// 12. ONLINE ORDER CART DRAWER
function renderCartDrawer() {
  const drawer = document.createElement("div");
  drawer.id = "cart-drawer";
  drawer.className =
    "fixed inset-0 z-50 pointer-events-none transition-all duration-300";

  drawer.innerHTML = `
    <!-- Overlay Backdrop -->
    <div id="cart-backdrop" onclick="toggleCartDrawer(false)" class="absolute inset-0 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-300"></div>

    <!-- Slide-over Panel -->
    <div id="cart-panel" class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#121212] border-l border-white/10 p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 shadow-2xl pointer-events-auto">
      
      <div>
        <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div class="flex items-center gap-2">
            <i data-lucide="shopping-bag" class="w-5 h-5 text-gold-400"></i>
            <h3 class="font-serif text-xl font-bold text-white uppercase tracking-wider">Your Order</h3>
          </div>
          <button onclick="toggleCartDrawer(false)" class="p-1.5 text-gray-400 hover:text-white rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div id="cart-items-list" class="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
          <!-- Dynamically populated via JS -->
        </div>
      </div>

      <div class="border-t border-white/10 pt-4 space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Subtotal</span>
          <span id="cart-subtotal" class="font-serif text-xl font-bold text-gold-400">$0</span>
        </div>
        <p class="text-[11px] text-gray-500">Taxes and delivery calculated at checkout.</p>
        <button onclick="checkoutCart()" class="w-full py-3.5 rounded-full btn-gold-solid text-xs uppercase tracking-widest font-bold">
          Proceed to Checkout
        </button>
      </div>

    </div>
  `;

  return drawer;
}

//13. TOAST NOTIFICATION COMPONENT

function renderToast() {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className =
    "fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-3 bg-[#161616] border border-gold-500/40 text-white px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md";

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0">
      <i data-lucide="check" class="w-4 h-4"></i>
    </div>
    <div>
      <h4 id="toast-title" class="text-xs uppercase tracking-wider font-bold text-gold-300">Confirmed</h4>
      <p id="toast-message" class="text-xs text-gray-300">Your reservation has been booked.</p>
    </div>
  `;

  return toast;
}

//  GLOBAL INTERACTIVE LOGIC & EVENT CONTROLLERS

function setupGlobalEvents() {
  // Initialize dynamic specialty menu & event packages
  updateSpecialtiesList();
  updateEventsList();

  // Scroll spy & Navbar styling
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 60) {
        navbar.classList.add("bg-[#0a0a0a]/98", "shadow-2xl");
        navbar.classList.remove("bg-[#0a0a0a]/90");
      } else {
        navbar.classList.remove("bg-[#0a0a0a]/98", "shadow-2xl");
        navbar.classList.add("bg-[#0a0a0a]/90");
      }
    }

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active-nav");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-nav");
          }
        });
      }
    });
  });

  // Reservation Form submission
  const resForm = document.getElementById("reservation-form");
  if (resForm) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("res-submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "CONFIRMING...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Confirm Reservation";
        closeReservationModal();
        resForm.reset();
        showToast(
          "Table Reserved!",
          "Your reservation request has been confirmed. We look forward to welcoming you.",
        );
      }, 900);
    });
  }
}

// CART & MODAL HELPERS

window.openReservationModal = function (packageTitle) {
  const modal = document.getElementById("reservation-modal");
  const heading = document.getElementById("modal-heading");
  if (modal) {
    if (heading && packageTitle) {
      heading.textContent = packageTitle;
    } else if (heading) {
      heading.textContent = "Table Reservation";
    }
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }
};

window.closeReservationModal = function () {
  const modal = document.getElementById("reservation-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
};

window.toggleCartDrawer = function (isOpen) {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const panel = document.getElementById("cart-panel");

  if (!drawer || !backdrop || !panel) return;

  if (isOpen) {
    drawer.classList.remove("pointer-events-none");
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("opacity-100", "pointer-events-auto");
    panel.classList.remove("translate-x-full");
    renderCartItems();
  } else {
    drawer.classList.add("pointer-events-none");
    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    panel.classList.add("translate-x-full");
  }
};

window.addToCart = function (id, title, price, image) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, title, price, image, qty: 1 });
  }

  updateCartBadge();
  showToast("Added to Cart", `${title} ($${price}) added.`);
};

window.updateCartQty = function (id, change) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  updateCartBadge();
  renderCartItems();
};

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (badge) {
    if (totalCount > 0) {
      badge.textContent = totalCount;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

function renderCartItems() {
  const container = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-subtotal");
  if (!container || !subtotalEl) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-gray-500 space-y-2">
        <i data-lucide="shopping-bag" class="w-8 h-8 mx-auto opacity-40"></i>
        <p class="text-xs uppercase tracking-wider">Your cart is empty</p>
      </div>
    `;
    subtotalEl.textContent = "$0";
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;

    const row = document.createElement("div");
    row.className =
      "flex items-center justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/5";

    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded-lg object-cover" />
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-serif font-bold text-white truncate uppercase">${item.title}</h4>
        <p class="text-xs text-gold-400 font-serif">$${item.price}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="updateCartQty('${item.id}', -1)" class="w-6 h-6 rounded bg-white/10 hover:bg-gold-500 hover:text-black flex items-center justify-center text-xs transition-colors">-</button>
        <span class="text-xs font-bold text-white px-1">${item.qty}</span>
        <button onclick="updateCartQty('${item.id}', 1)" class="w-6 h-6 rounded bg-white/10 hover:bg-gold-500 hover:text-black flex items-center justify-center text-xs transition-colors">+</button>
      </div>
    `;

    container.appendChild(row);
  });

  subtotalEl.textContent = `$${subtotal}`;
  if (window.lucide) lucide.createIcons();
}

window.checkoutCart = function () {
  if (cart.length === 0) {
    showToast("Empty Cart", "Please add items before checking out.");
    return;
  }

  toggleCartDrawer(false);
  showToast(
    "Order Placed!",
    "Thank you! Your chef-crafted sushi order is being prepared.",
  );
  cart = [];
  updateCartBadge();
};

window.showToast = function (title, message) {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastMsg = document.getElementById("toast-message");

  if (!toast || !toastTitle || !toastMsg) return;

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
  }, 3500);
};
