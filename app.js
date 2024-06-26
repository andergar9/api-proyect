//Pagina 1 por defecto
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () =>{
    if(pagina < 10000){
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () =>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async() => {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=34848dcd7b031ca85f468b89c5aace77&language=es-MX&page=${pagina}`);

        console.log(respuesta);

        //Comprobacion de respuestas
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            //En esta estructura podemos trabajar con React
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src=https://image.tmdb.org/t/p/w500/${pelicula.poster_path}>
                    <h3 class="titulo">${pelicula.title}</h3>
                    <h4 class="popularity">${pelicula.popularity}</h4>
                </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401){
            console.log('Error de autenticacion de conexion de API');
        }else if(respuesta.status === 404){
            console.log('La pelicula que buscas no existe');
        }else{
            console.log('Error desconocido contacta a soporte');
        }


    } catch(error){
        console.log(error);
    }

}

cargarPeliculas();
 