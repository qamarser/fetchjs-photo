const tableBody = document.getElementById('data-output');

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

const addDataButton = document.querySelector('.add_data');
const addDataForm = document.getElementById('add-data-form');
const overlay = document.getElementById('overlay');

addDataButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (addDataForm.style.display === 'none' || addDataForm.style.display === '') {
        addDataForm.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        addDataForm.style.display = 'none';
        overlay.style.display = 'none';
    }
});

overlay.addEventListener('click', function () {
    addDataForm.style.display = 'none';
    overlay.style.display = 'none';
});

//add data 

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('data-output');

  addDataForm.addEventListener('submit',function(event){
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;

    const newUser  = {
      name: name,
      email: email,
      phone: phone,
      company: {
          name: company
      }
  };

  fetch('https://jsonplaceholder.typicode.com/users',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
      // Add the new user to the table
      const newRow = document.createElement('tr');
      newRow.dataset.userId = data.id;
      newRow.innerHTML = `
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.phone}</td>
          <td>${data.company.name}</td>
          <td><button class="remove_border delete-btn"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg>
       </button></td>
      `;
      tableBody.appendChild(newRow);

      addDataForm.style.display = 'none';
      overlay.style.display = 'none';

      addDataForm.reset();
  }).catch(error => {
    console.error('Error:', error);
    });
  });
});


//delete row
tableBody.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
      // Confirm deletion (optional)
      const confirmDelete = confirm('Are you sure you want to delete this row?');
      if (confirmDelete) {
          // Remove the row from the table
          const row = event.target.closest('tr');
          if (row) {
          row.remove();}

          // send a DELETE request to the API to remove the data from the server
          const userId = row.dataset.userId; 
          if (userId) {
              fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                  method: 'DELETE'
              })
              .then(response => {
                  if (response.ok) {
                      console.log('User  deleted successfully');
                  } else {
                      console.error('Failed to delete user');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
              })} else {
                row.remove(); // Remove the row if no user ID is present
            }
          }
      }
  });

  
