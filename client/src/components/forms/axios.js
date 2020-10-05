//all functions for axios requests to create projects, teams and tasks

//get company id on form load or get company id
//on submit?

//submit project form function
//user hits submit and it sends the project input data (states)and returns
//that the project was submitted successfully

//team form submit
//user selects team members and clicks create team button
//logic to see which members are selected and will send
//selected members to a team array
//form re-renders with options being limited to which
//employees are NOT assigned to a team
//team form submit logic runs again when create team is pressed

//create tasks form
// a task field and then options to choose which team
//user clicks assign task to finish process
////optional tasks render to see what you have assigned
//so far. Finish Button returns you to dashboard




const getMembers = (params)=>{
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}