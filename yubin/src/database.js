const mongoose = require('mongoose');

const URI = 'mongodb://localhost/yubin-dev';

mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => console.log('DB ' + URI + ' is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;