class SupportCenter {
    constructor() {
        this.tickets = [];
        this.faqs = [];
        this.liveChats = [];
        this.currentLanguage = 'en';
        this.userRole = localStorage.getItem('userRole') || 'user';
        this.currentChat = null;
        
        this.translations = {
            en: {
                back: "Back",
                support_center: "Support Center",
                support_subtitle: "Get help and support for your Visit Limbe experience",
                admin_controls: "Administrative Controls",
                manage_tickets: "Manage Tickets",
                manage_faqs: "Manage FAQs",
                live_chat_admin: "Live Chat Admin",
                analytics: "Analytics",
                submit_ticket: "Submit Ticket",
                live_chat: "Live Chat",
                browse_faqs: "Browse FAQs",
                call_support: "Call Support",
                email_support: "Email Support",
                community_forum: "Community Forum",
                how_can_help: "How can we help you today?",
                choose_support: "Choose your preferred support method:",
                support_ticket: "Support Ticket",
                ticket_subject: "Subject",
                ticket_description: "Description",
                ticket_category: "Category",
                ticket_priority: "Priority",
                your_name: "Your Name",
                your_email: "Your Email",
                submit: "Submit",
                cancel: "Cancel",
                chat_with_agent: "Chat with an Agent",
                start_chat: "Start Chat",
                type_message: "Type your message...",
                send: "Send",
                agent_offline: "All agents are currently offline",
                frequently_asked: "Frequently Asked Questions",
                search_faqs: "Search FAQs...",
                no_faqs_found: "No FAQs found",
                loading: "Loading...",
                ticket_submitted: "Ticket submitted successfully!",
                chat_started: "Chat started successfully!",
                message_sent: "Message sent!",
                error_occurred: "An error occurred. Please try again.",
                ticket_status_open: "Open",
                ticket_status_in_progress: "In Progress",
                ticket_status_resolved: "Resolved",
                ticket_status_closed: "Closed",
                priority_low: "Low",
                priority_medium: "Medium",
                priority_high: "High",
                priority_urgent: "Urgent",
                category_technical: "Technical Issue",
                category_billing: "Billing",
                category_general: "General Inquiry",
                category_booking: "Booking Support",
                category_account: "Account Issue",
                view_details: "View Details",
                close_ticket: "Close Ticket",
                reopen_ticket: "Reopen Ticket",
                add_comment: "Add Comment",
                assign_agent: "Assign Agent",
                change_priority: "Change Priority",
                ticket_created: "Ticket Created",
                last_updated: "Last Updated",
                assigned_to: "Assigned To",
                ticket_id: "Ticket ID",
                customer_info: "Customer Information",
                ticket_history: "Ticket History",
                add_faq: "Add FAQ",
                edit_faq: "Edit FAQ",
                delete_faq: "Delete FAQ",
                faq_question: "Question",
                faq_answer: "Answer",
                faq_category: "Category",
                save_faq: "Save FAQ",
                confirm_delete: "Are you sure you want to delete this item?",
                deleted_successfully: "Item deleted successfully!",
                saved_successfully: "Item saved successfully!",
                chat_ended: "Chat ended",
                agent_joined: "Agent joined the chat",
                no_tickets_found: "No tickets found",
                total_tickets: "Total Tickets",
                open_tickets: "Open Tickets",
                resolved_tickets: "Resolved Tickets",
                avg_response_time: "Avg Response Time",
                satisfaction_rating: "Satisfaction Rating",
                contact_phone: "+237 233 32 10 15",
                contact_email: "support@visitlimbe.com",
                business_hours: "Business Hours: Mon-Fri 8AM-6PM",
                emergency_contact: "Emergency: +237 690 123 456"
            },
            fr: {
                back: "Retour",
                support_center: "Centre de Support",
                support_subtitle: "Obtenez de l'aide et du support pour votre expérience Visit Limbe",
                admin_controls: "Contrôles Administratifs",
                manage_tickets: "Gérer Tickets",
                manage_faqs: "Gérer FAQ",
                live_chat_admin: "Admin Chat en Direct",
                analytics: "Analytiques",
                submit_ticket: "Soumettre Ticket",
                live_chat: "Chat en Direct",
                browse_faqs: "Parcourir FAQ",
                call_support: "Appeler Support",
                email_support: "Email Support",
                community_forum: "Forum Communauté",
                how_can_help: "Comment pouvons-nous vous aider aujourd'hui ?",
                choose_support: "Choisissez votre méthode de support préférée :",
                support_ticket: "Ticket de Support",
                ticket_subject: "Sujet",
                ticket_description: "Description",
                ticket_category: "Catégorie",
                ticket_priority: "Priorité",
                your_name: "Votre Nom",
                your_email: "Votre Email",
                submit: "Soumettre",
                cancel: "Annuler",
                chat_with_agent: "Chatter avec un Agent",
                start_chat: "Démarrer Chat",
                type_message: "Tapez votre message...",
                send: "Envoyer",
                agent_offline: "Tous les agents sont actuellement hors ligne",
                frequently_asked: "Questions Fréquemment Posées",
                search_faqs: "Rechercher FAQ...",
                no_faqs_found: "Aucune FAQ trouvée",
                loading: "Chargement...",
                ticket_submitted: "Ticket soumis avec succès !",
                chat_started: "Chat démarré avec succès !",
                message_sent: "Message envoyé !",
                error_occurred: "Une erreur s'est produite. Veuillez réessayer.",
                ticket_status_open: "Ouvert",
                ticket_status_in_progress: "En Cours",
                ticket_status_resolved: "Résolu",
                ticket_status_closed: "Fermé",
                priority_low: "Bas",
                priority_medium: "Moyen",
                priority_high: "Haut",
                priority_urgent: "Urgent",
                category_technical: "Problème Technique",
                category_billing: "Facturation",
                category_general: "Demande Générale",
                category_booking: "Support Réservation",
                category_account: "Problème de Compte",
                view_details: "Voir Détails",
                close_ticket: "Fermer Ticket",
                reopen_ticket: "Rouvrir Ticket",
                add_comment: "Ajouter Commentaire",
                assign_agent: "Assigner Agent",
                change_priority: "Changer Priorité",
                ticket_created: "Ticket Créé",
                last_updated: "Dernière Mise à Jour",
                assigned_to: "Assigné à",
                ticket_id: "ID Ticket",
                customer_info: "Informations Client",
                ticket_history: "Historique Ticket",
                add_faq: "Ajouter FAQ",
                edit_faq: "Modifier FAQ",
                delete_faq: "Supprimer FAQ",
                faq_question: "Question",
                faq_answer: "Réponse",
                faq_category: "Catégorie",
                save_faq: "Sauvegarder FAQ",
                confirm_delete: "Êtes-vous sûr de vouloir supprimer cet élément ?",
                deleted_successfully: "Élément supprimé avec succès !",
                saved_successfully: "Élément sauvegardé avec succès !",
                chat_ended: "Chat terminé",
                agent_joined: "Agent a rejoint le chat",
                no_tickets_found: "Aucun ticket trouvé",
                total_tickets: "Total Tickets",
                open_tickets: "Tickets Ouverts",
                resolved_tickets: "Tickets Résolus",
                avg_response_time: "Temps de Réponse Moyen",
                satisfaction_rating: "Note de Satisfaction",
                contact_phone: "+237 233 32 10 15",
                contact_email: "support@visitlimbe.com",
                business_hours: "Heures d'Ouverture: Lun-Ven 8H-18H",
                emergency_contact: "Urgence: +237 690 123 456"
            }
        };

        this.init();
    }

    init() {
        this.loadTickets();
        this.loadFAQs();
        this.updateUserInterface();
        this.updateLanguage();
        this.renderSupportOptions();
        this.renderFAQs();
    }

    loadTickets() {
        // Sample tickets data
        const sampleTickets = [
            {
                id: 1,
                subject: "Unable to make hotel booking",
                description: "I'm trying to book a hotel but the payment process keeps failing",
                category: "booking",
                priority: "high",
                status: "open",
                customerName: "John Doe",
                customerEmail: "john@example.com",
                createdDate: "2024-02-01T10:30:00Z",
                lastUpdated: "2024-02-01T10:30:00Z",
                assignedAgent: null,
                comments: []
            },
            {
                id: 2,
                subject: "Account login issues",
                description: "I can't log into my account. Keep getting 'invalid credentials' error",
                category: "account",
                priority: "medium",
                status: "in_progress",
                customerName: "Jane Smith",
                customerEmail: "jane@example.com",
                createdDate: "2024-01-30T14:15:00Z",
                lastUpdated: "2024-02-01T09:20:00Z",
                assignedAgent: "Agent Mike",
                comments: [
                    {
                        id: 1,
                        author: "Agent Mike",
                        message: "I've reset your password. Please try logging in again.",
                        timestamp: "2024-02-01T09:20:00Z"
                    }
                ]
            }
        ];

        this.tickets = JSON.parse(localStorage.getItem('supportTickets')) || sampleTickets;
        
        if (!localStorage.getItem('supportTickets')) {
            localStorage.setItem('supportTickets', JSON.stringify(sampleTickets));
        }
    }

    loadFAQs() {
        // Sample FAQs data
        const sampleFAQs = [
            {
                id: 1,
                question: "How do I make a hotel booking?",
                questionFr: "Comment faire une réservation d'hôtel ?",
                answer: "To make a hotel booking, go to the Hotels section, browse available hotels, select your dates, and follow the booking process.",
                answerFr: "Pour faire une réservation d'hôtel, allez dans la section Hôtels, parcourez les hôtels disponibles, sélectionnez vos dates et suivez le processus de réservation.",
                category: "booking",
                views: 245,
                helpful: 42
            },
            {
                id: 2,
                question: "What payment methods are accepted?",
                questionFr: "Quels moyens de paiement sont acceptés ?",
                answer: "We accept Mobile Money (MTN, Orange), Visa, Mastercard, and bank transfers.",
                answerFr: "Nous acceptons Mobile Money (MTN, Orange), Visa, Mastercard et virements bancaires.",
                category: "billing",
                views: 189,
                helpful: 38
            },
            {
                id: 3,
                question: "How do I cancel a booking?",
                questionFr: "Comment annuler une réservation ?",
                answer: "You can cancel your booking by going to 'My Bookings' and clicking the cancel button. Cancellation policy applies.",
                answerFr: "Vous pouvez annuler votre réservation en allant dans 'Mes Réservations' et en cliquant sur le bouton d'annulation. La politique d'annulation s'applique.",
                category: "booking",
                views: 156,
                helpful: 29
            }
        ];

        this.faqs = JSON.parse(localStorage.getItem('supportFAQs')) || sampleFAQs;
        
        if (!localStorage.getItem('supportFAQs')) {
            localStorage.setItem('supportFAQs', JSON.stringify(sampleFAQs));
        }
    }

    updateUserInterface() {
        const userRoleElement = document.getElementById('userRole');
        const adminControls = document.getElementById('adminControls');

        if (this.userRole === 'admin') {
            userRoleElement.innerHTML = '<span class="badge bg-danger">Administrator</span>';
            adminControls.style.display = 'block';
        } else if (this.userRole === 'agent') {
            userRoleElement.innerHTML = '<span class="badge bg-info">Support Agent</span>';
            adminControls.style.display = 'block';
        } else {
            userRoleElement.innerHTML = '<span class="badge bg-success">User</span>';
        }
    }

    renderSupportOptions() {
        const container = document.getElementById('supportOptionsContainer');
        
        const supportOptions = [
            {
                icon: 'fas fa-ticket-alt',
                title: this.translate('submit_ticket'),
                description: 'Submit a support ticket for technical assistance',
                action: 'showSubmitTicketModal()',
                color: 'primary'
            },
            {
                icon: 'fas fa-comments',
                title: this.translate('live_chat'),
                description: 'Chat with our support agents in real-time',
                action: 'startLiveChat()',
                color: 'success'
            },
            {
                icon: 'fas fa-question-circle',
                title: this.translate('browse_faqs'),
                description: 'Find answers to frequently asked questions',
                action: 'showFAQSection()',
                color: 'info'
            },
            {
                icon: 'fas fa-phone',
                title: this.translate('call_support'),
                description: 'Call our support hotline for immediate help',
                action: 'callSupport()',
                color: 'warning'
            },
            {
                icon: 'fas fa-envelope',
                title: this.translate('email_support'),
                description: 'Send us an email for non-urgent matters',
                action: 'emailSupport()',
                color: 'secondary'
            },
            {
                icon: 'fas fa-users',
                title: this.translate('community_forum'),
                description: 'Join community discussions and get help',
                action: 'openCommunityForum()',
                color: 'dark'
            }
        ];

        container.innerHTML = supportOptions.map(option => `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card support-option-card h-100" onclick="supportCenter.${option.action}">
                    <div class="card-body text-center">
                        <div class="support-option-icon text-${option.color} mb-3">
                            <i class="${option.icon} fa-3x"></i>
                        </div>
                        <h5 class="card-title">${option.title}</h5>
                        <p class="card-text">${option.description}</p>
                        <button class="btn btn-${option.color} btn-sm">
                            ${option.title}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderFAQs() {
        const container = document.getElementById('faqContainer');
        const searchTerm = document.getElementById('faqSearchInput')?.value.toLowerCase() || '';
        
        const filteredFAQs = this.faqs.filter(faq => {
            const question = this.currentLanguage === 'fr' && faq.questionFr ? faq.questionFr : faq.question;
            const answer = this.currentLanguage === 'fr' && faq.answerFr ? faq.answerFr : faq.answer;
            return question.toLowerCase().includes(searchTerm) || 
                   answer.toLowerCase().includes(searchTerm) ||
                   faq.category.toLowerCase().includes(searchTerm);
        });

        if (filteredFAQs.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">${this.translate('no_faqs_found')}</h4>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredFAQs.map(faq => {
            const question = this.currentLanguage === 'fr' && faq.questionFr ? faq.questionFr : faq.question;
            const answer = this.currentLanguage === 'fr' && faq.answerFr ? faq.answerFr : faq.answer;
            
            return `
                <div class="faq-item">
                    <div class="faq-question" onclick="supportCenter.toggleFAQ(${faq.id})">
                        <h6>${question}</h6>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="faq-${faq.id}" style="display: none;">
                        <p>${answer}</p>
                        <div class="faq-meta">
                            <span class="badge bg-light text-dark">${this.translate('category_' + faq.category)}</span>
                            <small class="text-muted ms-2">${faq.views} views • ${faq.helpful} found helpful</small>
                            ${this.userRole === 'admin' ? 
                                `<div class="float-end">
                                    <button class="btn btn-sm btn-outline-primary" onclick="supportCenter.editFAQ(${faq.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="supportCenter.deleteFAQ(${faq.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>` : 
                                ''
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTickets() {
        const container = document.getElementById('ticketsContainer');
        const filteredTickets = this.getFilteredTickets();

        if (filteredTickets.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">${this.translate('no_tickets_found')}</h4>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredTickets.map(ticket => this.createTicketCard(ticket)).join('');
    }

    createTicketCard(ticket) {
        const createdDate = new Date(ticket.createdDate);
        const statusClass = this.getStatusClass(ticket.status);
        const priorityClass = this.getPriorityClass(ticket.priority);

        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card ticket-card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span class="badge bg-${statusClass}">${this.translate('ticket_status_' + ticket.status)}</span>
                        <span class="badge bg-${priorityClass}">${this.translate('priority_' + ticket.priority)}</span>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${ticket.subject}</h6>
                        <p class="card-text small text-muted">${ticket.description.substring(0, 100)}...</p>
                        <div class="ticket-meta">
                            <small class="text-muted">
                                <i class="fas fa-user"></i> ${ticket.customerName}<br>
                                <i class="fas fa-calendar"></i> ${createdDate.toLocaleDateString()}<br>
                                <i class="fas fa-tag"></i> ${this.translate('category_' + ticket.category)}
                            </small>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-primary" onclick="supportCenter.showTicketDetails(${ticket.id})">
                            ${this.translate('view_details')}
                        </button>
                        ${this.userRole === 'admin' || this.userRole === 'agent' ? 
                            `<button class="btn btn-sm btn-outline-secondary ms-2" onclick="supportCenter.assignTicket(${ticket.id})">
                                ${this.translate('assign_agent')}
                            </button>` : 
                            ''
                        }
                    </div>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusClasses = {
            'open': 'danger',
            'in_progress': 'warning',
            'resolved': 'success',
            'closed': 'secondary'
        };
        return statusClasses[status] || 'secondary';
    }

    getPriorityClass(priority) {
        const priorityClasses = {
            'low': 'secondary',
            'medium': 'info',
            'high': 'warning',
            'urgent': 'danger'
        };
        return priorityClasses[priority] || 'secondary';
    }

    getFilteredTickets() {
        let filtered = [...this.tickets];
        
        // Add filtering logic based on status, priority, etc.
        const statusFilter = document.getElementById('statusFilter')?.value;
        if (statusFilter) {
            filtered = filtered.filter(ticket => ticket.status === statusFilter);
        }

        const priorityFilter = document.getElementById('priorityFilter')?.value;
        if (priorityFilter) {
            filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
        }

        return filtered;
    }

    showSubmitTicketModal() {
        const modal = new bootstrap.Modal(document.getElementById('submitTicketModal'));
        document.getElementById('ticketForm').reset();
        modal.show();
    }

    submitTicket() {
        const form = document.getElementById('ticketForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const ticketData = {
            id: Date.now(),
            subject: document.getElementById('ticketSubject').value,
            description: document.getElementById('ticketDescription').value,
            category: document.getElementById('ticketCategory').value,
            priority: document.getElementById('ticketPriority').value,
            customerName: document.getElementById('customerName').value,
            customerEmail: document.getElementById('customerEmail').value,
            status: 'open',
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            assignedAgent: null,
            comments: []
        };

        this.tickets.push(ticketData);
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('submitTicketModal'));
        modal.hide();

        this.showNotification(this.translate('ticket_submitted'), 'success');
    }

    startLiveChat() {
        const modal = new bootstrap.Modal(document.getElementById('liveChatModal'));
        
        // Initialize chat
        this.currentChat = {
            id: Date.now(),
            customerName: 'Anonymous User',
            startTime: new Date().toISOString(),
            messages: [
                {
                    id: 1,
                    sender: 'system',
                    message: 'Welcome to Visit Limbe Support! How can we help you today?',
                    timestamp: new Date().toISOString()
                }
            ],
            status: 'active'
        };

        this.renderChatMessages();
        modal.show();
        
        // Focus on message input
        setTimeout(() => {
            document.getElementById('chatMessageInput').focus();
        }, 500);
    }

    renderChatMessages() {
        const container = document.getElementById('chatMessagesContainer');
        if (!this.currentChat) return;

        container.innerHTML = this.currentChat.messages.map(message => {
            const messageTime = new Date(message.timestamp).toLocaleTimeString();
            const isUser = message.sender === 'user';
            const isSystem = message.sender === 'system';
            
            return `
                <div class="chat-message ${isUser ? 'user-message' : isSystem ? 'system-message' : 'agent-message'}">
                    <div class="message-content">
                        <div class="message-text">${message.message}</div>
                        <div class="message-time">${messageTime}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    sendChatMessage() {
        const input = document.getElementById('chatMessageInput');
        const message = input.value.trim();
        
        if (!message || !this.currentChat) return;

        // Add user message
        this.currentChat.messages.push({
            id: Date.now(),
            sender: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });

        input.value = '';
        this.renderChatMessages();

        // Simulate agent response
        setTimeout(() => {
            this.simulateAgentResponse(message);
        }, 1000 + Math.random() * 2000);
    }

    simulateAgentResponse(userMessage) {
        if (!this.currentChat) return;

        const responses = [
            "Thank you for contacting us. Let me help you with that.",
            "I understand your concern. Let me check our records.",
            "That's a great question! Here's what I can tell you...",
            "I'd be happy to assist you with this issue.",
            "Let me connect you with the right department for this."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        this.currentChat.messages.push({
            id: Date.now(),
            sender: 'agent',
            message: response,
            timestamp: new Date().toISOString()
        });

        this.renderChatMessages();
    }

    showTicketDetails(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const modal = new bootstrap.Modal(document.getElementById('ticketDetailModal'));
        document.getElementById('ticketDetailTitle').textContent = `${this.translate('ticket_id')}: #${ticket.id}`;
        
        const createdDate = new Date(ticket.createdDate);
        const updatedDate = new Date(ticket.lastUpdated);
        
        const content = `
            <div class="row">
                <div class="col-md-8">
                    <h5>${ticket.subject}</h5>
                    <p class="text-muted">${ticket.description}</p>
                    
                    <div class="ticket-details">
                        <div class="row">
                            <div class="col-md-6">
                                <strong>${this.translate('ticket_created')}:</strong><br>
                                ${createdDate.toLocaleString()}
                            </div>
                            <div class="col-md-6">
                                <strong>${this.translate('last_updated')}:</strong><br>
                                ${updatedDate.toLocaleString()}
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <strong>${this.translate('assigned_to')}:</strong><br>
                                ${ticket.assignedAgent || 'Unassigned'}
                            </div>
                            <div class="col-md-6">
                                <strong>Status:</strong><br>
                                <span class="badge bg-${this.getStatusClass(ticket.status)}">
                                    ${this.translate('ticket_status_' + ticket.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h6>${this.translate('ticket_history')}</h6>
                        <div class="ticket-comments">
                            ${ticket.comments.map(comment => `
                                <div class="comment-item">
                                    <div class="comment-header">
                                        <strong>${comment.author}</strong>
                                        <small class="text-muted">${new Date(comment.timestamp).toLocaleString()}</small>
                                    </div>
                                    <div class="comment-body">${comment.message}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        ${this.userRole === 'admin' || this.userRole === 'agent' ? 
                            `<div class="mt-3">
                                <textarea class="form-control" id="newComment" placeholder="Add a comment..." rows="3"></textarea>
                                <button class="btn btn-primary btn-sm mt-2" onclick="supportCenter.addComment(${ticket.id})">
                                    ${this.translate('add_comment')}
                                </button>
                            </div>` : 
                            ''
                        }
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="customer-info">
                        <h6>${this.translate('customer_info')}</h6>
                        <p>
                            <strong>Name:</strong> ${ticket.customerName}<br>
                            <strong>Email:</strong> ${ticket.customerEmail}<br>
                            <strong>Category:</strong> ${this.translate('category_' + ticket.category)}<br>
                            <strong>Priority:</strong> ${this.translate('priority_' + ticket.priority)}
                        </p>
                    </div>
                    
                    ${this.userRole === 'admin' || this.userRole === 'agent' ? 
                        `<div class="ticket-actions">
                            <h6>Actions</h6>
                            <div class="d-grid gap-2">
                                ${ticket.status !== 'closed' ? 
                                    `<button class="btn btn-success btn-sm" onclick="supportCenter.updateTicketStatus(${ticket.id}, 'resolved')">
                                        Mark Resolved
                                    </button>
                                    <button class="btn btn-secondary btn-sm" onclick="supportCenter.updateTicketStatus(${ticket.id}, 'closed')">
                                        ${this.translate('close_ticket')}
                                    </button>` : 
                                    `<button class="btn btn-primary btn-sm" onclick="supportCenter.updateTicketStatus(${ticket.id}, 'open')">
                                        ${this.translate('reopen_ticket')}
                                    </button>`
                                }
                                <button class="btn btn-outline-primary btn-sm" onclick="supportCenter.assignTicket(${ticket.id})">
                                    ${this.translate('assign_agent')}
                                </button>
                                <button class="btn btn-outline-warning btn-sm" onclick="supportCenter.changePriority(${ticket.id})">
                                    ${this.translate('change_priority')}
                                </button>
                            </div>
                        </div>` : 
                        ''
                    }
                </div>
            </div>
        `;

        document.getElementById('ticketDetailContent').innerHTML = content;
        modal.show();
    }

    addComment(ticketId) {
        const commentText = document.getElementById('newComment').value.trim();
        if (!commentText) return;

        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        const comment = {
            id: Date.now(),
            author: this.userRole === 'admin' ? 'Administrator' : 'Support Agent',
            message: commentText,
            timestamp: new Date().toISOString()
        };

        ticket.comments.push(comment);
        ticket.lastUpdated = new Date().toISOString();
        
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));
        
        // Refresh the modal
        this.showTicketDetails(ticketId);
        this.showNotification('Comment added successfully!', 'success');
    }

    updateTicketStatus(ticketId, newStatus) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        ticket.status = newStatus;
        ticket.lastUpdated = new Date().toISOString();
        
        localStorage.setItem('supportTickets', JSON.stringify(this.tickets));
        
        // Close modal and refresh tickets
        const modal = bootstrap.Modal.getInstance(document.getElementById('ticketDetailModal'));
        if (modal) modal.hide();
        
        this.renderTickets();
        this.showNotification('Ticket status updated successfully!', 'success');
    }

    toggleFAQ(faqId) {
        const faqAnswer = document.getElementById(`faq-${faqId}`);
        const isVisible = faqAnswer.style.display !== 'none';
        
        faqAnswer.style.display = isVisible ? 'none' : 'block';
        
        // Update view count
        const faq = this.faqs.find(f => f.id === faqId);
        if (faq && !isVisible) {
            faq.views++;
            localStorage.setItem('supportFAQs', JSON.stringify(this.faqs));
        }
    }

    showFAQSection() {
        // Scroll to FAQ section
        document.getElementById('faqSection').scrollIntoView({ behavior: 'smooth' });
    }

    callSupport() {
        const phoneNumber = this.translate('contact_phone');
        window.open(`tel:${phoneNumber}`);
    }

    emailSupport() {
        const email = this.translate('contact_email');
        window.open(`mailto:${email}?subject=Support Request from Visit Limbe App`);
    }

    openCommunityForum() {
        // In a real implementation, this would open a forum
        this.showNotification('Community forum feature coming soon!', 'info');
    }

    showAnalytics() {
        const totalTickets = this.tickets.length;
        const openTickets = this.tickets.filter(t => t.status === 'open').length;
        const resolvedTickets = this.tickets.filter(t => t.status === 'resolved').length;
        const avgResponseTime = '2.5 hours'; // This would be calculated
        const satisfactionRating = '4.2/5'; // This would be from user feedback

        const modal = new bootstrap.Modal(document.getElementById('ticketDetailModal'));
        document.getElementById('ticketDetailTitle').textContent = this.translate('analytics');
        
        const content = `
            <div class="row text-center mb-4">
                <div class="col-md-3">
                    <h3 class="text-primary">${totalTickets}</h3>
                    <p>${this.translate('total_tickets')}</p>
                </div>
                <div class="col-md-3">
                    <h3 class="text-danger">${openTickets}</h3>
                    <p>${this.translate('open_tickets')}</p>
                </div>
                <div class="col-md-3">
                    <h3 class="text-success">${resolvedTickets}</h3>
                    <p>${this.translate('resolved_tickets')}</p>
                </div>
                <div class="col-md-3">
                    <h3 class="text-info">${avgResponseTime}</h3>
                    <p>${this.translate('avg_response_time')}</p>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <h5>Ticket Categories</h5>
                    <div class="category-stats">
                        ${['technical', 'billing', 'general', 'booking', 'account'].map(category => {
                            const count = this.tickets.filter(t => t.category === category).length;
                            const percentage = totalTickets > 0 ? (count / totalTickets * 100).toFixed(1) : 0;
                            return `
                                <div class="d-flex justify-content-between mb-2">
                                    <span>${this.translate('category_' + category)}</span>
                                    <span>${count} (${percentage}%)</span>
                                </div>
                                <div class="progress mb-2">
                                    <div class="progress-bar" style="width: ${percentage}%"></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="col-md-6">
                    <h5>Priority Distribution</h5>
                    <div class="priority-stats">
                        ${['low', 'medium', 'high', 'urgent'].map(priority => {
                            const count = this.tickets.filter(t => t.priority === priority).length;
                            const percentage = totalTickets > 0 ? (count / totalTickets * 100).toFixed(1) : 0;
                            return `
                                <div class="d-flex justify-content-between mb-2">
                                    <span>${this.translate('priority_' + priority)}</span>
                                    <span>${count} (${percentage}%)</span>
                                </div>
                                <div class="progress mb-2">
                                    <div class="progress-bar bg-${this.getPriorityClass(priority)}" style="width: ${percentage}%"></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
            
            <div class="mt-4">
                <h5>Most Viewed FAQs</h5>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Views</th>
                                <th>Helpful</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.faqs.sort((a, b) => b.views - a.views).slice(0, 5).map(faq => `
                                <tr>
                                    <td>${faq.question}</td>
                                    <td>${faq.views}</td>
                                    <td>${faq.helpful}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('ticketDetailContent').innerHTML = content;
        modal.show();
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
        document.getElementById('currentLang').textContent = this.currentLanguage.toUpperCase();
        this.updateLanguage();
        this.renderSupportOptions();
        this.renderFAQs();
        this.renderTickets();
    }

    updateLanguage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        // Update placeholders
        const faqSearchInput = document.getElementById('faqSearchInput');
        if (faqSearchInput) {
            faqSearchInput.placeholder = this.translate('search_faqs');
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

// Initialize Support Center when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.supportCenter = new SupportCenter();
});
