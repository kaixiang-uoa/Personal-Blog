# 前端交互序列图

本文档描述了前端用户交互的主要流程和数据流向，使用序列图展示用户、前端界面、后端API和数据库之间的交互过程。

## 用户浏览流程

以下序列图展示了用户浏览博客内容的主要流程，包括查看文章列表、筛选、搜索和阅读文章详情。

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Visit Blog Homepage
    Frontend->>Backend: GET /api/v1/posts
    Backend->>Database: Query Posts List
    Database-->>Backend: Return Posts Data
    Backend-->>Frontend: Return Posts List
    Frontend-->>User: Display Posts List

    alt Category Filter
        User->>Frontend: Click Category
        Frontend->>Backend: GET /api/v1/posts?category=:categoryId
        Backend->>Database: Query by Category
        Database-->>Backend: Return Category Posts
        Backend-->>Frontend: Return Filtered Results
        Frontend-->>User: Display Category Posts
    end

    alt Tag Filter
        User->>Frontend: Select Tag
        Frontend->>Backend: GET /api/v1/posts?tag=:tagId
        Backend->>Database: Query by Tag
        Database-->>Backend: Return Tag Posts
        Backend-->>Frontend: Return Filtered Results
        Frontend-->>User: Display Tag Posts
    end

    alt Search Function
        User->>Frontend: Enter Search Keyword
        Frontend->>Backend: GET /api/v1/posts?search=:keyword
        Backend->>Database: Full-text Search
        Database-->>Backend: Return Search Results
        Backend-->>Frontend: Return Search Results
        Frontend-->>User: Display Search Results
    end

    alt Sort Function
        User->>Frontend: Select Sort Order
        Frontend->>Backend: GET /api/v1/posts?sort=:order
        Backend->>Database: Query by Sort
        Database-->>Backend: Return Sorted Results
        Backend-->>Frontend: Return Sorted Results
        Frontend-->>User: Display Sorted Results
    end

    alt Pagination
        User->>Frontend: Click Next Page
        Frontend->>Backend: GET /api/v1/posts?page=:page
        Backend->>Database: Query Next Page
        Database-->>Backend: Return Paginated Data
        Backend-->>Frontend: Return New Page Data
        Frontend-->>User: Display New Page Content
    end

    alt View Article Details
        User->>Frontend: Click Article
        Frontend->>Backend: GET /api/v1/posts/:slug
        Backend->>Database: Query Article Details
        Database-->>Backend: Return Article Content
        Backend-->>Frontend: Return Article Data
        Frontend-->>User: Display Article Details
    end
```

## 前端数据处理流程

下面的序列图展示了前端组件、服务层和后端API之间的数据处理流程，包括正常请求流程和错误处理流程。

```mermaid
sequenceDiagram
    participant Component as UI Component
    participant Hook as React Query Hook
    participant API as API Client
    participant Backend as Backend API
    
    %% Normal Request Flow
    Component->>Hook: Call useQuery/useMutation
    Hook->>API: Make HTTP request
    API->>API: Add auth token via interceptor
    API->>Backend: Send HTTP request
    Backend-->>API: Return response
    API->>API: Process response via interceptor
    API-->>Hook: Return processed data
    Hook-->>Component: Return {data, isLoading, error}
    Component->>Component: Render based on state
    
    %% Error Flow
    alt API Error
        Backend-->>API: Return error response
        API->>API: Handle error via interceptor
        alt 401 Unauthorized
            API->>API: Clear auth token
            API->>Component: Trigger auth redirect
        else 4xx/5xx Error
            API-->>Hook: Propagate error
            Hook-->>Component: Update error state
            Component->>Component: Render error fallback
        end
    end
```

## 前端国际化流程

以下序列图展示了前端国际化处理流程，包括语言切换和本地化内容渲染。

```mermaid
sequenceDiagram
    participant User
    participant UI as UI Component
    participant I18n as Next-Intl Provider
    participant Messages as Message Files
    
    %% Language Selection
    User->>UI: Select Language
    UI->>I18n: Change Locale
    I18n->>Messages: Load Language File
    Messages-->>I18n: Return Translations
    
    %% Content Rendering
    UI->>I18n: Request Translation (useTranslations)
    I18n->>I18n: Look up Translation Key
    I18n-->>UI: Return Localized Text
    UI-->>User: Display Localized Content
    
    %% Date/Number Formatting
    UI->>I18n: Format Date/Number
    I18n->>I18n: Apply Locale-specific Formatting
    I18n-->>UI: Return Formatted Value
    UI-->>User: Display Formatted Value
```

## 前端渲染流程

下面的序列图展示了Next.js前端的服务端渲染和客户端渲染流程。

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Next as Next.js Server
    participant Backend as Backend API
    participant Cache as Next.js Cache
    
    %% Server-Side Rendering
    User->>Browser: Visit Page URL
    Browser->>Next: HTTP Request
    
    alt Static Page with getStaticProps
        Next->>Cache: Check for Cached Page
        alt Cache Hit
            Cache-->>Next: Return Cached Page
        else Cache Miss
            Next->>Backend: Fetch Data
            Backend-->>Next: Return Data
            Next->>Next: Render Page with Data
            Next->>Cache: Store in Cache
        end
    else Dynamic Page with getServerSideProps
        Next->>Backend: Fetch Data
        Backend-->>Next: Return Data
        Next->>Next: Render Page with Data
    end
    
    Next-->>Browser: Return HTML + JSON
    Browser->>Browser: Hydrate React Components
    Browser-->>User: Display Page
    
    %% Client-Side Navigation
    User->>Browser: Click Internal Link
    Browser->>Next: Fetch Page Data
    Next-->>Browser: Return JSON Data
    Browser->>Browser: Update DOM with React
    Browser-->>User: Display New Page
```

## 前端状态管理流程

以下序列图展示了前端状态管理的流程，包括全局状态和本地状态。

```mermaid
sequenceDiagram
    participant Component as UI Component
    participant Context as React Context
    participant Hook as Custom Hook
    participant API as API Client
    
    %% Local State Management
    Component->>Component: useState/useReducer
    Component->>Component: Update Local State
    Component->>Component: Re-render with New State
    
    %% Global State Management
    Component->>Context: Access Global State
    Context-->>Component: Return Current State
    Component->>Hook: Call State Update Function
    Hook->>Context: Dispatch State Update
    Context->>Context: Update Global State
    Context-->>Component: Notify State Change
    Component->>Component: Re-render with New State
    
    %% Data Fetching with React Query
    Component->>Hook: Call useQuery
    Hook->>API: Fetch Data
    API-->>Hook: Return Response
    Hook->>Hook: Update Cache
    Hook-->>Component: Return {data, isLoading}
    Component->>Component: Render Based on State
``` 