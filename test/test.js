let lessons = [
{
  id: "273",
  title: "Variables",
  length: 12
},
{
 id: "295",
 title: "Conditionals",
 length: 12
},
{
 id: "299",
 title: "Functions",
 length: 12
}
]; 

// use this variable to add the lesson titles
let lessonTitles = [];

// write your code below this line
for (let i in lessons) {
    lessonTitles.push(lessons[i].title);
}
