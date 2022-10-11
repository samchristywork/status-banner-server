let sample=document.querySelector("#sample");
let colorfg=document.querySelector("#colorfg")
let colorbg=document.querySelector("#colorbg")

sample.style.color="#f5c211"
sample.style.background="#813d9c"

colorfg.addEventListener("input", e=>{
  sample.style.color=colorfg.value
})

colorbg.addEventListener("input", e=>{
  sample.style.background=colorbg.value
})
