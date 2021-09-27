import {getallEpisode, getEpisode, getDetailOfCharacter} from "./api_episode.js";
const title = document.getElementById("header");
title.textContent = "Ricky y Morty API";


async function init() {
 
  const episodes = await getallEpisode();
  console.log(episodes);
  
  for(let i=0; i<episodes.length; i++){
    console.log(episodes[i]);
    const list = document.getElementById("episodeList");
    const listItem = document.createElement("li");
    const itemlink = document.createElement("a");
    itemlink.href="#";
    itemlink.addEventListener("click", function(){getEpisodeDetails(episodes[i].id);return false;});
    itemlink.textContent = "Episode " + episodes[i].id;
    listItem.appendChild(itemlink);
    list.appendChild(listItem);
  }
  const nav = document.getElementById("episodeSection");
  const paginationButton = document.createElement("button");
  paginationButton.textContent = "Load Episodes";
  paginationButton.addEventListener("click", loadEpisodes);
  nav.appendChild(paginationButton);
  getEpisodeDetails(1);    // always loading first episode on page init
}

async function getEpisodeDetails(eNum) {
  console.log(eNum);
  const detailOfEpisode = await getEpisode(eNum);
  console.log(detailOfEpisode);
  const titleOfEpisode = document.getElementById("EpisodeTitle");
  titleOfEpisode.textContent = "Episode " + detailOfEpisode.id ;
  console.log(detailOfEpisode.air_date);
  console.log(detailOfEpisode.episode);
  const dateOfEpisode = document.getElementById("dateNseason");
  dateOfEpisode.textContent=detailOfEpisode.air_date + "  |  " + detailOfEpisode.episode;
  const arrayOfCharacter = detailOfEpisode.characters;
  console.log(arrayOfCharacter);
  var charactersDiv = document.getElementById("Characters");
  charactersDiv.innerHTML = "";
  var row = document.createElement("div");
  row.className ="character_container";
  for(let i=0; i<arrayOfCharacter.length; i++){
    const characterDetail = await getDetailOfCharacter(arrayOfCharacter[i]);
    console.log(characterDetail);   
    const singleCharacterDiv = document.createElement("div");
    singleCharacterDiv.className ="charDetail";
    const characterImage= document.createElement("img");
    characterImage.src = characterDetail.image;
    characterImage.className ="charImage";


    const characterName = document.createElement("h3");
    const namelink = document.createElement("a");
    namelink.href ="#";
    namelink.textContent = characterDetail.name;
    namelink.addEventListener("click", function(){getDetailOfCharacter(id[i]);return false;});
    
    //characterName.textContent = characterDetail.name;
    const Aboutcharacter = document.createElement("h4");
    Aboutcharacter.textContent=characterDetail.species + "  |  " + characterDetail.status;
    characterName.appendChild(namelink);
    singleCharacterDiv.appendChild(characterImage);
    singleCharacterDiv.appendChild(characterName);
    singleCharacterDiv.appendChild(Aboutcharacter);
    

    row.appendChild(singleCharacterDiv);
    if( (i+1)%4 == 0){
      console.log("create new row" + (i));
      charactersDiv.appendChild(row);
      row = document.createElement("div");
      row.className ="character_container";
      }
    }
}

async function loadEpisodes(){
  const numberOfEpisode=document.querySelectorAll("#episodeList li").length;
  console.log("loadEpisodes");
  const episodes = await getallEpisode(numberOfEpisode+1);
  console.log(episodes);
  const list = document.getElementById("episodeList");
  for(let i=0; i<episodes.length; i++){
    const listItem = document.createElement("li");
    const itemlink = document.createElement("a"); // change it later item Itemlink
    itemlink.href="#";
    itemlink.addEventListener("click", function(){getEpisodeDetails(episodes[i].id);return false;});
    itemlink.textContent = "Episode " + episodes[i].id;
    listItem.appendChild(itemlink);
    list.appendChild(listItem); 
  }
}
init();



