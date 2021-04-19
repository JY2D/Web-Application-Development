import { Model } from "./model.js";
export { listPeopleView, personView, listObservationsView, observationView, topPpl, recTree };

function apply_template(targetid, templateid, data) {
    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    );
    target.innerHTML = template(data);
}


function listPeopleView(targetid, people) {
    let ppl = people;
    let study = Model.get_observations()
    let number = 0;
    let sort = [];

    for(let x=0; x< ppl.length; x++){
        for(let y=0; y< study.length; y++){
            if(ppl[x].id === study[y].participant){
                number++;
            }
        }
        sort.push({
            first_name: ppl[x].first_name,
            last_name: ppl[x].last_name,
            id: ppl[x].id,
            NumberObs: number
        })
        number =0;
    }
    sort.sort(dynamicSort("NumberObs", "down"))
    apply_template(targetid, "show-list-of-people-template", {'users':sort}); 
}


function personView(targetid, person) {
    let obj = Model.get_user_observations(person);
    apply_template(targetid, "show-person-template", {"case": obj, "user": Model.get_user(person)});
}

function listObservationsView(targetid, trees) {
    trees.sort((x,y) => new Date(y.timestamp) - new Date(x.timestamp));
    apply_template(targetid, "show-list-of-observations-template", {'observations': trees }); 
}

function observationView(targetid, tree) {
    let num= Model.get_observation(tree);
    let identify = Model.get_user(num.participant);
    apply_template(targetid, "show-observation-template", {"info":Model.get_observation(tree),"participant": identify});
}

//Homepage

//creates a list of recent observations
function recTree(targetid, study){
    let sort = [];
    for(let x=0; x<10; x++){
        sort.push(study[x]);
    }
    apply_template(targetid, "show-list-of-observations-template", {"observations": sort})
}



//creates a list of top 10 users 
function topPpl(targetid, participant){
    let ppl = participant.slice();
    let study = Model.get_observations()
    let number = 0;
    let sort = [];

    for(let x=0; x< ppl.length; x++){
        for(let y=0; y< study.length; y++){
            if(ppl[x].id === study[y].participant){
                number++;
            }
        }
        sort.push({
            first_name: ppl[x].first_name,
            last_name: ppl[x].last_name,
            id: ppl[x].id,
            NumberObs: number
        })
        number =0;
    }
    sort.sort(dynamicSort("NumberObs", "down"))
    let top= [];
    for(let x=0; x<10; x++){
        top.push(sort[x])
    }
    apply_template(targetid, "show-list-of-top-template", {'user':top}); 
}


function dynamicSort(property, order){
    var ordering =1
    if(order === "down"){
        ordering = -1;
    }
    return function (x,y){
        if(x[property] < y[property]){
            return -1* ordering;
        } else if(x[property]> y[property]){
            return 1* ordering;
        } else{
            return 0 * ordering;
        }
}}

