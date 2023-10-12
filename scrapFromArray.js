//!Module permettant de scrapper un site à partir d'un tableau de valeurs et de routes paramétrées.
//!Remplacer le contenu des données dans les champs 'A compléter' : l'url , le tableau urlParams et les sélecteurs
//Pour récupérer les sélecteurs sur les pages cibles, ouvrir l'inspecteur sur le site, faire clic droit sur une des balises lien puis copier le sélector. Coller le sélector dans ...
//Le fichier résultat sera enregistré dans data_save

const puppeteer = require('puppeteer');
const fs = require('fs');

//!Récupération du tableau urlParams (si nécessaire) via bdd, JSON...

// Les données à scrapper
const url = 'http://books.toscrape.com/' //! A compléter
const urlParams = [ //! A compléter
    'catalogue/a-light-in-the-attic_1000/index.html', 
    'catalogue/tipping-the-velvet_999/index.html',
];

//Scrapper une page
async function scrap(urlParams) {    
    const browser = await puppeteer.launch({headless:false});
    const allDatas = [];

    for (let param of urlParams) {
        const page = await browser.newPage();

        //Se rendre sur le site 
        await page.goto(url+param);
        await page.waitForSelector('body');

        //Récupération du contenu de l'élément
        const result = await page.evaluate(() => {
            //! A compléter
            let title = document.querySelector('h1').innerText;
            let price = document.querySelector('.price_color').innerText;
            return {title, price};
        });
        allDatas.push(result);
    }
    browser.close();
    return allDatas;
}

// Appel à la fonction
scrap(urlParams).then((data) => {
    const timestamp = Date.now();
    const formattedTimestamp = formatTimeStamp(timestamp);
    console.log(formattedTimestamp);
    const fileName = `data_save/dataFromScrap-${formattedTimestamp}.json`;

    fs.writeFile(fileName , JSON.stringify(data , null, 2) , (err) =>{
        if (err) {
            console.error('Une erreur est survenue lors de l\'écriture du fichier');
        }
        else {
            console.log('Données sauvegardées dans le fichier allDataFromScrap.json')
        }
    })
}).catch(err => console.log(err));

function formatTimeStamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}__${hours}h${minutes}m${seconds}s`;
}

