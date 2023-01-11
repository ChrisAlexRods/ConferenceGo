window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const selectTag = document.getElementById('state');
      for (let state of data.states) {
        const option = document.createElement('option');
        option.value = state.abbreviation;
        option.innerHTML = state.name;
        selectTag.appendChild(option);
      }

      const formTag = document.getElementById('create-location-form')
      formTag.addEventListener('submit', async event => {
        event.preventDefault()
        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        console.log(json)
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
    }})
    } catch (error) {
      console.error(`Fetch Error: ${error}`);
    }
  });


// state: This is the current state object being iterated over in the loop,
// it contains the abbreviation and name of each state as properties,
// and it's taken from the data.states array returned by the API.

// option: This is a new option element that is created for each iteration of the loop.
//  It represents an option in the HTML select tag.(IT's a HTML TAG WE"RE MANIPULATING)

// option.value: This is a property of the option element that sets the value of the
// option to the state's abbreviation.

// option.innerHTML: This is a property of the option element that sets the text displayed
// for the option to the state's name.

// selectTag: This is the select tag element in the HTML document that is selected by
//  document.getElementById('state'), it is used as a reference to append the options to it.

// selectTag.appendChild(option): This is the method that appends the new option element to the select tag,
//  which will make it appear as a new option in the dropdown list.