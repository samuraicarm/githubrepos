  'use strict';
  let gitLink = " ";

  $(document).ready(function(){
    console.log("ready");
  });

  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });

  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
     let userInput = getUser();
      updateURL(userInput);
      getGitRepo(); 
    });

  }

  //get value from form
  function getUser(){
    let userName = document.getElementById('userInput').value;
    return userName
  }


  //update URL to include form value
  function updateURL(userName){
   gitLink = `https://api.github.com/users/${userName}/repos`;
    console.log(gitLink) 
  } 

  //fetch GitHub info from api

  function getGitRepo() {
    fetch(gitLink)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson))
      .catch(error => alert('GitHub user not found'));
  }


  function displayResults(responseJson) {
    console.log(responseJson);

    for (var i = 0; responseJson.message.length > i; i++)
    {
        let repoName = responseJson.message[i].full_name;
        let repoURL = responseJson.message[i].html_url;

        let repo = document.createElement("p");
        let repoLink = document.createElement("p");

        let text = document.createTextNode(repoName)
        let text = document.createTextNode(repoLink)
        
        repo.appendChild(text);
        repoLink.appendChild(text);

        let element = document.getElementById("repoList");
        element.appendChild(repo);
        element.appendChild(repoURL);
    
    }
  
    //display the results section
    $('.results').removeClass('hidden');
  }
  