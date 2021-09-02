const loadBook = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // clear text field
    searchInput.value = '';
    // clear error message
    document.getElementById('error-msg').innerText=''
    // clear total result
    document.getElementById('total-result').innerText=''
    // clear book details
    const bookDetails = document.getElementById('book-details');
    bookDetails.textContent = '';
        // error massege
    if (searchText === '') {
        document.getElementById('error-msg').innerText='Please Write Something'
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayBooks(data.docs))
    }
}

// display all book
const displayBooks = (books) => {
    document.getElementById('total-result').innerText = `Result: ${books.length}`
    document.getElementById('error-msg').innerText=''
    
    const bookDetails = document.getElementById('book-details');
    bookDetails.textContent = '';
    // error massege
    if (books.length === 0) {
        document.getElementById('error-msg').innerText="Sorry, No Result Found!"
    }
    else {
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');

            //default image
            let imageUrl = ``;
            if (book.cover_i === undefined) {
                imageUrl = 'images.png'
            }
            else {
                imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            }

            // ignore undefine book name
            let authorName = '';
            if (book.author_name !== undefined) {
                authorName = book.author_name[0];
            }

            // ignore undefine first publish year
            let firstPublishYear = '';
            if (book.first_publish_year !== undefined) {
                firstPublishYear = book.first_publish_year;
            }
            // ignore undefine publisher
            let publisherName = ''
            if (book.publisher !== undefined) {
                publisherName = book.publisher[0]
            }

            div.innerHTML = `
            <div class="card mt-4 h-100">
                <img class="img-height w-75 mx-auto pt-3" src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-title"><strong>Book Name:</strong> ${book.title}</p>
                    <p ><strong>Author Name: </strong>${authorName}</p>
                    <p class="card-text"><strong>First Publish Year: </strong>${firstPublishYear}</p>
                    <p><strong>Publisher: </strong>${publisherName}</p>
                </div>
            </div>
            `;
            bookDetails.appendChild(div)
        });
    }
}

