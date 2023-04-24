// variables generales
const projectsContainer = document.getElementById("projects");
const btn = document.getElementById("submit");
const buttonMoreContainer = document.getElementById("more-projects");
let lastIndex = 0;

//* presentar projectos

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

  // si existen más proyectos para cargar añadimos un botón para poder cargarlos.
  if (lastIndex < arrayProjects.length) {
    buttonMoreContainer.innerHTML = `
    <button id="more" class="button">Cargar más Proyectos</button>`;
    document.getElementById("more").addEventListener("click", moreProjects);
  }
};

showProjects();
// * Fin de Presentar proyectos

//* Enviar Formulario
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const serviceID = "default_service";
    const templateID = "template_ofnfhyd";
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");
    const contactLabel = document.querySelectorAll(".contact__label");
    const errorIcon = document.querySelectorAll(".contact__error-icon");
    const errorMessage = document.querySelectorAll(".contact__error");

    if (!name.value) {
      errorMessage[0].textContent = "Debes introducir un Nombre";
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
//* Fin de enviar Formulario
