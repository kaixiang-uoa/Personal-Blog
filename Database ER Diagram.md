erDiagram
    User ||--o{ Post : "creates"
    User ||--o{ Comment : "writes"
    Post ||--o{ Comment : "has"
    Post ||--o{ Category : "belongs to"
    Post ||--o{ Tag : "has"
    Post ||--o{ Media : "contains"
    Setting ||--o{ User : "configures"

    User {
        string _id PK
        string username
        string email
        string password
        string role
        datetime createdAt
        datetime updatedAt
    }

    Post {
        string _id PK
        string title
        string slug
        string content
        string author FK
        string status
        datetime createdAt
        datetime updatedAt
        datetime publishedAt
    }

    Comment {
        string _id PK
        string content
        string author FK
        string post FK
        string parentComment
        datetime createdAt
        datetime updatedAt
    }

    Category {
        string _id PK
        string name
        string slug
        string description
    }

    Tag {
        string _id PK
        string name
        string slug
    }

    Media {
        string _id PK
        string filename
        string path
        string type
        string post FK
        datetime createdAt
    }

    Setting {
        string _id PK
        string key
        string value
        string type
        string description
    }