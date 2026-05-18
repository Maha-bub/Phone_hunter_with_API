const loadPhone = async (searchValue) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchValue}`,
  );
  const data = await res.json();
  // console.log(data.data)
  const phones = data.data;

  displayPhonesData(phones);
};

const displayPhonesData = (phones) => {
  // console.log(phones);
  const phoneCardContainer = document.getElementById("phone-card-container");
  // clear phone container before adding new search result
  phoneCardContainer.textContent = "";


  
    // display show all button if there are  more then 12 phones
    if(phones.length>12){
        const showAllButton=document.getElementById('show-all-btn');
        showAllButton.classList.remove('hidden');
    }
    else{
        showAllButton.classList.add('hidden');
    }



    phones = phones.slice(0, 12);

    console.log(phones)



  phones.forEach((phone) => {
    console.log(phone);

  





    // show phones on ui follow the 4 steps
    //step-1:create a div section for all html elements(card section)
    const phoneCard = document.createElement("div");

    //step-2: set phonecard classlist for tailwind style layout
    phoneCard.classList = `card bg-base-100 p-4 shadow-sm`;
    //step-3: set inner html
    phoneCard.innerHTML = ` <figure>
            <img
              src="${phone.image}"
              alt="${phone.phone_name}"
            />
          </figure>
          <div class="card-body">
            <h2 class=" text-2xl font-bold card-title">${phone.phone_name}</h2>
            <p class="text-xl font-bold">Brand:
             ${phone.brand}
            </p>
            <div class="card-actions justify-center">
              <button class="btn btn-primary ">Buy Now</button>
            </div>
          </div>`;

    //step-4: append phonecard html elements in phone-card-container

    phoneCardContainer.appendChild(phoneCard);
  });
};

// hnadle  search button

const handleSearch = () => {
  const searchField = document.getElementById("search-field-data");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};
