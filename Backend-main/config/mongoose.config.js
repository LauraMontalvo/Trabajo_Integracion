const mongoose = require('mongoose');
const db = 'tic2_db';

mongoose.connect(`mongodb://127.0.0.1/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to database ${db}`))
    .catch((error => console.log(`Something went wrong when connecting to the ${db}`, error)))