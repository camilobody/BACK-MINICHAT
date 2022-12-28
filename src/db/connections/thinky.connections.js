import thinky from 'thinky';

const conectionThinky = thinky({
    host: 'localhost',  // variables de entorno
    port: '28015',  // variables de entorno
    db: 'real_time_chat'    // variables de entorno
})

export default conectionThinky;