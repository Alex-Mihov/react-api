import { useState, useEffect } from "react";
import axios from "axios";


export default function ListaDolci() {

    // oggetto per il nuovo post
    const initialForm = {
        title: "",
        content: "",
        image: "",
        tags: []
    }

    // array iniziale 
    const [lista, setLista] = useState([]);

    // nuovo oggetto 
    const [formData, setFormData] = useState(initialForm)

    function fetchDolci() {

        axios.get("http://localhost:3000/posts")
            .then((res) =>
                setLista(res.data)
            )

    }


    // funzione che aggiorna il formData
    const gestioneFormData = (e) => {

        const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        });

    }

    // che aggiunge un nuovo articolo alla lista
    const aggiungiPost = (e) => {
        e.preventDefault();

        // richiesta di tipo post per aggiungere l'articolo
        axios.post("http://localhost:3000/posts", formData)
            .then((res) => {
                setLista((curretPosts) => [...curretPosts, res.data])
            })
            .catch(err => console.log(err)
            )

        setFormData(initialForm);
    }

    useEffect(fetchDolci, []);

    return (
        <>

            <form onSubmit={aggiungiPost}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={gestioneFormData}
                    placeholder="inserisci il titolo"
                />

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={gestioneFormData}
                    placeholder="inserisci il link dell'immagine"
                />

                <textarea
                    name="content"
                    value={formData.content}
                    onChange={gestioneFormData}
                    placeholder="inserisci il contenuto"
                ></textarea>

                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={gestioneFormData}
                    placeholder="inserisci tags"
                />

                <button type="submit">INVIA</button>
            </form>

            {

                lista.map((post) => (

                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt={post.title} />
                        <span>{post.content}</span>
                        <h5>{post.tags}</h5>
                    </div>
                ))
            }
        </>

    )

}