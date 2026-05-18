const loadPhone=async ()=>{
    
    const res=await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data=await res.json();
    // console.log(data.data)
    displayPhonesData(data);
}   

const displayPhonesData=phones=>{
    console.log(phones.data);
}


loadPhone();