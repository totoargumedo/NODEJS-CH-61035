const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = e.target.elements.search.value;
  window.location.href = `/products?title=${searchValue}`;
});
