import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListTitle, setTodoListTitle] = useState<string>('')

    const createTodoList = () => {
        todolistsAPI.createTodolist(todoListTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder={'todolistTitle'}
                   value={todoListTitle}
                   onChange={(e) => {
                       setTodoListTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTodoList}>Create Todolist</button>
            {JSON.stringify(state)}</div>

    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [todolistTitle, setTodolistTitle] = useState<any>('')

    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>

            <input placeholder={'todolistTitle'}
                   value={todolistTitle}
                   onChange={(e) => {
                       setTodolistTitle(e.currentTarget.value)
                   }}/>

            <button onClick={updateTodolistTitle}>Update TodoList Title</button>
        </div>
        {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodoList = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>

            <button onClick={deleteTodoList}>Delete TodoList</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTasks}>Get Tasks</button>
        </div>


        {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>

            <input placeholder={'taskTitle'}
                   value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>

            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>

            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>

            <input placeholder={'taskTitle'}
                   value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>

            <input placeholder={'description'}
                   value={description}
                   onChange={(e) => {
                       setDescription(e.currentTarget.value)
                   }}/>

            <input placeholder={'status'}
                   type={'number'}
                   value={status}
                   onChange={(e) => {
                       setStatus(+e.currentTarget.value)
                   }}/>

            <input placeholder={'priority'}
                   type={'number'}
                   value={priority}
                   onChange={(e) => {
                       setPriority(+e.currentTarget.value)
                   }}/>

            {/*<input placeholder={'startDate'}*/}
            {/*       value={startDate}*/}
            {/*       onChange={(e) => {*/}
            {/*           setStartDate(e.currentTarget.value)*/}
            {/*       }}/>*/}

            {/*<input placeholder={'deadline'}*/}
            {/*       value={deadline}*/}
            {/*       onChange={(e) => {*/}
            {/*           setDeadline(e.currentTarget.value)*/}
            {/*       }}/>*/}

            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>

            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>

            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}


