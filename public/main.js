let cmdList;

fetch("/cmds")
    .then(response => response.json())
    .then(data => (cmdList = data.payload));

function findMatches(cmdToMatch, cmdList) {
    return cmdList.filter(command => {
        const regex = new RegExp(cmdToMatch, "gi");
        return `${command.cmd} ${command.flags} ${command.args} ${
            command.desc
        }`.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, cmdList);
    if (matchArray.length === 0) {
        const nocmd = ``;
        suggestions.innerHTML = nocmd;
    }
    const cmdhtml = matchArray
        .map(command => {
            return `
        <li class="list-suggestions"><span class="cmd">${
            command.cmd
        }</span> <span class="flags">${
                command.flags
            }</span> <span class="args">${command.args}</span>
        <br>
        <span class="desc">${command.desc}</span>
        </li>
        `;
        })
        .join("");
    suggestions.innerHTML = cmdhtml;
}

const searchInput = document.querySelector(".searchbox");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
