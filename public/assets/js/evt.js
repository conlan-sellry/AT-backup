/*
var loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

var yourCodeToBeCalled = function(){
    let APPLICATION_API_KEY='86Z8jUc0Gne3ZZkMi6zATDpUYkSx8MKOmPD6uSpIMhScnoAe5zixIuezxiiTAiQoHWeQssB6Amx2qLzK';
    console.log(APPLICATION_API_KEY);
};

var docBody = document.getElementById("head");

console.log(docBody);
loadJS('https://d10ka0m22z5ju5.cloudfront.net/js/evrythng/5.4.0/evrythng-5.4.0.js', yourCodeToBeCalled, docBody);
*/


//let APPLICATION_API_KEY='86Z8jUc0Gne3ZZkMi6zATDpUYkSx8MKOmPD6uSpIMhScnoAe5zixIuezxiiTAiQoHWeQssB6Amx2qLzK';
let APPLICATION_API_KEY = 'v9chldkQhFhQdHMJh4IEUHQ3ERei9hpUWGSlOinFkYxYmcFxk53M35yKP0sNlQm6xQO8W8oMjkNdXv9i';
console.log(APPLICATION_API_KEY);


let evtScript1 = document.createElement('script');
evtScript1.setAttribute('src', 'https://d10ka0m22z5ju5.cloudfront.net/js/evrythng/5.4.0/evrythng-5.4.0.js');
document.head.appendChild(evtScript1);


setTimeout(function(){
    let evtScript2 = document.createElement('script');
    evtScript2.setAttribute('src', 'https://s3.amazonaws.com/scripts.cs.evrythng.com/another-tomorrow/at-connected.js');
    document.head.appendChild(evtScript2);
}, 5000);

