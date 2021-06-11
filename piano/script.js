function readTextFile(nume_fisier, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", nume_fisier, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let litere 
let titluri 

async function citireDate() {
    console.log("titluridasdasd")
    await readTextFile("titlu.json", function (text) {
        titluri = JSON.parse(text)
        console.log(titluri.length)
    });


    await readTextFile("tastatura.json", function (text) {
        litere = JSON.parse(text)
    });

    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
}

window.onload = async function start() {
    let container = document.getElementById('container')
    const result =  await citireDate()
    console.log(litere[1])
    console.log(titluri.length)
    console.log(titluri)
    for (let i = 0; i < Object.keys(titluri).length; i++) {
        let name = titluri[i].split(".")[0];
        container.innerHTML += `
                <div class="buton" id="${litere[i]}" onclick="pressClick('${name}')">
                <label>
                  ${litere[i]}<br />
                  <br />
                  <br />
                  <span style=" font-size:0.7em">${name}</span><br />
                </label>
              </div>      
                `
        console.log("123123")
    }
}



function pressClick(nume) {
    var audio = new Audio('sounds/'+nume+'.wav');
    audio.play();
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    let element=document.getElementById(`${keyName}`)
    if(element !== null) 
    {element.onclick()
    element.setAttribute("class", "butonPressed");
    }

})


document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    let element=document.getElementById(`${keyName}`)
    if(element !== null) 
    {element.onclick()
    element.setAttribute("class", "buton");
    }
   

})