const root = document.getElementById("root")

let active = 0
let username
const screens = new Array(4).fill(0).map((_, id) => `screen${id}`)

const screen0 = document.getElementById("screen0")
const screen1 = document.getElementById("screen1")
const screen2 = document.getElementById("screen2")
const screen3 = document.getElementById("screen3")

function screenUp(inc) {
    screens.forEach(screen => {
        if (screen !== `screen${inc}`) {
            document.getElementById(screen).classList.add('inactive')
        }
        else {
            document.getElementById(screen).classList.remove('inactive')
        }
    })
}
screenUp(active)
const uinput = document.getElementById("fname")
uinput.addEventListener('keyup', event => {
    username = event.target.value
    document.getElementById("username").innerHTML = username
    document.getElementsByTagName("footer")[0].innerText = username
})

document.getElementById("submit1").addEventListener('click', ev => {
    active++
    screenUp(active)
    console.log('animet')
})
let s = 0, l = 0, inter;
const submit2 = document.getElementById("submit2")
const imgWrap = document.getElementsByClassName('img-wrapper')
const imgWrap1 = document.getElementsByClassName('img-wrapper1')
const uBoard = document.getElementById("userBoard")
const flashText = document.getElementById('flash')
const arr = ["Rock", "Paper", "Scissor", "Shoot"]
function startGame() {
    console.log({ s, l })
    imgWrap[s].classList.add('activeBox')
    imgWrap[s == 0 ? 2 : s - 1].classList.remove('activeBox')
    if (s == 2) s = 0
    else s++
    if (arr[l / 3]) flashText.innerText = arr[l / 3]
    l++
    if (l === 12) {
        clearInterval(inter)
        uBoard.classList.remove('stop')
        submit2.classList.add('stop')
        document.querySelectorAll('.img-wrapper').forEach(el => el.classList.add('activeBox'))
    }
}
async function start() {
    flashText.classList.remove('stop')
    console.log('start')
    inter = await setInterval(startGame, 1000);
}
submit2.addEventListener('click', start)

let compPrefer, userPrefer

const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
let uWin = 0, cWin = 0, total = 0
function select(param) {
    compPrefer = Math.floor(Math.random() * 3)
    console.log(document.getElementsByClassName('img-wrapper')[compPrefer])
    document.getElementsByClassName('img-wrapper')[compPrefer].classList.remove('activeBox')
    let uv = true
    switch (`${param}_${arr[compPrefer]}`) {
        case "Rock_Paper":
            cWin++
            uv = false
            break;
        case "Paper_Scissor":
            cWin++
            uv = false
            break;
        case "Scissor_Rock":
            cWin++
            uv = false
            break;
        case "Rock_Paper":
            uWin++
            break;
        case "Paper_Scissor":
            uWin++
            break;
        case "Scissor_Rock":
            uWin++
            break;
    }
    total++
    document.getElementById("submit3").classList.remove("stop")
    if (uv) flashText.innerText = "You have won the level"
    else flashText.innerText = "You have lost the level"
    document.getElementsByTagName("header")[0].innerText = `Computer: ${cWin} | You: ${uWin} | Total: ${total}`

}
document.getElementById("submit3").addEventListener('click', eve => {
    flashText.classList.add('stop')
    uBoard.classList.add('stop')
    document.getElementById("submit3").classList.add('stop')
    submit2.classList.remove('stop')
    s = 0;
    l = 0
    document.querySelectorAll('.img-wrapper').forEach(el => el.classList.remove('activeBox'))
    document.querySelectorAll('.img-wrapper1').forEach(el => el.classList.remove('activeBox'))
})

rock.addEventListener('click', () => {
    rock.classList.add("activeBox")
    select('Rock')
})
paper.addEventListener('click', () => {
    paper.classList.add('activeBox')
    select('Paper')
})
scissors.addEventListener('click', () => {
    scissors.classList.add('activeBox')
    select('Scissor')
})