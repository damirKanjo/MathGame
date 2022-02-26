let rezultat;                /** Resenje zadatka  */
let i = -1;                   /** Tacni odgovori */
let odgovor = 0;             /** Sluzi da bi se ukoliko neko vise puta pritisne submit sa tacnim odgovorom dobije samo 1 poen */
let blokada = 0;
let skiniPoen = 0;
let pomoc = 0;
let timeout;
let level = 1; 
let nivo = 0;
let a;
let b;
let pokusaj = 0;
let j = 0;

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        myFunction();
    }
});

function randomBroj() {
    document.querySelector(".prvi").style.display = 'none';
    document.getElementById("level").innerHTML = ' Level ' + level;
    document.getElementById("pokusaj").innerHTML = 'Total hints' + "<br>" + pokusaj;
    document.getElementById("rezultat").innerHTML = 'Your score' + "<br>" + j+'/5';
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
            a = Math.floor(Math.random() * 101);
            b = Math.floor(Math.random() * 101);
            rezultat = a - b;
        if ( rezultat < 0) {
            a = Math.floor(Math.random() * 101);
            b = Math.floor(Math.random() * 101);
        }
        else {
            document.getElementById("brojevi").innerHTML = 'What is the difference of ' + ' ' + a + ' ' + b + '?';
        }
        break;

        case 2:
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        rezultat = a * b;
        document.getElementById("brojevi").innerHTML = 'What is the product of ' + ' ' + a + ' ' + b + '?';
        break;

        case 3:
        while (a % b == 0) {
            a = Math.floor(Math.random() * 101);
            b = Math.floor(Math.random() * 101);
            rezultat = a / b;
            break;
        }
        document.getElementById("brojevi").innerHTML = 'What is the quotinet of ' + ' ' + a + ' ' + b + '?';
        break;
    }
    document.getElementById("resenje").innerHTML = "Check result";
    odgovor = 0;
    blokada = 0;
    pomoc = 0;
    console.log(a, b)
}

let skup = document.getElementsByClassName("krug");

function myFunction() {
    let x = document.getElementById("numb").value;
    let text;

    if (x === "" || isNaN(x)) {
        text = "Enter the number and try again!";
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
            j +=1;
        }
        else { 
            text = "Click 'Next' for another pair of numbers."
            prozor.style.backgroundColor = "lightgreen";
        }
    }
    document.getElementById("demo").innerHTML = text;
    document.getElementById("pokusaj").innerHTML = 'Total hints' + "<br>" + pokusaj;
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
    console.log(i, j);
}

function resenje() {
    let res = rezultat.toString();
    let upis = document.getElementById("resenje");
    upis.innerHTML = res;
    pomoc = 1;
    i == 5 ? upis.innerHTML = 'GO NEXT!' : upis.innerHTML = res;;
}


function prelazakLevela() {
    document.querySelector(".uNoviLevel").style.display ='none';
    document.querySelector(".prvi").style.display = 'none';
    document.querySelector(".result").style.display = 'none';
    document.querySelector(".pod1").style.display = 'none';
    document.querySelector(".pod2").style.display = 'none';

    let height = parent.innerHeight;
    let visina = (height - 100) / 2;
    let prelaz = document.querySelector(".prelazak");
    prelaz.style.paddingTop = visina + 'px';
    prelaz.style.height = height + "px";
    prelaz.style.display = 'block';
    prelaz.style.background = "#e8c566";

    document.querySelector(".prelazak").style.display = 'block';
    document.querySelector(".loader").style.display = 'block';

    pokusaj = 0;
    nivo += 1;
    level += 1;
    j = 0;
    setTimeout(sledeciLevel, 5000);
}

function sledeciLevel() {
    document.querySelector(".prelazak").style.display = 'none';
    document.querySelector(".loader").style.display = 'none';

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
    console.log(i);
}