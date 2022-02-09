/* rafce */
import React,{useEffect} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,ButtonGroup} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import {useSelector,useDispatch} from "react-redux";
import { deleteUser, loadUsers } from '../redux/actions';
import {useNavigate} from "react-router-dom";
 
 // ÜYE GÜNCELLEME İŞLEMİ YAPILACAK

const useStyles = makeStyles({
  table:{
    marginTop:100,
    backgroundColor:"#000",
  },
  color:{
    color:"#fff",
  }
});

 

const Home = () => {

    const classes = useStyles();
    let dispatch = useDispatch();
    let history = useNavigate();
    const {users} = useSelector(state => state.data)

    useEffect(() => {
      dispatch(loadUsers())
    },[])

    
    const handleDelete = (id) => {
      if(window.confirm("Are you sure wanted to delete the user ?")){
        dispatch(deleteUser(id))
        // Silme işleminden sonra tekrar user'ları yüklemesi için
        dispatch(loadUsers());
      }
    }

  return (
    
    <div>
      <div style={{marginTop:"20px"}}>
      <Button variant='contained' color="primary" onClick={() => history({pathname:'/addUser'})}>Add User</Button>
      </div>
       <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.color} >Name</TableCell>
            <TableCell className={classes.color} align="center">Email</TableCell>
            <TableCell className={classes.color} align="center">Contact</TableCell>
            <TableCell className={classes.color} align="center">Adrress</TableCell>
            <TableCell className={classes.color} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
       
        <TableBody>
      {users && users.map((user) => (
        <TableRow key={user.id} >
              <TableCell className={classes.color} component="th" scope="row">
               {user.name}
              </TableCell>
              <TableCell className={classes.color} align="center">{user.email }</TableCell>
              <TableCell className={classes.color} align="center">{user.contact}</TableCell>
              <TableCell className={classes.color} align="center">{user.address }</TableCell>
              <TableCell className={classes.color} align="center">
              <ButtonGroup variant="contained" aria-label="outlined  button group">
              <Button onClick={() => handleDelete(user.id)} style={{marginRight:"5px"}} color="secondary">Delete</Button>
              <Button onClick={() => history({pathname:`/editUser/${user.id}`})} color="primary">Edit</Button>
            </ButtonGroup>
              </TableCell>
            </TableRow>
        
      ))}
            
        </TableBody> 
      </Table>
    </TableContainer>
    </div>
  )
   
};

export default Home;
