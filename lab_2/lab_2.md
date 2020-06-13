Лабораторная работа #2.

###### 1. Замерьте скорость отдачи контента на сервере из лабораторной работы №1 (отдача страниц, картинки, запросов к api). Добавьте логирование приходящих запросов :
            django logger
            express logger (middleware)
            C# NLog

 Скорость отдачи html страницы на сервере из лабораторной работы №1 ( задание 2 ) :

    root@MilkyWay:~/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei# ab -c 10 -n 100 http://127.0.0.1:9001/
    This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking 127.0.0.1 (be patient).....done


    Server Software:        
    Server Hostname:        127.0.0.1
    Server Port:            9001

    Document Path:          /
    Document Length:        27 bytes

    Concurrency Level:      10
    Time taken for tests:   0.084 seconds
    Complete requests:      100
    Failed requests:        0
    Non-2xx responses:      100
    Total transferred:      22000 bytes
    HTML transferred:       2700 bytes
    Requests per second:    1192.48 [#/sec] (mean)
    Time per request:       8.386 [ms] (mean)
    Time per request:       0.839 [ms] (mean, across all concurrent requests)
    Transfer rate:          256.20 [Kbytes/sec] received

    Connection Times (ms)
                min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       1
    Processing:     2    8   1.7      8      10
    Waiting:        2    5   2.1      5      10
    Total:          2    8   1.8      9      10

    Percentage of the requests served within a certain time (ms)
    50%      9
    66%      9
    75%     10
    80%     10
    90%     10
    95%     10
    98%     10
    99%     10
    100%     10 (longest request)



Включаем логирование:

    var expressLogging = require('express-logging'),
    logger = require('logops');
    app.use(expressLogging(logger));

Переходим на страницу http://localhost:9001/ (выполняем GET запрос html страницы без картинок) получаем информацию от логера:

    {"time":"2020-06-05T16:13:00.180Z","lvl":"INFO","msg":"Request from ::ffff:127.0.0.1: GET /"}
    {"time":"2020-06-05T16:13:00.180Z","lvl":"INFO","msg":"Response with status 302 in 0 ms. Location: /html"}


Переходим на страницу http://localhost:9001/img/logo.png (выполняем GET запрос на получение статического файла - картинки) получаем информацию от логера:

    {"time":"2020-06-05T16:16:50.651Z","lvl":"INFO","msg":"Request from ::ffff:127.0.0.1: GET /img/logo.png"}
    {"time":"2020-06-05T16:16:50.651Z","lvl":"INFO","msg":"Response with status 304 in 0 ms."}




###### 2. Сконфигурируйте nginx сервер таким образом, чтобы запросы проходили через nginx и перенаправлялись на сервер из лабораторной работы №1.

    events {}

    http {
     include mime.types;
    
        server {
        
         listen 10001;
        
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
      } 
    }


###### 3. Используйте nginx отдачи статического контента. Как изменилось время ответа сервера?

    events {}

    http {

     include mime.types;
     server {
       listen 804;
       location /img/ {
        root /root/Desktop/web_tech/lab_1/task_2/static;
      }
     }
    }
Скорость отдачи png картинки страницы на сервере из лабораторной работы №1 ( задание 2 ) :

    root@MilkyWay:~/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei# ab -c 10 -n 100 http://localhost:10001/img/logo.png
    This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking localhost (be patient).....done


    Server Software:        nginx/1.18.0
    Server Hostname:        localhost
    Server Port:            10001

    Document Path:          /img/logo.png
    Document Length:        324657 bytes

    Concurrency Level:      10
    Time taken for tests:   0.023 seconds
    Complete requests:      100
    Failed requests:        0
    Total transferred:      32489500 bytes
    HTML transferred:       32465700 bytes
    Requests per second:    4280.27 [#/sec] (mean)
    Time per request:       2.336 [ms] (mean)
    Time per request:       0.234 [ms] (mean, across all concurrent requests)
    Transfer rate:          1358045.94 [Kbytes/sec] received

    Connection Times (ms)
                min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       0
    Processing:     1    2   0.6      2       4
    Waiting:        0    0   0.4      0       2
    Total:          1    2   0.6      2       4

    Percentage of the requests served within a certain time (ms)
    50%      2
    66%      2
    75%      2
    80%      3
    90%      3
    95%      4
    98%      4
    99%      4
    100%      4 (longest request)


###### 4. Настройте кеширование и gzip сжатие файлов.  Как изменилось время ответа сервера?



    root@MilkyWay:~/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2# curl -I -H 'Accept-Encoding: gzip, deflate' http://localhost:10001/img/logo.png
    HTTP/1.1 200 OK
    Server: nginx/1.18.0
    Date: Fri, 05 Jun 2020 17:04:06 GMT
    Content-Type: image/png
    Last-Modified: Sun, 08 Dec 2019 12:16:39 GMT
    Connection: keep-alive
    ETag: W/"5dece9a7-4f431"
    Content-Encoding: gzip

    root@MilkyWay:~/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2# ab -c 10 -n 100 http://localhost:10000/img/logo.png
    This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking localhost (be patient).....done


    Server Software:        nginx/1.18.0
    Server Hostname:        localhost
    Server Port:            10000

    Document Path:          /img/logo.png
    Document Length:        324657 bytes

    Concurrency Level:      10
    Time taken for tests:   0.021 seconds
    Complete requests:      100
    Failed requests:        0
    Total transferred:      32489500 bytes
    HTML transferred:       32465700 bytes
    Requests per second:    4750.14 [#/sec] (mean)
    Time per request:       2.105 [ms] (mean)
    Time per request:       0.211 [ms] (mean, across all concurrent requests)
    Transfer rate:          1507126.51 [Kbytes/sec] received

    Connection Times (ms)
                min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       0
    Processing:     1    2   0.5      2       4
    Waiting:        0    1   0.5      1       2
    Total:          1    2   0.5      2       4

    Percentage of the requests served within a certain time (ms)
    50%      2
    66%      2
    75%      2
    80%      2
    90%      3
    95%      3
    98%      4
    99%      4
    100%      4 (longest request)






###### 5. Запустите еще 2 инстанса вашего сервера из лабораторной работы №1, настройте перенаправление таким образом, чтобы на серверы приходили запросы в соотношении 3:1.

    events {}

    http {
     include mime.types;
    
     upstream backend {
        least_conn;
        server 127.0.0.1:9001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003;
     }

     server {
    
     listen 10001;
    
    
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
        
        
        location /service1/ {
         proxy_pass http://localhost:9002/;
        }
        location /service2/ {
         proxy_pass http://127.0.0.1:9003/;
        }
        
        
        location /img/ {
         root /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/static_server/static;
        }
     } 
  }


###### 6.  Напишите еще два мини-сервера. Каждый из них должен обрабатывать два GET-запроса.
         events {}

    http {
     include mime.types;
    
     upstream backend {
        least_conn;
        server 127.0.0.1:9001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003;
     }

     server {
    
     listen 10001;
    
    
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
        
        
        location /service1/ {
         proxy_pass http://localhost:9002/;
        }
        location /service2/ {
         proxy_pass http://127.0.0.1:9003/;
        }
        
        
        location /img/ {
         root /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/static_server/static;
        }
     } 
    }

###### Настройте nginx так, чтобы в дополнение к п.1-5 он перенаправлял запросы по     url /service1 и /service2 на соответствующие сервера.
 events {}

    http {
     include mime.types;
    
     upstream backend {
        least_conn;
        server 127.0.0.1:9001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003;
     }

     server {
    
     listen 10001;
    
    
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
        
        
        location /service1/ {
         proxy_pass http://localhost:9002/;
        }
        location /service2/ {
         proxy_pass http://127.0.0.1:9003/;
        }
        
        
        location /img/ {
         root /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/static_server/static;
        }
     } 
    }

###### 7. Настройте отдачу страницы о состоянии сервера.
    
    events {}
    http {
    include mime.types;
    
    upstream backend {
        least_conn;
        server 127.0.0.1:9001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003;
    }

    server {
        
        listen 10001;
        
        
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
        
        
        location /service1/ {
         proxy_pass http://localhost:9002/;
        }
        location /service2/ {
         proxy_pass http://127.0.0.1:9003/;
        }
        
        
        location /img/ {
         root /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/static_server/static;
        }
        
        
        location /basic_status {
         stub_status;
        }
    
     } 
    }


###### Дополнительные задания:
  ###### 8. Настройте https порт на сервере nginx. Используйте самоподписанный сертификат.
    
    
    events {}
    http {
    
    proxy_cache_path /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/cache levels=1:2 keys_zone=all:32m max_size=1g;
    include mime.types;
    
    upstream backend {
        least_conn;
        server 127.0.0.1:9001 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9002 weight=3 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:9003;
    }
    
    
    server {
        #listen 10000;
        listen 443 ssl;
        
        ssl_protocols TLSv1.2;
        ssl_certificate /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/ssl/nginx.crt;
        ssl_certificate_key /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/ssl/nginx.key;
        
        location / {
         proxy_pass http://127.0.0.1:10001/;
         proxy_cache all;
         proxy_cache_valid any 1h;
        }
    } 

    server {
    
        gzip on;
        gzip_min_length 10;
        gzip_comp_level 4; 
        gzip_proxied any;

        gzip_types text/plain;
        gzip_types image/png;
        gzip_types image/jpeg;
        
        listen 10001;
        
        
        location / {
         proxy_pass http://127.0.0.1:9001/;
        }
        location /static-server {
         proxy_pass http://127.0.0.1:9001/;
        }
        
        
        location /service1/ {
         proxy_pass http://localhost:9002/;

        }
        location /service2/ {
         proxy_pass http://127.0.0.1:9003/;
        }
        
        
        location /img/ {
         root /root/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei/lab_2/static_server/static;
        }
        
        
        location /basic_status {
         stub_status;
        }
     } 
    }

  
  ###### 9. Добавьте ServerPush картинки для страницы index.html. Как изменилось время ответа сервера и загрузки страницы?
  
  
    root@MilkyWay:~/Desktop/STADY/web_tech/web-labs-2020-bakholdin-alexei# ab -c 10 -n 100 http://localhost:10001/
    This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking localhost (be patient).....done


    Server Software:        nginx/1.18.0
    Server Hostname:        localhost
    Server Port:            10001

    Document Path:          /
    Document Length:        27 bytes

    Concurrency Level:      10
    Time taken for tests:   0.079 seconds
    Complete requests:      100
    Failed requests:        0
    Non-2xx responses:      100
    Total transferred:      24200 bytes
    HTML transferred:       2700 bytes
    Requests per second:    1258.38 [#/sec] (mean)
    Time per request:       7.947 [ms] (mean)
    Time per request:       0.795 [ms] (mean, across all concurrent requests)
    Transfer rate:          297.39 [Kbytes/sec] received

    Connection Times (ms)
                min  mean[+/-sd] median   max
    Connect:        0    0   0.2      0       1
    Processing:     2    7   2.0      7      12
    Waiting:        2    7   2.0      7      12
    Total:          3    7   1.9      7      12

    Percentage of the requests served within a certain time (ms)
    50%      7
    66%      8
    75%      8
    80%      9
    90%     11
    95%     12
    98%     12
    99%     12
    100%     12 (longest request)

  ###### 10. Для повышения уровня безопасности необходимо скрывать внутреннюю реализацию вашего сервера. Скройте все заголовки Server (nginx можно оставить) из header ответа, а также дополнительные заголовки, которые дописывает ваш сервер, если есть.
