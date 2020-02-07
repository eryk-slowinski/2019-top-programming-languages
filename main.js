const programmingLanguages = ['JavaScript', 'Python', 'Java', 'PHP', 'C#', 'C++', 'TypeScript', 'Shell', 'C', 'Ruby'];
const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

const listItems = [];
let dragStartIndex;

createList();

function createList() {
    [...programmingLanguages]
    .map(item => ({
            value: item,
            sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(item => item.value)
        .forEach((language, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="language-name">${language}</p>
        </div>
        `;
            listItems.push(listItem);

            draggableList.appendChild(listItem);
        })
    addEventListeners();
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
    e.preventDefault();
    this.classList.add('over');
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const languageName = listItem.querySelector('.draggable').innerText.trim();
        if (languageName !== programmingLanguages[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('correct');
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => draggable.addEventListener('dragstart', dragStart));
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragleave', dragLeave);
    })
}

checkBtn.addEventListener('click', checkOrder);