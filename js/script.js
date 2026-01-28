let addBtn = document.getElementById('addBtn');
let diaryInput = document.getElementById('diaryInput');
let diaryList = document.getElementById('diaryList');

let countText = document.getElementById('countText');

let diaryDate = [];

if(localStorage.getItem('diaryDate')){
    diaryDate = JSON.parse(localStorage.getItem('diaryDate'));
    dateList();
}

function dateList(){
    diaryList.innerHTML = '';
    countText.textContent = '記録数：'+ diaryDate.length + '件';

    diaryDate.forEach(function(date,index){
        let newP = document.createElement('p');

        if (date.endsWith(" (編集済み)")) {

            let mainText = date.slice(0, -7);

            newP.textContent = mainText;

            let span = document.createElement('span');
            span.textContent = " (編集済み)";
            span.style.color = "#999";
            span.style.fontSize = "0.8em";

            newP.appendChild(span);
        } else {

            newP.textContent = date;
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "削除";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.backgroundColor = "#ff4444"

        deleteBtn.addEventListener("click",function(){
            diaryDate.splice(index,1);
            localStorage.setItem('diaryDate',JSON.stringify(diaryDate));
            dateList();
        });

        let editBtn = document.createElement('button');
        editBtn.textContent = "編集";
        editBtn.style.marginLeft = "5px";

        editBtn.addEventListener("click", function(){

            let words = date.split(" ");
            let datePart = words[0] + " " + words[1]; 
            let oldMessage = date.substring(datePart.length + 1);

            if (oldMessage.endsWith(" (編集済み)")) {
                oldMessage = oldMessage.slice(0, -7);
            }

            let newText = prompt("内容を修正してください", oldMessage);

            if (newText !== null){
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let day = now.getDate();
                let hour = now.getHours();
                let min = now.getMinutes();

                let newDateString = year + "/" + month + "/" + day + " " + hour + ":" + min;


                diaryDate[index] = newDateString + " " + newText + " (編集済み)";

                localStorage.setItem('diaryDate', JSON.stringify(diaryDate));
                dateList();
            }
        });

        newP.appendChild(deleteBtn);
        newP.appendChild(editBtn);

        diaryList.prepend(newP);
    });
}

addBtn.addEventListener('click',function(){
    let text = diaryInput.value;

    if (text === ''){
        alert('文字を入力してください！');

        return;
    }

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1
    let day = now.getDate();
    let hour = now.getHours();
    let min = now.getMinutes();

    let dateString = year + "/" + month + "/" + day + " " +hour + ":" + min;

    let fullText = dateString + ' ' + text;

    diaryDate.push(fullText);

    dateList();

    localStorage.setItem('diaryDate',JSON.stringify(diaryDate));

    diaryInput.value = '';
});