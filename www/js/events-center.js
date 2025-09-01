class EventsCenter {
    constructor() {
        this.events = [];
        this.categories = [];
        this.currentLanguage = 'en';
        this.currentTab = 'all';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
        this.eventSuggestions = JSON.parse(localStorage.getItem('eventSuggestions') || '[]');
        
        // Check user role
        this.userRole = localStorage.getItem('userRole') || 'user';
        
        this.translations = {
            en: {
                back: "Back",
                my_events: "My Events",
                events_activities: "Events & Activities",
                events_subtitle: "Discover exciting events and activities happening in Limbe",
                admin_controls: "Administrative Controls",
                add_event: "Add Event",
                manage_categories: "Manage Categories",
                analytics: "Analytics",
                featured_events: "Featured Events",
                featured_subtitle: "Don't miss these amazing upcoming events!",
                all_events: "All Events",
                upcoming: "Upcoming",
                this_week: "This Week",
                calendar: "Calendar",
                search_events: "Search Events",
                date_range: "Date Range",
                all_dates: "All Dates",
                price_range: "Price Range",
                all_prices: "All Prices",
                location: "Location",
                all_locations: "All Locations",
                all_categories: "All Categories",
                events_calendar: "Events Calendar",
                suggest_event: "Suggest an Event",
                view_details: "View Details",
                book_now: "Book Now",
                free: "FREE",
                sold_out: "SOLD OUT",
                available_tickets: "tickets available",
                event_title: "Event Title",
                event_title_fr: "Event Title (French)",
                category: "Category",
                event_date: "Event Date",
                event_time: "Event Time",
                organizer: "Organizer",
                ticket_price: "Ticket Price (XAF)",
                capacity: "Capacity",
                registration_deadline: "Registration Deadline",
                description: "Description",
                description_fr: "Description (French)",
                event_images: "Event Images",
                contact_email: "Contact Email",
                contact_phone: "Contact Phone",
                featured_event: "Featured Event",
                requires_registration: "Requires Registration",
                cancel: "Cancel",
                save_event: "Save Event",
                event_name: "Event Name",
                event_type: "Event Type",
                proposed_date: "Proposed Date",
                why_suggest: "Why should this event be organized?",
                your_contact: "Your Contact (optional)",
                submit_suggestion: "Submit Suggestion",
                search_placeholder: "Search events...",
                no_events_found: "No events found matching your criteria",
                register_success: "Successfully registered for event!",
                event_saved: "Event saved successfully!",
                suggestion_submitted: "Event suggestion submitted successfully!",
                loading: "Loading...",
                error_occurred: "An error occurred. Please try again.",
                confirm_delete: "Are you sure you want to delete this event?",
                event_deleted: "Event deleted successfully!",
                past: "Past",
                ongoing: "Ongoing",
                by: "by",
                at: "at",
                tickets_from: "Tickets from",
                full_description: "Full Description",
                event_details: "Event Details",
                when: "When",
                where: "Where",
                organized_by: "Organized By",
                ticket_information: "Ticket Information",
                contact_organizer: "Contact Organizer",
                share_event: "Share Event",
                directions: "Get Directions",
                add_to_calendar: "Add to Calendar",
                register_for_event: "Register for Event",
                registration_closed: "Registration Closed",
                months: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ]
            },
            fr: {
                back: "Retour",
                my_events: "Mes Événements",
                events_activities: "Événements et Activités",
                events_subtitle: "Découvrez des événements et activités passionnants à Limbe",
                admin_controls: "Contrôles Administratifs",
                add_event: "Ajouter Événement",
                manage_categories: "Gérer Catégories",
                analytics: "Analytiques",
                featured_events: "Événements en Vedette",
                featured_subtitle: "Ne manquez pas ces événements à venir !",
                all_events: "Tous les Événements",
                upcoming: "À Venir",
                this_week: "Cette Semaine",
                calendar: "Calendrier",
                search_events: "Rechercher Événements",
                date_range: "Plage de Dates",
                all_dates: "Toutes les Dates",
                price_range: "Gamme de Prix",
                all_prices: "Tous les Prix",
                location: "Lieu",
                all_locations: "Tous les Lieux",
                all_categories: "Toutes les Catégories",
                events_calendar: "Calendrier des Événements",
                suggest_event: "Suggérer un Événement",
                view_details: "Voir Détails",
                book_now: "Réserver",
                free: "GRATUIT",
                sold_out: "COMPLET",
                available_tickets: "billets disponibles",
                event_title: "Titre de l'Événement",
                event_title_fr: "Titre de l'Événement (Français)",
                category: "Catégorie",
                event_date: "Date de l'Événement",
                event_time: "Heure de l'Événement",
                organizer: "Organisateur",
                ticket_price: "Prix du Billet (XAF)",
                capacity: "Capacité",
                registration_deadline: "Date Limite d'Inscription",
                description: "Description",
                description_fr: "Description (Français)",
                event_images: "Images de l'Événement",
                contact_email: "Email de Contact",
                contact_phone: "Téléphone de Contact",
                featured_event: "Événement en Vedette",
                requires_registration: "Nécessite une Inscription",
                cancel: "Annuler",
                save_event: "Sauvegarder Événement",
                event_name: "Nom de l'Événement",
                event_type: "Type d'Événement",
                proposed_date: "Date Proposée",
                why_suggest: "Pourquoi cet événement devrait-il être organisé ?",
                your_contact: "Votre Contact (optionnel)",
                submit_suggestion: "Soumettre Suggestion",
                search_placeholder: "Rechercher événements...",
                no_events_found: "Aucun événement trouvé selon vos critères",
                register_success: "Inscription réussie pour l'événement !",
                event_saved: "Événement sauvegardé avec succès !",
                suggestion_submitted: "Suggestion d'événement soumise avec succès !",
                loading: "Chargement...",
                error_occurred: "Une erreur s'est produite. Veuillez réessayer.",
                confirm_delete: "Êtes-vous sûr de vouloir supprimer cet événement ?",
                event_deleted: "Événement supprimé avec succès !",
                past: "Passé",
                ongoing: "En Cours",
                by: "par",
                at: "à",
                tickets_from: "Billets à partir de",
                full_description: "Description Complète",
                event_details: "Détails de l'Événement",
                when: "Quand",
                where: "Où",
                organized_by: "Organisé Par",
                ticket_information: "Informations sur les Billets",
                contact_organizer: "Contacter l'Organisateur",
                share_event: "Partager l'Événement",
                directions: "Obtenir Directions",
                add_to_calendar: "Ajouter au Calendrier",
                register_for_event: "S'inscrire à l'Événement",
                registration_closed: "Inscription Fermée",
                months: [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                ]
            }
        };

        this.init();
    }

    init() {
        this.loadCategories();
        this.loadEvents();
        this.updateUserInterface();
        this.updateMyEventsCount();
        this.renderCategoryFilters();
        this.updateLanguage();
    }

    loadCategories() {
        // Load default categories
        const defaultCategories = [
            { id: 'concert', name: 'Concert', nameFr: 'Concert', color: '#e74c3c' },
            { id: 'festival', name: 'Festival', nameFr: 'Festival', color: '#f39c12' },
            { id: 'workshop', name: 'Workshop', nameFr: 'Atelier', color: '#3498db' },
            { id: 'conference', name: 'Conference', nameFr: 'Conférence', color: '#9b59b6' },
            { id: 'sports', name: 'Sports', nameFr: 'Sports', color: '#2ecc71' },
            { id: 'cultural', name: 'Cultural', nameFr: 'Culturel', color: '#34495e' },
            { id: 'business', name: 'Business', nameFr: 'Affaires', color: '#95a5a6' },
            { id: 'social', name: 'Social', nameFr: 'Social', color: '#1abc9c' }
        ];

        this.categories = JSON.parse(localStorage.getItem('eventCategories')) || defaultCategories;
        
        if (!localStorage.getItem('eventCategories')) {
            localStorage.setItem('eventCategories', JSON.stringify(defaultCategories));
        }
    }

    loadEvents() {
        // Sample events data
        const sampleEvents = [
            {
                id: 1,
                title: "Limbe Music Festival 2024",
                titleFr: "Festival de Musique de Limbe 2024",
                description: "Annual music festival featuring local and international artists",
                descriptionFr: "Festival de musique annuel avec des artistes locaux et internationaux",
                category: "festival",
                date: "2024-02-15",
                time: "18:00",
                location: "Limbe Beach Front",
                organizer: "Limbe Cultural Association",
                ticketPrice: 5000,
                capacity: 2000,
                registeredCount: 850,
                images: ["/images/music-festival.jpg"],
                contactEmail: "info@limbemusic.com",
                contactPhone: "+237 680 123 456",
                isFeatured: true,
                requiresRegistration: true,
                registrationDeadline: "2024-02-10",
                status: "upcoming"
            },
            {
                id: 2,
                title: "Mount Cameroon Hiking Challenge",
                titleFr: "Défi de Randonnée du Mont Cameroun",
                description: "Guided hiking expedition to the peak of Mount Cameroon",
                descriptionFr: "Expédition de randonnée guidée vers le sommet du Mont Cameroun",
                category: "sports",
                date: "2024-02-20",
                time: "06:00",
                location: "Mount Cameroon National Park",
                organizer: "Adventure Limbe",
                ticketPrice: 15000,
                capacity: 50,
                registeredCount: 35,
                images: ["/images/mount-cameroon.jpg"],
                contactEmail: "adventure@limbe.com",
                contactPhone: "+237 690 234 567",
                isFeatured: true,
                requiresRegistration: true,
                registrationDeadline: "2024-02-18",
                status: "upcoming"
            },
            {
                id: 3,
                title: "Limbe Food & Culture Fair",
                titleFr: "Foire Gastronomique et Culturelle de Limbe",
                description: "Taste local delicacies and experience Limbe's rich cultural heritage",
                descriptionFr: "Dégustez des spécialités locales et découvrez le riche patrimoine culturel de Limbe",
                category: "cultural",
                date: "2024-02-25",
                time: "10:00",
                location: "Limbe Central Market",
                organizer: "Limbe Tourism Board",
                ticketPrice: 0,
                capacity: 1000,
                registeredCount: 400,
                images: ["/images/food-fair.jpg"],
                contactEmail: "tourism@limbe.gov.cm",
                contactPhone: "+237 670 345 678",
                isFeatured: false,
                requiresRegistration: false,
                registrationDeadline: null,
                status: "upcoming"
            }
        ];

        this.events = JSON.parse(localStorage.getItem('events')) || sampleEvents;
        
        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(sampleEvents));
        }
    }

    updateUserInterface() {
        const userRoleElement = document.getElementById('userRole');
        const adminControls = document.getElementById('adminControls');
        const addEventBtn = document.getElementById('addEventBtn');

        if (this.userRole === 'admin') {
            userRoleElement.innerHTML = '<span class="badge bg-danger">Administrator</span>';
            adminControls.style.display = 'block';
            addEventBtn.style.display = 'block';
        } else if (this.userRole === 'organizer') {
            userRoleElement.innerHTML = '<span class="badge bg-info">Event Organizer</span>';
            addEventBtn.style.display = 'block';
        } else {
            userRoleElement.innerHTML = '<span class="badge bg-success">Visitor</span>';
        }
    }

    updateMyEventsCount() {
        document.getElementById('myEventsCount').textContent = this.myEvents.length;
    }

    renderCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        const allButton = container.querySelector('[data-category=""]');
        
        // Clear existing category buttons (keep "All Categories")
        const categoryButtons = container.querySelectorAll('[data-category]:not([data-category=""])');
        categoryButtons.forEach(btn => btn.remove());

        // Add category buttons
        this.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'category-btn';
            button.setAttribute('data-category', category.id);
            button.onclick = () => this.filterByCategory(category.id);
            button.innerHTML = `<span>${this.currentLanguage === 'fr' ? category.nameFr : category.name}</span>`;
            container.appendChild(button);
        });
    }

    renderEvents(eventsToRender = null) {
        const container = document.getElementById('eventsContainer');
        const events = eventsToRender || this.getFilteredEvents();

        if (events.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">${this.translate('no_events_found')}</h4>
                </div>
            `;
            return;
        }

        container.innerHTML = events.map(event => this.createEventCard(event)).join('');
    }

    createEventCard(event) {
        const eventDate = new Date(event.date);
        const now = new Date();
        const isUpcoming = eventDate > now;
        const isPast = eventDate < now;
        const isToday = eventDate.toDateString() === now.toDateString();
        
        let statusBadge = '';
        if (event.isFeatured) statusBadge += '<span class="event-badge featured-badge">FEATURED</span>';
        if (isPast) statusBadge += '<span class="event-badge past-badge">' + this.translate('past') + '</span>';
        else if (isToday) statusBadge += '<span class="event-badge ongoing-badge">' + this.translate('ongoing') + '</span>';
        else statusBadge += '<span class="event-badge upcoming-badge">' + this.translate('upcoming') + '</span>';

        const category = this.categories.find(c => c.id === event.category);
        const categoryName = category ? (this.currentLanguage === 'fr' ? category.nameFr : category.name) : event.category;

        const availableTickets = event.capacity - event.registeredCount;
        const isSoldOut = availableTickets <= 0;

        let priceDisplay = '';
        if (event.ticketPrice === 0) {
            priceDisplay = `<span class="price-tag">${this.translate('free')}</span>`;
        } else if (isSoldOut) {
            priceDisplay = `<span class="price-tag sold-out">${this.translate('sold_out')}</span>`;
        } else {
            priceDisplay = `<span class="price-tag">${event.ticketPrice.toLocaleString()} XAF</span>`;
        }

        const title = this.currentLanguage === 'fr' && event.titleFr ? event.titleFr : event.title;
        const description = this.currentLanguage === 'fr' && event.descriptionFr ? event.descriptionFr : event.description;

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card event-card">
                    <div class="event-image" style="background-image: url('${event.images[0] || '/images/default-event.jpg'}')">
                        ${statusBadge}
                        ${priceDisplay}
                        <div class="date-circle">
                            <div class="date-day">${eventDate.getDate()}</div>
                            <div class="date-month">${this.translate('months')[eventDate.getMonth()].substr(0, 3)}</div>
                        </div>
                    </div>
                    <div class="event-details">
                        <h5 class="card-title">${title}</h5>
                        <div class="event-meta">
                            <div class="meta-item">
                                <i class="fas fa-tag"></i>
                                <span>${categoryName}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                        <p class="card-text">${description.substring(0, 100)}...</p>
                        <div class="meta-item mb-2">
                            <i class="fas fa-user"></i>
                            <span>${this.translate('by')} ${event.organizer}</span>
                        </div>
                        ${!isSoldOut && event.requiresRegistration ? 
                            `<small class="text-success">${availableTickets} ${this.translate('available_tickets')}</small>` : 
                            ''
                        }
                        <div class="d-flex gap-2 mt-3">
                            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="eventsCenter.showEventDetails(${event.id})">
                                <i class="fas fa-info-circle"></i> ${this.translate('view_details')}
                            </button>
                            ${!isPast && !isSoldOut ? 
                                `<button class="btn btn-primary btn-sm flex-fill" onclick="eventsCenter.registerForEvent(${event.id})">
                                    <i class="fas fa-ticket-alt"></i> ${this.translate('book_now')}
                                </button>` : 
                                ''
                            }
                            ${this.userRole === 'admin' ? 
                                `<button class="btn btn-warning btn-sm" onclick="eventsCenter.editEvent(${event.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="eventsCenter.deleteEvent(${event.id})">
                                    <i class="fas fa-trash"></i>
                                </button>` : 
                                ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFeaturedEvents() {
        const container = document.getElementById('featuredEventsContainer');
        const featuredEvents = this.events.filter(event => event.isFeatured && event.status === 'upcoming').slice(0, 3);

        if (featuredEvents.length === 0) {
            container.innerHTML = '<div class="col-12 text-center"><p>No featured events at this time</p></div>';
            return;
        }

        container.innerHTML = featuredEvents.map(event => {
            const title = this.currentLanguage === 'fr' && event.titleFr ? event.titleFr : event.title;
            const eventDate = new Date(event.date);
            
            return `
                <div class="col-md-4">
                    <div class="card bg-white text-dark">
                        <div class="card-body">
                            <h6 class="card-title">${title}</h6>
                            <p class="card-text small">
                                <i class="fas fa-calendar"></i> ${eventDate.toLocaleDateString()} 
                                ${this.translate('at')} ${event.time}<br>
                                <i class="fas fa-map-marker-alt"></i> ${event.location}
                            </p>
                            <button class="btn btn-sm btn-primary" onclick="eventsCenter.showEventDetails(${event.id})">
                                ${this.translate('view_details')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getFilteredEvents() {
        let filtered = [...this.events];
        
        // Filter by search term
        const searchTerm = document.getElementById('eventSearchInput').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchTerm) ||
                (event.titleFr && event.titleFr.toLowerCase().includes(searchTerm)) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm) ||
                event.organizer.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by category
        const categoryFilter = document.querySelector('.category-btn.active').getAttribute('data-category');
        if (categoryFilter) {
            filtered = filtered.filter(event => event.category === categoryFilter);
        }

        // Filter by date range
        const dateFilter = document.getElementById('dateFilter').value;
        if (dateFilter) {
            const now = new Date();
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                switch (dateFilter) {
                    case 'today':
                        return eventDate.toDateString() === now.toDateString();
                    case 'tomorrow':
                        const tomorrow = new Date(now);
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        return eventDate.toDateString() === tomorrow.toDateString();
                    case 'this-week':
                        const weekStart = new Date(now);
                        weekStart.setDate(now.getDate() - now.getDay());
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        return eventDate >= weekStart && eventDate <= weekEnd;
                    case 'this-month':
                        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
                    case 'next-month':
                        const nextMonth = new Date(now);
                        nextMonth.setMonth(nextMonth.getMonth() + 1);
                        return eventDate.getMonth() === nextMonth.getMonth() && eventDate.getFullYear() === nextMonth.getFullYear();
                    default:
                        return true;
                }
            });
        }

        // Filter by price range
        const priceFilter = document.getElementById('priceFilter').value;
        if (priceFilter) {
            filtered = filtered.filter(event => {
                switch (priceFilter) {
                    case 'free':
                        return event.ticketPrice === 0;
                    case '0-5000':
                        return event.ticketPrice >= 0 && event.ticketPrice <= 5000;
                    case '5000-15000':
                        return event.ticketPrice > 5000 && event.ticketPrice <= 15000;
                    case '15000+':
                        return event.ticketPrice > 15000;
                    default:
                        return true;
                }
            });
        }

        // Filter by location
        const locationFilter = document.getElementById('locationFilter').value;
        if (locationFilter) {
            filtered = filtered.filter(event => 
                event.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        // Filter by current tab
        if (this.currentTab !== 'all') {
            const now = new Date();
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                switch (this.currentTab) {
                    case 'upcoming':
                        return eventDate > now;
                    case 'this-week':
                        const weekStart = new Date(now);
                        weekStart.setDate(now.getDate() - now.getDay());
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        return eventDate >= weekStart && eventDate <= weekEnd;
                    default:
                        return true;
                }
            });
        }

        return filtered;
    }

    filterEvents() {
        this.renderEvents();
    }

    filterByCategory(categoryId) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
        
        this.filterEvents();
    }

    showTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Show/hide appropriate content
        if (tabName === 'calendar') {
            document.getElementById('eventsContainer').style.display = 'none';
            document.getElementById('calendarView').style.display = 'block';
            this.renderCalendar();
        } else {
            document.getElementById('eventsContainer').style.display = 'flex';
            document.getElementById('calendarView').style.display = 'none';
            this.renderEvents();
        }
    }

    renderCalendar() {
        const currentMonthElement = document.getElementById('currentMonth');
        currentMonthElement.textContent = `${this.translate('months')[this.currentMonth]} ${this.currentYear}`;
        
        const calendarGrid = document.getElementById('calendarGrid');
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        let calendarHTML = `
            <div class="row text-center mb-2">
                <div class="col fw-bold">Sun</div>
                <div class="col fw-bold">Mon</div>
                <div class="col fw-bold">Tue</div>
                <div class="col fw-bold">Wed</div>
                <div class="col fw-bold">Thu</div>
                <div class="col fw-bold">Fri</div>
                <div class="col fw-bold">Sat</div>
            </div>
        `;
        
        for (let week = 0; week < 6; week++) {
            calendarHTML += '<div class="row">';
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);
                
                const isCurrentMonth = currentDate.getMonth() === this.currentMonth;
                const dayEvents = this.events.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === currentDate.toDateString();
                });
                
                const dayClass = isCurrentMonth ? 'text-dark' : 'text-muted';
                const hasEvents = dayEvents.length > 0 ? 'bg-primary text-white' : '';
                
                calendarHTML += `
                    <div class="col p-2 border ${dayClass}">
                        <div class="h6 ${hasEvents}">${currentDate.getDate()}</div>
                        ${dayEvents.slice(0, 2).map(event => 
                            `<div class="small text-truncate" title="${event.title}">${event.title}</div>`
                        ).join('')}
                        ${dayEvents.length > 2 ? `<div class="small">+${dayEvents.length - 2} more</div>` : ''}
                    </div>
                `;
            }
            calendarHTML += '</div>';
        }
        
        calendarGrid.innerHTML = calendarHTML;
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    showEventDetails(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
        const title = this.currentLanguage === 'fr' && event.titleFr ? event.titleFr : event.title;
        const description = this.currentLanguage === 'fr' && event.descriptionFr ? event.descriptionFr : event.description;
        
        document.getElementById('eventDetailTitle').textContent = title;
        
        const eventDate = new Date(event.date);
        const now = new Date();
        const isPast = eventDate < now;
        const availableTickets = event.capacity - event.registeredCount;
        const isSoldOut = availableTickets <= 0;
        const isRegistered = this.myEvents.some(e => e.id === eventId);

        let ticketInfo = '';
        if (event.ticketPrice === 0) {
            ticketInfo = `<span class="ticket-price">${this.translate('free')}</span>`;
        } else if (isSoldOut) {
            ticketInfo = `<span class="sold-out">${this.translate('sold_out')}</span>`;
        } else {
            ticketInfo = `<span class="ticket-price">${event.ticketPrice.toLocaleString()} XAF</span>`;
        }

        const content = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${event.images[0] || '/images/default-event.jpg'}" class="img-fluid rounded mb-3" alt="${title}">
                    
                    <div class="organizer-info">
                        <h6><i class="fas fa-user"></i> ${this.translate('organized_by')}</h6>
                        <p class="mb-1">${event.organizer}</p>
                        <div class="d-flex gap-2">
                            ${event.contactEmail ? 
                                `<button class="btn btn-sm btn-outline-primary" onclick="window.open('mailto:${event.contactEmail}')">
                                    <i class="fas fa-envelope"></i> Email
                                </button>` : ''
                            }
                            ${event.contactPhone ? 
                                `<button class="btn btn-sm btn-outline-primary" onclick="window.open('tel:${event.contactPhone}')">
                                    <i class="fas fa-phone"></i> Call
                                </button>` : ''
                            }
                        </div>
                    </div>

                    <div class="map-container">
                        <i class="fas fa-map-marker-alt fa-2x text-muted"></i>
                        <div class="ms-2">
                            <div>${event.location}</div>
                            <button class="btn btn-sm btn-link p-0" onclick="eventsCenter.getDirections('${event.location}')">
                                ${this.translate('directions')}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <h5>${this.translate('event_details')}</h5>
                    
                    <div class="mb-3">
                        <h6><i class="fas fa-calendar"></i> ${this.translate('when')}</h6>
                        <p>${eventDate.toLocaleDateString()} ${this.translate('at')} ${event.time}</p>
                    </div>
                    
                    <div class="mb-3">
                        <h6><i class="fas fa-map-marker-alt"></i> ${this.translate('where')}</h6>
                        <p>${event.location}</p>
                    </div>
                    
                    <div class="mb-3">
                        <h6><i class="fas fa-ticket-alt"></i> ${this.translate('ticket_information')}</h6>
                        <p>${ticketInfo}</p>
                        ${!isSoldOut && event.capacity ? 
                            `<small class="text-muted">${availableTickets} of ${event.capacity} tickets available</small>` : 
                            ''
                        }
                    </div>
                    
                    <div class="mb-3">
                        <h6>${this.translate('full_description')}</h6>
                        <p>${description}</p>
                    </div>
                    
                    <div class="d-grid gap-2">
                        ${!isPast && !isSoldOut && !isRegistered ? 
                            `<button class="btn btn-primary" onclick="eventsCenter.registerForEvent(${eventId})">
                                <i class="fas fa-ticket-alt"></i> ${this.translate('register_for_event')}
                            </button>` : 
                            ''
                        }
                        ${isRegistered ? 
                            `<button class="btn btn-success" disabled>
                                <i class="fas fa-check"></i> Registered
                            </button>` : 
                            ''
                        }
                        ${isPast || isSoldOut ? 
                            `<button class="btn btn-secondary" disabled>
                                ${this.translate('registration_closed')}
                            </button>` : 
                            ''
                        }
                        <button class="btn btn-outline-primary" onclick="eventsCenter.addToCalendar(${eventId})">
                            <i class="fas fa-calendar-plus"></i> ${this.translate('add_to_calendar')}
                        </button>
                    </div>
                    
                    <div class="social-share">
                        <h6>${this.translate('share_event')}</h6>
                        <button class="share-btn share-facebook" onclick="eventsCenter.shareEvent(${eventId}, 'facebook')">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button class="share-btn share-twitter" onclick="eventsCenter.shareEvent(${eventId}, 'twitter')">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="share-btn share-whatsapp" onclick="eventsCenter.shareEvent(${eventId}, 'whatsapp')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="share-btn share-email" onclick="eventsCenter.shareEvent(${eventId}, 'email')">
                            <i class="fas fa-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('eventDetailContent').innerHTML = content;
        modal.show();
    }

    registerForEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        // Check if already registered
        if (this.myEvents.some(e => e.id === eventId)) {
            alert('You are already registered for this event!');
            return;
        }

        // Check capacity
        const availableTickets = event.capacity - event.registeredCount;
        if (availableTickets <= 0) {
            alert('Sorry, this event is sold out!');
            return;
        }

        // Add to my events
        this.myEvents.push({
            id: eventId,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            ticketPrice: event.ticketPrice,
            registeredDate: new Date().toISOString()
        });

        // Update registered count
        event.registeredCount++;

        // Save to localStorage
        localStorage.setItem('myEvents', JSON.stringify(this.myEvents));
        localStorage.setItem('events', JSON.stringify(this.events));

        this.updateMyEventsCount();
        this.renderEvents();
        
        // Show success message
        this.showNotification(this.translate('register_success'), 'success');
        
        // Close modal if open
        const modal = bootstrap.Modal.getInstance(document.getElementById('eventDetailModal'));
        if (modal) modal.hide();
    }

    showMyEvents() {
        if (this.myEvents.length === 0) {
            alert('You have not registered for any events yet.');
            return;
        }

        const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
        document.getElementById('eventDetailTitle').textContent = this.translate('my_events');
        
        const content = `
            <div class="row">
                ${this.myEvents.map(myEvent => {
                    const fullEvent = this.events.find(e => e.id === myEvent.id);
                    const eventDate = new Date(myEvent.date);
                    const isPast = eventDate < new Date();
                    
                    return `
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title">${myEvent.title}</h6>
                                    <p class="card-text">
                                        <i class="fas fa-calendar"></i> ${eventDate.toLocaleDateString()} at ${myEvent.time}<br>
                                        <i class="fas fa-map-marker-alt"></i> ${myEvent.location}<br>
                                        <i class="fas fa-ticket-alt"></i> ${myEvent.ticketPrice === 0 ? 'Free' : myEvent.ticketPrice + ' XAF'}
                                    </p>
                                    <div class="d-flex gap-2">
                                        ${fullEvent ? 
                                            `<button class="btn btn-sm btn-primary" onclick="eventsCenter.showEventDetails(${myEvent.id})">
                                                View Details
                                            </button>` : 
                                            ''
                                        }
                                        <button class="btn btn-sm btn-outline-danger" onclick="eventsCenter.unregisterFromEvent(${myEvent.id})">
                                            Unregister
                                        </button>
                                    </div>
                                    ${isPast ? '<span class="badge bg-secondary mt-2">Past Event</span>' : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        document.getElementById('eventDetailContent').innerHTML = content;
        modal.show();
    }

    unregisterFromEvent(eventId) {
        if (!confirm('Are you sure you want to unregister from this event?')) return;

        // Remove from my events
        this.myEvents = this.myEvents.filter(e => e.id !== eventId);
        
        // Update registered count
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            event.registeredCount--;
        }

        // Save to localStorage
        localStorage.setItem('myEvents', JSON.stringify(this.myEvents));
        localStorage.setItem('events', JSON.stringify(this.events));

        this.updateMyEventsCount();
        this.renderEvents();
        this.showMyEvents(); // Refresh the modal
    }

    showAddEventModal(eventId = null) {
        const modal = new bootstrap.Modal(document.getElementById('addEventModal'));
        const form = document.getElementById('eventForm');
        
        // Load categories into select
        const categorySelect = document.getElementById('eventCategory');
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        if (eventId) {
            // Edit mode
            const event = this.events.find(e => e.id === eventId);
            if (event) {
                document.getElementById('eventId').value = event.id;
                document.getElementById('eventTitle').value = event.title;
                document.getElementById('eventTitleFr').value = event.titleFr || '';
                document.getElementById('eventCategory').value = event.category;
                document.getElementById('eventDate').value = event.date;
                document.getElementById('eventTime').value = event.time;
                document.getElementById('eventLocation').value = event.location;
                document.getElementById('eventOrganizer').value = event.organizer;
                document.getElementById('ticketPrice').value = event.ticketPrice;
                document.getElementById('eventCapacity').value = event.capacity;
                document.getElementById('registrationDeadline').value = event.registrationDeadline || '';
                document.getElementById('eventDescription').value = event.description;
                document.getElementById('eventDescriptionFr').value = event.descriptionFr || '';
                document.getElementById('eventContactEmail').value = event.contactEmail;
                document.getElementById('eventContactPhone').value = event.contactPhone || '';
                document.getElementById('isFeatured').checked = event.isFeatured;
                document.getElementById('requiresRegistration').checked = event.requiresRegistration;
            }
        } else {
            // Add mode
            form.reset();
            document.getElementById('eventId').value = '';
        }

        modal.show();
    }

    saveEvent() {
        const form = document.getElementById('eventForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const eventId = document.getElementById('eventId').value;
        const eventData = {
            title: document.getElementById('eventTitle').value,
            titleFr: document.getElementById('eventTitleFr').value,
            category: document.getElementById('eventCategory').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            organizer: document.getElementById('eventOrganizer').value,
            ticketPrice: parseInt(document.getElementById('ticketPrice').value) || 0,
            capacity: parseInt(document.getElementById('eventCapacity').value),
            registrationDeadline: document.getElementById('registrationDeadline').value,
            description: document.getElementById('eventDescription').value,
            descriptionFr: document.getElementById('eventDescriptionFr').value,
            contactEmail: document.getElementById('eventContactEmail').value,
            contactPhone: document.getElementById('eventContactPhone').value,
            isFeatured: document.getElementById('isFeatured').checked,
            requiresRegistration: document.getElementById('requiresRegistration').checked,
            images: ['/images/default-event.jpg'], // Default image
            status: 'upcoming'
        };

        if (eventId) {
            // Update existing event
            const eventIndex = this.events.findIndex(e => e.id == eventId);
            if (eventIndex !== -1) {
                this.events[eventIndex] = { ...this.events[eventIndex], ...eventData };
            }
        } else {
            // Add new event
            eventData.id = Date.now();
            eventData.registeredCount = 0;
            this.events.push(eventData);
        }

        localStorage.setItem('events', JSON.stringify(this.events));
        
        this.renderEvents();
        this.renderFeaturedEvents();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEventModal'));
        modal.hide();
        
        this.showNotification(this.translate('event_saved'), 'success');
    }

    editEvent(eventId) {
        this.showAddEventModal(eventId);
    }

    deleteEvent(eventId) {
        if (!confirm(this.translate('confirm_delete'))) return;

        this.events = this.events.filter(e => e.id !== eventId);
        localStorage.setItem('events', JSON.stringify(this.events));
        
        this.renderEvents();
        this.renderFeaturedEvents();
        this.showNotification(this.translate('event_deleted'), 'success');
    }

    showSuggestEventModal() {
        const modal = new bootstrap.Modal(document.getElementById('suggestEventModal'));
        document.getElementById('suggestEventForm').reset();
        modal.show();
    }

    submitEventSuggestion() {
        const form = document.getElementById('suggestEventForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const suggestion = {
            id: Date.now(),
            name: document.getElementById('suggestEventName').value,
            type: document.getElementById('suggestEventType').value,
            proposedDate: document.getElementById('suggestEventDate').value,
            reason: document.getElementById('suggestReason').value,
            contact: document.getElementById('suggestContact').value,
            submittedDate: new Date().toISOString(),
            status: 'pending'
        };

        this.eventSuggestions.push(suggestion);
        localStorage.setItem('eventSuggestions', JSON.stringify(this.eventSuggestions));

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('suggestEventModal'));
        modal.hide();

        this.showNotification(this.translate('suggestion_submitted'), 'success');
    }

    addToCalendar(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const startDate = new Date(`${event.date}T${event.time}`);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

        const calendarData = {
            title: event.title,
            start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
            end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
            description: event.description,
            location: event.location
        };

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarData.title)}&dates=${calendarData.start}/${calendarData.end}&details=${encodeURIComponent(calendarData.description)}&location=${encodeURIComponent(calendarData.location)}`;
        
        window.open(calendarUrl, '_blank');
    }

    shareEvent(eventId, platform) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        const title = this.currentLanguage === 'fr' && event.titleFr ? event.titleFr : event.title;
        const url = window.location.href;
        const text = `Check out this event: ${title} - ${event.date} at ${event.location}`;

        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }

    getDirections(location) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        window.open(mapsUrl, '_blank');
    }

    showAnalytics() {
        const totalEvents = this.events.length;
        const upcomingEvents = this.events.filter(e => new Date(e.date) > new Date()).length;
        const totalRegistrations = this.events.reduce((sum, e) => sum + e.registeredCount, 0);
        const featuredEvents = this.events.filter(e => e.isFeatured).length;

        const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
        document.getElementById('eventDetailTitle').textContent = this.translate('analytics');
        
        const content = `
            <div class="row">
                <div class="col-md-3 text-center">
                    <h3 class="text-primary">${totalEvents}</h3>
                    <p>Total Events</p>
                </div>
                <div class="col-md-3 text-center">
                    <h3 class="text-success">${upcomingEvents}</h3>
                    <p>Upcoming Events</p>
                </div>
                <div class="col-md-3 text-center">
                    <h3 class="text-info">${totalRegistrations}</h3>
                    <p>Total Registrations</p>
                </div>
                <div class="col-md-3 text-center">
                    <h3 class="text-warning">${featuredEvents}</h3>
                    <p>Featured Events</p>
                </div>
            </div>
            
            <div class="mt-4">
                <h5>Event Categories Distribution</h5>
                <div class="row">
                    ${this.categories.map(category => {
                        const count = this.events.filter(e => e.category === category.id).length;
                        const percentage = totalEvents > 0 ? (count / totalEvents * 100).toFixed(1) : 0;
                        return `
                            <div class="col-md-6 mb-2">
                                <div class="d-flex justify-content-between">
                                    <span>${category.name}</span>
                                    <span>${count} (${percentage}%)</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${percentage}%; background-color: ${category.color}"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="mt-4">
                <h5>Event Suggestions</h5>
                <p>${this.eventSuggestions.length} suggestions received</p>
                ${this.eventSuggestions.length > 0 ? 
                    `<div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Type</th>
                                    <th>Proposed Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.eventSuggestions.slice(-5).map(suggestion => `
                                    <tr>
                                        <td>${suggestion.name}</td>
                                        <td>${suggestion.type}</td>
                                        <td>${suggestion.proposedDate || 'Not specified'}</td>
                                        <td><span class="badge bg-warning">${suggestion.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>` : 
                    '<p class="text-muted">No suggestions yet</p>'
                }
            </div>
        `;

        document.getElementById('eventDetailContent').innerHTML = content;
        modal.show();
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
        document.getElementById('currentLang').textContent = this.currentLanguage.toUpperCase();
        this.updateLanguage();
        this.renderEvents();
        this.renderFeaturedEvents();
        this.renderCategoryFilters();
    }

    updateLanguage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        // Update placeholders
        const searchInput = document.getElementById('eventSearchInput');
        if (searchInput) {
            searchInput.placeholder = this.translate('search_placeholder');
        }
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize Events Center when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.eventsCenter = new EventsCenter();
    
    // Initial render
    eventsCenter.renderEvents();
    eventsCenter.renderFeaturedEvents();
});
