var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'test'

var booklist = [
    {
        "id": 1,
        "nombre":'libro 1',
        "autor":{
            "nombre":'autor1',
            "birthday":'1990-04-02'
        }
    }
]

/* GET books listing. */
router.get('/', function(req, res, next) {
  //res.status(200).json(booklist);
  mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
    if(err) return next(createError(500))
    const database = client.db(dbName)
    const collection = database.collection('books')
    collection.find({}).toArray((err, docs) =>{
        if(err) return next(createError(500))
        res.status(200).json(docs)
    })
})
});

router.post('/', function(req, res, next){
    /*booklist.push(req.body)
    res.status(201).end()*/
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('books')
        collection.insertOne(req.body, err =>{
            if(err) return next(createError(500))
            res.status(201).end()
        })
    })
});

module.exports = router;
