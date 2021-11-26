require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { Storage } = require('@google-cloud/storage');
const fileMiddleware = require('express-multipart-file-parser')

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { CONFIG } = require("./config/config");
const { BUCKET } = require("./config/storage");

const app = express();

app.use(cors({origin: CONFIG.FRONTEND_URL, credentials: true}));
app.use(cookieParser());
app.use(fileMiddleware);
app.use(auth);

const bucket = BUCKET();

app.post('/add-images', (req, res) => {
    let files = req.files;
    if (files) {
        Promise.all([...files.map(file => uploadImageToStorage(file))]).then((success) => {
            res.status(200).send({
                status: 'File succesfully uploaded!',
                files: success
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }

        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
}

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'error ocurred';
            const code = err.originalError.code || 500;
            return {
                message: message,
                status: code,
                data: data,
            };
        },
    }),
);

app.use((error, req, res, next) => {
    console.error(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose
    .connect(CONFIG.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        app.listen(CONFIG.PORT || 8080);
    })
    .catch((err) => console.error(err));
