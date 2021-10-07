const section = document.createElement("section");
section.innerHTML = `
<input class="enter-user-name" required placeholder="Enter user name" >
  <button onclick="findCountry()">Find Country</button>
  `;

const info = document.createElement("div");
info.className = "user-list";

document.body.append(section, info);
// var userName;
function findCountry() {
  userName = document.querySelector(".enter-user-name").value;
  // console.log(userName);
  getDetails();
  displayCountry();
}

async function getDetails() {
  // console.log(userName);
  const data = await fetch("https://api.nationalize.io/?name=" + userName, {
    method: "GET"
  });
  const users = await data.json();
  // console.log(users);
  return users;
}

// async function displayCountry() {
//   const users = await getDetails();
//   console.log(users);
//   const userList = document.querySelector(".user-list");
//   const countryDetails = users.country;
//   let probabilities = [];
//   countryDetails.forEach((object) => {
//     // console.log(object);
//     probabilities.push(object.probability);
//   });

//   let highestProbability = Math.max(...probabilities);

//   console.log(highestProbability);
//   countryDetails.forEach((countryName) => {
//     if (countryName.probability == highestProbability) {
//       console.log(countryName.country_id);
//       console.log(countryName.probability);
//       userList.innerHTML = `<div class="user-container">
//   <h2 class="country-name">Country: ${countryName.country_id}</h2>
//   <h2 class="probability">Probability: ${countryName.probability}</h2>
// </div>`;
//     }
//   });
// }

async function displayCountry() {
  try {
    const users = await getDetails();
    console.log(users);
    var userList = document.querySelector(".user-list");
    var countryDetails = users.country;
    // console.log(countryDetails == []);
    let noResults;
    if (countryDetails == []) {
      return noResults;
    }
    userList.innerHTML = `<div class="user-container">
  <h2 class="first-country">First Country: <span style="color:crimson">${countryDetails[0].country_id}</span> ,  Probability: <span style="color:crimson">${countryDetails[0].probability}</span></h2>
  <h2 class="second-country">Second Country: <span style="color:crimson">${countryDetails[1].country_id}</span> , Probability: <span style="color:crimson">${countryDetails[1].probability}</span></h2>
</div>`;
  } catch (noResults) {
    userList.innerHTML = `<p class="errorMsg">Please enter a valid Name</p>`;
    console.log("catched error");
  }
}
