const express       = require("express");
const bodyParser    = require("body-parser");
const ejs           = require("ejs");
const app           = express();
const PORT          = process.env.PORT || 3000;
const getError      = require('./routes/404');
const pageAbout     = require('./routes/about');
const mainPage      = require('./routes/main');
const workPage      = require('./routes/work');

app.set("view engine", ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// use
app.use(mainPage);
app.use(pageAbout);
app.use(workPage);
app.use(getError);

app.listen(PORT, () => {
    console.log(`${PORT} is running`);
});