const question = document.querySelector('label');
const inputList = document.querySelectorAll('input');
const startButton = document.querySelector('button');
const questionPre = document.getElementById('question-pre');

// 答题计数
let quesAll = 0;
let quesTrue = 0;

// 根据填入的数字生成一个随机数
function randomNum(){
    var minNum = Number(inputList[0].value);
    var maxNum = Number(inputList[1].value);
    return Math.floor(Math.floor(Math.random()*10) * (maxNum-minNum)/9) + minNum;
}

// 重置按钮
function start() {
    question.textContent = randomNum() + ' x ' + randomNum() + ' = ';
    questionPre.textContent = '重置成功';
    document.getElementById('ques-all').textContent = 0;
    document.getElementById('ques-true').textContent = 0;
    document.getElementById('ques-accuracy').textContent = 0;
    quesAll = 0;
    quesTrue = 0;
}

// 更新历史记录函数
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
}

// 回车键
function ok() {
    quesAll += 1; // 总题量 +1
    var qTxt = question.textContent;
    questionPre.textContent = qTxt + inputList[2].value; // 把提交的前置一个
    quesAll += 1; // 总题数 +1
    document.getElementById('ques-all').textContent = quesAll;
    qTxt = qTxt.replace(' x ', '*');
    qTxt = qTxt.replace(' = ', '');

    // 正确：正确数更新，前置答题追加 【正确提示】；否则 前置的答题追加【错误提示】
    if (eval(qTxt) === Number(inputList[2].value)) {
        questionPre.textContent += ' 正确';
        quesTrue += 1; // 正确数 +1
        document.getElementById('ques-true').textContent = quesTrue;
    } else {
        questionPre.textContent += ' 错误 答案:' + eval(qTxt);
    }

    // 修改正确率
    document.getElementById('ques-accuracy').textContent = Math.round(quesTrue/quesAll*10000)/100 + '%';

    // 更新题目
    inputList[2].value = '';
    question.textContent = randomNum() + ' x ' + randomNum() + ' = ';

    // 更新历史记录
    replaceHistoty(questionPre.textContent);
}

function keyOk(e) {
    var e = e || window.event;  //标准化事件处理
    if (e.keyCode === 13) {
        ok();
    }
}


startButton.addEventListener('click', start);
inputList[2].onkeyup = keyOk;
