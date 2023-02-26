// data.docs[90].cover_i
// data.docs[0].title 
// data.docs[0].author_name
// data.docs[20].publisher
// data.docs[20].publish_date


//============== Search Button TO Get API Data ==============//
const bookSearchButton = () => {
  const inputField = document.getElementById("book_search_field");
  const searchText = inputField.value;
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displaySearchResults(data));
}


//============== Search Results Show ==============//
const displaySearchResults = books => {
  const booksData = books.docs;
  const bookContainer = document.getElementById("books_search_results");
  const SearchResult = document.getElementById("shows_result");
  const resultCounter = document.getElementById("show_result_counter");
  bookContainer.textContent = "";
  document.getElementById("book_search_field").value = "";
  resultCounter.innerText = 0;
  if (booksData.length == 0) {
    const div = document.createElement("div");
    div.innerHTML = `
    <p id="no_result_found">No results found...  :(</p>
    `;
    bookContainer.appendChild(div);
  }

  SearchResult.style.visibility = "visible";
    resultCounter.innerText = parseInt(resultCounter.innerText) + parseInt(booksData.length);

  books.docs.forEach(book => {
    let publishDate;
    let title;
    let imageLink;
    let authorName;
    let publisher;
    const div = document.createElement("div");
    div.classList.add("books_container");

    //============== Cover Image ==============//
    if (!book.cover_i) {
      imageLink = "../images/noImage.jpg";
    } else {
      imageLink = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }

    //============== Book Title ==============//
    if (!book.title) {
      title = "Unknown"
    } else {
      title = book.title;
    }

    //============== Author Name ==============//
    if (!book.author_name) {
      authorName = "Unknown"
    } else {
      authorName = book.author_name[0];
    }

    //============== Publisher ==============//
    if (!book.publisher) {
      publisher = "Unknown";
    } else {
      publisher = book.publisher[0];
    }

    //============== Published Date ==============//
    if (!book.publish_date) {
      publishDate = "Unknown";
    } else {
      publishDate = book.publish_date[0];
    }

    div.innerHTML = `
    <div>
    <img src="${imageLink}" alt=""></div>
    <div class = "books_container_infos">
    <h1>Title: ${title}</h1>
    <h2>Author: ${authorName}</h2>
    <h3>Publisher: ${publisher}</h3>
    <p>Publish Date: ${publishDate}</p>
    </div>
    `;
    bookContainer.appendChild(div);
  })
}