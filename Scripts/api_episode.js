async function getallEpisode(firstEpisode=1){
    console.log(firstEpisode);
    let url = "https://rickandmortyapi.com/api/episode/";
    const lastEpisode = firstEpisode+9;
    for(let i=firstEpisode; i<=lastEpisode; i++){
        url += `${i},`;
    }
    console.log(url);
    //const url = "https://rickandmortyapi.com/api/episode/1,2,3,4,5,6,7,8,9,10";
    const response = await fetch(url);
    const result  = await response.json();
    console.log(result);
    return result;

}

async function getEpisode(episodeNumber){
    const url = "https://rickandmortyapi.com/api/episode/" + episodeNumber;
    const response = await fetch(url);
    const result  = await response.json();
    console.log(result);
    return result;
}
export {getallEpisode , getEpisode};

async function getDetailOfCharacter(url){
    
    const response = await fetch(url);
    const result = await response.json()
    return result;
}
export { getDetailOfCharacter };