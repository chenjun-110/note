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
//Immutable的优化shouldComponentUpdate
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
//Immutable的小demo
 this.state={data: Map({ count: 0, items: List() })}; //state用Immutable类型
handleCountClick() {
    this.setState(({data}) => ({  //setState用update/set
        data: data.update('count', v => v + 1)
            .set('otherProp', 'newValue')
            .update('items', list => list.push(data.get('count'))
    }));
}
render({ //渲染用get
    <div> Count: {data.get('count')}</div>
})
//抽象setState
handleCountClick() {
    this.setImmState(d => d.update('count', v => v + 1));
}
setImmState(fn) {
    return this.setState(({data}) => ({
        data: fn(data)
    }));
}

/* react-smooth */
import Animate from 'react-smooth';
    render(){
        const steps = [{
            style: {
                opacity: 0,
            },
            duration: 400,
        }, {
            style: {
                opacity: 1,
                transform: 'translate(0, 0)',
            },
            duration: 1000,
        }, {
            style: {
                transform: 'translate(100px, 100px)',
            },
            duration: 1200,
        }];
        return (
            <Animate steps={steps}>
                <div className={S.a}>步骤动画</div>
            </Animate>
        )}

    <Animate from={{ opacity: 0 }} to={{ opacity: 1 }} easing="ease-in">
        { ({ opacity }) => <div className={S.a} style={{ opacity }}></div> }
    </Animate>//动态子组件动画写法

/*  容器组件--把fetch请求解耦出来  不用flux的情况*/
import React, { Component, PropTypes } from 'react';
    function dissoc(obj, prop) {
        let result = {};
        for (let p in obj) {
            if (p !== prop) {
                result[p] = obj[p];
            }
        }
        return result;
    }
    const Promised = (promiseProp, Wrapped) => class extends Component { //promiseProp：fetch函数。Wrapped：待封装的组件
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                error: null,
                value: null,
            };
        }
        componentDidMount() {
            this.props[promiseProp].then(response => response.json())
                .then(value => this.setState({ loading: false, value }))
                .catch(error => this.setState({ loading: false, error }));
        }
        render() {
            if (this.state.loading) {
                return <span>Loading...</span>;
            } else if (this.state.error !== null) {
                return <span>Error: {this.state.error.message}</span>;
            } else {
                const propsWithoutThePromise = dissoc(this.props, promiseProp);
                return <Wrapped {...propsWithoutThePromise} {...this.state.value} />;
            }
        }
    };
/* Redux自定义中间件 写法 */
{    //action格式例子
    url: '/api/weather.json',
    params: {
        city: encodeURI(city),
    },
    types: ['GET_WEATHER', 'GET_WEATHER_SUCESS', 'GET_WEATHER_ERROR'],
}
const fetchMiddleware = store => next => action => { //中间件例子
    if (!action.url || !Array.isArray(action.types)) {  //判断action
        return next(action);
    }
    const [LOADING, SUCCESS, ERROR] = action.types;
    next({ //初始状态
        type: LOADING,
        loading: true,
        ...action,
    });
    fetch(action.url, { params: action.params })
        .then(result => {
            next({  //异步状态1
                type: SUCCESS,
                loading: false,
                payload: result,
            });
        })
        .catch(err => {
            next({  //异步状态2
                type: ERROR,
                loading: false,
                error: err,
            });
        });
}
/* react-redux 的 connect 写法 */
const mapStateToProps = (state, ownProps) => { // state 是 store的数据
    return {
        user: _.find(state.userList, {id: ownProps.userId})
    }//user都会传进被包装的组件props
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(actions.increase(...args)),
        decrease: (...args) => dispatch(actions.decrease(...args))
    } //increase/decrease都会传进被包装的组件props
}
const Comp = connect(mapStateToProps, mapDispatchToProps)(MyComp);

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
export default connect(state => {
        return {
            list: state.home.list,
        };
    }, dispatch => {
        return {
            listActions: bindActionCreators(listActions, dispatch),
            push: bindActionCreators(push, dispatch), //push和store绑定，传为props。通过this.props.push()修改路由。
        };
    })(Home);

/* reducer写法 */
import { routerReducer } from 'react-router-redux';
const reducer = combineReducers(Object.assign({}, rootReducer, {
    routing: routerReducer, //合并自己的reducer和路由reducer
}));