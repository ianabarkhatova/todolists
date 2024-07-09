import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList/TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active"

function App() {

    // tasks - 1-й элемент массива, setTasks - 2-й элемент массива, initTasks - первоначальный массив
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React JS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
    ])

    // const result = useState(tasks)
    // console.log(result)
    // console.log(result[0])
    // //result возвратит массив с двумя элементами: 1 - массив с первоначальными элементами (state), 2 - функция
    // const setState = result[1]
    // console.log(setState)

    const [state, setState] = useState(tasks)
    //деструктуризирущее присваивание
    // console.log(useState(tasks)[1])

//новый локальный стейт, который управляет режимом отображения
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }

    function removeTask(taskId: string) {
        // пропусти те таски, id которых не равняется taskId и создай на их основе новый массив
        //(старый массив не меняется - иммутабельная работа с данными)
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            //если передаем title c таким же именем, можно писать так:
            // title,
            isDone: false
        }

        // const copyState = [...tasks]
        // copyState.push(newTask)
        // setTasks(copyState)
        setTasks([...tasks, newTask])
    }

    const changeStatus = (taskId: string, newIsDone: boolean) => {
        const newState = tasks.map(t => taskId === t.id? {...t, isDone: newIsDone} : t)
        console.log(newState)
        setTasks(newState)
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
