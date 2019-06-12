const baseURL = `http://localhost:3000/pups/`;
const dogBar = document.querySelector("#dog-bar");

function getDogs() {
  return fetch(baseURL).then(data => data.json());
}

function getSingleDog(id) {
  return fetch(baseURL + `${id}`).then(data => data.json());
}

function addDogSpanToDogBar(dog) {
  const dogSpan = document.createElement("span");
  dogSpan.innerText = dog.name;
  dogSpan.dataset.id = dog.id;

  dogSpan.addEventListener("click", onDogSpanClick);
  dogBar.append(dogSpan);
}

function onDogSpanClick(e) {
  getSingleDog(e.target.dataset.id).then(renderDog);
}

function renderDog(dog) {
  const dogInfo = document.querySelector("#dog-info");
  dogInfo.innerHTML = "";

  const dogImg = document.createElement("img");
  dogImg.src = dog.image;

  const dogTitle = document.createElement("h2");
  dogTitle.innerText = dog.name;

  const dogButton = document.createElement("button");
  dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  dogButton.dataset.id = dog.id;
  dogButton.addEventListener("click", () => updateDogStatus(dog));

  dogInfo.append(dogImg, dogTitle, dogButton);
}

function updateDogStatus(dog) {
  dog.isGoodDog = !dog.isGoodDog;
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dog)
  };
  fetch(baseURL + `${dog.id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(renderDog);
}

function addDogsToDogBar(dogArray) {
  dogBar.innerHTML = "";
  dogArray.forEach(addDogSpanToDogBar);
}

function init() {
  console.log("Hello not so awesome developer");
  getDogs().then(addDogsToDogBar);
}

init();
