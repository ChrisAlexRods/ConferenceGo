function createCard(name, description, pictureUrl, starts, ends, location) {
    return `

        <div class="col" >
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div class="card">
                    <img src="${pictureUrl}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                    </div>
                    <div class="card-footer">
                        ${new Date(starts).toLocaleDateString()} -
                        ${new Date(ends).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>

    `;
  }

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("something went wrong")
      } else {
        const data = await response.json();


        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = details.conference.starts;
            const ends = details.conference.ends;
            const location = details.conference.location.name;
            const html = createCard(title, description, pictureUrl, starts,ends, location);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
        console.log("There was an error" + e)
    }

  });


//Putting console.log will print what you want to see in the console as you work at each step(DO IT WILL SAVE YOU FROM HEADACHE)
//WHATEVER VARIBLE YOU ASSINGING TO THE AWAIT COMMAND IS THE FIRST THING YOU GO INTO IN THE INNERHTML TAG
//OR IF THERE IS A FOR LOOP IT IS THE FIRST THING EVERYTHING WILL REFRENCE. WITHIN CONFRENCE WE WANT ALL OF THESE THIGNS


//      in the code above where we get confeernce list we only go insdie the wait command varialbe and confernce.
//      It's only in the details where we have to go deeper

//Becuase the details URL is daninling the name and descirption we can also add an image field based of our models
//The only diffrence is we just need a query selector varialbe and instead of INNERHTML we use .src
