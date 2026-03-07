const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const publicId = () => {
    let result = "";
    for (let i = 0; i < 20; i++) {
        result += text.charAt(Math.floor(Math.random() * text.length));
    }
    const split = result.split("");
    split.splice(4, 0, "-");
    split.splice(9, 0, "-");
    split.splice(14, 0, "-");
    split.splice(19, 0, "-");
    result = split.join("");
    return result;
};

module.exports = publicId;