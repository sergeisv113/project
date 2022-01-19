/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

// for (let i = 0; i < movieDB.movies.length; i++) {
//      movieDB.movies.sort(i);
// }
// list[0].replaceWith(movieDB);
    const poster = document.querySelector('.promo__bg'),
        adv = document.querySelectorAll('.promo__adv img'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();//страница не перезагруж

        let newFilm = addInput.value;//что ввел пользователь
        const favorite = checkbox.checked;//отмечена ли галочка

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substr(0, 22)}...`;
            }
            if (favorite) {
                console.log('Добавляем любимый фильм')
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        };

        addForm.reset();
    });

    /*adv.forEach(item => {
        item.remove();
    });*/
    const deleteAdv = (arr) => {
        arr.forEach(function (item) {
            item.remove();
        });
    };

    const  makeChanges = () => {
        genre.textContent = 'Драмма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

   const sortArr = (arr) => {
       arr.sort();
   };

    function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.forEach((film, i) => {
            parent.innerHTML += `
        sortArr(films);

     <li class="promo__interactive-item">${i + 1} ${film}
                            <div class="delete"></div>
                        </li>
    `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);

            });
        });
    }
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});