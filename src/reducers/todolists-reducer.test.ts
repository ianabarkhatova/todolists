import {addTodolistAC, changeTodolistFilterAC, ChangeTodolistFilterActionType,
    changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodoListType} from '../App'

test('correct todoList should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = removeTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todoList should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTodoListTitle = 'New Title'

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = addTodolistAC(newTodoListTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')
})

test('title of the correct todoList should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = "New TodoList";

    const action = changeTodolistTitleAC(todolistId2, newTodoListTitle)

    const startState: TodoListType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)

})

test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const initialState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action = changeTodolistFilterAC(todoListId2, newFilter)

    const endState = todolistsReducer(initialState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})



