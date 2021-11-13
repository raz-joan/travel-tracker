const errorMessage = document.querySelector('#errorMessage');
const errorModal = document.querySelector('#errorModal');
const errorButton = document.querySelector('#errorButton');

let errorHandling = {
  hideErrorModal() {
    errorModal.classList.add('hidden');
  },

  connectionErr(err, customMessage) {
    errorMessage.innerText = customMessage || err.message;
    errorModal.classList.remove('hidden');
  },

  checkStatus(res, customMessage) {
    if (!res.ok) {
      throw new Error(customMessage);
    }
  }
};

errorButton.addEventListener("click", errorHandling.hideErrorModal);

export default errorHandling;
