#---------------------------------------------------------------------------
# Dockefile to build Docker Image of NGINX WebServer with my Web Applicaiton
#
# Copyleft(c) by Denis Astahov
#---------------------------------------------------------------------------

# Используем базовый образ с Windows Server 2022
FROM mcr.microsoft.com/windows/server:2022

# Создаем каталог для приложения


# Копируем файлы приложения и скрипты
COPY ./YOM-back/ApplicationYOM                   C:\inetpub\wwwroot\ApplicationYOM
COPY ./YOM-front/react-ts-shopping-cart-main     C:\inetpub\wwwroot\react-ts-shopping-cart-main
COPY ./scripts                                   C:\inetpub\wwwroot\html\scripts
COPY ./.gitignore                                C:\inetpub\wwwroot\.gitignore
COPY ./README.md                                 C:\inetpub\wwwroot\README.md
COPY ./appspec.yml                               C:\inetpub\wwwroot\appspec.yml
COPY ./buildspec.yml                             C:\inetpub\wwwroot\buildspec.yml
COPY ./imagedefinitions.json                     C:\inetpub\wwwroot\imagedefinitions.json

