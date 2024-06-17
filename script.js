const starWarsApi = 'https://swapi.dev/api/people/?search=';
const userInput = document.querySelector('.input');
const userInputButton = document.querySelector('.input-button');
const output = document.querySelector('.output');
const info = document.querySelector('.info');
let articleCount = 1;

userInputButton.addEventListener('click', getAPI)

async function getAPI(){
    let inputValue = starWarsApi + userInput.value;
    const result = await fetch(inputValue)
    const data = await result.json();
    console.log(data)
    if(data.count === 0){
        info.innerText = "Oops! I can't find anyone called " + userInput.value + ". Check your spelling or write only a part of their name and I'll try to find whoever best fits the character you're looking for.";
        return;
    }
    for(let i = 0; i < data.count; i++) {
        let character = data.results[i];
        let species = "";
        //console.log(character.species)
        if(character.species.length > 0) {
            let resultSpecies = await fetch(character.species[0]);
            let dataSpecies = await resultSpecies.json();
            console.log(dataSpecies)
            species = dataSpecies.name;
        }
        else{
            species = "human";
        }
        outputCharacter(character, species)
    }
}


function outputCharacter(character, species){
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let article = document.createElement('article')
    let id = "search-result-" + articleCount;
    article.id = id;

    h2.innerText = character.name;
    p.innerText = character.name + ", born " + character.birth_year + ", is a " + character.gender + " " + species + ". They are " + character.height + " centimeters tall and weight " + character.mass + " kilograms.";

    output.insertBefore(article, output.firstChild)
    article.appendChild(h2);
    article.appendChild(p);
    info.innerText = "";

    articleCount++;
}