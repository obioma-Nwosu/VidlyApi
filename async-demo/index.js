console.log('Before')

//using callbacks to display async functions results
getUser(1, function(user){
  console.log('User', user)
  getRepositories(user.username, repos => {
    console.log('Repos', repos)
  })

  //The above is known as the callback hell

  //To solve the problem all we need to do is to 
  //Replace all the anonymous functions with named functions
})
console.log('After')

//Using callBacks To handle async code
function getUser(id, callback){
  setTimeout(() => {
    console.log('Read User From DB...')
    callback({id: id, username: 'kashymeh'})
  }, 2000)
}

function getRepositories(username, callback) {
  setTimeout(() => {
    callback(['repo1', 'repo2', 'repo3'])
  }, 2000)
}
