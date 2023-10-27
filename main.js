// SINGLE PAGE
const currentURL = window.location.href
const urlParams = new URL(currentURL)
const countryAlpha = urlParams.searchParams.get(`alpha`)

const countriesDetail=  document.querySelector(".details");
const getSingleCountry =async()=>{
const url = "https://restcountries.com/v3.1";
 
 try {
  const response = await fetch(`${url}/alpha/${countryAlpha}`)
  const data = await response.json()
  const {cca3,nativename, currencies} = data[0]

  console.log(currencies);
  const {name} = currencies
console.log(name);

  const singleCountryHtml = data.map((detail)=>{
 return `<div class="details">
          <div class="Country-flag">
            <img src="${detail.flags.png}" class="image" />
          </div>
          <div class="country-details">
            <div class="detail1">
              <h3>${detail.name.common} </h3>
              <p><span>native name:</span>${detail.nativename?detail.nativename:`No Native Name`}</p>
              <p><span>population:</span>${detail.population.toLocaleString(`en-US`)}</p>
              <p><span>region:</span>${detail.region}</p>
              <p><span>sub-region:</span>${detail.subregion} </p>
              <p><span>capital:</span>${detail.capital}</p>
            </div>
            <div class="detail2">
              <p><span>top level domain:</span></p>
              <p><span>currencies:</span>${detail.currencies.name} </p>
              <p><span>language:</span>${detail.languages}</p>
            </div>
            <div class="detail3">
              <h3>border countries:</h3>
              <div class="border">
                <!-- single border -->
                <div class="single-border element">
                  <p>${detail.borders[0]}</p>
                </div>
                <!-- end of item -->
                <!-- single border -->
                <div class="single-border element">
                  <p>${detail.borders[1]}</p>
                </div>
                <!-- end of item -->
                <!-- single border -->
                <div class="single-border element">
                  <p>${detail.borders[2]}</p>
                </div>
                <!-- end of item -->
              </div>
            </div>
          </div>
        </div>`
  }).join("");
  countriesDetail.innerHTML = singleCountryHtml;
 } catch (error) {
  console.log(error);
 }
}

getSingleCountry()