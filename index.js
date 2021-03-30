const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5501
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3be27.mongodb.net/socialdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

client.connect(err => {
  const collection = client.db("socialdb").collection("welfare");

    app.delete('/delete/:id',(req,res)=>{
        const id = ObjectId(req.params.id);
        collection.findOneAndDelete({_id : id} )
        .then(result=>{
            res.send('deleted one item')
        })
    })
    app.get('/photo' , (req,res)=>{
        collection.find()
        .toArray((err, documents)=>{
            res.send(documents)
        })
       
    })
    app.post('/addEvent' , (req,res)=>{
        const eventData = req.body ;
        collection.insertOne(eventData)
        .then(result =>{
           
        })
    })



  console.log('database connected successfully')
});

app.listen(port, () => console.log(`Social app listening on port port!`))