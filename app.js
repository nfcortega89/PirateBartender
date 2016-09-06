$(function() {
    for (var i = 0; i < questions.length; i++) {
        // clone you stuff
        // liar variables
        var questionTemplate = $('.questions-template').clone();
        var questionPref = questionTemplate.find('h2').text(questions[i].content);
        $('form').append(questionPref);
        $('form').append('<input type="radio" name="choice' + [i] + '"value="Yes">Yes');
        $('form').append('<input type="radio" name="choice' + [i] + '"value="No">No');
    }
    $('.answers').append("<br><button type='submit'>Submit</button");
    $('.answers').submit(function(e) {
        e.preventDefault();
        var answer = [$(this).find("input[name='choice0']:checked").val(),
            $(this).find("input[name='choice1']:checked").val(),
            $(this).find("input[name='choice2']:checked").val(),
            $(this).find("input[name='choice3']:checked").val(),
            $(this).find("input[name='choice4']:checked").val()
        ];
        console.log(answer);
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
    this.createDrink = function() {}
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
    new Ingredient('slug of whisky', 'strong'),
    new Ingredient('splash of gin', 'strong'),
    new Ingredient('Olive on a stick', 'salty'),
    new Ingredient('salt-dusted rim', 'salty'),
    new Ingredient('rasher of bacon', 'salty'),
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

//pantry object
var nikkoPantry = new Pantry(ingredients);
