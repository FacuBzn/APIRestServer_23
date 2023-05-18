# API REST
Una **API REST** (Representational State Transfer) es un conjunto de reglas y convenciones que permiten la comunicación y transferencia de datos entre diferentes sistemas a través del protocolo HTTP. Está basada en los principios del estilo arquitectónico REST, que promueve una interfaz uniforme y orientada a recursos.

# Características principales
* Arquitectura cliente-servidor: La API REST sigue una arquitectura cliente-servidor, donde el cliente realiza solicitudes HTTP al servidor, quien responde con los datos correspondientes.
* Protocolo HTTP: Se utiliza el protocolo HTTP para la comunicación entre el cliente y el servidor. Las operaciones básicas de HTTP, como GET, POST, PUT y DELETE, se utilizan para realizar operaciones en los recursos de la API.
* Estado de las respuestas: Cada respuesta del servidor a una solicitud del cliente contiene información sobre el estado de la operación, como códigos de estado HTTP (por ejemplo, 200 OK, 404 Not Found).
* Recursos: Los recursos son entidades identificables que se acceden a través de la API. Cada recurso tiene una URL única y se puede interactuar con él mediante las operaciones de HTTP.
Representaciones: Los recursos pueden tener diferentes representaciones, como JSON, XML o texto plano. El cliente y el servidor negocian el formato de representación en las cabeceras de las solicitudes y respuestas.
* Sin estado: Cada solicitud del cliente al servidor es independiente y no guarda información de estado. La autenticación y gestión de sesiones se realiza utilizando técnicas como tokens de acceso o cookies.

# Beneficios de utilizar una API REST
* Flexibilidad: La API REST permite una fácil integración y comunicación entre sistemas heterogéneos, ya que se basa en estándares ampliamente utilizados como HTTP.
* Escalabilidad: Al estar basada en HTTP, puede manejar un gran número de solicitudes concurrentes y escalar horizontalmente según las necesidades del sistema.
Separación de preocupaciones: La API REST separa claramente el front-end (cliente) del back-end (servidor), permitiendo el desarrollo independiente de ambos componentes.
* Interoperabilidad: Dado que la API REST utiliza formatos de datos comunes como JSON o XML, es compatible con una amplia gama de plataformas y lenguajes de programación.
* Simplicidad: Las reglas y convenciones de una API REST hacen que su diseño y desarrollo sean más sencillos y comprensibles, lo que facilita su mantenimiento y evolución.
# Uso de una API REST
Para utilizar una API REST, es necesario realizar solicitudes HTTP a las URL de los recursos deseados utilizando los verbos y operaciones adecuados (GET, POST, PUT, DELETE). Los datos se envían en el cuerpo de la solicitud y las respuestas se reciben con los datos correspondientes en el formato acordado.

Es común que las API REST proporcionen una documentación detallada que describe los recursos disponibles, las operaciones admitidas y los formatos de datos esperados y devueltos.

Recuerda que esta es solo una descripción básica de una API REST. Puedes encontrar más información y detalles en la documentación oficial de la API específica que estés utilizando.