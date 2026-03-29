require('dotenv').config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3bebek.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// ✅ Routes আগে register করো — run() এর বাইরে
// ✅ প্রতিটা route এ আলাদা করে connect করো

app.get('/', (req, res) => {
    res.send('FinEase server is running')
})

app.get('/my-transactions/:email', async (req, res) => {
    try {
        await client.connect();
        const transactionsCollection = client.db("FineEaseDB").collection("transactions");
        const email = req.params.email;
        const query = { email: email };
        const result = await transactionsCollection.find(query).toArray();
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.get('/transaction/:id', async (req, res) => {
    try {
        await client.connect();
        const transactionsCollection = client.db("FineEaseDB").collection("transactions");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await transactionsCollection.findOne(query);
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.post('/add-transaction', async (req, res) => {
    try {
        await client.connect();
        const transactionsCollection = client.db("FineEaseDB").collection("transactions");
        const transaction = req.body;
        const result = await transactionsCollection.insertOne(transaction);
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.put('/transaction/update/:id', async (req, res) => {
    try {
        await client.connect();
        const transactionsCollection = client.db("FineEaseDB").collection("transactions");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const { _id, ...updatedTransaction } = req.body;
        const updateDoc = { $set: updatedTransaction }
        const result = await transactionsCollection.updateOne(query, updateDoc);
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.delete('/transaction/delete/:id', async (req, res) => {
    try {
        await client.connect();
        const transactionsCollection = client.db("FineEaseDB").collection("transactions");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await transactionsCollection.deleteOne(query);
        res.send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`FinEase server is running on port ${port}`)
})

module.exports = app;