class JobsMarketplace {
    constructor() {
        this.currentLanguage = 'en';
        this.jobs = [];
        this.freelancers = [];
        this.myApplications = JSON.parse(localStorage.getItem('job_applications') || '[]');
        this.filteredJobs = [];
        this.filteredFreelancers = [];
        this.isAdmin = false;
        this.currentUser = null;
        this.currentTab = 'jobs';
        this.translations = {
            en: {
                jobs_freelance: "Jobs & Freelance",
                jobs_subtitle: "Find your dream job or hire talented freelancers in Limbe",
                admin_controls: "Administrative Controls",
                add_job: "Add Job",
                manage_freelancers: "Manage Freelancers",
                analytics: "Analytics",
                jobs: "Jobs",
                freelancers: "Freelancers",
                post_job: "Post Job",
                search_jobs: "Search Jobs",
                salary_range: "Salary Range (XAF)",
                all_salaries: "All Salaries",
                location: "Location",
                all_locations: "All Locations",
                experience_level: "Experience Level",
                all_levels: "All Levels",
                all_types: "All Types",
                full_time: "Full Time",
                part_time: "Part Time",
                freelance: "Freelance",
                contract: "Contract",
                applications: "Applications",
                back: "Back",
                apply_now: "Apply Now",
                view_details: "View Details",
                contact: "Contact",
                hire: "Hire",
                suggest_job: "Suggest a Job Opening",
                post_new_job: "Post a New Job",
                job_title: "Job Title",
                company_name: "Company Name",
                job_type: "Job Type",
                salary: "Salary (XAF)",
                job_description: "Job Description",
                requirements: "Requirements",
                contact_email: "Contact Email",
                contact_phone: "Contact Phone",
                submit_job: "Submit Job Post",
                cancel: "Cancel",
                save_job: "Save Job",
                edit: "Edit",
                delete: "Delete",
                per_month: "per month",
                per_hour: "per hour",
                years_experience: "years experience",
                projects_completed: "projects completed",
                client_rating: "client rating",
                available: "Available",
                busy: "Busy",
                offline: "Offline"
            },
            fr: {
                jobs_freelance: "Emplois & Freelance",
                jobs_subtitle: "Trouvez votre emploi de rêve ou embauchez des freelancers talentueux à Limbé",
                admin_controls: "Contrôles Administratifs",
                add_job: "Ajouter Emploi",
                manage_freelancers: "Gérer Freelancers",
                analytics: "Analytiques",
                jobs: "Emplois",
                freelancers: "Freelancers",
                post_job: "Publier Emploi",
                search_jobs: "Rechercher Emplois",
                salary_range: "Gamme de Salaire (XAF)",
                all_salaries: "Tous Salaires",
                location: "Localisation",
                all_locations: "Toutes Localisations",
                experience_level: "Niveau d'Expérience",
                all_levels: "Tous Niveaux",
                all_types: "Tous Types",
                full_time: "Temps Plein",
                part_time: "Temps Partiel",
                freelance: "Freelance",
                contract: "Contrat",
                applications: "Candidatures",
                back: "Retour",
                apply_now: "Postuler Maintenant",
                view_details: "Voir Détails",
                contact: "Contacter",
                hire: "Embaucher",
                suggest_job: "Suggérer une Offre d'Emploi",
                post_new_job: "Publier un Nouvel Emploi",
                job_title: "Titre du Poste",
                company_name: "Nom de l'Entreprise",
                job_type: "Type d'Emploi",
                salary: "Salaire (XAF)",
                job_description: "Description du Poste",
                requirements: "Exigences",
                contact_email: "Email de Contact",
                contact_phone: "Téléphone de Contact",
                submit_job: "Soumettre Offre d'Emploi",
                cancel: "Annuler",
                save_job: "Sauvegarder Emploi",
                edit: "Modifier",
                delete: "Supprimer",
                per_month: "par mois",
                per_hour: "par heure",
                years_experience: "années d'expérience",
                projects_completed: "projets terminés",
                client_rating: "note client",
                available: "Disponible",
                busy: "Occupé",
                offline: "Hors ligne"
            }
        };
        this.init();
    }

    async init() {
        await this.checkUserRole();
        await this.loadJobs();
        await this.loadFreelancers();
        this.setupEventListeners();
        this.updateApplicationsCount();
        this.translatePage();
    }

    async checkUserRole() {
        try {
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

    async loadJobs() {
        try {
            // Sample jobs data - in real app, load from database
            this.jobs = [
                {
                    id: 1,
                    title: 'Frontend Developer',
                    title_fr: 'Développeur Frontend',
                    company: 'Tech Solutions Limbe',
                    location: 'Limbe',
                    type: 'full-time',
                    salary: 250000,
                    salary_type: 'monthly',
                    experience_level: 'mid',
                    description: 'We are looking for a skilled Frontend Developer to join our growing team...',
                    description_fr: 'Nous recherchons un développeur frontend qualifié pour rejoindre notre équipe...',
                    requirements: ['3+ years React experience', 'JavaScript proficiency', 'CSS/HTML expertise'],
                    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
                    contact_email: 'hr@techsolutions.cm',
                    contact_phone: '+237 678 123 456',
                    posted_date: new Date('2024-01-15'),
                    urgency: false,
                    company_logo: 'https://via.placeholder.com/50x50/007bff/white?text=TS',
                    applications_count: 12,
                    is_active: true
                },
                {
                    id: 2,
                    title: 'Marketing Specialist',
                    title_fr: 'Spécialiste Marketing',
                    company: 'Limbe Tourism Board',
                    location: 'Limbe',
                    type: 'part-time',
                    salary: 150000,
                    salary_type: 'monthly',
                    experience_level: 'entry',
                    description: 'Join our marketing team to promote Limbe tourism and local businesses...',
                    description_fr: 'Rejoignez notre équipe marketing pour promouvoir le tourisme de Limbé...',
                    requirements: ['Marketing degree preferred', 'Social media experience', 'Creative thinking'],
                    skills: ['Social Media', 'Content Creation', 'Analytics', 'Photography'],
                    contact_email: 'marketing@limbe-tourism.cm',
                    contact_phone: '+237 679 234 567',
                    posted_date: new Date('2024-01-20'),
                    urgency: true,
                    company_logo: 'https://via.placeholder.com/50x50/28a745/white?text=LT',
                    applications_count: 8,
                    is_active: true
                },
                {
                    id: 3,
                    title: 'Graphic Designer',
                    title_fr: 'Graphiste',
                    company: 'Creative Agency',
                    location: 'Remote',
                    type: 'freelance',
                    salary: 5000,
                    salary_type: 'hourly',
                    experience_level: 'mid',
                    description: 'Looking for a creative graphic designer for various projects...',
                    description_fr: 'Recherche d\'un graphiste créatif pour divers projets...',
                    requirements: ['Adobe Creative Suite', 'Portfolio required', 'Deadline oriented'],
                    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding', 'Web Design'],
                    contact_email: 'projects@creative-agency.cm',
                    contact_phone: '+237 680 345 678',
                    posted_date: new Date('2024-01-25'),
                    urgency: false,
                    company_logo: 'https://via.placeholder.com/50x50/ffc107/black?text=CA',
                    applications_count: 15,
                    is_active: true
                }
            ];

            this.filteredJobs = [...this.jobs];
            this.renderJobs();
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    }

    async loadFreelancers() {
        try {
            // Sample freelancers data
            this.freelancers = [
                {
                    id: 1,
                    name: 'John Doe',
                    title: 'Full Stack Developer',
                    title_fr: 'Développeur Full Stack',
                    location: 'Limbe',
                    hourly_rate: 8000,
                    rating: 4.9,
                    reviews_count: 23,
                    experience_years: 5,
                    projects_completed: 47,
                    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
                    description: 'Experienced full stack developer specializing in modern web applications...',
                    description_fr: 'Développeur full stack expérimenté spécialisé dans les applications web modernes...',
                    portfolio_url: 'https://johndoe-portfolio.com',
                    availability: 'available',
                    avatar: 'https://via.placeholder.com/60x60/007bff/white?text=JD',
                    languages: ['English', 'French'],
                    contact_email: 'john.doe@email.com',
                    contact_phone: '+237 678 111 222',
                    is_verified: true
                },
                {
                    id: 2,
                    name: 'Marie Tabi',
                    title: 'Graphic Designer',
                    title_fr: 'Graphiste',
                    location: 'Douala',
                    hourly_rate: 4500,
                    rating: 4.7,
                    reviews_count: 18,
                    experience_years: 3,
                    projects_completed: 32,
                    skills: ['Photoshop', 'Illustrator', 'Branding', 'UI/UX', 'Web Design'],
                    description: 'Creative graphic designer with a passion for beautiful and functional designs...',
                    description_fr: 'Graphiste créative avec une passion pour les designs beaux et fonctionnels...',
                    portfolio_url: 'https://marie-design.com',
                    availability: 'busy',
                    avatar: 'https://via.placeholder.com/60x60/28a745/white?text=MT',
                    languages: ['French', 'English'],
                    contact_email: 'marie.tabi@email.com',
                    contact_phone: '+237 679 333 444',
                    is_verified: true
                },
                {
                    id: 3,
                    name: 'Paul Ngome',
                    title: 'Digital Marketer',
                    title_fr: 'Marketeur Digital',
                    location: 'Buea',
                    hourly_rate: 3500,
                    rating: 4.6,
                    reviews_count: 14,
                    experience_years: 2,
                    projects_completed: 26,
                    skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics', 'Content Marketing'],
                    description: 'Digital marketing specialist helping businesses grow their online presence...',
                    description_fr: 'Spécialiste en marketing digital aidant les entreprises à développer leur présence en ligne...',
                    portfolio_url: 'https://paul-marketing.com',
                    availability: 'available',
                    avatar: 'https://via.placeholder.com/60x60/ffc107/black?text=PN',
                    languages: ['English', 'French'],
                    contact_email: 'paul.ngome@email.com',
                    contact_phone: '+237 680 555 666',
                    is_verified: false
                }
            ];

            this.filteredFreelancers = [...this.freelancers];
            this.renderFreelancers();
        } catch (error) {
            console.error('Error loading freelancers:', error);
        }
    }

    renderJobs() {
        const container = document.getElementById('jobsContainer');
        
        if (this.filteredJobs.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-search"></i>
                        <h5 data-translate="no_jobs">No jobs found</h5>
                        <p data-translate="try_different_search">Try adjusting your search or filters</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredJobs.map(job => `
            <div class="col-lg-6 col-xl-4 mb-4">
                <div class="card job-card h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="d-flex align-items-center">
                                <img src="${job.company_logo}" class="company-logo me-3" alt="${job.company}">
                                <div>
                                    <h6 class="mb-0">${job.company}</h6>
                                    <small class="text-muted">${job.location}</small>
                                </div>
                            </div>
                            ${job.urgency ? '<span class="urgency-badge">URGENT</span>' : ''}
                            ${this.isAdmin ? `
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" onclick="jobsMarketplace.editJob(${job.id})">
                                            <i class="fas fa-edit"></i> ${this.translate('edit')}
                                        </a></li>
                                        <li><a class="dropdown-item text-danger" onclick="jobsMarketplace.deleteJob(${job.id})">
                                            <i class="fas fa-trash"></i> ${this.translate('delete')}
                                        </a></li>
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                        
                        <h5 class="card-title">${this.currentLanguage === 'fr' ? job.title_fr : job.title}</h5>
                        
                        <div class="mb-2">
                            <span class="job-type-badge ${job.type}">${this.translate(job.type.replace('-', '_'))}</span>
                        </div>
                        
                        <div class="salary-tag mb-3">
                            ${job.salary.toLocaleString()} XAF
                            <small class="text-muted">/${this.translate(job.salary_type === 'monthly' ? 'per_month' : 'per_hour')}</small>
                        </div>
                        
                        <p class="card-text small flex-grow-1">
                            ${(this.currentLanguage === 'fr' ? job.description_fr : job.description).substring(0, 100)}...
                        </p>
                        
                        <div class="skills-list mb-3">
                            ${job.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            ${job.skills.length > 3 ? `<span class="skill-tag">+${job.skills.length - 3}</span>` : ''}
                        </div>
                        
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted">
                                    <i class="fas fa-users"></i> ${job.applications_count} applicants
                                </small>
                                <small class="text-muted">
                                    ${this.timeAgo(job.posted_date)}
                                </small>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-primary btn-sm flex-fill" 
                                        onclick="jobsMarketplace.showJobDetails(${job.id})">
                                    <i class="fas fa-info-circle"></i> <span data-translate="view_details">Details</span>
                                </button>
                                <button class="btn btn-primary btn-sm flex-fill" 
                                        onclick="jobsMarketplace.applyForJob(${job.id})">
                                    <i class="fas fa-paper-plane"></i> <span data-translate="apply_now">Apply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderFreelancers() {
        const container = document.getElementById('freelancersContainer');
        
        if (this.filteredFreelancers.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-search"></i>
                        <h5>No freelancers found</h5>
                        <p>Try adjusting your search or filters</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredFreelancers.map(freelancer => `
            <div class="col-lg-6 col-xl-4 mb-4">
                <div class="card freelancer-card h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${freelancer.avatar}" class="freelancer-avatar me-3" alt="${freelancer.name}">
                            <div class="flex-grow-1">
                                <h6 class="mb-0">${freelancer.name}</h6>
                                <small class="text-muted">${this.currentLanguage === 'fr' ? freelancer.title_fr : freelancer.title}</small>
                                <div class="d-flex align-items-center mt-1">
                                    <div class="rating-stars me-2">
                                        ${'★'.repeat(Math.floor(freelancer.rating))}${'☆'.repeat(5-Math.floor(freelancer.rating))}
                                    </div>
                                    <small class="text-muted">${freelancer.rating} (${freelancer.reviews_count})</small>
                                </div>
                            </div>
                            <div class="text-end">
                                <div class="fw-bold text-success">${freelancer.hourly_rate.toLocaleString()} XAF/hr</div>
                                <small class="badge ${freelancer.availability === 'available' ? 'bg-success' : freelancer.availability === 'busy' ? 'bg-warning' : 'bg-secondary'}">
                                    ${this.translate(freelancer.availability)}
                                </small>
                            </div>
                        </div>
                        
                        <p class="card-text small flex-grow-1">
                            ${(this.currentLanguage === 'fr' ? freelancer.description_fr : freelancer.description).substring(0, 100)}...
                        </p>
                        
                        <div class="skills-list mb-3">
                            ${freelancer.skills.slice(0, 4).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            ${freelancer.skills.length > 4 ? `<span class="skill-tag">+${freelancer.skills.length - 4}</span>` : ''}
                        </div>
                        
                        <div class="row text-center mb-3">
                            <div class="col-4">
                                <div class="fw-bold">${freelancer.experience_years}</div>
                                <small class="text-muted" data-translate="years_experience">Years</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold">${freelancer.projects_completed}</div>
                                <small class="text-muted" data-translate="projects_completed">Projects</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold">${freelancer.rating}</div>
                                <small class="text-muted" data-translate="client_rating">Rating</small>
                            </div>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm flex-fill" 
                                    onclick="jobsMarketplace.showFreelancerDetails(${freelancer.id})">
                                <i class="fas fa-user"></i> <span data-translate="view_details">Profile</span>
                            </button>
                            <button class="btn btn-success btn-sm flex-fill" 
                                    onclick="jobsMarketplace.contactFreelancer(${freelancer.id})">
                                <i class="fas fa-handshake"></i> <span data-translate="hire">Hire</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').style.display = 'block';
        event.target.classList.add('active');
        
        this.currentTab = tabName;
    }

    filterJobs() {
        const searchTerm = document.getElementById('jobSearchInput').value.toLowerCase();
        const salaryRange = document.getElementById('salaryFilter').value;
        const location = document.getElementById('jobLocationFilter').value;
        const experience = document.getElementById('experienceFilter').value;

        let filtered = [...this.jobs];

        if (searchTerm) {
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
            );
        }

        if (salaryRange) {
            if (salaryRange === '500000+') {
                filtered = filtered.filter(job => job.salary >= 500000);
            } else {
                const [min, max] = salaryRange.split('-').map(Number);
                filtered = filtered.filter(job => job.salary >= min && job.salary <= max);
            }
        }

        if (location) {
            filtered = filtered.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
        }

        if (experience) {
            filtered = filtered.filter(job => job.experience_level === experience);
        }

        this.filteredJobs = filtered;
        this.renderJobs();
    }

    filterByJobType(type) {
        document.querySelectorAll('#jobTypeFilters .type-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`).classList.add('active');

        if (type) {
            this.filteredJobs = this.jobs.filter(job => job.type === type);
        } else {
            this.filteredJobs = [...this.jobs];
        }
        this.renderJobs();
    }

    filterFreelancers() {
        const searchTerm = document.getElementById('freelancerSearchInput').value.toLowerCase();
        const rateRange = document.getElementById('rateFilter').value;
        const minRating = document.getElementById('ratingFilter').value;

        let filtered = [...this.freelancers];

        if (searchTerm) {
            filtered = filtered.filter(freelancer => 
                freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                freelancer.name.toLowerCase().includes(searchTerm) ||
                freelancer.title.toLowerCase().includes(searchTerm)
            );
        }

        if (rateRange) {
            if (rateRange === '10000+') {
                filtered = filtered.filter(freelancer => freelancer.hourly_rate >= 10000);
            } else {
                const [min, max] = rateRange.split('-').map(Number);
                filtered = filtered.filter(freelancer => freelancer.hourly_rate >= min && freelancer.hourly_rate <= max);
            }
        }

        if (minRating) {
            filtered = filtered.filter(freelancer => freelancer.rating >= parseFloat(minRating));
        }

        this.filteredFreelancers = filtered;
        this.renderFreelancers();
    }

    showJobDetails(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        const modal = new bootstrap.Modal(document.getElementById('jobDetailModal'));
        document.getElementById('jobDetailTitle').textContent = this.currentLanguage === 'fr' ? job.title_fr : job.title;
        
        document.getElementById('jobDetailContent').innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${job.company_logo}" class="company-logo me-3" alt="${job.company}">
                        <div>
                            <h6 class="mb-0">${job.company}</h6>
                            <small class="text-muted">${job.location}</small>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <span class="job-type-badge ${job.type}">${this.translate(job.type.replace('-', '_'))}</span>
                        ${job.urgency ? '<span class="urgency-badge ms-2">URGENT</span>' : ''}
                    </div>
                    
                    <div class="salary-tag mb-4">
                        ${job.salary.toLocaleString()} XAF
                        <small class="text-muted">/${this.translate(job.salary_type === 'monthly' ? 'per_month' : 'per_hour')}</small>
                    </div>
                    
                    <h6>Job Description:</h6>
                    <p>${this.currentLanguage === 'fr' ? job.description_fr : job.description}</p>
                    
                    <h6>Requirements:</h6>
                    <ul>
                        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                    
                    <h6>Required Skills:</h6>
                    <div class="skills-list mb-4">
                        ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Job Information</h6>
                        </div>
                        <div class="card-body">
                            <p><strong>Experience Level:</strong> ${job.experience_level}</p>
                            <p><strong>Posted:</strong> ${this.timeAgo(job.posted_date)}</p>
                            <p><strong>Applications:</strong> ${job.applications_count}</p>
                            
                            <h6 class="mt-4">Contact Information:</h6>
                            <p><i class="fas fa-envelope"></i> ${job.contact_email}</p>
                            <p><i class="fas fa-phone"></i> ${job.contact_phone}</p>
                            
                            <button class="btn btn-primary w-100 mt-3" onclick="jobsMarketplace.applyForJob(${job.id})">
                                <i class="fas fa-paper-plane"></i> Apply for this Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }

    showFreelancerDetails(freelancerId) {
        const freelancer = this.freelancers.find(f => f.id === freelancerId);
        if (!freelancer) return;

        const modal = new bootstrap.Modal(document.getElementById('freelancerDetailModal'));
        document.getElementById('freelancerDetailTitle').textContent = freelancer.name;
        
        document.getElementById('freelancerDetailContent').innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex align-items-center mb-4">
                        <img src="${freelancer.avatar}" class="freelancer-avatar me-3" alt="${freelancer.name}">
                        <div>
                            <h5 class="mb-0">${freelancer.name}</h5>
                            <p class="text-muted mb-0">${this.currentLanguage === 'fr' ? freelancer.title_fr : freelancer.title}</p>
                            <div class="d-flex align-items-center mt-2">
                                <div class="rating-stars me-2">
                                    ${'★'.repeat(Math.floor(freelancer.rating))}${'☆'.repeat(5-Math.floor(freelancer.rating))}
                                </div>
                                <span>${freelancer.rating} (${freelancer.reviews_count} reviews)</span>
                            </div>
                        </div>
                    </div>
                    
                    <h6>About:</h6>
                    <p>${this.currentLanguage === 'fr' ? freelancer.description_fr : freelancer.description}</p>
                    
                    <h6>Skills & Expertise:</h6>
                    <div class="skills-list mb-4">
                        ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    
                    <h6>Languages:</h6>
                    <p>${freelancer.languages.join(', ')}</p>
                    
                    ${freelancer.portfolio_url ? `
                        <h6>Portfolio:</h6>
                        <p><a href="${freelancer.portfolio_url}" target="_blank" class="btn btn-outline-primary">
                            <i class="fas fa-external-link-alt"></i> View Portfolio
                        </a></p>
                    ` : ''}
                </div>
                
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Freelancer Stats</h6>
                        </div>
                        <div class="card-body">
                            <p><strong>Hourly Rate:</strong> ${freelancer.hourly_rate.toLocaleString()} XAF/hr</p>
                            <p><strong>Experience:</strong> ${freelancer.experience_years} years</p>
                            <p><strong>Projects Completed:</strong> ${freelancer.projects_completed}</p>
                            <p><strong>Location:</strong> ${freelancer.location}</p>
                            <p><strong>Availability:</strong> 
                                <span class="badge ${freelancer.availability === 'available' ? 'bg-success' : freelancer.availability === 'busy' ? 'bg-warning' : 'bg-secondary'}">
                                    ${this.translate(freelancer.availability)}
                                </span>
                            </p>
                            
                            <h6 class="mt-4">Contact:</h6>
                            <p><i class="fas fa-envelope"></i> ${freelancer.contact_email}</p>
                            <p><i class="fas fa-phone"></i> ${freelancer.contact_phone}</p>
                            
                            <button class="btn btn-success w-100 mt-3" onclick="jobsMarketplace.contactFreelancer(${freelancer.id})">
                                <i class="fas fa-handshake"></i> Hire This Freelancer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }

    applyForJob(jobId) {
        if (!this.currentUser) {
            alert('Please log in to apply for jobs');
            return;
        }

        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        // Check if already applied
        if (this.myApplications.some(app => app.jobId === jobId)) {
            alert('You have already applied for this job');
            return;
        }

        // Add to applications
        const application = {
            id: Date.now(),
            jobId: jobId,
            jobTitle: job.title,
            company: job.company,
            appliedDate: new Date(),
            status: 'pending'
        };

        this.myApplications.push(application);
        localStorage.setItem('job_applications', JSON.stringify(this.myApplications));
        
        // Update job applications count
        job.applications_count++;
        
        this.updateApplicationsCount();
        this.renderJobs();
        
        alert(`Application submitted for ${job.title} at ${job.company}!`);
    }

    contactFreelancer(freelancerId) {
        const freelancer = this.freelancers.find(f => f.id === freelancerId);
        if (!freelancer) return;

        alert(`Contact ${freelancer.name}:\nEmail: ${freelancer.contact_email}\nPhone: ${freelancer.contact_phone}`);
    }

    submitJobPost() {
        const jobData = {
            id: Date.now(),
            title: document.getElementById('postJobTitle').value,
            company: document.getElementById('postCompanyName').value,
            type: document.getElementById('postJobType').value,
            salary: parseInt(document.getElementById('postSalary').value),
            location: document.getElementById('postLocation').value,
            description: document.getElementById('postJobDescription').value,
            requirements: document.getElementById('postRequirements').value.split('\n').filter(r => r.trim()),
            contact_email: document.getElementById('postContactEmail').value,
            contact_phone: document.getElementById('postContactPhone').value,
            posted_date: new Date(),
            applications_count: 0,
            is_active: !this.isAdmin, // Admin posts are active immediately
            status: this.isAdmin ? 'approved' : 'pending'
        };

        if (this.isAdmin) {
            this.jobs.push(jobData);
            this.filteredJobs = [...this.jobs];
            this.renderJobs();
            alert('Job posted successfully!');
        } else {
            alert('Job submitted for admin review. You will be notified once approved.');
        }

        document.getElementById('postJobForm').reset();
    }

    showMyApplications() {
        if (this.myApplications.length === 0) {
            alert('You have not applied for any jobs yet.');
            return;
        }

        const applicationsList = this.myApplications.map(app => `
            <div class="border-bottom py-2">
                <strong>${app.jobTitle}</strong> at ${app.company}<br>
                <small class="text-muted">Applied: ${app.appliedDate.toLocaleDateString()}</small>
                <span class="badge bg-warning ms-2">${app.status}</span>
            </div>
        `).join('');

        alert(`Your Applications:\n\n${applicationsList}`);
    }

    updateApplicationsCount() {
        document.getElementById('applicationsCount').textContent = this.myApplications.length;
    }

    // Admin Functions
    showAddJobModal() {
        if (!this.isAdmin) return;
        // Implementation for admin job modal
        alert('Admin job management modal would open here');
    }

    showManageFreelancersModal() {
        if (!this.isAdmin) return;
        alert('Admin freelancer management modal would open here');
    }

    showAnalytics() {
        if (!this.isAdmin) return;
        
        const totalJobs = this.jobs.length;
        const activeJobs = this.jobs.filter(job => job.is_active).length;
        const totalFreelancers = this.freelancers.length;
        const totalApplications = this.jobs.reduce((sum, job) => sum + job.applications_count, 0);

        alert(`Jobs & Freelance Analytics:\n\nTotal Jobs: ${totalJobs}\nActive Jobs: ${activeJobs}\nTotal Freelancers: ${totalFreelancers}\nTotal Applications: ${totalApplications}`);
    }

    timeAgo(date) {
        const now = new Date();
        const diffTime = Math.abs(now - new Date(date));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
        document.getElementById('currentLang').textContent = this.currentLanguage.toUpperCase();
        this.translatePage();
        this.renderJobs();
        this.renderFreelancers();
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
        document.getElementById('jobSearchInput')?.addEventListener('input', () => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => this.filterJobs(), 300);
        });

        document.getElementById('freelancerSearchInput')?.addEventListener('input', () => {
            clearTimeout(this.freelancerSearchTimeout);
            this.freelancerSearchTimeout = setTimeout(() => this.filterFreelancers(), 300);
        });
    }
}

// Initialize the jobs marketplace
let jobsMarketplace;
document.addEventListener('DOMContentLoaded', () => {
    jobsMarketplace = new JobsMarketplace();
});
