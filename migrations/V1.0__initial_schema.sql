CREATE TABLE IF NOT EXISTS public.todo_statuses
(
    id serial constraint todo_statuses_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial constraint users_pk primary key,
    name text not null,
    email text not null,
    password text not null
);

CREATE TABLE IF NOT EXISTS public.projects
(
    id serial constraint projects_pk primary key,
    name text not null,
    description text,
    key text not null,
    is_deleted boolean default false not null,
    user_id int constraint projects_users_user_id_fk references public.users
);

CREATE TABLE IF NOT EXISTS public.todos
(
    id serial constraint todos_pk primary key,
    summary text not null,
    description text,
    created_date timestamp default now() not null,
    updated_date timestamp,
    todo_status_id int constraint todos_todo_statuses_todo_status_id_fk references public.todo_statuses,
    project_id int constraint todos_projects_project_id_fk references public.projects
);