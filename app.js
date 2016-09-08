$(function() {
    for (var i = 0; i < questions.length; i++) {
        // clone you stuff
        // liar variables
        var questionTemplate = $('.questions-template').clone();
        var questionPref = questionTemplate.find('h2').text(questions[i].content);
        $('form').append(questionPref);
        $('form').append('<input type="radio" name="' + questions[i].preference + '"value="Yes">Yes');
        $('form').append('<input type="radio" name="' + questions[i].preference + '"value="No">No');
    }
    $('.answers').append("<br><button type='submit'>Submit</button");
    $('.answers').append("<button id='remove'>Clear</button>")
    $('.answers').submit(function(e) {
        e.preventDefault();
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

function Question(content, preference) {
    this.content = content;
    this.preference = preference;
};

//  Task: Design an Ingredient object using constructor
function Ingredient(stuff, preference) {
    this.stuff = stuff;
    this.preference = preference;
}

// Pantry object
function Pantry(ingredients) {
    this.ingredients = ingredients;
};

function Bartender(questions, pantry) {
    this.questions = questions;
    this.pantry = pantry;
}

Bartender.prototype.createDrink = function(prefAnswer) {
    // this.prefAnswer = prefAnswer;
    var drink = [];
    // 1. check the preferences (answers)
    // 2. if the answer is yes we'll go to the corresponding preference and pick a random ingredient
    // 3. if the answer is no, move on to the next answer
    for (var key in prefAnswer) {
        if (prefAnswer[key]) {
            var matchedIngredients = []
            for (var i = 0; i < this.pantry.ingredients.length; i++) {
                if (this.pantry.ingredients[i].preference == key) {
                    matchedIngredients.push(this.pantry.ingredients[i]);
                }
            }
            var num = randomNum(0, 2);
            // process here.
            drink.push(matchedIngredients[num]);
            // pick == a random ingredient; from where??
            // how?

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
var nikko = new Bartender(questions, nikkoPantry);

// get random number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
