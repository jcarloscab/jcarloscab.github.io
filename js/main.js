// variables
const projectSection = document.getElementById("projects");

// presentar projectos
const showProjects = async () => {
  const datas = await (await fetch("./projects.txt")).json();
  const arrayProjects = datas.projects;
  const projectsFragment = document.createDocumentFragment();
  const projectsContainer = document.createElement("div");
  projectsContainer.setAttribute("class", "projects__cards");

  // rellenamos el contenedor de proyectos solo con los 12 primeros proyectos si los hubiera.
  const projects = arrayProjects.filter((project, index) => index < 12);

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
    projectsContainer.appendChild(projectContainer);
  });
  projectsFragment.appendChild(projectsContainer);
  projectSection.appendChild(projectsFragment);
};

showProjects();
