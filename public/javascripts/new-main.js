const cmdList = [
    {
        type: "git",
        cmd: "git config --global user.name '[firstname lastname]'",
        desc:
            "set a name that is identifiable for credit when review version history"
    },
    {
        type: "git",
        cmd: "git config --global user.email “[valid-email]”",
        desc:
            "set an email address that will be associated with each history marker"
    },
    {
        type: "git",
        cmd: "git config --global color.ui auto",
        desc: "set automatic command line coloring for Git for easy reviewing"
    }
];

function findMatches(cmdToMatch, cmdList) {
    return cmdList.filter(command => {
        const regex = new RegExp(cmdToMatch, "gi");
        return command.cmd.match(regex) || command.desc.match(regex);
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
            const descText = command.desc.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            return `
        <li>${cmdName}, ${descText}</span>
        <span class="population">${command.type}</span>
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
