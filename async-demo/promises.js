/* const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1)
    reject(new Error('message'))
  }, 2000)
})

p
.then(result => console.log('Result:', result))
.catch(err => console.log('Eror', err.message)) */

console.log('Before')
//working with promises
getUser(1)
  .then(user => getRepositories(user.username))
  .then(repos => console.log('Repos', repos))
  .catch(err => console.log('Error', err.message))
console.log('After')

//Fixing callbacks with promises
function getUser(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Read User From DB...')
      resolve({id: id, username: 'kashymeh'})
    }, 2000)
  })
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000)

  })
}