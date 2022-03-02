
const main = document.getElementById('main');
const phoneDiv = document.getElementById('phone-detail')

/* search part */
const loadPhone = () => {
    const input = document.getElementById('search-text');
    const error = document.getElementById('error')
    const searchText = input.value ;

    if(searchText == ""){
      error.innerText = "please enter your phone name"
      input.value=""
      main.innerHTML = ''
    }
    else{
        main.innerHTML = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
        input.value="" 
        error.innerHTML = ''
        phoneDiv.innerHTML = ''
   
    }
}
/* display show  */
const displayPhone = (phones) => {
    for(const phone of phones){
        const div = document.createElement('div')
        div.classList.add("col-lg-4")
        div.classList.add("mb-3")
        div.classList.add("mt-5")
        div.innerHTML = `
          <div class=" card shadow-lg pt-3 mb-5 bg-body rounded w-auto mx-auto" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top w-75 mt-3 rounded mx-auto d-block " alt="...">
            <div class="card-body my-2 text-center">
            <h5 class="card-title fw-bolder">Name:${phone.phone_name}</h5>
            <p class="card-text fw-bold"">Brand:${phone.brand}</p>
            <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
          </div>
        `;
        main.appendChild(div)
    }
  }
  /* detail information */
    const phoneDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
    

 }
  const displayDetails = (phone) =>{
   phoneDiv.innerHTML = ''
   
   
   phoneDiv.innerHTML = `
   <div class="card shadow-lg bg-body rounded  mx-auto mt-5 " style="width: 18rem;">
   <img src="${phone.image}" class="card-img-top mt-3 w-75 rounded rounded mx-auto d-block" alt="...">
   <div class="card-body">
   <h3 class="card-title fw-bolder">Name :${phone.name}</h3>
   <p class="card-text fw-bold">Release Date : ${phone.releaseDate ? phone.releaseDate: 'No releasedate found.'}</p>
   <br>
   <div class="lh-1 text-start ">
   <ul class="list-group fw-bold ">
   <p>MainFeatures:</p>
        <li class="list-group-item ">Chip Set :${phone.mainFeatures.chipSet} </li>
        <li class="list-group-item ">Display Size : ${phone.mainFeatures.displaySize}</li>
        <li class="list-group-item "> Memory :${phone.mainFeatures.memory} </li>
        <li class="list-group-item "> storage:${phone.mainFeatures.storage} </li>
        <br>
        <p>Sensor :</p>
        <li class="list-group-item "> Sensor :${phone.mainFeatures.sensors} </li>
        <br>
        <p>Others:</p>
        <li class="list-group-item">Bluetooth:${phone.others.Bluetooth} </li>
        <li class="list-group-item  ">WLAN :${phone.others.WLAN} </li>
        <li class="list-group-item">GPS :${phone.others.GPS} </li>
        <li class="list-group-item"> NFC :${phone.others.NFC} </li>
        <li class="list-group-item"> Radio :${phone.others.Radio} </li>
        <li class="list-group-item">USB :${phone.others.USB} </li>
      </ul></div>


   
   </div>
</div>
   `
   
   
  }