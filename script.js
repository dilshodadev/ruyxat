
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
    getDatabase,
    set,
    ref,
    get,
    update,
    remove,

 } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxjSg4xdl3XuFBiXo0vM22fhGhAm3ffmM",
  authDomain: "user-info-bf8ee.firebaseapp.com",
  projectId: "user-info-bf8ee",
  storageBucket: "user-info-bf8ee.appspot.com",
  messagingSenderId: "102252467487",
  appId: "1:102252467487:web:293b2af940d9dd73cd0c2a",
  measurementId: "G-ZMXRH91W2N"
};


const app = initializeApp(firebaseConfig);
const db=getDatabase();

let d=0;
let container=document.querySelector("#co");

let username=document.querySelector("#username");

let nom=prompt("ismingizni kiriting");

function setdata() {
    set(ref(db,nom+'user/'+ d),{
    id:d,
    username:username.value,
    completed:check1.checked
    }).then(()=>{
        alert ("yuborildi");
    })
    .catch((error)=>alert(error));

}

// function getdata() {
//     get(ref(db,"user/" + d)).then((el)=>{
//         if (el.exists()) {
//             console.log(el.val()); 
//             el.val();  
//         }
//     });
//     d++;
// }
// getdata();

// get(ref(db,"user/")).then((el)=>{
//     if (el.exists()) {
//         let i;
//         let data=el.val();
//         console.log(data);
//         d=el.val().length-1;
//         for ( i = 0; i < data.length; i++) {
//             if (data[i]!=undefined) {
//                 // d1.push(data[i]); 
//                 let line=document.createElement("div");
//                 let h1=document.createElement("h3");
//                 let del=document.createElement("button");
//                 let edit=document.createElement("button");
//                 line.style.display="flex";

//                 h1.style.textDecoration = `${data[i].completed ? "" : "line-through"}`;
                

//                 // h1.addEventListener("click",()=> {

//                 //     data[i].completed = !data[i].completed;

//                 //     h1.style.textDecoration = `${data[i].completed ? "line-through" : ""}`;

//                 //     // check_icon.style.display = `${newArr[i].completed ? "" : "none"}`;
//                 //     console.log(newArr);
//                 //   }
//                 //   );
//                 del.innerText="del";
//                 edit.innerText="edit";

//                 h1.innerText=data[i].username; 

//                 line.appendChild(h1);
//                 line.appendChild(del);
//                 line.appendChild(edit);
//                 container.appendChild(line); 
//             }
//         }
//         d++;
//     }
// });

get(ref(db,nom+"user/")).then((el)=>{
    if (el.exists()) {
        let s=el.val();
        let data=[];
       for (let i = 0; i < s.length; i++) {
        data.push(s[i]);
       };
       
       d=data.length-1;

       show(data);
    }
});

send.addEventListener("click",(event)=>{

    event.preventDefault();

    setdata();

    let obj=[{
        id:d,
        completed:check1.checked,
        username:username.value}];
        
    show(obj);
    username.value="";
});

ok.style.display="none";

username.addEventListener("keyup" , function (event) {
    if(event.key=="Enter"){
        event.preventDefault();
        setdata();
        let obj=[{
            id:d,
            completed:check1.checked,
            username:username.value}];

        show(obj);
        username.value="";
        console.log("hgfhgfhgfgh");

    }
});

function show(data) {


    console.log(data.length);

    for ( let i = 0; i < data.length; i++) {

        if (data[i]!=undefined) {

            let line=document.createElement("div");
            let h1=document.createElement("h3");
            let btn_box=document.createElement("div");
            let del=document.createElement("button");
            let edit=document.createElement("button");

            line.style.display="flex";
            line.style.justifyContent="space-between";
            line.style.alignItems="center";

            h1.innerText=data[i].username; 

            line.className="border-bottom border-warning ";

            h1.style.textDecoration = `${data[i].completed ? "line-through" : "" }`;

            h1.className="font-monospace text-warning-emphasis";

            h1.addEventListener("click",()=> {

                data[i].completed = !data[i].completed;

                h1.style.textDecoration = `${data[i].completed ? "line-through" : ""}`;

                let d=data[i].id;

                console.log(data[i]);

                update(ref(db,nom+'user/'+ d),{
                    // id:d,
                    // username:data[i].username,
                    completed:data[i].completed
                    }).then(()=>{
                    })
                    .catch((error)=>alert(error));
                    
                // console.log(update(data));

            });

            del.className="btn btn-danger me-2";
            edit.className="btn btn-success me-2";

            edit.addEventListener("click",()=> {

                ok.style.display="";
                send.style.display="none";
                
                username.value=data[i].username;
                
                console.log(d);
                console.log(data[i]);

                ok.addEventListener("click",(event)=>{

                    let d=data[i].id;
                    
                    // event.preventDefault();

                    h1.innerText=username.value;
                    
                    update(ref(db,nom+'user/'+ d),{
                        id:d,
                        completed:data[i].completed,
                        username:username.value,
                        }).then(()=>{
                        })
                        .catch((error)=>alert(error));

                    console.log(d);
                    send.style.display="";
                    ok.style.display="none";
                    
                });  
            });

            
            del.addEventListener("click",(event)=>{

                let d=data[i].id;
                line.innerHTML="";
                remove(ref(db,nom+'user/'+ d));
                
            });

            del.innerText="del";
            edit.innerText="edit";
            btn_box.className="d-flex flex-row mb-3 pt-2 "

            line.appendChild(h1);
            btn_box.appendChild(del);
            btn_box.appendChild(edit);
            line.appendChild(btn_box);
            container.appendChild(line); 
        }
    }
    d++;
}







// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }