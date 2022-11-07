export function render(data) {

  let filmCount = 1;
  const filmListGroup = document.createElement('div');
  filmListGroup.classList.add('list-group');

  document.body.style.backgroundImage = "url('./img/Episod_0.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";

  for (const film of data.results) {
    const filmLinkElem = document.createElement('a');

    filmLinkElem.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-secondary');
    filmLinkElem.innerHTML = ``;

    filmLinkElem.href = `?film=${filmCount}`;
    filmLinkElem.textContent = `${filmCount} ${film.title}`;

    filmCount++;
    filmListGroup.append(filmLinkElem);
  }
  return filmListGroup;
}

