
export const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    DEVELOPER: 'developer',
    EDITOR: 'editor',
    MODERATOR: 'moderator',
    AUTHOR: 'author',
    CONTRIBUTOR: 'contributor',
    ACCOUNTANT: 'accountant',
    CUSTOMER_SUPPORT: 'customer_support',
    SELLER: 'seller',
    RIDER: 'rider',
    USER: 'user',
};

export const PERMISSIONS = {

    canAccessRoute: (role, routeId) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        
        if (['admin', ROLES.ADMIN, ROLES.MANAGER, ROLES.DEVELOPER].includes(normalizedRole)) {
            return true;
        }
        
        switch (routeId) {
            case 'dashboard':
                return true; 
                
            case 'posts':
            case 'media':
                return [ROLES.EDITOR, ROLES.MODERATOR, ROLES.AUTHOR, ROLES.CONTRIBUTOR].includes(normalizedRole);
                
            case 'pages':
            case 'comments':
            case 'categories':
            case 'seo':
                return [ROLES.EDITOR, ROLES.MODERATOR].includes(normalizedRole);
                
            case 'analytics':
            case 'reports':
                return [ROLES.ACCOUNTANT].includes(normalizedRole);
                
            case 'users':
            case 'settings':
                return false; 
                
            default:
                return false; 
        }
    },

    canDelete: (role) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        return ['admin', ROLES.ADMIN, ROLES.MANAGER, ROLES.DEVELOPER, ROLES.EDITOR].includes(normalizedRole);
    },

    canPublish: (role) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        return ['admin', ROLES.ADMIN, ROLES.MANAGER, ROLES.DEVELOPER, ROLES.EDITOR, ROLES.MODERATOR].includes(normalizedRole);
    }
};