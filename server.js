const express = require('express');
const mongoose = require('mongoose');
const Note = require('./note');
const app = express();
const port = 2000;
app.listen(port, ()=>{
    console.log(`port: ${port}`);
});


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/note')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  //create a note
  app.post('/notes', async (req, res) => {
    const { name, price, type, shop, status } = req.body;
    if (!name || !price) {
      return res.status(400).send('Missing name or price');
    }
  try{
  let notes = [];
  console.log("notes");
  console.log(notes.length);

    let newNote = new Note({name, price, type, shop, status });
    newNote = await newNote.save();
    res.send(newNote);
  }
  catch(err){
    res.status(400).send(err.message);

  }
  });

  app.get('/notes', async(req,res) => {
    const notes = await Note.find();
    res.send(notes);
  })

  //by using formdata
  app.get('/noteid', async(req,res) => {
    const {id} = req.body;
    const note = await Note.findById(id);
    res.send(note);
  })


  // by using params
  app.get('/note/:id',async(req,res) => {
    const note = await Note.findById(req.params.id);
    res.send(note);
  })

  //update note
  app.put('/noteupdate/:id',async(req,res) => {
    try{
    let updateNote = await Note.findByIdAndUpdate(req.params.id, 
        {
            name:req.body.name,
            price:req.body.price,
            type:req.body.type,
            shop:req.body.shop,
            status:req.body.status

        }, { new: true });

        
        res.send(updateNote);
    }
    catch(err){
        res.status(400).send(err.message);
    }
  })


  //delete note

  app.delete('/deletenote/:id', async(req,res) => {
    console.log(req.params.id);
    const note = await Note.findByIdAndDelete(req.params.id);
    res.send("Note Deleted Successfully");
  })