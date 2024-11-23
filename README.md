# DiscussHub — Интернет-форум

# Содержание
- [1. Разработка и анализ требований](#1-разработка-и-анализ-требований)
  - [1.1. Анализ проблемы, цель разработки](#11-анализ-проблемы-цель-разработки)
    - [1.1.1. Проблема](#111-проблема)
    - [1.1.2. Актуальность](#112-актуальность)
    - [1.1.3. Цель разработки](#113-цель-разработки)
  - [1.2. Основные бизнес-процессы и бизнес-правила](#12-основные-бизнес-процессы-и-бизнес-правила)
  - [1.3. Границы системы](#13-границы-системы)
  - [1.4. Варианты использования](#14-варианты-использования)
  - [1.5. Спецификация требований](#15-спецификация-требований)
  - [1.6. Концептуальная модель предметной области](#16-концептуальная-модель-предметной-области)
- [2. Проектирование](#2-проектирование)
  - [2.1. Вид приложения](#21-вид-приложения)
  - [2.2. Архитектура системы](#22-архитектура-системы)
    - [2.2.1. Развертывание системы](#221-развертывание-системы)
    - [2.2.2. Структура серверной части](#222-структура-серверной-части)
    - [2.2.3. Структура клиентской части](#223-структура-клиентской-части)
  - [2.3. Компоненты системы и их взаимодействие](#23-компоненты-системы-и-их-взаимодействие)
  - [2.4. Информационное обеспечение](#24-информационное-обеспечение)
  - [2.5. Проект пользовательского интерфейса](#25-проект-пользовательского-интерфейса)
  - [2.6. Архитектурный шаблон](#26-архитектурный-шаблон)
  - [2.7. Техническое обеспечение](#27-техническое-обеспечение)
- [3. Конструирование](#3-конструирование)
  - [3.1. Обоснование выбора языка реализации и среды программирования](#31-обоснование-выбора-языка-реализации-и-среды-программирования)
  - [3.2. Организация файлового хранилища для исходных кодов, исполняемых файлов, внешних компонентов, наборов данных](#32-организация-файлового-хранилища-для-исходных-кодов-исполняемых-файлов-внешних-компонентов-наборов-данных)
  - [3.3. Выбор стиля кодирования](#33-выбор-стиля-кодирования)
  - [3.4. Способы поддержки версий файлов и сборок в процессе разработки](#34-способы-поддержки-версий-файлов-и-сборок-в-процессе-разработки)
  - [3.5. Описание способа включения в проект новых программистов при его последующем развитии или коммерциализации](#35-описание-способа-включения-в-проект-новых-программистов-при-его-последующем-развитии-или-коммерциализации)
- [4. Тестирование и отладка](#4-тестирование-и-отладка)
  - [4.1. Модульное тестирование](#41-модульное-тестирование)
  - [4.2. Функциональное тестирование](#42-функциональное-тестирование)
  - [4.3. Тестирование пользовательского интерфейса](#43-тестирование-пользовательского-интерфейса)
- [5. Ввод в эксплуатацию](#5-ввод-в-эксплуатацию)
  - [5.1. Развертывание](#51-развертывание)
  - [5.2. Руководство пользователя](#52-руководство-пользователя)
    - [5.2.1. Основное](#521-основное)
    - [5.2.2. Регистрация](#522-регистрация)
    - [5.2.3. Вход](#523-вход)
    - [5.2.4. Выход](#524-выход)
    - [5.2.5. Изменение данных аккаунта (почты или пароля)](#525-изменение-данных-аккаунта-почты-или-пароля)
    - [5.2.6. Треды](#526-треды)
    - [5.2.7. Посты](#527-посты)
    - [5.2.8. Оценка тредов](#528-оценка-тредов)
    - [5.2.9. Поиск по тредам](#529-поиск-по-тредам)
    - [5.2.10. Функции, доступные модератору](#5210-функции-доступные-модератору)
    - [5.2.11. Функции, доступные администратору](#5211-функции-доступные-администратору)
- [Заключение](#заключение)
- [Список использованной литературы](#список-использованной-литературы)


# Введение

В современном информационном пространстве социальные сети, блоги и онлайн-коммуникации играют ключевую роль в обмене мнениями, идеями и знаниями. В этом контексте форумы остаются одним из наиболее востребованных и популярных средств общения в интернете. С их помощью пользователи могут обсуждать различные темы, делиться опытом, задавать вопросы и получать советы от других участников. Однако существующие веб-платформы для форумов часто страдают от ограниченного функционала, неудобного интерфейса или недостаточной безопасности данных.

В данном контексте целью данной дипломной работы является разработка веб-приложения, специализированного на организации форумов, которое предложит современные и эффективные решения для пользователей. Форумы представляют собой тематические разделы сайта, который также называется форумом. Главной задачей будет создание интуитивно понятного, функционального и безопасного веб-интерфейса, который позволит пользователям легко обмениваться информацией, создавать и модерировать темы и следить за актуальными обсуждениями.

Для достижения поставленной цели необходимо выбрать технологии и инструменты разработки, выполнить проектирование архитектуры системы, разработать функционал и провести тестирование приложения.

В итоге разработка данного веб-приложения для организации форумов будет способствовать созданию удобного инструмента для общения и обмена информацией в онлайн-сообществах, повышая качество интернет-диалога и улучшая пользовательский опыт.


# 1. Разработка и анализ требований


## 1.1. Анализ проблемы, цель разработки


### 1.1.1. Проблема

Существует множество форумов в интернете, но не все из них и не всегда предоставляют положительный пользовательский опыт. Некоторые из них имеют ограниченные функциональные возможности, другие могут быть запутанными в использовании или недостаточно модернизированными. Более того, с ростом объема информации в интернете становится сложнее отслеживать и находить актуальные обсуждения и темы на форумах. Это создает необходимость в разработке современного и удобного веб-приложения, специализированного на общении между людьми.

![изображение](https://github.com/user-attachments/assets/af1629e1-862f-4d8f-ac9b-240e51a0c80d)

Рисунок 1 – Диаграмма Исикавы для проблемы (Fish Bone)


### 1.1.2. Актуальность

Актуальность данного проекта подтверждается рядом факторов:

**Постоянный рост интернет-пользователей:** С каждым годом количество пользователей интернета растет, что создает больший спрос на качественные онлайн-сервисы, включая форумы.

**Потребность в информации и общении:** Форумы остаются одним из основных источников информации и общения в интернете. С развитием социальных сетей и мессенджеров потребность в таких платформах не исчезает, а, наоборот, возрастает.

**Необходимость в современных решениях:** Существующие форумы могут быть устаревшими или неудобными в использовании. Пользователи ищут более современные и удобные альтернативы.

Таким образом, разработка веб-приложения для организации форумов является актуальной и востребованной задачей, которая обеспечит пользователей качественной и удобной платформой для обмена информацией и общения в онлайн-среде.


### 1.1.3. Цель разработки

Целью проекта является создание веб-приложения, которое предоставит пользователям простой, удобный и современный интерфейс для организации и участия в обсуждениях. Разработкой движет стремление разработать платформу, которая будет способствовать легкому взаимодействию пользователей, обмену информацией и обсуждению вопросов


## 1.2. Основные бизнес-процессы и бизнес-правила

Для разработки данной системы следует ознакомиться с ее бизнес-процессами. Для этого на рисунке 2 изображена концептуальная модель процесса работы желаемого форума.

![изображение](https://github.com/user-attachments/assets/b6ca4c00-4e46-400e-9903-b6bfb543d98c)

Рисунок 2 – Концептуальная диаграмма IDEF0

На данной диаграмме видно, что желаемый форум принимает контент, и пользователи реагируют на него. Этот процесс уточнен на рисунке 3 с помощью диаграммы декомпозиции.

![изображение](https://github.com/user-attachments/assets/aa05d0b4-fc1c-4b34-ae6e-ba026326cf1c)

Рисунок 3 – Диаграмма декомпозиции IDEF0

После декомпозиции выделяется функционал по распространению контента до пользователей. Обычно это реализуется поиском, возможно еще другими методами.


## 1.3. Границы системы

Для описания границ системы использована диаграмма потоков данных, показанная на рисунке 4.

![изображение](https://github.com/user-attachments/assets/c01e641a-c60d-436b-bf75-5df1dc4e7db4)

Рисунок 4 – Диаграмма потоков данных (DFD) - модель окружения

На данной диаграмме видно, что внешними к системе являются только люди — это пользователи, модераторы и администраторы.


## 1.4. Варианты использования

В плане вариантов использования, Администраторы — это те, кто производит управляет всем форумом: управляет списками тем. Модераторы - те, кто модерирует контент, создаваемый пользователями, и они также могут создавать контент. Обычные пользователи — это люди, которые зарегистрировались на форуме. Эти роли (то есть Пользователи) имеют аккаунты.

На рисунке 5 изображена диаграмма вариантов использования.

![изображение](https://github.com/user-attachments/assets/b9fe13e8-e958-48d8-9729-3562db3816f1)

Рисунок 5 – Диаграмма вариантов использования (Use Case)

1. Назначение документа

1.1. Настоящий документ представляет спецификацию требований для веб-приложения для организации форумов

Описывает:
-	требования к функционалу, эксплуатационным характеристикам, интерфейсам взаимодействия с другими системами, оборудованию;
-	соответствие требований к ПО требованиям к продукту в целом.
-	SRS служит основой для дальнейшего планирования, дизайна и кодирования.

2. Общее описание

Данный продукт является веб-приложением для организации форумов, ориентированной на широкую аудиторию.

2.1. Общий взгляд на продукт

Цель создания документа состоит в сборе, анализе и выявлении высокоуровневых бизнес-требований, установлении возможностей для разработки веб-приложения для организации форумов и составлении необходимой документации.

Документ акцентирует внимание на необходимых для заинтересованных лиц и целевых пользователей возможностях, на том, почему эти потребности существуют. Подробности выполнения этих потребностей детализированы в спецификациях вариантов использования и спецификации требований.

2.2. Классы и характеристики пользователей


## 1.5. Спецификация требований

Таблица 2 – Классы и характеристики пользователей

|Класс|Описание|
|-|-|
|Незарегистрированный пользователь|Человек, который зашел на сайт и просматривает контент, не авторизуясь.|
|Зарегистрированный пользователь|Человек, который зарегистрировался на сайте и теперь может помимо просмотра контента создавать свой.|
|Модератор|Человек, который ответственен за модерацию контента|
|Администратор|Главное лицо сайта. Может создавать категории и управлять форумом в широком диапазоне.|
|Версия|v1.0|

2.2. Операционная среда

Веб-приложение должно осуществлять работу в любом мобильном и стационарном устройстве с доступом в сеть интернет через среду браузера.

3. Функции системы

3.1. Аутентификация
   
3.1.1. Описание

Пользователь может зарегистрироваться и войти в систему.
 
3.1.2. Функциональные требования

Таблица 3 – Регистрация

|Идентификатор требования|SRS-AUTH-001|
|-|-|
|Название|Регистрация|
|Описание|Неавторизованный пользователь может создать новый аккаунт, введя логин, имя, электронную почту и пароль. Логин и электронная почта должны быть уникальными во всей системе.|
|Источник|-|
|Версия|v1.0|

Таблица 4 – Вход в систему

|Идентификатор требования|SRS-AUTH-002|
|-|-|
|Название|Вход в систему|
|Описание|Неавторизованный пользователь может войти в систему с помощью ранее созданного аккаунта, введя логин или почту и пароль.|
|Источник|-|
|Версия|v1.0|

3.2. Управление аккаунтом

3.2.1. Описание

Авторизованный пользователь может редактировать данные своего аккаунта.

3.2.2. Функциональные требования

Таблица 5 – Обновление данных аккаунта

|Идентификатор требования|SRS-USERACC-001|
|-|-|
|Название|Обновление данных аккаунта|
|Описание|Пользователь может изменить свои данные своего аккаунта (электронная почта, пароль)|
|Источник|-|
|Версия|v1.0|

3.4. Взаимодействие с контентом

3.4.1. Описание

Простое взаимодействие с контентом, для которого не нужна регистрация.

3.4.2. Функциональные требования

Таблица 6 – Просмотр списка тем

|Идентификатор требования|SRS-UNREGUSER-001|
|-|-|
|Название|Просмотр списка тем|
|Описание|Пользователь может просмотреть список тем на форуме|
|Источник|-|
|Версия|v1.0|

Таблица 7 – Просмотр списка тредов в теме

|Идентификатор требования|SRS-UNREGUSER-002|
|-|-|
|Название|Просмотр списка тредов в теме|
|Описание|Пользователь может просмотреть список тредов в теме|
|Источник|-|
|Версия|v1.0|

Таблица 8 – Просмотр постов в треде

|Идентификатор требования|SRS-UNREGUSER-003|
|-|-|
|Название|Просмотр постов в треде|
|Описание|Пользователь может просмотреть посты в треде|
|Источник|-|
|Версия|v1.0|

Таблица 9 – Поиск тредов в теме

|Идентификатор требования|SRS-UNREGUSER-004|
|-|-|
|Название|Поиск тредов в теме|
|Описание|Пользователь может искать нужный ему тред с помощью фразы, введенную в форму поиска|
|Источник|-|
|Версия|v1.0|

Таблица 10 – Сортировка тредов в теме

|Идентификатор требования|SRS-UNREGUSER-005|
|-|-|
|Название|Сортировка тредов в теме|
|Описание|Пользователь может отсортировать треды по новизне, по дате последнего поста в треда, по рейтингу|
|Источник|-|
|Версия|v1.0|

3.5. Продвинутое взаимодействие с контентом

3.5.1. Описание

Продвинутое взаимодействие с контентом, для которого нужна регистрация.
 
3.5.2. Функциональные требования

Таблица 11 – Создание треда

|Идентификатор требования|SRS-REGUSER-001|
|-|-|
|Название|Создание треда|
|Описание|Зарегистрированный пользователь может создать тред|
|Источник|-|
|Версия|v1.0|

Таблица 12 – Оценка треда

|Идентификатор требования|SRS-REGUSER-002|
|-|-|
|Название|Оценка треда|
|Описание|Зарегистрированный пользователь может поставить треду лайк или дизлайк|
|Источник|-|
|Версия|v1.0|

Таблица 13 – Написание поста

|Идентификатор требования|SRS-REGUSER-003|
|-|-|
|Название|Написание поста|
|Описание|Зарегистрированный пользователь может написать пост|
|Источник|-|
|Версия|v1.0|

Таблица 14 – Редактирование поста

|Идентификатор требования|SRS-REGUSER-004|
|-|-|
|Название|Редактирование поста|
|Описание|Зарегистрированный пользователь может отредактировать свой пост|
|Источник|-|
|Версия|v1.0|

3.6. Модерирование контента

3.6.1. Описание

Взаимодействие с системой касательно контента, характерное для модератора

3.6.2. Функциональные требования

Таблица 15 – Удаление чужого поста

|Идентификатор требования|SRS-MODERATOR-001|
|-|-|
|Название|Удаление чужого поста|
|Описание|Модератор может удалить любой пост кроме постов модераторов и администраторов.|
|Источник|-|
|Версия|v1.0|

Таблица 16 – Удаление треда

|Идентификатор требования|SRS-MODERATOR-002|
|-|-|
|Название|Удаление треда|
|Описание|Модератор может удалить любой тред кроме тредов, созданных модераторами и администраторами.|
|Источник|-|
|Версия|v1.0|

Таблица 17 – Создание темы

|Идентификатор требования|SRS-ADMIN-003|
|-|-|
|Название|Создание темы|
|Описание|Администратор может создать тему.|
|Источник|-|
|Версия|v1.0|

Таблица 18 – Удаление темы

|Идентификатор требования|SRS-ADMIN-004|
|-|-|
|Название|Удаление темы|
|Описание|Администратор может удалить тему.|
|Источник|-|
|Версия|v1.0|


## 1.6. Концептуальная модель предметной области

На рисунке 6 изображена концептуальная модель предметной области.

![изображение](https://github.com/user-attachments/assets/231f4f9c-bbb3-496f-9766-d3023fa8b00f)

Рисунок 6 – Диаграмма классов уровня анализа UML


# 2. Проектирование


## 2.1. Вид приложения

Система представляет собой веб-приложение, исполняемое в любом современном браузере.


## 2.2. Архитектура системы


### 2.2.1.	Развертывание системы

Система “Веб-приложение для организации форумов” должна быть развернута на сервере. Сервер содержит в себе базу данных, веб-сервер, WebAPI, приложение React.

![image](https://github.com/user-attachments/assets/d6a1f926-a3c2-4fe6-82b5-137a69d7cb0d)

Рисунок 7 – Диаграмма развертывания


### 2.2.2.	Структура серверной части

**Веб-сервер (IIS):**

IIS служит в качестве основного веб-сервера для обслуживания запросов от клиентов. Он принимает входящие HTTP или HTTPS -запросы и маршрутизирует их к веб-приложению.

**База данных (MS SQL Server):**

MS SQL Server используется для хранения данных форума, таких как пользователи, сообщения, темы и т. д.

**Web API:**

Веб-приложение, построенное с использованием ASP.NET Web API, работает как прослойка между веб-браузером и базой данных. Оно обрабатывает входящие запросы от клиентов, выполняет необходимые операции с базой данных и возвращает данные в формате JSON. Также она обрабатывает бизнес-логику, такую, как аутентификация и авторизация.


### 2.2.3. Структура клиентской части

Фронтенд представляет собой пользовательский интерфейс веб-форума, с которым взаимодействуют пользователи. Он реализован с использованием современного фреймворка React.js. Фронтенд отображает данные, полученные от серверной части, и обрабатывает пользовательские действия, такие как отправка сообщений, просмотр тем и т. д.

Веб-приложение построено как одностраничное приложение (SPA), когда все необходимые ресурсы загружаются один раз, и затем изменяется динамически без перезагрузки страницы. Клиентская часть веб-приложения включает различные страницы, такие как страницы входа, регистрации, просмотра тредов, создания постов и т. д.

Клиентская часть взаимодействует с серверной частью через API, отправляя запросы и получая ответы. Она использует RESTful для обмена данными с сервером.


## 2.3. Компоненты системы и их взаимодействие

Из перечисленных требований можно выделить логику работы с пользователями, темами, тредами, постами, лайками и дизлайками, поиском. К тому же, серверная часть должна обрабатывать веб-запросы клиентской части, и обращаться к БД (по адресу, указанному в конфигурации).

На рисунке 8 приведен пример взаимодействия компонентов системы на примере создания поста.

![image](https://github.com/user-attachments/assets/1668acd6-8e41-4e09-b754-aeb7f8b3ac62)

Рисунок 8 – Диаграмма последовательности для процесса создания поста

На рисунке 9 изображена диаграмма, описывающая взаимодействие систем и других компонентов разрабатываемого веб-приложения через интерфейсы.

![image](https://github.com/user-attachments/assets/a2db3d22-ea85-4fd1-aa8c-a0a78426bab6)


## 2.4. Информационное обеспечение

Хранение информации в системе производится базой данных (для хранения данных тем, тредов и постов, данных о пользователях и т.д.) и файлами (для организации и хранения медиафайлов).

![image](https://github.com/user-attachments/assets/120f7a61-ac3f-47f4-a29d-9d5e71a88c0e)

Рисунок 10 – Физическая модель БД

Файлы хранятся в одной директории Images в файловом хранилище сервера, на котором работает приложение WebApi.

![image](https://github.com/user-attachments/assets/0ebcaf49-c35c-4bde-8a78-c59507fc24ea)

Рисунок 11 – Таблица Theme

![image](https://github.com/user-attachments/assets/55fec1c9-eeed-4cee-a90c-0dce49b7e95f)
 
Рисунок 12 – Таблица Rating

![image](https://github.com/user-attachments/assets/605298b3-c630-4bab-a609-29be32ef74f1)

Рисунок 13 – Таблица Thread

![image](https://github.com/user-attachments/assets/dec5e94e-acab-4cc5-8652-9f80ad3d92ba)

Рисунок 14 – Таблица Image

![image](https://github.com/user-attachments/assets/fd316bc6-4c2d-40f8-b9a1-0aff0c6cb2f2)

Рисунок 15 – Таблица AspNetUsers

![image](https://github.com/user-attachments/assets/b8a840a1-eefb-4a3c-9c26-5efb995ac274)

Рисунок 16 – Таблица Post

![image](https://github.com/user-attachments/assets/d20655a9-aab1-4985-b76c-a0e83040b398)

Рисунок 17 – Таблица AspNetUserRoles

![image](https://github.com/user-attachments/assets/640d9ac7-7136-496b-bdf4-deb8e4bf65ca)

Рисунок 18 – Таблица AspNetRoles


## 2.5. Проект пользовательского интерфейса

![image](https://github.com/user-attachments/assets/c182f2f1-1578-490f-965c-69b6d7b8e780)

Рисунок 19 – Макет интерфейса одного из разделов сайта, выполненный с помощью инструмента проектирования интерфейсов Figma


## 2.6. Архитектурный шаблон

Были использованы следующие архитектурные шаблон разделения приложения на две части: клиентскую часть и серверную часть.


## 2.7. Техническое обеспечение

**Требования к серверу:**

•	Не менее 4 Гб оперативной памяти; 
•	10 Гб дискового пространства;
•	Процессор с тактовой частотой не менее 2 ГГц.

# 3. Конструирование
## 3.1. Обоснование выбора языка реализации и среды программирования
## 3.2. Организация файлового хранилища для исходных кодов, исполняемых файлов, внешних компонентов, наборов данных
## 3.3. Выбор стиля кодирования
## 3.4. Способы поддержки версий файлов и сборок в процессе разработки
## 3.5. Описание способа включения в проект новых программистов при его последующем развитии или коммерциализации
# 4. Тестирование и отладка
## 4.1. Модульное тестирование
## 4.2. Функциональное тестирование
## 4.3. Тестирование пользовательского интерфейса
# 5. Ввод в эксплуатацию
## 5.1. Развертывание
## 5.2. Руководство пользователя
### 5.2.1. Основное
### 5.2.2. Регистрация
### 5.2.3. Вход
### 5.2.4. Выход
### 5.2.5. Изменение данных аккаунта (почты или пароля)
### 5.2.6. Треды
### 5.2.7. Посты
### 5.2.8. Оценка тредов
### 5.2.9. Поиск по тредам
### 5.2.10. Функции, доступные модератору
### 5.2.11. Функции, доступные администратору
# Заключение
# Список использованной литературы
