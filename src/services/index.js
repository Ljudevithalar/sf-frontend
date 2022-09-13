import axios from 'axios'
import $router from '@/router'; 

let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

Service.interceptors.request.use((request) => {
  try {
  request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
  } catch (e) {
  console.error(e);
  }
  return request;
 });
 

 Service.interceptors.response.use(
  (response) => {
    console.log('Interceptor', response);
    return response;
    },
    (error) => {
    if (error.response.status == 401) {
    Auth.logout();
    $router.go();
    }
    }
   );




let Upiti = {
  async getupit(name){
   let response = await Service.get(`/upit?to=${name}&by=${name}`);
   let data = response.data


   data = data.map(doc => {
      return {
        id: doc._id,
        by: doc.by,
        artikalid: doc.artikalid,
        artikalime: doc.artikalime,
        to: doc.to,
        
      };
           });
          return data
  },
  add(nupit) {
    return Service.post('/upit', nupit)
},
delete(id) {
  return Service.delete(`/upit/${id}`)
}
}

let Oglasi = {
  async getoglasi(){
   let response = await Service.get(`/oglasi`);
   let data = response.data


   data = data.map(doc => {
      return {
        id: doc._id,
        title: doc.title,
        author: doc.author, 
        description: doc.description,
        image: doc.image,
        price: doc.price,
      };
           });
          return data
  },
  async getoglasp(id){
    let response = await Service.get(`/oglas/${id}`);
    let doc = response.data
 
 
       return {
         id: doc._id,
         title: doc.title,
         author: doc.author,
         description: doc.description,
         image: doc.image,
         price: doc.price,
       };
        
   },
   add(noglas) {
    return Service.post('/oglasi', noglas)
},
delete(id) {
    return Service.delete(`/oglasi/${id}`)
}

}
let Komentari = {
  async getcomments(id){
   let response = await Service.get(`/comments/${id}`);
   let data = response.data


   data = data.map(doc => {
      return {
        id: doc._id,
        oglasid: doc.oglasid,
        by: doc.by, 
        content: doc.content, 
      };
           });
          return data
  },
  add(nkomentar) {
    return Service.post('/comments', nkomentar)
},
delete(id) {
  return Service.delete(`/comments/${id}`)
}
}

let Poruke = {
  async getporuke(id, name, name2){
   let response = await Service.get(`/poruke/${id}?itemowner=${name}&querysender=${name}&itemowner2=${name2}&querysender2=${name2}`);
   let data = response.data


   data = data.map(doc => {
      return {
        id: doc._id,
        by: doc.by,
        upitid: doc.upitid,
        artikalime: doc.artikalime,
        content: doc.content,
      };
           });
          return data
  },
  add(nporuka) {
    return Service.post('/poruke', nporuka)
},
delete(id) {
  return Service.delete(`/poruke/${id}`)
}
}



let Register = {
  async register(username, password) {
  let response = await Service.post('/user', {
  username,
  password,
  });

}
   };



let Auth = {

  async login(username, password) {
  let response = await Service.post('/auth', {
  username,
  password,
  });
  let user = response.data;

  localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
  localStorage.removeItem('user');
  },

  getToken() {
  let user = Auth.getUser();
  if (user && user.token) {
  return user.token;
  }
  },

  getUser() {
  return JSON.parse(localStorage.getItem('user'));
  },

  authenticated() {
  let user = Auth.getUser();
  if (user && user.username) {
  return true;
  }
  return false;
  },
  state: {
    get user() {
    return Auth.getUser();
    },
    get name() {
      return Auth.getUser().name;
      },
    get username() {
      return Auth.getUser().username;
      },
    get authenticated() {
    return Auth.authenticated();
    },
    },
   };



export { Service, Poruke, Upiti, Komentari, Oglasi,Auth, Register}