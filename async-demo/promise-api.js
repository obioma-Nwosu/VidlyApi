//Creating resolved promises
const p = Promise.resolve({id: 1})
p.then(result => console.log(result))

//Creating already rejected promises
const pa = Promise.reject(new Error('message'))
pa.catch(error => console.log(error))

//Running promises in Parrellel
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('First Operation....')
    resolve(1)
  }, 2000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Second Operation....')
    resolve(2)
  }, 2000)
})

Promise.all([p1, p2])
  .then(result => console.log(result))