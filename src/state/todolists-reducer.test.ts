import {
    addTodolistAC, changeTodolistFilterAC, ChangeTodolistFilterActionType,
    changeTodolistTitleAC, FilterValuesType, removeTodolistAC, TodolistDomainType, todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'

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
            order: 0
        },

        {
            id: todolistId2,
            title: 'What buy',
            addedDate: '',
            filter: 'all',
            order: 0
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

    const newTodoListTitle = 'New Title'
    const action = addTodolistAC(newTodoListTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
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
    expect(endState[1].filter).toBe(action.payload.filter)
})



