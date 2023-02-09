const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await
const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    await Recipe.create({
      title: "Torrada",
      level: "Easy Peasy",
      ingredients: ["Bread", "Ham", "Cheese"],
      cuisine: "unknown",
      dishType: "breakfast",
      image:
        "https://media.istockphoto.com/id/185235465/photo/white-toast.jpg?s=612x612&w=0&k=20&c=ZIMknnJMwf9PANFFWeR78s_d72lDLIBi1ZSeunfnE34=",
      duration: 2,
      creator: "unknown",
    });
    await Recipe.insertMany(data);
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    let deletedElement = await Recipe.deleteOne({ title: "Carrot Cake" });
    if (deletedElement.deletedCount === 1) {
      console.log("Element succesfully deleted");
    }
    mongoose.disconnect();
    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
