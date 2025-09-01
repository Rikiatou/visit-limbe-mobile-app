class ShoppingMarketplace {
    constructor() {
        this.currentLanguage = 'en';
        this.products = [];
        this.categories = [];
        this.cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
        this.filteredProducts = [];
        this.isAdmin = false;
        this.currentUser = null;
        this.translations = {
            en: {
                shopping_marketplace: "Shopping Marketplace",
                shopping_subtitle: "Discover local products and services in Limbe",
                admin_controls: "Administrative Controls",
                add_product: "Add Product",
                manage_categories: "Manage Categories",
                analytics: "Analytics",
                search_products: "Search Products",
                price_range: "Price Range",
                all_prices: "All Prices",
                location: "Location",
                all_locations: "All Locations",
                sort_by: "Sort By",
                newest: "Newest",
                price_low_high: "Price: Low to High",
                price_high_low: "Price: High to Low",
                rating: "Rating",
                all_categories: "All Categories",
                suggest_product: "Suggest a Product",
                back: "Back",
                details: "Details",
                add_to_cart: "Add to Cart",
                buy_now: "Buy Now",
                edit: "Edit",
                delete: "Delete",
                shopping_cart: "Shopping Cart",
                checkout: "Checkout",
                continue_shopping: "Continue Shopping",
                product_name: "Product Name",
                product_name_fr: "Product Name (French)",
                category: "Category",
                price: "Price (XAF)",
                seller_name: "Seller Name",
                description: "Description",
                description_fr: "Description (French)",
                product_images: "Product Images",
                image_help: "Upload multiple images for your product",
                seller_phone: "Seller Phone",
                seller_email: "Seller Email",
                cancel: "Cancel",
                save_product: "Save Product",
                why_needed: "Why is this product needed?",
                your_contact: "Your Contact (optional)",
                submit_suggestion: "Submit Suggestion",
                manage_categories: "Manage Categories",
                add_category: "Add New Category",
                existing_categories: "Existing Categories",
                add: "Add",
                sold_by: "Sold by",
                contact_seller: "Contact Seller",
                reviews: "reviews",
                out_of_stock: "Out of Stock",
                in_stock: "In Stock",
                quantity: "Quantity",
                total: "Total",
                remove: "Remove",
                empty_cart: "Your cart is empty",
                order_total: "Order Total"
            },
            fr: {
                shopping_marketplace: "Marketplace Commercial",
                shopping_subtitle: "Découvrez les produits et services locaux de Limbé",
                admin_controls: "Contrôles Administratifs",
                add_product: "Ajouter Produit",
                manage_categories: "Gérer Catégories",
                analytics: "Analytiques",
                search_products: "Rechercher Produits",
                price_range: "Gamme de Prix",
                all_prices: "Tous les Prix",
                location: "Localisation",
                all_locations: "Toutes Localisations",
                sort_by: "Trier par",
                newest: "Plus Récent",
                price_low_high: "Prix: Bas à Élevé",
                price_high_low: "Prix: Élevé à Bas",
                rating: "Évaluation",
                all_categories: "Toutes Catégories",
                suggest_product: "Suggérer un Produit",
                back: "Retour",
                details: "Détails",
                add_to_cart: "Ajouter au Panier",
                buy_now: "Acheter Maintenant",
                edit: "Modifier",
                delete: "Supprimer",
                shopping_cart: "Panier d'Achat",
                checkout: "Commander",
                continue_shopping: "Continuer Shopping",
                product_name: "Nom du Produit",
                product_name_fr: "Nom du Produit (Français)",
                category: "Catégorie",
                price: "Prix (XAF)",
                seller_name: "Nom du Vendeur",
                description: "Description",
                description_fr: "Description (Français)",
                product_images: "Images du Produit",
                image_help: "Téléchargez plusieurs images pour votre produit",
                seller_phone: "Téléphone du Vendeur",
                seller_email: "Email du Vendeur",
                cancel: "Annuler",
                save_product: "Sauvegarder Produit",
                why_needed: "Pourquoi ce produit est-il nécessaire?",
                your_contact: "Votre Contact (optionnel)",
                submit_suggestion: "Soumettre Suggestion",
                manage_categories: "Gérer Catégories",
                add_category: "Ajouter Nouvelle Catégorie",
                existing_categories: "Catégories Existantes",
                add: "Ajouter",
                sold_by: "Vendu par",
                contact_seller: "Contacter Vendeur",
                reviews: "avis",
                out_of_stock: "Rupture de Stock",
                in_stock: "En Stock",
                quantity: "Quantité",
                total: "Total",
                remove: "Supprimer",
                empty_cart: "Votre panier est vide",
                order_total: "Total de la Commande"
            }
        };
        this.init();
    }

    async init() {
        await this.checkUserRole();
        await this.loadCategories();
        await this.loadProducts();
        this.setupEventListeners();
        this.updateCartDisplay();
        this.translatePage();
    }

    async checkUserRole() {
        try {
            // Check if user is logged in and get role
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (user) {
                this.currentUser = user;
                this.isAdmin = user.role === 'admin' || user.email === 'admin@visitlimbe.com';
                
                if (this.isAdmin) {
                    document.getElementById('adminControls').style.display = 'block';
                    document.getElementById('userRole').innerHTML = `
                        <span class="admin-badge">ADMIN</span>
                        <span class="text-white ms-2">Administrator Dashboard</span>
                    `;
                } else {
                    document.getElementById('userRole').innerHTML = `
                        <span class="badge bg-light text-dark">USER</span>
                        <span class="text-white ms-2">Welcome, ${user.name || user.email}</span>
                    `;
                }
            } else {
                document.getElementById('userRole').innerHTML = `
                    <span class="badge bg-warning text-dark">GUEST</span>
                    <span class="text-white ms-2">Browse as Guest</span>
                `;
            }
        } catch (error) {
            console.error('Error checking user role:', error);
        }
    }

    async loadCategories() {
        try {
            // Load categories from database or use default ones
            this.categories = [
                { id: 1, name: 'Electronics', name_fr: 'Électronique', icon: 'fas fa-laptop' },
                { id: 2, name: 'Fashion', name_fr: 'Mode', icon: 'fas fa-tshirt' },
                { id: 3, name: 'Food & Drinks', name_fr: 'Nourriture et Boissons', icon: 'fas fa-utensils' },
                { id: 4, name: 'Books', name_fr: 'Livres', icon: 'fas fa-book' },
                { id: 5, name: 'Sports', name_fr: 'Sports', icon: 'fas fa-football-ball' },
                { id: 6, name: 'Home & Garden', name_fr: 'Maison et Jardin', icon: 'fas fa-home' },
                { id: 7, name: 'Health & Beauty', name_fr: 'Santé et Beauté', icon: 'fas fa-heart' },
                { id: 8, name: 'Automotive', name_fr: 'Automobile', icon: 'fas fa-car' }
            ];

            this.renderCategoryFilters();
            this.loadCategoriesInSelect();
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async loadProducts() {
        try {
            // Sample products data - in real app, load from database
            this.products = [
                {
                    id: 1,
                    name: 'Samsung Galaxy A54',
                    name_fr: 'Samsung Galaxy A54',
                    category: 'Electronics',
                    price: 280000,
                    seller: 'TechStore Limbe',
                    location: 'limbe',
                    description: 'Latest Samsung smartphone with amazing camera and battery life',
                    description_fr: 'Dernier smartphone Samsung avec appareil photo et batterie incroyables',
                    images: ['https://via.placeholder.com/400x300/007bff/white?text=Samsung+A54'],
                    rating: 4.5,
                    reviews: 24,
                    stock: 15,
                    seller_phone: '+237 678 123 456',
                    seller_email: 'techstore@email.com',
                    created_at: new Date('2024-01-15')
                },
                {
                    id: 2,
                    name: 'Traditional African Dress',
                    name_fr: 'Robe Africaine Traditionnelle',
                    category: 'Fashion',
                    price: 35000,
                    seller: 'Mama Grace Fashion',
                    location: 'limbe',
                    description: 'Beautiful handmade traditional African dress, perfect for special occasions',
                    description_fr: 'Belle robe africaine traditionnelle faite à la main, parfaite pour les occasions spéciales',
                    images: ['https://via.placeholder.com/400x300/28a745/white?text=African+Dress'],
                    rating: 4.8,
                    reviews: 18,
                    stock: 8,
                    seller_phone: '+237 679 234 567',
                    seller_email: 'grace@email.com',
                    created_at: new Date('2024-01-20')
                },
                {
                    id: 3,
                    name: 'Fresh Palm Oil',
                    name_fr: 'Huile de Palme Fraîche',
                    category: 'Food & Drinks',
                    price: 2500,
                    seller: 'Local Farm Cooperative',
                    location: 'buea',
                    description: 'Pure, fresh palm oil directly from local farms in the Southwest region',
                    description_fr: 'Huile de palme pure et fraîche directement des fermes locales de la région du Sud-Ouest',
                    images: ['https://via.placeholder.com/400x300/ffc107/white?text=Palm+Oil'],
                    rating: 4.7,
                    reviews: 32,
                    stock: 50,
                    seller_phone: '+237 680 345 678',
                    seller_email: 'farm@email.com',
                    created_at: new Date('2024-01-25')
                },
                {
                    id: 4,
                    name: 'Laptop HP Pavilion',
                    name_fr: 'Ordinateur HP Pavilion',
                    category: 'Electronics',
                    price: 450000,
                    seller: 'Digital Solutions',
                    location: 'douala',
                    description: 'HP Pavilion laptop perfect for students and professionals',
                    description_fr: 'Ordinateur portable HP Pavilion parfait pour étudiants et professionnels',
                    images: ['https://via.placeholder.com/400x300/6c757d/white?text=HP+Laptop'],
                    rating: 4.3,
                    reviews: 16,
                    stock: 5,
                    seller_phone: '+237 681 456 789',
                    seller_email: 'digital@email.com',
                    created_at: new Date('2024-02-01')
                }
            ];

            this.filteredProducts = [...this.products];
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    renderCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        const allButton = container.querySelector('[data-category=""]');
        
        this.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'category-btn';
            button.setAttribute('data-category', category.name);
            button.onclick = () => this.filterByCategory(category.name);
            button.innerHTML = `
                <i class="${category.icon}"></i>
                <span data-translate="${category.name.toLowerCase().replace(/\s+/g, '_')}">${this.currentLanguage === 'fr' ? category.name_fr : category.name}</span>
            `;
            container.appendChild(button);
        });
    }

    loadCategoriesInSelect() {
        const select = document.getElementById('productCategory');
        select.innerHTML = '<option value="">Select Category</option>';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = this.currentLanguage === 'fr' ? category.name_fr : category.name;
            select.appendChild(option);
        });
    }

    renderProducts() {
        const container = document.getElementById('productsContainer');
        
        if (this.filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-search"></i>
                        <h5 data-translate="no_products">No products found</h5>
                        <p data-translate="try_different_search">Try adjusting your search or filters</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredProducts.map(product => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100">
                    <div class="product-image" style="background-image: url('${product.images[0]}')">
                        <div class="product-badge">
                            ${product.stock > 0 ? this.translate('in_stock') : this.translate('out_of_stock')}
                        </div>
                        ${this.isAdmin ? `
                            <div class="position-absolute top-0 end-0 p-2">
                                <button class="btn btn-sm btn-warning me-1" onclick="shoppingMarketplace.editProduct(${product.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="shoppingMarketplace.deleteProduct(${product.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${this.currentLanguage === 'fr' ? product.name_fr : product.name}</h5>
                        <p class="text-muted mb-2">
                            <i class="fas fa-user me-1"></i>${product.seller}
                        </p>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt me-1"></i>${product.location}
                        </p>
                        <div class="d-flex align-items-center mb-2">
                            <div class="rating-stars me-2">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}
                            </div>
                            <small class="text-muted">(${product.reviews} ${this.translate('reviews')})</small>
                        </div>
                        <p class="card-text small flex-grow-1">${this.currentLanguage === 'fr' ? product.description_fr : product.description}</p>
                        <div class="mt-auto">
                            <div class="price-tag mb-3">${product.price.toLocaleString()} XAF</div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-primary btn-sm flex-fill" 
                                        onclick="shoppingMarketplace.showProductDetails(${product.id})">
                                    <i class="fas fa-info-circle"></i> <span data-translate="details">Details</span>
                                </button>
                                ${product.stock > 0 ? `
                                    <button class="btn btn-success btn-sm flex-fill" 
                                            onclick="shoppingMarketplace.addToCart(${product.id})">
                                        <i class="fas fa-cart-plus"></i> <span data-translate="add_to_cart">Add to Cart</span>
                                    </button>
                                ` : `
                                    <button class="btn btn-secondary btn-sm flex-fill" disabled>
                                        <span data-translate="out_of_stock">Out of Stock</span>
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const priceRange = document.getElementById('priceFilter').value;
        const location = document.getElementById('locationFilter').value;
        const sortBy = document.getElementById('sortFilter').value;

        let filtered = [...this.products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.name_fr.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.seller.toLowerCase().includes(searchTerm)
            );
        }

        // Price filter
        if (priceRange) {
            if (priceRange === '100000+') {
                filtered = filtered.filter(product => product.price >= 100000);
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                filtered = filtered.filter(product => product.price >= min && product.price <= max);
            }
        }

        // Location filter
        if (location) {
            filtered = filtered.filter(product => product.location === location);
        }

        // Sort
        switch (sortBy) {
            case 'price_low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
        }

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    filterByCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        if (category) {
            this.filteredProducts = this.products.filter(product => product.category === category);
        } else {
            this.filteredProducts = [...this.products];
        }
        this.renderProducts();
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
        document.getElementById('productDetailTitle').textContent = this.currentLanguage === 'fr' ? product.name_fr : product.name;
        
        document.getElementById('productDetailContent').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="product-gallery">
                        <img src="${product.images[0]}" class="img-fluid rounded mb-3" style="width: 100%; height: 300px; object-fit: cover;">
                        ${product.images.length > 1 ? `
                            <div class="d-flex gap-2">
                                ${product.images.map((img, index) => `
                                    <img src="${img}" class="img-thumbnail" style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;"
                                         onclick="this.parentElement.previousElementSibling.src = this.src">
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="price-tag mb-3">${product.price.toLocaleString()} XAF</div>
                    <div class="d-flex align-items-center mb-3">
                        <div class="rating-stars me-2">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}
                        </div>
                        <span>${product.rating} (${product.reviews} ${this.translate('reviews')})</span>
                    </div>
                    <p><strong>${this.translate('sold_by')}:</strong> ${product.seller}</p>
                    <p><strong>${this.translate('location')}:</strong> ${product.location}</p>
                    <p><strong>${this.translate('category')}:</strong> ${product.category}</p>
                    <p><strong>Stock:</strong> ${product.stock} ${this.translate('in_stock')}</p>
                    
                    <div class="mb-4">
                        <h6>Description:</h6>
                        <p>${this.currentLanguage === 'fr' ? product.description_fr : product.description}</p>
                    </div>

                    <div class="mb-4">
                        <h6>${this.translate('contact_seller')}:</h6>
                        <p><i class="fas fa-phone"></i> ${product.seller_phone}</p>
                        <p><i class="fas fa-envelope"></i> ${product.seller_email}</p>
                    </div>

                    <div class="d-flex gap-2">
                        ${product.stock > 0 ? `
                            <button class="btn btn-success flex-fill" onclick="shoppingMarketplace.addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> ${this.translate('add_to_cart')}
                            </button>
                            <button class="btn btn-primary flex-fill" onclick="shoppingMarketplace.buyNow(${product.id})">
                                <i class="fas fa-shopping-bag"></i> ${this.translate('buy_now')}
                            </button>
                        ` : `
                            <button class="btn btn-secondary flex-fill" disabled>
                                ${this.translate('out_of_stock')}
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.stock === 0) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.showSuccessMessage(this.translate('add_to_cart'), `${product.name} added to cart!`);
    }

    updateCartDisplay() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartTotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        document.getElementById('cartCount').textContent = cartCount;
        document.getElementById('cartTotal').textContent = cartTotal.toLocaleString();
    }

    showCart() {
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        const content = document.getElementById('cartContent');

        if (this.cart.length === 0) {
            content.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h5>${this.translate('empty_cart')}</h5>
                    <p class="text-muted">${this.translate('continue_shopping')}</p>
                </div>
            `;
        } else {
            content.innerHTML = `
                <div class="cart-items">
                    ${this.cart.map(item => `
                        <div class="d-flex align-items-center border-bottom py-3" data-cart-item="${item.id}">
                            <img src="${item.images[0]}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded me-3">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${this.currentLanguage === 'fr' ? item.name_fr : item.name}</h6>
                                <small class="text-muted">${item.seller}</small>
                                <div class="d-flex align-items-center mt-2">
                                    <button class="btn btn-sm btn-outline-secondary" onclick="shoppingMarketplace.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="mx-3">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="shoppingMarketplace.updateCartQuantity(${item.id}, ${item.quantity + 1})">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="text-end">
                                <div class="fw-bold">${(item.price * item.quantity).toLocaleString()} XAF</div>
                                <button class="btn btn-sm btn-outline-danger mt-1" onclick="shoppingMarketplace.removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i> ${this.translate('remove')}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="text-end mt-3 pt-3 border-top">
                    <h5>${this.translate('order_total')}: ${this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()} XAF</h5>
                </div>
            `;
        }

        modal.show();
    }

    updateCartQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            this.showCart(); // Refresh cart display
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.showCart(); // Refresh cart display
    }

    proceedToCheckout() {
        if (this.cart.length === 0) return;

        // Here you would integrate with payment system
        alert('Proceeding to checkout... (Payment integration would go here)');
    }

    buyNow(productId) {
        this.addToCart(productId);
        this.proceedToCheckout();
    }

    // Admin Functions
    showAddProductModal() {
        if (!this.isAdmin) return;
        
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.querySelector('#productModal .modal-title').textContent = this.translate('add_product');
        
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    editProduct(productId) {
        if (!this.isAdmin) return;

        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Fill form with product data
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productNameFr').value = product.name_fr;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('sellerName').value = product.seller;
        document.getElementById('productLocation').value = product.location;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productDescriptionFr').value = product.description_fr;
        document.getElementById('sellerPhone').value = product.seller_phone;
        document.getElementById('sellerEmail').value = product.seller_email;

        document.querySelector('#productModal .modal-title').textContent = this.translate('edit') + ' Product';
        
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    async saveProduct() {
        if (!this.isAdmin) return;

        const productId = document.getElementById('productId').value;
        const productData = {
            name: document.getElementById('productName').value,
            name_fr: document.getElementById('productNameFr').value,
            category: document.getElementById('productCategory').value,
            price: parseInt(document.getElementById('productPrice').value),
            seller: document.getElementById('sellerName').value,
            location: document.getElementById('productLocation').value,
            description: document.getElementById('productDescription').value,
            description_fr: document.getElementById('productDescriptionFr').value,
            seller_phone: document.getElementById('sellerPhone').value,
            seller_email: document.getElementById('sellerEmail').value,
            images: ['https://via.placeholder.com/400x300/007bff/white?text=' + encodeURIComponent(document.getElementById('productName').value)],
            rating: 0,
            reviews: 0,
            stock: 10,
            created_at: new Date()
        };

        if (productId) {
            // Update existing product
            const index = this.products.findIndex(p => p.id === parseInt(productId));
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...productData };
            }
        } else {
            // Add new product
            productData.id = Date.now();
            this.products.push(productData);
        }

        // In a real app, save to database here
        this.filteredProducts = [...this.products];
        this.renderProducts();
        
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        this.showSuccessMessage('Success', productId ? 'Product updated successfully!' : 'Product added successfully!');
    }

    deleteProduct(productId) {
        if (!this.isAdmin) return;

        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.showSuccessMessage('Success', 'Product deleted successfully!');
        }
    }

    showSuggestProductModal() {
        document.getElementById('suggestProductForm').reset();
        const modal = new bootstrap.Modal(document.getElementById('suggestProductModal'));
        modal.show();
    }

    submitSuggestion() {
        const suggestionData = {
            productName: document.getElementById('suggestProductName').value,
            category: document.getElementById('suggestCategory').value,
            reason: document.getElementById('suggestReason').value,
            contact: document.getElementById('suggestContact').value,
            submitted_at: new Date(),
            user: this.currentUser?.email || 'Guest'
        };

        // In a real app, save suggestion to database for admin review
        console.log('Product suggestion submitted:', suggestionData);
        
        bootstrap.Modal.getInstance(document.getElementById('suggestProductModal')).hide();
        this.showSuccessMessage('Thank you!', 'Your product suggestion has been submitted for review.');
    }

    showCategoriesModal() {
        if (!this.isAdmin) return;

        this.renderCategoriesList();
        const modal = new bootstrap.Modal(document.getElementById('categoriesModal'));
        modal.show();
    }

    renderCategoriesList() {
        const container = document.getElementById('categoriesList');
        container.innerHTML = this.categories.map(category => `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                    <i class="${category.icon}"></i>
                    <span class="ms-2">${category.name} / ${category.name_fr}</span>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="shoppingMarketplace.deleteCategory(${category.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    addCategory() {
        if (!this.isAdmin) return;

        const name = document.getElementById('newCategoryName').value.trim();
        const nameFr = document.getElementById('newCategoryNameFr').value.trim();
        const icon = document.getElementById('newCategoryIcon').value.trim();

        if (!name || !nameFr || !icon) {
            alert('Please fill in all fields');
            return;
        }

        const newCategory = {
            id: Date.now(),
            name,
            name_fr: nameFr,
            icon
        };

        this.categories.push(newCategory);
        this.renderCategoriesList();
        this.renderCategoryFilters();
        this.loadCategoriesInSelect();

        // Clear form
        document.getElementById('newCategoryName').value = '';
        document.getElementById('newCategoryNameFr').value = '';
        document.getElementById('newCategoryIcon').value = '';

        this.showSuccessMessage('Success', 'Category added successfully!');
    }

    deleteCategory(categoryId) {
        if (!this.isAdmin) return;

        if (confirm('Are you sure you want to delete this category?')) {
            this.categories = this.categories.filter(c => c.id !== categoryId);
            this.renderCategoriesList();
            this.renderCategoryFilters();
            this.loadCategoriesInSelect();
            this.showSuccessMessage('Success', 'Category deleted successfully!');
        }
    }

    showAnalytics() {
        if (!this.isAdmin) return;

        const totalProducts = this.products.length;
        const totalCategories = this.categories.length;
        const totalValue = this.products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const avgRating = this.products.reduce((sum, product) => sum + product.rating, 0) / this.products.length;

        alert(`Analytics Dashboard:\n\nTotal Products: ${totalProducts}\nTotal Categories: ${totalCategories}\nTotal Inventory Value: ${totalValue.toLocaleString()} XAF\nAverage Rating: ${avgRating.toFixed(1)}`);
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
        document.getElementById('currentLang').textContent = this.currentLanguage.toUpperCase();
        this.translatePage();
        this.renderProducts();
        this.renderCategoryFilters();
        this.loadCategoriesInSelect();
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.translate(key);
        });
    }

    setupEventListeners() {
        // Auto-filter on search input
        document.getElementById('searchInput').addEventListener('input', () => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => this.filterProducts(), 300);
        });
    }

    showSuccessMessage(title, message) {
        // Simple alert for now - in a real app, use a toast notification
        alert(`${title}: ${message}`);
    }
}

// Initialize the shopping marketplace
let shoppingMarketplace;
document.addEventListener('DOMContentLoaded', () => {
    shoppingMarketplace = new ShoppingMarketplace();
});
