const loadphone = async(searctext,datalimit) =>{
    const link = `https://openapi.programming-hero.com/api/phones?search=${searctext}`;
    const res =await fetch(link);
    const data =await res.json();
    displayphone(data.data, datalimit);
}
const displayphone = (phones, datalimit) =>{
    const getphonecontainer = document.getElementById('phone-container');
    getphonecontainer.textContent='';
    
    
    if (datalimit && phones.length > 10) {
      phones = phones.slice(0, 5);
      const showbtn = document.getElementById('showall');
      showbtn.classList.remove('d-none')
    } else {
      showbtn.classList.add('d-none')
    }
    const getsearchresult = document.getElementById('search-result');
    if (phones.length === 0) {
      getsearchresult.classList.remove('d-none')
    } else {
      getsearchresult.classList.add('d-none')
    }
    phones.forEach(phone=>{
        const createphonediv = document.createElement('div');
        createphonediv.classList.add('col');
        createphonediv.innerHTML= `<div class="col">
        <div class="card h-100">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title"> ${phone.phone_name
            }</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadshowdetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>`;
      getphonecontainer.appendChild(createphonediv);
    });
    loadspinner(false);
}
const datainfo = (datalimit) =>{
  loadspinner(true);
  const getsearch = document.getElementById('exampleFormControlInput1');
  const getText = getsearch.value;
  loadphone(getText, datalimit);
}
document.getElementById('exampleFormControlInput1').addEventListener("keypress",function(e){
  if (e.key === "Enter") {
    datainfo(10);
  }
})
document.getElementById('searchbtn').addEventListener("click",function(){
  datainfo(10);
})
const loadspinner = spinner =>{
  const getSpinner = document.getElementById('spinner');
  if (spinner) {
    getSpinner.classList.remove('d-none')
  } else {
    getSpinner.classList.add('d-none')
  }
}
document.getElementById('showbtn').addEventListener("click",function(){
  datainfo();
})

const loadshowdetails = async(id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);

}