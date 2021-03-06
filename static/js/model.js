export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {
            fetch(this.users_url)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                (data) => {
                    this.data.users = data;
                    let nEvent = new CustomEvent("modelUpdated", {detail: this});
                    window.dispatchEvent(nEvent);
                }
            );
        
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {
        fetch(this.observations_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {
                this.data.observations = data;
                let nEvent = new CustomEvent("modelUpdated", {detail: this});
                window.dispatchEvent(nEvent);
            }
        );

        
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        let obs = this.get_observations();

        for(let i=0;  i < obs.length;i++){
            if(obs[i].id === parseInt(observationid)){
                return obs[i];
            }
        }
        return null;


    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(formdata) {
        fetch('/api/observations', {
            method: "POST",
            body: formdata
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(formData) {
            let event = new CustomEvent("observationAdded",{
                detail: formData
            })
             window.dispatchEvent(event);
        })
        return false;
    },

    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        let obs= this.get_observations().sort((x,y) => new Date(y.timestamp) -new Date(x.timestamp));
        let record= [];

        for(let i=0; i<obs.length; i++){
            if(obs[i].participant == parseInt(userid)){
                record.push(obs[i]) ;
            }
        }
        return record;
        
    },

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
        let date = this.get_observations().slice(0,N).sort((x,y) => new Date(y.timestamp) -new Date(x.timestamp));
    
        return date
    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
       
        let obs= this.get_users();
        for(let i=0;  i < obs.length;i++){
            if(obs[i].id == parseInt(userid)){
                return obs[i];
            }
        }
        return null;
    }
};
