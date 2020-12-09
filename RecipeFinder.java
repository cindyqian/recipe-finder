import java.io.*;
import java.util.*;
import java.nio.file.*;

public class RecipeFinder {

    private Map<String, Set<String>> invertMap;

    // pre:
    // post: Creates a new RecipeFinder
    public RecipeFinder() {
        invertMap = new HashMap<>();
    }

    // pre: If there is not file found, will print "File was not found"
    // post: Takes in a text file and adds the recipes in that text file
    // into the inverted map. The user will then input their list and this program
    // will compare the recipes in the database with the user input.
    public void addRecipe(String document) {
        Set<String> ingredients = new HashSet<>();
        try {
            File file = new File(document);
            Scanner fileReader = new Scanner(file);
            while (fileReader.hasNextLine()) {
                String data = fileReader.nextLine();
                String[] acr = data.split(",");
                if (!invertMap.containsKey(acr[0])) { // if invertMap does not contain the key
                    invertMap.put(acr[0], new HashSet<>()); // we add it in
                    for (int i = 1; i < acr.length; i++) { // we also add all the other ingredients in
                        invertMap.get(acr[0]).add(acr[i].replaceAll("\\s+", "").toLowerCase());
                    }
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("File was not found.");
        }
    }

    // pre:
    // post: Return a set of strings where each string is a recipe title
    // that contains all the ingredients the user passed in
    public Set<String> findRecipe(Set<String> userIngredients) {
        //we want to return a set of strings of which each string is a recipe title
        //traver through invertMap, each time we find a set which the userIngredients set contains, add the title (
        //value at that map location) to the set we are returning. SO that ideallt, after our traversal is done, 
        //we have a set full of recipe titles, and then all we have to do, is return that set.  
        Set<String> recipes = new HashSet<>();
        Set<String> temp = new HashSet<>();
        for (String key : invertMap.keySet()) { // traverses the keys in invertMap
            temp = invertMap.get(key);
            if (userIngredients.containsAll(temp)) { // if the passed in user ingredients contains all of the ingredients in a recipe
                // add the invertmap recipe (recipe title (key))to recipes
                recipes.add(key);
            }
        }
        return recipes;
    }

    // pre:
    // post: Split the user input and put it in a set
    public Set<String> splitQuery(String query) { // milk, sugar, flour, eggs, pumpkin
        Set<String> result = new HashSet<>();
        String [] ingredients = query.split(","); // ["milk", "sugar", "flour", "eggs", "pumpkin"]
        for (int i = 0; i <= ingredients.length - 1; i++) {
            result.add(ingredients[i].replaceAll("\\s+", "").toLowerCase()); // remove whitespaces from string and lowercase before adding to result
        }
        return result;
    }

    public static void main(String[] args) {
        RecipeFinder finder = new RecipeFinder();
        finder.addRecipe("recipes.txt");
        Set<String> userIngredientsList = new HashSet<>();
        Scanner console = new Scanner(System.in);
        System.out.println("Enter ingredients seperated by commas: ");
        String ingredients = console.nextLine(); 
        userIngredientsList = finder.splitQuery(ingredients); 
        System.out.println(finder.findRecipe(userIngredientsList)); // this is the result
        // USE THIS TO RUN THE CODE IN TERMINAL: javac RecipeFinder.java && java RecipeFinder
        // Sample input # 1: milk,sugar,flour,eggs,pumpkin
        //        output: [Pumpkin Pie, Cake]
        // Sample input # 2: milk
        //        output: []
        // Sample input # 3: milk,sugar,flour,eggs,pumpkin,cheese,sour cream,beans,salsa,pepperoni,marinara sauce
        //        output: [Pumpkin Pie, Cake, Tacos, Pizza]
    }

}
