const horoscopes = {
    aries: {
        text: "Today, you might feel as brave as a Gryffindor facing a troll. Embrace your courage, but don't forget to watch out for Peeves' pranks!",
        image: "./assets/gryffindor1.png",
        story: "As you traverse the grounds of Hogwarts, you encounter a challenge that requires your Gryffindor bravery. With the courage of Harry Potter himself, you face the challenge head-on, emerging victorious and earning points for your house."
    },
    taurus: {
        text: "You're as loyal as a Hufflepuff today, and your hard work will be rewarded like winning the House Cup. Treat yourself to a Butterbeer!",
        image: "./assets/hufflepuff1.png",
        story: "In the cozy Hufflepuff common room, you find yourself surrounded by friends. Your dedication and loyalty to your studies and friends are celebrated, and you enjoy a well-deserved Butterbeer, just like Cedric Diggory."
    },
    gemini: {
        text: "Your wit matches that of Ravenclaw's brightest minds today. Expect a riddle-solving challenge or a chance to debate like the best of them.",
        image: "./assets/ravenclaw1.png",
        story: "In the serene Ravenclaw tower, you solve complex riddles to enter the common room. Your sharp wit impresses even the spirit of Rowena Ravenclaw, and you spend the evening in deep discussion, honing your intellect."
    },
    cancer: {
        text: "Your emotional depth today rivals that of the Mirror of Erised. Surround yourself with friends in the common room for comfort and joy.",
        image: "./assets/mirror1.png",
        story: "While gazing into the Mirror of Erised, you see your deepest desires reflected back at you. But as you look away, you realize the true joy lies with the friends around you, and you all share an enchanting evening together."
    },
    leo: {
        text: "Like a true Gryffindor, you're a natural leader today. Whether you're taking charge of a Quidditch team or guiding your friends through the Forbidden Forest, you'll shine.",
        image: "./assets/gryffindor2.png",
        story: "With the courage of a true Gryffindor, you lead your friends on an adventure through the Forbidden Forest. Along the way, you encounter magical creatures and show great bravery, earning the admiration of all around you."
    },
    virgo: {
        text: "You're meticulous as a Potions Master today. Use your analytical skills to brew up a perfect solution to any problem you face.",
        image: "./assets/gryffindor2.png",
        story: "In the dungeon, you work meticulously to create a perfect potion under the watchful eye of Professor Snape. Your attention to detail and dedication to excellence result in a potion worthy of an O in your O.W.L.s."
    },
    libra: {
        text: "Balance is key for you today, just like the equilibrium in a well-crafted spell. Seek harmony in your relationships, and you might find yourself with a new magical companion.",
        image: "./assets/spellwand1.png",
        story: "In the Charms classroom, you work on creating a perfectly balanced spell. Your attention to harmony and balance attracts the admiration of a magical companion, and together you embark on a charming adventure."
    },
    scorpio: {
        text: "You're as intense as a duel with Snape today. Harness that passion for a cause you care about, and you'll achieve something extraordinary.",
        image: "./assets/snape1.png",
        story: "During a fierce duel with Snape, you channel your intensity into a powerful spell that leaves the audience in awe. Your passion and dedication lead you to achieve something truly extraordinary, earning respect from even the toughest critics."
    },
    sagittarius: {
        text: "Adventure awaits you, just like an exploration into the depths of Hogwarts' secret passageways. Keep your eyes open for hidden treasures or unexpected allies.",
        image: "./assets/hogwarts1.png",
        story: "With a spirit of adventure, you explore the secret passageways of Hogwarts. Along the way, you discover hidden treasures and make new allies, turning a simple exploration into an unforgettable journey."
    },
    capricorn: {
        text: "Your ambition rivals that of a Slytherin today. Channel it into your goals, and you'll achieve great things. Just remember, a little kindness goes a long way.",
        image: "./assets/slytherin1.png",
        story: "In the Slytherin common room, you set your sights on achieving greatness. With ambition and determination, you work tirelessly towards your goals, all the while remembering the importance of kindness and loyalty."
    },
    aquarius: {
        text: "Your innovative ideas will be as surprising as Dumbledore's delightful surprises. Embrace your uniqueness and share your vision with the world.",
        image: "./assets/dumbledore1.png",
        story: "With innovative ideas and a unique perspective, you surprise everyone with delightful creations, much like Dumbledore's quirky surprises. Your originality and vision set you apart, leading to unexpected and magical outcomes."
    },
    pisces: {
        text: "You're as intuitive as a Divination class today. Follow your instincts, and you might uncover a magical secret or find yourself in the right place at the right time.",
        image: "./assets/divination1.png",
        story: "In the misty Divination classroom, you rely on your intuition to guide you. Following your instincts, you uncover a hidden magical secret and find yourself in the perfect place at the perfect time, much to the astonishment of your classmates."
    }
};

let selectedMonth = null;
let selectedDay = null;
let selectedMonthButton = null;
let selectedDayButton = null;

function createButton(value, parent, clickHandler) {
    const button = document.createElement("button");
    button.className = "button";
    button.textContent = value;
    button.onclick = () => clickHandler(value, button);
    parent.appendChild(button);
}

function handleMonthClick(month, button) {
    selectedMonth = month;
    if (selectedMonthButton) {
        selectedMonthButton.classList.remove("selected");
    }
    selectedMonthButton = button;
    button.classList.add("selected");


    selectedDay = null;
    selectedDayButton = null;
    const dayButtonsContainer = document.getElementById("day-buttons");
    dayButtonsContainer.innerHTML = "<h2>Select Your Birth Day:</h2>";

    const daysInMonth = new Date(2024, month, 0).getDate(); 

    for (let day = 1; day <= daysInMonth; day++) {
        createButton(day, dayButtonsContainer, handleDayClick);
    }
}

function handleDayClick(day, button) {
    selectedDay = day;
    if (selectedDayButton) {
        selectedDayButton.classList.remove("selected");
    }
    selectedDayButton = button;
    button.classList.add("selected");
}

function getHoroscope() {
    if (selectedMonth === null || selectedDay === null) {
        alert("Please select both a month and a day.");
        return;
    }
    const sign = getZodiacSign(selectedMonth, selectedDay);
    currentUserSign = sign;
    const horoscope = generateHoroscope(sign);
    document.getElementById("horoscope-result").textContent = `Your horoscope is (${sign}): ${horoscope.text}`;
    document.getElementById("header-image").src = horoscope.image;
    document.getElementById("horoscope-story").textContent = horoscope.story;

    const house = getHouseForSign(sign);
    awardPoints(house, 10);
}

function getZodiacSign(month, day) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        return "aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        return "taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        return "gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        return "cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        return "leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        return "virgo";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        return "libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        return "scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        return "sagittarius";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return "capricorn";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        return "aquarius";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        return "pisces";
    }
}

function generateHoroscope(sign) {
    return horoscopes[sign.toLowerCase()] || { text: "Sorry, I don't have a horoscope for that sign.", image: "", story: "" };
}

const housePoints = {
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0
};

function awardPoints(house, points) {
    housePoints[house] += points;
    document.getElementById(`${house}-score`).textContent = housePoints[house];
}

function getHouseForSign(sign) {
    switch (sign) {
        case "aries":
        case "leo":
        case "sagittarius":
            return "gryffindor";
        case "taurus":
        case "virgo":
        case "capricorn":
            return "hufflepuff";
        case "gemini":
        case "libra":
        case "aquarius":
            return "ravenclaw";
        case "cancer":
        case "scorpio":
        case "pisces":
            return "slytherin";
    }
}

const quizQuestions = [
    {
        question: "What is the spell for levitation?",
        choices: ["Alohomora", "Expelliarmus", "Wingardium Leviosa", "Avada Kedavra"],
        correct: 2
    },
    {
        question: "Who is the Half-Blood Prince?",
        choices: ["Harry Potter", "Severus Snape", "Draco Malfoy", "Tom Riddle"],
        correct: 1
    },
    {
        question: "Which of these is not a Hogwarts house?",
        choices: ["Ravenclaw", "Hufflepuff", "Gryffindor", "Ravenwolf"],
        correct: 3
    },
    {
        question: "Who was the Triwizard Champion for Hogwarts?",
        choices: ["Harry Potter", "Cedric Diggory", "Viktor Krum", "Fleur Delacour"],
        correct: 1
    },
    {
        question: "What is the name of the Weasley's house?",
        choices: ["The Burrow", "The Nest", "The Hollow", "The Warren"],
        correct: 0
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
const badges = {
    "Potion Master": false,
    "Quidditch Champion": false,
    "Trivia Wizard": false,
    "House Prefect": false
};

function startQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById("quiz-question").textContent = question.question;

    const choicesContainer = document.getElementById("quiz-choices");
    choicesContainer.innerHTML = "";

    question.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => checkAnswer(index);
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    if (selectedIndex === question.correct) {
        document.getElementById("quiz-result").textContent = "Correct!";
        correctAnswers += 1;
    } else {
        document.getElementById("quiz-result").textContent = "Incorrect!";
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz-result").textContent = `Quiz Complete! You got ${correctAnswers} out of ${quizQuestions.length} correct.`;
        checkQuizBadges();
    }
}
let currentUserSign = null;

function checkQuizBadges() {
    if (correctAnswers === quizQuestions.length) {
        earnBadge("Trivia Wizard");
    }
    if (correctAnswers >= 4) {
        earnBadge("House Prefect");
    }

    if (currentUserSign === null) {
        alert("Please first get your horoscope to determine your house.");
        return;
    }

    const userHouse = getHouseForSign(currentUserSign);
    awardPoints(userHouse, correctAnswers * 5);
}


function earnBadge(badgeName) {
    if (!badges[badgeName]) {
        badges[badgeName] = true;
        const badgeElement = document.createElement("div");
        badgeElement.textContent = badgeName;
        badgeElement.className = "badge";
        document.getElementById("badges").appendChild(badgeElement);
    }
}

for (let month = 1; month <= 12; month++) {
    createButton(month, document.getElementById("month-buttons"), handleMonthClick);
}