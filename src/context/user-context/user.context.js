import createGlobalState from "react-create-global-state"

const userFromStorage = localStorage.getItem("user")

const user = JSON.parse(userFromStorage) || null

const [_useGlobalUser, UserGlobalProvider] = createGlobalState(user)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setGlobalUser = (newUser) => {
    _setGlobalUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }
  return [globalUser, setGlobalUser]
}

export { useGlobalUser, UserGlobalProvider }
