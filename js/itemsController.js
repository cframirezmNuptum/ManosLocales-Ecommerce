class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    addItem(name, description, price, img, category) {
        // Incrementar el ID actual
        this.currentId++;

        // Crear el nuevo producto
        const newItem = {
            id: this.currentId,
            name: name,
            description: description,
            price: price,
            img: img,
            category: category,
            createdAt: new Date().toISOString()
        };

        // Añadir el producto al array
        this.items.push(newItem);
        
        return newItem;
    }

    // Método para obtener un producto por su ID
    getItemById(id) {
        return this.items.find(item => item.id === id);
    }
}

// Crear una instancia global para gestionar los productos
const productController = new ItemsController();

// Función para cargar productos iniciales
function loadInitialProducts() {
    // Productos de O___Joyas
    productController.addItem(
        'Aretes Semilla', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
        '000.000', 
        '/imagenes/Products/Aretes Semilla.jpg',
        'Joyas'
    );
    productController.addItem(
        'Candongas Espinas', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
        '000.000', 
        '/imagenes/Products/Candongas espinas.jpg',
        'Joyas'
    );
    // Continúa añadiendo los demás productos...

    // Productos de Vacila'o
    productController.addItem(
        'Camisa 1', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
        '000.000', 
        '/imagenes/Products/Camisa  (1).png',
        'Camisas'
    );
    // Añade los demás productos de Vacila'o...
}

// Cargar productos al iniciar
loadInitialProducts();