# chat_frontend
---
### 1) git clone git@github.com:EgorKekor/chat_frontend.git
---
### 2) cd chat_frontend/
---
### 3) npm install
---
### 4) npm run dev-server
---
### 5) В Браузере: http://localhost:8080/
---
### Авторизация в комнате осуществляется по cookie, т.е. в каждую комнату, мы можем зайти только 1 раз(далее в этой комнате наша кука ассоциируется с логином), если логин существует - войти не можем, но можем войти под своим логином повторно.

## [Backend Golang](https://github.com/EgorKekor/chat_backend)
---
## [Frontend JavaScript ES6](https://github.com/EgorKekor/chat_frontend)

## Задание:

Необходимо создать чат с WEB-интерфейсом. Должно быть реализовано 2 компонента:

1. Сервер, у которого есть следующие методы API: создать комнату для общения, войти в комнату, отправить сообщение в комнату.
2. WEB-интерфейс, где человек может управлять комнатами. При подключении в комнату клиент должен видеть историю сообщений, которая есть в комнате.

Ограничения:

- Можно использовать любой язык программирования.
- Каждый клиент должен иметь имя, имена должны быть уникальными в рамках комнаты. Клиент сообщает свое имя клиент при подключении в комнату.
- Нельзя использовать БД, все должно быть в памяти сервера.
- Для отображения новых сообщений у клиента нужно использовать вебсокеты.



### ...Отправляет два сообщения
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/1.jpg)

### Кажется что то пришло
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/2.jpg)

### Подбодрю разработчика веселой песней!
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/3.jpg)

### Больше никто не пишет
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/4.jpg)
