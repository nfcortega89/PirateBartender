$(function() {
    // VIEW
    for (var i = 0; i < questions.length; i++) {
        // clone template for the questions and inputs
        var questionTemplate = $('.questions-template').clone();
        var questionPref = questionTemplate.find('h2').text(questions[i].content);
        $('form').append(questionPref);
        $('form').append('<input type="radio" name="' + questions[i].preference + '"value="Yes">Yes');
        $('form').append('<input type="radio" name="' + questions[i].preference + '"value="No">No');
    }
    $('.answers').append("<br><button type='submit'>Submit</button");
    $('.answers').append("<button id='remove'>Clear</button>")
    // CONTROLLER
    $('.answers').submit(function(e) {
        e.preventDefault();
        // check to see if the value of the input is "Yes"
        var pref = {
            'strong': $(this).find("input[name='strong']:checked").val() == "Yes",
            'salty': $(this).find("input[name='salty']:checked").val() == "Yes",
            'bitter': $(this).find("input[name='bitter']:checked").val() == "Yes",
            'sweet': $(this).find("input[name='sweet']:checked").val() == "Yes",
            'fruity': $(this).find("input[name='fruity']:checked").val() == "Yes"
        }
        var nikko = new Bartender(questions, nikkoPantry);
        var randomDrink = nikko.createDrink(pref);
        for (var i = 0; i < randomDrink.length; i++) {
            console.log(randomDrink[i].stuff);
            $('.userDrink ul').append('<li>' + randomDrink[i].stuff + 
            	'</li>');
        }  
    })
    $('#remove').on('click', function(e){
        e.preventDefault();
        $('.userDrink li').remove();
        console.log()
    })
})
// MODEL
// Question obj constructor
function Question(content, preference) {
    this.content = content;
    this.preference = preference;
};
//  Ingredient obj constructor
function Ingredient(stuff, preference) {
    this.stuff = stuff;
    this.preference = preference;
}
// Pantry obj constructor
function Pantry(ingredients) {
    this.ingredients = ingredients;
};
// Bartender obj constructor
function Bartender(questions, pantry) {
    this.questions = questions;
    this.pantry = pantry;
}
// give bartender createDrink method
Bartender.prototype.createDrink = function(prefAnswer) {
    var drink = [];
    // 1. check the users preferences (answers)
    // 2. if the answer is yes we'll go to the corresponding preference and pick a random ingredient
    for (var key in prefAnswer) {
        if (prefAnswer[key]) {
            var matchedIngredients = []
            for (var i = 0; i < this.pantry.ingredients.length; i++) {
                if (this.pantry.ingredients[i].preference == key) {
                    matchedIngredients.push(this.pantry.ingredients[i]);
                }
            }
            // use function to get random number between 0 & 2
            var num = randomNum(0, 2);
            drink.push(matchedIngredients[num]);
        }
    }
    return drink;
}

/// Use the objects above

// create an array of questions, with the preference
var questions = [new Question('Do ye like yer drinks strong?', 'strong'),
        new Question('Do ye like it with a salty tang?', 'salty'),
        new Question('Are ye a lubber who likes it bitter?', 'bitter'),
        new Question('Would ye like a bit of sweetness with yer poison?', 'sweet'),
        new Question('Are ye one for a fruity finish?', 'fruity')
    ]
    // indgredients with preference
var ingredients = [new Ingredient('Glug of rum', 'strong'),
    new Ingredient('Slug of whisky', 'strong'),
    new Ingredient('Splash of gin', 'strong'),
    new Ingredient('Olive on a stick', 'salty'),
    new Ingredient('Salt-dusted rim', 'salty'),
    new Ingredient('Sasher of bacon', 'salty'),
    new Ingredient('Shake of bitters', 'bitter'),
    new Ingredient('Splash of tonic', 'bitter'),
    new Ingredient('Twist of lemon peel', 'bitter'),
    new Ingredient('Sugar cube', 'sweet'),
    new Ingredient('Spoonful of honey', 'sweet'),
    new Ingredient('Splash of cola', 'sweet'),
    new Ingredient('Slice of orange', 'fruity'),
    new Ingredient('Dash of cassis', 'fruity'),
    new Ingredient('Cherry on top', 'fruity')
]

// pantry object
var nikkoPantry = new Pantry(ingredients);

// get random number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
