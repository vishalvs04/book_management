//Constructor
showbooks();
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

//Display Constructor
class Display {
  constructor() {}

  add_book_localStorage(book) {
    let book_name = localStorage.getItem("book_names");
    let author_name = localStorage.getItem("author_names");
    let book_type = localStorage.getItem("book_types");
    let book_name_obj, book_type_obj, author_name_obj;
    if (book_name == null && author_name == null && book_type == null) {
      book_name_obj = [];
      author_name_obj = [];
      book_type_obj = [];
    } else {
      book_name_obj = JSON.parse(book_name);
      author_name_obj = JSON.parse(author_name);
      book_type_obj = JSON.parse(book_type);
    }
    book_name_obj.push(book.name);
    author_name_obj.push(book.author);
    book_type_obj.push(book.type);
    localStorage.setItem("book_names", JSON.stringify(book_name_obj));
    localStorage.setItem("author_names", JSON.stringify(author_name_obj));
    localStorage.setItem("book_types", JSON.stringify(book_type_obj));
  }
  clear() {
    let libraryform = document.getElementById("libraryform");
    libraryform.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  show(type) {
    let msg = document.getElementById("msg");
    if (type == "success") {
      msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong><center>Your Book is Successfully Added</center></strong> 
    </div>`;
    } else if (type == "danger") {
      msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong><center>Please enter the details correctly</center></strong> 
    </div>`;
    } else if (type == "info") {
      msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong><center>Your book is deleted</center></strong> 
    </div>`;
    }
    setTimeout(() => {
      msg.innerHTML = "";
    }, 2000);
  }
  show_delete_msg(type, name) {
    if (type == "info") {
      msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong><center>Your book ${name} has been successfully deleted</center></strong> 
    </div>`;
    }
    setTimeout(() => {
      msg.innerHTML = "";
    }, 2000);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// add submit event listener to libraryform
let libraryform = document.getElementById("libraryform");
libraryform.addEventListener("submit", libraryformsubmit);

function libraryformsubmit(event) {
  event.preventDefault();
  let name = document.getElementById("book_name").value;
  name = capitalizeFirstLetter(name);
  let author = document.getElementById("author").value;
  author = capitalizeFirstLetter(author);
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = "Fiction";
  } else if (programming.checked) {
    type = "Programming";
  } else if (cooking.checked) {
    type = "Cooking";
  }

  let books = new Book(name, author, type);
  //   console.log(books);
  let display = new Display();
  if (display.validate(books)) {
    display.add_book_localStorage(books);
    // display.add(books);
    display.clear();
    display.show("success");
  } else {
    //show error
    display.show("danger");
    display.clear();
  }
  showbooks();
}

function showbooks() {
  let heading = document.getElementById("heading");
  let book_name = localStorage.getItem("book_names");
  let author_name = localStorage.getItem("author_names");
  let book_type = localStorage.getItem("book_types");
  if (book_name == null && author_name == null && book_type == null) {
    book_name_obj = [];
    author_name_obj = [];
    book_type_obj = [];
  } else {
    book_name_obj = JSON.parse(book_name);
    author_name_obj = JSON.parse(author_name);
    book_type_obj = JSON.parse(book_type);
  }
  heading.innerHTML = `<h1>Your Books : ${book_name_obj.length}</h1>`;
  let html = "";
  if (book_name_obj.length != 0) {
    Array.from(book_name_obj).forEach(function (e, index) {
      html += `
      <tr id="${index}" class="bookTxt">
      <td>${book_name_obj[index]}</td>
                    <td>${author_name_obj[index]}</td>
                    <td>${book_type_obj[index]}</td>
            </tr>`;
      let tb = document.getElementById("table_body");
      tb.innerHTML = html;
    });
  } else {
    heading.innerHTML = "<h1>Your Books</h1>";
    let tb = document.getElementById("table_body");
    tb.innerHTML = `<tr><td><p>No book exists, try adding a book here.</p></td></tr>`;
  }
}
let deletebtn = document.getElementById("deletebtn");
deletebtn.addEventListener("click", function (e) {
  console.log("event fired");
  let tb = document.getElementById("table_body");
  let heading = document.getElementById("heading");
  heading.innerHTML = "<h1>Delete the book you want to:</h1>";
  let book_name = localStorage.getItem("book_names");
  let author_name = localStorage.getItem("author_names");
  let book_type = localStorage.getItem("book_types");
  if (book_name == null && author_name == null && book_type == null) {
    book_name_obj = [];
    author_name_obj = [];
    book_type_obj = [];
  } else {
    book_name_obj = JSON.parse(book_name);
    author_name_obj = JSON.parse(author_name);
    book_type_obj = JSON.parse(book_type);
  }

  let html = "";
  Array.from(book_name_obj).forEach(function (e, index) {
    html += `
          <tr id="${index}" class="bookTxt">
                  <td>${book_name_obj[index]}</td>
                  <td>${author_name_obj[index]}</td>
                  <td>${book_type_obj[index]}</td><button type="button" name="delete" id="${index}" class="btn btn-primary" onclick="delete_book(${index})">Delete</button>
          </tr>`;
  });
  if (book_name_obj.length != 0) {
    tb.innerHTML = html;
  } else {
    showbooks();
    let tb = document.getElementById("table_body");
    tb.innerHTML = `<tr><td><p>No book exists, try adding a book here.</p></td></tr>`;
  }
});
function delete_book(index) {
  let tb = document.getElementById("table_body");
  let book_name = localStorage.getItem("book_names");
  let author_name = localStorage.getItem("author_names");
  let book_type = localStorage.getItem("book_types");
  if (book_name == null && author_name == null && book_type == null) {
    book_name_obj = [];
    author_name_obj = [];
    book_type_obj = [];
  } else {
    book_name_obj = JSON.parse(book_name);
    author_name_obj = JSON.parse(author_name);
    book_type_obj = JSON.parse(book_type);
  }
  let display = new Display();
  display.show_delete_msg("info", book_name_obj[index]);
  book_name_obj.splice(index, 1);
  author_name_obj.splice(index, 1);
  book_type_obj.splice(index, 1);
  localStorage.setItem("book_names", JSON.stringify(book_name_obj));
  localStorage.setItem("author_names", JSON.stringify(author_name_obj));
  localStorage.setItem("book_types", JSON.stringify(book_type_obj));
  let html = "";
  Array.from(book_name_obj).forEach(function (e, index) {
    html += `
    <tr id="${index}">
                  <td>${book_name_obj[index]}</td>
                  <td>${author_name_obj[index]}</td>
                  <td>${book_type_obj[index]}</td><button type="button" name="delete" id="${index}" class="btn btn-primary" onclick="delete_book(${index})">Delete</button>
                  </tr>`;
  });
  if (book_name_obj.length != 0) {
    tb.innerHTML = html;
  } else {
    showbooks();
    let tb = document.getElementById("table_body");
    tb.innerHTML = `<tr><td><p>No book exists, try adding a book here.</p></td></tr>`;
  }
  showbooks();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  let input_val = search.value;
  if (search.value == "") {
    showbooks();
  }
  let bookTxt = document.getElementsByClassName("bookTxt");
  Array.from(bookTxt).forEach(function (element, index) {
    let book_name_search = element.getElementsByTagName("td")[0].innerText;
    let author_name_search = element.getElementsByTagName("td")[1].innerText;
    let book_type_search = element.getElementsByTagName("td")[2].innerText;
    // console.log(book_content)
    // console.log(card_txt);
    if (
      book_name_search.includes(input_val) ||
      author_name_search.includes(input_val) ||
      book_type_search.includes(input_val)
    ) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});
