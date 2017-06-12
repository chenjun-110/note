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
//mixin
import React, { Component } from 'React';
import { mixin } from 'core-decorators';
    const PureRender = {
        shouldComponentUpdate() {}
    };
    const Theme = {
        setTheme() {}
    };
    @mixin(PureRender, Theme)
    class MyComponent extends Component {
        render() {}
    }
//高阶组件，属性代理
import React, { Component } from 'React';
    const MyContainer = (WrappedComponent) =>
        class extends Component {
            proc(a){a.A()}
            render() {
                const newProps = {text: newText};  //增加props
                const props = Object.assign({}, this.props, {
                    ref: this.proc.bind(this),
                    name: {
                        value: this.state.name,
                        onChange: this.onNameChange, //把组件上的方法抽象到高阶上
                    },
                }); //重写ref指向
                return <WrappedComponent {...this.props} {...newProps}/>;
            }
        }
import React, { Component } from 'React';
//@MyContainer
class MyComponent extends Component {
    render() {
        return <input name="name" {...this.props.name} />;
    }
}
export default MyContainer(MyComponent);
//高阶组件-反向继承
const MyContainer = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            if (this.props.loggedIn) {
                return super.render(); //条件渲染
            } else {
                return null;
            }
        }
    }