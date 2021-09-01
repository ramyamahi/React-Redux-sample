import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/action'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const useButtonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Home = () => {
    const classes = useStyles();
    const btnClasses = useButtonStyles();
    const { users } = useSelector(state => state.users)
    const dispatch = useDispatch()
    let history = useHistory()

    useEffect(() => {
      dispatch(loadUsers())
    }, [])

    const handleDelete = (id) => {
      if(window.confirm('Do you want to delete the record')){
        dispatch(deleteUser(id))
      }
    }

  return (
    <div><br /><br />
      <Button variant="contained" color="primary" onClick={() => history.push('/adduser')}>Add User</Button><br /><br />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.id}
              </StyledTableCell>
              <StyledTableCell align="right">{user.name}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.contact}</StyledTableCell>
              <StyledTableCell align="right">
              <div className={btnClasses.root}>
                <Button variant="contained" color="primary" onClick={() => history.push(`/user/${user.id}`)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => {handleDelete(user.id)}}>
                  Delete
                </Button>
              </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Home;
