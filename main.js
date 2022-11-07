const cssPromises = {};
const appContainer = document.getElementById('catalog');

const searchParams = new URLSearchParams(location.search);
const filmNumber = searchParams.get('film');

function loadResourse(src) {
  if (src.endsWith('.js')) {  //loading JS module
    return import(src);
  }
  if (src.endsWith('.css')) {  //loading CSS file
    if (!cssPromises[src]) {  //if css unloaded
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res => res.json()); //API
}

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResourse(src)))
    .then(async ([pageModule, data]) => {
      appContainer.innerHTML = '';
      if (filmNumber) {
        //render episode page:
        await getDetailsFilm(data).then((filmDetailsObj) => {
          appContainer.append(pageModule.render(data, filmDetailsObj));
        });
      }
      else {
        //render main page:
        appContainer.append(pageModule.render(data));
      };
      createHeader();
    });
}

function getDetailsFilm(data) {
  let { planets: planetsLinksArr, species: speciesLinksArr } = data;

  return Promise.all([
    //[link, link, link], [link, link, link] > [{}, {}, {}], [{}, {}, {}]
    planetsLinksArr.map((planetLink) => fetch(planetLink).then(res => res.json())),
    speciesLinksArr.map((speciesLink) => fetch(speciesLink).then(res => res.json())),
  ])
    //[{}, {}, {}], [{}, {}, {}] > [arr.name, arr.name, .. ], [arr.name, arr.name, .. ]
    .then(async ([planetsArr, speciesArr]) => {
      let planetsNamesArr = await Promise.all(planetsArr)
        .then((planetsArrData) => planetsArrData.map(planetObj => planetObj.name));

      let speciesNamesArr = await Promise.all(speciesArr)
        .then((speciesArrData) => speciesArrData.map(specieObj => specieObj.name));

      return { planets: planetsNamesArr, species: speciesNamesArr };
    })
}

function createHeader() {
  let headerElem = document.createElement('header');
  headerElem.classList.add('header', 'bg-dark');
  let headerTitle = document.createElement('h1');
  headerTitle.classList.add('text-white');
  headerTitle.textContent = 'Star Wars';
  let mainContent = document.getElementById('main');
  headerElem.append(headerTitle);
  document.body.insertBefore(headerElem, mainContent);

return headerElem;
}

if (filmNumber) {
  //loading episod:
  renderPage(
    './film-details.js',
    `https://swapi.dev/api/films/${filmNumber}`,
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  );
} else {
  //loading list of episodes:
  renderPage(
    './catalog-films.js',
    'https://swapi.dev/api/films/',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  );
};










