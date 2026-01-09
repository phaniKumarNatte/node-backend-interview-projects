Project : Create a REST API for a blog system where users can create, update, and delete posts. Implement soft delete functionality and add an endpoint to restore deleted posts.
Build Order (Follow This)

Create DB schema
Create GET APIs (read first)
Create POST (create)
Create PUT/PATCH (update)
Implement soft delete
Implement restore
Add edge case handling
What NOT to Do
Don’t hard delete
Don’t mix SQL in controllers
Don’t expose deleted posts accidentally
Don’t skip README

src
 ├── config
 │    └── db.js
 ├── migrations
 │    └── posts.sql
 ├── routes
 │    └── post.routes.js
 ├── controllers
 │    └── post.controller.js
 ├── models
 │    └── post.model.js
 ├── app.js
 └── server.js
package.json
