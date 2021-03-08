import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/',(req, res) => {

    res.send('Hello Welcome!')
} )

const PORT = process.env.PORT || 5000;

//const CONNECTION_URL = 'mongodb+srv://chengzzz:chengzzz123123@cluster0.n27sv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
 
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);