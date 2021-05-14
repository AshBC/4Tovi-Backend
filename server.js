const express = require ('express');
const app = express ();
const cors = require ('cors');
const siteRoutes = require ('./routes/siteRoutes');
const { restart } = require('nodemon');
const PORT = 8080;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/recipes', siteRoutes);

app.get ('/', (req,res) =>{
    res.json({
        greeting: 'Welcome to Tovi Pizza',
    });
});
app.listen(PORT, console.log(`listening at:http://localhost:${PORT}`));