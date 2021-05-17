const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const fs = require("fs");
const { POINT_CONVERSION_HYBRID } = require("constants");

function loadRecipes() {
    return fs.readFileSync("./data/recipes.json", "utf8");
}

router.get("/", (req,res) =>{
    console.log(req);
    const RList = JSON.parse(loadRecipes());
    const RMapped = RList.map((pizzas) => {
        return {
            id: pizzas.id,
            name: pizzas.name,
            instructions: pizzas.instructions,
            ingredients: pizzas.ingredients,
        };
    });
    res.json(RMapped);
});

router.get("/:id", (req, res) => {
    const RList = JSON.parse(loadRecipes());
    const foundRecipeIndex = RList.findIndex((pizzas) => {
      return pizzas.id === req.params.id;
    });
    res.json(RList[foundRecipeIndex]);
  });

router.delete("/:id", (req,res) => {
    const RList = JSON.parse(loadRecipes());
    const newList = RList.filter((item) => item.id !== req.params.id);
    
    fs.writeFileSync("./data/recipes.json", JSON.stringify(newList));
    console.log(newList);
    res.json(newList);
});

router.post("/", (req, res) => {
    if (req.body.name === "" && req.body.ingredients === "") {
      res.status(422).send("please enter a name and ingredients");
    } else {
      const RList = JSON.parse(loadRecipes());
      const newRecipe = {
        id: uuidv4(),
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
      };
      RList.push(newRecipe);
      fs.writeFileSync("./data/recipes.json", JSON.stringify(RList));
  
      res.json({
        message: "posted to recipes endpoint",
        recipePosted: newRecipe,
      });
    }
  });
module.exports = router;