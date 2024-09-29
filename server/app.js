const express = require('express')
const app = express();
const Faculty = require('./models/Faculty');
//DOTENV
require('dotenv').config();
//DATABASE
require('./config/dbConn');
//CORS
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res)=>{
    res.json({message:'Hello bhai'})
})
app.get('/faculty', async (req,res)=>{
    const users = await Faculty.find({});
    if (JSON.stringify(users) === "[]") return res.status(203).json({ message: "No user found" });
    res.json(Array.isArray(users) ? users : [users]);
})
app.patch('/faculty/:faculty_id', async (req,res)=>{
    const {faculty_id} = req.params;
    const faculty = await Faculty.findOne({faculty_id}).exec();
    let leaves = Number(faculty.leaves);
    leaves++;
    faculty.leaves = ""+leaves;
    await faculty.save();
    res.json({message:leaves});
})
app.use('*', (req, res) => {
    res.status(404).json({ message: "Not found" });
})

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});