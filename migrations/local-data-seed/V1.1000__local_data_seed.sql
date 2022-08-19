insert into users (name, email, password)
values ('Jake Sexton', 'jsexton@jake.com', 'MArkIsAmazing');

insert into projects (name, description, "key", is_deleted, user_id)
values ('My todos', 'My Daily todo items', 'TODO', false, 1);

insert into todos (summary, description, created_date, updated_date, todo_status_id, project_id)
values ('Celebrate Birthday', 'Birthday', now(), null, 1, 1);
