import Comic from "./models/comic.js";
import { sequelize } from "./config/db.js";

const seedComics = async () => {
  try {
    await sequelize.sync({ force: false });

    const comicsData = [
      {
        name: "Superman: Year One",
        author: "Frank Miller",
        yearOfPublication: 2019,
        price: 29.99,
        discount: 5,
        numberOfPages: 300,
        condition: "new",
        description: "The origin story of Superman.",
      },
      {
        name: "Batman: The Killing Joke",
        author: "Alan Moore",
        yearOfPublication: 1988,
        price: 19.99,
        discount: 10,
        numberOfPages: 150,
        condition: "new",
        description: "A dark and gripping tale of the Joker.",
      },
      {
        name: "Spider-Man: Blue",
        author: "Jeph Loeb",
        yearOfPublication: 2002,
        price: 25.99,
        discount: 8,
        numberOfPages: 200,
        condition: "used",
        description: "A love story focused on Peter Parker.",
      },
    ];

    await Comic.bulkCreate(comicsData);
    console.log("Dummy data inserted successfully!");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    await sequelize.close();
  }
};


export {
    seedComics
}