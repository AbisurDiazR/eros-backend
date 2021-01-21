const { Router } = require('express');
const router = Router();

const fetch = require('node-fetch');

router.get('/videos', async (req, res) => {
    const Pornsearch = require('pornsearch').search('');    
    Pornsearch.driver('redtube');

    Pornsearch.videos().then(
        videos => {
            res.send(videos);
        }
    );
});

router.post('/videos', async (req, res) => {
    const {query} = req.body;
    const Pornsearch = require('pornsearch').search(query);    
    Pornsearch.driver('redtube');

    Pornsearch.videos().then(
        videos => {
            res.send(videos);
        }
    );
});

router.get('/', (req, res) => {
    res.send('Hello World');
    console.log(req.body)
});

router.get('/categorias', (req, res) =>{
    getData('https://api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json').then(data => {
        res.send({data: data});
    });
});

router.get('/etiquetas',(req, res) => {
    getData('https://api.redtube.com/?data=redtube.Tags.getTagList&output=json').then(data => {
        res.send({data: data})
    });
});

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    return response.json();
}

module.exports = router;