##### Create the Database
```mongosh
use assignment-9
switched to db assignment-9
```
##### Question 1: Create an explicit collection named “books” with a validation rule to ensure that each document has a non-empty “title” field.  

```mongosh
db.createCollection("books", {validator: {$and: [{ "title": { $exists: true } },{ "title": { $ne: "" } }]}});
``` 

##### Question 2: Create an implicit collection by inserting data directly into a new collection named "authors".

```mongosh
db.authors.insertOne({name: "Author 1",nationality: "British"}); 
``` 

##### Question 3: Create a capped collection named “logs” with a size limit of 1MB.

```mongosh
db.createCollection("logs", {capped: true, size: 1048576});
```  

##### Question 4: Create an index on the books collection for the title field.

```mongosh
db.books.createIndex({ title: 1 });
```
##### Question 5: Insert one document into the books collection.

```mongosh
db.books.insertOne({title: "Book1",author: "Ali",year: 1937,genres: ["Fantasy", "Adventure"]});
```
##### Question 6: Insert multiple documents into the books collection with at least three records.

```mongosh
db.books.insertMany([
{title: "Book2",author: "Ali",year: 1937,genres: ["Fantasy", "Adventure"]},
{title: "Book3",author: "Sara",year: 2001,genres: ["Science Fiction", "Thriller"]},
{title: "Book4",author: "Ahmed",year: 2010,genres: ["Mystery", "Drama"]}
]);
```
##### Question 7: Insert a new log into the logs collection.

```mongosh
db.logs.insertOne({book_id: "6771ec9b2624114cece8933b",action: "borrowed"});
```
##### Question 8: Update the book with title “Book4” change the year to be 2022.

```mongosh
db.books.updateOne({ title: "Book4" }, { $set: { year: 2022 }});
```
##### Question 9: Find a Book with title “Book4”.

```mongosh
db.books.findOne({ title: "Book4" });
```
##### Question 10: Find all books published between 1990 and 2010.

```mongosh
db.books.findOne({ title: "Book4" });
```
##### Question 11: Find books where the genre includes "Science Fiction".

```mongosh
db.books.find({ genres: "Science Fiction" });
```
##### Question 12: Skip the first two books, limit the results to the next three, sorted by year in descending order.

```mongosh
db.books.find().sort({ year: -1 }).skip(2).limit(3);
```
##### Question 13: Find books where the year field stored as an integer.
```mongosh
db.books.find({ year: { $type: "int" } });
```
##### Question 14: Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".
```mongosh
db.books.find({ genres: { $nin: ["Horror", "Science Fiction"] } });
```
##### Question 15: Delete all books published before 2000.
```mongosh
db.books.deleteMany({ year: { $lt: 2000 } });
```
##### Question 16: Using aggregation Functions, Filter books published after 2000 and sort them by year descending.
```mongosh
db.books.aggregate([{ $match: { year: { $gt: 2000 }}},{ $sort: { year: -1 }}]);
```
##### Question 17: Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields.
```mongosh
db.books.aggregate([{ $match: { year: { $gt: 2000 }}}, { $project: { title: 1, author: 1, year: 1, _id: 0 }}]);
```
##### Question 18: Using aggregation functions,break an array of genres into separate documents.
```mongosh
db.books.aggregate([{ $unwind: "$genres" }]);
```
##### Question 19: Using aggregation functions, Join the books collection with the logs collection.

- First convert all book_id in logs collection from string to ObjectId:

```mongosh
db.logs.updateMany({ "book_id": { $type: "string" }}, [{$set: {"book_id": { $toObjectId: "$book_id" }}}]);
```
- Then Join the books collection with the logs collection.
```mongosh
db.logs.aggregate([{ $lookup: { from: "books", localField: "book_id", foreignField: "_id", as: "book_details" }}, {$project: {action: 1, book_details: 1, _id:0 }}])
```
