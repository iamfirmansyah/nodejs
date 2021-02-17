const express = require("express");
const app = express();

const db = require("./config/db");

app.get('/',(req,res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() => 
    console.log("Berhasil Terkoneksi dengan Database")
);

const User = require("./models/user");

app.post('/crud', async (req,res) => {
    try{
        const{ username, email, password }  = req.body;
        res.send(req.body);
        const newUser = new User({
            username, 
            email, 
            password,
        });

        await newUser.save();

        res.json(newUser);
        
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get('/crud', async (req,res) => {
    try{
        const getAllUser = await User.findAll({
        });

        res.json(getAllUser);
    }catch {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get('/crud/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const getUser = await User.findAll({
            where: {id:id}
        });
        
        res.json(getUser);
    }catch {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.delete('/crud/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const DeleteUser = await User.destroy({
            where: {id:id}
        });
        
        res.status(200).send("berhasil menghapus user");
    }catch {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.put('/crud/:id', async (req,res) => {
    try{
        const{ username, email, password }  = req.body;
        const id = req.params.id;
        const updateUser = await User.update({
            username, 
            email, 
            password,
        },{
            where: {id:id}
        }
        );
        await updateUser;
        res.status(200).send("berhasil mengupdate");
    }catch {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get('/join', async(req,res) => {
    try{
        const getAllUser = await User.findAll({
        });

        res.json(getAllUser);
    }catch {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.listen(4500, () => console.log("port berjalan di 45000"));