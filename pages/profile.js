import React,{useContext} from 'react'
import {globalContext} from "../components/globalContext"

const profile = () => {
    const {anotherUser} = useContext(globalContext)
    return (
        <div>
            <h1>プロフィール</h1>
            <ul>
            {anotherUser.length > 0 && anotherUser.map((user,index)=>(
                <li key={index}>
                   
                    <p>{user.name}</p>
                    <p>{user.id}</p>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default profile
