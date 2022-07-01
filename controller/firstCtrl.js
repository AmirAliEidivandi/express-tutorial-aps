class Ctrl {
    login(req, res) {
        res.send("login page");
    }
    index(req, res) {
        res.send("hello world");
    }
}
module.exports = new Ctrl();