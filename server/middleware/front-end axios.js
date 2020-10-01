
//1 first the user signs up
//2) we saved their hashed password int the db
//3) when logging we compare the hashed password 
//and we send a token to the front end.
//- the token payload will have an object{name,email,_id,isManager}
//4) once the front-end recieves the token they will save it in the local storage
//5)logout - remove local storage




login= async (email,password)=>{

try {
    const {data:jwt}=await axios.post('/api/employ');
    //setting the token inside the local storage
    localStorage.setItem('token',jwt)
    //use the react routing to reroute user
    //use the push method to navigate to a different page
    
    window.location='/';

    //use "window.location" instead of "this.props.history.push"
    //so your decode function can rerender and get the token saved

} catch (ex) {
    console.log(ex)
}
    
    
}


// "npm i jwt-decode" in front-end"
//import jwtDecode from 'jwt-decoe'
decodeToken= async ()=>{
    //try catch to prevent app from crashing if there is not token saved
   try {
    const jwt= localStorage.getItem('token');
    const {employee, _id, email}=jwtDecode(jwt)
   } catch (error) {
       //if error reroute to login page
       //could use the same practice:
       window.location='/login'
      // return null

   }

}


logOut= async ()=>{

    localStorage.removeItem("token")

    Window.location='/'
    //homepage or login page
    //fyi if you want to export this function as
    // a logout function remove the window.location='/'...
    //and keep it inside the component making that call see sample
}
//sample>>
useEffect(() => {
   logout();

      Window.location='/'
  },[onLogout]);
  

 ` making the call to protect api`
 
`1) get token`
function getTokenKey(){
    return localStorage.getItem(tokenKey);
}

`2) set header option/setting to axios`
function setJwt(jasontoken){
axios.defaults.headers.common['x-auth-token']= jasontoken
}

`3) making the call to protect api`

 axios.post.setJwt(getTokenKey())



 


