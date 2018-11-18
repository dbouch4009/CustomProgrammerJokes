var Alexa = require('alexa-sdk');

var JokeDataObj = {
                    Jokes: [
                        "What do 50 Cent and Tony Yayo do before submitting pull requests?",
                        "What do you call and IDE in 480 x 320 pixels?",
                        "What are two developers with the same Environmental Variables?",
                        "How did the computer programmer win all the wrestling matches?",
                        "Why did the class put up a fence?",
                        "Why do developers make such bad sailors?",
                        "How does a developer get his grain crop to market?",
                        "Hear about the developer with the secret library?",
                        "What do you call an mp3 file emergency?",
                        "What do you call an unhealthy Client Service relationship?",
                        "What's the difference between a developer and a QA?"
                        ],
                    Responses:[
                        "G-Unit Testing.",
                        "Visual Impairment Studio.",
                        "Threading a common Path.",
                        "He used the compile driver.",
                        "It a private Property?",
                        "They always take a bus between ports.",
                        "He takes the Serial Bus.",
                        "He kept it on the DLL.",                        
                        "Coda Red",
                        "Co dependency Interjection.",
                        "One tests out on bugs, the other bugs out on tests."
                    ]
};

var ASK_STRING = "Do you want to hear another?";

function askForAnother(response){
    if(response == "Yes"){
        this.emit("Second Joke");
    }
}

function getJoke() {
    
    var totalJokeCount = 11; //JokeDataObj.Jokes.count;    
    var rand = Math.floor(Math.random() * totalJokeCount);
    var question = JokeDataObj.Jokes[rand];
    var answer = JokeDataObj.Responses[rand];
        
    //this.emit(':tell',rand.toString())
    return [question,answer];
}

function getJokeIterative(loopValue) {
    
    var question = JokeDataObj.Jokes[loopValue];
    var answer = JokeDataObj.Responses[loopValue];
        
    return [question,answer];
}


var handlers = {
    
    // When launched without any action
    'LaunchRequest': function() {
        
        console.log("Launch Request Handler Called");
        
        // Forward it to Introduction Handler
        this.emit('Introduction');
    },
    
    // can go under LaunchRequest also, but separating it out, just to look cool
    'Introduction': function() {
        
        console.log("Introduction Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = "Hello.";
        
        // In case the user did not provide any input
        var repromptText = "I did not receive any input. Thank you and good bye.";
        
        // Just speak it out through an Alexa Device
        this.emit(':ask', speechOutput, repromptText);
    },
    
    // Defined Intents linked with Skill Start Here
    
    'CustomJoke': function () {
        //   revisit this and ask for yes/no response
        
        var fullText = getJoke();
        var textAnswer = fullText[1];
        var textQuestion = fullText[0];

        // The cardTitle & cardContent is important for Alexa App and Echo Show Devices
        var cardTitle = "Programmer Joke";
        //var cardContent = textJoke;
        var speechOutput = fullText[0] + " " + fullText[1];
        
        //this.emit(':tellWithCard', speechOutput, cardTitle, cardContent);
        this.emit(':tell', speechOutput); 
        
        
        /*
        var totalJokeCount = JokeDataObj.Jokes.count;  
        var loopCount = 0;
        var fullText = "";
        var textPunchline = "";
        var textSetup = "";
        var speechOutput = "That did not work";
        while(loopCount < totalJokeCount)
            {
                fullText = getJokeIterative(0);
                textSetup = fullText[0];
                textPunchline = fullText[1];
                speechOutput = textSetup + textPunchline;                
                
            }
            this.emit(':tell',speechOutput);
            */
    },
    
    // Intent - Unhandled. It is not a built-in intent.
    'Unhandled': function () {
        
        console.log("Unhandled Intent Handler Called.");
        
        this.emit(':tell', "Sorry, I did not get that");
    }
};

// export the handler for node.js
exports.handler = function(event, context, callback) {
    
    // alexa object via the alexa-sdk
    var alexa = Alexa.handler(event, context, callback);
    
    // register & execute all the handlers/intents that are created
    alexa.registerHandlers(handlers);
    alexa.execute();
};





