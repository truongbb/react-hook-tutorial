Trong phần này chúng ta sẽ bàn tới một số hooks bổ sung:

- ```useReducer```
- ```useMemo```
- ```useCallback```

<h2>1. useReducer</h2>

Thằng này là một dạng tổng quát hơn của ```useState``` được sử dụng trong một vài tình huống phức tạp, cần quản lý state qua lại giữa các action, giống như trong redux. Nó được định nghĩa như sau:

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```useReducer``` nhận vào 3 giá trị:
- ```reducer```: một hàm có dạng ```reducer(state, action)``` hệt như trong redux, nó có nhiệm vụ đặt lại state theo action
- ```initialArg```: là giá trị khởi tạo ban đầu của state
- ```init```: hàm khởi tạo ban đầu

Và ```useReducer``` trả về ```state``` và một ```dispatch``` chứ không phải cặp ```state``` và ```setState``` như là ```useState``` trả về nữa, vì việc ```setState``` sẽ được thực hiện bằng tay trong hàm ```reducer``` thông qua sự kiện khi chúng ta gọi ```dispatch```. Ví dụ luôn nhé:

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

Tham số thứ ba dành cho việc ```lazy initialize```, đó là một function để thực thi khởi tạo giá trị ban đầu cho state.

```javascript
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```


<h2>2. useMemo</h2>

```useMemo``` giúp ta kiểm soát việc được render dư thừa của các component con, nó khá giống với hàm ```shouldComponentUpdate``` trong react class. Bằng cách truyền vào 1 tham số thứ 2, chỉ khi tham số này thay đổi thì thằng ```useMemo``` mới được thực thi. Cũng khá giống với ```useEffect``` đấy chứ. Ví dụ:

- <b>Không</b> sử dụng ```useMemmo```

```javascript
const NotUsingMemo = ({ products }) => {
  const soldoutProducts = products.filter(x => x.isSoldout === true); // soldoutProducts sẽ luôn luôn thực thi mỗi khi NotUsingMemo được re-render
};
```

- <b>Có</b> sử dụng ```useMemmo```

```javascript
const UsingMemo = ({ products }) => {
  const soldoutProducts = useMemo(
    () => products.filter(x => x.isSoldout === true), // / soldoutProducts sẽ chỉ thực thi khi props products thay đổi
    [products] // watch products
  );
};
```

<h2>3. useCallback</h2>

```useCallback``` có nhiệm vụ tương tự như ```useMemo``` nhưng khác ở chỗ function truyền vào ```useMemo``` bắt buộc phải ở trong quá trình render, trong khi đối với ```useCallback``` đó lại là function callback của 1 event nào đó như là ```onClick``` chẳng hạn:

```javascript
const App = () => {
  const [text, setText] = React.useState('');

  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Wrap />
    </>
  );
};

const Wrap = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleChecked = useCallback(() => setIsChecked(!isChecked), [
    isChecked
  ]);

  return <Checkbox value={isChecked} onClick={toggleChecked} />;
};

const Checkbox = React.memo(({ value, onClick }) => {
  console.log('Checkbox is renderd!');
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      {value ? '☑' : '□'}
    </div>
  );
});
```
Trong ví dụ trên ta sử dụng ```useCallback``` cho sự kiện ```onClick```, điều này có nghĩa là việc thay đổi giá trị text trong ô Input sẽ không làm component Checkbox bị re-render.
