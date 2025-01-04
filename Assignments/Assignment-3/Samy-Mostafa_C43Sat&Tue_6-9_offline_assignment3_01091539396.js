const path = require('node:path');
const fs = require('node:fs');
const EventEmitter = require('node:events');


console.log("Question 1:");

const getFullPath = () => {
    return { __filename };
}
console.log(getFullPath());

console.log("----------------------------------------------------------------");
console.log("Question 2:");
const getFileExtension = (file) => {
    return path.extname(file);
}
console.log(getFileExtension(__filename));
console.log("----------------------------------------------------------------");
console.log("Question 3:");
const checkIsAbsolute = (file) => {
    return path.isAbsolute(file);
}
console.log(checkIsAbsolute(__filename));
console.log(checkIsAbsolute('index.js'));

console.log("----------------------------------------------------------------");

console.log("Question 4:");
const joinTwoPaths = (path1, path2) => {
    return path.join(path1, path2)
}

console.log(joinTwoPaths(__dirname, '/folder2/file.txt'));

console.log("----------------------------------------------------------------");
console.log("Question 5:");
const parseFormat = (file) => {
    const parse = path.parse(file);
    console.log("Parsed object:", path.parse(file));
    console.log("Formatted path:", path.format(parse));

}
parseFormat(__filename)

console.log("----------------------------------------------------------------");
console.log("Question 6:");
const deleteFile = (file) => {
    fs.unlink(file, () => {
        console.log(`${file} file is deleted.No explicit output.`);
    });
}
deleteFile('./index.js')
console.log("----------------------------------------------------------------");
console.log("Question 7:");
const createFolder = (folder) => {
    fs.mkdir(folder, { recursive: true }, () =>{
        console.log(`${folder} folder is created.No explicit output.`);
    });
}
createFolder('Route/Nodejs')
console.log("----------------------------------------------------------------");
console.log("Question 8:");
const eventEmitter = new EventEmitter();
eventEmitter.on('greet', (message) => {
    console.log(`The event is triggered and the message ${message} is logged.`);
});

const emitEvent = (message) => {
    eventEmitter.emit('greet', message);
}

emitEvent("Hello Event!");
console.log("----------------------------------------------------------------");
