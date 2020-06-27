Hãy xem đoạn code dưới đây:

```javascript
import React, { useState } from 'react'

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

Đoạn code này sử dụng ```1 hook``` trong số các hooks cơ bản của react-hooks, đó chính là ```useState```, và đoạn code đó hoàn toàn tương đương với:

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

Trước đây khi chưa có hook, chúng ta tạo ra các component trong react bằng các extends ```React.Component```, mỗi class có các ```props``` hoặc ```state``` của riêng nó. Nhưng với hook, chúng ta sẽ viết theo một cách khác.


<h2>0. Hooks và function components</h2>

Thuật ngữ ```function components``` hay còn gọi là ```stateless components``` không còn quá xa lạ. Trông nó sẽ như thế này:

```javascript
const Example = (props) => {
  // You can use Hooks here!
  return <div />;
}
```
hoặc là thế này:

```javascript
function Example(props) {
  // You can use Hooks here!
  return <div />;
}
```

Và nó sẽ được áp dụng trong hook, <b>hooks không sử dụng class</b>.

<h2>1. Hooks là gì?</h2>

```Hook``` là một hàm javascript đặc biệt để bạn có thể <em>móc vào</em> các chức năng của react. Nghe khá trừu tượng nhưng hãy xem một ví dụ với ```useState```, ```useState``` là một hook giúp bạn thêm react state vào một ```function component```. Tức là một ```stateless component``` được <em>móc</em> state.

<h2>2. Khi nào nên sử dụng Hooks?</h2>

Có thể nói là bất cứ khi nào ta muốn, nhưng phải tuân thủ 2 luật đã được đề cập tại [document của react-hook](https://reactjs.org/docs/hooks-rules.html) như sau:

<h4>RULE 1: Only Call Hooks at the Top Level</h4>

Đừng call hooks trong các vòng lặp, các câu điều kiện hay là hàm lồng. Thay vào đó hãy call hooks ở trên cùng trong các hàm của bạn. Tại sao ư? Hãy đọc xong 2 bài ```useState``` và ```useEffect``` rồi sẽ thấy giải thích kĩ càng hơn ở [đây](./03-rules-of-hooks.md) nhé!

<h4>RULE 2: Only Call Hooks from React Functions</h4>
Đừng call hooks ở các hàm JS thông thường, mà hãy call ở 2 nơi sau:

- Call hooks tại các ```stateless component``` hay nói cách khác là các ```function component```
- Call hooks tại các hooks mà bạn custom (có nghĩa là ngoài các hook của react cung cấp, bạn hoàn toàn có thể tự tạo ra một hook của riêng mình và custom nó, hãy call hook khác ở đây).

<h2>3. Các hooks cơ bản</h2>

React cung cấp một số hooks cơ bản như sau:

- ```useState```
- ```useEffect```
- ```useContext```
- ```useReducer```
- ```useRef```
- ```useCallback```
- ```useMemo```
- ...

Các hooks API được liệt kê tại [document của react-hooks](https://reactjs.org/docs/hooks-reference.html)
