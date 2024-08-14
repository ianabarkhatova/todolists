import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {

    //стартовые данные
    const startState = {age: 20, childrenCount: 2, name: 'Yana'};

    //помещаем стартовый стейт в reducer, передаем инструкцию, что редьюсеру нужно сделать
    //и ожидаем, что reducer возвратит нам новый обработанный стейт с помощью return
    const endState = userReducer(startState, {type: 'Increment-age'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Yana'};
    const endState = userReducer(startState, {type: 'Increment-children-count'})

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test('user reducer should change the name of the user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Yana'};
    const newName = 'Daniel'
    const endState = userReducer(startState, {type: 'Change-name', newName: newName})

    expect(endState.name).toBe('Daniel');
});


