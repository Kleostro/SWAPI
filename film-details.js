import { translateArabicToRomanNumber } from './utilits.js';
import { renderPage, loadResource } from './main.js';

export const render = async (data) => {
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

  backToLink.addEventListener("click", async (e) => {
    e.preventDefault();
    history.back();
    await renderPage(
      "./films-list.js",
      "https://swapi.dev/api/films",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    );
  });

  const planetsPromise = Promise.all(data.planets.map(url => loadResource(url)));
  const speciesPromise = Promise.all(data.species.map(url => loadResource(url)));
  const starshipsPromise = Promise.all(data.starships.map(url => loadResource(url)));

  const [planets, species, starships] = await Promise.all([planetsPromise, speciesPromise, starshipsPromise]);

  const planetsWrapper = document.createElement('div');
  planetsWrapper.classList.add('col');

  const ulPlanets = document.createElement("ul");
  ulPlanets.classList.add("planets-list");
  planets.forEach((planet) => {
    const li = document.createElement("li");
    li.textContent = planet.name;
    ulPlanets.append(li);
  });

  const planetsTitle = document.createElement('h2');
  planetsTitle.textContent = 'Planets';

  planetsWrapper.append(planetsTitle, ulPlanets);


  const speciesWrapper = document.createElement('div');
  speciesWrapper.classList.add('col');

  const ulSpecies = document.createElement("ul");
  ulSpecies.classList.add("species-list");
  species.forEach((specie) => {
    const li = document.createElement("li");
    li.textContent = specie.name;
    ulSpecies.append(li);
  });

  const speciesTitle = document.createElement('h2');
  speciesTitle.textContent = 'Species';

  speciesWrapper.append(speciesTitle, ulSpecies);

  const starshipsWrapper = document.createElement('div');
  starshipsWrapper.classList.add('col');

  const ulStarships = document.createElement("ul");
  ulStarships.classList.add("starships-list");
  starships.forEach((starship) => {
    const li = document.createElement("li");
    li.textContent = starship.name;
    ulStarships.append(li);
  });

  const starshipsTitle = document.createElement('h2');
  starshipsTitle.textContent = 'Starships';

  starshipsWrapper.append(starshipsTitle, ulStarships);

  const detailsWrapper = document.createElement('div');
  detailsWrapper.classList.add('container', 'row');

  detailsWrapper.append(planetsWrapper, speciesWrapper, starshipsWrapper);
  container.append(title, descr, detailsWrapper, backToLink);

  return container;
};
