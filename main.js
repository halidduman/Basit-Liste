// düzenleme seçenekleri
let editFlag = false;
let editElement;
let editID = "";

// gerekli html elementlerini seçme
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// !fonksiyonlar

const setBackToDefault = () => {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Ekle";
};

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

const addItem = (event) => {
    event.preventDefault(); // formun secilme sırasında sayfa yenilenmesini engelledik.
    const value = grocery.value; //input'un içerisindeki girilen değeri aldık.
  
    const id = new Date().getTime().toString();
  
    if (value !== "" && !editFlag) {
      const element = document.createElement("article");
      let attr = document.createAttribute("data-id");
      attr.value = id;
      element.setAttributeNode(attr);
      element.classList.add("grocery-item");
      element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>`;
  
      const deleteBtn = element.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", deleteItem);
      const editBtn = element.querySelector(".edit-btn");
      editBtn.addEventListener("click", editItem);
  
      list.appendChild(element);
      displayAlert("Başarıyla Eklendi", "success");
  
      // Form içeriğini temizle
      grocery.value = "";
    } else if (value !== "" && editFlag) {
      editElement.innerHTML = value;
      displayAlert("Başarıyla Değiştirildi", "success");
      setBackToDefault();
      addToLocalStorage(id,valueid,value);
  
      // Form içeriğini temizle
      grocery.value = "";
    }
  };
  

const deleteItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  list.removeChild(element);
  displayAlert("Başarıyla Kaldırıldı", "danger");
  setBackToDefault();
};

const editItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editElement = e.target.parentElement.parentElement.previousElementSibling;
  grocery.value = editElement.innerText;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Düzenle";
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }

  displayAlert("Liste Boş", "danger");
};

const addToLocalStorage = (id,value)=>{
    const grocery = {id,value}

    localStorage.setItem("list",JSON.stringify(grocery))
}

// ! olay izleyicileri

// form gönderildiğinde addItem fonksiyonu çalışır
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
