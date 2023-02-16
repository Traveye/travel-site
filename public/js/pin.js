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
const editPinBtn = document.getElementById('edit-pin');
const editPinModal = document.getElementById('edit-pin-modal');
const closeEditPinBtn = document.getElementById('close-edit-pin');
const editPinSubmitBtn = document.getElementById('edit-pin-submit');
const editPinTitleInput = document.getElementById('pin-title-edit');

addTripSubmitBtn.addEventListener('click', async () => {
  try {
    const tripTitle = addTripTitleInput.value;
    const start_date = addTripStartDateInput.value;
    const end_date = addTripEndDateInput.value;
    if (!tripTitle || !start_date || !end_date) {
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
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
    if (response.ok) {
      document.location.replace(`/pin/${pinId}`);
    } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create trip.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete trip.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
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
      const response = await fetch('/api/trip/' + tripId, {
        method: 'PUT',
        body: JSON.stringify(updateTrip),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update trip.',
        })
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
      const currentNote = await fetch(`/api/trip/${tripId}`).then((res) => {
        return res.json()
      });
      if (currentNote.notes === note) {
        return;
      }
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to save note.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add journal entry.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
        return;
      }
      const newEntry = {
        content: entry,
        label: journalLabel,
        trip_id: tripId,
      };
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add journal entry.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
        return;
      }
      const deleteEntry = {
        content: entry,
        label: journalLabel,
        trip_id: tripId,
      };
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete journal entry.',
        })
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
      const metaData = JSON.parse(document.getElementById('meta-trip-' + tripId).getAttribute('data-meta')).trips;
      // clear out the select options
      while(deleteEntryInput.firstChild) {
        deleteEntryInput.removeChild(deleteEntryInput.lastChild);
      }
      // add the options
      const seenList = [];
      for(let i = 0; i < metaData.length; i++) {
        if(metaData[i].id == tripId) {
          for(let j = 0; j < metaData[i].journals.length; j++) {
            if(metaData[i].journals[j].label === journalLabel) {
              if(seenList.includes(metaData[i].journals[j].content)) {
                continue;
              }
              const journalEntry = metaData[i].journals[j].content;
              const option = document.createElement('option');
              option.value = journalEntry;
              option.textContent = journalEntry;
              deleteEntryInput.appendChild(option);
            }
          }
        }
      }
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
      if (!listLabel) {
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
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
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete journal list.',
        })
        return
      }
      deleteListModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

closeDeleteListBtn.addEventListener('click', () => {
  deleteListModal.setAttribute('hidden', true);
});

if (deleteListBtns) {
  for (let i = 0; i < deleteListBtns.length; i++) {
    deleteListBtns[i].addEventListener('click', async (event) => {
      event.preventDefault();
      const tripId = event.target.getAttribute('data-trip-id');
      const metaData = JSON.parse(document.getElementById('meta-trip-' + tripId).getAttribute('data-meta')).trips;
      // clear out the select options
      while(deleteListInput.firstChild) {
        deleteListInput.removeChild(deleteListInput.lastChild);
      }
      // add the options
      const seenList = [];
      for(let i = 0; i < metaData.length; i++) {
        if(metaData[i].id == tripId) {
          for(let j = 0; j < metaData[i].journals.length; j++) {
            const journalLabel = metaData[i].journals[j].label;
            if(seenList.includes(journalLabel)) {
              continue;
            }
            seenList.push(journalLabel);
            const option = document.createElement('option');
            option.value = journalLabel;
            option.textContent = journalLabel;
            deleteListInput.appendChild(option);
          }
        }
      }
      deleteListInput.value = '';
      deleteListModal.removeAttribute('hidden');
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
     
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete pin.',
        })
  }
});

const handleEditPinFormSubmit = async (pinId) => {
  editPinSubmitBtn.addEventListener('click', async () => {
    try {
      const title = editPinTitleInput.value;
      if (!title) {
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all required fields.',
        })
        return;
      }
      const response = await fetch(`/api/pin/${pinId}`, {
        method: 'PUT',
        body: JSON.stringify({ location_name: title }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/pin/${pinId}`);
      } else {
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to edit pin.',
        })
      }
      editPinModal.setAttribute('hidden', true);
    } catch (error) {
      console.log(error);
    }
  });
};

closeEditPinBtn.addEventListener('click', () => {
  editPinModal.setAttribute('hidden', true);
});

editPinBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const pinId = event.target.getAttribute('data-pin-id');
  editPinTitleInput.value = '';
  editPinModal.removeAttribute('hidden');
  handleEditPinFormSubmit(pinId);
});


//code to add fixed map to pin page

  // route to get the coordinate date for the pin from the url
  const url = window.location.pathname;
  const urlPin = url.substring(url.lastIndexOf('/') + 1);
  // async function to get the coordinate data
  const getCoordinates = async () => {
    try {
      //async fetch to get the coordinate data
      const response = await fetch(`/api/pin/${urlPin}`) 
      const data = await response.json();
      const [longitude, latitude] = data.coordinates.coordinates;
      return [latitude, longitude];
    }
    catch (error) {
      console.log(error);
    }
  };

window.onload = async function() {
  // get the coordinates
  let coordinates = await getCoordinates();

  
  // create the fixed map
  var fixedmap = L.map("fixedMap").setView(coordinates, 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(fixedmap);
};
