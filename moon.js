// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false
});

// Splash screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById('splash-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
    }, 1000);
  }, 3000); // tampil splash 3 detik
});

// WhatsApp button shake effect
const btn = document.getElementById("whatsapp-button");
setInterval(() => {
  btn.classList.add("shake");
  setTimeout(() => {
    btn.classList.remove("shake");
  }, 500);
}, 2000);

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex'); // gunakan 'flex' untuk menampilkan menu
});

// Auto apply dark mode based on system preference
const modeToggle = document.getElementById("mode-toggle");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark-mode");
  modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Manual toggle button
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Features toggle
const showFeatures = document.getElementById('show-features');
const featuresText = document.getElementById('features-text');
const featuresContent = document.getElementById('features-content');

showFeatures.addEventListener('click', (e) => {
  e.preventDefault();
  if (featuresText.classList.contains('max-h-0')) {
    // Expand
    featuresText.style.maxHeight = featuresContent.scrollHeight + "px";
    featuresText.classList.remove('max-h-0');
    featuresText.classList.remove('opacity-0');
    featuresText.classList.add('opacity-100');
  } else {
    // Collapse
    featuresText.style.maxHeight = "0";
    featuresText.classList.add('max-h-0');
    featuresText.classList.remove('opacity-100');
    featuresText.classList.add('opacity-0');
  }
});

// Kategori produk
const kategoriButtons = document.querySelectorAll('.kategori-btn');
const produkCards = document.querySelectorAll('.produk-card');

kategoriButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Hapus kelas aktif dari semua tombol
    kategoriButtons.forEach(btn => {
      btn.classList.remove('kategori-aktif');
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('bg-white', 'text-gray-800');
    });

    // Tambahkan kelas aktif ke tombol yang diklik
    button.classList.add('kategori-aktif');
    button.classList.add('bg-blue-600', 'text-white');
    button.classList.remove('bg-white', 'text-gray-800');

    const kategori = button.getAttribute('data-kategori');

    // Filter produk
    produkCards.forEach(card => {
      if (kategori === 'all' || card.getAttribute('data-kategori') === kategori) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


document.querySelector('[data-kategori="all"]').click();


const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');
const kategoriContainer = document.getElementById('kategori-container');

const checkScrollButtons = () => {
  if (kategoriContainer.scrollWidth > kategoriContainer.clientWidth) {
    scrollLeft.classList.remove('hidden');
    scrollRight.classList.remove('hidden');
  } else {
    scrollLeft.classList.add('hidden');
    scrollRight.classList.add('hidden');
  }
};

// Check on load and resize
window.addEventListener('load', checkScrollButtons);
window.addEventListener('resize', checkScrollButtons);

// Scroll functionality
scrollLeft.addEventListener('click', () => {
  kategoriContainer.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
});

scrollRight.addEventListener('click', () => {
  kategoriContainer.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
});

// Enhanced Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
 const mailtoLink = `mailto: putzzdragons@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
`========================
   📩 NEW CUSTOMER INQUIRY
========================

🔹 CONTACT INFORMATION
────────────────────
• Name  : ${name}
• Email : ${email}
• Date  : ${new Date().toLocaleString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}

🔹 MESSAGE DETAILS
────────────────────
${message}

========================
   Moon Market Support
========================

✉️ putzzdragons@gmail.com
📞 +62 895-3404-02347
🌐 moontech.web.id

[This message was sent via moontech Contact Form]
`)}`;
  
  // Open user's email client
  window.location.href = mailtoLink;
  
  // Optional: Reset form after submission
  setTimeout(() => {
    this.reset();
  }, 1000);
});
