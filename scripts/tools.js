const question = document.querySelector('label');
const inputList = document.querySelectorAll('input');
const btnList = document.querySelectorAll('button');
const questionPre = document.getElementById('question-pre');

// 根据输入的范围生成一个随机数字
function randomNum(){
    var minNum = Number(inputList[0].value);
    var maxNum = Number(inputList[1].value);
    return Math.floor(Math.floor(Math.random()*10) * (maxNum-minNum)/9) + minNum;
} 

// 替换题目
function replaceNum() {
    question.textContent = randomNum() + ' x ' + randomNum() + ' = ';
}

// 题量与答对计数
let quesAll = Number(document.getElementById('ques-all').textContent);
let quesTrue = Number(document.getElementById('ques-true').textContent);

// 10条历史记录

function replaceHistoty(history) {
    var historyUl = document.getElementById('history');
    var ulList = historyUl.querySelectorAll('li');
    if (ulList.length > 9) {
        historyUl.removeChild(ulList[0]);
    }
    var newLi = document.createElement('li');
    var liNode = document.createTextNode(history);
    newLi.append(liNode);
    historyUl.appendChild(newLi);

    console.log(historyUl);
}

// 开始按钮
function startButton() {
    if (btnList[0].textContent === '开始') {
        btnList[0].textContent = '重置';
        replaceNum();
    } else {
        btnList[0].textContent = '开始';
        document.getElementById('ques-all').textContent = 0;
        document.getElementById('ques-true').textContent = 0;
        document.getElementById('ques-accuracy').textContent = 0;
    }
}

btnList[0].addEventListener('click', startButton);

// 数字按钮
btnList[1].onclick = function() { inputList[2].value += btnList[1].value; };
btnList[2].onclick = function() { inputList[2].value += btnList[2].value; };
btnList[3].onclick = function() { inputList[2].value += btnList[3].value; };
btnList[4].onclick = function() { inputList[2].value += btnList[4].value; };
btnList[5].onclick = function() { inputList[2].value += btnList[5].value; };
btnList[6].onclick = function() { inputList[2].value += btnList[6].value; };
btnList[7].onclick = function() { inputList[2].value += btnList[7].value; };
btnList[8].onclick = function() { inputList[2].value += btnList[8].value; };
btnList[9].onclick = function() { inputList[2].value += btnList[9].value; };
btnList[10].onclick = function() { inputList[2].value += btnList[10].value; };
btnList[11].onclick = function() { inputList[2].value += btnList[11].value; };
btnList[12].onclick = function() { inputList[2].value += btnList[12].value; };

// ok按钮
btnList[16].onclick = function() {
    var qTxt = question.textContent;
    // 把问题前置一个
    questionPre.textContent = qTxt + inputList[2].value;
    qTxt = qTxt.replace(' x ', '*');
    qTxt = qTxt.replace(' = ', '');

    quesAll += 1;
    document.getElementById('ques-all').textContent = quesAll;
    if (eval(qTxt) === Number(inputList[2].value)) {
        questionPre.textContent += ' 正确';
        quesTrue += 1;
        document.getElementById('ques-true').textContent = quesTrue;
    } else {
        questionPre.textContent += ' 错误 答案:' + eval(qTxt);
    }
    document.getElementById('ques-accuracy').textContent = Math.round(quesTrue/quesAll*10000)/100 + '%';
    inputList[2].value = '';
    replaceNum();
    replaceHistoty(questionPre.textContent);
}

// del按钮
btnList[13].onclick = function() {
    var valueTxt = inputList[2].value;
    inputList[2].value = valueTxt.slice(0, valueTxt.length-1);
}

// cl按钮
btnList[14].onclick = function() {
    inputList[2].value = '';
}

// auto按钮
btnList[15].onclick = function() {
    var qTxt = question.textContent;
    qTxt = qTxt.replace(' x ', '*');
    qTxt = qTxt.replace(' = ', '');
    inputList[2].value = eval(qTxt);
}

