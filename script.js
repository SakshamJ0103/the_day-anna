
const PIN_CODE = "1610";
const PIN_HINT = "the day everything between us started";
const PHOTO_MEMORIES = [ {
    src: "assets/first-memory.jpg",
    title: "the golden days",
    caption: "One of the first picture of us hanging out together. It's one of my core memories."
  },
  {
    src: "assets/chaos.jpg",
    title: "certified chaos",
    caption: "Getting absolutely drenched on a cold rainy day the first thing in the morning and getting sick? Absolutely worth it for the time I got to spend with you."
  },
  {
    src: "assets/young-girlie.jpg",
    title: "one for the archives",
    caption: "Imagine getting absolutely mogged by the side profile of sucha pretty, cute and ravishing kiddo. That's right guys, this little girlie is the one and only TAKKO a.k.a ANIKA BHARDWAJ."
  },
  {
    src: "assets/dropdead-gorgeous.jpg",
    title: "my favourite one",
    caption: "If I had to choose one picture out of all of them to be etched onto the back of my mind, I'd always choose this one. This is what the word 'Beauty' truly means."
  },
  {
    src: "assets/bday.png",
    title: "to be continued...",
    caption: "From last birthday to this one. From this one to the next. Threatening you that this shall continue forever."
  }


];
  
const pinGate = document.getElementById("pinGate");
const birthdaySite = document.getElementById("birthdaySite");
const pinForm = document.getElementById("pinForm");
const pinInput = document.getElementById("pinInput");
const pinError = document.getElementById("pinError");
const pinHint = document.getElementById("pinHint");
const audio = document.getElementById("birthdaySong");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const toast = document.getElementById("toast");
const photoModal = document.getElementById("photoModal");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");

pinHint.textContent = PIN_HINT;

function unlockSite() {
  pinGate.classList.add("hidden");
  birthdaySite.classList.remove("hidden");
  document.body.classList.add("unlocked");
  window.scrollTo({ top: 0, behavior: "smooth" });
  createSparkles();
}
pinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pinInput.value === PIN_CODE) {
    pinError.textContent = "";
    unlockSite();
  } else {
    pinError.textContent = "Not quite, try the little clue again ♡";
    pinInput.value = "";
    pinInput.focus();
    pinInput.animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }], { duration: 220 });
  }
});
pinInput.addEventListener("input", () => { pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 4); });

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

musicToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.classList.add("playing");
      musicLabel.textContent = "pause our song";
      musicToggle.setAttribute("aria-label", "Pause birthday song");
    } catch (error) {
      showToast("Add your song file at assets/our-song.mp3, then try again ♡");
    }
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
    musicLabel.textContent = "play our song";
    musicToggle.setAttribute("aria-label", "Play birthday song");
  }
});
audio.addEventListener("ended", () => {
  musicToggle.classList.remove("playing");
  musicLabel.textContent = "play our song";
  musicToggle.setAttribute("aria-label", "Play birthday song");
});

document.getElementById("surpriseButton").addEventListener("click", () => {
  showToast("Surprise, Anna! You are someone's favourite plot twist. ♡");
  burstHearts();
});
document.getElementById("secretButton").addEventListener("click", () => {
  const messages = [
    "what you call your imperfections, I could stare at them for days and still be in awe for how perfect they are.",
    "you make the ordinary days feel like the best ones. ♡",
    "in every universe, I'm sure you're always mine. ✦",
    "you deserve the kind of love that feels like taking a warm shower on a cold day.",
    "every part of me loves every piece of you.",
    "your existence is a very holy. never forget that. I don't care about anyone else, for me you are the religion.♡"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("secretMessage").textContent = message;
  burstHearts();
});

function burstHearts() {
  const symbols = ["♡", "✦", "✧", "୨୧"];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("span");
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `position:fixed;z-index:40;left:${35 + Math.random() * 30}%;top:${40 + Math.random() * 20}%;color:${["#c49be0","#e8a9d4","#a9b8ee"][i%3]};font-size:${14 + Math.random()*18}px;pointer-events:none;transition:transform 1.1s ease,opacity 1.1s ease;`;
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.transform = `translate(${(Math.random()-.5)*280}px,${-70-Math.random()*200}px) rotate(${Math.random()*100-50}deg)`; el.style.opacity = "0"; });
    setTimeout(() => el.remove(), 1200);
  }
}

function createSparkles() {
  const field = document.getElementById("sparkleField");
  if (field.childElementCount) return;
  for (let i = 0; i < 22; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = i % 3 === 0 ? "♡" : (i % 2 ? "✧" : "·");
    sparkle.style.left = `${Math.random() * 98}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${10 + Math.random() * 14}px`;
    sparkle.style.animationDelay = `${Math.random() * 7}s`;
    field.appendChild(sparkle);
  }
}

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title || "a little memory";
    modalCaption.textContent = card.dataset.caption || "A tiny moment, a permanent place in my heart.";
    photoModal.classList.remove("hidden");
  });
});
function closeModal() { photoModal.classList.add("hidden"); }
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOkay").addEventListener("click", closeModal);
photoModal.addEventListener("click", (event) => { if (event.target === photoModal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

document.querySelectorAll(".candle").forEach((candle) => {
  candle.addEventListener("click", () => candle.classList.toggle("blown"));
});
document.getElementById("wishButton").addEventListener("click", () => {
  document.querySelectorAll(".candle").forEach((candle) => candle.classList.add("blown"));
  document.getElementById("wishResult").textContent = "wish sent to the universe. may it find you soon, birthday girl ♡";
  burstHearts();
  showToast("A little birthday magic is on its way ✨");
});

if (Array.isArray(PHOTO_MEMORIES) && PHOTO_MEMORIES.length) {
  const cards = [...document.querySelectorAll(".photo-card")];
  PHOTO_MEMORIES.forEach((memory, index) => {
    const card = cards[index];
    if (!card || !memory.src) return;
    const placeholder = card.querySelector(".photo-placeholder");
    if (!placeholder) return;
    placeholder.innerHTML = "";
    placeholder.style.background = "none";
    const img = document.createElement("img");
    img.src = memory.src;
    img.alt = memory.title || "A memory with Anna";
    img.loading = "lazy";
    img.style.cssText = "width:100%;height:100%;min-height:inherit;object-fit:cover;position:absolute;inset:0;";
    placeholder.appendChild(img);
    if (memory.title) card.dataset.title = memory.title;
    if (memory.caption) card.dataset.caption = memory.caption;
  });
}
