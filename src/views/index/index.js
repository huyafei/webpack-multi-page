import './index.css';
import {fun} from "utils/js-toolkit.js"

const submit1 = function () {
  console.log("submit1")
}
const BtnEl=document.getElementById("btn1")
BtnEl.onclick=function () {
  console.log("submit1")
  fun()
}
