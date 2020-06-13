#!/usr/bin/python3

import requests
import json

def T1_2_1() :
    ############################################################################################################################
    '''
    Запрос OPTIONS. Отправьте запрос на http://mail.ru, http://ya.ru, www.rambler.ru, https://www.google.ru, https://github.com/,   www.apple.com/.
    Для чего используется запрос OPTIONS? Какие коды ответов приходят при этом запросе? Какие сайты правильно обработали запрос и вернули ожидаемые данные?
    '''

    urls = ['https://mail.ru', 'https://ya.ru', 'https://www.rambler.ru', 'https://www.google.ru', 'https://github.com/',   'https://www.apple.com/']
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
    ############################################################################################################################
    
def T1_2_2() :
    ############################################################################################################################
    '''
    Запрос HEAD.  vk.com, www.apple.com, www.msn.com.
    Для чего нужен запрос HEAD? Какой сайт прислал ожидаемый ответ?
    '''

    urls = ['https://vk.com', 'https://www.apple.com', 'https://www.msn.com']
    result_request_head = []

    i = 0 
    while( i < len(urls) ) :
        print( str(i) + ".  " "Отправляю запрос HEAD на сайт: " + (str(urls[i])) )
        '''
        try :
            result_request_head.insert( i, requests.head(urls[i]) )
            print( "\tОтвет сайта: " + str(result_request_head) + "\n\n" )
        except :
            print( "\tЧто то пошло не так..\n\n" )
        '''
        result_request_head.insert( i, requests.head(urls[i]) )
        print( "\tОтвет сайта: " + str(result_request_head) + "\n\n" )
        i = i + 1
    print("\n\n\n\n")    
    ############################################################################################################################

def T1_2_3() :    
    ############################################################################################################################
    '''
    Запросы GET и POST. Отправьте по запросу на yandex.ru, google.com и apple.com. Что они вернули? Что содержится в теле ответа?
    '''

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
    ############################################################################################################################
    
def T1_3_2_1() :
    ############################################################################################################################
    '''
    Получите список всех факультетов МГТУ им. Н.Э.Баумана.
    '''

    METHOD_NAME = 'database.getFaculties'
    PARAMETERS = 'university_id=250'
    ACCESS_TOKEN = '5aca1d1d575e972f95e6056'
    V = '5.103'
    api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
    respons = requests.get(api_vk)
    print(respons.text)
    print("\n\n\n\n")
    ###########################################################################################################################
    
def T1_3_2_2() :
    ############################################################################################################################
    ''''
    Получите свою аватарку.
    '''
    METHOD_NAME = 'users.get'
    PARAMETERS = 'user_ids=navalny&fields=photo_400_orig'
    ACCESS_TOKEN = '197d708d197d708d197d708d211912baf51197d197d708d47312f0bb0bfd7abdf4c0a3d'
    V = '5.103'
    api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
    respons = requests.get(api_vk)
    print(api_vk)
    print(respons.text)
    print("\n\n\n\n")
    ############################################################################################################################
    
def T1_3_3_1() :    
    ############################################################################################################################       
    '''
    Отправьте запись на стену любому пользователю/группе и убедитесь, что она пришла.
    '''
    #https://oauth.vk.com/authorize?client_id=XXXXXXX&scope=photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,email,notifications,stats,ads,offline,docs,pages,stats,notifications&response_type=token 


    METHOD_NAME = 'wall.post'
    ACCESS_TOKEN='5aca1d1d575e972f95e6056'
    V = '5.103'
    PARAMETERS = 'owner_id=524827227&message=4'
    api_vk = 'https://api.vk.com/method/'+ METHOD_NAME +'?'+ PARAMETERS +'&access_token='+ ACCESS_TOKEN +'&v='+ V
    respons = requests.get(api_vk)
    print(respons.text)
    print("\n\n\n\n")
    ############################################################################################################################






