const mongoose = require('mongoose');

//connect
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Could not Connect to DB', err))

  //Create Schemas/
  //Allowed Types = String, Number, Date, Buffer, Boolean, ObjectID, Array
  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
  })

  //Models,course is a class and not an object
  const Course = mongoose.model('Course', courseSchema)

  //Update data in the DB
  async function createCourse() {

    const course = new Course({
      name: 'React Course',
      author: 'Obi',
      tags: ['React', 'frontend'],
      isPublished: true
    })
  
    //Save to DB
    const result = await course.save()
    console.log(result)
  }

  //Retrive documents from mongoDB, (Querying)
  async function getCourses() {
    //returns all courses
    //const courses = await Course.find()

    //filtering to retrive particular data
    //const courses = await Course.find({author: 'Obi', isPublished: true})

    //COMPARISON QERIES 
    // eq -> equal
    // ne -> not equal
    // gt -> greater than
    // gte -> greater than or equal to
    // lt -> less than 
    // lte -> less than or equal to
    // in -> in
    // nin -> not in 
    /* 
    const courses = await Course
      //.find({price: {$gte: 10, $lte: 20}})
      .find({price: {$in: [10, 15, 20]}})
      .limit(10)
      .sort({name: 1}) //1 ascending, -1 descending
      .select({name: 1, tags: 1}) */

    //complex queries
    /* const courses = await Course
      .find({author: 'Obi', isPublished: true})
      .limit(10)
      .sort({name: 1}) //1 ascending, -1 descending
      .select({name: 1, tags: 1}) */

   // Logical Operators
   // or
   // and
  /* const courses = await Course
   //.find({price: {$gte: 10, $lte: 20}})
   .find()
   .or([{author: 'Obi'}, {isPublished: true}])
   .limit(10)
   .sort({name: 1}) //1 ascending, -1 descending
   .select({name: 1, tags: 1}) */

   //Regular Expression
  /* const courses = await Course
   //Starts with Obi
   .find({author: /^Obi/})
   //Ends with Nwosu, append i to make it case insesitive /Nwosu$/i
   .find({author: /Nwosu$/})
   //Contains Obi, append i to make it case insesitive
  .find({author: /.*Mosh.*///-> take out this double slash})
  /*
   .limit(10)
   .sort({name: 1}) //1 ascending, -1 descending
   .select({name: 1, tags: 1}) */

//Counting
 /*  const courses = await Course
   //.find({price: {$gte: 10, $lte: 20}})
   .find({author: 'Obi', isPublished: true})
   .limit(10)
   .sort({name: 1}) //1 ascending, -1 descending
   .count() */

  // Pagination 
  const pageNumber = 2
  const pageSize = 10
    // /api/courses?pageNumber=2&pageSize=10
  const courses = await Course
  .find({author: 'Obi', isPublished: true})
  .skip((pageNumber -1) * pageSize)
  .limit(pageSize)
  .sort({name: 1}) //1 ascending, -1 descending
  .select({name: 1, tags: 1})

  //Import json file to DB
  //mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

  //UPDATING DOCUMENTS
  async function updateCourse(id) {
    // Approach: Query First
    // FindById()
    // Modify properties
    // save()
    const course = await Course.findById(id)
    if(!course) return
    course.set({
      isPublished: true,
      author: 'Jack'
    })
    const result = await course.save()
    console.log(result)

    //Approach: Update first
    //Update directly
    //optionally: get the updated document
    //See DOCS for latest way to do it
    const courseMethod2 = await Course.updateOne({_id: id}, {
      $set: {
        author: 'Kano',
        isPublished: false
      }
    })

  }

  // Reomoving DOCUMENTS
  async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id})

  }

    console.log(courses)
  }
  getCourses()

  //VALIDATION
 
    const courseSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
      category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
      },
      author: String,
      //custom validation
      tags: {
        type: Array,
        validate: {
          validator: function(v) {
            return v && v.length > 0
          },
          message: 'Course should have at least one tag'
        }
      },
      //custom validation using async
      tags: {
        type: Array,
        validate: {
          isAsync: true,
          validator: function(v, callback) {
            setTimeout(() => {
              // Do some async work
              const result = v && v.length > 0
              callback(result)
            }, 1000)
          },
          message: 'Course should have at least one tag'
        }
      },
      date: {type: Date, default: Date.now},
      isPublished: Boolean,
      price: {
        type: Number,
        required: function() {return this.isPublished},
        min: 10,
        max: 50
      }
    })
    async function validateCourse(){
      const course = new Course({
        name: 'React Course',
        author: 'Obi',
        tags: ['React', 'frontend'],
        isPublished: true,
        price: 15
      })

    try {
      const result = await course.save()
      console.log(result)
    } catch (error) {
      //VALIDATION ERRORS
      for (field in error.errors){
        console.log(error.errors[field].message)
      }
    }
  }
