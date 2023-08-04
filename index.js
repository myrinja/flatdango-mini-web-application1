

document.addEventListener("DOMContentLoaded", function() {
  let div = document.querySelector('#listy');
  let ul = document.createElement('ul');
  ul.id = "movies";
  div.appendChild(ul);

  let base_url = "http://localhost:3000/films";

  function buyTicketBtn(event) {
    const selectedButton = event.target; 
    const li = selectedButton.closest('li'); 

    if (!li) {
      return; 
    }

    const selectedMovie = li.dataset.movie;
    const ticketsSold = parseInt(li.dataset.ticketsSold);
    const capacity = parseInt(li.dataset.capacity);

    if (ticketsSold === capacity) {
      alert("ticket bought successfully");
      return;
    }

    // Update the tickets sold for the selected movie and the displayed available tickets
    li.dataset.ticketsSold = ticketsSold + 1;
    const availableTickets = capacity - (ticketsSold + 1);
    li.querySelector('.tickets-available').innerText = `Tickets available: ${availableTickets}`;
  }

  fetch(base_url)
    .then(res => res.json())
    .then(data => {
      data.forEach(film => {
        let li = document.createElement('li'); // Create a new <li> element for each film
        li.dataset.movie = film.title;
        li.dataset.ticketsSold = film.tickets_sold;
        li.dataset.capacity = film.capacity;

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
            <button class="buy-ticket-btn">Buy Ticket</button>
          </p>
        `;
        ul.appendChild(li); // Append the <li> to the <ul>
        
        // Attach the event listener to the button within the li
        const btn = li.querySelector(".buy-ticket-btn");
        btn.addEventListener('click', buyTicketBtn);
      });
    });
});







