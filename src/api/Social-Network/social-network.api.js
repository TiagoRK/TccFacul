import { useMemo } from "react"
import { useGlobalUser } from "../../context/user-context/user.context"
import { useHttp } from "../_base/use-http"

export function useMySocialNetworkApi() {
  const [globalUser] = useGlobalUser()

  const httpInstance = useHttp("https://localhost:5001/", {
    Authorization: `bearer ${globalUser?.token}`,
  })

  async function registerUser(name, email, phoneNumber, password, birthDate, profileImage) {
    const response = await httpInstance.post("register", {
      name,
      email,
      phoneNumber,
      password,
      birthDate,
      profileImage,
    })
    return response
  }

  async function login(email, password) {
    const response = await httpInstance.post("login", {
      email,
      password,
    })
    return response
  }

  async function logout() {
    const response = await httpInstance.post("logout")
    return response
  }

  async function getUserByEmail(email) {
    const response = await httpInstance.get(`getUserByEmail/${email}`)
    return response
  }

  async function createPost(animalName, description, weigth, age, race, postImageUri) {
    const response = await httpInstance.post(`createPost`, {
      animalName,
      description,
      weigth,
      age,
      race,
      postImageUri,
    })
    return response
  }

  async function getFeedPosts(registerQuantity, page) {
    const response = await httpInstance.get(`getFeedPosts?registerQuantity=${registerQuantity}&page=${page}`)
    return response
  }

  async function likePost(email, postId) {
    const response = await httpInstance.put(`likePost/${email}`, {
      postId,
    })
    return response
  }

  async function getPostComments(postId) {
    const response = await httpInstance.get(`getPostComments?postId=${postId}`)
    return response
  }

  async function addComment(email, commentContent, postId) {
    const response = await httpInstance.post(`addComment/${email}`, {
      commentContent,
      postId,
    })
    return response
  }

  async function getFriendsByUser(email, registerQuantity, page) {
    const response = await httpInstance.get(`getFriendList/${email}?registerQuantity=${registerQuantity}&page=${page}`)
    return response
  }

  async function getProfilePosts(email, emailTarget, registerQuantity, page) {
    const response = await httpInstance.get(`getUserPosts/${email}/${emailTarget}?registerQuantity=${registerQuantity}&page=${page}`)
    return response
  }

  async function checkIsFriend(email, emailTarget) {
    const response = await httpInstance.get(`checkIsFriend/${email}/${emailTarget}`)
    return response
  }

  async function removeFriend(email, emailTarget) {
    const response = await httpInstance.put(`removeFriend/${email}/${emailTarget}`)
    return response
  }

  async function sendFriendRequest(email, emailTarget) {
    const response = await httpInstance.put(`sendFriendRequest/${email}/${emailTarget}`)
    return response
  }

  async function getFriendsSolicitations(email) {
    const response = await httpInstance.get(`getFriendSolicitations/${email}`)
    return response
  }

  async function acceptFriendRequest(email, targetEmail) {
    const response = await httpInstance.put(`addFriend/${email}/${targetEmail}`)
    return response
  }

  async function removeFriendRequest(email, targetEmail) {
    const response = await httpInstance.put(`removeFriendRequest/${targetEmail}/${email}`)
    return response
  }

  async function filterUsers(email, filterString) {
    const response = await httpInstance.get(`getFilteredUsers/${email}?filterString=${filterString}`)
    return response
  }

  async function checkIfHasFriendRequest(email, targetEmail) {
    const response = await httpInstance.get(`checkIfHasFriendSolicitation/${email}/${targetEmail}`)
    return response
  }

  async function editProfile(email, editedFirstName, editedLastName, editedNickname, editedProfileImage) {
    const response = await httpInstance.put(`editUserProfile/${email}`, {
      editedFirstName,
      editedLastName,
      editedNickname,
      editedProfileImage,
    })
    return response
  }

  return useMemo(
    () => ({
      registerUser,
      login,
      logout,
      getUserByEmail,
      createPost,
      getFeedPosts,
      likePost,
      getPostComments,
      addComment,
      getFriendsByUser,
      getProfilePosts,
      checkIsFriend,
      removeFriend,
      sendFriendRequest,
      getFriendsSolicitations,
      acceptFriendRequest,
      removeFriendRequest,
      filterUsers,
      checkIfHasFriendRequest,
      editProfile,
    }),
    []
  )
}
