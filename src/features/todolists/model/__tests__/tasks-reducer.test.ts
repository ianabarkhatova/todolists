import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "../../../../state/tasks-reducer";
import {removeTodolistAC, setTodolistsAC} from "../../../../state/todolists-reducer";
import {TasksObjType} from "../../../../app/App";
import {TaskPriority, TaskStatus} from "../../../../common/enums/enums";

let startState: TasksObjType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                description: 'description',
                title: 'HTML&CSS',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: 'loading'
            },
            {
                description: 'description',
                title: 'JS',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                description: 'description',
                title: 'React JS',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'Redux',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '4',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'REST API',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '5',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'Typescript',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '6',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                description: 'description',
                title: 'Book',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'Bread',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            }
        ]
    }
})

test('correct task should be removed from correct todoList', () => {

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                description: 'description',
                title: 'HTML&CSS',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: 'loading'
            },
            {
                description: 'description',
                title: 'JS',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                description: 'description',
                title: 'React JS',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'Redux',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '4',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'REST API',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '5',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            },
            {
                description: 'description',
                title: 'Typescript',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '6',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: '',
                entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                description: 'description',
                title: 'Book',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: '',
                entityStatus: "idle",
            },
        ]
    })

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct todoList', () => {

    const action = addTaskAC({
            todoListId: 'todolistId2',
            title: 'juice',
            status: TaskStatus.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exists',
            entityStatus: "idle"
        }
    )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatus.New}, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatus.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatus.Completed)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId1'].length).toBe(6)
})

test('status of specified task title should be changed', () => {

    const action = updateTaskAC('3', {title: 'Coffee'}, 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('Coffee')
    expect(endState['todolistId2'][1].title).toBe('Bread')
    expect(endState['todolistId1'].length).toBe(6)
})

// test('new array should be added when new todolist is added', () => {
//
// //action will be an object with the title and type properties:
//     const action = addTodolistAC('new todolist')
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
            {id: '1', title: 'title 1', order: 0, addedDate: ''},
            {id: '2', title: 'title 2', order: 1, addedDate: ''}
        ]
    )

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).not.toBe([])
    expect(endState['2']).not.toBe([])

})

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], "todolistId1")

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(0)
})







