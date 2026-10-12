/**
 * DishSushi Restaurant Data Store
 * Contains all structured content rendered via JavaScript DOM.
 */

const sushiData = {
  restaurant: {
    name: "DishSushi",
    tagline: "High Quality Japanese Sushi & Omakase",
    phone: "+1 (555) 987-6543",
    address: "742 Evergreen Terrace, Beverly Hills, CA 90210",
    email: "reservations@dishsushi.com",
    hours: "Mon - Sun: 5:00 PM - 11:30 PM",
    socials: [
      { name: "Facebook", icon: "facebook", url: "https://facebook.com" },
      { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
      { name: "Instagram", icon: "instagram", url: "https://instagram.com" },
      { name: "TripAdvisor", icon: "compass", url: "https://tripadvisor.com" }
    ]
  },
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Our Menu", href: "#specialties" },
    { label: "Specials", href: "#specials" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#story" },
    { label: "Contact", href: "#reservation" }
  ],
  hero: {
    scriptSubtitle: "Best Sushi In Town",
    headline: "TASTE THE RICH FLAVOR OF HIGH QUALITY SUSHI",
    description: "Delicious and fresh sushi from high quality fish. Traditional recipes made modern with excellence in every hand-rolled bite.",
    ctaText: "BOOK A TABLE",
    ctaLink: "#reservation",
    bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
  },
  specials: {
    scriptSubtitle: "Special Menu",
    headline: "Today's Special",
    tagline: "Special delicious food to enjoy. Choose our exclusive daily specialty food today.",
    items: [
      {
        id: "tuna-nigiri",
        title: "TUNA NIGIRI",
        price: 28,
        rating: 5,
        description: "Fresh Atlantic bluefin tuna loin seasoned with fresh wasabi root, Nikiri soy glaze, and imperial golden caviar.",
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "salmon-sushi",
        title: "SALMON SUSHI",
        price: 34,
        rating: 5,
        description: "Wild-caught Alaskan king salmon, crisp English cucumber, toasted white sesame seeds, and artisanal spicy truffle mayo.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "sushi-tower",
        title: "SUSHI TOWER",
        price: 45,
        rating: 5,
        description: "Master Chef's curated assortment of bluefin maki, yellowtail nigiri, California crab rolls, and pickled young ginger.",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  interiorBanner: {
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=80",
    alt: "DishSushi Luxury Dining Hall Atmosphere"
  },
  specialties: {
    scriptSubtitle: "Quality Food For You",
    headline: "Our Specialties",
    tagline: "Authentic food from our restaurant cooked with high quality ingredients.",
    categories: [
      "Specialties",
      "Homestyle Sushi",
      "Sushi",
      "Maki Rolls",
      "Uramaki",
      "Sake",
      "Appetizer"
    ],
    items: {
      "Specialties": [
        {
          id: "dragon-sushi",
          title: "DRAGON SUSHI",
          price: 40,
          ingredients: "Freshwater unagi eel, ripe Haas avocado, crisp cucumber, sweet Kabayaki glaze, and golden tobiko caviar over seasoned Koshihikari sushi rice.",
          image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        },
        {
          id: "creamy-sushi",
          title: "CREAMY VOLCANO SUSHI",
          price: 50,
          ingredients: "Crispy jumbo tempura shrimp, snow crab meat, French cream cheese, toasted sesame, flame-torched spicy glaze, and scallion curls.",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
          layout: "image-right"
        },
        {
          id: "roll-salmon-maki",
          title: "ROLL SALMON MAKI",
          price: 30,
          ingredients: "Prime Ora King salmon, crisp Ariake nori seaweed, Japanese Koshihikari rice, freshly grated Shizuoka wasabi dip.",
          image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        }
      ],
      "Homestyle Sushi": [
        {
          id: "homestyle-nigiri-platter",
          title: "CHEF'S HOMESTYLE NIGIRI",
          price: 48,
          ingredients: "Trio of Akami tuna, Hamachi yellowtail, and sweet Ebi shrimp brushed with heirloom house-brewed Nikiri sauce.",
          image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        },
        {
          id: "wagyu-beef-nigiri",
          title: "A5 WAGYU TORCHED NIGIRI",
          price: 65,
          ingredients: "Miyazaki A5 Wagyu beef lightly blowtorched with white truffle oil, sea salt crystals, and micro shiso leaves.",
          image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
          layout: "image-right"
        }
      ],
      "Sushi": [
        {
          id: "otoro-supreme",
          title: "OTORO SUPREME SUSHI",
          price: 55,
          ingredients: "Fatty bluefin tuna belly from Toyosu market, aged 5 days, topped with edible 24k gold leaf and fresh yuzu zest.",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        },
        {
          id: "hokkaido-scallop",
          title: "HOKKAIDO HOTATE SUSHI",
          price: 42,
          ingredients: "Sweet live sea scallops from Hokkaido, lime juice, smoked Maldon sea salt, and spicy ponzu gel.",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
          layout: "image-right"
        }
      ],
      "Maki Rolls": [
        {
          id: "spicy-tuna-crunch",
          title: "SPICY TUNA CRUNCH MAKI",
          price: 32,
          ingredients: "Diced bigeye tuna, Sriracha chili oil, Japanese cucumber, crispy tempura pearls, and scallions.",
          image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        },
        {
          id: "rainbow-maki",
          title: "IMPERIAL RAINBOW MAKI",
          price: 38,
          ingredients: "California crab core wrapped in alternating slices of salmon, tuna, yellowtail, avocado, and unagi.",
          image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80",
          layout: "image-right"
        }
      ],
      "Uramaki": [
        {
          id: "uramaki-avocado",
          title: "TRUFFLE UNAGI URAMAKI",
          price: 36,
          ingredients: "Inside-out sushi roll packed with BBQ eel, avocado, cream cheese, covered in black flying fish roe.",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        }
      ],
      "Sake": [
        {
          id: "dassai-23",
          title: "DASSAI 23 JUNMAI DAIGINJO",
          price: 120,
          ingredients: "World-renowned sake milled to 23%, delivering delicate aromas of peach, melon, and velvety smooth finish.",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        }
      ],
      "Appetizer": [
        {
          id: "edamame-truffle",
          title: "TRUFFLED SEA SALT EDAMAME",
          price: 18,
          ingredients: "Steamed organic young soybean pods tossed in black truffle butter, garlic chips, and sea salt.",
          image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=900&q=80",
          layout: "image-left"
        }
      ]
    }
  },
  diningEvents: {
    scriptSubtitle: "Choose Your Event",
    headline: "Dining Events",
    tagline: "We provide dining events for your special day with your important people.",
    eventTypes: [
      { id: "private", label: "Private Events", active: true },
      { id: "corporate", label: "Corporate Events", active: false }
    ],
    packages: {
      "private": [
        {
          id: "pkg-private",
          price: 500,
          title: "PRIVATE DINING",
          description: "Bottle of Champagne, Fine Food, Seating for 2-4 People",
          image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=80",
          features: ["Dom Pérignon Champagne", "5-Course Omakase", "Candlelit Private Booth", "Dedicated Sommelier"]
        },
        {
          id: "pkg-gold",
          price: 1000,
          title: "GOLD DINING",
          description: "Bottle of Champagne, Deluxe Omakase Course, Seating for 4-8 People",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
          features: ["2 Bottles of Vintage Champagne", "8-Course Deluxe Omakase", "Exclusive Crystal Hall", "Custom Menu Keepsake"]
        },
        {
          id: "pkg-royalty",
          price: 1500,
          title: "ROYALTY DINING",
          description: "Bottle of Luxury Champagne, Special 10-Course Menu, Live Chef for 8-12 Guests",
          image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
          features: ["Rare Vintage Krug & Sake Flight", "Private Master Chef at Table", "10-Course Imperial Tasting", "VIP Chauffeur Service"]
        }
      ],
      "corporate": [
        {
          id: "pkg-corp-exec",
          price: 800,
          title: "EXECUTIVE SUITE",
          description: "Premium Sake Pairings, 6-Course Dining, Seating for up to 6 Executives",
          image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80",
          features: ["Private Audio/Visual Conference", "Bespoke Bento Tasting", "Discreet High-Speed Wifi", "Signature Cocktail Bar"]
        },
        {
          id: "pkg-corp-board",
          price: 1800,
          title: "PRESIDENTIAL BANQUET",
          description: "Full Hall Reservation, 9-Course Michelin-standard Omakase, Seating for 10-20 Guests",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
          features: ["Full Floor Buyout Option", "Personalized Wine & Sake Pairings", "Live Sushi Counter Experience", "Dedicated Hospitality Team"]
        },
        {
          id: "pkg-corp-gala",
          price: 3500,
          title: "IMPERIAL GALA",
          description: "Exclusive Venue Access, Unlimited Omakase & Champagne, Up to 40 Guests",
          image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
          features: ["Entire Restaurant Private Buyout", "3 Master Chefs Live Stations", "Top-Shelf Open Bar", "Custom Printed Menus & Gift Sets"]
        }
      ]
    }
  },
  featuredDish: {
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1800&q=80",
    title: "Pan-Seared Scottish Salmon Fillet with Yuzu Glaze & Soba",
    alt: "Featured Salmon Dish"
  },
  story: {
    scriptSubtitle: "About Us",
    headline: "Our Story",
    tagline: "A journey to creating a world-class sushi restaurant offering premier services.",
    collage: [
      { image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", alt: "Sake & Cocktail Bar" },
      { image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80", alt: "Chef Crafting Sushi" },
      { image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80", alt: "Master Chef Flambé" }
    ],
    paragraphs: [
      "Founded in 2012 by Master Chef Kenji Takahashi, DishSushi was born from a relentless pursuit of culinary harmony. We source all our seafood fresh daily from Tokyo's Toyosu Market and local sustainable fisheries.",
      "Every grain of Koshihikari rice is seasoned with artisanal red vinegar aged for over three years, delivering an unforgettable gastronomic journey that respects ancient traditions."
    ],
    buttonText: "MORE ABOUT US ➔"
  },
  reservationBanner: {
    headline: "WE READY TO HAVE YOU THE BEST DINING EXPERIENCES",
    buttonText: "RESERVATION"
  }
};
