const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band('Breaking Bad'));
bands.addBand(new Band('Metalsd'));
bands.addBand(new Band('Sabaton'));
bands.addBand(new Band('Distubed'));
bands.addBand(new Band('Grene day'));

io.on('connection', client => {
    console.log('conectado')
    client.on('disconnect', () => {
        console.log('cliente desconectado')
    });

    client.emit('active-bands', bands.getBands())

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload)

        io.emit('mensaje', {admin: 'msg nuevo'})
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('emitir mensaje')
        client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log('borrado')
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});