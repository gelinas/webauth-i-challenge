-- `find()` returns a list of all users
select u.id, u.username
from users as u;

-- `findBy(filter)` returns a list of all users that match a JSON { key: value }  `filter` criteria
select u.id, u.username, u.password
from users as u
where 'key' = 'value';

-- `add(user)` registers a new user in the database
insert into users 
(username, password) values ('username', 'password');

-- `findById(id)` returns the user with id 'id'
select first u.id, u.username
from users as u
where u.id = 'id'