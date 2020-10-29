[TOC]
搭环境：
 ng serve
 ng generate component hero-detail 自动创建组件
 ng generate service hero --module=app 自动创建服务 --module=app告诉CLI把它注册到AppModule的 imports 数组中。
 ng generate module app-routing --flat --module=app 自动创建路由 --flat把这个文件放进了 src/app 中

implements OnInit 生命周期接口 ngOnInit(){}
{{name | uppercase}} 表达式的大写管道操作符
app.module.ts @NgModule
 1. imports数组是用来导入功能模块的。FormsModule 双向绑定
 2. declarations导入组件

Angular 只会绑定到组件的公共属性。
`*ngIf` 类似v-if
`[(ngModel)]="name"` 类似v-model,需要导入FormsModule支持
`*ngFor="let v of arr"` 类似v-for
`(click)="onSelect(v)"` 类似@click
`[class.name]="id === 1"` 是否添加.name类,类似vue的:class="[id === 1 ? 'class1' : 'class2']"
`[abc]="obj"`  类似传递props, `@Input() abc` 类似子组件接收props的@Prop() 貌似只能传递变量和数字。
<div `[ngStyle]`="{'background-color':username === 'zxc' ? 'green' : 'red' }"></<div>  `[ngClass]`同理

import { HeroService } from './hero.service';
constructor (private heroService: HeroService,private location: Location){} 注入服务可直接调用this.heroService

定义路由：
  1. 在路由组件里定义 imports: [ RouterModule.forRoot(routes) ],
  2. 然后在 app.component.html 里写上<router-outlet></router-outlet>
  3. <a routerLink="/name">name</a>
  4. 默认路由设置 { path: '', redirectTo: '/name', pathMatch: 'full' }