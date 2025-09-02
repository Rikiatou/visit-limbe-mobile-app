// Advanced Supabase Services for Visit Limbe Tourism Platform
// Tous les 20 modules connectés à Supabase

// Configuration Supabase
const SUPABASE_URL = 'https://fcmdwakctnthedasowne.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjbWR3YWtjdG50aGVkYXNvd25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzMDMyNzYsImV4cCI6MjAzOTg3OTI3Nn0.UNvFjkVFt7ZIGRaqj0SL7B9GWl1IkmPUq6JhYE5TPFE';

// Initialiser Supabase Client//

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Service de gestion des images
const moduleImageService = {
    async uploadImage(moduleType, file) {
        try {
            const fileName = `${moduleType}/${Date.now()}_${file.name}`;
            const { data, error } = await supabase.storage
                .from('module-images')
                .upload(fileName, file);
            
            if (error) throw error;
            
            const { data: { publicUrl } } = supabase.storage
                .from('module-images')
                .getPublicUrl(fileName);
                
            return { success: true, url: publicUrl };
        } catch (error) {
            console.error('Erreur upload image:', error);
            return { success: false, error: error.message };
        }
    },

    async getModuleImages(moduleType) {
        try {
            const { data, error } = await supabase.storage
                .from('module-images')
                .list(moduleType);
                
            if (error) throw error;
            return { success: true, images: data };
        } catch (error) {
            console.error('Erreur récupération images:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service de gestion des éléments de modules
const moduleItemsService = {
    async createItem(moduleType, itemData) {
        try {
            const { data, error } = await supabase
                .from(`${moduleType}_items`)
                .insert([{
                    ...itemData,
                    created_at: new Date(),
                    is_active: true
                }])
                .select();
                
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Erreur création item:', error);
            return { success: false, error: error.message };
        }
    },

    async getItems(moduleType, filters = {}) {
        try {
            let query = supabase
                .from(`${moduleType}_items`)
                .select('*')
                .eq('is_active', true);
                
            // Appliquer les filtres
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    query = query.eq(key, filters[key]);
                }
            });
            
            const { data, error } = await query.order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Erreur récupération items:', error);
            return { success: false, error: error.message };
        }
    },

    async updateItem(moduleType, itemId, updates) {
        try {
            const { data, error } = await supabase
                .from(`${moduleType}_items`)
                .update({
                    ...updates,
                    updated_at: new Date()
                })
                .eq('id', itemId)
                .select();
                
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Erreur mise à jour item:', error);
            return { success: false, error: error.message };
        }
    },

    async deleteItem(moduleType, itemId) {
        try {
            const { error } = await supabase
                .from(`${moduleType}_items`)
                .update({ is_active: false })
                .eq('id', itemId);
                
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Erreur suppression item:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service de gestion des modules
const moduleManagerService = {
    async getModuleConfig(moduleType) {
        try {
            const { data, error } = await supabase
                .from('module_configs')
                .select('*')
                .eq('module_type', moduleType)
                .eq('is_active', true)
                .single();
                
            if (error) throw error;
            return { success: true, config: data };
        } catch (error) {
            console.error('Erreur config module:', error);
            return { success: false, error: error.message };
        }
    },

    async updateModuleConfig(moduleType, config) {
        try {
            const { data, error } = await supabase
                .from('module_configs')
                .upsert({
                    module_type: moduleType,
                    config,
                    updated_at: new Date()
                })
                .select();
                
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Erreur mise à jour config:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service Watch & Earn
const watchEarnService = {
    async getVideos(moduleType) {
        try {
            const { data, error } = await supabase
                .from('watch_earn_videos')
                .select('*')
                .eq('module_type', moduleType)
                .eq('is_active', true)
                .order('points_reward', { ascending: false });
                
            if (error) throw error;
            return { success: true, videos: data };
        } catch (error) {
            console.error('Erreur récupération vidéos:', error);
            return { success: false, error: error.message };
        }
    },

    async watchVideo(videoId, userId) {
        try {
            // Enregistrer le visionnage
            const { data: watchData, error: watchError } = await supabase
                .from('video_watches')
                .insert([{
                    video_id: videoId,
                    user_id: userId,
                    watched_at: new Date(),
                    completed: true
                }])
                .select();
                
            if (watchError) throw watchError;
            
            // Récupérer les points de la vidéo
            const { data: videoData, error: videoError } = await supabase
                .from('watch_earn_videos')
                .select('points_reward')
                .eq('id', videoId)
                .single();
                
            if (videoError) throw videoError;
            
            // Ajouter les points à l'utilisateur
            const { error: pointsError } = await supabase
                .from('user_points')
                .upsert({
                    user_id: userId,
                    points_earned: videoData.points_reward,
                    source: 'video_watch',
                    source_id: videoId,
                    earned_at: new Date()
                });
                
            if (pointsError) throw pointsError;
            
            return { 
                success: true, 
                pointsEarned: videoData.points_reward,
                watchId: watchData[0].id 
            };
        } catch (error) {
            console.error('Erreur visionnage vidéo:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service de points
const pointsService = {
    async getUserPoints(userId) {
        try {
            const { data, error } = await supabase
                .from('user_points')
                .select('*')
                .eq('user_id', userId)
                .order('earned_at', { ascending: false });
                
            if (error) throw error;
            
            const totalPoints = data.reduce((sum, point) => sum + point.points_earned, 0);
            return { success: true, totalPoints, history: data };
        } catch (error) {
            console.error('Erreur récupération points:', error);
            return { success: false, error: error.message };
        }
    },

    async addPoints(userId, points, source, sourceId = null) {
        try {
            const { data, error } = await supabase
                .from('user_points')
                .insert([{
                    user_id: userId,
                    points_earned: points,
                    source,
                    source_id: sourceId,
                    earned_at: new Date()
                }])
                .select();
                
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Erreur ajout points:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service SmartGro
const smartGroService = {
    async getMarketItems() {
        try {
            const { data, error } = await supabase
                .from('smartgro_items')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            return { success: true, items: data };
        } catch (error) {
            console.error('Erreur récupération items SmartGro:', error);
            return { success: false, error: error.message };
        }
    },

    async createMarketItem(itemData) {
        try {
            const { data, error } = await supabase
                .from('smartgro_items')
                .insert([{
                    ...itemData,
                    created_at: new Date(),
                    is_active: true
                }])
                .select();
                
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Erreur création item SmartGro:', error);
            return { success: false, error: error.message };
        }
    },

    async getFarmingTips() {
        try {
            const { data, error } = await supabase
                .from('farming_tips')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            return { success: true, tips: data };
        } catch (error) {
            console.error('Erreur récupération conseils:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service de paiement
const paymentService = {
    async createBooking(bookingData) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .insert([{
                    ...bookingData,
                    created_at: new Date(),
                    status: 'pending'
                }])
                .select();
                
            if (error) throw error;
            return { success: true, booking: data[0] };
        } catch (error) {
            console.error('Erreur création réservation:', error);
            return { success: false, error: error.message };
        }
    },

    async processPayment(paymentData) {
        try {
            const { data, error } = await supabase
                .from('payments')
                .insert([{
                    ...paymentData,
                    created_at: new Date(),
                    status: 'completed'
                }])
                .select();
                
            if (error) throw error;
            return { success: true, payment: data[0] };
        } catch (error) {
            console.error('Erreur traitement paiement:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service d'authentification
const authService = {
    async signUp(email, password, userData) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });
            
            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Erreur inscription:', error);
            return { success: false, error: error.message };
        }
    },

    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Erreur connexion:', error);
            return { success: false, error: error.message };
        }
    },

    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Erreur déconnexion:', error);
            return { success: false, error: error.message };
        }
    },

    async getCurrentUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            return { success: true, user };
        } catch (error) {
            console.error('Erreur utilisateur actuel:', error);
            return { success: false, error: error.message };
        }
    }
};

// Service de notifications en temps réel
const realtimeService = {
    subscribeToModuleUpdates(moduleType, callback) {
        return supabase
            .channel(`${moduleType}_updates`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: `${moduleType}_items`
            }, callback)
            .subscribe();
    },

    subscribeToBookings(callback) {
        return supabase
            .channel('bookings_updates')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'bookings'
            }, callback)
            .subscribe();
    }
};

// Exportations par défaut pour compatibilité
window.moduleImageService = moduleImageService;
window.moduleItemsService = moduleItemsService;
window.moduleManagerService = moduleManagerService;
window.watchEarnService = watchEarnService;
window.pointsService = pointsService;
window.smartGroService = smartGroService;
window.paymentService = paymentService;
window.authService = authService;
window.realtimeService = realtimeService;

// ===============================
// SUPABASE ICON MANAGER SYSTEM
// ===============================

const SupabaseIconManager = {
    cache: new Map(),
    dbTable: 'module_icons',
    
    // Initialize the icon system
    async init() {
        try {
            console.log('🎨 Initializing SupabaseIconManager...');
            await this.createTableIfNotExists();
            await this.seedDefaultIcons();
            console.log('✅ SupabaseIconManager initialized successfully!');
        } catch (error) {
            console.error('❌ SupabaseIconManager initialization failed:', error);
        }
    },

    // Create the module_icons table if it doesn't exist
    async createTableIfNotExists() {
        try {
            const { data, error } = await supabase
                .from(this.dbTable)
                .select('id')
                .limit(1);
            
            if (error && error.code === 'PGRST116') {
                console.log('📦 Creating module_icons table...');
                // Table doesn't exist, would need to create via Supabase dashboard
                console.log('⚠️ Please create the module_icons table in your Supabase dashboard with columns: id, module_name, icon_class, icon_type, custom_icon_url, is_active, created_at, updated_at');
            }
        } catch (err) {
            console.log('📋 Table check completed');
        }
    },

    // Seed default icons for all modules
    async seedDefaultIcons() {
        const defaultIcons = [
            { module_name: 'hotels', icon_class: 'fas fa-hotel', icon_type: 'fontawesome' },
            { module_name: 'restaurants', icon_class: 'fas fa-utensils', icon_type: 'fontawesome' },
            { module_name: 'attractions', icon_class: 'fas fa-map-marked-alt', icon_type: 'fontawesome' },
            { module_name: 'transportation', icon_class: 'fas fa-bus', icon_type: 'fontawesome' },
            { module_name: 'shopping', icon_class: 'fas fa-shopping-bag', icon_type: 'fontawesome' },
            { module_name: 'events', icon_class: 'fas fa-calendar-alt', icon_type: 'fontawesome' },
            { module_name: 'nightlife', icon_class: 'fas fa-moon', icon_type: 'fontawesome' },
            { module_name: 'emergency', icon_class: 'fas fa-ambulance', icon_type: 'fontawesome' },
            { module_name: 'weather', icon_class: 'fas fa-cloud-sun', icon_type: 'fontawesome' },
            { module_name: 'maps', icon_class: 'fas fa-map', icon_type: 'fontawesome' },
            { module_name: 'booking', icon_class: 'fas fa-calendar-check', icon_type: 'fontawesome' },
            { module_name: 'reviews', icon_class: 'fas fa-star', icon_type: 'fontawesome' },
            { module_name: 'favorites', icon_class: 'fas fa-heart', icon_type: 'fontawesome' },
            { module_name: 'profile', icon_class: 'fas fa-user', icon_type: 'fontawesome' },
            { module_name: 'settings', icon_class: 'fas fa-cog', icon_type: 'fontawesome' },
            { module_name: 'notifications', icon_class: 'fas fa-bell', icon_type: 'fontawesome' },
            { module_name: 'currency', icon_class: 'fas fa-coins', icon_type: 'fontawesome' },
            { module_name: 'language', icon_class: 'fas fa-globe', icon_type: 'fontawesome' },
            { module_name: 'help', icon_class: 'fas fa-question-circle', icon_type: 'fontawesome' },
            { module_name: 'about', icon_class: 'fas fa-info-circle', icon_type: 'fontawesome' }
        ];

        for (const iconData of defaultIcons) {
            await this.upsertIcon(iconData.module_name, iconData.icon_class, iconData.icon_type);
        }
    },

    // Get icon for a specific module
    async getIcon(moduleName) {
        try {
            // Check cache first
            if (this.cache.has(moduleName)) {
                return this.cache.get(moduleName);
            }

            const { data, error } = await supabase
                .from(this.dbTable)
                .select('*')
                .eq('module_name', moduleName)
                .eq('is_active', true)
                .single();

            if (error || !data) {
                console.log(`⚠️ No icon found for module: ${moduleName}, using default`);
                return this.getDefaultIcon(moduleName);
            }

            // Cache the result
            this.cache.set(moduleName, data);
            return data;
        } catch (err) {
            console.error(`❌ Error getting icon for ${moduleName}:`, err);
            return this.getDefaultIcon(moduleName);
        }
    },

    // Get default fallback icon
    getDefaultIcon(moduleName) {
        const defaults = {
            hotels: { icon_class: 'fas fa-hotel', icon_type: 'fontawesome' },
            restaurants: { icon_class: 'fas fa-utensils', icon_type: 'fontawesome' },
            attractions: { icon_class: 'fas fa-map-marked-alt', icon_type: 'fontawesome' },
            transportation: { icon_class: 'fas fa-bus', icon_type: 'fontawesome' },
            shopping: { icon_class: 'fas fa-shopping-bag', icon_type: 'fontawesome' }
        };
        
        return defaults[moduleName] || { icon_class: 'fas fa-circle', icon_type: 'fontawesome' };
    },

    // Update or insert icon
    async upsertIcon(moduleName, iconClass, iconType = 'fontawesome', customUrl = null) {
        try {
            const iconData = {
                module_name: moduleName,
                icon_class: iconClass,
                icon_type: iconType,
                custom_icon_url: customUrl,
                is_active: true,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from(this.dbTable)
                .upsert(iconData, { onConflict: 'module_name' })
                .select();

            if (error) throw error;

            // Update cache
            this.cache.set(moduleName, data[0]);
            console.log(`✅ Icon updated for module: ${moduleName}`);
            return data[0];
        } catch (err) {
            console.error(`❌ Error upserting icon for ${moduleName}:`, err);
            throw err;
        }
    },

    // Render icon HTML
    renderIcon(iconData, additionalClasses = '') {
        if (!iconData) return '<i class="fas fa-circle"></i>';

        if (iconData.icon_type === 'custom' && iconData.custom_icon_url) {
            return `<img src="${iconData.custom_icon_url}" class="custom-icon ${additionalClasses}" alt="${iconData.module_name} icon">`;
        }

        return `<i class="${iconData.icon_class} ${additionalClasses}"></i>`;
    },

    // Get all icons for admin interface
    async getAllIcons() {
        try {
            const { data, error } = await supabase
                .from(this.dbTable)
                .select('*')
                .order('module_name');

            if (error) throw error;
            return data || [];
        } catch (err) {
            console.error('❌ Error getting all icons:', err);
            return [];
        }
    },

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Icon cache cleared');
    }
};

// Auto-convert existing DOM elements with data-module attribute
document.addEventListener('DOMContentLoaded', async () => {
    const moduleElements = document.querySelectorAll('[data-module]');
    
    for (const element of moduleElements) {
        const moduleName = element.getAttribute('data-module');
        const iconData = await SupabaseIconManager.getIcon(moduleName);
        
        // Find icon element within this module element
        const iconElement = element.querySelector('.module-icon, .icon, i[class*="fa"]');
        if (iconElement && iconData) {
            iconElement.outerHTML = SupabaseIconManager.renderIcon(iconData, iconElement.className);
        }
    }
});

// Export the icon manager
window.SupabaseIconManager = SupabaseIconManager;

console.log('🚀 Services Supabase chargés pour tous les 20 modules Visit Limbe');
