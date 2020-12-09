var recipes = 
"Fried Rice, Eggs, Salt, Rice, Ginger, Onions\n" +
"Sinangag, Eggs, Salt, Rice, Ginger, Onions\n" +
"Tomato Soup, Onions, Tomatoes, Salt\n" +
"Stir Fry Tomato and Onions, Onions, Tomatoes, Salt\n" +
"Frittata, Cheese, Chicken, Ham, Salt, Eggs\n" +
"Omelette, Cheese, Chicken, Ham, Salt, Eggs\n" +
"Quesadilla, Cheese, Chicken, Ham, Salt, Eggs\n" + // all above are testable

"Bean Burritos, Tortillas, Beans, Cheese, Onions, Peppers\n" +
"Chicken or Turkey Chili Hash with Sweet Potatoes, Onions, Bell Peppers, Peppers, Potatoes, Sweet Potatoes, Chicken, Salt\n" +
"Chipped Beef and Gravy, Butter, Milk, Cheese, Eggs, Worcestershire Sauce, Salt, Sweet Paprika, Dry Mustard, Ground Red Pepper\n" +
"Chicken Noodle Soup, Chicken Broth, Noodles, Parsley, Salt\n" +
"Butternut Squash Soup, Butternut Squash, Ginger, Chicken Broth, Parsley\n" +
"Cream of Carrot Soup, Butter, Onions, Ginger, Chicken Broth, Orange Juice, Carrots, Heavy Cream, Salt, Parsley\n" +
"Baked Potato Soup, Butter, Onion, Potatoes, Chicken Broth, Heavy Cream, Sour Cream, Salt\n" +
"Cold Avocado Soup, Avocados, Garlic, Lime, Salt, Milk\n" +
"Thai Clam Pot, Garlic, Scallion, Mirin, Clams, Basil, Fish Sauce, Noodles\n" +
"Japanese Noodles in Broth, Chicken Broth, Soy Sauce, Sugar, Salt, Noodles\n" +
"Fettucine Alfredo, Pasta, butter, Heavy Cream, Parmesan, Salt\n" +
"Stovetop Macaroni and Cheese, Macaroni, Butter, Milk, Cheese, Eggs, Salt\n" +
"Spaghetti with Garlic and Oil (Aglio e Olio), Spaghetti, Oil, Garlic, Salt\n" +
"Spaghetti Carbonara, Spaghetti, Oil, Bacon, White Wine, Eggs, Salt, Parmesan\n" +
"Chicken Fingers, Chicken, Bread Crumbs, Parmesan, Parsley, Salt, Eggs\n" +
"Sloppy Joe, Onions, Bell Peppers, Garlic, Celery, Salt, Ground Beef, Worcestershire Sauce, Bread, Scallion\n" +
"Ground Beef Tacos, Onions, Ground Beef, Garlic, Salt, Tomatoes, Peppers, Lettuce, Cheese, Salsa, Tortilla\n" +
"Taco Salad, Tortilla Chips, Ground Beef, Cheese, Lettuce, Onions, Tomatoes, Salsa\n" +
"Frittata, Cheese, Chicken, Ham, Salt, Eggs\n" +
"Western or Denver Omelet, Butter, Onions, Bell Peppers, Ham, Eggs, Milk, Salt\n" +
"Souffled Omelet, Eggs, Sugar, Salt, Butter\n" +
"Brussels Sprouts, Brussels Sprouts, Butter, Parmesan, Onions\n" +
"Eggnog, Eggs, Sugar, Heavy Cream\n" +
"Vanilla Icebox Cookies, Flour, Baking Powder, Salt, Butter, Sugar, Eggs\n" +
"Stuffed Raw Vegetables, Butter, Cream Cheese, Salt, Peas, Tomatoes\n" +
"Pumpkin Soup, Butter, Onions, Celery, Pumpkin, Milk, Sugar, Salt\n" +
"Molten Chocolate Cake, Chocolate, Butter, Eggs, Sugar\n" +
"Angel Cake, Flour, Sugar, Salt, Eggs\n" +
"Braised Lentils with Sausage, Sausage, Lentils, Onions, Carrots, Garlic, Chicken Broth, Salt\n" +
"Hard-Boiled Eggs, Eggs\n" +
"Guacamole, Avocados, Lime, Onions, Parsley, Garlic, Salt\n" +
"Refried Beans, Onions, Garlic, Beans, Salt\n" +
"Cheese Enchiladas, Cheese, Tortillas\n" +
"Enchiladas Verdes, Chicken, Sour Cream, Scallion, Salt, Tortillas\n" +
"Margarita, Tequila, Lime, Salt\n" +
"Chicken and Cheese Tamales, Salt, Peppers, Chicken, Butter, Onions, Cheese\n" +
"Seven-Layer Dip, Beans, Avocados, Lime, Sour Cream, Chilis, Tomatoes, Cheese\n" +
"Fried Cheese Sticks, Cheese, Flour, Eggs\n" +
"Buffalo Chicken Wings, Chicken, Flour, Salt, Butter\n" +
"Crispy Potato Skins, Potatoes, Butter, Garlic, Cheese, Salt\n" +
"Nachos, Chips, Cheese\n" +
"Chili Con Carne, Beef, Salt, Onions, Garlic, Peppers, Tomatoes\n" +
"Scotch Eggs, Sausage, Eggs, Flour\n" +
"Chicken Jambalaya, Chicken, Salt, Butter, Sausage, Onions, Bell Peppers, Celery, Garlic, Tomatoes, Rice";


var userIngredients = new Set();

var mapOfRecipes = new Map();

var results = new Set();


function startSearch(userInput){

  var inputToParse = userInput.toLowerCase().split(", ");
  var s = new Set();
  for(let m = 0; m < inputToParse.length; m++){
    s.add(inputToParse[m]);
  }
  userIngredients = s;
  addRecipe();
  findRecipe();
  var foundRecipesWindow = window.open('foundRecipes.html');
  
  foundRecipesWindow.onload = function () {
    var resultsAsArray = Array.from(results);
    if(resultsAsArray.length == 0){
      
      var h1 = foundRecipesWindow.document.createElement("h1");  

      h1.style.paddingTop = "19px";
      h1.style.fontSize = "30px";
      h1.style.color = "#ffffff";
      h1.style.textAlign = "center";
      h1.style.fontWeight = "370";
      h1.style.opacity = "0.5";
      h1.id = "n/a";
      h1.innerHTML = "Sorry, we could not find any recipes for you in our database :(";
      foundRecipesWindow.document.getElementById("recipesGrid").appendChild(h1);
    }
    for(var n = 0; n < resultsAsArray.length; n++){
      var div = foundRecipesWindow.document.createElement("div");
      div.style.height = "100%";
      div.style.background = "#ffffff";
      div.style.opacity = "0.8";
      div.id = "option" + n;
      
      var h1 = foundRecipesWindow.document.createElement("h1");  

      h1.style.paddingTop = "19px";
      h1.style.fontSize = "30px";
      h1.style.color = "#9378bb";
      h1.style.textAlign = "center";
      h1.style.fontWeight = "370";
      h1.style.opacity = "0.5";
      h1.id = "option" + n + "Title";
      h1.innerHTML = resultsAsArray[n];
      div.appendChild(h1);

      foundRecipesWindow.document.getElementById("recipesGrid").appendChild(div);
    }
  
  };
}


function addRecipe(){
  var map = new Map();
  var lines = recipes.split("\n");
  for(var i = 0; i < lines.length; i++){
    var current = lines[i];
    var words = current.split(", ");
      var key = words[0];
      var s = new Set();
      for(var j = 1; j < words.length; j++){
        s.add(words[j].replaceAll("\\s+", "").toLowerCase());
      }

      map.set(key, s);
      
  }
  mapOfRecipes = map;

}



function findRecipe(){ 
  var finalResults = new Set();
  for(let recipeName of mapOfRecipes.keys()){
    var ingredients = mapOfRecipes.get(recipeName);   
    if(compareSets(userIngredients, ingredients)){
      finalResults.add(recipeName);
    }
  }
  
  results = finalResults;
}


function compareSets(a, b) {
  if (a.size !== b.size) return false;
  for (var i of a) if (!b.has(i)) return false;
  return true;
}
