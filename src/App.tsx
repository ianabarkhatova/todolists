import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList/TodoList";


export type FilterValuesType = "all" | "completed" | "active"

function App() {

    // tasks - 1-й элемент массива, setTasks - 2-й элемент массива, initTasks - первоначальный массив
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }

    function removeTask(taskId: number) {
        // пропусти те таски, id которых не равняется taskId и создай на их основе новый массив (старый массив не меняется)
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
