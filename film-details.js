function addPageBackgroundImg(id) {
  let bodyElement = document.body;
  bodyElement.style.minHeight = "100%";
  bodyElement.style.backgroundImage = "linear-gradient(rgba(167, 162, 162, 0.986), rgba(184, 153, 153, 0.6)), url('./img/Episod_" + id + ".jpg')";
  bodyElement.style.backgroundSize = "cover";
  bodyElement.style.backgroundRepeat = "no-repeat";
};


export function render(data, filmDetailsObj) {
  // backgraund:
  addPageBackgroundImg(data.episode_id);

  // content:
  let { planets, species} = filmDetailsObj;

  const container = document.createElement('div');
  document.getElementById('catalog').append(container);
  container.classList.add('container', 'py-4');
  container.innerHTML = `
  <h1>${data.title}, episod id ${data.episode_id}</h1>
  <p> ${data.opening_crawl}</p>
  <h2> Planets:</h2>
  <ul id="planet-list"></ul>
  <h2> Species: </h2>
  <ul id="species-list"></ul>
  `;

  planets.forEach(planet => {
    const planetNameElement = document.createElement('li');
    planetNameElement.textContent = planet;
    document.getElementById("planet-list").append(planetNameElement);
  });

  species.forEach(specie => {
    const specieNameElement = document.createElement('li');
    specieNameElement.textContent = specie;
    document.getElementById("species-list").append(specieNameElement);
  });

  //button Back to list:
  const backToListBtn = document.createElement('button');
  backToListBtn.classList.add('btn', 'btn-dark');
  backToListBtn.textContent = '<< Back to episodes';
  container.append(backToListBtn);

  backToListBtn.addEventListener('click', () => {
    history.back();
  });

  return container;
}


