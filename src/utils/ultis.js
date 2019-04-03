class Utils {
    constructor() {
        this.serialGenerator = this.serialGenerator.bind(this);
    }
    serialGenerator(_length = 40) {
        var serial = "";
        while (serial.length < _length) {
            serial += String(Math.floor(Math.random() * 10));
        }
        return serial;
    }
}

module.exports = new Utils();