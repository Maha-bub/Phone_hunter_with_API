const  loadPhone = async (searchValue='13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchValue}`,
  );
  const data = await res.json();
  // console.log(data.data)
  const phones = data.data;

  displayPhonesData(phones,isShowAll);
};

const displayPhonesData = (phones,isShowAll) => {
  // console.log(phones);
  const phoneCardContainer = document.getElementById("phone-card-container");
  // clear phone container before adding new search result
  phoneCardContainer.textContent = "";

  // display show all button if there are  more then 12 phones
  if (phones.length > 12 && !isShowAll) {
    const showAllButton = document.getElementById("show-all-btn");
    showAllButton.classList.remove("hidden");
  } else {
    const showAllButton = document.getElementById("show-all-btn");
    showAllButton.classList.add("hidden");
  }

//display only first 12 phones if not show all(!showAll) 
if(!isShowAll){
    phones = phones.slice(0, 12);
}

//   console.log(phones);
  console.log('Is show all:',isShowAll);

  phones.forEach((phone) => {
    // console.log(phone);

    // show phones on ui follow the 4 steps
    //step-1:create a div section for all html elements(card section)
    const phoneCard = document.createElement("div");

    //step-2: set phonecard classlist for tailwind style layout
    phoneCard.classList = `card bg-base-100 p-4 w-80 h-80 m-auto gap-y-8 justify-around shadow-sm`;
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
              <button onclick="handleShowModal('${phone.slug}'),show_details_modal.showModal()" class="btn btn-primary ">Show Details</button>
            </div>
          </div>`;

    //step-4: append phonecard html elements in phone-card-container

    phoneCardContainer.appendChild(phoneCard);
  });

  //handle loading spiner for hide
  toggleLoadinSpiner(false);
};


//show details button and open dilogue modal
const handleShowModal= async(id)=>{
    console.log('show detailed button clicked!',id)
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    console.log(data);
}

// hnadle  search button

const handleSearch = (isShowAll) => {
  toggleLoadinSpiner(true);
  const searchField = document.getElementById("search-field-data");
  const searchText = searchField.value;
//   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadinSpiner = (isLoading) => {
  if (isLoading) {
    const toggleSpiner = document.getElementById("loading-spiner");
    toggleSpiner.classList.remove("hidden");
  } else {
    const toggleSpiner = document.getElementById("loading-spiner");
    toggleSpiner.classList.add("hidden");
  }
};


// Handle Show all button

const handleShowAll=()=>{
    handleSearch(true)
}

loadPhone();