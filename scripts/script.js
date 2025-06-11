import { eventsStore } from './data.js';

const container = document.querySelector('.eventsList');
const form = document.querySelector('.formEvents');

document.addEventListener('DOMContentLoaded', () => {
  createEventList(eventsStore);
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

    const attendeesHTML = event.attendees
      ? `<p class="eventAttendees">${event.attendees} attendees</p>`
      : '';

    item.innerHTML = `
      <img src="${event.image}" alt="${event.description}">
      <div>
        <p class="eventDate">${event.date.toLocaleDateString()} ${event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <h3>${event.title}</h3>
        <p class="eventCategory">${event.category} <span>(${event.distance} km)</span></p>
        ${attendeesHTML}
      </div>
    `;

    container.append(item);
  });
}