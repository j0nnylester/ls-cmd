// main.js
const cmdsList = document.getElementById("cmd");
const gitsList = document.getElementById("git");
const cmdtype = document.getElementById("cmdOrGit");
const cmdtext = document.getElementById("newCmd");
const desctext = document.getElementById("newDesc");

const appendToCmd = item => {
    let newP = document.createElement("li");
    newP.innerHTML = `<a href="/cmds/${item.id}">${item.cmd}</a>`;
    cmdsList.appendChild(newP);
};
const appendToGit = item => {
    let newP = document.createElement("li");
    newP.innerHTML = `<a href="/gits/${item.id}">${item.cmd}</a>`;
    gitsList.appendChild(newP);
};

const showAll = () => {
    cmdsList.innerHTML = ``;
    gitsList.innerHTML = ``;
    fetch("./api/cmds")
        .then(response => response.json())
        .then(response => response.payload.forEach(appendToCmd));

    fetch("./api/gits")
        .then(response => response.json())
        .then(response => response.payload.forEach(appendToGit));
};

const addCmd = event => {
    event.preventDefault();
    type = event.target[1].value;
    console.log("cmd", event.target[2].value);
    console.log("des", event.target[3].value);

    fetch(`/api/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            cmd: event.target[2].value,
            desc: event.target[3].value
        })
    })
        .then((cmdtext.value = ""))
        .then((desctext.value = ""))
        .then(showAll())
        .catch(err => console.log({ error: err }));
};

showAll();
