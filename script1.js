



document.addEventListener('DOMContentLoaded', () => {
    const addCardBtn = document.querySelector('.add-card');
    const contain = document.querySelector('.card-container');

    const allQuotes = [
        'Raise the bar by completing your goals!',
        'Well begun is half done!',
        'Just a step away, keep going!',
        'Whoa! You just completed all the goals, time for chill :D',
    ];

    let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

    // Function to update localStorage
    function saveToLocalStorage() {
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    }

    // Function to update progress bar and quote
    function updateProgress() {
        const inpfields = document.querySelectorAll('.goal-input');
        const progressvalue = document.querySelector('.progress-value');
        const progressLabel = document.querySelector('.progress-label');
        const quote = document.querySelector('.quote');

        const completedgoal = Object.values(allGoals).filter(goal => goal.completed).length;

        progressvalue.style.width = `${(completedgoal / inpfields.length) * 100}%`;
        progressvalue.firstElementChild.innerText = `${completedgoal}/${inpfields.length} completed`;
        progressLabel.innerText = allQuotes[completedgoal];

        if (completedgoal > 0) {
            quote.innerText = `"Keep Going, You're making great progress!"`;
        } else {
            quote.innerText = `"Move one step ahead, today"`;
        }
    }

    // Function to setup event listeners for checkboxes and input fields
    function setupEventListeners() {
        const checkboxlist = document.querySelectorAll('.custom-checkbox');
        const inpfields = document.querySelectorAll('.goal-input');
        const progressbar = document.querySelector('.progress-bar');

        checkboxlist.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                const allGoalsAdded = [...inpfields].every(input => input.value);

                if (allGoalsAdded) {
                    checkbox.parentElement.classList.toggle('completed');
                    const inpid = checkbox.nextElementSibling.id;

                    if (!allGoals[inpid]) {
                        allGoals[inpid] = { name: '', completed: false };
                    }
                    allGoals[inpid].completed = !allGoals[inpid].completed;

                    updateProgress();
                    saveToLocalStorage();
                } else {
                    progressbar.classList.add('show-error');
                }
            });
        });

        inpfields.forEach(input => {
            if (allGoals[input.id]) {
                input.value = allGoals[input.id].name;
                if (allGoals[input.id].completed) {
                    input.parentElement.classList.add('completed');
                }
            }

            input.addEventListener('focus', () => {
                progressbar.classList.remove('show-error');
            });

            input.addEventListener('input', () => {
                if (allGoals[input.id] && allGoals[input.id].completed) {
                    input.value = allGoals[input.id].name;
                    return;
                }

                if (allGoals[input.id]) {
                    allGoals[input.id].name = input.value;
                } else {
                    allGoals[input.id] = {
                        name: input.value,
                        completed: false,
                    };
                }
                saveToLocalStorage();
                updateProgress();
            });
        });
    }

    // Function to create and add a new card
    function addCard(goalId = '', goalName = '', completed = false) {
        const uniqueId = goalId || `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const cardHTML = `
            <div class="goal-container ${completed ? 'completed' : ''}">
                <div class="custom-checkbox">
                    <img class="check-icon" src="/icon/Vector 1.svg" alt="" />
                </div>
                <input
                    id="${uniqueId}"
                    class="goal-input"
                    type="text"
                    placeholder="Add new goal..."
                    value="${goalName}"
                />
            </div>`;
        contain.insertAdjacentHTML('beforeend', cardHTML);

        // Add to local storage if it's a new goal
        if (!goalId) {
            allGoals[uniqueId] = { name: goalName, completed: completed };
            saveToLocalStorage();
        }

        setupEventListeners();
    }

    // Initialize the existing goals from localStorage
    function initializeGoals() {
        for (const id in allGoals) {
            addCard(id, allGoals[id].name, allGoals[id].completed);
        }
    }

    addCardBtn.addEventListener('click', () => addCard());

    initializeGoals();
    updateProgress();
    setupEventListeners();
});
