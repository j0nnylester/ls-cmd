// main.js
const cmdsList = document.getElementById("cmd");
const gitsList = document.getElementById("git");

const appendToCmd = item => {
    let newP = document.createElement("li");
    newP.innerHTML = `<a href="/cmd/${item.id}">${item.cmd}</a>`;
    cmdsList.appendChild(newP);
};
const appendToGit = item => {
    let newP = document.createElement("li");
    newP.innerHTML = `<a href="/git/${item.id}">${item.cmd}</a>`;
    gitsList.appendChild(newP);
};

const showAll = () => {
    fetch("./api/cmd")
        .then(response => response.json())
        .then(response => response.payload.forEach(appendToCmd));

    fetch("./api/git")
        .then(response => response.json())
        .then(response => response.payload.forEach(appendToGit));
};

showAll();
