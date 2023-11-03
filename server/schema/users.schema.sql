CREATE TABLE users.users (
    session_uuid VARCHAR UNIQUE NOT NULL,
    user_uuid UUID PRIMARY KEY NOT null,
    user_role VARCHAR(10) NOT null,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE,
    pass VARCHAR NOT null,
    created_at VARCHAR NOT null
);