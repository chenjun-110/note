//拿取单选框值
handleChange(e) {
    this.setState({
        radioValue: e.target.value,
    });
}
//拿取复选框值 this.state = {coffee: []};
handleChange(e) {
    const { checked, value } = e.target;
    let { coffee } = this.state;
    if (checked && coffee.indexOf(value) === -1) { //空选->已选
        coffee.push(value);
    } else {   //已选->空选
        coffee = coffee.filter(i => i !== value);
    }
    this.setState({
        coffee,
    });
//多选 <select multiple={true} value={area}>             this.state = {area: ['beijing', 'shanghai']};
handleChange(e) {
    const { options } = e.target;// 注意，这里返回的 options 是一个对象，并非数组
    const area = Object.keys(options)
        .filter(i => options[i].selected === true)
        .map(i => options[i].value);
    this.setState({
        area,
    });
}