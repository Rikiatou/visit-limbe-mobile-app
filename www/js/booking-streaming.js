// Booking & Streaming Module JavaScript
class BookingStreamingModule {
    constructor() {
        this.currentLanguage = 'en';
        this.userPoints = 0;
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.streakDays = parseInt(localStorage.getItem('streakDays') || '0');
        this.lastLoginDate = localStorage.getItem('lastLoginDate');
        this.currentBookingStep = 1;
        this.selectedHotel = null;
        this.bookingData = {};
        this.hotels = []; // Store hotels data for details view
        this.init();
    }

    init() {
        this.loadUserPoints();
        this.loadHotels();
        this.loadVideos();
        this.loadBookings();
        this.loadRewards();
        this.checkDailyLogin();
        this.setupEventListeners();
        this.updateLanguage();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('hotelSearch')?.addEventListener('input', () => this.searchHotels());
        
        // Filter functionality
        document.getElementById('priceFilter')?.addEventListener('change', () => this.applyFilters());
        document.getElementById('locationFilter')?.addEventListener('change', () => this.applyFilters());
        document.getElementById('ratingFilter')?.addEventListener('change', () => this.applyFilters());
        document.getElementById('sortFilter')?.addEventListener('change', () => this.applyFilters());

        // Category chips for videos
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', (e) => this.filterVideosByCategory(e.target.dataset.category));
        });

        // Form submissions
        document.getElementById('addPropertyForm')?.addEventListener('submit', (e) => this.submitPropertySuggestion(e));
        document.getElementById('addVideoForm')?.addEventListener('submit', (e) => this.submitVideoSuggestion(e));
    }

    loadUserPoints() {
        // Simulate loading user points
        this.userPoints = parseInt(localStorage.getItem('userPoints') || '1250');
        document.getElementById('userPoints').textContent = this.userPoints;
        document.getElementById('totalPoints').textContent = this.userPoints;
        document.getElementById('weeklyPoints').textContent = localStorage.getItem('weeklyPoints') || '180';
        document.getElementById('monthlyPoints').textContent = localStorage.getItem('monthlyPoints') || '650';
    }

    async loadHotels() {
        try {
            // Load hotels from the existing module_items table to avoid duplicates
            const { supabase } = await import('../js/advanced-supabase-services.js');
            
            const { data: existingHotels, error } = await supabase
                .from('module_items')
                .select(`
                    id,
                    item_name,
                    description,
                    contact_info,
                    location_info,
                    features,
                    gallery_urls,
                    created_at
                `)
                .eq('module_name', 'booking')
                .eq('subcategory', 'hotels')
                .eq('is_published', true);

            if (error) {
                console.error('Error loading hotels:', error);
                this.loadSampleHotels(); // Fallback to sample data
                return;
            }

            // Transform existing hotel data to our format
            const hotels = existingHotels.map(hotel => ({
                id: hotel.id,
                name: hotel.item_name,
                name_fr: hotel.item_name, // Could be enhanced with French names
                image: hotel.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                price: this.extractPrice(hotel.features) || 35000,
                rating: this.extractRating(hotel.features) || 4.2,
                reviews: Math.floor(Math.random() * 300) + 50, // Generate random review count
                location: this.extractLocation(hotel.location_info) || 'Limbe',
                amenities: this.extractAmenities(hotel.features) || ['wifi', 'restaurant'],
                description: hotel.description || 'Beautiful hotel in Limbe',
                description_fr: hotel.description || 'Bel hôtel à Limbe'
            }));

            // If no existing hotels, use sample data
            if (hotels.length === 0) {
                this.loadSampleHotels();
            } else {
                this.renderHotels(hotels);
            }
        } catch (error) {
            console.error('Error in loadHotels:', error);
            this.loadSampleHotels(); // Fallback to sample data
        }
    }

    loadSampleHotels() {
        // Fallback sample data when no real hotels exist
        const hotels = [
            {
                id: 'sample-1',
                name: 'Atlantic Beach Hotel',
                name_fr: 'Hôtel Atlantic Beach',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                price: 35000,
                rating: 4.5,
                reviews: 234,
                location: 'Down Beach',
                amenities: ['wifi', 'pool', 'restaurant', 'parking'],
                description: 'Luxury beachfront hotel with stunning ocean views',
                description_fr: 'Hôtel de luxe en bord de mer avec vue imprenable sur l\'océan'
            },
            {
                id: 'sample-2',
                name: 'Limbe Garden Lodge',
                name_fr: 'Lodge Limbe Garden',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                price: 18000,
                rating: 4.2,
                reviews: 156,
                location: 'Botanic Garden',
                amenities: ['wifi', 'garden', 'restaurant'],
                description: 'Peaceful lodge surrounded by tropical gardens',
                description_fr: 'Lodge paisible entouré de jardins tropicaux'
            }
        ];

        this.renderHotels(hotels);
    }

    extractPrice(features) {
        try {
            if (Array.isArray(features)) {
                // Look for price in features array (format: "price:35000 XAF")
                const priceFeature = features.find(f => f.startsWith('price:'));
                if (priceFeature) {
                    const priceMatch = priceFeature.match(/price:(\d+)/);
                    return priceMatch ? parseInt(priceMatch[1]) : null;
                }
            }
            if (features?.pricing) {
                return parseInt(features.pricing.base_price) || null;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    extractRating(features) {
        try {
            if (Array.isArray(features)) {
                // Look for rating in features array (format: "rating:4.5")
                const ratingFeature = features.find(f => f.startsWith('rating:'));
                if (ratingFeature) {
                    const ratingMatch = ratingFeature.match(/rating:([\d.]+)/);
                    return ratingMatch ? parseFloat(ratingMatch[1]) : null;
                }
            }
            if (features?.rating) {
                return parseFloat(features.rating) || null;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    extractLocation(locationInfo) {
        try {
            if (locationInfo?.address) {
                return locationInfo.address;
            }
            if (typeof locationInfo === 'string') {
                return locationInfo;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    extractAmenities(features) {
        try {
            if (Array.isArray(features)) {
                // Filter out non-amenity items (rating, price, rooms)
                return features.filter(f => 
                    !f.startsWith('rating:') && 
                    !f.startsWith('price:') && 
                    !f.startsWith('rooms:')
                );
            }
            if (features?.amenities && Array.isArray(features.amenities)) {
                return features.amenities;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    renderHotels(hotels) {
        const container = document.getElementById('hotelsContainer');
        if (!container) return;

        // Store hotels data for details view
        this.hotels = hotels;

        container.innerHTML = hotels.map(hotel => `
            <div class="col-md-4 mb-4">
                <div class="card hotel-card">
                    <div class="hotel-image" style="background-image: url('${hotel.image}')">
                        <div class="hotel-badge">Featured</div>
                        <button class="favorite-btn ${this.favorites.includes(hotel.id) ? 'active' : ''}" 
                                onclick="bookingStreaming.toggleFavorite(${hotel.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${this.currentLanguage === 'fr' ? hotel.name_fr : hotel.name}</h5>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt me-1"></i>${hotel.location}
                        </p>
                        <div class="d-flex align-items-center mb-2">
                            <div class="rating-stars me-2">
                                ${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5-Math.floor(hotel.rating))}
                            </div>
                            <small class="text-muted">(${hotel.reviews} reviews)</small>
                        </div>
                        <p class="card-text small">${this.currentLanguage === 'fr' ? hotel.description_fr : hotel.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-tag">${hotel.price.toLocaleString()} XAF</div>
                            <div>
                                <button class="btn btn-outline-primary btn-sm me-2" 
                                        onclick="bookingStreaming.showHotelDetails(${hotel.id})">
                                    <span data-translate="details">Details</span>
                                </button>
                                <button class="btn btn-primary btn-sm" 
                                        onclick="bookingStreaming.startBooking(${hotel.id})">
                                    <span data-translate="book_now">Book Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadVideos() {
        const videos = [
            {
                id: 1,
                title: 'Discover Limbe Beaches',
                title_fr: 'Découvrez les Plages de Limbe',
                thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
                duration: '5:32',
                points: 25,
                category: 'tourism',
                views: 1240,
                description: 'Explore the beautiful black sand beaches of Limbe'
            },
            {
                id: 2,
                title: 'Local Business Spotlight',
                title_fr: 'Projecteur sur les Entreprises Locales',
                thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
                duration: '3:45',
                points: 20,
                category: 'business',
                views: 856,
                description: 'Meet successful local entrepreneurs in Limbe'
            },
            {
                id: 3,
                title: 'Traditional Bakweri Culture',
                title_fr: 'Culture Traditionnelle Bakweri',
                thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                duration: '8:15',
                points: 50,
                category: 'culture',
                views: 2103,
                description: 'Learn about the rich cultural heritage of the Bakweri people'
            }
        ];

        this.renderVideos(videos);
    }

    renderVideos(videos) {
        const container = document.getElementById('videosContainer');
        if (!container) return;

        container.innerHTML = videos.map(video => `
            <div class="col-md-4 mb-4">
                <div class="card video-card">
                    <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')"
                         onclick="bookingStreaming.playVideo(${video.id})">
                        <div class="video-duration">${video.duration}</div>
                        <div class="points-badge">+${video.points} pts</div>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${this.currentLanguage === 'fr' ? video.title_fr : video.title}</h6>
                        <p class="card-text small text-muted">${video.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-eye me-1"></i>${video.views} views
                            </small>
                            <button class="btn btn-primary btn-sm" onclick="bookingStreaming.playVideo(${video.id})">
                                <i class="fas fa-play me-1"></i><span data-translate="watch">Watch</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadBookings() {
        const bookings = [
            {
                id: 1,
                hotelName: 'Atlantic Beach Hotel',
                checkIn: '2025-09-15',
                checkOut: '2025-09-18',
                guests: 2,
                status: 'upcoming',
                total: 105000,
                roomType: 'Deluxe Ocean View'
            },
            {
                id: 2,
                hotelName: 'Limbe Garden Lodge',
                checkIn: '2025-08-10',
                checkOut: '2025-08-12',
                guests: 1,
                status: 'completed',
                total: 36000,
                roomType: 'Standard Room'
            }
        ];

        this.renderBookings(bookings);
    }

    renderBookings(bookings) {
        const container = document.getElementById('bookingsContainer');
        if (!container) return;

        container.innerHTML = bookings.map(booking => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h6>${booking.hotelName}</h6>
                            <p class="mb-1">${booking.roomType}</p>
                            <small class="text-muted">
                                ${booking.checkIn} - ${booking.checkOut} • ${booking.guests} guest(s)
                            </small>
                        </div>
                        <div class="col-md-2">
                            <span class="badge bg-${booking.status === 'upcoming' ? 'warning' : 'success'}">
                                ${booking.status}
                            </span>
                        </div>
                        <div class="col-md-2 text-end">
                            <div class="price-tag">${booking.total.toLocaleString()} XAF</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadRewards() {
        const rewards = [
            {
                id: 1,
                title: '10% Hotel Discount',
                title_fr: '10% de Réduction Hôtel',
                points: 200,
                icon: 'fas fa-bed',
                description: 'Get 10% off your next hotel booking'
            },
            {
                id: 2,
                title: 'Free Restaurant Voucher',
                title_fr: 'Bon Restaurant Gratuit',
                points: 500,
                icon: 'fas fa-utensils',
                description: '5,000 XAF voucher for any restaurant'
            },
            {
                id: 3,
                title: 'Tour Guide Service',
                title_fr: 'Service Guide Touristique',
                points: 1000,
                icon: 'fas fa-map-marked-alt',
                description: 'Free half-day tour guide service'
            }
        ];

        this.renderRewards(rewards);
    }

    renderRewards(rewards) {
        const container = document.getElementById('rewardsContainer');
        if (!container) return;

        container.innerHTML = rewards.map(reward => `
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-2">
                            <i class="${reward.icon} me-2 text-primary"></i>
                            <h6 class="mb-0">${this.currentLanguage === 'fr' ? reward.title_fr : reward.title}</h6>
                        </div>
                        <p class="card-text small">${reward.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-warning fw-bold">${reward.points} points</span>
                            <button class="btn btn-primary btn-sm" 
                                    onclick="bookingStreaming.redeemReward(${reward.id})"
                                    ${this.userPoints < reward.points ? 'disabled' : ''}>
                                <span data-translate="redeem">Redeem</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    checkDailyLogin() {
        const today = new Date().toDateString();
        if (this.lastLoginDate !== today) {
            this.streakDays++;
            localStorage.setItem('streakDays', this.streakDays.toString());
            localStorage.setItem('lastLoginDate', today);
            
            // Award daily login bonus
            this.addPoints(20, 'Daily login bonus');
        }
        
        document.getElementById('streakDays').textContent = this.streakDays;
    }

    addPoints(points, reason) {
        this.userPoints += points;
        localStorage.setItem('userPoints', this.userPoints.toString());
        this.loadUserPoints();
        
        // Show points notification
        this.showNotification(`+${points} points earned: ${reason}`, 'success');
    }

    toggleFavorite(hotelId) {
        const index = this.favorites.indexOf(hotelId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(hotelId);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.loadHotels(); // Refresh to update heart icons
    }

    showHotelDetails(hotelId) {
        // Find the hotel in our data
        const hotel = this.hotels.find(h => h.id == hotelId);
        
        if (!hotel) {
            console.error('Hotel not found:', hotelId);
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('hotelDetailModal'));
        
        // Get additional images if available
        const images = hotel.gallery_urls || [hotel.image];
        const amenityIcons = {
            wifi: 'fas fa-wifi',
            pool: 'fas fa-swimming-pool',
            restaurant: 'fas fa-utensils',
            parking: 'fas fa-parking',
            spa: 'fas fa-spa',
            gym: 'fas fa-dumbbell',
            bar: 'fas fa-cocktail',
            conference: 'fas fa-users',
            business_center: 'fas fa-briefcase',
            garden: 'fas fa-leaf'
        };

        document.getElementById('hotelDetailTitle').textContent = hotel.name;
        document.getElementById('hotelDetailContent').innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <!-- Hotel Gallery -->
                    <div class="hotel-gallery mb-4">
                        <div class="main-image mb-3">
                            <img src="${hotel.image}" 
?                                 class="img-fluid rounded shadow" 
                                 alt="${hotel.name}"
                                 style="width: 100%; height: 350px; object-fit: cover;">
                        </div>
                        ${images.length > 1 ? `
                        <div class="row g-2">
                            ${images.slice(1, 4).map(img => `
                                <div class="col-4">
                                    <img src="${img}" 
                                         class="img-fluid rounded" 
                                         style="width: 100%; height: 120px; object-fit: cover; cursor: pointer;"
                                         onclick="document.querySelector('.main-image img').src='${img}'">
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- Hotel Information -->
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <h5><i class="fas fa-map-marker-alt text-primary"></i> Location</h5>
                            <p class="text-muted">${hotel.location}</p>
                        </div>
                        <div class="col-md-6">
                            <h5><i class="fas fa-star text-warning"></i> Rating</h5>
                            <div class="d-flex align-items-center">
                                <span class="h6 mb-0 me-2">${hotel.rating}</span>
                                <div class="stars me-2">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star ${i < Math.floor(hotel.rating) ? 'text-warning' : 'text-muted'}"></i>`
                                    ).join('')}
                                </div>
                                <small class="text-muted">(${hotel.reviews} reviews)</small>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Description -->
                    <h5><i class="fas fa-info-circle text-primary"></i> About This Hotel</h5>
                    <p class="mb-4">${hotel.description}</p>
                    
                    <!-- Amenities -->
                    <h5><i class="fas fa-concierge-bell text-primary"></i> Amenities</h5>
                    <div class="row g-3 mb-4">
                        ${hotel.amenities.map(amenity => `
                            <div class="col-md-4">
                                <div class="d-flex align-items-center">
                                    <i class="${amenityIcons[amenity] || 'fas fa-check'} text-primary me-2"></i>
                                    <span class="text-capitalize">${amenity.replace('_', ' ')}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Booking Sidebar -->
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">
                                <i class="fas fa-bed text-primary"></i> Room Types & Pricing
                            </h6>
                            
                            <div class="mb-3">
                                <div class="border-bottom pb-2 mb-2">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Standard Room</strong>
                                            <br><small class="text-muted">Basic amenities included</small>
                                        </div>
                                        <div class="text-end">
                                            <strong class="text-primary">${(hotel.price).toLocaleString()} XAF</strong>
                                            <br><small class="text-muted">per night</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="border-bottom pb-2 mb-2">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Deluxe Room</strong>
                                            <br><small class="text-muted">Premium amenities included</small>
                                        </div>
                                        <div class="text-end">
                                            <strong class="text-primary">${(hotel.price * 1.4).toLocaleString()} XAF</strong>
                                            <br><small class="text-muted">per night</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="pb-2 mb-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Suite</strong>
                                            <br><small class="text-muted">Luxury suite with view</small>
                                        </div>
                                        <div class="text-end">
                                            <strong class="text-primary">${(hotel.price * 2).toLocaleString()} XAF</strong>
                                            <br><small class="text-muted">per night</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" onclick="bookingStreaming.startBooking('${hotel.id}')">
                                    <i class="fas fa-calendar-check"></i> Book Now
                                </button>
                                <button class="btn btn-outline-secondary" onclick="bookingStreaming.toggleFavorite('${hotel.id}')">
                                    <i class="fas fa-heart"></i> Add to Favorites
                                </button>
                            </div>
                            
                            <!-- Contact Information -->
                            <div class="mt-4 pt-3 border-top">
                                <h6><i class="fas fa-phone text-primary"></i> Contact Info</h6>
                                <p class="mb-2"><strong>Phone:</strong> +237 233 322 XXX</p>
                                <p class="mb-0"><strong>Email:</strong> info@${hotel.name.toLowerCase().replace(/\s+/g, '')}.cm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }

    startBooking(hotelId) {
        this.selectedHotel = hotelId;
        this.currentBookingStep = 1;
        this.showBookingStep();
        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();
    }

    showBookingStep() {
        const content = document.getElementById('bookingModalContent');
        
        switch(this.currentBookingStep) {
            case 1:
                content.innerHTML = this.renderBookingStep1();
                break;
            case 2:
                content.innerHTML = this.renderBookingStep2();
                break;
            case 3:
                content.innerHTML = this.renderBookingStep3();
                break;
            case 4:
                content.innerHTML = this.renderBookingStep4();
                break;
        }
    }

    renderBookingStep1() {
        return `
            <div class="booking-step">
                <div class="d-flex align-items-center mb-3">
                    <div class="step-indicator">1</div>
                    <h5 class="ms-3 mb-0">Select Dates & Room</h5>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Check-in Date</label>
                        <input type="date" class="form-control" id="bookingCheckIn">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Check-out Date</label>
                        <input type="date" class="form-control" id="bookingCheckOut">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Room Type</label>
                        <select class="form-control" id="bookingRoomType">
                            <option value="standard">Standard Room - 25,000 XAF</option>
                            <option value="deluxe">Deluxe Room - 35,000 XAF</option>
                            <option value="suite">Suite - 50,000 XAF</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Number of Guests</label>
                        <select class="form-control" id="bookingGuests">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                    </div>
                </div>
                <div class="text-end">
                    <button class="btn btn-primary" onclick="bookingStreaming.nextBookingStep()">
                        Next Step <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderBookingStep2() {
        return `
            <div class="booking-step">
                <div class="d-flex align-items-center mb-3">
                    <div class="step-indicator">2</div>
                    <h5 class="ms-3 mb-0">Booking Summary</h5>
                </div>
                <div class="booking-summary">
                    <h6>Atlantic Beach Hotel</h6>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Deluxe Room x 3 nights</span>
                        <span>105,000 XAF</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Service charge</span>
                        <span>5,000 XAF</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>110,000 XAF</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-secondary" onclick="bookingStreaming.prevBookingStep()">
                        <i class="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    <button class="btn btn-primary" onclick="bookingStreaming.nextBookingStep()">
                        Proceed to Payment <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderBookingStep3() {
        return `
            <div class="booking-step">
                <div class="d-flex align-items-center mb-3">
                    <div class="step-indicator">3</div>
                    <h5 class="ms-3 mb-0">Payment Method</h5>
                </div>
                <div class="payment-option" onclick="bookingStreaming.selectPayment('mtn')">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-mobile-alt text-warning me-3"></i>
                        <div>
                            <h6 class="mb-0">MTN Mobile Money</h6>
                            <small class="text-muted">Pay with your MTN MoMo account</small>
                        </div>
                    </div>
                </div>
                <div class="payment-option" onclick="bookingStreaming.selectPayment('orange')">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-mobile-alt text-danger me-3"></i>
                        <div>
                            <h6 class="mb-0">Orange Money</h6>
                            <small class="text-muted">Pay with your Orange Money account</small>
                        </div>
                    </div>
                </div>
                <div class="payment-option" onclick="bookingStreaming.selectPayment('card')">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-credit-card text-primary me-3"></i>
                        <div>
                            <h6 class="mb-0">Credit/Debit Card</h6>
                            <small class="text-muted">Pay with Visa, Mastercard</small>
                        </div>
                    </div>
                </div>
                <div class="payment-option" onclick="bookingStreaming.selectPayment('arrival')">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-money-bill text-success me-3"></i>
                        <div>
                            <h6 class="mb-0">Pay on Arrival</h6>
                            <small class="text-muted">Pay cash when you check in</small>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-secondary" onclick="bookingStreaming.prevBookingStep()">
                        <i class="fas fa-arrow-left me-2"></i>Previous
                    </button>
                    <button class="btn btn-success" onclick="bookingStreaming.completeBooking()">
                        Complete Booking <i class="fas fa-check ms-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderBookingStep4() {
        return `
            <div class="booking-step text-center">
                <div class="success-animation mb-3">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4 class="text-success mb-3">Booking Confirmed!</h4>
                <p>Your booking reference is: <strong>VL${Date.now()}</strong></p>
                <p>A confirmation email has been sent to your registered email address.</p>
                <div class="mt-4">
                    <button class="btn btn-primary me-2" onclick="bookingStreaming.viewBookingDetails()">
                        View Details
                    </button>
                    <button class="btn btn-outline-primary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        `;
    }

    nextBookingStep() {
        if (this.currentBookingStep < 4) {
            this.currentBookingStep++;
            this.showBookingStep();
        }
    }

    prevBookingStep() {
        if (this.currentBookingStep > 1) {
            this.currentBookingStep--;
            this.showBookingStep();
        }
    }

    completeBooking() {
        // Simulate booking completion
        this.currentBookingStep = 4;
        this.showBookingStep();
        
        // Award points for booking
        this.addPoints(100, 'Hotel booking completed');
    }

    playVideo(videoId) {
        const modal = new bootstrap.Modal(document.getElementById('videoPlayerModal'));
        document.getElementById('videoPlayerContent').innerHTML = `
            <div class="video-player-container">
                <div style="height: 400px; background: #000; position: relative;">
                    <button class="play-button" onclick="bookingStreaming.startVideoPlayback(${videoId})">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="p-3">
                    <h5>Video Title</h5>
                    <p>Video description and details...</p>
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        Watch until the end to earn 25 points!
                    </div>
                </div>
            </div>
        `;
        modal.show();
    }

    startVideoPlayback(videoId) {
        // Simulate video playback
        this.showNotification('Video playing... Watch until the end to earn points!', 'info');
        
        // Simulate video completion after 5 seconds
        setTimeout(() => {
            this.addPoints(25, 'Video completed');
            bootstrap.Modal.getInstance(document.getElementById('videoPlayerModal')).hide();
        }, 5000);
    }

    showNotification(message, type = 'success') {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" aria-label="Close"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.btn-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    updateLanguage() {
        // This would be connected to the main app's translation system
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            // Translation would happen here
        });
    }
}

// Initialize the module
let bookingStreaming;
document.addEventListener('DOMContentLoaded', () => {
    bookingStreaming = new BookingStreamingModule();
});

// Export for global access
window.bookingStreaming = bookingStreaming;
