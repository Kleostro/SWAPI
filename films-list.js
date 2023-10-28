import { renderPage } from './main.js';

export const render = async (data) => {

    console.log(data)
    const films = data.results;
    const container = document.createElement('div');
    container.classList.add(
      'container',
      'd-flex',
      'justify-content-between',
      'flex-wrap',
      'py-4'
    );
      let filmID = 0;
    for (const film of films) {
      console.log(film)
      filmID++

      const url = filmID;
      const card = document.createElement('div');
      card.classList.add('card', 'my-2');
      card.style.width = '33%';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = `${filmID}. ${film.title}`;

      const cardLink = document.createElement('a');
      cardLink.classList.add('btn', 'btn-primary');
      cardLink.href = `?film=${filmID}/`;
      cardLink.textContent = 'Подробнее';
      cardLink.addEventListener('click', e => {
        e.preventDefault()
        history.pushState(null, '', cardLink.href)
        history.go()
        renderPage(
          './film-details.js',
          `https://swapi.dev/api/films/${url}`,
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
      );
      })

      cardBody.append(cardTitle, cardLink);
      card.append(cardBody);
      container.append(card);
    }
    return container;
};