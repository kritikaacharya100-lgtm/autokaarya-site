// Initialize Lucide Icons
lucide.createIcons();

// 1. DUAL ROUTING / SPA MULTI-PAGE CONTROLLER
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const mobileMenu = document.getElementById('mobile-menu');

function handleRouting() {
  const hash = window.location.hash || '#home';
  let targetSection = document.querySelector(hash);

  // Safety check in case hash doesn't match any section
  if (!targetSection || !targetSection.classList.contains('page-section')) {
    targetSection = document.getElementById('home');
  }

  // Deactivate all page sections
  sections.forEach(sec => {
    sec.classList.remove('active');
  });

  // Activate targeting section
  targetSection.classList.add('active');

  // Update Nav highlighting link
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active-tab');
    } else {
      link.classList.remove('active-tab');
    }
  });

  mobileLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active-tab');
    } else {
      link.classList.remove('active-tab');
    }
  });

  // Instantly scroll window back to top to simulate page swap
  window.scrollTo(0, 0);

  // Trigger reveals in active page segment
  setTimeout(() => {
    const revealsInActive = targetSection.querySelectorAll('.reveal');
    revealsInActive.forEach(el => {
      el.classList.add('active');
    });
  }, 50);
}

// Bind navigation actions to routing hash
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);

// MOBILE MENU TRIGGER
const navToggle = document.getElementById('nav-toggle');
const mobileClose = document.getElementById('mobile-close');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Close mobile menu drawers on links trigger
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// EMAIL CLIPBOARD FUNCTIONALITY
const emailDiv = document.getElementById('email-click');
emailDiv.addEventListener('click', () => {
  navigator.clipboard.writeText('autokaarya@gmail.com').then(() => {
    const originalText = emailDiv.innerHTML;
    emailDiv.innerHTML = '<i data-lucide="check"></i> <span>Copied to Clipboard!</span>';
    lucide.createIcons();
    setTimeout(() => {
      emailDiv.innerHTML = originalText;
      lucide.createIcons();
    }, 2000);
  });
});

// INTERACTIVE WORKFLOW SECTION LOGIC
const stepsData = {
  1: {
    badge: "Step 1 of 5",
    title: "customer Messages",
    desc: "customer messages on WhatsApp, Instagram, TikTok or Facebook — anytime, day or night."
  },
  2: {
    badge: "Step 2 of 5",
    title: "AI Understands",
    desc: "Our AI instantly understands what the customer needs — no confusing menus, no waiting."
  },
  3: {
    badge: "Step 3 of 5",
    title: "Calendar Checked",
    desc: "The system checks your real calendar in real time — zero double bookings, ever."
  },
  4: {
    badge: "Step 4 of 5",
    title: "Appointment Booked",
    desc: "Appointment confirmed, calendar updated, records logged — all in under 30 seconds."
  },
  5: {
    badge: "Step 5 of 5",
    title: "Follow-up Sent",
    desc: "The system follows up automatically — reminders, aftercare, and rebooking. Zero manual effort."
  }
};

const tabButtons = document.querySelectorAll('.workflow-tab-btn');
const workflowScreens = document.querySelectorAll('.workflow-screen');
const nextBtn = document.getElementById('workflow-next-btn');

const stepBadge = document.getElementById('workflow-step-badge');
const stepTitle = document.getElementById('workflow-step-title');
const stepDesc = document.getElementById('workflow-step-desc');

let currentTab = 1;
let autoPlayInterval;

function selectTab(tabId) {
  currentTab = parseInt(tabId);

  tabButtons.forEach(btn => {
    if (parseInt(btn.getAttribute('data-tab')) === currentTab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  workflowScreens.forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(`screen-tab-${currentTab}`).classList.add('active');

  stepBadge.innerText = stepsData[currentTab].badge;
  stepTitle.innerText = stepsData[currentTab].title;
  stepDesc.innerText = stepsData[currentTab].desc;

  if (currentTab === 5) {
    nextBtn.innerHTML = 'Back to Start <i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i>';
  } else {
    nextBtn.innerHTML = 'Next Step <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>';
  }
  lucide.createIcons();
}

function advanceTab() {
  let next = currentTab + 1;
  if (next > 5) next = 1;
  selectTab(next);
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(advanceTab, 3000);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    stopAutoPlay();
    selectTab(btn.getAttribute('data-tab'));
  });
});

nextBtn.addEventListener('click', () => {
  stopAutoPlay();
  let next = currentTab + 1;
  if (next > 5) next = 1;
  selectTab(next);
});

startAutoPlay();

// HERO CHAT SEQUENCE LOOP
const heroChatMessages = document.querySelectorAll('#hero-chat-body .chat-bubble');
function restartHeroChatAnimation() {
  heroChatMessages.forEach(msg => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(10px)';
    void msg.offsetWidth;
  });

  heroChatMessages[0].style.animation = 'messageIn 0.4s ease 0.5s forwards';
  heroChatMessages[1].style.animation = 'messageIn 0.4s ease 1.8s forwards';
  heroChatMessages[2].style.animation = 'messageIn 0.4s ease 3.3s forwards';
  heroChatMessages[3].style.animation = 'messageIn 0.4s ease 4.6s forwards';
}

// Animate automatically on load
restartHeroChatAnimation();
setInterval(restartHeroChatAnimation, 12000);

// ==================== INTERACTIVE ROI CALCULATOR LOGIC ====================
// ==================== INTERACTIVE ROI CALCULATOR LOGIC ====================

const inquiriesInput = document.getElementById('roi-inquiries');
const unansweredInput = document.getElementById('roi-unanswered');
const valueInput = document.getElementById('roi-value');
const timeInput = document.getElementById('roi-time');

const currencySymbol = document.getElementById('currency-symbol');

const monthlyBtn = document.getElementById('period-monthly');
const yearlyBtn = document.getElementById('period-yearly');

let yearlyMode = false;

const activeAnimations = {};

function formatMoney(value) {
  if (value === 0) return '$0';
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function animateValue(id, end) {
  const el = document.getElementById(id);
  if (!el) return;

  if (activeAnimations[id]) {
    cancelAnimationFrame(activeAnimations[id]);
  }

  const start = parseFloat(el.getAttribute('data-val') || '0');
  const duration = 600;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease = progress * (2 - progress);
    const current = start + (end - start) * ease;

    el.innerText = formatMoney(current);
    el.setAttribute('data-val', current);

    if (progress < 1) {
      activeAnimations[id] = requestAnimationFrame(update);
    } else {
      el.innerText = formatMoney(end);
      el.setAttribute('data-val', end);
      activeAnimations[id] = null;
    }
  }

  activeAnimations[id] = requestAnimationFrame(update);
}

function calculateROI() {
  const inquiries = parseFloat(document.getElementById('roi-inquiries').value) || 0;
  const unansweredPct = Math.min(parseFloat(document.getElementById('roi-unanswered').value) || 0, 100);
  const avgValue = parseFloat(document.getElementById('roi-value').value) || 0;
  const replyTime = parseFloat(document.getElementById('roi-time').value) || 0;

  const unansweredSafe = inquiries * (unansweredPct / 100);
  const baseConv = 0.25;
  const decayFactor = 1 / (1 + (replyTime * 0.12));
  const currentMonthlyRevenue = (inquiries - unansweredSafe) * avgValue * baseConv * decayFactor;

  const autoMonthlyRevenue = inquiries * avgValue * baseConv;
  const monthlyDiff = autoMonthlyRevenue - currentMonthlyRevenue;

  const unansweredPercent = unansweredSafe / (inquiries || 1);
  const delayLossPercent = (1 - unansweredPercent) * (1 - decayFactor);
  const totalLostPercent = Math.round((unansweredPercent + delayLossPercent) * 100);
  const roiMultiplier = monthlyDiff > 119 ? Math.round(monthlyDiff / 119) : 0;

  const isYearly = yearlyMode;
  const multiplier = isYearly ? 12 : 1;

  if (unansweredPct === 0 && replyTime === 0) {
    animateValue('val-current', 0);
    animateValue('val-auto', 0);
    animateValue('val-diff', 0);
    document.getElementById('pct-lost').innerText = '0% of inquiries never convert';
    document.getElementById('val-roi-mult').innerText = '0x return';
    return;
  }

  animateValue('val-current', currentMonthlyRevenue * multiplier);
  animateValue('val-auto', autoMonthlyRevenue * multiplier);
  animateValue('val-diff', monthlyDiff * multiplier);
  document.getElementById('pct-lost').innerText = totalLostPercent + '% of inquiries never convert';
  document.getElementById('val-roi-mult').innerText = roiMultiplier + 'x return';
}

// INPUT EVENTS
[inquiriesInput, unansweredInput, valueInput, timeInput].forEach(input => {
  input.addEventListener('input', calculateROI);
});

// CURRENCY TOGGLE REMOVED

// PERIOD TOGGLE
monthlyBtn.addEventListener('click', () => {
  yearlyMode = false;

  monthlyBtn.classList.add('active-period');
  yearlyBtn.classList.remove('active-period');

  calculateROI();
});

yearlyBtn.addEventListener('click', () => {
  yearlyMode = true;

  yearlyBtn.classList.add('active-period');
  monthlyBtn.classList.remove('active-period');

  calculateROI();
});

// INITIAL LOAD
calculateROI();
// SCROLL REVEALS IN SPA TABS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.05,
  rootMargin: "0px 0px -20px 0px"
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

