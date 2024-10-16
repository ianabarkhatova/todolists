import React, { useEffect, useState } from "react"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

export default {
  title: "API",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoListTitle, setTodoListTitle] = useState<string>("")

  const createTodoList = () => {
    todolistsApi.createTodolist(todoListTitle).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={"todolistTitle"}
          value={todoListTitle}
          onChange={(e) => {
            setTodoListTitle(e.currentTarget.value)
          }}
        />
        <button onClick={createTodoList}>Create Todolist</button>
        {JSON.stringify(state)}
      </div>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [title, setTodolistTitle] = useState<any>("")

  const updateTodolistTitle = () => {
    todolistsApi.updateTodolist({ todolistId, title }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"todolistTitle"}
          value={title}
          onChange={(e) => {
            setTodolistTitle(e.currentTarget.value)
          }}
        />

        <button onClick={updateTodolistTitle}>Update TodoList Title</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const deleteTodoList = () => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <button onClick={deleteTodoList}>Delete TodoList</button>
      </div>
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>("")

  const getTasks = () => {
    tasksApi.getTasks(todolistId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <button onClick={getTasks}>Get Tasks</button>
      </div>

      {JSON.stringify(state)}
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [title, setTaskTitle] = useState<string>("")

  const createTask = () => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"taskTitle"}
          value={title}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
          }}
        />

        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  )
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")

  const [taskTitle, setTaskTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>("")
  const [deadline, setDeadline] = useState<string>("")

  const updateTask = () => {
    tasksApi
      .updateTask({
        todolistId,
        taskId,
        apiModel: {
          title: taskTitle,
          description: description,
          status: status,
          priority: priority,
          startDate: startDate,
          deadline: deadline,
        },
      })
      .then((res) => {
        setState(res.data)
      })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"taskTitle"}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"description"}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"status"}
          type={"number"}
          value={status}
          onChange={(e) => {
            setStatus(+e.currentTarget.value)
          }}
        />

        <input
          placeholder={"priority"}
          type={"number"}
          value={priority}
          onChange={(e) => {
            setPriority(+e.currentTarget.value)
          }}
        />

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
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")

  const deleteTask = () => {
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />

        <button onClick={deleteTask}>Delete Task</button>
      </div>
    </div>
  )
}
