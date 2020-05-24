module.exports = {
  inputgetName (e) {
    let name = e.currentTarget.dataset.keywords;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap);
    console.log(nameMap, e);
    if (e.detail.value.length >= 2) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
      app.request('/journal/search/' + nameMap[name]).then(res => {
        console.log(567, res);
        this.setData({
          shortcut: res.data,
        })
      })
    } else {
      this.setData({
        modalName: null
      })
    }
  }
}
