/* Utilities */
function todayISO(){ return new Date().toISOString().split("T")[0]; }
function setMinDates(){
  document.querySelectorAll('input[type="date"]').forEach(i=> i.min = todayISO());
}
function setupMobileMenu(){
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', ()=> menu.classList.toggle('hidden'));
}
function generateBookingId(){
  return 'QT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

/* Form handlers */
function handleTourSubmit(e){
  e.preventDefault();
  const details = {
    type: 'Tour Booking',
    bookingId: generateBookingId(),
    name: document.getElementById('tour-name').value,
    email: document.getElementById('tour-email').value,
    phone: document.getElementById('tour-phone').value,
    package: document.getElementById('tour-package').value,
    date: document.getElementById('tour-date').value,
    passengers: document.getElementById('tour-passengers').value,
    createdAt: new Date().toString()
  };
  localStorage.setItem('lastTicket', JSON.stringify(details));
  window.location.href = 'ticket.html';
}

function handlePickupSubmit(e){
  e.preventDefault();
  const details = {
    type: 'Pickup & Drop Service',
    bookingId: generateBookingId(),
    name: document.getElementById('pickup-name').value,
    phone: document.getElementById('pickup-phone').value,
    pickup: document.getElementById('pickup-location').value,
    drop: document.getElementById('drop-location').value,
    date: document.getElementById('pickup-date').value,
    time: document.getElementById('pickup-time').value,
    passengers: document.getElementById('pickup-passengers').value,
    createdAt: new Date().toString()
  };
  localStorage.setItem('lastTicket', JSON.stringify(details));
  window.location.href = 'ticket.html';
}

/* Ticket render (on ticket.html) */
function renderTicket(){
  const mount = document.getElementById('ticket-container');
  if(!mount) return;

  const dataRaw = localStorage.getItem('lastTicket');
  if(!dataRaw){
    mount.innerHTML = `<div class="p-6 bg-white rounded-xl shadow text-center">
      <p class="text-gray-700">No booking found. Please make a booking first.</p>
      <a href="tours.html" class="inline-block mt-4 px-4 py-2 rounded-md bg-brand-dark text-white">Go to Booking</a>
    </div>`;
    return;
  }
  const d = JSON.parse(dataRaw);

  let fields = Object.entries(d).filter(([k])=> !['createdAt'].includes(k));
  const infoGrid = fields.map(([k,v])=>`
    <div>
      <p class="font-semibold capitalize">${k.replaceAll('_',' ')}</p>
      <p class="text-gray-700 break-words">${v||'-'}</p>
    </div>
  `).join('');

  mount.innerHTML = `
    <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl ticket-card">
      <div class="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <img src="images/qushal-logo.jpg" alt="Qushal Logo" class="h-12 w-auto object-contain"
               onerror="this.onerror=null;this.src='https://placehold.co/150x50/003366/FFFFFF?text=Qushal';">
          <h2 class="text-2xl font-extrabold text-brand-dark mt-2">Booking Confirmation</h2>
        </div>
        <div class="text-right">
          <p class="font-semibold">Booking ID</p>
          <p class="text-yellow-500 font-bold">${d.bookingId}</p>
        </div>
      </div>

      <h3 class="text-xl font-semibold mt-4 mb-4">${d.type}</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        ${infoGrid}
      </div>

      <div class="mt-6 flex items-center justify-between">
        <p class="text-xs text-gray-500">Generated: ${new Date(d.createdAt).toLocaleString()}</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(d.bookingId)}"
             alt="QR" class="h-20 w-20 rounded-md" loading="lazy">
      </div>

      <div class="mt-6 border-t pt-4 text-center text-gray-600 text-sm">
        <p>Thank you for booking with Qushal Tour & Travels!</p>
        <p>Our team will contact you shortly to confirm your booking.</p>
      </div>
    </div>
    <div class="mt-6 flex justify-center gap-3">
      <button onclick="window.print()" class="bg-brand-dark text-white py-2 px-6 rounded-md bg-brand-dark-hover transition">Print Ticket</button>
      <a href="index.html" class="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition">Back to Home</a>
    </div>
  `;
}

/* Boot */
document.addEventListener('DOMContentLoaded', ()=>{
  setupMobileMenu();
  setMinDates();

  const tourForm = document.getElementById('tour-booking-form');
  if(tourForm) tourForm.addEventListener('submit', handleTourSubmit);

  const pickupForm = document.getElementById('pickup-booking-form');
  if(pickupForm) pickupForm.addEventListener('submit', handlePickupSubmit);

  renderTicket(); // runs only on ticket.html
});

/* mob men */
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('animate-slideDown');
});
