const puppeteer = require('puppeteer');
const fs = require('fs');

//Pour récupérer les sélecteurs, ouvrir l'inspecteur sur le site, faire clic droit sur la balise à sélectionner puis copier le sélector.

//Récupérer les url des pages à scrapper
async function getAllUrl(browser) {

    //Configuration
    const page = await browser.newPage();

    //Cibler le site
    await page.goto('http://books.toscrape.com/')
    await page.waitForSelector('body'); //Attendre le chargement de la page

    //Cibler les url 
    const result = await page.evaluate(() =>
      [...document.querySelectorAll('.product_pod a')].map(link => link.href),
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
scrap()
    .then((data) => {
        const timestamp = Date.now();
        const fileName = `data_save/dataFromScrap-${timestamp}.json`
            fs.writeFile(fileName , JSON.stringify(data , null, 2) , (err) =>{
                if (err) {
                    console.error('Une erreur est survenue lors de l\'écriture du fichier');
                }
                else {
                    console.log('Données sauvegardées dans le fichier allDataFromScrap.json')
                }
            })
        }
    )
    .catch(err => console.log(err));

