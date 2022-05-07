import Web3 from 'web3'
import BookMark from '../build/contracts/BookMark.json'

let web3
let bookmarks


const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
              window.ethereum.enable()
                .then(() => {
                   resolve(
                         new Web3(window.ethereum)
                   ) 
                })
                .catch(err => {
                    reject(err)
                })
                return
        } 

          if (typeof window.web3 !== 'undefined') {
            return resolve (
                new Web3(window.web3.currentProvider)
            )
        }

        resolve(new Web3('http://localhost:9545'))
    })
}

const initContract = () => {
    const deploymentKey = Object.keys(BookMark.networks)[0];
    return new web3.eth.Contract(
      BookMark.abi, 
      BookMark
        .networks[deploymentKey]
        .address
    );
}



const initApp = () => {

const inputEl = document.querySelector('input')
const saveEl = document.querySelector('button')
const tabEl = document.querySelector('#tab-btn')
const deleteBtn = document.querySelector('#delete-btn')
const ulEl = document.querySelector('#ul-el')
let myLeads = []
let accounts = []

 web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts
        })

const savedLeads = JSON.parse(localStorage.getItem('myLeads'))

// Get already Saved contracts on page load
bookmarks.methods
        .get()
        .call()
        .then(results => {
            render(results)
        })


if (savedLeads) {
    myLeads = savedLeads
    render(myLeads)
}


saveEl.addEventListener('click', function(){
    if (!inputEl.value) {
        alert('please fill in something')
        return
    }

    bookmarks.methods
        .set(inputEl.value)
        .send({from: accounts[0]})
        .then(() => {
            return bookmarks.methods
                .get()
                .call()
        })
        .then(results => {
            render(results)
        })

     inputEl.value = ''
})


tabEl.addEventListener('click', function(){
    // Grab the url of the current tab!
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })

})

deleteBtn.addEventListener('click', function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function render(leads)  {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li> <a href=${leads[i]} tab='_blank'>${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}


}

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3
            bookmarks = initContract()
            initApp()
        })
        .catch(err => console.log(err.message))
})