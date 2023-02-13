const pinId = document.getElementById('pin').getAttribute('data-pin-id');
const addTripModal = document.getElementById('add-trip-modal');
const addTripBtn = document.getElementById('add-trip');
const addTripTitleInput = document.getElementById('trip-title-input');
const addTripStartDateInput = document.getElementById('start-date-input');
const addTripEndDateInput = document.getElementById('end-date-input');
const closeAddTripBtn = document.getElementById('close-add-trip');
const addTripSubmitBtn = document.getElementById('add-trip-submit');
const deleteTripBtns = document.getElementsByClassName('delete-trip-btn');
const editTripBtns = document.getElementsByClassName('edit-trip-btn');
const editTripModal = document.getElementById('edit-trip-modal');
const editTripTitleInput = document.getElementById('trip-title-edit');
const editTripStartDateInput = document.getElementById('start-date-edit');
const editTripEndDateInput = document.getElementById('end-date-edit');
const closeEditTripBtn = document.getElementById('close-edit-trip');
const editTripSubmitBtn = document.getElementById('edit-trip-submit');
const saveNoteBtns = document.getElementsByClassName('save-note-btn');
const addListBtns = document.getElementsByClassName('add-list-btn');
const journalLabelInput = document.getElementById('journal-label-input');
const journalEntryInput = document.getElementById('journal-entry-input');
const closeAddJournalBtn = document.getElementById('close-add-journal');
const addJournalModal = document.getElementById('add-journal-modal');
const addJournalSubmitBtn = document.getElementById('add-journal-submit');
const addEntryBtns = document.getElementsByClassName('add-entry-btn');
const addEntryModal = document.getElementById('add-entry-modal');
const closeAddEntryBtn = document.getElementById('close-add-entry');
const addEntryInput = document.getElementById('add-entry-input');
const addEntrySubmitBtn = document.getElementById('add-entry-submit');
const deleteEntryBtns = document.getElementsByClassName('delete-entry-btn');
const deleteEntryModal = document.getElementById('delete-entry-modal');
const closeDeleteEntryBtn = document.getElementById('close-delete-entry');
const deleteEntrySubmitBtn = document.getElementById('delete-entry-submit');
const deleteEntryInput = document.getElementById('delete-entry-input');
const deleteListBtns = document.getElementsByClassName('delete-list-btn');
const deleteListModal = document.getElementById('delete-list-modal');
const closeDeleteListBtn = document.getElementById('close-delete-list');
const deleteListSubmitBtn = document.getElementById('delete-list-submit');
const deleteListInput = document.getElementById('delete-list-input');
const deletePinBtn = document.getElementById('delete-pin');

addTripSubmitBtn.addEventListener('click', async () => {
  try {
    const tripTitle = addTripTitleInput.value;
    const start_date = addTripStartDateInput.value;
    const end_date = addTripEndDateInput.value;
    if (!tripTitle || !start_date || !end_date) {
      alert('Please fill out all fields.');
      return;
    }
    const tripStartDate =
      new Date(start_date).getFullYear() +
      '-' +
      (new Date(start_date).getMonth() + 1) +
      '-' +
      new Date(start_date).getDate();
    const tripEndDate =
      new Date(end_date).getFullYear() +
      '-' +
      (new Date(end_date).getMonth() + 1) +
      '-' +
      new Date(end_date).getDate();
    const newTrip = {
      title: tripTitle,
      date_start: tripStartDate,
      date_end: tripEndDate,
      pin_id: pinId,
      notes: '',
    };
    const response = await fetch('/api/trip', {
      method: 'POST',
      body: JSON.stringify(newTrip),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace(`/pin/${pinId}`);
    } else {
      alert('Failed to add trip');
    }
    addTripModal.setAttribute('hidden', true);
  } catch (error) {
    console.log(error);
  }
});

closeAddTripBtn.addEventListener('click', () => {
  addTripModal.setAttribute('hidden', true);
  editTripModal.setAttribute('hidden', true);
});

addTripBtn.addEventListener('click', () => {
  addTripTitleInput.value = '';
  addTripStartDateInput.value = '';
  addTripEndDateInput.value = '';
  addTripModal.removeAttribute('hidden');
});

if (deleteTripBtns) {
  for (let i = 0; i < deleteTripBtns.length; i++) {
    deleteTripBtns[i].addEventListener('click', async (event) => {
      const tripId = event.target.getAttribute('data-trip-id');
      const response = await fetch(`/api/trip/${tripId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to delete trip');
      }
    });
  }
}

const handleEditFormSubmit = async (tripId) => {
  editTripSubmitBtn.addEventListener('click', async () => {
    try {
      const tripTitle = editTripTitleInput.value;
      const start_date = editTripStartDateInput.value;
      const end_date = editTripEndDateInput.value;
      if (!tripTitle || !start_date || !end_date) {
        alert('Please fill out all fields.');
        return;
      }
      const tripStartDate =
        new Date(start_date).getFullYear() +
        '-' +
        (new Date(start_date).getMonth() + 1) +
        '-' +
        new Date(start_date).getDate();
      const tripEndDate =
        new Date(end_date).getFullYear() +
        '-' +
        (new Date(end_date).getMonth() + 1) +
        '-' +
        new Date(end_date).getDate();
      const updateTrip = {
        title: tripTitle,
        date_start: tripStartDate,
        date_end: tripEndDate,
        pin_id: pinId,
        notes: '',
      };
      console.log(tripId);
      const response = await fetch('/api/trip/' + tripId, {
        method: 'PUT',
        body: JSON.stringify(updateTrip),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to add trip');
      }
      editTripModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

closeEditTripBtn.addEventListener('click', () => {
  editTripModal.setAttribute('hidden', true);
});

if (editTripBtns) {
  for (let i = 0; i < editTripBtns.length; i++) {
    editTripBtns[i].addEventListener('click', (event) => {
      const tripId = event.target.getAttribute('data-trip-id');
      editTripTitleInput.value = event.target.getAttribute('data-trip-title');
      editTripStartDateInput.value = event.target.getAttribute(
        'data-trip-date-start'
      );
      editTripEndDateInput.value =
        event.target.getAttribute('data-trip-date-end');
      editTripModal.removeAttribute('hidden');
      handleEditFormSubmit(tripId);
    });
  }
}

if (saveNoteBtns) {
  for (let i = 0; i < saveNoteBtns.length; i++) {
    saveNoteBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      const tripId = event.target.getAttribute('data-trip-id');
      const note = document.getElementById('note-' + tripId).value;
      const response = await fetch(`/api/trip/${tripId}`, {
        method: 'PUT',
        body: JSON.stringify({ notes: note }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to save note');
      }
    });
  }
}

closeAddJournalBtn.addEventListener('click', () => {
  addJournalModal.setAttribute('hidden', true);
});

const handleSubmitJournalForm = async (tripId) => {
  addJournalSubmitBtn.addEventListener('click', async () => {
    try {
      const journalLabel = journalLabelInput.value;
      const journalEntry = journalEntryInput.value;
      if (!journalLabel || !journalEntry) {
        alert('Please fill out all fields.');
        return;
      }
      const newJournal = {
        label: journalLabel,
        content: journalEntry,
        trip_id: tripId,
      };
      const response = await fetch('/api/journal', {
        method: 'POST',
        body: JSON.stringify(newJournal),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to add journal entry');
      }
      addJournalModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

if (addListBtns) {
  for (let i = 0; i < addListBtns.length; i++) {
    addListBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      journalLabelInput.value = '';
      journalEntryInput.value = '';
      addJournalModal.removeAttribute('hidden');
      const tripId = event.target.getAttribute('data-trip-id');
      handleSubmitJournalForm(tripId);
    });
  }
}

closeAddEntryBtn.addEventListener('click', () => {
  addEntryModal.setAttribute('hidden', true);
});

const handleSubmitEntryForm = async (tripId, journalLabel) => {
  addEntrySubmitBtn.addEventListener('click', async () => {
    try {
      const entry = addEntryInput.value;
      if (!entry) {
        alert('Please fill out all fields.');
        return;
      }
      const newEntry = {
        content: entry,
        label: journalLabel,
        trip_id: tripId,
      };
      console.log(newEntry);
      const response = await fetch('/api/journal', {
        method: 'POST',
        body: JSON.stringify(newEntry),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to add list item');
      }
      addEntryModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

if (addEntryBtns) {
  for (let i = 0; i < addEntryBtns.length; i++) {
    addEntryBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      const tripId = event.target.getAttribute('data-trip-id');
      const journalLabel = event.target.getAttribute('data-journal-label');
      addEntryInput.value = '';
      addEntryModal.removeAttribute('hidden');
      handleSubmitEntryForm(tripId, journalLabel);
    });
  }
}

closeDeleteEntryBtn.addEventListener('click', () => {
  deleteEntryModal.setAttribute('hidden', true);
});

const handleSubmitDeleteEntryForm = async (tripId, journalLabel) => {
  deleteEntrySubmitBtn.addEventListener('click', async () => {
    try {
      const entry = deleteEntryInput.value;
      if (!entry) {
        alert('Please fill out all fields.');
        return;
      }
      const deleteEntry = {
        content: entry,
        label: journalLabel,
        trip_id: tripId,
      };
      console.log(deleteEntry);
      const response = await fetch('/api/journal/one', {
        method: 'DELETE',
        body: JSON.stringify(deleteEntry),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert('Failed to delete journal entry');
      }
      deleteJournalModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

if (deleteEntryBtns) {
  for (let i = 0; i < deleteEntryBtns.length; i++) {
    deleteEntryBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      const tripId = event.target.getAttribute('data-trip-id');
      const journalLabel = event.target.getAttribute('data-journal-label');
      deleteEntryInput.value = '';
      deleteEntryModal.removeAttribute('hidden');
      handleSubmitDeleteEntryForm(tripId, journalLabel);
    });
  }
}

const handleDeleteListSubmit = async (tripId) => {
  deleteListSubmitBtn.addEventListener('click', async () => {
    try {
      const listLabel = deleteListInput.value;
      console.log(listLabel);
      if (!listLabel) {
        alert('Please fill out all fields.');
        return;
      }
      const response = await fetch('/api/journal/all', {
        method: 'DELETE',
        body: JSON.stringify({ trip_id: tripId, label: listLabel }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
        alert(
          'Failed to delete list. Please make sure you are spelling the list name correctly.'
        );
      }
      deleteListModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

closeDeleteListBtn.addEventListener('click', () => {
  deleteEntryModal.setAttribute('hidden', true);
});

if (deleteListBtns) {
  for (let i = 0; i < deleteListBtns.length; i++) {
    deleteListBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      const tripId = event.target.getAttribute('data-trip-id');
      deleteListInput.value = '';
      deleteListModal.removeAttribute('hidden');
      console.log(tripId);
      handleDeleteListSubmit(tripId);
    });
  }
}

deletePinBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const pinId = event.target.getAttribute('data-pin-id');
  const response = await fetch(`/api/pin/${pinId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete pin');
  }
});
