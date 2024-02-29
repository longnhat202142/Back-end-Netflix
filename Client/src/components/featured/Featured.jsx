import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import './Featured.scss'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Featured({type}) {

    const [content, setContent] = useState({});

    useEffect(() =>{
        const getRandomContent = async () =>{
            try {
                const res = await axios.get(`/movie/random?type=${type}`,
                {
                    headers:{
                      token: 
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZmNjZhOWRlYzZjZDZlODdiZWE3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwODc0NDY3Mn0.NaTJiJxES9su0lvjGVuCYqPAJoqeHU5PT25IRcYFOTs"
                    }
                  }
                  );
                setContent(res.data[0])
               
            } catch (error) {
                console.log(error)
            }
        }

        getRandomContent();
    },[type])

    console.log(content)
  return (
    <div className='featured'>
    {type && (
        <div className="category">
            <span>{type === "movies" ? "Movies" : "Series"}</span>
            <select name="genre" id="genre">
                <option>Thể loại</option>
                <option value="adventure">Phiêu lưu</option>
                <option value="detective">Trinh thám</option>
                <option value="action">Hành dộng</option>
                <option value="emotional">Tình cảm</option>
                <option value="horrified">Kinh dị</option>
                <option value="cartoon">Hoạt hình</option>

            </select>
        </div>

    )}
       <img 
     width="100%"
     src={content.img} alt="" />
    
    <div className="info">
        <img 
      
        src={content.imgSm} alt="" />

        <span className='desc'>
            {content.desc}
        </span>
        <div className="buttons">
            <button className="play">
                <PlayArrow/>
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlined/>
                <span>Info</span>
            </button>
        </div>
    </div>
    
    </div>
  )
}
