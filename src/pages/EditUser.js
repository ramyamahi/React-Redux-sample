import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getSingleUser, editUser } from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();
  const {user} = useSelector(state => state.users)
  const dispatch = useDispatch()
  let history = useHistory()
  let {id} = useParams()

  const [ userInput, setUserInput ] = useState({
    name: "",
    email: "",
    contact: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({...userInput, [name]: value})
  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editUser(id, userInput))
    history.push('/')
  }

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [])

  useEffect(() => {
    setUserInput({...user})
  }, [user])


  const { name,email, contact } = userInput

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Name" type="text" name="name" value={name || ""} onChange={handleChange}/><br />
      <TextField id="standard-basic" label="Email" type="email" name="email" value={email || ""} onChange={handleChange}/><br />
      <TextField id="standard-basic" label="Contact" type="number" name="contact" value={contact || ""} onChange={handleChange}/><br />
      <Button variant="contained" color="primary" type="submit">Edit</Button>
    </form>
  )
}

export default EditUser