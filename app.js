
// Region Filter 
const filterBtn  = document.querySelector(".drop-down")
const dropDown = document.querySelector(".dropdown-details");
filterBtn.addEventListener("click", ()=>{
 dropDown.classList.toggle("show-region");
});


const countriesContainer = document.querySelector(".countries");
const countryDetails = document.querySelector(".details");
// API FETCH
const url = "https://restcountries.com/v3.1";
let urlExtra = `all?fields=name,flags,population,region,capital,native-name,sub-region,currency,cca3`

let currentregion
let currentCountryName
const regions = document.querySelectorAll(`.region-filter .link`)
regions.forEach((region)=>{
 region.addEventListener(`click`,(e)=>{
  currentregion = e.currentTarget.innerHTML;
  urlExtra = `region/${currentregion}?fields=name,flags,population,region,capital,cca3`
  console.log(urlExtra);
  getCountries()
 })
})
// input
let input = document.querySelector(".input");
input.addEventListener("input", (e)=>{
 let name = e.target.value;
 urlExtra = `name/${name}?fields=name,flags,population,region,capital,cca3`
 console.log(urlExtra);
 getCountries()
});

const getCountries = async () => {
  try {
    const response = await fetch(
      `${url}/${urlExtra}`
    );
    if (!response.ok) {
      const msg = `There was an error ${response.status} ${response.statusText}`;
      throw new Error(msg);
    }
    let countries = await response.json();
    const countriesHtml = countries.map(function(country){
return `
<a href="single-country.html?alpha=${country.cca3}" class="single-country element" data-name="${country.name.common}">
          <div class="flag">
            <img src="${country.flags.png}" class="img" alt="" />
          </div>
          <div class="title">
            <h4>${country.name.common}</h4>
            <div class="details">
              <p><span>population:</span> ${country.population.toLocaleString(`en-US`)}</p>
              <p><span>region:</span>${country.region}</p>
              <p><span>capital:</span>${country.capital[0]}</p>
            </div>
          </div>
        </a>`
    }).join(``);
    countriesContainer.innerHTML = countriesHtml

    const newCountries = document.querySelectorAll(`.single-country`)
    newCountries.forEach((country)=>{
     country.addEventListener(`click`, (e)=>{
      currentCountryName =e.currentTarget.dataset.name
      localStorage.setItem(`currentCountry`, JSON.stringify(currentCountryName))
     })
    })
  } catch (error) {
    console.log(error);
  }
};
getCountries();
