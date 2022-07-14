showbooks();
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
  heading.innerHTML = `<h1>Available Books: ${book_name_obj.length}</h1>`;
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
    heading.innerHTML = "<h1>Available Books</h1>";
    let tb = document.getElementById("table_body");
    tb.innerHTML = `<tr><td><p>No book exists, try adding a book here.</p></td></tr>`;
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  let input_val = search.value;
  lower_input_val = input_val.toLocaleLowerCase();
  input_val = capitalizeFirstLetter(input_val);
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
      book_name_search.includes(input_val || lower_input_val) ||
      author_name_search.includes(input_val || lower_input_val) ||
      book_type_search.includes(input_val || lower_input_val)
    ) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});
