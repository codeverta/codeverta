---
title: "Codeverta y la digitalización de la salud en Indonesia: Del RME a la integración SATUSEHAT"
date: "2026-07-29"
image: "/assets/healthcare/editorial/codeverta-healthcare-digitalization-hero.png"
desc: "Historia de cómo Codeverta ayuda a los centros de salud a construir sistemas operativos, historias clínicas electrónicas y rutas de integración SATUSEHAT listas para usar en el trabajo diario."
tags: "Codeverta salud, digitalización de la salud en Indonesia, integración SATUSEHAT, historia clínica electrónica, RME, sistema de información hospitalaria, sistema de gestión de clínicas, FHIR Indonesia, software de salud"
translationOf: "26-codeverta-membantu-digitalisasi-healthcare-indonesia-integrasi-satusehat"
---

# Codeverta y la digitalización de la salud en Indonesia: Del RME a la integración SATUSEHAT

A menudo se habla de la digitalización de la salud como si el trabajo terminara cuando una clínica deja de usar papel. La realidad no es tan simple.

Convertir formularios en pantallas es parte del proceso. Sin embargo, el trabajo más pesado aparece después: garantizar que los datos del paciente no estén duplicados, que el flujo de médicos y enfermeras siga siendo cómodo, que el stock de medicamentos esté vinculado a las recetas, que los resultados de laboratorio se integren en el historial correcto y que los datos requeridos puedan enviarse al ecosistema nacional.

Ahí es donde Codeverta asume su papel. Ayudamos a construir la capa tecnológica que los centros de salud utilizan a diario: desde sistemas de gestión de clínicas y hospitales, historias clínicas electrónicas, farmacia, laboratorio, programación de personal sanitario, hasta la preparación para la integración con SATUSEHAT.

El papel es bastante claro. El Ministerio de Salud (Kementerian Kesehatan) construye SATUSEHAT como la plataforma nacional de intercambio de datos de salud. Codeverta trabaja en el lado de los centros y sistemas operativos: hacer que los datos generados en la atención diaria sean ordenados, estructurados, seguros y listos para intercambiarse según las disposiciones del Ministerio.

![Personal sanitario utilizando sistemas digitales en la atención clínica en Indonesia](/assets/healthcare/editorial/digital-clinic-indonesia.png)

_Ilustración editorial: la tecnología debe seguir el flujo de la atención, no hacer que el personal sanitario pase su tiempo atendiendo a la aplicación._

## El problema no es solo "no tener una aplicación"

En muchos centros de salud, ya existen aplicaciones. El registro usa un sistema, el consultorio usa otro, el laboratorio tiene su propio registro, mientras que la farmacia y la caja aún dependen de hojas de cálculo. Cada parte puede funcionar, pero los datos no siempre hablan el mismo idioma.

Las consecuencias son fáciles de predecir:

- el paciente tiene que repetir datos que ya ha dado;
- el personal copia información de una pantalla a otra;
- el médico ve tarde los resultados de los exámenes;
- el stock de medicamentos en el sistema difiere del stock en los estantes;
- los informes de gestión se terminan solo después de varias conciliaciones;
- el equipo de TI tiene dificultades para preparar los datos para las necesidades de interoperabilidad.

No comenzamos un proyecto de salud preguntando "¿qué funciones queremos crear?" La primera pregunta suele ser más simple: desde que el paciente llega hasta que se va, ¿quién hace qué, qué datos cambian y en qué punto el proceso se estanca con más frecuencia?

La respuesta a esa pregunta se convierte en la base del sistema.

![Vista del sistema de gestión de clínicas de Codeverta](/assets/healthcare/manajemen-klinik.png)

_Ejemplo de interfaz de un sistema de gestión de clínicas para unificar el trabajo administrativo y la atención._

## Construyendo la base: un solo flujo, un solo historial del paciente

Un buen sistema de salud no debe parecer una colección de menús. Debe seguir el recorrido del paciente.

Cuando el paciente se registra, el sistema crea o encuentra la identidad correcta. Cuando el paciente ingresa al consultorio, el médico ve el historial relevante. Cuando el médico crea una receta o solicita un examen, la farmacia y el laboratorio reciben los datos sin tener que teclearlos de nuevo. Una vez finalizada la atención, la información clínica y de transacciones permanece vinculada a la misma visita.

Aplicamos este principio en varias capas.

### Registro e identidad del paciente

La búsqueda de datos debe ser rápida, pero no aleatoria. El sistema debe ayudar al personal a reconocer posibles datos duplicados, almacenar la identidad de manera consistente y mantener la relación entre paciente, visita, asegurador y centro.

![Detalle de los datos del paciente en el sistema de salud](/assets/healthcare/patient-detail.png)

_Los datos demográficos, la información de contacto y el contexto de la atención se almacenan en un perfil estructurado._

### Historia clínica electrónica que realmente se utiliza

El RME no es un archivo PDF trasladado a la computadora. Contiene notas de examen, diagnósticos, alergias, procedimientos, observaciones clínicas, recetas, resultados de pruebas auxiliares y el rastro de cambios en los datos.

El mayor desafío no es añadir tantas columnas como sea posible. El desafío es hacer que el médico pueda registrar de manera completa sin alargar el tiempo de consulta. Por eso, la estructura del formulario, el orden de la información, los derechos de acceso y las plantillas clínicas deben diseñarse junto con los usuarios.

![Historia clínica electrónica en la plataforma de salud de Codeverta](/assets/healthcare/rekam-medis-elektronik.png)

_El RME se convierte en el centro del contexto de la atención, no solo en un sustituto de las carpetas de papel._

![Historial de atención del paciente en una sola vista](/assets/healthcare/patient-history.png)

_Un historial conectado ayuda al personal sanitario a comprender lo que ya ha ocurrido en visitas anteriores._

### Flujo del médico y coordinación entre unidades

El médico necesita un resumen conciso: los pacientes del día, el estado de la cola, los resultados de exámenes aún no revisados y las acciones que deben continuar. El equipo operativo necesita una perspectiva diferente. El sistema debe proporcionar ambas sin crear nuevas copias de datos.

![Panel del médico en el sistema de salud de Codeverta](/assets/healthcare/doctor-dashboard.png)

_El panel del médico sitúa el trabajo pendiente en un solo espacio de trabajo._

![Horario de pacientes y personal sanitario](/assets/healthcare/patient-schedule.png)

_La programación conectada ayuda a reducir conflictos de horarios y colas innecesarias._

## La integración SATUSEHAT comienza mucho antes de llamar a la API

SATUSEHAT es la plataforma oficial del Ministerio de Salud (Kementerian Kesehatan) para conectar los sistemas de información de salud mediante la estandarización e integración del RME. Su intercambio de datos utiliza el estándar global HL7 FHIR. El Ministerio también distingue entre los centros que utilizan RME de socios/proveedores y los centros que desarrollan su propio RME.

Técnicamente, la documentación de la API es importante. Pero la integración no comienza desde un endpoint. La integración comienza con la calidad de los datos dentro del centro.

Antes de que una visita pueda enviarse, el sistema debe conocer al paciente correcto, al personal sanitario que brinda el servicio, a la organización y ubicación de la atención, al encuentro (encounter), al diagnóstico, a las observaciones y a los medicamentos recetados. Si los datos de origen no son consistentes, una conexión API exitosa aún no producirá una buena interoperabilidad.

![Ilustración de interoperabilidad de datos de salud nacional](/assets/healthcare/editorial/satusehat-interoperability-indonesia.png)

_Ilustración editorial: clínicas, hospitales, laboratorios y farmacias intercambian datos a través de una capa de interoperabilidad segura._

En el trabajo de integración, Codeverta ayuda a traducir los eventos en el terreno en estructuras de datos que pueden intercambiarse. Por ejemplo:

- la identidad del paciente se mapea al recurso `Patient`;
- el personal sanitario y los centros se mapean a través de `Practitioner`, `Organization` y `Location`;
- el registro y el recorrido de la visita se registran como `Encounter`;
- el diagnóstico y las quejas clínicas pueden usar `Condition`;
- los resultados de exámenes y signos vitales se envían como `Observation`;
- las recetas y la dispensación de medicamentos usan recursos como `MedicationRequest` y `MedicationDispense`.

Para la atención ambulatoria, la documentación de SATUSEHAT también regula el uso del IHS Number del paciente desde el Índice Maestro de Pacientes (Master Patient Index) del Ministerio de Salud. Mientras tanto, en la atención farmacéutica, el flujo incluye datos de recetas, dispensación de medicamentos y actualización de la visita. Esto significa que la integración no es un botón único de "enviar todo", sino una serie de transacciones que siguen el contexto de la atención.

La referencia técnica siempre sigue la documentación oficial, incluyendo el [playbook de atención ambulatoria de SATUSEHAT](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/rme-rawat-jalan/), el [playbook de atención farmacéutica](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/kefarmasian/) y la [guía de registro de centros](https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/).

Nota importante: Codeverta no es propietario ni administrador de SATUSEHAT. Esa plataforma es gestionada por el Ministerio de Salud. Nosotros ayudamos a los centros de salud y a los gestores de sistemas RME a preparar las aplicaciones, los datos, los procesos de integración, las pruebas y el monitoreo necesarios para conectarse con ese ecosistema.

## No solo RME: la operativa hospitalaria también debe estar conectada

La atención sanitaria no termina en el escritorio del médico. Hay laboratorio, farmacia, inventarios, mantenimiento de equipos, programación de salas, finanzas y tareas administrativas igualmente importantes.

### Laboratorio

La solicitud de exámenes debe llegar a la unidad correcta, utilizando la misma identidad del paciente y de la visita. Una vez verificados los resultados, el médico debe poder verlos sin esperar por un archivo físico o un mensaje privado.

![Módulo de exámenes de laboratorio en el sistema de salud](/assets/healthcare/lab-test-investigation.png)

_La solicitud y los resultados de los exámenes de laboratorio permanecen vinculados a la visita del paciente._

### Recetas, farmacia e inventario

La receta digital no es solo una lista de medicamentos. El sistema debe manejar dosis, instrucciones de uso, estado de la dispensación, stock, lotes y fechas de caducidad. Los datos clínicos y los datos de inventario tienen necesidades diferentes, pero ambos se encuentran en el mismo proceso.

![Solicitud electrónica de medicamentos](/assets/healthcare/medication-request.png)

_La solicitud de medicación (MedicationRequest) mantiene el flujo de recetas trazable desde el médico hasta la farmacia._

![Punto de venta de farmacia integrado](/assets/healthcare/point-of-sales-pharamcy.png)

_La transacción de farmacia se conecta con el inventario para que el movimiento de medicamentos no se registre dos veces._

![Análisis de la antigüedad del stock de medicamentos y dispositivos médicos](/assets/healthcare/stock-ageing.png)

_El análisis de antigüedad del stock ayuda al equipo a ver los artículos que llevan mucho tiempo almacenados o que se acercan a su fecha de caducidad._

### Activos y mantenimiento

Los equipos médicos no bastan con estar registrados como inventario. Hay calendarios de calibración, mantenimiento, averías, responsables y registros de acciones que deben documentarse.

![Lista de tareas de mantenimiento de activos del centro de salud](/assets/healthcare/maintenance-tasks.png)

_El equipo de infraestructura puede ver las tareas de mantenimiento abiertas y la prioridad de su seguimiento._

![Historial de mantenimiento de activos de salud](/assets/healthcare/asset-maintenance-log.png)

_El registro de mantenimiento hace que la condición de los activos sea más fácil de auditar y no dependa de la memoria de una sola persona._

### Estructura de servicios y visión de gestión

Un centro con múltiples consultorios, salas o sucursales necesita una estructura de unidades clara. A partir de esa estructura, los derechos de acceso, los horarios, la asignación de costos y los informes pueden seguir la organización real.

![Árbol de unidades de servicio del centro de salud](/assets/healthcare/service-unit-tree.png)

_La estructura de unidades ayuda al sistema a seguir la organización del centro, y no al revés._

![Análisis de rentabilidad de los servicios de salud](/assets/healthcare/profitability-analysis.png)

_La dirección puede ver el lado operativo y financiero sin tener que revisar hojas de cálculo de múltiples unidades._

## Infraestructura que no se ve, pero que es determinante

El usuario ve formularios, tablas y paneles. Detrás de eso hay un trabajo igualmente importante:

- control de acceso basado en roles para médicos, enfermeras, farmacia, cajeros y administradores;
- pista de auditoría (audit trail) para que los cambios importantes en los datos puedan rastrearse;
- validación de datos antes de que entren en la cola de integración;
- mecanismo de reintento cuando un servicio externo no está disponible;
- registro de respuestas de API para ayudar a investigar fallos;
- separación de entornos de desarrollo, sandbox y producción;
- copias de seguridad, monitoreo y procedimientos de recuperación del servicio;
- protección de datos personales según el contexto y la autoridad del usuario.

Especialmente para la integración con SATUSEHAT, un estado HTTP 200 o 201 no es la única medida de éxito. El equipo también necesita saber qué recursos se han enviado, cuáles han sido rechazados, por qué fueron rechazados y si la corrección se puede realizar de forma segura sin crear datos duplicados.

El Ministerio de Salud proporciona un panel de monitoreo para ver los envíos exitosos de datos RME. En el lado de la aplicación, complementamos esa necesidad con registros y herramientas de monitoreo operativo para que el equipo del centro no tenga que adivinar cuando surja un problema.

![Lista de problemas operativos en la plataforma de salud](/assets/healthcare/issues.png)

_Los problemas y su seguimiento deben registrarse como cualquier otra parte de la operación, y no perderse en conversaciones privadas._

## Cómo llevamos a cabo la implementación

Cada centro tiene sus propias costumbres, escala y nivel de preparación. Por eso, no tratamos la implementación como instalar una aplicación y luego entregar una cuenta.

Por lo general, el trabajo se desarrolla en varias etapas.

**Primero, mapear el flujo que realmente ocurre.** Seguimos el recorrido de los datos desde el registro, la atención, los servicios auxiliares, la farmacia, el pago hasta la elaboración de informes. Los procesos que existen solo en el SOP pero que no ocurren en la práctica deben diferenciarse desde el principio.

**Segundo, ordenar los datos maestros.** La identidad del paciente, el personal sanitario, las ubicaciones, las unidades, los servicios, los medicamentos y la terminología clínica se revisan antes de la migración o integración. Es un trabajo silencioso, pero de gran impacto.

**Tercero, construir los módulos de forma gradual.** El equipo del centro puede probar primero el flujo principal. Los comentarios de médicos, enfermeras, personal de registro y farmacia se utilizan para mejorar el funcionamiento del sistema.

**Cuarto, preparar la interoperabilidad.** El mapeo FHIR, la autenticación, la validación, las pruebas en el sandbox, el manejo de errores y el monitoreo se organizan siguiendo los playbooks relevantes de SATUSEHAT.

**Quinto, acompañar durante el lanzamiento (go-live).** En las primeras semanas, los problemas pequeños deben resolverse rápidamente. A veces no es un error, sino un término confuso o un orden de botones que no se ajusta al ritmo de la atención.

Este enfoque implica escuchar más. Para el sector salud, eso es imprescindible.

## La medida del éxito que buscamos

Somos cautelosos con promesas como "todos los procesos serán 10 veces más rápidos". Los centros de salud son demasiado complejos para resumirlos en una sola cifra.

Una medida más razonable son las cosas que se pueden sentir y verificar:

- el personal ya no tiene que escribir la identidad del paciente varias veces;
- el médico puede encontrar el historial relevante sin abrir muchas aplicaciones;
- los resultados de laboratorio y las recetas están vinculados a la visita correcta;
- el equipo de farmacia tiene un rastro del movimiento del stock;
- la dirección recibe informes a partir de la misma fuente de datos;
- el equipo de integración puede ver el estado del envío y corregir errores;
- el centro tiene una base más sólida para seguir los estándares del Ministerio.

Una buena digitalización a menudo se siente normal una vez que se usa. La cola avanza, los datos se encuentran, la receta llega, los resultados del examen se ven y los informes se generan. No hay un espectáculo tecnológico. El sistema simplemente funciona.

## Construyendo la salud digital en Indonesia, un sistema utilizable a la vez

La transformación sanitaria nacional requiere grandes plataformas como SATUSEHAT. Sin embargo, la plataforma nacional sigue necesitando miles de sistemas en hospitales, clínicas, laboratorios, farmacias y otros centros capaces de generar datos de calidad.

En ese espacio es donde trabaja Codeverta.

Ayudamos a los centros de salud a construir sistemas operativos cercanos a las necesidades del usuario y, al mismo tiempo, preparamos la estructura de datos y la infraestructura de integración que sigue la dirección del Ministerio de Salud. El objetivo no es solo pasar una conexión API. El objetivo es que los datos se muevan correctamente sin interrumpir la atención al paciente.

Si su centro está preparando un RME, mejorando su sistema clínico u hospitalario, conectando la farmacia y el laboratorio, o planificando la integración con SATUSEHAT, Codeverta puede ayudar desde el mapeo de procesos hasta la implementación y el acompañamiento técnico.

Porque, al final, la buena tecnología sanitaria no es la que más se menciona. La buena tecnología es la que da al personal sanitario más tiempo para cuidar a las personas.
