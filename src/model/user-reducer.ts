type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

//ф-я reducer возвращает объект типа StateType

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch(action.type) {
        case 'Increment-age':
            return {
                ...state,
                age: state.age + 1
            }

        case 'Increment-children-count':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }

        case 'Change-name':
            return {
                ...state,
                name: action.newName
            }

        default:
            throw new Error("I don't understand this action type")
    }
}