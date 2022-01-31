var userForm = document.querySelector('#start-question');
var avatarContainer = document.querySelector('#start-question');
var userData = ['Joe', 'avatar'];
var currentQuestion = 0;
var questionBox = document.querySelector('#box-questions');
var questionForm = document.querySelector('.quiz-form');
var correctAnswers = ['B', 'D', 'B', 'A', 'C', 'B', 'C'];
var resultContainer = document.querySelector('.quiz__heading');
var btnPrev = document.querySelector('#prev');
var btnNext = document.querySelector('#next');

avatarContainer.addEventListener('click', function(event){
    if(document.querySelectorAll('.show')){
        document.querySelectorAll('.show').forEach(function(item){
            item.classList.remove('show');
        })
    }
    if(event.target.tagName === 'INPUT' && event.target.type === 'radio'){
        //console.log(event.target.previousElementSibling);
        event.target.previousElementSibling.firstElementChild.classList.add('show');
    }
})

userForm.addEventListener('submit', function(event){
    var activeAvatar = document.querySelector('input[name="question2"]:checked');
    var activeName = userForm.elements.question1.value;
    var activeImg = activeAvatar.previousElementSibling.firstElementChild.src;
    userData = [activeName, activeImg];

    userForm.classList.add('quiz');
    questionBox.classList.remove('quiz');
    scrollingUp();

    //console.log(userData);
    event.preventDefault();

    showQuestion();
})

questionForm.addEventListener('submit', function(event){
    var userInfo = document.querySelector('.name__user');
    var counter = 0;
    var startResult = 0;

    var userAnswer = [
        questionForm.elements.q1,
        questionForm.elements.q2,
        questionForm.elements.q3,
        questionForm.elements.q4,
        questionForm.elements.q5,
        questionForm.elements.q6,
        questionForm.elements.q7
    ]

    userAnswer.forEach(function(item, index){
        if(item.value === correctAnswers[index]){
            counter += 20;
            for (var i = 0; i < item.length; i++){
                var isChecked = item[i].checked;
                if(isChecked){
                    item[i].parentElement.classList.add('correct');
                }
            }
        } else {
            for (var i = 0; i < item.length; i++){
                var isChecked = item[i].checked;
                if(isChecked){
                    item[i].parentElement.classList.add('wrong');
                }
            }
        }

    })

    resultContainer.classList.add('show-quiz');

    userInfo.innerHTML = userData[0] + '<img src="'+ userData[1] +'" alt="user">' + counter;

    scrollingUp();

    event.preventDefault();
})

function scrollingUp(){
    window.scrollTo({
        top: 0,
        bahavior: 'smooth'
    })
}


function showQuestion(){
    if (currentQuestion === 0){
        btnPrev.classList.add('hide-navigation-btn');
        questionForm.children[questionForm.children.length - 2].classList.add('btn-right-align');
    } else {
        btnPrev.classList.remove('hide-navigation-btn');
        questionForm.children[questionForm.children.length - 2].classList.remove('btn-right-align');
    }

    if (currentQuestion === questionForm.children.length - 3){
        btnNext.classList.add('hide-navigation-btn');
        questionForm.children[questionForm.children.length - 1].style.display = 'block';
    } else {
        btnNext.classList.remove('hide-navigation-btn');
        questionForm.children[questionForm.children.length - 1].style.display = 'none';
    }

    for (var i = 0; i < questionForm.children.length - 2; i++){
        if(i === currentQuestion){
            questionForm.children[i].style.display = 'block';
        } else {
            questionForm.children[i].style.display = 'none';
        }
    }

}

function clickNext(){
    ++currentQuestion;

    showQuestion();
}

btnNext.addEventListener('click', clickNext);


function clickPrev(){
    --currentQuestion;

    showQuestion();
}

btnPrev.addEventListener('click', clickPrev);




