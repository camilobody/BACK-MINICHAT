import conectionThinky from "../connections/thinky.connections.js";
import thinky from 'thinky';

const r = thinky.r;
const type = thinky.type;

const datecol = new Date().toDateString('es-co');
const hourcol = new Date().toLocaleTimeString('es-co', { hour12: false });
const datenow = new Date(`${datecol} ${hourcol} GMT`)

// Modelo creado
const Channels = conectionThinky.createModel("channels", {
    id: type.string(),
    brand: type.number(),
    create_at: { _type: Date, default: datenow },
    id_channel: type.string(),
    id_member: type.string(),
    id_service_line: type.number(),
    id_user: type.string(),
});

export default Channels;