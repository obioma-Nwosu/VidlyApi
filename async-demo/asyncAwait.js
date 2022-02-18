
console.log('Before')
//Async
async function displayRepos() {
  try {
    const user = await getUser(1)
    const repos = await getRepositories(user.username)
    console.log(repos)
  } catch (error) {
    console.log('Error:', error)
  }
}

displayRepos()

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