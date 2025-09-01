// Visit Limbe App - Supabase Service Layer
// This file handles all backend interactions

// Initialize Supabase client
const supabaseUrl = 'https://ndqwrwgezdzfbqnruxss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcXdyd2dlemR6ZmJxbnJ1eHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NjcyMjMsImV4cCI6MjA3MTM0MzIyM30.akVEGqQUnBzGda5L_Lrq5-Ee_4gsiFAADk6kAvEafmU';

// Import Supabase (you'll need to include this in your HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// =============================================
// AUTHENTICATION SERVICES
// =============================================

const AuthService = {
    // Sign up new user
    async signUp(email, password, userData = {}) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });
            return { data, error };
        } catch (error) {
            console.error('Sign up error:', error);
            return { data: null, error };
        }
    },

    // Sign in user
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            return { data, error };
        } catch (error) {
            console.error('Sign in error:', error);
            return { data: null, error };
        }
    },

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            return { error };
        } catch (error) {
            console.error('Sign out error:', error);
            return { error };
        }
    },

    // Reset password
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            return { error };
        } catch (error) {
            console.error('Reset password error:', error);
            return { error };
        }
    },

    // Get current user
    getCurrentUser() {
        return supabase.auth.getUser();
    },

    // Listen to auth changes
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    },

    // Social Authentication - Google
    async signInWithGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            return { data, error };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { data: null, error };
        }
    },

    // Social Authentication - Facebook
    async signInWithFacebook() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            return { data, error };
        } catch (error) {
            console.error('Facebook sign in error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// USER PROFILE SERVICES
// =============================================

const UserService = {
    // Create user profile
    async createUserProfile(profileData) {
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([profileData])
                .select()
                .single();
            return { data, error };
        } catch (error) {
            console.error('Create user profile error:', error);
            return { data: null, error };
        }
    },

    // Get user profile
    async getUserProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', userId)
                .single();
            return { data, error };
        } catch (error) {
            console.error('Get user profile error:', error);
            return { data: null, error };
        }
    },

    // Update user profile
    async updateUserProfile(userId, updates) {
        try {
            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('user_id', userId)
                .select()
                .single();
            return { data, error };
        } catch (error) {
            console.error('Update user profile error:', error);
            return { data: null, error };
        }
    },

    // Upload profile picture
    async uploadProfilePicture(userId, file) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-profile.${fileExt}`;
            const filePath = `profiles/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('user-uploads')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('user-uploads')
                .getPublicUrl(filePath);

            // Update user profile with new photo URL
            const { data, error } = await supabase
                .from('users')
                .update({ profile_picture: publicUrl })
                .eq('user_id', userId)
                .select()
                .single();

            return { data: { ...data, profile_picture: publicUrl }, error };
        } catch (error) {
            console.error('Upload profile picture error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// BOOKING SERVICES
// =============================================

const BookingService = {
    // Get hotels and accommodations
    async getHotels() {
        try {
            const { data, error } = await supabase
                .from('locations')
                .select(`
                    *,
                    location_categories(name, name_fr, icon)
                `)
                .eq('category_id', 'hotel_category_id')
                .eq('is_active', true);
            return { data, error };
        } catch (error) {
            console.error('Get hotels error:', error);
            return { data: null, error };
        }
    },

    // Get bookable items
    async getBookableItems(locationId) {
        try {
            const { data, error } = await supabase
                .from('bookable_items')
                .select('*')
                .eq('location_id', locationId)
                .eq('is_active', true);
            return { data, error };
        } catch (error) {
            console.error('Get bookable items error:', error);
            return { data: null, error };
        }
    },

    // Create booking
    async createBooking(bookingData) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .insert(bookingData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create booking error:', error);
            return { data: null, error };
        }
    },

    // Get user bookings
    async getUserBookings(userId) {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    locations(name, name_fr, address),
                    bookable_items(name, name_fr, price)
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            return { data, error };
        } catch (error) {
            console.error('Get user bookings error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// SHOPPING SERVICES
// =============================================

const ShoppingService = {
    // Get products
    async getProducts(categoryId = null) {
        try {
            let query = supabase
                .from('products')
                .select(`
                    *,
                    product_categories(name, name_fr),
                    vendors(business_name, locations(name, address))
                `)
                .eq('is_active', true);
            
            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get products error:', error);
            return { data: null, error };
        }
    },

    // Add to cart
    async addToCart(userId, productId, quantity = 1) {
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .upsert({
                    user_id: userId,
                    product_id: productId,
                    quantity: quantity
                })
                .select();
            return { data, error };
        } catch (error) {
            console.error('Add to cart error:', error);
            return { data: null, error };
        }
    },

    // Get cart items
    async getCartItems(userId) {
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
                    *,
                    products(name, name_fr, price, images)
                `)
                .eq('user_id', userId);
            return { data, error };
        } catch (error) {
            console.error('Get cart items error:', error);
            return { data: null, error };
        }
    },

    // Create order
    async createOrder(orderData) {
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert(orderData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create order error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// HEALTH SERVICES
// =============================================

const HealthService = {
    // Get health facilities
    async getHealthFacilities(facilityType = null) {
        try {
            let query = supabase
                .from('health_facilities')
                .select(`
                    *,
                    locations(name, name_fr, address, phone, latitude, longitude),
                    health_facility_types(name, name_fr, icon)
                `)
                .eq('locations.is_active', true);
            
            if (facilityType) {
                query = query.eq('facility_type_id', facilityType);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get health facilities error:', error);
            return { data: null, error };
        }
    },

    // Get medical professionals
    async getMedicalProfessionals(facilityId = null) {
        try {
            let query = supabase
                .from('medical_professionals')
                .select(`
                    *,
                    health_facilities(locations(name, address))
                `)
                .eq('is_active', true);
            
            if (facilityId) {
                query = query.eq('facility_id', facilityId);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get medical professionals error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// EDUCATION SERVICES
// =============================================

const EducationService = {
    // Get educational institutions
    async getEducationalInstitutions(levelId = null) {
        try {
            let query = supabase
                .from('educational_institutions')
                .select(`
                    *,
                    locations(name, name_fr, address, phone, latitude, longitude),
                    education_levels(name, name_fr)
                `)
                .eq('locations.is_active', true);
            
            if (levelId) {
                query = query.eq('education_level_id', levelId);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get educational institutions error:', error);
            return { data: null, error };
        }
    },

    // Get education levels
    async getEducationLevels() {
        try {
            const { data, error } = await supabase
                .from('education_levels')
                .select('*')
                .eq('is_active', true)
                .order('sort_order');
            return { data, error };
        } catch (error) {
            console.error('Get education levels error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// TRANSPORT SERVICES
// =============================================

const TransportService = {
    // Get transport providers
    async getTransportProviders(transportType = null) {
        try {
            let query = supabase
                .from('transport_providers')
                .select(`
                    *,
                    transport_types(name, name_fr, icon, base_fare, per_km_rate)
                `)
                .eq('is_active', true);
            
            if (transportType) {
                query = query.eq('transport_type_id', transportType);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get transport providers error:', error);
            return { data: null, error };
        }
    },

    // Create transport booking
    async createTransportBooking(bookingData) {
        try {
            const { data, error } = await supabase
                .from('transport_bookings')
                .insert(bookingData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create transport booking error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// CULTURE SERVICES
// =============================================

const CultureService = {
    // Get cultural sites
    async getCulturalSites(siteType = null) {
        try {
            let query = supabase
                .from('cultural_sites')
                .select(`
                    *,
                    locations(name, name_fr, address, phone, latitude, longitude, gallery),
                    cultural_site_types(name, name_fr, icon)
                `)
                .eq('locations.is_active', true);
            
            if (siteType) {
                query = query.eq('site_type_id', siteType);
            }
            
            const { data, error } = await query;
            return { data, error };
        } catch (error) {
            console.error('Get cultural sites error:', error);
            return { data: null, error };
        }
    },

    // Get cultural events
    async getCulturalEvents() {
        try {
            const { data, error } = await supabase
                .from('cultural_events')
                .select(`
                    *,
                    locations(name, name_fr, address)
                `)
                .gte('end_date', new Date().toISOString())
                .eq('status', 'upcoming')
                .order('start_date');
            return { data, error };
        } catch (error) {
            console.error('Get cultural events error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// JOBS SERVICES
// =============================================

const JobsService = {
    // Get job postings
    async getJobPostings(categoryId = null, jobType = null) {
        try {
            let query = supabase
                .from('job_postings')
                .select(`
                    *,
                    job_categories(name, name_fr, icon),
                    locations(name, address),
                    profiles(full_name)
                `)
                .eq('status', 'active')
                .gte('expires_at', new Date().toISOString());
            
            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }
            if (jobType) {
                query = query.eq('job_type', jobType);
            }
            
            const { data, error } = await query.order('created_at', { ascending: false });
            return { data, error };
        } catch (error) {
            console.error('Get job postings error:', error);
            return { data: null, error };
        }
    },

    // Create job posting
    async createJobPosting(jobData) {
        try {
            const { data, error } = await supabase
                .from('job_postings')
                .insert(jobData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create job posting error:', error);
            return { data: null, error };
        }
    },

    // Apply for job
    async applyForJob(applicationData) {
        try {
            const { data, error } = await supabase
                .from('job_applications')
                .insert(applicationData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Apply for job error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// ADS SERVICES
// =============================================

const AdsService = {
    // Get ad campaign types
    async getCampaignTypes() {
        try {
            const { data, error } = await supabase
                .from('ad_campaign_types')
                .select('*')
                .eq('is_active', true)
                .order('base_price');
            return { data, error };
        } catch (error) {
            console.error('Get campaign types error:', error);
            return { data: null, error };
        }
    },

    // Create ad campaign
    async createCampaign(campaignData) {
        try {
            const { data, error } = await supabase
                .from('ad_campaigns')
                .insert(campaignData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create campaign error:', error);
            return { data: null, error };
        }
    },

    // Get user campaigns
    async getUserCampaigns(userId) {
        try {
            const { data, error } = await supabase
                .from('ad_campaigns')
                .select(`
                    *,
                    ad_campaign_types(name, name_fr)
                `)
                .eq('advertiser_id', userId)
                .order('created_at', { ascending: false });
            return { data, error };
        } catch (error) {
            console.error('Get user campaigns error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// MEDIA SERVICES
// =============================================

const MediaService = {
    // Upload file to storage
    async uploadFile(bucket, filePath, file) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);
            return { data, error };
        } catch (error) {
            console.error('Upload file error:', error);
            return { data: null, error };
        }
    },

    // Get file URL
    getFileUrl(bucket, filePath) {
        try {
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Get file URL error:', error);
            return null;
        }
    },

    // Save media file record
    async saveMediaFile(mediaData) {
        try {
            const { data, error } = await supabase
                .from('media_files')
                .insert(mediaData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Save media file error:', error);
            return { data: null, error };
        }
    },

    // Get gallery collections
    async getGalleryCollections() {
        try {
            const { data, error } = await supabase
                .from('gallery_collections')
                .select(`
                    *,
                    media_files!cover_image_id(public_url)
                `)
                .eq('is_public', true)
                .order('sort_order');
            return { data, error };
        } catch (error) {
            console.error('Get gallery collections error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// LOCATION SERVICES
// =============================================

const LocationService = {
    // Get all locations
    async getLocations(categoryId = null) {
        try {
            let query = supabase
                .from('locations')
                .select(`
                    *,
                    location_categories(name, name_fr, icon)
                `)
                .eq('is_active', true);
            
            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }
            
            const { data, error } = await query.order('name');
            return { data, error };
        } catch (error) {
            console.error('Get locations error:', error);
            return { data: null, error };
        }
    },

    // Get location categories
    async getLocationCategories() {
        try {
            const { data, error } = await supabase
                .from('location_categories')
                .select('*')
                .eq('is_active', true)
                .order('sort_order');
            return { data, error };
        } catch (error) {
            console.error('Get location categories error:', error);
            return { data: null, error };
        }
    }
};

// =============================================
// REVIEWS SERVICES
// =============================================

const ReviewsService = {
    // Create review
    async createReview(reviewData) {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert(reviewData)
                .select();
            return { data, error };
        } catch (error) {
            console.error('Create review error:', error);
            return { data: null, error };
        }
    },

    // Get reviews for location
    async getLocationReviews(locationId) {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select(`
                    *,
                    profiles(full_name, avatar_url)
                `)
                .eq('location_id', locationId)
                .eq('is_verified', true)
                .eq('is_hidden', false)
                .order('created_at', { ascending: false });
            return { data, error };
        } catch (error) {
            console.error('Get location reviews error:', error);
            return { data: null, error };
        }
    }
};

// Export services for use in other files
window.VisitLimbeServices = {
    Auth: AuthService,
    Booking: BookingService,
    Shopping: ShoppingService,
    Health: HealthService,
    Education: EducationService,
    Transport: TransportService,
    Culture: CultureService,
    Jobs: JobsService,
    Ads: AdsService,
    Media: MediaService,
    Location: LocationService,
    Reviews: ReviewsService
};

console.log('✅ Visit Limbe Services initialized successfully!');
