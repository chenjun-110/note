var assert = require("assert");//node断言库
var fs = require('fs');
//不变的UI逻辑 复用的函数 纯粹的业务逻辑:数据增删改查
describe('测试总组', function(){

    before(function() {console.log('执行所有测试前 函数会被调用一次')});
    after(function() {console.log('执行所有测试后 函数会被调用一次')});
    beforeEach(function() {console.log('执行每个it前 函数会被调用一次')});
    afterEach(function() {console.log('执行每个it后 函数会被调用一次')});

    describe('异步', function() {
        it('测试块', function(done) {
            fs.readFile('./test.js', (err, data) => {
                if (err) throw err;
                done(); // 只有执行完此函数后，该测试用例算是完成。
            });
        });
    });

    describe('动态参数测试', function() {
        [1,2,3].forEach(function (test) { // 相当于写了三个it。
            it('correctly adds ' + test.length + ' args', function (){});
        });
    });

    describe('断言用法', function(){
        it('not前缀为不等', function(){
            assert.equal(-1, [1,2,3].indexOf(5)); // ==
            assert.deepEqual([1,[2]], [1,['2']]); // == 可嵌套,可枚举的实例属性
            assert.deepStrictEqual({ a: 1 }, { a: 1 }); // === 包括原型 NaN无效
        });

        it('测试抛错', function(){
            //
            assert.ok(true); //抛出假值
            assert.ifError(false); //抛出真值
            assert.throws(
                () => {
                    throw new Error('错误类型和预期类型不一致就抛错');
                },
                Error
            );
            /*
             assert.fail(2, 1, '主动抛错', '>');
             assert.doesNotThrow( // 断言绝不抛错
             () => {
             throw new TypeError('错误信息22');
             },
             TypeError,
             '抛出错误11'
             );
             */
        })
    });

    /*
     * it(); 挂起测试: 先放着,以后写测试
     * describe.only / it.only 排他测试：仅执行本测试，跳过其它。
     * describe.skip / it.skip 包含测试: 仅忽略本测试
     */
});