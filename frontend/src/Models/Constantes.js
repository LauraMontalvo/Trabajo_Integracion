//MENSAJES - ETIQUETAS
export const MENSAJE_LOGIN_EXITO = "Usuario validado correctamente!!";
export const MENSAJE_LOGIN_FALLIDO = "El usuario o la contraseña son incorrectos";
export const TEXTO_BIENVENIDO = "Bienvenido!";
export const TEXTO_INGRESE_DATOS = "Ingrese su Usuario y Contraseña";
export const TITULO_ADMINISTRACION = "ADMINISTRACIÓN";
export const TEXTO_INICIAR_SESION = "Iniciar Sesión";
export const TEXTO_IR_PAGINA_PRINCIPAL = "Ir a la pagina principal";
export const TEXTO_INICIO_SESION = "Inicio de sesión de Usuario";
export const TEXTO_REGISTRATE = "Regístrate ahora!";
export const TEXTO_TITULO = "Empleos Chavezpamba";
export const TEXTO_USUARIO_EXISTE="Usuario existe";
export const TEXTO_CORREO_OBLIGATORIO='El correo electrónico es obligatorio';
export const TEXTO_INGRESE_CORREO_VALIDO='Ingrese un correo electrónico válido';
export const TEXTO_CONTRASEÑA_OBLIGATORIO='La contraseña es obligatoria';
export const TEXTO_CONTRASEÑA_AL_MENOS_8_CARACTERES='La contraseña debe tener al menos 8 caracteres';
export const TEXTO_CONTRASEÑA_AL_MENOS_UNA_LETRA_MAYUS='La contraseña debe contener al menos una letra mayúscula';
export const TEXTO_CONTRASEÑA_AL_MENOS_UN_CARACTER_ESPECIAL='La contraseña debe contener al menos un carácter especial';
export const TEXTO_CONTRASEÑAS_NO_COINCIDEN='Las contraseñas no coinciden';
export const TEXTO_ESTE_CAMPO_ES_OBLIGATORIO='Este campo es obligatorio';
export const TEXTO_NUMERO_TELEFONO_DEBE_TENER_10_DIGITOS='El número de teléfono debe tener 10 dígitos';
export const TEXTO_NOMBRE_EMPRESA_OBLIGATORIO='El nombre de la empresa es obligatorio'
export const TEXTO_DIRECCION_EMPRESA_OBLIGATORIO='La dirección es obligatoria';
export const TEXTO_DESCRIPCION_EMPRESA_OBLIGATORIO='La descripción es obligatoria';
export const TEXTO_USUARIO_OBLIGATORIO='El usuario es obligatorio';
export const TEXTO_DESCRIPCIONPERSONAL_OBLIGATORIO='La descripción personal es obligatoria ';
export const TEXTO_NOMBRE_USUARIO_OBLIGATORIO='El nombre es obligatorio';
export const TEXTO_APELLIDO_USUARIO_OBLIGATORIO='El apellido es obligatorio';
export const TEXTO_SELECCIONAR_GENERO='Debe seleccionar un género';
export const TEXTO_FECHA_NACIMIENTO_OBLIGATORIO='La fecha de nacimiento es obligatoria';
export const TEXTO_NUMERO_TELEFONOOBLIGATORIO='El número de teléfono es obligatorio';
export const TEXTO_DEBES_TENER_18_AÑOS="Debes tener al menos 18 años";
export const TEXTO_VALORES_OBLIGATORIOS="Los valores de la empresa son obligatorios";

//expLaboral
export const TEXTO_DESCRIPCION_RESPONSABILIDADES_OBLIGATORIO='La descripción de Resposabilidades es obligatoria';
export const TEXTO_AMBITO_LABORAL_OBLIGATORIO='El Ámbito Laboral es obligatorio';
export const TEXTO_RAZON_SOCIAL_OBLIGATORIO='La Razón social es obligatoria';
export const TEXTO_FECHA_INICIO='La Fecha de Inicio es obligatoria';
export const TEXTO_FECHA_FIN='La Fecha de Fin es obligatoria';
export const TEXTO_PUESTO_OBLIGATORIO='El puesto en que trabajó es obligatoria';
//INTITUCION
export const TEXTO_NOMBRE_INSTITUCION_OBLIGATORIO='El nombre de la institución es obligatorio'


//Empresa
export const MENSAJE_LOGIN_EXITO_EMPRESA = "Empresa validada correctamente!!";
export const TEXTO_INICIO_SESION_EMPRESA = "Inicio de sesión de Empresa";

//CONSTANTES USUARIO
export const ROL_ADMINISTRADOR = "Administrador";
export const ROL_EMPRESA = "Empresa";
//ESTADOS
export const ESTADO_ACTIVO='Activo';
export const ESTADO_INACTIVO="";
export const ESTADO_EN_ESPERA="";

//URLS Backent USERS
export const URL_VALIDAR_AUTENTICACION = "https://46wm6186-8000.use.devtunnels.ms/api/user/login";
export const URL_CONSULTAR_DATOS_USUARIO = "https://46wm6186-8000.use.devtunnels.ms/api/user/";
export const URL_OBTENER_USUARIOS ='https://46wm6186-8000.use.devtunnels.ms/api/users'
export const URL_USUARIO_NUEVO='https://46wm6186-8000.use.devtunnels.ms/api/user/new'
export const URL_EDITAR_U_OBTENER_FOTO_USUARIO= 'https://46wm6186-8000.use.devtunnels.ms/api/user/foto';


//URLS Back COMPANY
export const URL_VALIDAR_AUTENTICACION_EMPRESA ="https://46wm6186-8000.use.devtunnels.ms/api/company/login";
export const URL_EMPRESA_NUEVA= 'https://46wm6186-8000.use.devtunnels.ms/api/company/new'
export const URL_EMPRESAS= 'https://46wm6186-8000.use.devtunnels.ms/api/companies'
export const URL_OBTENER_UNA_EMPRESA= 'https://46wm6186-8000.use.devtunnels.ms/api/company';
export const URL_ACTUALIZAR_EMPRESA= 'https://46wm6186-8000.use.devtunnels.ms/api/company';
export const URL_EDITAR_U_OBTENER_FOTO_EMPRESA= 'https://46wm6186-8000.use.devtunnels.ms/api/company/foto';

//URL Work exprience
export const URL_EXPERIENCIA_LABORAL_NUEVA= 'https://46wm6186-8000.use.devtunnels.ms/api/workExperience/new';
export const URL_EDITAR_U_OBTENER_EXPERIENCIA_LABORAL='https://46wm6186-8000.use.devtunnels.ms/api/workExperience';

//INSTITUCIONES
export const URL_ACTUALIZAR_INSTITUCION= 'https://46wm6186-8000.use.devtunnels.ms/api/school';
export const URL_OBTENER_UNA_INSTITUCION= 'https://46wm6186-8000.use.devtunnels.ms/api/school';
export const URL_AGREGAR_NUEVA_INSTITUCION= 'https://46wm6186-8000.use.devtunnels.ms/api/school/new';


//CERTIFICACIONES
export const URL_OBTENER_U_EDITAR_CERTIFICADO= 'https://46wm6186-8000.use.devtunnels.ms/api/certification';

//informacion academica


//publicar empleo
export const URL_PUBLICAR_EMPLEO= 'https://46wm6186-8000.use.devtunnels.ms/api/job/new';
export const URL_ELIMINAR_UN_EMPLEO= 'https://46wm6186-8000.use.devtunnels.ms/api/job';
export const URL_OBTENER_EMPLEOS= 'https://46wm6186-8000.use.devtunnels.ms/api/jobs';
export const URL_OBTENER_UN_EMPLEO= 'https://46wm6186-8000.use.devtunnels.ms/api/job';
export const URL_ACTUALIZAR_UN_EMPLEO= 'https://46wm6186-8000.use.devtunnels.ms/api/job';
//POSTULACIONES
export const URL_ELIMINAR_UNA_POSTULACION= 'https://46wm6186-8000.use.devtunnels.ms/api/postulation';
export const URL_OBTENER_POSTULANTES_CON_SU_EMPLEO=' https://46wm6186-8000.use.devtunnels.ms/api/postulations/job';
export const URL_MOTIVO_RECHAZO_POSTULACION= 'https://46wm6186-8000.use.devtunnels.ms/api/postulation';


//URLS FrontEnd
export const URL_DETALLE_USUARIO = "/detalleUsuario/";
export const URL_DETALLE_EMPRESA = "/detalleEmpresa/";
export const URL_PAGINA_PRINCIPAL = "/";
export const URL_REGISTRAR_COMO = "/registarseComo/"
export const URL_ADMIN_CONSOLA = "/admin/consola/"

