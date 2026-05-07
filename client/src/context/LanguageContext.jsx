import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  EN: {
    // Navbar
    search_placeholder: "Search clients, projects, invoices...",
    profile: "My Profile",
    settings: "Account Settings",
    security: "Security",
    help: "Help Center",
    sign_out: "Sign Out",
    notifications: "Notifications",
    no_notifications: "No new notifications",
    view_all: "View All",
    quick_apps: "Quick Apps",
    
    // Sidebar Groups
    menu_main: "MENU",
    menu_invoicing: "INVOICING",
    menu_management: "MANAGEMENT",
    menu_support: "SUPPORT",
    
    // Sidebar Items
    dashboard: "Dashboard",
    kanban: "Kanban Board",
    clients: "Clients",
    new_invoice: "New Invoice",
    invoices: "Invoices",
    reports: "Reports",
    payment_gateways: "Payment Gateways",
    invoice_settings: "Invoice Settings",
    subscription: "Subscription",
    
    // Dashboard
    all_clients: "All Clients",
    active_features: "Active Features",
    total_revenue: "Total Revenue",
    current_month_revenue: "Current Month Revenue",
    active: "Active",
    pending: "Pending",
    up_to_date: "Up to date",
    revenue_overview: "Revenue Overview",
    feature_usage: "Feature Usage",
    
    // General
    welcome: "Welcome back",
    manual_invoice: "Manual Invoice",
    ai_create: "AI Create",
    invoices_list: "Invoices List",
    track_manage_billings: "Track and manage all your customer billings.",
    invoice_id: "Invoice ID",
    client: "Client",
    amount: "Amount",
    due_date: "Due Date",
    status: "Status",
    actions: "Actions",
    no_invoices_found: "No invoices found. Create one to get started!",
    select_client: "Select Client",
    select_a_client: "Select a client",
    invoice_items: "Invoice Items",
    add_item: "Add Item",
    description: "Description",
    qty: "Qty",
    price: "Price",
    total_amount: "Total Amount",
    save_invoice: "Save Invoice",
    cancel: "Cancel",
    ai_invoice_generator: "AI Invoice Generator",
    write_items_naturally: "Write your items naturally",
    generate_invoice: "Generate Invoice",
    new_client: "New Client",
    all_clients_title: "All Clients",
    manage_relationships: "Manage your business relationships and view their history.",
    client_name: "Client Name",
    contact_info: "Contact Info",
    add_new_client: "Add New Client",
    client_logo_optional: "Client Logo (Optional)",
    phone_number: "Phone Number",
    address: "Address",
    save_client: "Save Client",
  },
  BN: {
    // Navbar
    search_placeholder: "ক্লায়েন্ট, প্রজেক্ট, ইনভয়েস খুঁজুন...",
    profile: "আমার প্রোফাইল",
    settings: "অ্যাকাউন্ট সেটিংস",
    security: "নিরাপত্তা",
    help: "হেল্প সেন্টার",
    sign_out: "সাইন আউট",
    notifications: "নোটিফিকেশন",
    no_notifications: "কোনো নতুন নোটিফিকেশন নেই",
    view_all: "সব দেখুন",
    quick_apps: "কুইক অ্যাপস",
    
    // Sidebar Groups
    menu_main: "মেনু",
    menu_invoicing: "ইনভয়েসিং",
    menu_management: "ম্যানেজমেন্ট",
    menu_support: "সাপোর্ট",
    
    // Sidebar Items
    dashboard: "ড্যাশবোর্ড",
    kanban: "কানবান বোর্ড",
    clients: "ক্লায়েন্ট",
    new_invoice: "নতুন ইনভয়েস",
    invoices: "ইনভয়েস",
    reports: "রিপোর্ট",
    payment_gateways: "পেমেন্ট গেটওয়ে",
    invoice_settings: "ইনভয়েস সেটিংস",
    subscription: "সাবস্ক্রিপশন",
    
    // Dashboard
    all_clients: "সব ক্লায়েন্ট",
    active_features: "সক্রিয় ফিচার",
    total_revenue: "মোট রাজস্ব",
    current_month_revenue: "চলতি মাসের রাজস্ব",
    active: "সক্রিয়",
    pending: "বাকি",
    up_to_date: "আপ টু ডেট",
    revenue_overview: "রাজস্ব ওভারভিউ",
    feature_usage: "ফিচার ব্যবহার",
    
    // General
    welcome: "স্বাগতম",
    manual_invoice: "ম্যানুয়াল ইনভয়েস",
    ai_create: "AI ক্রিয়েট",
    invoices_list: "ইনভয়েস তালিকা",
    track_manage_billings: "আপনার সব কাস্টমার বিলিং ট্র্যাক এবং ম্যানেজ করুন।",
    invoice_id: "ইনভয়েস আইডি",
    client: "ক্লায়েন্ট",
    amount: "পরিমাণ",
    due_date: "শেষ তারিখ",
    status: "অবস্থা",
    actions: "অ্যাকশন",
    no_invoices_found: "কোনো ইনভয়েস পাওয়া যায়নি। শুরু করতে একটি তৈরি করুন!",
    select_client: "ক্লায়েন্ট নির্বাচন করুন",
    select_a_client: "একজন ক্লায়েন্ট নির্বাচন করুন",
    invoice_items: "ইনভয়েস আইটেম",
    add_item: "আইটেম যোগ করুন",
    description: "বিবরণ",
    qty: "পরিমাণ",
    price: "মূল্য",
    total_amount: "মোট পরিমাণ",
    save_invoice: "ইনভয়েস সংরক্ষণ করুন",
    cancel: "বাতিল",
    ai_invoice_generator: "AI ইনভয়েস জেনারেটর",
    write_items_naturally: "স্বাভাবিকভাবে আপনার আইটেমগুলো লিখুন",
    generate_invoice: "ইনভয়েস তৈরি করুন",
    new_client: "নতুন ক্লায়েন্ট",
    all_clients_title: "সব ক্লায়েন্ট",
    manage_relationships: "আপনার ব্যবসার সম্পর্ক এবং তাদের ইতিহাস পরিচালনা করুন।",
    client_name: "ক্লায়েন্টের নাম",
    contact_info: "যোগাযোগের তথ্য",
    add_new_client: "নতুন ক্লায়েন্ট যোগ করুন",
    client_logo_optional: "ক্লায়েন্ট লোগো (ঐচ্ছিক)",
    phone_number: "ফোন নম্বর",
    address: "ঠিকানা",
    save_client: "ক্লায়েন্ট সংরক্ষণ করুন",
  },
  ES: {
    // Navbar
    search_placeholder: "Buscar clientes, proyectos, facturas...",
    profile: "Mi Perfil",
    settings: "Configuración",
    security: "Seguridad",
    help: "Centro de Ayuda",
    sign_out: "Cerrar Sesión",
    notifications: "Notificaciones",
    no_notifications: "Sin notificaciones nuevas",
    view_all: "Ver Todo",
    quick_apps: "Aplicaciones",
    
    // Sidebar Groups
    menu_main: "MENÚ",
    menu_invoicing: "FACTURACIÓN",
    menu_management: "GESTIÓN",
    menu_support: "SOPORTE",
    
    // Sidebar Items
    dashboard: "Panel",
    kanban: "Tablero Kanban",
    clients: "Clientes",
    new_invoice: "Nueva Factura",
    invoices: "Facturas",
    reports: "Informes",
    payment_gateways: "Pasarelas de Pago",
    invoice_settings: "Configuración de Factura",
    subscription: "Suscripción",
    
    // Dashboard
    all_clients: "Todos los Clientes",
    active_features: "Funciones Activas",
    total_revenue: "Ingresos Totales",
    current_month_revenue: "Ingresos del Mes",
    active: "Activo",
    pending: "Pendiente",
    up_to_date: "Al día",
    revenue_overview: "Resumen de Ingresos",
    feature_usage: "Uso de Funciones",
    
    // General
    welcome: "Bienvenido",
    manual_invoice: "Factura Manual",
    ai_create: "Crear con AI",
    invoices_list: "Lista de Facturas",
    track_manage_billings: "Rastree y gestione todas sus facturaciones.",
    invoice_id: "ID de Factura",
    client: "Cliente",
    amount: "Monto",
    due_date: "Fecha de Vencimiento",
    status: "Estado",
    actions: "Acciones",
    no_invoices_found: "No se encontraron facturas. ¡Cree una para comenzar!",
    select_client: "Seleccionar Cliente",
    select_a_client: "Seleccione un cliente",
    invoice_items: "Artículos de la Factura",
    add_item: "Agregar Artículo",
    description: "Descripción",
    qty: "Cant",
    price: "Precio",
    total_amount: "Monto Total",
    save_invoice: "Guardar Factura",
    cancel: "Cancelar",
    ai_invoice_generator: "Generador de Facturas AI",
    write_items_naturally: "Escriba sus artículos naturalmente",
    generate_invoice: "Generar Factura",
    new_client: "Nuevo Cliente",
    all_clients_title: "Todos los Clientes",
    manage_relationships: "Gestione sus relaciones comerciales y vea su historial.",
    client_name: "Nombre del Cliente",
    contact_info: "Información de Contacto",
    add_new_client: "Agregar Nuevo Cliente",
    client_logo_optional: "Logo del Cliente (Opcional)",
    phone_number: "Número de Teléfono",
    address: "Dirección",
    save_client: "Guardar Cliente",
  },
  FR: {
    // Navbar
    search_placeholder: "Rechercher clients, projets, factures...",
    profile: "Mon Profil",
    settings: "Paramètres",
    security: "Sécurité",
    help: "Aide",
    sign_out: "Déconnexion",
    notifications: "Notifications",
    no_notifications: "Aucune notification",
    view_all: "Tout Voir",
    quick_apps: "Applications",
    
    // Sidebar Groups
    menu_main: "MENU",
    menu_invoicing: "FACTURATION",
    menu_management: "GESTION",
    menu_support: "SUPPORT",
    
    // Sidebar Items
    dashboard: "Tableau de Bord",
    kanban: "Tableau Kanban",
    clients: "Clients",
    new_invoice: "Nouvelle Facture",
    invoices: "Factures",
    reports: "Rapports",
    payment_gateways: "Passerelles",
    invoice_settings: "Paramètres Facture",
    subscription: "Abonnement",
    
    // Dashboard
    all_clients: "Tous les Clients",
    active_features: "Fonctions Actives",
    total_revenue: "Revenu Total",
    current_month_revenue: "Revenu du Mois",
    active: "Actif",
    pending: "En attente",
    up_to_date: "À jour",
    revenue_overview: "Aperçu des Revenus",
    feature_usage: "Utilisation",
    
    // General
    welcome: "Bienvenue",
    manual_invoice: "Facture Manuelle",
    ai_create: "Créer avec IA",
    invoices_list: "Liste des Factures",
    track_manage_billings: "Suivez et gérez toutes vos facturations clients.",
    invoice_id: "ID Facture",
    client: "Client",
    amount: "Montant",
    due_date: "Date d'Échéance",
    status: "Statut",
    actions: "Actions",
    no_invoices_found: "Aucune facture trouvée. Créez-en une pour commencer !",
    select_client: "Sélectionner Client",
    select_a_client: "Sélectionnez un client",
    invoice_items: "Articles de la Facture",
    add_item: "Ajouter un Article",
    description: "Description",
    qty: "Qté",
    price: "Prix",
    total_amount: "Montant Total",
    save_invoice: "Enregistrer la Facture",
    cancel: "Annuler",
    ai_invoice_generator: "Générateur de Factures IA",
    write_items_naturally: "Écrivez vos articles naturellement",
    generate_invoice: "Générer la Facture",
    new_client: "Nouveau Client",
    all_clients_title: "Tous les Clients",
    manage_relationships: "Gérez vos relations d'affaires et consultez leur historique.",
    client_name: "Nom du Client",
    contact_info: "Infos de Contact",
    add_new_client: "Ajouter Nouveau Client",
    client_logo_optional: "Logo du Client (Optionnel)",
    phone_number: "Numéro de Téléphone",
    address: "Adresse",
    save_client: "Enregistrer le Client",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'EN');

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key) => {
    const langData = translations[language] || translations['EN'];
    return langData[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
