{
   let tasks = [
      // {
      //    content: "Umyć samochód",
      //    done: false,
      // },
      // {
      //    content: "Zrobić obiad",
      //    done: true,
      // },
   ];

   let hideDoneTasks = false;

   const removeTask = (taskIndex) => {      //zrobione do zad 1  homework mod07
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const toggleTaskDone = (taskIndex) => {      //zrobione do zad 1  homework mod07
      tasks = [
         ...tasks.slice(0, taskIndex),
         {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
         },
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const addNewTask = (newTaskContent) => {     //zrobione do zad 1  homework mod07
      tasks = [
         ...tasks,
         {
            content: newTaskContent,
            done: false,
         },
      ];

      render();
   };


   const markAllTasksDone = () => {
      tasks = tasks.map((task) => ({
         ...task,
         done: true,
      }));
      render();
   };

   const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;
      render();
   };


   //------------------------------------------------------------------------------



   const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove")

      removeButtons.forEach((removeButton, taskIndex) => {
         removeButton.addEventListener("click", () => {
            removeTask(taskIndex);
         });
      });
   };

   const bindToggleDoneEvents = () => {
      const toggleDoneButtons = document.querySelectorAll(".js-toggleDone")

      toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(taskIndex);
         });
      });
   };





   const renderTasks = () => {

      const taskToHTML = task => `
         <li class="
            task__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-item
         ">
         <button class="tasks__button ${task.done ? "buttonToggleTrue" : "buttonToggleFalse"} js-toggleDone 
         "></button>
         <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
            ${task.content}
         </span>
         <button class=" tasks__button tasks-button--remove js-remove"></button>   
            </li>
         `;
   };

   const tasksElement = document.querySelector(".js-tasks");
   tasksElement.innerHTML = tasks.map(taskToHTML).join("");
};

const renderButtons = () => {
   const buttonsElement = document.querySelector(".js-buttons");

   if (!tasks.length)
      buttonsElement.innerHTML = "";
   return;

   buttonsElement.innerHTML =
      // `
      //    <span class="section__titleTasksList">
      //       <strong>Lista zadań</strong>
      //    </span>
      //    <div class="divButtons" ${tasks.length === 0 ? "style=\"display: none\"" : ""}>
      //       <button class= "button--hideTasks"
      //       >Ukryj ukończone</button>
      //       <button
      //          ${tasks.every(({ done }) => done) ?
      //          "class= \"disabledMarkTasksDone\" disabled" :
      //          "class= \"button--markTasksAllDone\""}>
      //          Ukończ wszystkie
      //       </button>
      //    </div>
      // `;
      `
         <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
         </button>
         <button
            class="buttons__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
         >
            Ukończ wszystkie
         </button>
      `;
};

const bindButtonsEvents = () => {
   const markAllDoneButton = document.querySelector(".js-markAllDone");

   if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
   }

   const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks")

   if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
   }

   };


const render = () => {
   renderTasks();
   renderButtons();

   bindRemoveEvents();
   bindToggleDoneEvents();
   bindButtonsEvents();
};

const onFormSubmit = (event) => {
   event.preventDefault();

   const newTaskInput = document.querySelector(".js-newTask");
   const newTaskContent = newTaskInput.value.trim();

   if (newTaskContent === "") {
      newTaskInput.focus();
      return;
   }

   addNewTask(newTaskContent);
   newTaskInput.value = "";
   newTaskInput.focus();
}

const init = () => {
   render();

   const form = document.querySelector(".js-form");

   form.addEventListener("submit", onFormSubmit);
};

init();