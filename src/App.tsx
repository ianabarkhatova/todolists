import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./todoList/TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    //деструктуризирущее присваивание

//новый локальный стейт, который управляет режимом отображения

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'}
    ])

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'REST API', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    function removeTask(taskId: string, todoListId: string) {
        debugger
        // пропусти те таски, id которых не равняется taskId и создай на их основе новый массив
        //(старый массив не меняется - иммутабельная работа с данными)
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        //если передаем title c таким же именем, можно писать так:
        // title,
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        const newState = tasks.map(t => taskId === t.id ? {...t, isDone: newIsDone} : t)
        tasksObj[todoListId] = newState
        setTasks({...tasksObj})
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    return (
        <div className="App">

            <input/> <button>x</button>
            {todoLists.map((tl) => {

                //фильтрация происходит каждый раз на основе одного объекта(tl)
                let tasksForTodoList = tasksObj[tl.id]

                if (tl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                }
                if (tl.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                }

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                />
            })}
        </div>
    );
}

export default App;
