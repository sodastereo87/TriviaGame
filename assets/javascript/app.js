// javascript

var panel = $('#quiz-area');
var countStartNumber = 30;


// on-click functions for the buttons, to start the game,
//  answer questions and to play again when game is over

$(document).on('click', '#start-over', function (e) {
  game.reset();
});

$(document).on('click', '.answer-button', function (e) {
  game.clicked(e);
});

$(document).on('click', '#start', function (e) {
  $('#submain').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


// questions, answers and images function 

var questions = [{
  question: "What is the duration of the movie?",
  answers: ["3 hours", "1 hour", "2 hours", "15 mins"],
  correctAnswer: "3 hours",
  image: "assets/images/question_1.gif"
}, {
  question: "What is the real name of the main actor?",
  answers: ["Brad Pitt", "Donald Trump", "Leonardo DiCaprio", "Selena"],
  correctAnswer: "Leonardo DiCaprio",
  image: "assets/images/question_2.gif"
}, {
  question: "What is the name of the main character of the story?",
  answers: ["Goku", "Martin McFly", "Ronald McDonal", "Jordan Belfort"],
  correctAnswer: "Jordan Belfort",
  image: "assets/images/question_3.gif"
}, {
  question: "What was the budget for the movie ?",
  answers: ["100 millions", "2  millions", "1  million", "50  millions"],
  correctAnswer: "100 millions",
  image: "assets/images/question_4.gif"
}, {
  question: "How much money did Leonardo DiCaprio get pay for this movie?",
  answers: ["25 millions", "1 million", "10 millions", "10 dollars"],
  correctAnswer: "25 millions",
  image: "assets/images/question_6.gif"
  }, {
  question: "How many Oscars nominations did the movie have?",
  answers: ["1", "2", "5", "10"],
  correctAnswer: 5,
  image: "assets/images/question_5.gif"
}, {
  question: "How old was Jordan Belfort when he began to work in Wall Street?",
  answers: ["31 years old", "50 years old", " 18 years old", "22 years old"],
  correctAnswer: "22 years old",
  image: "assets/images/question_7.gif"
}, {
  question: "What is the name of the second wife in the movie?",
  answers: ["Jenifer Lopez", "Lady Gaga", "Naomi Lapaglia", "Naomi Campbell"],
  correctAnswer: "Naomi Lapaglia",
  image: "assets/images/question_8.gif"
}];

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  // targets the counter and when time gets to 0 seconds,
  //logs time up to the console

  countdown: function () {
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0) {
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
    }
  },
  nextQuestion: function () {
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  //  sets the function  when the timer is over, shows message "You are out of time!", shows the right answer and image, 
  // then goes to the next question 

  timeUp: function () {
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>You are out of time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  // function targeting the results and the counter, 
  // shows game reuslts

  results: function () {
    clearInterval(timer);

    panel.html('<h2>All done, here is how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function (e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  // activates message "Wrong!" if answer is incorrect 
  // shows right answer and sets timer for next question

  answeredIncorrectly: function () {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Wrong!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  // activates message "correct!" if answer is correct 
  // showa image and sets timer for next question

  answeredCorrectly: function () {
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};