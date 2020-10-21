const express   = require('express');
const router    = express.Router();

router.get('/about', (req, res) => {
    res.render("about.ejs", {title: "About", header: "About page"});
});

module.exports = router;