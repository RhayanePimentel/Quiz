const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Clarice Lispector é conhecida por seu estilo introspectivo e inovador. Qual é o título de seu romance mais famoso, que explora temas de identidade e existência?",
    answers: [
      { text: "Grande Sertão: Veredas", correct: false },
      { text: "Memórias Póstumas de Brás Cubas", correct: false },
      { text: "A Hora da Estrela", correct: true },
      { text: "O Primo Basílio", correct: false }
    ]
  },
  {
    question: "Fernando Pessoa é um dos maiores poetas da língua portuguesa e criou vários heterônimos. Qual destes é um de seus heterônimos mais conhecidos, que possui uma personalidade bucólica?",
    answers: [
      { text: "Alberto Caeiro", correct: true },
      { text: "Ricardo Reis", correct: false },
      { text: "Álvaro de Campos", correct: false },
      { text: "Em outro lugar", correct: false }
    ]
  },
  {
    question: 'Qual autor brasileiro escreveu o clássico “O Guarani”, que é considerado um dos principais romances indianistas da literatura brasileira?',
    answers: [
      { text: 'José de Alencar', correct: true },
      { text: 'Aluísio Azevedo', correct: false },
      { text: 'Machado de Assis', correct: false },
      { text: "Graciliano Ramos", correct: false }
    ]
  },
  {
    question: 'No poema “Tabacaria”, Fernando Pessoa (sob o heterônimo Álvaro de Campos) reflete sobre a vida e o sentido da existência. Complete o trecho: “Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte isso, tenho em mim todos os ____.”',
    answers: [
      { text: "desejos ocultos", correct: false },
      { text: "sonhos do mundo", correct: true }
    ]
  },
  {
    question: 'Em “Dom Casmurro”, de Machado de Assis, a personagem Capitu é famosa por sua personalidade enigmática. Qual característica marcante dos olhos de Capitu é descrita pelo narrador?',
    answers: [
      { text: 'Olhos de esmeralda', correct: false },
      { text: 'Olhos de ressaca', correct: true },
      { text: 'Olhos de saudade', correct: false },
      { text: 'Olhos de tempestade', correct: false }
    ]
  },
  {
    question: 'Qual é o nome do heterônimo de Fernando Pessoa que é conhecido por sua visão pessimista e estilo de escrita melancólico?',
    answers: [
      { text: 'Alberto Caeiro', correct: false },
      { text: 'Bernardo Soares', correct: true },
      { text: 'Álvaro de Campos', correct: false },
      { text: 'Ricardo Reis', correct: false }
    ]
  },
  {
    question: 'Clarice Lispector é uma das maiores escritoras brasileiras e autora de "A Hora da Estrela". Qual é o nome da protagonista desse livro?',
    answers: [
      { text: 'G.H.', correct: false },
      { text: 'Virgínia', correct: false },
      { text: 'Lóri', correct: false },
      { text: 'Macabéa', correct: true },
    ]
  },
]