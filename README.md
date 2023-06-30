# О проекте

Приложение выводит график производства продуктов на разных фабриках по месяцам, 
так же позволяет просмотреть и сравнить количество произведённых продуктов 
по выбранной фабрике и месяцу.

## Стэк

* React
* React Router Dom
* CSS-modules
* recharts
* moment
* axios
* json-server

## Файл .env.example

Это пример для создания .env файла в котором лежит базовый url для запроса

## Локальный запуск проекта

Для начала нужно установить зависимости

### `npm i`

Затем запустить проект набрав в терминале команду:

### `npm run start:dev`

После запуска скрипта, приложение запустится по данному адресу

http://localhost:3000


## Запуск приложения в докер контейнерах

Команда для запуска приложения из docker контейнера

### `docker-compose up -d`

Из под docker контейнера приложение запускается по адресу:

http://localhost

## Страницы

Приложение содержит две страницы, стартовую и страницу с выбранной фабрикой

### Стартовая страница

Стартовая страница содержит график на котором по месяцам отображается
количество всех производимых товаров для каждой фабрики. Так же на странице
присутствует фильтр с помощью которого можно отфильтровать данные по первому продукту,
по второму продукту или по всем продуктам для каждой фабрики.

### Страница выбранной фабрики

На данной странице присутствует круговая диаграмма на которой представлено сравнение 
производства каждого товара

## Возможные улучшения для приложения

* Настроить и добавить линтер в проект
* Добавить тесты
* Добавить адаптив для проекта
* Добавить логирование ошибок по всему проекту
