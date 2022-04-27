import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/mernRoutes';
import path from 'path';

const app = express();
//const PORT = 3000;
//const PORT =4000;
const PORT = process.env.PORT || 4000;
// mongo connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/mernDB', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernDB', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});
//connecting build folder to server
app.use(express.static(path.join(__dirname,'/src/build')));
//bodyparser setup
app.use(bodyparser.urlencoded({extended: true }));
app.use(bodyparser.json());

//if it's on production or Heroku, then use the build folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//CORS setup
app.use(cors());

routes(app);

/*app.get('/', (req, res) => 
    res.send(`Our MERN Application is running on port ${PORT}`)
);
*/
app.get('*',(req,res) => {
res.sendFile(path.join(__dirname+'/src/build/index.html'));
});

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);