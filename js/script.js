{
   let tasks = [
      {
         content: "wypij mleko",
      },
   ];
   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {     //zrobione do zad 1  homework mod07
      tasks = [
         ...tasks,
         {
            content: newTaskContent,
         },
      ];

      render();
   };

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
   
   const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

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
   
   const bindButtonsEvents = () => {
      const markAllDoneButton = document.querySelector(".div__button--markTasksAllDone");

      if (markAllDoneButton) {
         markAllDoneButton.addEventListener("click", markAllTasksDone);
      }

      const toggleHideDoneTasksButton = document.querySelector(".js-div__button--toggleHideDoneTasks");

      if (toggleHideDoneTasksButton) {
         toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      }

   };

   const renderTasks = () => {

      const taskToHTML = task => `
      <li class="
      tasksList__element${task.done && hideDoneTasks ?
          " tasksList__element--hidden" :
          ""} js-tasksList__element">
         <button 
            class="buttonTask ${task.done ?
               "button__tasksListItem--ToggleTrue" :
               "buttonTask__listItem--toggleFalse"} js-toggleDone">
            </button>
         <span class="tasksList__content${task.done ? " tasksList__content--done" : ""}">
            ${task.content}
         </span>
         <button class=" buttonTask buttonTask--remove js-remove">
         </button>   
      </li>
      `;

      const tasksElement = document.querySelector(".js-tasksList");
      tasksElement.innerHTML = tasks.map(taskToHTML).join("");
   };


   const renderButtons = () => {
      const buttonsElement = document.querySelector(".div__headerAndButtons");

      if (tasks.length === 0) {
         buttonsElement.innerHTML = "";
         return;
      }

      buttonsElement.innerHTML = `
         <button class="div__button js-div__button--toggleHideDoneTasks">
         ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
         </button>
         <button
         class="div__button 
         ${tasks.every(({ done }) => done) ? "\" disabled" : " div__button--markTasksAllDone\""}
         >
         Ukończ wszystkie
         </button>
         `;
   };

   const render = () => {
      renderTasks();
      bindRemoveEvents();
      bindToggleDoneEvents();
      
      renderButtons();
      bindButtonsEvents();
   };
   
   const onFormSubmit = (event) => {
      event.preventDefault();
      
      const newTaskElement = document.querySelector(".js-form__newTask");
      const newTaskContent = newTaskElement.value.trim();
      
      if (newTaskContent !== "") {
         addNewTask(newTaskContent);
         newTaskElement.value = "";
      }
      
      
      newTaskElement.focus();
   }
   
   const init = () => {
      render();
      
      const form = document.querySelector(".js-form");
      
      form.addEventListener("submit", onFormSubmit);
   };
   
   init();
   
}
// ----------------------------------------------------------------------------------------- 10:20 s