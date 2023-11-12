#---------------------------------------------------------------------------
# Dockefile to build Docker Image of NGINX WebServer with my Web Applicaiton
#
# Copyleft(c) by Denis Astahov
#---------------------------------------------------------------------------

FROM public.ecr.aws/lts/ubuntu:latest

COPY ./YOM-back/ApplicationYOM                /YomServer/YOM-back/ApplicationYOM
COPY ./YOM-front/react-ts-shopping-cart-main  /YomServer/YOM-front/react-ts-shopping-cart-main
COPY ./scripts                                /YomServer/scripts
COPY ./.gitignore           		              /YomServer/.gitignore
COPY ./README.md                              /YomServer/README.md
COPY ./appspec.yml                            /YomServer/appspec.yml
COPY ./buildspec.yml                          /YomServer/buildspec.yml
COPY ./imagedefinitions.json                  /YomServer/imagedefinitions.json
