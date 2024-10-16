import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType, removeTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer
} from '../../../../state/todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from "../../api/todolistsApi";
import {RequestStatusType} from "../../../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            addedDate: '',
            filter: 'all',
            order: 0,
            entityStatus: "idle"
        },

        {
            id: todolistId2,
            title: 'What buy',
            addedDate: '',
            filter: 'all',
            order: 0,
            entityStatus: "idle"
        }
    ]
})

test('correct todoList should be removed', () => {

    const action = removeTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todoList should be added', () => {

    const newTodolist: TodolistType = {
        id: 'newId',
        title: "newTodo",
        addedDate: 'string',
        order: 0
    }

    const action = addTodolistAC(newTodolist)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
    expect(endState[2].filter).toBe('all')
})

test('title of the correct todoList should be changed', () => {

    let newTodoListTitle = "New TodoList";
    const action = changeTodolistTitleAC(todolistId2, newTodoListTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)

})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'
    const action = changeTodolistFilterAC(todolistId2, newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.value)
})

test('correct todolist entity status should be changed', () => {

    let newStatus: RequestStatusType = 'loading'
    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(action.payload.status)
})

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})




