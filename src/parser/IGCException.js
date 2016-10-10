function IGCException(message) {
  if (!(this instanceof IGCException)) {
    return new IGCException(message);
  }

  this.name = 'IGCException';
  this.message = message;
}

IGCException.prototype = new Error();

export default IGCException;
