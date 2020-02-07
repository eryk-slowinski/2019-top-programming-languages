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
}