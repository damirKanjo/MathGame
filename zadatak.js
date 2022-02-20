let rezultat;                /** Resenje zadatka  */
let i = -1;                   /** Tacni odgovori */
let sledeciIzraz = 0;        /** Detektovanje prelaska na sledeci zadatak */
let odgovor = 0;             /** Sluzi da bi se ukoliko neko vise puta pritisne submit sa tacnim odgovorom dobije samo 1 poen */
let blokada = 0;
let skiniPoen = 0;

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        myFunction();
    }
});

function randomBroj() {
    /** Brise rezultat iz kutije i poruku */
    document.getElementById("numb").value = '';
    document.getElementById("demo").innerHTML = '';
    prozor = document.querySelector(".checkBox");
    /** Vraca boju kutije iz zelene/crvvene nazad u neutralnu-belu */
    prozor.style.backgroundColor = "white";
    /** Biraju se random brojevi, ispisuje se poruka sa upitom koliki je njihov zbir*/
    let a = Math.floor(Math.random() * 101);
    let b = Math.floor(Math.random() * 101);
    rezultat = a + b;
    document.getElementById("brojevi").innerHTML = 'What is the sum of ' + ' ' + a + ' ' + b + '?';
    document.getElementById("resenje").innerHTML = "Check result";
    odgovor = 0;
    blokada = 0;
    console.log(i, blokada, odgovor);
    resenje();
}

function myFunction() {
    let y;
    let stara;
    stara = y;
    let skup = document.getElementsByClassName("krug");
    let x = document.getElementById("numb").value;
    let text;

    if (x === "") {
        text = "Enter your answer and try again!";
    }
    /** Proverava se uneti rezultat sa tacnim, shodno tome dobija se zelena ili crvena pozadina i odgovarajuca poruka*/
    else if (isNaN(x) || x != rezultat && blokada == 0) {
        text = "Wrong answer, try again!"
        prozor.style.backgroundColor = "#FF2121";
        if(i == -1)
        {
            i = -1;
        }
        else if (skiniPoen == 0) { 
            skup[i].style.backgroundColor = "white";  /** 1 znaci da je poen skinut i ukoliko se ponovo pritisne submit bez promene poen se ne skida */
            i = i - 1;
            skiniPoen = 1;
        }
    } 
    else {
        skiniPoen = 0;
        if(odgovor == 0) {
            text = "Corect!";
            prozor.style.backgroundColor = "lightgreen";
            i = i + 1;
            skup[i].style.backgroundColor = "yellow";
            odgovor = 1;
            blokada = 1;
        }
        else { 
            text = "Click 'Next' for another pair of numbers."
            prozor.style.backgroundColor = "lightgreen";
        }
    }
    document.getElementById("demo").innerHTML = text;

    if(i == 4) {
        for(i = 0; i < skup.length; i++){
            skup[i].style.transform = "scale(1.9)";
            let nextLevel = document.getElementById("poruka")
            nextLevel.style.display = 'block';
            nextLevel.innerHTML = 'NEXT LEVEL >>>';
            let promena = document.querySelector(".frame");
            promena.style.backgroundColor = "yellow";
            promena.style.cursor = "pointer";
            skup[i].style.display = 'none';
            prozor.innerHTML = "";
            prozor.style.backgroundColor = "rebekapurple";
            prozor.innerHTML = "WELL DONE!"
        }
    } else {i=i;}
    console.log(i, blokada, odgovor);
}

function resenje() {
    let res = rezultat.toString();
    document.getElementById("resenje").innerHTML = res;
    // if (odgovor == 1) {
    //     odgovor = odgovor;
    // }
    // else {
    //     odgovor = 1;
    // }
}