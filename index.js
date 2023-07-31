
let div = document.querySelector('#listy');
let ul = document.createElement('ul');
ul.id = "movies";
div.appendChild(ul);

let base_url =  "http://localhost:3000/films";

function buyTicketBtn(event) {
  event.stopPropagation(); // Prevent the click event from bubbling up to the li element
  const selectedMovie = event.currentTarget.dataset.movie;
  const movieElement = document.querySelector(`[data-movie="${selectedMovie}"]`);
  const ticketsSold = parseInt(movieElement.dataset.ticketsSold);
  const capacity = parseInt(movieElement.dataset.capacity);

  if (ticketsSold === capacity) {
    return;
  }

  // Update the tickets sold for the selected movie and the displayed available tickets
  movieElement.dataset.ticketsSold = ticketsSold + 1;
  const availableTickets = capacity - (ticketsSold + 1);
  movieElement.querySelector('.tickets-available').innerText = `Tickets available: ${availableTickets}`;
}

fetch(base_url)
  .then(res => res.json())
  .then(data => {
    data.forEach(film => {
      let li = document.createElement('li'); // Create a new <li> element for each film
      li.dataset.movie = film.title;
      li.dataset.ticketsSold = film.tickets_sold;
      li.dataset.capacity = film.capacity;

      let btn = document.createElement('button');
      btn.innerText = "Buy Ticket";

      const availableTickets = film.capacity - film.tickets_sold;  
      li.innerHTML = `
        <p>
          <h3> Movie title: ${film.title}</h3>
          <h3> movie runtime: ${film.runtime} minutes</h3>
          <h3> capacity: ${film.capacity}</h3>
          <h3> Showtime: ${film.showtime}</h3>
          <h3> Ticket sold: ${film.tickets_sold}</h3>
          <p> The description of the movie: ${film.description}</p>
          <h2 class="tickets-available">Tickets available: ${availableTickets}</h2>
          <img src='${film.poster}'>
        </p>
      `;
      ul.appendChild(li); // Append the <li> to the <ul>
      li.appendChild(btn);

      // Attach the event listener only to the "Buy Ticket" button
      btn.addEventListener('click', buyTicketBtn);
    });
  });










