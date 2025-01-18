// Resources provided
const dateArray = ['25-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      '25-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Long Call'],
    },
  },
  {
    View: 'Bearish',
    Value: {
      '25-Apr-2024': ['Bear Call Spread', 'Long Put'],
      '31-May-2024': ['Long Put', 'Long Put'],
    },
  },
  {
    View: 'RangeBound',
    Value: {
      '02-May-2024': ['Short Straddle', 'Short Strangle'],
      '21-Jun-2024': ['Iron Condor'],
    },
  },
  {
    View: 'Volatile',
    Value: {
      '09-May-2024': ['Long Straddle', 'Long Strangle'],
    },
  },
];

let selectedView = 'Bullish';
let selectedDate = dateArray[0];

document.addEventListener('DOMContentLoaded', () => {
  populateDateDropdown();
  updateCards();

  document.getElementById('dateDropdown').addEventListener('change', updateCards);
});

function changeView(view) {
  selectedView = view;
  document.querySelectorAll('.toggle-view button').forEach((button) => {
    button.classList.remove('active');
    if (button.textContent === view) button.classList.add('active');
  });
  updateCards();
}

function populateDateDropdown() {
  const dropdown = document.getElementById('dateDropdown');
  dropdown.innerHTML = '';
  dateArray.forEach((date) => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dropdown.appendChild(option);
  });
  dropdown.value = selectedDate;
}

function updateCards() {
  const dropdown = document.getElementById('dateDropdown');
  selectedDate = dropdown.value;

  const cardsContainer = document.getElementById('cardsContainer');
  const emptyState = document.getElementById('emptyState');
  const emptyDate = document.getElementById('emptyDate');

  cardsContainer.innerHTML = '';
  const strategies = strategyArray.find((s) => s.View === selectedView)?.Value[selectedDate] || [];

  if (strategies.length > 0) {
    emptyState.style.display = 'none';

    const strategyCounts = {};
    strategies.forEach((strategy) => {
      strategyCounts[strategy] = (strategyCounts[strategy] || 0) + 1;
    });

    Object.entries(strategyCounts).forEach(([name, count]) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${name}</h3><p>${count} ${count > 1 ? 'Strategies' : 'Strategy'}</p>`;
      cardsContainer.appendChild(card);
    });
  } else {
    emptyState.style.display = 'block';
    emptyDate.textContent = selectedDate;
  }
}
