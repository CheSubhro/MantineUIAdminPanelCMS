
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    EDITOR: 'editor',
    AUTHOR: 'author',
    CONTRIBUTOR: 'contributor',
};

export const PERMISSIONS = {

    canAccessRoute: (role, routeId) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        if (normalizedRole === ROLES.SUPER_ADMIN) return true; 
        
        switch (routeId) {
            case 'dashboard':
            case 'posts':
            case 'media':
                return [ROLES.EDITOR, ROLES.AUTHOR, ROLES.CONTRIBUTOR].includes(normalizedRole);
            case 'pages':
            case 'comments':
            case 'categories':
                return [ROLES.EDITOR].includes(normalizedRole);
            default:
                return false;
        }
    },

    canDelete: (role) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        return [ROLES.SUPER_ADMIN, ROLES.EDITOR].includes(normalizedRole);
    },

    canPublish: (role) => {
        const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
        return [ROLES.SUPER_ADMIN, ROLES.EDITOR].includes(normalizedRole);
    }
};