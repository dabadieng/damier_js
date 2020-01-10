
//le personnage
/**
 * Crée une table de nbLigexnbColonne avec un taux de mur de pmur
 * @param {integer} nbLigne nombre de ligne
 * @param {integer} nbColonne ,ombre de colonne
 * @param {integer} pmur pourcentage de mur dans le tableau
 */
function creerDamier(nbLigne, nbColonne, pmur) {
    let t = document.createElement("table");
    t.style.border = "1px solid #444";
    document.body.appendChild(t);
    for (let i = 0; i < nbLigne; i++) {
        let l = document.createElement("tr");
        t.appendChild(l);
        for (let j = 0; j < nbColonne; j++) {
            let c = document.createElement("td");
            c.style.border = "1px solid #777";
            c.style.width = "40px";
            c.style.height = "40px";
            if (100 * Math.random() < pmur)
                c.dataset.type = "mur";
            else
                c.dataset.type = "vide";

            //c.tabindex=1;
            if ((i + j) % 2 == 0) {
                c.style.backgroundColor = "#67E";
            } else {
                c.style.backgroundColor = "#E67";
            }

            if (c.dataset.type == "mur") {
                c.style.backgroundColor = "#666";
            }

            l.appendChild(c);
        }
    }
    return t;
}

function distance(x, y, a, b) {
    return Math.abs(x - a) + Math.abs(y - b);
}

/**
 * Créer une balise img
 * @param {string} imgurl 
 * @param {string} alt 
 */
function creerImage(imgurl, alt) {
    let img = document.createElement("img");
    img.src = imgurl;
    img.style.width = "40px";
    img.style.height = "40px";
    img.alt = alt;
    return img;
}


function clavier(e) {
    let x = perso.dataset.x;
    let y = perso.dataset.y;

    if (e.key == "ArrowRight") {
        if (perso.dataset.x < damier.rows[0].cells.length - 1) {
            x++;
        }
    } else if (e.key == "ArrowLeft") {
        if (perso.dataset.x > 0) {
            x--;
        }
    } else if (e.key == "ArrowUp") {
        if (perso.dataset.y > 0) {
            y--;
        }
    } else if (e.key == "ArrowDown") {
        if (perso.dataset.y < damier.rows.length - 1) {
            y++;
        }
    }

    if (damier.rows[y].cells[x].dataset.type == "mur") {
        sonpas.src = "mur.mp3";
        sonpas.play();
        etat.innerHTML = "x=" + perso.dataset.x + " y=" + perso.dataset.y + " vous avez cogné un mur";
        etat.focus();
        return;
    } else {
        deplacerImage(perso, x, y);
        sonpas.src = "pas.mp3";
        sonpas.play();

        for (let i = 0; i < meute.length; i++) {
            let tab = calculDeplacementLoup(x, y, meute[i].dataset.x, meute[i].dataset.y);
            let a = tab[0];
            let b = tab[1];
            //ne rentre pas dans les murs
            if (damier.rows[b].cells[a].dataset.type != "mur") {
                deplacerImage(meute[i], a, b);                
                if (a == x && b == y) {
                    document.body.removeEventListener("keydown", clavier);
                    perso.parentElement.removeChild(perso);
                    damier.innerHTML = "";
                    meute[i].style.width = "500px";
                    meute[i].style.height = "500px";
                    document.body.appendChild(meute[i]);
                    etat.innerHTML = "<br>Le loup mange le perso";
                }
            }
        }
    }
}

function calculDeplacementLoup(x, y, a, b) {
    let dx = Math.abs(x - a);
    let dy = Math.abs(y - b);
    if (dx >= dy) {
        if (a > x) {
            a--;
        } else if (a < x) {
            a++;
        }
    } else {
        if (b > y) {
            b--;
        } else if (b < y) {
            b++;
        }
    }
    return [a, b];
}

/**
 * Déplace le perso en x,y et mets à jours la div etat
 * @param {} x 
 * @param {*} y 
 */
function deplacerImage(obj, x, y) {
    obj.dataset.y = y;
    obj.dataset.x = x;
    damier.rows[obj.dataset.y].cells[obj.dataset.x].appendChild(obj);
}

//Initialisation
document.body.addEventListener("keydown", clavier);
let damier = creerDamier(8, 8, 10);
let perso = creerImage("perso.png", "perso");
let meute = [];
for (let i = 0; i < 1; i++) {   //gestion du nombre de loup
    meute.push(creerImage("loup.png", "loup " + i));
}

let etat = document.getElementById("etat");
let sonpas = document.createElement("audio");

//initialise le personnage dans le damier
damier.rows[0].cells[0].dataset.type = "vide";
deplacerImage(perso, 0, 0);
for (let i = 0; i < meute.length; i++) {
    deplacerImage(meute[i], i, 7);
}




