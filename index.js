var Alexa = require('alexa-sdk');
var constants = require("./constants");

var JokeSession = function(){
    this.iteration = 0;
    this.question = 0;
    this.punchLine = 0;
    this.testText = "Your test wins";
};

var session = new JokeSession();

JokeSession.prototype.setCountToZero = function(){
    this.iteration = 0;
};

JokeSession.prototype.getQuestion = function(loopValue){
    return constants.Jokes[loopValue];
};

JokeSession.prototype.getPunch = function(loopValue){
    return constants.Responses[loopValue];
};

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
        var speechOutput = "Hello, welcome to Custom Programmer Jokes. You can say Tell One, or Tell A Joke";

        // Just speak it out through an Alexa Device
        this.emit(':ask', speechOutput);
    },
    
    'AMAZON.StopIntent': function() {
        
        console.log("Introduction Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = constants.goodByeText;
        session.setCountToZero();
        
        // Just speak it out through an Alexa Device
        this.emit(':tell', speechOutput);
    },
    
    'AMAZON.NavigateHomeIntent': function() {
        
        console.log("Introduction Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = constants.homeText;
        
        // Just speak it out through an Alexa Device
        this.emit(':ask', speechOutput);
    },
    
    'AMAZON.HelpIntent': function() {
        
        console.log("Introduction Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = constants.helpText;
        
        // Just speak it out through an Alexa Device
        this.emit(':ask', speechOutput);
    },
    
    'AMAZON.CancelIntent': function() {
        
        console.log("Cancel Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = "Goodbye.";

        // Just speak it out through an Alexa Device
        this.emit(':tell', speechOutput);
    },
    
    'AMAZON.FallbackIntent': function() {
        
        console.log("Introduction Handler called.");
        
        // The user opened the skill without providing any action or intent
        var speechOutput = constants.homeText;
        this.session.setCountToZero();

        // Just speak it out through an Alexa Device
        this.emit(':tell', speechOutput);
    },
    
    // Defined Intents linked with Skill Start Here
    
    'CustomJoke': function () {
        //   revisit this and ask for yes/no response
        //this.emit(':tell',session.testText);
        
        if(session.iteration === constants.totalJokeCount)
        {
            session.setCountToZero();
            this.emit(':tell',constants.doneText + constants.goodByeText);
        }
        else
        {
            var textAnswer = session.getPunch(session.iteration);
            var textQuestion = session.getQuestion(session.iteration);

            var speechOutput = textQuestion + " " + textAnswer + ". " + constants.ASK_STRING;
            session.iteration++;
            this.emit(':ask', speechOutput); 
        }
    },
    
    'Restart':function(){
        session.setCountToZero();
        var speechOutput = constants.homeText;
        this.emit(':ask', speechOutput);
    },
    
    // Intent - Unhandled. It is not a built-in intent.
    'Unhandled': function () {
        
        console.log("Unhandled Intent Handler Called.");
        
        this.emit(':tell', "Sorry, I did not get that. Try saying, Help.");
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





