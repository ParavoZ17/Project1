import { eventsStore } from './data.js';

const container = document.querySelector('.eventsList');
const form = document.querySelector('.formEvents');

document.addEventListener('DOMContentLoaded', () => {
  createEventList(eventsStore);
  populateCategorySelect(eventsStore);
  dateSelect(eventsStore);
});

form.addEventListener('change', () => {
  const date = form.querySelector('.selectDate').value;
  const type = form.querySelector('.selectType').value;
  const distance = form.querySelector('.selectDistance').value;
  const category = form.querySelector('.selectCategory').value;

  const filtered = eventsStore.filter((event) => {
    const eventDate = event.date.toISOString().split('T')[0];

    return (
      (date === 'Any date' || eventDate === date) &&
      (type === 'Any type' || event.type === type) &&
      (distance === 'Any distance' || event.distance <= Number(distance)) &&
      (category === 'Any category' || event.category === category)
    );
  });

  createEventList(filtered);
});

function createEventList(data) {
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>No events found.</p>';
    return;
  }

  data.forEach((event) => {
    const item = document.createElement('li');

    const attendeesHTML = event.attendees ? `<p class="eventAttendees">${event.attendees} attendees</p>` : '';

    item.innerHTML = `
      <img src="${event.image}" alt="${event.description}">
      <div>
        <p class="eventDate">${event.date.toLocaleDateString()} ${event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <h3>${event.title}</h3>
        <p class="eventCategory">${event.category} <span>(${event.distance} km)</span></p>
        <p class="eventType2Page">${event.type}</p>
        ${attendeesHTML}
      </div>
    `;

    container.append(item);
  });}

  function populateCategorySelect(events) {
  const categorySelect = document.querySelector('.selectCategory');

  
  const defaultCategories = [
    "Hobbies and Passions",
    "Technology",
    "Business",
    "Social Activities",
    "Health and Wellbeing"
  ];

  categorySelect.innerHTML = '<option>Any category</option>'; // Початкова опція

  const categoriesSet = new Set();

  if (events.length > 0) {
    events.forEach(event => {
      if (event.category) {
        categoriesSet.add(event.category);
      }
    });
  } else {
    defaultCategories.forEach(cat => categoriesSet.add(cat));
  }

  categoriesSet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function dateSelect(events) {
  const dateSelect = document.querySelector('.selectDate');

  dateSelect.innerHTML = '<option>Any date</option>'; 

  const dateSet = new Set();

  events.forEach(event => {
    if (event.date instanceof Date) {
      const formattedDate = event.date.toISOString().split('T')[0];
      dateSet.add(formattedDate);
    }
  });


  const sortedDates = Array.from(dateSet).sort();

  sortedDates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });}
