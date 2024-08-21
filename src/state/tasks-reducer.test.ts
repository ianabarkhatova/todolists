import {tasksObjType, TodoListType} from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";

let startState: tasksObjType

beforeEach(()=> {
    startState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React JS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'REST API', isDone: false},
            {id: '6', title: 'Typescript', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Bread', isDone: true},
        ]
    }
})

test('correct task should be removed from correct todoList', () => {

    const action = removeTaskAC('2','todolistId2' )
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React JS', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'REST API', isDone: false},
            {id: '6', title: 'Typescript', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Book', isDone: false},
            {id: '3', title: 'Bread', isDone: true},
        ]
    })

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct todoList', () => {

    const action = addTaskAC('juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(6)
})

test('status of specified task title should be changed', () => {

    const action = changeTaskTitleAC('3', 'Coffee', 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('Coffee')
    expect(endState['todolistId2'][2].title).toBe('Bread')
    expect(endState['todolistId1'].length).toBe(6)
})

test('new array should be added when new todolist is added', () => {

//action will be an object with the title and type properties:
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})






