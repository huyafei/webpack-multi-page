import './index.css';
import {fun} from "utils/js-toolkit.js"

let person = {
  name:"张三",
  age:18,
  hobby:[
    {
      name:"篮球",
      id:1
    }
  ]
}

console.log(person?.name)



const submit1 = function () {
  console.log("按钮1")
}
const BtnEl = document.getElementById("btn2")
BtnEl.onclick = () => {
  const arr = [1, 2, 3]
  const arr2 = [4, 5, 6]
  const arr3 = [...arr, ...arr2]
  console.log("submit2", arr3)
  fun()
}
