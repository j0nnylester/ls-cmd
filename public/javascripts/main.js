let cmdList;

fetch("/cmds")
    .then(response => response.json())
    .then(data => (cmdList = data.payload));

function findMatches(cmdToMatch, cmdList) {
    return cmdList.filter(command => {
        const regex = new RegExp(cmdToMatch, "gi");
        return (
            command.cmd.match(regex) ||
            command.flags.match(regex) ||
            command.args.match(regex) ||
            command.desc.match(regex)
        );
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
            const regex = new RegExp(this.value, "gi");
            const cmdName = command.cmd.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            const flagsName = command.flags.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            const argsName = command.args.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            const descText = command.desc.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            return `
        <li class="list-suggestions"><span class="cmd">${cmdName}</span> <span class="flags">${flagsName}</span> <span class="args">${argsName}</span>
        <br>
        <span class="desc">${descText}</span>
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
