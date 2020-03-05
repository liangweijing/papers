module.exports = {
  inputgetName (e) {
    let name = e.currentTarget.dataset.name;
    if (e.detail.value.length >= 2) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
    } else {
      this.setData({
        modalName: null
      })
    }
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap);
    console.log(nameMap, e);
  }
}
