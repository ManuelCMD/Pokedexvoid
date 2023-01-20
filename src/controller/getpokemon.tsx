import { constants } from "buffer";
import { Pokemon } from "../models/pokemon.m";

export async function getPokemons(): Promise<Pokemon[]> {
    /* LLamado api rest */

    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");

    const datos = await response.json();
    const pokemons = datos.results.map((pokemon: any) => ({

        id: pokemon.national_number,
        name: pokemon.name,
        imggif: CorregirNombre(pokemon.sprites["animated"]),
        imglarg: CorregirNombre(pokemon.sprites["large"]),
        imgnormal: CorregirNombre(pokemon.sprites["normal"]),
        total: pokemon.total,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        sp_atk: pokemon.sp_atk,
        sp_def: pokemon.sp_def,
        speed: pokemon.speed,
        type: pokemon.type,



    }));

    const unicosPokemons = pokemons.filter(
        (pokemon: any, index: number) =>
            pokemons.findIndex((other: any) => other.id === pokemon.id) === index
    );

    return unicosPokemons;
}

/*Corregir textos con su nombre */
export function CorregirNombre(name: string): string {
    if (name.includes("farfetch'd")) {
        return name.replace("farfetch'd", "farfetchd")
    } else if (name.includes("mr.-mime")) {
        return name.replace("mr.-mime","mr-mime")
    } else if (name.includes("nidoran♀")) {
        return name.replace("nidoran♀","nidoran-f")
    } else if (name.includes("nidoran♂")) {
        return name.replace("nidoran♂","nidoran-m")
    } else
        return name;
}
