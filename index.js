const expreess = require("express");
const app = expreess();
const path = require("path");
const port = 8080;


app.use(expreess.static(path.join(__dirname, "public/js")));
app.use(expreess.static(path.join(__dirname, "public/css")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data: https://images.unsplash.com;"
    );
    next();
});

app.get("/", (req, res) => {
    res.render("home");
});


app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];

    if (data) {
        res.render("instagram.ejs", { data });
    } else {
        res.render("error.ejs");
    }
});

app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { diceVal});
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});