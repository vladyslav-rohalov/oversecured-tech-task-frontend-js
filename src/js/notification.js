import Toastify from 'toastify-js';

export default function notification(message, type) {
  const color = () => (type === 'success' ? '#47F271' : '#EF7635');
  return Toastify({
    text: message,
    duration: 2000,
    newWindow: true,
    position: 'center',
    stopOnFocus: true,
    style: {
      background: color(),
    },
  }).showToast();
}
