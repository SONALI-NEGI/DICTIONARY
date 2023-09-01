let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

// accessing all id's
let wordToSearch = document.querySelector("#word-to-search");
let searchBtn = document.querySelector("#search-btn");
let wordElement = document.querySelector("#word");
let audioBtn = document.querySelector("audio");
let pronunciation = document.querySelector("#phonetic");
let wordMeaning = document.querySelector("#meaning");
let wordExample = document.querySelector("#example");

let wordOrigin = document.querySelector("#origin");
let partOfSpeech = document.querySelector("#part-of-speech");
let wordAntonyms = document.querySelector("#antonyms");
let wordSynonyms = document.querySelector("#synonyms");



// add event listener in searchBtn
searchBtn.addEventListener("click", async()=>{
  console.log(wordToSearch.value);
  let wordData = await getWordData(wordToSearch.value);
  console.log(wordData);
    
  // main display block when button is clicked 
  let mainStyles = document.querySelector("main");
  mainStyles.style.display = "block";

  let errorMessage = document.querySelector("#error-message");
  errorMessage.innerText = "";
  if(wordData === null){
    errorMessage.innerText = "No Data Found";
    return;
  }
  
  
  
  if(wordData && wordData.length >0){
    // wordElement
    
    if(wordData && wordData[0].word){
      let wordElementText = wordData[0].word;
      wordElement.innerText = wordElementText;
    }else{
      wordElement.innerText = "";
    }




    // audioBtn
    if(wordData && wordData[0].phonetics[0].audio){

      let audioBtnText = wordData[0].phonetics[0].audio;
      audioBtn.src = audioBtnText;
      audioBtn.style.display = "inline";
    }else{
      audioBtn.style.display = "none";
      audioBtn.src = "";
    }
    
    // pronunciation
    if(wordData && wordData[0].phonetics[0].text){
      let pronunciationText = wordData[0].phonetics[0].text;
      pronunciation.innerText = pronunciationText;
    }else{
      pronunciation.innerText ="";
    }
  
    if(wordData && wordData[0].meanings[0].definitions[0].definition){
      let wordMeaningText = wordData[0].meanings[0].definitions[0].definition;
      wordMeaning.innerHTML = `<strong>Meaning :</strong> ${wordMeaningText} <hr>`;
    }else{
      wordMeaning.innerHTML ="";
    }
    
     // wordExample
    if(wordData && wordData[0].meanings[0].definitions[0].example){
      let wordExampleText = wordData[0].meanings[0].definitions[0].example;
      wordExample.innerHTML = `<strong>Example :</strong> ${wordExampleText} <hr>`;
    }else{
      wordExample.innerHTML ="";
    }
    
     // wordOrigin
     if(wordData && wordData[0].origin){
      let wordOriginText = wordData[0].origin;
      wordOrigin.innerHTML = `<strong>Origin :</strong> ${wordOriginText} <hr>`;
    }else{
      wordOrigin.innerHTML ="";
    }
    
    // part-of-speech
    if(wordData && wordData[0].meanings[0].partOfSpeech){
      let partOfSpeechText = wordData[0].meanings[0].partOfSpeech;
      partOfSpeech.innerHTML = `<strong>Part of Speech :</strong> ${partOfSpeechText} <hr>`;
    }else{
      partOfSpeech.innerHTML ="";
    }

     // wordAntonyms
     if(wordData && wordData[0].meanings[0].definitions[0].antonyms){
      let wordAntonymsText = wordData[0].meanings[0].definitions[0].antonyms;
      wordAntonyms.innerHTML = `<strong>Antonyms :</strong> ${wordAntonymsText} <hr>`;
    }else{
      wordAntonyms.innerHTML ="";
    }

     // wordSynonyms
     if(wordData && wordData[0].meanings[0].definitions[0].synonyms){
      let wordSynonymsText = wordData[0].meanings[0].definitions[0].synonyms;
      wordSynonyms.innerHTML = `<strong>Synonyms :</strong> ${wordSynonymsText} <hr>`;
    }else{
      wordSynonyms.innerHTML ="";
    }
    
  }
}) 


// async function to get word data 
async function getWordData(wordToSearch){
  try{
    const config = { headers: { Accept: "application/json" } }
    let res = await axios.get(url+wordToSearch);
    // console.log(res.data);
    return res.data;
  }catch(err){
    console.log(`Error: ${err.message}`);
    
    return null;
  }
}


  wordToSearch.addEventListener("input",reset);
  async function reset(){
    wordElement.innerText = "";
    audioBtn.src = "";
    audioBtn.style.display = "none";
    pronunciation.innerText = "";
    wordMeaning.innerHTML = "";
    wordExample.innerHTML = "";
    wordOrigin.innerHTML = "";
    partOfSpeech.innerHTML = "";
    wordAntonyms.innerHTML = "";
    wordSynonyms.innerHTML = "";
  }

