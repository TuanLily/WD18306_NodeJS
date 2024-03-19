const connection = require("../../config/connect.js");


const getCategoryList = (callback) => {
    const query = `
        SELECT DISTINCT c.*
        FROM categories c
        INNER JOIN products p ON c.id = p.cate_id
    `;
    connection.query(query, (err, categories) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, categories);
    });
};


module.exports = {
    getCategoryList
};
