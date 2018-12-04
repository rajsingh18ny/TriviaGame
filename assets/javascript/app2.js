//jquery IIFE wrapper 
(function () {

    //this is my timer
    // document.getElementById('timer').innerHTML =
    //     01 + ":" + 00;
    $('#timer').html(02 + ":" + 00);
    startTimer();

    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));

        if (s == 59) { m = m - 1 }
        if (m < 0) {
            // $('#terrors').append("The night is dark and full of trivia. Try again!");
            $('#terrors').fadeIn(2000);

            var resetBtn = $("<button>").html("Reset", "Restart Game").click(function () {
                location.reload()
            });

            $("#reset").append(resetBtn);
            $("#results").show();
            return;
        }
        document.getElementById('timer').innerHTML =
            m + ":" + s;
        setTimeout(startTimer, 1000);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }

    //the slideshow begins here -- this is the question array
    const myQuestions = [
        {
            question: "1. Which of Daenerys Targaryen’s dragons was killed by the Night King?",
            answers: {
                a: "Drogon",
                b: "Rhaegal",
                c: "Viserion"
            },
            correctAnswer: "c"
        },
        {
            question: "2. Who created the original White Walker?",
            answers: {
                a: "The Red Witch",
                b: "The 3-Eyed Raven",
                c: "The Children of the Forest"
            },
            correctAnswer: "c"
        },
        {
            question: "3. How are Daenerys Targaryen and John Snow related?",
            answers: {
                a: "brother/sister",
                b: "aunt/nephew",
                c: "cousin/cousin"
            },
            correctAnswer: "b"
        },
        {
            question: "4. Which weapon is fatal to White Walkers?",
            answers: {
                a: "dragonglass",
                b: "wildfire",
                c: "milk of the poppy"
            }, correctAnswer: "a"
        },
        {
            question: "5. Who killed Walder Frey?",
            answers: {
                a: "Arya Stark",
                b: "Brienne of Tarth",
                c: "Myrcella Baratheon"
            },
            correctAnswer: "a"
        },
        {
            question: "6. Who told Cersei Lannister her three children would precede her in death?",
            answers: {
                a: "Samuel Tarley",
                b: "Rhaegon Targaryen",
                c: "Maggy the Frog"
            },
            correctAnswer: "c"
        },
        {
            question: "7. Who is Robert Baratheon’s last living child?",
            answers: {
                a: "Gendry",
                b: "Barra",
                c: "Shireen"
            },
            correctAnswer: "a"
        },
        {
            question: "8. Who persuaded Lysa to kill Jon Arryn?",
            answers: {
                a: "Craster",
                b: "Edmure",
                c: "Littlefinger"
            },
            correctAnswer: "c"
        },
        {
            question: "9. Who killed The Mad King?",
            answers: {
                a: "Robert Baratheon",
                b: "Jaime Lannister",
                c: "Roose Bolton"
            },
            correctAnswer: "b"
        },
        {
            question: "10. Who is Tormund Giantsbane's crush?",
            answers: {
                a: "Daenerys Targaryen",
                b: "Cersei Lannister",
                c: "Brienne of Tarth"
            },
            correctAnswer: "c"
        },
        {
            question: "11. Who killed Mance Rayder, King of the Free Folk?",
            answers: {
                a: "John Snow",
                b: "Jeor Mormont",
                c: "The Blackfish"
            },
            correctAnswer: "a"
        },
        {
            question: "12. Which of these men were NOT related to King Robert Baratheon?",
            answers: {
                a: "Renly",
                b: "Lord Varys",
                c: "Stannis"
            },
            correctAnswer: "b"
        },
        {
            question: "13. Who captures -- then tortures -- Theon Greyjoy?",
            answers: {
                a: "Ramsay Bolton",
                b: "Eddard Stark",
                c: "Joffrey Baratheon"
            },
            correctAnswer: "a"
        },
        {
            question: "14. In which city did Arya encounter The Waif?",
            answers: {
                a: "King's Landing",
                b: "Westeros",
                c: "Braavos"
            },
            correctAnswer: "c"
        },
        {
            question: "15. Who cures Jorah Mormont’s potentially fatal greyscale?",
            answers: {
                a: "Samuel Tarley",
                b: "Tywin Lannister",
                c: "The 3-Eyed Raven"
            }, correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
                // alert('Winter is coming. Grab your dragonglass and let\'s go!');
                // return;
                // alert('Winter is coming. Grab some dragonglass!');
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    $("#reset").click(function () {
        $("div").hide();
    });
    $("#show").click(function () {
        $("div").show();
    });
})();