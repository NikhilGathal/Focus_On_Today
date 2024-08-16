
// const addCardBtn = document.querySelector('.add-card')
// const contain = document.querySelector('.card-container')


// let card =''
// addCardBtn.addEventListener('click' , (e)=>
// {
//   // console.log("hello");
  
//  card += ` <div class="goal-container">
//             <div class="custom-checkbox">
//               <img class="check-icon" src="/icon/Vector 1.svg" alt="" />
//             </div>
//             <input
//               id="third"
//               class="goal-input"
//               type="text"
//               placeholder="Add new goal... "
//             />
//           </div>`
//           contain.innerHTML =  card
// })



const checkboxlist = document.querySelectorAll('.custom-checkbox')
const inpfields = document.querySelectorAll('.goal-input')

const error = document.querySelector('.error-label')
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const quote = document.querySelector('.quote')


const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

//  to get array of all values of object that is allgoals and returns no of true values 
let completedgoal = Object.values(allGoals).filter((goal) => goal.completed).length

// when page reloads we should get updated progrss bar and its vlaues dynamically
progressvalue.style.width = `${(completedgoal / inpfields.length) * 100}%`
progressvalue.firstElementChild.innerText = `${completedgoal}/${inpfields.length} completed`
progressLabel.innerText = allQuotes[completedgoal]



checkboxlist.forEach((checkbox) => {
  console.log("hello");
  
  // console.log(checkbox);
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inpfields].every((input) => {
      return input.value
    })

    if (allGoalsAdded) {

      // on which checkbox we clicked for that add completed class therefore toggle
      checkbox.parentElement.classList.toggle('completed')

// on which checkbox we clicked we need to change its value from true to false and from false to true

      const inpid = checkbox.nextElementSibling.id

      allGoals[inpid].completed = !allGoals[inpid].completed


      // to update completedgoal count immediately after changing value from true to false of from false to true
      completedgoal = Object.values(allGoals).filter( (goal) => goal.completed).length
      progressvalue.style.width = `${(completedgoal / inpfields.length) * 100}%`
      progressvalue.firstElementChild.innerText = `${completedgoal}/${inpfields.length}completed`
      progressLabel.innerText = allQuotes[completedgoal]

      if (completedgoal > 0) {
        quote.innerText = `"Keep Going, You're making great progress!"`
      } else {
        quote.innerText = `"Move one step ahead,today"`
      }

      // to update value in the local storage also of completed for each object when we click on each checkbox

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      //avoid css in js error.style.display ="block"
      progressbar.classList.add('show-error')
    }
  })
})


// used when localstorage is empty then assign this object value

// {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }






if (completedgoal > 0) {
  quote.innerText = `"Keep Going, You're making great progress!"`
} else {
  quote.innerText = `"Move one step ahead,today"`
}

// this for each is executed when we want to fetch data from localstorage

inpfields.forEach((input) => {


  // if is used because when for the first time we run the code with no localstorage then we get error becz 
  // allGoals[input.id] is undefined

  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    // to fetch data from localstorage and check whether completed or not
    // because  when we fetch data from localstorage we are not clicking checkbox  
    // it should be completed already if task is completed from localstorage 
    // to add completed class below code is needed
    // below class is added when completed value is true only from localstorage
    // completed value becomes true only when we clicked on that checkbox
    
    // allGoals[input.id].completed if this is present then only add class to it

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressbar.classList.remove('show-error')
  })


 

  input.addEventListener('input', (e) => {

// once goal is ticked that is completed then we cannot edit the text inside it for that below code 

// allGoals[input.id] && need to add this because in first time when we run the code then value of allGoals[input.id] this is undefined
// to avoid this use this  allGoals[input.id] &&

    if ( allGoals[input.id] && allGoals[input.id].completed) {
      console.log('executed return')
      input.value = allGoals[input.id].name
      return
    }

    // return is used because if not used then values updated in localstorage also and in object also we can edit the goal 

    // console.log(e.target.id);
    // same output if we use input.id
    // console.log(input.id);

    
    // below code is to add goal for the first time when 

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
      console.log("run when we get data from localstorage and while updating it after uncheck checkbox this if block will executes");
      
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
      console.log("run when localstorage is empty and for the first time when we add goal into it this else will executes");
      
    }
    // update value to the localstorage when object is created

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
    console.log(allGoals)
  })
})

// Complete this project today
// Speak English for 10 minutes
// Practice Event Listener in JavaScript
