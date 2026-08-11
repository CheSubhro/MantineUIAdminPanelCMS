
# 📂 Project Structure

```text
Production-Ready-Frontend-In-React-JS/
├── public/                 # Static assets directly served to the browser
├── src/                    # Main source code directory
│   ├── assets/             # Global media assets & configurations
│   │   ├── fonts/          # Local custom fonts (e.g., Inter-Regular.ttf)
│   │   ├── icons/          # Custom SVG vectors (e.g., logo-icon.svg)
│   │   ├── images/         # Static graphics (e.g., default-avatar.png)
│   │   └── mock-data/      # JSON mocks for local testing (blogs, users, analytics)
│   ├── components/         # Structure & layout presentation blocks
│   │   ├── common/         # Global Atomic Design wrappers (Button, Input, Card, Modal, etc.)
│   │   └── layout/         # Dynamic layouts (Navbar, Footer)
│   ├── features/           # Modular business logic engines
│   │   ├── analytics/      # Metric tracking widgets (AnalyticsStats.jsx)
│   │   ├── auth/           # Login & access gate-guards (LoginForm.jsx)
│   │   ├── blogs/          # Post editors and registries (BlogForm.jsx, BlogList.jsx)
│   │   ├── cart/           # Order basket components (CartItem.jsx)
│   │   ├── products/       # Core merchandise cataloging (ProductCard.jsx)
│   │   └── user/           # User roster grids & sheets (UserTable.jsx, UserProfile.jsx)
│   ├── hooks/              # Reusable custom React lifecycle hooks
│   ├── layouts/            # Page core frame shells (MainLayout.jsx)
│   ├── pages/              # Main route views mapped to endpoints
│   ├── services/           # Axios central HTTP request configurations
│   ├── store/              # Zustand global slice configurations
│   ├── theme/              # Custom brand styling tokens & overrides
│   ├── utils/              # Pure pure helper functions & constants
│   ├── App.css             # Root stylesheet
│   ├── App.jsx             # Core routing entry & context bindings
│   ├── index.css           # Global typography & base CSS overrides
│   └── main.jsx            # Application initialization node
├── eslint.config.js        # Code quality guardrails & rules
├── index.html              # Core single-page HTML skeleton
├── package.json            # Manifest file declaring dependencies
└── README.md               # Setup and project documentation

npm install
npm run dev
