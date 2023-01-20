import React, { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';


import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon.m";
import { match } from "assert";


const Listado = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const ObtenerTodos = async () => {
            const allPokemons = await getPokemons();
            setPokemons(allPokemons);
        }
        ObtenerTodos();
    });

    const filtrarPokemon = pokemons?.slice(0,151).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLocaleLowerCase());
    })


    return (
        <>
            <h1>Pokedex</h1>
            <header>
                <input type="text"
                    value={query}
                    placeholder="Buscar Pokemon"
                    onChange={(event) => setQuery(event.target.value.trim())}
                 
                />
            </header>
            <div className="content-wrap">
                <div className="content">
                    <div className="row gap-3">

                        {filtrarPokemon?.slice(0, 151).map((pokemon) => (
                            <Card className="mx-auto" style={{ width: '18rem' }}>
                                <Card.Header>Tipo: {pokemon.type} </Card.Header>
                                <Card.Img width="100" height="100" variant="top" src={pokemon.imggif} className="d-block mx-auto w-50" />
                                <Card.Body>
                                    <Card.Title className="text-center">{pokemon.id} - {pokemon.name} </Card.Title>
                                    <ListGroup variant="flush"></ListGroup>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={15}
                                            height={15}
                                            src="https://cdn-icons-png.flaticon.com/512/6837/6837774.png" />
                                        <b> HP: </b> {pokemon.hp}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={15}
                                            height={15}
                                            src="https://cdn-icons-png.flaticon.com/512/1037/1037970.png"
                                        />
                                        <b> Ataque: </b> {pokemon.attack}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={15}
                                            height={15}
                                            src="https://cdn-icons-png.flaticon.com/512/9195/9195850.png" />
                                        <b> Defensa: </b> {pokemon.defense}</ListGroup.Item>
                                    <ListGroup.Item>  <Figure.Image
                                        width={15}
                                        height={15}
                                        src="https://cdn-icons-png.flaticon.com/512/3637/3637532.png" />
                                        <b> Ataque Especial: </b> {pokemon.sp_atk}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={15}
                                            height={15}
                                            src="https://cdn-icons-png.flaticon.com/512/8934/8934989.png" /><b> Defensa Especial: </b> {pokemon.sp_def}</ListGroup.Item>
                                    <ListGroup.Item>  <Figure.Image
                                        width={15}
                                        height={15}
                                        src="https://cdn-icons-png.flaticon.com/512/2587/2587131.png" />
                                        <b> Velocidad: </b>{pokemon.speed}</ListGroup.Item>
                                </Card.Body>
                            </Card>
                        ))}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Listado;