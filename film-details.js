import { translateArabicToRomanNumber } from './utilits.js';
import { renderPage, loadResource } from './main.js';

export const render = (data) => {
  console.log("Я детальная страница фильма", data);

  const episodeNumber = translateArabicToRomanNumber(data.episode_id);

  const container = document.createElement("div");
  container.classList.add("container", "py-4");

  const title = document.createElement("h1");
  title.innerHTML = `${episodeNumber} ${data.title}`;

  const descr = document.createElement("p");
  descr.classList.add("lead");
  descr.textContent = data.opening_crawl;

  const backToLink = document.createElement("a");
  backToLink.classList.add("btn", "btn-primary");
  backToLink.textContent = "Back to episodes";

  backToLink.addEventListener("click", (e) => {
    e.preventDefault();
    history.back();
    renderPage(
      "./films-list.js",
      "https://swapi.dev/api/films",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    );
  });

  const planetsPromise = Promise.all(data.planets.map(url => loadResource(url)));
  const speciesPromise = Promise.all(data.species.map(url => loadResource(url)));
  const starshipsPromise = Promise.all(data.starships.map(url => loadResource(url)));

  const planetsWrapper = document.createElement('div');
  planetsWrapper.classList.add('col');

  const preloader = document.createElement('p');
  preloader.textContent = 'Загрузка...';

  const planetsTitle = document.createElement('h2');
  planetsTitle.textContent = 'Planets';

  const ulPlanets = document.createElement("ul");
  ulPlanets.classList.add("planets-list");

  planetsPromise.then((planets) => {
    const planetsElems = planets.map((planet) => {
      const li = document.createElement("li");
      li.textContent = planet.name;
      return li;
    });
    preloader.remove()
    ulPlanets.append(...planetsElems);
  });

  planetsWrapper.append(planetsTitle, preloader, ulPlanets);


  const speciesWrapper = document.createElement('div');
  speciesWrapper.classList.add('col');

  const speciesTitle = document.createElement('h2');
  speciesTitle.textContent = 'Species';

  const preloader2 = preloader.cloneNode(true);

  const ulSpecies = document.createElement("ul");
  ulSpecies.classList.add("species-list");

  speciesPromise.then((species) => {
    const speciesElems = species.map((specie) => {
      const li = document.createElement("li");
      li.textContent = specie.name;
      return li;
    });
    preloader2.remove()
    ulSpecies.append(...speciesElems);
  });

  speciesWrapper.append(speciesTitle, preloader2, ulSpecies);


  const starshipsWrapper = document.createElement('div');
  starshipsWrapper.classList.add('col');

  const starshipsTitle = document.createElement('h2');
  starshipsTitle.textContent = 'Starships';

  const preloader3 = preloader.cloneNode(true);

  const ulStarships = document.createElement("ul");
  ulStarships.classList.add("starships-list");

  starshipsPromise.then((starships) => {
    const starshipsElems = starships.map((starship) => {
      const li = document.createElement("li");
      li.textContent = starship.name;
      return li;
    });
    preloader3.remove()
    ulStarships.append(...starshipsElems);
  });

  starshipsWrapper.append(starshipsTitle, preloader3, ulStarships);

  const detailsWrapper = document.createElement('div');
  detailsWrapper.classList.add('container', 'row');

  detailsWrapper.append(planetsWrapper, speciesWrapper, starshipsWrapper);
  container.append(title, descr, detailsWrapper, backToLink);

  return container;
};
