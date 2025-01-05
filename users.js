// fetching data 
fetch('https://jsonplaceholder.typicode.com/users')
    .then (response => response.json())
   .then(function(users){
    let dataOutPut = document.querySelector("#data-output");
    let out = "";
    for (let user  of users){
     out += `
     <tr>
      <td> ${user.name} </td>
      <td> ${user.email} </td>
      <td> ${user.phone} </td>
      <td> ${user.company.name} </td>
     
     </tr>

   `  ; 
 }
 dataOutPut.innerHTML = out;
})


// darkmode

let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

// search bar 

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchBar = document.getElementById('search-bar');

  // Handle form submission
  searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      const query = searchBar.value.trim(); 
      if (query) {
          performSearch(query); 
      }
  });

  function performSearch(query) {
      console.log("Searching for:", query); 
      
      //Filter the table rows based on the query
      const tableBody = document.getElementById('data-output');
      const rows = tableBody.getElementsByTagName('tr');

      for (let row of rows) {
          const name = row.getElementsByTagName('td')[0].textContent.toLowerCase();
          if (name.includes(query.toLowerCase())) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      }
  }
});