import { useState, useEffect } from "react";
import axios from "axios";


export default function ListaDolci() {

    const [lista, setLista] = useState([]);


    function fetchDolci() {

        axios.get("http://localhost:3000/posts")
            .then((res) =>
                setLista(res.data)
            )

    }

    useEffect(fetchDolci, []);

    return (
        <>
            {

                lista.map((post) => (

                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt={post.title} />
                        <span>{post.content}</span>
                        <h3>{post.tags}</h3>
                    </div>
                ))
            }
        </>

    )

}