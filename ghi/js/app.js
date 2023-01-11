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


//This top part of this file is a function that creates a bootstrpa card than is going to dynamiclly created each time we add something to the database
//Within it we have the backtick `` and $ makind the function dynamic by highlighting the parameters within
//The date time is an exception as we had to look at the bootstrap to implements a card footer and the date

//Once we created the function we started with our async function where we created window.addEventListener('DOMContentLoaded', async () => {} function
//within it we define the url of where we want to get conferences. You can get this in insomnia. In our case it's LIST CONFERENCE
//Then we wrap everything in a try and except. We then error handle if !response.ok and return a error message of our choosing
 //THen at the else is where the important stuff happens

 //within the  if (detailResponse.ok) {} we first need a varible with the      await detailResponse.json();    THIS IS THE BACKBONE OF THE REST
 //Once we define the varailbe, in this case it's details, we can now go inside the object and see what the availible parameters are within it
 //By console.log(details.confrence) keys such as name, description, location, anything we defined in our models. The exception being the Dates as those are made in insombnia when we run a post request
 //From there we can make variables equal to details.conference.name;, details.conference.location.picture_url;, details.conference.location.name;

 //Once we define what we want to be shown on the frontend(name,picture,date,location) we can now make a html varailbe that takes the function from the top of the file and
// and creates a card for us my inputting the variable we defiend above(name,picture,date,location) as parameters within the varialbe
//We also have to add each parameter to the function at the top of the if we keep adding stuff
//finally we end it with column.innerHTML += html; that modifies the column varailbe and we error with catch at the end


//We also have to make sure than within the index.httl that all scripts are running fine
//Script at the top that links this file and the html
//and the script in the bottom that does the bootstrap(Not sure what this one does)
//when making the spacing for the cards make sure there's no columns between that would get in the way



//Everything below was before or step by step tips that end with what we have above


  //Putting console.log will print what you want to see in the console as you work at each step(DO IT WILL SAVE YOU FROM HEADACHE)
//WHATEVER VARIBLE YOU ASSINGING TO THE AWAIT COMMAND IS THE FIRST THING YOU GO INTO IN THE INNERHTML TAG
//OR IF THERE IS A FOR LOOP IT IS THE FIRST THING EVERYTHING WILL REFRENCE. WITHIN CONFRENCE WE WANT ALL OF THESE THIGNS


//      in the code above where we get confeernce list we only go insdie the wait command varialbe and confernce.
//      It's only in the details where we have to go deeper

//Becuase the details URL is daninling the name and descirption we can also add an image field based of our models
//The only diffrence is we just need a query selector varialbe and instead of INNERHTML we use .src
