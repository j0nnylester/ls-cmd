let cmdList;

fetch("/api/cmds")
    .then(response => response.json())
    .then(data => (cmdList = data.payload));

//console.log(cmdList);

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
    //console.log(this.value);
    const matchArray = findMatches(this.value, cmdList);
    console.log(matchArray);
    const html = matchArray
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
        <li><span class="code">${cmdName} ${flagsName}</span> <span class="args">${argsName}</span>
        <br>
        <span class="desc">${descText}</span>
        </li>
        `;
        })
        .join("");
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".searchbox");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
