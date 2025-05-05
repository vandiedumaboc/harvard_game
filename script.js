const applicants = [
    //  Humans (10)
    { name: "Alexis Monroe", statement: "I chose Harvard because I wanted to connect with students from around the world and gain new perspectives that would deepen and enrich my education.", type: "Human" },
    { name: "Jordan Smith", statement: "It was the best ranked for my concentration", type: "Human" },
    { name: "Taylor Nguyen", statement: "As an international student, Harvard holds a lot of weight and networking opportunities that will allow me to make an impact back home.", type: "Human" },
    { name: "Isabella Garcia", statement: "Exposure to a wide variety of intellectual ideas.", type: "Human" },
    { name: "Omar Reed", statement: "Because it is one of, if not the most respected institution with some of the greatest minds working together.", type: "Human" },
    { name: "Nova Chang", statement: "I wanted a liberal arts education and Harvard is simply the best at that, in my opinion.", type: "Human" },
    { name: "Dante Rivera", statement: "According to testimonies from other students, Harvard is special because of its people. It's a learning environment you cannot find anywhere else.", type: "Human" },
    { name: "Maya David", statement: "The variety of extracurriculars and courses was the most appealing aspect of Harvard.", type: "Human" },
    { name: "Camila Torres", statement: "Having peers who are on the same page as you is immensely valuable. I knew I could find such inspiring company at Harvard.", type: "Human" },
    { name: "Ella Bennett", statement: "The Veritas motto truly spoke to me as an applicant. It inspired a sense of power and momentousness, but also one duty that I'd be always reminded to uphold.", type: "Human" },

    // AIs (10)
    { name: "Casey Yu", statement: "I picked Harvard because I wanted the freedom to get creative and try a bit of everything.", type: "AI" },
    { name: "Evan Brooks", statement: "For me, Harvard’s about learning how to lead with both heart and big ideas.", type: "AI" },
    { name: "Vanessa Schneider", statement: "I loved how at Harvard, everyone’s bringing different views to the table. It keeps things real and interesting.", type: "AI" },
    { name: "Karla Nuñez", statement: "Harvard just felt like the kind of place where pushing limits is the norm and that’s how I think, too.", type: "AI" },
    { name: "Luca Knight", statement: "Being around people who ask big, curious questions", type: "AI" },
    { name: "Quinn Foster", statement: "Harvard’s a place where people actually do things with their ideas, and I wanted in.", type: "AI" },
    { name: "Lara Elliesen", statement: "I’ve got a lot of interests, and Harvard makes it easy to bring them together in cool, unexpected ways.", type: "AI" },
    { name: "Leo Zhang", statement: "What drew me to Harvard was how it turns students into leaders, not just thinkers.", type: "AI" },
    { name: "Karina Abarzua", statement: "I’m excited to be at a place where I can combine deep thinking with real purpose.", type: "AI" },
    { name: "Thomas Bluthardt", statement: "Harvard’s all about staying curious and pushing through challenges. That really spoke to me.", type: "AI" },
    { name: "Jade Ramirez", statement: "As a FGLI student, I chose Harvard because I knew my background wouldn’t hold me back, it would actually matter here to make a change.", type: "AI" }
  
];


let current = 0;
let acceptedHumans = 0;
let acceptedAIs = 0;
let rejectedHumans = 0;
let rejectedAIs = 0;
let shuffledApplicants = [];

const startButton = document.getElementById('startButton');
const feedback = document.getElementById('feedback');
const cardTop = document.getElementById('card-top');
const cardNext = document.getElementById('card-next');
const topMessage = document.getElementById('top-message');

startButton.addEventListener('click', startGame);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    shuffledApplicants = shuffle([...applicants]).slice(0,10);
    current = 0;
    acceptedHumans = 0;
    acceptedAIs = 0;
    loadApplicant();
}

function loadApplicant() {
    if (current < 10) {
        const app = shuffledApplicants[current];
        cardTop.querySelector('#name').innerText = app.name;
        cardTop.querySelector('#statement').innerText = app.statement;
        feedback.innerHTML = '';
    } else {
        endGame();
    }
}

function accept() {
    if (shuffledApplicants[current].type === "Human") {
        acceptedHumans++;
    } else {
        acceptedAIs++;
    }
    showTopMessage('ACCEPTED! 🎉', true);
}

function reject() {
    if (shuffledApplicants[current].type === "Human") {
        rejectedHumans++;
    } else {
        rejectedAIs++;
    }
    showTopMessage('REJECTED 😞', false);
}

function endGame() {
    const totalAccepted = acceptedHumans + acceptedAIs;
    const totalReviewed = 10; // always 10 rounds
    const humanPercent = Math.round((acceptedHumans / totalAccepted) * 100) || 0;
    const aiPercent = Math.round((acceptedAIs / totalAccepted) * 100) || 0;

    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'flex';
    document.getElementById('result').style.flexDirection = 'column';
    document.getElementById('result').style.alignItems = 'center';
    document.getElementById('result').style.justifyContent = 'center';
    document.getElementById('result').style.textAlign = 'center';

    document.getElementById('result').innerHTML = `
        <h2>Admissions Summary</h2>
        <h3>Accepted Students: ${totalAccepted}/${totalReviewed}</h3>
        <div style="background: white; padding: 20px; border-radius: 10px; display: inline-block; margin-bottom: 20px;">
            <canvas id="resultsChart" width="300" height="200"></canvas>
        </div>
        <p>You accepted ${totalAccepted} out of 10 candidates, of which ${humanPercent}% are human and ${aiPercent}% are AI.</p>
        <p>Thank you for serving as a Senior Admissions Officer at Harvard. The future is in good hands!</p>
        <button id="restartButton" style="margin-top: 20px;">Play Again</button>
    `;

    document.getElementById('restartButton').addEventListener('click', startGame);

    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Humans Accepted', 'AIs Accepted'],
            datasets: [{
                label: 'Accepted Applicants',
                data: [acceptedHumans, acceptedAIs],
                backgroundColor: ['#4CAF50', '#317873'], // Green for Humans, Calypso for AIs
                borderColor: ['#388E3C', '#255E5C'],
                borderWidth: 1,
                barThickness: 40
            }]
        },
        options: {
            responsive: false,
            animation: {
                duration: 1200
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}



let offsetX = 0;
let offsetY = 0;
let isDragging = false;

cardTop.addEventListener('mousedown', startDrag);
cardTop.addEventListener('touchstart', startDrag);

function startDrag(e) {
    isDragging = true;
    offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - cardTop.offsetLeft;
    offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - cardTop.offsetTop;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!isDragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
    cardTop.style.transform = `translate(${x}px, ${y}px) rotate(${x/10}deg)`;

    if (x > 100) feedback.innerText = '✅';
    else if (x < -100) feedback.innerText = '❌';
    else feedback.innerText = '';
}

function endDrag(e) {
    isDragging = false;
    const finalX = parseInt(cardTop.style.transform.split(',')[0].replace('translate(', '')) || 0;

    if (finalX > 100) {
        accept();
        moveCard('right');
    } else if (finalX < -100) {
        reject();
        moveCard('left');
    } else {
        cardTop.style.transform = '';
        feedback.innerHTML = '';
    }

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
}

function moveCard(direction) {
    cardTop.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    cardTop.style.transform = direction === 'right' ? 'translateX(400px) rotate(20deg)' : 'translateX(-400px) rotate(-20deg)';
    cardTop.style.opacity = 0;
    
    setTimeout(() => {
        cardTop.style.transition = '';
        cardTop.style.transform = '';
        cardTop.style.opacity = 1;
        current++;
        loadApplicant();
    }, 500);
}

function showTopMessage(message, confettiFlag) {
    topMessage.innerText = message;
    topMessage.style.opacity = 1;
    setTimeout(() => {
        topMessage.style.opacity = 0;
    }, 1500);

    if (confettiFlag) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.4 }
        });
    }
}
