import * as types from "./actionType"
import axios from 'axios'

const userList = (users) => {
  return ({
    type: types.GET_USERS,
    payload: users
  })
}

const userAction = () => {
  return ({
    type: types.ADD_USER,
  })
}

const deleteAction = () => {
  return ({
    type: types.DELETE_USER
  })
}

const singleUserAction = (user) => {
  return ({
    type: types.GET_SINGLE_USER,
    payload: user
  })
}

const editUserAction = () => {
  return ({
    type: types.UPDATE_USER
  })
}

export const loadUsers = () => {
  return function (dispatch) {
    axios.get(`${process.env.REACT_APP_API}`).then(res => {
      dispatch(userList(res.data))
    } )
    .catch((error) => {
      console.log(error)
    })
  }
}

export const addUser = (user) => {
  return function (dispatch) {
    axios.post(`${process.env.REACT_APP_API}`, user).then(res => {
      dispatch(userAction())
      dispatch(loadUsers())
    } )
    .catch((error) => {
      console.log(error)
    })
  }
}

export const deleteUser = (id) => {
  return function (dispatch) {
    axios.delete(`${process.env.REACT_APP_API}/${id}`).then(res => {
      dispatch(deleteAction())
      dispatch(loadUsers())
    } )
    .catch((error) => {
      console.log(error)
    })
  }
}

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios.get(`${process.env.REACT_APP_API}/${id}`).then(res => {
      dispatch(singleUserAction(res.data))
    } )
    .catch((error) => {
      console.log(error)
    })
  }
}

export const editUser = (id,user) => {
  return function (dispatch) {
    axios.put(`${process.env.REACT_APP_API}/${id}`, user).then(res => {
      dispatch(editUserAction())
    } )
    .catch((error) => {
      console.log(error)
    })
  }
}