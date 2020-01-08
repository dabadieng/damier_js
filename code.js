/**
 * Crée une table de nbLigexnbColonne avec un taux de mur de pmur
 * @param {integer} nbLigne nombre de ligne
 * @param {integer} nbColonne ,ombre de colonne
 * @param {integer} pmur pourcentage de mur dans le tableau
 */
function creerDamier(nbLigne,nbColonne,pmur) {
    let t=document.createElement("table");
    t.style.border="1px solid #444";
    document.body.appendChild(t);
    for(let i=0; i<nbLigne; i++) {
        let l=document.createElement("tr");
        t.appendChild(l);
        for(let j=0; j<nbColonne; j++) {
            let c=document.createElement("td");
            c.style.border="1px solid #777";
            c.style.width="40px";
            c.style.height="40px";
            if (100*Math.random()<pmur)
                c.dataset.type="mur";
            else
                c.dataset.type="vide";

            //c.tabindex=1;
            if ((i+j)%2==0) {
                c.style.backgroundColor="#67E";
            } else {
                c.style.backgroundColor="#E67";
            }

            if (c.dataset.type=="mur") {
                c.style.backgroundColor="#666";
            }

            l.appendChild(c);
        }
    }
    return t;
}

function creerImage(imgurl) {
    let img=document.createElement("img");
    img.src=imgurl;
    img.style.width="40px";
    img.style.height="40px";
    img.alt="perso";
    return img;
}


function clavier(e) {
    let x=image.dataset.x;
    let y=image.dataset.y;

    if (e.key=="ArrowRight") {        
        if (image.dataset.x<damier.rows[0].cells.length-1) {
            x++;                    
        }
    } else if (e.key=="ArrowLeft") {        
        if (image.dataset.x>0) {
            x--;                    
        }
    } else if (e.key=="ArrowUp") {        
        if (image.dataset.y>0) {
            y--;                    
        }
    } else if (e.key=="ArrowDown") {        
        if (image.dataset.y<damier.rows.length-1) {
            y++;                    
        }
    }

    if (damier.rows[y].cells[x].dataset.type=="mur") {
        etat.innerHTML="x=" + image.dataset.x + " y=" + image.dataset.y + " vous avez cogné un mur";
        etat.focus();
        return;
    } else {
        deplacerPerso(x,y);        
    }


}

/**
 * Déplace le perso en x,y et mets à jours la div etat
 * @param {} x 
 * @param {*} y 
 */
function deplacerPerso(x,y) {
    image.dataset.y=y;
    image.dataset.x=x;
    damier.rows[image.dataset.y].cells[image.dataset.x].appendChild(image);
    image.alt="perso en " + image.dataset.x + " " + image.dataset.y;
    etat.innerHTML="x=" + image.dataset.x + " y=" + image.dataset.y;
    etat.focus();
}

//Initialisation
document.body.addEventListener("keydown",clavier);
let damier=creerDamier(20,20,10);
let image=creerImage("perso.png");
let etat=document.getElementById("etat");

//initialise le personnage dans le damier
damier.rows[0].cells[0].dataset.type="vide";
deplacerPerso(0,0);

