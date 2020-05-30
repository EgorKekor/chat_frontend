# chat_frontend

## [Backend Golang](https://github.com/EgorKekor/chat_backend)

## [Frontend JavaScript ES6](https://github.com/EgorKekor/chat_frontend)

## Инструкция:
1. git clone git@github.com:EgorKekor/chat_frontend.git
2. cd chat_frontend/
3. npm install
4. npm run dev-server
5. В Браузере: http://localhost:8080/

## Пояснения:
1. Авторизация в комнате осуществляется по cookie, т.е. в каждую комнату, мы можем зайти только 1 раз(далее в этой комнате наша кука ассоциируется с логином);
2. Если логин уже существует - войти не можем, но можем войти если это именно мы входили под этим логином(возвращение в комнату);
3. Вебсокет соединение устанавливается если у нас есть cookie, тоесть если мы хоть раз вошли в комнату;
4. Новые сообщения видно только в комнатах, в которых мы есть;
5. Количество новых сообщений отображаются в карточке комнаты;
6. Если мы в комнате и в нее пришли новые сообщения, мы сразу сообщаем серверу о том, что прочитали их;
7. При входе в комнату также сообщаем серверу о том, что прочитали сообщения.

---

## Задание:

Необходимо создать чат с WEB-интерфейсом. Должно быть реализовано 2 компонента:

1. Сервер, у которого есть следующие методы API: создать комнату для общения, войти в комнату, отправить сообщение в комнату.
2. WEB-интерфейс, где человек может управлять комнатами. При подключении в комнату клиент должен видеть историю сообщений, которая есть в комнате.

Ограничения:

- Можно использовать любой язык программирования.
- Каждый клиент должен иметь имя, имена должны быть уникальными в рамках комнаты. Клиент сообщает свое имя клиент при подключении в комнату.
- Нельзя использовать БД, все должно быть в памяти сервера.
- Для отображения новых сообщений у клиента нужно использовать вебсокеты.

---

### ...Отправляет два сообщения
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/1.jpg)

### Кажется что то пришло
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/2.jpg)

### Подбодрю разработчика веселой песней!
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/3.jpg)

### Больше никто не пишет
![screenshot of sample](https://github.com/EgorKekor/chat_frontend/blob/master/screens/4.jpg)
