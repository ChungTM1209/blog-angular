//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/frontend'));

app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname,'/dist/frontend/index.html'));
});


// default Heroku PORT
app.listen(process.env.PORT || 3000);
