export {observation_form_handler, bindings, formDisplay};
import {Model} from "./model.js"

//Observation form

//will show an error when the form is fully completed
window.addEventListener("observationAdded", function(){
    if(event.detail.status == "failed"){
        alert("Form error")
        document.getElementById("error").innerText = JSON.stringify(event.detail.errors)
        return error
    }
    else {
        Model.update_observations()
        location.replace("/#!/users/0")
        return event.detail.status
    }
})

//submitting the form will add the observations to the user observations
function observation_form_handler(){
    let formdata = new FormData(this);
    let show = Model.add_observation(formdata);
    console.log(show);
    return false;
}


function bindings(){
    let form = document.getElementById("observe-form");
    form.onsubmit = observation_form_handler;
}


function formDisplay() {
    let submit = "<h2>Submit Observations</h2>"
    submit += "<form action='#!/users/0' id='observe-form'> <label for=participant> Participant: </label><input type='text' id='participant' name='participant' type='hidden'><br>" 
    submit += "<label for=temperature>Temperature: </label><input type = 'number' name='temperature'><br>"
    submit += "<label for=weather>Weather: </label> <select id=weather name='weather'> <option value=''>--select weather--</option> <option value='fine'>fine</option> <option value=raining>raining</option> <option value=sunny>sunny</option> <option value=stormy>stormy</option> </select><br>"
    submit += "<label for=wind>Wind: </label><select id=wind name='wind'> <option value=''>--select wind--</option> <option value=none>none</option> <option value=light>light</option> <option value=medium>medium</option> <option value=strong>strong</option> </select><br>"
    submit += "<label for=location>Location: </label><input type='text' name=location><br>"
    submit += "<label for=height>Height: </label><input type = 'number' step = '.1' min = '0' name='height'><br>"
    submit += "<label for=girth>Girth: </label><input type = 'number' step = '.1' min = '0' name='girth'><br>"
    submit += "<label for=leaf_size>Leaf Size: </label><select id='leaf_size' name='leaf_size'> <option value=''>--select leaf size--</option> <option value='small'>Small</option><option value='medium'>Medium</option><option value='large'>Large</option></select><br>"
    submit += "<label for=leaf_shape>Leaf Shape: </label><select id='leaf_shape' name='leaf_shape'> <option value=''>--select leaf shape--</option> <option value='rounded'>Rounded</option><option value='pointy'>Pointy</option><option value='divided'>Divided</option></select><br>"
    submit += "<label for=bark_colour>Bark Colour: </label><select id='bark_colour' name='bark_colour'> <option value=''>--select bark colour--</option> <option value='grey'>Grey</option><option value='red'>Red</option><option value='silver'>Silver</option><option value='brown'>Brown</option></select><br>"
    submit += "<label for=bark_texture>Bark Texture: </label><select id='bark_texture' name='bark_texture'> <option value=''>--select bark texture--</option> <option value='smooth'>Smooth</option><option value='peeling'>Peeling</option><option value='crinkles'>Crinkles</option><option value='furry'>Furry</option><option value='spotty'>Spotty</option></select><br>"
    submit += '<input type="submit" value = "Submit" ></form>'
    document.getElementById("target").innerHTML = submit;  
}