// ========================================
// TIENDA VIRTUAL - IMPLEMENTACION BASICA
// Sistema que demuestra POO y Patrones de Diseño
// ========================================

// ========================================
// CONCEPTOS POO - HERENCIA, ENCAPSULACION Y POLIMORFISMO
// ========================================

/**
 * Clase padre Producto
 * Demuestra ENCAPSULACION usando propiedades privadas
 * Las propiedades con # solo se pueden acceder desde dentro de la clase
 */
class Producto {
    // ENCAPSULACION: Propiedades privadas (no se pueden acceder desde fuera)
    #nombre;  // Solo esta clase puede acceder a nombre
    #precio;  // Solo esta clase puede acceder a precio

    /**
     * Constructor que inicializa las propiedades privadas
     */
    constructor(nombre, precio) {
        this.#nombre = nombre;
        this.#precio = precio;
    }

    // ENCAPSULACION: Metodos publicos para acceder a propiedades privadas
    getNombre() {
        return this.#nombre;
    }

    getPrecio() {
        return this.#precio;
    }

    /**
     * Metodo que sera sobrescrito por las clases hijas
     * Esto demuestra POLIMORFISMO
     */
    info() {
        return this.#nombre + " - $" + this.#precio;
    }
}

/**
 * HERENCIA: Clase Celular que extiende (hereda) de Producto
 * Obtiene todas las propiedades y metodos de la clase padre
 */
class Celular extends Producto {
    constructor(nombre, precio) {
        // super() llama al constructor de la clase padre (Producto)
        super(nombre, precio);
    }

    /**
     * POLIMORFISMO: Sobrescribe el metodo info() del padre
     * Mismo nombre de metodo, pero comportamiento diferente
     */
    info() {
        return "Celular: " + this.getNombre() + " - $" + this.getPrecio();
    }
}

/**
 * HERENCIA: Otra clase hija que hereda de Producto
 */
class Ropa extends Producto {
    constructor(nombre, precio) {
        super(nombre, precio); // Llama al constructor del padre
    }

    /**
     * POLIMORFISMO: Implementacion especifica del metodo info() para ropa
     */
    info() {
        return "Ropa: " + this.getNombre() + " - $" + this.getPrecio();
    }
}

// ========================================
// PATRON FACTORY METHOD
// ========================================

/**
 * FACTORY METHOD PATTERN
 * Resuelve el problema: "Como crear objetos sin saber exactamente que clase usar?"
 * 
 * Beneficios:
 * - Centraliza la logica de creacion
 * - Facil agregar nuevos tipos de productos
 * - El cliente no necesita saber que clase especifica crear
 */
class Factory {
    /**
     * Metodo principal del Factory
     * Decide que tipo de producto crear segun el parametro recibido
     * 
     * @param {string} tipo - Tipo de producto a crear ('celular' o 'ropa')
     * @returns {Producto} - Instancia del producto creado
     */
    static hacer(tipo) {
        // Factory Method: Decide que clase instanciar
        if (tipo === 'celular') {
            console.log("Factory: creando celular");
            return new Celular("iPhone", 500);
        } else {
            console.log("Factory: creando ropa");
            return new Ropa("Camisa", 30);
        }
    }
}

// ========================================
// PATRON OBSERVER
// ========================================

/**
 * OBSERVER PATTERN - Clase Observable (Subject)
 * Resuelve el problema: "Como notificar a multiples objetos cuando algo cambia?"
 * 
 * Beneficios:
 * - Actualizaciones automaticas
 * - Desacoplamiento entre el objeto que cambia y los que necesitan ser notificados
 * - Facil agregar nuevos observadores
 */
class Observable {
    constructor() {
        this.obs = []; // Lista de observadores que quieren ser notificados
    }

    /**
     * Agrega un observador a la lista de notificaciones
     * @param {Object} o - Observador que debe tener un metodo update()
     */
    add(o) {
        this.obs.push(o);
    }

    /**
     * Notifica a todos los observadores registrados
     * Cada observador ejecutara su metodo update()
     */
    notify() {
        this.obs.forEach(o => o.update());
    }
}

/**
 * OBSERVER PATTERN - Observador concreto
 * Este objeto se actualiza automaticamente cuando el carrito cambia
 */
class Observer {
    /**
     * Metodo que se ejecuta automaticamente cuando el carrito cambia
     * Es llamado por el metodo notify() del Observable
     */
    update() {
        mostrar();   // Actualiza la interfaz del carrito
        calcular();  // Recalcula el total
        console.log("Observer: sistema actualizado automaticamente");
    }
}

// ========================================
// PATRON STRATEGY
// ========================================

/**
 * STRATEGY PATTERN - Clase base para estrategias
 * Resuelve el problema: "Como cambiar algoritmos dinamicamente?"
 * 
 * Beneficios:
 * - Permite cambiar comportamiento sin modificar codigo existente
 * - Facil agregar nuevos tipos de descuento
 * - El carrito no necesita saber como calcular cada tipo de descuento
 */
class Strategy {
    /**
     * Metodo que debe ser implementado por cada estrategia concreta
     * @param {number} total - Total antes del descuento
     * @returns {number} - Monto del descuento a aplicar
     */
    calc(total) {
        return 0;
    }
}

/**
 * STRATEGY PATTERN - Estrategia concreta: Sin descuento
 */
class SinDescuento extends Strategy {
    /**
     * Implementa el algoritmo para no aplicar descuento
     */
    calc(total) {
        console.log("Strategy: aplicando estrategia sin descuento");
        return 0; // No hay descuento
    }
}

/**
 * STRATEGY PATTERN - Estrategia concreta: Descuento del 10%
 */
class ConDescuento extends Strategy {
    /**
     * Implementa el algoritmo para descuento del 10%
     */
    calc(total) {
        console.log("Strategy: aplicando estrategia de 10% descuento");
        return total * 0.1; // 10% de descuento
    }
}

// ========================================
// CLASE PRINCIPAL - CARRITO
// Integra todos los patrones en una sola clase
// ========================================

/**
 * CARRITO DE COMPRAS
 * Esta clase demuestra como los tres patrones trabajan juntos:
 * 
 * 1. HERENCIA: Extiende de Observable (Observer Pattern)
 * 2. FACTORY: Usa Factory para validar tipos de productos
 * 3. STRATEGY: Usa Strategy para calcular descuentos
 */
class Carrito extends Observable {
    constructor() {
        super(); // Llama al constructor de Observable
        this.items = [];                    // Lista de productos en el carrito
        this.strategy = new SinDescuento(); // Strategy por defecto
    }

    /**
     * Agrega un producto al carrito
     * Automaticamente notifica a todos los observadores (OBSERVER PATTERN)
     * 
     * @param {Producto} p - Producto a agregar al carrito
     */
    agregar(p) {
        this.items.push(p);

        // OBSERVER PATTERN: Notifica automaticamente a todos los observadores
        // Esto hara que se actualice la interfaz y se recalcule el total
        this.notify();
    }

    /**
     * Cambia la estrategia de descuento
     * STRATEGY PATTERN: Permite cambiar el algoritmo de calculo dinamicamente
     * 
     * @param {Strategy} s - Nueva estrategia de descuento
     */
    setStrategy(s) {
        this.strategy = s;

        // Notifica el cambio para que se recalcule el total con la nueva estrategia
        this.notify();
    }

    /**
     * Calcula el total del carrito usando la estrategia actual
     * STRATEGY PATTERN: Usa la estrategia configurada para calcular descuentos
     * 
     * @returns {number} - Total final despues de aplicar descuentos
     */
    total() {
        // Calcula subtotal sumando precios de todos los productos
        const subtotal = this.items.reduce((acumulador, producto) => {
            return acumulador + producto.getPrecio();
        }, 0);

        // STRATEGY PATTERN: Usa la estrategia actual para calcular descuento
        const descuento = this.strategy.calc(subtotal);

        // Retorna total final
        return subtotal - descuento;
    }
}

// ========================================
// VARIABLES GLOBALES DEL SISTEMA
// ========================================

// Variables principales que usa toda la aplicacion
let carrito = new Carrito();  // Carrito principal del sistema
let productos = [];           // Lista de productos disponibles

// ========================================
// FUNCIONES DE LA INTERFAZ
// ========================================

/**
 * Inicializa el sistema cuando carga la pagina
 * Configura los observadores del carrito
 */
function init() {
    // OBSERVER PATTERN: Registra observador para actualizaciones automaticas
    carrito.add(new Observer());
    console.log("Sistema iniciado correctamente");
}

/**
 * Crea un nuevo producto usando Factory Method
 * Es llamada cuando el usuario hace click en "Crear"
 */
function crear() {
    // Obtiene el tipo seleccionado por el usuario
    const tipo = document.getElementById('tipo').value;

    // FACTORY METHOD PATTERN: Usa el factory para crear el producto
    const producto = Factory.hacer(tipo);

    // Agrega el producto a la lista de productos disponibles
    productos.push(producto);

    // Actualiza la interfaz para mostrar el nuevo producto
    mostrarProductos();
}

/**
 * Muestra todos los productos disponibles en la interfaz
 * Crea botones para agregar cada producto al carrito
 */
function mostrarProductos() {
    const div = document.getElementById('productos');
    div.innerHTML = ''; // Limpia el contenido anterior

    // Crea un elemento HTML para cada producto
    productos.forEach((producto, indice) => {
        div.innerHTML += '<p>' + producto.info() +
            ' <button onclick="agregar(' + indice + ')">Agregar al Carrito</button></p>';
    });
}

/**
 * Agrega un producto al carrito
 * Dispara automaticamente el Observer Pattern
 * 
 * @param {number} indice - Posicion del producto en la lista
 */
function agregar(indice) {
    const producto = productos[indice];

    // Agrega al carrito - esto dispara automaticamente el Observer Pattern
    carrito.agregar(producto);

    console.log("Producto agregado al carrito: " + producto.getNombre());
}

/**
 * Actualiza la interfaz del carrito
 * Es llamada automaticamente por el Observer cuando cambia el carrito
 */
function mostrar() {
    const div = document.getElementById('carrito');
    div.innerHTML = ''; // Limpia contenido anterior

    // Muestra cada producto en el carrito
    carrito.items.forEach(item => {
        div.innerHTML += '<p>' + item.info() + '</p>';
    });
}

/**
 * Calcula y muestra el total del carrito
 * Es llamada automaticamente por el Observer cuando cambia el carrito
 */
function calcular() {
    const totalElement = document.getElementById('total');
    const totalFinal = carrito.total();

    totalElement.textContent = 'Total: $' + totalFinal;
    console.log("Total calculado: $" + totalFinal);
}

/**
 * Cambia la estrategia de descuento segun la seleccion del usuario
 * STRATEGY PATTERN: Cambia el algoritmo de calculo dinamicamente
 */
function cambiarDescuento() {
    const tipoSeleccionado = document.getElementById('descuento').value;

    if (tipoSeleccionado === 'ninguno') {
        // STRATEGY PATTERN: Cambia a estrategia sin descuento
        carrito.setStrategy(new SinDescuento());
    } else {
        // STRATEGY PATTERN: Cambia a estrategia con descuento
        carrito.setStrategy(new ConDescuento());
    }

    console.log("Estrategia de descuento cambiada");
}

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Funcion auxiliar para mostrar mensajes en el log
 * Ayuda a visualizar como funcionan los patrones en tiempo real
 * 
 * @param {string} mensaje - Mensaje a mostrar en el log
 */
function log(mensaje) {
    const logElement = document.getElementById('log');
    if (logElement) {
        logElement.innerHTML += mensaje + '\n';
        // Hace scroll automatico hacia abajo para ver el ultimo mensaje
        logElement.scrollTop = logElement.scrollHeight;
    }
}

// ========================================
// INICIALIZACION DEL SISTEMA
// ========================================

// Ejecuta la funcion init() cuando la pagina termina de cargar
if (typeof window !== 'undefined') {
    window.onload = init;
}

// ========================================
// NOTAS IMPORTANTES SOBRE LOS PATRONES:
//
// 1. OBSERVER PATTERN:
//    - El carrito (Observable) notifica automaticamente
//    - Los observadores se actualizan solos
//    - No hay que recordar que funciones llamar
//
// 2. FACTORY METHOD PATTERN:
//    - Centraliza la creacion de productos
//    - Facil agregar nuevos tipos sin cambiar codigo existente
//    - El cliente no necesita saber que clase especifica crear
//
// 3. STRATEGY PATTERN:
//    - Permite cambiar algoritmos en tiempo de ejecucion
//    - Cada estrategia es independiente
//    - Facil agregar nuevos tipos de descuento
//
// 4. INTEGRACION DE PATRONES:
//    - Todos trabajan juntos en el carrito
//    - Observer notifica cambios automaticamente
//    - Factory crea productos de forma centralizada
//    - Strategy calcula descuentos dinamicamente
//
// 5. BENEFICIOS PRINCIPALES:
//    - Codigo mas organizado y mantenible
//    - Facil extender funcionalidad
//    - Separacion clara de responsabilidades
//    - Reutilizacion de codigo
// ========================================