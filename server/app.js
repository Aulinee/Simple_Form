const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const email_address = request.body.email_address;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewDetail(first_name, last_name, email_address);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});



app.listen(process.env.PORT, () => console.log('app is running'));