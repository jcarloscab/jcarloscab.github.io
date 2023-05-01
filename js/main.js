//*---------------------------------- presentar projectos  --------------------------/
// variables generales
const projectsContainer = document.getElementById("projects");
const btn = document.getElementById("submit");
const buttonMoreContainer = document.getElementById("more-projects");
let lastIndex = 0;

// Funciones
// manejo del fadein de los proyectos.
const handleShowProject = (projects) => {
  projects.forEach((project) => {
    if (project.isIntersecting) {
      const classes = project.target.classList;
      classes.add("project-card--show");
    } else {
      const classes = project.target.classList;
      classes.remove("project-card--show");
    }
  });
};

const observer = new IntersectionObserver(handleShowProject, {
  rootMargin: "-10%",
});

// funcion para añadir el siguiente lote de proyectos cuando pulsemos el boton de cargar más.
const moreProjects = () => {
  // borramos el boton de cargar más proyectos para añadir el siguiente lote.
  const buttonMore = document.getElementById("more");
  buttonMoreContainer.removeChild(buttonMore);
  showProjects();
};

// función que va a cargar 12 proyectos cada vez que se le llame.
const showProjects = async () => {
  const datas = await (await fetch("./projects.txt")).json();
  const arrayProjects = datas.projects;
  const projectsFragment = document.createDocumentFragment();

  // filtramos del array de todos los proyectos el lote a añadir
  const projects = arrayProjects.filter(
    (project, index) => index >= lastIndex && index < lastIndex + 12
  );
  lastIndex += 12;

  projects.forEach((project) => {
    const { img, alt, icons, title, description, web, code } = project;
    const projectContainer = document.createElement("article");
    projectContainer.setAttribute("class", "project-card");
    const iconsFragment = document.createDocumentFragment();
    const iconsContainer = document.createElement("div");
    iconsContainer.setAttribute("class", "project-card__icons-container");

    // cogemos los iconos
    icons.forEach((icon) => {
      const iconContainer = document.createElement("picture");
      iconContainer.setAttribute("class", "mini-icon");
      iconContainer.innerHTML = `
        <img 
          src="./img/${icon}.svg"
          aria-hidden="true"
          alt=""
          class="mini-icon__img" />
      `;
      iconsContainer.appendChild(iconContainer);
    });
    iconsFragment.appendChild(iconsContainer);

    // rellenamos el contenido del proyecto con los datos
    projectContainer.innerHTML = `
      <picture class="project-card__img-container">
        <img src=${img} alt=${alt} class="project-card__img" />
      </picture>
      `;
    projectContainer.appendChild(iconsFragment);
    projectContainer.innerHTML += `
      <h5 class="project-card__title">
        ${title}
      </h5>
      <div class="project-card__glass">
        <div class="project-card__glass-content">
          <p class="project-card__description">
            ${description}
          </p>
          <div class="project-card__buttons-container">
            <a href="${web}" class="button glass-button project-card__link" target="_blank">
              <span>ir a Web</span>
              <img src="./img/web.svg" aria-hidden="true" alt="" />
            </a>
            <a href="${code}" class="button glass-button project-card__link" target="_blank">
              <span>ver Código</span>
              <img src="./img/web.svg" aria-hidden="true" alt="" />
            </a>
          </div>
        </div>
      </div>
    `;
    projectsFragment.appendChild(projectContainer);
  });
  projectsContainer.appendChild(projectsFragment);

  // ponemos en observacion cada proyecto para el efecto de aparición.
  document.querySelectorAll(".project-card").forEach((project) => {
    observer.observe(project);
  });

  // si existen más proyectos para cargar añadimos un botón para poder cargarlos.
  if (lastIndex < arrayProjects.length) {
    buttonMoreContainer.innerHTML = `
    <button id="more" class="button">Cargar más Proyectos</button>`;
    document.getElementById("more").addEventListener("click", moreProjects);
  }
};

showProjects();

//*---------------------------------- Fin de Presentar proyectos  --------------------------/

//*---------------------------------- Enviar Formulario  --------------------------/
// variables
const contactLabel = document.querySelectorAll(".contact__label");
const contactInput = document.querySelectorAll(".contact__input");
const comment = document.getElementById("comment");
const errorIcon = document.querySelectorAll(".contact__error-icon");
const errorMessage = document.querySelectorAll(".contact__error");

// Funciones
const showInputError = (i, message) => {
  contactLabel[i].classList.add("contact__label--error");
  errorIcon[i].classList.add("contact__error-icon--show");
  errorMessage[i].textContent = message;
  errorMessage[i].classList.add("contact__error--show");
};

const showComentError = (i, message) => {
  comment.classList.add("contact__comment--error");
  errorMessage[i].textContent = message;
  errorMessage[i].classList.add("contact__error--show");
};

// listeners
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const serviceID = "default_service";
    const templateID = "template_ofnfhyd";
    const firstName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    let isError = false;

    // validamos el nombre.
    if (!firstName) {
      const message = "Debes introducir un Nombre";
      showInputError(0, message);
      isError = true;
    }

    // validamos el email
    const regExp = /^\D[a-z,A-Z,0-9]+[@][a-z,A-Z,0-9]+[.]\D{2,}$/;

    if (!email || !regExp.test(email)) {
      const message = "Debes introducir un email válido";
      showInputError(1, message);
      isError = true;
    }

    // validamos el comentario
    if (!comment.value) {
      const message = "por favor, coméntame en qué puedo ayudarte";
      showComentError(2, message);
      isError = true;
    }

    if (isError) {
      return;
    }

    btn.value = "Enviando...";
    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Enviar";
        alert("Formulario Enviado! Muchas gracias por tu Tiempo y confianza");
      },
      (err) => {
        btn.value = "Enviar";
        alert(JSON.stringify(err));
      }
    );
  });

// listeners para limpiar los estilos de los campos con errores
for (let i = 0; i < contactInput.length; i++) {
  contactInput[i].addEventListener("focus", () => {
    contactLabel[i].classList.remove("contact__label--error");
    errorIcon[i].classList.remove("contact__error-icon--show");
    errorMessage[i].classList.remove("contact__error--show");
  });
}

comment.addEventListener("focus", () => {
  comment.classList.remove("contact__comment--error");
  errorMessage[2].classList.remove("contact__error--show");
});

//*---------------------------------- Fin de enviar Formulario  --------------------------/
