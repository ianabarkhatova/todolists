import { AppInitialState, appReducer, InitialStateType, setAppError, setAppStatus } from "../appSlice"

let startState: AppInitialState

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
    themeMode: "light",
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppError({ error: "some error" }))

  expect(endState.error).toBe("some error")
  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatus({ status: "loading" }))
  expect(endState.status).toBe("loading")
})
