# Teslo-Shop
### Descripción
##### _Teslo-shop es un clon completo de la tienda de Tesla, que te da la posibilidad de acceder con tu cuenta, hacer compras con PayPal y gestionar tus productos._

##### Visita la página web oficial de [Teslo-Shop](https://tesloshop.takeoutcode.com/)

### Tecnologías usadas
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

# Requerimientos
- Node.js
- yarn
> Para este proyecto se utilizó yarn como administrador de paquetes.
> En caso de no tener yarn, puedes instalarlo con el siguiente comando:

```
npm install --global yarn
```

#### _Instalación del repositorio_
> Clonar Repositorio con HTTPS:
```
git clone https://github.com/TakeoutCode/teslo-shop.git
```

> Clonar Repositorio con SSH:
```
git clone git@github.com:TakeoutCode/teslo-shop.git
```
> En caso de que se haga un fork, instalar con el enlace que se generó.

#### _Instalación de dependencias_

```
yarn install
```
#### Renombra el archivo para las variables de entonrno_
En la raiz del proyecto, renombra el archivo **.env.template** a **.env.local**

Después del símbolo =, debes agregar lo valores de tus variables de entorno. A continuación, te comparto dónde encontrarás las claves:

| Variable de entorno | Ejemplo | Descripcion |
| --- | --- | ---|
HOST_NAME= | http://localhost:3000/ | Phat donde se encuentra tu aplicacion
NEXT_PUBLIC_TAX_RATE= | 0.15 | Porcentaje de impuetos
JWT_SECRET_SEED= | cualquier-seed-para-jwt | Secret de nuestros JWT
MONGO_URL= | mongodb://localhost:27017/teslodb | Password de la base de datos de Mongo
NEXTAUTH_SECRET= | cualquier-seed-para-NEXTAUTH | Secret de nuestra authentication
GITHUB_ID= | id-github | ID de nuestro proyecto que nos proporciona [Github](https://github.com/settings/apps)
GITHUB_SECRET= | seed-github | Secret que nos proporciona [GitHub](https://github.com/settings/apps)
NEXT_PUBLIC_PAYPAL_ClIENT= | seed-paypal-client | key que nos proporciona [PayPal](https://developer.paypal.com/home)
PAYPAL_SECRET= | seed-paypal | Secret que nos proporciona [PayPal](https://developer.paypal.com/home)
PAYPAL_OAUTH_URL= | https://api-m.sandbox.paypal.com/v1/oauth2/token | Url para hacer autenticaciones de prueba
PAYPAL_ORDERS_URL= | https://api.sandbox.paypal.com/v2/checkout/orders | Url de para hacer ordenes de prueba
CLOUDINARY_URL= | cloudinary://example:exameple@example-app | URL que nos proporciona [Cloudinary](https://cloudinary.com/)

Una vez que tengas las claves, agrega cada una a su respectivo campo sin agregar espacios ni comillas de ningún tipo.

# Contribuir
- Si deseas contribuir al desarrollo de Teslo-Shop, siéntete libre de hacer un fork de este repositorio y enviar un pull request con tus mejoras.

# Autor
- Teslo-Shop fue desarrollado por **Braulio Quezada @TakeoutCode**.- 

# Licencia
- Teslo-Shop se distribuye bajo la licencia (MIT). Para más información, revisa el archivo LICENSE en este repositorio.

**_Espero que esta información te sea útil. Si necesitas más ayuda, no dudes en preguntar. ¡Que tengas un buen día!_**
