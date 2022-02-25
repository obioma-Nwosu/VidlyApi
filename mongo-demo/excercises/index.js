const mongoose = require('mongoose');

//connect
mongoose.connect('mongodb://localhost/mongo-excercises')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Could not Connect to DB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date:  Date,
    isPublished: Boolean
  })

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
  return await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1})
}

/*

async function getCourses() {
  return await Course
  .find({ isPublished: true })
  .or([ { tags: 'frontend' }, { tags: 'backend' } ])
  .sort('-price')
  .select('name author price');
}
*/

/**
 * async function getCourses() {
  return await Course
  .find({ isPublished: true })
  .or([  
    { price: { $gte: 15 } },
    //{ name: /.*by.*/i //}
  //])
  //.sort('-price')
  //.select('name author price');
//}


async function run() {
  const courses = await getCourses()
  console.log(courses)
}

run()