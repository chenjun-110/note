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
//高阶组件-反向继承-修改render结果
const MyContainer = (WrappedComponent) =>
    class extends WrappedComponent {
            render() {
                const elementsTree = super.render(); //提取div
                let newProps = {};
            if (elementsTree && elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'};
            }
            const props = Object.assign({}, elementsTree.props, newProps); //合并属性
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children); //生成render结果
            return newElementsTree;
        }
    }
//找回高阶组件丢失的原组件名
class HOC extends ... {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component';
}
//函数式编程-能改变自己的高阶组件
import React, { Component } from 'React';
function HOCFactoryFactory(...params) {  // 可以做一些改变 params 的事
    return function HOCFactory(WrappedComponent) {
        return class HOC extends Component {
            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
    }
}
HOCFactoryFactory(params)(WrappedComponent); //调用1
@HOCFatoryFactory(params)  //调用2
class WrappedComponent extends React.Component{}

//高阶组件-逻辑抽象
const SearchDecorator = Wrapper => { // 抽象了回调的高阶
    class WrapperComponent extends Component {
        handleSearch(keyword) {
            this.setState({
                data: this.props.data,
                keyword,
            });
            this.props.onSearch(keyword);
        }
        render() {
            const { data, keyword } = this.state;
            return (
                <Wrapper
                    {...this.props}
                    data={data}
                    keyword={keyword}
                    onSearch={this.handleSearch.bind(this)}
                />
            );
        }
    }
    return WrapperComponent;
};
const AsyncSelectDecorator = Wrapper => {  // 抽象了生命周期的高阶
    class WrapperComponent extends Component {
        componentDidMount() {
            const { url } = this.props;
            fetch(url).then(response => response.json()).then(data => {this.setState({data});});
        }
        render() {
            const { data } = this.state;
            return (
                <Wrapper
                    {...this.props}
                    data={data}
                />
            );
        }
    }
    return WrapperComponent;
}
//Immutable.js
import Immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';
let data = Immutable.fromJS({ a: { b: { c: 1 } } });
let cursor = Cursor.from(data, ['a', 'b'], newData => { // 让 cursor 指向 { c: 1 }
    console.log(newData);// 当 cursor 或其子 cursor 执行更新时调用
});
cursor.get('c'); // 1
cursor = cursor.update('c', x => x + 1);
cursor.get('c'); // 2
//Immutable的应用
import React, { Component } from 'react';
import { is } from 'immutable';
class App extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {};
        const thisState = this.state || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }
        for (const key in nextProps) {
            if (nextProps.hasOwnProperty(key) &&
                !is(thisProps[key], nextProps[key])) {
                return true;
            }
        }
        for (const key in nextState) {
            if (nextState.hasOwnProperty(key) &&
                !is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }
}