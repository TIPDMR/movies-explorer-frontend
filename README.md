# Movies Explorer Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Описание

Movies Explorer - проект представляет собой клиентскую сторону сервиса поиска кино. Он включает в себя возможности аутентификации пользователей, добавления
кинофильмов в избранное и выполнения поиска по ключевым словам с последующим сохранением лучших фильмов в избранную коллекцию.

___

## Установка и запуск приложения

1. Клонируйте репозиторий на ваш компьютер.

```git clone https://github.com/TIPDMR/movies-explorer-frontend```

2. Установка зависимостей проекта. У вас должен быть установлен **NodeJS** и **NPM**

```cd movies-explorer-frontend && npm install```

3. Настройка URI адреса Backend части

    1. Откройте файл `src/constants/constApiUri.js`

    2. Измените значение переменной `NODE_ENV` с `prod` на `development` если вы хотите включить режим `React.StrictMode` и переменную `MAIN_API_URI` с `//localhost:3001` на адрес
     сервера backend. Рекомендуется использовать тока во время разработки приложения.

    3. Измените значение переменной `MAIN_API_URI` c `//api.movies.best-mesto.ru` на на адрес сервера где установлен [Movies REST API](https://github.com/TIPDMR/movies-explorer-api)

4. Запуск проекта

```npm run start```

5. Сборка проекта для публикации на удаленном сервере

```npm run build```
___

## Ссылки

### Макет Figma:

Предоставляет общее представление о том, как будет выглядеть Frontend часть приложения.

<https://www.figma.com/file/MCORX7I5oijg4qtwCnVFtZ/Diploma?type=design&node-id=891-3857&mode=design>

### Backend на Github:

Этот API обеспечивает функциональность поиска фильмов и управления пользовательскими коллекциями.

<https://github.com/TIPDMR/movies-explorer-api>

### Ссылка на Backend:

Это домен, к которому клиентская часть приложения будет отправлять запросы для получения данных.

<https://api.movies.best-mesto.ru>

### Ссылка Frontend:

Здесь пользователи смогут взаимодействовать с интерфейсом для поиска фильмов и управления своими коллекциями.

<https://movies.best-mesto.ru>
