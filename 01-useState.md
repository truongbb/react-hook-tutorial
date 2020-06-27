<h2>1. Khai báo một biến state</h2>

Quay về với câu chuyện ngày xưa, khi mà khai báo một state trong component của React, chúng ta vẫn thường làm như thế này:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Nhưng ở trong ```function component/stateless component``` thì lại khác, chúng ta không hề có ```this```, vì vậy nên chúng ta không thể viết được ```this.state``` như cách quen thuộc ngày nào. Thay vào đó, chúng ta sẽ sử dụng ```hooks```:

```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  // some codes go here ...
}
```
OK, nhìn lạ hoắc, để hiểu hơn thì trả lời từng câu hỏi sau ta sẽ dễ dàng sử dụng hơn nhiều.

<h3>1.1 What does calling useState do?</h3>

Gọi cái ```useState``` ra để làm gì nhỉ?

--> Để khai báo một biến state chứ sao. Biến của chúng ta trong ví dụ trên có tên là ```count```, và ```setCount``` là <b><em>một function để update giá trị</b></em> của biến ```count```. Hàm ```setCount``` hoạt động giống như ```this.seetState({count: newCountCValue}})``` như ta đã biết vậy.


<h3>1.2 What do we pass to useState as an argument?</h3>

```useState``` là một function, thế ta truyền gì vào function này?

--> Tham số duy nhất để truyền vào ```useState``` đó chính là <b><em>giá trị khởi tạo ban đầu của biến state đó</b></em>.

Ví dụ:
```javascript
const [count, setCount] = useState(0)
```
Có nghĩa là chúng ta truyền giá trị mặc định ban đầu cho ```count``` là 0 (pass 0 as initial state for our variable). Không giống như viết theo kiểu ```class``` cũ, state cũ bắt buộc phải là một object:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Nhưng với hooks, nó có thể là bất cứ thứ gì bạn muốn: ```number```, ```string```, ```object```, ```function```, ...

Và khi chúng ta muốn có nhiều giá trị trong state như kiểu truyền thống thế này:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      resultStr: 'abc',
      checker: {
        name: '',
        age: 20
      }
    };
  }
```
thì chúng ta sẽ sử dụng ```useState``` nhiều lần:

```javascript
const [count, setCount] = useState(0)
const [resultStr, setResultStr] = useState('abc')
const initialChecker = {
  name: '',
  age: 20
}
const [checker, setChecker] = useState(initialChecker)
```

nhưng mà cũng không dại gì mà dùng quá nhiều biến state phải không, gọn hơn vẫn là object:

```javascript
const initialState = {
  count: 0,
  resultStr: 'abc',
  checker: {
    name: '',
    age: 20
  }
}
const [pageState, setPageState] = useState(initialState)
```

<h3>1.3 What does useState return?</h3>

Câu cuối: ```useState``` trả về cái gì?

Nãy giờ giải thích và nhìn code thì cũng rõ rành rành, nó trả về cặp giá trị: <b>state hiện tại</b> và <b>một hàm để update giá trị của state đó</b>. Cũng giống như việc ```this.state.count``` và ```this.setState``` đi cùng một cặp ở cách viết trước đây vậy.

<h3>1.4 Summary</h3>

Túm lại thì:
```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
}
```
Đoạn code này chúng ta khai báo một biến ```count``` và gán cho nó giá trị là ```0```. React sẽ ```nhớ``` giá trị hiện tại giữa các lần re-render lại DOM, và cung cấp một function cho chúng ta để update giá trị của ```count``` khi cần thiết.

<h2>2. Sử dụng state</h2>

Khai báo được state rồi, giờ xài sao đây? Câu trả lời là "Easy", nhìn đây:

```html
<p>You clicked {count} times</p>
```

Hoàn toàn tương đương với cách cũ:

```html
<p>You clicked {this.state.count} times</p>
```

<h2>3. Update state</h2>

Câu trả lời vẫn là "Easy, too", lại nhìn:

```html
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```
Rất ngắn gọn,  vì chúng ta sử dụng ```setCount``` như đã đề cập ở mục 1, và ngắn hơn cách truyền thống rất nhiều nhé:

```html
 <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

<h2>4. Thắc mắc về dấu ngoặc vuông?</h2>

```javascript
// Ờ tại sao không phải là
const (count, setCount) = useState(0)

// hay là
const {count, setCount} = useState(0)

// mà lại là
const [count, setCount] = useState(0)
```

[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) đấy các bố trẻ ạ. ```useState``` nó sẽ trả về 1 mảng, việc của chúng ta là hứng nó thôi, và hứng sao cho chuẩn nhé. Nếu không thích hứng "ơ-rây đì-sờ-chắc-chờ-ring" thì tự hứng theo cách khác cũng không sao mà:

```javascript
var fruitStateVariable = useState('banana'); // Returns a pair
var fruit = fruitStateVariable[0]; // First item in a pair
var setFruit = fruitStateVariable[1]; // Second item in a pair
```
--> code nhìn xấu vãi chưởng, bày đặt khác người. Thôi, xài như này cho chuẩn nhé mấy mẹ:
```javascript
const [fruit, setFruit] = useState('banana');
```
