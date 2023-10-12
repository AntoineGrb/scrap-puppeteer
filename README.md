# scrap-puppeteer
Modules pour scrapper des données sur Internet, à insérer dans un projet. J'ai créé ce module pour permettre une réutilisation simple et pouvoir scrapper facilement et rapidement des données au sein de n'importe quel projet.

Deux modules sont prévus : 
- Un module pour scrapper à partir de liens sur une page d'un site
- Un module pour scrapper à partir d'un tableau et d'une liste de routes paramétrées

## Module scrapFromHomePage
Ce module permet de scrapper un site à partir de liens sur une page d'un site. 
Il comporte trois fonctions principales :
- Une fonction getAllUrl permettant de récupérer la liste des liens hypertextes à partir d'une page principale
- Une fonction getData permettant de récupérer le contenu d'éléments d'une page web
- Une fonction scrap qui lance la fonction getData sur chaque URL récupérée par la fonction getAllUrl

A l'issue du traitement, les données sont enregistrées dans un tableau au format JSON dans le dossier data_save

## Module scrapFromArray
Ce module permet de scrapper un site à partir d'une liste de valeurs dans un tableau. Ces valeurs seront utilisés comme une liste de paramètres de routes paramétrées à partir d'une url racine.
Au préalable, il conviendra d'importer le contenu du tableau de paramètres urlParams, soit manuellement soit via un import de base de données ou de fichier JSON externe.

Ce module ne comporte qu'une fonction principale, qui vient boucler sur le tableau de paramètres pour accéder à chaque url 'url_racine+param' et récupérer le contenu des éléments souhaités.

A l'issue du traitement, les données sont enregistrées dans un tableau au format JSON dans le dossier data_save





