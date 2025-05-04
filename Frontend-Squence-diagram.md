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