```mongosh
use assignment-9
switched to db assignment-9
```
#### Question 1: Create an explicit collection named “books” with a validation rule to ensure that each document has a non-empty “title” field.  

```mongosh
db.createCollection("books", {validator: {$and: [{ "title": { $exists: true } },{ "title": { $ne: "" } }]}});
``` 

#### Question 2: Create an implicit collection by inserting data directly into a new collection named "authors".

```mongosh
db.authors.insertOne({name: "Author 1",nationality: "British"}); 
``` 

#### Question 3: Create a capped collection named “logs” with a size limit of 1MB.

```mongosh
db.createCollection("logs", {capped: true, size: 1048576});
```  

#### Question 4: Create an index on the books collection for the title field.

```mongosh
db.books.createIndex({ title: 1 });
```
#### Question 5: Insert one document into the books collection.

```mongosh
db.books.insertOne({title: "Book1",author: "Ali",year: 1937,genres: ["Fantasy", "Adventure"]});
```
#### Question 6: Insert multiple documents into the books collection with at least three records.

```mongosh
db.books.insertMany([
{title: "Book2",author: "Ali",year: 1937,genres: ["Fantasy", "Adventure"]},
{title: "Book3",author: "Sara",year: 2001,genres: ["Science Fiction", "Thriller"]},
{title: "Book4",author: "Ahmed",year: 2010,genres: ["Mystery", "Drama"]}
]);
```