import io from 'socket.io-client'
const protocol = process.env.LOCAL_DOMAIN == 'centos' ? 'ws' : 'wss';
const endpoint = `${protocol}://${process.env.LOCAL_DOMAIN}:${process.env.OANDA_STREAMING_PORT || 1337}`;

const socket = io.connect(endpoint);

export default socket
