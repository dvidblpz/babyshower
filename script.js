/* =====================================================
   CONFIGURACIÓN PRINCIPAL
===================================================== */

const eventConfig = {

  event: {

    type: "Baby Shower",

    title: "Valentina"

  },


  people: {

    primary: "Sofía",

    secondary: "Daniel"

  },


  date: "2026-11-21T17:00:00",


  rsvpDeadline: "2026-11-15",


  location: {

    name: "Jardín Magnolia",

    address:
      "Av. del Bosque 245, Cumbres, Monterrey, Nuevo León, México",

    latitude: "25.7219",

    longitude: "-100.3618"

  },


  whatsapp: {

    phone: "528112345678",

    message:
      "Hola Sofía y Daniel. Soy [NOMBRE] y confirmo mi asistencia al Baby Shower de Valentina. [MENSAJE]"

  },


  music:
    "music/event-music.mp3",


  wishes: [

    "Que Valentina llegue rodeada de amor y que cada día de su vida tenga una estrella que la acompañe.",

    "Que nunca le falten abrazos, sueños grandes y personas que celebren cada uno de sus pasos.",

    "Que su llegada llene el hogar de Sofía y Daniel de nuevas historias, risas y momentos inolvidables.",

    "Que cada noche encuentre una razón para mirar al cielo y recordar lo querida que es.",

    "Que esta nueva aventura familiar esté llena de salud, paciencia, ternura y muchísimo amor."

  ]

};


/* =====================================================
   HELPERS
===================================================== */

const $ = (
  selector,
  scope = document
) => scope.querySelector(selector);


const $$ = (
  selector,
  scope = document
) => [
  ...scope.querySelectorAll(selector)
];


/* =====================================================
   INICIALIZACIÓN
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initOpening();

    initMusic();

    initCountdown();

    initNavigation();

    initWish();

    initMaps();

    initGallery();

    initRSVP();

    initGift();

    initRevealAnimations();

    initCursorGlow();

    initProtection();

    initBackToTop();

  }
);


/* =====================================================
   APERTURA
===================================================== */

function initOpening() {

  document.body.classList.add(
    "is-locked"
  );


  const opening =
    $("#opening");


  const openButton =
    $("#openInvitation");


  const main =
    $("#mainContent");


  if (!openButton) return;


  openButton.addEventListener(
    "click",
    async () => {

      opening?.classList.add(
        "closed"
      );


      main?.classList.add(
        "is-visible"
      );


      main?.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.classList.remove(
        "is-locked"
      );


      const audio =
        $("#eventMusic");


      if (audio) {

        try {

          await audio.play();

          setMusicState(true);

        } catch {

          setMusicState(false);

          showToast(
            "La música está lista. Pulsa ♪ para activarla."
          );

        }

      }


      setTimeout(
        () => opening?.remove(),
        1300
      );

    }
  );

}


/* =====================================================
   MÚSICA
===================================================== */

function initMusic() {

  const audio =
    $("#eventMusic");


  const button =
    $("#musicToggle");


  if (!audio || !button) return;


  audio.src =
    eventConfig.music;


  button.addEventListener(
    "click",
    async () => {

      if (audio.paused) {

        try {

          await audio.play();

          setMusicState(true);

        } catch {

          showToast(
            "No se pudo reproducir la música."
          );

        }

      } else {

        audio.pause();

        setMusicState(false);

      }

    }
  );


  audio.addEventListener(
    "play",
    () => {

      setMusicState(true);

    }
  );


  audio.addEventListener(
    "pause",
    () => {

      setMusicState(false);

    }
  );

}


/* =====================================================
   ESTADO DE MÚSICA
===================================================== */

function setMusicState(
  isPlaying
) {

  const button =
    $("#musicToggle");


  if (!button) return;


  button.classList.toggle(
    "playing",
    isPlaying
  );


  button.setAttribute(
    "aria-pressed",
    String(isPlaying)
  );


  button.setAttribute(
    "aria-label",
    isPlaying
      ? "Pausar música"
      : "Activar música"
  );

}


/* =====================================================
   COUNTDOWN
===================================================== */

function initCountdown() {

  const target =
    new Date(
      eventConfig.date
    ).getTime();


  const fields = {

    days:
      $("#days"),

    hours:
      $("#hours"),

    minutes:
      $("#minutes"),

    seconds:
      $("#seconds")

  };


  function update() {

    const distance =
      target - Date.now();


    if (distance <= 0) {

      Object.values(fields)
        .forEach(
          element => {

            if (element) {

              element.textContent =
                "00";

            }

          }
        );

      return;

    }


    const days =
      Math.floor(
        distance / 86400000
      );


    const hours =
      Math.floor(
        (distance / 3600000) % 24
      );


    const minutes =
      Math.floor(
        (distance / 60000) % 60
      );


    const seconds =
      Math.floor(
        (distance / 1000) % 60
      );


    if (fields.days) {

      fields.days.textContent =
        String(days).padStart(
          2,
          "0"
        );

    }


    if (fields.hours) {

      fields.hours.textContent =
        String(hours).padStart(
          2,
          "0"
        );

    }


    if (fields.minutes) {

      fields.minutes.textContent =
        String(minutes).padStart(
          2,
          "0"
        );

    }


    if (fields.seconds) {

      fields.seconds.textContent =
        String(seconds).padStart(
          2,
          "0"
        );

    }

  }


  update();


  setInterval(
    update,
    1000
  );

}


/* =====================================================
   NAVEGACIÓN
===================================================== */

function initNavigation() {

  $$(
    'a[href^="#"]'
  ).forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const target =
            $(link.getAttribute("href"));


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

        }
      );

    }
  );

}


/* =====================================================
   MAKE A WISH
===================================================== */

function initWish() {

  const button =
    $("#wishMoon");


  const result =
    $("#wishResult p");


  const number =
    $(".wish-number");


  if (
    !button ||
    !result ||
    !number
  ) return;


  let index = 0;


  button.addEventListener(
    "click",
    () => {

      index =
        (
          index + 1
        ) %
        eventConfig.wishes.length;


      result.textContent =
        eventConfig.wishes[index];


      number.textContent =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );


      const moon =
        $(".wish-moon", button);


      if (moon) {

        moon.animate(

          [

            {
              transform:
                "scale(1) rotate(0deg)"
            },

            {
              transform:
                "scale(.93) rotate(-4deg)"
            },

            {
              transform:
                "scale(1.04) rotate(2deg)"
            },

            {
              transform:
                "scale(1) rotate(0deg)"
            }

          ],

          {

            duration: 750,

            easing:
              "cubic-bezier(.22,.8,.24,1)"

          }

        );

      }

    }
  );

}


/* =====================================================
   GOOGLE MAPS / WAZE
===================================================== */

function initMaps() {

  const {

    latitude,

    longitude,

    address

  } = eventConfig.location;


  const encodedAddress =
    encodeURIComponent(
      address
    );


  const maps =
    $("#mapsLink");


  const waze =
    $("#wazeLink");


  if (maps) {

    maps.href =
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  }


  if (waze) {

    waze.href =
      `https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes`;

  }

}


/* =====================================================
   GALERÍA
===================================================== */

function initGallery() {

  const lightbox =
    $("#lightbox");


  const image =
    $("#lightboxImage");


  const close =
    $("#closeLightbox");


  $$(".gallery-photo")
    .forEach(
      photo => {

        photo.addEventListener(
          "click",
          () => {

            const source =
              photo.dataset.full;


            if (!source) return;


            image.src =
              source;


            image.alt =
              `Fotografía del Baby Shower de ${eventConfig.event.title}`;


            lightbox.classList.add(
              "open"
            );


            lightbox.setAttribute(
              "aria-hidden",
              "false"
            );


            document.body.classList.add(
              "is-locked"
            );

          }
        );

      }
    );


  function closeBox() {

    lightbox.classList.remove(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    image.removeAttribute(
      "src"
    );


    document.body.classList.remove(
      "is-locked"
    );

  }


  close?.addEventListener(
    "click",
    closeBox
  );


  lightbox?.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {

        closeBox();

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        lightbox?.classList.contains(
          "open"
        )
      ) {

        closeBox();

      }

    }
  );


  /*
    Detectar automáticamente
    fotografías existentes.
  */

  $$(".gallery-photo")
    .forEach(
      photo => {

        const source =
          photo.dataset.full;


        if (!source) return;


        const img =
          new Image();


        img.onload =
          () => {

            photo.style.backgroundImage =
              `url("${source}")`;


            photo.style.backgroundSize =
              "cover";


            photo.style.backgroundPosition =
              "center";


            const placeholder =
              $(".photo-placeholder", photo);


            if (placeholder) {

              placeholder.style.opacity =
                "0";

            }

          };


        img.onerror =
          () => {

            /*
              Si no existe la fotografía,
              conserva el placeholder.
            */

          };


        img.src =
          source;

      }
    );

}


/* =====================================================
   RSVP
===================================================== */

function initRSVP() {

  const form =
    $("#rsvpForm");


  const nameInput =
    $("#guestName");


  const messageInput =
    $("#guestMessage");


  const status =
    $("#formStatus");


  if (!form) return;


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        nameInput.value.trim();


      const message =
        messageInput.value.trim();


      if (!name) {

        status.textContent =
          "Escribe tu nombre para confirmar.";


        nameInput.focus();


        return;

      }


      const base =
        eventConfig.whatsapp.message

          .replace(
            "[NOMBRE]",
            name
          )

          .replace(
            "[MENSAJE]",
            message ||
              "¡Nos vemos!"
          );


      const text =
        encodeURIComponent(
          base
        );


      const url =
        `https://wa.me/${eventConfig.whatsapp.phone}?text=${text}`;


      status.textContent =
        "Abriendo WhatsApp…";


      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =====================================================
   REGALOS
===================================================== */

function initGift() {

  const button =
    $("#giftButton");


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      showToast(
        "Mesa de regalos: esta información se puede personalizar para cada cliente."
      );

    }
  );

}


/* =====================================================
   ANIMACIONES SCROLL
===================================================== */

function initRevealAnimations() {

  const targets =
    $$(
      [
        ".story-title",
        ".story-copy",
        ".story-art",
        ".date-editorial",
        ".date-meta",
        ".countdown-header",
        ".counter-item",
        ".location-layout",
        ".map-art",
        ".itinerary-heading",
        ".timeline-row",
        ".wish-intro",
        ".wish-moon-button",
        ".wish-result",
        ".gallery-heading",
        ".gallery-photo",
        ".gift-layout",
        ".rsvp-layout",
        ".closing > *"
      ].join(",")
    );


  targets.forEach(
    element => {

      element.classList.add(
        "reveal"
      );

    }
  );


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: .12
      }

    );


  targets.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =====================================================
   CURSOR
===================================================== */

function initCursorGlow() {

  const glow =
    $(".cursor-glow");


  if (
    !glow ||
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  ) return;


  window.addEventListener(
    "pointermove",
    event => {

      glow.style.left =
        `${event.clientX}px`;


      glow.style.top =
        `${event.clientY}px`;

    }
  );

}


/* =====================================================
   VOLVER ARRIBA
===================================================== */

function initBackToTop() {

  const button =
    $("#backToTop");


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
  message
) {

  const toast =
    $("#toast");


  if (!toast) return;


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },

      3200
    );

}


/* =====================================================
   PROTECCIÓN BÁSICA
===================================================== */

function initProtection() {

  /*
    Click derecho
  */

  document.addEventListener(
    "contextmenu",
    event => {

      event.preventDefault();

    }
  );


  /*
    Arrastrar imágenes
  */

  document.addEventListener(
    "dragstart",
    event => {

      if (
        event.target.matches(
          "img, .gallery-photo"
        )
      ) {

        event.preventDefault();

      }

    }
  );


  /*
    Copiar
  */

  document.addEventListener(
    "copy",
    event => {

      event.preventDefault();

      showToast(
        "Contenido protegido."
      );

    }
  );


  /*
    Cortar
  */

  document.addEventListener(
    "cut",
    event => {

      event.preventDefault();

    }
  );


  /*
    Atajos
  */

  document.addEventListener(
    "keydown",
    event => {

      const key =
        event.key.toLowerCase();


      const blocked =

        key === "f12" ||

        (
          event.ctrlKey &&
          [
            "u",
            "s",
            "p",
            "c",
            "x"
          ].includes(key)
        ) ||

        (
          event.ctrlKey &&
          event.shiftKey &&
          [
            "i",
            "j",
            "c"
          ].includes(key)
        );


      if (blocked) {

        event.preventDefault();


        showToast(
          "Acción no disponible."
        );

      }

    }
  );

}