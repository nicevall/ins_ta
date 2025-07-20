# Tienda Virtual

Sistema simple que implementa POO y tres patrones de diseño: Observer, Factory Method y Strategy.

## Que hace

El sistema permite crear productos, agregarlos a un carrito y aplicar descuentos. Demuestra los conceptos de programacion orientada a objetos y patrones de diseño de forma basica.

## POO Implementado

**Herencia:** La clase Producto es padre de Celular y Ropa. Las clases hijas heredan propiedades y metodos del padre.

**Encapsulacion:** Las propiedades se declaran privadas con # y se acceden mediante metodos publicos.

**Polimorfismo:** El metodo info() se comporta diferente en cada clase hija aunque tengan el mismo nombre.

## Patrones de Diseño

### Factory Method

Resuelve el problema de crear objetos sin saber exactamente que clase usar. La clase Factory decide que tipo de producto crear segun el parametro que recibe.

```javascript
Factory.hacer("celular"); // Crea un Celular
Factory.hacer("ropa"); // Crea Ropa
```

Beneficios:

- Centraliza la creacion de objetos
- Facil agregar nuevos tipos de productos

### Observer

Permite que cuando cambia el carrito, automaticamente se actualice la pantalla sin tener que llamar manualmente a cada funcion.

El carrito notifica a sus observadores cuando algo cambia:

- Se actualiza la lista visual
- Se recalcula el total
- Se registra en el log

Beneficios:

- Actualizaciones automaticas
- No hay que recordar que actualizar

### Strategy

Permite cambiar la forma de calcular descuentos sin modificar el codigo del carrito.

Se puede cambiar entre:

- Sin descuento
- Descuento del 10%

Beneficios:

- Facil agregar nuevos tipos de descuento
- El carrito no necesita saber como calcular cada tipo

## Como funciona

1. Se selecciona un tipo de producto
2. Factory crea el producto apropiado
3. Se agrega al carrito
4. Observer actualiza todo automaticamente
5. Strategy calcula el descuento segun la opcion seleccionada

## Como usar

Abrir tienda-simple.html en el navegador. El log muestra como funcionan los patrones en tiempo real.

## Integracion de Patrones

Los tres patrones trabajan juntos en el sistema. El carrito usa Factory para validar productos, implementa Observer para notificaciones automaticas, y usa Strategy para calcular precios finales.

La implementacion demuestra como los patrones de diseño resuelven problemas comunes en el desarrollo de software de manera practica y sencilla.
