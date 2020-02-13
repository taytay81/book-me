/*const mongoose = require("mongoose");
const booksModel = require("./../models/Books");

const book1 = [
    {
        isbn: "9782226443274",
        title: "L'Institut",
        author: "Stephen King",
        publisher: "Albin Michel",
        price: 20,
        description: "Au coeur de la nuit, à Minneapolis, des intrus pénètrent la maison de Luke Ellis, jeune surdoué de 12 ans, tuent ses parents et le kidnappent. Luke se réveille à l'Institut, dans une chambre presque semblable à la sienne, sauf qu'elle n'a pas de fenêtre. Dans le couloir, d'autres portes cachent d'autres enfants, dotés comme lui de pouvoirs psychiques. Que font-ils là ? Qu'attend-on d'eux ? Et pourquoi aucun de ces enfants ne cherche-t-il à s'enfuir ? Aussi angoissant que Charlie, d'une puissance d'évocation égale à Ça, L'Institut nous entraîne dans un monde totalitaire... qui ressemble étrangement au nôtre. Le nouveau chef-d'oeuvre de Stephen King.",
        category: "Thriller",
        publishedDate: 21/01/2020,
        pageCount: 608,
        language: "French",
        state: "acceptable"
    }];

    mongoose
    .connect('mongodb://localhost/book-me', {useNewUrlParser: true})
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo')
    });

    booksModel.insertMany(book1)
  .then(dbSuccess => {
      
  })
  .catch(dbErr => {
      console.log("Oh no", dbErr);
  });


    module.exports = book1;*/
