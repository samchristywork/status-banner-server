let sample=document.querySelector("#sample");
let colorfg=document.querySelector("#colorfg")
let colorbg=document.querySelector("#colorbg")

sample.style.color=colorfg.value
sample.style.background=colorbg.value

colorfg.addEventListener("input", e=>{
  sample.style.color=colorfg.value
})

colorbg.addEventListener("input", e=>{
  sample.style.background=colorbg.value
})
