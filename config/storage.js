const { Storage } = require("@google-cloud/storage");
const { CONFIG } = require('./config');

module.exports.STORAGE = new Storage({
    projectId: CONFIG.PROJECT_ID,
    keyFilename: CONFIG.KEY_FILENAME
});

module.exports.BUCKET = () => {
    const storage = new Storage({
        projectId: CONFIG.PROJECT_ID,
        keyFilename: CONFIG.KEY_FILENAME
    });

    return storage.bucket(CONFIG.BUCKET_URL);
}