graph TB
    subgraph Frontend
        NextJS[Next.js Frontend]
        Static[Static Assets]
        I18n[Internationalization]
        UI[UI Components]
    end

    subgraph AdminPanel
        React[React Admin Panel]
        Auth[Admin Auth]
        Dashboard[Dashboard]
        CMS[Content Management]
        MediaMgr[Media Management]
    end

    subgraph Backend
        Express[Express Server]
        Auth[Authentication]
        I18n[Internationalization]
        API[API Routes]
        Middleware[Middleware]
    end

    subgraph Database
        MongoDB[(MongoDB)]
    end

    subgraph Storage
        FileSystem[(File System)]
    end

    subgraph External
        Email[Email Service]
        CDN[CDN]
        Vercel[Vercel Hosting]
    end

    NextJS --> Express
    React --> Express
    Express --> Auth
    Express --> I18n
    Express --> API
    Express --> Middleware
    API --> MongoDB
    API --> FileSystem
    Express --> Email
    Static --> CDN
    NextJS --> Vercel
    React --> Vercel

    style Frontend fill:#f9f,stroke:#333,stroke-width:2px
    style AdminPanel fill:#f9f,stroke:#333,stroke-width:2px
    style Backend fill:#bbf,stroke:#333,stroke-width:2px
    style Database fill:#bfb,stroke:#333,stroke-width:2px
    style Storage fill:#fbb,stroke:#333,stroke-width:2px
    style External fill:#ffb,stroke:#333,stroke-width:2px