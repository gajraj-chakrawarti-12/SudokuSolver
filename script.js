var buttons = document.querySelectorAll(".buttons");
let solve = document.querySelector("#solve");
var newGame = document.querySelector("#newGame");
var playNow = document.querySelector("#playNow");
var body = document.querySelector("body");
buttons = Array.from(buttons);
body.style.height = document.documentElement.clientHeight + "px";
body.style.width = document.documentElement.clientWidth + "px";
playNow.onclick = () => {
    document.querySelector("#playNow").style.display = "none";
    document.querySelector("#play").style.display = "block";
}

function isSafe(index, value) {
    for (let i = 0; i < 9; i++) {
        if (buttons[i * 9 + (index % 9)].value === value) {
            return false;
        }
        if (buttons[((Math.floor(index / 9)) * 9) + i].value === value) {
            return false;
        }
    }
    const sc = (Math.floor((index % 9) / 3)) * 3, sr = (Math.floor(Math.floor(index / 9) / 3) * 3);
    for (let i = sr; i < sr + 3; i++) {
        for (let j = sc; j < sc + 3; j++) {
            if (buttons[i * 9 + j].value === value) {
                return false;
            }
        }
    }
    return true;
}

function solver(index) {
    if (index === 81) {
        return true;
    }
    let nindex = index + 1;
    if (buttons[index].value != "") {
        if (solver(nindex)) {
            return true;
        }
    } else {
        for (let i = 1; i < 10; i++) {
            if (isSafe(index, ("" + i + ""))) {
                buttons[index].value = ("" + i + "");
                buttons[index].disabled = true;
                buttons[index].style.color = "red";
                if (solver(nindex)) {
                    return true;
                } else {
                    buttons[index].value = "";
                }
            }
        }
    }
    return false;
}

function clearAll() {
    buttons.forEach((element) => {
        element.disabled = false;
        element.value = "";
    });
}

function insert(button) {
    if (button.value > 0 && button.value < 10) {
        const value = button.value;
        const index = buttons.indexOf(button);
        button.value = '';
        if (isSafe(index, value)) {
            button.value = value;
            button.disabled = true;
            buttons[index].style.color = "black";
        } else {
            alert(value + " is not valid number.");
        }
    } else {
        alert(button.value + " is not valid number.");
        button.value = '';
    }
}

buttons.forEach(button => {
    button.onclick = () => {
        console.log(button);
    }
    button.onchange = () => {
        insert(button);
    }
})

solve.onclick = () => {
    solver(0);
    solve.style.display = "none";
    newGame.style.display = "block";
}

newGame.onclick = () => {
    clearAll();
    solve.style.display = "block";
    newGame.style.display = "none";
}