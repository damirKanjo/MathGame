let rezultat;                /** Resenje zadatka  */
let i = -1;                   /** Tacni odgovori */
let odgovor = 0;             /** Sluzi da bi se ukoliko neko vise puta pritisne submit sa tacnim odgovorom dobije samo 1 poen */
let blokada = 0;

let skiniPoen = 0;           //skida samo 1 poen kada se unese netacan odgovor
let pomoc = 0;               // korisnik je pogledao rezultat u checkboxu, poen se ne dobija
let level = 1;               // broj levela na kome se nalazi igrac
let nivo = 0;                // broj nivoa koji treba da se ucita shodno napretku
let a;                       // random broj
let b;                       //random broj
let pokusaj = 0;             // broj pokusaja tokom levela
let j = 0;                   // upisivanje trenutnog rezultata u polje YOUR SCORE 
let ukupnoPokusaja = 0;      // totali broj pokusaja u svim levelima

let bezOdgovora = 0;           // ove dve su za brojanje preskoka bez odgovora
let preskoceno = -1;


document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        myFunction();
    }
});

function randomBroj() {
    document.querySelector(".prvi").style.display = 'none';
    document.getElementById("level").innerHTML = ' Level ' + level;
    document.getElementById("pokusaj").innerHTML = 'Hints' + "<br>" + pokusaj;
    document.getElementById("rezultat").innerHTML = 'Your score' + "<br>" + j+'/5';

    bezOdgovora == 0 && document.getElementById("numb").value == '' ? preskoceno++ : bezOdgovora == 1;
    bezOdgovora = 0;
    /** Brise rezultat iz kutije i poruku */
    document.getElementById("numb").value = '';
    document.getElementById("demo").innerHTML = '';
    prozor = document.querySelector(".checkBox");
    /** Vraca boju kutije iz zelene/crvvene nazad u neutralnu-belu */
    prozor.style.backgroundColor = "white";
    /** Biraju se random brojevi, ispisuje se poruka sa upitom koliki je njihov zbir*/
    switch(nivo)
    {
        case 0:
            a = Math.floor(Math.random() * 101);
            b = Math.floor(Math.random() * 101);
            rezultat = a + b;
            document.getElementById("brojevi").innerHTML = 'What is the sum of ' + ' ' + a + ' ' + b + '?';
        break;
        

        case 1:
            do {
                a = Math.floor(Math.random() * 101);
                b = Math.floor(Math.random() * 101);
               }
               while ( a < b ) {
                    document.getElementById("brojevi").innerHTML = 'What is the difference of ' + ' ' + a + ' ' + b + '?';
                    rezultat = a - b;
                }
        break;

        case 2:
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            rezultat = a * b;
            document.getElementById("brojevi").innerHTML = 'What is the product of ' + ' ' + a + ' ' + b + '?'; 
        break;

        case 3:
            do {
                a = Math.floor(Math.random() * 201);
                b = Math.floor(Math.random() * 201);
            }
            while (a % b > 0 || b == 0 || a == 0) {
                rezultat = a / b;
                document.getElementById("brojevi").innerHTML = 'What is the quotinet of ' + ' ' + a + ' ' + b + '?';
            }
        break;
    }
    document.getElementById("resenje").innerHTML = "Check result";
    odgovor = 0;
    blokada = 0;
    pomoc = 0;
    console.log(preskoceno, pokusaj);
}

let skup = document.getElementsByClassName("krug");

function myFunction() {
    let x = document.getElementById("numb").value;
    let text;
    bezOdgovora = 1;

    if (x === "" || isNaN(x)) {
        text = "Enter the number and try again!";
        prozor.style.backgroundColor = "white";
    }
    /** Proverava se uneti rezultat sa tacnim, shodno tome dobija se zelena ili crvena pozadina i odgovarajuca poruka*/
    else if (x != rezultat && blokada == 0) {
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
            j == 0 ? j = 0 : j -= 1;
        }
        ukupnoPokusaja +=1;
        bezOdgovora = 1;
        pokusaj += 1;
    } 
    else {
        skiniPoen = 0;
        if(odgovor == 0 && pomoc == 0) {
            text = "Corect!";
            prozor.style.backgroundColor = "lightgreen";
            i = i + 1;
            skup[i].style.backgroundColor = "yellow";
            odgovor = 1;
            blokada = 1;
            pokusaj += 1;
            ukupnoPokusaja +=1;
            j +=1;
            bezOdgovora = 1;
        }
        else { 
            text = "Click 'Next' for another pair of numbers."
            prozor.style.backgroundColor = "lightgreen";
        }
    }
    document.getElementById("demo").innerHTML = text;
    document.getElementById("pokusaj").innerHTML = 'Hints' + "<br>" + pokusaj;
    document.getElementById("rezultat").innerHTML = 'Your score' + "<br>" + j+'/5';

    if(i == 4) {
        for(i = 0; i < skup.length; i++){
            document.querySelector(".drugi").style.display = 'none';
            document.querySelector(".prvi").style.display = 'block';
            skup[i].style.display = 'none';
            document.querySelector(".checkBox").style.display = 'none';
            document.querySelector(".uNoviLevel").style.display ='block';
        }
    } else {i=i;}
}

function resenje() {
    let res = rezultat.toString();
    let upis = document.getElementById("resenje");
    upis.innerHTML = res;
    pomoc = 1;
    i == 5 ? upis.innerHTML = 'GO NEXT!' : upis.innerHTML = res;;
}


function prelazakLevela() {

    pokusaj = 0;
    nivo += 1;
    level += 1;
    preskoceno = preskoceno - 1;
    j = 0;

    document.querySelector(".uNoviLevel").style.display ='none';
    document.querySelector(".prvi").style.display = 'none';
    document.querySelector(".result").style.display = 'none';
    document.querySelector(".pod1").style.display = 'none';
    document.querySelector(".pod2").style.display = 'none';

    let height = parent.innerHeight;
    let visina = (height / 2) - 87 ;
    let prelaz = document.querySelector(".prelazak");
    prelaz.style.paddingTop = visina + 'px';
    prelaz.style.height = height + "px";
    prelaz.style.display = 'block';
    prelaz.style.background = "#e8c566";

    document.querySelector(".prelazak").style.display = 'block';
    document.querySelector(".loadFirst").style.display = 'inline-block';
    document.querySelector(".loadSecond").style.display = 'inline-block';
    document.querySelector(".loadThird").style.display = 'inline-block';

    if (level < 5) {
        document.getElementById("loadLevel").innerHTML = 'Next level loading...';
        setTimeout(sledeciLevel, 5200);
    }
    else {
        level = 1;
        nivo = 0;
        preskoceno = preskoceno + 1;
        prelaz.style.paddingTop = (visina-50) + 'px';
        document.querySelector(".loadFirst").style.display = 'none';
        document.querySelector(".loadSecond").style.display = 'none';
        document.querySelector(".loadThird").style.display = 'none';
        document.getElementById("loadLevel").innerHTML = '';
        let zbir = ukupnoPokusaja-20;
        document.getElementById("loadLevel").innerHTML = '“Congratulations and BRAVO!”' + "<br>" + "<br>"
                                                         + 'Your total hits are: ' + ukupnoPokusaja + "/20" + "<br>"
                                                        +"which means you made " + zbir + " mistakes!" + "<br>"
                                                         +'Times you skiped task without answering: ' + preskoceno;
        document.getElementById("playAgain").style.display = 'block';
        document.getElementById("playAgain").innerHTML = "PLAY AGAIN";
        ukupnoPokusaja = 0;
        preskoceno = 0;
    }
}

function sledeciLevel() {
    document.querySelector(".prelazak").style.display = 'none';
    document.querySelector(".loadFirst").style.display = 'none';
    document.querySelector(".loadSecond").style.display = 'none';
    document.querySelector(".loadThird").style.display = 'none';

    document.querySelector(".checkBox").style.display = 'block';
    document.querySelector(".drugi").style.display = 'block';
    document.querySelector(".pod1").style.display = 'inline-block';
    document.querySelector(".pod2").style.display = 'inline-block';
    i = 0;
    for(i = 0; i <= 4; i++) {
        skup[i].style.display = 'inline-block';
        skup[i].style.backgroundColor = "white";
    }

    document.querySelector(".result").style.display = 'block';
    document.getElementById("resenje").innerHTML = "Check result";
    i = -1;
    randomBroj();
    randomBroj();
}