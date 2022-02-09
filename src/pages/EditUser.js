import React ,{useState,useEffect}from 'react';
import {Button} from "@material-ui/core";
import {Box,TextField} from "@material-ui/core";
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {getSingleUser, updateUser } from '../redux/actions';
const EditUser = () => {
    let history = useNavigate();
    let dispatch = useDispatch();
    let {id} = useParams();
    // Data'yı alıyoruz 
    const {user} = useSelector(state => state.data);
    const[state,setState] = useState({
        name:"",
        email:"",
        contact:"",
        address:"",
    });

    const [error,setError] = useState("");

    const {name,email,contact,address} = state;

    // Params'dan gelen id deki user bilgilerini çekmek için
    useEffect(() => {
        dispatch(getSingleUser(id))
    },[])

    // useSelector ile aldığımız user datasını şimdi çekiyoruz
    useEffect(() => {
        if(user){
            setState({...user});
        }
    },[user])

    const handleInputChange = (e) => {
        let {name,value} = e.target;
        setState({...state,[name]:value})
    }

    // Form submit edildiyse
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !contact || !email){
            setError("Please input all input Field");
        }else{
            dispatch(updateUser(state,id));
            setTimeout(() => {
                history({pathname:'/'});
            }, 1000);
            setError("Successfull");
        }
    }

  return (
    <div>
    <div style={{marginTop:"20px",width:"100%"}}>
    <Button variant='contained' color="secondary" onClick={() => history({pathname:'/'})}>Go Back</Button>
      </div>
     <h2>Edit User</h2>
     {error && <h3 style={{color:"red"}}>{error}</h3>}
     <Box onSubmit={handleSubmit}
     component="form" 
     sx={{'& > :not(style)': { m: 1, width: '45ch' },}} 
     noValidate 
     autoComplete="off"
     >
    
      <TextField name='name' onChange={handleInputChange}  id="standard-basic" label="Name" variant="standard" value={name || ""} type="text"  />
        <br/>
      <TextField name='email' onChange={handleInputChange} id="standard-basic" label="Email" variant="standard" value={email || ""} type="email"  />
      <br/>
      <TextField name='contact' onChange={handleInputChange} id="standard-basic" label="Contact" variant="standard" value={contact || ""} type="number" />
      <br/>
      <TextField name='address' onChange={handleInputChange} id="standard-basic" label="Address" variant="standard" value={address || ""} type="text"  />
   
      <div style={{marginTop:"20px",width:"100%"}}>
      <Button type="submit" variant='contained' color="primary">Update User</Button>
      </div>
    </Box>
    </div>
  )
};

export default EditUser;
