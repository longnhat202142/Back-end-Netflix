import { useEffect, useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import './Home.scss'

//import {AcUnit} from "@mui/icons-material"
const Home = ({type}) => {
  const [lists,setLists] =useState([]);
  const [genre,setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () =>{
      try {
        const res = await axios.get(`list${type ? "?type=" +type :""}
        ${genre ? "&genre=" +genre :""}`,
        {
          headers:{
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZmNjZhOWRlYzZjZDZlODdiZWE3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwODc0NDY3Mn0.NaTJiJxES9su0lvjGVuCYqPAJoqeHU5PT25IRcYFOTs"
          }
        }
        );
      setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomLists();
  },[type,genre]);




  return (
    <div className='home'>
     <Navbar/>
    
     <Featured type={type}/>
      {lists.map(list =>(
        <List key={list._id} list={list}/> 
      ))}
      

    </div>
  )
}

export default Home;
