function onOff() {
  document.querySelector('#modal')
    .classList
    .toggle('hide')
  
  document.querySelector('body')
    .classList
    .toggle('hideScroll')
  
  document.querySelector('#modal')
    .classList
    .toggle('addScroll')
}

function checkFields(event) {
  const valuesToCheck = [
    "title",
    "image",
    "category",
    "description",
  ]

  const isEmpty = valuesToCheck.find(function(value) {
    const checkIfItIsString = typeof event.target[value].value === "string"
    const checkIfIsEmpty = !event.target[value].value.trim()

    if(checkIfItIsString && checkIfIsEmpty){
      return true
    }
  })

  if(isEmpty) {
    event.preventDefault()
    alert('Por favor, preencha os campos obrigatórios')
  }
}