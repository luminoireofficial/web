// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Price option selection
const priceOptions = document.querySelectorAll('.price-option');
priceOptions.forEach(option => {
  option.addEventListener('click', function() {
    priceOptions.forEach(opt => opt.classList.remove('selected'));
    this.classList.add('selected');
    document.getElementById('priceList').value = this.getAttribute('data-value');
  });
});

// Payment method selection
const paymentMethods = document.querySelectorAll('.payment-method');
let selectedPayment = '';
paymentMethods.forEach(method => {
  method.addEventListener('click', function() {
    paymentMethods.forEach(m => m.classList.remove('selected'));
    this.classList.add('selected');
    selectedPayment = this.getAttribute('data-value');
    document.getElementById('paymentList').value = selectedPayment;
    
    // Show QRIS section for all payment methods
    document.getElementById('qrisSection').style.display = 'block';
    
    // Change QR image and title based on selected payment
    const qrisImage = document.getElementById('qrisImage');
    const paymentTitle = document.getElementById('paymentTitle');
    
    if (selectedPayment === 'Qris All Payment') {
      qrisImage.src = '../panel/img/qr.jpg';
      paymentTitle.textContent = 'Silahkan Scan QR Code Dibawah';
    } else if (selectedPayment === 'Gopay') {
      qrisImage.src = '../panel/img/qrgopay.jpg';
      paymentTitle.textContent = 'Silahkan Scan QR Gopay Dibawah';
    } else if (selectedPayment === 'DANA') {
      qrisImage.src = '../panel/img/qrdana.jpg';
      paymentTitle.textContent = 'Silahkan Scan QR DANA Dibawah';
    }
  });
});

// Download QR function
function downloadQR() {
  const selectedPayment = document.getElementById('paymentList').value;
  let qrImage = '';
  
  if (selectedPayment === 'Qris All Payment') {
    qrImage = '../panel/img/qr.jpg';
  } else if (selectedPayment === 'Gopay') {
    qrImage = '../panel/img/qrgopay.jpg';
  } else if (selectedPayment === 'DANA') {
    qrImage = '../panel/img/qrdana.jpg';
  }
  
  if (qrImage) {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `${selectedPayment.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Ripple effect for buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

// Validasi agar hanya huruf di input gameID
document.getElementById("gameID").addEventListener("input", function(e) {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // hanya huruf dan spasi
});

// Place Order Function with Ripple effect
function placeOrder(event) {
  createRipple(event);
  
  const gameName = document.getElementById('gameName').value;
  const gameID = document.getElementById('gameID').value;
  const priceList = document.getElementById('priceList').value;
  const paymentList = document.getElementById('paymentList').value;

  // Check which fields are empty
  if (!gameID) {
    showWarning();
    document.getElementById('gameID').focus();
    return;
  }

  if (!priceList) {
    showWarning();
    // Scroll to price options
    document.getElementById('priceOptions').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (!paymentList) {
    showWarning();
    // Scroll to payment methods
    document.querySelector('.payment-methods').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Proceed directly to WhatsApp
  proceedToWhatsApp();
}

// Proceed to WhatsApp function
function proceedToWhatsApp() {
  const gameName = document.getElementById('gameName').value;
  const gameID = document.getElementById('gameID').value;
  const priceList = document.getElementById('priceList').value;
  const paymentList = document.getElementById('paymentList').value;

  const orderData = `Jenis Produk : ${gameName}\nUsername : ${gameID}\nProduk Dipilih : ${priceList}\nPayment Method : ${paymentList}`;
  const encodedOrderData = encodeURIComponent(orderData);
  const whatsappLink = `https://wa.me/62895340402347?text=${encodedOrderData}`;
  window.location.href = whatsappLink;
}

function showWarning() {
  const warningMessage = document.getElementById('warningMessage');
  warningMessage.classList.remove('hidden');
  setTimeout(() => {
    warningMessage.style.animation = 'none';
    void warningMessage.offsetWidth; // Trigger reflow
    warningMessage.style.animation = 'shake 0.5s';
  }, 10);
}

function hideWarning() {
  const warningMessage = document.getElementById('warningMessage');
  warningMessage.classList.add('hidden');
}

// Initialize floating labels for selects
document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', function() {
    const label = this.previousElementSibling;
    if (this.value !== "") {
      label.style.top = '-10px';
      label.style.left = '10px';
      label.style.fontSize = '12px';
      label.style.color = '#6c5ce7';
      label.style.backgroundColor = 'white';
    } else {
      label.style.top = '12px';
      label.style.left = '15px';
      label.style.fontSize = '';
      label.style.color = '#999';
      label.style.backgroundColor = '#f9f9f9';
    }
  });
});