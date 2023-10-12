//!Module permettant de scrapper un site à partir de liens sur une page d'un site.
//!Remplacer le contenu des données dans les champs 'A compléter' : l'url , le tableau urlParams et les sélecteurs
//Pour récupérer les sélecteurs sur les pages cibles, ouvrir l'inspecteur sur le site, faire clic droit sur une des balises lien puis copier le sélector. Coller le sélector dans ...
//Le fichier résultat sera enregistré dans data_save

const puppeteer = require('puppeteer');
const fs = require('fs');

//Récupérer les url des pages à scrapper
async function getAllUrl(browser) {

    //Configuration
    const page = await browser.newPage();

    //Cibler le site
    await page.goto('http://books.toscrape.com/') //!A compléter.
    await page.waitForSelector('body'); //Attendre le chargement de la page

    //Cibler les url 
    const result = await page.evaluate(() =>
      [...document.querySelectorAll('.product_pod a')].map(link => link.href), //!A compléter
    )
    return result
  }

//Scrapper une page
async function getData(browser, url) {
    //Configuration de puppeteer
    const page = await browser.newPage();

    //Se rendre sur le site
    await page.goto(url); 
    await page.waitForSelector('body');

    //Récupération du contenu de l'élément
    const result = await page.evaluate(() => {
        //!A compléter. Remplacer les variables par celles souhaitées
        let title = document.querySelector('h1').innerText; 
        let price = document.querySelector('.price_color').innerText;
        return {title, price};
    });
    return result;
}

//La fonction complète
async function scrap() {
    const browser = await puppeteer.launch({headless:false});
    const urls = await getAllUrl(browser);
    const results = await Promise.all(
        urls.map(url => getData(browser, url))
    )
    browser.close();
    return results;
}

// Appel à la fonction
scrap().then((data) => {
    const timestamp = Date.now();
    const formattedTimestamp = formatTimeStamp(timestamp);
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

