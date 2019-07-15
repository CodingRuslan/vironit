function Cooker(clientName, ingredient) {
  this.inWork = false;
  this.clientName = clientName;
  this.ingredient = ingredient;

  this.cooking = function cooking() {
    let resultTime = 0;
    this.ingredient.forEach(element => {
      resultTime += element.timeCook
    });

    //setTimeout(resultTime, resultTime)
    return resultTime;
  }
}

module.exports = Cooker;