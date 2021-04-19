import {Model} from './model.js';
import {split_hash} from './util.js';
import * as views from './views.js'
import * as form from './form.js'

window.addEventListener("modelUpdated",function(e){
    displayInfo();

});


//function for what to be displayed 
function displayInfo(){
    let hash = split_hash(window.location.hash)
    let lPpl=Model.get_users();
    let lTree=Model.get_observations().sort((a,b)=> new Date(b.timestamp)- new Date(a.timestamp));

    //if user page is clicked it will only show the list of users
    if(hash.path === "users"){
        views.listPeopleView("target", lPpl);
        document.getElementById("secondTarget").innerHTML=""
        document.getElementById("error").innerHTML=""
        if(hash.id){
            views.personView("target",hash.id)
        }
    }
    //else if observations page is clicked it will only show the list of observations
    else if (hash.path === "observations"){
        views.listObservationsView("target", lTree);
        document.getElementById("secondTarget").innerHTML=""
        document.getElementById("error").innerHTML=""
        if(hash.id){
            views.observationView("target",hash.id)
        }
    }
    else if(hash.path === "submit"){
        form.formDisplay();
        document.getElementById("secondTarget").innerHTML=""
        document.getElementById("error").innerHTML=""
        form.bindings();
    }
    else if(hash.path === ""){
        let study = []
        let ppl = []

        for(let x=0; x< lTree.length; x++){
            study.push(lTree[x]);
        }

        for(let y=0; y< lPpl.length; y++){
            ppl.push(lPpl[y]);
        }
        views.topPpl("secondTarget",ppl);
        views.recTree("target",study);
    }
}

// loads the page
window.onload = function() {
    Model.update_observations();
    Model.update_users();
    displayInfo();
};

window.onhashchange = displayInfo;




