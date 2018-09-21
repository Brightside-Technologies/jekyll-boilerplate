function importAll(r) {
    let imagesArray = [];
    r.keys().map((item, index) => {
        let imageObject = {
            ...{
                filename: item.replace("./", "")
            },
            ...r(item)
        };
        imagesArray.push(imageObject);
    });
    return JSON.stringify(imagesArray);
}

module.exports = function(templateParams) {
    return importAll(require.context("../assets/images", false, /\.(png|jpe?g|svg)$/));
};
