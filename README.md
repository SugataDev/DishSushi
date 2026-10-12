# DishSushi — Luxury Japanese Cuisine & Omakase Dining

A luxury, dark-gold aesthetic Japanese sushi restaurant web application built using **Tailwind CSS** and **pure JavaScript DOM (JSDOM / DOM Manipulation)**.

---

## 🍣 Design & Section Breakdown

1. **Header & Navigation Bar**:
   - Circular Japanese kanji gold emblem logo (`鮨 DishSushi`).
   - Clean luxury navigation links with hover gold underline animations.
   - Live **Shopping Cart Drawer Trigger** with real-time item count badge.
   - **"BOOK A TABLE"** CTA button + mobile responsive drawer menu.

2. **Hero Section**:
   - Cursive script subtitle: _"Best Sushi In Town"_.
   - Metallic gold gradient serif headline: **"TASTE THE RICH FLAVOR OF HIGH QUALITY SUSHI"**.
   - Traditional culinary story description.
   - Solid gold action button leading to table reservations.

3. **Today's Special**:
   - 3 Featured daily specials cards (**Tuna Nigiri**, **Salmon Sushi**, **Sushi Tower**).
   - High-resolution dish photos, gold star ratings (`★★★★★`), price tags, and quick **Order Now** action.

4. **Panoramic Luxury Interior Atmosphere**:
   - Full-width dark ambient restaurant interior photograph showcasing the dining hall.

5. **Our Specialties / Dynamic Menu**:
   - Script subtitle: _"Quality Food For You"_.
   - Interactive category filter pills: `Specialties`, `Homestyle Sushi`, `Sushi`, `Maki Rolls`, `Uramaki`, `Sake`, `Appetizer`.
   - Alternating zig-zag grid layout matching the design screenshot (**Dragon Sushi**, **Creamy Volcano Sushi**, **Roll Salmon Maki**).

6. **Dining Events & VIP Packages**:
   - Script subtitle: _"Choose Your Event"_.
   - Toggle switcher: `Private Events` vs `Corporate Events`.
   - 3 Tier packages:
     - **$500 — Private Dining** (Champagne, 5-Course Omakase, Seating for 2-4)
     - **$1000 — Gold Dining** (2 Bottles Vintage Champagne, 8-Course Omakase, Seating for 4-8)
     - **$1500 — Royalty Dining** (Rare Krug & Sake, 10-Course Imperial Tasting, Live Chef for 8-12)

7. **Featured Scottish Salmon Hero**:
   - Panoramic grilled salmon dish showcase with lime wedge and noodles.

8. **Our Story & Collage**:
   - Script subtitle: _"About Us"_.
   - 3-photo collage grid showing the sake bar, sushi prep, and flambé chef.
   - Story narrative detailing Toyosu market sourcing and aged red vinegar traditions.
   - **"MORE ABOUT US ➔"** action.

9. **Reservation Call to Action & Footer**:
   - **"WE READY TO HAVE YOU THE BEST DINING EXPERIENCES"** headline.
   - Address and phone details with gold icons.
   - **"RESERVATION"** button opening an interactive reservation modal.
   - Center gold kanji emblem and social media links.

---

## ⚡ Interactive JavaScript DOM Features

- **Dynamic DOM Rendering**: Every section is mounted dynamically to `#app` via `document.createElement`, `classList`, and `appendChild`.
- **Menu Category Filtering**: Switching category tabs instantly updates and renders corresponding dishes without page reload.
- **Dining Events Switcher**: Instant transition between private and corporate event packages.
- **Online Shopping Cart Drawer**: Add dishes to cart, increment/decrement quantities, live subtotal calculator, and checkout flow.
- **Table Reservation Modal**: Interactive booking form for date, time slot, guest count, table preference, and allergy notes.
- **Luxury Toast Alerts**: Custom confirmation notifications for reservations and cart actions.
- **Scroll Spy**: Highlights active navigation section as the user scrolls.

---

## 📁 File Structure

```
DishSushi/
├── index.html          # HTML entry point with #app mount point & Tailwind CDN
├── css/
│   └── custom.css      # Gold luxury gradients, button styles, custom scrollbar
├── js/
│   ├── data.js         # Complete restaurant data store
│   └── main.js         # Pure JS DOM renderer, cart & reservation controllers
└── README.md           # Documentation
```

---

## 🚀 How to Run

1. Open `index.html` directly in your web browser, or
2. Launch a local server:
   ```bash
   npx serve .
   ```
   or
   ```bash
   python -m http.server 3000
   ```
3. Open `http://localhost:3000`.
