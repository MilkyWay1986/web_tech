Лабораторная работа #1.

  Для выполнения первой части работы был использован язык python3.


###### 1.2.1.   Запрос OPTIONS. Отправьте запрос на http://mail.ru, http://ya.ru, www.rambler.ru, https://www.google.ru, https://github.com/, www.apple.com/. Для чего используется запрос OPTIONS? Какие коды ответов приходят при этом запросе? Какие сайты правильно обработали запрос и вернули ожидаемые данные?
  Используется для определения возможностей веб-сервера или параметров соединения для конкретного ресурса. В ответ серверу следует включить заголовок Allow со списком поддерживаемых методов. Также в заголовке ответа может включаться информация о поддерживаемых расширениях.

  Предполагается, что запрос клиента может содержать тело сообщения для указания интересующих его сведений. Формат тела и порядок работы с ним в настоящий момент не определён; сервер пока должен его игнорировать. Аналогичная ситуация и с телом в ответе сервера.

  Для того, чтобы узнать возможности всего сервера, клиент должен указать в URI звёздочку — «*». Запросы «OPTIONS * HTTP/1.1» могут также применяться для проверки работоспособности сервера (аналогично «пингованию») и тестирования на предмет поддержки сервером протокола HTTP версии 1.1.
  ```python
  urls = ['http://mail.ru', 'http://ya.ru', 'www.rambler.ru', 'https://www.google.ru', 'https://github.com/',   'www.apple.com/']
result_request_options = []

i = 0
while( i < len(urls) ) :
    print( str(i) + ".  " "Отправляю запрос OPTIONS на сайт: " + (str(urls[i])) )
    try :
        result_request_options.insert( i, requests.options(urls[i]) )
        print( "\tОтвет сайта: " + str(result_request_options) + "\n\n" )
    except :
        print( "\tЧто то пошло не так..\n\n" )
    i = i + 1
print("\n\n\n\n")
```
```bash
root@MilkyWay:~/Desktop/web_tech/lab_1# python task_1.py
0.  Отправляю запрос OPTIONS на сайт: https://mail.ru
	Ответ сайта: [<Response [400]>]


1.  Отправляю запрос OPTIONS на сайт: https://ya.ru
	Ответ сайта: [<Response [400]>, <Response [403]>]


2.  Отправляю запрос OPTIONS на сайт: https://www.rambler.ru
	Ответ сайта: [<Response [400]>, <Response [403]>, <Response [403]>]


3.  Отправляю запрос OPTIONS на сайт: https://www.google.ru
	Ответ сайта: [<Response [400]>, <Response [403]>, <Response [403]>, <Response [405]>]


4.  Отправляю запрос OPTIONS на сайт: https://github.com/
	Ответ сайта: [<Response [400]>, <Response [403]>, <Response [403]>, <Response [405]>, <Response [404]>]


5.  Отправляю запрос OPTIONS на сайт: https://www.apple.com/
	Ответ сайта: [<Response [400]>, <Response [403]>, <Response [403]>, <Response [405]>, <Response [404]>, <Response [200]>]
```

###### 1.2.2.   Запрос HEAD.  vk.com, www.apple.com, www.msn.com. Для чего нужен запрос HEAD? Какой сайт прислал ожидаемый ответ?
  Аналогичен методу GET, за исключением того, что в ответе сервера отсутствует тело. Запрос HEAD обычно применяется для извлечения метаданных, проверки наличия ресурса (валидация URL) и чтобы узнать, не изменился ли он с момента последнего обращения. Заголовки ответа могут кэшироваться. При несовпадении метаданных ресурса с соответствующей информацией в кэше — копия ресурса помечается как устаревшая.

  ```python
  urls = ['vk.com', 'www.apple.com', 'www.msn.com']
  result_request_head = []

  i = 0
  while( i < len(urls) ) :
      print( str(i) + ".  " "Отправляю запрос HEAD на сайт: " + (str(urls[i])) )
      try :
          result_request_head.insert( i, requests.head(urls[i]) )
          print( "\tОтвет сайта: " + str(result_request_head) + "\n\n" )
      except :
          print( "\tЧто то пошло не так..\n\n" )
      i = i + 1
  print("\n\n\n\n")    
  ```
  ```bash
  root@MilkyWay:~/Desktop/web_tech/lab_1# python task_1.py
  0.  Отправляю запрос HEAD на сайт: https://vk.com
  	Ответ сайта: [<Response [418]>]


  1.  Отправляю запрос HEAD на сайт: https://www.apple.com
  	Ответ сайта: [<Response [418]>, <Response [200]>]


  2.  Отправляю запрос HEAD на сайт: https://www.msn.com
  	Ответ сайта: [<Response [418]>, <Response [200]>, <Response [302]>]
  ```

  ###### 1.2.3.   Запросы GET и POST. Отправьте по запросу на yandex.ru, google.com и apple.com. Что они вернули? Что содержится в теле ответа?

  ```python
  urls = ['https://yandex.ru', 'https://google.com', 'https://apple.com']
   result_request_get = []
   result_request_post = []

   i = 0
   while( i < len(urls) ) :
       print( str(i) + ".  " "Отправляю запрос GET на сайт: " + (str(urls[i])) )
       try :
           result_request_get.insert( i, requests.get(urls[i]) )
           print( "\tОтвет сайта: " + str(result_request_get[i]) )
           print( "\tТело ответа: " + str(result_request_get[i].text) + "\n\n" )
       except :
           print( "\tЧто то пошло не так..\n\n" )
       i = i + 1

   print("\n\n\n\n")

   i = 0
   while( i < len(urls) ) :
       print( str(i) + ".  " "Отправляю запрос POST на сайт: " + (str(urls[i])) )
       try :
           result_request_post.insert( i, requests.post(urls[i], data={'':''}) )
           print( "\tОтвет сайта: " + str(result_request_post[i]) )
           print( "\tТело ответа: " + str(result_request_post[i].text) + "\n\n" )
       except :
           print( "\tЧто то пошло не так..\n\n" )
       i = i + 1
   print("\n\n\n\n")    
  ```
  ```bash
  root@MilkyWay:~/Desktop/web_tech/lab_1# python task_1.py
  0.  Отправляю запрос GET на сайт: https://yandex.ru
  Ответ сайта: <Response [200]>
  Тело ответа: Содержимое HTML страницы


  1.  Отправляю запрос GET на сайт: https://google.com
  Ответ сайта: <Response [429]>
  Тело ответа: Содержимое HTML страницы


  2.  Отправляю запрос GET на сайт: https://apple.com
  Ответ сайта: <Response [200]>
  Тело ответа: Содержимое HTML страницы
```


###### 1.3.2.1.        Получите список всех факультетов МГТУ им. Н.Э.Баумана.
```python
   METHOD_NAME = 'database.getFaculties'
   PARAMETERS = 'university_id=250'
   ACCESS_TOKEN = '5aca1d1da012387da1c714af972f95e6056'
   V = '5.103'
   api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
   respons = requests.get(api_vk)
   print(respons.text)
   print("\n\n\n\n")
```
```json
{"response":{"count":20,"items":[{"id":1031,"title":"Аэрокосмический факультет"},{"id":1032,"title":"Факультет инженерного бизнеса и менеджмента"},{"id":1033,"title":"Факультет информатики и систем управления"},{"id":1034,"title":"Факультет машиностроительных технологий"},{"id":1035,"title":"Факультет оптико-электронного приборостроения"},{"id":1036,"title":"Приборостроительный факультет"},{"id":1037,"title":"Радиотехнический факультет"},{"id":1038,"title":"Факультет радиоэлектроники и лазерной техники"},{"id":1039,"title":"Факультет ракетно-космической техники"},{"id":1040,"title":"Факультет робототехники и комплексной автоматизации"},{"id":1041,"title":"Факультет специального машиностроения"},{"id":1042,"title":"Факультет фундаментальных наук"},{"id":1043,"title":"Факультет энергомашиностроения"},{"id":1044,"title":"Кафедра юриспруденции, интеллектуальной собственности и судебной экспертизы"},{"id":1803,"title":"Факультет биомедицинской техники"},{"id":1804,"title":"Факультет социально-гуманитарных наук"},{"id":56430,"title":"Факультет лингвистики"},{"id":56431,"title":"Физкультурно-оздоровительный факультет"},{"id":2071503,"title":"Головной учебно-исследовательский и методический центр (ГУИМЦ)"},{"id":2183736,"title":"Факультет военного обучения (Военный институт)"}]}}
```


###### 1.3.2.2.Получите свою аватарку.
```python
    METHOD_NAME = 'users.get'
    PARAMETERS = 'user_ids=navalny&fields=photo_400_orig'
    ACCESS_TOKEN = '5aca1d1d5752f95e6056'
    V = '5.103'
    api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
    respons = requests.get(api_vk)
    print(respons.text)
    print("\n\n\n\n")
```
```json
{"response":[{"id":129244038,"first_name":"Алексей","last_name":"Навальный","is_closed":false,"can_access_closed":true,"photo_400_orig":"https:\/\/sun1-87.userapi.com\/c847221\/v847221623\/f18e\/DfMz3HiTsoQ.jpg?ava=1"}]}
```


###### 1.3.2.3.Ответьте на вопросы: какой код ответа присылается от api? Что содержит тело ответа? В каком формате и какой кодировке содержаться данные? Какой веб-сервер отвечает на запросы? Какая версия протокола HTTP используется?
```bash
X-Firefox-Spdy	h2
cache-control	no-store
content-encoding	gzip
content-length	225
content-type	application/json; charset=utf-8
date	Mon, 24 Feb 2020 13:52:27 GMT
server	VK
strict-transport-security	max-age=86400
x-frame-options	DENY
x-powered-by	PHP/3.23253
Accept	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding	gzip, deflate, br
Accept-Language	ru,en-US;q=0.7,en;q=0.3
Connection	keep-alive
DNT	1
Host	api.vk.com
TE	Trailers
Upgrade-Insecure-Requests	1
User-Agent	Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0
```


###### 1.3.3.1.Отправьте запись на стену любому пользователю/группе и убедитесь, что она пришла.
```python
METHOD_NAME = 'wall.post'
ACCESS_TOKEN='5aca1da1c714af972f95e6056'
V = '5.103'
PARAMETERS = 'owner_id=666&message=4'
api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
respons = requests.get(api_vk)
print(respons.text)
print("\n\n\n\n")
```
```json
{"response":{"post_id":5}}
```

###### 1.3.3.2.Ответьте на вопрос: каким образом передаются данные от пользователя к серверу в POST-запросах?
Когда веб-браузер отправляет POST-запрос, он устанавливает заголовок Content-Type в нужный тип отправляемых данных. Чаще всего можно встретить тип данных «application/x-www-form-urlencoded». Это формат для кодирования пар ключ-значение с возможностью дублирования ключей. Каждая пара ключ-значение отделяется символом &, ключ отделён от значения символом = . В ключах и значениях пробелы заменяются на знак +, и затем, используя URL-кодирование, заменяются все не буквенно-цифровые символы.
<br><br><br><br>
Для выполнения второй части задания использовалось:
NodeJS, Postgresql.<br>
Реализован простейший CRUD-сервис "список студентов" с хранением данных в БД Postgresql.<br>
Структура таблиц БД:
```postgresql
CREATE TABLE IF NOT EXISTS students (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL
);
```
